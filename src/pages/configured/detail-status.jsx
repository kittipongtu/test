import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from "axios";
import { hostname } from "../../hostname";
const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

const card = (
    <React.Fragment>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Word of the Day
            </Typography>
            <Typography variant="h5" component="div">
                be{bull}nev{bull}o{bull}lent
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                adjective
            </Typography>
            <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small">Learn More</Button>
        </CardActions>
    </React.Fragment>
);

export default function CardStatus(props) {
    const { typeStatus, onuID } = props;
    const [text, setText] = React.useState('')

    const getStatus = async () => {
        try {
            const { data } = await axios.get(`${hostname}/api/onu/status/${onuID}`);
            if (data.status === "success") {
                setText(data.result);
            }
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        getStatus()
    }, [typeStatus, onuID]);

    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined" sx={{ backgroundColor: '#f9f9f9' }}>
                <CardContent>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        Details:
                    </Typography>
                    <pre>
                        { text }
                    </pre>
                </CardContent>
            </Card>
        </Box>
    );
}