declare namespace Types {
  export interface ILoginQRCode {
    currentSocketID: string;
    targetSocketID: string;
    deviceInformation: string;
  }

  export interface IConfirmLoginQRCode {
    targetSocketID: string;
    accessToken: string;
  }

  export interface ILoginQRCodeSuccess {
    tokens: {
      access: {
        token: string;
        expires: Date;
      };
      refresh: {
        token: string;
        expires: Date;
      };
    };
  }
}
