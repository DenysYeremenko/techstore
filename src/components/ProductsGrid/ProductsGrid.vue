<template>
    <div ref="productsFilters"
         class="products-filters"
         v-if="isFiltersActive">
        <!-- Products Filters -->
        <DynamicField :options="dynamicFieldOptions.searchInput"
                      :model-value="searchQuery"
                      @update:model-value="updateSearchQuery" />
        <DynamicField :options="dynamicFieldOptions.categoriesSelect"
                      :model-value="selectedCategory"
                      @update:model-value="updateSelectedCategory" />
        <DynamicField :options="dynamicFieldOptions.sortSelect"
                      :model-value="selectedSort"
                      @update:model-value="updateSelectedSort" />
    </div>
    <!-- Product Grid -->
    <div ref="productsGrid"
         class="products-grid">
        <AnimatedPlaceholder v-if="isLoading"
                             v-for="n in 9"
                             :key="n"
                             width="325px"
                             height="420px"
                             borderRadius="40px" />
        <ProductCard v-if="!isLoading"
                     v-for="product in products"
                     :key="product.id"
                     :id="product.id"
                     :name="product.name"
                     :imgURL="product.imgURL"
                     :price="product.price" />
    </div>
    <!-- Pagination -->
    <nav v-if="isPaginationActive"
         class="product-pagination"
         aria-label="Page Navigation">
        <ul class="product-pagination__list">
            <li class="product-pagination__item">
                <button :class="{
                    'product-pagination__link': true, 'product-pagination__link--nav': true, 'product-pagination__link--disabled': currentPage === 1
                }"
                        @click="handlePaginationButtonClick('prev')"
                        :disabled="currentPage === 1">Previous</button>
            </li>
            <li v-for="pageNumber in pageLimit"
                class="product-pagination__item">
                <button :class="{
                    'product-pagination__link': true,
                    'product-pagination__link--active': currentPage === pageNumber,
                }"
                        @click="handlePaginationButtonClick(pageNumber)">{{ pageNumber }}</button>
            </li>
            <li class="product-pagination__item">
                <button :class="{
                    'product-pagination__link': true, 'product-pagination__link--nav': true, 'product-pagination__link--disabled': currentPage === pageLimit
                }"
                        @click="handlePaginationButtonClick('next')">Next</button>
            </li>
        </ul>
    </nav>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import dynamicFieldOptions from '@/components/UI/DynamicField/data/';
import DynamicField from '@/components/UI/DynamicField/DynamicField.vue';
import ProductCard from '@/components/ProductCard/ProductCard.vue';
import autoAnimate from '@formkit/auto-animate';
import AnimatedPlaceholder from '../Skeleton/AnimatedPlaceholder.vue';

export default {
    components: {
        DynamicField,
        ProductCard,
        AnimatedPlaceholder
    },
    props: {
        products: {
            type: Array,
            required: true,
        },
        isFiltersActive: {
            type: Boolean,
            default: true,
        },
        isPaginationActive: {
            type: Boolean,
            default: true,
        },
        // isAddButton: {
        //     type: Boolean,
        //     default: true,
        // },
    },
    data() {
        return {
            isSearchActive: false,
            dynamicFieldOptions,
        };
    },
    computed: {
        ...mapState({
            // products: state => state.products.products,
            searchQuery: state => state.products.searchQuery,
            selectedCategory: state => state.products.selectedCategory,
            selectedSort: state => state.products.selectedSort,
            pageLimit: state => state.products.pageLimit,
            currentPage: state => state.products.currentPage,
            itemsPerPage: state => state.products.itemsPerPage,
            isLoading: state => state.products.isLoading,
        }),
    },
    methods: {
        ...mapMutations({
            setSearchQuery: 'products/setSearchQuery',
            setSelectedCategory: 'products/setSelectedCategory',
            setSelectedSort: 'products/setSelectedSort',
            setCurrentPage: 'products/setCurrentPage',
        }),
        ...mapActions('products', ['fetchProducts']),
        ...mapActions('cart', ['fetchCart', 'updateCart']),
        ...mapActions('favourites', ['fetchFavourites']),
        updateSearchQuery(value) {
            this.setSearchQuery(value);
            this.fetchProducts();
        },
        updateSelectedCategory(value) {
            this.setSelectedCategory(value);
            this.fetchProducts();
        },
        updateSelectedSort(value) {
            this.setSelectedSort(value);
            this.fetchProducts();
        },
        handlePaginationButtonClick(direction) {
            if (direction === 'prev' && this.currentPage > 1) {
                this.setCurrentPage(this.currentPage - 1);
                this.fetchProducts();
                this.scrollToTop()
            } else if (direction === 'next' && this.currentPage < this.pageLimit) {
                this.setCurrentPage(this.currentPage + 1);
                this.fetchProducts();
                this.scrollToTop()
            } else if (typeof direction === 'number') {
                this.setCurrentPage(direction);
                this.fetchProducts();
                this.scrollToTop()
            }
        },
        scrollToTop() {
            this.$refs.productsFilters.scrollIntoView({ behavior: 'smooth' });
        },
    },
    mounted() {
        const productsGrid = this.$refs.productsGrid;
        autoAnimate(productsGrid);
    },
};
</script>

<style lang="scss" scoped>
@use 'ProductsGrid' as *;

.skeleton-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
}
</style>