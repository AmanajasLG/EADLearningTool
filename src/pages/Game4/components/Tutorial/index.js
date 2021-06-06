import React from 'react'
import { blobLaranja } from '../../../../img'
const Tutorial = () => {
  const [state, setState] = React.useState(0)
  return(
    <React.Fragment>
      {state === 0 &&
        <div className="overlay-tutorial-notification">
          <div className="overlay-tutorial-notification-content blob-right">
            <img
              src={blobLaranja}
              alt=""
              className="tutorial-notification-blob"
            />
            <div className="tutorial-notification-message">
              <span lang="pt-br">
                Clique no ingrediente que você deseja colocar na
                bancada para preparar a receita na ordem correta e
                confirme.
              </span>
              <span lang="en">
                Click on the ingredient you want to put on the
                conter to preper the recipe in the correct order
                and confirm.
              </span>
              <button className="btn" onClick={() => setState(1)}>
                Continuar
              </button>
            </div>
          </div>
        </div>
      }

    {state === 1 &&
      <div className="overlay-tutorial-notification">
        <div className="overlay-tutorial-notification-content blob-right">
          <img src={blobLaranja} alt="" className="tutorial-notification-blob"/>
          <div className="tutorial-notification-message">
            <span lang="pt-br">
              Selecione as letras na ordem correta para escrever
              o nome do ingrediente.
            </span>
            <span lang="en">
              Select the letters in the correct order to write
              the name of the ingredient.
            </span>
            <button className="btn" onClick={() => setState(2) }>
              Continuar
            </button>
          </div>
        </div>
      </div>
    }
    </React.Fragment>
  )
}

export default Tutorial
