<template>
    <LoginAlert v-if="!isLogged" />

    <div class="cart-view"
         v-if="addedProducts.length > 0 && isLogged">

        <div class="cart-summary">
            <div class="cart-summary__total">
                <span>To pay:</span>
                <span>{{ totalPrice }}$</span>
            </div>
            <div class="cart-summary__actions">
                <button @click="confirmOrder"
                        class="confirm-button">Confirm order</button>
                <button @click="clearCart"
                        class="clear-button">Clear cart</button>
            </div>
        </div>
        <h2>You have added products to the cart:</h2>
        <ProductsGrid :products="addedProducts"
                      :isPaginationActive="false"
                      :isFiltersActive="false" />

    </div>
    <div v-if="addedProducts.length < 1 && isLogged">
        <h2>Your cart is currently empty</h2>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';

export default {
    computed: {
        ...mapState({
            addedProducts: state => state.cart.addedProducts,
            isLoading: state => state.cart.isLoading,
            isLogged: state => state.auth.isLogged
        }),
        ...mapGetters('cart', ['getTotalPrice']),
        totalPrice() {
            return this.getTotalPrice;
        }
    },
    methods: {
        ...mapActions('cart', ['fetchCart', 'clearCart', 'confirmOrder']),
        ...mapActions('favourites', ['fetchFavourites']),
    },
};
</script>

<style lang="scss" scoped>
@use 'CartView' as *;
</style>