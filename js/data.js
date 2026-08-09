// CONFIGURACIÓN GLOBAL
const CONFIG = {
  nombreEscuela: "Escuela DyH N° 370",
  semana: "10 al 14 de Agosto de 2026",
  tiempoTraslado: 20,
  barrios: ['Centro', 'Km 3', 'Km 5', 'Km 8', 'Km 12', 'Km 17', 'Prospero Palazzo', 'Standard Norte', 'Ciudadela', 'Laprida', 'Diadema', 'Valle C', 'Sede', 'Gesta De Malvinas', 'Las Orquideas', 'Presidente Ortiz', 'Don Bosco']
};

const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

// DATOS INICIALES (VERSION 28 - LAGOS SILVIA SCHEDULE)
const DEFAULT_DATA = {
  "config": {
    "nombreEscuela": "Escuela DyH N° 370",
    "semana": "10 al 14 de Agosto de 2026",
    "tiempoTraslado": 20,
    "barrios": [
      "Diadema",
      "Laprida",
      "Próspero Palazzo",
      "Valle C",
      "KM 5",
      "Moreno",
      "Ara San Juan",
      "Standard Norte",
      "Km 3",
      "Km 8",
      "Rada Tilly",
      "Centro",
      "Restinga Alí",
      "Don Bosco"
    ]
  },
  "docentes": [
    {
      "id": "d26",
      "nombre": "AYBAR SEBASTIAN DARIO",
      "cuil": "20281983661",
      "dni": "28198366",
      "email": "kernel7@hotmail.com",
      "materia": "COORDINADOR DOMICILIARIO",
      "status": "",
      "nivel": "Secundaria",
      "jornada": {
        "Lunes": {
          "i": "13:20",
          "f": "16:40"
        },
        "Miércoles": {
          "i": "13:20",
          "f": "14:40"
        },
        "Viernes": {
          "i": "13:20",
          "f": "16:40"
        }
      }
    },
    {
      "id": "d30",
      "nombre": "LAGOS SILVIA DEL CARMEN",
      "materia": "LENGUA Y LITERATURA",
      "cuil": "27293426770",
      "dni": "29342677",
      "email": "silviadclagos@gmail.com",
      "color": "#6366f1",
      "nivel": "Secundaria",
      "jornada": {
        "Martes": {
          "i": "14:40",
          "f": "18:00"
        },
        "Miércoles": {
          "i": "14:40",
          "f": "18:00"
        },
        "Jueves": {
          "i": "14:40",
          "f": "18:00"
        }
      }
    },
    {
      "id": "d18",
      "nombre": "VENTER RICARDO ENRIQUE",
      "materia": "P.O.T. SECUNDARIA",
      "cuil": "20239915389",
      "dni": "23991538",
      "email": "ricardoventer@hotmail.com",
      "color": "#8b5cf6",
      "nivel": "Secundaria",
      "jornada": {
        "Lunes": {
          "i": "13:20",
          "f": "17:20"
        },
        "Martes": {
          "i": "13:20",
          "f": "17:20"
        },
        "Miércoles": {
          "i": "13:20",
          "f": "17:20"
        },
        "Jueves": {
          "i": "13:20",
          "f": "17:20"
        },
        "Viernes": {
          "i": "13:20",
          "f": "17:20"
        }
      }
    },
    {
      "id": "d15",
      "nombre": "TORANZOS PABLO IVÁN",
      "materia": "MATEMÁTICA",
      "cuil": "20288199257",
      "dni": "28819925",
      "email": "pablotoranzo_02@hotmail.com",
      "color": "#10b981",
      "nivel": "Secundaria",
      "jornada": {
        "Lunes": {
          "i": "14:00",
          "f": "17:20"
        },
        "Martes": {
          "i": "14:00",
          "f": "17:20"
        },
        "Miércoles": {
          "i": "14:00",
          "f": "17:20"
        },
        "Jueves": {
          "i": "14:00",
          "f": "17:20"
        }
      }
    },
    {
      "id": "d17",
      "nombre": "CUENCA ANA KALINKA",
      "materia": "CS. SOCIALES / PROBL. ACTUAL",
      "cuil": "27319233739",
      "dni": "31923373",
      "email": "anakalinkacuenca@gmail.com",
      "color": "#ec4899",
      "nivel": "Secundaria",
      "jornada": {
        "Lunes": {
          "i": "13:20",
          "f": "16:40"
        },
        "Martes": {
          "i": "13:20",
          "f": "16:40"
        },
        "Miércoles": {
          "i": "13:20",
          "f": "16:40"
        },
        "Viernes": {
          "i": "13:20",
          "f": "16:40"
        }
      }
    },
    {
      "id": "d14",
      "nombre": "BULACIOS VANINA ALEJANDRA",
      "materia": "CS. NATURALES / BIOLOGÍA",
      "cuil": "27367191355",
      "dni": "36719135",
      "email": "vaninabulacios@gmail.com",
      "color": "#6366f1",
      "nivel": "Secundaria",
      "jornada": {
        "Lunes": {
          "i": "15:20",
          "f": "17:20"
        },
        "Martes": {
          "i": "14:00",
          "f": "17:20"
        },
        "Miércoles": {
          "i": "14:00",
          "f": "15:20"
        },
        "Jueves": {
          "i": "14:00",
          "f": "17:20"
        },
        "Viernes": {
          "i": "14:00",
          "f": "17:20"
        }
      }
    },
    {
      "id": "d16",
      "nombre": "GALVÁN ESTRELLA MAXIMILIANO GONZALO",
      "materia": "INGLÉS",
      "cuil": "20351717115",
      "dni": "35171711",
      "email": "maxi.galvan.estrella@gmail.com",
      "color": "#f59e0b",
      "nivel": "Secundaria",
      "jornada": {
        "Lunes": {
          "i": "14:00",
          "f": "16:40"
        },
        "Miércoles": {
          "i": "14:00",
          "f": "16:40"
        },
        "Jueves": {
          "i": "14:00",
          "f": "16:40"
        },
        "Viernes": {
          "i": "14:00",
          "f": "16:40"
        }
      }
    },
    {
      "id": "d19",
      "nombre": "GONZALEZ KARINA DEL VALLE",
      "materia": "EDUCACIÓN TECNOLÓGICA",
      "cuil": "27319188946",
      "dni": "31918894",
      "email": "karinagonzalez577@hotmail.com",
      "color": "#3b82f6",
      "nivel": "Secundaria",
      "jornada": {
        "Jueves": {
          "i": "13:20",
          "f": "17:20"
        },
        "Viernes": {
          "i": "13:20",
          "f": "17:20"
        }
      }
    }
  ],
  "estudiantes": [
    {
      "id": "e17",
      "nombre": "CASTRO LUCAS ALEJANDRO",
      "nivel": "Secundaria",
      "barrio": "Laprida",
      "escuelaOrigen": "N° 757",
      "grado": "6° Año",
      "estado": "Activo",
      "certificadoVence": "2026-12-20"
    },
    {
      "id": "e18",
      "nombre": "PEREZ CAROLINA GISELLE",
      "nivel": "Secundaria",
      "barrio": "KM 5",
      "escuelaOrigen": "N° 7702",
      "grado": "5° Año",
      "estado": "Activo",
      "certificadoVence": "2026-10-30"
    },
    {
      "id": "e14",
      "nombre": "VIDAL AGUSTÍN IGNACIO",
      "nivel": "Secundaria",
      "barrio": "Próspero Palazzo",
      "escuelaOrigen": "N° 722",
      "grado": "4° Año",
      "estado": "Activo",
      "certificadoVence": "2026-12-20"
    },
    {
      "id": "e13",
      "nombre": "GONZALEZ MAZA MURIEL",
      "nivel": "Secundaria",
      "barrio": "Laprida",
      "escuelaOrigen": "N° 7702",
      "grado": "5° Año",
      "estado": "Activo",
      "certificadoVence": "2026-09-28"
    },
    {
      "id": "e22",
      "nombre": "CASTILLO CHABRUX IGNACIO",
      "nivel": "Secundaria",
      "barrio": "Centro",
      "escuelaOrigen": "N° 711",
      "grado": "3° Año",
      "estado": "Activo",
      "certificadoVence": "2026-11-15"
    },
    {
      "id": "e23",
      "nombre": "QUIROGA JUAN BAUTISTA",
      "nivel": "Secundaria",
      "barrio": "Km 3",
      "escuelaOrigen: ": "N° 704",
      "escuelaOrigen": "N° 704",
      "grado": "2° Año",
      "estado": "Activo",
      "certificadoVence": "2026-10-15"
    },
    {
      "id": "e24",
      "nombre": "ARROYO CUSSE ALDANA YAMILA DEL VALLE",
      "nivel": "Secundaria",
      "barrio": "Diadema",
      "escuelaOrigen": "N° 732",
      "grado": "6° Año",
      "estado": "Activo",
      "certificadoVence": "2026-11-30"
    },
    {
      "id": "e25",
      "nombre": "DIAZ THORP VICTORIA ANGELINA",
      "nivel": "Secundaria",
      "barrio": "Standard Norte",
      "escuelaOrigen": "N° 796",
      "grado": "1° Año",
      "estado": "Activo",
      "certificadoVence": "2026-09-30"
    },
    {
      "id": "e26",
      "nombre": "TOLEDO LOLA",
      "nivel": "Secundaria",
      "barrio": "Valle C",
      "escuelaOrigen": "N° 757",
      "grado": "4° Año",
      "estado": "Activo",
      "certificadoVence": "2026-11-20"
    },
    {
      "id": "e27",
      "nombre": "PEREZ LOPEZ JAIRO CRISTIANO",
      "nivel": "Secundaria",
      "barrio": "Moreno",
      "escuelaOrigen": "N° 707",
      "grado": "2° Año",
      "estado": "Activo",
      "certificadoVence": "2026-10-15"
    },
    {
      "id": "e28",
      "nombre": "CORTES AARON TIZIANO",
      "nivel": "Secundaria",
      "barrio": "Km 8",
      "escuelaOrigen": "N° 711",
      "grado": "3° Año",
      "estado": "En Espera",
      "fechaRemision": "2026-08-05",
      "fechaCertificado": "2026-08-01",
      "diasCobertura": 45,
      "certificadoVence": "2026-09-15"
    },
    {
      "id": "e29",
      "nombre": "CORZO TOMÁS JESÚS",
      "nivel": "Secundaria",
      "barrio": "Km 5",
      "escuelaOrigen": "N° 7729",
      "grado": "2° Año",
      "estado": "Activo",
      "certificadoVence": "2026-10-20"
    },
    {
      "id": "ew1",
      "nombre": "MENDOZA FACUNDO",
      "nivel": "Secundaria",
      "barrio": "Standard Norte",
      "escuelaOrigen": "N° 770",
      "grado": "4° Año",
      "estado": "En Espera",
      "fechaRemision": "2026-08-04",
      "fechaCertificado": "2026-08-01",
      "diasCobertura": 45,
      "certificadoVence": "2026-09-15"
    },
    {
      "id": "e30",
      "nombre": "MIRANDA LIAN",
      "nivel": "Secundaria",
      "barrio": "Centro",
      "escuelaOrigen": "N° 704",
      "grado": "2° Año",
      "estado": "Activo",
      "certificadoVence": "2026-10-30"
    }
  ],
  "asignaciones": [
    {
      "id": "as_d30_Lunes_1",
      "docenteId": "d30",
      "estudianteId": "e18",
      "dia": "Lunes",
      "horaInicio": "14:40",
      "horaFin": "15:40",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d30_Lunes_2",
      "docenteId": "d30",
      "estudianteId": "e14",
      "dia": "Lunes",
      "horaInicio": "15:50",
      "horaFin": "16:50",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d30_Lunes_3",
      "docenteId": "d30",
      "estudianteId": "e13",
      "dia": "Lunes",
      "horaInicio": "17:00",
      "horaFin": "18:00",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d30_Miercoles_1",
      "docenteId": "d30",
      "estudianteId": "e23",
      "dia": "Miércoles",
      "horaInicio": "15:30",
      "horaFin": "16:30",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d30_Miercoles_2",
      "docenteId": "d30",
      "estudianteId": "e22",
      "dia": "Miércoles",
      "horaInicio": "16:50",
      "horaFin": "18:00",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d30_Jueves_1",
      "docenteId": "d30",
      "estudianteId": "e24",
      "dia": "Jueves",
      "horaInicio": "14:40",
      "horaFin": "15:50",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d30_Jueves_2",
      "docenteId": "d30",
      "estudianteId": "e17",
      "dia": "Jueves",
      "horaInicio": "16:20",
      "horaFin": "17:40",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d18_Lunes_1",
      "docenteId": "d18",
      "estudianteId": "e27",
      "dia": "Lunes",
      "horaInicio": "13:20",
      "horaFin": "14:20",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d18_Miercoles_1",
      "docenteId": "d18",
      "estudianteId": "e13",
      "dia": "Miércoles",
      "horaInicio": "13:20",
      "horaFin": "14:20",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d18_Viernes_1",
      "docenteId": "d18",
      "estudianteId": "e18",
      "dia": "Viernes",
      "horaInicio": "13:20",
      "horaFin": "14:20",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d18_Viernes_2",
      "docenteId": "d18",
      "estudianteId": "e23",
      "dia": "Viernes",
      "horaInicio": "14:20",
      "horaFin": "15:20",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d18_Viernes_3",
      "docenteId": "d18",
      "estudianteId": "e17",
      "dia": "Viernes",
      "horaInicio": "15:20",
      "horaFin": "16:20",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d18_Viernes_4",
      "docenteId": "d18",
      "estudianteId": "e14",
      "dia": "Viernes",
      "horaInicio": "16:20",
      "horaFin": "17:20",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d15_Lunes_1",
      "docenteId": "d15",
      "estudianteId": "e18",
      "dia": "Lunes",
      "horaInicio": "14:00",
      "horaFin": "15:20",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d15_Lunes_2",
      "docenteId": "d15",
      "estudianteId": "e22",
      "dia": "Lunes",
      "horaInicio": "15:50",
      "horaFin": "17:20",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d15_Miercoles_1",
      "docenteId": "d15",
      "estudianteId": "e27",
      "dia": "Miércoles",
      "horaInicio": "14:00",
      "horaFin": "15:30",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d15_Miercoles_2",
      "docenteId": "d15",
      "estudianteId": "e29",
      "dia": "Miércoles",
      "horaInicio": "16:00",
      "horaFin": "17:20",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d15_Jueves_1",
      "docenteId": "d15",
      "estudianteId": "e14",
      "dia": "Jueves",
      "horaInicio": "14:00",
      "horaFin": "14:50",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d15_Jueves_2",
      "docenteId": "d15",
      "estudianteId": "e13",
      "dia": "Jueves",
      "horaInicio": "14:50",
      "horaFin": "15:40",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d15_Jueves_3",
      "docenteId": "d15",
      "estudianteId": "e23",
      "dia": "Jueves",
      "horaInicio": "15:40",
      "horaFin": "16:30",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d15_Jueves_4",
      "docenteId": "d15",
      "estudianteId": "e17",
      "dia": "Jueves",
      "horaInicio": "16:30",
      "horaFin": "17:20",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d17_Lunes_1",
      "docenteId": "d17",
      "estudianteId": "e26",
      "dia": "Lunes",
      "horaInicio": "13:20",
      "horaFin": "15:20",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d17_Lunes_2",
      "docenteId": "d17",
      "estudianteId": "e18",
      "dia": "Lunes",
      "horaInicio": "15:40",
      "horaFin": "16:40",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d17_Martes_1",
      "docenteId": "d17",
      "estudianteId": "e14",
      "dia": "Martes",
      "horaInicio": "13:20",
      "horaFin": "14:20",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d17_Martes_2",
      "docenteId": "d17",
      "estudianteId": "e13",
      "dia": "Martes",
      "horaInicio": "14:30",
      "horaFin": "15:30",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d17_Martes_3",
      "docenteId": "d17",
      "estudianteId": "e23",
      "dia": "Martes",
      "horaInicio": "15:40",
      "horaFin": "16:40",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d17_Miercoles_1",
      "docenteId": "d17",
      "estudianteId": "e22",
      "dia": "Miércoles",
      "horaInicio": "13:20",
      "horaFin": "15:00",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d17_Miercoles_2",
      "docenteId": "d17",
      "estudianteId": "e25",
      "dia": "Miércoles",
      "horaInicio": "15:40",
      "horaFin": "16:20",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d17_Viernes_1",
      "docenteId": "d17",
      "estudianteId": "e17",
      "dia": "Viernes",
      "horaInicio": "13:20",
      "horaFin": "14:40",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d17_Viernes_2",
      "docenteId": "d17",
      "estudianteId": "e24",
      "dia": "Viernes",
      "horaInicio": "15:00",
      "horaFin": "16:40",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d14_Lunes_1",
      "docenteId": "d14",
      "estudianteId": "e26",
      "dia": "Lunes",
      "horaInicio": "15:30",
      "horaFin": "17:20",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d14_Martes_1",
      "docenteId": "d14",
      "estudianteId": "e18",
      "dia": "Martes",
      "horaInicio": "14:00",
      "horaFin": "15:20",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d14_Martes_2",
      "docenteId": "d14",
      "estudianteId": "e22",
      "dia": "Martes",
      "horaInicio": "15:50",
      "horaFin": "17:20",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d14_Miercoles_1",
      "docenteId": "d14",
      "estudianteId": "e18",
      "dia": "Miércoles",
      "horaInicio": "14:00",
      "horaFin": "15:20",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d14_Jueves_1",
      "docenteId": "d14",
      "estudianteId": "e17",
      "dia": "Jueves",
      "horaInicio": "14:00",
      "horaFin": "15:40",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d14_Jueves_2",
      "docenteId": "d14",
      "estudianteId": "e24",
      "dia": "Jueves",
      "horaInicio": "16:00",
      "horaFin": "17:20",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d14_Viernes_1",
      "docenteId": "d14",
      "estudianteId": "e13",
      "dia": "Viernes",
      "horaInicio": "14:00",
      "horaFin": "15:00",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d14_Viernes_2",
      "docenteId": "d14",
      "estudianteId": "e14",
      "dia": "Viernes",
      "horaInicio": "15:10",
      "horaFin": "16:10",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d14_Viernes_3",
      "docenteId": "d14",
      "estudianteId": "e18",
      "dia": "Viernes",
      "horaInicio": "16:20",
      "horaFin": "17:20",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d16_Lunes_1",
      "docenteId": "d16",
      "estudianteId": "e14",
      "dia": "Lunes",
      "horaInicio": "14:00",
      "horaFin": "14:50",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d16_Lunes_2",
      "docenteId": "d16",
      "estudianteId": "e13",
      "dia": "Lunes",
      "horaInicio": "14:50",
      "horaFin": "15:40",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d16_Lunes_3",
      "docenteId": "d16",
      "estudianteId": "e23",
      "dia": "Lunes",
      "horaInicio": "15:40",
      "horaFin": "16:40",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d16_Miercoles_1",
      "docenteId": "d16",
      "estudianteId": "e26",
      "dia": "Miércoles",
      "horaInicio": "14:00",
      "horaFin": "15:10",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d16_Miercoles_2",
      "docenteId": "d16",
      "estudianteId": "e22",
      "dia": "Miércoles",
      "horaInicio": "15:40",
      "horaFin": "16:40",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d16_Jueves_1",
      "docenteId": "d16",
      "estudianteId": "e18",
      "dia": "Jueves",
      "horaInicio": "14:00",
      "horaFin": "15:10",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d16_Jueves_2",
      "docenteId": "d16",
      "estudianteId": "e25",
      "dia": "Jueves",
      "horaInicio": "15:40",
      "horaFin": "16:20",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d16_Viernes_1",
      "docenteId": "d16",
      "estudianteId": "e24",
      "dia": "Viernes",
      "horaInicio": "14:00",
      "horaFin": "14:50",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d16_Viernes_2",
      "docenteId": "d16",
      "estudianteId": "e17",
      "dia": "Viernes",
      "horaInicio": "15:10",
      "horaFin": "16:30",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d19_Jueves_1",
      "docenteId": "d19",
      "estudianteId": "e25",
      "dia": "Jueves",
      "horaInicio": "13:20",
      "horaFin": "14:00",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d19_Jueves_2",
      "docenteId": "d19",
      "estudianteId": "e22",
      "dia": "Jueves",
      "horaInicio": "15:10",
      "horaFin": "16:00",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d19_Jueves_3",
      "docenteId": "d19",
      "estudianteId": "e23",
      "dia": "Jueves",
      "horaInicio": "16:00",
      "horaFin": "17:20",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d19_Viernes_1",
      "docenteId": "d19",
      "estudianteId": "e27",
      "dia": "Viernes",
      "horaInicio": "13:20",
      "horaFin": "15:00",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d19_Viernes_2",
      "docenteId": "d19",
      "estudianteId": "e29",
      "dia": "Viernes",
      "horaInicio": "15:30",
      "horaFin": "17:00",
      "estadoSemana": "Normal"
    }
  ],
  "novedades": [],
  "historial": [
    {
      "id": "week_2026_08_03",
      "rangoSemana": "03 al 07 de Agosto de 2026",
      "fechaCierre": "2026-08-07T18:00:00.000Z",
      "docentesNovedades": {
        "d15": {
          "Lunes": "Paro Docente"
        },
        "d17": {
          "Lunes": "Paro Docente"
        }
      },
      "novedades": [],
      "asignaciones": [
        {
          "id": "h_d30_Mar_1",
          "docenteId": "d30",
          "estudianteId": "e23",
          "dia": "Martes",
          "horaInicio": "14:40",
          "horaFin": "16:00",
          "estadoSemana": "Normal"
        },
        {
          "id": "h_d30_Mie_1",
          "docenteId": "d30",
          "estudianteId": "e18",
          "dia": "Miércoles",
          "horaInicio": "14:30",
          "horaFin": "15:30",
          "estadoSemana": "Normal"
        },
        {
          "id": "h_d30_Mie_2",
          "docenteId": "d30",
          "estudianteId": "e17",
          "dia": "Miércoles",
          "horaInicio": "16:30",
          "horaFin": "18:00",
          "estadoSemana": "Normal"
        },
        {
          "id": "h_d30_Jue_1",
          "docenteId": "d30",
          "estudianteId": "e18",
          "dia": "Jueves",
          "horaInicio": "14:40",
          "horaFin": "16:00",
          "estadoSemana": "Normal"
        },
        {
          "id": "h_d30_Jue_2",
          "docenteId": "d30",
          "estudianteId": "e17",
          "dia": "Jueves",
          "horaInicio": "16:50",
          "horaFin": "18:00",
          "estadoSemana": "Normal"
        },
        {
          "id": "h_d30_Vie_1",
          "docenteId": "d30",
          "estudianteId": "e14",
          "dia": "Viernes",
          "horaInicio": "14:40",
          "horaFin": "15:50",
          "estadoSemana": "Normal"
        },
        {
          "id": "h_d30_Vie_2",
          "docenteId": "d30",
          "estudianteId": "e13",
          "dia": "Viernes",
          "horaInicio": "16:00",
          "horaFin": "17:10",
          "estadoSemana": "Normal"
        },
        {
          "id": "h_d18_Lun_1",
          "docenteId": "d18",
          "estudianteId": "e19",
          "dia": "Lunes",
          "horaInicio": "13:20",
          "horaFin": "14:00",
          "estadoSemana": "Normal"
        },
        {
          "id": "h_d18_Mie_1",
          "docenteId": "d18",
          "estudianteId": "e13",
          "dia": "Miércoles",
          "horaInicio": "13:20",
          "horaFin": "14:20",
          "estadoSemana": "Normal"
        },
        {
          "id": "h_d18_Vie_1",
          "docenteId": "d18",
          "estudianteId": "e18",
          "dia": "Viernes",
          "horaInicio": "13:20",
          "horaFin": "14:20",
          "estadoSemana": "Normal"
        },
        {
          "id": "h_d18_Vie_2",
          "docenteId": "d18",
          "estudianteId": "e23",
          "dia": "Viernes",
          "horaInicio": "14:20",
          "horaFin": "15:20",
          "estadoSemana": "Normal"
        },
        {
          "id": "h_d18_Vie_3",
          "docenteId": "d18",
          "estudianteId": "e17",
          "dia": "Viernes",
          "horaInicio": "15:20",
          "horaFin": "16:20",
          "estadoSemana": "Normal"
        },
        {
          "id": "h_d18_Vie_4",
          "docenteId": "d18",
          "estudianteId": "e14",
          "dia": "Viernes",
          "horaInicio": "16:20",
          "horaFin": "17:20",
          "estadoSemana": "Normal"
        },
        {
          "id": "h_d15_Lun_1",
          "docenteId": "d15",
          "estudianteId": "e17",
          "dia": "Lunes",
          "horaInicio": "14:00",
          "horaFin": "15:00",
          "estadoSemana": "Paro Docente"
        },
        {
          "id": "h_d15_Mar_1",
          "docenteId": "d15",
          "estudianteId": "e18",
          "dia": "Martes",
          "horaInicio": "14:00",
          "horaFin": "15:30",
          "estadoSemana": "Normal"
        },
        {
          "id": "h_d15_Mar_2",
          "docenteId": "d15",
          "estudianteId": "e17",
          "dia": "Martes",
          "horaInicio": "16:00",
          "horaFin": "17:20",
          "estadoSemana": "Normal"
        },
        {
          "id": "h_d15_Mie_1",
          "docenteId": "d15",
          "estudianteId": "e23",
          "dia": "Miércoles",
          "horaInicio": "16:00",
          "horaFin": "17:20",
          "estadoSemana": "Normal"
        },
        {
          "id": "h_d15_Jue_1",
          "docenteId": "d15",
          "estudianteId": "e14",
          "dia": "Jueves",
          "horaInicio": "14:00",
          "horaFin": "15:00",
          "estadoSemana": "Normal"
        },
        {
          "id": "h_d15_Jue_2",
          "docenteId": "d15",
          "estudianteId": "e13",
          "dia": "Jueves",
          "horaInicio": "15:10",
          "horaFin": "16:10",
          "estadoSemana": "Normal"
        },
        {
          "id": "h_d17_Lun_1",
          "docenteId": "d17",
          "estudianteId": "e18",
          "dia": "Lunes",
          "horaInicio": "13:20",
          "horaFin": "14:40",
          "estadoSemana": "Paro Docente"
        },
        {
          "id": "h_d17_Lun_2",
          "docenteId": "d17",
          "estudianteId": "e17",
          "dia": "Lunes",
          "horaInicio": "15:10",
          "horaFin": "16:40",
          "estadoSemana": "Paro Docente"
        },
        {
          "id": "h_d17_Mar_1",
          "docenteId": "d17",
          "estudianteId": "e30",
          "dia": "Martes",
          "horaInicio": "13:20",
          "horaFin": "14:40",
          "estadoSemana": "Normal"
        },
        {
          "id": "h_d17_Mar_2",
          "docenteId": "d17",
          "estudianteId": "e14",
          "dia": "Martes",
          "horaInicio": "14:50",
          "horaFin": "15:40",
          "estadoSemana": "Normal"
        },
        {
          "id": "h_d17_Mar_3",
          "docenteId": "d17",
          "estudianteId": "e13",
          "dia": "Martes",
          "horaInicio": "15:40",
          "horaFin": "16:40",
          "estadoSemana": "Normal"
        },
        {
          "id": "h_d17_Mie_1",
          "docenteId": "d17",
          "estudianteId": "e23",
          "dia": "Miércoles",
          "horaInicio": "13:20",
          "horaFin": "15:40",
          "estadoSemana": "Normal"
        },
        {
          "id": "h_d17_Vie_1",
          "docenteId": "d17",
          "estudianteId": "e17",
          "dia": "Viernes",
          "horaInicio": "13:20",
          "horaFin": "14:40",
          "estadoSemana": "Normal"
        },
        {
          "id": "h_d17_Vie_2",
          "docenteId": "d17",
          "estudianteId": "e18",
          "dia": "Viernes",
          "horaInicio": "15:10",
          "horaFin": "16:40",
          "estadoSemana": "Normal"
        },
        {
          "id": "h_d14_Lun_1",
          "docenteId": "d14",
          "estudianteId": "e18",
          "dia": "Lunes",
          "horaInicio": "15:20",
          "horaFin": "17:20",
          "estadoSemana": "Normal"
        },
        {
          "id": "h_d14_Mar_1",
          "docenteId": "d14",
          "estudianteId": "e17",
          "dia": "Martes",
          "horaInicio": "14:00",
          "horaFin": "15:40",
          "estadoSemana": "Normal"
        },
        {
          "id": "h_d14_Mar_2",
          "docenteId": "d14",
          "estudianteId": "e18",
          "dia": "Martes",
          "horaInicio": "16:10",
          "horaFin": "17:20",
          "estadoSemana": "Normal"
        },
        {
          "id": "h_d14_Mie_1",
          "docenteId": "d14",
          "estudianteId": "e18",
          "dia": "Miércoles",
          "horaInicio": "14:00",
          "horaFin": "15:20",
          "estadoSemana": "Normal"
        },
        {
          "id": "h_d14_Jue_1",
          "docenteId": "d14",
          "estudianteId": "e17",
          "dia": "Jueves",
          "horaInicio": "14:00",
          "horaFin": "15:40",
          "estadoSemana": "Normal"
        },
        {
          "id": "h_d14_Jue_2",
          "docenteId": "d14",
          "estudianteId": "e18",
          "dia": "Jueves",
          "horaInicio": "16:10",
          "horaFin": "17:20",
          "estadoSemana": "Normal"
        },
        {
          "id": "h_d14_Vie_1",
          "docenteId": "d14",
          "estudianteId": "e13",
          "dia": "Viernes",
          "horaInicio": "14:00",
          "horaFin": "15:20",
          "estadoSemana": "Normal"
        },
        {
          "id": "h_d14_Vie_2",
          "docenteId": "d14",
          "estudianteId": "e14",
          "dia": "Viernes",
          "horaInicio": "15:30",
          "horaFin": "16:50",
          "estadoSemana": "Normal"
        },
        {
          "id": "h_d16_Lun_1",
          "docenteId": "d16",
          "estudianteId": "e14",
          "dia": "Lunes",
          "horaInicio": "14:00",
          "horaFin": "15:00",
          "estadoSemana": "Normal"
        },
        {
          "id": "h_d16_Jue_1",
          "docenteId": "d16",
          "estudianteId": "e18",
          "dia": "Jueves",
          "horaInicio": "14:00",
          "horaFin": "15:10",
          "estadoSemana": "Normal"
        },
        {
          "id": "h_d16_Jue_2",
          "docenteId": "d16",
          "estudianteId": "e23",
          "dia": "Jueves",
          "horaInicio": "15:40",
          "horaFin": "16:40",
          "estadoSemana": "Normal"
        },
        {
          "id": "h_d16_Vie_1",
          "docenteId": "d16",
          "estudianteId": "e17",
          "dia": "Viernes",
          "horaInicio": "15:20",
          "horaFin": "16:40",
          "estadoSemana": "Normal"
        },
        {
          "id": "h_d19_Jue_1",
          "docenteId": "d19",
          "estudianteId": "e25",
          "dia": "Jueves",
          "horaInicio": "13:20",
          "horaFin": "14:40",
          "estadoSemana": "Normal"
        },
        {
          "id": "h_d19_Vie_1",
          "docenteId": "d19",
          "estudianteId": "e22",
          "dia": "Viernes",
          "horaInicio": "13:20",
          "horaFin": "14:40",
          "estadoSemana": "Normal"
        },
        {
          "id": "h_d19_Vie_2",
          "docenteId": "d19",
          "estudianteId": "e23",
          "dia": "Viernes",
          "horaInicio": "15:10",
          "horaFin": "16:30",
          "estadoSemana": "Normal"
        }
      ]
    }
  ]
};

// MANEJO DE BASE DE DATOS
const DB = {
  data: null,
  load() {
    const saved = localStorage.getItem('escuela370_data_v32');
    if (saved) {
      this.data = JSON.parse(saved);
      // Limpiar licencias/novedades del objeto docente de la semana pasada si quedaron persistidas
      if (this.data.docentes) {
        this.data.docentes.forEach(d => {
          if (d.novedades) delete d.novedades;
          const defDoc = DEFAULT_DATA.docentes.find(def => def.id === d.id);
          if (!d.jornada && defDoc && defDoc.jornada) {
            d.jornada = defDoc.jornada;
          }
        });
      }
      // Asegurar que si los datos vienen de la clave anterior (escuela302), se guarden en la nueva clave (escuela370)
      this.save();
    } else {
      // Intentar migración desde claves anteriores si no existe v30
      const oldSaved = localStorage.getItem('escuela302_data_v29') || localStorage.getItem('escuela302_data_v28');
      if (oldSaved) {
        try {
          const oldData = JSON.parse(oldSaved);
          this.data = {
            docentes: oldData.docentes || DEFAULT_DATA.docentes,
            estudiantes: oldData.estudiantes || DEFAULT_DATA.estudiantes,
            asignaciones: oldData.asignaciones || DEFAULT_DATA.asignaciones,
            novedades: oldData.novedades || [],
            historial: oldData.historial || [],
            config: oldData.config || { tiempoTraslado: 20, semana: CONFIG.semana }
          };
          this.save();
        } catch (err) {
          console.error("Fallo al migrar versión anterior, cargando DEFAULT_DATA:", err);
          this.data = JSON.parse(JSON.stringify(DEFAULT_DATA));
          this.save();
        }
      } else {
        this.data = JSON.parse(JSON.stringify(DEFAULT_DATA));
        this.save();
      }
    }
    // Asegurar que todos los registros tengan nivel 'Secundaria' sin eliminar entradas cargadas por el usuario
    if (this.data) {
      if (this.data.docentes) {
        this.data.docentes.forEach(d => { if (!d.nivel) d.nivel = 'Secundaria'; });
      }
      if (this.data.estudiantes) {
        this.data.estudiantes.forEach(e => { if (!e.nivel) e.nivel = 'Secundaria'; });
      }
      if (this.data.asignaciones) {
        const docIds = new Set((this.data.docentes || []).map(d => d.id));
        const estIds = new Set((this.data.estudiantes || []).map(e => e.id));
        this.data.asignaciones = this.data.asignaciones.filter(a => docIds.has(a.docenteId) && estIds.has(a.estudianteId));
      }
      this.save();
    }
    if (!this.data.config) {
      this.data.config = { tiempoTraslado: 20, semana: CONFIG.semana };
      this.save();
    }
    // Sincronizar constante de configuración global con base de datos activa
    if (this.data.config) {
      if (this.data.config.semana && !this.data.config.semana.includes('Mayo')) {
        CONFIG.semana = this.data.config.semana;
      } else {
        this.data.config.semana = CONFIG.semana;
        this.save();
      }
    }
  },
  save() {
    localStorage.setItem('escuela370_data_v32', JSON.stringify(this.data));
  },
  archiveWeek() {
    const weekData = {
      id: 'week_' + Date.now(),
      fechaCierre: new Date().toISOString(),
      rangoSemana: CONFIG.semana,
      asignaciones: JSON.parse(JSON.stringify(this.data.asignaciones)),
      novedades: JSON.parse(JSON.stringify(this.data.novedades))
    };
    if (!this.data.historial) this.data.historial = [];
    this.data.historial.push(weekData);

    // Procesar inasistencias para la siguiente semana
    this.data.asignaciones.forEach(a => {
      if (a.estadoSemana && a.estadoSemana !== 'Normal') {
        const est = this.data.estudiantes.find(e => e.id === a.estudianteId);
        const doc = this.data.docentes.find(d => d.id === a.docenteId);
        if (est) {
          est.alertaClases = true;
          const msg = `Faltó a ${doc ? doc.materia : 'clase'} (${a.estadoSemana})`;
          if (est.detalleAlerta && !est.detalleAlerta.includes(msg)) {
            est.detalleAlerta += ` | ${msg}`;
          } else {
            est.detalleAlerta = msg;
          }
        }
      }
      // Limpiar estado para la próxima semana
      a.estadoSemana = 'Normal';
    });

    this.save();
    return weekData;
  },
  reset() {
    this.data = JSON.parse(JSON.stringify(DEFAULT_DATA));
    this.save();
  },
  exportJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Escuela370_Backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  },
  importJSON(file) {
    return new Promise((resolve, reject) => {
      if (!file) return reject(new Error("No se seleccionó ningún archivo"));
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target.result);
          if (!imported.docentes || !imported.estudiantes) {
            return reject(new Error("Formato de archivo JSON no válido"));
          }
          this.data = imported;
          this.save();
          resolve(imported);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = () => reject(new Error("Error al leer el archivo"));
      reader.readAsText(file);
    });
  },
  get docentes() { return this.data.docentes; },
  get estudiantes() { return this.data.estudiantes; },
  get asignaciones() { return this.data.asignaciones; },
  get novedades() { return this.data.novedades; },
  get historial() { return this.data.historial || []; }
};

// HELPER OBJECTS
const Docentes = {
  getAll: () => DB.docentes,
  getById: (id) => DB.docentes.find(d => d.id === id),
  add: (d) => { d.id = 'd' + Date.now(); DB.data.docentes.push(d); DB.save(); },
  update: (id, d) => { const i = DB.data.docentes.findIndex(x => x.id === id); if(i>-1) DB.data.docentes[i] = {...d, id}; DB.save(); },
  delete: (id) => { DB.data.docentes = DB.data.docentes.filter(d => d.id !== id); DB.save(); }
};

const Estudiantes = {
  getAll: () => DB.estudiantes,
  getById: (id) => DB.estudiantes.find(e => e.id === id),
  add: (e) => { e.id = 'e' + Date.now(); DB.data.estudiantes.push(e); DB.save(); },
  update: (id, e) => { const i = DB.data.estudiantes.findIndex(x => x.id === id); if(i>-1) DB.data.estudiantes[i] = {...e, id}; DB.save(); },
  delete: (id) => { DB.data.estudiantes = DB.data.estudiantes.filter(e => e.id !== id); DB.save(); }
};

const Asignaciones = {
  getAll: () => DB.asignaciones,
  getByDocente: (id) => DB.asignaciones.filter(a => a.docenteId === id),
  getByEstudiante: (id) => DB.asignaciones.filter(a => a.estudianteId === id),
  add: (a) => { a.id = 'as_' + Date.now(); DB.data.asignaciones.push(a); DB.save(); },
  update: (id, a) => { const i = DB.data.asignaciones.findIndex(x => x.id === id); if(i>-1) DB.data.asignaciones[i] = {...a, id}; DB.save(); },
  delete: (id) => { DB.data.asignaciones = DB.data.asignaciones.filter(a => a.id !== id); DB.save(); }
};

const Novedades = {
  getAll: () => DB.novedades || [],
  getById: (id) => (DB.novedades || []).find(n => n.id === id),
  add: (n) => { n.id = 'n_' + Date.now(); if(!DB.data.novedades) DB.data.novedades = []; DB.data.novedades.push(n); DB.save(); },
  update: (id, n) => { if(!DB.data.novedades) DB.data.novedades = []; const i = DB.data.novedades.findIndex(x => x.id === id); if(i>-1) DB.data.novedades[i] = {...n, id}; DB.save(); },
  delete: (id) => { if(!DB.data.novedades) DB.data.novedades = []; DB.data.novedades = DB.data.novedades.filter(n => n.id !== id); DB.save(); }
};

// UTILS
function timeToMin(t) {
  if (!t) return 0;
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

function detectConflicts() {
  // Las clases canceladas o suspendidas no deben generar conflictos (superposiciones o traslados)
  const asigs = DB.asignaciones.filter(a => a.status !== 'espera' && (!a.estadoSemana || a.estadoSemana === 'Normal'));
  const conflicts = [];
  DB.docentes.forEach(d => {
    DIAS.forEach(dia => {
      const dayAsigs = asigs.filter(a => a.docenteId === d.id && a.dia === dia)
        .sort((a, b) => timeToMin(a.horaInicio) - timeToMin(b.horaInicio));
      
      for (let i = 0; i < dayAsigs.length - 1; i++) {
        const gap = timeToMin(dayAsigs[i+1].horaInicio) - timeToMin(dayAsigs[i].horaFin);
        
        if (gap < 0) {
          conflicts.push({ severity: 'error', message: `Superposición: ${d.nombre} el ${dia}`, ids: [dayAsigs[i].id, dayAsigs[i+1].id] });
        } else {
          const est1 = DB.estudiantes.find(e => e.id === dayAsigs[i].estudianteId);
          const est2 = DB.estudiantes.find(e => e.id === dayAsigs[i+1].estudianteId);
          const mismoBarrio = est1 && est2 && est1.barrio === est2.barrio && est1.barrio !== '';
          const minTraslado = mismoBarrio ? 10 : CONFIG.tiempoTraslado;

          if (gap < minTraslado) {
            conflicts.push({ 
              severity: 'warning', 
              message: `Traslado ${mismoBarrio ? '(Mismo Barrio)' : ''}: ${d.nombre} el ${dia} (${gap} min)`, 
              ids: [dayAsigs[i].id, dayAsigs[i+1].id] 
            });
          }
        }
      }
    });
  });
  return conflicts;
}

// Inicializar
DB.load();
