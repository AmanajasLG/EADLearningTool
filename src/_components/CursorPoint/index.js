import React from 'react'

const CursorPoint = () => {
  const[mousePosition, setMousePosition] = React.useState({x: 0, y: 0})
  const updateMousePosition = (e) => setMousePosition({x: e.clientX, y: e.clientY})

  React.useEffect(() => {
      window.addEventListener("mousemove", updateMousePosition);
      return (() => window.removeEventListener("mousemove", updateMousePosition))
  }, [])

  return(
    <div style={{position: 'absolute', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'red', top: mousePosition.y - 5, left: mousePosition.x - 5,
    cursor: 'default', pointerEvents: 'none' }}>
      <div style={{position: 'relative', top: -15}}>
        ({mousePosition.x},{mousePosition.y})
      </div>
    </div>
  )
}

export default CursorPoint
