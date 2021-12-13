
///////// START UTIL FUNCTIONS /////////
// easy way to go from string to ByteArray
const enc = new TextEncoder();

// another function to go from string to ByteArray, but we first encode the
// string as base64 - note the use of the atob() function
// function strToBin(str) {
//     return Uint8Array.from(atob(str), c => c.charCodeAt(0));
// }

// function to encode raw binary to string, which is subsequently
// encoded to base64 - note the use of the btoa() function
// function binToStr(bin) {
//     return btoa(new Uint8Array(bin).reduce(
//         (s, byte) => s + String.fromCharCode(byte), ''
//     ));
// }
const createCreds = () => {
navigator.credentials
  .create({
    publicKey: {
      // random, cryptographically secure, at least 16 bytes
      challenge: enc.encode("<%= challenge %>"),
      // relying party
      rp: {
        name: "Awesome Corp", // sample relying party
      },
      user: {
        id: enc.encode("<%= id %>"),
        name: "<%= name %>",
        displayName: "<%= displayName %>",
      },
      authenticatorSelection: { userVerification: "preferred" },
      attestation: "direct",
      pubKeyCredParams: [
        {
          type: "public-key",
          alg: -7, // "ES256" IANA COSE Algorithms registry
        },
      ],
    },
  })
  .then((res) => {
      console.log('res-->',res)
    // var json = publicKeyCredentialToJSON(res);
    // // Send data to relying party's servers
    // post("/webauthn/register", {
    //   state: "<%= state %>",
    //   provider: "<%= provider %>",
    //   res: JSON.stringify(json),
    // });
  })
  .catch(console.error);
}
const validateCreds = () => {
    navigator.credentials
  .get({
    publicKey: {
      // random, cryptographically secure, at least 16 bytes
      challenge: enc.encode("<%= challenge %>"),
      allowCredentials: [
        {
          id: enc.encode("<%= id %>"),
          type: "public-key",
        },
      ],      
      authenticatorSelection: { userVerification: "preferred" },
      userVerification:'preferred',
      pubKeyCredParams: [
        {
            type: "public-key",
            alg: -7
        }
    ], 
    timeout: 60000
    },
  })
  .then((res) => {
    // var json = publicKeyCredentialToJSON(res);
    // // Send data to relying party's servers
    // post("/webauthn/authenticate", {
    //   state: "<%= state %>",
    //   provider: "<%= provider %>",
    //   res: JSON.stringify(json),
    // });
  })
  .catch((err) => {
    alert("Invalid device ");
  });
}
export { createCreds, validateCreds }