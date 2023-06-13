import React from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';


export default function Proposal({ proposal }) {

    //Progress bar of minimum votes
    const getProgress = (votesForA, votesForB, minimumVotes) => {
        const totalVotes = votesForA + votesForB;
        const percentage = (totalVotes / minimumVotes) * 100;
        return Math.round(percentage);
    };

    // Status of Proposal
    const getStatus = (proposal) => {
        if (proposal.closed) {
            if (proposal.finished) {
                if (proposal.votesForA > proposal.votesForB && proposal.quorum) {
                    return <span className="badge text-bg-primary">Finished: Option A Won</span>;
                } else if (proposal.votesForB > proposal.votesForA && proposal.quorum) {
                    return <span className="badge text-bg-success">Finished: Option B Won</span>;
                } else if (proposal.votesForB === proposal.votesForA && proposal.quorum) {
                    return <span className="badge text-bg-secondary">Finished: Its a Tie</span>;
                }
            }
            if (!proposal.quorum) {
                return <span className="badge text-bg-secondary">Finished: The Minimum Number of Votes Could Not Be Reached</span>;
            }
        } else {
            return <span className="badge text-bg-warning">Status: Pending</span>;
        }
    };

    return (
        <li >
            <Link to={`/proposals/${proposal.id}`}>
                {proposal.title.toUpperCase()} - {getStatus(proposal)}
            </Link><br />
            <span>Minimum Votes: {proposal.minimumVotes}</span><br />
            <span>Description: {proposal.description}</span><br />
            <ProgressBar
                className='mt-2 mb-2'
                now={getProgress(Number(proposal.votesForA), Number(proposal.votesForB), Number(proposal.minimumVotes))} label={`${getProgress(Number(proposal.votesForA), Number(proposal.votesForB), Number(proposal.minimumVotes))}%`} /><hr />

        </li>
    )
}
