// CONEXÃO COM O SUPABASE
const SUPABASE_URL = 'https://zhciurzkzmdenuapzugj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpoY2l1cnprem1kZW51YXB6dWdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM0NzM0ODIsImV4cCI6MjEwOTA0OTQ4Mn0.bLdz-6jMEXuEFoX9T5DRfRvR1huDY5I-awnutjiQ2dc'; 
const banco = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// DADOS DO JOGADOR
let jogador = { 
    id: null, nome: 'Jogador', xp: 0, nivel: 1, moedas: 0, 
    avatar: '🐱', moldura_equipada: 'padrao', 
    molduras_desbloqueadas: ['padrao'],
    avatares_desbloqueados: ['🐱'],
    aulas_concluidas: [],
    vidas: 5,
    streak: 0, ultimo_login: null
};

// ==========================================
// LOJA: TODAS AS 45 MOLDURAS + AVATARES
// ==========================================
const MOLDURAS_DB = [
    { id: 'padrao', nome: 'Iniciante', img: '', tipo: 'css', raridade: 'Comum' },
    { id: '01', nome: 'Folhas', img: 'img/moldura_01.png', tipo: 'img', raridade: 'Comum' },
    { id: '02', nome: 'Madeira', img: 'img/moldura_02.png', tipo: 'img', raridade: 'Comum' },
    { id: '03', nome: 'Azul Tech', img: 'img/moldura_03.png', tipo: 'img', raridade: 'Comum' },
    { id: '04', nome: 'Roxa Mágica', img: 'img/moldura_04.png', tipo: 'img', raridade: 'Comum' },
    { id: '05', nome: 'Neon Azul', img: 'img/moldura_05.png', tipo: 'img', raridade: 'Comum' },
    { id: '06', nome: 'Coroa Rosa', img: 'img/moldura_06.png', tipo: 'img', raridade: 'Comum' },
    { id: '07', nome: 'Folhas de Outono', img: 'img/moldura_07.png', tipo: 'img', raridade: 'Comum' },
    { id: '08', nome: 'Pedra', img: 'img/moldura_08.png', tipo: 'img', raridade: 'Comum' },
    { id: '09', nome: 'Troféu Bronze', img: 'img/moldura_09.png', tipo: 'img', raridade: 'Comum' },
    { id: '10', nome: 'Calculadora', img: 'img/moldura_10.png', tipo: 'img', raridade: 'Comum' },
    { id: '11', nome: 'Estrelas', img: 'img/moldura_11.png', tipo: 'img', raridade: 'Rara' },
    { id: '12', nome: 'Magia Roxa', img: 'img/moldura_12.png', tipo: 'img', raridade: 'Rara' },
    { id: '13', nome: 'Livros', img: 'img/moldura_13.png', tipo: 'img', raridade: 'Rara' },
    { id: '14', nome: 'Gelo', img: 'img/moldura_14.png', tipo: 'img', raridade: 'Rara' },
    { id: '15', nome: 'Fogo', img: 'img/moldura_15.png', tipo: 'img', raridade: 'Rara' },
    { id: '16', nome: 'Mestre', img: 'img/moldura_16.png', tipo: 'img', raridade: 'Rara' },
    { id: '17', nome: 'Anel', img: 'img/moldura_17.png', tipo: 'img', raridade: 'Rara' },
    { id: '18', nome: 'Corrente', img: 'img/moldura_18.png', tipo: 'img', raridade: 'Rara' },
    { id: '19', nome: 'Coroa Prata', img: 'img/moldura_19.png', tipo: 'img', raridade: 'Rara' },
    { id: '20', nome: 'Dragão de Fogo', img: 'img/moldura_20.png', tipo: 'img', raridade: 'Épica' },
    { id: '21', nome: 'Coração', img: 'img/moldura_21.png', tipo: 'img', raridade: 'Épica' },
    { id: '22', nome: 'Tronco', img: 'img/moldura_22.png', tipo: 'img', raridade: 'Épica' },
    { id: '23', nome: 'Coroa Ouro', img: 'img/moldura_23.png', tipo: 'img', raridade: 'Épica' },
    { id: '24', nome: 'Flor de Cerejeira', img: 'img/moldura_24.png', tipo: 'img', raridade: 'Épica' },
    { id: '25', nome: 'Engrenagens', img: 'img/moldura_25.png', tipo: 'img', raridade: 'Épica' },
    { id: '26', nome: 'Colunas Gregas', img: 'img/moldura_26.png', tipo: 'img', raridade: 'Épica' },
    { id: '27', nome: 'Neon Verde', img: 'img/moldura_27.png', tipo: 'img', raridade: 'Épica' },
    { id: '28', nome: 'Asas de Anjo', img: 'img/moldura_28.png', tipo: 'img', raridade: 'Épica' },
    { id: '29', nome: 'Neon Rosa', img: 'img/moldura_29.png', tipo: 'img', raridade: 'Épica' },
    { id: '30', nome: 'Fogo Verde', img: 'img/moldura_30.png', tipo: 'img', raridade: 'Épica' },
    { id: '31', nome: 'Relâmpago', img: 'img/moldura_31.png', tipo: 'img', raridade: 'Épica' },
    { id: '32', nome: 'Cyberpunk', img: 'img/moldura_32.png', tipo: 'img', raridade: 'Épica' },
    { id: '33', nome: 'Dragão Roxo', img: 'img/moldura_33.png', tipo: 'img', raridade: 'Épica' },
    { id: '34', nome: 'Água', img: 'img/moldura_34.png', tipo: 'img', raridade: 'Épica' },
    { id: '35', nome: 'Planeta', img: 'img/moldura_35.png', tipo: 'img', raridade: 'Épica' },
    { id: '36', nome: 'Troféu Ouro', img: 'img/moldura_36.png', tipo: 'img', raridade: 'Lendária', efeito: 'brilho-legendario' },
    { id: '37', nome: 'Demoníaco', img: 'img/moldura_37.png', tipo: 'img', raridade: 'Lendária', efeito: 'brilho-legendario' },
    { id: '38', nome: 'Anjo Dourado', img: 'img/moldura_38.png', tipo: 'img', raridade: 'Lendária', efeito: 'brilho-legendario' },
    { id: '39', nome: 'Espinhos', img: 'img/moldura_39.png', tipo: 'img', raridade: 'Lendária', efeito: 'brilho-legendario' },
    { id: '40', nome: 'Estrela Cadente', img: 'img/moldura_40.png', tipo: 'img', raridade: 'Lendária', efeito: 'brilho-legendario' },
    { id: '41', nome: 'Halloween', img: 'img/moldura_41_temporaria.png', tipo: 'img', raridade: 'Mítica', efeito: 'brilho-legendario' },
    { id: '42', nome: 'Natal', img: 'img/moldura_42_temporaria.png', tipo: 'img', raridade: 'Mítica', efeito: 'brilho-legendario' },
    { id: '43', nome: 'Praia', img: 'img/moldura_43_temporaria.png', tipo: 'img', raridade: 'Mítica', efeito: 'brilho-legendario' },
    { id: '44', nome: 'Neve', img: 'img/moldura_44_temporaria.png', tipo: 'img', raridade: 'Mítica', efeito: 'brilho-legendario' },
    { id: '45', nome: 'Gamer', img: 'img/moldura_45_temporaria.png', tipo: 'img', raridade: 'Mítica', efeito: 'brilho-legendario' }
];

const LOJA_DB = MOLDURAS_DB.map(item => {
    let preco = 500;
    if (item.raridade === 'Rara') preco = 1000;
    if (item.raridade === 'Épica') preco = 2000;
    if (item.raridade === 'Lendária') preco = 5000;
    if (item.raridade === 'Mítica') preco = 10000;
    return { ...item, preco: preco };
}).filter(item => item.id !== 'padrao');

const AVATARES_DB = [
    { id: 'av_gato', nome: 'Gatinho', icone: '🐱', preco: 0, raridade: 'Comum' },
    { id: 'av_cachorro', nome: 'Cachorro', icone: '🐶', preco: 500, raridade: 'Comum' },
    { id: 'av_raposa', nome: 'Raposa', icone: '🦊', preco: 1000, raridade: 'Rara' },
    { id: 'av_panda', nome: 'Panda', icone: '🐼', preco: 1500, raridade: 'Épica' },
    { id: 'av_sapo', nome: 'Sapo', icone: '🐸', preco: 800, raridade: 'Rara' },
    { id: 'av_alien', nome: 'Alienígena', icone: '👽', preco: 2500, raridade: 'Lendária' },
    { id: 'av_robo', nome: 'Robô', icone: '🤖', preco: 3000, raridade: 'Lendária' },
    { id: 'av_dragao', nome: 'Dragão', icone: '🐉', preco: 5000, raridade: 'Mítica' }
];

// ==========================================
// ACADEMIA GIGANTE (10 UNIDADES, 30 LIÇÕES)
// ==========================================
const UNIDADES_DB = [
    {
        unidade: 1, titulo: "Operações Básicas", cor: "#58cc02", 
        licoes: [
            { id: 1, titulo: "Soma Fácil", xp: 20, questoes: [
                { tipo: 'multipla', pergunta: "Quanto é 2 + 3?", opcoes: ["4", "5", "6"], correta: 1 },
                { tipo: 'completar', pergunta: "4 + ___ = 7", resposta: "3" },
                { tipo: 'multipla', pergunta: "10 + 5 = ?", opcoes: ["15", "20", "25"], correta: 0 }
            ]},
            { id: 2, titulo: "Subtração", xp: 20, questoes: [
                { tipo: 'multipla', pergunta: "Quanto é 9 - 4?", opcoes: ["3", "4", "5"], correta: 2 },
                { tipo: 'completar', pergunta: "10 - ___ = 6", resposta: "4" },
                { tipo: 'multipla', pergunta: "15 - 8 = ?", opcoes: ["7", "8", "9"], correta: 0 }
            ]},
            { id: 3, titulo: "Multiplicação", xp: 30, questoes: [
                { tipo: 'multipla', pergunta: "3 x 4 = ?", opcoes: ["7", "10", "12"], correta: 2 },
                { tipo: 'multipla', pergunta: "5 x 5 = ?", opcoes: ["20", "25", "30"], correta: 1 },
                { tipo: 'completar', pergunta: "2 x ___ = 8", resposta: "4" }
            ]},
            { id: 4, titulo: "Divisão", xp: 30, questoes: [
                { tipo: 'multipla', pergunta: "20 ÷ 4 = ?", opcoes: ["4", "5", "6"], correta: 1 },
                { tipo: 'completar', pergunta: "15 ÷ ___ = 3", resposta: "5" }
            ]}
        ]
    },
    {
        unidade: 2, titulo: "Frações e Decimais", cor: "#1cb0f6",
        licoes: [
            { id: 5, titulo: "O que é Fração?", xp: 40, questoes: [
                { tipo: 'multipla', pergunta: "1/2 significa:", opcoes: ["Um terço", "Metade", "Um quarto"], correta: 1 },
                { tipo: 'completar', pergunta: "Pizza em 4 pedaços, cada um é 1/___.", resposta: "4" }
            ]},
            { id: 6, titulo: "Soma de Frações", xp: 40, questoes: [
                { tipo: 'multipla', pergunta: "1/5 + 2/5 = ?", opcoes: ["3/10", "3/5", "2/5"], correta: 1 },
                { tipo: 'multipla', pergunta: "2/8 + 3/8 = ?", opcoes: ["5/16", "5/8", "6/8"], correta: 1 }
            ]},
            { id: 7, titulo: "Porcentagem", xp: 50, questoes: [
                { tipo: 'multipla', pergunta: "10% de 50 é:", opcoes: ["5", "10", "15"], correta: 0 },
                { tipo: 'completar', pergunta: "50% de 20 é ___.", resposta: "10" },
                { tipo: 'multipla', pergunta: "20% de 100 é:", opcoes: ["20", "10", "50"], correta: 0 }
            ]}
        ]
    },
    {
        unidade: 3, titulo: "Álgebra Inicial", cor: "#ce82ff",
        licoes: [
            { id: 8, titulo: "O famoso X", xp: 60, questoes: [
                { tipo: 'multipla', pergunta: "x + 2 = 6. x = ?", opcoes: ["2", "4", "8"], correta: 1 },
                { tipo: 'completar', pergunta: "x - 3 = 5. x = ___.", resposta: "8" }
            ]},
            { id: 9, titulo: "Equações", xp: 70, questoes: [
                { tipo: 'multipla', pergunta: "2x = 10. x = ?", opcoes: ["4", "5", "8"], correta: 1 },
                { tipo: 'completar', pergunta: "3x = 12. x = ___.", resposta: "4" }
            ]},
            { id: 10, titulo: "Expressões", xp: 70, questoes: [
                { tipo: 'multipla', pergunta: "Se x=2, x + 5 = ?", opcoes: ["5", "7", "10"], correta: 1 },
                { tipo: 'multipla', pergunta: "Se y=3, 2y = ?", opcoes: ["5", "6", "9"], correta: 1 }
            ]}
        ]
    },
    {
        unidade: 4, titulo: "Geometria Básica", cor: "#ff9600",
        licoes: [
            { id: 11, titulo: "Áreas", xp: 80, questoes: [
                { tipo: 'multipla', pergunta: "Área quadrado lado 3?", opcoes: ["6", "9", "12"], correta: 1 },
                { tipo: 'completar', pergunta: "Retângulo base 5, altura 2. Área ___.", resposta: "10" }
            ]},
            { id: 12, titulo: "Perímetro", xp: 80, questoes: [
                { tipo: 'multipla', pergunta: "Perímetro quadrado lado 4?", opcoes: ["8", "12", "16"], correta: 2 },
                { tipo: 'completar', pergunta: "Triângulo lados 3, 4, 5. Perímetro ___.", resposta: "12" }
            ]}
        ]
    },
    {
        unidade: 5, titulo: "Desafios Lógicos", cor: "#ff4b4b",
        licoes: [
            { id: 13, titulo: "Problemas Simples", xp: 100, questoes: [
                { tipo: 'multipla', pergunta: "João tem 10 maçãs, dá 3. Ficam:", opcoes: ["6", "7", "8"], correta: 1 },
                { tipo: 'completar', pergunta: "Maria tem 5, ganha 10. Tem ___ reais.", resposta: "15" }
            ]},
            { id: 14, titulo: "Desafio do Mestre", xp: 150, questoes: [
                { tipo: 'multipla', pergunta: "10 + 5 x 2 = ?", opcoes: ["30", "20", "15"], correta: 1 },
                { tipo: 'multipla', pergunta: "Raiz quadrada de 16?", opcoes: ["4", "8", "6"], correta: 0 },
                { tipo: 'completar', pergunta: "2x + 5 = 15. x = ___.", resposta: "5" }
            ]}
        ]
    },
    {
        unidade: 6, titulo: "Potenciação e Radiciação", cor: "#2b70c9",
        licoes: [
            { id: 15, titulo: "Potências", xp: 120, questoes: [
                { tipo: 'multipla', pergunta: "Quanto é 2³?", opcoes: ["6", "8", "9"], correta: 1 },
                { tipo: 'completar', pergunta: "5² = ___.", resposta: "25" },
                { tipo: 'multipla', pergunta: "Quanto é 10²?", opcoes: ["20", "100", "1000"], correta: 1 }
            ]},
            { id: 16, titulo: "Raízes", xp: 130, questoes: [
                { tipo: 'multipla', pergunta: "√25 = ?", opcoes: ["4", "5", "6"], correta: 1 },
                { tipo: 'completar', pergunta: "√81 = ___.", resposta: "9" }
            ]}
        ]
    },
    {
        unidade: 7, titulo: "Trigonometria e Pitágoras", cor: "#a700ff",
        licoes: [
            { id: 17, titulo: "Teorema de Pitágoras", xp: 150, questoes: [
                { tipo: 'multipla', pergunta: "Catetos 3 e 4. Hipotenusa?", opcoes: ["5", "6", "7"], correta: 0 },
                { tipo: 'completar', pergunta: "Catetos 6 e 8. Hipotenusa ___.", resposta: "10" }
            ]},
            { id: 18, titulo: "Seno e Cosseno", xp: 160, questoes: [
                { tipo: 'multipla', pergunta: "Seno de 30°?", opcoes: ["0,5", "1", "0"], correta: 0 },
                { tipo: 'multipla', pergunta: "Cosseno de 0°?", opcoes: ["0", "1", "0,5"], correta: 1 }
            ]}
        ]
    },
    {
        unidade: 8, titulo: "Funções", cor: "#ffd900",
        licoes: [
            { id: 19, titulo: "Função 1º Grau", xp: 180, questoes: [
                { tipo: 'multipla', pergunta: "Na função f(x)=2x+1, f(2) é:", opcoes: ["3", "5", "7"], correta: 1 },
                { tipo: 'completar', pergunta: "Se f(x)=x-3, então f(10) = ___.", resposta: "7" }
            ]},
            { id: 20, titulo: "Plano Cartesiano", xp: 180, questoes: [
                { tipo: 'multipla', pergunta: "O ponto (0,0) chama-se:", opcoes: ["Origem", "Eixo X", "Eixo Y"], correta: 0 }
            ]}
        ]
    },
    {
        unidade: 9, titulo: "Probabilidade e Estatística", cor: "#00ff88",
        licoes: [
            { id: 21, titulo: "Probabilidade Básica", xp: 200, questoes: [
                { tipo: 'multipla', pergunta: "Chance de tirar 6 num dado?", opcoes: ["1/2", "1/6", "1/3"], correta: 1 },
                { tipo: 'multipla', pergunta: "Chance de tirar cara ou coroa?", opcoes: ["1/4", "1", "1/2"], correta: 2 }
            ]},
            { id: 22, titulo: "Média e Moda", xp: 200, questoes: [
                { tipo: 'multipla', pergunta: "Média de 2, 4 e 6?", opcoes: ["3", "4", "5"], correta: 1 },
                { tipo: 'completar', pergunta: "Média de 10 e 20 é ___.", resposta: "15" }
            ]}
        ]
    },
    {
        unidade: 10, titulo: "Matemática Financeira", cor: "#ff0055",
        licoes: [
            { id: 23, titulo: "Juros Simples", xp: 250, questoes: [
                { tipo: 'multipla', pergunta: "R$100 a 10% ao mês por 2 meses. Juros?", opcoes: ["R$10", "R$20", "R$30"], correta: 1 },
                { tipo: 'completar', pergunta: "R$50 a 10% ao mês por 1 mês. Juros R$___.", resposta: "5" }
            ]},
            { id: 24, titulo: "Descontos", xp: 250, questoes: [
                { tipo: 'multipla', pergunta: "Produto de R$100 com 20% de desconto:", opcoes: ["R$80", "R$90", "R$70"], correta: 0 },
                { tipo: 'completar', pergunta: "R$200 com 50% de desconto fica R$___.", resposta: "100" }
            ]},
            { id: 25, titulo: "Mestre Financeiro", xp: 300, questoes: [
                { tipo: 'multipla', pergunta: "R$1000 a 1% ao mês por 12 meses. Juros?", opcoes: ["R$120", "R$100", "R$150"], correta: 0 },
                { tipo: 'completar', pergunta: "R$500 a 2% por 10 meses. Juros R$___.", resposta: "100" }
            ]}
        ]
    }
];

// Variáveis de estado
let abaLojaAtual = 'moldura';
let aulaAtualId = null;
let unidadeAtualIndex = 0;
