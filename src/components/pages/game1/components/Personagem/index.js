import React from 'react'
import './personagem.css'
import charImage from './pic-char-example.svg'

const style = {
  width: 100,
  borderStyle: 'solid',
  borderColor: 'red',
  borderWidth: '1px'
}

const Personagem = ({dragPosition, position, charData, setCurrentChar}) => {
    const [pos, setPos] = React.useState({x:0, y:0})
    const [dragging, setDragging] = React.useState(false)

    React.useEffect(()=>{
      if(dragging) setPos(dragPosition)
    }, [dragPosition])

    return (
    <div style={pos.x ? {...style, position: 'absolute', left:pos.x, top: pos.y} : style}
      draggable onDragStart={()=>setDragging(true)} onDragEnd={()=>setDragging(false)}>
        <div className="CharDiv" onClick={setCurrentChar(charData)}>
          <div>
            {charData.nome}
          </div>
          <img src={charImage} style={{maxHeight: 150}}/>
          {/*
          <div>
            {charData.trabalho}
          </div>
          <div>
            {charData.estadoCivil}
          </div>
          */}
        </div>
    </div>
    )
}

export default Personagem
