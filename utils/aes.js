const CryptoJS = require("crypto-js");
//封装aes加密方法
export function encrypt(text) {
  const key = CryptoJS.enc.Utf8.parse("bGvnMc62sh5RV6zP"); // 固定16位密钥
  const iv = CryptoJS.enc.Utf8.parse("1eZ43DLcYtV2xb3Y");  // 固定16位向量
  const encrypted = CryptoJS.AES.encrypt(text, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}