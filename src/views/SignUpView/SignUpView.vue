<template>
    <div class="signup">
        <form class="signup__form"
              @submit.prevent="handlePasswordMatch() && register({ name, email, password, cart, orders, favourites })">
            <h2 class="signup__title">Sign Up</h2>
            <UserInputForm title="Name"
                           type="text"
                           v-model="name"
                           id="name" />
            <UserInputForm title="Email"
                           type="email"
                           v-model="email"
                           id="email" />
            <UserInputForm title="Password"
                           :type="showPassword ? 'text' : 'password'"
                           v-model="password"
                           id="password" />
            <UserInputForm title="Confirm password"
                           :type="showPassword ? 'text' : 'password'"
                           v-model="confirmPassword"
                           id="confirmPassword" />
            <div> <label class="signup__show-password">
                    <input type="checkbox"
                           v-model="showPassword"
                           class="signup__checkbox" />
                    <span class="signup__checkmark"></span> Show password
                </label>
            </div>
            <button type="submit"
                    class="signup__button">Sign Up</button>
            <p class="signup__login-link">
                Already have an account? <button class="navigation-button"
                        @click="$router.push('login')">Login</button>
            </p>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import UserInputForm from '@/components/UI/UserInputForm/UserInputForm.vue';
import { useToast } from 'vue-toastification';

export default {
    components: {
        UserInputForm,
    },
    setup() {
        const toast = useToast();
        return { toast };
    },
    data() {
        return {
            name: '',
            email: '',
            password: '',
            favourites: [],
            cart: [],
            orders: [],
            confirmPassword: '',
            passwordError: false,
            showPassword: false,
        };
    },
    methods: {
        ...mapActions('auth', ['register']),
        handlePasswordMatch() {
            if (this.password !== this.confirmPassword) {
                this.passwordError = 'Passwords do not match!';
                this.toast.warning('Passwords do not match!');
                return false;
            } else {
                this.passwordError = false;
                return true;
            }
        },
        // async register() {
        //     if (this.password !== this.confirmPassword) {
        //         alert('Passwords do not match!');
        //         return;
        //     }
        //     try {
        //         const response = await this.register({ email: this.email, password: this.password });
        //         const { token, user } = response;
        //         Cookies.set('token', token, { expires: 7 });
        //         this.$store.commit('auth/setUser', user);
        //         this.$store.commit('auth/setToken', token);
        //         this.$router.push('/');
        //     } catch (error) {
        //         console.error('Registration failed:', error);
        //         alert('Registration failed');
        //     }
        // },
    },
};
</script>

<style lang="scss" scoped>
@use 'SignUpView' as *;
</style>