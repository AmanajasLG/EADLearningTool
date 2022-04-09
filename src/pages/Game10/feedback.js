import React from 'react'

import DressingCharacter from '../../_components/DressingCharacter'
import { Iniciar, Voltar } from '../../_components/Button'

const Feedback = ({data, restart, leave}) =>{
  return(
    <div style={{backgroundColor: '#b8d7ff', position: 'absolute', width: '100%', height: '100%'}}>
      <DressingCharacter
        character={data.gameplayData.choosenCharacter}
        clothes={data.gameplayData.clothes}
        style={{
          position: 'absolute',
          height: '85%',
          width: '43%',
          left: '-5%',
          top: '15%'
        }}
      />

    <div style={{width:'70%', textAlign: 'center', margin: '10% 10% 0 20%', fontSize: '2em', marginTop: '12.5%'}}>
        <div style={{backgroundColor: '#ffdea9', color: '#59316d', width: '100%', height: '90%', padding:'3%', borderRadius: '3% / 8%', boxShadow: '3% 3% rgb(0 0 0 / 0.3)'}}>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            {/*DISH*/}
            <div style={{padding: '2%'}}>
              <div style={{fontFamily: "Abril fatface", fontSize: '1.5em', padding: '3%'}}>
                {data.gameData.dishText.indexOf( data.gameplayData.selectedDish.name ) >= 0 ?
                  <div>Esse foi exatamente o prato que o {data.gameData.character.name} sugeriu e você preparou ele certinho. Todos amaram!</div>
                  :
                  <div>Talvez as pessoas teriam gostado mais se você tivesse feito o prato que o {data.gameData.character.name} sugeriu...</div>
                }
              </div>
              <hr style={{margin: '7% auto', borderColor:'#59316d', width: '30%' }}/>
              <div style={{fontStyle: 'italic', fontSize: '1em', padding: '3%'}}>
                {data.gameData.dishText.indexOf( data.gameplayData.selectedDish.name ) >= 0 ?
                  <div>This was exactly the dish {data.gameData.character.name} suggested - and you prepared it just right. Everyone loved it!</div>
                  :
                  <div>Maybe people would have liked it better if you had made the dish {data.gameData.character.name} suggested....</div>
                }
              </div>
            </div>

            {/*CLOTHES*/}
            <div style={{padding: '2%'}}>
              <div style={{fontFamily: "Abril fatface", fontSize: '1.5em', padding: '3%'}}>
                {data.gameData.dishText.indexOf( data.gameplayData.selectedDish.name ) >= 0 ?
                  <div>Você estava bem confortável nas roupas que escolheu e conseguiu aproveitar bem o dia.</div>
                  :
                  <div>As suas roupas te fizeram passar um aperto, mas, bem... Você escolheu ir desconfortável pelo estilo, né?</div>
                }
              </div>
              <hr style={{margin: '7% auto', borderColor:'#59316d', width: '30%' }}/>
              <div style={{fontStyle: 'italic', fontSize: '1em', padding: '3%'}}>
                {data.gameData.dishText.indexOf( data.gameplayData.selectedDish.name ) >= 0 ?
                  <div>You were very comfortable in the clothes you chose and managed to enjoy the day well.</div>
                  :
                  <div>Your clothes made you uncomfortable, but, well... You chose to be uncomfortable because of the style, right?</div>
                }
              </div>
            </div>

            {/*MUSIC*/}
            <div style={{padding: '2%'}}>
              <div style={{fontFamily: "Abril fatface", fontSize: '1.5em', padding: '3%'}}>
                {data.gameData.dishText.indexOf( data.gameplayData.selectedDish.name ) >= 0 ?
                  <div>Todo mundo curtiu o som que você escolheu. Que festa boa!</div>
                  :
                  <div>O clima ficou meio estranho - talvez você não tenha escolhido a música direito.</div>
                }
              </div>
              <hr style={{margin: '7% auto', borderColor:'#59316d', width: '30%' }}/>
              <div style={{fontStyle: 'italic', fontSize: '1em', padding: '3%'}}>
                {data.gameData.dishText.indexOf( data.gameplayData.selectedDish.name ) >= 0 ?
                  <div>Everyone enjoyed the song you chose. What a good party!</div>
                  :
                  <div>The mood got a little weird - maybe you didn't choose the song well enough.</div>
                }
              </div>
            </div>
          </div>



        </div>
        <Voltar label={'Jogar novamente'} onClick={restart} style={{marginRight: '5%'}}/>
        <Iniciar label={'Sair do jogo'} onClick={leave}/>
      </div>

    </div>
  )
}

export default Feedback
