import Vue from 'vue';
import App from './App';
import router from './router';
import Vuetify from 'vuetify';
import VueResource from 'vue-resource';

//import vuetify css
import('./../node_modules/vuetify/dist/vuetify.min.css');

//import components for global registration
import Alert from "./components/Common/Alert";
import BottomSheet from "./components/Common/BottomSheet";
import BottomSheetPersistent from "./components/Common/BottomSheetPersistent";
import BottomSheetPop from "./components/Common/BottomSheetPop";
import Dialog from "./components/Common/Dialog";
import Footer from "./components/Common/Footer";
import FullScreenDialog from "./components/Common/FullScreenDialog";
import JobCard from "./components/Common/JobCard";
import SeekerCard from "./components/Common/SeekerCard";
import Snackbar from "./components/Common/Snackbar";

import LoginComponent from './components/LoginComponent/LoginComponent';
import RegisterComponent from './components/RegisterComponent/RegisterComponent';

Vue.config.productionTip = true;
Vue.config.devtools = true;

Vue.use(Vuetify);
Vue.use(VueResource);

//register componennt for global use
Vue.component('app-alert', Alert);
Vue.component('app-bottom-sheet', BottomSheet);
Vue.component('app-bottom-sheet-per', BottomSheetPersistent);
Vue.component('app-bottom-sheet-pop', BottomSheetPop);
Vue.component('app-dialog', Dialog);
Vue.component('app-footer', Footer);
Vue.component('app-dialog-full', FullScreenDialog);
Vue.component('app-job-card', JobCard);
Vue.component('app-seeker-card', SeekerCard);
Vue.component('app-snackbar', Snackbar);

Vue.component('app-login', LoginComponent);
Vue.component('app-register', RegisterComponent);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
