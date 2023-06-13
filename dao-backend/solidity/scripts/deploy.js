const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    // Compile the contracts
    await hre.run("compile");

    // Deploy the DAO contract 
    const DAO = await hre.ethers.getContractFactory("DAO");
    const dao = await DAO.deploy();
    await dao.deployed();

    console.log("DAO contract deployed to:", dao.address);
    console.log("Deployer address:", deployer.address);

    // Deploy the DAOtoken contract
    const DAOtoken = await hre.ethers.getContractFactory("DAOtoken");
    const daoToken = await DAOtoken.deploy("DAO_Token", "DAOTKN", 18, 1000000, dao.address);
    await daoToken.deployed();

    console.log("Token contract address:", daoToken.address);

    // Set the DAOtoken address in the DAO contract
    await dao.setDAOtoken(daoToken.address);

    console.log("DAO token address set in the DAO contract");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
