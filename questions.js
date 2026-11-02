
/* ==========================================
   MATHQUEST
   BANCO DE QUESTÕES DE MATEMÁTICA
   ========================================== */

window.MATHQUEST_QUESTIONS = [

 /* OPERAÇÕES */

 {
  id:"op1",
  unit:0,
  topic:"Operações",
  title:"Adição em ação",
  prompt:"Resolva a soma.",
  expression:"28 + 17 = ?",
  options:["35","45","46","55"],
  answer:"45",
  explain:"28 + 10 = 38; 38 + 7 = 45.",
  hint:"Separe 17 em 10 + 7."
 },

 {
  id:"op2",
  unit:0,
  topic:"Operações",
  title:"Subtração",
  prompt:"Quanto resta?",
  expression:"63 − 28 = ?",
  options:["25","35","45","41"],
  answer:"35",
  explain:"63 − 20 = 43 e 43 − 8 = 35.",
  hint:"Subtraia primeiro as dezenas e depois as unidades."
 },

 {
  id:"op3",
  unit:0,
  topic:"Operações",
  title:"Multiplicação",
  prompt:"Calcule o produto.",
  expression:"9 × 7 = ?",
  options:["56","63","72","69"],
  answer:"63",
  explain:"Nove grupos de sete totalizam 63.",
  hint:"Pense na tabuada do 9."
 },

 {
  id:"op4",
  unit:0,
  topic:"Operações",
  title:"Divisão exata",
  prompt:"Faça a divisão.",
  expression:"144 ÷ 12 = ?",
  options:["10","11","12","14"],
  answer:"12",
  explain:"12 × 12 = 144, portanto 144 ÷ 12 = 12.",
  hint:"Qual número multiplicado por 12 resulta em 144?"
 },

 /* FRAÇÕES */

 {
  id:"fr1",
  unit:1,
  topic:"Frações",
  title:"Partes iguais",
  prompt:"Qual fração representa metade?",
  expression:"Uma unidade dividida em 2 partes iguais",
  options:["1/3","1/2","2/3","2/1"],
  answer:"1/2",
  explain:"Uma de duas partes iguais é representada por 1/2.",
  hint:"O denominador indica em quantas partes iguais a unidade foi dividida."
 },

 {
  id:"fr2",
  unit:1,
  topic:"Frações",
  title:"Frações equivalentes",
  prompt:"Escolha uma fração equivalente a 1/2.",
  expression:"1/2 = ?",
  options:["2/3","2/4","3/5","4/6"],
  answer:"2/4",
  explain:"Multiplicando numerador e denominador de 1/2 por 2, obtemos 2/4.",
  hint:"Multiplique em cima e embaixo pelo mesmo número."
 },

 {
  id:"fr3",
  unit:1,
  topic:"Frações",
  title:"Somando partes",
  prompt:"As frações têm o mesmo denominador. Some os numeradores.",
  expression:"2/7 + 3/7 = ?",
  options:["5/7","5/14","6/7","1/7"],
  answer:"5/7",
  explain:"2/7 + 3/7 = (2 + 3)/7 = 5/7.",
  hint:"Quando os denominadores são iguais, mantenha o denominador."
 },

 /* ÁLGEBRA */

 {
  id:"al1",
  unit:2,
  topic:"Álgebra",
  title:"Valor desconhecido",
  prompt:"Descubra o valor de x.",
  expression:"x + 8 = 19",
  options:["9","10","11","12"],
  answer:"11",
  explain:"Subtraindo 8 dos dois lados: x = 19 − 8 = 11.",
  hint:"Faça a operação inversa para deixar x sozinho."
 },

 {
  id:"al2",
  unit:2,
  topic:"Álgebra",
  title:"Equação multiplicativa",
  prompt:"Encontre x.",
  expression:"4x = 36",
  options:["8","9","10","12"],
  answer:"9",
  explain:"Dividindo os dois lados por 4: x = 36 ÷ 4 = 9.",
  hint:"Use a divisão para desfazer a multiplicação por 4."
 },

 /* GEOMETRIA */

 {
  id:"geo1",
  unit:3,
  topic:"Geometria",
  title:"Perímetro",
  prompt:"Um quadrado tem lado de 6 cm. Qual é seu perímetro?",
  expression:"P = 4 × lado",
  options:["12 cm","18 cm","24 cm","36 cm"],
  answer:"24 cm",
  explain:"Um quadrado tem quatro lados iguais: 4 × 6 = 24 cm.",
  hint:"Some os quatro lados do quadrado."
 },

 {
  id:"geo2",
  unit:3,
  topic:"Geometria",
  title:"Área do retângulo",
  prompt:"Calcule a área de um retângulo de 8 cm por 5 cm.",
  expression:"Área = base × altura",
  options:["13 cm²","26 cm²","40 cm²","80 cm²"],
  answer:"40 cm²",
  explain:"A área é 8 × 5 = 40 cm².",
  hint:"Multiplique as duas dimensões."
 },

 /* PORCENTAGEM */

 {
  id:"por1",
  unit:4,
  topic:"Porcentagem",
  title:"Desconto",
  prompt:"Um produto custa R$ 100 e recebe 20% de desconto. Qual o preço final?",
  expression:"R$ 100 − 20%",
  options:["R$ 20","R$ 70","R$ 80","R$ 90"],
  answer:"R$ 80",
  explain:"20% de 100 é 20; 100 − 20 = 80.",
  hint:"Calcule primeiro o valor do desconto."
 },

 {
  id:"por2",
  unit:4,
  topic:"Porcentagem",
  title:"Parte de um total",
  prompt:"Quanto é 25% de 200?",
  expression:"25% × 200",
  options:["25","40","50","75"],
  answer:"50",
  explain:"25% é um quarto; 200 ÷ 4 = 50.",
  hint:"25% corresponde a uma das quatro partes iguais."
 },

 /* POTÊNCIAS E RAÍZES */

 {
  id:"pot1",
  unit:5,
  topic:"Potências",
  title:"Potência ao quadrado",
  prompt:"Calcule a potência.",
  expression:"6² = ?",
  options:["12","18","36","64"],
  answer:"36",
  explain:"6² significa 6 × 6, que é 36.",
  hint:"O expoente 2 indica duas ocorrências da base em uma multiplicação."
 },

 {
  id:"pot2",
  unit:5,
  topic:"Potências",
  title:"Raiz quadrada",
  prompt:"Qual é a raiz quadrada principal?",
  expression:"√81 = ?",
  options:["7","8","9","10"],
  answer:"9",
  explain:"9 × 9 = 81, então a raiz quadrada principal é 9.",
  hint:"Procure o número positivo que multiplicado por si mesmo dá 81."
 }

];
    
