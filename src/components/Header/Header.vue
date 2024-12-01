<template>
    <header class="header">
        <button class="header__button"
                @click="$router.push('/')">
            <img width="48px"
                 height="48px"
                 :src="logo">
            <div class="header__button-wrapper">
                <span class="header__button-title">TechStore</span>
                <span class="header__button-text">Discover the Future</span>
            </div>
        </button>
        <Navbar />
    </header>
</template>

<script>
import logo from '@/assets/images/logo.svg'
import Navbar from '@/components/Navbar/Navbar.vue'

export default {
    components: {
        Navbar
    },
    data() {
        return {
            logo
        };
    },
}
</script>

<style lang="scss" scoped>
@use 'Header' as *;
</style>