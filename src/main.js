import './style.css';
import './flags.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import Card from 'primevue/card';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';

import App from './App.vue';

const pinia = createPinia();
const app = createApp(App);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: '.p-dark',
      cssLayer: false
    }
  }
});
app.component('Button', Button);
app.component('InputNumber', InputNumber);
app.component('Card', Card);
app.component('Dialog', Dialog);
app.component('InputText', InputText);
app.use(pinia);
app.mount('#app');
