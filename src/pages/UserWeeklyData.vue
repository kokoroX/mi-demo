<template lang="html">
  <div class="table-page">
    <ant-form horizontal>
      <ant-form-item label="week" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
        <multi-select label="label" :options="list" :selected.sync="selectedWeek"></multi-select>
      </ant-form-item>
      <ant-form-item label="Average" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
        <p>{{average}}</p>
      </ant-form-item>
      <ant-form-item label="Best" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
        <p>{{best}}</p>
      </ant-form-item>
      <ant-form-item label="Worst" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
        <p>{{worst}}</p>
      </ant-form-item>
    </ant-form>
    <ant-table class="table" :columns="columns" :data-source="data" :pagination="false"></ant-table>
  </div>
</template>

<script>
import MultiSelect from 'components/Select'
import Mock from 'mockjs'
import { range } from 'lodash'

var list = range(0, Math.ceil((new Date() - new Date('2016')) / 1000 / 60 / 60 / 24 / 7))
            .map(item => {
              var index = item + 1
              return {
                label: `2016年 第${index}周`,
                year: 2016,
                month: index
              }
            })

const columns = [{
  title: '用户标识',
  dataIndex: 'id'
}, {
  title: '本周步数',
  dataIndex: 'step'
}]

export default {
  components: {
    MultiSelect
  },
  data () {
    return {
      selectedWeek: list[list.length - 1],
      data: [],
      columns,
      list
    }
  },
  computed: {
    steps () {
      return this.data.map(item => item.step)
    },
    best () {
      return Math.max.apply(null, this.steps)
    },
    average () {
      if (!this.steps.length) return false
      return parseInt(this.steps.reduce((x, y) => x + y) / this.steps.length)
    },
    worst () {
      return Math.min.apply(null, this.steps)
    }
  },
  watch: {
    selectedWeek () {
      this.randomData()
    }
  },
  ready () {
    this.randomData()
  },
  methods: {
    randomData () {
      this.data = Mock.mock({
        'list|20-100': [{
          'id': /\d{32}/,
          'step|3500-70000': 1
        }]
      }).list
    },
    format (timestamp, fmt) {
      var usedDate = new Date(timestamp)
      var o = {
        'M+': usedDate.getMonth() + 1, // 月份
        'd+': usedDate.getDate(), // 日
        'h+': usedDate.getHours(), // 小时
        'm+': usedDate.getMinutes(), // 分
        's+': usedDate.getSeconds(), // 秒
        'q+': Math.floor((usedDate.getMonth() + 3) / 3), // 季度
        'S': usedDate.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (usedDate.getFullYear() + '').substr(4 - RegExp.$1.length))
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
      return fmt
    }
  }
}
</script>

<style>
.table-page {
  margin: 0 auto;
  padding-top: 30px;
  width: 800px;
}
</style>
