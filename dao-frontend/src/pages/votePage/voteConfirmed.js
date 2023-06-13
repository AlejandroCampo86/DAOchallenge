import React from 'react'

export default function VoteConfirmed({ handleGoBack }) {
    return (
        <div>
            <p>Check the details of your transaction at</p>
            {' '}
            <a className='fw-bold' href='https://mumbai.polygonscan.com/'>mumbai.polygonscan.com!</a><br />
            <button type="button" className="btn btn-primary mt-3" onClick={handleGoBack}>Go Back to Proposal List</button>
        </div>
    )
}
