var usuarioLogin = document.cookie.split(';')

var userLogin = usuarioLogin[0]

//console.log(userLogin)

getSESSION()

//const url = 'http://localhost:63570/api/Ubicacion/'
const url = 'http://www.desarrollowebumg.somee.com/api/Ubicacion/'

getUbicacion();

const intervalo = 30000; 
setInterval(getUbicacion, intervalo);

success()
const intervaloOtraFuncion = 30000;
setInterval(success, intervaloOtraFuncion);



function getUbicacion() {

    fetch(url)
    .then(response => response.json())
    .then(data => {
        //console.log(data)

        var getUbicacion = document.getElementById("verUbicacion");
        getUbicacion.innerHTML = "";

        if(data.length > 0){
            for(var i = 0; i < data.length; i++){

                var cordenadas = data[i].Coordenadas_Geograficas.split(',')
                var fechaHora = data[i].Fecha_y_Hora_de_Registro.split(' ')

                const latitud = parseFloat(cordenadas[0]);
                const longitud = parseFloat(cordenadas[1]);

                const fecha = fechaHora[0]
                const hora = fechaHora[1]
                const vl = fechaHora[2]

                getUbicacion.innerHTML += `
                <tr>
                    <td>${data[i].ID_Ubicacion}</td>
                    <td>${data[i].Conductor}</td>
                    <td>${data[i].Matricula}</td>
                    <td>${fecha}</td>
                    <td>${hora + ' ' + vl}</td>
                    <td>${latitud}</td>
                    <td>${longitud}</td>
                </tr>`

            }
        }
    })

}

var map = L.map('map').setView([14.607, -90.529], 9);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


function success(){
    
    fetch(url)
    .then(response => response.json())
    .then(data => {
        //console.log(data)

        if(data.length > 0){
            data.forEach(item => {

                var coordenadas = item.Coordenadas_Geograficas.split(',');
                const latitud = parseFloat(coordenadas[0]);
                const longitud = parseFloat(coordenadas[1]);

                // Crea un marcador con las coordenadas y agrégalo al mapa
                var marker = L.marker([latitud, longitud]).addTo(map);
          
                // Puedes agregar información emergente al marcador si lo deseas
                marker.bindPopup('Conductor: ' + item.Conductor + ' Latitud: ' + latitud + '<br>Longitud: ' + longitud);
            });
        }
    })
}

success();
function error(err){
    if(err.code === 1){
        alert("Activa tu geolocalización: " + err.message);
    } else {
        alert("error: " + err.message);
    }
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
    const url = 'http://www.desarrollowebumg.somee.com/api/Sesion/' +id

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
