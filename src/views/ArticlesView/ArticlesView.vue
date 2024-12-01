<template>
    <section class="articles-section"
             aria-label="Articles">
        <div class="articles-grid">
            <div v-for="{ id, name, imgURL } in articles"
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
import { mapState, mapActions } from 'vuex';

export default {
    data() {
        return {};
    },
    computed: {
        ...mapState({
            articles: state => state.articles.articles,
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
.articles-section {
    margin-bottom: 40px;

    &__title {
        margin-bottom: 25px;
        font-size: 50px;
        color: #000;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3), 1px 1px 2px rgba(0, 0, 0, 0.2);
    }
}

.articles-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;

    @media (min-width: 768px) {
        grid-template-columns: 1fr;
    }

    @media (min-width: 1024px) {
        grid-template-columns: 1fr;
    }
}

.article-card {
    position: relative;
    cursor: pointer;
    border-radius: 25px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-5px);
    }

    &__image {
        width: 100%;
        height: auto;
        border-radius: 25px 25px 0 0;
    }

    &__title {
        padding: 10px;
        font-size: 20px;
        color: #333;
    }
}
</style>