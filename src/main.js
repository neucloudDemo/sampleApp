import Vue from 'vue'
import iView from 'iview'
import {router} from './router/index'
import store from './store'
import App from './app.vue'
import fetch from './api/fetch'
import 'libs/filters'
import { appInit } from './api/uaa'
// 将Bus注入到Vue根对象中
const Bus = new Vue()

Vue.use(iView);

new Promise(appInit).then(() => {
    new Vue({
        el: '#app',
        data: {
            Bus
        },
        router: router,
        store: store,
        render: h => h(App),
        mounted() {
            this.$store.commit('updateMenulist')
            if (localStorage.userName) {
                this.$store.commit('setUserName', localStorage.userName)
            }
        }
    })
})
