<template>
  <footer
    class="footer">
    <div class="footer__main">
      <p class="footer__link footer__logo">Neb<span>ö</span></p>
      <p
        class="footer__link"
        v-for="link in data.left"
        :key="link">
        {{ link }}
      </p>
    </div>
    <div class="footer__secondary">
      <p
        class="footer__link"
        v-for="link in data.right"
        :key="link">
        {{ link }}
      </p>
    </div>

  </footer>
</template>

<script>
export default {
  name: 'Footer',
  props:{
    data: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../assets/style/global';

  .footer{
    margin: 3rem 80px 0;
    border-top:1px solid $lightgrey;
    padding: 40px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .footer__link{
    display: inline-block;
    font-weight: 500;
    color: $grey;
    .footer__main &{
      margin-right: 2rem;
    }
    .footer__secondary &{
      margin-left: 2rem;
    }
  }
  .footer__logo{
    color: $primary;
    font-weight: bold;
    font-size: 1.2rem;
    span{
      color: $third;
    }
  }
</style>
