import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Box, Container, IconButton, ListItemIcon, Paper } from '@mui/material';
import NavBar from '../../components/AppBar';
import axios from 'axios';
import authHeader from '../../services/auth-header';
import { BASE_URL } from '../../utils/request';
import { EventModel } from '../../models/eventModel';
import { Fragment, useEffect, useState } from 'react';
import "./styles.css";
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import { Link } from 'react-router-dom';
import { display } from '@mui/system';

const API_URL = `${BASE_URL}`;

export default function EventList() {
    const [eventmodel, setEvent] = useState<EventModel[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        //console.log(authHeader())
        axios.get(API_URL + "/event/info",
            { headers: authHeader() })
            .then((res) => {
                setEvent(res.data.content);
                //console.log(res.data)
                //setCurrentPage(res.data.content)
                //console.log(currentPage)
            });
    }, [refreshKey]);

    return (
        <Container className='container' maxWidth={false}  disableGutters={true}  >
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

                                        <ListItem alignItems='flex-start'  >
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
                                                    <Typography
                                                        className='typ-primary'
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        color="text.primary"
                                                        fontSize={18}
                                                        fontWeight={600}
                                                    >
                                                        {event.name}
                                                    </Typography>
                                                }
                                                secondary={
                                                    <Fragment>
                                                        <Typography
                                                            color="text.primary"
                                                        //fontWeight={600}
                                                        >
                                                            Tipo de evento: <br />
                                                        </Typography>
                                                        <Typography
                                                            sx={{ display: 'inline' }}
                                                            component="span"
                                                            variant="body2"
                                                            color="text.primary"
                                                        >
                                                            {
                                                                "Data: " + dateEvent.toLocaleDateString() + " | " +
                                                                "Hora: " + dateEvent.toLocaleTimeString()
                                                            }
                                                            <br />Local:
                                                        </Typography>
                                                    </Fragment>
                                                }
                                            />
                                        </ListItem>
                                    </Link>
                                </Paper>
                            )
                        })
                    }
                </List>
            </Box>
        </Container>
    );
}
