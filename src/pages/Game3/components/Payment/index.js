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

  const removeFromPayment = (value) => () => {
    let paymentUpdate = [...state.payment];
    let money = paymentUpdate.find( m => m.value === value)
    if (money.count > 1) money.count -= 1;
    else{
      let index = paymentUpdate.indexOf(money)
      paymentUpdate = [
        ...state.payment.slice(0, index),
        ...state.payment.slice(index + 1),
      ];
    }
    setState({
      ...state,
      payment: paymentUpdate,
    });
  };

  return(
    <React.Fragment>
      <div style={{position: 'absolute', height: '20%', top: '25%', width: '60%', right: 0,
        display: 'grid', gridTemplateRows: '33% 33% 33%', gridTemplateColumns: '20% 20% 20% 20% 20%', gridRowGap: '10%'}}className="selected-money">
        {state.payment.filter(m => m.value > 1).map((money, index) => (
          <div key={index} style={{position: 'relative'}}>
            <img
              style={{height: '100%'}}
              src={moneyList.find((moneyObj) => moneyObj.value === money.value).image.url}
              alt=""
              onClick={removeFromPayment(money.value)}
            />
            <div style={{position: 'absolute', left: -10, top: -10,
              backgroundColor: '#F9AFA1', width: 20, height: 20, borderRadius: 10, textAlign: 'center'}}
            >
              {money.count}
            </div>
          </div>
        ))}
        {state.payment.filter(m => m.value <= 1).map((money, index) => (
          <div key={index} style={{position: 'relative', gridColumnStart: (index + 1) % 5 }}>
            <img
              style={{height: '100%'}}
              src={moneyList.find((moneyObj) => moneyObj.value === money.value).image.url}
              alt=""
              onClick={removeFromPayment(money.value)}
            />
            <div style={{position: 'absolute', left: -10, top: -10,
              backgroundColor: '#F9AFA1', width: 20, height: 20, borderRadius: 10, textAlign: 'center'}}
            >
              {money.count}
            </div>
          </div>
        ))}
      </div>

      <div style={{position: 'absolute', right: 0, bottom: '10%', width: '60%'}}>
        <div style={{position: 'relative', backgroundColor:'#cbe7de', borderRadius: 50}}>
          <div style={{display: 'grid', gridTemplateColumns: '25% 25% 25% 25%', padding: '5% 25% 5% 5%'}}>
            {moneyList.filter(money => money.value > 1).map((money, index) => (
              <Button key={index} onClick={addToPayment(money.value)}>
                <img
                  style={{ width: 110 }}
                  src={money.image.url}
                  alt="money"
                />
              </Button>
            ))}
            <div style={{display: 'grid', gridTemplateRows: '50% 50%', gridTemplateColumns: '33% 33% 33%'}}>
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
          <img style={{position: 'absolute', top: '-25%', right: '-10%', width: '35%'}}src={wallet} alt="" />
        </div>

        <ButtonConfirm blink
        style={{position: 'absolute', right: 60, bottom: -15}}
          onClick={onConfirm(state.payment.reduce((acc, money) => acc + money.value * money.count, 0).toFixed(2))}
        >
          Continuar
        </ButtonConfirm>
      </div>
    </React.Fragment>
  )
}

export default Payment
