declare namespace Types {
  interface ILoginRequest {
    email: string;
    password: string;
    isRememberMe?: boolean;
  }
  interface IUser {
    id: string;
    email: string;
    user_name: string;
    first_name: string;
    last_name: string;
    status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'; // Adjust based on possible status values
    date_of_birth: string; // ISO 8601 date string
    phone: string;
    last_login_date: string | null; // Nullable
    is_deleted: boolean;
    created_at: string; // ISO 8601 date string
    updated_at: string; // ISO 8601 date string
  }

  interface IToken {
    token: string;
    expires: string; // ISO 8601 date string
  }

  interface ITokens {
    access: IToken;
    refresh: IToken;
  }

  interface IUserWithTokens {
    user: User;
    tokens: Tokens;
  }

  interface ILoginDataResponse {
    user: IUser;
    tokens: ITokens;
  }

  interface ILoginResponse {
    success: boolean;
    message: string;
    code: number;
    data: ILoginDataResponse;
    timestamp: number;
  }
}
