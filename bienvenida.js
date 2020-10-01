const text = document.querySelector("#user");
const url = new URL("http://localhost:3000/");

let ls = JSON.parse(localStorage.getItem('user'));


if (ls) {
     const parametros = {
          method:"POST",
          headers: {
               "Authorization": `Bearer ${ls}`
          } 
      }
     
     fetch(`${url}validar`, parametros)
     .then((succes) => {
         if (succes.ok) {
             return succes.json();
         } 
     })
     .then((data) => {
         console.log(data);    
         if (data.data.admin) {
              text.innerHTML = `Administrador ${data.data.nombre}`;         
         } else {
               text.innerHTML = data.data.nombre;  
         }
     })  
} else {
     window.location.href='./login.html';
}




