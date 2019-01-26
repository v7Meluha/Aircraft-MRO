Objective

Create a simple Aircraft MRO system which involving multiple parties with their roles mentioned below using Hyperledger Sawtooth.

Participants
In this system there will be three participants.

    Seller - The user who creates an airplane part and add it to the listing for anyone to purchase.
    Certificate Authority - The entity who verifies the part and attaches a test certificate to it.
    Buyer - The organization who purchases the parts from the buyer which are verified by the CA.

Transactions

    Enroll Asset - The owner/seller creates an asset with the following data.
        Name of the asset
        Date of Manufacturing
        Cost
        OwnerId - Seller’s public key.
        Status
        CertificateURL
    Add certificate - The certificate authority performs this action and does the following to the selected asset.
        Add Certificate URL to asset
        Update status to listed
    Buy - The buyer can buy one specific asset which as the certificate.
        Update the OwnerId to buyer’s public key

What you can expect from us during this task?

    Help in setting up Hyperledger sawtooth network.
    Basics of Sawtooth Lifecycle.
