<template>
  <form
    @submit.prevent="checkForm"
    class="identity-form">
    <div class="identity-form__header">
      <h2
        class="identity-form__title"
        v-html="data.title"></h2>
      <p
        class="identity-form__subtitle"
        v-html="data.subtitle"></p>
    </div>
    <div class="identity-form__content">
      <div class="identity-form__inputs">
        <div
          v-for="input in data.inputs"
          :key="input.name"
          class="identity-form__input-wrapper">
          <label
            class="identity-form__label"
            :for="input.name">
            {{ input.label }}
          </label>
          <input
            class="identity-form__input"
            :ref="input.name"
            :name="input.name"
            :type="input.type"
            v-model="form[input.name]"
            :placeholder="input.placeholder"
            required
          />
        </div>
      </div>
      <div class="identity-form__illustration">
        <img src="@/assets/illustration.svg" alt="illustration"/>
      </div>
    </div>
    <div class="identity-form__footer">
      <button
        type="submit"
        class="identity-form__input identity-form__submit">
        <img src="@/assets/gift.svg" alt="gift"/>
        Generate my identity
      </button>
    </div>
  </form>
</template>

<script>
import data from '../assets/data.json'

export default {
  name: 'IdentityForm',

  data() {
    return {
      data: data.form,
      form: {}
    }
  },
  mounted() {
    this.$refs.date[0].max = this.getToday();
    this.$refs.date[0].valueAsDate = new Date();
  },
  methods: {
    checkForm(e) {
      this.$router.push({ path: 'generated', query: this.form });
    },
    getToday() {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();
      if(dd<10) {
        dd = '0'+dd
      }
      if(mm<10) {
        mm = '0'+mm
      }
      today = yyyy + '-' + mm + '-' + dd;
      return today;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../assets/style/global';

  .identity-form{

  }
  .identity-form__header{
    padding-bottom: 1rem;
    border-bottom:1px solid $lightgrey;
    margin-bottom:2rem;
  }
  .identity-form__title{
    margin-top:0;
    margin-bottom:.5rem;
    font-size: 25px;
    @media (min-width: 768px) {
      font-size: 36px;
    }
    span{
      color: $secondary;
    }
  }
  .identity-form__subtitle{
    font-weight: 400;
  }
  .identity-form__content{
    
    @media (min-width: 768px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
  .identity-form__input-wrapper{
    margin-top:1rem;
  }
  .identity-form__label{
    display: block;
    text-transform: uppercase;
    font-size:0.7rem;
    font-weight: 500;
    color: $grey;
    margin-bottom: 5px;
  }

  .identity-form__input{
    border: 1px solid $lightgrey;
    background: rgba($primary, 0.05);
    padding: 10px 20px;
    border-radius: 10px;
    color: $primary;
    font-weight: 500;
    width: 300px;
    max-width: 100%;
    font-size:0.9rem;
    outline:none;
    font-family:inherit;
  }
  .identity-form__illustration{
    display: none;
    @media (min-width: 768px) {
      display: block;
      position: relative;
      right:-60px;
    }
    
  }
  .identity-form__submit{
    margin-top: 2rem;
  }
  .identity-form__submit{
    background: $accent;
    border-color: $accent;
    color: $white;
    cursor: pointer;
    transition: background .3s ease-out;
    &:hover{
      background: darken($accent, 5%);
    }
    @media (min-width: 768px) {
      width: auto;
    }

  }
  ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color: rgba($primary, 0.5);;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: rgba($primary, 0.5);;
    opacity:  1;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: rgba($primary, 0.5);;
    opacity:  1;
  }
  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: rgba($primary, 0.5);;
  }
  ::-ms-input-placeholder { /* Microsoft Edge */
    color: rgba($primary, 0.5);
  }
  ::placeholder { /* Most modern browsers support this now. */
    color: rgba($primary, 0.5);
  }
  input:invalid::-webkit-datetime-edit {
    color: rgba($primary, 0.5);
  }
</style>
