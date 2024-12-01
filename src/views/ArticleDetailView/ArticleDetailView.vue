<template>
    <div class="article-detail">
        <section class="article-detail__banner">
            <img :src="article.imgURL"
                 alt="Article Image"
                 class="article-detail__image" />
            <h1 class="article-detail__title">{{ article.name }}</h1>
        </section>
        <section class="article-detail__content">
            <p class="article-detail__description">{{ article.text }}</p>
        </section>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
    data() {
        return {
            articleId: Number(this.$route.params.id),
        }
    },
    methods: {
        ...mapActions({
            fetchArticles: 'articles/fetchArticles',
        }),
        ...mapMutations({
            setSelectedArticleId: 'articles/setSelectedArticleId',
            setIsLoading: 'articles/setIsLoading',
        }),
    },
    mounted() {
        this.fetchArticles();
    },
    computed: {
        ...mapState({
            articles: state => state.articles.articles,
        }),
        article() {
            return this.articles.find(article => article.id === this.articleId) || {};
        },
    },
};
</script>

<style lang="scss" scoped>
.article-detail {
    &__banner {
        text-align: center;
        margin-bottom: 20px;
    }

    &__image {
        width: 100%;
        height: auto;
        border-radius: 25px;
        overflow: hidden;
    }

    &__title {
        margin-top: 20px;
        font-size: 35px;
        color: #000;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }

    &__content {
        font-size: 18px;
        line-height: 1.6;
        color: #333;
    }

    &__description {
        margin: 0;
    }

    @media (max-width: 768px) {
        &__title {
            font-size: 28px;
        }

        &__content {
            padding: 15px;
            font-size: 16px;
        }
    }
}
</style>