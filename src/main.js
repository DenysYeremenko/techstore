import './assets/styles/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ProductCard from './components/ProductCard/ProductCard.vue'
import ProductsGrid from './components/ProductsGrid/ProductsGrid.vue'
import LoginView from './views/LoginView/LoginView.vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import LoginAlert from './components/LoginAlert/LoginAlert.vue'
import Loader from './components/Loader/Loader.vue'

const options = {
  position: 'top-right',
  timeout: 4000,
  right: 50,
}

const app = createApp(App)

app.use(router)
app.use(store)
app.use(Toast, options)
app.component('ProductCard', ProductCard)
app.component('ProductsGrid', ProductsGrid)
app.component('LoginView', LoginView)
app.component('LoginAlert', LoginAlert)
app.component('Loader', Loader)
app.mount('#app')
