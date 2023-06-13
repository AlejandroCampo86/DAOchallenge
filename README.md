READ ME: 

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

Enjoy :)
