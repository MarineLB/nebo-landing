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
      weights: [3, 4],
      fill: [true, false],
      seed: null,
      font: null,

//      baby: {}
    }
  },
  computed:{
    fontUrl() {
      return require('../assets/Quicksand.ttf')
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
    getUniqueString() {
      this.bigString = this.baby['first-name'] + this.baby['last-name'] + this.baby['date'] + this.baby['time'] + this.baby['height'] + this.baby['weight'];
      this.bigString.replace(/-/g, '');
    },
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

      p.noLoop();
    },
    draw(p){
      // todo : make a unique number out of the data, get a seed

      // todo : get a colorPalette
      p.background(this.colorPalette.background)



      // todo : select shapes and draw them
      this.createSeed(p, 'first-name');
      this.drawSquare(p, p.random(this.width), p.random(this.height), 50);

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
    drawSquare(p, x, y, s){
      p.push()
        p.stroke(this.colorPalette.shapes[2])
        p.fill(this.colorPalette.background)
        p.strokeWeight(this.weights[1])
        p.rect(x, y, s, s, 8)
      p.pop()
    },
    loadScripts(){
      const P5 = require('p5');
      this.ps = new P5(this.script);
    },
    /* transform each character by its ASCII code
     * gives us a number */
    createSeed(p, param) {
      param = this.baby[param];
      let seed = '';
      for (var i = 0; i < param.length; i++) {
        seed += param.charCodeAt(i) + ''
      }
      p.randomSeed(Number(seed));
    },

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
