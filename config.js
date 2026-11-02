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
    { id: '05', nome: 'Neon Azul', img: 'img/moldura_05.png', tipo: 'img', raridade: 'Rara' },
    { id: '20', nome: 'Dragão de Fogo', img: 'img/moldura_20.png', tipo: 'img', raridade: 'Épica' },
    { id: '36', nome: 'Troféu Ouro', img: 'img/moldura_36.png', tipo: 'img', raridade: 'Lendária', efeito: 'brilho-legendario' }
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
