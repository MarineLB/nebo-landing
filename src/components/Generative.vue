<template>
  <div class="generative-identity">
    <div ref="canvas" class="canvas"></div>
    <div class="generative-identity__footer">
      <button
        class="generative-identity__button">Save as png</button>
    </div>
    <div class="data">
      <hr>
      <h2>data</h2>
      first name : {{ baby['first-name'] }} <br>
      last name : {{ baby['last-name'] }}<br>
      date of birth : {{ baby.date }}<br>
      time of birth : {{ baby.time }}<br>
      height : {{ baby.height }} (cm)<br>
      weight : {{ baby.weight }} (kg)<br>
      {{ uniqueSeed }}<br>
    </div>

  </div>
</template>

<script>
import getContrastRatio from 'get-contrast-ratio'
import data from '../assets/data.json'

export default {
  name: 'Generative',
  props: {
    //data: Object,
  },
  data() {
    return {
      baby: {},
      bigString: '',
      canvas: null,
      colorPalette: {
        background: '#FC97A9',
        shapes: ['#FFFFFF', '#F4DC22']
      },
      data: data.generative,
      fill: [true, false],
      font: null,
      height: null,
      p: null,
      ps: null,
      script: null,
      shapeList: [
        'square',
        'triangle',
        'circle',
        'arc',
        'line',
        'smiley',
      ],
      shapeQuantity: 50,
      shapes: [],
      seed: null,
      uniqueSeed: '',
      weight: 6, // bigger number === smaller weight
      width: null,
      masterSeed: null,

//      baby: {}
    }
  },
  computed:{
    fontUrl() {
      return require('../assets/Quicksand.ttf')
    },
    minSize() {
      return this.width/9;
    },
    maxSize() {
      return this.width/6;
    },
    nbColors() {
      return this.colorPalette.shapes.length;
    }
  },
  mounted() {
    this.baby = this.$route.query;
//    this.getUniqueString();
//    this.bigString = this.createSeed(this.bigString);
    this.initP5();
    this.loadScripts();
  },
  methods: {
    initP5(){
      this.script = p => {
        this.getSize();

        p.preload = _ => {
          this.preload(p);
        }

        p.setup = _ => {
          this.setup(p);
        }

        p.draw = _ => {
          this.draw(p);
        }
      }
    },
    getSize() {
      this.width = this.$refs.canvas.offsetWidth;
      this.height = this.width * 1.415;

      if (this.height > window.innerHeight) {
        this.height = window.innerHeight - 100;
        this.width = this.height / 1.415;
      }
    },
    preload(p){
      this.font = p.loadFont(this.fontUrl);
    },
    setup(p) {
      this.canvas = p.createCanvas(this.width, this.height)
      this.canvas.parent(this.$refs.canvas)
      p.angleMode(p.DEGREES)

      p.noLoop();
    },
    draw(p){
      // todo : create master seed with prenom + nom
      this.createMasterSeed(p);

      this.createPalette(p);
      p.background(this.colorPalette.background)

      // select shape and verify that they are not overlapping
      this.selectShapes(p);

      this.drawAllShapes(p);

      // drawing last so that it's above everything
      this.drawNameBlock(p);
    },
    selectShapes(p){
      
      let protection = 0;

      while (this.shapes.length < this.shapeQuantity) {
        let overlapping = false;
        const shape = this.randomShape(p); //{x, y, s}

        for (var j = 0; j < this.shapes.length; j++) {
          var other = this.shapes[j];
          var d = p.dist(shape.shapeX, shape.shapeY, other.shapeX, other.shapeY);
          
          if (d < shape.size/2 + other.size/2) {
            overlapping = true;
          }
          
        }

        if (!overlapping || j===0) {
          //console.log('is not overapping');
          p.ellipse(shape.shapeX, shape.shapeY, shape.size, shape.size);
          this.shapes.push(shape);
        }

        protection++;
        if(protection > 1000) {
          break;
        }
      }
    },
    randomShape(p) {
      const currentShape = this.getRandom(p, 0, this.shapeList.length);
      const shapeName = this.shapeList[currentShape];
      const shapeX = p.random(this.width*-0.1, this.width);
      const shapeY = p.random(this.height*-0.1, this.height);

      let shape;
      let size = this.getShapeSize(p);

      size = (shapeName === 'line' || shapeName === 'grid') ? size/2 : size;
      shape = {
        shapeName,
        shapeX,
        shapeY,
        size,
      }
      return shape;
    },
    drawAllShapes(p){
      for (let i = 0; i < this.shapes.length; i++) {
        const shape = this.shapes[i];

        switch (shape.shapeName) {
          case 'square':
            this.drawSquare(p, shape.shapeX, shape.shapeY, shape.size);
            break;
          case 'circle':
            this.drawCircle(p, shape.shapeX, shape.shapeY, shape.size);
            break;
          case 'line':
            this.drawLine(p, shape.shapeX, shape.shapeY, shape.size);
            break;
          case 'grid':
            this.drawGrid(p, shape.shapeX, shape.shapeY, shape.size);
            break;
          case 'smiley':
            this.drawSmiley(p, shape.shapeX, shape.shapeY, shape.size);
            break;
          case 'triangle':
            this.drawTriangle(p, shape.shapeX, shape.shapeY, shape.size);
            break;
          case 'arc': default:
          this.drawArc(p, shape.shapeX, shape.shapeY, shape.size);
          break;
        }
      }
    },
    drawNameBlock(p) {
      var rect = {
        y: this.height*0.28,
        width: this.width*0.4,
        height: this.height*0.13,
        radius: this.width*0.04
      }
      p.push()
      p.strokeWeight(0)
      p.fill(255)
      p.rect(this.width - rect.width, rect.y, rect.width, rect.height, rect.radius, 0, 0, rect.radius)
      var options = { year: 'numeric', month: 'long', day: 'numeric' };
      let name = this.baby['first-name'] + " " + this.baby['last-name'];
      let date = new Date(this.baby.date).toLocaleDateString("en-US", options);
      date = 'Born ' + date;
      p.push()
        p.textFont(this.font);
        p.strokeWeight(0)
        p.fill(this.colorPalette.shapes[0]);
        p.textSize(rect.width / 10);
        p.text(name, this.width-rect.width + (rect.width / 8), rect.y + rect.height/3.5, 200, 100);
        p.textSize(rect.width / 17);
        p.text(date, this.width-rect.width + (rect.width / 8), rect.y + rect.height/1.75, 200, 100);
      p.pop();
    },
    drawSquare(p, x, y, size){
      const color = this.colorPalette.shapes[p.floor(this.getRandom(p, 0, this.nbColors))];
      const radius = size*0.15;
      const strokeWeight = size / this.weight;
      const fill = p.floor(this.getRandom(p, 0, 2)) === 1 ? this.colorPalette.background : color ;
      const hasInner = p.floor(this.getRandom(p, 0, 2)) === 1;
      const angle = this.getRandom(p, -90, 90);
      // drawing main square

      p.push()
        p.stroke(color)
        p.strokeWeight(strokeWeight)
        p.translate(x, y)
        p.rotate(angle)
        p.rectMode(p.CENTER)

        if (hasInner) {
          p.noFill()
        } else {
          p.fill(fill)
        }
        p.rect(0, 0, size, size, radius)
        if (hasInner) {
          p.rect(0, 0, size/2.5, size/2.5, radius/2.5)
        }
      p.pop()
    },
    drawCircle(p, x, y, size){
      const color = this.colorPalette.shapes[p.floor(p.random(this.nbColors))];
      const strokeWeight = size / this.weight;
      const fill = p.floor(p.random(2)) === 1 ? this.colorPalette.background : color ;
      const hasInner = p.floor(p.random(2)) === 1;

      p.push()
      p.stroke(color)
      p.strokeWeight(strokeWeight)
      p.translate(x, y)
      p.rectMode(p.CENTER)

      if (hasInner) {
        p.noFill();
      } else {
        p.fill(fill)
      }
      p.ellipse(0, 0, size, size)
      if (hasInner) {
        p.ellipse(0, 0, size/2.5, size/2.5)
      }
      p.pop()
    },
    drawArc(p, x, y, size) {
      const color = this.colorPalette.shapes[p.floor(p.random(this.nbColors))];
      const strokeWeight = size / this.weight;
      const length = p.floor(p.random(2)) === 1 ? 90 : 180;
      const isFull = p.floor(p.random(2)) === 1;
      const angle = p.random(-90, 90);

      p.push()
        if(isFull) {
          p.fill(color);
          p.strokeWeight(0)
        } else {
          p.noFill();
          p.stroke(color)
          p.strokeWeight(strokeWeight)
        }
        p.translate(x, y)
        p.rotate(angle)
        p.ellipseMode(p.CENTER)
        p.arc(0, 0, size, size, 0, length)
      p.pop()
    },
    drawLine(p, x, y, size) {
      const color = this.getColor(p);
      const strokeWeight = this.getStroke(size);
      const angle = this.getAngle(p);
      const quantity = this.getRandom(p, 2, 3);

      for (let i = 0; i < quantity; i++) {
        p.push();
        p.stroke(color);
        p.strokeWeight(strokeWeight);
        p.strokeCap(p.ROUND);
        p.translate(x + (i * (size * 2)), y);
        p.line(0, 0, size, size);
        p.rotate(90);
        p.line(0, 0, size, size);
        p.pop();
      }
    },
    drawTriangle(p, x, y, size){
      const color = this.colorPalette.shapes[p.floor(this.getRandom(p, 0, this.nbColors))];
      const strokeWeight = size / (this.weight*2);
      const fill = p.floor(this.getRandom(p, 0, 2)) === 1 ? this.colorPalette.background : color ;
      const hasInner = p.floor(this.getRandom(p, 0, 2)) === 1;
      const angle = this.getRandom(p, -90, 90);

      let radius = size/2;

      const points = {
        x1: 0,
        y1: - radius,
        x2: - (radius * p.cos(30)),
        y2: radius * p.sin(30),
        x3: radius * p.cos(30),
        y3: radius * p.sin(30)
      }
      const ratio = 0.4;
      const smallPoints = {
        x1: 0,
        y1: - radius * ratio,
        x2: - (radius * p.cos(30)) * ratio,
        y2: (radius * p.sin(30)) * ratio,
        x3: (radius * p.cos(30)) * ratio,
        y3: (radius * p.sin(30)) * ratio
      }

      p.push()
        p.stroke(color)
        p.strokeWeight(strokeWeight)
        p.strokeCap(p.ROUND);
        p.translate(x, y)
        p.rotate(angle)

        if (hasInner) {
          p.noFill();
        } else {
          p.fill(fill)
        }
        p.line(points.x1, points.y1, points.x2, points.y2);
        p.line(points.x2, points.y2, points.x3, points.y3);
        p.line(points.x3, points.y3, points.x1, points.y1);
        if (hasInner) {
          p.line(smallPoints.x1, smallPoints.y1, smallPoints.x2, smallPoints.y2);
          p.line(smallPoints.x2, smallPoints.y2, smallPoints.x3, smallPoints.y3);
          p.line(smallPoints.x3, smallPoints.y3, smallPoints.x1, smallPoints.y1);
        }
      p.pop()
    },
    drawGrid(p, x, y, size) {
      const color = this.getColor(p);
      const strokeWeight = this.getStroke(size);
      const angle = this.getAngle(p);
      const height = this.getRandom(p, 2, 4);

      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < height; j++) {
          p.push();
          p.noFill();
          p.stroke(color);
          p.strokeWeight(strokeWeight);
          p.translate(x + (i * size), y + (j * size));
          p.rect(0, 0, size, size);
          p.pop();
        }
      }
    },
    drawSmiley(p, x, y, size) {
      const color = this.getColor(p);
      const strokeWeight = this.getStroke(size) /2;
      const angle = this.getAngle(p);
      const height = this.getRandom(p, 2, 4);

      p.push();
        p.noFill();
//        p.fill(this.colorPalette.background);
        p.stroke(color);
        p.strokeWeight(strokeWeight);
        p.translate(x, y);
        p.rectMode(p.CENTER);
        p.ellipse(0, 0, size, size);
      p.pop();

      p.push();
        p.fill(color);
        p.noStroke();
        p.translate(x, y);
        p.rotate(angle);
        p.rectMode(p.CENTER);
        p.ellipse(-size*0.1, -size*0.1, size * 0.1, size * 0.1);
        p.ellipse(size*0.1, -size*0.1, size * 0.1, size * 0.1);
      p.pop();

      p.push();
        p.noFill();
        p.stroke(color);
        p.strokeWeight(strokeWeight);
        p.strokeCap(p.ROUND);
        p.translate(x, y);
        p.rotate(angle);
        p.rectMode(p.CENTER);
        p.arc(0, 0, size / 2, size / 2, 30, 150);
      p.pop();
    },
    loadScripts(){
      const P5 = require('p5');
      this.ps = new P5(this.script);
    },
    /* transform each character by its ASCII code
     * gives us a number */
    createMasterSeed(p){
      let seed = 0;
      const param = this.baby['first-name'].toLowerCase() + this.baby['last-name'].toLowerCase() + this.baby['date'] + this.baby['time'];
      for (var i = 0; i < param.length; i++) {
        seed += param.charCodeAt(i)
      }
      seed = Number(seed);
      seed = seed + this.baby['weight'] + this.baby['height'];
      this.masterSeed = seed;
      p.randomSeed(Number(seed));
    },
    createSeed(p, param = null) {
      this.seed = p.floor(p.random(20000));
      p.randomSeed(Number(this.seed));
    },
    /* creates a random seed from the params in baby */
    getRandom(p, min, max) {
      this.createSeed(p);
      return p.floor(p.random(min, max));
    },
    createPalette(p) {
      this.colorPalette.background = this.randomColor(p);
      this.colorPalette.shapes.forEach((color, index) => {
        this.colorPalette.shapes[index] = this.randomColor(p, true);
      });
      this.colorPalette.shapes.push(this.randomColor(p, false, true));
    },
    randomColor(p, check = false, light = false) {
      let hsl = this.randomDarkHsl(p);
      if (check) {
        let ratio;
        do {
          hsl = this.randomDarkHsl(p);
          ratio = getContrastRatio(this.colorPalette.background, hsl);
        } while (ratio < 1.8);
      }
      if (light) {
        hsl = this.randomLightHsl(p);
      }
      return hsl;
    },
    randomLightHsl(p) {
      return `hsl(
        ${this.flr(p, 0, 330)},
        ${this.flr(p, 90, 100)}%,
        ${this.flr(p, 80, 100)}%)`;
    },
    randomDarkHsl(p) {
      return `hsl(
        ${this.flr(p, 0, 330)},
        ${this.flr(p, 90, 100)}%,
        ${this.flr(p, 55, 75)}%)`;
    },
    flr(p, min, max) {
      return p.floor(p.random(min, max));
    },
    getColor(p) {
      const randomIndex = this.getRandom(p, this.nbColors);
      return this.colorPalette.shapes[randomIndex];
    },
    getShapeSize(p) {
      return this.getRandom(p, this.minSize, this.maxSize);
    },
    getStroke(size) {
      return size / this.weight;
    },
    getAngle(p) {
      return this.getRandom(p, -90, 90);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../assets/style/global';

  .canvas{
    width:100%;
    text-align: center;
  }
  .generative-identity__footer{
    text-align: center;
  }
  .data{
    overflow: hidden;
  }
  .generative-identity__button{
    border: 1px solid $accent;
    padding: 10px 20px;
    border-radius: 10px;
    font-weight: 500;
    width: 300px;
    max-width: 100%;
    font-size:0.9rem;
    outline:none;
    font-family:inherit;
    background: $accent;
    color: $white;
    cursor: pointer;
    transition: background .3s ease-out;
    margin-top:2rem;
    margin-bottom: 1rem;

    &:hover{
      background: darken($accent, 5%);
    }
    @media (min-width: 768px) {
      width: auto;
    }
  }
</style>
