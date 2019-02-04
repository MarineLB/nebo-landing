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
  import data from '../assets/data.json'
export default {
  name: 'Generative',
  props: {
    //data: Object,
  },
  data() {
    return {
      data: data.generative,
      baby: {},
      bigString: '',
      uniqueSeed: '',
      ps: null,
      p: null,
      script: null,
      canvas: null,
      width: null,
      height: null,
      colorPalette: {
        background: '#FC97A9',
        shapes: ['#FFFFFF', '#F4DC22', '#312E96']
      },
      weight: 6, // bigger number === smaller weight
      fill: [true, false],
      seed: null,
      font: null,

//      baby: {}
    }
  },
  computed:{
    fontUrl() {
      return require('../assets/Quicksand.ttf')
    },
    minSize() {
      return this.width/25;
    },
    maxSize() {
      return this.width/5;
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

      // todo : generate a colorPalette from master seed
      p.background(this.colorPalette.background)

      // todo : replace random() to generate random with a random seed from this.baby (depending on master seed)


      // todo : select shapes and draw them
      this.drawSquare(p, p.random(this.width*0.1, this.width*0.9), p.random(this.height*0.1, this.height*0.9));
      this.drawCircle(p, p.random(this.width*0.1, this.width*0.9), p.random(this.height*0.1, this.height*0.9));
      this.drawArc(p, p.random(this.width*0.1, this.width*0.9), p.random(this.height*0.1, this.height*0.9));


      // drawing last so that it's above everything
      this.drawNameBlock(p);
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
        p.fill(this.colorPalette.shapes[2]);
        p.textSize(rect.width / 10);
        p.text(name, this.width-rect.width + (rect.width / 8), rect.y + rect.height/3.5, 200, 100);
        p.textSize(rect.width / 17);
        p.text(date, this.width-rect.width + (rect.width / 8), rect.y + rect.height/1.75, 200, 100);
      p.pop();
    },
    drawSquare(p, x, y){
      const color = this.colorPalette.shapes[p.floor(p.random(this.nbColors))];
      const size = p.random(this.minSize, this.maxSize);
      const radius = size*0.15;
      const strokeWeight = size / this.weight;
      const fill = p.floor(p.random(2)) === 1 ? this.colorPalette.background : color ;
      const hasInner = p.floor(p.random(2)) === 1;
      const angle = p.random(-90, 90);
      // drawing main square

      p.push()
        p.stroke(color)
        p.strokeWeight(strokeWeight)
        p.translate(x, y)
        p.rotate(angle)
        p.rectMode(p.CENTER)

        if (hasInner) {
          p.fill(this.colorPalette.background)
        } else {
          p.fill(fill)
        }
        p.rect(0, 0, size, size, radius)
        if (hasInner) {
          p.rect(0, 0, size/2.5, size/2.5, radius/2.5)
        }
      p.pop()
    },
    drawCircle(p, x, y){
      const color = this.colorPalette.shapes[p.floor(p.random(this.nbColors))];
      const size = p.random(this.minSize, this.maxSize);
      const strokeWeight = size / this.weight;
      const fill = p.floor(p.random(2)) === 1 ? this.colorPalette.background : color ;
      const hasInner = p.floor(p.random(2)) === 1;

      p.push()
      p.stroke(color)
      p.strokeWeight(strokeWeight)
      p.translate(x, y)
      p.rectMode(p.CENTER)

      if (hasInner) {
        p.fill(this.colorPalette.background)
      } else {
        p.fill(fill)
      }
      p.ellipse(0, 0, size, size)
      if (hasInner) {
        p.ellipse(0, 0, size/2.5, size/2.5)
      }
      p.pop()
    },
    drawArc(p, x, y) {
      const color = this.colorPalette.shapes[p.floor(p.random(this.nbColors))];
      const size = p.random(this.minSize, this.maxSize);
      const strokeWeight = size / this.weight;
      const length = p.floor(p.random(2)) === 1 ? 90 : 180;
      const isFull = p.floor(p.random(2)) === 1;
      const angle = p.random(-90, 90);

      p.push()
        if(isFull) {
          p.fill(color);
          p.strokeWeight(0)
        } else {
          p.fill(this.colorPalette.background);
          p.stroke(color)
          p.strokeWeight(strokeWeight)
        }
        p.translate(x, y)
        p.rotate(angle)
        p.ellipseMode(p.CENTER)
        p.arc(0, 0, size, size, 0, length)
      p.pop()
    },
    loadScripts(){
      const P5 = require('p5');
      this.ps = new P5(this.script);
    },
    /* transform each character by its ASCII code
     * gives us a number */
    createMasterSeed(p){
      let seed = '';
      const param = this.baby['first-name'] + this.baby['last-name'];
      for (var i = 0; i < param.length; i++) {
        seed += param.charCodeAt(i) + ''
      }
      p.randomSeed(Number(seed));
    },
    createSeed(p, param) {
      param = this.baby[param];
      let seed = '';
      for (var i = 0; i < param.length; i++) {
        seed += param.charCodeAt(i) + ''
      }
      p.randomSeed(Number(seed));
    },
    getRandom(p) {

    },
    createPalette(p) {
      this.colorPalette.background = this.randomColor(p);
      this.colorPalette.shapes.forEach((color) => {
        color = this.randomColor(p);
      });
    },
    randomColor(p) {
      const hsl = `
        hsl(
          ${this.flr(p, 0, 330)},
          ${this.flr(p, 90, 100)}%,
          ${this.flr(p, 75, 95)}%)
        `
      ;
      return hsl;
    },
    flr(p, min, max) {
      return p.floor(p.random(min, max));
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
