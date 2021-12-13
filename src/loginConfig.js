let loginConfig = {
  "publicKey": {
    "challenge": "LdeUWFohT0EUZmRv/LbnlAHmitrMRcCvjIJcYPh9QLk=",
    "timeout": 60000,
    "rpId": "main--focused-nobel-332a98.netlify.app",
    "allowCredentials": [
      {
        "type": "public-key",
        "id": "AQsI7DSj/xjEcLlADoxh0YLrvcvkCHnRkGqXK/rW21RahFF5HfD4XOzmHGEVCi7JY1OEK1rITAcf2KnHdf30wBk=",
        transports: ["nfc", "usb", "ble", "nfc", "usb", "ble", "internal"]
      }
    ],
    "extensions": {
      "txAuthSimple": ""
    },
    "userVerification": "discouraged"
  }
}
export {loginConfig};