var idUsuario = 0;
const queryString2 = window.location.search;
const params2 = {};
queryString2.split('&').forEach((pair) => {
    const [key, value] = pair.split('=');
    params2[key] = decodeURIComponent(value);
});
if (Object.keys(params2).indexOf('?id') !== -1) {
    idUsuario = parseInt(params2['?id']);
}

function llenarEspecialistas() {
    fetch('/public/assets/data/especialistas.json')
        .then((response) => response.json())
        .then((value) => {
            const listaEsp = document.getElementById('listaEspecialistas');
            for (var especialista of value) {
                let opcionE = document.createElement('option');
                opcionE.value = especialista.nombre;
                let horarios = [];
                for (var horario of especialista.horarios) {
                    if (horario.disponible) {
                        let opcionH = document.createElement('option');
                        opcionH.value = horario.fecha + ' ' + horario.hora;
                        horarios.push(opcionH);
                    }
                }
                if (horarios.length == 0) continue;
                listaEsp.append(opcionE);
            }
        });
}

function llenarHorarios() {
    fetch('/public/assets/data/especialistas.json')
        .then((response) => response.json())
        .then((value) => {
            const inputEsp = document.getElementById('especialista');
            const listaHorarios = document.getElementById('listaHorarios');
            listaHorarios.replaceChildren();
            continuar = false;

            for (var esp of value) {
                if (inputEsp.value === esp.nombre) {
                    continuar = true;
                }
            }
            if (!continuar) return;

            for (var especialista of value) {
                if (especialista.nombre !== inputEsp.value) continue;
                for (var horario of especialista.horarios) {
                    if (horario.disponible) {
                        let opcionH = document.createElement('option');
                        opcionH.value = horario.fecha + ' ' + horario.hora;
                        listaHorarios.append(opcionH);
                    }
                }
            }
        });
}

function redireccionarA(src, params) {
    var esPrimerParam = true;
    var anchor = document.createElement('a');
    var dir = src;
    for (var key in params) {
        if (esPrimerParam) {
            dir += '?';
            esPrimerParam = false;
        } else {
            dir += '&';
        }
        dir += key + '=' + params[key];
    }

    anchor.href = dir;
    console.log(dir);
    anchor.click();
}

function llenarPacientes() {
    fetch('/public/assets/data/usuarios.json')
        .then((response) => response.json())
        .then((value) => {
            const listaPac = document.getElementById('listaPacientes');
            for (var usuario of value) {
                if (usuario.idUsuario !== idUsuario) continue;
                if (usuario.esApoderado) {
                    document.getElementById('div-paciente').hidden = false;
                    for (var hijo of usuario.hijos) {
                        var opc = document.createElement('option');
                        opc.value = hijo;
                        listaPac.append(opc);
                    }
                } else {
                    listaPac.append(usuario.nombre);
                    document.getElementById('paciente').value = usuario.nombre;
                }
            }
        });
}

function agendarCita() {
    const paciente = document.getElementById('paciente').value;
    const especialista = document.getElementById('especialista').value;
    const horario = document.getElementById('horario').value;

    document.getElementById('id').value = idUsuario;
    redireccionarA('citas.html', {
        id: idUsuario.toString(),
        paciente: paciente.replaceAll(" ", "+"),
        especialista: especialista.replaceAll(" ", "+"),
        horario: horario.replaceAll(" ", "+")
    });
}

llenarEspecialistas();
llenarPacientes();

var a = "";
