<template>
  <div class="generative-identity">
    <div ref="canvas" class="canvas"></div>
    <div class="data">
      <hr>
      <h2>data</h2>
      first name : {{ baby['first-name'] }} <br>
      last name : {{ baby['last-name'] }}<br>
      date of birth : {{ baby.date }}<br>
      time of birth : {{ baby.time }}<br>
      height : {{ baby.height }} (cm)<br>
      weight : {{ baby.weight }} (kg)<br>
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
      ps: null,
      script: null,
      canvas: null,
      width: null,
      height: null,
//      baby: {}
    }
  },
  computed: {
    baby() {
      return this.$route.query
    },
  },
  mounted() {
    this.initP5();
    this.loadScripts();
  },
  methods: {
    initP5(){
      this.script = p => {
        this.getSize();

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
    setup(p) {
      this.canvas = p.createCanvas(this.width, this.height)
      this.canvas.parent(this.$refs.canvas)
      p.noLoop();
    },
    draw(p){
      p.background(0)
      p.fill(255)
      p.rect(this.x, this.y, 50, 50)
    },
    loadScripts(){
      const P5 = require('p5');
      this.ps = new P5(this.script);
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
</style>
