const text = document.querySelector("#user");

let ls = JSON.parse(localStorage.getItem('user'));

text.innerHTML = ls.username;