var usuarioLogin = document.cookie.split(';')

var userLogin = usuarioLogin[0]

//console.log(userLogin)

function eliminarCookie(){
    document.cookie = "usuario.DPI_Conductor; max-age=0"
}


//const url = 'http://localhost:63570/api/Cantidades/'
const url = 'http://www.desarrollowebumg.somee.com/api/Cantidades/'


getSESSION()
getCantidades()

var usuarioLog = {
    ID_Conductor: ''
}


function getCantidades(){
    
    fetch(url)
    .then(response => response.json())
    .then(data => {

        if(data.length > 0){
            
            //console.log(data)

            var cantCamiones = document.getElementById("cantCamiones");
            cantCamiones.innerHTML = data[0].camiones;

            var cantConductores = document.getElementById("cantConductores");
            cantConductores.innerHTML = data[0].conductores;
            
            var cantUbicaciones = document.getElementById("cantUbicaciones");
            cantUbicaciones.innerHTML = data[0].ubicaciones;
        }
    })
}



// FUNCION PARA AGREGAR LOS DATOS DE INICIO DE SESSION AL AREA DE INICIO EN EL DASHBOARD

function getSESSION() {
    //const url2 = 'http://localhost:63570/api/Sesion/'+ userLogin
    const url2 = 'http://www.desarrollowebumg.somee.com/api/Sesion/' + userLogin
    //console.log(url)
    
    fetch(url2)
    .then(response => response.json())
    .then(data => {

        //console.log(data)
        var usuario = document.getElementById('usuario')
        usuario.innerHTML = data.Conductor

        var hora = document.getElementById('HoraSession')
        hora.innerHTML = data.Fech_Hora_Inicio_Sesion

        var usuario2 = document.getElementById('userL')
        usuario2.innerHTML = data.Conductor

        usuarioLog.ID_Conductor = data.ID_Conductor

        //console.log(data.ID_Conductor)

        if(data.ID_Conductor === undefined){
            window.location.href = 'login.html'
        }

        getConductorLog(data.ID_Conductor);

        

    })
    .catch(err => {
        console.log(err)
    })
    
}

var id

function getConductorLog(ID_Conductor) {
    return new Promise((resolve, reject) => {
        //var newUrl = 'http://localhost:63570/api/Conductor/' + ID_Conductor;
        var newUrl = 'http://www.desarrollowebumg.somee.com/api/Conductor/' + ID_Conductor;

        fetch(newUrl)
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                id = data.ID_Conductor;
                resolve(id); // Resolvemos la promesa con el ID obtenido
            })
            .catch(err => {
                reject(err); // Rechazamos la promesa si hay un error
            });
    });
}


    // FUNCION PARA CERRAR SESION
    function cerrarSesion() {

        //const url = 'http://localhost:63570/api/Sesion/' + id;
        const url = 'http://www.desarrollowebumg.somee.com/api/Sesion/' + id;

        console.log(url)
    
        usuarioLog = {
            ID_Conductor: id
        }
    
        console.log(JSON.stringify(usuarioLog))
    
        fetch(url, {
            method: 'DELETE',
            body: JSON.stringify(usuarioLog),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
    
                console.log(data)
    
                window.location.href = "../index.html";
            })
            .catch(error => {
                console.error('Error:', error)
            })
    }


    
    
    
    
    // FUNCION PARA AGREGAR CAMIONES EN AREA DE INICIO
    function agregarCamionINICIO() {
    
        //const url = 'http://localhost:63570/api/Camion'
        const url = 'http://www.desarrollowebumg.somee.com/api/Camion'
    
        var marcaCamion = document.getElementById('marcaCamionAdd').value
        var modeloCamion = document.getElementById('modeloCamionAdd').value
        var anioCamion = document.getElementById('añoCamionAdd').value
        var matriculaCamion = document.getElementById('matriculaCamionAdd').value
        var conductorCamion = document.getElementById('conductorCamionAdd').value
        var estadoCamion = document.getElementById('estadoCamionAdd').value
    
        camionFinal = {
            "Marca_Camion": marcaCamion,
            "Modelo_Camion": modeloCamion,
            "Año_Fabricacion_Camion": anioCamion,
            "Matricula_Camion": matriculaCamion,
            "Conductor_Asignado_Camion": conductorCamion,
            "Estado_Camion": estadoCamion
        }
    
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(camionFinal),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
    
                alert(data)
                getCantidades()
    
            })
            .catch(error => {
                console.error('Error:', error)
            })
    
    }
    
    
    // FUNCION PARA AGREGAR CONDUCTOR EN AREA INICIO
    function agregarConductorINICIO() {
        //const url = 'http://localhost:63570/api/Conductor/'
        const url = 'http://www.desarrollowebumg.somee.com/api/Conductor'
    
        document.getElementById('nombreEmpleadoAdd').innerHTML = ''
    
        var nombreEmpleado = document.getElementById('nombreEmpleadoAdd').value;
        var apellidoEmpleado = document.getElementById('apellidoEmpleadoAdd').value;
        var correoEmpleado = document.getElementById('CorreoEmpleadoAdd').value;
        var contraEmpleado = document.getElementById('ContraEmpleadoAdd').value;
        var direccionEmpleado = document.getElementById('direccionEmpleadoAdd').value;
        var telefonoEmpleado = document.getElementById('telefonoEmpleadoAdd').value;
        var dpiEmpleado = document.getElementById('DPIEmpleadoAdd').value;
        var fechaNacimientoEmpleado = document.getElementById('FechaNEmpleadoAdd').value;
        
        empleadoFinal = {
            "Nombre_Conductor": nombreEmpleado,
            "Apellido_Conductor": apellidoEmpleado,
            "Correo_Electronico_Conductor": correoEmpleado,
            "Contraseña_Conductor": contraEmpleado,
            "Direccion_Conductor": direccionEmpleado,
            "Telefono_Conductor": telefonoEmpleado,
            "DPI_Conductor": dpiEmpleado,
            "Fecha_Nacimiento_Conductor": fechaNacimientoEmpleado,
            "Estado_Conductor": "A"
        }
        
    
        console.log(JSON.stringify(empleadoFinal))
    
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(empleadoFinal),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
    
            alert(data)
    
            getCantidades()
    
            window.location.reload()
    
        })
        .catch(error => {
            console.error('Error:', error)
        })
    }