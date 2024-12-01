<template>
    <LoginAlert v-if="!isLogged" />
    <div v-if="isLogged">
        <h1 class="orders-title">Your Orders</h1>
        <span>Total spend: {{ countTotalSpend() }}$</span>
        <div v-for="order in orders"
             class="order-card">
            <div class="order-card__data">
                <div class="order-card__number">
                    <span class="order-card__attribute">Number:</span>
                    {{ order.number }}
                </div>
                <div class="order-card__date">
                    <span class="order-card__attribute">Date:</span>{{ order.date }}
                </div>
                <div class="order-card__total">
                    <span class="order-card__attribute">Order price:</span>{{ order.totalPrice }} $
                </div>
            </div>
            <button v-for="product in order.products"
                    @click="this.$router.push(`products/${product.id}`)"
                    class="order-card__product">
                <div class="order-card__product-details">
                    <div class="order-card__product-image-wrapper">
                        <img class="order-card__product-image"
                             :src="product.imgURL"
                             alt="Product image" />
                    </div>
                    <div class="order-card__product-name">{{ product.name }}</div>
                </div>
                <div class="order-card__product-order-info">
                    <span class="order-card__product-quantity">{{ product.quantity }} pcs.</span>
                    <span class="order-card__product-price">{{ product.price }}$</span>
                </div>

            </button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    computed: {
        ...mapState({
            orders: state => state.cart.orders,
            isLoading: state => state.cart.isLoading,
            isLogged: state => state.auth.isLogged
        }),
        // totalPrice() {
        //     return this.ordersProducts.reduce((total, product) => total + product.price, 0).toFixed(2);
        // }
    },
    methods: {
        ...mapActions('cart', ['fetchOrders']),
        countTotalSpend() {
            return this.orders.reduce((total, order) => total + Number(order.totalPrice), 0).toFixed(2);
        }
    },

}
</script>

<style lang="scss" scoped>
@use 'OrdersView' as *;
</style>