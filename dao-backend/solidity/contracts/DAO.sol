// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./DAOtoken.sol";

contract DAO {
    DAOtoken public daoToken;

    struct Proposal {
        uint256 id;
        string title;
        string description;
        uint256 deadline;
        uint256 minimumVotes;
        uint256 votesForA;
        uint256 votesForB;
        bool isClosed;
        bool finished;
    }

    constructor(address tokenAddress) {
        daoToken = DAOtoken(tokenAddress);
    }

    Proposal[] public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    event ProposalCreated(uint256 id, string title);
    event VoteSubmitted(uint256 proposalId, address voter, uint256 voteOption);
    event ProposalClosed(uint256 proposalId);
    event ProposalFinished(uint256 proposalId, string winningOption);

    function createProposal(
        string memory title,
        string memory description,
        uint256 deadline,
        uint256 minimumVotes
    ) public {
        uint256 proposalId = proposals.length;
        Proposal memory newProposal = Proposal(
            proposalId,
            title,
            description,
            deadline,
            minimumVotes,
            0,
            0,
            false,
            false
        );
        proposals.push(newProposal);

        emit ProposalCreated(proposalId, title);
    }

    function vote(uint256 proposalId, uint256 voteOption) public {
        Proposal storage proposal = proposals[proposalId];

        // Check if the deadline has passed and close the proposal if so
        if (block.timestamp >= proposal.deadline) {
            proposal.isClosed = true;
            emit ProposalClosed(proposalId);

            // Finish the proposal and determine the winning option
            finishProposal(proposalId);
        }

        require(!proposal.isClosed, "Proposal is closed");
        require(!proposal.finished, "Proposal is finished");
        require(!hasVoted[proposalId][msg.sender], "Already voted");

        if (voteOption == 0) {
            proposal.votesForA++;
        } else if (voteOption == 1) {
            proposal.votesForB++;
        } else {
            revert("Invalid vote option");
        }

        hasVoted[proposalId][msg.sender] = true;

        emit VoteSubmitted(proposalId, msg.sender, voteOption);
    }

    function finishProposal(uint256 proposalId) internal {
        Proposal storage proposal = proposals[proposalId];

        require(proposal.isClosed, "Proposal is not closed");
        require(!proposal.finished, "Proposal is already finished");

        proposal.finished = true;

        string memory winningOption;
        if (proposal.votesForA > proposal.votesForB) {
            winningOption = "Option A";
        } else if (proposal.votesForB > proposal.votesForA) {
            winningOption = "Option B";
        } else {
            winningOption = "Tie";
        }

        emit ProposalFinished(proposalId, winningOption);
    }

    function proposalsCount() public view returns (uint256) {
        return proposals.length;
    }

    function proposalsStatus() public {
        for (uint256 i = 0; i < proposals.length; i++) {
            Proposal storage proposal = proposals[i];
            if (!proposal.isClosed && block.timestamp >= proposal.deadline) {
                proposal.isClosed = true;
                emit ProposalClosed(proposal.id);
                finishProposal(proposal.id);
            }
        }
    }
}
