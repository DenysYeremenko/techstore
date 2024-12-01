<template>
    <div class="product-detail">
        <section class="product-detail__banner">
            <img :src="product.imgURL"
                 alt="Product Image"
                 class="product-detail__image" />
        </section>
        <section class="product-detail__content">
            <h1 class="product-detail__title">{{ product.name }}</h1>
            <p class="product-detail__description">{{ product.description }}</p>
            <div class="product-detail__price">${{ product.price }}</div>
            <button :class="['product-detail__add-button', { 'product-detail__add-button--added': isProductAdded }]"
                    @click="handleAddProduct">
                {{ isProductAdded ? 'Added to Cart' : 'Add to Cart' }}
            </button>
        </section>
    </div>
</template>

<script>
import { useToast } from 'vue-toastification';
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';

export default {
    data() {
        return {
            productId: this.$route.params.id,
        };
    },
    computed: {
        ...mapState({
            products: state => state.products.products,
            isLogged: state => state.auth.isLogged,
        }),

        ...mapGetters('cart', {
            isAddedToCart: 'isAddedToCart',
        }),

        isProductAdded() {
            return this.isAddedToCart(this.productId)
        },

        product() {
            return this.products[0] || {};
        },
    },
    methods: {

        ...mapActions({
            fetchProducts: 'products/fetchProducts',
            fetchCart: 'cart/fetchCart',
            addProductToCart: 'cart/addProductToCart',
            removeProductFromCart: 'cart/removeProductFromCart',

        }),

        ...mapMutations({
            setSelectedProductId: 'products/setSelectedProductId',
        }),

        handleAddProduct() {
            if (!this.isLogged) {
                const toast = useToast();
                toast.warning('Please login to add products to cart');
                return
            }
            if (!this.isProductAdded && this.isLogged) {
                this.addProductToCart({ id: this.product.id, quantity: 1, name: this.product.name, price: this.product.price, imgURL: this.product.imgURL })
            } else {
                this.removeProductFromCart(this.product.id)
            }
        },
    },
    beforeMount() {
        if (this.isLogged) {
            this.fetchCart();
        }
        this.setSelectedProductId(this.productId);
        this.fetchProducts();

    },
};
</script>

<style lang="scss" scoped>
@use 'ProductDetailView' as *
</style>