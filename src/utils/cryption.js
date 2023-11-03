// import { KEYS } from "../Keys";
import CryptoJS from "crypto-js";
const KEYS = { CRYPTOKEY: "34dsa3r" };
function encryptText(originalText) {
  var encryptedText = CryptoJS.AES.encrypt(
    originalText,
    KEYS.CRYPTOKEY
  ).toString();

  return encryptedText;
}

function decryptText(encryptedText) {
  var decryptedText = CryptoJS.AES.decrypt(
    encryptedText,
    KEYS.CRYPTOKEY
  ).toString(CryptoJS.enc.Utf8);

  return decryptedText;
}
export { encryptText, decryptText };
