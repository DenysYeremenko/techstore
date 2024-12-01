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
      path: '/',
      name: 'HomePage',
      component: HomeView,
    },
    {
      path: '/products',
      name: 'ProductsPage',
      component: ProductsView,
    },
    {
      path: '/products/:id',
      name: 'ProductDetailPage',
      component: ProductDetailView,
    },
    {
      path: '/articles',
      name: 'ArticlesPage',
      component: ArticlesView,
    },
    {
      path: '/articles/:id',
      name: 'Article',
      component: ArticleDetailView,
    },
    {
      path: '/cart',
      name: 'Cart',
      component: CartView,
    },

    {
      path: '/favourites',
      name: 'Favourites',
      component: FavouritesView,
    },

    {
      path: '/orders',
      name: 'Orders',
      component: OrdersView,
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/signUp',
      name: 'SignUp',
      component: SignUpView,
    },
  ],
})

export default router
