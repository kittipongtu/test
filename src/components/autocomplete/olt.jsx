import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { hostname } from "../../hostname";
import { useAlert } from "../global/context-alert-dialog";

export default function OltAutocomplete(props) {
    const { value, setValue } = props;
    const { setOpenAlert } = useAlert();
    const [oltlist, setOltlist] = React.useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getolt = async () => {
        try {
            const { data } = await axios.get(`${hostname}/api/olt`);
            if (data.status === "success") {
                setOltlist(data.results)
            }
        } catch (error) {
            console.log(error);
            // setOpenAlert({
            //     status: true,
            //     type: "error",
            //     message: "ไม่สามารถโหลดข้อมูล OLT ได้",
            // });
        }
    }

    React.useEffect(() => {
        getolt()
    }, []);

    return (
        <>
            <Autocomplete
                multiple
                size='small'
                id="multiple-values"
                options={oltlist}
                // value={value ? value : ''}
                // onChange={handleChange}
                disableCloseOnSelect
                // getOptionLabel={(option) => `${option.name_olt}`}
                renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="Allowed Olts" />
                )}
            />
        </>
    )
}