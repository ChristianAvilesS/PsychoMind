function llenarTablaCitas() {
	fetch('/public/assets/data/citas.json')
		.then((response) => response.json())
		.then((value) => {
			const tbody = document.getElementById('tbody');
			var contador = 1;
			for (var cita of value) {
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
		});
}

llenarTablaCitas();