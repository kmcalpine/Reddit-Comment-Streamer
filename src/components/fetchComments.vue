<template>
    <div class="fetchComments">
        <div class="home-nav-div">
            <p>{{ testData[0].data.children[0].data.title }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Home',
        props: {},
        data() {
            return {
                testData: null
            }
        },
        created() {
            fetch('https://www.reddit.com/r/wallstreetbets/comments/l9c04t/we_hold.json')
                .then(response => response.json())
                .then(data => (this.testData = data))
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1 {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 10px
    }

    h2 {
        font-family: Arial, Helvetica, sans-serif
    }

    p {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 23px
    }

    .home {
        display: flex;
        min-width: 100vw;
    }

    .home-nav-div {
        display: inline-flex;
        width: 100%;
    }
</style>

