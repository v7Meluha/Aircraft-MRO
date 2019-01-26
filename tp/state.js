var {
    _hash
} = require("./lib");
var {
    TP_NAMESPACE
} = require("./constants");

class SimpelStoreState {
    constructor(context, publicKey) {
        this.context = context;
        this.timeout = 500;
        this.stateEntries = {};
        this.publicKey = publicKey;
        //console.log(publicKey);  
    }

    createAsset(data) {
        var address = makeAddress(data.assetID);
        var asset;

        return this.context.getState([address], this.timeout) //gets state entries of given address ie record 
            .then(function(stateEntries) { //then perform
                return stateEntries[address]; //return this set of data given in address
            }.bind(this))
            .then(function(dataDb) {
                var dataString = dataDb.toString();
                if (dataString.length == 0) {
                    var stateEntriesSend = {};
                    data.ownerId = this.publicKey;
                    console.log("data.ownerId: " + data.ownerId);
                } else {
                    throw new Error("Asset already exists");
                }
                stateEntriesSend[address] = Buffer.from(JSON.stringify(data));
                return this.context.setState(stateEntriesSend, this.timeout);
            }.bind(this))
            .then(function(result) {
                console.log("Success", result)
                console.log("\n \n ASSET CREATED.........\n")
            }.bind(this))
            .catch(function(error) {
                console.error(error)
            })
    }

    getAssetDetails(data) {
        var address = makeAddress(data.assetID);
        var asset;
        return this.context.getState([address], this.timeout) //gets state entries of given address ie record 
            .then(function(stateEntries) { //then perform
                return stateEntries[address]; //return this set of data given in address
            }.bind(this))

            .then(function(dataDb) {
                var dataString = dataDb.toString();
                if (dataString.length != 0) {
                    return this.context.getState([address], this.timeout)
                } else
                    throw new Error("Record does not Exist")
            }.bind(this))
            .then(function(stateEntries) {
                Object.assign(this.stateEntries, stateEntries);
                console.log(this.stateEntries[address].toString())
                return this.stateEntries;
            }.bind(this))
            .catch(function(error) {
                console.error(error)
            })
    }


    addCertificate(data) {
        var id = data.assetID;
        var address = makeAddress(id);
        var asset;
        //following is for asynch functions that are long to execute and hence a series of consecutive 'then' functions are used 
        return this.context.getState([address], this.timeout) //gets state entries of given address ie record 
            .then(function(stateEntries) { //then perform
                Object.assign(this.stateEntries, stateEntries);
                return stateEntries[address]; //return this set of records given in address
            }.bind(this))
            .then(function(dataDb) {
                var dataString = dataDb.toString();
                if (dataString.length != 0) {
                    asset = JSON.parse(dataDb.toString());
                    if (asset.status === '1') {
                        asset.status = '2';
                        asset.certificate = data.certificate;
                        console.log("\n\nAsset details after updation:" + JSON.stringify(asset) + "\n");
                    } else if (asset.status == '2' || asset.status == '3') {
                        throw new Error("Certificate updated already");
                    }
                    var stateEntriesSend = {};
                    stateEntriesSend[address] = Buffer.from(JSON.stringify(asset));
                    return this.context.setState(stateEntriesSend, this.timeout)
                }
            }.bind(this))
            .then(function(result) {
                console.log(result)
            }.bind(this))
            .catch(function(error) {
                console.error(error)
            })
    }

    buyAsset(data) {
        var id = data.assetID;
        var address = makeAddress(id);
        var asset;
        //console.log(JSON.stringify(data)+"\n"); 
        return this.context.getState([address], this.timeout)
            .then(function(stateEntries) {
                Object.assign(this.stateEntries, stateEntries);
                return stateEntries[address];
            }.bind(this))
            .then(function(dataDb) {
                var dataString = dataDb.toString();
                if (dataString.length != 0) {
                    asset = JSON.parse(dataDb.toString());
                    if (asset.status === '2') {
                        asset.status = "3";
                        asset.ownerId = this.publicKey;
                        console.log("\n\nasset status:" + asset.status);
                        console.log("\n\nasset owner:" + asset.ownerId);
                    } else if (asset.status == '1') {
                        throw new Error("Asset not certified");
                    } else if (asset.status == '3') {
                        throw new Error("Asset sold!")
                    }
                    var stateEntriesSend = {};
                    stateEntriesSend[address] = Buffer.from(JSON.stringify(asset));
                    return this.context.setState(stateEntriesSend, this.timeout);
                }
            }.bind(this))
            .then(function(result) {
                console.log("Result: ", result)
            }.bind(this))
            .catch(function(error) {
                console.error(error)
            })
    }
}




const makeAddress = (x, label) => TP_NAMESPACE + _hash(x)

module.exports = SimpelStoreState;