var usuarioLogin = document.cookie.split(';')

var userLogin = usuarioLogin[0]

//console.log(userLogin)

getSESSION()

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

                var nombreC = document.getElementById('nombreConductor')
                nombreC.value = data.Nombre_Conductor

                var dpi = document.getElementById('apellidoConductor')
                dpi.value = data.Apellido_Conductor

                var correo = document.getElementById('correoConductor')
                correo.value = data.Correo_Electronico_Conductor

                var direccion = document.getElementById('direccion')
                direccion.value = data.Direccion_Conductor

                var telefono = document.getElementById('telefono')
                telefono.value = data.Telefono_Conductor

                var dpi = document.getElementById('dpi')
                dpi.value = data.DPI_Conductor

                var fecha = document.getElementById('fechaNac')
                fecha.value = data.Fecha_Nacimiento_Conductor

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
    const url = 'http://www.desarrollowebumg.somee.com/api/Sesion' + id

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
