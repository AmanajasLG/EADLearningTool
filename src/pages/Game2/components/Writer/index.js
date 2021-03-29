import React from 'react'

const Writer = ({text, characterTime, onWritten, afterWrittenTime}) => {
  const [state, setState] = React.useState({text: text, index: 0})

  React.useEffect( () => {
    if( text !== state.text )
      setState( () => ({text: text, index: 0}))
  }, [text, state.text] )

  React.useEffect( () => {
    let timeoutID
    if( state.index < state.text.length ) {
      timeoutID = setTimeout( () => { setState({...state, index: state.index + 1}) }, characterTime)
    } else {
      timeoutID = setTimeout( onWritten, afterWrittenTime )
    }
    return () => {clearTimeout(timeoutID)}
  })

  return(
  <div id="Writer">
    { state.text.substring(0, state.index) }
  </div>
  )
}

export default Writer
