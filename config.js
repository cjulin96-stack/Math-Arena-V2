// ==========================================
// CONFIG.JS - DADOS, BANCO E CONSTANTES
// ==========================================

// 1. CONEXÃO COM O SUPABASE (Coloque seus dados aqui)
// Substitua as strings abaixo pelas suas credenciais do painel do Supabase
const SUPABASE_URL = "SUA_URL_DO_SUPABASE_AQUI";
const SUPABASE_KEY = "SUA_CHAVE_ANON_DO_SUPABASE_AQUI";

// Inicializa o banco de dados
const banco = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. ESTADO GLOBAL DO JOGADOR
// (Apenas o objeto com os dados, sem funções)
let jogador = {
    id: null,
    nome: 'Jogador',
    xp: 0,
    moedas: 0,
    nivel: 1,
    avatar: '🐱',
    moldura_equipada: 'padrao',
    molduras_desbloqueadas: ['padrao'],
    avatares_desbloqueados: ['🐱'],
    aulas_concluidas: [],
    vidas: 5,
    streak: 0,
    ultimo_login: null
};

// 3. BANCO DE DADOS DO JOGO (Lições, Avatares, Molduras e Loja)

// --- UNIDADES E LIÇÕES ---
// Aqui você adiciona as perguntas. Deixei um exemplo funcional para você não ficar com tela vazia.
const UNIDADES_DB = [
    {
        unidade: 1,
        titulo: "Fundamentos da Matemática",
        cor: "#00f0ff", // Cor do cabeçalho
        licoes: [
            {
                id: 1, // O ID tem que ser único e sequencial
                titulo: "Soma Básica",
                questoes: [
                    {
                        tipo: 'multipla',
                        pergunta: "Quanto é 2 + 2?",
                        opcoes: ["3", "4", "5", "6"],
                        correta: 1 // O índice da resposta certa (o "4" está na posição 1 do array)
                    },
                    {
                        tipo: 'completar',
                        pergunta: "5 + ___ = 10",
                        resposta: "5"
                    }
                ]
            },
            {
                id: 2,
                titulo: "Subtração",
                questoes: [
                    {
                        tipo: 'multipla',
                        pergunta: "Quanto é 10 - 4?",
                        opcoes: ["5", "6", "7", "8"],
                        correta: 1
                    }
                ]
            }
        ]
    }
];

// --- AVATARES ---
const AVATARES_DB = [
    { id: 'av1', nome: 'Gatinho', icone: '🐱', preco: 0, raridade: 'Comum' },
    { id: 'av2', nome: 'Cachorro', icone: '🐶', preco: 100, raridade: 'Comum' },
    { id: 'av3', nome: 'Dragão', icone: '🐲', preco: 500, raridade: 'Épica' }
];

// --- MOLDURAS ---
const MOLDURAS_DB = [
    { id: 'padrao', nome: 'Padrão', tipo: 'css', preco: 0, raridade: 'Comum' },
    { id: 'ouro', nome: 'Ouro', tipo: 'img', img: 'https://i.imgur.com/ExemploOuro.png', preco: 200, raridade: 'Lendária' },
    { id: 'fogo', nome: 'Fogo', tipo: 'img', img: 'https://i.imgur.com/ExemploFogo.png', preco: 300, raridade: 'Épica' }
];

// --- LOJA (Juntando os itens para exibir na aba da loja) ---
// O app.js filtra isso automaticamente baseado na aba clicada
const LOJA_DB = [
    ...MOLDURAS_DB.filter(m => m.id !== 'padrao'), // Pega as molduras que não são a padrão
    ...AVATARES_DB.filter(a => a.preco > 0)        // Pega os avatares que têm preço (não o inicial)
];
