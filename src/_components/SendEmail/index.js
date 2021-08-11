import React from "react";

import Button from "@material-ui/core/Button";
import { capitalize } from "@material-ui/core";
import marked from "marked";
import parse from "html-react-parser";

const SendEmail = ({ phrases, onConfirm, email }) => {
  const [state, setState] = React.useState({
    index: 0,
    selected: [],
    sentences: [],
  });
  const selectOption = (index) => () => {
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
        <div>
          <span>
            {state.selected.length}/{phrases[state.index].size}
          </span>

          {state.selected.map((section, index) => (
            <Button key={index} onClick={unselectOption(index)}>
              {section}
            </Button>
          ))}

          <Button
            style={{ display: "block" }}
            onClick={nextSentence}
            disabled={state.selected.length !== phrases[state.index].size}
          >
            Escrever
          </Button>

          <div>
            {phrases[state.index].words.map((option, index) => (
              <Button
                key={index}
                disabled={option.picked}
                onClick={selectOption(index)}
              >
                {option.text}
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <Button style={{ display: "block" }} onClick={sendData}>
          Enviar
        </Button>
      )}
    </div>
  );
};

export default SendEmail;
