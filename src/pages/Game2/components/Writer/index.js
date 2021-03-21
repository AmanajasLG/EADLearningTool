import React from 'react'

const Writer = ({text, characterTime, onWritten, afterWrittenTime}) => {
  const [state, setState] = React.useState({text: text, index: 0})

  React.useEffect(()=>{
    setState({text: text, index: 0})
  }, [text])

  return(
  <div id="Writer">
    { (() => {
      if(state.index < state.text.length) {
        setTimeout( () => { setState({...state, index: state.index + 1}) }, characterTime)
      } else {
        setTimeout( onWritten , afterWrittenTime)
      }
      return state.text.substring(0, state.index)
    })()}
  </div>
  )

}

export default Writer
