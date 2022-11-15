import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import ptbr from 'date-fns/locale/pt-BR';

import { Container, Paper, Box, TextField, Button, Avatar } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import NavBar from "../../../components/AppBar";
import authService from "../../../services/auth.service";
import { BASE_URL } from "../../../utils/request";

import "./styles.css";

const API_URL = `${BASE_URL}`;


export default function NewEvent() {
    const [avatar, setAvatar] = useState('');
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [status, setStatus] = useState('');
    const [refreshKey, setRefreshKey] = useState(0);

    const min = new Date(new Date().setUTCFullYear(new Date().getFullYear() - 1));
    const max = new Date();
    const [minDate, setMinDate] = useState(min);
    const [maxDate, setMaxDate] = useState(max);

    const handleClick = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const eventModel = { avatar, eventName, eventDate, status };
        console.log(eventModel);

        axios.post(API_URL + "/user",
            JSON.stringify(eventModel),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authService.getToken()
                }
            })
            .then(res => {
                console.log("Novo evento adicionado");
                setAvatar('')
                setEventName('')
                setEventDate('')
                setStatus('')
                setRefreshKey(oldkey => oldkey + 1)
            });
    };


    return (
        <Container className='container' maxWidth={false} disableGutters={true} >
            <NavBar />
            <Paper className='fe-paper' elevation={3} >
                <h1>Adicionar Evento</h1>
                <Box className='box-items'>
                    <Box className="box-avatar">
                        <Avatar
                            className='avatar-list'
                            alt=""
                            sx={{
                                margin: '0px'
                            }}
                        />
                        <Button className="avatarButton" variant="text" size='small' onClick={handleClick}>Alterar</Button>
                    </Box>
                    <Box className='boxText' component="form" sx={{ '& > :not(style)': { my: 1 }, }}
                        noValidate
                        autoComplete="off">

                        <TextField className='textField' id="outlined-basic" label="Nome do evento" variant="outlined" fullWidth
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)} />
                        <DatePicker
                            locale="ptbr"
                            selected={minDate}
                            onChange={(date: Date) => setMinDate(date)}
                            className="dsmeta-form-control"
                            dateFormat="dd/MM/yyyy"
                        />
                        <TextField className='textField' id="outlined-basic" label="Nome do evento" variant="outlined" fullWidth
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)} />
                    </Box>
                </Box>
                <Button className='addButton' variant="contained" onClick={handleClick}>Adicionar</Button>

            </Paper>

        </Container>
    )
}