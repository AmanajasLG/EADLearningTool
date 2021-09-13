import React from "react";
import marked from "marked";
import parse from "html-react-parser";
import { Iniciar } from '../Button'

const Email = ({ email, onReady }) => {
  return (
    <div style={{padding: '0 5% 0 5%'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', paddingTop: '2%'}}>
        <div>
          Assunto: <span>{email.title}</span> <span>{email.titleTranslate}</span>
        </div>
        <div>{email.date}</div>
      </div>
      <div style={{display: 'block', paddingTop: '2%'}}>
        De: <span><strong>{email.senderName}</strong></span> <span>{email.senderEmail}</span>
      </div>
      <hr/>


      <div style={{paddingTop: '5%'}}>{parse(marked(email.message.replace("\n", "</br>")))}</div>
      <div>Atenciosamente,</div>
      <div>{email.senderName}</div>
      <Iniciar label='Estou pronto!' onClick={onReady} style={{fontSize: '0.8rem', position: 'absolute', right: '5%', bottom: '-2%'}}></Iniciar>
    </div>
  );
};

export default Email;
