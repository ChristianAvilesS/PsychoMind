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

function llenarTablaCitas() {
    if (idUsuario === 0) return;
    fetch('/public/assets/data/citas.json')
        .then((response) => response.json())
        .then((value) => {
            const tbody = document.getElementById('tbody');
            var contador = 1;
            for (var cita of value) {
                if (idUsuario !== cita.idUsuario) continue;
                let tr = document.createElement('tr');
                let th = document.createElement('th');
                th.innerHTML = contador.toString();
                th.scope = 'row';
                let td1 = document.createElement('td');
                td1.innerHTML = cita.paciente;
                let td2 = document.createElement('td');
                td2.innerHTML = cita.especialista;
                let td3 = document.createElement('td');
                td3.innerHTML = cita.fecha;
                let td4 = document.createElement('td');
                td4.innerHTML = cita.hora;
                tr.append(th);
                tr.append(td1);
                tr.append(td2);
                tr.append(td3);
                tr.append(td4);
                contador += 1;
                tbody.append(tr);
            }
            if (Object.keys(params2).length > 1) {
                let tr = document.createElement('tr');
                let th = document.createElement('th');
                th.innerHTML = contador.toString();
                th.scope = 'row';
                let td1 = document.createElement('td');
                td1.innerHTML = params2['paciente'].replaceAll("+", " ");
                let td2 = document.createElement('td');
                td2.innerHTML = params2['especialista'].replaceAll("+", " ");
                let td3 = document.createElement('td');

                let horarioParam = params2['horario'].replace("+", " ").split(" ");

                td3.innerHTML = horarioParam[0];
                let td4 = document.createElement('td');
                td4.innerHTML = horarioParam[1].replaceAll("+", " ");;
                tr.append(th);
                tr.append(td1);
                tr.append(td2);
                tr.append(td3);
                tr.append(td4);
                tbody.append(tr);
            }
        });
}

llenarTablaCitas();
