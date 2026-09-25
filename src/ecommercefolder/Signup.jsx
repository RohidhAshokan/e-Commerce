import { NavLink } from "react-router-dom";
import ButtonComponent from "../components/ButtonComponent";
import { InputComponent } from "../components/InputComponent";
import "./styles.css";
export function Signup() {
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
            <h2 className="login-head">Create Your Account</h2>
            <div className="login-desciption">
              Sign up to check your orders and saved items.
            </div>
            <div className="input-field">
              <label>Email</label>
              <InputComponent placeholder={"name@email.com"} />
            </div>
            <div className="input-field">
              <label>Phone number</label>
              <InputComponent placeholder={"1234567890"} />
            </div>
            <div className="input-field">
              <label>Password</label>
              <InputComponent placeholder={"********"} />
            </div>
            <div className="input-field">
              <label>Re-Enter Password</label>
              <InputComponent placeholder={"********"} />
            </div>
            <ButtonComponent variant="primaryFullWidth">Sign up</ButtonComponent>
            <div className="create-login">Already Exist? <NavLink to="/login">Log in</NavLink></div>
          </div>
        </div>
      </div>
    </div>
  );
}
