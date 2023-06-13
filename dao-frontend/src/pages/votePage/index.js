import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import SuccessModal from '../../components/modal';
import VoteForm from './voteForm';
import VoteError from './voteError';
import VoteConfirmed from './voteConfirmed';

function VoteComponent() {
    const history = useHistory();
    const { loading, setLoading, daoContract, fetchContracts, address, successMessage, setSuccessMessage, closeModal, showModal, setShowModal } = useContext(AuthContext);
    const { id } = useParams();
    const [error, setError] = useState('');
    const [selectedOption, setSelectedOption] = useState('0');
    const [voteSuccess, setVoteSuccess] = useState(false);


    useEffect(() => {
        fetchContracts()
    }, [])

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            console.log('daoContract ', daoContract);
            console.log('voter address ', address);


            const isMember = await daoContract.isMember(address);
            if (!isMember) {
                throw new Error('You are not a member of the DAO');
            }

            const memberBalance = await daoContract.memberBalances(address);
            console.log('memberBalance before', Number(memberBalance));

            const tokensToCharge = 5;
            if (memberBalance < tokensToCharge) {
                throw new Error('Insufficient tokens to vote');
            }

            const transaction = await daoContract.vote(id, selectedOption, tokensToCharge);
            // Wait for the transaction to be mined
            await transaction.wait();

            const updatedMemberBalance = await daoContract.memberBalances(address);

            setVoteSuccess(true);
            setLoading(false);
            setSuccessMessage(`You have successfully voted. Your new balance is ${Number(updatedMemberBalance)}`)
            setShowModal(true);
            console.log('memberBalance after', Number(updatedMemberBalance));
        } catch (error) {
            setLoading(false);
            console.log(error?.error?.data?.message)
            setError(error?.error?.data?.message);
        }
    };

    const handleGoBack = () => {
        history.push('/proposals');
    };

    return (
        <div className='border p-4 h-100 w-75 d-flex flex-column rounded-4 justify-content-around align-content-center text-center' >
            <h2 className='my-4'>Vote on Proposal</h2>

            {error && <VoteError handleGoBack={handleGoBack} error={error} />}

            {!error && !voteSuccess && (
                <VoteForm
                    handleSubmit={handleSubmit}
                    selectedOption={selectedOption}
                    handleOptionChange={handleOptionChange}
                    loading={loading}
                />
            )}

            {voteSuccess && (<VoteConfirmed handleGoBack={handleGoBack} />)}

            {showModal && (<SuccessModal successMessage={successMessage} closeModal={closeModal} />)}

        </div>
    );
}

export default VoteComponent;
