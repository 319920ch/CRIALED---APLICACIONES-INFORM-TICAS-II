CREATE TABLE AREA (
  id_area SERIAL PRIMARY KEY,
  nombre_area VARCHAR(255) NOT NULL
);

CREATE TABLE ESTADO (
  id_estado  SERIAL PRIMARY KEY,
  estado VARCHAR(20) NOT NULL
);

CREATE TABLE DESEMPENO (
  id_desempeno SERIAL PRIMARY KEY,
  id_area INT NOT NULL,
  tiempo_desempeno INT NOT NULL,
  puntuacion_desempeno DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (id_area) REFERENCES AREA(id_area)
);

CREATE TABLE EMPLEADO (
  id_empleado SERIAL PRIMARY KEY,
  nombres VARCHAR(255) NOT NULL,
  apellidos VARCHAR(255) NOT NULL,
  cedula VARCHAR(10) NOT NULL,
  tiempo_exp_general INT NOT NULL,
  numero_contacto VARCHAR(255) NOT NULL,
  id_desempeno INT NOT NULL,
  FOREIGN KEY (id_desempeno) REFERENCES DESEMPENO(id_desempeno)
);

CREATE TABLE CONTRATO (
  id_contrato SERIAL PRIMARY KEY,
  cliente VARCHAR(100) NOT NULL,
  fecha_inicio DATE NOT NULL,
  fecha_fin DATE NOT NULL,
  presupuesto DECIMAL(10,2) NOT NULL,
  id_estado INT NOT NULL,
  FOREIGN KEY (id_estado) REFERENCES ESTADO(id_estado)
);

CREATE TABLE PROYECTO (
  id_proyecto SERIAL PRIMARY KEY,
  id_contrato INT NOT NULL,
  nombre_proyecto VARCHAR(255) NOT NULL,
  fecha_inicio DATE NOT NULL,
  fecha_fin DATE NOT NULL,
  id_estado INT NOT NULL,
  FOREIGN KEY (id_contrato) REFERENCES CONTRATO(id_contrato),
  FOREIGN KEY (id_estado) REFERENCES ESTADO(id_estado)
);

CREATE TABLE PRESUPUESTO (
  id_presupuesto SERIAL PRIMARY KEY,
  id_contrato INT NOT NULL,
  id_area INT NOT NULL,
  monto DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (id_contrato) REFERENCES CONTRATO(id_contrato),
  FOREIGN KEY (id_area) REFERENCES AREA(id_area)
);

CREATE TABLE ROL (
  id_rol SERIAL PRIMARY KEY,
  nombre_rol VARCHAR(50) NOT NULL
);

CREATE TABLE USUARIO (
  nombre VARCHAR(200) PRIMARY KEY,
  correo_electronico VARCHAR(255) NOT NULL,
  contrasena VARCHAR(255) NOT NULL,
  id_rol INT NOT NULL,
  FOREIGN KEY (id_rol) REFERENCES ROL(id_rol)
);

CREATE TABLE TAREA (
  id_tarea SERIAL PRIMARY KEY,
  id_proyecto INT NOT NULL,
  id_area INT NOT NULL,
  fecha_inicio DATE NOT NULL,
  fecha_fin DATE NOT NULL,
  monto DECIMAL(10,2) NOT NULL, 
  id_estado INT NOT NULL,
  cant_necesaria INT NOT NULL,
  FOREIGN KEY (id_proyecto) REFERENCES PROYECTO(id_proyecto),
  FOREIGN KEY (id_area) REFERENCES AREA(id_area),
  FOREIGN KEY (id_estado) REFERENCES ESTADO(id_estado)
);

CREATE TABLE ASIGNACION (
  id_asignacion SERIAL PRIMARY KEY,
  nombre VARCHAR(200) NOT NULL,
  id_tarea INT NOT NULL,
  FOREIGN KEY (nombre) REFERENCES USUARIO(nombre),
  FOREIGN KEY (id_tarea) REFERENCES TAREA(id_tarea)
);
