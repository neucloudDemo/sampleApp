<style lang="less">
    @import "./main.less";
</style>
<template>
    <div class="main" :class="{'main-hide-text': shrink}">
        <div class="main-header-con">
            <div class="main-header">
                <div class="logo">
                    <img src="../images/logo.svg" alt="">
                    <span>NEUSEER 应用示例</span>
                </div>
                <div class="header-avator-con">
                    <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                                <a href="javascript:void(0)">
                                    <span class="main-user-name">{{ userName }}</span>
                                    <Icon type="md-arrow-dropdown"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="loginout">退出登录</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <Avatar icon="person" style="background: #619fe7;margin-left:5px;transform: scale(0.75);"></Avatar>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
        <span class="navicon-con" @click="toggleClick" :style="{'width':shrink?'60px':'200px','padding-left': shrink?'25px':'100px','transform': 'rotateZ(' + (this.shrink ? '0' : '-180') + 'deg)'}">
            <Icon type="md-arrow-dropright" style="font-size: 16px;color:#49505F;"></Icon>
        </span>
        <div class="sidebar-menu-con" :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}">
            <shrinkable-menu 
                :shrink="shrink"
                :menu-list="menuList">
            </shrinkable-menu>
        </div>
        <div class="single-page-con" :style="{left: shrink?'60px':'200px'}">
            <div class="single-page">
                <transition name="page" mode="out-in">
                    <keep-alive key="keep" v-if="$route.meta.keepAlive">
                        <router-view></router-view>
                    </keep-alive>
                    <router-view key="nokeep" v-if="!$route.meta.keepAlive"></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import { loginUaaConfig } from '@/api/url';
import shrinkableMenu from './main-components/shrinkable-menu/shrinkable-menu.vue';

export default {
    components: {
        shrinkableMenu
    },
    data () {
        return {
            shrink: false
        };
    },
    computed: {
        ...mapGetters(['userName', 'menuList']),
    },
    mounted() {
        if (!localStorage.getItem("userName")) {
            this.getName();
        }
    },
    methods: {
        async getName() {
            const { username } = await this.fetch.get(`${loginUaaConfig.host}/api/user`)
            this.setUserName(username)
            localStorage.setItem('userName', username)
        },
        toggleClick () {
            this.shrink = !this.shrink
        },
        handleClickUserDropdown (name) {
            this.logout()
            window.location.href = loginUaaConfig.host + loginUaaConfig.parame + '&state=' + encodeURIComponent(window.location.href)
        },
        ...mapMutations(['setUserName', 'logout'])
    }
};
</script>
