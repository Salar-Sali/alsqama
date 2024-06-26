import di from "~/bootstrap/di";
import LoginSignupButtonVM from "./login-signup-button-vm";
import { StyledLoginSignupButton } from "./style";

const LoginSignupButton = () => {
  const vm = di.resolve(LoginSignupButtonVM).useVM();

  return <StyledLoginSignupButton vm={vm} />;
};

export default LoginSignupButton;
