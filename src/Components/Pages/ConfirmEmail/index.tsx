import React, { useState } from 'react'
import styles from './index.module.css';
import { useHistory, useLocation } from 'react-router-dom';
import API from '../../../axios'

function index() {
    const [confirming, setConfirming] = useState(true)
    const history = useHistory();

    const test = new URLSearchParams(useLocation().search);

    const [state, setstate] = useState({
      secretToken: test.get("secretToken")
    })
      API.post("users/verify", state)
      .then((res) => {
        setConfirming(false)
      })
      .catch((error) => {
        if(error) {
          console.log("Error", error);
        }
      })

    function toLogin() {
        history.push("/");
    }

    return (
        <div className={styles.container}>
            {confirming 
                ? <p>Loading</p> :
                <div className={styles.innerContainer}>
                <div className={styles.topText}>
                    <h2>Your email has been successfully verified</h2>
                    <h2>Click below to Login</h2>
                </div>
                
                <input className={styles.login} type="button" value="Login" onClick={toLogin} />
            </div>
            }
        </div>
    )
}

export default index
