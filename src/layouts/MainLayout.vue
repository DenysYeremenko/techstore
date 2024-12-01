<template>
    <div class="main-layout">
        <Header />
        <main class="main-layout__content">
            <slot></slot>
        </main>
        <!-- <Footer /> -->
    </div>
</template>

<script>
import Header from '@/components/Header/Header.vue'

export default {
    components: {
        Header
    }

}
</script>
<style lang="scss" scoped>
@use 'MainLayout' as *;
</style>