<template>
    <div class="login">
        <form class="login__form"
              @submit.prevent="login({ email, password })">
            <h2 class="login__title">Login</h2>
            <div class="login__form-group">
                <label class="login__label"
                       for="email">Email</label>
                <input class="login__input"
                       type="email"
                       id="email"
                       autocomplete="email"
                       v-model="email"
                       required />
            </div>
            <div class="login__form-group">
                <label class="login__label"
                       for="password">Password</label>
                <input class="login__input"
                       :type="showPassword ? 'text' : 'password'"
                       id="password"
                       autocomplete="current-password"
                       v-model="password"
                       required />
                <label class="login__show-password">
                    <input type="checkbox"
                           v-model="showPassword"
                           class="login__checkbox" />
                    <span class="login__checkmark"></span> Show password
                </label>
            </div>
            <button type="submit"
                    class="login__button">Login</button>
            <button type="button"
                    class="login__button login__button--test"
                    @click="loginWithTestCredentials">Login with Test Credentials</button>
            <p class="login__signup-link">
                Don't have an account yet? <router-link to="/signup">Sign up</router-link>
            </p>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            email: '',
            password: '',
            showPassword: false,
        };
    },
    methods: {
        ...mapActions('auth', ['login']),

        loginWithTestCredentials() {
            this.email = 'test@example.com';
            this.password = 'password';
        },

    },
};
</script>

<style lang="scss" scoped>
@use 'LoginView' as *;
</style>