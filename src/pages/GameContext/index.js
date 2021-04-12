import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { headerActions } from '../../_actions'
import ConfigWindow from '../../_components/ConfigWindow'
import GameConfig from '../../_components/GameConfig'
import ReactAudioPlayer from 'react-audio-player'
import config from '../../img/i-settings.svg'
import './index.scss'
import { headerConstants } from '../../_constants'

const GameContext = (props) => {
  const [state, setState] = React.useState({
    volume: 15,
    fontSize: 12,
    assistMode: false,
    accessibility: 'NONE',
    gameConfig: false,
    back: false,
    config: false,
  })

  const dispatch = useDispatch()
  const music = useSelector(state => state.music)
  let headerInfo = useSelector(state => state.header)

  let { children } = props
  children = {...children, props: {...props} }

	React.useEffect(() => {
		dispatch(headerActions.setState(headerConstants.STATES.HIDDEN))
		return () => {
      dispatch(headerActions.clearAll())
      dispatch(headerActions.setState(headerConstants.STATES.NORMAL))
    }
	}, [dispatch])

  return(
    <div id="game-context">
      { (headerInfo.state === headerConstants.STATES.HIDDEN) &&
        <div id="floating-config-btn" onClick={() => setState({...state, config: true}) }>
          <img src={config} alt='config' />
        </div>
      }
      <ReactAudioPlayer
				src={music.url}
				autoPlay volume={state.volume/100}
			/>
      { state.config &&
        <ConfigWindow
          onConfig={()=>setState({...state, config: false, gameConfig: true})}
          onStatistics={()=>{}}
          onLeave={()=>setState({...state, back: true})}
          onClose={()=>setState({...state, config: false})}
        />
      }
      {
        state.gameConfig &&
        <GameConfig
          volume={state.volume}
          onVolumeMute={()=> setState({...state, volume: 0})}
          onVolumeUp={()=> setState({...state, volume: 100})}
          onVolumeChange={(e, newValue)=> setState({...state, volume: newValue})}
          fontSize={state.fontSize} onFontSizeChange={(e, newValue) => setState({...state, fontSize: newValue})}
          assistMode={state.assistMode} onAssistModeChange={(e)=>setState({...state, assistMode: e.target.checked})}
          onAccessibilityLeft={()=>{}} onAccessibilityRight={()=>{}}
          onBack={()=>setState({...state, gameConfig: false, config: true})}
          onClose={()=>setState({...state, gameConfig: false})}
        />
      }
      {children}
      { state.back && <Redirect to='/userspace' />}
    </div>
  )
}
export default GameContext