# Introduction 

This project introduces the idea of a system that can be used for all purposes of identity validation across the internet, but even proposing the use of online decentralized systems as a means of which an individual can validate and prove their identities in a real life scenario. The aim is to provide a self-sovereign system not owned by any one entity but rather inter-operable by everyone on the system’s platform. This will help establish security and trust with other third parties with regards to identity validation.

This project’s distributed identity application is a decentralized system that is powered by the Ethereum blockchain hosted by Ganache, which is connected to the application using the Metamask plugin. The blockchain utilises the ledger method, meaning all data transactions made to the blockchain may not be altered, or deleted. If a user wishes to make a change, a new entry with the data must be made. In other words, data cannot be altered or overwritten. This is part of what makes the blockchain safe and secure. The application presents a simple design that avoids complexity and attempts to present the main idea in an uncomplicated and concise manner. It allows the user to connect to the application using their respected account and add personal identification documents, and display the aforementioned documents in a structured manner. It also allows the user to remove the documents and replace them with new ones. This was implemented in the case of a user making an error upon adding information and wishing to correct it, however, just as it was mentioned previously, data may not be altered on the blockchain.


# System Implementation

The application is implemented using Javascript with web3js used as a means of connecting it with Metamask and allowing for asynchronous functions. The site is written in HTML and CSS with bootstrap for some design elements and jQuery used for interactions with the Javascript code. Finally, the smart contract used for storing the document’s data and displaying it, is written in Solidity with Truffle used for compiling the contract and deploying it to the blockchain.

The results present an application capable of the safe storage of user data consisting of documents such as passports or licenses (whether it be a driving license or other types). It allows the addition of said documents on the blockchain in a transaction process that the user pays for with gas (or gwei) . On a none-private blockchain this would be equivalent to currency and the blockchain would have real-time miners but as this is a private one no real cost comes at making such transactions. After the addition of a document(s), the user can choose to display these documents which are retrieved directly from the private blockchain. This is made at no gas cost as data retrieval does not warrant a transaction process. However, should the user wish to make a deletion that would require a cost.
That allows the project to conclude that a decentralized identity system is achievable and can be used as a platform for identification should it be adopted by governing bodies. It encourages and presents the reader with the opportunity to take the project to the next step by improving existing functionality and features, as well as adapting it to a non-private blockchain so it may one day be accepted by Facebook, Google, local gyms, immigration services, and even airports as a form of proof of identity.

Note that this project does not mean to claim that centralized systems are bad or unreliable, but rather stagnant, lack proper adaptability and can pose a risk of unwanted data flow disruption by malicious entities. 



# Directory and Files Breakdown

contracts directory contains the Solidity smart contracts

src contains the client-side code

"package.json" project dependencies such as truffle specific development dependencies, bootstrap, server to run project which allow for the easy installation using 'npm install'

"bs-config.json" to inform the lite-server where all the files are located


# System usage instructions

To begin using the application there are some steps which must be performed in order for the application to function properly. The first step is to navigate to the Ganache folder and either manually run Ganache, or through command line console enter “npm start”. The next step is to navigate to the contracts directory in the command line console, and enter the command “truffle compile” followed by “truffle migrate –reset” to deploy the smart contracts to the blockchain and remove past deployed contracts. The final step is to run the command “npm run dev” which runs the lite server for the web application to run. Which is a server that provides live reloading from the JavaScript Node Package Manager.  Post command execution, the web application will be launched locally allowing the user to interact with its functionality. 
