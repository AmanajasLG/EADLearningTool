import React from 'react'
import { blobLaranja } from '../../../../img'

import { Button, ButtonConfigs } from '../../../../_components/Button'

const Tutorial = ({blobToShow, onClickToEnd}) => {
  return(
    <React.Fragment>
      {blobToShow === 0 &&
        <div className="overlay-tutorial-notification">
          <div className="overlay-tutorial-notification-content blob-right">
            {/* <img
              src={blobLaranja}
              alt=""
              className="tutorial-notification-blob"
            /> */}
            <div className="tutorial-notification-message">
              <span lang="pt-br">
                Clique no ingrediente que você deseja colocar na
                bancada para preparar a receita na ordem correta e então
                confirme.
              </span>
              <span lang="en">
                Click on the ingredient you want to put on the
                counter to prepare the recipe in the correct order
                and then confirm.
              </span>
              <Button blink colorScheme={ButtonConfigs.COLOR_SCHEMES.COR_3} onClick={onClickToEnd}>
                Entendi! / Got it!
              </Button>
            </div>
          </div>
        </div>
      }

    {blobToShow === 1 &&
      <div className="overlay-tutorial-notification">
        <div className="overlay-tutorial-notification-content blob-right">
          {/* <img src={blobLaranja} alt="" className="tutorial-notification-blob"/> */}
          <div className="tutorial-notification-message">
            <span lang="pt-br">
              Selecione as letras na ordem correta para escrever
              o nome do ingrediente.
            </span>
            <span lang="en">
              Select the letters in the correct order to write
              the name of the ingredient.
            </span>
            <Button blink colorScheme={ButtonConfigs.COLOR_SCHEMES.COR_3} onClick={onClickToEnd}>
              Entendi! / Got it!
            </Button>
          </div>
        </div>
      </div>
    }
    </React.Fragment>
  )
}

export default Tutorial
