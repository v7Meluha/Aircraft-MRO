var sendRequest = require('./sendRequest');
const payload = {
  action: 'get',
  data: {
  	     assetID:  "123",
  	     status:"1",
  	     cost:"220000",
  	     name:  "jigsaw",
         certificate: "Yet to be Certified"
	     }
}
sendRequest(payload);
