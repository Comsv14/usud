CREATE DATABASE IF NOT EXISTS diabetesdb;
USE diabetesdb;

/* Tabla USUARIO */
CREATE TABLE USUARIO (
  id_usu INT NOT NULL AUTO_INCREMENT,
  fecha_nacimiento DATE NOT NULL,
  nombre VARCHAR(25) NOT NULL,
  apellidos VARCHAR(25) NOT NULL,
  usuario VARCHAR(25) NOT NULL,
  contra VARCHAR(255) NOT NULL,  
  rol ENUM('usuario', 'admin') NOT NULL,  
  PRIMARY KEY (id_usu)
);

/* Tabla CONTROL_GLUCOSA */
CREATE TABLE CONTROL_GLUCOSA (
  fecha DATE NOT NULL,
  deporte INT NOT NULL,
  lenta INT NOT NULL,
  id_usu INT NOT NULL,
  PRIMARY KEY (fecha, id_usu),
  FOREIGN KEY (id_usu) REFERENCES USUARIO(id_usu)
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);
CREATE INDEX idx_fecha_id_usu ON CONTROL_GLUCOSA(fecha, id_usu);

/* Tabla COMIDA */
CREATE TABLE COMIDA (
  id_comida INT NOT NULL AUTO_INCREMENT,
  tipo_comida VARCHAR(30) NOT NULL,
  gl_1h INT NOT NULL,
  gl_2h INT NOT NULL,
  raciones INT NOT NULL,
  insulina INT NOT NULL,
  fecha DATE NOT NULL,
  id_usu INT NOT NULL,
  -- Columna generada: se convierte la fecha automáticamente al formato 'YYYY-MM-DD'
  fecha_comida VARCHAR(50) AS (CONCAT(fecha, '-', tipo_comida)) STORED,
  PRIMARY KEY (id_comida),
  UNIQUE KEY idx_comida_fecha_comida_id (fecha_comida, id_usu),
  FOREIGN KEY (id_usu) REFERENCES USUARIO(id_usu),
  FOREIGN KEY (fecha, id_usu) REFERENCES CONTROL_GLUCOSA(fecha, id_usu)
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

/* Tabla HIPERGLUCEMIA */
CREATE TABLE HIPERGLUCEMIA (
  id_hiper INT NOT NULL AUTO_INCREMENT,
  glucosa INT NOT NULL,
  hora TIME NOT NULL,
  correccion INT NOT NULL,
  tipo_comida VARCHAR(30) NOT NULL,
  fecha DATE NOT NULL,
  id_usu INT NOT NULL,
  fecha_comida VARCHAR(50) AS (CONCAT(fecha, '-', tipo_comida)) STORED,
  PRIMARY KEY (id_hiper),
  UNIQUE KEY uniq_hiper_fecha_comida (fecha_comida, id_usu),
  FOREIGN KEY (fecha_comida, id_usu) REFERENCES COMIDA(fecha_comida, id_usu)
    ON DELETE CASCADE
);

/* Tabla HIPOGLUCEMIA */
CREATE TABLE HIPOGLUCEMIA (
  id_hipo INT NOT NULL AUTO_INCREMENT,
  glucosa INT NOT NULL,
  hora TIME NOT NULL,
  tipo_comida VARCHAR(30) NOT NULL,
  fecha DATE NOT NULL,
  id_usu INT NOT NULL,
  fecha_comida VARCHAR(50) AS (CONCAT(fecha, '-', tipo_comida)) STORED,
  PRIMARY KEY (id_hipo),
  UNIQUE KEY uniq_hipo_fecha_comida (fecha_comida, id_usu),
  FOREIGN KEY (fecha_comida, id_usu) REFERENCES COMIDA(fecha_comida, id_usu)
    ON DELETE CASCADE
);
