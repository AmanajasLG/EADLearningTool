import React from "react";

import Button from "@material-ui/core/Button";
import { capitalize } from "@material-ui/core";

const SendEmail = ({ phrases, onConfirm }) => {
  const [state, setState] = React.useState({
    index: 0,
    selected: [],
    sentences: [],
  });
  const selectOption = (option) => () => {
    phrases[state.index].words.map((word) => {
      if (word.text === option) word.picked = true;
      return word;
    });

    setState((s) => ({ ...s, selected: [...s.selected, option] }));
  };
  const unselectOption = (index) => () => {
    let selected = [...state.selected];
    let wordRemoved = selected.splice(index, 1)[0];
    phrases[state.index].words.map((word) => {
      if (word.text === wordRemoved) word.picked = false;
      return word;
    });

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
    // onConfirm(
    //   phrases.map((t, index) => ({
    //     correct: t,
    //     player: state.sentences[index],
    //   }))
    // );
  };

  return (
    <div>
      <div>
        {state.sentences.map((sentence, index) => (
          <div key={index}>{capitalize(sentence.join(" "))}.</div>
        ))}
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
                onClick={selectOption(option.text)}
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
