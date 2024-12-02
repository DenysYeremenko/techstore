<template>
    <button :class="['navigation-button', { 'navigation-button--active': isActive }]"
            @click="handleClick">
        <img class="navigation-button__icon"
             :src="icon"
             alt="" />
        <span class="navigation-button__name">{{ text }}</span>
        <span v-if="isCartButton && AddedProductsCount > 0"
              class="navigation-button__cart-counter">{{ AddedProductsCount }}</span>
    </button>
</template>

<script>
import { mapGetters } from 'vuex';


export default {
    data() {
        return {
            isCartButton: this.text === 'Cart' ? true : false,
        }
    },

    props: {
        text: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            required: true,
        },
        isLink: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...mapGetters('cart', ['getAddedProductsCount']),
        AddedProductsCount() {
            return this.getAddedProductsCount;
        },

        isActive() {
            return this.$route.path === `/${this.text.toLowerCase()}`;
        }
    },

    methods: {
        handleClick() {
            this.$emit('navButtonClick');
            if (this.isLink) {
                this.$router.push(`/${this.text.toLowerCase()}`);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@use 'NavButton' as *;
</style>