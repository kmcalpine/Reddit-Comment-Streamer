<template>




    <div class="comments-container">
        <div class="comments-dataText" ref="logsref">
            <Comments :scrollBottom='scrollBottom' :comment="comment.data" v-for="(comment, index) in this.comments.comments" :key="index" />
        </div>
    </div>










</template>

<script>
    import { mapState } from 'vuex';
    import Comments from './Comments.vue';
    export default {
        name: 'CommentContainer',
        components: {
            Comments
        },
        props: {
            comments: Object
        },
        data() {
            return {
                isLoading: false,
                commentInterval: null
            }
        },
        methods: {
            scrollBottom() {
                this.$refs.logsref.scrollTop = this.$refs.logsref.scrollHeight;
            }
        },
        updated() {
            this.scrollBottom();
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
        font-size: 18px;
    }

    .home {
        display: inline;
    }

    .home-nav-div {
        display: inline-flex;
        position: relative;
        width: 100%;
    }

    .home-nav-div p {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 18px;
        color: #eee;
        margin-bottom: 30px;
    }

    #main-el {
        display: flex;
        width: 100%;
    }
    .logs {
        display: flex;
        flex: 1;
        width: 100%;
        height: 100%
    }
    .logs2 {
        display: flex;
        flex: 1;
        max-width: 100%;
        max-height: 100%;
    }
    .list-wrapper {
        flex-direction: column;
        display: flex;
        flex: 1;
    }

    .comments-wrapper {
        display: flex;
        flex: 1;
        background-color: #464646;
        border-radius: 4px;
        overflow-x: hidden;
        overflow-y: auto;
        margin-top: 10px;
        color: #8d8d8d;
        width: 100%;
    }

    .comments-container1 {
        position: relative;
        display: flex;
        flex: 1;
        margin-bottom: 10px;
        background-color: #1b1b2f;
        border-radius: 4px;
        overflow-x: hidden;
        overflow-y: auto;
        margin-top: 10px;
        color: #162447;
        height: 100%;
    }
    .comments-container {
        position: relative;
        width: 100%;
        height: 100%;
    }

    #comments-outer {
        position: relative;
        height: 100%;
        width: 100%;
    }


    .comments-dataText {
        position: absolute;
        height: 100%;
        width: 100%;
        overflow-y: auto;
        background: #222239;
    }
</style>

