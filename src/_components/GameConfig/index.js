import React from 'react'
import Config from '../Config'
import Button from '@material-ui/core/Button'
import VolumeMute from '@material-ui/icons/VolumeMute'
import VolumeUp from '@material-ui/icons/VolumeUp'
import Slider from '@material-ui/core/Slider'
import Checkbox from '@material-ui/core/Checkbox'


const GameConfig = (
  {
    onVolumeMute, onVolumeUp, volume, onVolumeChange,
    fontSize, onFontSizeChange, assistMode, onAssistModeChange,
    onAccessibilityLeft, onAccessibilityRight,
    onBack, onClose
  }) => {
  return(
    <Config>
      <div id="title">
        <span lang="pt-br">Configurações de jogo</span>
        <div className="divider"></div>
        <span lang="en">Game settings</span>
      </div>
      <table id="game-options">
        <tr>
          <td>
            <span lang="pt-br">Volume</span>
            <span lang="en">Volume</span>
          </td>
          <td>
            <Button onClick={onVolumeMute}>
              <VolumeMute />
            </Button>
              <Slider value={volume} onChange={onVolumeChange}/>
            <Button onClick={onVolumeUp}>
              <VolumeUp />
            </Button>
          </td>
        </tr>
        <tr>
          <td>
            <span lang="pt-br">Tamanho da fonte</span>
            <span lang="en">Font size</span>
          </td>
          <td>
            <Slider value={fontSize} onChange={onFontSizeChange}/>
          </td>
        </tr>
        <tr>
          <td>
            <span lang="pt-br">Modo assistência</span>
            <span lang="en">Assist mode</span>
          </td>
          <td>
            <Checkbox checked={assistMode} onChange={onAssistModeChange}/>
          </td>
        </tr>
        <tr>
          <td>
            <span lang="pt-br">Acessibilidade</span>
            <span lang="en">Accessibility</span>
          </td>
          <td>
            <Button onClick={onAccessibilityLeft}> {'<'} </Button>
             Tipo
            <Button onClick={onAccessibilityRight}> {'>'} </Button>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <Button onClick={onBack}>Voltar</Button>
          </td>
        </tr>
      </table>
      <div id="config-fechar" onClick={onClose}>×</div>
    </Config>
  )
}

export default GameConfig
