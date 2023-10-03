import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const useSignUp = () =>{
    const [stateSignUp, setStateSignUp] = useState({
        Nit:"",
        Full_Name:"",
        Nickname:"",
        Date_Birth:"",
        Email:"",
        Password:"",
    })

    const redirect = useNavigate();

    const submitSignUp = async(e) =>{
        e.preventDefault();
        let options = {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(stateSignUp)
          }
          try {
            const sever =JSON.parse(import.meta.env.VITE_MY_SERVER);
            const response = await (await fetch(`http://${sever.host}:${sever.port}/users`, options)).json();
            console.log(response);
            if(response.status === 200){
              alert(response.message)
              redirect("/login")
            } else{
                setStateSignUp({
                    Nit:"",
                    Full_Name:"",
                    Nickname:"",
                    Date_Birth:"",
                    Email:"",
                    Password:"",
                })
              alert(response.message)
            }
          } catch (error) {
            console.log(error)
          }
    }

    return{
        stateSignUp,
        setStateSignUp,
        submitSignUp
    }
}

export default useSignUp