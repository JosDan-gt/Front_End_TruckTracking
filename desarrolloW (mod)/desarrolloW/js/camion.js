var usuarioLogin = document.cookie.split(';')

var userLogin = usuarioLogin[0]

//console.log(userLogin)

getSESSION()

//const url = 'http://localhost:63570/api/Camion'
const url = 'http://www.desarrollowebumg.somee.com/api/Camion'

getcamion();
function getcamion() {

    //get todos
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)

            var getCamion = document.getElementById("verCamiones");
            getCamion.innerHTML = "";

            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {

                    getCamion.innerHTML += `
                <tr>
                    <td>${data[i].ID_Camion}</td>
                    <td>${data[i].Marca_Camion}</td>
                    <td>${data[i].Modelo_Camion}</td>
                    <td>${data[i].Año_Fabricacion_Camion}</td>
                    <td>${data[i].Matricula_Camion}</td>
                    <td>${data[i].Conductor_Asignado}</td>
                    <td>
                    <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modCamion" onclick="verCamionesmod(${data[i].ID_Camion})">Editar</button>
                    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#elimCamion" onclick="verCamionlim(${data[i].ID_Camion})">Eliminar</button>
                    </td>
                </tr>`


                }
            }
        })
}

function limpiacampos() {
    document.getElementById('marcaCamionAdd').value = ''
    document.getElementById('modeloCamionAdd').value = ''
    document.getElementById('añoCamionAdd').value = ''
    document.getElementById('matriculaCamionAdd').value = ''
    document.getElementById('conductorCamionAdd').value = ''
    document.getElementById('estadoCamionAdd').value = ''
}

camion = {
    "Marca_Camion": '',
    "Modelo_Camion": '',
    "Año_Fabricacion_Camion": '',
    "Matricula_Camion": '',
    "Conductor_Asignado_Camion": '',
    "Estado_Camion": ''
}


function agregarCamion() {

    var marcaCamion = document.getElementById('marcaCamionAdd').value
    var modeloCamion = document.getElementById('modeloCamionAdd').value
    var anioCamion = document.getElementById('añoCamionAdd').value
    var matriculaCamion = document.getElementById('matriculaCamionAdd').value
    var conductorCamion = document.getElementById('conductorCamionAdd').value
    //var estadoCamion = document.getElementById('estadoCamionAdd').value

    camionFinal = {
        "Marca_Camion": marcaCamion,
        "Modelo_Camion": modeloCamion,
        "Año_Fabricacion_Camion": anioCamion,
        "Matricula_Camion": matriculaCamion,
        "Conductor_Asignado_Camion": conductorCamion,
        "Estado_Camion": 'A'
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
            getcamion()

        })
        .catch(error => {
            console.error('Error:', error)
        })

}


function verCamionesmod(id) {

    var newUrl = url + '/' + id
    //console.log(newUrl)
    
    fetch(newUrl)
    .then(res => {
        if(!res.ok){
            throw new Error(res.statusText)
        }
        return res.json()
    })
    .then(data => {
        console.log(data)

        var marcaCamion = document.getElementById('marcaCamionMod')
        marcaCamion.value = data.Marca_Camion

        var modeloCamion = document.getElementById('modeloCamionMod')
        modeloCamion.value = data.Modelo_Camion

        var anioCamion = document.getElementById('añoCamionMod')
        anioCamion.value = data.Año_Fabricacion_Camion

        var matriculaCamion = document.getElementById('matriculaCamionMod')
        matriculaCamion.value = data.Matricula_Camion

        var conductorCamion = document.getElementById('conductorCamionMod')
        conductorCamion.value = data.Conductor_Asignado_Camion

        camion.ID_Camion = data.ID_Camion
        camion.Marca_Camion = data.Marca_Camion
        camion.Modelo_Camion = data.Modelo_Camion
        camion.Año_Fabricacion_Camion = data.Año_Fabricacion_Camion
        camion.Matricula_Camion = data.Matricula_Camion
        camion.Conductor_Asignado_Camion = data.Conductor_Asignado_Camion
        camion.Estado_Camion = data.Estado_Camion

        
    })
    .catch(err => {
        console.log(err)
    })
    
}


function modificarCamion() {

    var newUrl = url + '/' + camion.ID_Camion

    //console.log(JSON.stringify(ID_Camion))
    //console.log(newUrl)

    var idCamion = camion.ID_Camion
    var marcaCamion = document.getElementById('marcaCamionMod').value
    var modeloCamion = document.getElementById('modeloCamionMod').value
    var anioCamion = document.getElementById('añoCamionMod').value
    var matriculaCamion = document.getElementById('matriculaCamionMod').value
    var conductorCamion = document.getElementById('conductorCamionMod').value

    camionFinal = {

        "ID_Camion": idCamion,
        "Marca_Camion": marcaCamion,
        "Modelo_Camion": modeloCamion,
        "Año_Fabricacion_Camion": anioCamion,
        "Matricula_Camion": matriculaCamion,
        "Conductor_Asignado_Camion": conductorCamion,
        "Estado_Camion": 'A'
    }

    fetch(newUrl, {
        method: 'PUT',
        body: JSON.stringify(camionFinal),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {

            alert(data)
            getcamion()

        })
        .catch(error => {
            console.error('Error:', error)
        })

}

var camionID

function verCamionlim(id) {

    var newUrl = url + '/' + id

    fetch(newUrl)
    .then(res => {
        if(!res.ok){
            throw new Error(res.statusText)
        }
        return res.json()
    })
    .then(data => {
        //console.log(data)

        camionID = data.ID_Camion

        console.log(camion)

        
    })
    .catch(err => {
        console.log(err)
    })

}

var camionElimina = {}

function eliminarCamion() {

    var newUrl = url + '/' + camionID
    console.log(newUrl)

    camionElimina = {
        "ID_Conductor": camionID
    }
    
    console.log(JSON.stringify(camionElimina))

    fetch(newUrl, {
        method: 'DELETE',
        body: JSON.stringify(camionElimina),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => {

        if(!res.ok){
            throw new Error(res.statusText)
        }

        var modalEliminar = new bootstrap.Modal(document.getElementById('elimCamion'));
        modalEliminar.hide();

        alert('Camion eliminado')

        getcamion()

        
    })
    .catch(error => {
        console.log('ERROR', error);
    });

}


function getSESSION() {
    //const url2 = 'http://localhost:63570/api/Sesion/'+ userLogin
    const url2 = 'http://www.desarrollowebumg.somee.com/api/Sesion/' + userLogin
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
    const url = 'http://www.desarrollowebumg.somee.com/api/Sesion/'+ id;
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