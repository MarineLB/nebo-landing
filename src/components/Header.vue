<template>
  <header
    class="header">
    <div class="header__logo">
      <router-link to="/">Neb<span>ö</span></router-link>
    </div>
    <div class="header__background">
      <!-- todo : add background + shapes + parallax-->
      <img
        class="shape"
        v-for="shape in 7"
        :key="shape"
        :src="require(`@/assets/shapes/shape${shape}.svg`)"
        :style="`top: ${getTop(shape)}px; left: ${getLeft(shape)}px`"
        alt="shape">
    </div>
    <div class="header__content">
      <h1
        class="header__title"
        v-html="data.title"></h1>
      <p
        class="header__description"
        v-html="data.description"></p>
    </div>


  </header>
</template>

<script>
export default {
  name: 'Header',
  props:{
    data: Object,
  },
  computed:{
    windowHeight() {
      return process.browser ? window.innerHeight : 0
    },
    windowWidth() {
      return process.browser ? window.innerWidth : 0
    },
  },
  methods: {
    getTop() {
      if(Math.floor(Math.random() * 2+1) % 2 === 0) {
        return Math.floor(Math.random() * this.windowHeight / 4) - 20
      } else {
        return Math.floor(Math.random() * this.windowHeight) + this.windowHeight/2
      }

    },
    getLeft() {
      if(Math.floor(Math.random() * 2+1) % 2 === 0) {
        return Math.floor(Math.random() * this.windowWidth /4) -20
      } else {
        return Math.floor(Math.random() * this.windowWidth ) + this.windowWidth/2
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../assets/style/global';
  $header-height: 120vh;
  .header{
    background: $secondary;
    padding:20px 40px;
    height:$header-height;
    /*position: relative;*/
    @media (min-width: 768px) {
      padding:40px 80px;
    }
  }
  .header__logo{
    position: fixed;
    font-weight: bold;
    font-size: 1.2rem;
    z-index:2;

    a{
      color: $white;
      text-decoration: none;
    }

    span{
      color: $primary
    }
  }
  .header__content{
    text-align: center;
    position: absolute;
    top:50vh;
    left:50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    padding:20px 40px;
    width:100%;
    @media (min-width: 768px) {
      padding:40px 80px;
    }
  }
  .header__title{
    font-size:38px;
    line-height: 1.13;
    margin-bottom: 1rem;
    @media (min-width: 768px) {
      font-size:70px;
    }
    span{
      color: $white;
      display: block;
    }
  }
  .header__description{
    margin:0 auto;
    max-width:520px;
    color:$white;
  }
  .header__background{
    /*position: relative;*/
    height:100%;
    width:100%;
  }
  .shape{
    pointer-events: none;
    position: absolute;
    z-index: 0;
  }
</style>
