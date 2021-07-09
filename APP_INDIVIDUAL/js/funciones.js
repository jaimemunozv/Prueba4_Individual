$('#btn_mostrarUsuarios').click(function() {
    fn_mostrarUsuarios();
})

$("#btn_almacenar").click(function(){
  var userPantalla = $("#txt_user").val();
  var passwordPantalla = $("#txt_password").val();

  $.post("http://127.0.0.1:8000/api/usuarios/",
  {
    user: userPantalla,
    password: passwordPantalla
  },
  function(data, status){
    alert("Data: " + data + "\nStatus: " + status);
  });
});

$("#btn_eliminar").click(function(){
  var id = $("#txt_id").val();
  $.ajax({
    url: 'http://127.0.0.1:8000/api/usuarios/' + id,
    method: 'DELETE',
    contentType: 'application/json',
    success: function(result) {
       console.log('REGISTRO ELIMINADO');
    },
    error: function(request,msg,error) {
      console.log('ERROR');
    }
});
});


function fn_mostrarUsuarios() {
    $.getJSON('http://127.0.0.1:8000/api/usuarios/?format=json', function(data) {
        var respuesta = data;
        
        for (var i in respuesta) {
          $("#lista_usuarios").append('<li>' + respuesta[i].user + ' - ' + respuesta[i].password +'</li>');
        }
    }).fail(function() {
        console.log('Error al consumir la API!');
    });
}

//login//

$('#btn_ingresar').click(function() {
  fn_mostrarContactos();
})

function fn_mostrarContactos() {
  $.getJSON('http://127.0.0.1:8000/api/usuarios/', function(data) {
      var respuesta = data;
      var v_user = $('#txt_user').val();
      var v_pass = $('#txt_pass').val();

      var validador = false;
      
      for (var i in respuesta) {

        if(respuesta[i].user === v_user && respuesta[i].password === v_pass) {
          validador = true;
        }

        if(validador) {
          alert('BIENVENID@!')
          window.location="index.html"
        }
        else {
          alert('CREDENCIALES INVALIDAS');
          window.location="login.html"

        }
      }
  }).fail(function() {
      console.log('Error al consumir la API!');
  });
}