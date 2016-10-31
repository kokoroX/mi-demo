export default function (router) {
  router.map({
    '/': {
      name: 'home',
      title: '数据图表',
      component: require('./pages/Table')
    },
    '/daily': {
      name: 'daily',
      title: '每日用户数据',
      component: require('./pages/UserDailyData')
    },
    '/weekly': {
      name: 'weekly',
      title: '每周用户数据',
      component: require('./pages/UserWeeklyData')
    },
    '/monthly': {
      name: 'monthly',
      title: '每月用户数据',
      component: require('./pages/UserMonthlyData')
    }
  })
}
