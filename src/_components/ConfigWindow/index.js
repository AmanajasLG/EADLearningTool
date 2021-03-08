import React from 'react'
import Config from '../Config'

const ConfigWindow = ({onConfig, onStatistics, onLeave, onClose}) => {
  return(
    <Config>
      <div className="config-option" onClick={onConfig}>
        <span lang="pt-br">Configurações de jogo</span>
        <div className="divider"></div>
        <span lang="en">Game settings</span>
      </div>
      <div className="config-option" onClick={onStatistics}>
        <span lang="pt-br">Estatísticas</span>
        <div className="divider"></div>
        <span lang="en">Statistics</span>
      </div>
      <div className="config-option" onClick={onLeave}>
        <span lang="pt-br">Sair do jogo</span>
        <div className="divider"></div>
        <span lang="en">Leave game</span>
      </div>
      <div id="config-fechar" onClick={onClose}>×</div>
    </Config>
  )
}

export default ConfigWindow
