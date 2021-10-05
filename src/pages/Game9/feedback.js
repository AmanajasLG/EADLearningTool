import React from 'react'
import { Iniciar, Voltar } from '../../_components/Button'
import { agendamento } from '../../img'

const Feedback = ({data, missionId, userId, restart, leave}) => {
  return(
    <React.Fragment>
      <div style={{width: '100%', height: '100%', padding: '12% 15%'}}>
        <div style={{backgroundColor: '#ffdea9', width: '35%', height: '90%', padding:'3%', fontSize: '2em', borderRadius: '8% / 6%'}}>
          <div>
            <img src={agendamento} style={{width: '25%'}}/>
          </div>
          <div>
            Você conseguiu ajudar {data.results.completed} pessoas a encontrarem a casa ideal!
          </div>
          <hr/>
          <div>
            You managed to help {data.results.completed} people find an ideal home!
          </div>
        </div>
        <div>
          Tempo restante: {data.results.secondsLeft}
        </div>
        <div>
          <Voltar label={'Jogar novamente'} onClick={restart}/>
          <Iniciar label={'Sair do jogo'} onClick={leave}/>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Feedback
