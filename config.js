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
    streak: 0, ultimo_login: null
};

// BANCO DE DADOS DE ITENS (Vou colocar só alguns para testar, depois você adiciona as 45)
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
    return { ...item, preco: preco };
}).filter(item => item.id !== 'padrao');

const AVATARES_DB = [
    { id: 'av_gato', nome: 'Gatinho', icone: '🐱', preco: 0, raridade: 'Comum' },
    { id: 'av_cachorro', nome: 'Cachorro', icone: '🐶', preco: 500, raridade: 'Comum' },
    { id: 'av_raposa', nome: 'Raposa', icone: '🦊', preco: 1000, raridade: 'Rara' },
    { id: 'av_panda', nome: 'Panda', icone: '🐼', preco: 1500, raridade: 'Épica' }
];

// BANCO DE DADOS DA ACADEMIA
const ACADEMIA_DB = [
    { 
        id: 1, titulo: "Frações Básicas", descricao: "Aprenda o que é uma fração.", xp: 20, 
        conteudo: "Uma fração representa uma parte de um todo. Exemplo: 1/4 da pizza." 
    },
    { 
        id: 2, titulo: "Soma de Frações", descricao: "Como somar frações iguais.", xp: 30, 
        conteudo: "Para somar frações com o mesmo denominador, some os numeradores. Ex: 1/5 + 2/5 = 3/5." 
    }
];

// Variáveis de controle de estado
let abaLojaAtual = 'moldura';
let aulaAtualId = null;
