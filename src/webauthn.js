const cbor = require('cbor')
function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}
const randomStringFromServer = makeid(16);
const publicKeyCredentialCreationOptions = {
  challenge: Uint8Array.from(
      randomStringFromServer, c => c.charCodeAt(0)),
  rp: {
      name: "Duo Security",
      id: "localhost",
  },
  user: {
      id: Uint8Array.from(
          "UZSL85T9AFC", c => c.charCodeAt(0)),
      name: "lee@webauthn.guide",
      displayName: "Lee",
  },
  pubKeyCredParams: [{alg: -7, type: "public-key"}],
  authenticatorSelection: {
      authenticatorAttachment: "cross-platform",
      userVerification: "preferred"
  },
  
  timeout: 60000,
  attestation: "direct",
  userVerification:'preferred',
};
let credentialId  ='';
const createCreds = () => {
 navigator.credentials.create({
  publicKey: publicKeyCredentialCreationOptions
}).then((credential)=>{
  console.log(credential);

  // decode the clientDataJSON into a utf-8 string
  const utf8Decoder = new TextDecoder('utf-8');
  const decodedClientData = utf8Decoder.decode(
      credential.response.clientDataJSON)
  
  // parse the string as an object
  const clientDataObj = JSON.parse(decodedClientData);
  console.log(clientDataObj);
  
  // note: a CBOR decoder library is needed here.
  const decodedAttestationObj = cbor.decode(
    credential.response.attestationObject);
  
  console.log(decodedAttestationObj);
  const {authData} = decodedAttestationObj;
  
  // get the length of the credential ID
  const dataView = new DataView(
      new ArrayBuffer(2));
  const idLenBytes = authData.slice(53, 55);
  idLenBytes.forEach(
      (value, index) => dataView.setUint8(
          index, value));
  const credentialIdLength = dataView.getUint16();
  
  // get the credential ID
   credentialId = authData.slice(
      55, 55 + credentialIdLength);
  console.log('credentialId',credentialId)
  // get the public key object
  const publicKeyBytes = authData.slice(
      55 + credentialIdLength);
  
  // the publicKeyBytes are encoded again as CBOR
  const publicKeyObject = cbor.decode(
      publicKeyBytes.buffer);
  console.log(publicKeyObject)
});
}
const publicKeyCredentialRequestOptions = {
  challenge: Uint8Array.from(
      randomStringFromServer, c => c.charCodeAt(0)),
  allowCredentials: [{
      id: Uint8Array.from(
        "UZSL85T9AFC", c => c.charCodeAt(0)),
      type: 'public-key',
      transports: ['usb', 'ble', 'nfc'],
  }],
  timeout: 60000,
  userVerification:'preferred',
  authenticatorSelection: { userVerification: "preferred" },
}
const validateCreds = () => {
 navigator.credentials.get({
  publicKey: publicKeyCredentialRequestOptions
}).then((assertion)=>{
  console.log('assertion',assertion)
});
}
export { createCreds, validateCreds }