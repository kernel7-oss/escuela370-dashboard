// CONFIGURACIÓN GLOBAL
const CONFIG = {
  nombreEscuela: "Escuela DyH N° 370",
  semana: "17 al 21 de Agosto de 2026",
  tiempoTraslado: 20,
  barrios: ['Centro', 'Km 3', 'Km 5', 'Km 8', 'Km 12', 'Km 17', 'Prospero Palazzo', 'Standard Norte', 'Ciudadela', 'Laprida', 'Diadema', 'Valle C', 'Sede', 'Gesta De Malvinas', 'Las Orquideas', 'Presidente Ortiz', 'Don Bosco']
};

const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

// DATOS INICIALES (VERSION 28 - LAGOS SILVIA SCHEDULE)
const DEFAULT_DATA = {
  "config": {
    "nombreEscuela": "Escuela DyH N° 370",
    "semana": "17 al 21 de Agosto de 2026",
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
          "f": "17:20"
        },
        "Viernes": {
          "i": "13:20",
          "f": "17:20"
        }
      },
      "nominaEstudiantes": [
        "e17",
        "e18",
        "e14",
        "e13",
        "e22",
        "e23",
        "e24",
        "e25",
        "e26",
        "e27",
        "e29"
      ]
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
      },
      "nominaEstudiantes": [
        "e23",
        "e14",
        "e13",
        "e24",
        "e17",
        "e18",
        "e22"
      ]
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
        "Miércoles": {
          "i": "13:20",
          "f": "14:20"
        },
        "Jueves": {
          "i": "13:20",
          "f": "17:20"
        },
        "Viernes": {
          "i": "13:20",
          "f": "17:20"
        }
      },
      "nominaEstudiantes": [
        "e17",
        "e18",
        "e14",
        "e13",
        "e22",
        "e23",
        "e24",
        "e25",
        "e26",
        "e27",
        "e29"
      ]
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
      },
      "nominaEstudiantes": [
        "e25",
        "e22",
        "e27",
        "e29",
        "e14",
        "e13",
        "e23",
        "e17",
        "e18"
      ]
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
          "f": "17:20"
        },
        "Miércoles": {
          "i": "13:20",
          "f": "15:20"
        },
        "Viernes": {
          "i": "13:20",
          "f": "17:20"
        }
      },
      "nominaEstudiantes": [
        "e14",
        "e13",
        "e23",
        "e22",
        "e25",
        "e26",
        "e18",
        "e17",
        "e24"
      ]
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
        "Miércoles": {
          "i": "14:00",
          "f": "17:20"
        },
        "Jueves": {
          "i": "14:00",
          "f": "15:20"
        },
        "Viernes": {
          "i": "14:00",
          "f": "15:20"
        }
      },
      "nominaEstudiantes": [
        "e18",
        "e14",
        "e13",
        "e17",
        "e22",
        "e26",
        "e24"
      ]
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
      },
      "nominaEstudiantes": [
        "e14",
        "e13",
        "e23",
        "e26",
        "e18",
        "e25",
        "e22",
        "e17",
        "e24"
      ]
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
      },
      "nominaEstudiantes": [
        "e25",
        "e22",
        "e23",
        "e27",
        "e29"
      ]
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
      "escuelaOrigen": "N° 704",
      "grado": "2° Año",
      "estado": "Activo",
      "alertaClases": true,
      "detalleAlerta": "No disponible esta semana por cuestiones médicas",
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
      "barrio": "Centro",
      "escuelaOrigen": "Escuela Nº 796",
      "grado": "1er año",
      "estado": "Activo",
      "certificadoVence": "2026-12-30",
      "foto": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmQAAAGYCAYAAADsqf5DAAAQAElEQVR4Aez9B7xu113eiT+/tXZ5+ym3VxWrWJJt2ZbBDYzB3fQiSmgOSTAhQwYCATIhw82EmQwhOBMSyJgUTzIZ8o88A8RUUyKqjbExtmUbW5LVpdtPfetu6/88+9wrJAKKLST56p61fX537732qs+Wz/5+nt9+3+MQt6hAVCAqEBWICkQFogJRgc+qAhHIPqvyx8GjAlGBqMBuUSCuMyoQFXgiBSKQPZE68VpUICoQFYgKRAWiAlGBZ0CBCGTPgMhxiN2hQFxlVCAqEBWICkQFnqwCEcierHKxXVQgKhAViApEBaICUYGnSIHPAMieohFjN1GBqEBUICoQFYgKRAWiAo9TIALZ4+SIJ1GBqEBUICrwWVcgTiAqsAsViEC2C296XHJUICoQFYgKRAWiApeWAhHILq37EWezOxSIq4wKRAWiAlGBqMDjFIhA9jg54klUICoQFYgKRAWiAlGBZ16BpwfInvl1xBGjAlGBqEBUICoQFYgKPGsViED2rL11ceJRgahAVCAqEBWIClwuCkQgu1zuZFxHVCAqEBWICkQFogLPWgUikD1rb12c+O5QIK4yKhAViApEBXaDAhHIdsNdjmuMCkQFogJRgahAVOCSVuCzDmSXtDpxclGBqEBUICoQFYgKRAWeAQUikD0DIschogJRgahAVOCzrkCcQFTgklYgAtklfXvi5KICUYGoQFQgKhAV2A0KRCDbDXc5rnF3KBBXGRWICkQFogLPWgUikD1rb12ceFQgKhAViApEBaICl4sCzyYgu1w0j+uICkQFogJRgahAVCAq8DgFIpA9To54EhWICkQFogJRgahAVOCZVyAC2TOveRwxKhAViApEBaICUYGowOMUiED2ODniSVRgdygQVxkViApEBaICl5YCEcgurfsRZxMViApEBaICUYGowC5U4DIFsl14J+OSowJRgahAVCAqEBV41ioQgexZe+vixKMCUYGoQFTgs65AnEBU4ClSIALZUyRk7CYqEBWICkQFogJRgajAk1UgAtmTVS62iwrsDgXiKqMCUYGoQFTgGVAgAtkzIHIcIioQFYgKRAWiAlGBqMATKRCB7InUideiAlGBqEBUICoQFYgKPAMKRCB7BkSOQ0QFogJRgahAVCAqEBV4IgUikD2R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",
      "domicilio": "Alvear Nº 421",
      "mapsUrl": "https://maps.app.goo.gl/XVphAR4u6juS8yGo6",
      "telefono": "2974260193",
      "contacto": "mamá (WhatsApp)",
      "wifi": "SI",
      "conectividad": "SI",
      "horariosDisponibles": {
        "Lunes": "13:20 a 15:00",
        "Martes": "13:20 a 15:00",
        "Miércoles": "14:00 a 15:20",
        "Jueves": "13:20 a 15:00",
        "Viernes": "13:20 a 15:00"
      }
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
      "barrio": "Ceferino Namuncura",
      "escuelaOrigen": "Escuela N° 711",
      "grado": "3° Año",
      "estado": "En Espera",
      "fechaRemision": "2026-08-09",
      "fechaCertificado": "2026-08-01",
      "diasCobertura": 45,
      "certificadoVence": "2026-12-30",
      "domicilio": "La Ferrere N° 3283",
      "telefono": "2976246194",
      "contacto": "mamá (WhatsApp)",
      "conectividad": "Wi-Fi: SI – 3G: SI",
      "motivoEspera": "Derivación por sobrecarga de matrícula docente / Próximo Ingreso",
      "diasReposo": 145
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
      "id": "e30",
      "nombre": "MIRANDA LIAN",
      "nivel": "Secundaria",
      "barrio": "Centro",
      "escuelaOrigen": "N° 704",
      "grado": "2° Año",
      "estado": "Alta Médica",
      "fechaAlta": "2026-08-07",
      "observacionesSeguimiento": "Alta médica otorgada. Reincorporado a su escuela regular N° 704.",
      "certificadoVence": "2026-10-30"
    },
    {
      "id": "e31",
      "nombre": "FLORES SANTINO BENJAMIN",
      "nivel": "Secundaria",
      "grado": "1° Año",
      "escuelaOrigen": "Escuela N° 1706",
      "domicilio": "Polonia N° 1504",
      "barrio": "Moure",
      "telefono": "2975171402",
      "contacto": "mamá (WhatsApp)",
      "conectividad": "Wi-Fi: SI – 3G: SI",
      "estado": "En Espera",
      "motivoEspera": "Derivación por sobrecarga de matrícula docente / Próximo Ingreso",
      "fechaRemision": "2026-08-09",
      "fechaCertificado": "2026-08-01",
      "certificadoVence": "2026-12-20",
      "diasReposo": 135
    }
  ],
  "asignaciones": [
    {
      "id": "as_d30_Lunes_1",
      "docenteId": "d30",
      "estudianteId": "e23",
      "dia": "Lunes",
      "horaInicio": "14:40",
      "horaFin": "15:40",
      "sinHorario": true,
      "nota": null
    },
    {
      "id": "as_d30_Lunes_2",
      "docenteId": "d30",
      "estudianteId": "e14",
      "dia": "Lunes",
      "horaInicio": "15:50",
      "horaFin": "16:50",
      "sinHorario": true,
      "nota": null
    },
    {
      "id": "as_d30_Lunes_3",
      "docenteId": "d30",
      "estudianteId": "e13",
      "dia": "Lunes",
      "horaInicio": "17:00",
      "horaFin": "18:00",
      "sinHorario": true,
      "nota": "T. P."
    },
    {
      "id": "as_d30_Martes_1",
      "docenteId": "d30",
      "estudianteId": "e24",
      "dia": "Martes",
      "horaInicio": "14:40",
      "horaFin": "15:50",
      "sinHorario": null,
      "nota": null
    },
    {
      "id": "as_d30_Martes_2",
      "docenteId": "d30",
      "estudianteId": "e17",
      "dia": "Martes",
      "horaInicio": "16:20",
      "horaFin": "17:40",
      "sinHorario": null,
      "nota": null
    },
    {
      "id": "as_d30_Miercoles_1",
      "docenteId": "d30",
      "estudianteId": "e18",
      "dia": "Miércoles",
      "horaInicio": "16:50",
      "horaFin": "18:00",
      "sinHorario": null,
      "nota": null
    },
    {
      "id": "as_d30_Jueves_1",
      "docenteId": "d30",
      "estudianteId": "e22",
      "dia": "Jueves",
      "horaInicio": "16:50",
      "horaFin": "18:00",
      "sinHorario": null,
      "nota": null
    },
    {
      "id": "as_d18_Miercoles_1",
      "docenteId": "d18",
      "estudianteId": "e13",
      "dia": "Miércoles",
      "horaInicio": "13:20",
      "horaFin": "14:20",
      "sinHorario": null,
      "nota": null
    },
    {
      "id": "as_d18_Jueves_1",
      "docenteId": "d18",
      "estudianteId": "e27",
      "dia": "Jueves",
      "horaInicio": "13:20",
      "horaFin": "14:20",
      "sinHorario": true,
      "nota": null
    },
    {
      "id": "as_d18_Viernes_1",
      "docenteId": "d18",
      "estudianteId": "e29",
      "dia": "Viernes",
      "horaInicio": "13:20",
      "horaFin": "14:20",
      "sinHorario": true,
      "nota": null
    },
    {
      "id": "as_d18_Viernes_2",
      "docenteId": "d18",
      "estudianteId": "e18",
      "dia": "Viernes",
      "horaInicio": "14:20",
      "horaFin": "15:20",
      "sinHorario": true,
      "nota": null
    },
    {
      "id": "as_d18_Viernes_3",
      "docenteId": "d18",
      "estudianteId": "e23",
      "dia": "Viernes",
      "horaInicio": "15:20",
      "horaFin": "16:20",
      "sinHorario": true,
      "nota": null
    },
    {
      "id": "as_d18_Viernes_4",
      "docenteId": "d18",
      "estudianteId": "e17",
      "dia": "Viernes",
      "horaInicio": "16:20",
      "horaFin": "17:20",
      "sinHorario": true,
      "nota": null
    },
    {
      "id": "as_d18_Viernes_5",
      "docenteId": "d18",
      "estudianteId": "e14",
      "dia": "Viernes",
      "horaInicio": "17:20",
      "horaFin": "18:20",
      "sinHorario": true,
      "nota": null
    },
    {
      "id": "as_d15_Martes_2",
      "docenteId": "d15",
      "estudianteId": "e22",
      "dia": "Martes",
      "horaInicio": "15:00",
      "horaFin": "16:20",
      "sinHorario": null,
      "nota": null
    },
    {
      "id": "as_d15_Miercoles_1",
      "docenteId": "d15",
      "estudianteId": "e27",
      "dia": "Miércoles",
      "horaInicio": "14:00",
      "horaFin": "15:30",
      "sinHorario": null,
      "nota": null
    },
    {
      "id": "as_d15_Miercoles_2",
      "docenteId": "d15",
      "estudianteId": "e29",
      "dia": "Miércoles",
      "horaInicio": "16:00",
      "horaFin": "17:20",
      "sinHorario": null,
      "nota": null
    },
    {
      "id": "as_d15_Jueves_1",
      "docenteId": "d15",
      "estudianteId": "e14",
      "dia": "Jueves",
      "horaInicio": "14:00",
      "horaFin": "15:00",
      "sinHorario": true,
      "nota": "BS AS"
    },
    {
      "id": "as_d15_Jueves_2",
      "docenteId": "d15",
      "estudianteId": "e13",
      "dia": "Jueves",
      "horaInicio": "15:00",
      "horaFin": "16:00",
      "sinHorario": true,
      "nota": "T. P."
    },
    {
      "id": "as_d15_Viernes_1",
      "docenteId": "d15",
      "estudianteId": "e23",
      "dia": "Viernes",
      "horaInicio": "14:00",
      "horaFin": "15:00",
      "sinHorario": true,
      "nota": null
    },
    {
      "id": "as_d15_Viernes_2",
      "docenteId": "d15",
      "estudianteId": "e17",
      "dia": "Viernes",
      "horaInicio": "15:00",
      "horaFin": "16:00",
      "sinHorario": true,
      "nota": null
    },
    {
      "id": "as_d15_Viernes_3",
      "docenteId": "d15",
      "estudianteId": "e18",
      "dia": "Viernes",
      "horaInicio": "16:00",
      "horaFin": "17:00",
      "sinHorario": true,
      "nota": null
    },
    {
      "id": "as_d17_Martes_1",
      "docenteId": "d17",
      "estudianteId": "e14",
      "dia": "Martes",
      "horaInicio": "13:20",
      "horaFin": "14:20",
      "sinHorario": true,
      "nota": null
    },
    {
      "id": "as_d17_Martes_2",
      "docenteId": "d17",
      "estudianteId": "e13",
      "dia": "Martes",
      "horaInicio": "14:30",
      "horaFin": "15:30",
      "sinHorario": true,
      "nota": null
    },
    {
      "id": "as_d17_Martes_3",
      "docenteId": "d17",
      "estudianteId": "e23",
      "dia": "Martes",
      "horaInicio": "15:40",
      "horaFin": "16:40",
      "sinHorario": true,
      "nota": null
    },
    {
      "id": "as_d17_Miercoles_1",
      "docenteId": "d17",
      "estudianteId": "e22",
      "dia": "Miércoles",
      "horaInicio": "13:20",
      "horaFin": "15:20",
      "sinHorario": null,
      "nota": null
    },
    {
      "id": "as_d17_Viernes_1",
      "docenteId": "d17",
      "estudianteId": "e26",
      "dia": "Viernes",
      "horaInicio": "13:20",
      "horaFin": "15:20",
      "sinHorario": null,
      "nota": null
    },
    {
      "id": "as_d17_Viernes_2",
      "docenteId": "d17",
      "estudianteId": "e18",
      "dia": "Viernes",
      "horaInicio": "15:40",
      "horaFin": "16:40",
      "sinHorario": null,
      "nota": null
    },
    {
      "id": "as_d17_Viernes_3",
      "docenteId": "d17",
      "estudianteId": "e17",
      "dia": "Viernes",
      "horaInicio": "16:40",
      "horaFin": "17:20",
      "sinHorario": true,
      "nota": null
    },
    {
      "id": "as_d17_Viernes_4",
      "docenteId": "d17",
      "estudianteId": "e24",
      "dia": "Viernes",
      "horaInicio": "17:20",
      "horaFin": "18:00",
      "sinHorario": true,
      "nota": null
    },
    {
      "id": "as_d14_Lunes_1",
      "docenteId": "d14",
      "estudianteId": "e18",
      "dia": "Lunes",
      "horaInicio": "15:20",
      "horaFin": "17:20",
      "sinHorario": true,
      "nota": null
    },
    {
      "id": "as_d14_Martes_1",
      "docenteId": "d14",
      "estudianteId": "e18",
      "dia": "Martes",
      "horaInicio": "14:00",
      "horaFin": "15:00",
      "sinHorario": true,
      "nota": null
    },
    {
      "id": "as_d14_Martes_2",
      "docenteId": "d14",
      "estudianteId": "e14",
      "dia": "Martes",
      "horaInicio": "15:00",
      "horaFin": "16:00",
      "sinHorario": true,
      "nota": null
    },
    {
      "id": "as_d14_Martes_3",
      "docenteId": "d14",
      "estudianteId": "e13",
      "dia": "Martes",
      "horaInicio": "16:00",
      "horaFin": "16:40",
      "sinHorario": true,
      "nota": null
    },
    {
      "id": "as_d14_Martes_4",
      "docenteId": "d14",
      "estudianteId": "e17",
      "dia": "Martes",
      "horaInicio": "16:40",
      "horaFin": "17:20",
      "sinHorario": true,
      "nota": null
    },
    {
      "id": "as_d14_Miercoles_1",
      "docenteId": "d14",
      "estudianteId": "e18",
      "dia": "Miércoles",
      "horaInicio": "14:00",
      "horaFin": "15:20",
      "sinHorario": null,
      "nota": null
    },
    {
      "id": "as_d14_Miercoles_2",
      "docenteId": "d14",
      "estudianteId": "e22",
      "dia": "Miércoles",
      "horaInicio": "15:50",
      "horaFin": "17:20",
      "sinHorario": null,
      "nota": null
    },
    {
      "id": "as_d14_Jueves_1",
      "docenteId": "d14",
      "estudianteId": "e26",
      "dia": "Jueves",
      "horaInicio": "14:00",
      "horaFin": "15:20",
      "sinHorario": null,
      "nota": null
    },
    {
      "id": "as_d14_Viernes_1",
      "docenteId": "d14",
      "estudianteId": "e24",
      "dia": "Viernes",
      "horaInicio": "14:00",
      "horaFin": "15:20",
      "sinHorario": null,
      "nota": null
    },
    {
      "id": "as_d16_Lunes_1",
      "docenteId": "d16",
      "estudianteId": "e14",
      "dia": "Lunes",
      "horaInicio": "14:00",
      "horaFin": "14:50",
      "sinHorario": true,
      "nota": null
    },
    {
      "id": "as_d16_Lunes_2",
      "docenteId": "d16",
      "estudianteId": "e13",
      "dia": "Lunes",
      "horaInicio": "14:50",
      "horaFin": "15:40",
      "sinHorario": true,
      "nota": null
    },
    {
      "id": "as_d16_Lunes_3",
      "docenteId": "d16",
      "estudianteId": "e23",
      "dia": "Lunes",
      "horaInicio": "15:40",
      "horaFin": "16:40",
      "sinHorario": true,
      "nota": null
    },
    {
      "id": "as_d16_Miercoles_1",
      "docenteId": "d16",
      "estudianteId": "e26",
      "dia": "Miércoles",
      "horaInicio": "14:00",
      "horaFin": "15:20",
      "sinHorario": null,
      "nota": null
    },
    {
      "id": "as_d16_Miercoles_2",
      "docenteId": "d16",
      "estudianteId": "e18",
      "dia": "Miércoles",
      "horaInicio": "15:40",
      "horaFin": "16:40",
      "sinHorario": null,
      "nota": null
    },
    {
      "id": "as_d16_Jueves_2",
      "docenteId": "d16",
      "estudianteId": "e22",
      "dia": "Jueves",
      "horaInicio": "15:40",
      "horaFin": "16:40",
      "sinHorario": null,
      "nota": null
    },
    {
      "id": "as_d16_Viernes_1",
      "docenteId": "d16",
      "estudianteId": "e17",
      "dia": "Viernes",
      "horaInicio": "14:00",
      "horaFin": "15:10",
      "sinHorario": null,
      "nota": null
    },
    {
      "id": "as_d16_Viernes_2",
      "docenteId": "d16",
      "estudianteId": "e24",
      "dia": "Viernes",
      "horaInicio": "15:30",
      "horaFin": "16:40",
      "sinHorario": null,
      "nota": null
    },
    {
      "id": "as_d19_Jueves_2",
      "docenteId": "d19",
      "estudianteId": "e22",
      "dia": "Jueves",
      "horaInicio": "14:20",
      "horaFin": "15:30",
      "sinHorario": null,
      "nota": null
    },
    {
      "id": "as_d19_Jueves_3",
      "docenteId": "d19",
      "estudianteId": "e23",
      "dia": "Jueves",
      "horaInicio": "15:30",
      "horaFin": "16:30",
      "sinHorario": true,
      "nota": "Cuestión médica"
    },
    {
      "id": "as_d19_Viernes_1",
      "docenteId": "d19",
      "estudianteId": "e27",
      "dia": "Viernes",
      "horaInicio": "13:20",
      "horaFin": "15:00",
      "sinHorario": null,
      "nota": null
    },
    {
      "id": "as_d19_Viernes_2",
      "docenteId": "d19",
      "estudianteId": "e29",
      "dia": "Viernes",
      "horaInicio": "15:30",
      "horaFin": "17:00",
      "sinHorario": null,
      "nota": null
    },
    {
      "id": "as_d14_Martes_e25",
      "docenteId": "d14",
      "estudianteId": "e25",
      "dia": "Martes",
      "horaInicio": "13:20",
      "horaFin": "14:40",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d15_Martes_e25",
      "docenteId": "d15",
      "estudianteId": "e25",
      "dia": "Martes",
      "horaInicio": "14:00",
      "horaFin": "14:40",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_terapia_Miercoles_fono_e25",
      "docenteId": "ext_fono",
      "estudianteId": "e25",
      "dia": "Miércoles",
      "horaInicio": "13:00",
      "horaFin": "13:45",
      "materiaExterna": "FONOAUDIOLOGA",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d30_Miercoles_e25",
      "docenteId": "d30",
      "estudianteId": "e25",
      "dia": "Miércoles",
      "horaInicio": "14:40",
      "horaFin": "15:20",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d17_Miercoles_e25",
      "docenteId": "d17",
      "estudianteId": "e25",
      "dia": "Miércoles",
      "horaInicio": "15:40",
      "horaFin": "16:20",
      "materiaExterna": "CONSTRUCCIÓN DE LA CIUDADANIA",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d19_Jueves_e25",
      "docenteId": "d19",
      "estudianteId": "e25",
      "dia": "Jueves",
      "horaInicio": "13:20",
      "horaFin": "14:00",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d16_Jueves_e25",
      "docenteId": "d16",
      "estudianteId": "e25",
      "dia": "Jueves",
      "horaInicio": "14:20",
      "horaFin": "15:00",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_terapia_Viernes_to_e25",
      "docenteId": "ext_to",
      "estudianteId": "e25",
      "dia": "Viernes",
      "horaInicio": "12:00",
      "horaFin": "12:30",
      "materiaExterna": "TERAPIA OCUPACIONAL",
      "estadoSemana": "Normal"
    },
    {
      "id": "as_d17_Viernes_e25",
      "docenteId": "d17",
      "estudianteId": "e25",
      "dia": "Viernes",
      "horaInicio": "13:20",
      "horaFin": "14:40",
      "estadoSemana": "Normal"
    }
  ],
  "novedades": [
    {
      "id": "nov_feriado_1",
      "tipo": "Feriado",
      "dia": "Lunes",
      "docenteId": "d18",
      "estado": "Licencia",
      "nota": "Feriado Nacional (San Martín) / Licencia"
    },
    {
      "id": "nov_feriado_2",
      "tipo": "Feriado",
      "dia": "Lunes",
      "docenteId": "d15",
      "estado": "Licencia",
      "nota": "Feriado Nacional (San Martín) / Licencia"
    },
    {
      "id": "nov_feriado_3",
      "tipo": "Feriado",
      "dia": "Lunes",
      "docenteId": "d17",
      "estado": "Licencia",
      "nota": "Feriado Nacional (San Martín) / Licencia"
    },
    {
      "id": "nov_feriado_4",
      "tipo": "Feriado",
      "dia": "Lunes",
      "docenteId": "d14",
      "estado": "Licencia",
      "nota": "Feriado Nacional (San Martín) / Licencia"
    }
  ],
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
          "estadoSemana": "Normal",
          "sinHorario": true
        },
        {
          "id": "h_d30_Vie_2",
          "docenteId": "d30",
          "estudianteId": "e13",
          "dia": "Viernes",
          "horaInicio": "16:00",
          "horaFin": "17:10",
          "estadoSemana": "Normal",
          "sinHorario": true,
          "nota": "T. P."
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
          "estadoSemana": "Normal",
          "sinHorario": true
        },
        {
          "id": "h_d18_Vie_2",
          "docenteId": "d18",
          "estudianteId": "e23",
          "dia": "Viernes",
          "horaInicio": "14:20",
          "horaFin": "15:20",
          "estadoSemana": "Normal",
          "sinHorario": true
        },
        {
          "id": "h_d18_Vie_3",
          "docenteId": "d18",
          "estudianteId": "e17",
          "dia": "Viernes",
          "horaInicio": "15:20",
          "horaFin": "16:20",
          "estadoSemana": "Normal",
          "sinHorario": true
        },
        {
          "id": "h_d18_Vie_4",
          "docenteId": "d18",
          "estudianteId": "e14",
          "dia": "Viernes",
          "horaInicio": "16:20",
          "horaFin": "17:20",
          "estadoSemana": "Normal",
          "sinHorario": true
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
          "estadoSemana": "Normal",
          "sinHorario": true,
          "nota": "BS AS"
        },
        {
          "id": "h_d15_Jue_2",
          "docenteId": "d15",
          "estudianteId": "e13",
          "dia": "Jueves",
          "horaInicio": "15:10",
          "horaFin": "16:10",
          "estadoSemana": "Normal",
          "sinHorario": true,
          "nota": "T. P."
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
          "estadoSemana": "Normal",
          "sinHorario": true
        },
        {
          "id": "h_d17_Mar_2",
          "docenteId": "d17",
          "estudianteId": "e14",
          "dia": "Martes",
          "horaInicio": "14:50",
          "horaFin": "15:40",
          "estadoSemana": "Normal",
          "sinHorario": true
        },
        {
          "id": "h_d17_Mar_3",
          "docenteId": "d17",
          "estudianteId": "e13",
          "dia": "Martes",
          "horaInicio": "15:40",
          "horaFin": "16:40",
          "estadoSemana": "Normal",
          "sinHorario": true
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
          "estadoSemana": "Normal",
          "sinHorario": true
        },
        {
          "id": "h_d14_Vie_2",
          "docenteId": "d14",
          "estudianteId": "e14",
          "dia": "Viernes",
          "horaInicio": "15:30",
          "horaFin": "16:50",
          "estadoSemana": "Normal",
          "sinHorario": true
        },
        {
          "id": "h_d16_Lun_1",
          "docenteId": "d16",
          "estudianteId": "e14",
          "dia": "Lunes",
          "horaInicio": "14:00",
          "horaFin": "15:00",
          "estadoSemana": "Normal",
          "sinHorario": true
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
    },
    {
      "id": "week_1786290000000",
      "fechaCierre": "2026-08-15T18:00:00.000Z",
      "rangoSemana": "10 al 14 de Agosto de 2026",
      "asignaciones": [
        {
          "id": "as_d30_Lunes_1",
          "docenteId": "d30",
          "estudianteId": "e18",
          "dia": "Lunes",
          "horaInicio": "14:40",
          "horaFin": "15:40",
          "estadoSemana": "Normal",
          "sinHorario": true
        },
        {
          "id": "as_d30_Lunes_2",
          "docenteId": "d30",
          "estudianteId": "e14",
          "dia": "Lunes",
          "horaInicio": "15:50",
          "horaFin": "16:50",
          "estadoSemana": "Normal",
          "sinHorario": true
        },
        {
          "id": "as_d30_Lunes_3",
          "docenteId": "d30",
          "estudianteId": "e13",
          "dia": "Lunes",
          "horaInicio": "17:00",
          "horaFin": "18:00",
          "estadoSemana": "Normal",
          "sinHorario": true,
          "nota": "T. P."
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
          "estadoSemana": "Normal",
          "sinHorario": true
        },
        {
          "id": "as_d18_Viernes_2",
          "docenteId": "d18",
          "estudianteId": "e23",
          "dia": "Viernes",
          "horaInicio": "14:20",
          "horaFin": "15:20",
          "estadoSemana": "Normal",
          "sinHorario": true
        },
        {
          "id": "as_d18_Viernes_3",
          "docenteId": "d18",
          "estudianteId": "e17",
          "dia": "Viernes",
          "horaInicio": "15:20",
          "horaFin": "16:20",
          "estadoSemana": "Normal",
          "sinHorario": true
        },
        {
          "id": "as_d18_Viernes_4",
          "docenteId": "d18",
          "estudianteId": "e14",
          "dia": "Viernes",
          "horaInicio": "16:20",
          "horaFin": "17:20",
          "estadoSemana": "Normal",
          "sinHorario": true
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
          "estadoSemana": "Normal",
          "sinHorario": true,
          "nota": "BS AS"
        },
        {
          "id": "as_d15_Jueves_2",
          "docenteId": "d15",
          "estudianteId": "e13",
          "dia": "Jueves",
          "horaInicio": "14:50",
          "horaFin": "15:40",
          "estadoSemana": "Normal",
          "sinHorario": true,
          "nota": "T. P."
        },
        {
          "id": "as_d15_Jueves_3",
          "docenteId": "d15",
          "estudianteId": "e23",
          "dia": "Jueves",
          "horaInicio": "15:40",
          "horaFin": "16:30",
          "estadoSemana": "Normal",
          "sinHorario": true
        },
        {
          "id": "as_d15_Jueves_4",
          "docenteId": "d15",
          "estudianteId": "e17",
          "dia": "Jueves",
          "horaInicio": "16:30",
          "horaFin": "17:20",
          "estadoSemana": "Normal",
          "sinHorario": true
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
          "estadoSemana": "Normal",
          "sinHorario": true
        },
        {
          "id": "as_d17_Martes_2",
          "docenteId": "d17",
          "estudianteId": "e13",
          "dia": "Martes",
          "horaInicio": "14:30",
          "horaFin": "15:30",
          "estadoSemana": "Normal",
          "sinHorario": true
        },
        {
          "id": "as_d17_Martes_3",
          "docenteId": "d17",
          "estudianteId": "e23",
          "dia": "Martes",
          "horaInicio": "15:40",
          "horaFin": "16:40",
          "estadoSemana": "Normal",
          "sinHorario": true
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
          "estadoSemana": "Normal",
          "sinHorario": true
        },
        {
          "id": "as_d14_Viernes_2",
          "docenteId": "d14",
          "estudianteId": "e14",
          "dia": "Viernes",
          "horaInicio": "15:10",
          "horaFin": "16:10",
          "estadoSemana": "Normal",
          "sinHorario": true
        },
        {
          "id": "as_d14_Viernes_3",
          "docenteId": "d14",
          "estudianteId": "e18",
          "dia": "Viernes",
          "horaInicio": "16:20",
          "horaFin": "17:20",
          "estadoSemana": "Normal",
          "sinHorario": true
        },
        {
          "id": "as_d16_Lunes_1",
          "docenteId": "d16",
          "estudianteId": "e14",
          "dia": "Lunes",
          "horaInicio": "14:00",
          "horaFin": "14:50",
          "estadoSemana": "Normal",
          "sinHorario": true
        },
        {
          "id": "as_d16_Lunes_2",
          "docenteId": "d16",
          "estudianteId": "e13",
          "dia": "Lunes",
          "horaInicio": "14:50",
          "horaFin": "15:40",
          "estadoSemana": "Normal",
          "sinHorario": true
        },
        {
          "id": "as_d16_Lunes_3",
          "docenteId": "d16",
          "estudianteId": "e23",
          "dia": "Lunes",
          "horaInicio": "15:40",
          "horaFin": "16:40",
          "estadoSemana": "Normal",
          "sinHorario": true
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
      "novedades": []
    }
  ]
};

// MANEJO DE BASE DE DATOS
const DB = {
  data: null,
  STORAGE_KEY: 'escuela370_main_data',
  load() {
    let saved = localStorage.getItem(this.STORAGE_KEY);
    
    // Si no existe la clave principal, buscar y migrar intacta la información de cualquier versión previa
    if (!saved) {
      const legacyKeys = [
        'escuela370_data_v45',
        'escuela370_data_v43',
        'escuela370_data_v40',
        'escuela370_data_v37',
        'escuela370_data_v36',
        'escuela370_data_v35'
      ];
      for (const k of legacyKeys) {
        const val = localStorage.getItem(k);
        if (val) {
          try {
            saved = val;
            break;
          } catch(e) {}
        }
      }
    }

    if (saved) {
      try {
        this.data = JSON.parse(saved);
      } catch(e) {
        console.error("Error al parsear datos guardados, usando default:", e);
        this.data = JSON.parse(JSON.stringify(DEFAULT_DATA));
      }

      // Asegurar estructura base completa
      if (!this.data.docentes) this.data.docentes = JSON.parse(JSON.stringify(DEFAULT_DATA.docentes));
      if (!this.data.estudiantes) this.data.estudiantes = JSON.parse(JSON.stringify(DEFAULT_DATA.estudiantes));
      if (!this.data.asignaciones) this.data.asignaciones = JSON.parse(JSON.stringify(DEFAULT_DATA.asignaciones));
      if (!this.data.novedades) this.data.novedades = [];
      if (!this.data.historial) this.data.historial = JSON.parse(JSON.stringify(DEFAULT_DATA.historial || []));

      // Sincronizar docentes oficiales asegurando datos consistentes
      this.data.docentes.forEach(d => {
        if (d.novedades) delete d.novedades;
        const defDoc = DEFAULT_DATA.docentes.find(def => def.id === d.id);
        if (!d.jornada && defDoc && defDoc.jornada) {
          d.jornada = defDoc.jornada;
        }
        if (d.id === 'd26' || (d.nombre && d.nombre.includes('AYBAR'))) {
          d.jornada = { "Lunes": { "i": "13:20", "f": "17:20" }, "Viernes": { "i": "13:20", "f": "17:20" } };
        }
        if ((!d.nominaEstudiantes || d.nominaEstudiantes.length === 0) && defDoc && defDoc.nominaEstudiantes) {
          d.nominaEstudiantes = defDoc.nominaEstudiantes;
        }
        if (!d.nivel) d.nivel = 'Secundaria';
      });

      // Sincronizar estudiantes oficiales (Cortes Aaron, Flores Santino, Miranda Lian)
      DEFAULT_DATA.estudiantes.forEach(defEst => {
        const exists = this.data.estudiantes.find(e => e.id === defEst.id || (e.nombre && e.nombre.toUpperCase() === defEst.nombre.toUpperCase()));
        if (!exists) {
          this.data.estudiantes.push(JSON.parse(JSON.stringify(defEst)));
        } else {
          if (defEst.foto && !exists.foto) exists.foto = defEst.foto;
          if (defEst.estado === 'Alta Médica' && exists.estado !== 'Alta Médica') {
            exists.estado = 'Alta Médica';
            exists.fechaAlta = defEst.fechaAlta;
            exists.observacionesSeguimiento = defEst.observacionesSeguimiento;
          }
          if (defEst.estado === 'En Espera' && (exists.nombre.includes('CORTES') || exists.nombre.includes('FLORES'))) {
            exists.estado = 'En Espera';
          }
        }
      });
      this.data.estudiantes = this.data.estudiantes.filter(e => !(e.nombre && e.nombre.toUpperCase().includes('MENDOZA FACUNDO')));
      this.data.estudiantes.forEach(e => { if (!e.nivel) e.nivel = 'Secundaria'; });

      // Proteger asignaciones
      const docIds = new Set(this.data.docentes.map(d => d.id));
      const estIds = new Set(this.data.estudiantes.map(e => e.id));
      this.data.asignaciones = this.data.asignaciones.filter(a => docIds.has(a.docenteId) && estIds.has(a.estudianteId));

      this.save();
    } else {
      // Primera vez: cargar nueva semana 17 al 21 de Agosto con historial respaldado
      this.data = JSON.parse(JSON.stringify(DEFAULT_DATA));
      this.save();
    }

    if (!this.data.config) {
      this.data.config = { tiempoTraslado: 20, semana: CONFIG.semana };
      this.save();
    }
    CONFIG.semana = "17 al 21 de Agosto de 2026";
    if (this.data.config) {
      this.data.config.semana = CONFIG.semana;
      this.save();
    }
  },
  save() {
    try {
      const serialized = JSON.stringify(this.data);
      localStorage.setItem(this.STORAGE_KEY, serialized);
      // Respaldo de compatibilidad
      localStorage.setItem('escuela370_data_v45', serialized);
    } catch (err) {
      console.error("Error al guardar en localStorage:", err);
      if (typeof showToast === 'function') {
        showToast('Atención: El almacenamiento del navegador está lleno.', 'error');
      }
    }
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
  // Las clases canceladas o asentadas sin horario presencial no deben generar conflictos
  const asigs = DB.asignaciones.filter(a => a.status !== 'espera' && (!a.estadoSemana || a.estadoSemana === 'Normal') && !a.sinHorario);
  const conflicts = [];
  DB.docentes.forEach(d => {
    DIAS.forEach(dia => {
      const dayAsigs = asigs.filter(a => a.docenteId === d.id && a.dia === dia)
        .sort((a, b) => timeToMin(a.horaInicio) - timeToMin(b.horaInicio));
      
      for (let i = 0; i < dayAsigs.length - 1; i++) {
        const gap = timeToMin(dayAsigs[i+1].horaInicio) - timeToMin(dayAsigs[i].horaFin);
        
        if (gap < 0) {
          conflicts.push({ severity: 'error', message: `Superposición: ${d.nombre} el ${dia}`, ids: [dayAsigs[i].id, dayAsigs[i+1].id] });
        } else if (gap > 0) {
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
