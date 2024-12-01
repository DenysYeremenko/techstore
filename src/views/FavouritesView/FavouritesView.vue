<template>
    <LoginAlert v-if="!isLogged" />
    <h2 v-if="isLogged && favourites.length < 1">No favourites added yet</h2>
    <div v-if="isLogged && favourites.length > 0">
        <h2>Your favourite products have been added:</h2>
        <ProductsGrid :products="favourites"
                      :isFiltersActive="false"
                      :isPaginationActive="false" />
    </div>
</template>

<script>
import ProductsGrid from '@/components/ProductsGrid/ProductsGrid.vue';
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState({
            favourites: state => state.favourites.favourites,
            isLogged: state => state.auth.isLogged
        }),
    }
}
</script>

<style lang="scss" scoped>
@use 'FavouritesView' as *
</style>