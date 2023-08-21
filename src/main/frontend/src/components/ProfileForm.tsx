import React, {useRef, useContext} from 'react';
import { AuthContext } from '../store/auth-context';
import { useNavigate } from 'react-router-dom';
import classes from './styles/ProfileForm.module.css';
import { API } from '../config';

const ProfileForm: React.FC = () => {
    const navigate = useNavigate();
    const newPasswordInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);

    const authCtx = useContext(AuthContext);

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        const enteredNewPassword = newPasswordInputRef.current!.value;
        const enteredEmail = emailInputRef.current!.value;

        // add validation

        fetch(`${API}/update-user`,{
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authCtx.token}`
            },
            body: JSON.stringify({
                
                email: enteredEmail,
                newPassword: enteredNewPassword
                
            })
        }).then(res => {
            navigate("/");
        })
    }

    return (
        <div className={classes.wrapper}>
            <form onSubmit={submitHandler} className={classes.theForm}>
                <div className={classes['form-control']}>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" ref={emailInputRef} required/>
                </div>
                <div className={classes['form-control']}>
                    <label htmlFor="new-password">New Password</label>
                    <input type="password" id="new-password" minLength={6} ref={newPasswordInputRef} required/>
                </div>
                <div className={classes.action}>
                    <button>Change Password</button>
                </div>
            </form>
        </div>
    )
}

export default ProfileForm;