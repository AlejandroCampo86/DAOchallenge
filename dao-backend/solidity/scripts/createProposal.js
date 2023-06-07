const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

const title = "sixth Proposal";
const description = "This is the sixth proposal";
const deadline = Math.floor(Date.now() / 1000) + 360
const minimumVotes = 10;


async function main() {
    const [deployer] = await hre.ethers.getSigners();

    // Deploy the DAO contract
    const DAO = await hre.ethers.getContractFactory("DAO");

    console.log("Deployer address:", deployer.address);

    // Connect to the deployed contract
    const daoContract = await DAO.attach('0xeFf28f5Dd79b919B6924daFe2125f4c6E71Acf22');

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

