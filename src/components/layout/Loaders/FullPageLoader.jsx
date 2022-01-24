import React from 'react';
import MyComponent from 'react-fullpage-custom-loader'


const FullPageLoader = (props) => {
  return (
        <>
            {props.condition?<MyComponent loaderType="line-spin-fade-rotating" fadeIn={true} wrapperBackgroundColor="#253E7E50" sentences={[]} style={{zIndex:"10000"}}/>:<></>}
        </>
    );
};

export default FullPageLoader;
