import React from 'react'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline'
import Button from '@material-ui/core/Button'
import ReactAudioPlayer from "react-audio-player";
import './index.scss'

const MusicCard = ({music, imageUrl, onClickPlay, onClickPause, style, ...props}) => {
  const [playing, setPlaying] = React.useState(false);
  const musicObject = new Audio(music.url)
  React.useEffect(() => {
    if(playing) musicObject.play()
    else musicObject.pause()
    return () => {musicObject.pause()}
  }, [playing])
  return(
    <div style={{display: 'flex', flexDirection: 'column', backgroundColor: '#fff7ea', borderRadius: '5% / 10%', borderTopRightRadius: 0, overflow: 'hidden', ...style}} {...props}>
      <div style={{display: 'flex', flexDirection: 'row', height: '100%'}}>
        <img src={music.cover ? music.cover.url : ''} alt='' style={{width: '40%', backgroundColor: '#ffAAAA'}}/>
        <div style={{fontSize: '2.5em', padding: '5%'}}>
          <div>{music.name}</div>
          <div style={{fontSize: '0.7em', fontStyle: 'italic'}}>{music.artist}</div>
        </div>
      </div>
      <div style={{backgroundColor: '#59316d', textAlign: 'center'}}>
        <div style={{cursor: 'pointer'}}onClick={() => {
            if(playing){
              if(onClickPause) onClickPause()
            }else{
              if(onClickPlay) onClickPlay()
            }
            setPlaying(!playing);
          }}
          >
          {playing?
            <PauseCircleOutlineIcon />
            :
            <PlayArrowIcon />
          }
          </div>
      </div>
    </div>
  )
}

export default MusicCard
