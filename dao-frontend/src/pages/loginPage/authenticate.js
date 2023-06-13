import React from 'react'
import SuccessModal from '../../components/modal'

export default function Authenticate({ loading, successMessage, checkMembership, joinDAO, errorMessage, showModal, closeModal }) {
    return (
        <div className='d-flex flex-column align-items-center justify-content-center text-center mt-4'>
            {/* success connecting to Mumbai */}
            <p>Successfully connected to the Polygon Mumbai network.</p>

            {/* join the DAO / Already a Member? */}
            {!loading && (
                <div className='d-flex  flex-column'>
                    <span>Already a member?</span>
                    <button type="button" className="btn btn-primary my-3" onClick={checkMembership}>See Proposals</button>

                    {!successMessage && (<span>Is this your first time?{' '}
                        <span type="button" className="fw-bold" onClick={joinDAO}>Join the DAO</span></span>)}
                </div>
            )}

            {/* loading... */}
            {loading && (
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
            {/* If error joining the DAO */}
            {errorMessage && <p
                onClick={joinDAO}
                className='text-center mt-4'>{errorMessage}</p>}

            {/* success joining the DAO */}
            {showModal && (
                <SuccessModal successMessage={successMessage} closeModal={closeModal} />
            )}
        </div>
    )
}
