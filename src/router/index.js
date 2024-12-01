import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView/HomeView.vue'
import ProductsView from '@/views/ProductsView/ProductsView.vue'
import ArticlesView from '@/views/ArticlesView/ArticlesView.vue'
import ArticleDetailView from '@/views/ArticleDetailView/ArticleDetailView.vue'
import CartView from '@/views/CartView/CartView.vue'
import LoginView from '@/views/LoginView/LoginView.vue'
import SignUpView from '@/views/SignUpView/SignUpView.vue'
import ProductDetailView from '@/views/ProductDetailView/ProductDetailView.vue'
import OrdersView from '@/views/OrdersView/OrdersView.vue'
import FavouritesView from '@/views/FavouritesView/FavouritesView.vue'

const router = createRouter({
  history: createWebHistory('/techstore/'),
  routes: [
    {
      path: '/techstore/',
      name: 'HomePage',
      component: HomeView,
    },
    {
      path: '/techstore/products',
      name: 'ProductsPage',
      component: ProductsView,
    },
    {
      path: '/techstore/products/:id',
      name: 'ProductDetailPage',
      component: ProductDetailView,
    },
    {
      path: '/techstore/articles',
      name: 'ArticlesPage',
      component: ArticlesView,
    },
    {
      path: '/techstore/articles/:id',
      name: 'Article',
      component: ArticleDetailView,
    },
    {
      path: '/techstore/cart',
      name: 'Cart',
      component: CartView,
    },

    {
      path: '/techstore/favourites',
      name: 'Favourites',
      component: FavouritesView,
    },

    {
      path: '/techstore/orders',
      name: 'Orders',
      component: OrdersView,
    },
    {
      path: '/techstore/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/techstore/signUp',
      name: 'SignUp',
      component: SignUpView,
    },
  ],
})

export default router
