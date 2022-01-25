import React from 'react';
import dashboardStyles from "../dashboard/dashboard.module.css"
import { uploadTemplate } from '../../../redux/actions/templates';
import { logout, refresh } from '../../../redux/actions/auth';
import { useDispatch } from 'react-redux';

const Templates = () => {
  var date = new Date();
  const dispatch = useDispatch();
  const templateUpload = (e)=>{
    e.preventDefault();
    // setLoading(true)
    let fileName = e.target.files[0].name.split(".")[0].concat(JSON.stringify(date).replace(/"/g, ""));
    console.log(e.target.files[0].name.split(".").pop());
    var blob = e.target.files[0];
    let newFile = new File([blob],fileName+".ftl",{type:"file"});
    console.log(newFile);

    
    
    var fd = new FormData();
    fd.append("file",newFile)
    fd.append("fileName",fileName)
    dispatch(uploadTemplate(fd))
    .then((res)=>{
      console.log("uploaded");
      
    })
    .catch((err)=>{
        if(err.msg==='Refresh'){
            dispatch(refresh())
            .then(()=>{
                dispatch(uploadTemplate(fd))
                .then((res)=>{
                  console.log("uploaded")
                })
            })
            .catch((err)=>{
                if(err.msg==="Refresh Fail"){
                    dispatch(logout())
                }
            })
        }
    console.log(err);
    

})
}
  return (
      <>
            <h1 className={dashboardStyles.dashHeading}>Templates</h1>
            
          <label> 
            <div className={dashboardStyles.btnPrimaryDiv}>
            <div className={dashboardStyles.btnPrimary} style={{textAlign:"center"}}>+ Upload Template</div>
            </div>
                    <input
                        type="file" 
                        className={dashboardStyles.input}
                        name="file"
                        onChange={e=>templateUpload(e)}
                        accept=".html,.ftl"
                    />
            </label>
      </>
  );
};

export default Templates;
