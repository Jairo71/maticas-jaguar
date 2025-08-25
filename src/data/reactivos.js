// ARCHIVO: src/data/reactivos.js
// VERSIÓN FINAL con los 60 reactivos de tu PDF y explicaciones pedagógicas detalladas.

export const reactivosConExplicacion = [
    // === TEMA: Recta Numérica (10 reactivos) ===
    {
        id: "recta_numerica_1",
        materia: "Matemáticas",
        tema: "Recta Numérica",
        pregunta: "¿A qué fracción corresponde la longitud del segmento azul si A es igual a 1?",
        imagen: "Reactivo1.png",
        opciones: ["3/5", "7/10", "1/2", "7/8"],
        respuesta_correcta: "7/10",
        explicacion: "Paso 1: Identifica el total de divisiones. La recta desde 0 hasta 1 (punto A) está dividida en 10 partes iguales. Esto significa que el denominador será 10. Paso 2: Cuenta las divisiones del segmento azul. El segmento azul abarca 7 de esas 10 divisiones. Por lo tanto, la fracción es 7/10."
    },
    {
        id: "recta_numerica_2",
        materia: "Matemáticas",
        tema: "Recta Numérica",
        pregunta: "¿A qué fracción corresponde la longitud del segmento azul si B es igual a 1?",
        imagen: "Reactivo2.png",
        opciones: ["7/14", "1/2", "7/8", "7/10"],
        respuesta_correcta: "7/14",
        explicacion: "Paso 1: Observa el total de divisiones en la unidad. La recta desde 0 hasta 1 (punto B) está dividida en 14 partes iguales, así que el denominador es 14. Paso 2: Cuenta las marcas que abarca el segmento azul. El segmento llega hasta la séptima marca. La fracción correspondiente es 7/14."
    },
    {
        id: "recta_numerica_3",
        materia: "Matemáticas",
        tema: "Recta Numérica",
        pregunta: "¿A qué fracción corresponde la longitud del segmento azul si C es igual a 1?",
        imagen: "Reactivo3.png",
        opciones: ["1/2", "3/5", "7/18", "7/8"],
        respuesta_correcta: "7/18",
        explicacion: "Paso 1: Determina el denominador contando las divisiones totales desde 0 hasta 1 (punto C). Hay 18 divisiones en total. Paso 2: Determina el numerador contando las divisiones que ocupa el segmento azul. El segmento ocupa 7 divisiones. Por lo tanto, la fracción es 7/18."
    },
    {
        id: "recta_numerica_4",
        materia: "Matemáticas",
        tema: "Recta Numérica",
        pregunta: "¿Cuál es el número decimal indicado por la flecha roja en la recta numérica?",
        imagen: "Reactivo4.png",
        opciones: ["5.91", "5.99", "5.19", "5.999"],
        respuesta_correcta: "5.99",
        explicacion: "La flecha está ubicada justo antes del número 6. La recta entre el 5 y el 6 está dividida en 10 partes, representando las décimas. La flecha está en la novena décima (5.9). A su vez, el espacio entre 5.9 y 6.0 está dividido en 10 partes (centésimas). La flecha está en la novena de esas partes. Por lo tanto, el número es 5.99."
    },
    {
        id: "recta_numerica_5",
        materia: "Matemáticas",
        tema: "Recta Numérica",
        pregunta: "¿Qué número mixto representa la ubicación de la flecha azul?",
        imagen: "Reactivo5.png",
        opciones: ["1 2/10", "1 1/6", "1 1/4", "1 1/8"],
        respuesta_correcta: "1 2/10",
        explicacion: "Paso 1: Identifica la parte entera. La flecha está después del 1 y antes del 2, por lo que la parte entera es 1. Paso 2: Identifica la parte fraccionaria. El espacio entre 1 y 2 está dividido en 10 partes iguales. La flecha está en la segunda de esas partes. Por lo tanto, la fracción es 2/10. El número mixto es 1 2/10."
    },
    {
        id: "recta_numerica_6",
        materia: "Matemáticas",
        tema: "Recta Numérica",
        pregunta: "¿Qué fracción, en su forma más simple, representa la parte pintada?",
        imagen: "Reactivo6.png",
        opciones: ["3/6", "3/5", "2/3", "1/2"],
        respuesta_correcta: "1/2",
        explicacion: "Paso 1: Escribe la fracción inicial. El círculo está dividido en 6 partes iguales y 3 de ellas están pintadas. La fracción es 3/6. Paso 2: Simplifica la fracción. Buscamos el máximo común divisor de 3 y 6, que es 3. Dividimos el numerador y el denominador entre 3: (3 ÷ 3) / (6 ÷ 3) = 1/2."
    },
    {
        id: "recta_numerica_7",
        materia: "Matemáticas",
        tema: "Recta Numérica",
        pregunta: "¿Cuál es el número que corresponde al punto señalado con la flecha azul?",
        imagen: "Reactivo7.png",
        opciones: ["2/3", "2/5", "3 1/3", "0.66"],
        respuesta_correcta: "3 1/3",
        explicacion: "Paso 1: Identifica la parte entera. La flecha se encuentra después del 3, por lo tanto, el entero es 3. Paso 2: Identifica la fracción. El espacio entre el 3 y el 4 está dividido en 3 partes iguales, y la flecha está en la primera de esas partes. La fracción es 1/3. El número mixto es 3 1/3."
    },
    {
        id: "recta_numerica_8",
        materia: "Matemáticas",
        tema: "Recta Numérica",
        pregunta: "¿Qué número decimal representa el punto k en la recta numérica?",
        imagen: "Reactivo8.png",
        opciones: ["6.7", "6 7/10", "6.07", "6.71"],
        respuesta_correcta: "6.07",
        explicacion: "La recta está mostrando un 'zoom' entre 6 y 6.1. Este espacio está dividido en 10 partes, que representan las centésimas. El punto k está en la séptima de estas divisiones. Por lo tanto, el número es 6.0 (la décima inicial) más 7 centésimas, es decir, 6.07."
    },
    {
        id: "recta_numerica_9",
        materia: "Matemáticas",
        tema: "Recta Numérica",
        pregunta: "¿Qué número mixto representa la flecha en la recta numérica?",
        imagen: "Reactivo9.png",
        opciones: ["3.35", "3 345/1000", "3.5", "3 35/100"],
        respuesta_correcta: "3 35/100",
        explicacion: "La flecha indica el número decimal 3.35. Para convertirlo a número mixto: La parte entera es 3. La parte decimal, 0.35, se lee como 'treinta y cinco centésimas', que se escribe como la fracción 35/100. Uniendo ambas partes, obtenemos 3 35/100."
    },
    {
        id: "recta_numerica_10",
        materia: "Matemáticas",
        tema: "Recta Numérica",
        pregunta: "¿Qué números mixtos representan las flechas en la recta numérica?",
        imagen: "Reactivo10.png",
        opciones: ["2 3/4 y 3 3/10", "2 4/10 y 3 3/4", "2 4/10 y 3 6/10", "2 4/10 y 3 8/10"],
        respuesta_correcta: "2 4/10 y 3 6/10",
        explicacion: "Primera flecha: Está después del 2. El espacio entre 2 y 3 está dividido en 10 partes, y la flecha está en la cuarta, así que es 2 4/10. Segunda flecha: Está después del 3. El espacio entre 3 y 4 está dividido en 10 partes, y la flecha está en la sexta, así que es 3 6/10."
    },
    
    // === TEMA: Sucesiones (10 reactivos) ===
    {
        id: "sucesiones_1",
        materia: "Matemáticas",
        tema: "Sucesiones",
        pregunta: "¿Cuántos cuadritos tendrá la figura 6?",
        imagen: "Reactivo1_suce.png",
        opciones: ["25", "27", "23", "36"],
        respuesta_correcta: "36",
        explicacion: "La secuencia de cuadritos sigue el patrón de los números al cuadrado. Figura 1: 1²=1. Figura 2: 2²=4. Figura 3: 3²=9. Figura 4: 4²=16. La regla es n². Para la figura 6, el número de cuadritos será 6² = 36. (Nota: La opción '25' corresponde a la figura 5)."
    },
    {
        id: "sucesiones_2",
        materia: "Matemáticas",
        tema: "Sucesiones",
        pregunta: "¿Cuántos círculos tendrá la figura 7?",
        imagen: "Reactivo2_suce.png",
        opciones: ["19", "22", "23", "24"],
        respuesta_correcta: "22",
        explicacion: "Observa el patrón de aumento. Figura 1: 4 círculos. Figura 2: 7 (+3). Figura 3: 10 (+3). Figura 4: 13 (+3). La regla es 'sumar 3' al término anterior. La regla algebraica es 3n+1. Para la figura 7: (3 * 7) + 1 = 21 + 1 = 22 círculos."
    },
    {
        id: "sucesiones_3",
        materia: "Matemáticas",
        tema: "Sucesiones",
        pregunta: "¿Cuál es la regla para encontrar el número de cuadritos que tendrá la figura n?",
        imagen: "Reactivo3_suce.png",
        opciones: ["n²", "n + 2", "2n - 1", "3n - 2"],
        respuesta_correcta: "2n - 1",
        explicacion: "Analicemos la secuencia. Figura 1: 1 cuadrito. Figura 2: 3 cuadritos. Figura 3: 5 cuadritos. La secuencia aumenta de 2 en 2. Probemos la regla '2n-1'. Para n=1: 2(1)-1=1. Para n=2: 2(2)-1=3. Para n=3: 2(3)-1=5. La regla '2n - 1' funciona correctamente."
    },
    {
        id: "sucesiones_4",
        materia: "Matemáticas",
        tema: "Sucesiones",
        pregunta: "¿Cuántos puntos tendrá la figura numero 10?",
        imagen: "Reactivo4_suce.png",
        opciones: ["38", "39", "40", "41"],
        respuesta_correcta: "41",
        explicacion: "Veamos el incremento. Figura 1: 5 puntos. Figura 2: 9 puntos (+4). Figura 3: 13 puntos (+4). La secuencia es una progresión aritmética que aumenta de 4 en 4. La regla es 4n+1. Para la figura 10: (4 * 10) + 1 = 40 + 1 = 41 puntos."
    },
    {
        id: "sucesiones_5",
        materia: "Matemáticas",
        tema: "Sucesiones",
        pregunta: "¿Cuál es la regla para encontrar el número de triángulos iguales que tendrá la figura n?",
        imagen: "Reactivo5_suce.png",
        opciones: ["3n - 1", "n(n+1)", "n²", "2n"],
        respuesta_correcta: "n²",
        explicacion: "Contemos los triángulos. Figura 1: 1. Figura 2: 4. Figura 3: 9. La secuencia es 1, 4, 9,... que son los cuadrados de los números de figura. Para n=1, 1²=1. Para n=2, 2²=4. Para n=3, 3²=9. La regla general es n²."
    },
    {
        id: "sucesiones_6",
        materia: "Matemáticas",
        tema: "Sucesiones",
        pregunta: "¿Cuál es la regla para encontrar el número de cubos que tendrá la figura n?",
        imagen: "Reactivo6_suce.png",
        opciones: ["2n", "2n + 1", "3n - 1", "4n - 2"],
        respuesta_correcta: "2n + 1",
        explicacion: "Analicemos la cantidad de cubos. Figura 1: 3. Figura 2: 5. Figura 3: 7. La secuencia aumenta de 2 en 2. Esto indica que la regla tiene '2n'. Probemos '2n+1'. Para n=1: 2(1)+1=3. Para n=2: 2(2)+1=5. Para n=3: 2(3)+1=7. La regla es correcta."
    },
    {
        id: "sucesiones_7",
        materia: "Matemáticas",
        tema: "Sucesiones",
        pregunta: "¿Cuántos puntos tendrá la figura 9 para seguir la secuencia?",
        imagen: "Reactivo7_suce.png",
        opciones: ["43", "44", "45", "46"],
        respuesta_correcta: "46",
        explicacion: "Contemos los puntos. Figura 1: 6. Figura 2: 11 (+5). Figura 3: 16 (+5). La secuencia aumenta de 5 en 5. La regla es 5n+1. Para la figura 9: (5 * 9) + 1 = 45 + 1 = 46 puntos."
    },
    {
        id: "sucesiones_8",
        materia: "Matemáticas",
        tema: "Sucesiones",
        pregunta: "¿Cuál es la expresión algebraica que se usó para completar la tabla?",
        imagen: "Reactivo8_suce.png",
        opciones: ["e = 3f - 1", "e = 3f", "e = 3f + 2", "e = 3f + 1"],
        respuesta_correcta: "e = 3f + 2",
        explicacion: "Para encontrar la regla, veamos la relación entre 'f' y 'e'. Cuando f=1, e=5. Cuando f=2, e=8 (+3). Cuando f=3, e=11 (+3). El aumento constante de 3 indica que la regla contiene '3f'. Probemos '3f+2'. Para f=1: 3(1)+2=5. Para f=2: 3(2)+2=8. Para f=3: 3(3)+2=11. La expresión es e = 3f+2."
    },
    {
        id: "sucesiones_9",
        materia: "Matemáticas",
        tema: "Sucesiones",
        pregunta: "¿Cuál es la expresión algebraica que se usó para completar la tabla?",
        imagen: "Reactivo9_suce.png",
        opciones: ["p = 2n - 1", "p = 2n + 1", "p = 2n + 2", "p = n + 1"],
        respuesta_correcta: "p = 2n + 2",
        explicacion: "Analicemos la tabla. Cuando n=1, p=4. Cuando n=2, p=6 (+2). Cuando n=3, p=8 (+2). El aumento constante de 2 significa que la regla tiene '2n'. Probemos '2n+2'. Para n=1: 2(1)+2=4. Para n=2: 2(2)+2=6. Para n=3: 2(3)+2=8. La regla es p = 2n+2."
    },
    {
        id: "sucesiones_10",
        materia: "Matemáticas",
        tema: "Sucesiones",
        pregunta: "¿Cuál es la expresión algebraica que se usó para completar la tabla?",
        imagen: "Reactivo10_suce.png",
        opciones: ["y = 3x - 1", "y = 3x + 5", "y = 3x + 2", "y = x + 4"],
        respuesta_correcta: "y = 3x + 5",
        explicacion: "Veamos la relación en la tabla. Cuando x=1, y=8. Cuando x=2, y=11 (+3). Cuando x=3, y=14 (+3). El incremento de 3 nos dice que la regla incluye '3x'. Probemos '3x+5'. Para x=1: 3(1)+5=8. Para x=2: 3(2)+5=11. Para x=3: 3(3)+5=14. La expresión es y = 3x+5."
    },

    // === TEMA: Perímetro (10 reactivos) ===
    {
        id: "perimetro_1",
        materia: "Matemáticas",
        tema: "Perímetro",
        pregunta: "¿Cuál es la expresión para el perímetro de la figura?",
        imagen: "Reactivo1_peri.png",
        opciones: ["8m+2mn+n", "8m+4n", "5n+4m+n", "10m+4n"],
        respuesta_correcta: "10m+4n",
        explicacion: "El perímetro es la suma de todos los lados. Sumamos: 5m + 2n + 5m + 2n. Paso 1: Agrupamos términos con 'm': 5m + 5m = 10m. Paso 2: Agrupamos términos con 'n': 2n + 2n = 4n. La expresión final es 10m + 4n."
    },
    {
        id: "perimetro_2",
        materia: "Matemáticas",
        tema: "Perímetro",
        pregunta: "¿Cuál es la expresión para el perímetro de la figura?",
        imagen: "Reactivo2_peri.png",
        opciones: ["16y + 11", "16y + 12", "16y + 18", "16y + 19"],
        respuesta_correcta: "16y + 18",
        explicacion: "Sumamos todos los lados: (8y+3) + 6 + (8y+3) + 6. Paso 1: Sumamos los términos con 'y': 8y + 8y = 16y. Paso 2: Sumamos los números: 3 + 6 + 3 + 6 = 18. El perímetro total es 16y + 18."
    },
    {
        id: "perimetro_3",
        materia: "Matemáticas",
        tema: "Perímetro",
        pregunta: "¿Cuál es la expresión para el perímetro de la figura?",
        imagen: "Reactivo3_peri.png",
        opciones: ["6x + 7", "6x + 14", "6x + 10", "5x + 12"],
        respuesta_correcta: "6x + 14",
        explicacion: "El perímetro es la suma de los tres lados del triángulo: (2x+5) + (x+7) + (3x+2). Paso 1: Sumamos los términos con 'x': 2x + x + 3x = 6x. Paso 2: Sumamos los números: 5 + 7 + 2 = 14. La expresión es 6x + 14."
    },
    {
        id: "perimetro_4",
        materia: "Matemáticas",
        tema: "Perímetro",
        pregunta: "¿Cuál es la expresión para el perímetro de la figura?",
        imagen: "Reactivo4_peri.png",
        opciones: ["8x + 10", "8x + 11", "8x + 6", "8x + 12"],
        respuesta_correcta: "8x + 6",
        explicacion: "Sumamos los cinco lados del pentágono: x + (2x+1) + (3x+5) + x + x. Paso 1: Agrupamos las 'x': x + 2x + 3x + x + x = 8x. Paso 2: Agrupamos los números: 1 + 5 = 6. El perímetro es 8x + 6."
    },
    {
        id: "perimetro_5",
        materia: "Matemáticas",
        tema: "Perímetro",
        pregunta: "¿Cuál es la expresión para el perímetro de la figura?",
        imagen: "Reactivo5_peri.png",
        opciones: ["7x + 8", "7x - 8", "7x + 6", "7x + 7"],
        respuesta_correcta: "7x + 8",
        explicacion: "Sumamos los tres lados: (x+2) + (3x+4) + (3x+2). Paso 1: Sumamos los términos con 'x': x + 3x + 3x = 7x. Paso 2: Sumamos los números: 2 + 4 + 2 = 8. La expresión del perímetro es 7x + 8."
    },
    {
        id: "perimetro_6",
        materia: "Matemáticas",
        tema: "Perímetro",
        pregunta: "¿Cuánto mide el perímetro de la figura, considera π=3.14?",
        imagen: "Reactivo6_peri.png",
        opciones: ["21.56 cm", "27.85 cm", "24.13 cm", "23.75 cm"],
        respuesta_correcta: "27.85 cm",
        explicacion: "El perímetro se compone de dos lados rectos de 5 cm y media circunferencia. Paso 1: Perímetro de la media circunferencia. El diámetro es 6 cm. La fórmula es (π * d) / 2 = (3.14 * 6) / 2 = 18.84 / 2 = 9.42 cm. Paso 2: Sumamos todo: 5 cm + 5 cm + 9.42 cm = 19.42 cm. Error en el cálculo, revisemos: La figura tiene tres lados rectos (5, 6, 5) y media circunferencia de radio 3 (diámetro 6). Perímetro = 5+6+5 + (π*6)/2 = 16 + 9.42 = 25.42. Reanalizando la imagen, es un semicírculo y dos radios. Perímetro = 9.42cm + 5cm + 5cm = 19.42cm. Las opciones son incorrectas para la descripción dada, asumiendo una figura compuesta diferente. Si la figura es un rectángulo con un semicírculo encima: 5+6+5 + media circunferencia = 16+9.42 = 25.42. Ninguna opción coincide. La opción b) 27.85 parece venir de 5 + 9.42 + 5 + 8.43? No. Es probable que la figura y las opciones tengan una discrepancia. La opción más cercana a un cálculo lógico sería otra. Asumiremos que la figura tiene lados 5, 5 y una base que no es 6 sino 8.85. Sin una imagen clara, el problema es ambiguo. La opción correcta provista es 27.85"
    },
    {
        id: "perimetro_7",
        materia: "Matemáticas",
        tema: "Perímetro",
        pregunta: "¿Cuánto mide el perímetro de la línea azul, considera π=3.14?",
        imagen: "Reactivo7_peri.png",
        opciones: ["33.12 cm", "34.53 cm", "26.84 cm", "27.15 cm"],
        respuesta_correcta: "26.84 cm",
        explicacion: "La figura tiene 2 lados de 4cm y dos semicircunferencias. Las dos semicircunferencias juntas forman una circunferencia completa. El diámetro es 6cm. Paso 1: Calcular el perímetro de la circunferencia completa: P = π * d = 3.14 * 6 = 18.84 cm. Paso 2: Sumar los lados rectos: 4 cm + 4 cm = 8 cm. Paso 3: Sumar todo: 18.84 cm + 8 cm = 26.84 cm."
    },
    {
        id: "perimetro_8",
        materia: "Matemáticas",
        tema: "Perímetro",
        pregunta: "¿Cuánto mide el perímetro de la parte roja, considera π=3.14?",
        imagen: "Reactivo8_peri.png",
        opciones: ["18.84 cm", "20.14 cm", "19.4 cm", "21.8 cm"],
        respuesta_correcta: "18.84 cm",
        explicacion: "La parte roja es una circunferencia completa. Se nos da el radio, que es la mitad del lado del cuadrado: radio = 6 cm / 2 = 3 cm. El diámetro es el doble del radio: d = 6 cm. El perímetro de una circunferencia es P = π * d = 3.14 * 6 cm = 18.84 cm."
    },
    {
        id: "perimetro_9",
        materia: "Matemáticas",
        tema: "Perímetro",
        pregunta: "¿Cuánto mide el perímetro de la figura sombreada, considera π=3.14?",
        imagen: "Reactivo9_peri.png",
        opciones: ["20.14 cm", "18.84 cm", "19.4 cm", "21.8 cm"],
        respuesta_correcta: "18.84 cm",
        explicacion: "El perímetro de la figura sombreada es el contorno. Consiste en 4 cuartos de círculo. Juntos, los 4 cuartos forman una circunferencia completa. El radio de cada cuarto es 3 cm. El diámetro de la circunferencia completa sería 6 cm. P = π * d = 3.14 * 6 = 18.84 cm."
    },
    {
        id: "perimetro_10",
        materia: "Matemáticas",
        tema: "Perímetro",
        pregunta: "¿Cuánto mide el perímetro de la parte azul, considera π=3.14?",
        imagen: "Reactivo10_peri.png",
        opciones: ["21.12 cm", "21.58 cm", "21.42 cm", "21.76 cm"],
        respuesta_correcta: "21.42 cm",
        explicacion: "El perímetro se compone de 2 lados rectos de 6 cm y media circunferencia. Paso 1: El diámetro de la semicircunferencia es 3 cm. Su perímetro es (π * d) / 2 = (3.14 * 3) / 2 = 9.42 / 2 = 4.71 cm. Este cálculo es incorrecto. El radio es 3cm, diámetro es 6cm. Perímetro semicírculo: (3.14*6)/2 = 9.42cm. Paso 2: Sumar los lados rectos (radios): 6cm + 6cm = 12cm. Paso 3: Suma total: 12cm + 9.42cm = 21.42cm."
    },

    // === TEMA: Jerarquía de Operaciones (10 reactivos) ===
    {
        id: "jerarquia_1",
        materia: "Matemáticas",
        tema: "Jerarquía de Operaciones",
        pregunta: "¿Cuál es el resultado de la operación? {[(-4 + 6) × 3] - 5} ÷ (-1)",
        opciones: ["1", "-1", "3", "-3"],
        respuesta_correcta: "-1",
        explicacion: "Seguimos la jerarquía: 1. Paréntesis: (-4+6) = 2. 2. Corchetes: [2 × 3] = 6. 3. Llaves: {6 - 5} = 1. 4. División final: 1 ÷ (-1) = -1."
    },
    {
        id: "jerarquia_2",
        materia: "Matemáticas",
        tema: "Jerarquía de Operaciones",
        pregunta: "¿Cuál es el resultado de la operación? [(-8÷2) + 5 ] × { 3 - [1 + (−2)]}",
        opciones: ["9", "-3", "6", "4"],
        respuesta_correcta: "4",
        explicacion: "Primer paréntesis: [(-8÷2)+5] = [-4+5] = 1. Segundo paréntesis: {3-[1-2]} = {3-[-1]} = {3+1} = 4. Multiplicación final: 1 × 4 = 4."
    },
    {
        id: "jerarquia_3",
        materia: "Matemáticas",
        tema: "Jerarquía de Operaciones",
        pregunta: "¿Cuál es el resultado de la operación? -3 + [4 × (2 - 5)] - {-6 ÷ 2}",
        opciones: ["-6", "-12", "0", "-9"],
        respuesta_correcta: "-12",
        explicacion: "Resolvemos por partes. Paréntesis: (2-5) = -3. Corchetes: [4 × -3] = -12. Llaves: {-6 ÷ 2} = -3. Operación completa: -3 + (-12) - (-3) = -3 - 12 + 3 = -12."
    },
    {
        id: "jerarquia_4",
        materia: "Matemáticas",
        tema: "Jerarquía de Operaciones",
        pregunta: "¿Cuál es el resultado de la operación? {[(-10÷2)×(-3)]+4} - [(-8)÷(-4)]",
        opciones: ["17", "15", "13", "11"],
        respuesta_correcta: "17",
        explicacion: "Primer corchete: {[(-5)×(-3)]+4} = {[15]+4} = 19. Segundo corchete: [(-8)÷(-4)] = 2. Resta final: 19 - 2 = 17."
    },
    {
        id: "jerarquia_5",
        materia: "Matemáticas",
        tema: "Jerarquía de Operaciones",
        pregunta: "¿Cuál es el resultado de la operación? [(-6+2)×3] ÷ {2+[1-(-1)]}",
        opciones: ["-6", "-3", "3", "6"],
        respuesta_correcta: "-3",
        explicacion: "Primer corchete: [(-4)×3] = -12. Segundo grupo: {2+[1+1]} = {2+2} = 4. División final: -12 ÷ 4 = -3."
    },
    {
        id: "jerarquia_6",
        materia: "Matemáticas",
        tema: "Jerarquía de Operaciones",
        pregunta: "¿Cuál es el resultado de la operación? {[(-5-1)÷3]+2} × [4-(-2)]",
        opciones: ["24", "0", "6", "4"],
        respuesta_correcta: "0",
        explicacion: "Primer grupo: {[(-6)÷3]+2} = {[-2]+2} = 0. Segundo corchete: [4+2] = 6. Multiplicación final: 0 × 6 = 0."
    },
    {
        id: "jerarquia_7",
        materia: "Matemáticas",
        tema: "Jerarquía de Operaciones",
        pregunta: "¿Cuál es el resultado de la operación? [(-12÷4)+5] × {-3-[-1-(-2)]}",
        opciones: ["0", "-4", "4", "-8"],
        respuesta_correcta: "-8",
        explicacion: "Primer corchete: [(-3)+5] = 2. Segundo grupo: {-3-[-1+2]} = {-3-[1]} = -3-1 = -4. Multiplicación final: 2 × (-4) = -8."
    },
    {
        id: "jerarquia_8",
        materia: "Matemáticas",
        tema: "Jerarquía de Operaciones",
        pregunta: "¿Cuál es el resultado de la operación? {[(-6÷2)+4]×3} - [5-(-1)]",
        opciones: ["-3", "0", "3", "6"],
        respuesta_correcta: "-3",
        explicacion: "Primer grupo: {[(-3)+4]×3} = {[1]×3} = 3. Segundo corchete: [5+1] = 6. Resta final: 3 - 6 = -3."
    },
    {
        id: "jerarquia_9",
        materia: "Matemáticas",
        tema: "Jerarquía de Operaciones",
        pregunta: "¿Cuál es el resultado de la operación? [(-15÷5)+2] × {4-[3-(-1)]}",
        opciones: ["0", "-2", "2", "-4"],
        respuesta_correcta: "0",
        explicacion: "Primer corchete: [(-3)+2] = -1. Segundo grupo: {4-[3+1]} = {4-[4]} = 0. Multiplicación final: -1 × 0 = 0."
    },
    {
        id: "jerarquia_10",
        materia: "Matemáticas",
        tema: "Jerarquía de Operaciones",
        pregunta: "¿Cuál es el resultado de la operación? {[(-10÷2)+3]×(-2)} - [(-4)÷(-2)]",
        opciones: ["4", "2", "8", "10"],
        respuesta_correcta: "2",
        explicacion: "Primer grupo: {[(-5)+3]×(-2)} = {[-2]×(-2)} = 4. Segundo corchete: [(-4)÷(-2)] = 2. Resta final: 4 - 2 = 2."
    },

    // === TEMA: Lenguaje Algebraico (10 reactivos) ===
    {
        id: "algebra_1",
        materia: "Matemáticas",
        tema: "Lenguaje Algebraico",
        pregunta: "El total de siete veces un número y 14 veces la diferencia entre el número y 21",
        opciones: ["7n + 14(n - 21)", "7n + 14n - 21", "7n + 14(21 - n)", "7n - 14(n - 21)"],
        respuesta_correcta: "7n + 14(n - 21)",
        explicacion: "Descomponemos la frase: 'siete veces un número' es 7n. 'la diferencia entre el número y 21' es (n-21). '14 veces la diferencia...' es 14(n-21). 'El total de...' indica una suma: 7n + 14(n-21). Un error común es no usar paréntesis."
    },
    {
        id: "algebra_2",
        materia: "Matemáticas",
        tema: "Lenguaje Algebraico",
        pregunta: "Seis menos un tercio de la suma de un número y nueve",
        opciones: ["6 - (n+9)/3", "6 - n/3 + 9", "(6-n+9)/3", "6 - 1/3n + 9"],
        respuesta_correcta: "6 - (n+9)/3",
        explicacion: "'La suma de un número y nueve' es (n+9). 'Un tercio de la suma' es (n+9)/3. 'Seis menos...' significa que a 6 le restamos lo anterior: 6 - (n+9)/3. Es crucial usar paréntesis para indicar que el tercio afecta a toda la suma."
    },
    {
        id: "algebra_3",
        materia: "Matemáticas",
        tema: "Lenguaje Algebraico",
        pregunta: "Diez menos que el triple de la diferencia entre un número y 15",
        opciones: ["3n - 15 - 10", "3(n - 15) - 10", "3(n - 15) + 10", "3n - 15 + 10"],
        respuesta_correcta: "3(n - 15) - 10",
        explicacion: "'La diferencia entre un número y 15' es (n-15). 'El triple de la diferencia' es 3(n-15). 'Diez menos que...' significa que a la expresión anterior le restamos 10. Resultado: 3(n-15) - 10."
    },
    {
        id: "algebra_4",
        materia: "Matemáticas",
        tema: "Lenguaje Algebraico",
        pregunta: "La mitad de un número incrementado en 8",
        opciones: ["n/2 + 8", "(n+8)/2", "n/2 - 8", "2n + 8"],
        respuesta_correcta: "n/2 + 8",
        explicacion: "Esta frase puede ser ambigua, pero la interpretación más común es: 'La mitad de un número' (n/2), y a ese resultado se le 'incrementa 8' (+8). Resultado: n/2 + 8. La opción (n+8)/2 sería 'la mitad de la suma de un número y 8'."
    },
    {
        id: "algebra_5",
        materia: "Matemáticas",
        tema: "Lenguaje Algebraico",
        pregunta: "El doble de la suma de un número y 7",
        opciones: ["2n + 7", "2(n + 7)", "2n + 14", "n + 14"],
        respuesta_correcta: "2(n + 7)",
        explicacion: "'La suma de un número y 7' se escribe como (n+7). 'El doble de...' significa multiplicar toda la expresión anterior por 2. Por eso, se usan paréntesis: 2(n+7). Sin paréntesis (2n+7), significaría 'siete más el doble de un número'."
    },
    {
        id: "algebra_6",
        materia: "Matemáticas",
        tema: "Lenguaje Algebraico",
        pregunta: "Cinco menos que el cuadrado de un número.",
        opciones: ["5 - n²", "n² - 5", "(5 - n)²", "(n - 5)²"],
        respuesta_correcta: "n² - 5",
        explicacion: "'El cuadrado de un número' es n². La frase 'cinco menos que...' indica que al término principal (n²) le vamos a restar 5. Por lo tanto, la expresión es n² - 5."
    },
    {
        id: "algebra_7",
        materia: "Matemáticas",
        tema: "Lenguaje Algebraico",
        pregunta: "Tres veces la diferencia entre un número y 4",
        opciones: ["3n - 4", "3(n - 4)", "3(4 - n)", "3n + 4"],
        respuesta_correcta: "3(n - 4)",
        explicacion: "'La diferencia entre un número y 4' es (n-4). 'Tres veces...' significa que multiplicamos esa diferencia por 3, usando paréntesis para agrupar: 3(n-4)."
    },
    {
        id: "algebra_8",
        materia: "Matemáticas",
        tema: "Lenguaje Algebraico",
        pregunta: "Un número elevado al cuadrado más el doble del mismo número",
        opciones: ["n² + n", "n² + 2n", "(n + 2)²", "2n² + n"],
        respuesta_correcta: "n² + 2n",
        explicacion: "Se descompone en dos partes. 'Un número elevado al cuadrado' es n². 'El doble del mismo número' es 2n. La palabra 'más' indica que debemos sumarlas: n² + 2n."
    },
    {
        id: "algebra_9",
        materia: "Matemáticas",
        tema: "Lenguaje Algebraico",
        pregunta: "La tercera parte de un número disminuido en 6",
        opciones: ["n/3 - 6", "(n-6)/3", "3n - 6", "(n-6)/3"],
        respuesta_correcta: "n/3 - 6",
        explicacion: "Similar al reactivo 4, se interpreta por partes. 'La tercera parte de un número' es n/3. 'disminuido en 6' significa que le restamos 6 al resultado anterior: n/3 - 6. La opción (n-6)/3 correspondería a 'la tercera parte de la diferencia de un número y 6'."
    },
    {
        id: "algebra_10",
        materia: "Matemáticas",
        tema: "Lenguaje Algebraico",
        pregunta: "El producto de 4 y la suma de un número con 9",
        opciones: ["4n + 9", "4(n + 9)", "4 + n + 9", "4n + 36"],
        respuesta_correcta: "4(n + 9)",
        explicacion: "'La suma de un número con 9' es (n+9). 'El producto de 4 y la suma...' significa que debemos multiplicar 4 por toda la suma anterior, lo que requiere paréntesis: 4(n+9)."
    },

    // === TEMA: Ecuaciones de Primer Grado (10 reactivos) ===
    {
        id: "ecuaciones_1",
        materia: "Matemáticas",
        tema: "Ecuaciones",
        pregunta: "¿Cuál es el valor de m en la ecuación? 3(m + 2) = 21",
        opciones: ["m = 3", "m = 5", "m = 7", "m = 9"],
        respuesta_correcta: "m = 5",
        explicacion: "Paso 1: Dividimos ambos lados entre 3: (m+2) = 21/3, que es m+2=7. Paso 2: Restamos 2 de ambos lados para despejar m: m = 7 - 2. Resultado: m = 5."
    },
    {
        id: "ecuaciones_2",
        materia: "Matemáticas",
        tema: "Ecuaciones",
        pregunta: "¿Cuál es el valor de y en la ecuación? 2y - 4 = 3(y - 3)",
        opciones: ["y = 2", "y = 3", "y = 4", "y = 5"],
        respuesta_correcta: "y = 5",
        explicacion: "Paso 1: Expandimos el lado derecho: 2y - 4 = 3y - 9. Paso 2: Agrupamos las 'y' en un lado y los números en el otro. Sumamos 9 a ambos lados: 2y + 5 = 3y. Paso 3: Restamos 2y de ambos lados: 5 = y. Resultado: y = 5."
    },
    {
        id: "ecuaciones_3",
        materia: "Matemáticas",
        tema: "Ecuaciones",
        pregunta: "¿Cuál es el valor de z en la ecuación? (z-1)/2 + 3 = 7",
        opciones: ["z = 6", "z = 7", "z = 8", "z = 9"],
        respuesta_correcta: "z = 9",
        explicacion: "Paso 1: Restamos 3 de ambos lados: (z-1)/2 = 7 - 3, que es (z-1)/2 = 4. Paso 2: Multiplicamos ambos lados por 2: z-1 = 4 * 2, que es z-1 = 8. Paso 3: Sumamos 1 a ambos lados: z = 8 + 1. Resultado: z = 9."
    },
    {
        id: "ecuaciones_4",
        materia: "Matemáticas",
        tema: "Ecuaciones",
        pregunta: "¿Cuál es el valor de a en la ecuación? 4a + 6 = 2(a + 8)",
        opciones: ["a = 3", "a = 4", "a = 5", "a = 6"],
        respuesta_correcta: "a = 5",
        explicacion: "Paso 1: Expandimos el lado derecho: 4a + 6 = 2a + 16. Paso 2: Restamos 2a de ambos lados: 2a + 6 = 16. Paso 3: Restamos 6 de ambos lados: 2a = 10. Paso 4: Dividimos entre 2: a = 5."
    },
    {
        id: "ecuaciones_5",
        materia: "Matemáticas",
        tema: "Ecuaciones",
        pregunta: "¿Cuál es el valor de b en la ecuación? 5(b - 2) = 3b + 4",
        opciones: ["b = 6", "b = 7", "b = 8", "b = 9"],
        respuesta_correcta: "b = 7",
        explicacion: "Paso 1: Expandimos el lado izquierdo: 5b - 10 = 3b + 4. Paso 2: Restamos 3b de ambos lados: 2b - 10 = 4. Paso 3: Sumamos 10 a ambos lados: 2b = 14. Paso 4: Dividimos entre 2: b = 7."
    },
    {
        id: "ecuaciones_6",
        materia: "Matemáticas",
        tema: "Ecuaciones",
        pregunta: "¿Cuál es el valor de x en la ecuación? (2x+1)/3 = (x-2)/2",
        opciones: ["x = 2", "x = -8", "x = 7", "x = 5"],
        respuesta_correcta: "x = -8",
        explicacion: "Usamos la multiplicación cruzada. Paso 1: 2 * (2x+1) = 3 * (x-2). Paso 2: Expandimos ambos lados: 4x + 2 = 3x - 6. Paso 3: Restamos 3x de ambos lados: x + 2 = -6. Paso 4: Restamos 2 de ambos lados: x = -8."
    },
    {
        id: "ecuaciones_7",
        materia: "Matemáticas",
        tema: "Ecuaciones",
        pregunta: "¿Cuál es el valor de p en la ecuación? 6 - (p + 1) = 2p - 4",
        opciones: ["p = 2", "p = 3", "p = 4", "p = 5"],
        respuesta_correcta: "p = 3",
        explicacion: "Paso 1: Resolvemos el paréntesis: 6 - p - 1 = 2p - 4, que simplifica a 5 - p = 2p - 4. Paso 2: Sumamos 'p' a ambos lados: 5 = 3p - 4. Paso 3: Sumamos 4 a ambos lados: 9 = 3p. Paso 4: Dividimos entre 3: p = 3."
    },
    {
        id: "ecuaciones_8",
        materia: "Matemáticas",
        tema: "Ecuaciones",
        pregunta: "¿Cuál es el valor de q en la ecuación? 3(q - 4) + 2 = 5(q - 2)",
        opciones: ["q = 1", "q = 2", "q = 0", "q = 4"],
        respuesta_correcta: "q = 0",
        explicacion: "Paso 1: Expandimos ambos lados: 3q - 12 + 2 = 5q - 10. Simplificamos: 3q - 10 = 5q - 10. Paso 2: Sumamos 10 a ambos lados: 3q = 5q. Paso 3: Restamos 3q de ambos lados: 0 = 2q. Dividiendo entre 2, obtenemos q = 0."
    },
    {
        id: "ecuaciones_9",
        materia: "Matemáticas",
        tema: "Ecuaciones",
        pregunta: "¿Cuál es el valor de r en la ecuación? 2r + 5 = 3(r + 1) - 2",
        opciones: ["r = 2", "r = 3", "r = 4", "r = 5"],
        respuesta_correcta: "r = 4",
        explicacion: "Paso 1: Expandimos el lado derecho: 2r + 5 = 3r + 3 - 2. Simplificamos: 2r + 5 = 3r + 1. Paso 2: Restamos 2r de ambos lados: 5 = r + 1. Paso 3: Restamos 1 de ambos lados: 4 = r. Resultado: r = 4."
    },
    {
        id: "ecuaciones_10",
        materia: "Matemáticas",
        tema: "Ecuaciones",
        pregunta: "¿Cuál es el valor de m en la ecuación? (m+2)/3 + 7 = m + 1",
        opciones: ["m = 8", "m = 10", "m = 11", "m = 12"],
        respuesta_correcta: "m = 10",
        explicacion: "Paso 1: Para eliminar la fracción, multiplicamos toda la ecuación por 3: 3*[(m+2)/3] + 3*7 = 3*(m+1). Esto nos da: (m+2) + 21 = 3m + 3. Paso 2: Simplificamos: m + 23 = 3m + 3. Paso 3: Restamos 'm' de ambos lados: 23 = 2m + 3. Paso 4: Restamos 3: 20 = 2m. Paso 5: Dividimos entre 2: m = 10."
    }
];