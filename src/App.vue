<template>
  <MainLayout>
    <RouterView />
  </MainLayout>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import MainLayout from '@/layouts/MainLayout.vue';

export default {
  name: 'App',
  components: {
    MainLayout,
  },
  created() {
    this.autoLogin();
  },
  methods: {
    ...mapActions('auth', ['autoLogin']),
  },
};
</script>