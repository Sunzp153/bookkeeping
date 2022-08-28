import { useEffect, useState } from "react"
import { billType } from "../pages/Home/components/Bill/Bill"
import { Chart } from "./Chart"

interface Props {
  option: [
    expenditure: any[],
    income: any[],
    date: any[]
  ]
}

export default function (props:Props) {
  const [date, expenditure, income] = props.option
  console.log(props.option, date, expenditure, income)
  const [option, setOption] = useState({
    title: {
      text: '趋势统计'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['支出', '收入' ]
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: date
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '支出',
        type: 'line',
        stack: 'Total',
        data: expenditure
      },
      {
        name: '收入',
        type: 'line',
        stack: 'Total',
        data: income
      }
    ]
  })

  useEffect(() => {                      //当数据records和category发生变化时，执行以上函数
    setOption({
      ...option,
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: date
      },
      series: [
        {
          name: '支出',
          type: 'line',
          stack: 'Total',
          data: expenditure
        },
        {
          name: '收入',
          type: 'line',
          stack: 'Total',
          data: income
        }
      ]
    })

  }, [date, expenditure, income])
  return (
    <div className="LineBillChart"id="dora" style={{height: '250px', width: '700px'}}>
        <Chart option={option}/>
    </div>
  )
}
