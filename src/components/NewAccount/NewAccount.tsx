import { SetStateAction, useRef, useState } from "react"
import {Table, DatePicker, Space, Select, Radio, Switch, Button, Modal, Form, Input, InputNumber} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {nanoid} from 'nanoid';
import type { DatePickerProps, RadioChangeEvent } from 'antd';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import moment from "moment";

const {Option} = Select;
interface billType{
  date: string,
  amount: string,
  classification: '早餐' | '电子' | '工资' | '理财' | '其他'| '衣物' ,
  remark: string,
  oldDate?: string,
  id: string,
}
let billList:billType[] = [
  {
    date: new Date().toString(),
    amount: '+90',
    classification: '其他',
    remark: 'lll',
    id: nanoid(),
  }, {
    date: new Date(Number(new Date())-1000000000000).toString(),
    amount: '+90',
    classification: '其他',
    remark: 'lll',
    id: nanoid(),
  },
]

export function NewAccount (props: {bill: billType[], setBill: any}) {
  const {bill, setBill} = props
  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const showCreate = () => {
    setIsCreateVisible(true);
  };
  const handleSubmit = () => {
    const billInfo = form.getFieldsValue()
    //@ts-ignore
    window.form = form
    form.submit()
    console.log(billInfo.type, billInfo)
    const positiveNumber = (billInfo.type ? '-' : '+')
    const account: billType = {
      date: billInfo.date,
      amount:  positiveNumber +  billInfo.amount,
      classification: billInfo.classification,
      remark: billInfo.remark,
      id: nanoid(),
    }
    console.log(positiveNumber)
    saveBill([...bill, account])
    setBill([...bill, account])
    form.resetFields()

    setIsCreateVisible(false)

  };
  const handleCancel = () => {
    setIsCreateVisible(false);
  };
  const [form] = Form.useForm()
  const saveBill = (bill: billType[]) => {
    localStorage.bill = JSON.stringify(bill)
  }
  return (
    <div className="NewAccount">
    <Button type="primary" onClick={showCreate}>
      记一笔
    </Button>
    <Modal title="新建" visible={isCreateVisible} okText='记一笔' onOk={handleSubmit} onCancel={handleCancel}>
      <Form form={form} name="nest-messages" >
        <Form.Item name={'amount'} label="金额" rules={[{required: true , type: 'number'}]}>
          <InputNumber/>
        </Form.Item>
        <Form.Item name='date' label="日期" rules={[{ required: true }]}>
          <DatePicker locale={locale}/>
        </Form.Item>
        <Form.Item name={'type'} label="类型" extra={<div> &nbsp; <span>支出</span></div>} valuePropName={"checked"}>
          <Switch defaultChecked={false}/>
        </Form.Item>
        <Form.Item name={'classification'} label="分类" rules={[{ required: true }]}>
          <Radio.Group  >
            <Radio value='早餐'>早餐</Radio>
            <Radio value='电子'>电子</Radio>
            <Radio value='工资'>工资</Radio>
            <Radio value='理财'>理财</Radio>
            <Radio value='其他'>其他</Radio>
            <Radio value='衣物'>衣物</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name={'remark'} label="备注" >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
</div>
  )
}
