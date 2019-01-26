var sendRequest = require('./sendRequest');
const payload = {
  action: 'update',
  data:
  	{
  	assetID: "123",
  	certificate: "https://static1.squarespace.com/static/568c49565a56689becb3c612/t/58c165a0ebbd1a9d3cd7cd75/1489170444809/" //certificate to be updated
 	}
}
sendRequest(payload);
