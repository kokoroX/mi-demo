<template>
  <div class="app">
    <div class="ant-col-4 side-bar">
      <ul class="ant-menu ant-menu-inline aside-container ant-menu-light ant-menu-root" role="menu" aria-activedescendant="" tabindex="0">
        <li class="ant-menu-item" :class="{'ant-menu-item-selected': $route.path === '/'}" role="menuitem" aria-selected="true"><a v-link="{ name: 'home' }">每日用户数据</a></li>
        <li class="ant-menu-item" :class="{'ant-menu-item-selected': $route.path === '/table'}" role="menuitem" aria-selected="true"><a v-link="{ name: 'table' }">每月数据图表</a></li>
      </ul>
    </div>
    <div class="ant-col-20">
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
.side-bar {
  height: 100%
}
.ant-menu {
  height: 100%;
}
</style>
