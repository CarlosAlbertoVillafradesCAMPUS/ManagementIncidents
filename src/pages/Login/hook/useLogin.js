import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useApp from "../../../routes/hook/useApp";


const useLogin = () =>{

    const [stateLogin, setStateLogin] = React.useState({
      Email: '',
      Password: '',
    })

    const redirect = useNavigate()

    const submitLogin = async (e) =>{
      e.preventDefault();
      let options = {
        method: "POST",
        headers: new Headers({"Content-Type": "application/json"}),
        body: JSON.stringify({Email: stateLogin.Email, Password: stateLogin.Password})
      }
      try {
        const sever =JSON.parse(import.meta.env.VITE_MY_SERVER);
        const response = await (await fetch(`http://${sever.host}:${sever.port}/login`, options)).json();
        if(response.status === 200){
          localStorage.setItem("VITE_AUTH_TOKEN", response.token);
          const myToken = localStorage.getItem("VITE_AUTH_TOKEN");
          const responseToken = await (await fetch(`http://${sever.host}:${sever.port}/login/token`, {
            method: "GET",
            headers: new Headers({
              "Content-Type": "application/json",
              "Authorization": myToken})
          })).json();

          if (responseToken.status == 200) {
            localStorage.setItem("Rol", responseToken.data.payload.Role)

            switch (import.meta.env.VITE_ROL) {
              case "Camper":
                redirect("/camper")
                break;
              case "Trainer":
                redirect("/trainer")
                break;
              case "Support":
                redirect("/support")
                break;
              case "Admin":
                redirect("/admin")
                break;
            
              default:
                redirect("/")
                break;
            }
          }
        } else{
          alert(response.message)
        }
      } catch (error) {
        console.log(error)
      }
  }

  return{
    stateLogin, 
    setStateLogin,
    submitLogin,
  }
}



export default useLogin