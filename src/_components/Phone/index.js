import React from "react";
import Dropdown from "../Dropdown";

import { smallPhone, bigPhone, dedao, palma } from "../../img";
import { Button, ButtonConfigs } from "../../_components/Button";

import "./index.scss";
import FullscreenOverlay from "../FullscreenOverlay";

// const Phone = ({children, modifyContact, contactsTemplate, contacts, jobs, countries, onAddContact, onFinish, onMinimize}) => {
const Phone = ({
  children,
  modifyContact,
  contactsTemplate,
  names,
  contacts,
  jobs,
  countries,
  onAddContact,
  onFinish,
  shouldMinimize,
  onMinimize,
  onTutorial,
  nextTutorial,
  active,
}) => {
  const [state, setState] = React.useState({
    maximized: false,
    shouldMinimize: false,
  });
  // const [newContact,setNewContact] = React.useState({name: '', job: '', country: ''})

  React.useEffect(() => {
    setState({ ...state, contacts: contacts });
    //eslint-disable-next-line
  }, [contacts]);

  React.useEffect(() => {
    if (shouldMinimize) _shouldMinimize();
    //eslint-disable-next-line
  }, [shouldMinimize]);

  // React.useEffect( () => {
  // 	if(onMinimize) _shouldMinimize()
  // 	//eslint-disable-next-line
  // }, [onMinimize])

  const _maximize = () => {
    if (onTutorial) nextTutorial();
    setState({ ...state, maximized: true });
  };

  const _shouldMinimize = () => {
    if (onTutorial) nextTutorial();
    setState({ ...state, shouldMinimize: true });
  };

  const _minimized = () => {
    // setState({...state, shouldMinimize: false, maximized: false})
    state.shouldMinimize = false;
    state.maximized = false;
    if (typeof onMinimize === "function") onMinimize();
  };

  // const _addContato = () => {
  // 	if(onAddContact) onAddContact(newContact)
  // 	else throw new Error("Using phone without callback: onAddContact")
  // 	setNewContact({name: '', job: '', country: ''})
  // }

  const _terminou = () => {
    if (typeof onFinish === "function") onFinish();
    else console.log("onFinish not set or is not a function");
  };

  const _contatoTemplate = (contact, key) => {
    return (
      <div className="contato" key={key}>
        <div className="contact-profile-pic">
          <div>
            <div></div>
            <div></div>
          </div>
          <span>{key + 1}</span>
        </div>
        {contact.showName ? (
          <div className="Nome">
            <p>Nome</p>
            <div className="phone-text-field">{contact.name}</div>
          </div>
        ) : (
          <Dropdown
            // style={ contact.job === contactsTemplate?.find( template => template?.id === contact.id).job? {backgroundColor: '#cceecc'} : {}}
            onChange={(e) =>
              modifyContact({ ...contact, name: e.target.value })
            }
            label={"Nome"}
            value={contact.name}
            optionList={names}
            disabled={onTutorial}
          />
        )}

        {contact.showJob ? (
          <div className="Profissão">
            <p>Profissão</p>
            <div className="phone-text-field">{contact.job}</div>
          </div>
        ) : (
          <Dropdown
            // style={ contact.job === contactsTemplate?.find( template => template?.id === contact.id).job? {backgroundColor: '#cceecc'} : {}}
            onChange={(e) => modifyContact({ ...contact, job: e.target.value })}
            label={"Profissão"}
            value={contact.job}
            optionList={jobs}
            disabled={onTutorial}
          />
        )}

        {contact.showCountry ? (
          <div className="País">
            <p>País</p>
            <div className="phone-text-field">{contact.country}</div>
          </div>
        ) : (
          <Dropdown
            // style={ contact.country === contactsTemplate?.find( template => template?.id === contact.id).country? {backgroundColor: '#cceecc'} : {}}
            onChange={(e) =>
              modifyContact({ ...contact, country: e.target.value })
            }
            label={"País"}
            value={contact.country}
            optionList={countries}
            disabled={onTutorial}
          />
        )}
      </div>
    );
  };

  return (
    <div id="phone">
      <div
        id="small-phone-wrapper"
        className={state.maximized ? "maximized" : null}
      >
        <div id="small-phone-inner-wrapper">
          <div id="small-phone-content" onClick={active ? _maximize : null}>
            <div id="small-phone-floating-text">
              <span lang="pt-br">Adicione um novo contato</span>
              <span lang="default">Add a new contact</span>
            </div>
            <img src={smallPhone} alt="phone-small" />
          </div>
        </div>
      </div>
      {state.maximized && (
        <FullscreenOverlay
          bgRGBA={{ r: 249, g: 175, b: 161, a: 0.69 }}
          closeHoverRGB={{ r: 255, g: 255, b: 255 }}
          onClickClose={_shouldMinimize}
          shouldExit={state.shouldMinimize}
          onReadyToExit={_minimized}
        >
          <div
            id="big-phone-wrapper"
            className={state.shouldMinimize ? "minimizing" : null}
          >
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
                    return _contatoTemplate(contact, index);
                  })}
                </div>
              </div>
            </div>
            <div id="btn-terminei-wrapper">
              {(contacts.filter(
                (contact) =>
                  contact.job === "" ||
                  contact.country === "" ||
                  contact.name === ""
              ).length === 0 ||
                onTutorial) && (
                <Button
                  blink
                  onClick={onTutorial ? null : _terminou}
                  direction={ButtonConfigs.BUTTON_DIRECTIONS.LEFT}
                  colorScheme={ButtonConfigs.COLOR_SCHEMES.COR_5}
                >
                  Terminei!
                </Button>
              )}
            </div>
          </div>
        </FullscreenOverlay>
      )}
    </div>
  );
};
export default Phone;
