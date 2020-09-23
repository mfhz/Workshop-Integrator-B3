let registrar = document.querySelector('#registro');
// let login = document.querySelector('#login');
const url = new URL("http://localhost:3000/");

// registrar.addEventListener("submit", registrarF);
login.addEventListener("submit", loginF);



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

}


function loginF(e){

    e.preventDefault();
    let upload = new FormData(document.querySelector('#login'));
    const data = new URLSearchParams();
    for (const pair of upload) {
        data.append(pair[0], pair[1]);
    }
    const parametros = {
        method:"POST",
        body: data
    }
    
    fetch(`${url}login`, parametros)

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