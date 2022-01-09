import React, { useEffect, useState } from 'react'
import Navbar from '../navbar/Navbar'
import ReadCsv from './readCsv';
import Papa from "papaparse"
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createGroup } from '../../../redux/actions/groups';
import { refresh } from '../../../redux/actions/auth';
// import {  } from 'bootstrap';


const Dashboard = () => {
    const [mails,setMails] = useState([]);
    const [grpName, setGrpName] = useState("");
    const dispatch = useDispatch();
    useEffect(()=>{
        console.log(mails)
    },[mails])
    // function Upload() {
    //     var fileUpload = document.getElementById("fileUpload");
    //     var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
    //     if (regex.test(fileUpload.value.toLowerCase())) {
    //         if (typeof (FileReader) != "undefined") {
    //             var reader = new FileReader();
    //             reader.onload = function (e) {
    //                 var table = document.createElement("table");
    //                 var rows = e.target.result.split("\n");
    //                 for (var i = 0; i < rows.length; i++) {
    //                     var row = table.insertRow(-1);
    //                     var cells = rows[i].split(",");
    //                     for (var j = 0; j < cells.length; j++) {
    //                         var cell = row.insertCell(-1);
    //                         cell.innerHTML = cells[j];
    //                     }
    //                 }
    //                 var dvCSV = document.getElementById("dvCSV");
    //                 dvCSV.innerHTML = "";
    //                 dvCSV.appendChild(table);
    //             }
    //             reader.readAsText(fileUpload.files[0]);
    //         } else {
    //             alert("This browser does not support HTML5.");
    //         }
    //     } else {
    //         alert("Please upload a valid CSV file.");
    //     }
    // }
    const createGrpFormSubmit = (e)=>{
        e.preventDefault();
        console.log(grpName)
        console.log(mails);

        dispatch(createGroup(grpName,mails))
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
            if(err.refresh==='required'){
                dispatch(refresh())
                .then(()=>{
                    console.log("here now guys")
                })
                .catch(()=>{
                    console.log("fatt gii");
                })
            }
        })
    }
    return (
        <>
            <Navbar/>
            <div>Create a new Group:</div>
            <Form onSubmit={(e)=>createGrpFormSubmit(e)}>
                <Form.Group>
                    <Form.Label>Group Name</Form.Label>
                    <Form.Control type="Name" placeholder="Group Name" value={grpName} onChange={(e)=>setGrpName(e.target.value)}/>
                    
                </Form.Group>
                <ReadCsv setMails={setMails}/>  
                <Button type="submit">Submit</Button>
                {/* <Button variant="primary">Primary</Button> */}
            </Form>
            {/* <input id="fileSelect" type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />  */}
            {/* <input type="file" id="fileUpload" />
            <input type="button" id="upload" value="Upload" onClick={Upload} />
            <hr />
            <div id="dvCSV">
            </div> */}
        </>
    )
}

export default Dashboard
