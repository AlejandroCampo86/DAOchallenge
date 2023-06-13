import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import Chart from './barChart';



function ProposalDetails() {
    const history = useHistory();
    const { id } = useParams();
    const { proposals } = useContext(AuthContext);
    const [proposal, setProposal] = useState(null);

    //set proposal details
    useEffect(() => {
        const fetchProposal = () => {
            const proposal = proposals.find((p) => p.id === id);
            setProposal(proposal);
        };

        if (proposals.length > 0) {
            fetchProposal();
        }
    }, [proposals, id]);

    const handleGoBack = () => {
        history.push('/proposals');
    };

    //Loading proposal details
    if (!proposal) {
        return <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>;
    }

    // chart data
    const votesForA = proposal.votesForA;
    const votesForB = proposal.votesForB;
    const chartData = [
        { option: 'Option A', votes: votesForA },
        { option: 'Option B', votes: votesForB },
    ];

    const deadline = new Date(parseInt(proposal.deadline) * 1000);

    return (
        <div className='d-flex flex-column align-items-center justify-content-center'>
            <h2>{proposal.title.toUpperCase()}</h2>
            <h4>{proposal.description}</h4>
            <p>Deadline: {deadline.toLocaleString()}</p>
            <p>Minimum Votes: {proposal.minimumVotes}</p>
            <p>Option A: {proposal.votesForA}</p>
            <p>Option B: {proposal.votesForB}</p>

            <Chart chartData={chartData} />

            {proposal.closed ? (
                <>
                    <p>The voting deadline has passed. Voting is no longer allowed.</p>
                    <button type="button" className="btn btn-primary" onClick={handleGoBack}>Go Back to Proposal List</button>
                </>
            ) : (
                <Link to={`/proposals/${id}/vote`}>Vote on this proposal</Link>
            )}
        </div>
    );
}

export default ProposalDetails;
