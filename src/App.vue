<template>
  <div id="app">
    <Header :data="data.header"/>
    <div class="content">
      <IdentityForm :data="data.form"/>
      <Footer :data="data.footer"/>
    </div>

  </div>
</template>

<script>
import Header from './components/Header.vue'
import IdentityForm from './components/IdentityForm.vue'
import Footer from './components/Footer.vue'
import data from './assets/data.json'

export default {
  name: 'app',
  components: {
    Header,
    IdentityForm,
    Footer
  },
  data() {
    return {
      data,
    }
  },
}
</script>

<style lang="scss">
  @import './assets/style/global';
  *{
    box-sizing: border-box;
  }
  html, body{
    margin:0;
    padding: 0;
    overflow: hidden;
    position: fixed;
    /*height: 100vh;*/
  }
  h1, h2, h3, h4, h5, h6, p{
    margin:0;
  }
  #app {
    font-family: 'Quicksand', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0;
    font-size: 16px;
    font-weight: 500;
    color: $primary;
    width: 100vw;
    height: 100vh;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .content{
    position: relative;
    background: $white;
  }
</style>
