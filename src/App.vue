<template>
  <div id="app">
    <div class="page">
      <Header :data="headerData"/>
      <div class="content">
        <div class="card">
          <router-view></router-view>
        </div>
        <Footer :data="data.footer"/>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from './components/Header.vue'
  import Footer from './components/Footer.vue'
  import data from './assets/data.json'

export default {
  name: 'app',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      data,
    }
  },
  methods: {

  },
  computed: {
    showForm() {
      return this.$route.path === '/';
    },
    headerData() {
      return this.showForm ? this.data['header'] : this.data['generative-header']
    }
  },
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Quicksand:400,500,700');
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
  .header + .content .card{
    top:-27vh;
  }
  .card{
    max-width: 840px;
    border-radius: 2rem;
    padding:60px 30px;
    margin:0 auto;
    position: relative;
    min-height: 35vh;
    z-index:2;
    background: $white;
    box-shadow: $lightgrey 0 30px 80px;
    @media (min-width: 768px) {
      padding:60px 60px;
    }
  }
</style>
