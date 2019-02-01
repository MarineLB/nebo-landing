<template>
  <form
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
            :placeholder="input.placeholder"
            required
          />
        </div>
      </div>
      <div class="identity-form__illustration">
        <img src="../assets/illustration.svg">
      </div>
    </div>
    <div class="identity-form__footer">
      <button
        type="submit"
        class="identity-form__input identity-form__submit">
        <img src="../assets/gift.svg">
        Generate my identity
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'Form',
  props:{
    data: Object
  },
  mounted() {
    this.$refs.date[0].max = new Date().toISOString().split("T")[0];

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../assets/style/global';

  .identity-form{
    max-width: 840px;
    border-radius: 2rem;
    padding:60px 60px;
    margin:0 auto;
    position: relative;
    top:-27vh;
    z-index:2;
    background: $white;
    box-shadow: $lightgrey 0 30px 80px;

  }
  .identity-form__header{
    padding-bottom: 1rem;
    border-bottom:1px solid $lightgrey;
    margin-bottom:2rem;
  }
  .identity-form__title{
    margin-top:0;
    margin-bottom:.5rem;
    font-size: 36px;
    span{
      color: $secondary;
    }
  }
  .identity-form__subtitle{
    font-weight: 400;
  }
  .identity-form__content{
    display: grid;
    grid-template-columns: 1fr 1fr;
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
    min-width: 300px;
    font-size:0.9rem;
    outline:none;
    font-family:inherit;
  }
  .identity-form__illustration{
    position: relative;
    right:-60px;
  }
  .identity-form__submit{
    margin-top: 2rem;
  }
  .identity-form__submit{
    background: $accent;
    border-color: $accent;
    color: $white;
    min-width: 0;
    cursor: pointer;
    transition: background .3s ease-out;
    &:hover{
      background: darken($accent, 5%);
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
