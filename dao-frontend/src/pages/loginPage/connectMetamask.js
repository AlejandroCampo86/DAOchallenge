import React from 'react'

export default function ConnectMetamask({ addNetwork }) {
    return (
        <div className='d-flex flex-column align-items-center justify-content-center'>
            <h1>Login with MetaMask</h1>

            <div className='d-flex flex-column align-items-center justify-content-center'>
                <p>Please connect to the Polygon Mumbai network using MetaMask to proceed.</p>
                <button
                    onClick={addNetwork} type="button" className="btn btn-primary">
                    Connect with MetaMask
                </button>
            </div>
        </div>
    )
}
