<template>
  <div class="app">
    <div class="header-bar ant-col-24">
      <img class="header-bar-logo" src="https://oce68h8yi.qnssl.com/src/images/qlear-logo-white.png">
    </div>
    <div class="ant-col-3 side-bar">
      <ul class="ant-menu ant-menu-inline aside-container ant-menu-light ant-menu-root" role="menu" aria-activedescendant="" tabindex="0">
        <li class="ant-menu-item" :class="{'ant-menu-item-selected': $route.path === '/'}" role="menuitem" aria-selected="true"><a v-link="{ name: 'home' }">每月数据图表</a></li>
        <li class="ant-menu-item" :class="{'ant-menu-item-selected': $route.path === '/daily'}" role="menuitem" aria-selected="true"><a v-link="{ name: 'daily' }">每日用户数据</a></li>
        <li class="ant-menu-item" :class="{'ant-menu-item-selected': $route.path === '/weekly'}" role="menuitem" aria-selected="true"><a v-link="{ name: 'weekly' }">每周用户数据</a></li>
        <li class="ant-menu-item" :class="{'ant-menu-item-selected': $route.path === '/monthly'}" role="menuitem" aria-selected="true"><a v-link="{ name: 'monthly' }">每月用户数据</a></li>
      </ul>
    </div>
    <div class="ant-col-21">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
body {
  height: 100%;
}
.app {
  height: 100%;
}
.app .side-bar {
  height: 100%;
}
.app .ant-menu {
  height: 100%;
  background-color: #232323;
}
.app .ant-menu .ant-menu-item:hover {
  background: inherit;
}
.app .ant-menu .ant-menu-item:hover>a {
  border-left: 2px solid #fff;
  color: #fff;
}
.app .ant-menu .ant-menu-item.ant-menu-item-selected {
  border-right: 0px solid #fff;
}
.app .ant-menu .ant-menu-item.ant-menu-item-selected>a {
  border-left: 2px solid #fff;
  color: #fff;
}
.app .ant-menu .ant-menu-item>a {
  display: inline;
  padding-left: 10px;
  color: #a6a6a6;
}
.app .ant-menu-inline>.ant-menu-item {
  padding: 0 20px;
}
.app .header-bar {
  display: flex;
  height: 40px;
  width: 100%;
  background-color: #006c92;
}
.app .header-bar-logo {
  height: 18px;
  margin: auto 18px;
}
.app .ant-col-21 {
  height: 100%;
  overflow: auto;
}
</style>
