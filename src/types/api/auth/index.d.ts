declare namespace Types {
  interface ILoginRequest {
    email: string;
    password: string;
    isRememberMe: boolean;
  }
  interface ILoginResultProperty {
    accessToken: string;
    refreshToken: string;
  }
  interface ILoginResponse {
    success: boolean;
    message: string;
    code: number;
    result: ILoginResultProperty;
    timestamp: number;
  }
}
