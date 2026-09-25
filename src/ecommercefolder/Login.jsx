import { NavLink } from "react-router-dom";
import ButtonComponent from "../components/ButtonComponent";
import { InputComponent } from "../components/InputComponent";
import "./styles.css";
export function Login() {
  return (
    <div className="bg-wrap">
      <div className="login-page">
        <div className="login-side-cover">
          <div className="quote">
            <p className="quote-para">
              "Bought three things in a year. Still use all three every day."
            </p>
            <div className="quote-who">— A Fieldstore customer</div>
          </div>
        </div>
        <div className="login-form-outer">
          <div className="login-form">
            <h1 className="login-head">Wellcome back</h1>
            <div className="login-desciption">
              Log in to check your orders and saved items.
            </div>
            <div className="input-field">
              <label>Email</label>
              <InputComponent placeholder={"name@email.com"} />
            </div>
            <div className="input-field">
              <label>Password</label>
              <InputComponent placeholder={"********"} />
            </div>
            <ButtonComponent variant="primaryFullWidth">Log in</ButtonComponent>
            <div className="create-login">New here? <NavLink to="/signup">Create an account</NavLink></div>
          </div>
        </div>
      </div>
    </div>
  );
}
