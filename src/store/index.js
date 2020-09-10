import Vue from 'vue'
import Vuex from 'vuex'
import createVuexAlong from 'vuex-along'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        articleText: '',
        name: '',
        parentId: '',
        deep: 0
    },
    mutations: {
        InitArticle (state, n) {
            state.articleText = n
        },
        ChangeDeep (state, item) {
            state.deep = item.deep
            state.name = item.name
            state.parentId = item.id
        },
        InitDeep (state) {
            state.deep = 0
            state.name = ''
            state.parentId = ''
        }
    },
    actions: {},
    modules: {},
    plugins: [createVuexAlong({
        name: 'articleIndex',
        local: ['articleText']
    })]
})