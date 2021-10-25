import React, { useContext, useState } from 'react'
import styles from './index.module.css';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../context/authContext';
import API from '../../../axios';

function index() {

    const { setAuthState } = useContext(AuthContext);
    // const { push } = useHistory()
    const [errorMessage, setErrorMessage] = useState('')
    const [state, setstate] = useState({
        email: "",
        password: "",
    })
    const isInvalid = state.email === '' || state.password === '';
    const history = useHistory();
    function toBuyerSignUp() {
        history.push("/buyer-sign-up");
    }

    const updateState = (key: string, value: string) => {
        setstate({
            ...state,
            [key]: value,
        })
    }

    const login = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        API.post('users/signin', state)
            .then((res: any) => {
                const output = res?.data?.token;
                setAuthState(output)
                console.log("Response", output)
                history.push('/home')
            })
            .catch((error) => {
                if(error) {
                    setErrorMessage(error.response.data.message)
                    // console.log("Error", error.response.data.message)
                }
            })
    }

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <div>{ errorMessage }</div>
                <div className={styles.topText}>
                    <h5>Ede's Store and Services</h5>
                    <h2>Login to your Account</h2>
                    <div>Lorem ipsum dolor sit amet, consectetur adipiscing</div>
                    <div>elit. Tempus turpis quis viverra orci ornare risus. In</div>
                    <div>mollis aliquet adipiscing leo, tincidunt.</div>
                </div>
                <form>
                    <input className={styles.textInput} value={state.email} onChange={(e) => updateState('email', e.currentTarget.value)} type="text" name="Email" id="email" placeholder="Email" /><br />
                    <input className={styles.textInput} value={state.password} onChange={(e) => updateState('password', e.currentTarget.value)} type="password" name="Password" id="password" placeholder="Password" />
                    <div className={styles.forgotPassword}>Forgot Password?</div>
                    <button onClick={login} className={styles.login} type="submit">Login</button>
                    {/* <input onClick={login} className={styles.login} type="button" value="Login" /> */}
                    <p className={styles.noAccount}>Don't have an account yet? <span className={styles.signUp} onClick={toBuyerSignUp}>Sign Up</span></p>
                </form>
            </div>
        </div>
    )
}

export default index
