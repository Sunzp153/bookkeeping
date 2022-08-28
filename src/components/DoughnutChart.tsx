import { useEffect, useState } from "react"
import { billType } from "../pages/Home/components/Bill/Bill"
import { Chart } from "./Chart"

interface Props {
  option:[
    expenditureClass?: [],
    incomeClass?: []
  ]
}

export default function (props:Props) {
  const [ amountClass] = props.option
  console.log(amountClass)
  const [option, setOption] = useState({
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: amountClass
      }
    ]
  })

  useEffect(() => {                      //当数据records和category发生变化时，执行以上函数
    setOption({
      ...option,
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: amountClass
        }
      ]
    }

    )

  }, [ amountClass])
  return (
    <div className="DoughnutChart" id="dora" style={{height: '150px', width: '300px'}}>
        <Chart option={option}/>
    </div>
  )
}
