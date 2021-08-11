import React from "react";
import "./index.scss";
import Button from "@material-ui/core/Button";
import Counter from "../Counter";
import { numberList } from "../../_helpers";
import { SatelliteSharp } from "@material-ui/icons";

const Map = ({ locations, onConfirm, mapImage, showEmail }) => {
  const [state, setState] = React.useState({
    index: -1,
    reservation: false,
    days: 0,
    people: 0,
  });
  const [height, setHeight] = React.useState(null);
  const [width, setWidth] = React.useState(null);
  const div = React.useCallback((node) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);

  return (
    <div
      ref={div}
      style={{
        backgroundImage: `url("${mapImage}")`,
        height: "100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {locations.map((location, index) => (
        <div
          className="location"
          key={location.id}
          src={location.image}
          alt={location.id}
          style={{
            width: "3em",
            height: "3em",
            backgroundImage: `url("${location.image}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
            position: "absolute",
            top:
              String((location.positionX * (height / 1920) * 100) / height) +
              "%",
            left:
              String((location.positionY * (width / 1080) * 100) / width) + "%",
            transform: "translate(-50%, -15%)",
            filter:
              showEmail && location.correct
                ? "drop-shadow(0px 0px 5px yellow)"
                : state.index === index
                ? "drop-shadow(0px 0px 5px red)"
                : "",
          }}
          onClick={() => setState((s) => ({ ...s, index }))}
        ></div>
      ))}
      {state.index !== -1 && (
        <div
          style={{
            padding: 30,
            bottom: -20,
            position: "absolute",
            left: "50%",
            transform: "translate(-50%, 0)",
            color: "white",
            textAlign: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#535c89",
            }}
          >
            <icon></icon>
            <span>{locations[state.index].name}</span>
            <span onClick={() => setState((s) => ({ ...s, index: -1 }))}>
              x
            </span>
          </div>
          {state.reservation ? (
            <div
              style={{
                backgroundColor: "rgb(96 82 104 / 72%)",
              }}
            >
              <div>
                <Counter
                  value={state.days}
                  list={numberList(20)}
                  onChange={(value) => {
                    setState((s) => ({ ...s, days: value }));
                  }}
                />{" "}
                Diárias
              </div>
              <div>
                <Counter
                  value={state.people}
                  list={numberList(20)}
                  onChange={(value) => {
                    setState((s) => ({ ...s, people: value }));
                  }}
                />{" "}
                Pessoas
              </div>

              <Button
                onClick={() =>
                  setState((s) => ({
                    ...s,
                    reservation: false,
                    people: 0,
                    days: 0,
                  }))
                }
              >
                Voltar
              </Button>
              <Button
                onClick={onConfirm({
                  reservation: {
                    hotel: locations[state.index],
                    days: state.days + 1,
                    people: state.people + 1,
                  },
                })}
              >
                Confirmar reserva
              </Button>
            </div>
          ) : (
            <div
              style={{
                backgroundColor: "rgb(96 82 104 / 72%)",
              }}
            >
              <p>{locations[state.index].description}</p>
              {!showEmail && locations[state.index].type === "hotel" && (
                <Button
                  onClick={() => setState((s) => ({ ...s, reservation: true }))}
                >
                  Fazer reserva
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Map;
