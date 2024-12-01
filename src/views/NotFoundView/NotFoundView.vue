<template>
    <div class="not-found">
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <router-link to="/">Go back to Home</router-link>
    </div>
</template>

<script>
export default {
    name: 'NotFoundView',
}
</script>

<style scoped>
.not-found {
    text-align: center;
    padding: 50px;
}

.not-found h1 {
    font-size: 2em;
    margin-bottom: 20px;
}

.not-found p {
    margin-bottom: 20px;
}

.not-found a {
    color: #42b983;
    text-decoration: none;
}
</style>