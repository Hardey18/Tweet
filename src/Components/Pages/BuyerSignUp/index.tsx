import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../context/authContext';
import API from '../../../axios';
import styles from './index.module.css';
import { useHistory } from 'react-router-dom';

function index() {
    const { setAuthState } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState('');
    const [state, setstate] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const isInvalid = state.name === '' || state.email === '' || state.password === '' || state.confirmPassword === '';

    const updateState = (key: string, value: string) => {
        setstate({
            ...state,
            [key]: value,
        })
    }
    const history = useHistory();

    const register = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        API.post('users/signup', state)
            .then((res: any) => {
                const output = res?.data?.token
                console.log("Output", output)
                setAuthState(output)
                history.push('/buyer-success')
            })
            .catch((error) => {
                console.log("Error", error.response);
                // if(error) {
                //     let errorreturned = error.response.data.message
                //     setErrorMessage(errorreturned)
                // }
            })
    }

    function toBuyerLogin() {
        history.push("/");
    }

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <div className={styles.topText}>
                    <h5>Ede's Store and Services</h5>
                    <h2>Create A Buyer Account</h2>
                    <div>Lorem ipsum dolor sit amet, consectetur adipiscing</div>
                    <div>elit. Tempus turpis quis viverra orci ornare risus. In</div>
                    <div>mollis aliquet adipiscing leo, tincidunt.</div>
                </div>
                <form>
                    <div className={styles.inputContainer}>
                        <div className={styles.left}>
                            <input className={styles.textInput} value={state.name} onChange={(e) => updateState('name', e.currentTarget.value)} type="text" name="name" placeholder="Name" /><br />
                            <input className={styles.textInput} value={state.email} onChange={(e) => updateState('email', e.currentTarget.value)} type="text" name="Email" placeholder="Email" /><br />
                        </div>
                        <div className={styles.right}>
                            <input className={styles.textInput} value={state.password} onChange={(e) => updateState('password', e.currentTarget.value)} type="password" name="password" placeholder="Password" />
                            <input className={styles.textInput} value={state.confirmPassword} onChange={(e) => updateState('confirmPassword', e.currentTarget.value)} type="confirmPassword" name="confirmPassword" placeholder="Confirm Password" />
                        </div>
                    </div>
                    {/* <input className={styles.signUp} onClick={register} type="button" value="Create Account" /> */}
                    <button  className={styles.signUp} onClick={register} type="submit">Create Account</button>
                    <p className={styles.noAccount}>Already have an account? <span className={styles.logIn} onClick={toBuyerLogin}>Log in</span></p>
                </form>
                <div>{ errorMessage }</div>
            </div>
        </div>
    )
}

export default index
