<template>
  <header
    class="header">
    <div class="header__logo">
      <p>Neb<span>ö</span></p>
    </div>
    <div class="header__content">
      <h1
        class="header__title"
        v-html="data.title"></h1>
      <p
        class="header__description"
        v-html="data.description"></p>
    </div>
    <div class="header__background">
      <!-- todo : add background + shapes + parallax-->
    </div>

  </header>
</template>

<script>
export default {
  name: 'Header',
  props:{
    data: Object
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
    color: $white;
    font-weight: bold;
    font-size: 1.2rem;
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
</style>
