/* MathQuest 20.0 — expansão de prática por assunto */
(() => {
  "use strict";
  if (window.MQ20ExpansionLoaded) return;
  window.MQ20ExpansionLoaded = true;

  const bank = Array.isArray(window.Q) ? window.Q : null;
  if (!bank) {
    window.MQ20QuestionExpansion = { ready:false, added:0, reason:"Banco principal não encontrado." };
    return;
  }

  const existing = new Set(bank.map(q => q && q.id).filter(Boolean));
  let serial = 0, added = 0;
  const rand = (min,max,seed) => min + ((seed * 37 + 17) % (max-min+1));
  const fmt = n => Number.isInteger(n) ? String(n) : String(Number(n.toFixed(2))).replace(".",",");
  function add(topic,title,prompt,correct,wrongA,wrongB,explain) {
    const answers = [String(correct),String(wrongA),String(wrongB)];
    if (new Set(answers).size !== 3) return;
    const shift = serial % 3;
    const options = answers.slice(shift).concat(answers.slice(0,shift));
    const id = "mq20-" + String(++serial).padStart(4,"0");
    if (existing.has(id)) return;
    existing.add(id);
    bank.push({id,topic,title,q:prompt,a:options,ok:options.indexOf(String(correct)),why:explain});
    added++;
  }

  for (let i=1;i<=12;i++) {
    const a=2+(i%5), x=2+(i%7), b=1+(i%6), y=a*x+b;
    add("Função afim","Valor da função","Na função f(x) = "+a+"x + "+b+", quanto vale f("+x+")?",y,y+2,y-2,
      "Substitua x por "+x+": "+a+" × "+x+" + "+b+" = "+y+".");
    const root=1+(i%8), slope=2+(i%4), intercept=-slope*root;
    add("Função afim","Raiz da função","Qual é a raiz de f(x) = "+slope+"x "+(intercept<0?"− "+Math.abs(intercept):"+ "+intercept)+"?",root,root+1,root-1,
      "Na raiz, f(x)=0. Então "+slope+"x = "+(slope*root)+", logo x = "+root+".");
  }

  for (let i=1;i<=12;i++) {
    const base=3+(i%8), height=2+(i%7), area=base*height;
    add("Geometria","Área do retângulo","Um retângulo tem base "+base+" cm e altura "+height+" cm. Qual é a área?",area+" cm²",(area+base)+" cm²",(area+height)+" cm²",
      "Área = base × altura = "+base+" × "+height+" = "+area+" cm².");
    const side=3+i, perimeter=4*side;
    add("Geometria","Perímetro do quadrado","Um quadrado tem lado de "+side+" cm. Qual é o perímetro?",perimeter+" cm",(perimeter+side)+" cm",(perimeter-2)+" cm",
      "O quadrado tem quatro lados iguais: 4 × "+side+" = "+perimeter+" cm.");
  }

  for (let i=1;i<=12;i++) {
    const den=3+(i%7), num=1+(i%(den-1)), whole=den*(2+i%9), part=num*(2+i%9);
    add("Frações","Fração de uma quantidade","Quanto é "+num+"/"+den+" de "+whole+"?",part,part+num,part-den,
      "Divida "+whole+" por "+den+" e multiplique por "+num+": o resultado é "+part+".");
    const k=2+(i%5);
    add("Frações","Frações equivalentes","Qual fração é equivalente a "+num+"/"+den+"?",(num*k)+"/"+(den*k),(num*k+1)+"/"+(den*k),(num+1)+"/"+(den*k),
      "Multiplique numerador e denominador pelo mesmo número: × "+k+".");
  }

  for (let i=1;i<=12;i++) {
    const pct=[5,10,15,20,25,30,40,50,60,75][i%10], total=100+(i*20), value=total*pct/100;
    add("Porcentagem","Porcentagem de um total","Quanto é "+pct+"% de "+total+"?",fmt(value),fmt(value+10),fmt(value-5),
      pct+"% = "+pct+"/100. Portanto, "+total+" × "+pct+"/100 = "+fmt(value)+".");
    const price=80+i*10, discount=[10,15,20,25,30][i%5], final=price*(1-discount/100);
    add("Porcentagem","Desconto percentual","Um produto custa R$ "+price+" e recebe "+discount+"% de desconto. Qual é o preço final?","R$ "+fmt(final),"R$ "+fmt(final+5),"R$ "+fmt(final-10),
      "O desconto é R$ "+fmt(price*discount/100)+". Subtraindo do preço original, restam R$ "+fmt(final)+".");
  }

  for (let i=1;i<=12;i++) {
    const a=2+(i%6), x=2+(i%9), b=1+(i%8), c=a*x+b;
    add("Equações","Equação do primeiro grau","Resolva: "+a+"x + "+b+" = "+c+".","x = "+x,"x = "+(x+1),"x = "+(x-1),
      "Subtraia "+b+" dos dois lados: "+a+"x = "+(a*x)+". Divida por "+a+": x = "+x+".");
    const divisor=2+(i%5), value=3+(i%8);
    add("Equações","Equação com divisão","Se x/"+divisor+" = "+value+", quanto vale x?",value*divisor,value*divisor+divisor,value*divisor-1,
      "Multiplique os dois lados por "+divisor+": x = "+value+" × "+divisor+" = "+(value*divisor)+".");
  }

  for (let i=1;i<=12;i++) {
    const base=2+(i%5), exp=2+(i%3), result=Math.pow(base,exp);
    add("Potenciação","Potência","Quanto vale "+base+" elevado a "+exp+"?",result,result+base,result*2,
      "Multiplique a base por ela mesma "+exp+" vezes. O resultado é "+result+".");
    const n=3+i, square=n*n;
    add("Potenciação","Raiz quadrada","Qual é a raiz quadrada principal de "+square+"?",n,n+1,n-1,
      "A raiz quadrada é o número que multiplicado por si mesmo resulta em "+square+": "+n+".");
  }

  for (let i=1;i<=12;i++) {
    const a=4+i, b=8+i*2, c=12+i*3, mean=(a+b+c)/3;
    add("Estatística","Média aritmética","Qual é a média de "+a+", "+b+" e "+c+"?",fmt(mean),fmt(mean+2),fmt(mean-2),
      "Some os valores e divida por 3: ("+a+" + "+b+" + "+c+") ÷ 3 = "+fmt(mean)+".");
    const low=i, mid=i+4, high=i+9, range=high-low;
    add("Estatística","Amplitude","Qual é a amplitude dos valores "+low+", "+mid+" e "+high+"?",range,range+2,range-1,
      "Amplitude = maior valor − menor valor = "+high+" − "+low+" = "+range+".");
  }

  for (let i=1;i<=12;i++) {
    const red=1+(i%5), blue=2+(i%4), total=red+blue;
    add("Probabilidade","Probabilidade simples","Uma caixa tem "+red+" bolas vermelhas e "+blue+" azuis. Qual é a chance de retirar uma vermelha?",red+"/"+total,blue+"/"+total,"1/"+total,
      "Há "+red+" resultados favoráveis entre "+total+" bolas: "+red+"/"+total+".");
  }

  for (let i=1;i<=12;i++) {
    const unit=2+i, price=unit*5, count=3+(i%6), total=price*count;
    add("Razão e proporção","Proporção direta","Se "+unit+" cadernos custam R$ "+price+", quanto custam "+(unit*count)+" cadernos iguais?","R$ "+fmt(total),"R$ "+fmt(total+price),"R$ "+fmt(total-price),
      "O preço unitário é R$ "+fmt(price/unit)+". Multiplique por "+(unit*count)+": R$ "+fmt(total)+".");
    const numerator=6+i*2, denominator=2, ratio=numerator/denominator;
    add("Razão e proporção","Simplificação de razão","Qual é o valor da razão "+numerator+":"+denominator+"?",fmt(ratio),fmt(ratio+1),fmt(ratio-1),
      "Divida o primeiro termo pelo segundo: "+numerator+" ÷ "+denominator+" = "+fmt(ratio)+".");
  }

  for (let i=1;i<=12;i++) {
    const km=1+i, meters=km*1000;
    add("Medidas","Conversão de comprimento","Quantos metros há em "+fmt(km)+" km?",fmt(meters)+" m",fmt(meters/10)+" m",fmt(meters*10)+" m",
      "1 km equivale a 1.000 m. Então "+fmt(km)+" × 1.000 = "+fmt(meters)+" m.");
    const hours=1+(i%4), minutes=hours*60+15;
    add("Medidas","Conversão de tempo","Quantos minutos há em "+hours+" hora(s) e 15 minutos?",minutes,minutes+15,minutes-15,
      hours+" hora(s) correspondem a "+(hours*60)+" minutos. Somando 15, temos "+minutes+".");
  }

  window.MQ20QuestionExpansion = {
    ready:true, added, total:bank.length,
    topics:[...new Set(bank.map(q=>q.topic))],
    version:"20.0"
  };
  window.dispatchEvent(new CustomEvent("mq20:questions-ready",{detail:window.MQ20QuestionExpansion}));
})();