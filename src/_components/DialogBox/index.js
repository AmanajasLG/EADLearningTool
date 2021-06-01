import React from 'react'

const style = (alternative) => ({
  backgroundColor: alternative? '#59316D' : '#535c89',
	borderRadius: '0 1.5em 0 0',
	height: '30%',
	padding: 15,
	marginBottom: 75,
	boxShadow: '7px 7px 0px 0px #77777750',
	transition: '50ms ease-in-out',
	overflow: 'visible',
  position: 'absolute',
  bottom: '0px',
  left: '15%',
  width: '80%'
})

const DialogBox = (props) => {
  return(
    <div style={style(props.alternative)}>
      {props.children}
    </div>
  )
}

export default DialogBox
