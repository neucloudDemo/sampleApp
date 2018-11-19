import Vue from 'vue';
import iView from 'iview';
import Util from 'libs/util';
import VueRouter from 'vue-router';
import { routers } from './router';
// 将路由器注入Vue实例
Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) { // 如果有锚点
            try {
                document.querySelector(to.hash)
                return {
                    selector: to.hash
                }
            } catch(err) { }
        }
        return { x: 0, y: 0 }
    },
    routes: routers
};
// 创建路由实例
export const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach((to) => {
    iView.LoadingBar.finish();
});
