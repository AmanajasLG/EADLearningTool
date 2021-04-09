import React from 'react'
import Dropdown from '../Dropdown'

import smallPhone from '../../../../img/Game1/Celular Sala.svg'
import bigPhone from '../../../../img/Game1/Celular Base.svg'
import dedao from '../../../../img/Game1/Mão dedão.svg'
import palma from '../../../../img/Game1/Mão palma.svg'

import './index.scss'
import FullscreenOverlay from '../../../Game2/components/FullscreenOverlay'

const Phone = ({children, modifyContact, contactsTemplate, contacts, jobs, countries}) => {
  const [state,setState] = React.useState({maximized: false, shouldMinimize: false})

  const maximize = (event) => {
    setState({...state, maximized: true})
  }
  const shouldMinimize = (event) => {
    setState({...state, shouldMinimize: true})
  }
  const minimize = (event) => {
    setState({...state, shouldMinimize: false, maximized: false})
  }

  const contatoTemplate = (contact, key) => {
    return (
      <div className="contato" key={key}>
        <div className="contact-profile-pic">
          <div></div>
          <span>{key+1}</span>
        </div>
        <div className="name">
          <p>Nome</p>
          <input type="text" name="nome" placeholder="Nome do contato" value={contact.name} readOnly="readonly" onChange={()=>{}}/>
        </div>
        <Dropdown
          // style={ contact.job === contactsTemplate.find( template => template.id === contact.id).job? {backgroundColor: '#cceecc'} : {}}
          onChange={e => modifyContact({...contact, job: e.target.value}) }
          label={"Profissão"}
          value={contact.job}
          optionList={jobs}
        />
        <Dropdown
          // style={ contact.country === contactsTemplate.find( template => template.id === contact.id).country? {backgroundColor: '#cceecc'} : {}}
          onChange={e => modifyContact({...contact, country: e.target.value})}
          label={"Nacionalidade"}
          value={contact.country}
          optionList={countries}
        />
      </div>
    )
  }

  return(
    <div id="phone">
      <div id="small-phone-wrapper" className={state.maximized ? "maximized" : null}>
        <div id="small-phone-inner-wrapper">
          <div id="small-phone-content" onClick={maximize}>
            <div id="small-phone-floating-text">
              <span lang="pt-br">Adicione um novo contato</span>
              <span lang="default">Add a new contact</span>
            </div>
            <img src={smallPhone} alt="" />
          </div>
        </div>
      </div>
      {state.maximized &&
        <FullscreenOverlay
            bgRGBA={{r:249, g:175, b:161, a:0.69}}
            closeHoverRGB={{r: 255, g: 255, b: 255}}
            onClickClose={shouldMinimize}
            shouldExit={state.shouldMinimize}
            onReadyToExit={minimize}
        >
          <div id="big-phone-wrapper" className={state.shouldMinimize ? "minimizing" : null}>
            <div id="big-phone-imgs">
              <img src={palma} alt="" />
              <img src={bigPhone} alt="" />
              <img src={dedao} alt="" />
            </div>
            <div id="big-phone-screen-wrapper">
              <div id="big-phone-screen-content">
                <p>Lista de contatos</p>
                <div id="lista-contatos">
                  {contacts?.map((contact, index) => {
                    return contatoTemplate(contact, index)
                  })}
                  <div id="add-contato" className="contato">
                    <div className="contact-profile-pic">
                      <div></div>
                      <span><strong>+</strong></span>
                    </div>
                    <div className="Nome">
                      <p>Nome</p>
                      <input type="text" name="nome" placeholder="Nome do contato" onChange={()=>{}}/>
                    </div>
                    <Dropdown
                      label={"Profissão"}
                      optionList={jobs}
                    />
                    <Dropdown
                      label={"Nacionalidade"}
                      optionList={countries}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* <div id="btn-terminei" onClick={() => setState({...state, changeRoomPopUp: true})}> */}
            <div id="btn-terminei-wrapper">
              <div id="btn-terminei" onClick={() => {}}>
                Terminei!
              </div>
            </div>
          </div>
        </FullscreenOverlay>
      }
    </div>
  )

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
                style={ contact.job === contactsTemplate.find( template => template.id === contact.id).job? {backgroundColor: '#cceecc'} : {}}
                onChange={e => modifyContact({...contact, job: e.target.value}) }
                label={"Profissão"}
                value={contact.job}
                optionList={jobs}
              />
              <Dropdown
                style={ contact.country === contactsTemplate.find( template => template.id === contact.id).country? {backgroundColor: '#cceecc'} : {}}
                onChange={e => modifyContact({...contact, country: e.target.value})}
                label={"País"}
                value={contact.country}
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
