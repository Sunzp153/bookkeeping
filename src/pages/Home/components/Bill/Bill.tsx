import { useEffect, useRef, useState } from "react"
import {Table, Space, Select, Button, Modal, Form} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import 'moment/locale/zh-cn';
import moment from "moment";
import {NewAccount} from "../../../../components/NewAccount/NewAccount";
import './Bill.scss';
import {produce} from 'immer';


const {Option} = Select;
export interface billType{
  date: string,
  amount: string,
  classification: '早餐' | '电子' | '工资' | '理财' | '其他'| '衣物'  ,
  remark: string,
  oldDate?: string,
  id: string,
  idx?: any,
  type?: boolean,
}


export default function Bill() {
  const billInit = localStorage.bill ? JSON.parse(localStorage.bill) : []
  const [bill, setBill] = useState<billType[]>(billInit)
  const [filter,  setFilter] = useState({month: '', classification: ''})
  const classification =  ['早餐', '电子', '工资', '理财', '其他', '衣物']

  const saveBill = (bill: billType[]) => {
    localStorage.bill = JSON.stringify(bill)
  }
  useEffect(()=> {
    saveBill(bill)
  }, [bill])



  const onClassFilter = (value: string) => {
    console.log(`selected ${value}`);
  };
  //筛选列表
  const billFilter = bill.map((it, idx) => { return {...it, idx}}).filter((it, idx) => {
    const {month, classification} = filter
    if(classification != undefined && classification != '' && classification != bill[idx].classification) {
      return false
    }
    if(month != undefined && month != '' && parseInt(moment(bill[idx].date).format('MM')) != Number(month)) {
      console.log(it,bill, 'kkk')
      return false
    }
    return true
  }).map(item => {
    return {...item, key: item.id, date: moment(item.date).format('ll'),  oldDate: item.date}
  })
  const [isCreateVisible, setIsCreateVisible] = useState(false);


  const [isReviseVisible, setIsReviseVisible] = useState(-1);
  const [isDeleteVisible, setIsDeleteVisible] = useState(-1);
  const showDelete = (idx: number) => {
    setIsDeleteVisible(idx);
  };
  const handleDeleteOk = (idx: number) => {
    setBill(produce((oldBill) => {
      oldBill.splice(billFilter[idx].idx, 1)
    }))
    setIsDeleteVisible(-1);
  };
  const handleDeleteCancel = () => {
    setIsDeleteVisible(-1);
  };
  const billCol: ColumnsType<billType> = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => {
        let aDate = moment(a.oldDate)
        let bDate = moment(b.oldDate)
        let year = aDate.year() - bDate.year()
        if(year != 0) {
          return year
        } else {
          let month = aDate.month() - bDate.month()
          if(month != 0)
            return month
          else {
            let date = aDate.date() - bDate.date()
            return date
          }
        }

      },
      width: '20%',
    }, {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      width: '10%',
    }, {
      title: '分类',
      dataIndex: 'classification',
      key: 'classification',
      width: '10%',
    }, {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      width: '40%',
    }, {
      title: '操作',
      dataIndex: 'date',
      key: 'date',
      width: '20%',

      render: (_, record, idx) => (
        <Space key={record.id} size="middle">
          <div className="revise">
            <NewAccount bill={billFilter}  revise={idx} setBill={setBill}></NewAccount>
          </div>
          <div className="delete">
          <Button type="primary" onClick={ () => showDelete(idx)}>
              删除
            </Button>
            <Modal visible={isDeleteVisible == idx} onOk={() => handleDeleteOk(idx)} onCancel={() => handleDeleteCancel}>
              <div>
                确定删除吗
              </div>
            </Modal>
          </div>
        </Space>
      ),
    },
  ]
  const onInquire = (e: any) => {
    console.log(monthSeletor, e, 'eeee', form)
    setFilter(form.getFieldsValue())
  }
  const onEmpty = () => {
    setFilter({month: '', classification: ''})
    form.resetFields()
  }

  const [form] = Form.useForm()
  const monthSeletor = useRef()
  return (
    <div className="Bill">
      <div className="filter">
        <Form form={form} >
          <Form.Item name='month'>
            <Select  ref={monthSeletor as any} placeholder="月份选择器" style={{ width: 120 }} >
              {
                new Array(12).fill(0).map((it, idx) => {
                  return (<Option key={idx} value={idx+1}>{idx+1}月</Option>)
                })
              }
            </Select>
          </Form.Item>
          <Form.Item name='classification'>
            <Select  placeholder="类选择器" style={{ width: 120 }} onChange={onClassFilter}>
              {
                classification.map((it, idx) => {
                  return (<Option key={idx} value={it}>{it}</Option>)
                })
              }
            </Select>
          </Form.Item>
          <Button type="primary" onClick={onInquire}>查询</Button>
          <Button onClick={onEmpty}>重置</Button>
        </Form>
      </div>
      <div className="create">
        <NewAccount bill={bill} setBill={setBill} ></NewAccount>
      </div>
      <div className="items" >
        <Table footer={(e) => <div>共{e.length}项数据</div>} size='small'  columns={billCol} dataSource={billFilter} />
      </div>
    </div>
  )
}
