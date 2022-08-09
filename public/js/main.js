// const { response } = require("express");

// Cliente WebSocket
const socket = io();

socket.on("connect", () => {
  console.log("Conectado al servidor");
});

socket.on("INIT", (msg, allMessages) => {
  // alert(msg);
  document.getElementById("posts").innerHTML = "";
  for (let msg of allMessages) {
    appendMessage(msg);
  }
});

socket.on("NEW_MESSAGE", (msg) => {
  appendMessage(msg);
})

function appendMessage(msg) {
  document.getElementById("posts").innerHTML += `
    <div class="post ui card">
      <div class="div ui container">
      <span class="mailBlue">${msg.email}</span><span class="dateRed"> (${msg.date}):</span><span class="mensajeGreen">${msg.mensaje}</span>
      </div>
    </div>
  `;
}

function enviarMensaje(){
  const email = document.getElementById("email").value;
  const mensaje = document.getElementById("mensaje").value;
  if((mensaje == "") || (email =="")){
    alert("Debe completar ambos campos")
  }else{
    socket.emit("POST_MESSAGE", {email, mensaje})
  }
}

function enviarProd(){
  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  const img = document.getElementById("img").value;
  socket.emit("POST_PRODUCTS", {title,price,img});
  
}


socket.on("productos_registrados", (products) => {
  console.log(products);
  const url = "http://localhost:2882/productos.hbs";
    fetch(url).then((resp) => {
      console.log(resp);
      return resp.text();
  }).then((text) => {
    const template = Handlebars.compile(text);
    const html = template({products: products});
    document.querySelector("#products").innerHTML = html;
    //document.getElementById('products').innerHTML = html;
  });
})

