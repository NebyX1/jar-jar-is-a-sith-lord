//
import React, {useState} from 'react';

const getState = ({getStore, getActions, setStore}) => {
    return {
        store: {
            message: null,
            auth: false,
            isAdmin: false
        },
        actions: {


            // ? Esta función permite verificar permanentemente si el token es válido
            validToken: async () => {
                try {
                    const token = localStorage.getItem("token");
                    if (! token) {
                        setStore({auth: false});
                        return;
                    }

                    const headers = {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
                    };

                    const response = await fetch("https://3001-lolamartvar-ricuritastr-pvbzkm387ea.ws-us86.gitpod.io/api/verify-token-validity", {
                        method: "GET",
                        headers: headers
                    });

                    if (response.status !== 200) {
                        setStore({auth: false});
                        return;
                    }

                    setStore({auth: true});
                } catch (error) {
                    console.error(error);
                }
            },

            // ? Esta función nos permite verificar de forma permanente si quién está logueado es admin o no lo es
            getUserRole: async () => {
                try {
                    const token = localStorage.getItem("token");
                    if (! token) {
                        setStore({isAdmin: false});
                        return;
                    }

                    const headers = {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
                    };

                    const response = await fetch("https://3001-lolamartvar-ricuritastr-pvbzkm387ea.ws-us86.gitpod.io/api/get-user-role", {
                        method: "GET",
                        headers: headers
                    });

                    if (response.status !== 200) {
                        setStore({isAdmin: false});
                        return;
                    }

                    const data = await response.json();
                    setStore({
                        isAdmin: data.role === 'admin'
                    });
                } catch (error) {
                    console.error(error);
                }
            },


            // ? Acá empieza el fetch que nos permite conectar con el BackEnd
            login: (userEmail, userPassword) => {
                fetch('https://3001-lolamartvar-ricuritastr-pvbzkm387ea.ws-us86.gitpod.io/api/login', {
                    method: 'POST',
                    // mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Access-Control-Allow-Origin': '*'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify(
                        {"email": userEmail, "password": userPassword}
                    ) // body data type must match "Content-Type" header
                }).then((response) => {
                    console.log(response.status);
                    if (response.status === 200) {
                        setStore({auth: true})
                    }

                    return response.json()
                }).then((data) => {
                    localStorage.setItem('token', data.access_token)
                    // const adminData = data.is_admin;
                    // if (adminData === true) {
                    //     localStorage.setItem('admin', "34åÇkJhdkKhdf0'=)(675684fsg45sg744fs65g468sf4gJVvghhjksdfg8?=)(/$%32&ujsfdgjuibdgijk")
                    // }

                }).catch((err) => {
                    console.log(err);
                    alert("algo salió mal")
                })
            },

            // ? Acá termina el fetch que nos permite conectar con el BackEnd


            // Acá está la función de crear un nuevo usuario
            register: (userEmail, userName, userNombre, userApellido, userPassword) => {
                fetch('https://3001-lolamartvar-ricuritastr-pvbzkm387ea.ws-us86.gitpod.io/api/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            "email": userEmail,
                            "user_name": userName,
                            "nombre": userNombre,
                            "apellido": userApellido,
                            "password": userPassword
                        }
                    )
                }).then((response) => {
                    console.log(response.status);
                    if (response.status === 200) {
                        setStore({auth: true})
                    }
                    return response.json()
                }).catch((err) => console.log(err))
            },
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },
            getMessage: async () => {
                try { // fetching data from the backend
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
                    const data = await resp.json()
                    setStore({message: data.message})
                    // don't forget to return something, that is how the async resolves
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error)
                }
            },
            changeColor: (index, color) => { // get the store
                const store = getStore();

                // we have to loop the entire demo array to look for the respective index
                // and change its color
                const demo = store.demo.map((elm, i) => {
                    if (i === index) 
                        elm.background = color;
                    


                    return elm;
                });

                // reset the global store
                setStore({demo: demo});
            }

        }
    };
};

export default getState;
