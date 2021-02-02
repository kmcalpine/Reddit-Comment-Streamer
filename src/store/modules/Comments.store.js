import { getField, updateField } from 'vuex-map-fields';

const getInitCommentState = () => {
    return {
        comments: {
            commentBuffer: [],
            comments: [],
            commentID: [],
            authors: []
        }
    }
}

const state = getInitCommentState();

const mutations = {
    updateField,
    ADD_NEW_COMMENT(state, payload) {
        if (state.comments.comments.length >= 25) {
            state.comments.comments.splice(0, 1);
            state.comments.comments.push(payload);
        }
        else {
            state.comments.comments.push(payload);
        }
    },
    ADD_TO_BUFFER(state, payload) {
        if (payload.kind !== 't1') {
            return;
        }
        state.comments.commentBuffer.unshift(payload);
    },
    ADD_COMMENT_ID(state, payload) {
        state.comments.commentID.push(payload);
    },
    SPLICE_BUFFER(state, payload) {
        let tempBuffer = state.comments.commentBuffer.splice(0, payload);
        let _this = this;

        tempBuffer.forEach(comment => {
            _this.commit('Comments/ADD_NEW_COMMENT', comment);
        });
    },
    ADD_COMMENT_AUTHOR(state, payload) {
        state.comments.authors.payload = null;
    }
}

export default {
    // Make sure all modules in the store are namespaced (so we can access them via eg. User/login)
    namespaced: true,
    state,
    mutations
}