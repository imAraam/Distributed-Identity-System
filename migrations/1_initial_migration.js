const Migrations = artifacts.require("Migrations");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};

//Migrations used to change the blockchain's state by deploying contracts to the blockchain
//blockchain is like a big database, when smart contract is deployed the state of the blockchain is updated

//files in migration are numbered in order to tell truffle in which order they need to be run in