import React from 'react'
import { Iniciar, Voltar } from '../../_components/Button'
import { agendamento, hourglassEmpty } from '../../img'

import Blob, { BlobBg } from '../../_components/Blob'

const Feedback = ({data, missionId, userId, restart, leave}) => {
  return(
    <React.Fragment>
      <div style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgb(207 220 239)'}}>
      <BlobBg>
        <div style={{position: 'relative', width: '100%', height: '100%', padding: '10% 15%'}}>
          {/*CARD GROUP*/}
          <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
            {/*First Card*/}
            <div style={{color: '#59316d', width: '60%', height: '90%', padding:'3%', borderRadius: '8% / 6%'}}>
              <div style={{textAlign: 'center'}}>
                <img src={hourglassEmpty} style={{position: 'relative', width: '10%', transform: 'rotate(10deg)'}}/>
                <div style={{fontSize: '3.2em'}}>
                  <div style={{fontFamily: "Abril fatface", fontSize: '2em'}}>
                    {data.results.secondsLeft === 0 ?
                      "O tempo acabou!" :
                      `Tempo restante: ${data.results.secondsLeft}`
                    }
                  </div>
                  <br/>
                  <div style={{fontSize: '1.3em', width: '90%', margin: '0 auto'}}>
                    Escolher a casa ideal não é tarefa fácil
                    {data.results.completed < 3 ?
                      ", mais sorte na próxima!" :
                      data.results.completed < 6 ?
                      ", mas você se saiu bem!" :
                      data.results.completed < 12 ?
                      ", mas você se saiu muito bem!" :
                      ", mas você fez um trabalho espetacular!"
                    }
                  </div>
                </div>
                <hr style={{width: '40%', margin: '2% auto 2% auto', borderColor:'white' }}/>
                <div style={{fontStyle: 'italic', fontSize: '3em', width: '70%', margin: '0 auto'}}>
                  {data.results.secondsLeft === 0 ?
                    "Time is up! " :
                    `Time left: ${data.results.secondsLeft} `
                  }
                  <span style={{textAlign: 'left'}}>
                    Choosing the ideal home is not an easy task
                    {data.results.completed < 3 ?
                      ", better luck next time!" :
                      data.results.completed < 6 ?
                      ", but you did well!" :
                      data.results.completed < 12 ?
                      ", but you did very well!" :
                      ", but you made an expectacular job!"
                    }
                  </span>
                </div>
              </div>
            </div>

            {/*Second Card*/}
            <div style={{backgroundColor: '#ffdea9', color: '#59316d', width: '35%', height: '90%', padding:'3%', borderRadius: '8% / 6%'}}>
              <div style={{height: '30%', display: 'flex', flexDirection: 'row'}}>
                <img src={agendamento} style={{width: '25%', flex: 1}}/>
                <BlobBg style={{fontFamily: "Abril fatface", fontSize: '7em', flex: 1, textAlign: 'center'}}>
                  <BlobBg blob={{strokeWidth: 50, stroke: '#59316d'}} style={{height: '100%'}}>
                    <span style={{position: 'relative', top: '20%'}}>{data.results.completed}</span>
                  </BlobBg>
                </BlobBg>
              </div>
              <div style={{fontFamily: "Abril fatface", fontSize: '3.2em', paddingRight: '20%'}}>
                Você conseguiu ajudar {data.results.completed} pessoas a encontrarem a casa ideal!
              </div>
              <hr style={{margin: '7% 70% 7% 0', borderColor:'#59316d' }}/>
              <div style={{fontStyle: 'italic', fontSize: '3em'}}>
                You managed to help {data.results.completed} people find an ideal home!
              </div>
            </div>
          </div>

          <div style={{width:'50%', textAlign: 'center', margin: '0 auto', fontSize: '2em'}}>
            <Voltar label={'Jogar novamente'} onClick={restart} style={{marginRight: '5%'}}/>
            <Iniciar label={'Sair do jogo'} onClick={leave}/>
          </div>

        </div>
      </BlobBg>
      </div>
    </React.Fragment>
  )
}

export default Feedback
