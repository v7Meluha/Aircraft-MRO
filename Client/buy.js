var sendRequest = require('./sendRequest');
const payload = {
  action: 'buy',
  data: {
 		assetID: "123"
   		}
}
sendRequest(payload);
