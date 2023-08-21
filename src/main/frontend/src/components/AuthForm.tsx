import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/auth-context";
import useInput from "../hooks/use-input";
import {loginRequest, signupRequest} from "../actions/http-actions";
import classes from "./styles/LoginForm.module.css";
import {API} from "../config";

const AuthForm = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasErrors,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasErrors,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput((value) => value.trim() !== "" && value.length >= 6);

  const formIsValid = isLogin
    ? enteredEmail && enteredPasswordIsValid
    : enteredNameIsValid && enteredEmail && enteredPassword;

  const nameInputClasses = nameInputHasError
    ? `${classes["form-control"]} ${classes.invalid}` //"form-control invalid"
    : `${classes["form-control"]}`; //"form-control";

  const emailInputClasses = emailInputHasErrors
    ? `${classes["form-control"]} ${classes.invalid}` //"form-control invalid"
    : `${classes["form-control"]}`; //"form-control";

  const passwordInputClasses = passwordInputHasErrors
    ? `${classes["form-control"]} ${classes.invalid}` //"form-control invalid"
    : `${classes["form-control"]}`; //"form-control";

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    // send request and redirect
    let url: string;
    let loginRequestBody: {email: string, password: string};
    let signUpRequestBody: {username: string, email: string, password: string};

    setIsLoading(true);
    if (isLogin) {
      url = `${API}/authenticate`;
      loginRequestBody = {
        email: enteredEmail,
        password: enteredPassword,
      };

      
      try {
        const response = await loginRequest(url, loginRequestBody);
        const expirationTime = new Date((+response.expiresIn));
        authCtx.login(response.jwtToken, expirationTime.toISOString());
        navigate('/my-workouts');
        
      } catch (error: any) {
        alert(error.message);
      }


    } else {
      url = `${API}/register`;
      signUpRequestBody = {
        username: enteredName,
        email: enteredEmail,
        password: enteredPassword,
      };

      try {
        const response = await signupRequest(url, signUpRequestBody);
        const expirationTime = new Date((+response.expiresIn));
        authCtx.login(response.jwtToken, expirationTime.toISOString());
        navigate('/workouts');
      } catch (error: any) {
        // Possibly a modual for error messages
      }
    }

    setIsLoading(false);

    resetNameInput();
    resetEmailInput();
    resetPassword();

    
  };

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <div className={classes.wrapper}>
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <div className={classes.formGroup}>
        <form onSubmit={submitHandler} id={classes.theForm}>
          {!isLogin && (
            <div className={nameInputClasses}>
              <label htmlFor="name">Username</label>
              <input
                type="text"
                id="username"
                name="Username"
                value={enteredName}
                onChange={nameChangedHandler}
                onBlur={nameBlurHandler}
              />
            </div>
          )}
          {!isLogin && nameInputHasError && (
            <p className={classes.errorText}>Username must not be empty.</p>
          )}

          <div className={emailInputClasses}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="Email"
              value={enteredEmail}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
            />
          </div>

          {emailInputHasErrors && !isLogin && (
            <p className={classes.errorText}>Invalid Email Address.</p>
          )}
          <div className={passwordInputClasses}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="name"
              name="firstName"
              value={enteredPassword}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
            />
          </div>
          {passwordInputHasErrors && !isLogin && (
            <p className={classes.errorText}>
              password must be at least 6 characters.
            </p>
          )}
          <div className={classes.actions}>
            {!isLoading && (
              <button>{isLogin ? "Login" : "Create Account"}</button>
            )}
            {isLoading && <p>Loading...</p>}
            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
