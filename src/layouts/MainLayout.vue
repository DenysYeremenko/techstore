<template>
    <Loader v-if="isLoading" />

    <div class="main-layout">
        <Header />
        <main ref="mainRef"
              class="main-layout__content">
            <slot></slot>
        </main>
        <!-- <Footer /> -->
    </div>
</template>

<script>
import Header from '@/components/Header/Header.vue'
import autoAnimate from '@formkit/auto-animate';
import { mapState } from 'vuex';

export default {
    components: {
        Header
    },
    computed: {
        ...mapState({
            isLoading: state => state.auth.isLoading,
        }),
    },
    mounted() {
        const mainRef = this.$refs.mainRef;
        autoAnimate(mainRef);

    },
}
</script>
<style lang="scss" scoped>
@use 'MainLayout' as *;
</style>