import * as React from 'react';
import { Box,Stack, Modal } from '@mui/material';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { styled } from '@mui/material/styles';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useEffect } from 'react';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
 function NewTodo() {
        const [task,setTask]=useState({
            taskname:""
        })
        const [data,setData]=useState([])
        const [ismodelvisible,setIsmodelvisible]=useState(false)
        const [editdata,setEditdata]=useState({
            taskname:""
        })

    const chnghandler=(event)=>{
        setTask({...task,[event.target.name]:event.target.value})
    }
    const editchnghandler=(event)=>{
        setEditdata({...editdata,[event.target.name]:event.target.value})
    }
    const clickhandler=()=>{
            alert(task)
            axios.post(`http://localhost:4000/todo/`,task).then(response=>{
                    console.log(response.data)
            }).catch(err=>{
                console.log(err)
            })
    }
    const clickhandler1=(item)=>{
       setEditdata({
        taskname:item.taskname,
        _id:item._id
       })
       showmodel()
}
const showmodel=()=>{
    setIsmodelvisible(true)
}
const handleok=()=>{
        axios.put(`http://localhost:4000/todo/edit`,editdata).then(response=>{
            console.log("updated")
            setIsmodelvisible(false)
        }).catch(err=>{
            console.log(err)
        })
}
const handlecancel=()=>{
    setIsmodelvisible(false)
}

const clickhandler2=(id)=>{
  
    axios.delete(`http://localhost:4000/todo/delete/${id}`,).then(response=>{
            console.log("data deleted")
    }).catch(err=>{
        console.log(err)
    })
}
    useEffect(()=>{
        axios.get(`http://localhost:4000/todo/getproducts`).then(response=>{
                setData(response['data'].data)
                console.log(data)
        }).catch(err=>{
            console.log(err)
        })
    },[ismodelvisible])
  return (
    <Stack direction='row' spacing={2} justifyContent='space-between'>
  
    <Box sx={{backgroundColor:'white',marginTop:'20px',height:'660px'}} flex={4}> 
    <>
       <div>
       <TextField  label="Add Task" name="taskname" variant="outlined" onChange={chnghandler}/>
    <Button style={{marginLeft:'20px'}} variant="contained" onClick={clickhandler}>Add </Button><br/>

       </div>
       <div style={{marginTop:'20px'}}>
    <TableContainer component={Paper}>
    
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          
          <TableRow>
            <StyledTableCell align="center">Task NAME</StyledTableCell>
            <StyledTableCell align="center">Edit</StyledTableCell>
            <StyledTableCell align="center">delete</StyledTableCell>
            
            
          </TableRow>
         
        </TableHead>
        <TableBody>
        {data.map((row) => (
            // <StyledTableRow key={row.itemid}>
                    <TableRow>
              
              <StyledTableCell align="center">{row.taskname}</StyledTableCell>
              <StyledTableCell align="center"> <Button onClick={()=>clickhandler1(row)}>Edit</Button></StyledTableCell>
              <StyledTableCell align="center"> <Button onClick={()=>clickhandler2(row._id)}>delete</Button></StyledTableCell>
              
              </TableRow>
                   ))}
        </TableBody>
      </Table>
      
    </TableContainer>
    </div>
    <Modal
        open={ismodelvisible}
        onClose={handlecancel}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
        <TextField  label="Add Task" name="taskname" value={editdata.taskname} variant="outlined" onChange={editchnghandler}/>
        <Button onClick={handlecancel}>Cancel</Button>
        <Button onClick={handleok}>CONFIRM</Button>
        </Box>
       
      </Modal></>
    </Box>
    </Stack>
  );
}
 export default NewTodo;