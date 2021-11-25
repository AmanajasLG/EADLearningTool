import React from 'react'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline'

const MusicCard = ({music, imageUrl, onClickPlay, onClickPause, style, ...props}) => {
  return(
    <div style={{display: 'flex', flexDirection: 'column', backgroundColor: 'green', borderRadius: '5% / 10%', borderTopRightRadius: 0, overflow: 'hidden', ...style}} {...props}>
      <div style={{display: 'flex', flexDirection: 'row', height: '100%'}}>
        <img src={music.cover ? music.cover.url : ''} alt='' style={{width: '40%', backgroundColor: '#ffAAAA'}}/>
        <div style={{fontSize: '2.5em', padding: '5%'}}>
          <div>{music.name}</div>
          <div style={{fontSize: '0.7em', fontStyle: 'italic'}}>{music.artist}</div>
        </div>
      </div>
      <div style={{backgroundColor: '#59316d', textAlign: 'center'}}>
        <PlayArrowIcon />
        <PauseCircleOutlineIcon />
      </div>
    </div>
  )
}

export default MusicCard
