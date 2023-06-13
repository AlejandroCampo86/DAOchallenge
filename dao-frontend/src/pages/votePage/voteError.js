import React from 'react'

export default function VoteError({ error, handleGoBack }) {
    return (
        <div className='mb-3'>
            <p>{error}</p>
            <button type="button" className="btn btn-primary" onClick={handleGoBack}>Go Back to Proposal List</button>
        </div>
    )
}
