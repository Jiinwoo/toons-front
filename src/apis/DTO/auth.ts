export interface SignUpRequestDTO {
  email: string;
  password: string;
  username: string;
  phoneNumber: string;
}

export interface SignInRequestDTO {
  email: string;
  password: string;
}

export interface SignInResponseDTO {
  token: string;
}

export interface UpdateUserRequestDTO {
  email: string;
  username: string;
  phoneNumber: string;
}
export interface Token {
  email: string;
  exp: number;
  iat: number;
}

export interface MobileVerificationRequestDTO {
  phoneNumber: string;
}

export interface MobileVerificationCheckDTO
  extends MobileVerificationRequestDTO {
  code: string;
}

export interface UserInfo {
  username: string;
  email: string;
  phoneNumber: string;
}
