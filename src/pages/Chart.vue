<template lang="html">
  <div class="chart-page">
    <ant-form horizontal>
      <ant-form-item label="月份选择" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
        <multi-select label="label" :options="monthList" :selected.sync="selectedMonth"></multi-select>
      </ant-form-item>
    </ant-form>
    <chart :options="lines" style="width: 100%;"></chart>
  </div>
</template>

<script>
import ECharts from 'vue-echarts/src/components/ECharts.vue'
import MultiSelect from 'components/Select'
import Mock from 'mockjs'
import { range } from 'lodash'

const monthList = [
  {
    label: '2016年 10月',
    year: 2016,
    month: 10
  },
  {
    label: '2016年 9月',
    year: 2016,
    month: 9
  },
  {
    label: '2016年 8月',
    year: 2016,
    month: 8
  },
  {
    label: '2016年 7月',
    year: 2016,
    month: 7
  },
  {
    label: '2016年 6月',
    year: 2016,
    month: 6
  },
  {
    label: '2016年 5月',
    year: 2016,
    month: 5
  },
  {
    label: '2016年 4月',
    year: 2016,
    month: 4
  },
  {
    label: '2016年 3月',
    year: 2016,
    month: 3
  },
  {
    label: '2016年 2月',
    year: 2016,
    month: 2
  },
  {
    label: '2016年 1月',
    year: 2016,
    month: 1
  }
]

function getDaysInOneMonth (year, month) {
  const now = new Date()
  if (now.getFullYear() === year && (now.getMonth() + 1) === month) return now.getDate()
  month = parseInt(month, 10)
  var d = new Date(year, month, 0)
  return d.getDate()
}

export default {
  components: {
    chart: ECharts,
    MultiSelect
  },
  data () {
    return {
      selectedMonth: monthList[0],
      monthList,
      lines: {
        title: {
          text: 'Graph'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Best', 'Average', 'worst']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          data: []
        }],
        yAxis: [{
          type: 'value'
        }],
        series: []
      }
    }
  },
  watch: {
    selectedMonth (value) {
      const dayCount = getDaysInOneMonth(value.year, value.month)
      const list = Mock.mock({
        [`data|${dayCount}`]: [{
          [`list|${dayCount}`]: ['@integer(200, 5000)']
        }]
      })

      this.lines.xAxis = [{
        type: 'category',
        boundaryGap: false,
        data: range(1, dayCount + 1, 1).map(item => `${value.month}月${item}日`)
      }]
      this.lines.series = [{
        name: 'Best',
        type: 'line',
        data: list.data.map(item => Math.max.apply(null, item.list))
      }, {
        name: 'Average',
        type: 'line',
        data: list.data.map(item => parseInt(item.list.reduce((x, y) => x + y) / item.list.length))
      }, {
        name: 'worst',
        type: 'line',
        data: list.data.map(item => Math.min.apply(null, item.list))
      }]
    }
  }
}
</script>

<style>
.chart-page {
  margin: 0 auto;
  width: 800px;
}
</style>
