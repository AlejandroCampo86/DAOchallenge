const express = require('express');
const hre = require("hardhat");
const app = express();

// Middleware to enable CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Example route to fetch all proposals
app.get('/proposals', async (req, res) => {
    try {
        // Connect to the deployed DAO contract
        const DAO = await hre.ethers.getContractFactory("DAO");
        const daoContract = await DAO.attach('0x0c38Cd1f534F2987304B3D613353851c1F43879D');

        // Get the total number of proposals
        const proposalCount = await daoContract.proposalsCount();

        // Fetch each proposal details
        const proposals = [];
        for (let i = 0; i < proposalCount; i++) {
            const proposal = await daoContract.proposals(i);
            proposals.push({
                id: proposal.id.toString(),
                title: proposal.title,
                description: proposal.description,
                deadline: proposal.deadline.toString(),
                minimumVotes: proposal.minimumVotes.toString(),
                votesForA: proposal.votesForA.toString(),
                votesForB: proposal.votesForB.toString(),
                closed: proposal.closed,
                finished: proposal.finished,
            });
        }

        res.json({ proposals });
        console.log({ proposals })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch proposals' });
    }
});

// Example route to create a new proposal
app.post('/proposals', async (req, res) => {
    try {
        const { title, description, deadline, minimumVotes } = req.body;

        // Connect to the deployed DAO contract
        const DAO = await hre.ethers.getContractFactory("DAO");
        const daoContract = await DAO.attach('0x0c38Cd1f534F2987304B3D613353851c1F43879D');

        // Create the proposal
        await daoContract.createProposal(
            title,
            description,
            deadline,
            minimumVotes
        );

        res.json({ message: 'New proposal created' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create a new proposal' });
    }
});

// Example route to submit a vote for a proposal
app.post('/proposals/:id/vote/:vote', async (req, res) => {
    try {
        const proposalId = req.params.id;
        console.log('proposalId ', proposalId)
        const voteOption = req.params.vote;
        console.log('voteOption ', voteOption)

        // Connect to the deployed DAO contract
        const DAO = await hre.ethers.getContractFactory("DAO");
        const daoContract = await DAO.attach('0x0c38Cd1f534F2987304B3D613353851c1F43879D');

        // Submit the vote for the specified proposal
        await daoContract.vote(proposalId, voteOption);

        res.json({ message: `Vote submitted for proposal ${proposalId}, option ${voteOption}` });
    } catch (error) {
        console.error('the error is  ', error);
        res.status(500).json({ error: 'Failed to submit the vote' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
