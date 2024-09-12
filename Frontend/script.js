document.addEventListener("DOMContentLoaded", function () {
    // Función para cambiar entre secciones
    window.mostrarSeccion = function (seccionId) {
        const secciones = document.querySelectorAll(".seccion");
        secciones.forEach((seccion) => {
            seccion.style.display = "none";
        });
        document.getElementById(seccionId).style.display = "block";
    };

    // Formulario de registro de paciente
    const formRegistroPaciente = document.getElementById('formRegistroPaciente');
    formRegistroPaciente.addEventListener('submit', function (e) {
        e.preventDefault();  // Evita que el formulario se envíe de manera tradicional

        // Capturamos los valores del formulario
        const paciente = {
            nombre: document.getElementById('nombrePaciente').value,
            edad: document.getElementById('edadPaciente').value,
            sexo: document.getElementById('sexoPaciente').value,
            cedula: document.getElementById('cedulaPaciente').value,
            telefono: document.getElementById('TelefonoPaciente').value,
            nombrePariente: document.getElementById('nombrePariente').value,
            telefonoPariente: document.getElementById('TelefonoPariente').value,
            sintomas: document.getElementById('sintomasPaciente').value,
            internado: false,
            doctores: [],
            medicamentos: []
        };

        console.log(paciente);
        // Enviar los datos al backend usando fetch (nota el puerto actualizado a 3002)
        fetch('http://localhost:3002/api/registro-paciente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paciente),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Paciente registrado:', data);
                alert('Paciente registrado exitosamente');
                formRegistroPaciente.reset();  // Limpiar el formulario
            })
            .catch(error => {
                console.error('Error al registrar el paciente:', error);
                alert('Hubo un error al registrar el paciente.');
            });
    });

    // Función para actualizar el listado de pacientes en las otras secciones
    function actualizarListadoPacientes() {
        fetch('http://localhost:3002/api/pacientes')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data.pacientes)) {
                    const selectInternar = document.getElementById('nombreInternar');
                    const selectDoctor = document.getElementById('nombrePacienteDoctor');
                    const listadoPacientes = document.getElementById('listadoPacientes');

                    // Limpiar los selects y el listado antes de llenarlos
                    selectInternar.innerHTML = '';
                    selectDoctor.innerHTML = '';
                    listadoPacientes.innerHTML = '';

                    data.pacientes.forEach(paciente => {
                        // Para el select de internar
                        const optionInternar = document.createElement('option');
                        optionInternar.value = paciente.nombre;
                        optionInternar.textContent = paciente.nombre;
                        selectInternar.appendChild(optionInternar);

                        // Para el select de registrar doctor/medicamento
                        const optionDoctor = document.createElement('option');
                        optionDoctor.value = paciente.nombre;
                        optionDoctor.textContent = paciente.nombre;
                        selectDoctor.appendChild(optionDoctor);

                        // Para el listado de emergencia
                        const li = document.createElement('li');
                        const estadoInternado = paciente.internado ? 'Sí' : 'No';
                        li.textContent = `${paciente.nombre} - Síntomas: ${paciente.sintomas} - Internado: ${estadoInternado}`;

                        // Mostrar doctores y medicamentos recetados
                        if (paciente.doctores && paciente.doctores.length > 0) {
                            const ulDoctores = document.createElement('ul');
                            paciente.doctores.forEach((doctor, index) => {
                                const liDoctor = document.createElement('li');
                                liDoctor.textContent = `Doctor: ${doctor}, Medicamento: ${paciente.medicamentos[index] || 'No especificado'}`;
                                ulDoctores.appendChild(liDoctor);
                            });
                            li.appendChild(ulDoctores);
                        }

                        listadoPacientes.appendChild(li);
                    });
                } else {
                    console.error('La respuesta del backend no contiene un array de pacientes.');
                }
            })
            .catch(error => {
                console.error('Error al obtener la lista de pacientes:', error);
            });
    }

    actualizarListadoPacientes();

    // Formulario para enviar paciente a internar
    const formEnviarInternar = document.getElementById('formEnviarInternar');
    formEnviarInternar.addEventListener('submit', function (e) {
        e.preventDefault();

        const nombreInternar = document.getElementById('nombreInternar').value;

        fetch(`http://localhost:3002/api/internar-paciente`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre: nombreInternar }),
        })
            .then(response => response.json())
            .then(data => {
                const sintomas = data.paciente.sintomas || 'No especificados';
                const estadoInternado = data.paciente.internado ? 'Sí' : 'No';

                alert(`El paciente ${data.paciente.nombre} ha sido internado.\n` +
                    `Síntomas: ${sintomas}\n` +
                    `Está internado: ${estadoInternado}`);

                actualizarListadoPacientes();  // Actualizar el listado
            })
            .catch(error => {
                console.error('Error al internar paciente:', error);
                alert('Hubo un error al internar al paciente.');
            });
    });

    // Formulario para registrar doctores y medicamentos
    const formRegistroDoctor = document.getElementById('formRegistroDoctor');
    formRegistroDoctor.addEventListener('submit', function (e) {
        e.preventDefault();

        const nombrePacienteDoctor = document.getElementById('nombrePacienteDoctor').value;
        const nombreDoctor = document.getElementById('nombreDoctor').value;
        const medicamentoRecetado = document.getElementById('medicamentoRecetado').value;

        const doctorMedicamento = {
            doctor: nombreDoctor,
            medicamento: medicamentoRecetado
        };

        fetch(`http://localhost:3002/api/registrar-doctor`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombrePaciente: nombrePacienteDoctor,
                nombreDoctor,
                medicamentoRecetado
            }),
        })
            .then(response => response.json())
            .then(data => {
                alert(`Doctor y medicamento registrado para el paciente ${data.paciente.nombre}.`);
                formRegistroDoctor.reset();  // Limpiar el formulario
            })
            .catch(error => {
                console.error('Error al registrar el doctor y medicamento:', error);
                alert('Hubo un error al registrar el doctor y medicamento.');
            });
    });
});
document.getElementById('cedulaPaciente').addEventListener('input', function (event) {
    let input = event.target;
    let value = input.value.replace(/\D/g, ''); // Quitar todos los caracteres no numéricos

    // Limitar la longitud del valor a 11 dígitos
    if (value.length > 11) {
        value = value.substring(0, 11);
    }

    // Formatear el valor
    let formattedValue = value
        .replace(/(\d{3})(\d{0,7})/, '$1-$2')  // Primer grupo de 3 dígitos y segundo grupo de 7 dígitos
        .replace(/(\d{7})(\d{0,1})/, '$1-$2'); // Segundo grupo de 7 dígitos y dígito final

    input.value = formattedValue;
});

function guion(input) {
    let value = input.value.replace(/\D/g, ''); // Quitar todos los caracteres no numéricos

    // Limitar la longitud del valor a 10 dígitos
    if (value.length > 10) {
        value = value.substring(0, 10);
    }

    // Formatear el valor
    let formattedValue = value
        .replace(/(\d{3})(\d{0,3})/, '($1) $2')  // Primer grupo de 3 dígitos y segundo grupo de 7 dígitos
        .replace(/(\d{3})(\d{3,4})/, '$1-$2'); // Segundo grupo de 7 dígitos y dígito final

    input.value = formattedValue;
};
document.getElementById('TelefonoPariente').addEventListener('input', function (event) {
    let input = event.target;
    guion(input)
})
document.getElementById('TelefonoPaciente').addEventListener('input', function (event) {
    let input = event.target;
    guion(input)
})