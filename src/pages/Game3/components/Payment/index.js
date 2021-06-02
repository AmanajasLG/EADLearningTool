import React from 'react'
import Button from '@material-ui/core/Button'
import ButtonConfirm from '../../../../_components/Button'
import { wallet } from '../../../../img'

const Payment = ({onConfirm, moneyList}) => {
  const [state, setState] = React.useState({payment:[]})

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
  };

  const removeFromPayment = (index) => () => {
    let paymentUpdate = [...state.payment];

    if (paymentUpdate[index].count > 1) paymentUpdate[index].count -= 1;
    else
      paymentUpdate = [
        ...state.payment.slice(0, index),
        ...state.payment.slice(index + 1),
      ];
    setState({
      ...state,
      payment: paymentUpdate,
    });
  };

  return(
    <div style={{position: 'absolute', right: 0, bottom: 100, width: '60%' }}>
      <div style={{display: 'grid', gridTemplateRows: 'auto auto', gridTemplateColumns: 'auto auto auto', paddingRight: 300, marginBottom: 50}}className="selected-money">
        {state.payment.map((money, index) => (
          <div key={index} style={{position: 'relative'}}>
            <img
              style={{width: 110}}
              src={moneyList.find((moneyObj) => moneyObj.value === money.value).image.url}
              alt=""
              onClick={removeFromPayment(index)}
            />
            <div style={{position: 'absolute', left: -10, top: -10,
              backgroundColor: 'red', width: 20, height: 20, borderRadius: 10, textAlign: 'center'}}
            >
              {money.count}
            </div>
          </div>
        ))}
      </div>

      <div>
        <div style={{position: 'relative', backgroundColor:'#cbe7de', borderRadius: 50}}>
          <div style={{display: 'grid', gridTemplateColumns: 'auto auto auto auto', padding: '50px 300px 50px 50px'}}>
            {moneyList.filter(money => money.value > 1).map((money, index) => (
              <Button key={index} onClick={addToPayment(money.value)}>
                <img
                  style={{ width: 110 }}
                  src={money.image.url}
                  alt="money"
                />
              </Button>
            ))}
            <div style={{display: 'grid', gridTemplateRows: 'auto auto', gridTemplateColumns: 'auto auto auto'}}>
              {moneyList.filter(money => money.value <= 1).map((money, index) => (
                <Button key={index} onClick={addToPayment(money.value)}>
                  <img
                    style={{ width: 20 }}
                    src={money.image.url}
                    alt="money"
                  />
                </Button>
              ))}
            </div>
          </div>
          <img style={{position: 'absolute', top: -100, right: -95, width: 300}}src={wallet} alt="" />
        </div>

        <ButtonConfirm blink
        style={{position: 'absolute', right: 60, bottom: -15}}
          onClick={onConfirm(state.payment.reduce((acc, money) => acc + money.value * money.count, 0).toFixed(2))}
        >
          Continuar
        </ButtonConfirm>
      </div>
    </div>
  )
}

export default Payment
