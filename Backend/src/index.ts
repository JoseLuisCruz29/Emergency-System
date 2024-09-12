import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import cors from 'cors';
import path from 'path';

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Ruta del archivo JSON
const filePath = path.join(__dirname, 'pacientes.json');

// Leer el archivo JSON
function leerPacientesDesdeArchivo(): Paciente[] {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error al leer el archivo:', error);
        return [];
    }
}

// Escribir en el archivo JSON
function escribirPacientesEnArchivo(pacientes: Paciente[]): void {
    try {
        fs.writeFileSync(filePath, JSON.stringify(pacientes, null, 2));
    } catch (error) {
        console.error('Error al escribir en el archivo:', error);
    }
}

interface Paciente {
    nombre: string;
    edad: number;
    sintomas: string;
    internado: boolean;
    doctores: string[];
    medicamentos: string[];
}

// Cargar pacientes desde el archivo al iniciar
let pacientes: Paciente[] = leerPacientesDesdeArchivo();

// Registro de paciente
app.post('/api/registro-paciente', (req: Request, res: Response) => {
    const { nombre, edad, sintomas } = req.body;
    const nuevoPaciente: Paciente = { nombre, edad, sintomas, internado: false, doctores: [], medicamentos: [] };
    pacientes.push(nuevoPaciente);

    // Guardar el nuevo estado en el archivo JSON
    escribirPacientesEnArchivo(pacientes);

    res.status(201).json({ message: 'Paciente registrado exitosamente', paciente: nuevoPaciente });
});

// Internar paciente
app.post('/api/internar-paciente', (req: Request, res: Response) => {
    const { nombre } = req.body;
    const paciente = pacientes.find(p => p.nombre === nombre);
    if (paciente) {
        paciente.internado = true;

        // Guardar el nuevo estado en el archivo JSON
        escribirPacientesEnArchivo(pacientes);

        res.status(200).json({ message: `${nombre} ha sido internado`, paciente });
    } else {
        res.status(404).json({ message: 'Paciente no encontrado' });
    }
});

// Registrar doctor y medicamento
app.post('/api/registrar-doctor', (req: Request, res: Response) => {
    const { nombrePaciente, nombreDoctor, medicamentoRecetado } = req.body;
    const paciente = pacientes.find(p => p.nombre === nombrePaciente);
    if (paciente) {
        paciente.doctores.push(nombreDoctor);
        paciente.medicamentos.push(medicamentoRecetado);

        // Verificar lo que se está almacenando
        console.log(`Doctores: ${paciente.doctores}, Medicamentos: ${paciente.medicamentos}`);

        escribirPacientesEnArchivo(pacientes);

        res.status(200).json({ message: `Doctor y medicamento registrados para ${nombrePaciente}`, paciente });
    } else {
        res.status(404).json({ message: 'Paciente no encontrado' });
    }
});


// Obtener listado de pacientes
app.get('/api/pacientes', (req: Request, res: Response) => {
    res.status(200).json({ pacientes });
});

// Ruta para servir el frontend
app.use(express.static('Frontend'));
app.use(express.static(path.join(__dirname, 'Frontend', '/')));

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
