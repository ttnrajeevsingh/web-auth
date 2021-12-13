//import axios from "axios";
import { regConfig } from "./registerConfig";
import { loginConfig } from "./loginConfig";
// const apiConstants={
//   API_URL:'https://webauthn.io'
//  }
function detectWebAuthnSupport() {
  if (window.PublicKeyCredential === undefined ||
      typeof window.PublicKeyCredential !== "function") {     
      var errorMessage = "Oh no! This browser doesn't currently support WebAuthn."
      if (window.location.protocol === "http:" && (window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1")){
          errorMessage = "WebAuthn only supports secure connections. For testing over HTTP, you can use the origin \"localhost\"."
      }
      showErrorAlert(errorMessage);
      return;
  }
}
window.onload = ()=>{
  detectWebAuthnSupport();
}
// function string2buffer(str) {
//   return (new Uint8Array(str.length)).map(function (x, i) {
//       return str.charCodeAt(i)
//   });
// }

// Encode an ArrayBuffer into a base64 string.
// function bufferEncode(value) {
//   return window.base64js.fromByteArray(value)
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

var state = {
  createResponse: null,
  publicKeyCredential: null,
  credential: null,
  user: {
      name: "testuser@example.com",
      displayName: "testuser",
  },
}

function setUser(username) {
 // username = $("#input-email").val();
  state.user.name = username.toLowerCase().replace(/\s/g, '');
  state.user.displayName = username.toLowerCase();
}

// function checkUserExists() {
//   $.get('/user/' + state.user.name + '/exists', {}, null, 'json')
//       .done(function (response) {
//           return true;
//       }).catch(function () {
//           return false;
//       });
// }

// function getCredentials() {
//   $.get('/credential/' + state.user.name, {}, null, 'json')
//       .done(function (response) {
//           console.log(response)
//       });
// }
const createCreds = (userName) => {
  document.getElementById('reg').style.pointerEvents='none';
  setUser(userName);
  makeCredential();
}
const validateCreds = (userName) => {
  document.getElementById('login').style.pointerEvents='none';
  setUser(userName);
  getAssertion()
}
function makeCredential() {
 // hideErrorAlert();
  console.log("Fetching options for new credential");
  
  //var credential = null;

  // var attestation_type = ''//$('#select-attestation').find(':selected').val();
  // var authenticator_attachment = ''//$('#select-authenticator').find(':selected').val();
  
  // var user_verification = ''//$('#select-verification').find(':selected').val();
  // var resident_key_requirement = ''//$('#select-residency').find(':selected').val();
  // var txAuthSimple_extension = ''//$('#extension-input').val();
//   axios
//   .get(`${apiConstants.API_URL}('/makeCredential/${state.user.name}`,{
//     attType: attestation_type,
//     authType: authenticator_attachment,
//     userVerification: user_verification,
//     residentKeyRequirement: resident_key_requirement,
//     txAuthExtension: txAuthSimple_extension,
// },{
//     headers: {
//       "Content-Type": "application/json",      
//     },
//   })
//   .then((makeCredentialOptions) => {
  let makeCredentialOptions = regConfig;
    makeCredentialOptions.publicKey.challenge = bufferDecode(makeCredentialOptions.publicKey.challenge);
          makeCredentialOptions.publicKey.user.id = bufferDecode(makeCredentialOptions.publicKey.user.id);
          if (makeCredentialOptions.publicKey.excludeCredentials) {
              for (var i = 0; i < makeCredentialOptions.publicKey.excludeCredentials.length; i++) {
                  makeCredentialOptions.publicKey.excludeCredentials[i].id = bufferDecode(makeCredentialOptions.publicKey.excludeCredentials[i].id);
              }
          }
         // makeCredentialOptions.publicKey.rp.name='localhost';
         // makeCredentialOptions.publicKey.rp.id='localhost'
          console.log("Credential Creation Options");
          console.log(makeCredentialOptions);
          navigator.credentials.create({
              publicKey: makeCredentialOptions.publicKey
          }).then(function (newCredential) {
              console.log("PublicKeyCredential Created");
              console.log(newCredential);
              state.createResponse = newCredential;
              registerNewCredential(newCredential);
          }).catch(function (err) {
              console.info(err);
          });
 // })
}

// This should be used to verify the auth data with the server
function registerNewCredential(newCredential) {
  return;
  // Move data into Arrays incase it is super long
  // let attestationObject = new Uint8Array(newCredential.response.attestationObject);
  // let clientDataJSON = new Uint8Array(newCredential.response.clientDataJSON);
  // let rawId = new Uint8Array(newCredential.rawId);
  // axios
  //   .post(`${apiConstants.API_URL}/makeCredential`, JSON.stringify({
  //     id: newCredential.id,
  //     rawId: bufferEncode(rawId),
  //     type: newCredential.type,
  //     response: {
  //         attestationObject: bufferEncode(attestationObject),
  //         clientDataJSON: bufferEncode(clientDataJSON),
  //     },
  // }), {
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //   })
  //   .then((resp) => {
  //     console.log('registration successfull',resp)
  //   })
  
}

// function addUserErrorMsg(msg) {
//   if (msg === "username") {
//       msg = 'Please add username';
//   } else {
//       msg = 'Please add email';
//   }
//   document.getElementById("user-create-error").innerHTML = msg;
// }

function getAssertion() {

  // axios
  //   .get(`${apiConstants.API_URL}/user/${state.user.name}/exists`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //   .then((resp) => {
  //     var user_verification =''           
  //     var txAuthSimple_extension = '';
  //     axios
  //     .get(`${apiConstants.API_URL}/assertion/${state.user.name}`,{
  //       userVer: user_verification,
  //       txAuthExtension: txAuthSimple_extension
  //   }, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((makeAssertionOptions) => {
    let makeAssertionOptions = loginConfig;
        console.log("Assertion Options:");
        console.log(makeAssertionOptions);
        makeAssertionOptions.publicKey.challenge = bufferDecode(makeAssertionOptions.publicKey.challenge);
        makeAssertionOptions.publicKey.allowCredentials.forEach(function (listItem) {
            listItem.id = bufferDecode(listItem.id)
        });
        console.log(makeAssertionOptions);
       // makeAssertionOptions.publicKey.rpId='localhost'
        
        navigator.credentials.get({
                publicKey: makeAssertionOptions.publicKey
            })
            .then(function (credential) {
                console.log(credential);
                verifyAssertion(credential);
            }).catch(function (err) {
                console.log(err.name);
                showErrorAlert(err.message);
            });
  //     })
      
  //   }).catch(function (error) {
  //     if (!error.exists) {
  //         showErrorAlert("User not found, try registering one first!");
  //     }
  //     return;
  // }); 
  
}

function verifyAssertion(assertedCredential) {
  return;
  // Move data into Arrays incase it is super long
  // console.log('calling verify')
  // let authData = new Uint8Array(assertedCredential.response.authenticatorData);
  // let clientDataJSON = new Uint8Array(assertedCredential.response.clientDataJSON);
  // let rawId = new Uint8Array(assertedCredential.rawId);
  // let sig = new Uint8Array(assertedCredential.response.signature);
  // let userHandle = new Uint8Array(assertedCredential.response.userHandle);
  // axios
  //   .post(`${apiConstants.API_URL}/makeCredential`,  JSON.stringify({
  //     id: assertedCredential.id,
  //     rawId: bufferEncode(rawId),
  //     type: assertedCredential.type,
  //     response: {
  //         authenticatorData: bufferEncode(authData),
  //         clientDataJSON: bufferEncode(clientDataJSON),
  //         signature: bufferEncode(sig),
  //         userHandle: bufferEncode(userHandle),
  //     },
  // }), {
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //   })
  //   .then((resp) => {
  //     console.log('login successfull',resp)
  //   })
 
}

// function setCurrentUser(userResponse) {
//   state.user.name = userResponse.name;
//   state.user.displayName = userResponse.display_name;
// }

function showErrorAlert(msg) {
console.log('err->msg',msg)
}

// function hideErrorAlert() {
//   $("#alert").hide();
// }

// function popoverPlacement(context, source) {
//   if ($(window).width() < 992) {
//       return "bottom"
//   }
//   return "right";
// }

// $(document).ready(function () {
//   $('[data-toggle="popover"]').popover({
//       trigger: 'manual',
//       container: 'body',
//       placement: popoverPlacement
//   })
// })
export { createCreds, validateCreds }