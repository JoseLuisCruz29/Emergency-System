# Sistema de Registro de Pacientes para Emergencias

Este proyecto es un sistema de gestión para pacientes en emergencias médicas. Permite registrar pacientes, enviar pacientes a internamiento, listar emergencias y registrar información sobre doctores y medicamentos recetados. A continuación, se describen los módulos y las funcionalidades del sistema.

## Módulos del Sistema

### 1. Registro de Paciente para Emergencia

**Descripción:** Este módulo permite registrar a un paciente que llega a una sala de emergencias, capturando información esencial para su tratamiento.

**Campos del Formulario:**
- **Nombre Completo:** Nombre y apellido del paciente.
- **Sexo:** Género del paciente (Masculino, Femenino, Otro).
- **Cédula de Identidad:** Número de identificación del paciente.
- **Teléfono:** Número de contacto del paciente.
- **Fecha y Hora de Llegada:** Momento en el que el paciente llegó a la emergencia.
- **Descripción de la Emergencia:** Breve descripción del motivo de la visita.

**Funcionalidades:**
- Validación de datos obligatorios.
- Verificación de datos duplicados.
- Confirmación de registro exitoso.

### 2. Enviar a Internar

**Descripción:** Permite enviar al paciente a una habitación de internamiento si es necesario, después de su evaluación inicial.

**Campos del Formulario:**
- **Número de Sala:** Identificador de la sala a la que será enviado el paciente.
- **Tipo de Internamiento:** Opciones como "Urgente", "No Urgente", etc.
- **Nombre del Médico Responsable:** Nombre del médico encargado del internamiento.

**Funcionalidades:**
- Asignación automática de sala disponible.
- Actualización del estado del paciente a "Internado".
- Notificación al personal médico sobre el internamiento.

### 3. Listado de Emergencia

**Descripción:** Muestra una lista de todos los pacientes en la emergencia y su estado actual, facilitando el seguimiento y la gestión.

**Campos del Listado:**
- **Nombre Completo:** Nombre del paciente.
- **Fecha y Hora de Llegada:** Momento en que el paciente llegó.
- **Descripción de la Emergencia:** Motivo de la visita.
- **Estado Actual:** Por ejemplo, "En Espera", "En Tratamiento", "Internado".

**Funcionalidades:**
- Filtro por estado y fecha.
- Ordenación por nombre, fecha de llegada, etc.
- Búsqueda rápida por nombre o número de cédula.

### 4. Registro de Doctores que lo Vieron y Medicamentos Recetados

**Descripción:** Permite registrar la información de los doctores que atendieron al paciente y los medicamentos recetados.

**Campos del Formulario:**
- **Nombre del Doctor:** Nombre completo del médico.
- **Especialidad:** Especialidad médica del doctor.
- **Medicamentos Recetados:** Lista de medicamentos con dosis y frecuencia.
- **Fecha de Prescripción:** Fecha en que se realizó la prescripción.

**Funcionalidades:**
- Registro detallado de cada doctor involucrado en el tratamiento.
- Listado y seguimiento de medicamentos recetados.
- Informe de historial de tratamientos.

## Requisitos del Sistema

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Base de Datos:** MongoDB (o cualquier otra base de datos de su elección)
- **Autenticación:** Sistema de autenticación para acceso a diferentes módulos.

## Instalación y Configuración

1. **Clonar el Repositorio:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
  
