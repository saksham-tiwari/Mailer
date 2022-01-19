import React, {useState} from 'react'
import Papa from "papaparse"
import { Form } from 'react-bootstrap';
import styles from "./dashboard.module.css";
import FileUploadIcon from '@mui/icons-material/FileUpload';

const ReadCsv = (props) => {
    var [pointer, setPointer] = useState("Enter emails via CSV or Excel File");
    return (
        <div>
        <Form.Group controlId="formFile" className="mb-3">
            <div className={!props.active?styles.noHover:styles.active}>
            <Form.Label className={styles.customFileUpload} style={props.active?{opacity:"1"}:{opacity:"0.5"}}> <FileUploadIcon/>{pointer}
            <Form.Control 
                type="file" 
                accept=".csv,.xlsx,.xls"
                className={styles.input}
                onChange={(e) => {
                const files = e.target.files;
                console.log(e.target.files[0].name);
                if (files) {
                    console.log(files[0]);
                    Papa.parse(files[0], {
                    complete: function(results) {
                        console.log("Finished:", results.data);
                        props.setMails(results.data[0]);
                        setPointer(e.target.files[0].name);
                    }}
                    )
                }
                }}
                disabled={!props.active}
            />
            </Form.Label>
            </div>

        </Form.Group>
        </div>
    )
}

export default ReadCsv
