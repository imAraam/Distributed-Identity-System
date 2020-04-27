//App layout inspiration in addition to account/contract loading and rendering functions structure from
//https://github.com/dappuniversity/eth-todo-list
App = {
  loading: false,
  contracts: {},

  load: async () => {
    await App.getWeb3()
    await App.loadAccount()
	await App.loadContract()
	await App.renderAcc()
  },

  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  //Following taken from above link
  
  /*To avoid malicious websites using the injected ethereum webprovider to view the user's address.
  This will request user's access to user accounts which the user can accept or deny.*/
  getWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
            // Acccounts now exposed
            web3.eth.sendTransaction({/* ... */});
        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */});
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  loadAccount: async () => {
    // Set the current blockchain account
    App.account = web3.eth.accounts[0]
  },

  loadContract: async () => {
    // Create a JavaScript version of the solidity contracts file
    const project = await $.getJSON('Documents.json')
	App.contracts.Documents = TruffleContract(project)
    App.contracts.Documents.setProvider(App.web3Provider)

    // Hydrate the smart contract with values from the blockchain
    App.docs = await App.contracts.Documents.deployed()//deployed() used instead of having to retrieve contract address and abi
  },
  
  renderAcc: async () => {
    // Prevent double render
    if (App.loading) {
      return
    }

    // Update app loading state
    App.setLoading(true)

    // Render Account
    $('#account').html(App.account)

    // Update loading state
    App.setLoading(false)
  },

  loadPassport: async () => {

    // Render Docs
    await App.renderPass()
	$(".passContainer").show(); //show the passport details
	$("#btnPass").hide(); //hide the display passport button
	$("#btnLicense").show(); //show the display license button
	$(".licenseContainer").hide(); //hide the license details
  },
  
  renderPass: async () => {
	  
    const $docTemplate = $('.passDoc') //div containing the pass info
	
	$('#passList').empty() //clears the previous details stored in the html (to avoid multiple elements being cluttered up together)
	
	const documents = await App.docs.passports(1)
	
	//Checks to see if elements in the array exist, if not proceeds to show empty Passport
	if (documents[1] == '')//This is used to avoid displaying the base unix date (1 January 1970) on empty dates in the document
	{
		const $newDocTemplate = $docTemplate.clone()
		$newDocTemplate.find('.docType').html('Passport')
		$('#passList').append($newDocTemplate)
		$newDocTemplate.show() //shows the document		
	}
	else
	{		
		const docType = 'Passport'
		const firstName = documents[1] //get first name element at position 1 of the array
		const surname = documents[2]
		const dob = documents[3]
		const dateOfBirth = App.getDate(dob)
		
		const documentIdNumber = documents[4]
		const iDate = documents[5]
		const issueDate = App.getDate(iDate)
		
		const eDate = documents[6]
		const expiryDate = App.getDate(eDate)
		
		const issuingAuthority = documents[7]


		// Create the html for the doc
		const $newDocTemplate = $docTemplate.clone()
		$newDocTemplate.find('.docType').html(docType)
		$newDocTemplate.find('.firstName').html(firstName)
		$newDocTemplate.find('.surname').html(surname)
		$newDocTemplate.find('.dateOfBirth').html(dateOfBirth)
		$newDocTemplate.find('.documentIdNumber').html(documentIdNumber)
		$newDocTemplate.find('.issueDate').html(issueDate)
		$newDocTemplate.find('.expiryDate').html(expiryDate)
		$newDocTemplate.find('.issuingAuthority').html(issuingAuthority)
		
		$('#passList').append($newDocTemplate)

		$newDocTemplate.show()
	}
	
	
  },
  
  
  makePassportDeletion: async () => {
	  
	  await App.docs.deletePassport(1)//call deletePassport func from contract  
	  window.location.reload()	  
  },
  
  loadLicense: async () => {

    // Render Docs
    await App.renderLicense()
	$("#btnLicense").hide();
	$(".passContainer").hide();
	
	$("#btnPass").css({"position": "relative", "top": "400%"});
	$("#btnPass").show();
	$(".licenseContainer").show();
  },
  
  renderLicense: async () => {
	  
    const $docTemplate = $('.licenseDoc') 
	
	$('#licenseList').empty()
	
	const documents = await App.docs.licenses(1)
	console.log(typeof documents[1]);
	
	if (documents[1] == '')
	{
		const $newDocTemplate = $docTemplate.clone()
		$newDocTemplate.find('.docType').html('License')
		$('#licenseList').append($newDocTemplate)
		$newDocTemplate.show() 		
	}
	else
	{		
		const docType = 'License'
		const firstName = documents[1]
		const surname = documents[2]
		const dob = documents[3]
		const dateOfBirth = App.getDate(dob)
		
		const documentIdNumber = documents[4]
		const iDate = documents[5]
		const issueDate = App.getDate(iDate)
		
		const eDate = documents[6]
		const expiryDate = App.getDate(eDate)
		
		const issuingAuthority = documents[7]


		const $newDocTemplate = $docTemplate.clone()
		$newDocTemplate.find('.docType').html(docType)
		$newDocTemplate.find('.firstName').html(firstName)
		$newDocTemplate.find('.surname').html(surname)
		$newDocTemplate.find('.dateOfBirth').html(dateOfBirth)
		$newDocTemplate.find('.documentIdNumber').html(documentIdNumber)
		$newDocTemplate.find('.issueDate').html(issueDate)
		$newDocTemplate.find('.expiryDate').html(expiryDate)
		$newDocTemplate.find('.issuingAuthority').html(issuingAuthority)
		
		$('#licenseList').append($newDocTemplate)

		$newDocTemplate.show()
	}
  },
  
  makeLicenseDeletion: async () => {
	  
	  await App.docs.deleteLicense(1) 
	  window.location.reload()
  },
  
  convertToUnix(date) { //converting normal date input into unix timestamp to store as variables in solidity
	  
	  let unixDate = (new Date(date).getTime())
	  let unixTime = unixDate / 1000
	  
	  return unixTime;
  },
  
  getDate(unixTime) { //function to get human readable date format from unix time
	  
	  const ms = unixTime * 1000
	  const d = new Date(ms)
	  const date = d.toLocaleString("en-US", {year: 'numeric', month: 'long', day: 'numeric' })
	  
	  return date;
  },

  createDoc: async () => {
    App.setLoading(true)
	
	
	if (document.getElementById('passport').checked) //if radio button passport is checked
	{ 
		$(".errorCont").hide();
		const document = await App.docs.passports(1)
		if (document[1] != '')//if value in the array is not empty (note that array elements can't be checked for null as deletion does not make them null)
		{
			$("#loader").hide();
			$(".errorCont").show(); //show error that document already exists
		}
		else
		{
			const firstName = $('#newDoc1').val()
			const surname = $('#newDoc2').val()
			const dob = $('#newDoc3').val()
			let dateOfBirth = App.convertToUnix(dob)
			
			const docIdNumber = $('#newDoc4').val()
			const iDate = $('#newDoc5').val()
			let issueDate = App.convertToUnix(iDate)
			
			const eDate = $('#newDoc6').val()
			let expiryDate = App.convertToUnix(eDate)
			
			const issuingAuthority = $('#newDoc7').val()
			
			await App.docs.createNewPass(1, firstName, surname, dateOfBirth, docIdNumber, issueDate, expiryDate, issuingAuthority) //Always inserts new passport at index '1'
			window.location.reload() 
		} 
	}
	else if (document.getElementById('license').checked)
	{
		$(".errorCont").hide();
		const document = await App.docs.licenses(1)
		if (document[1] != '')
		{
			$("#loader").hide();
			$(".errorCont").show();
		}
		else
		{
			const firstName = $('#newDoc1').val()
			const surname = $('#newDoc2').val()
			const dob = $('#newDoc3').val()
			let dateOfBirth = App.convertToUnix(dob)
			
			const docIdNumber = $('#newDoc4').val()
			const iDate = $('#newDoc5').val()
			let issueDate = App.convertToUnix(iDate)
			
			const eDate = $('#newDoc6').val()
			let expiryDate = App.convertToUnix(eDate)
			
			const issuingAuthority = $('#newDoc7').val()
			
			await App.docs.createNewLicense(1, firstName, surname, dateOfBirth, docIdNumber, issueDate, expiryDate, issuingAuthority) //Always inserts new passport at index '1'
			window.location.reload()
			console.log(document[1]);
		} 
	} 
    
  },

  setLoading: (boolean) => {
    App.loading = boolean
    if (boolean) {
      $('#loader').show()
      $('#content').hide()
    } else {
      $('#loader').hide()
      $('#content').show()
    }
  }
}

$(() => {
  $(window).load(() => {
    App.load()
  })
})