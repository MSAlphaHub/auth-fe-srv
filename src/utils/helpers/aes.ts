import CryptoJS from 'crypto-js';
import configs from 'config';

class AESCrypto {
  private secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  /**
   * Encrypt data
   * @param data Value to encrypt (string)
   * @returns Base64 encoded string
   */
  public encrypt(data: string): string {
    return CryptoJS.AES.encrypt(data, this.secretKey).toString();
  }

  /**
   * Decrypt data
   * @param encryptedData Base64 encoded string
   * @returns Original value
   */
  public decrypt(encryptedData: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}

// define aes for QR code
export const AesQRCode = new AESCrypto(configs.aesSecretQRCode as string);
