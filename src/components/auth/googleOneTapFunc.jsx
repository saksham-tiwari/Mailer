import googleOneTap from 'google-one-tap';

function google(){
    const options = {
        client_id: '852195797172-d0qq3vi9erb2ep1ill5eilc65mdvmah9.apps.googleusercontent.com', // required
        auto_select: false, // optional
        cancel_on_tap_outside: false, // optional
        context: 'signin', // optional
    };

    googleOneTap(options, (response) => {
        setLoader(true);

        // Send response to server
        console.log(response.credential);
        // axios.post("https://bulk-mailer-app.herokuapp.com/signup/google", {token:response.credential})
        dispatch(oneTap(response.credential))
        .then((resp)=>{
            setLoader(false);
            setTimeout(()=>{navigate("/")},2000)
        })
        .catch((err)=>{
            setLoader(false);
            setTimeout(()=>dismiss(),3000)

        })
    });
}

export default google