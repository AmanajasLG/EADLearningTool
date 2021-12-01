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
                  <div>A escolha de {data.gameplayData.selectedDish.name} foi um sucesso!</div>
                  :
                  <div>O pessoal na festa esperava que você levasse o que o {data.gameData.character.name} recomendou, mas tudo bem, outras festas virão!</div>
                }
              </div>
              <hr style={{margin: '7% auto', borderColor:'#59316d', width: '30%' }}/>
              <div style={{fontStyle: 'italic', fontSize: '1em', padding: '3%'}}>
                {data.gameData.dishText.indexOf( data.gameplayData.selectedDish.name ) >= 0 ?
                  <div>Choosing {data.gameplayData.selectedDish.name} was a success!</div>
                  :
                  <div>People at the party was expecting you to bring what {data.gameData.character.name} recomended, but it's ok, other parties will come!</div>
                }
              </div>
            </div>

            {/*CLOTHES*/}
            <div style={{padding: '2%'}}>
              <div style={{fontFamily: "Abril fatface", fontSize: '1.5em', padding: '3%'}}>
                {data.gameData.dishText.indexOf( data.gameplayData.selectedDish.name ) >= 0 ?
                  <div>A escolha de {data.gameplayData.selectedDish.name} foi um sucesso!</div>
                  :
                  <div>O pessoal na festa esperava que você levasse o que o {data.gameData.character.name} recomendou, mas tudo bem, outras festas virão!</div>
                }
              </div>
              <hr style={{margin: '7% auto', borderColor:'#59316d', width: '30%' }}/>
              <div style={{fontStyle: 'italic', fontSize: '1em', padding: '3%'}}>
                {data.gameData.dishText.indexOf( data.gameplayData.selectedDish.name ) >= 0 ?
                  <div>Choosing {data.gameplayData.selectedDish.name} was a success!</div>
                  :
                  <div>People at the party was expecting you to bring what {data.gameData.character.name} recomended, but it's ok, other parties will come!</div>
                }
              </div>
            </div>

            {/*MUSIC*/}
            <div style={{padding: '2%'}}>
              <div style={{fontFamily: "Abril fatface", fontSize: '1.5em', padding: '3%'}}>
                {data.gameData.dishText.indexOf( data.gameplayData.selectedDish.name ) >= 0 ?
                  <div>A escolha de {data.gameplayData.selectedDish.name} foi um sucesso!</div>
                  :
                  <div>O pessoal na festa esperava que você levasse o que o {data.gameData.character.name} recomendou, mas tudo bem, outras festas virão!</div>
                }
              </div>
              <hr style={{margin: '7% auto', borderColor:'#59316d', width: '30%' }}/>
              <div style={{fontStyle: 'italic', fontSize: '1em', padding: '3%'}}>
                {data.gameData.dishText.indexOf( data.gameplayData.selectedDish.name ) >= 0 ?
                  <div>Choosing {data.gameplayData.selectedDish.name} was a success!</div>
                  :
                  <div>People at the party was expecting you to bring what {data.gameData.character.name} recomended, but it's ok, other parties will come!</div>
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
