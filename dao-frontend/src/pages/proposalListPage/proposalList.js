import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/authContext';
import { getProposals } from '../../services/api';
import Proposal from './proposal';

function ProposalList() {
    const { proposals, setProposals } = useContext(AuthContext);

    //Fetch the Proposals
    useEffect(() => {
        const fetchProposals = async () => {
            const fetchedProposals = await getProposals();
            setProposals(fetchedProposals.proposals);
        };
        fetchProposals();
    }, []);


    return (
        <div className='border h-75 w-75 d-flex flex-column rounded-4 justify-content-around text-center align-items-center p-4 my-4'>
            <h1>List of Proposals</h1>
            <div className='text-start  w-75 '>
                {proposals.length > 0 ? (
                    <ul style={{ listStyle: 'none', marginTop: '20px' }}>
                        {proposals.map((proposal) => (
                            <Proposal key={proposal.id} proposal={proposal} />
                        ))}
                    </ul>
                ) : (
                    <div className="d-flex justify-content-center  align-items-center mt-4">
                        <div className="spinner-border text-primary " role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProposalList;
