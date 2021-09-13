import React from "react";

import Button from "@material-ui/core/Button";
import { Iniciar } from "../Button";
import { capitalize } from "@material-ui/core";
import marked from "marked";
import parse from "html-react-parser";
import Pill from '../Pill'

const SendEmail = ({ phrases, onConfirm, email }) => {
  const [state, setState] = React.useState({
    index: 0,
    selected: [],
    sentences: [],
  });
  const selectOption = (index) => () => {
    if(state.selected.length >= phrases[state.index].size)
      return

    phrases[state.index].words[index].picked = true;

    setState((s) => ({
      ...s,
      selected: [...s.selected, phrases[state.index].words[index].text],
    }));
  };
  const unselectOption = (index) => () => {
    let selected = [...state.selected];
    let wordRemoved = selected.splice(index, 1)[0];
    let phrasesIndex = phrases[state.index].words.findIndex(
      (word) => word.text === wordRemoved && word.picked
    );
    phrases[state.index].words[phrasesIndex].picked = false;

    setState((s) => ({ ...s, selected }));
  };
  const nextSentence = () => {
    setState((s) => ({
      ...s,
      index: s.index + 1,
      selected: [],
      sentences: [...s.sentences, [...s.selected]],
    }));
  };
  const sendData = () => {
    onConfirm(state.sentences);
  };

  return (
    <div>
      <div style={{ padding: "0 5% 0 5%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "2%",
          }}
        >
          <div>
            Assunto: <span>{email.title}</span>{" "}
            <span>{email.titleTranslate}</span>
          </div>
          <div>{email.date}</div>
        </div>
        <div style={{ display: "block", paddingTop: "2%" }}>
          Para:{" "}
          <span>
            <strong>{email.senderName}</strong>
          </span>{" "}
          <span>{email.senderEmail}</span>
        </div>
        <hr />

        <div style={{ paddingTop: "5%" }}>
          {parse(marked(email.message.replace("\n", "</br>")))}
          {state.sentences.map((sentence, index) => (
            <div key={index}>{capitalize(sentence.join(" "))}.</div>
          ))}
        </div>
      </div>
      {state.index < phrases.length ? (
        <div style={{padding: '5%'}}>

          <Pill blink={false} style={{ position: 'relative', width: '100%', backgroundColor: '#d6e3f4'}}>
            <span style={{fontWeight: 'thin'}}>Destino:</span>
            {state.selected.map((section, index) => (
              <Pill key={index} onClick={unselectOption(index)}
                blink
                style={{backgroundColor: 'white', cursor: 'pointer'}}>
                {section}
              </Pill>
            ))}
            <div style={{position: 'absolute', top: '10%', right: '5%'}}>
              {state.selected.length}/{phrases[state.index].size}
            </div>
          </Pill>

          <Button
            style={{ display: "block", marginLeft: 'auto', marginRight: 0 }}
            onClick={nextSentence}
            disabled={state.selected.length !== phrases[state.index].size}
          >
            Escrever
          </Button>

          <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
            {phrases[state.index].words.map((option, index) => (
              <Pill
                key={index}
                disabled={option.picked}
                onClick={selectOption(index)}
                blink hoverable
                style={{backgroundColor: 'white', cursor: 'pointer'}}
              >
                {option.text}
              </Pill>
            ))}
          </div>
        </div>
      ) : (
        <Iniciar style={{ display: "block", position: 'absolute', right: '10%', bottom: '-5%' }} onClick={sendData} label='Enviar' />
      )}
    </div>
  );
};

export default SendEmail;
