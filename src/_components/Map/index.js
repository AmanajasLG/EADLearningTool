import React from "react";
import "./index.scss";
import Button from "@material-ui/core/Button";
import Counter from "../Counter";
import { numberList } from "../../_helpers";

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
            width: state.index === index ? "3.5em" : "3em",
            height: state.index === index ? "3.5em" : "3em",
            backgroundColor:
              showEmail && location.correct
                ? "yellow"
                : state.index === index
                ? "red"
                : "blue",
            borderRadius: 100,
            borderBottomLeftRadius: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top:
              String((location.positionX * (height / 1920) * 100) / height) +
              "%",
            left:
              String((location.positionY * (width / 1080) * 100) / width) + "%",
            transform: "translate(-50%, -15%)",
            opacity: state.index === -1 ? 1 : state.index === index ? 1 : 0.5,
          }}
          onClick={() => setState((s) => ({ ...s, index, reservation: false }))}
        >
          <img
            style={{
              width: "2em",
              height: "2em",
            }}
            src={location.image}
            alt=""
          />
        </div>
      ))}
      {state.index !== -1 && (
        <div
          style={{
            bottom: 0,
            position: "absolute",
            left: "50%",
            transform: "translate(-50%)",
            color: "white",
            textAlign: "center",
            width: "28em",
          }}
        >
          <div
            style={{
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              backgroundColor: "#535c89",
              height: "2.2em",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              style={{ width: "1.5em", height: "1.5em", marginRight: ".3em" }}
              src={locations[state.index].image}
              alt=""
            />
            <span>{locations[state.index].name}</span>
            <span
              style={{
                position: "absolute",
                right: ".3em",
                top: "-.1em",
                fontSize: "1.5em",
              }}
              onClick={() => setState((s) => ({ ...s, index: -1 }))}
            >
              x
            </span>
          </div>
          {state.reservation ? (
            <div
              style={{
                backgroundColor: "rgb(96 82 104 / 72%)",
                height: "14em",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
              }}
            >
              <div style={{ display: "flex" }}>
                <Counter
                  value={state.days}
                  list={numberList(20)}
                  onChange={(value) => {
                    setState((s) => ({ ...s, days: value }));
                  }}
                  arrowColor="#59316D"
                />{" "}
                Diárias
              </div>
              <div style={{ display: "flex" }}>
                <Counter
                  value={state.people}
                  list={numberList(20)}
                  onChange={(value) => {
                    setState((s) => ({ ...s, people: value }));
                  }}
                />{" "}
                Pessoas
              </div>
              <div style={{ marginTop: "2em" }}>
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
            </div>
          ) : (
            <div
              style={{
                backgroundColor: "rgb(96 82 104 / 72%)",
                height: "6.4em",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
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
