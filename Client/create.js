var sendRequest = require('./sendRequest');
const payload = {
  action: 'set',
  data: {
        assetID: "123", 
        dateOfManufacture: "6/3/18",
        name:  "jigsaw",	
        status: "1", //Available
        cost: "220000",
        certificate: "Yet to be Certified" 
        }
}
sendRequest(payload);
