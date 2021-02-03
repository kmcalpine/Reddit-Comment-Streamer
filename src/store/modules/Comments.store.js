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
    RESET(state) {
        Object.assign(state, getInitCommentState());
    },
    ADD_NEW_COMMENT(state, payload) {
        if (state.comments.comments.length >= 100) {
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
        if (state.comments.commentBuffer.length > 4000) {
            state.comments.commentBuffer.splice(0, 3000);
        }
        state.comments.commentBuffer.unshift(payload);
    },
    ADD_COMMENT_ID(state, payload) {
        if (state.comments.commentID.length > 4000) {
            state.comments.commentID.splice(0, 3000);
        }
        state.comments.commentID.unshift(payload);
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