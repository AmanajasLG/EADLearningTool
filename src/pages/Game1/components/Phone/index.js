import React from 'react'
import Dropdown from '../Dropdown'

const Phone = ({addContact, jobs, nationalities}) => {
  return(
    <div id="fullPhone">
      <p>Lista de contatos</p>
      <div id="lista-contatos">
        <div id="add-contato" className="contato">
          <div className="contact-profile-pic">
            {/* <img></img> Se for para usar a mesma imagem que seria usada lá em cima, tira o div e usa isso */}
            <div></div>
            <span>+</span>
          </div>
          <div className="contact-info">
            <div className="name">
              <p>Nome</p>
              <input type="text" name="nome" placeholder="Nome do contato"></input>
            </div>
            <Dropdown
              onChange={(e) => console.log('selected:', e.target.value)}
              label={"Profissão"}
              optionList={jobs}
            />
            <Dropdown
              onChange={(e) => console.log('selected:', e.target.value)}
              label={"Nacionalidade"}
              optionList={nationalities}
            />
          </div>
          <div id="btn-add-contato" onClick={addContact}>Adicionar contato</div>
        </div>
      </div>
    </div>
  )
}

export default Phone
