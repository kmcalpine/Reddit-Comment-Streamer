<template>
    <div class="comments-container">
        <div class="comments-dataText" ref="logsref">
            <div class="spinner-wrapper">
                <transition appear-active-class="animated fadeIn"
                    enter-active-class="animated fadeInUp"
                    leave-active-class="animated fadeOutDown faster"
                    mode="out-in"
                    >
                    <div class="radar-spinner " v-if="this.initLoading">
                        <div class="circle">
                            <div class="circle-inner-container">
                                <div class="circle-inner"></div>
                            </div>
                        </div>

                        <div class="circle">
                            <div class="circle-inner-container">
                                <div class="circle-inner"></div>
                            </div>
                        </div>

                        <div class="circle">
                            <div class="circle-inner-container">
                                <div class="circle-inner"></div>
                            </div>
                        </div>

                        <div class="circle">
                            <div class="circle-inner-container">
                                <div class="circle-inner"></div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>


            <Comments :comments="this.comments" @updateScroll="scrollBottom">
                <template v-slot:default="{ comment }">
                    
                    <div class="comment-author-container">
                        <div class="comment-author">
                            <span>{{ comment.data.author }}</span>
                        </div>
                        <div class="comment-account-date">
                            <span>account created: {{ new Date(comment.data.accountCreation*1000).toLocaleDateString("en-US") }}</span>
                        </div>
                    </div>

                    <div class="comment-body-container">
                        <div class="comment-body">
                            <span>{{ comment.data.body }}</span>
                        </div>
                    </div>
                </template>
                
            </Comments>


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
            comments: Object,
            initLoading: Boolean
        },
        data() {
            return {
                isLoading: false,
                commentInterval: null,
                containerScroll: null,
                scrolled: false
             
            }
        },
        methods: {

            scrollBottom(val) {
                if (!this.scrolled) {
                    this.$refs.logsref.scrollTop = this.$refs.logsref.scrollHeight;
                    
                    //this.$refs.logsref.scrollTo({ top: this.$refs.logsref.scrollHeight, behavior: 'smooth' })
                }


            },
            scroll() {
 

                if (this.$refs.logsref.scrollTop + this.$refs.logsref.offsetHeight < this.$refs.logsref.scrollHeight) {
                    this.$emit('scroll', true);
                    this.scrolled = true; 
                    console.log('scrolling');
                }
                if (this.$refs.logsref.scrollTop + this.$refs.logsref.offsetHeight === this.$refs.logsref.scrollHeight) {
                    console.log('not scrolling');
                    this.$emit('scroll', false);
                    this.scrolled = false;
                }
            }

        },

        mounted() {
            this.containerScroll = this.$refs.logsref;
            let el = this.$refs.logsref;
            this.containerScroll.addEventListener('scroll', this.scroll);
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .fadeInUp {
        animation: fadeInUp 0.5s;
    }
    .fadeOutDown {
        animation: fadeOutDown 0.5s;
    }
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

    .comments {
        width: 100%;
        border-bottom: 1px solid #1b1b2f;
    }

    p {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 18px;
    }

    .comment-author-container {
        display: flex;
    }

    .comment-author {
        margin-right: 10px;
    }

        .comment-author span {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 10px;
            font-weight: bold;
            color: #e43f5a;
        }

    .comment-account-date {
        background: #1b1b2f;
        border-radius: 4px;
    }

        .comment-account-date span {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 10px;
            font-weight: bold;
            color: #60608d;
            padding: 5px;
        }

    .comments-data {
        width: 100%;
        overflow-wrap: anywhere;
    }

    .comment-author-container {
        padding-top: 20px;
        padding-right: 20px;
        padding-left: 20px;
        padding-bottom: 5px;
    }

    .comment-body-container {
        padding-top: 5px;
        padding-right: 20px;
        padding-left: 20px;
        padding-bottom: 20px
    }

    .comment-body span {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 12px;
        color: #bebed4;
        line-height: 20px;
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
        border-radius: 4px;
        overflow-x: hidden;
    }
    .spinner-wrapper {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        justify-items: center;
        align-content: center;
        flex: 1;
        align-items: center;
        justify-content: center;
    }
    .radar-spinner, .radar-spinner * {
        box-sizing: border-box;
    }

    .radar-spinner {
        height: 60px;
        width: 60px;
        position: relative;
    }

    .radar-spinner .circle {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        animation: radar-spinner-animation 2s infinite;
    }

    .radar-spinner .circle:nth-child(1) {
        padding: calc(60px * 5 * 2 * 0 / 110);
        animation-delay: 300ms;
    }

    .radar-spinner .circle:nth-child(2) {
        padding: calc(60px * 5 * 2 * 1 / 110);
        animation-delay: 300ms;
    }

    .radar-spinner .circle:nth-child(3) {
        padding: calc(60px * 5 * 2 * 2 / 110);
        animation-delay: 300ms;
    }

    .radar-spinner .circle:nth-child(4) {
        padding: calc(60px * 5 * 2 * 3 / 110);
        animation-delay: 0ms;
    }

    .radar-spinner .circle-inner, .radar-spinner .circle-inner-container {
        height: 100%;
        width: 100%;
        border-radius: 50%;
        border: calc(60px * 5 / 110) solid transparent;
    }

        .radar-spinner .circle-inner {
            border-left-color: #e43f5a;
            border-right-color: #e43f5a;
        }

    @keyframes radar-spinner-animation {
        50% {
            transform: rotate(180deg);
        }

        100% {
            transform: rotate(0deg);
        }
    }
</style>

