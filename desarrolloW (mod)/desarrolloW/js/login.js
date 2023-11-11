
usuario = {
    "DPI_Conductor": 0,
    "Contraseña_Conductor": 0
}

usuario2 = {
    "DPI_Conductor": 0
}
//const url = 'http://localhost:63570/api/InicioSesion/'
const url = 'http://www.desarrollowebumg.somee.com/api/InicioSesion/'
// Funcion para iniciar sesion
function iniciarSesion() {

    // Por ejemplo, validar el usuario y contraseña ingresados
    var dpiUser = document.getElementById('dpi').value;
    var contraseña = document.getElementById('password').value;

    usuario = {
        "DPI_Conductor": dpiUser,
        "Contraseña_Conductor": contraseña
    }

    console.log(JSON.stringify(usuario))

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(usuario),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {

            console.log(data)

            if (data === "Inicio de sesión exitoso") {
                // Respuesta exitosa, redirigir al usuario

                document.cookie = usuario.DPI_Conductor
                postSesion()
                alert("Bienvenido")
                window.location.href = "dashboard.html";
                
            } else {
                // Respuesta no exitosa, mostrar un mensaje de error
                alert('Usuario o contraseña incorrecta');
            }

        })
        .catch(error => {
            console.error('Error:', error)
        })

    
}

function postSesion(){

    //const url = 'http://localhost:63570/api/Sesion/'
    const url = 'http://www.desarrollowebumg.somee.com/api/Sesion/'

    var dpiUser = document.getElementById('dpi').value;

    usuario2 = {
        "DPI_Conductor": dpiUser
    }

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(usuario2),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {

            //console.log(data)

        })
        .catch(error => {
            console.error('Error:', error)
        })
}


