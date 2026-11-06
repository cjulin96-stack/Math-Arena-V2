
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
    


/* MathQuest 21.0 — banco ampliado com questões contextualizadas por assunto.
   Mantém o formato original consumido por app.js e não altera o progresso salvo. */
(() => {
  "use strict";
  const bank = window.MATHQUEST_QUESTIONS;
  if (!Array.isArray(bank) || window.MQ21QuestionBankLoaded) return;
  window.MQ21QuestionBankLoaded = true;
  const ids = new Set(bank.map(q => q.id));
  let serial = 0;
  const add = (unit, topic, title, prompt, expression, answer, distractors, explain, hint) => {
    const options = [String(answer), ...distractors.map(String)];
    if (new Set(options).size !== 4) return;
    // Rotaciona a posição da resposta correta para evitar padrão previsível.
    const shift = serial % options.length;
    const shuffled = options.slice(shift).concat(options.slice(0, shift));
    const id = "mq21-" + String(++serial).padStart(3, "0");
    if (ids.has(id)) return;
    ids.add(id);
    bank.push({id, unit, topic, title, prompt, expression, options:shuffled,
      answer:String(answer), explain, hint});
  };

  // Operações: cálculo mental, propriedades e ordem das operações.
  for (let i=1;i<=8;i++) {
    const a=12+i*3, b=7+i*2;
    add(0,"Operações","Adição estratégica","Resolva a adição.",a+" + "+b+" = ?",a+b,[a+b+2,a+b-3,a+b+10],"Some as dezenas e depois as unidades.","Separe os números em partes mais simples.");
    const c=80+i*7, d=18+i;
    add(0,"Operações","Subtração em etapas","Calcule a diferença.",c+" − "+d+" = ?",c-d,[c-d+5,c-d-4,c-d+10],"Subtraia o segundo número do primeiro.","Você pode decompor o número que será subtraído.");
    const m=4+i, n=3+(i%5);
    add(0,"Operações","Multiplicação aplicada","Calcule o produto.",m+" × "+n+" = ?",m*n,[m*n+ n,m*n-m,m+n],"Multiplicar é somar grupos iguais.","Pense em "+m+" grupos de "+n+".");
    const divisor=3+(i%6), quotient=5+i, dividend=divisor*quotient;
    add(0,"Operações","Divisão exata","Encontre o quociente.",dividend+" ÷ "+divisor+" = ?",quotient,[quotient+1,quotient-1,divisor],"A divisão desfaz a multiplicação.","Qual número vezes "+divisor+" resulta em "+dividend+"?");
  }

  // Frações: equivalência, simplificação e operações com denominadores compatíveis.
  for (let i=1;i<=8;i++) {
    const den=3+i, num=1+(i% (den-1));
    add(1,"Frações","Frações equivalentes","Qual fração é equivalente à apresentada?",num+"/"+den+" = ?",(num*2)+"/"+(den*2),[(num+1)+"/"+(den*2),num+"/"+(den*2),(num*2)+"/"+(den+1)],"Multiplique numerador e denominador pelo mesmo número.","Faça a mesma operação em cima e embaixo.");
    const whole=12+i*3, divisor=3;
    add(1,"Frações","Parte de uma quantidade","Calcule a fração da quantidade.", "1/"+divisor+" de "+whole+" = ?",whole/divisor,[whole/(divisor+1),whole/divisor+2,whole/2],"Divida a quantidade pelo denominador.","Divida "+whole+" em "+divisor+" partes iguais.");
    const den2=5+i, n1=1+(i%3), n2=1+((i+1)%3);
    add(1,"Frações","Soma de frações","Some as frações com o mesmo denominador.",n1+"/"+den2+" + "+n2+"/"+den2+" = ?",(n1+n2)+"/"+den2,[(n1+n2)+"/"+(den2*2)+",",Math.abs(n1-n2)+"/"+den2,(n1*n2)+"/"+den2],"Some os numeradores e mantenha o denominador.","Os denominadores já são iguais.");
  }

  // Álgebra: equações lineares com solução inteira.
  for (let i=1;i<=12;i++) {
    const x=i+2, a=2+(i%5), b=3+(i%7), c=a*x+b;
    add(2,"Álgebra","Equação do primeiro grau","Resolva a equação.",a+"x + "+b+" = "+c,"x = "+x,["x = "+(x+1),"x = "+(x-1),"x = "+(x+2)],"Subtraia "+b+" dos dois lados e divida por "+a+".","Isole o termo que contém x.");
    const p=2+(i%4), root=i+1, constant=p*root;
    add(2,"Álgebra","Equação com parênteses","Encontre o valor de x.",p+"(x + 2) = "+(constant+2*p),"x = "+root,["x = "+(root+2),"x = "+(root-1),"x = "+(root+1)],"Divida os dois lados por "+p+" e depois subtraia 2.","Comece dividindo os dois lados pelo coeficiente.");
  }

  // Geometria: perímetro, área e ângulos.
  for (let i=1;i<=8;i++) {
    const w=4+i, h=3+(i%5);
    add(3,"Geometria","Área do retângulo","Calcule a área do retângulo.",w+" cm × "+h+" cm",w*h+" cm²",[(w+h)+" cm²",(w*h+4)+" cm²",(2*w+2*h)+" cm²"],"Área é base multiplicada pela altura.","Multiplique as duas dimensões.");
    const side=3+i;
    add(3,"Geometria","Perímetro do quadrado","Qual é o perímetro do quadrado?", "Lado = "+side+" cm",4*side+" cm",[side*side+" cm",(3*side)+" cm",(4*side+2)+" cm"],"Um quadrado tem quatro lados iguais.","Multiplique a medida do lado por 4.");
    const angle=30+i*5;
    add(3,"Geometria","Ângulos do triângulo","Um triângulo tem ângulos de "+angle+"° e 60°. Quanto mede o terceiro?",(angle+"° + 60° + ? = 180°"),(120-angle)+"°",[(110-angle)+"°",(130-angle)+"°",(180-angle)+"°"],"A soma dos ângulos internos de um triângulo é 180°.","Subtraia os dois ângulos conhecidos de 180°.");
  }

  // Porcentagem: descontos, aumentos e fração percentual.
  for (let i=1;i<=10;i++) {
    const base=50+i*20, pct=10+(i%5)*5, value=base*pct/100;
    add(4,"Porcentagem","Porcentagem de um valor","Calcule "+pct+"% de "+base+".",pct+"% × "+base,value,[value+5,value-5,base/pct],"Transforme a porcentagem em fração de 100 e multiplique.","Calcule primeiro 10% ou 5% quando ajudar.");
    const price=100+i*25, discount=10+(i%4)*5, final=price*(100-discount)/100;
    add(4,"Porcentagem","Desconto percentual","Um produto custa R$ "+price+" e recebe desconto de "+discount+"%. Qual é o preço final?","R$ "+price+" − "+discount+"%", "R$ "+final.toFixed(2).replace(".",","),["R$ "+(final+10).toFixed(2).replace(".",","),"R$ "+(final-5).toFixed(2).replace(".",","),"R$ "+price.toFixed(2).replace(".",",")],"Calcule o desconto e subtraia do preço original.","Encontre primeiro "+discount+"% do preço.");
  }

  // Potências: quadrados, cubos e propriedades básicas.
  for (let i=1;i<=8;i++) {
    const base=2+(i%8);
    add(5,"Potências","Potência ao quadrado","Calcule a potência.",base+"² = ?",base*base,[base*2,base*base+base,base*base-1],"Eleve a base ao quadrado: multiplique-a por ela mesma.",""+base+"² significa "+base+" × "+base+".");
    const b=2+(i%4), exp=3;
    add(5,"Potências","Potência ao cubo","Calcule a potência.",b+"³ = ?",b*b*b,[b*b,b*b*b+b,b*3],"Multiplique a base por ela mesma três vezes.",""+b+"³ = "+b+" × "+b+" × "+b+".");
  }

  // Conteúdos adicionais para prática temática avançada.
  for (let i=1;i<=8;i++) {
    const a=2+(i%5), x=2+i, b=1+(i%6), y=a*x+b;
    add(2,"Função afim","Valor numérico da função","Na função f(x) = "+a+"x + "+b+", quanto vale f("+x+")?","f("+x+") = "+a+" × "+x+" + "+b,y,[y+2,y-2,y+5],"Substitua x por "+x+" e efetue as operações.","Coloque "+x+" no lugar de x.");
    const values=[i+2,i+4,i+6], mean=values.reduce((s,v)=>s+v,0)/3;
    add(2,"Estatística","Média aritmética","Qual é a média de "+values.join(", ")+"?","("+values.join(" + ")+") ÷ 3",mean,[mean+1,mean-1,mean+2],"Some os valores e divida pela quantidade de números.","A média é a soma dividida pela quantidade.");
    const favorable=1+(i%4), total=6;
    add(2,"Probabilidade","Chance de um evento","Há "+favorable+" resultados favoráveis em "+total+" resultados igualmente possíveis. Qual é a probabilidade?",""+favorable+"/"+total, (favorable/total*100).toFixed(1).replace(".",",")+"%",[(favorable/total*100+10).toFixed(1).replace(".",",")+"%",(favorable/total*100-10).toFixed(1).replace(".",",")+"%","100%"],"Divida os casos favoráveis pelo total e converta para porcentagem.","Probabilidade = favoráveis ÷ possíveis.");
    const n=2+i, ratio=3;
    add(2,"Razão e proporção","Proporção direta","Se 1 item custa R$ "+ratio+", quanto custam "+n+" itens iguais?",""+n+" × R$ "+ratio,"R$ "+(n*ratio),["R$ "+(n*ratio+ratio),"R$ "+(n*ratio-1),"R$ "+(n+ratio)],"Multiplique o preço unitário pela quantidade.","Cada item custa R$ "+ratio+".");
    const km=1+i/2;
    add(2,"Medidas","Conversão de quilômetros","Converta "+km.toFixed(1).replace(".",",")+" km em metros.",""+km.toFixed(1).replace(".",",")+" × 1.000",(km*1000)+" m",[(km*100)+" m",(km*10000)+" m",(km*10)+" m"],"Cada quilômetro equivale a 1.000 metros.","Multiplique o valor por 1.000.");
  }

  window.MQ21QuestionBank = {added:serial,total:bank.length,version:"21.0"};
})();
