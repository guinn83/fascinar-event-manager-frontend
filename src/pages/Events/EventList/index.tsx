import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Accordion, AccordionDetails, AccordionSummary, Box, CircularProgress, Container, Divider, Paper, Tab, withStyles } from '@mui/material';
import NavBar from '../../../components/AppBar';
import axios from 'axios';
import authHeader from '../../../services/auth-header';
import { BASE_URL } from '../../../utils/request';
import { EventModel } from '../../../models/eventModel';
import { Fragment, useEffect, useState } from 'react';
import "./styles.css";
import { Link } from 'react-router-dom';
import { ExpandMore, OutletOutlined, Padding } from '@mui/icons-material';
import { height, minHeight, padding } from '@mui/system';
import shadows from '@mui/material/styles/shadows';

const API_URL = `${BASE_URL}`;

export default function EventList() {
    const [eventmodel, setEvent] = useState<EventModel[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [refreshKey, setRefreshKey] = useState(0);
    const [isExpanded, setExpanded] = useState(false);


    useEffect(() => {
        axios.get(API_URL + "/event/info",
            { headers: authHeader() })
            .then((res) => {
                setEvent(res.data.content);
                console.log(res.data)
            });
    }, [refreshKey]);

    return (
        <Container className='container' maxWidth={false} disableGutters={true}  >
            <NavBar />
            <Box className='content'>
                <List className="event-list">
                    {
                        eventmodel.map(event => {

                            let dateEvent = new Date(event.eventDate);
                            let status;

                            return (
                                <Paper className='el-paper' elevation={3} >
                                    <Link to={'/event/' + event.id} style={{ textDecoration: 'none' }}>
                                        <Typography className='typ-status' event-status={event.status}>
                                            {status}
                                        </Typography>

                                        <ListItem className='lst-Item' alignItems='flex-start' disablePadding={true} >
                                            <ListItemAvatar>
                                                <Avatar
                                                    className='avatar-list'
                                                    alt=""
                                                    src="/static/images/avatar/1.jpg"
                                                //variant="rounded"
                                                />
                                            </ListItemAvatar>

                                            <ListItemText
                                                primary={
                                                    <div className='txt-title'>
                                                        {event.name}
                                                    </div>
                                                }
                                                secondary={
                                                    <Fragment>
                                                        <div className='txt-label'>
                                                            Tipo de evento:
                                                        </div>

                                                        <div className='txt-data'>
                                                            {
                                                                "Data: " + dateEvent.toLocaleDateString() + " | " +
                                                                "Hora: " + dateEvent.toLocaleTimeString()
                                                            }
                                                            <br />Local:
                                                        </div>
                                                    </Fragment>
                                                }
                                            />
                                        </ListItem>
                                    </Link>
                                    <Accordion
                                        className='custAccordion'
                                        defaultExpanded={false}
                                        disableGutters
                                        sx={{
                                            '&:before': {
                                                display: 'none',
                                                borderRadius: 1,
                                            }
                                        }}

                                        onChange={(e, expanded) => {
                                            setExpanded(expanded);
                                        }}
                                    >

                                        <AccordionSummary
                                            className='sumary-accordion'
                                            expandIcon={<ExpandMore />}
                                            aria-controls="panel1c-content"
                                            id="panel1c-header"

                                            sx={{
                                                maxHeight: '5px',
                                                minHeight: 35,
                                                borderRadius: 1,
                                                '&.Mui-expanded': {
                                                    minHeight: 25,
                                                    maxHeight: 25,
                                                    background: '#f6f1f8'
                                                }
                                            }}
                                        >
                                            <Box className='summary-box'
                                                sx={{
                                                    borderRadius: 4,
                                                    padding: '2px 8px 2px 5px',
                                                    shadows: 15
                                                }}
                                            >
                                                <div className='summary-icon'>
                                                    <CircularProgress
                                                        variant='determinate'
                                                        value={event.billInfo.payedPercent}
                                                        size={20}
                                                        thickness={16}
                                                        sx={{
                                                            
                                                            color: '#009261',
                                                            background: '#d0e7e0',
                                                            borderRadius: 5,
                                                        }}
                                                    />
                                                </div>
                                                <div className='txt-summary'>
                                                    Contas
                                                </div>
                                            </Box>
                                        </AccordionSummary>
                                        <Divider />
                                        <AccordionDetails>
                                            <div>
                                                {event.billInfo.nextBill !== null ? 
                                                <Box>
                                                    "teste"
                                                </Box>
                                                : ""}
                                            </div>
                                        </AccordionDetails>
                                    </Accordion>
                                </Paper>

                            )
                        })
                    }
                </List>
            </Box>
        </Container>
    );
}
