import React, { useEffect } from 'react';
import MyComponent from 'react-fullpage-custom-loader'


const FullPageLoader = (props) => {
    useEffect(() => {
        if(props.condition){
            document.querySelector("body").classList.add("noscroll")

        } else{
        document.querySelector("body").classList.remove("noscroll")
        }
    }, [props.condition]);
    
  return (
        <>
            {props.condition?<MyComponent loaderType="line-spin-fade-rotating" fadeIn={true} wrapperBackgroundColor="#253E7E50" sentences={!props.sentence?[]:props.sentence} style={{zIndex:"10000"}}/>:<></>}
        </>
    );
};

export default FullPageLoader;
