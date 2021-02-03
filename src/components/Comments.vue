<template>
    <div class="comment-wrapper">
        <div class="comments" v-for="comment in this.comments.comments">
            <div class="comments-data">
                <slot :comment="comment"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Comments',
        props: {
            comments: Object
        },
        data() {
            return {
            }
        },
        methods: {
            updateScroll() {
                this.$emit('updateScroll', true);
            }
        },
        updated() {
            this.updateScroll();

        },
        mounted() {
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .fadeInUp {
        animation: fadeInUp 0.5s;

    }

    h1 {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 10px
    }

    h2 {
        font-family: Arial, Helvetica, sans-serif
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
</style>

