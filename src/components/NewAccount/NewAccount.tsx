import { SetStateAction, useEffect, useRef, useState } from "react"
import {Table, DatePicker, Space, Select, Radio, Switch, Button, Modal, Form, Input, InputNumber} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {nanoid} from 'nanoid';
import type { DatePickerProps, RadioChangeEvent  } from 'antd';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import moment from "moment";
import {Immer, produce} from 'immer';
const {Option} = Select;
interface billType{
  idx?: any;
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

export function NewAccount (props: {bill: billType[], setBill: any, revise?: number}) {
  const {bill, setBill, revise=-1} = props
  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const [form] = Form.useForm()
  let submitType = '记一笔'
  console.log(bill[revise])
  let oldAccount = bill[revise]
  // 判断是修改还是新建
  if(oldAccount) {
    submitType = '修改'
    let formBill = {
      amount: Number(oldAccount.amount.substring(1)),
      type: oldAccount.amount.substring(0, 1) == '+' ? false : true,
      date: moment(oldAccount.oldDate),
      remark: oldAccount.remark,
      classification: oldAccount.classification,
    }
    form.setFieldsValue(formBill)
  }

  const showCreate = () => {
    setIsCreateVisible(true);
  };

  const onFormSubmit = (billInfo: any) => {
    const positiveNumber = (billInfo.type ? '-' : '+')
    const account: billType = {
      date: billInfo.date,
      amount:  positiveNumber +  billInfo.amount,
      classification: billInfo.classification,
      remark: billInfo.remark,
      id: nanoid(),
    }
    if(revise > -1) {
      setBill(produce((oldBill:billType[]) => {
        oldBill[bill[revise].idx] = {...account, id: bill[revise].id}
        return oldBill
      }))
    } else {
      setBill([...bill, account])
    }
    form.resetFields()
    setIsCreateVisible(false)
  }
  const handleSubmit = () => {
    //触发表单提交
    form.submit()
  };
  const handleCancel = () => {
    setIsCreateVisible(false);
  };

  return (
    <div className="NewAccount">
      <Button type="primary" onClick={showCreate}>
        {submitType}
      </Button>
      <Modal title="新建" visible={isCreateVisible} okText={submitType} onOk={handleSubmit} onCancel={handleCancel}>
        <Form form={form} name="nest-messages" onFinish={onFormSubmit} >
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
