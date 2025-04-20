var idUsuario = 0;
const queryString = window.location.search;
const params = {};
queryString.split('&').forEach((pair) => {
    const [key, value] = pair.split('=');
    params[key] = decodeURIComponent(value);
});
if (Object.keys(params).indexOf('?id') !== -1) {
    idUsuario = parseInt(params['?id']);
}

function ocultarElementos() {
    const ocultables = document.getElementsByClassName('hideable');
    for (var elem of ocultables) {
        if (idUsuario !== 0) {
            elem.hidden = true;
        }
    }
}

function ocultarEvaluaciones() {
    if (idUsuario === 0) return;
    fetch('assets/javascript/data/usuarios.json')
        .then((response) => response.json())
        .then((value) => {
            const ocultables = document.getElementsByClassName('hideable-membership');
            let membresia = '';
            for (var u of value) {
                if (u.idUsuario === parseInt(idUsuario)) {
                    membresia = u.tipoMembresia;
                    break;
                }
            }

            var minimos = ['Gratuito', 'Gratuito', 'Platino', 'Platino'];

            for (var elem of ocultables) {
                elem.hidden = true;
                var minimo = minimos[parseInt(elem.id.substring(1)) - 1];
                console.log(minimo);
                if (minimo === 'Gratuito') {
                    elem.hidden = false;
                } else if (
                    minimo !== 'Gratuito' &&
                    (membresia === 'Platino' || membresia === 'Golden')
                ) {
                    elem.hidden = false;
                } else if (minimo === 'Golden' && membresia === 'Golden') {
                    elem.hidden = false;
                }
            }
        });
}

function agregarParametros() {
    if (idUsuario === 0) return;
    var links = document.getElementsByClassName('var-link');
    for (var elem of links) {
        elem.href += '?id=' + params['?id'];
    }
}

ocultarElementos();
ocultarEvaluaciones();
agregarParametros();
