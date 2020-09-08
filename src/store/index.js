import Vue from 'vue'
import Vuex from 'vuex'
import createVuexAlong from 'vuex-along'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        articleText: '',
    },
    mutations: {
        InitArticle (state, n) {
            state.articleText = n
        }
    },
    actions: {},
    modules: {},
    plugins: [createVuexAlong({
        name: 'articleIndex',
        local:['articleText']
    })]
})