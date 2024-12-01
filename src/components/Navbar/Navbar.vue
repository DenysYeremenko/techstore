<template>
    <button :class="{
        'navbar__toggle-button': true,
        'navbar__toggle-button--active': showMobileNav
    }"
            @click="handleMobileNavbarButton">
        <span v-if="showMobileNav && !showProfileMenu">✖</span>
        <span v-else-if="showProfileMenu && showMobileNav">🠔</span>
        <span v-else>☰</span>
    </button>
    <nav :class="{
        'navbar__navigation': true,
        'navbar__navigation--hidden': !showMobileNav
    }"
         @click.self="
            showMobileNav = false; showProfileMenu = false">
        <div class="navbar__list-container">
            <p class="navbar__profile-name"
               v-if="showProfileMenu && !isLargeScreen">Hi {{ userName }}!</p>
            <ul class="navbar__list">
                <li v-if="showProfileMenu && !isLargeScreen"
                    class="navbar__list-item">
                    <NavButton :text="'Favourites'"
                               :isLink="true"
                               :icon="favouritesIcon"
                               @navButtonClick="handleNavButtonClick" />

                </li>
                <li v-if="showProfileMenu && !isLargeScreen"
                    class="navbar__list-item">
                    <NavButton :text="'Orders'"
                               :isLink="true"
                               :icon="ordersIcon"
                               @navButtonClick="handleNavButtonClick" />

                </li>
                <li v-if="showProfileMenu && !isLargeScreen"
                    class="navbar__list-item">
                    <NavButton :text="'Logout'"
                               :isLink="false"
                               :icon="logoutIcon"
                               @navButtonClick="handleLogout" />
                </li>
                <li v-for="button in buttons"
                    v-if="isLargeScreen || !showProfileMenu"
                    :key="button.text"
                    class="navbar__list-item">
                    <NavButton :text="button.text"
                               :icon="button.icon"
                               :isLink="true"
                               @navButtonClick="handleNavButtonClick" />
                </li>
                <li class="navbar__list-item"
                    v-if="isLargeScreen || !showProfileMenu"
                    ref="profileButton">
                    <NavButton :text="isLogged ? 'Profile' : 'Login'"
                               :isLink="!isLogged ? true : false"
                               :icon="profileIcon"
                               @navButtonClick="toggleProfileMenu" />
                </li>
            </ul>
        </div>
        <div v-if="!showMobileNav"
             v-click-outside="handelClickOutside"
             :class="['navbar__profileMenu', { 'navbar__profileMenu--visible': showProfileMenu }]">
            <p class="navbar__profileMenu-name">Hi {{ userName }}!</p>
            <ul class="navbar__list">
                <li class="navbar__list-item">
                    <NavButton :text="'Favourites'"
                               :isLink="true"
                               :icon="favouritesIcon"
                               @navButtonClick="handleNavButtonClick" />
                </li>
                <li class="navbar__list-item">
                    <NavButton :text="'Orders'"
                               :isLink="true"
                               :icon="ordersIcon"
                               @navButtonClick="handleNavButtonClick" />
                </li>
                <li class="navbar__list-item">
                    <NavButton :text="'Logout'"
                               :isLink="false"
                               :icon="logoutIcon"
                               @navButtonClick="handleLogout" />
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import NavButton from '@/components/UI/NavButton/NavButton.vue';
import navigationButtons from '@/components/Navbar/data/navigationButtons';
import profileIcon from '@/assets/images/profile.svg'
import favouritesIcon from '@/assets/images/favourites.svg'
import ordersIcon from '@/assets/images/orders.svg'
import logoutIcon from '@/assets/images/logout.svg'
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
import { useMediaQuery } from '@vueuse/core';
import vClickOutsideUmd from 'click-outside-vue3';

export default {
    directives: {
        clickOutside: vClickOutsideUmd.directive
    },
    components: {
        NavButton
    },
    data() {
        return {
            buttons: navigationButtons,
            profileIcon: profileIcon,
            favouritesIcon: favouritesIcon,
            ordersIcon: ordersIcon,
            logoutIcon: logoutIcon,
            showProfileMenu: false,
            showMobileNav: false,
            isLargeScreen: useMediaQuery('(min-width: 1024px)')
        };
    },
    computed: {
        ...mapState({
            isLogged: state => state.auth.isLogged,
            userName: state => state.auth.user,
        }),

    },
    methods: {
        ...mapActions('auth', ['logout']),
        toggleProfileMenu() {
            if (!this.isLogged) {
                this.showMobileNav = false;
            }
            if (this.showProfileMenu) {
                this.showProfileMenu = false;
            } else if (this.isLogged) {
                this.showProfileMenu = true;
            }
        },
        handleNavButtonClick() {
            this.showProfileMenu = false;
            this.showMobileNav = false;
        },
        handleLogout() {
            this.showProfileMenu = false;
            this.showMobileNav = false;
            this.logout();
            this.$router.push('/');
        },
        handleMobileNavbarButton() {
            if (this.showProfileMenu === true) {
                this.showProfileMenu = false;
            } else {
                this.showMobileNav = !this.showMobileNav;
            }
        },
        handelClickOutside(event) {
            if (!this.$refs?.profileButton?.contains(event.target) && this.showProfileMenu) {
                this.showProfileMenu = false;
            }
        }
    },
}
</script>


<style lang="scss" scoped>
@use 'Navbar' as *;
</style>