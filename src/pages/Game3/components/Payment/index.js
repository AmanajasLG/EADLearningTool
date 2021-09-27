import React from "react";
import Button from "@material-ui/core/Button";
import ButtonConfirm from "../../../../_components/Button";
import { wallet } from "../../../../img";

const Payment = ({ onConfirm, moneyList, updateCashierValue }) => {
  const [state, setState] = React.useState({ payment: [] });

  const addToPayment = (money) => () => {
    const index = state.payment.findIndex(
      (moneyObj) => moneyObj.value === money
    );
    let paymentUpdate = [...state.payment];

    if (index >= 0) paymentUpdate[index].count += 1;
    else paymentUpdate.push({ value: money, count: 1 });
    setState({
      ...state,
      payment: paymentUpdate,
    });
    updateCashierValue(
      paymentUpdate
        .reduce((acc, money) => acc + money.value * money.count, 0)
        .toFixed(2)
    );
  };

  const removeFromPayment = (value) => () => {
    let paymentUpdate = [...state.payment];
    let money = paymentUpdate.find((m) => m.value === value);
    if (money.count > 1) money.count -= 1;
    else {
      let index = paymentUpdate.indexOf(money);
      paymentUpdate = [
        ...state.payment.slice(0, index),
        ...state.payment.slice(index + 1),
      ];
    }
    setState({
      ...state,
      payment: paymentUpdate,
    });
    updateCashierValue(
      paymentUpdate
        .reduce((acc, money) => acc + money.value * money.count, 0)
        .toFixed(2)
    );
  };

  return (
    <React.Fragment>
      <div
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          width: "70em",
          right: "50em",
          display: "flex",
          flexFlow: "wrap",
        }}
        className="selected-money"
      >
        {state.payment.map((money, index) => (
          <div key={index} style={{ margin: "1em", position: "relative" }}>
            <img
              style={{ height: "10em" }}
              src={
                moneyList.find((moneyObj) => moneyObj.value === money.value)
                  .image.url
              }
              alt=""
              onClick={removeFromPayment(money.value)}
            />
            <div
              style={{
                position: "absolute",
                left: money.value > 1 ? "-1em" : "1em",
                top: money.value > 1 ? "-1em" : "0",
                backgroundColor: "#F9AFA1",
                width: "2em",
                height: "2em",
                borderRadius: "2em",
                fontSize: "1.5em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
              }}
            >
              {money.count}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          right: 0,
          bottom: "2em",
          width: "45em",
          height: "90em",
        }}
      >
        <div
          style={{
            position: "relative",
            backgroundColor: "#cbe7de",
            borderRadius: "3em 0 0 3em",
            display: "flex",
            flexDirection: "row",
            padding: "2em",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "1em",
            }}
          >
            {moneyList
              .filter((money) => money.value <= 1)
              .map((money, index) => (
                <img
                  key={index}
                  style={{ width: "10em", margin: "1em" }}
                  src={money.image.url}
                  alt="money"
                  onClick={addToPayment(money.value)}
                />
              ))}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "1em",
            }}
          >
            {moneyList
              .filter((money) => money.value > 1)
              .map((money, index) => (
                <img
                  key={index}
                  onClick={addToPayment(money.value)}
                  style={{ width: "17em", margin: "1em" }}
                  src={money.image.url}
                  alt="money"
                />
              ))}
          </div>
          <img
            style={{
              position: "absolute",
              top: "-16em",
              right: "-7em",
              width: "25em",
            }}
            src={wallet}
            alt=""
          />
        </div>
      </div>

      {state.payment.length > 0 && (
        <ButtonConfirm
          blink
          style={{
            position: "absolute",
            left: "40%",
            bottom: "2em",
            fontSize: "2.5em",
          }}
          onClick={onConfirm(
            state.payment
              .reduce((acc, money) => acc + money.value * money.count, 0)
              .toFixed(2)
          )}
        >
          Finalizar compra! / Checkout!
        </ButtonConfirm>
      )}
    </React.Fragment>
  );
};

export default Payment;
