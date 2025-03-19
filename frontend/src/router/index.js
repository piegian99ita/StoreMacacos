

import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/LoginPage.vue';
import Home from '../components/HomePage.vue';
import TshirtPage from '../components/TshirtPage.vue'
import FelpaPage from '../components/FelpaPage.vue'
import OrdiniPage from '../components/OrdiniPage.vue'
//import AdminPage from '../components/AdminPage.vue'
import PrivacyPolicy from '../components/PrivacyPolicy.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/home',name: 'Home', component: Home },
  { path: '/tshirt', component: TshirtPage },
  { path: '/felpe', component: FelpaPage },
  {path: '/ordini',name: 'OrdiniPage',component: OrdiniPage},
  //{path: '/home/admin',name: 'AdminPage',component: AdminPage}
   {path: '/privacy',name: 'PrivacyPolicy',component: PrivacyPolicy}

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
