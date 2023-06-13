import React, { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import DAOLOGO from '../../assets/dao-logo.jpg';
import ConnectMetamask from './connectMetamask';
import Authenticate from './authenticate';

function Login() {

    const {
        connected,
        networkChanged,
        successMessage,
        errorMessage,
        loading,
        addNetwork,
        metamaskError,
        checkMembership,
        joinDAO,
        showModal,
        closeModal
    } = useContext(AuthContext);

    return (
        <div className='border p-4 h-75 w-75 d-flex flex-column rounded-4 justify-content-around'>
            <div className="dao-logo-container my-3">
                <img src={DAOLOGO} alt="DAO Logo" className="dao-logo" />
            </div>
            {/* If not connected to Metamask or Network changed */}
            {(!connected || networkChanged) && (
                <ConnectMetamask addNetwork={addNetwork} />
            )}

            {/* If connected to Metamask */}
            {connected && !networkChanged && (
                <Authenticate
                    loading={loading}
                    successMessage={successMessage}
                    checkMembership={checkMembership}
                    joinDAO={joinDAO}
                    errorMessage={errorMessage}
                    showModal={showModal}
                    closeModal={closeModal}
                />
            )}
            {/* If error from Metamask */}
            {metamaskError && (
                <div className='d-flex flex-column align-items-center justify-content-center'>
                    <h2>{metamaskError}</h2>
                </div>
            )}

        </div>
    );
}

export default Login;
