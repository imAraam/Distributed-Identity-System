# Introduction 
This project introduces the idea of a system that can be used for all purposes of identity validation across the internet, but even proposing the use of online decentralized systems as a means of which an individual can validate and prove their identities in a real life scenario. The aim is to provide a self-sovereign system not owned by any one entity but rather inter-operable by everyone on the system’s platform. This will help establish security and trust with other third parties with regards to identity validation.

The project’s application does not intend to be instantly adopted as the new means for identifying individuals, but instead intends to show that the idea of a decentralized system being implemented that allows identity validation is a very possible alternative to a centralized one. It intends to show that a decentralized system has many advantages over a centralized one, the main advantages being that it provides safety and security to its users while allowing their identities to be managed by them and not external entities.

This project’s distributed identity application is a decentralized system that is powered by the Ethereum blockchain hosted by Ganache, which is connected to the application using the Metamask plugin. The blockchain utilises the ledger method, meaning all data transactions made to the blockchain may not be altered, or deleted. If a user wishes to make a change, a new entry with the data must be made. In other words, data cannot be altered or overwritten. This is part of what makes the blockchain safe and secure. The application presents a simple design that avoids complexity and attempts to present the main idea in an uncomplicated and concise manner. It allows the user to connect to the application using their respected account and add personal identification documents, and display the aforementioned documents in a structured manner. It also allows the user to remove the documents and replace them with new ones. This was implemented in the case of a user making an error upon adding information and wishing to correct it, however, just as it was mentioned previously, data may not be altered on the blockchain.


# Directory and Files Breakdown

contracts directory contains the Solidity smart contracts

src contains the client-side code

"package.json" project dependencies such as truffle specific development dependencies, bootstrap, server to run project which allow for the easy installation using 'npm install'

"bs-config.json" to inform the lite-server where all the files are located
