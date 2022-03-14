import React, {useState} from 'react'
import Papa from "papaparse"
import { Form } from 'react-bootstrap';
import styles from "./dashboard.module.css";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { validEmail } from '../../auth/Regex';


const ReadCsv = (props) => {
    const finalArray = (arr,mails)=>{
        let finalArr = []
        arr.forEach((mail)=>{
            let counter = -1;
            if(mail.length===2){
                if(mail[0].trim()!==""&&validEmail.test(mail[1])){
                    console.log(mails.some(obj => obj.email === 'sakshamt234@gmail.com'))
                    for(let i=0;i<finalArr.length;i++){
                        if(mail[1]===finalArr[i].email||mails.some(obj => obj.email === mail[1])){
                            break;
                        } else {
                            counter=i;
                        }
                    }
                    if(counter===finalArr.length-1&&!mails.some(obj => obj.email === mail[1])){
                        finalArr.push({name:mail[0],email:mail[1]})
                    }
                }
            }
            else if(mail.length===1){
                let counter = -1;
                if(validEmail.test(mail[0])){
                    // finalArr.push(mail[0])
                    for(let i=0;i<finalArr.length;i++){
                        if(mail[0]===finalArr[i]||mails.includes(mail[0])){
                            break;
                        } else {
                            counter=i;
                        }
                    }
                    if(counter===finalArr.length-1&&!mails.includes(mail[0])){
                        finalArr.push(mail[0])
                    }
                }
            }
        })

        return finalArr

    }
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
                        props.setMails(prev=>[...prev, ...finalArray(results.data,props.mails)]);
                        setPointer(e.target.files[0].name);
                        
                        // let finalArr = finalArray(results.data);
                        // console.log(finalArr)
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
