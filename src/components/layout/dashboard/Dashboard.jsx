import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getGroups } from '../../../redux/actions/groups';
import { logout, refresh } from '../../../redux/actions/auth';
import GroupsSection from './GroupsSection/GroupsSection';
// import {  } from 'bootstrap';


const Dashboard = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getGroups())
        .then((res)=>console.log(res))
        .catch((err)=>{
            if(err.refresh==='required'){
                dispatch(refresh())
                .then(()=>{
                    dispatch(getGroups)
                })
                .catch((err)=>{
                    if(err.msg==="Refresh Fail"){
                        dispatch(logout())
                    }
                })
            }
        })
    },[])

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
    
    return (
        <>
            {/* <Navbar/> */}
            <GroupsSection/>
            

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
