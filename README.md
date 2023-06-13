READ ME: 

WELCOME TO THE DAO CHALLENGE!

Getting Started:

INSTALATION ///////////////////////////////////////////////////////////

- install dependencies in the front-end
	- daochallenge\dao-frontend> npm install
	(Contract addresses are included in the .env. Remember to change if you decide to deploy a different contract)

- install backend dependencies 
  	- daochallenge\dao-backend> npm install (will install express, axios and dotenv)

- install blockchain dependencies 
	- daochallenge\dao-backend\solidity> npm install (will install hardhat)
	- create a .env file in this folder and include: 
		- PRIVATE_KEY = <Your private keys here> (You can take them from Metamask. this will let you interact with the hardhat 			envirorment using your own credentials)
		- POLYGONSCAN_API_KEY = WJF2CF2PECNBJQASAW5BM18U4A21NNJ97X (just like this)

RUN THE SERVER ///////////////////////////////////////////////////////////

- Run daochallenge\dao-backend\solidity> node server.js (The server is in charge of retrieving the different proposals with all its information)
  
RUN THE CLIENT ///////////////////////////////////////////////////////////

- Run daochallenge\dao-frontend> npm run start (will start React)

RUN THE SCRIPTS ///////////////////////////////////////////////////////////

- Run daochallenge\dao-backend\solidity> npx hardhat run scripts/createProposal.js --network polygon_mumbai (creates a New proposal)
- Run daochallenge\dao-backend\solidity> npx hardhat run deploy.js --network polygon_mumbai (deploys new contracts for DAO and Token)
	- If you decide to deploy new contracts remember to update the addresses in the .env (client side) and replace the .json files 	for the new ABIS in artifacts to the ones in the contracts folder in the frontend

CONTRACTS ///////////////////////////////////////////////////////////
The contract addresses are: 
- DAO contract: 0xBf8926176B5Da17FF470048D65176ca7A16330e3
- DAO_Token (DAOTKN) contract: 0x28e72BaD81e6D1f6fd002708ee2C5e0241C2E231
Go to https://mumbai.polygonscan.com/ to check on the different transactions from the DAO and Token contracts

Enjoy :)
