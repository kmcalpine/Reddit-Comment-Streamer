<template>
    <div class="srt-wrapper">
        <div class="subRedditWrapper">

            <div class="custom-select" @blur="open = false">
                <div class="selected" :class="{ open: open }" @click="open = !open">
                    {{ selected }}
                </div>
                <div class="items" :class="{ selectHide: !open }">
                    <div v-for="(post, index) in this.posts" :key="index"
                         v-on:click="
                        selected = post.data.title;
                        selectedPost = post;
                        open = false;
                        slctd();
                    ">
                        {{ post.data.title }}
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>


    export default {
        name: 'subRedditContainer',
        components: {

        },
        props: {
            posts: Array,
            currentPost: String
        },
        data() {
            return {
                threads: [],
                threadTitle: '',
                open: false,
                selected: 'Select a post',
                selectedPost: Object
            }
        },
        methods: {
            slctd() {
                this.$emit('click', this.selectedPost);
            }
        },
        mounted() {
        }

    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .srt-wrapper {
        width: 100%;
    }

    .subRedditWrapper {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 12px;
        font-weight: bold;
        flex-direction: column;
        display: flex;
        flex: 1;
        position: relative;
        z-index: 1;
        
    }



    .custom-select {
        width: 100%;
        text-align: left;
        line-height: 20px;
    }

    .custom-select .selected {
        position: relative;
        display: flex;
        background-color: #11111d;
        color: #bebed4;
        padding-left: 1em;
        cursor: pointer;
        user-select: none;
        padding: 20px;
        overflow: hidden;
        border-radius: 4px;
        min-height: 20px;
    }

    .custom-select .selected.open {
 
        border-radius: 4px 4px 0px 0px;
    }

    .custom-select .selected:after {
        position: absolute;
        content: "";
        top: 28px;
        right: 1em;
        width: 0;
        height: 0;
        border: 5px solid transparent;
        border-color: #373757 transparent transparent transparent;
        overflow: hidden;
    }

    .items {
        position: absolute;
        color: #bebed4;
        overflow-y: scroll;
        background-color: #0b0b12;
        height: 500px;
    }

    .custom-select .items div {
        color: #bebed4;
        padding: 20px;
        cursor: pointer;
        user-select: none;
        line-height: 20px;
    }

        .custom-select .items div:hover {
            background-color: #11111d;
        }

    .selectHide {
        display: none;
    }

</style>

