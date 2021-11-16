import React from 'react'
import initialState from './initialState.js'
import Writer from '../../_components/Writer'
import { Iniciar } from '../../_components/Button'
import Blob, { BlobBg } from '../../_components/Blob'
import RotationFocus from '../../_components/RotationFocus'
import HandPhone from '../../_components/HandPhone'
import FullscreenOverlay from '../../_components/FullscreenOverlay'

const dishPositions = [
  {top: 4, left: 35},
  {top: 8, left: 57},
  {top: 21, left: 16},
  {top: 39, left: 35},
  {top: 38, left: 60}
]
const Core = ({data}) => {
  const [state, setState] = React.useState(initialState())

  return(
    <div>
      {(function steps(){
        switch(state.scene)
        {
          case 'PLATE_TUTORIAL':
            return(
              <React.Fragment>
                <BlobBg style={{position: 'absolute', width: '100%', height: '100%'}}/>
                <div style={{position: 'absolute', bottom: '10%', left: '10%', width: '85%', height: '45%',
                  padding: '2% 5% 2% 15%',
                  backgroundColor: '#59316d',
                  borderTopRightRadius: '2% 7%',
                  boxShadow: '3px 3px rgb(0 0 0 / 0.3)'}}>
                  <Writer text={data.introText} style={{height: '10%'}}/>
                  <div style={{display: 'flex', flexDirection: 'row', padding: '0 0 0 12%'}}>
                    <span style={{fontSize: '3.5em'}}>1. </span>
                    <Writer text={'disso'} style={{padding: 0, margin: 0, height: '10%', width: '50%', display: 'inline'}}/>
                  </div>
                  <div style={{display: 'flex', flexDirection: 'row', padding: '0 0 0 12%'}}>
                    <span style={{fontSize: '3.5em'}}>2. </span>
                    <Writer text={'disso'} style={{padding: 0, margin: 0, height: '10%', width: '50%', display: 'inline'}}/>
                  </div>
                  <div style={{display: 'flex', flexDirection: 'row', padding: '0 0 0 12%'}}>
                    <span style={{fontSize: '3.5em'}}>3. </span>
                    <Writer text={'disso'} style={{padding: 0, margin: 0, height: '10%', width: '50%', display: 'inline'}}/>
                  </div>
                  <hr/>
                  <p style={{fontSize: '3.5em', padding: '1% 5% 0 12%'}}>
                    {data.introTextTranslation}<br/>
                    <span>1. </span>
                    <span>{'this'}</span><br/>
                    <span>2. </span>
                    <span>{'this'}</span><br/>
                    <span>3. </span>
                    <span>{'this'}</span>
                  </p>
                  <Iniciar style={{position: 'absolute', bottom: '-7%', right: '10%', fontSize: '2.5em'}}
                    label='Continue' onClick={() => setState(s => ({...s, scene: 'CHOOSE_PLATE'}))}/>
                </div>
                <img src={data.character.characterAssets[0].image.url}
                  style={{position: 'absolute', bottom: '-30%', left: '-12%', maxWidth: '45%'}}/>
              </React.Fragment>
            )
          case 'CHOOSE_PLATE':
            return(
              <React.Fragment>
                {state.dishConfirmed ?
                  <RotationFocus imageUrl={state.selectedDish.image? state.selectedDish.image.url : 'https://res.cloudinary.com/learning-tool/image/upload/v1626714616/Feijoada_b154e2d6f2.svg'} />
                  :
                  <React.Fragment>
                    <BlobBg style={{position: 'absolute', width: '100%', height: '100%'}}/>
                    {state.hoveredDish &&
                      <div style={{zIndex: 99, pointerEvents: 'none',
                        position: 'absolute', width: '20%', top: `${state.hoveredDish.top + 19}%`, left: `${state.hoveredDish.left + 14}%`,
                        padding: '2.5%',
                        backgroundColor: '#F9AFA1', fontSize: '3em', fontWeight: '5', borderRadius: '5%'}}
                      >
                        <strong>Ingredientes:</strong>
                        {state.hoveredDish.ingredients.map((ingredient, index) =>
                          <div key={index} style={{fontStyle: 'italic'}}>
                            {ingredient.name}
                          </div>
                        )}
                      </div>
                    }
                    {data.dishes.map((dish, index) =>
                      <img key={index}
                        onClick={() => setState(s => ({...s, selectedDish: dish}))}
                        onMouseEnter={(e) => setState( s => ({...s, hoveredDish: {...dish, ...dishPositions[index], index} }))}
                        onMouseLeave={(e) => setState( s => ({...s, hoveredDish: null}))}
                        src={dish.image? dish.image.url : 'https://res.cloudinary.com/learning-tool/image/upload/v1626714616/Feijoada_b154e2d6f2.svg'} alt={dish.name}
                        style={{position: 'absolute', top: `${dishPositions[index].top}%`, left: `${dishPositions[index].left}%`,
                          maxWidth: '20%', zIndex: state.hoveredDish && state.hoveredDish.index === index? 100 : 0 }}
                      />
                    )}
                  </React.Fragment>
                }
                <div style={{position: 'absolute', bottom: '10%', left: '10%', width: '85%', height: '15%',
                  padding: '2% 5% 2% 15%',
                  backgroundColor: '#59316d',
                  borderTopRightRadius: '2% 7%',
                  boxShadow: '3px 3px rgb(0 0 0 / 0.3)'}}>
                  <Writer text={state.dishConfirmed? "O prato está pronto! Agora você precisa se vestir!" : data.dishText} style={{height: '10%'}}/>

                  {state.selectedDish &&
                    <Iniciar style={{position: 'absolute', bottom: '-20%', right: '10%', fontSize: '2.5em'}}
                      label='Continue' onClick={() => setState(s =>  state.dishConfirmed ?  ({...s, scene: 'LOOK_TUTORIAL'}): ({...s, dishConfirmed: true}))}
                    />
                  }
                </div>
                <img src={data.character.characterAssets[2].image.url}
                  style={{position: 'absolute', bottom: '-30%', left: '-5%', maxWidth: '35%'}}
                />
              </React.Fragment>
            )
          case 'LOOK_TUTORIAL':
            return(
              <React.Fragment>
                <FullscreenOverlay style={{backgroundColor: '#f9afa1'}}showCloseBtn={false}>
                  <BlobBg blob={{fill: '#f79e8f'}}style={{position: 'absolute', width: '100%', height: '100%'}}/>
                  <HandPhone screenBackgroundColor={'#d6e3f4'}>
                    <div>
                      {data.invite.message}
                    </div>
                    <Iniciar style={{fontSize: '2.5em'}}
                      label='Entendi!' onClick={() => setState(s =>  state.dishConfirmed ?  ({...s, scene: 'CHOOSE_LOOK'}): ({...s, dishConfirmed: true}))}
                    />
                  </HandPhone>
                </FullscreenOverlay>
              </React.Fragment>
            )
          case 'CHOOSE_LOOK':
            return(
              <div>
                Tutorial de roupa
              </div>
            )
          case 'CHOOSE_MUSIC':
            return(
              <div>Escolha a música</div>
            )
          default:
            return(
              <div>Error</div>
            )
        }}
      )()}
    </div>
  )
}

export default Core
