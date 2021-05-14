import React from "react";
import { Link } from "react-router-dom";

import Init from "../Game2/components/Init";
import Timer from "../Game3/components/Timer";
import Recipe from "./components/Recipe";

import stub from "./stub";
import initialState from "./initialState";

const shuffleArray = (array) => {
  let copy = array.slice(0);
  let shuffled = [];
  while (copy.length > 0) {
    let index = Math.trunc(Math.random() * 100) % copy.length;
    shuffled.push(copy[index]);
    copy = [...copy.slice(0, index), ...copy.slice(index + 1)];
  }
  return shuffled;
};

const shuffleString = (word) => {
  let copy = word.slice(0);
  let shuffled = [];
  while (copy.length > 0) {
    let index = Math.trunc(Math.random() * 100) % copy.length;
    shuffled.push(copy[index]);
    copy = copy.slice(0, index) + copy.slice(index + 1);
  }
  return shuffled;
};

const Game4 = () => {
  const [state, setState] = React.useState(initialState());
  const mission = stub;
  const onStartGame = () => setState({ ...state, scene: "TUTORIAL" });
  const onSecondPassed = (remaining) =>
    setState((state) => {
      return { ...state, remainingTime: remaining };
    });
  const onTimeEnd = () =>
    setState({ ...state, scene: "END_GAME", timeUp: true });

  const next = () => {
    setState({
      ...state,
      servePhase: state.allPrepared,
      cookPhase: !state.allPrepared,

      selectItem: true,
      selected: null,
      orderedLetters: [],
    });
  };

  const onLetterClick = (letter, index) => () => {
    let updateState = {};
    updateState.orderedLetters = [...state.orderedLetters, letter];
    updateState.shuffled = [
      ...state.shuffled.slice(0, index),
      ...state.shuffled.slice(index + 1),
    ];

    if (updateState.shuffled.length === 0) {
      updateState.prepared = [...state.prepared, state.selected.name];
      for (let i = 0; i < mission.recipe.length; i++) {
        updateState.allPrepared = updateState.prepared.includes(
          mission.recipe[i].name
        );

        if (!updateState.allPrepared) break;
      }
    }
    setState({ ...state, ...updateState });
  };

  const onNameSelected = (item) => () => {
    let updateState = {};
    let dish = mission.dishes.find((d) => d.img === state.dishImageSelected);
    updateState.pairCheck = item === dish.name;
    if (updateState.pairCheck) {
      updateState.tableDish = [...state.tableDish, { ...dish }];
      let index = state.shuffledDishes.findIndex((d) => d === dish.img);
      updateState.shuffledDishes = [
        ...state.shuffledDishes.slice(0, index),
        ...state.shuffledDishes.slice(index + 1),
      ];
      index = state.shuffledDishesNames.findIndex((d) => d === dish.name);
      updateState.shuffledDishesNames = [
        ...state.shuffledDishesNames.slice(0, index),
        ...state.shuffledDishesNames.slice(index + 1),
      ];

      for (let i = 0; i < mission.rightDishes.length; i++) {
        updateState.allDishes =
          updateState.tableDish.findIndex(
            (d) => d.name === mission.rightDishes[i].name
          ) !== -1;

        if (!updateState.allDishes) break;
      }
      if (updateState.allDishes) {
        updateState.servePhase = false;
        updateState.win = true;
        updateState.scene = "END_GAME";
        updateState.runTimer = false;
      }
    }
    setState({
      ...state,
      selectItem: !state.selectItem,
      dishImageSelected: "",
      ...updateState,
    });
  };

  return (
    <div>
      {(function renderScene() {
        switch (state.scene) {
          case "INIT":
            return (
              <Init
                name={mission.name}
                description={mission.description}
                onStart={onStartGame}
                onBack={() => setState({ ...state, back: true })}
                onSeeTutorial={
                  state.hasPlayed
                    ? () => {
                        setState({ ...state, seeTutorial: true });
                        onStartGame();
                      }
                    : null
                }
              />
            );
          case "TUTORIAL":
            return (
              <div>
                Tutorial
                <div>Apresentador</div>
                <div>
                  Fala
                  <Recipe
                    recipe={mission.recipe}
                    closeText={"Estou pronto"}
                    onClose={() => setState({ ...state, scene: "GAME" })}
                  />
                </div>
              </div>
            );
          case "GAME":
            return (
              <div>
                <Timer
                  run={state.runTimer}
                  seconds={mission.seconds}
                  onSecondPassed={onSecondPassed}
                  onEnd={onTimeEnd}
                />
                <button
                  onClick={(e) => setState({ ...state, showRecipe: true })}
                >
                  Ver receita
                </button>
                {state.showRecipe && (
                  <Recipe
                    recipe={mission.recipe}
                    closeText={"Fechar"}
                    onClose={(e) => setState({ ...state, showRecipe: false })}
                  />
                )}
                <button
                  onClick={() =>
                    setState({
                      ...state,
                      cookPhase: false,
                      servePhase: true,
                      shuffledDishesNames: shuffleArray(
                        mission.dishes.map((item) => item.name)
                      ),
                      shuffledDishes: shuffleArray(
                        mission.dishes.map((item) => item.img)
                      ),
                    })
                  }
                >
                  Pular pra servir
                </button>
                {state.cookPhase &&
                  (state.selectItem ? (
                    <div>
                      {mission.ingredients.map((item, index) => (
                        <button
                          key={index}
                          onClick={(e) =>
                            setState({ ...state, selected: { ...item } })
                          }
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <div>
                        {state.shuffled.map((letter, index) => (
                          <button
                            key={index}
                            onClick={onLetterClick(letter, index)}
                          >
                            {letter}
                          </button>
                        ))}
                      </div>
                      <div>
                        {state.shuffled.length === 0 &&
                          (state.orderedLetters.reduce(
                            (acc, letter) => acc + letter,
                            ""
                          ) === state.selected.name ? (
                            <div>
                              <div>Acertou!</div>
                              <Recipe
                                recipe={mission.recipe}
                                closeText={
                                  state.allPrepared
                                    ? "Servir!"
                                    : "Preparar próximo"
                                }
                                onClose={next}
                              />
                            </div>
                          ) : (
                            <div>Errou!</div>
                          ))}
                        <button
                          onClick={() =>
                            setState({
                              ...state,
                              orderedLetters: [],
                              shuffled: shuffleString(state.selected.name),
                            })
                          }
                        >
                          Clear
                        </button>
                        {state.orderedLetters.map((letter, index) => (
                          <span key={index}>-{letter}-</span>
                        ))}
                      </div>
                    </div>
                  ))}
                {state.servePhase && (
                  <div>
                    Selecione um utensilio
                    <div>
                      {state.shuffledDishes.map((item, index) => (
                        <button
                          key={index}
                          disabled={!state.selectItem}
                          onClick={() =>
                            setState({
                              ...state,
                              selectItem: !state.selectItem,
                              dishImageSelected: item,
                            })
                          }
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                    Nomes dos utensilios
                    <div>
                      {state.shuffledDishesNames.map((item, index) => (
                        <button
                          key={index}
                          disabled={state.selectItem}
                          onClick={onNameSelected(item)}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                    {state.pairCheck ? <div>Acertou!</div> : <div>Errou!</div>}
                  </div>
                )}
                <div>
                  Mesa
                  <div>
                    {state.selected &&
                      (function showTable() {
                        let item = mission.recipe.find(
                          (item) => item.name === state.selected.name
                        );
                        if (item)
                          return (
                            <div>
                              {state.selected.name}
                              {!state.cook && (
                                <button
                                  onClick={() =>
                                    setState({
                                      ...state,
                                      selectItem: false,
                                      shuffled: shuffleString(
                                        state.selected.name
                                      ),
                                    })
                                  }
                                >
                                  Preparar
                                </button>
                              )}
                            </div>
                          );
                        else
                          return (
                            <div>
                              {state.selected.name}
                              <div>Não faz parte da receita! :(</div>
                              <button
                                onClick={() =>
                                  setState({ ...state, selected: null })
                                }
                              >
                                Remover
                              </button>
                            </div>
                          );
                      })()}
                  </div>
                </div>
              </div>
            );
          case "END_GAME":
            return (
              <div>
                {state.win ? (
                  <div>Aaeaeaeee ganhou!</div>
                ) : (
                  <div>
                    <div>Acabou o tempo!</div>
                  </div>
                )}
                <button onClick={() => setState(initialState())}>
                  Jogar de novo
                </button>
                <Link to={"/userspace"}>Sair do jogo</Link>
              </div>
            );
          default:
            return <div>Error</div>;
        }
      })()}
    </div>
  );
};

export default Game4;
