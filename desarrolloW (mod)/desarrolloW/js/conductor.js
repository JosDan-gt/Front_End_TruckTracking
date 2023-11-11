var usuarioLogin = document.cookie.split(';')

var userLogin = usuarioLogin[0]

//console.log(userLogin)

getSESSION()

//const url = 'http://localhost:63570/api/Conductor/'
const url = 'http://www.desarrollowebumg.somee.com/api/Conductor/'

getconductor();
var empleado = {
    ID_Conductor: '',
    Nombre_Conductor: '',
    Apellido_Conductor: '',
    Correo_Electronico_Conductor: '',
    Contraseña_Conductor: '',
    Direccion_Conductor: '',
    Telefono_Conductor: '',
    DPI_Conductor: '',
    Fecha_Nacimiento_Conductor: '',
    Estado_Conductor: ''
}

function getconductor(){

    //get todos
    fetch(url)
    .then(response => response.json())
    .then(data => {
        //console.log(data)

        var getConductor = document.getElementById("verConductores");
        getConductor.innerHTML = "";

        if(data.length > 0){
            for(var i = 0; i < data.length; i++){

                getConductor.innerHTML += `
                <tr>
                    <td>${data[i].ID_Conductor}</td>
                    <td>${data[i].Nombre_Conductor}</td>
                    <td>${data[i].Apellido_Conductor}</td>
                    <td>${data[i].Correo_Electronico_Conductor}</td>
                    
                    <td>${data[i].DPI_Conductor}</td>
                    <td>${data[i].Fecha_Nacimiento_Conductor}</td>
                    <td>
                    <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modEmpleado" onclick="verEmpleadomod(${data[i].ID_Conductor})">Editar</button>
                    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#elimEmpleado" onclick="verEmpleadoelim(${data[i].ID_Conductor})">Eliminar</button> 
                    </td>
                </tr>`


            }
        }
    })
}

function agregarEmpleado() {

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

        getconductor()

        window.location.reload()

    })
    .catch(error => {
        console.error('Error:', error)
    })
}


function verEmpleadomod(id) {

    var newUrl = url + id
    console.log(newUrl)
    
    fetch(newUrl)
    .then(res => {
        if(!res.ok){
            throw new Error(res.statusText)
        }
        return res.json()
    })
    .then(data => {
        //console.log(data)

        var nombreEmpleado = document.getElementById('nombreEmpleadoMod');
        nombreEmpleado.value = data.Nombre_Conductor;
        
        var apellidoEmpleado = document.getElementById('apellidoEmpleadoMod');
        apellidoEmpleado.value = data.Apellido_Conductor;
        
        var correoEmpleado = document.getElementById('CorreoEmpleadoMod');
        correoEmpleado.value = data.Correo_Electronico_Conductor;
        
        var contraEmpleado = document.getElementById('ContraEmpleadoMod');
        contraEmpleado.value = data.Contraseña_Conductor;
        
        var direccionEmpleado = document.getElementById('direccionEmpleadoMod');
        direccionEmpleado.value = data.Direccion_Conductor;
        
        var telefonoEmpleado = document.getElementById('telefonoEmpleadoMod');
        telefonoEmpleado.value = data.Telefono_Conductor;
        
        var dpiEmpleado = document.getElementById('DPIEmpleadoMod');
        dpiEmpleado.value = data.DPI_Conductor;
        
        var fechaNacimientoEmpleado = document.getElementById('FechaNEmpleadoMod');
        fechaNacimientoEmpleado.value = data.Fecha_Nacimiento_Conductor;
        
        empleado.ID_Conductor = data.ID_Conductor;
        empleado.Nombre_Conductor = data.Nombre_Empleado;
        empleado.Apellido_Conductor = data.Apellido_Empleado;
        empleado.Correo_Electronico_Conductor = data.Correo_Electronico;
        empleado.Contraseña_Conductor = data.Contrasena_Conductor;
        empleado.Direccion_Conductor = data.Direccion_Empleado;
        empleado.Telefono_Conductor = data.Telefono_Empleado;
        empleado.DPI_Conductor = data.DPI_Empleado;
        empleado.Fecha_Nacimiento_Conductor = data.Fecha_Nacimiento;
        empleado.Estado_Conductor = "A";
     
        
    })
    .catch(err => {
        console.log(err)
    })
    
}

function modificarEmpleado(){

    var newUrl = url 

    console.log(JSON.stringify(empleado))
    console.log(newUrl)

    var nombreEmpleado = document.getElementById('nombreEmpleadoMod').value;
    var apellidoEmpleado = document.getElementById('apellidoEmpleadoMod').value;
    var correoEmpleado = document.getElementById('CorreoEmpleadoMod').value;
    var contraEmpleado = document.getElementById('ContraEmpleadoMod').value;
    var direccionEmpleado = document.getElementById('direccionEmpleadoMod').value;
    var telefonoEmpleado = document.getElementById('telefonoEmpleadoMod').value;
    var dpiEmpleado = document.getElementById('DPIEmpleadoMod').value;
    var fechaNacimientoEmpleado = document.getElementById('FechaNEmpleadoMod').value;
    //var EstadoNacimientoEmpleado = document.getElementById('EstaNEmpleadoMod').value;
    
    empleadoFinal = {
        "ID_Conductor": empleado.ID_Conductor,
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

    fetch(newUrl, {
        method: 'PUT',
        body: JSON.stringify(empleadoFinal),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {

        alert(data)
       getconductor()

    })
    .catch(error => {
        console.error('Error:', error)
    })

}



function verEmpleadoelim(id) {

    var newUrl = url + id

    fetch(newUrl)
    .then(res => {
        if(!res.ok){
            throw new Error(res.statusText)
        }
        return res.json()
    })
    .then(data => {
        //console.log(data)

        empleado.ID_Conductor = data.ID_Conductor
        empleado.Nombre_Conductor = data.Nombre_Conductor
        empleado.Apellido_Conductor = data.Apellido_Conductor
        empleado.Correo_Electronico_Conductor = data.Correo_Electronico_Conductor
        empleado.Contraseña_Conductor = data.Contraseña_Conductor
        empleado.Direccion_Conductor = data.Direccion_Conductor
        empleado.Telefono_Conductor = data.Telefono_Conductor
        empleado.DPI_Conductor = data.DPI_Conductor
        empleado.Fecha_Nacimiento_Conductor = data.Fecha_Nacimiento_Conductor
        empleado.Estado_Conductor = data.Estado_Conductor

        
    })
    .catch(err => {
        console.log(err)
    })

}

var empleadoElimina = {}

function eliminarEmpleado() {

    var newUrl = url + '/' + empleado.ID_Conductor
    //console.log(newUrl)

    empleadoElimina = {
        "ID_Conductor": empleado.ID_Conductor,
    }
    
    console.log(JSON.stringify(empleadoElimina))

    fetch(newUrl, {
        method: 'DELETE',
        body: JSON.stringify(empleadoElimina),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => {

        if(!res.ok){
            throw new Error(res.statusText)
        }

        var modalEliminar = new bootstrap.Modal(document.getElementById('elimEmpleado'));
        modalEliminar.hide();

        alert('Empleado eliminado')

        getconductor()

        
    })
    .catch(error => {
        console.log('ERROR', error);
    });

}


function getSESSION() {
    //const url2 = 'http://localhost:63570/api/Sesion/'+ userLogin
    const url2 = 'http://www.desarrollowebumg.somee.com/api/Sesion/'+ userLogin
    //console.log(url)
    
    fetch(url2)
    .then(response => response.json())
    .then(data => {

        //console.log(data)

        var usuario2 = document.getElementById('userL')
        usuario2.innerHTML = data.Conductor

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
                resolve(id); 
            })
            .catch(err => {
                reject(err); 
            });
    });
}

function cerrarSesion() {

    //const url = 'http://localhost:63570/api/Sesion/' + id;
    const url = 'http://www.desarrollowebumg.somee.com/api/Sesion/' + id

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
