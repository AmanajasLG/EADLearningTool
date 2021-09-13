import React from "react";
import "./index.scss";
import Counter from "../Counter";
import { numberList } from "../../_helpers";
import InlineSVG from "../InlineSVG";
import { Iniciar, Voltar } from "../Button";
import { locationArrow } from "../../img";

const iconColors = {
  school: "#FFEACC",
  hotel: "#FFCCA9",
  hospital: "#D6E3F4",
  drugstore: "#D6E3F4",
  supermarket: "#FFDEA9",
  park: "#F9AFA1",
  restaurant: "#E8CAFF",
  cityhall: "#F9AFA1",
  touristic: "#F9AFA1",
  shopping: "#FFDEA9",
};

const Map = ({ locations, onConfirm, mapImage, showEmail, person }) => {
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

  const getTranslate = (location) => {
    let translateY = "0";

    if (location.positionY > 500) {
      translateY = "-40%";
    } else if (location.positionY < 100) {
      translateY = "35%";
    } else if (location.positionY > 400) {
      translateY = "-30%";
    } else if (location.positionY < 200) {
      translateY = "20%";
    } else if (location.positionY < 298) {
      translateY = "10%";
    } else {
      translateY = "0";
    }

    return `translate(-50%,${translateY})`;
  };

  return (
    <div
      ref={div}
      style={{
        backgroundImage: `url("${mapImage}")`,
        height: "100%",
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center",
      }}
    >
      {showEmail && (
        <img
          style={{
            width: "0.5em",
            height: "0.5em",
            position: "absolute",
            top:
              String((person.positionY * (height / 596) * 100) / height) + "%",
            left:
              String((person.positionX * (width / 1179) * 100) / width) + "%",
            transform:
              getTranslate(person) +
              " rotate(" +
              String(90 * person.direction) +
              "deg)",
            opacity: state.index === -1 ? 1 : 0.5,
          }}
          src={locationArrow}
          alt=""
        />
      )}
      {locations.map((location, index) => (
        <div
          className="location"
          key={location.id}
          src={location.image}
          alt={location.id}
          style={{
            width:
              state.index === index
                ? showEmail
                  ? "2em"
                  : "3em"
                : showEmail
                ? "1.5em"
                : "2.5em",
            height:
              state.index === index
                ? showEmail
                  ? "2em"
                  : "3em"
                : showEmail
                ? "1.5em"
                : "2.5em",
            backgroundColor:
              showEmail && location.correct
                ? "#d03333"
                : iconColors[location.type],
            borderRadius: 100,
            borderBottomLeftRadius: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top:
              String((location.positionY * (height / 596) * 100) / height) +
              "%",
            left:
              String((location.positionX * (width / 1179) * 100) / width) + "%",
            transform: getTranslate(location),
            opacity: state.index === -1 ? 1 : state.index === index ? 1 : 0.5,
          }}
          onClick={() => setState((s) => ({ ...s, index, reservation: false }))}
        >
          <img
            style={{
              width: showEmail ? "1.2em" : "1.8em",
              height: showEmail ? "1.2em" : "1.8em",
            }}
            src={location.image}
            alt=""
          />
        </div>
      ))}
      {state.index !== -1 && (
        <div
          style={{
            bottom: 20,
            position: "absolute",
            left: "50%",
            transform: "translate(-50%)",
            color: "white",
            textAlign: "center",
            width: showEmail ? "20em" : "20em",
            fontSize: showEmail ? ".8em" : "1.3em",
          }}
        >
          <div
            style={{
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              backgroundColor: "#535c89",
              height: showEmail ? "1.5em" : "2.2em",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <InlineSVG
              style={{
                width: "1.5em",
                height: "1.5em",
                marginRight: ".3em",
                filter:
                  "invert(100%) sepia(42%) saturate(2%) hue-rotate(123deg) brightness(112%) contrast(101%)",
              }}
              src={locations[state.index].image}
              alt=""
            />
            <span>{locations[state.index].name}</span>
            <span
              style={{
                position: "absolute",
                right: ".3em",
                top: showEmail ? "-.08em" : "-.1em",
                fontSize: showEmail ? "1em" : "1.5em",
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
              <div
                style={{
                  display: "flex",
                  padding: "1em",
                }}
              >
                <Counter
                  value={state.days}
                  list={numberList(20)}
                  onChange={(value) => {
                    setState((s) => ({ ...s, days: value }));
                  }}
                  arrowColor="#59316D"
                  valueStyle={{
                    fontSize: "1em",
                    fontFamily: "Barlow",
                    paddingLeft: "20%",
                    paddingRight: "20%",
                  }}
                />
                <span style={{ marginLeft: "1.5em" }}>Diárias</span>
              </div>
              <div style={{ display: "flex", padding: "1em" }}>
                <Counter
                  value={state.people}
                  list={numberList(20)}
                  onChange={(value) => {
                    setState((s) => ({ ...s, people: value }));
                  }}
                  arrowColor="#59316D"
                  valueStyle={{
                    fontSize: "1em",
                    fontFamily: "Barlow",
                    paddingLeft: "20%",
                    paddingRight: "20%",
                  }}
                />
                <span style={{ marginLeft: "1.5em" }}>Pessoas</span>
              </div>
              <div style={{ marginTop: "2em" }}>
                <Voltar
                  style={{
                    fontSize: ".6em",
                    marginRight: "0.6em",
                  }}
                  onClick={() =>
                    setState((s) => ({
                      ...s,
                      reservation: false,
                      people: 0,
                      days: 0,
                    }))
                  }
                  label="Voltar"
                />

                <Iniciar
                  style={{
                    fontSize: ".6em",
                  }}
                  onClick={onConfirm({
                    reservation: {
                      hotel: locations[state.index],
                      days: state.days + 1,
                      people: state.people + 1,
                    },
                  })}
                  label="Confirmar reserva"
                />
              </div>
            </div>
          ) : (
            <div
              style={{
                backgroundColor: "rgb(96 82 104 / 72%)",
                height: showEmail ? "4em" : "6.4em",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
                padding: "1em",
              }}
            >
              <p>{locations[state.index].description}</p>
              {!showEmail && locations[state.index].type === "hotel" && (
                <Iniciar
                  style={{
                    fontSize: ".6em",
                    marginTop: "1em",
                  }}
                  onClick={() => setState((s) => ({ ...s, reservation: true }))}
                  label="Fazer reserva"
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Map;
