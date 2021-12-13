import { regConfig } from './registerConfig';
import { loginConfig } from './loginConfig';
// function string2buffer(str) {
//   return (new Uint8Array(str.length)).map(function (x, i) {
//       return str.charCodeAt(i)
//   });
// }

// Encode an ArrayBuffer into a base64 string.
// function bufferEncode(value) {
//   return base64js.fromByteArray(value)
//       .replace(/\+/g, "-")
//       .replace(/\//g, "_")
//       .replace(/=/g, "");
// }

// Don't drop any blanks
// decode
function bufferDecode(value) {
  return Uint8Array.from(atob(value), c => c.charCodeAt(0));
}

// function buffer2string(buf) {
//   let str = "";
//   if (!(buf.constructor === Uint8Array)) {
//       buf = new Uint8Array(buf);
//   }
//   buf.map(function (x) {
//       return str += String.fromCharCode(x)
//   });
//   return str;
// }

// function makeid(length) {
//   var result           = '';
//   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   var charactersLength = characters.length;
//   for ( var i = 0; i < length; i++ ) {
//     result += characters.charAt(Math.floor(Math.random() * 
// charactersLength));
//  }
//  return result;
// }
// const randomStringFromServer = makeid(16);
// const publicKeyCredentialCreationOptions = {
//   challenge: Uint8Array.from(
//       randomStringFromServer, c => c.charCodeAt(0)),
//   rp: {
//       name: "Duo Security",
//       id: "localhost",
//   },
//   user: {
//       id: Uint8Array.from(
//           "UZSL85T9AFC", c => c.charCodeAt(0)),
//       name: "lee@webauthn.guide",
//       displayName: "Lee",
//   },
//   pubKeyCredParams: [{alg: -7, type: "public-key"}],
//   authenticatorSelection: {
//       authenticatorAttachment: "cross-platform",
//       userVerification: "preferred"
//   },
  
//   timeout: 60000,
//   attestation: "direct",
//   userVerification:'preferred',
// };
// let credentialId  ='';
var state = {
  createResponse: null,
  publicKeyCredential: null,
  credential: null,
  user: {
      name: "testuser@example.com",
      displayName: "testuser",
  },
}
const createCreds = () => {
  let makeCredentialOptions = regConfig;
  makeCredentialOptions.publicKey.challenge = bufferDecode(makeCredentialOptions.publicKey.challenge);
          makeCredentialOptions.publicKey.user.id = bufferDecode(makeCredentialOptions.publicKey.user.id);
          if (makeCredentialOptions.publicKey.excludeCredentials) {
              for (var i = 0; i < makeCredentialOptions.publicKey.excludeCredentials.length; i++) {
                  makeCredentialOptions.publicKey.excludeCredentials[i].id = bufferDecode(makeCredentialOptions.publicKey.excludeCredentials[i].id);
              }
          }
          console.log("Credential Creation Options");
          console.log(makeCredentialOptions);
          navigator.credentials.create({
              publicKey: makeCredentialOptions.publicKey
          }).then(function (newCredential) {
              console.log("PublicKeyCredential Created");
              console.log(newCredential);
              state.createResponse = newCredential;
             // registerNewCredential(newCredential);
          }).catch(function (err) {
              console.info(err);
          });
}

const validateCreds = () => {
  let makeAssertionOptions = loginConfig;
  makeAssertionOptions.publicKey.challenge = bufferDecode(makeAssertionOptions.publicKey.challenge);
  makeAssertionOptions.publicKey.allowCredentials.forEach(function (listItem) {
      listItem.id = bufferDecode(listItem.id)
  });
  console.log(makeAssertionOptions);
  navigator.credentials.get({
          publicKey: makeAssertionOptions.publicKey
      })
      .then(function (credential) {
          console.log(credential);
          //verifyAssertion(credential);
      }).catch(function (err) {
          console.log(err.name);
         // showErrorAlert(err.message);
      });
}
export { createCreds, validateCreds }