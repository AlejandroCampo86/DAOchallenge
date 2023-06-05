const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    // Deploy the DAO contract
    const DAO = await hre.ethers.getContractFactory("DAO");
    const dao = await DAO.deploy();
    await dao.deployed();

    console.log("DAO contract deployed to:", dao.address);
    console.log("Deployer address:", deployer.address);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

