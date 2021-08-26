import React from 'react'

const Canvas = ({ elements ,...props}) => {
  const canvasRef = React.useRef(null)

  const draw = ( ctx, dt, canvas ) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = '#000000'
    if(elements) elements.map( el => el.draw(ctx, dt, canvas))
  }

  React.useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    let time1 = Date.now()
    let animationFrameId

    const render = () => {
      let time2 = Date.now()
      let dt = (time2 - time1)/1000.0
      draw(context, dt >= 1 ? 0 : dt, canvas)
      time1 = Date.now()

      animationFrameId = window.requestAnimationFrame(render)

    }
    render()

    return () => window.cancelAnimationFrame(animationFrameId)

  }, [draw])
  return <canvas ref={canvasRef} {...props}/>
}

export default Canvas
