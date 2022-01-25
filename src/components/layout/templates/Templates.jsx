import React from 'react';
import dashboardStyles from "../dashboard/dashboard.module.css"

const Templates = () => {
  return (
      <>
            <h1 className={dashboardStyles.dashHeading}>Templates</h1>
            <div className={dashboardStyles.btnPrimaryDiv}><button 
            className={dashboardStyles.btnPrimary} 
            // onClick={()=>navigate("/create-group")}
             >+ Create New Template</button></div>

      </>
  );
};

export default Templates;
