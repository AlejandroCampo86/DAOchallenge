const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    // Compile the contracts
    await hre.run("compile");

    // Deploy the token contract
    const DAOtoken = await hre.ethers.getContractFactory("DAOtoken");
    const daoToken = await DAOtoken.deploy("DAO_Token", "DAOTKN", 18, 1000000);
    await daoToken.deployed();

    // Deploy the DAO contract and pass the token contract address
    const DAO = await hre.ethers.getContractFactory("DAO");
    const dao = await DAO.deploy(daoToken.address);
    await dao.deployed();

    console.log("DAO contract deployed to:", dao.address);
    console.log("Token contract address:", daoToken.address);
    console.log("Deployer address:", deployer.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
