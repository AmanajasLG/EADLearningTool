import React from 'react'

const Email = ({message, onReady}) => {
  return(
    <div>
      <div>
        De: fulano@mail.com
      </div>
      <div>
        Assunto: Viajar
      </div>
      <div>
        {message}
      </div>
      <div>
        Atenciosamente,
      </div>
      <div>
        Cliente
      </div>
      <button onClick={onReady}>Estou pronto!</button>
    </div>
  )
}

export default Email
