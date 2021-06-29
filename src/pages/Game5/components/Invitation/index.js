import React from 'react'
import { envelope } from '../../../../img'
import Button from "../../../../_components/Button";

const Invitation = ({invitation, onClick}) => {
  return(
    <React.Fragment>
      <img src={envelope} style={{backgroundColor: '#F9AFA1'}}/>
      <div
        style={{
          position: "absolute",
          top: '30%',
          width: "50%",
          height: "50%",
          left: "25%",
          textAlign: "center",
        }}
      >
        <div style={{paddingLeft: '15%', paddingRight: '15%'}}>
          <div lang="pt-br" className="" style={{fontWeight: 'bold', fontSize: '4.5em'}}>
            Nós temos o prazer de convidar VOCÊ para nosso
            evento!
          </div>
          <div lang="en" className="" style={{fontStyle: 'italic', fontSize: '3em'}}>
            We're glad to invite YOU to our event!
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            backgroundColor: "white",
            width: "50%",
            left: "25%",
            fontSize: "3em",
            marginTop: "5%"
          }}
        >
          <div>Mês: <strong>{invitation.month}</strong></div>
          <div>Estação: <strong>{invitation.season}</strong></div>
          <div>Horário: <strong>{invitation.time}</strong></div>
          <div>
            Previsão do tempo: <strong>{invitation.weather}</strong>
          </div>
        </div>
        <Button
          style={{
            position: "relative",
            bottom: "10%",
            margin: "50% auto 0% auto",
            fontSize: '3em'
          }}
          onClick={onClick}
        >
          Estou pronto!
        </Button>
      </div>
    </React.Fragment>
  )
}

export default Invitation
