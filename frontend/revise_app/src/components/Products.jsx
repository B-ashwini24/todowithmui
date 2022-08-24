import React from 'react'
import { Button, Checkbox, Form } from 'antd'
import axios from 'axios'
import { useEffect,useState } from 'react';
import { Col, Row } from 'antd';
import { Space, Table, Tag,Input } from 'antd';
import {  Modal } from 'antd';

const Products = () => {
  const [data,setData]=useState([])
    const [ismodelvisible,setIsmodelvisible]=useState(false)
    const [ismodelvisible1,setIsmodelvisible1]=useState(false)
    const [editdata,setEditdata]=useState({
      taskname:""
     

})
const showModal = () => {
  setIsmodelvisible(true);
};
  const onFinish = (values) => {
axios.post(`http://localhost:4000/todo/`,values).then(response=>{
  console.log(response.data)
}).catch(err=>{
  console.log(err)
})
axios.get(`http://localhost:4000/todo/getproducts`).then(response=>{
          console.log(response.data)
          setData(response["data"].data)
      }
      ).catch(err=>{
          console.log(err)
      })

    console.log('Success:', values);
  };

  
    
const columns = [
  {
    title: 'taskname',
    dataIndex: 'taskname',
    key: 'taskname',
    render: (text) => <a>{text}</a>,
  }
  ,
  {
    title: 'Action',
    key: '_id',
    render: (row, record) => (
      <Space size="middle">
        
       <Button type='primary' onClick={()=>EditData(row)}>Edit Task</Button>
      </Space>
    ),
  },
  {
    title: 'Action',
    key: '_id',
    render: (row, record) => (
      <Space size="middle">
       
       <Button type="primary" onClick={()=>deletedata(row._id)}>delete task</Button>
      </Space>
    ),
  },
];
const handleEditChange=(event)=>{
  setEditdata({...editdata,[event.target.name]:event.target.value})
}
const EditData=(data)=>{
setEditdata({
  taskname:data.taskname,
 
  _id:data._id
})
showModal();
}
const deletedata=(id)=>{
  axios.delete(`http://localhost:4000/todo/delete/${id}`).then(response=>{
    console.log("data deleted")
    setIsmodelvisible(!ismodelvisible)
  }).catch(err=>{
    console.log(err)
  })
  
}
const handleok=()=>{
  axios.put(`http://localhost:4000/todo/edit`,editdata).then(response=>{
    console.log("updated")
    setIsmodelvisible1(!ismodelvisible1)
  }).catch(err=>{
    console.log(err)
  })
}
const handleCancel = () => {
  setIsmodelvisible(false);
};

   useEffect(()=>{
        axios.get(`http://localhost:4000/todo/getproducts`).then(response=>{
            console.log(response.data)
            setData(response["data"].data)
        }
        ).catch(err=>{
            console.log(err)
        })
    },[ismodelvisible,ismodelvisible1])
    

   
  return (
    <>
    <h1>Enter Task</h1>
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
    
      autoComplete="off"
    >
      <Form.Item
        label="TaskName"
        name="taskname"
        
        rules={[{ required: true, message: 'Please input Task!' }]}
      >
        <Input />
      </Form.Item>
     
     
     
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" >
          Add Task
        </Button>
      </Form.Item>
    </Form>
    <div style={{marginLeft:'100px',marginTop:'100px'}}>  
       <h1>Task Details</h1>
      <Row >
      <Col span={6} offset={6}>
    <Table columns={columns} dataSource={data} />
    </Col>
    
    </Row>
    <Modal title="Basic Modal" visible={ismodelvisible} onOk={handleok} onCancel={handleCancel}>
    <p><Input placeholder="Task" name='taskname' value={editdata.taskname}  onChange={handleEditChange} /></p>
  
  <p><Button type="primary" onClick={handleok}>edit data</Button></p>
  </Modal>
  </div> 
    </>
  )
}

export default Products
