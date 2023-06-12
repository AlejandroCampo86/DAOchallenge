const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

const title = "tenth Proposal";
const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const deadline = Math.floor(Date.now() / 1000) + 60 * 3600

const minimumVotes = 1;


async function main() {
    const [deployer] = await hre.ethers.getSigners();

    // Deploy the DAO contract
    const DAO = await hre.ethers.getContractFactory("DAO");

    console.log("Deployer address:", deployer.address);

    // Connect to the deployed contract
    const daoContract = await DAO.attach('0xEA6fA9d3c061b0957fDeeE5ec1132Cc730d7b2EB');

    // Create the proposal
    await daoContract.createProposal(
        title,
        description,
        deadline,
        minimumVotes
    );
    console.log("New proposal created.");

    // Wait for 2 seconds for the proposals array to update
    await new Promise((resolve) => setTimeout(resolve, 8000));

    // Save the proposal details to a JSON file
    const proposalCount = await daoContract.proposalsCount();
    console.log('proposalCount ', proposalCount)
    const newProposal = await daoContract.proposals(proposalCount - 1);
    const proposalData = {
        id: newProposal.id.toString(),
        title: newProposal.title,
        description: newProposal.description,
        deadline: newProposal.deadline.toString(),
        minimumVotes: newProposal.minimumVotes.toString(),
        votesForA: newProposal.votesForA.toString(),
        votesForB: newProposal.votesForB.toString(),
        closed: newProposal.closed,
        finished: newProposal.finished,
    };
    const proposalDataPath = path.join(__dirname, "proposal.json");
    fs.writeFileSync(proposalDataPath, JSON.stringify(proposalData, null, 2));

    console.log("Proposal details saved to:", proposalDataPath);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

