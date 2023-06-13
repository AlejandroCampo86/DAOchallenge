import React, { createContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useHistory } from 'react-router-dom';
import { getProposals } from '../services/api';
import DAOABI from '../contracts/DAO.sol/DAO.json';
import DAOtokenABI from '../contracts/DAOtoken.sol/DAOtoken.json';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const history = useHistory();

    const [connected, setConnected] = useState(false);
    const [networkChanged, setNetworkChanged] = useState(false);
    const [proposals, setProposals] = useState([]);
    const [provider, setProvider] = useState(null);
    const [address, setAddress] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [daoContract, setDaoContract] = useState(null);
    const [tokenContract, setTokenContract] = useState(null);
    const [metamaskError, setMetamaskError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isMember, setIsMember] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const networks = {
        polygon: {
            chainId: '0x13881',
            chainName: "Mumbai",
            nativeCurrency: {
                name: "MUMBAI",
                symbol: "MATIC",
                decimals: 18
            },
            rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
            blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
        },
    };

    // Connect to the Polygon Testnet
    const addNetwork = async () => {
        try {
            //not metamask installed
            if (!window.ethereum) throw new Error("No Metamask wallet found. Please install Metamask to proceed");
            //metamask installed
            if (window.ethereum) {
                setNetworkChanged(false);
                //add polygon testnet chain
                await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [{ ...networks['polygon'] }]
                });
                //connect to the site
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                //set provider
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                setProvider(provider);
                //set address of user
                const accounts = await provider.listAccounts();
                const address = accounts[0];
                setAddress(address);
                console.log('user address', address)
                //set network
                const network = await provider.getNetwork();
                console.log('network ', network.name);

                if (network.name === 'maticmum') {
                    setConnected(true);
                    console.log('setConnected ', true)
                } else {
                    console.log('Network is not Mumbai')
                }

                await fetchContracts();
            }
        } catch (err) {
            setMetamaskError(err.message);
        }
    };

    //Instantiate Contracts
    const fetchContracts = async () => {
        //set address
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();
        const address = accounts[0];
        setAddress(address);

        //Instantiate Contracts
        const daoContractAddress = process.env.REACT_APP_DAO_CONTRACT_ADDRESS;
        const daoContract = new ethers.Contract(daoContractAddress, DAOABI.abi, provider.getSigner());
        setDaoContract(daoContract);
        //console.log('daoContract ', daoContract)

        const tokenContractAddress = process.env.REACT_APP_DAO_TOKEN_ADDRESS;
        const tokenContract = new ethers.Contract(tokenContractAddress, DAOtokenABI.abi, provider.getSigner());
        setTokenContract(tokenContract);
        //console.log('tokenContract ', tokenContract)
    };

    // Check if user is member
    const checkMembership = async () => {
        try {
            setLoading(true);
            if (daoContract) {
                const checkMember = await daoContract.isMember(address);
                if (checkMember) {
                    setLoading(false);
                    console.log('isMember:', checkMember);
                    setIsMember(true);
                    history.push('/proposals');

                } else {
                    setLoading(false);
                    console.log('isMember:', checkMember);
                    setIsMember(false);
                    setErrorMessage('We could not retrieve this address as a member of the DAO. Click here to JOIN!.');
                }
            }
        } catch (error) {
            setLoading(false);
            setIsMember(false);
            console.log('Failed to check membership:', error);
        }
    };

    //Join DAO    
    const joinDAO = async () => {
        //if Metamask installed
        if (window.ethereum) {
            try {
                setLoading(true)
                const checkMember = await daoContract.isMember(address);

                //is already a member
                if (checkMember) {
                    setLoading(false)
                    console.log('isMember: ', checkMember)
                    history.push('/proposals');
                    setIsMember(true);
                }
                //is not a member. Proceed with registration
                if (!checkMember) {
                    console.log('isMember: ', checkMember);

                    // Get the current token balance of the new member
                    const tokenBalanceBefore = await tokenContract.balanceOf(address);

                    // Call the joinDAO function in the DAO contract with the client's address
                    const transaction = await daoContract.joinDAO({
                        value: 0,
                        gasLimit: 800000,
                        gasPrice: ethers.utils.parseUnits('150', 'gwei'),
                        nonce: await provider.getTransactionCount(address),
                    });

                    // Wait for the transaction to be confirmed
                    const receipt = await transaction.wait();

                    // Error with metamask?
                    if (receipt.status !== 1) {
                        setLoading(false)
                        setErrorMessage('Failed to join the DAO. Please try again.');
                        return;
                    }

                    // Get the updated token balance of the new member
                    const tokenBalanceAfter = await tokenContract.balanceOf(address);

                    // Calculate the tokens received by the new member
                    const tokensReceived = tokenBalanceAfter.sub(tokenBalanceBefore);

                    console.log('Joined the DAO successfully, tokensReceived ', tokensReceived);
                    setIsMember(true);
                    setLoading(false);
                    setErrorMessage('');

                    // Show a success message to the user
                    setSuccessMessage(`Congratulations! You have joined the DAO and received ${tokensReceived} tokens. Use them wisely!`);
                    setShowModal(true);
                }
            } catch (error) {
                setLoading(false)
                console.error('Failed to join the DAO:', error);
                setErrorMessage('Failed to join the DAO. Please try again. You may need some MATIC tokens to proceed with the transaction. Get some at mumbaifaucet.com!');
            }
        }
    };

    // Send back to Login when Network change
    const networkHasChanged = (chainId) => {
        console.log('network changed ', { chainId });
        setNetworkChanged(true);
        history.push('/');
    };

    //close modal
    const closeModal = () => {
        setShowModal(false);
    };

    //Recognize if Metamask chenged
    useEffect(() => {
        window.ethereum.on("chainChanged", networkHasChanged);
        window.ethereum.on('accountsChanged', networkHasChanged);
        window.ethereum.on('disconnect', networkHasChanged);

        return () => {
            window.ethereum.removeListener("chainChanged", networkHasChanged);
            window.ethereum.on('accountsChanged', networkHasChanged);
            window.ethereum.on('disconnect', networkHasChanged);
        };
    }, []);

    //Fetch the Proposals
    useEffect(() => {
        const fetchProposals = async () => {
            const fetchedProposals = await getProposals();
            setProposals(fetchedProposals.proposals);
        };

        fetchProposals();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                connected,
                metamaskError,
                errorMessage,
                successMessage,
                loading,
                showModal,
                isMember,
                networkChanged,
                proposals,
                provider,
                address,
                daoContract,
                tokenContract,
                setSuccessMessage,
                setShowModal,
                setLoading,
                setNetworkChanged,
                fetchContracts,
                addNetwork,
                checkMembership,
                setProposals,
                joinDAO,
                closeModal,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
