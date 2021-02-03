<template>
    <div class="site-wrapper">
        <div class="subReddit-title">
            {{ this.subreddit }}
        </div>
        <div class="subReddit-wrapper">
            <subRedditContainer :posts="this.posts" v-on:click="updatePostTitle" :subreddit="this.subreddit"/>
        </div>
        <div class="commentContainer-wrapper">
            <CommentContainer :comments='comments' v-on:scroll="pauseLoading" :initLoading="this.initLoading"/>
        </div>


    </div>


</template>

<script>
    import { SpringSpinner } from 'epic-spinners'
    import { mapState, mapMutations } from 'vuex';
    import CommentContainer from './CommentContainer.vue';
    import subRedditContainer from './subRedditContainer.vue';

    export default {
        name: 'Home',
        components: {
            CommentContainer,
            subRedditContainer
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

            initSubReddit() {
                console.log('https://www.reddit.com' + this.subreddit + '.json');
                fetch('https://www.reddit.com'+this.subreddit+'.json')
                    .then(response => response.json())
                    .then(data => {
                        this.posts = data.data.children;               
                    });
            },

            pauseLoading(val) {
                this.pauseCommentLoading = val;
                
            },

            loadComments() {

                if (!this.commentInterval) {
                    this.commentInterval = setInterval(this.getComments, 9856);
                }
            },

            updatePostTitle(post) {
                this.currentPost = post;
                this.RESET(); // reset current loaded comments
                this.initLoading = true; 
                this.loadComments(); // load new comments from post
            },
            getComments() {

                fetch('https://www.reddit.com'+this.currentPost.data.permalink+'.json?sort=new&limit=50')
                .then(response => response.json())
                .then(data => {
                    this.testData = data[0].data.children[0].data.title;
                    this.tmpComments = data[1].data.children; 

                })

                this.sortComments();
                this.getAuthorData();

                

                if (!this.staggerComment) {
                    this.staggerComment = true;
                    this.commentStagger();
                    let staggerInterval = setInterval(this.commentStagger, 500);
                }

            },

            sortComments() {
                this.tmpComments.sort((a, b) => {
                    parseFloat(a.data.created_utc) - parseFloat(b.data.createD_utc);
                })
            },

            getAuthorData() {
                this.tmpComments.forEach(comment => {
                    if (comment.data.author === '[deleted]') {
                        return;
                    }
                    if (this.comments.commentID.indexOf(comment.data.id) === -1) {

                        fetch('https://www.reddit.com/user/' + comment.data.author + '/about.json')
                            .then(r => r.json())
                            .then(d => {
                                comment.data.accountCreation = d.data.created;
                                this.ADD_COMMENT_ID(comment.data.id);
                                this.ADD_TO_BUFFER(comment);
                            })
                    }
                });
                this.tmpComments = [];
            },

            commentStagger() {
                if (this.pauseCommentLoading) {
                    return;
                }
                if (this.comments.commentBuffer.length > 0) {
                    let length = Math.floor(Math.random() * Math.floor(this.comments.commentBuffer.length / 4) + 1) + 1;

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
            this.initSubReddit();
        },
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
        margin-top: 10px;
    }
</style>

