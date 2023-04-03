export interface IRegisterForm {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface ISignInForm {
  username: string;
  password: string;
}

export interface IForgotPasswordForm {
  username: string;
}

export interface IForgotPasswordSubmitForm {
  code: string;
  username: string;
  password: string;
}

export interface IUserInfo {
  username: string;
  id?: string;
  attributes: {
    email : string;
    email_verified: string;
    sub: string;
  }
}