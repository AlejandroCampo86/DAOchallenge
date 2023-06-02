// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
    // Get the contract instance
    const [deployer] = await ethers.getSigners();
    const DAO = await hre.ethers.getContractFactory("DAO");
    const dao = await DAO.deploy();

    await dao.deployed();

    console.log('DAO contract deployed to:', dao.address);
    console.log('Deployer address:', deployer.address);

    // Create a new proposal
    const title = 'Example Proposal';
    const description = 'This is an example proposal';
    const deadline = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
    const minimumVotes = 10;
    const optionA = 'Option A';
    const optionB = 'Option B';

    // Connect to the deployed contract
    const daoContract = await DAO.attach(dao.address);

    // Create the proposal
    await daoContract.createProposal(title, description, deadline, minimumVotes);
    console.log('New proposal created.');

    // Get the proposal count
    const proposalCount = await daoContract.proposalsCount();
    console.log('Total proposals:', proposalCount.toString());

    // Get the newly created proposal details
    const newProposal = await daoContract.proposals(proposalCount);
    console.log('New proposal details:', newProposal);

    // Vote on the proposal
    const voteOption = 0; // Vote for option A
    await daoContract.vote(proposalCount, voteOption);
    console.log('Vote submitted.');

    // Check the vote count for option A
    const votesForA = await daoContract.votesForA(proposalCount);
    console.log('Votes for Option A:', votesForA.toString());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
