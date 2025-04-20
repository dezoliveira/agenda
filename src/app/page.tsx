'use client'

import Image from "next/image";
import { auth } from "./lib/firebaseAuth";
import { useEffect } from "react";
import styles from '../app/login.module.css'

export default function Home() {
  useEffect(() => {
    console.log(auth)
  })

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginContent}>
        <h1 className={styles.title}>Login</h1>
        <div className={styles.inputBox}>
          <label>Email</label>
          <input type="text"/>
        </div>

        <div className={styles.inputBox}>
          <label>Senha</label>
          <input type="password"/>
        </div>

        <div className={styles.inputBox}>
          <button className={styles.button}>Login</button>
        </div>

        <div className={styles.inputBox}>
          <p>Não possui uma conta ?
            <a href="#">
              <strong>Registre-se</strong>
            </a>
          </p>
        </div>
      </form>      
    </div>
  );
}
