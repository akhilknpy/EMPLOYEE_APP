import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, Grid, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Navbar from './Navbar';
import axiosInstance from '../axiosinterceptor';//default instance
const Home = () => {
    const user = localStorage.getItem("userName");
    const [inputs, setInputs] = useState([])
    const navigate = useNavigate()
    function updateEmployee(employee) {
        navigate('/add', { state: { employee } })
    }
    let deleteEmployee = (p) => {
        //update with newly created instance

        axiosInstance.delete('http://localhost:3000/employee/deleteEmployee/' + p).then((res) => {
            window.location.reload()
        }
            //navigate /path
        ).catch((error) => {
            console.log(error)
        })
    }
    useEffect(() => {
        axiosInstance.get('http://localhost:3000/employee/')
            .then((res) => {
                setInputs(res.data); // Set fetched product data
            })
            .catch((error) => {
                console.error("Error fetching data: ", error); // Handle error
            });
    }, []);

    return (
        <>
            <Navbar />
            <div>
                {/* Welcome {user} */}
            </div>

            <Container>
                <Grid container spacing={8}>
                    {inputs.map((input) => (
                        <Grid item key={input._id} xs={12} sm={6} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {input.empId}
                                    </Typography>
                                    <Typography variant="h6" component="div">
                                        {input.empName}
                                    </Typography>
                                    <Typography variant="h6" component="div">
                                        {input.designation}
                                    </Typography>
                                    <Typography variant="h6" component="div">
                                        {input.salary}
                                    </Typography>
                                    <Typography variant="h6" component="div">
                                        {input.department}
                                    </Typography>
                                    <Typography variant="h6" component="div">
                                        {input.location}
                                    </Typography>

                                    <Stack direction="row" spacing={4}>
                                        <Button variant="contained" color="success" onClick={() => { updateEmployee(input) }} >Edit</Button>

                                        <Button variant="contained" color="error" onClick={() => { deleteEmployee(input._id) }} >Delete</Button>

                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    )
}

export default Home