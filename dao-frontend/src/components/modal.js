import React from 'react'

export default function SuccessModal({ successMessage, closeModal }) {
    return (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-dark">Congratulations!</h5>

                    </div>
                    <div className="modal-body text-dark">

                        <p>{successMessage}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={closeModal}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
