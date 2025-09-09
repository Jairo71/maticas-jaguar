export const ejerciciosIntegradores = [
  {
    id: 1,
    title: '¡Hasta que la dignidad se haga costumbre!',
    mainContent: [
      { type: 'paragraph', content: `El grupo de 6°A de la Escuela General Lázaro Cárdenas, de San Pedro Cholula, realizó el proyecto escolar “Violencia de género: un problema social que nos afecta”. Consideraron importante organizar una asamblea entre sus compañeras, compañeros, madres y padres de familia de los grupos de 4°, 5° y 6°, con la intención de establecer acuerdos de convivencia para evitar los diversos tipos de violencia que suelen presentarse contra las mujeres. Como parte de sus actividades, realizaron una lista de los casos de violencia que se presentan con más frecuencia en su comunidad. Con la información obtenida realizaron una encuesta a 600 mujeres y niñas sobre la violencia que habían enfrentado, y se registraron los datos en la siguiente tabla.` },
      { type: 'paragraph', content: `Tipos de violencia que suelen afectar la dignidad y derechos de las niñas y mujeres de la comunidad` }
    ],
    tableData: {
      headers: ['Tipos de violencia', 'Casos'],
      rows: [
        ['Bromas hirientes', 56],
        ['Descalificar', 54],
        ['Ridiculizar y ofender', 68],
        ['Forzar a una relación sentimental', 69],
        ['Humillar en público', 59],
        ['Celar las amistades o relaciones', 51],
        ['Acosar en redes sociales', 55],
        ['Golpear intencionalmente', 69],
        ['Ignorar o la ley del hielo', 50],
        ['Tocamientos indebidos en el cuerpo', 69],
      ]
    },
    consigna1: 'Haz una gráfica de barras con la información de la tabla',
    consigna2: 'Observa los datos de la tabla y la gráfica que elaboraste, ¿cuáles son los tipos de violencia que representan la moda? Escribe cómo lograste identificarla.'
  },
  {
    id: 2,
    title: 'Un problema de gran magnitud: el maltrato infantil',
    mainContent: [
      { type: 'paragraph', content: `¿Qué tan frecuente es el maltrato infantil?\nSegún la Organización Mundial de la Salud (OMS), el maltrato infantil se define como cualquier acto o desatención que afecte a un menor de 18 años y esté dirigido a perjudicar su salud, su dignidad o su integridad tanto física como psicológica. El maltrato infantil se puede ejercer de manera física, psicológica y sexual y, como se leerá más adelante, genera graves consecuencias a corto y mediano plazo en quienes lo sufrieron durante la niñez o la adolescencia.\nSi bien aún faltan datos e información sobre la cantidad de niños y niñas que sufren maltrato infantil, es posible afirmar que a nivel mundial 3 de cada 4 niños de entre 2 y 4 años sufren con regularidad castigos corporales o violencia psicológica de la mano de padres o cuidadores; y que 1 de cada 5 mujeres, lo mismo que 1 de cada 13 hombres, declaran haber sufrido abusos sexuales en la infancia.\nAl analizar las causas del maltrato, éste suele estar relacionado con padres y madres de familia que enfrentan estrés al afrontar las demandas laborales cada vez más exigentes, y la falta de apoyo de familiares e instituciones confiables que los apoyen en la educación y crianza de sus hijos e hijas.\nEn relación con las consecuencias del maltrato infantil, se ha identificado graves efectos físicos, sexuales y psicológicos a corto y largo plazo; entre ellas: lesiones, estrés postraumático, ansiedad, depresión, infecciones de transmisión sexual e incluso enfermedades ginecológicas o embarazos no deseados en las adolescentes.\nPor otra parte, se ha observado que los niños y las niñas que vivieron maltrato en la infancia tienen mayor probabilidad de abusar del consumo de alcohol, drogas o tabaco, también se ha observado un impacto negativo en el desarrollo intelectual y en el desempeño escolar de los menores maltratados. Otras investigaciones han demostrado que quienes sufrieron en la infancia algún tipo de violencia tienen 13% más probabilidades de abandonar la educación básica, media o superior.\nDebido a la relevancia de este problema, es urgente generar estrategias para su atención y prevención. En primer lugar, es importante fomentar la capacitación de profesionales de la salud para que identifiquen a la niñez que enfrenta el maltrato infantil, y promuevan que niños, niñas y adolescentes reciban atención y apoyo especializado. Por otro lado, la prevención es la forma más efectiva de atender el maltrato infantil; entre las acciones más importante se encuentra el apoyo y el acompañamiento a padres y madres de familia en la crianza respetuosa, así como impulsar leyes que disuadan de imponer castigos violentos a menores de edad` } 
    ],
    tableData: null,
    consigna1: 'Si en el estado de Tlaxcala viven 693,083 mujeres y 1 de cada 5 declaran haber sufrido abusos sexuales en la infancia. ¿Cuántas mujeres han sufrido abuso sexual?',
    consigna2: 'Si en el estado de Aguascalientes existen 696, 683 hombres y 1 de cada 13 declaran haber sufrido abusos sexuales en la infancia. ¿Cuántos hombres han sufrido abuso sexual?'
  },
  {
    id: 3,
    title: 'Las artes visuales en América Latina',
    mainContent: [
      { type: 'paragraph', content: 'A Paulina y Erick les gusta mucho el arte y se han puesto a investigar artistas de América Latina. Han descubierto que el muralismo Latinoamericano es una de las artes visuales del artista urbano, donde expresa sus emociones, pensamientos o sentimientos en relación con la realidad social o política que vive su país. A través de esta herramienta de comunicación el artista intenta transmitir o expresar los acuerdos o desacuerdos, desigualdades o injusticias que se viven en una sociedad.' },
      { type: 'instruction', content: '1. Observa con atención los siguientes murales que encontraron Paulina y Erick:' },
      { type: 'imageGroup', images: [
        { src: '/images/mural_1.png', alt: 'Mural 1' },
        { src: '/images/mural_2.png', alt: 'Mural 2' }
      ]},
      { type: 'image', src: '/images/mural_3.png', alt: 'Mural 3' },
      { type: 'instruction', content: 'La maestra de Paulina y Erick notó su interés por el arte y les pidió que plantearan un problema con algunas figuras geométricas del mural de Diana Ordoñez.' },
      { type: 'instruction', content: '2. Lee con atención el problema que propusieron Paulina y Erick.' },
      { 
        type: 'imageTable',
        headers: ['', 'Datos', 'Problema'],
        rows: [
          [
            { type: 'image', src: '/images/tabla_2_1.png' },
            { type: 'image', src: '/images/tabla_2_2.png' },
            { type: 'image', src: '/images/tabla_2_3.png' }
          ]
        ]
      }
    ],
    tableData: null,
    consigna1: 'Explica brevemente lo que harías para resolver el problema.',
    consigna2: null
  }
];
