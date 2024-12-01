<template>
    <h2 class="login-alert">
        You are not logged in. Please <button class="login-alert__link"
                @click="$router.push('/login')">login</button> or <button class="login-alert__link"
                @click="$router.push('/signup')">sign
            up</button> to continue.
    </h2>

</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@use 'LoginAlert' as *;
</style>
