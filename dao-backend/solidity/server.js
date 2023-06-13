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

// Middleware to parse JSON bodies
app.use(express.json());

// fetch all proposals
app.get('/proposals', async (req, res) => {
    try {
        // Connect to the deployed DAO contract
        const DAO = await hre.ethers.getContractFactory("DAO");
        const daoContract = await DAO.attach('0xBf8926176B5Da17FF470048D65176ca7A16330e3');

        // Get the total number of proposals
        const proposalCount = await daoContract.proposalsCount();

        // Check Proposal status
        await daoContract.proposalsStatus();

        // Fetch each proposal details and calculate votes
        const proposals = [];
        for (let i = 0; i < proposalCount; i++) {
            const proposal = await daoContract.proposals(i);

            let winningOption = null;
            let quorum = false;

            if (proposal.isClosed) {
                const votesForA = Number(proposal.votesForA.toString());
                const votesForB = Number(proposal.votesForB.toString());
                const minimumVotes = Number(proposal.minimumVotes.toString());



                if (votesForA + votesForB >= minimumVotes) {
                    quorum = true;
                    if (votesForA > votesForB) {
                        winningOption = 'A';
                    } else if (votesForA < votesForB) {
                        winningOption = 'B';
                    } else {
                        winningOption = 'Tie';
                    }
                } else {
                    quorum = false
                }
                console.log('votesForA ', votesForA)
                console.log('votesForB ', votesForB)
                console.log('minimumVotes ', minimumVotes)
            }


            const isClosed = () => {
                const deadlineInMillis = Number(proposal.deadline.toString()) * 1000;
                const hasClosed = Date.now() >= deadlineInMillis;
                return hasClosed;
            }

            proposals.push({
                id: proposal.id.toString(),
                title: proposal.title,
                description: proposal.description,
                deadline: proposal.deadline.toString(),
                minimumVotes: proposal.minimumVotes.toString(),
                votesForA: proposal.votesForA.toString(),
                votesForB: proposal.votesForB.toString(),
                closed: isClosed(),
                finished: proposal.finished,
                winningOption: winningOption,
                quorum: quorum,
            });
        }

        res.json({ proposals });
        console.log({ proposals });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch proposals' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
