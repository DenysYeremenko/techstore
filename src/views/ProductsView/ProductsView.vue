<template>
    <div class="products-page">
        <ProductsGrid :products="products" />
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';


export default {
    computed: {
        ...mapState({
            products: state => state.products.products,
        }),
    },
    methods: {
        ...mapActions('products', ['fetchProducts']),
    },
    mounted() {
        this.fetchProducts();
    }
};
</script>

<style lang="scss" scoped>
@use 'ProductsView' as *
</style>
