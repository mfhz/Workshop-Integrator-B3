let registrar = document.querySelector('#registro');
const url = new URL("http://localhost:3000/");

registrar.addEventListener("submit", registrarF);




function registrarF(e){

    e.preventDefault();
    let upload = new FormData(document.querySelector('#registro'));
    const data = new URLSearchParams();
    for (const pair of upload) {
        data.append(pair[0], pair[1]);
    }
    const parametros = {
        method:"POST",
        body: data
    }
    
    fetch(`${url}registro`, parametros)
    .then((succes) => {
        if (succes.ok) {
            return succes.json();
        } 
    })
    .then((data) => {
        // console.log(data);
        if (data.status == 200) {
            guardarLS(data.user);
            window.location.href='./bienvenida.html';
        }
    })    

}

function guardarLS(usuario) {
    let datos = {
        username: usuario.nombre,
        edad: usuario.edad,
        email: usuario.correo
    };




    localStorage.setItem('user', JSON.stringify(datos));
}


















/*console.log("click");
let nombre = document.querySelector("#nombre")
let upload = new FormData(document.querySelector('#form'));
upload.append('nombre', "Doe");
console.log(upload);
const parametros = {
    method:"POST",
    body: upload,
    mode: 'no-cors'
}
fetch('localhost:3000/usuario', parametros)
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    })

 */