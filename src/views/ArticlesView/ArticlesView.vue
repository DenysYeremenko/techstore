<template>
    <section class="articles-section"
             aria-label="Articles">


        <div class="articles-grid">
            <AnimatedPlaceholder v-if="isLoading"
                                 height="612px"
                                 width="1000px"
                                 borderRadius="25px" />
            <div v-if="!isLoading"
                 v-for="{ id, name, imgURL } in articles"
                 :key="id"
                 class="article-card"
                 @click="handleArticleClick(id)">
                <img :src="imgURL"
                     alt="Article Image"
                     class="article-card__image" />
                <h2 class="article-card__title">{{ name }}</h2>
            </div>
        </div>
    </section>
</template>

<script>
import AnimatedPlaceholder from '@/components/Skeleton/AnimatedPlaceholder.vue';
import { mapState, mapActions } from 'vuex';

export default {
    components: {
        AnimatedPlaceholder
    },
    data() {
        return {};
    },
    computed: {
        ...mapState({
            articles: state => state.articles.articles,
            isLoading: state => state.articles.isLoading,
        }),
    },
    methods: {
        ...mapActions({
            fetchArticles: 'articles/fetchArticles',
        }),
        handleArticleClick(id) {
            this.$router.push({ path: `/articles/${id}`, hash: '#article-detail' });
        },
    },
    mounted() {
        this.fetchArticles();
    },
}
</script>

<style lang="scss" scoped>
@use 'ArticlesView' as *;
</style>