import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import configRouter from './routes'
import VueAntUI from 'vue-ant-ui'

Vue.use(VueRouter)
Vue.use(VueAntUI)

const router = new VueRouter({
  history: true
})

configRouter(router)

router.start(App, '#app')
window.router = router
