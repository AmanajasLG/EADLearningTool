// reference:
// https://modernweb.com/creating-particles-html5-canvas/
// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

class PulseCircle{
  constructor(x, y, minRadius, maxRadius, speed){
    this.x = x
    this.y = y
    this.minRadius = minRadius
    this.maxRadius = maxRadius
    this.currRadius = minRadius
    this.speed = speed
    this.increment = 1
    this.xIncrement = 1
    this.yIncrement = 1
  }

  // ctx is a canvas.context;
  // dt is deltaTime between renders
  keepInBounds(ctx, dt, canvas){
    if(this.x > canvas.width || this.x < 0){
      this.xIncrement *= -1
      if(this.x > canvas.width) this.x = canvas.width
      if(this.x < 0) this.x = 0
    }

    if(this.y > canvas.height || this.y < 0){
      this.yIncrement *= -1
      if(this.y > canvas.height) this.y = canvas.height
      if(this.y < 0) this.y = 0
    }
  }

  move(ctx, dt, canvas){
    this.x += this.xIncrement * this.speed * dt
    this.y += this.yIncrement * this.speed * dt
  }

  pulse(ctx, dt){
    if(this.currRadius >= this.maxRadius || this.currRadius <= this.minRadius)
      this.increment *= -1
    this.currRadius = this.currRadius + this.increment * this.speed * dt
    if(this.currRadius < this.minRadius)
      this.currRadius = this.minRadius
    if(this.currRadius > this.maxRadius)
      this.currRadius = this.maxRadius

  }

  draw(ctx, dt, canvas){
    this.pulse(ctx, dt, canvas)
    this.move(ctx, dt, canvas)
    this.keepInBounds(ctx, dt, canvas)

    ctx.beginPath()
    ctx.arc(this.x, this.y, this.currRadius, 0, 2*Math.PI)
    ctx.fill()
  }
}

const elements = [
  new PulseCircle(10, 10, 1, 5, 20)
]

export default elements
