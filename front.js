let envio = document.querySelector('form');
envio.addEventListener("submit", enviarDatos);
function enviarDatos (e){

    e.preventDefault();
    let upload = new FormData(document.querySelector('#form'));
    const data = new URLSearchParams();
    for (const pair of upload) {
        data.append(pair[0], pair[1]);
    }
    const parametros = {
        method:"POST",
        body: data
    }
    const url = new URL("http://localhost:3000");
    fetch(`${url}usuario`, parametros)

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