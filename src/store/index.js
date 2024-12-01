import { createStore } from 'vuex'
import { productsModule } from './modules/productsModule'
import { articlesModule } from './modules/articlesModule'
import { authModule } from './modules/authModule'
import { cartModule } from './modules/cartModule'
import { favouritesModule } from './modules/favouritesModule'

export default createStore({
  modules: {
    products: productsModule,
    articles: articlesModule,
    auth: authModule,
    cart: cartModule,
    favourites: favouritesModule,
  },
})
