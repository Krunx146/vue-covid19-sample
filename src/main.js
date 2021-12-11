import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import ByCountryPage from './ByCountry.vue'
import DefaultPage from './Default.vue'
import TotalPage from './Total.vue'
Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'default',
    component: DefaultPage 
  },
  {
    path: '/total',
    name: 'total',
    component: TotalPage 
  },
  {
    path: '/byCountry/:type',
    name: 'byCountry',
    component: ByCountryPage 
  }
];

const router = new Router({
  routes
});

new Vue({
  el: '#app',
  render: h => h(App),
  router
});
