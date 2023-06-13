import React from 'react'

export default function VoteForm({ handleSubmit, selectedOption, handleOptionChange, loading }) {
    return (
        <form onSubmit={handleSubmit} >
            <div className=' mb-3'>
                <label>
                    <input
                        type="radio"
                        value="0"
                        checked={selectedOption === '0'}
                        onChange={handleOptionChange}
                    />
                    Option A
                </label>
            </div>
            <div className=' mb-3'>
                <label>
                    <input
                        type="radio"
                        value="1"
                        checked={selectedOption === '1'}
                        onChange={handleOptionChange}
                    />
                    Option B
                </label>
            </div>
            {!loading && (
                <button className="btn btn-primary" type="submit" disabled={!selectedOption}>
                    Vote
                </button>
            )}

            {loading && (
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
        </form>
    )
}
