<template>
  <!-- Product Banner Slider Section -->
  <section class="banner-section"
           aria-label="Featured Products">
    <Carousel v-bind="config">
      <Slide v-for="{ id, name, imgURL } in articles"
             :key="id">
        <button class="carousel__slide-wrapper"
                @click="handleSlideButtonClick(id)">
          <img :src="imgURL"
               width="1000px"
               height="490px"
               class="carousel__image" />
          <h2 class="carousel__slide-text">{{ name }}</h2>
        </button>
      </Slide>
      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </section>
  <section class="products-section"
           aria-label="Product Listings">
    <h1 class="products-section__title">Create Your Perfect Workspace</h1>
    <!-- Product Grid -->
    <ProductsGrid :products="products" />
  </section>

</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

export default {
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data() {
    return {
      config: {
        autoplay: 5000,
        transition: 1000,
        wrapAround: true,
        responsive: {
          1024: {
            slidesToShow: 1,
            breakpoints: {
              arrows: false,
              pagination: false,
            }
          },
          768: {
            slidesToShow: 1,
            breakpoints: {
              arrows: false,
              pagination: false,
            }
          }
        }
      }
    };
  },
  computed: {
    ...mapState({
      articles: state => state.articles.articles,
      products: state => state.products.products,
    }),
  },
  methods: {
    ...mapActions({
      fetchArticles: 'articles/fetchArticles',
      fetchProducts: 'products/fetchProducts',
    }),

    handleSlideButtonClick(id) {
      this.$router.push({ path: `/articles/${id}`, hash: '#article-detail' });
    },
  },
  mounted() {
    this.fetchArticles();
    this.fetchProducts();
  },
}
</script>

<style lang="scss">
@use 'HomeView' as *;
</style>