<template>
    <div class="site-wrapper">
        <div class="subReddit-wrapper">
            <subRedditContainer :posts="this.posts" v-on:click="updatePostTitle" :subreddit="this.subreddit" />
        </div>
        <div class="commentContainer-wrapper">
            <CommentContainer :comments='comments' v-on:scroll="pauseLoading" :initLoading="this.initLoading" />
        </div>
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex';
    import CommentContainer from './CommentContainer.vue';
    import subRedditContainer from './subRedditContainer.vue';
    import SearchContainer from './SearchContainer.vue';
    import axios from 'axios';

    export default {
        name: 'Home',
        components: {
            CommentContainer,
            subRedditContainer,
            SearchContainer
        },
        props: {
            subreddit: String
        },
        data() {
            return {
                testData: 'LOADING',
                staggerComment: false,
                tmpComments: [],
                posts: [],
                currentPost: '',
                pauseCommentLoading: false,
                initLoading: false
            }
        },  
        computed: {
            ...mapState('Comments', ['comments']),
        },
        methods: {
            ...mapMutations('Comments', [
                'RESET',
                'ADD_NEW_COMMENT',
                'ADD_COMMENT_ID',
                'ADD_TO_BUFFER',
                'SPLICE_BUFFER',
                'ADD_COMMENT_AUTHOR'
            ]),

            async initSubReddit(sub) {
                console.log('https://www.reddit.com' + sub + '.json');
                try {
                    let response = await axios.get('https://www.reddit.com' + sub + '.json');
                    console.log(response);
                    this.posts = response.data.data.children;
                } catch (error) {
                    console.log("error", error);
                }
            },

            pauseLoading(val) {
                this.pauseCommentLoading = val;
                
            },

            loadComments() {

                if (!this.commentInterval) {
                    this.commentInterval = setInterval(this.getComments, 5000);
                }
            },


            /**
            * Emitted callback when user chooses new post
            */
            updatePostTitle(post) {
                this.currentPost = post;
                this.RESET(); // reset current loaded comments
                this.initLoading = true; 
                this.loadComments(); // load new comments from post
            },

            /**
            * Load comments from selected post.
            */
            async getComments() {
                if (this.pauseCommentLoading) {
                    return;
                }

                try {
                    let response = await axios.get('https://www.reddit.com' + this.currentPost.data.permalink + '.json?sort=new&limit=40');
                    this.testData = response.data[0].data.children[0].data.title;
                    this.tmpComments = response.data[1].data.children;
                } catch (error) {
                    console.log(error);
                }


                this.sortComments();
                this.getAuthorData();

                if (!this.staggerComment) {
                    this.staggerComment = true;
                    this.commentStagger();
                    let staggerInterval = setInterval(this.commentStagger, 250);
                }
            },

            /**
            * Sort comments by date posted (most recent first)
            */
            sortComments() {
                this.tmpComments.sort((a, b) => {
                    parseFloat(a.data.created_utc) - parseFloat(b.data.createD_utc);
                })
            },

            async getAuthorData() {
                for (let i = 0; this.tmpComments.length; i++) {
                    if (this.tmpComments[i].data.author === '[deleted]') {
                        return;
                    }
                    if (this.comments.commentID.indexOf(this.tmpComments[i].data.id) === -1) {
                        try {
                            let response = await axios.get('https://www.reddit.com/user/' + this.tmpComments[i].data.author + '/about.json');
                            this.tmpComments[i].data.accountCreation = response.data.data.created;
                            this.ADD_COMMENT_ID(this.tmpComments[i].data.id);
                            this.ADD_TO_BUFFER(this.tmpComments[i]);
                        } catch (error) {
                            console.log("error", error);
                        }
                        
                    }
                }
                this.tmpComments = [];
            },


            commentStagger() {
                if (this.pauseCommentLoading) {
                    return;
                }
                if (this.comments.commentBuffer.length > 0) {
                    let length = Math.floor(Math.random() * Math.floor(this.comments.commentBuffer.length / 3) + 1) + 1;

                    if (this.initLoading) {
                        this.initLoading = false;
                    }

                    this.SPLICE_BUFFER(length);
                }
            },

            getAuthorAccountDate() {

            },

        },
        mounted() {
            //default to 'r/all' on first load
            this.initSubReddit('/r/all');
        },
        watch: {
            'subreddit'(n, o) {

                

                this.initSubReddit(this.subreddit);
                this.commentInterval = null;
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .subReddit-title {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 12px;
        font-weight: bold;
        position: relative;
        color: #bebed4;
        padding-left: 10px;
        padding-bottom: 10px;
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

    .site-wrapper {
        overflow-y: hidden;
        width: 750px;
        height: 100%;
        display: flex;
        flex-direction: column
    }
    .subReddit-wrapper {
        width: 100%;
        
    }
    .commentContainer-wrapper {
        flex-grow: 1;
        width: 100%;
        height: 75vh;
        margin-top: 10px;
    }
</style>

