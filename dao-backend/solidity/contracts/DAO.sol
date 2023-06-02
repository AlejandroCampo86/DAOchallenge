// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DAO {
    struct Proposal {
        uint256 id;
        string title;
        string description;
        uint256 deadline;
        uint256 minimumVotes;
        uint256 votesForA;
        uint256 votesForB;
        bool closed;
        bool finished;
    }

    Proposal[] public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    event ProposalCreated(uint256 id, string title);
    event VoteSubmitted(uint256 proposalId, address voter, uint256 voteOption);

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

        require(!proposal.closed, "Proposal is closed");
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

    function proposalsCount() public view returns (uint256) {
        return proposals.length;
    }
}
