import React from "react";
import marked from "marked";
import parse from "html-react-parser";

const Email = ({ email, onReady }) => {
  return (
    <div>
      <div>{email.date}</div>
      <div>
        De: <span>{email.senderName}</span> <span>{email.senderEmail}</span>
      </div>
      <div>
        Assunto: <span>{email.title}</span> <span>{email.titleTranslate}</span>
      </div>
      <div>{parse(marked(email.message.replace("\n", "</br>")))}</div>
      <div>Atenciosamente,</div>
      <div>{email.senderName}</div>
      <button onClick={onReady}>Estou pronto!</button>
    </div>
  );
};

export default Email;
