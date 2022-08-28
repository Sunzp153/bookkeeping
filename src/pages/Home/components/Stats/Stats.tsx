import { useEffect, useState } from "react"
import { Chart } from "../../../../components/Chart"
import LineBillChart from "../../../../components/LineBillChart"
import { billType } from "../Bill/Bill"
import {DatePicker, Switch} from 'antd'
import moment from "moment"
import type {Moment} from "moment"
import DoughnutChart from "../../../../components/DoughnutChart"
import './Stats.scss'
// export interface billType{
//   date: string,
//   amount: string,
//   classification: '早餐' | '电子' | '工资' | '理财' | '其他'| '衣物'  ,
//   remark: string,
//   oldDate?: string,
//   id: string,
//   idx?: any,
// }
export default function (props:{}) {
  const bill = localStorage.bill ? JSON.parse(localStorage.bill) : []
  const [type, setType] = useState<'month' | 'year'>('month')

  const [date, setDate] = useState <Moment>()
  const [option, setOption] = useState({
    xAxis: {
      type: 'category',
      data: ['A', 'B', 'C']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150],
        type: 'line'
      }
    ]
  })
  const onDateChange = (value: any) => {
    setDate(value)
  }
  const billFilter = bill.filter((it:billType) => {
    if(date?.isSame(it.date, type)) {
      return true
    }
    return false
  })?.map((it: billType) => {
    return {
      ...it,
      type: it.amount.substring(0, 1) == '+' ? false : true,
      amount: it.amount.substring(1)
    }
  })
  const [expenditureClass, incomeClass] =  billFilter.reduce((res:any, it:billType) => {
    const amount = it.amount
    if(it.type) {
      //支出
      if(res[1][it.classification]) {
        res[1][it.classification].value += amount
      } else {
        res[1][it.classification] = {}
        res[1][it.classification].value = amount
        res[1][it.classification].name = it.classification
      }
    } else {
      if(res[0][it.classification]) {
        res[0][it.classification].value += amount
      } else {
        res[0][it.classification] = {}
        res[0][it.classification].value = amount
        res[0][it.classification].name = it.classification
      }
    }
    return res
  }, [{}, {}]).map((it: any) => Object.values(it))

  const data = billFilter?.reduce((res:any, it:billType) => {
    const amount = Number(it.amount)
    if(type == 'month') {
      it.date = it.date.split('T')[0]
    } else {
      it.date = it.date.split('-')[0] + '-' + it.date.split('-')[1]
    }
    if(res[it.date]) {
      if(it.type) {
        //支出
        res[it.date].expenditure = res[it.date].expenditure + amount
      } else {
        res[it.date].income = res[it.date].income + amount
      }
    } else {
      res[it.date] = {}
      if(it.type) {
        //支出
        res[it.date].expenditure =  amount
        res[it.date].income = 0
      } else {
        res[it.date].income = amount
        res[it.date].expenditure =  0
      }
    }
    return res
    //时间, {支出, 收入}
  }, {})


  const dates = Object.keys(data).sort((a: any, b: any) => {
    if(type == 'month') {
      a = a?.split('-')[2]
      b = b?.split('-')[2]
    }
    a = Number(a)
    b = Number(b)
    return a - b
  })
  const expenditures = dates.reduce((res: any[], date: string) => {
    res.push(data[date].expenditure)
    return res
  }, [])
  const incomes = dates.reduce((res: any[], date: string) => {
    res.push(data[date].income)
    return res
  }, [])
  console.log(data, dates, expenditures, incomes)
  useEffect(() => {                      //当数据records和category发生变化时，执行以上函数

  } )
  const onTypeChange = (val: any) => {
    const type = val ? 'month' : 'year'
    setType(type)
  }
  return (
    <div className="Stats">
      <div className="date">
        <DatePicker onChange={onDateChange} picker={type} />
        <Switch checkedChildren="月" unCheckedChildren="年" onChange={onTypeChange} defaultChecked />
      </div>
      <div className="charts">
        <LineBillChart option={[dates, expenditures, incomes]} ></LineBillChart>
        <div className="doughnut">
          <DoughnutChart option={[expenditureClass]} />
          <DoughnutChart option={[incomeClass]}></DoughnutChart>
        </div>
      </div>
    </div>
  )
}
