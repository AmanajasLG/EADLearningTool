import React from 'react'
import Dropdown from '../Dropdown'

const Phone = ({modifyContact, contacts, jobs, countries}) => {
  return(
    <div id="fullPhone">
      <p>Lista de contatos</p>
      <div id="lista-contatos">
        {contacts.map((contact, index) =>
          <div id="add-contato" className="contato" key={index}>
            <div className="contact-profile-pic">
              {/* <img></img> Se for para usar a mesma imagem que seria usada lá em cima, tira o div e usa isso */}
              <div></div>
              <span>+</span>
            </div>
            <div className="contact-info">
              <div className="name">
                <p>Nome</p>
                <input type="text" name="nome" placeholder="Nome do contato" value={contact.name} readOnly="readonly" onChange={()=>{}}/>
              </div>
              <Dropdown
                onChange={e => modifyContact({...contact, job: e.target.value}) }
                label={"Profissão"}
                optionList={jobs}
              />
              <Dropdown
                onChange={e => modifyContact({...contact, country: e.target.value})}
                label={"País"}
                optionList={countries}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
//<div id="btn-add-contato" onClick={addContact}>Adicionar contato</div>
export default Phone
