import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Form from './components/IdentityForm.vue'
import Generative from './components/Generative.vue'

Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: (to, from, savedPosition) => {
    return {x: 0, y: 0}
  },
  /*
  We just add one route
   */
  routes: [{
    // Wildcard path
    name: 'home',
    path: '/',
    // Specify the component to be rendered for this route
    component: Form,
    // Inject  props based on route.query values (our query parameters!)
  }, {
    // Wildcard path
    name: 'generated',
    path: '/generated',
    // Specify the component to be rendered for this route
    component: Generative,
    // Inject  props based on route.query values (our query parameters!)
  }]
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
