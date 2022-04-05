import React from 'react'
import initialState from './initialState.js'
import Writer from '../../_components/Writer'
import { Iniciar, Voltar, PularTutorial } from '../../_components/Button'
import Blob, { BlobBg } from '../../_components/Blob'
import RotationFocus from '../../_components/RotationFocus'
import HandPhone from '../../_components/HandPhone'
import FullscreenOverlay from '../../_components/FullscreenOverlay'
import TutorialBlob from '../../_components/TutorialBlob'
import DressingCharacter from '../../_components/DressingCharacter'
import { blobLowScore, dressingBg, hanger, partyBG } from '../../img'
import Wardrobe from '../../_components/Wardrobe'
import Lamp from '../../_components/Lamp'
import CellphoneOverlay from '../Game6/components/CellphoneOverlay'
import Notification from '../Game6/components/Notification'
import MusicCard from '../../_components/MusicCard'
import SmallPhone from '../../_components/SmallPhone'

import { useDispatch, useSelector } from 'react-redux'
import { musicActions } from '../../_actions'
import Speller from '../../_components/Speller'

const dishPositions = [
  {top: 4, left: 35},
  {top: 8, left: 57},
  {top: 21, left: 16},
  {top: 39, left: 35},
  {top: 38, left: 60}
]
const Core = ({data, onEndGame}) => {
  const [state, setState] = React.useState(initialState(data))
  const dispatch = useDispatch()
  const addClothesToBody = (item) => () => {
    const wardrobeBody = ["Tronco", "Pernas", "Pés"];
    const covers = ["inteiro", "default"];
    var clothes = { ...state.clothes };

    if (wardrobeBody.includes(item.category)) {
      if (
        (clothes[item.category].length !== 0 &&
          clothes[item.category].filter(
            (clothing) =>
              clothing.cover === item.cover ||
              (covers.includes(clothing.cover) && covers.includes(item.cover))
          ).length !== 0) ||
        (clothes["Tronco"].filter((clothing) => clothing.cover === "inteiro")
          .length !== 0 &&
          item.category !== "Pés" &&
          item.cover === "default") ||
        (item.cover === "inteiro" && clothes["Pernas"].length !== 0)
      ) {
        setState((s) => ({
          ...s,
          showClothingSpaceTakenErrorNotification: true,
        }));
      } else {
        clothes[item.category] = [...clothes[item.category], item];

        clothes[item.category].sort((a, b) => {
          let weights = ["baixo", "default", "inteiro", "cima"];
          return weights.indexOf(a.cover) < weights.indexOf(b.cover) ? -1 : 1;
        });

        setState((s) => ({
          ...s,
          clothes: clothes,
          wardrobe: {
            ...s.wardrobe,
            [item.category]: state.wardrobe[item.category].map((clothing) => {
              if (clothing.id === item.id) return { ...clothing, picked: true };
              return clothing;
            }),
          },
        }));
      }
    } else {
      if (
        clothes["Acessórios"].length !== 0 &&
        clothes["Acessórios"].find(
          (clothing) => clothing.category === item.category
        )
      ) {
        setState((s) => ({
          ...s,
          showClothingSpaceTakenErrorNotification: true,
        }));
      } else {
        clothes["Acessórios"] = [...clothes["Acessórios"], item];

        setState((s) => ({
          ...s,
          clothes: clothes,
          wardrobe: {
            ...s.wardrobe,
            Acessórios: state.wardrobe["Acessórios"].map((clothing) => {
              if (clothing.id === item.id) return { ...clothing, picked: true };
              return clothing;
            }),
          },
        }));
      }
    }
  };
  const removeClothesFromBody = (item) => () => {
    var clothes = { ...state.clothes };
    const category = ["Tronco", "Pernas", "Pés"].includes(item.category)
      ? item.category
      : "Acessórios";

    setState((s) => ({
      ...s,
      clothes: {
        ...clothes,
        [category]: clothes[category].filter(
          (clothing) => clothing.id !== item.id
        ),
      },
      wardrobe: {
        ...s.wardrobe,
        [category]: state.wardrobe[category].map((clothing) => {
          if (clothing.id === item.id) return { ...clothing, picked: false };
          return clothing;
        }),
      },
    }));
  };

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
                  padding: '1.5% 5% 2% 24%',
                  backgroundColor: '#59316d',
                  borderTopRightRadius: '2% 7%',
                  boxShadow: '3px 3px rgb(0 0 0 / 0.3)'}}>
                  <Writer text={data.introText} style={{height: '50%', fontSize: '3em', paddingLeft: '10%'}} onWritten={() => setState(s => ({...s, introTextShown: true}))}/>
                  <hr/>
                  {state.introTextShown &&
                    <div style={{fontSize: '3em', padding: '1.5% 5% 2% 10%'}}>
                      {data.introTextTranslation}
                    </div>
                  }
                  <Iniciar style={{position: 'absolute', bottom: '-7%', right: '10%', fontSize: '2.5em'}}
                    label='Continue' onClick={() => setState(s => ({...s, scene: 'CHOOSE_PLATE'}))}/>
                </div>
                <img src={data.character.characterAssets[2].image.url}
                  style={{position: 'absolute', top: '30%', left: '-9%', maxWidth: '52%'}}/>
              </React.Fragment>
            )
          case 'CHOOSE_PLATE':
            return(
              <React.Fragment>
                {state.dishConfirmed ?
                  <RotationFocus
                    style={{position: 'absolute', left: '-2.5%', top: '15%', width: '100%', height: '100%'}}
                    imageUrl={state.selectedDish.image?
                      state.selectedDish.image.url :
                      'https://res.cloudinary.com/learning-tool/image/upload/v1626714616/Feijoada_b154e2d6f2.svg'}
                  />
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
                        src={dish.silhouette? dish.silhouette[0].url : 'https://res.cloudinary.com/learning-tool/image/upload/v1626714616/Feijoada_b154e2d6f2.svg'} alt="???"
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
                      label='Continue' onClick={() => setState(s =>  state.dishConfirmed ?  ({...s, scene: 'LOOK_INTRO'}): ({...s, dishConfirmed: true}))}
                    />
                  }
                </div>
                <img src={data.character.characterAssets[2].image.url}
                  style={{position: 'absolute', bottom: '-55%', left: '-5%', maxWidth: '35%'}}
                />
              </React.Fragment>
            )
          case 'LOOK_INTRO':
            return(
              <React.Fragment>
                <FullscreenOverlay style={{backgroundColor: '#f9afa1'}}showCloseBtn={false}>
                  <BlobBg blob={{fill: '#f79e8f'}}style={{position: 'absolute', width: '100%', height: '100%'}}/>
                  <HandPhone screenBackgroundColor={'#d6e3f4'}>
                    <div style={{fontSize: '4em', color: 'rgb(90 50 110)', textAlign: 'center', paddingTop: '50%'}}>
                      {data.invite.message}
                    </div>
                    <Iniciar style={{fontSize: '2.5em', position: 'absolute', bottom: '15%', left: '25%' }}
                      label='Entendi!' onClick={() => setState(s =>  state.dishConfirmed ?  ({...s, scene: 'LOOK_CHOOSE_CHARACTER'}): ({...s, dishConfirmed: true}))}
                    />
                  </HandPhone>
                </FullscreenOverlay>
              </React.Fragment>
            )
          case 'LOOK_CHOOSE_CHARACTER':
            return(
              <React.Fragment>
                {state.showTutorialBlob && (
                  <TutorialBlob
                    text={
                      state.tutotialMessages[state.tutorialBlobCount].text
                    }
                    translation={
                      state.tutotialMessages[state.tutorialBlobCount]
                        .textTranslate
                    }
                    position={
                      state.tutotialMessages[state.tutorialBlobCount]
                        .position
                    }
                    endTutorial={
                      state.tutorialBlobCount ===
                      state.tutotialMessages.length - 1
                    }
                    onContinue={() =>
                      setState((s) => ({
                        ...s,
                        tutorialBlobCount: s.tutorialBlobCount + 1,
                        showTutorialBlob: false,
                      }))
                    }
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      zIndex: 10,
                      top: 0,
                      backgroundColor: "rgba(255,255,255,0.66)",
                    }}
                  />
                )}

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <img
                    src={blobLowScore}
                    style={{
                      position: "absolute",
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                    }}
                    alt="background-blob"
                  />
                {data.dressingCharacters.map((character, index) => (
                    <DressingCharacter
                      key={index}
                      clothes={state.clothes}
                      character={character}
                      style={{
                        height: "108em",
                        width: "60em",
                        cursor: "pointer",
                        position: "relative",
                      }}
                      onClick={() => setState((s) => ({...s,
                          choosenCharacter: character,
                          scene: 'CHOOSE_LOOK'
                      }))}
                    />
                  ))}
                </div>
              </React.Fragment>
            )
          case 'CHOOSE_LOOK':
            return(
              <React.Fragment>
                {state.showTutorialBlob && (
                  <TutorialBlob
                    text={
                      state.tutotialMessages[state.tutorialBlobCount].text
                    }
                    translation={
                      state.tutotialMessages[state.tutorialBlobCount]
                        .textTranslate
                    }
                    position={
                      state.tutotialMessages[state.tutorialBlobCount]
                        .position
                    }
                    endTutorial={
                      state.tutorialBlobCount ===
                      state.tutotialMessages.length - 1
                    }
                    onContinue={() => {
                      if (
                        state.tutorialBlobCount <
                        state.tutotialMessages.length - 1
                      )
                        setState((s) => ({
                          ...s,
                          tutorialBlobCount: s.tutorialBlobCount + 1,
                        }));
                      else
                        setState((s) => ({
                          ...s,
                          tutorialBlobCount: s.tutorialBlobCount + 1,
                          showTutorialBlob: false,
                        }));
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      zIndex: 10,
                      position: "absolute",
                      top: 0,
                      backgroundColor: "rgba(255,255,255,0.66)",
                    }}
                  />
                )}

                <React.Fragment>

                  <div style={{ position: "absolute", width: '100%', height: '100%', left: '50%' }}>
                    <img
                      src={dressingBg}
                      alt=""
                    />
                  </div>
                  <DressingCharacter
                    character={state.choosenCharacter}
                    clothes={state.clothes}
                    showRemove
                    onRemoveClick={removeClothesFromBody}
                    style={{
                      width: "52em",
                      height: "95em",
                      zIndex: state.tutorialBlobCount === 2 ? 1000000 : 0,
                      position: "absolute",
                      bottom: "5em",
                      right: "28em",
                    }}
                  />

                  <Wardrobe
                    style={{
                      zIndex: state.tutorialBlobCount === 1 ? 1000000 : 0,
                      position: "absolute",
                      left: "9.5em",
                      top: "10.8em",
                      width: "86em",
                      height: "86em",
                    }}
                    wardrobe={state.wardrobe}
                    onClothesClick={
                      state.showTutorialBlob ? () => {} : addClothesToBody
                    }
                  />

                <Iniciar
                    onClick={
                      state.showTutorialBlob
                        ? () => {}
                        : () => {
                            let ready =
                              state.clothes["Tronco"].length > 0 &&
                              (state.clothes["Tronco"].find(
                                (clothing) => clothing.cover === "inteiro"
                              ) ||
                                state.clothes["Pernas"].length > 0);
                            setState((s) => ({
                              ...s,
                              ready: ready,
                              readyAlert: !ready,
                              dressingContext: !ready,
                            }));
                          }
                    }
                    label="Estou pronto!"
                    style={{
                      position: 'absolute',
                      fontSize: '2em',
                      bottom: "10%",
                      right: "5%",
                      zIndex: state.tutorialBlobCount === 4 ? 1000000 : 0,
                    }}
                  />
                <SmallPhone style={{position: 'absolute', left: '50%', bottom: 0, width: '10%'}} onClick={() => setState(s => ({...s, viewPartyInfo: true})) }/>
                {state.viewPartyInfo &&
                  <FullscreenOverlay style={{backgroundColor: '#f9afa1'}}showCloseBtn={false}>
                    <BlobBg blob={{fill: '#f79e8f'}}style={{position: 'absolute', width: '100%', height: '100%'}}/>
                    <HandPhone screenBackgroundColor={'#d6e3f4'}>
                      <div style={{fontSize: '2.5em', color: 'rgb(90 50 110)', textAlign: 'center', paddingTop: '50%'}}>
                        {!state.hideCellphoneOptions &&
                          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                            <PularTutorial label='Que horas?'  showArrow={false} onClick={() => setState(s => ({...s, showPartyTime: true, hideCellphoneOptions: true}))} />
                            <PularTutorial label='Qual estação?'  showArrow={false} onClick={() => setState(s => ({...s, showPartySeason: true, hideCellphoneOptions: true}))}/>
                            <PularTutorial label='Como vai estar o tempo?'  showArrow={false} onClick={() => setState(s => ({...s, showPartyWeather: true, hideCellphoneOptions: true}))}/>
                          </div>
                        }
                        {state.showPartyTime &&
                          <PularTutorial label={data.invite.time} style={{pointerEvents: 'none'}} showArrow={false}/>
                        }
                        {state.showPartySeason &&
                          <PularTutorial label={data.invite.season} style={{pointerEvents: 'none'}} showArrow={false}/>
                        }
                        {state.showPartyWeather &&
                          <PularTutorial label={data.invite.weather} style={{pointerEvents: 'none'}} showArrow={false}/>
                        }
                      </div>
                      <Voltar style={{fontSize: '2.5em', position: 'absolute', bottom: '15%', left: '25%' }}
                        label='Voltar' onClick={() => {
                          let updateState = {}
                          if(!(state.showPartyTime || state.showPartySeason || state.showPartyWeather)){
                            updateState.viewPartyInfo = false
                          }
                          updateState.showPartyTime = false
                          updateState.showPartySeason = false
                          updateState.showPartyWeather = false
                          updateState.hideCellphoneOptions = false

                          setState(s => ({...s, ...updateState}))
                        }}
                      />
                    </HandPhone>
                  </FullscreenOverlay>

                }
                </React.Fragment>

                {state.showClothingSpaceTakenErrorNotification && (
                  <Notification
                    blobMessage={{
                      text:
                        "Você já vestiu uma roupa para essa parte do corpo! Para vestir outra remova a que já esta antes.",
                      textTranslate:
                        "You've already worn an outfit for that body part! To wear another one, remove the one that is already there.",
                    }}
                    continueButtonLabel="Ok!"
                    onClickToContinue={() =>
                      setState((s) => ({
                        ...s,
                        showClothingSpaceTakenErrorNotification: false,
                      }))
                    }
                  />
                )}

                {state.readyAlert && (
                  <Notification
                    blobMessage={{
                      text: "Você não pode sair vestindo tão pouco!",
                      textTranslate: "You can't leave wearing so little!",
                    }}
                    continueButtonLabel="Voltar ao closet/Back to closet"
                    onClickToContinue={() =>
                      setState((s) => ({ ...s, readyAlert: false }))
                    }
                  />
                )}

                {state.ready && (
                  <FullscreenOverlay showCloseBtn={false} bgRGBA={{r: 214, g: 227, b: 250, a: 100}}>
                    <BlobBg  blob={{fill: '#abb6c8'}}  style={{width: '100%', height: '100%'}}/>
                    <div className="character" style={{position: 'absolute', top: '5%', left: '5%'}}>
                      <div
                        id="shadow"
                        style={{
                          backgroundColor: "black",
                          height: "8em",
                          width: "30em",
                          position: "absolute",
                          right: "11em",
                          bottom: "7.5%",
                          borderRadius: "100%",
                          opacity: 0.2,
                        }}
                      ></div>
                      <DressingCharacter
                        character={state.choosenCharacter}
                        clothes={state.clothes}
                        style={{
                          height: "100em",
                          width: "50em",
                          right: "20em",
                        }}
                      />
                    </div>

                    <div
                      className="confirm-blob"
                      style={{ textAlign: "center", position: 'absolute', right: '17%', top: '47%', left: 'auto', justifyContent: 'space-evenly'}}
                    >
                      <div style={{color: 'white', fontSize: '2em'}}>
                        Pronto para sair?
                        <hr/>
                        <div style={{fontStyle: 'italic'}}>Ready to go?</div>
                      </div>
                      <div></div>
                      <div className="btns">
                        <Voltar
                          label="Ainda não/Not yet"
                          onClick={() =>
                            setState((s) => ({
                              ...s,
                              ready: false,
                              dressingContext: true,
                            }))
                          }
                        />
                        <Iniciar
                          label="Sim!/Yes!"
                          onClick={() =>
                            setState((s) => ({
                              ...s,
                              scene: "CHOOSE_MUSIC_INTRO",
                            }))
                          }
                        />
                      </div>
                    </div>
                  </FullscreenOverlay>
                )}
              </React.Fragment>
            )
          case 'CHOOSE_MUSIC_INTRO':
            return(
              <React.Fragment>
                <BlobBg blob={{fill: '#f79e8f'}} style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: '#f9afa1'}}/>
                <DressingCharacter
                  character={state.choosenCharacter}
                  clothes={state.clothes}
                  style={{
                    position: 'absolute',
                    height: '200%',
                    width: '60%',
                    right: '-10%',
                    transform: 'scaleX(-1)'
                  }}
                />
                <div style={{position: 'absolute', bottom: '10%', left: '10%', width: '75%', height: '25%',
                  padding: '2% 5% 2% 15%',
                  backgroundColor: '#59316d',
                  borderTopRightRadius: '2% 7%',
                  boxShadow: '3px 3px rgb(0 0 0 / 0.3)'}}>
                  <Writer text={'Agora, vamos escolher a música!'} style={{height: '10%'}}/>
                  <div style={{position: 'absolute', top: '50%', paddingLeft: '16.5%'}}>
                    <hr/>
                    <div style={{fontSize: '3em', fontStyle: 'italic', marginTop: '5%'}}>
                      Now, let's choose the music!
                    </div>
                  </div>
                  <Iniciar style={{position: 'absolute', bottom: '-20%', right: '10%', fontSize: '2.5em'}}
                    label='Continue' onClick={() => setState(s =>  ({...s, scene: 'CHOOSE_MUSIC'}) )}
                  />
                </div>
                <img src={data.character.characterAssets[1].image.url}
                  style={{position: 'absolute', bottom: '-30%', left: '-10%', maxWidth: '50%'}}
                />
              </React.Fragment>
            )
          case 'CHOOSE_MUSIC':
            return(
              <React.Fragment>
                <BlobBg blob={{fill: '#ffebcb'}} style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: '#fff7ea', zIndex: -1}}/>
                <div style={{position: 'absolute', top: '12.5%', left: '20%', width: '60%', height: '70%'}}>
                  <div style={{fontSize: '4em', textAlign: 'center', marginBottom: '8%', color: '#59316d'}}>
                    Escolha a Trilha!
                  </div>
                  <div style={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', height: '45%', rowGap: '20%'}}>
                    {data.musics.map((music, index) =>
                      <div key={index} style={{padding: '0.5% 1%', width: '33%', height: '51%'}}
                      >
                        <MusicCard onClick={() => setState(s => ({...s, selectedMusic: music}) )}
                           music={music}
                          style={{cursor: 'pointer', margin: '1%',
                            opacity: (typeof(state.hoveredMusic) === 'number'? (state.hoveredMusic === index? 1 : 0.6): 1),
                            border: (state.selectedMusic === music? 'outset 3px #cf1bcf' : 'none')
                          }}
                          onMouseEnter={() => setState(s => ({...s, hoveredMusic: index}))}
                          onMouseLeave={() => setState(s => ({...s, hoveredMusic: null}))}
                          onClickPlay={() => dispatch(musicActions.pause()) }
                          onClickPause={() => dispatch(musicActions.play()) }
                        />
                      </div>
                    )}
                  </div>
                </div>
                {state.selectedMusic &&
                  <Iniciar style={{position: 'absolute', bottom: '7%', right: '7.5%', fontSize: '3em'}}
                    label='Continue' onClick={() => setState(s => ({...s, scene: 'SET_MUSIC_NAME'})) }
                  />
                }
              </React.Fragment>
            )
          case 'SET_MUSIC_NAME':
            return(
              <React.Fragment>
                <BlobBg blob={{fill: '#ffebcb'}} style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: '#fff7ea', zIndex: -1}}/>
                <div style={{position: 'absolute', top: '10%', textAlign: 'center', width: '100%', fontSize: '4em', color: '#59316D'}}>
                  Qual o gênero musical escolhido?
                </div>
                <Speller word={state.selectedMusic.genre} onWordChange={ word => setState(s => ({...s, formedWord: word}) )}/>
                <div style={{position: 'absolute', bottom: '10%', width: '100%', zIndex: '10'}}>
                  <MusicCard music={state.selectedMusic} style={{width: '20%', margin: '0 auto'}}/>
                </div>
                {state.formedWord && state.formedWord.length === state.selectedMusic.genre.length &&
                  <Iniciar style={{position: 'absolute', bottom: '7%', right: '7.5%', fontSize: '3em'}}
                    label='Hora da festa!' onClick={() => {
                      dispatch(musicActions.set(state.selectedMusic.url))
                      setState(s => ({...s, scene: 'PARTY' }))
                    }}
                  />
                }
              </React.Fragment>
            )
          case 'PARTY':
            return(
              <React.Fragment>
                <img src={partyBG}/>
                <DressingCharacter
                  character={state.choosenCharacter}
                  clothes={state.clothes}
                  style={{
                    position: 'absolute',
                    height: '200%',
                    width: '63%',
                    right: '-15%',
                    transform: 'scaleX(-1)',
                    top: 0
                  }}
                />
                <img src={data.character.characterAssets[1].image.url}
                  style={{position: 'absolute', bottom: '-30%', left: '-10%', maxWidth: '50%'}}
                />
              <Iniciar label='Ver resultado' onClick={() => onEndGame({gameData: {...data}, gameplayData: {...state}})}
                style={{position: 'absolute', right: '10%', bottom: '5%', fontSize: '3em'}}/>
              </React.Fragment>
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
