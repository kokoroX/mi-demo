<template lang="html">
  <div class="table-page">
    <ant-form horizontal>
      <ant-form-item label="Date" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
        <datepicker format="YYYY-M-D" :value.sync="date"></datepicker>
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
import datepicker from 'vue-date-picker'
import Mock from 'mockjs'

const columns = [{
  title: '用户标识',
  dataIndex: 'id'
}, {
  title: '今日步数',
  dataIndex: 'step'
}]

export default {
  components: {
    datepicker
  },
  data () {
    var self = this
    return {
      date: self.format(new Date() + 0, 'yyyy-M-d'),
      data: [],
      columns
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
    date () {
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
          'step|500-10000': 1
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
  width: 800px;
}
</style>
