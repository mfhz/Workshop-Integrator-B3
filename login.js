let login = document.querySelector('#login');
const url = new URL("http://localhost:3000/");

login.addEventListener("submit", loginF);

function loginF(e){

     // let data = {
     //      user: "Prueba"
     // };
     e.preventDefault();
     let upload = new FormData(document.querySelector('#login'));
     const data = new URLSearchParams();
     for (const pair of upload) {
         data.append(pair[0], pair[1]);
     }


     // const parametros = {
     //     method:"POST",
     //     body: data,
     //     headers: {
     //      'Content-type': 'application/json; charset=UTF-8'
     //      }
     // }
     const parametros = {
         method:"POST",
         body: data
     }
     
     fetch(`${url}login`, parametros)
 
 }