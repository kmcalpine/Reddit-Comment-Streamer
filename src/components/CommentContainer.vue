<template>
    <div class="comments-container">
        <div class="comments-dataText" ref="logsref">
            <div class="spinner-wrapper">
                <transition appear-active-class="animated fadeIn"
                    enter-active-class="animated fadeInUp"
                    leave-active-class="animated fadeOutDown faster"
                    mode="out-in"
                    >
                    <div class="radar-spinner fadeInUp" v-if="this.initLoading">
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
            <Comments :comment="comment.data" v-for="(comment, index) in this.comments.comments" :key="index" />
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
            scrollBottom() {
                let el = this.$refs.logsref;
                if (!this.scrolled) {
                    this.$refs.logsref.scrollTop = this.$refs.logsref.scrollHeight;
                    //this.$refs.logsref.scrollTo({ top: this.$refs.logsref.scrollHeight, behavior: 'smooth' })
                }

            },
            scroll() {

                if (((this.containerScroll.scrollHeight - this.containerScroll.offsetHeight) - this.containerScroll.scrollTop) > 100) {
                    this.$emit('scroll', true);

                }
                else {
                    this.$emit('scroll', false);
                    this.scrolled = false;
                }
                
            }
        },
        updated() {
            this.scrollBottom();
            
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
        border-left-color: #ff1d5e;
        border-right-color: #ff1d5e;
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

