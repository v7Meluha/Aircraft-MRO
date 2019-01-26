const { TransactionHandler } = require('sawtooth-sdk/processor/handler')
const { InvalidTransaction, InternalError } = require('sawtooth-sdk/processor/exceptions')
const cbor = require('cbor')
const SimpleStoreState = require('./state');
var { TP_FAMILY, TP_NAMESPACE } = require("./constants");

class SimpleStoreHandler extends TransactionHandler 
{
  constructor()
  {
   super(TP_FAMILY, ['1.0'], [TP_NAMESPACE])
  }

  apply(transactionProcessRequest, context)
  {
  let payload = cbor.decode(transactionProcessRequest.payload);
  let header = transactionProcessRequest.header;
  let publicKey = header.signerPublicKey;
  //console.log("Handler publicKey:"+publicKey)
  let simpleStoreState = new SimpleStoreState(context, publicKey);

   if (payload.action === 'get')
    {
     return simpleStoreState.getAssetDetails(payload.data)
    } 

    else  if (payload.action === 'set') 
    {
       return simpleStoreState.createAsset(payload.data)
    }

    else if(payload.action==='update')
    {
        return simpleStoreState.addCertificate(payload.data) 
    }
      
    else if (payload.action=='buy')
    {
      return simpleStoreState.buyAsset(payload.data)
    }

    else 
    {
      throw  new InvalidTransaction(`Action must be create, delete, or take not ${payload.action}`)
    }
  }

}

module.exports = SimpleStoreHandler;
