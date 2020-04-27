contracts directory contains the Solidity smart contracts

src contains the client-side code

"truffle-config.js" to specifiy personal blockchain network we want to set up

"package.json" project dependencies such as truffle specific development dependencies, bootstrap, server to run project which allow for the easy installation using 'npm install'

"Migrations.sol" in contracts dir

"1_initial_migrations.js"
"2_deploy_contracts.js"
Files are numbered to inform truffle in what order to run them, these files are migrations. They change the state of the blockchain.
Using "truffle migrate" the contracts can be migrated to the blockchain.

"bs-config.json" to inform the lite-server where all the files are located


------------------
Usage instructions:

-npm start (to run ganache) (in ganache folder)

-truffle compile (to compile contracts in New folder)
-truffle migrate --reset (to deploy smart contract to blockchain and remove past deployed contracts)
-truffle console (to access asynchronous actions)
	-variable = await contractName.deployed()
	-calling 'variable' shows result of smart contract
	-variable.address (returns address of contract)
	-"NewVariable = await variable.DataStructureName(x)" => "NewVariable" returns values of element x in data structure

-npm run dev (to run lite-server)
-open console to debug
-pass is 55********
