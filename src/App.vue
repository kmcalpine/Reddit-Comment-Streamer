<template>

    <div id="app">
        <Home />
    </div>


</template>

<script>
    import Home from './components/Home.vue';

    export default {
        name: 'app',
        components: {
            Home
        },
    };
</script>

<style>
    body {
        background-color: #1b1b2f;
        margin: 0px;
        display: flex;
        flex-direction: column;
        font-size: 14px;
        min-height: 100vh;
    }

    #app {
        font-family: "Roboto Mono";
        display: flex;
        flex: 1;
        padding: 40px;
        overflow-y: hidden;
        align-items: center;
        justify-content: center;
    }
</style>

