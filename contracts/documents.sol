pragma solidity ^0.5.0;

contract Documents { 
	uint public licenseCount = 0; //state variable to keep count of licenses
	uint public passCount = 0;
	
	struct LicenseDetails { //struct of info relating to data found in a license
		uint index;
		string firstName;
		string lastName;
		uint dateOfBirth;
		string docIdNumber;
		uint issueDate;
		uint expiryDate;
		string issuingAuthority;
	}
	
	struct PassDetails { 
		uint passIndex;
		string firstName;
		string lastName;
		uint dateOfBirth;
		string docIdNumber;
		uint issueDate;
		uint expiryDate;
		string issuingAuthority;
	}
	
	
	//store data on the blockchain using mapping (similar to hashing)
	mapping(uint => LicenseDetails) public licenses;
	/*Design note: currently there can only exist 1 license and 1 passport on the blockchain. However it is stored using mapping
    as a person may have more than 1 license (English and Swedish driving licenses for example) and more than 1 passport. That 
	is why they are stored in such a manner, to allow for easier adjustment in the future.*/
	mapping(uint => PassDetails) public passports;
	
	
	function createNewLicense(uint _i, string memory _firstName, string memory _lastName, uint _dateOfBirth, string memory _docIdNumber, uint _issueDate, uint _expiryDate, string memory _issuingAuthority) public {
		licenseCount ++;
		licenses[licenseCount] = LicenseDetails(_i, _firstName, _lastName, _dateOfBirth, _docIdNumber, _issueDate, _expiryDate, _issuingAuthority);
	}
	
	function createNewPass(uint _i, string memory _firstName, string memory _lastName, uint _dateOfBirth, string memory _docIdNumber, uint _issueDate, uint _expiryDate, string memory _issuingAuthority) public 
	{
		passCount++;
	    passports[passCount] = PassDetails(_i, _firstName, _lastName, _dateOfBirth, _docIdNumber, _issueDate, _expiryDate, _issuingAuthority);
	}
	
	
	function deleteLicense(uint _id) public {
		delete licenses[_id]; //must find workaround as this does not resize array but instead deletes element and converts to 0 bytes
		//example: was = {aram, albaradie, 123456, 92} | after delete = {aram, albaradie, 0, 92}
		
		licenseCount--; //Controls the number of licenses after deletion, can be removed after support for multiple licenses is introduced
		licenses[_id].index = 1; /*This is necessary as deletion in Solidity does not nullify element but instead sets it to 0 which causes an error
		when trying to locate license information using index*/
	}
	
	function deletePassport(uint _id) public {
		delete passports[_id]; 
		passCount--;
		passports[_id].passIndex = 1;
	}
	
	//add function to allow owner to view all their available documents and choose one to display contents -----------------------------
}

//Add more documents such as diploma, id card etc