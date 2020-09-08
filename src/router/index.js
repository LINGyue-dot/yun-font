import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/messageboard',
        name: 'MessageBoard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import( /* webpackChunkName: "MessageBoard" */ '../views/MessageBoard.vue')
    },
    {
        path: '/time',
        name: 'Time',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import( /* webpackChunkName: "about" */ '../views/Time.vue')
    },
    {
        path: '/friendlink',
        name: 'FriendLink',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import( /* webpackChunkName: "about" */ '../views/FriendLink.vue')
    },
    {
        path: '/article/:index',
        name: 'Article',
        component: () =>
            import( /* webpackChunkName: "article" */ '../views/Article.vue')
    },
    {
        path: '/categories/:index',
        name: 'Categories',
        component: () =>
            import( /* webpackChunkName: "categories" */ '../views/Categories.vue')
    },
    {
        path: '/search/:index',
        name: 'Search',
        component: () =>
            import( /* webpackChunkName: "search" */ '../views/Search.vue')
    },
    {
        name: 'NotFound',
        path: '/NotFound',
        component: () =>
            import( /* webpackChunkName: "404" */ '../views/404.vue')
    },
    {
        path: '*', //
        redirect: {
            name: 'NotFound'
        }
    }
]

const router = new VueRouter({
    routes
})

export default router