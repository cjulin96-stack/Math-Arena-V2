// ==========================================
// APP.JS - PARTE 1
// ==========================================

// Variáveis de estado do Jogo
let tempoInicioAula = 0;
let questoesAtuais = [];
let indiceQuestaoAtual = 0;
let acertosDesafio = 0;
let opcaoSelecionada = null;
let botaoSelecionado = null;
let aulaAtualId = null;

function mostrarToast(mensagem, tipo = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${tipo}`;
    const icone = tipo === 'success' ? '✅' : '❌';
    toast.innerHTML = `<span style="font-size: 20px;">${icone}</span><span>${mensagem}</span>`;
    container.appendChild(toast);
    setTimeout(() => { toast.style.animation = 'fadeOut 0.3s ease-out forwards'; setTimeout(() => toast.remove(), 300); }, 3000);
}

function getNivel(xp) {
    if (xp >= 5000) return { nivel: 10, nome: 'Mestre', xpAtual: xp, xpProx: 10000 };
    if (xp >= 2500) return { nivel: 8, nome: 'Diamante', xpAtual: xp, xpProx: 5000 };
    if (xp >= 1000) return { nivel: 5, nome: 'Platina', xpAtual: xp, xpProx: 2500 };
    if (xp >= 300) return { nivel: 3, nome: 'Prata', xpAtual: xp, xpProx: 1000 };
    return { nivel: 1, nome: 'Bronze', xpAtual: xp, xpProx: 300 };
}

// --- AUTENTICAÇÃO ---
async function fazerCadastro() {
    const email = document.getElementById('auth-email').value.trim();
    const senha = document.getElementById('auth-pass').value;
    if (!email || !senha) { mostrarToast("Preencha e-mail e senha.", "error"); return; }
    const { error } = await banco.auth.signUp({ email, password: senha });
    if (error) { mostrarToast(error.message, "error"); } else { mostrarToast("Conta criada! Faça login.", "success"); }
}

async function fazerLogin() {
    const email = document.getElementById('auth-email').value.trim();
    const senha = document.getElementById('auth-pass').value;
    if (!email || !senha) { mostrarToast("Preencha e-mail e senha.", "error"); return; }
    
    const { data, error } = await banco.auth.signInWithPassword({ email, password: senha });
    if (error) { 
        mostrarToast(error.message, "error"); 
    } else { 
        jogador.id = data.user.id; 
        document.getElementById('tela-auth').classList.remove('active');
        document.getElementById('bottom-nav').style.display = 'flex';
        mudarAba('tela-home');
    }
}

async function sair() {
    await banco.auth.signOut();
    location.reload();
}

// --- PERFIL E DASHBOARD ---
async function carregarPerfil() {
    if (!jogador.id) return;
    const { data, error } = await banco.from('ranking').select('*').eq('user_id', jogador.id).maybeSingle();
    if (error) { console.error(error); return; }
    
    if (data) {
        jogador.nome = data.nome || 'Jogador';
        jogador.xp = data.xp || 0;
        jogador.moedas = data.moedas || 0;
        jogador.avatar = data.avatar || '🐱';
        jogador.moldura_equipada = data.moldura_equipada || 'padrao';
        jogador.molduras_desbloqueadas = data.molduras_compradas || ['padrao'];
        jogador.avatares_desbloqueados = data.avatares_desbloqueados || ['🐱'];
        jogador.aulas_concluidas = data.aulas_concluidas || [];
        jogador.vidas = data.vidas !== undefined ? data.vidas : 5;
        jogador.streak = data.streak || 0;
        jogador.ultimo_login = data.ultimo_login || null;
    } else {
        await banco.from('ranking').insert([{ 
            user_id: jogador.id, nome: jogador.nome, xp: 0, moedas: 0, 
            avatar: '🐱', moldura_equipada: 'padrao', molduras_compradas: ['padrao'],
            avatares_desbloqueados: ['🐱'], aulas_concluidas: [], streak: 0, vidas: 5
        }]);
    }
}

async function verificarLoginDiario() {
    const hoje = new Date().toLocaleDateString('pt-BR');
    if (jogador.ultimo_login !== hoje) {
        const ontem = new Date();
        ontem.setDate(ontem.getDate() - 1);
        const ontemStr = ontem.toLocaleDateString('pt-BR');

        if (jogador.ultimo_login === ontemStr) { jogador.streak += 1; } 
        else if (jogador.ultimo_login !== null) { jogador.streak = 1; } 
        else { jogador.streak = 1; }

        jogador.ultimo_login = hoje;
        await banco.from('ranking').update({ streak: jogador.streak, ultimo_login: jogador.ultimo_login }).eq('user_id', jogador.id);
    }
}

function renderizarMoldura(elementId, molduraId) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const moldura = MOLDURAS_DB.find(m => m.id === molduraId) || MOLDURAS_DB[0];
    
    if (moldura.tipo === 'css') {
        el.innerHTML = ''; 
        el.className = 'frame frame-padrao';
    } else {
        el.className = `frame ${moldura.efeito || ''}`;
        el.innerHTML = `<img src="${moldura.img}" class="${moldura.raridade === 'Épica' ? 'efeito-epico' : moldura.raridade === 'Lendária' ? 'efeito-lendario' : moldura.raridade === 'Mítica' ? 'efeito-mitico' : ''}" alt="${moldura.nome}">`;
    }
}

async function atualizarDashboard() {
    if (!jogador.id) return;
    await carregarPerfil();
    await verificarLoginDiario();
    
    if(document.getElementById('home-nome')) document.getElementById('home-nome').innerText = jogador.nome;
    if(document.getElementById('home-avatar')) document.getElementById('home-avatar').innerText = jogador.avatar;
    if(document.getElementById('perfil-avatar')) document.getElementById('perfil-avatar').innerText = jogador.avatar;
    if(document.getElementById('perfil-nome-input')) document.getElementById('perfil-nome-input').value = jogador.nome;
    if(document.getElementById('home-moedas')) document.getElementById('home-moedas').innerText = jogador.moedas;
    if(document.getElementById('loja-moedas')) document.getElementById('loja-moedas').innerText = jogador.moedas;
    if(document.getElementById('home-streak')) document.getElementById('home-streak').innerText = `🔥 ${jogador.streak || 0}`;
    if(document.getElementById('home-vidas')) document.getElementById('home-vidas').innerText = `❤️ ${jogador.vidas}`;
    
    const infoNivel = getNivel(jogador.xp);
    if (infoNivel.nivel > jogador.nivel && jogador.nivel !== 1) {
        jogador.moedas += 100; 
        await banco.from('ranking').update({ moedas: jogador.moedas }).eq('user_id', jogador.id);
        mostrarToast(`NÍVEL UP! Você é Nível ${infoNivel.nivel} e ganhou 100 moedas! 🎉`, "success");
    }
    
    jogador.nivel = infoNivel.nivel;
    if(document.getElementById('home-nivel')) document.getElementById('home-nivel').innerText = `Nível ${infoNivel.nivel} - ${infoNivel.nome}`;
    if(document.getElementById('home-xp-txt')) document.getElementById('home-xp-txt').innerText = `${infoNivel.xpAtual} / ${infoNivel.xpProx} XP`;
    if(document.getElementById('home-xp-bar')) document.getElementById('home-xp-bar').style.width = `${(infoNivel.xpAtual / infoNivel.xpProx) * 100}%`;
    
    renderizarMoldura('home-frame', jogador.moldura_equipada);
    renderizarMoldura('perfil-frame', jogador.moldura_equipada);
    
    renderizarAcademia();
    renderizarSeletorMolduras();
    renderizarSeletorAvatares();
    renderizarLoja();
}

let timerSalvar;
function salvarNomeDelay() {
    clearTimeout(timerSalvar);
    timerSalvar = setTimeout(async () => {
        const novoNome = document.getElementById('perfil-nome-input').value.trim();
        if (novoNome === "") return;
        jogador.nome = novoNome;
        await banco.from('ranking').update({ nome: novoNome }).eq('user_id', jogador.id);
        if(document.getElementById('home-nome')) document.getElementById('home-nome').innerText = novoNome;
        mostrarToast("Nome salvo!", "success");
    }, 1500);
}

function mudarAba(idTela, element) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const tela = document.getElementById(idTela);
    if (tela) tela.classList.add('active');
    
    if (element) {
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        element.classList.add('active');
    }

    if (idTela === 'tela-home' || idTela === 'tela-perfil' || idTela === 'tela-loja') { atualizarDashboard(); }
    if (idTela === 'tela-ranking') renderizarRanking();
}

// --- ACADEMIA: RENDERIZAR TRILHA ---
function renderizarAcademia() {
    const container = document.getElementById('trilha-academia');
    if (!container) return;
    container.innerHTML = '';

    UNIDADES_DB.forEach((unidade, uIndex) => {
        // Cabeçalho da Unidade
        const unidadeHeader = document.createElement('div');
        unidadeHeader.style.cssText = `background: ${unidade.cor}; color: #000; padding: 15px; border-radius: 15px; font-weight: 800; font-size: 18px; margin-top: 20px; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 0 rgba(0,0,0,0.3);`;
        unidadeHeader.innerHTML = `<span>Unidade ${unidade.unidade}: ${unidade.titulo}</span> <span>📖</span>`;
        container.appendChild(unidadeHeader);

        // Lições da Unidade
        unidade.licoes.forEach((licao) => {
            const isConcluida = jogador.aulas_concluidas && jogador.aulas_concluidas.includes(licao.id);
            
            // Lógica de bloqueio: A primeira lição da primeira unidade é livre. As outras dependem da anterior.
            // Para simplificar, vamos usar a ordem global das lições.
            let indexGlobal = 0;
            UNIDADES_DB.forEach(u => u.licoes.forEach(l => { if(l.id === licao.id) { /* find global index */ } }));
            
            // Bloqueio simples: se for a lição id 1, liberada. Se não, verifica se a lição id-1 está concluída.
            let isLiberada = (licao.id === 1) || (jogador.aulas_concluidas && jogador.aulas_concluidas.includes(licao.id - 1));

            const btn = document.createElement('div');
            btn.className = `aula-btn ${isConcluida ? 'concluida' : isLiberada ? 'liberada' : 'bloqueada'}`;
            
            // Adiciona um brilho se estiver liberada mas não concluída
            if (isLiberada && !isConcluida) {
                btn.style.background = unidade.cor;
                btn.style.borderColor = unidade.cor;
            }

            if (isLiberada) {
                btn.innerHTML = `<span style="font-size: 28px;">${isConcluida ? '⭐' : '📖'}</span><span style="font-size: 10px; font-weight: bold; margin-top: 2px;">${licao.titulo}</span>`;
                btn.onclick = () => abrirAula(licao.id); 
            } else {
                btn.innerHTML = `<span style="font-size: 24px;">🔒</span>`;
            }

            // Linha de conexão entre aulas
            const line = document.createElement('div');
            line.className = 'linha-conexao';
            container.appendChild(line);

            container.appendChild(btn);
        });
    });
}

function abrirAula(id) {
    let aulaEncontrada = null;
    UNIDADES_DB.forEach(u => {
        const found = u.licoes.find(l => l.id === id);
        if (found) aulaEncontrada = found;
    });

    if (!aulaEncontrada) return;
    
    aulaAtualId = id;
    tempoInicioAula = Date.now();
    
    // Se já concluiu, não abre o mini-jogo de novo, só avisa
    const isConcluida = jogador.aulas_concluidas && jogador.aulas_concluidas.includes(aulaEncontrada.id);
    if (isConcluida) {
        mostrarToast("Você já concluiu esta lição! 🌟", "success");
        return;
    }

    if (jogador.vidas <= 0) {
        mostrarToast("Você não tem vidas! Espere um pouco.", "error");
        return;
    }

    iniciarDesafio(aulaEncontrada);
}

function iniciarDesafio(aula) {
    questoesAtuais = aula.questoes;
    indiceQuestaoAtual = 0;
    acertosDesafio = 0;
    
    document.getElementById('tela-desafio').classList.add('active');
    document.getElementById('desafio-footer').style.display = 'block';
    document.getElementById('desafio-progresso').style.width = '0%';
    
    carregarQuestao();
}

function carregarQuestao() {
    if (indiceQuestaoAtual >= questoesAtuais.length) {
        finalizarDesafio();
        return;
    }

    const q = questoesAtuais[indiceQuestaoAtual];
    document.getElementById('desafio-progresso').style.width = `${(indiceQuestaoAtual / questoesAtuais.length) * 100}%`;
    
    // Esconde todos os tipos de jogo
    document.getElementById('jogo-pares').style.display = 'none';
    document.getElementById('jogo-completar').style.display = 'none';
    document.getElementById('jogo-multipla').style.display = 'none';
    
    // Reseta botão de verificar
    const btnVerificar = document.getElementById('btn-verificar-desafio');
    btnVerificar.innerText = 'VERIFICAR';
    btnVerificar.disabled = true;
    btnVerificar.onclick = verificarRespostaDesafio;
    opcaoSelecionada = null;
    botaoSelecionado = null;

    if (q.tipo === 'multipla') {
        document.getElementById('jogo-multipla').style.display = 'block';
        document.getElementById('multipla-pergunta').innerText = q.pergunta;
        const containerOpcoes = document.getElementById('multipla-opcoes');
        containerOpcoes.innerHTML = '';
        
        q.opcoes.forEach((opcao, index) => {
            const btn = document.createElement('button');
            btn.className = 'btn-secondary';
            btn.style.marginTop = '0';
            btn.innerText = opcao;
            btn.onclick = () => selecionarOpcao(index, btn);
            containerOpcoes.appendChild(btn);
        });
    } else if (q.tipo === 'completar') {
        document.getElementById('jogo-completar').style.display = 'block';
        document.getElementById('completar-pergunta').innerText = q.pergunta;
        const input = document.getElementById('completar-input');
        input.value = '';
        input.oninput = () => {
            btnVerificar.disabled = input.value.trim() === '';
        };
    }
}

function selecionarOpcao(index, btn) {
    opcaoSelecionada = index;
    document.querySelectorAll('#multipla-opcoes button').forEach(b => {
        b.style.borderColor = 'rgba(255,255,255,0.1)';
        b.style.background = 'rgba(255,255,255,0.05)';
    });
    btn.style.borderColor = 'var(--primary)';
    btn.style.background = 'rgba(0, 240, 255, 0.1)';
    botaoSelecionado = btn;
    document.getElementById('btn-verificar-desafio').disabled = false;
}

async function verificarRespostaDesafio() {
    const btnVerificar = document.getElementById('btn-verificar-desafio');
    if (btnVerificar.innerText === 'PRÓXIMA') {
        indiceQuestaoAtual++;
        carregarQuestao();
        return;
    }

    const q = questoesAtuais[indiceQuestaoAtual];
    let acertou = false;

    if (q.tipo === 'multipla') {
        if (opcaoSelecionada === q.correta) acertou = true;
        if (acertou) {
            botaoSelecionado.style.borderColor = '#00ff88';
            botaoSelecionado.style.background = 'rgba(0, 255, 136, 0.2)';
        } else {
            botaoSelecionado.style.borderColor = '#ff003c';
            botaoSelecionado.style.background = 'rgba(255, 0, 60, 0.2)';
            // Mostra a certa
            document.querySelectorAll('#multipla-opcoes button')[q.correta].style.borderColor = '#00ff88';
        }
    } else if (q.tipo === 'completar') {
        const val = document.getElementById('completar-input').value.trim();
        if (val === q.resposta) acertou = true;
    }

    if (acertou) {
        acertosDesafio++;
        mostrarToast("Acertou! +10 XP", "success");
    } else {
        jogador.vidas--;
        mostrarToast("Errou! -1 Vida ❤️", "error");
        // Atualiza vidas no banco
        await banco.from('ranking').update({ vidas: jogador.vidas }).eq('user_id', jogador.id);
        
        if (jogador.vidas <= 0) {
            mostrarToast("Suas vidas acabaram! 😭", "error");
            setTimeout(() => {
                document.getElementById('tela-desafio').classList.remove('active');
                document.getElementById('desafio-footer').style.display = 'none';
                atualizarDashboard();
            }, 2000);
            return;
        }
    }

    btnVerificar.innerText = 'PRÓXIMA';
}

async function finalizarDesafio() {
    document.getElementById('tela-desafio').classList.remove('active');
    document.getElementById('desafio-footer').style.display = 'none';
    
    if (!jogador.aulas_concluidas) jogador.aulas_concluidas = [];
    if (!jogador.aulas_concluidas.includes(aulaAtualId)) {
        jogador.aulas_concluidas.push(aulaAtualId);
    }

    // Recompensas baseadas em acertos
    const xpGanha = acertosDesafio * 10;
    const moedasGanhas = acertosDesafio * 5;
    
    jogador.xp += xpGanha;
    jogador.moedas += moedasGanhas;

    await banco.from('ranking').update({ 
        aulas_concluidas: jogador.aulas_concluidas,
        xp: jogador.xp,
        moedas: jogador.moedas,
        vidas: jogador.vidas
    }).eq('user_id', jogador.id);

    // Calcula tempo
    const tempoFinal = Date.now();
    const segundosTotais = Math.floor((tempoFinal - tempoInicioAula) / 1000);
    const minutos = Math.floor(segundosTotais / 60);
    const segundos = segundosTotais % 60;
    const tempoFormatado = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

    fecharAula();
    mostrarResultado(xpGanha, moedasGanhas, tempoFormatado, `${acertosDesafio} / ${questoesAtuais.length}`);
        }
// --- LOJA E COFRE ---
function mudarAbaLoja(tipo, botao) {
    abaLojaAtual = tipo;
    document.querySelectorAll('.tab-loja').forEach(b => b.classList.remove('ativa'));
    botao.classList.add('ativa');
    renderizarLoja();
}

function renderizarLoja() {
    const lojaMoedas = document.getElementById('loja-moedas');
    if (lojaMoedas) lojaMoedas.innerText = jogador.moedas || 0;
    const container = document.getElementById('lista-loja');
    if (!container) return;
    
    let itensFiltrados = LOJA_DB;
    if (abaLojaAtual === 'avatar') { itensFiltrados = AVATARES_DB; } 
    else if (abaLojaAtual === 'duplicador') { itensFiltrados = []; }

    container.innerHTML = '';

    itensFiltrados.forEach(item => {
        let possui = false;
        if (abaLojaAtual === 'avatar') { possui = jogador.avatares_desbloqueados.includes(item.icone); } 
        else { possui = jogador.molduras_desbloqueadas.includes(item.id); }

        let botaoHTML = '';
        if (possui) {
            botaoHTML = `<button class="btn-secondary" style="width: auto; padding: 8px 15px; margin: 0; background: rgba(0,255,136,0.2); color: #00ff88; border-color: #00ff88;">ADQUIRIDO</button>`;
        } else if (jogador.moedas >= item.preco) {
            botaoHTML = `<button class="btn-primary" style="width: auto; padding: 8px 15px; margin: 0;" onclick="comprarItem('${item.id}')">COMPRAR</button>`;
        } else {
            botaoHTML = `<button class="btn-secondary" style="width: auto; padding: 8px 15px; margin: 0; opacity: 0.5;">FALTA 🪙</button>`;
        }

        container.innerHTML += `
            <div class="store-item ${item.raridade === 'Épica' ? 'efeito-epico' : item.raridade === 'Lendária' ? 'efeito-lendario' : item.raridade === 'Mítica' ? 'efeito-mitico' : ''}" style="border: 1px solid ${item.raridade === 'Lendária' ? '#ffb800' : item.raridade === 'Épica' ? '#a700ff' : 'rgba(255,255,255,0.05)'};">
                <div style="position: relative; width: 80px; height: 80px; display: flex; justify-content: center; align-items: center;">
                    ${item.img ? `<img src="${item.img}" style="width: 100%; height: 100%; position: absolute; z-index: 2;">` : `<div style="font-size: 40px; position: absolute; z-index: 2;">${item.icone}</div>`}
                </div>
                <div style="flex: 1;">
                    <h3 style="font-size: 14px; font-weight: 800; color: white; margin-bottom: 2px;">${item.nome}</h3>
                    <p style="font-size: 11px; color: var(--text-muted); margin-bottom: 5px;">Raridade: ${item.raridade}</p>
                    <div style="font-size: 14px; font-weight: bold; color: var(--gold);">🪙 ${item.preco}</div>
                </div>
                ${botaoHTML}
            </div>
        `;
    });
}

async function comprarItem(id) {
    let item;
    if (abaLojaAtual === 'avatar') { item = AVATARES_DB.find(i => i.id === id); } 
    else { item = LOJA_DB.find(i => i.id === id); }
    if (!item) return;

    if (jogador.moedas >= item.preco) {
        jogador.moedas -= item.preco;
        
        if (abaLojaAtual === 'avatar') {
            jogador.avatar = item.icone; 
            if (!jogador.avatares_desbloqueados.includes(item.icone)) { jogador.avatares_desbloqueados.push(item.icone); }
        } else {
            jogador.molduras_desbloqueadas.push(item.id);
            jogador.moldura_equipada = item.id; 
        }

        await banco.from('ranking').update({ 
            moedas: jogador.moedas, avatar: jogador.avatar,
            molduras_compradas: jogador.molduras_desbloqueadas,
            moldura_equipada: jogador.moldura_equipada,
            avatares_desbloqueados: jogador.avatares_desbloqueados
        }).eq('user_id', jogador.id);

        mostrarToast(`Você comprou: ${item.nome}! 🎉`, "success"); 
        renderizarLoja(); 
        atualizarDashboard();
    }
}

function renderizarSeletorAvatares() {
    const container = document.getElementById('seletor-avatares');
    if (!container) return;
    container.innerHTML = '';

    AVATARES_DB.forEach(avatar => {
        const temAvatar = jogador.avatares_desbloqueados.includes(avatar.icone);
        if (temAvatar) {
            const btn = document.createElement('div');
            btn.style.cssText = 'cursor: pointer; text-align: center; padding: 10px; background: rgba(255,255,255,0.05); border-radius: 15px; border: 2px solid rgba(255,255,255,0.1);';
            if (jogador.avatar === avatar.icone) {
                btn.style.borderColor = 'var(--primary)';
                btn.style.boxShadow = '0 0 10px var(--primary)';
                btn.style.background = 'rgba(0, 240, 255, 0.1)';
            }
            btn.innerHTML = `<div style="font-size: 35px;">${avatar.icone}</div>`;
            btn.onclick = async () => {
                jogador.avatar = avatar.icone;
                await banco.from('ranking').update({ avatar: jogador.avatar }).eq('user_id', jogador.id);
                mostrarToast(`Avatar ${avatar.nome} equipado!`, "success");
                atualizarDashboard(); 
            };
            container.appendChild(btn);
        }
    });
}

function renderizarSeletorMolduras() {
    const container = document.getElementById('seletor-molduras');
    if (!container) return;
    container.innerHTML = '';

    MOLDURAS_DB.forEach(moldura => {
        const temMoldura = jogador.molduras_desbloqueadas.includes(moldura.id) || moldura.id === 'padrao';
        const btn = document.createElement('div');
        btn.style.cssText = 'cursor: pointer; text-align: center; padding: 5px; position: relative;';
        
        let contentHTML = '';
        if (moldura.tipo === 'css') {
            contentHTML = `<div style="width: 50px; height: 50px; border-radius: 8px; border: 3px solid var(--primary); margin: 0 auto; display: flex; align-items: center; justify-content: center; background: #1a1a2e;">${jogador.avatar}</div>`;
        } else {
            contentHTML = `
                <div style="width: 65px; height: 65px; margin: 0 auto; position: relative; display: flex; justify-content: center; align-items: center;">
                    <div style="position: absolute; font-size: 20px; z-index: 3;">${jogador.avatar}</div>
                    <img src="${moldura.img}" class="${moldura.raridade === 'Épica' ? 'efeito-epico' : moldura.raridade === 'Lendária' ? 'efeito-lendario' : moldura.raridade === 'Mítica' ? 'efeito-mitico' : ''}" style="width: 100%; height: 100%; position: absolute; z-index: 2;">
                </div>`;
        }
        if (!temMoldura) {
            btn.style.opacity = '0.3';
            contentHTML += `<div style="font-size: 20px; position: absolute; top: 15px; left: 15px; z-index: 4;">🔒</div>`;
        }
        if (jogador.moldura_equipada === moldura.id) {
            btn.style.transform = 'scale(1.1)';
            btn.style.filter = 'drop-shadow(0 0 8px var(--primary))';
        }
        btn.innerHTML = contentHTML;
        if (temMoldura) {
            btn.onclick = async () => {
                jogador.moldura_equipada = moldura.id;
                await banco.from('ranking').update({ moldura_equipada: moldura.id }).eq('user_id', jogador.id);
                mostrarToast(`Moldura ${moldura.nome} equipada!`);
                atualizarDashboard();
            };
        }
        container.appendChild(btn);
    });
}

// --- RANKING ---
async function renderizarRanking() {
    const { data, error } = await banco.from('ranking').select('*').order('xp', { ascending: false }).limit(20);
    if (error) return;
    const rank1 = document.getElementById('rank-1');
    const rank2 = document.getElementById('rank-2');
    const rank3 = document.getElementById('rank-3');
    const lista = document.getElementById('lista-ranking');
    if (!lista) return;
    
    lista.innerHTML = '';
    if(rank1) rank1.style.display = 'none'; 
    if(rank2) rank2.style.display = 'none'; 
    if(rank3) rank3.style.display = 'none';

    data.forEach((user, index) => {
        const pos = index + 1;
        const avatarEmoji = user.avatar || '🐱';
        if (pos === 1 && rank1) {
            rank1.style.display = 'flex';
            rank1.querySelector('.podium-name').innerText = user.nome;
            rank1.querySelector('.podium-xp').innerText = `${user.xp} XP`;
            rank1.querySelector('.podium-avatar').innerHTML = `<div style="font-size: 40px;">${avatarEmoji}</div>`;
        } else if (pos === 2 && rank2) {
            rank2.style.display = 'flex';
            rank2.querySelector('.podium-name').innerText = user.nome;
            rank2.querySelector('.podium-xp').innerText = `${user.xp} XP`;
            rank2.querySelector('.podium-avatar').innerHTML = `<div style="font-size: 30px;">${avatarEmoji}</div>`;
        } else if (pos === 3 && rank3) {
            rank3.style.display = 'flex';
            rank3.querySelector('.podium-name').innerText = user.nome;
            rank3.querySelector('.podium-xp').innerText = `${user.xp} XP`;
            rank3.querySelector('.podium-avatar').innerHTML = `<div style="font-size: 30px;">${avatarEmoji}</div>`;
        } else {
            lista.innerHTML += `
                <div class="ranking-row">
                    <div class="rank-pos">#${pos}</div>
                    <div class="rank-avatar" style="font-size: 24px;">${avatarEmoji}</div>
                    <div class="rank-name">${user.nome}</div>
                    <div class="rank-xp">${user.xp} XP</div>
                </div>`;
        }
    });
}

// --- TELA DE RESULTADO E CONFETES ---
function mostrarResultado(xp, moedas, tempo, acertos) {
    document.getElementById('resultado-tempo').innerText = tempo;
    document.getElementById('resultado-xp').innerText = `+${xp} XP`;
    document.getElementById('resultado-moedas').innerText = `+${moedas} 🪙`;
    document.getElementById('resultado-acertos').innerText = acertos;
    
    // Calcula precisão
    const [acertosNum, totalNum] = acertos.split('/').map(Number);
    const precisao = totalNum > 0 ? Math.round((acertosNum / totalNum) * 100) : 0;
    document.getElementById('resultado-precisao').innerText = `${precisao}%`;

    document.getElementById('modal-resultado').style.display = 'flex';
    criarConfetes();
}

function fecharResultado() {
    document.getElementById('modal-resultado').style.display = 'none';
    atualizarDashboard();
}

function proximaAula() {
    document.getElementById('modal-resultado').style.display = 'none';
    atualizarDashboard();
}

function criarConfetes() {
    const container = document.getElementById('confetti-container');
    if (!container) return;
    container.innerHTML = '';
    const cores = ['#00f0ff', '#7000ff', '#ff003c', '#ffb800', '#00ff88'];
    
    for (let i = 0; i < 50; i++) {
        const confete = document.createElement('div');
        confete.classList.add('confetti');
        confete.style.left = Math.random() * 100 + 'vw';
        confete.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];
        confete.style.animationDuration = (Math.random() * 2 + 2) + 's';
        confete.style.animationDelay = (Math.random() * 0.5) + 's';
        
        if (Math.random() > 0.5) confete.style.borderRadius = '50%';
        
        container.appendChild(confete);
    }
}

// --- FUNÇÕES DE APOIO ---
function mostrarNotificacoes() {
    mostrarToast("Você não tem novas notificações.", "success");
}

function cancelarDesafio() {
    document.getElementById('tela-desafio').classList.remove('active');
    document.getElementById('desafio-footer').style.display = 'none';
    fecharAula();
}

function fecharAula() {
    document.getElementById('modal-aula').style.display = 'none';
    aulaAtualId = null;
}

// --- INICIALIZAÇÃO ---
window.onload = () => {
    banco.auth.onAuthStateChange((event, session) => {
        if (session) {
            jogador.id = session.user.id;
            document.getElementById('tela-auth').classList.remove('active');
            document.getElementById('bottom-nav').style.display = 'flex';
            mudarAba('tela-home');
        }
    });
};
