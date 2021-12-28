import React from "react";
import marked from "marked";
import parse from "html-react-parser";
import { Iniciar } from "../Button";

import styles from './Email.module.scss'

const Email = ({ email, onReady }) => {
  return (
    <div id={styles["emailScreen"]}>
      <div id={styles["emailHeader"]}>
        <div id={styles["emailSubject"]}>
          <span className={styles["emailLabel"]}>assunto: </span>
          <span><strong>{email.title}</strong></span>
          <span className={styles["vr"]}>|</span>
          <span><em>{email.titleTranslate}</em></span>
        </div>
        <div id={styles["emailDate"]}>{email.date}</div>
        <div id={styles["emailSender"]}>
          <span className={styles["emailLabel"]}>de: </span>
          <span><strong>{email.senderName}</strong></span>
          <span> </span>
          <span>({email.senderEmail})</span>
        </div>
      </div>

      <hr />

      <div id={styles["emailContent"]}>
        <div>
          {parse(marked(email.message.replace("\n", "</br>")))}
        </div>
        <br/>
        <div>Atenciosamente,</div>
        <div>{email.senderName}</div>
      </div>
      <Iniciar
        label="Estou pronto!"
        onClick={onReady}
        style={{
          fontSize: "0.7em",
          position: "absolute",
          right: "5%",
          bottom: "-2.5%",
        }}
      ></Iniciar>
    </div>
  );
};

export default Email;
