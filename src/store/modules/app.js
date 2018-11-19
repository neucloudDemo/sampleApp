import {otherRouter, appRouter} from '@/router/router';
import fetch from '@/api/fetch'

const app = {
    state: {
        menuList: [],
        routers: [
            otherRouter,
            ...appRouter
        ]
    },
    getters: {
        menuList: state => state.menuList
    },
    mutations: {
        updateMenulist (state) {
            state.menuList = appRouter;
        }
    }
};

export default app;
