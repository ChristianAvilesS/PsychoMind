function redireccionarA(src, params) {
    var esPrimerParam = true;
    var anchor = document.createElement('a');
    var dir = src;
    for (var key in params) {
        if (esPrimerParam) {
            dir += "?";
            esPrimerParam = false;
        }
        else {
            dir += "&";
        }
        dir += key + "=" + params[key];
    }

    anchor.href = dir;
    console.log(dir);
    anchor.click();
}

function ingresoUsuario() {
    fetch('public/assets/javascript/data/usuarios.json')
        .then((response) => response.json())
        .then((value) => {
            const correoAct = document.getElementById('correo').value;
            const password = document.getElementById('password').value;
            let id = 0;
            let esValido = false;
            for (var usuario of value) {
                if (usuario.correo === correoAct && usuario.password === password) {
                    esValido = true;
                    id = usuario.idUsuario;
                    break;
                }
            }

            if (!esValido) {
                alert('No hay un usuario registrado con ese correo, vuelva a intentarlo');
                return;
            }

            redireccionarA('index.html', { id: id.toString() });
        });
}

function iniciarSesion() {
    ingresoUsuario();
}
