import React from 'react'
import styles from './index.module.css';
import { useHistory } from 'react-router-dom';

function index() {

    const history = useHistory();
    function toLogin() {
        history.push("/");
    }

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <div className={styles.topText}>
                    <h2>A verification link has been sent to your email address. Check to verify your account</h2>
                </div>
                
                <input className={styles.login} type="button" value="Login" onClick={toLogin} />
            </div>
        </div>
    )
}

export default index
