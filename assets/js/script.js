// script.js - Robô Fofoqueiro | Menu superior (projeto) + Menu lateral (abas internas)

document.addEventListener("DOMContentLoaded", function () {
  // ============================================================
  // 1. SISTEMA DE ABAS DO PROJETO PRINCIPAL (menu superior)
  // ============================================================
  const botoesProjeto = document.querySelectorAll("[data-projeto-aba]");

  function ativarProjetoAba(abaId) {
    if (abaId === "aula1") {
      window.location.href = "aula_01.html";
    } else if (abaId === "aula2") {
      window.location.href = "aula_02.html";
    } else if (abaId === "aula3") {
      window.location.href = "aula_03.html";
    } else if (abaId === "inicio") {
      window.location.href = "../index.html";
    } else if (abaId === "aula4") {
      const msg = document.createElement("div");
      msg.className =
        "alert alert-info alert-dismissible fade show position-fixed top-50 start-50 translate-middle z-3 alert-robot-floating";
      msg.innerHTML = `
        <i class="bi bi-robot fs-3 me-2"></i>
        <strong>🤖 Robô Fofoqueiro diz:</strong><br>
        "Vixi, a Aula 4 (Visão) ainda tá em desenvolvimento!<br>
        Bora terminar as anteriores primeiro, meu consagrado!"
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      `;
      document.body.appendChild(msg);
      setTimeout(() => {
        if (msg.parentNode) msg.remove();
      }, 3000);
    } else {
      const msg = document.createElement("div");
      msg.className =
        "alert alert-info alert-dismissible fade show position-fixed top-50 start-50 translate-middle z-3 alert-robot-floating";
      msg.innerHTML = `
        <i class="bi bi-robot fs-3 me-2"></i>
        <strong>🤖 Robô Fofoqueiro diz:</strong><br>
        "Sobre o projeto: 4 aulas sobre acessibilidade<br>
        com Python, IA e muito humor paranaense!"
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      `;
      document.body.appendChild(msg);
      setTimeout(() => {
        if (msg.parentNode) msg.remove();
      }, 3000);
    }
  }

  botoesProjeto.forEach((botao) => {
    botao.addEventListener("click", (e) => {
      e.preventDefault();
      const projetoAbaId = botao.getAttribute("data-projeto-aba");
      botoesProjeto.forEach((btn) => btn.classList.remove("active-projeto"));
      botao.classList.add("active-projeto");
      ativarProjetoAba(projetoAbaId);
    });
  });

  // ============================================================
  // 2. SISTEMA DE ABAS LATERAIS (conteúdo interno)
  // ============================================================
  const botoesLateral = document.querySelectorAll(".lateral-link");

  // Detectar qual página estamos para definir as abas laterais corretas
  const paginaAtual = window.location.pathname;
  let abasLaterais = {};

  if (paginaAtual.includes("aula_01.html")) {
    abasLaterais = {
      setup: document.getElementById("conteudoSetup"),
      codigo: document.getElementById("conteudoCodigo"),
      checklist: document.getElementById("conteudoChecklist"),
      professor: document.getElementById("conteudoProfessor"),
    };
  } else if (paginaAtual.includes("aula_02.html")) {
    abasLaterais = {
      conceitos: document.getElementById("conteudoConceitos"),
      codigo: document.getElementById("conteudoCodigo"),
      checklist: document.getElementById("conteudoChecklist"),
      professor: document.getElementById("conteudoProfessor"),
    };
  } else if (paginaAtual.includes("aula_03.html")) {
    abasLaterais = {
      conceitos: document.getElementById("conteudoConceitos"),
      codigo: document.getElementById("conteudoCodigo"),
      checklist: document.getElementById("conteudoChecklist"),
      professor: document.getElementById("conteudoProfessor"),
      setup: document.getElementById("conteudoSetup"),
    };
  } else {
    // Página inicial (index.html)
    abasLaterais = {
      apresentacao: document.getElementById("conteudoApresentacao"),
      jornada: document.getElementById("conteudoJornada"),
      equipe: document.getElementById("conteudoEquipe"),
      bncc: document.getElementById("conteudoBncc"),
    };
  }

  function ativarAbaLateral(abaId) {
    Object.values(abasLaterais).forEach((aba) => {
      if (aba) aba.classList.remove("active-lateral-aba");
    });
    if (abasLaterais[abaId]) {
      abasLaterais[abaId].classList.add("active-lateral-aba");
    }
    botoesLateral.forEach((botao) => {
      const botaoAba = botao.getAttribute("data-lateral-aba");
      if (botaoAba === abaId) {
        botao.classList.add("active-lateral");
      } else {
        botao.classList.remove("active-lateral");
      }
    });
    sessionStorage.setItem("abaLateralAtiva", abaId);
  }

  botoesLateral.forEach((botao) => {
    botao.addEventListener("click", (e) => {
      e.preventDefault();
      const abaId = botao.getAttribute("data-lateral-aba");
      if (abaId && abasLaterais[abaId]) ativarAbaLateral(abaId);
    });
  });

  let ultimaAba = sessionStorage.getItem("abaLateralAtiva");
  if (!ultimaAba || !abasLaterais[ultimaAba]) {
    const primeiraAba = Object.keys(abasLaterais)[0];
    if (primeiraAba) ultimaAba = primeiraAba;
  }
  if (ultimaAba && abasLaterais[ultimaAba]) {
    ativarAbaLateral(ultimaAba);
  }

  // ============================================================
  // 3. SIMULADOR DE DECIBÉIS (AULA 2) - COM BARRA, dB E MEMES
  // ============================================================

  // Elementos do simulador
  const barraDb = document.getElementById("barraDb");
  const dbValor = document.getElementById("dbValor");
  const alertaBox = document.getElementById("alertaBox");
  const mensagemMeme = document.getElementById("mensagemMeme");

  // Botões de níveis de som
  const btnSussurro = document.getElementById("btnSussurro");
  const btnConversa = document.getElementById("btnConversa");
  const btnPalmas = document.getElementById("btnPalmas");
  const btnGrito = document.getElementById("btnGrito");
  const simularSom = document.getElementById("simularSom");

  // Função para atualizar o simulador com um valor de dB (0-120)
  function atualizarSimulador(db) {
    // Garantir que db fique entre 0 e 120
    db = Math.min(120, Math.max(0, db));

    // Atualizar texto do dB
    if (dbValor) dbValor.textContent = db.toFixed(1);

    // Atualizar largura da barra (porcentagem)
    const percentual = (db / 120) * 100;
    if (barraDb) barraDb.style.width = percentual + "%";

    // Definir cor da barra baseada no nível
    if (barraDb) {
      if (db < 40)
        barraDb.style.backgroundColor = "#2ecc71"; // Verde (silêncio)
      else if (db < 75)
        barraDb.style.backgroundColor = "#f39c12"; // Laranja (atenção)
      else barraDb.style.backgroundColor = "#e74c3c"; // Vermelho (alerta)
    }

    // Mostrar/esconder alerta baseado no limite de 75 dB
    if (alertaBox) {
      if (db > 75) {
        alertaBox.style.display = "block";
        alertaBox.classList.remove("d-none");
      } else {
        alertaBox.style.display = "none";
        alertaBox.classList.add("d-none");
      }
    }

    // Definir mensagem do meme baseada no dB
    let mensagem = "";
    if (db < 40) {
      mensagem = "🤫 Silêncio absoluto... até assusta!";
    } else if (db < 60) {
      mensagem = "🗣️ Papinho normal, nada de mais...";
    } else if (db < 80) {
      mensagem = "📢 TÁ FICANDO BOM! Logo logo viro fofoqueiro!";
    } else if (db < 100) {
      mensagem = "🔊 CALA A BOCA! Vou piscar o LED vermelho!";
    } else {
      mensagem = "💀 INFERNO ACÚSTICO! Vou chamar a diretora robô!";
    }

    if (mensagemMeme) {
      mensagemMeme.innerHTML = `<i class="bi bi-robot"></i> ${mensagem}`;
      // Adicionar classe de animação para feedback
      mensagemMeme.classList.add("animate__animated", "animate__pulse");
      setTimeout(() => {
        mensagemMeme.classList.remove("animate__animated", "animate__pulse");
      }, 300);
    }
  }

  // Eventos dos botões
  if (btnSussurro) {
    btnSussurro.addEventListener("click", () => {
      atualizarSimulador(25);
    });
  }

  if (btnConversa) {
    btnConversa.addEventListener("click", () => {
      atualizarSimulador(55);
    });
  }

  if (btnPalmas) {
    btnPalmas.addEventListener("click", () => {
      atualizarSimulador(85);
    });
  }

  if (btnGrito) {
    btnGrito.addEventListener("click", () => {
      atualizarSimulador(95);
    });
  }

  if (simularSom) {
    simularSom.addEventListener("click", () => {
      // Gerar valor aleatório entre 0 e 120
      const dbAleatorio = Math.random() * 120;
      atualizarSimulador(dbAleatorio);

      // Feedback visual no botão
      simularSom.innerHTML = '<i class="bi bi-shuffle"></i> Aleatório!';
      setTimeout(() => {
        simularSom.innerHTML = "🎲 Simular som aleatório";
      }, 1000);
    });
  }

  // Inicializar simulador com valor padrão (0 dB)
  if (document.querySelector(".simulador-volume")) {
    atualizarSimulador(0);
  }

  // ============================================================
  // 3.5. SIMULADOR DE COLETA DE DADOS (AULA 2 - CHECKLIST)
  // ============================================================

  const simularColeta = document.getElementById("simularColeta");
  const tabelaResultados = document.getElementById("tabelaResultados");

  if (simularColeta && tabelaResultados) {
    simularColeta.addEventListener("click", () => {
      // Array com os níveis de som a serem simulados
      const niveisDeSom = [
        { nome: "🤫 Sussurro", db: 25, mensagem: "Silêncio absoluto... até assusta!" },
        { nome: "🗣️ Conversa normal", db: 55, mensagem: "Papinho normal, nada de mais..." },
        { nome: "👏 Palmas", db: 85, mensagem: "TÁ FICANDO BOM! Logo logo viro fofoqueiro!" },
        { nome: "📢 Grito", db: 95, mensagem: "CALA A BOCA! Vou piscar o LED vermelho!" },
        { nome: "🎸 Show de rock", db: 110, mensagem: "INFERNO ACÚSTICO! Vou chamar a diretora robô!" },
        { nome: "🍃 Vento suave", db: 15, mensagem: "Silêncio absoluto... até assusta!" },
        { nome: "📱 Celular vibrando", db: 45, mensagem: "Papinho normal, nada de mais..." },
        { nome: "🔨 Martelada", db: 100, mensagem: "CALA A BOCA! Vou piscar o LED vermelho!" }
      ];

      // Embaralhar array para ficar mais realista e pegar 5 medições
      const shuffled = [...niveisDeSom];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      const medicoes = shuffled.slice(0, 5);

      // Ordenar por timestamp
      const agora = new Date();
      const dadosColeta = medicoes.map((medicao, index) => {
        const timestamp = new Date(agora.getTime() - (medicoes.length - index) * 30000);
        return {
          timestamp: timestamp.toLocaleTimeString("pt-BR"),
          dB: medicao.db,
          mensagem: medicao.mensagem,
          alerta: medicao.db > 75
        };
      });

      // Gerar tabela HTML
      let htmlTabela = `
        <div class="table-responsive mt-3">
          <table class="table table-bordered table-striped table-sm">
            <thead class="table-dark">
              <tr>
                <th>⏰ Horário</th>
                <th>🔊 dB</th>
                <th>📢 Mensagem</th>
                <th>🚨 Alerta</th>
              </tr>
            </thead>
            <tbody>
      `;

      dadosColeta.forEach(medicao => {
        const alertaIcon = medicao.alerta
          ? '<span class="badge bg-danger"><i class="bi bi-exclamation-triangle-fill"></i> +75dB</span>'
          : '<span class="badge bg-success"><i class="bi bi-check-circle-fill"></i> Normal</span>';

        let linhaClasse = medicao.alerta ? "table-danger" : "";

        htmlTabela += `
          <tr class="${linhaClasse}">
            <td><i class="bi bi-clock"></i> ${medicao.timestamp}</td>
            <td><strong>${medicao.dB} dB</strong></td>
            <td><i class="bi bi-robot"></i> ${medicao.mensagem}</td>
            <td class="text-center">${alertaIcon}</td>
          </tr>
        `;
      });

      // Calcular estatísticas
      const valoresDB = dadosColeta.map(m => m.dB);
      const maxDB = Math.max(...valoresDB);
      const minDB = Math.min(...valoresDB);
      const mediaDB = (valoresDB.reduce((a, b) => a + b, 0) / valoresDB.length).toFixed(1);
      const alertasCount = dadosColeta.filter(m => m.alerta).length;

      htmlTabela += `
            </tbody>
          </table>
        </div>
        <div class="alert alert-info mt-3">
          <i class="bi bi-graph-up"></i> <strong>📊 Estatísticas da coleta:</strong><br>
          🔹 Maior nível: ${maxDB} dB<br>
          🔹 Menor nível: ${minDB} dB<br>
          🔹 Média: ${mediaDB} dB<br>
          🔹 Alertas disparados: ${alertasCount} de ${dadosColeta.length} medições
        </div>
        <div class="alert alert-warning">
          <i class="bi bi-robot"></i> <strong>🤖 Robô Fofoqueiro diz:</strong><br>
          ${alertasCount > 2 ? "ÉGUA! Barulheira danada, hein, piá! Bora baixar esse volume! 🔊" : "Tá tranquilo, tchê! O barulho tá sob controle! 🤫"}
        </div>
      `;

      tabelaResultados.innerHTML = htmlTabela;

      // Adicionar animação no botão
      simularColeta.innerHTML = '<i class="bi bi-check-lg"></i> Coleta realizada!';
      setTimeout(() => {
        simularColeta.innerHTML = '<i class="bi bi-graph-up"></i> Simular coleta de dados';
      }, 2000);

      // Adicionar efeito sonoro visual (feedback)
      const cardColeta = document.querySelector("#conteudoChecklist .card:first-child");
      if (cardColeta) {
        cardColeta.style.transform = "scale(1.02)";
        setTimeout(() => {
          cardColeta.style.transform = "";
        }, 300);
      }
    });
  }

  // ============================================================
  // 4. RECONHECIMENTO DE FALA (AULA 3)
  // ============================================================

  const dicionarioGirias = {
    vixi: "😲 expressão de surpresa ou susto",
    piá: "🧒 garoto, rapaz",
    guria: "👧 garota, moça",
    "ó o trem": "👀 olha a coisa, presta atenção",
    tchê: "🤝 companheiro, amigo",
    "bagulho doido": "🤪 coisa louca, situação complicada",
    égua: "🐴 expressão de espanto",
    trem: "📦 coisa, objeto",
    bah: "😮 expressão de surpresa",
    "mas qué isso": "😯 expressão de indignação",
  };

  const respostasPersonalizadas = {
    programar:
      "Vixi, programar é bagulho doido! Bora praticar mais um pouco, tchê! 🤖💻",
    python: "Ah, Python é o trem mais legal, piá! Bora codar mais um pouco! 🐍",
    robô: "Ó o trem, tão falando de mim! Eu sou o Robô Fofoqueiro, prazer, tchê! 🤖",
    biblioteca:
      "Piá, a biblioteca é no segundo andar, ó o trem ali do lado! 📚",
    estudar: "Guria, estudar é bom demais! Bora fofocar sobre o conteúdo? 📖",
    professor:
      "O professor é gente boa demais, égua! Tá te ensinando bagulho doido! 👨‍🏫",
    ajuda:
      "Claro que ajudo, piá! Tô aqui pra isso! Só falar o que precisa, tchê! 🆘",
    obrigado: "Vixi, imagina! Tamo junto, guria! Bora que bora! 🙏",
    fofoca:
      "AHHH! Finalmente uma fofoca! Conta tudinho, piá! Tô de ouvido colado! 🍿",
    padrão:
      "Vixi, não entendi direito não, piá! Repete aí mais devagar, égua! 🤔",
  };

  function traduzirLibrasTextual(frase) {
    const librasSimbolos = {
      a: "🖐️",
      b: "👆",
      c: "🤞",
      d: "🤘",
      e: "👈",
      f: "🤙",
      g: "👍",
      h: "👌",
      i: "👇",
      j: "🤞",
      k: "🖖",
      l: "🤟",
      m: "🤚",
      n: "👎",
      o: "👌",
      p: "✋",
      q: "🤙",
      r: "👉",
      s: "🤞",
      t: "👍",
      u: "☝️",
      v: "✌️",
      w: "🤙",
      x: "🫰",
      y: "🤙",
      z: "🤞",
      " ": "   ",
      "?": "❓",
      "!": "❗",
      ".": "🔴",
    };
    let resultado = [];
    for (let letra of frase.toLowerCase()) {
      if (librasSimbolos[letra]) {
        resultado.push(librasSimbolos[letra]);
      } else {
        resultado.push(letra);
      }
    }
    let librasText = resultado.join(" ");
    return librasText.length > 80
      ? librasText.substring(0, 80) + "..."
      : librasText;
  }

  function gerarRespostaPersonalizada(frase) {
    const fraseLower = frase.toLowerCase();

    for (let [palavra, resposta] of Object.entries(respostasPersonalizadas)) {
      if (fraseLower.includes(palavra)) {
        return resposta;
      }
    }

    for (let [giria, significado] of Object.entries(dicionarioGirias)) {
      if (fraseLower.includes(giria)) {
        return `Vixi, você usou '${giria}'! ${significado} Égua, sabia nem que existia isso! 🤯`;
      }
    }

    return respostasPersonalizadas["padrão"];
  }

  function atualizarResposta(frase) {
    if (!frase || frase.trim() === "") {
      const respostaRobo = document.getElementById("respostaRobo");
      const librasTexto = document.getElementById("librasTexto");
      if (respostaRobo)
        respostaRobo.innerHTML =
          '<strong><i class="bi bi-robot"></i> Robô Fofoqueiro:</strong><br>"Vixi, não falou nada, piá! Fala alguma coisa aí!"';
      if (librasTexto) librasTexto.innerHTML = "😶 Nada para traduzir...";
      return;
    }

    const resposta = gerarRespostaPersonalizada(frase);
    const librasText = traduzirLibrasTextual(frase);

    const respostaDiv = document.getElementById("respostaRobo");
    if (respostaDiv) {
      respostaDiv.innerHTML = `<strong><i class="bi bi-robot"></i> Robô Fofoqueiro:</strong><br>"${resposta}"`;
      respostaDiv.style.transform = "scale(1.02)";
      setTimeout(() => {
        if (respostaDiv) respostaDiv.style.transform = "";
      }, 200);
    }

    const librasDiv = document.getElementById("librasTexto");
    if (librasDiv) librasDiv.innerHTML = librasText;

    let temGiria = false;
    for (let giria of Object.keys(dicionarioGirias)) {
      if (frase.toLowerCase().includes(giria)) {
        temGiria = true;
        break;
      }
    }

    if (temGiria) {
      const toastGiria = document.createElement("div");
      toastGiria.className =
        "alert alert-warning alert-dismissible fade show position-fixed bottom-0 start-50 translate-middle-x m-3";
      toastGiria.style.zIndex = "9999";
      toastGiria.style.minWidth = "250px";
      toastGiria.innerHTML = `
        <i class="bi bi-emoji-sunglasses"></i>
        <strong>ÊÊÊÊGUA!</strong> Você usou uma gíria paranaense!
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      `;
      document.body.appendChild(toastGiria);
      setTimeout(() => {
        if (toastGiria.parentNode) toastGiria.remove();
      }, 3000);
    }
  }

  const btnIniciarGravacao = document.getElementById("btnIniciarGravacao");
  const statusGravacao = document.getElementById("statusGravacao");
  let recognition = null;
  let isListening = false;

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (SpeechRecognition && btnIniciarGravacao) {
    recognition = new SpeechRecognition();
    recognition.lang = "pt-BR";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = function () {
      isListening = true;
      if (statusGravacao) {
        statusGravacao.innerHTML =
          '<i class="bi bi-mic-fill text-danger"></i> 🎤 Escutando... Fale alguma coisa, piá!';
        statusGravacao.className = "alert alert-danger mb-3";
      }
      btnIniciarGravacao.innerHTML =
        '<i class="bi bi-stop-fill"></i> Ouvindo...';
      btnIniciarGravacao.disabled = false;
    };

    recognition.onresult = function (event) {
      const texto = event.results[0][0].transcript;
      if (statusGravacao) {
        statusGravacao.innerHTML = `<i class="bi bi-check-circle-fill text-success"></i> ✅ Você disse: "${texto}"`;
        statusGravacao.className = "alert alert-success mb-3";
      }
      atualizarResposta(texto);
      isListening = false;
      btnIniciarGravacao.innerHTML =
        '<i class="bi bi-mic-fill"></i> 🎤 Clique e Fale com o Robô';
    };

    recognition.onerror = function (event) {
      console.error("Erro no reconhecimento:", event.error);
      let mensagemErro = "";
      switch (event.error) {
        case "not-allowed":
          mensagemErro =
            "❌ Permissão do microfone negada! Clique no cadeado do navegador e permita o acesso.";
          break;
        case "no-speech":
          mensagemErro =
            "❌ Não detectei nenhuma fala! Tenta falar mais alto, piá!";
          break;
        case "audio-capture":
          mensagemErro =
            "❌ Não foi possível acessar o microfone! Verifique se ele está conectado.";
          break;
        default:
          mensagemErro = `❌ Erro: ${event.error}. Tenta de novo, guria!`;
      }
      if (statusGravacao) {
        statusGravacao.innerHTML = `<i class="bi bi-exclamation-triangle-fill"></i> ${mensagemErro}`;
        statusGravacao.className = "alert alert-warning mb-3";
      }
      isListening = false;
      btnIniciarGravacao.innerHTML =
        '<i class="bi bi-mic-fill"></i> 🎤 Clique e Fale com o Robô';
    };

    recognition.onend = function () {
      if (isListening && statusGravacao) {
        statusGravacao.innerHTML =
          '<i class="bi bi-info-circle"></i> Clique no botão acima e permita o acesso ao microfone.';
        statusGravacao.className = "alert alert-secondary mb-3";
        btnIniciarGravacao.innerHTML =
          '<i class="bi bi-mic-fill"></i> 🎤 Clique e Fale com o Robô';
        isListening = false;
      }
    };

    btnIniciarGravacao.addEventListener("click", () => {
      if (isListening) {
        recognition.stop();
      } else {
        try {
          recognition.start();
        } catch (e) {
          console.error("Erro ao iniciar:", e);
          if (statusGravacao) {
            statusGravacao.innerHTML =
              '<i class="bi bi-exclamation-triangle-fill"></i> ❌ Erro ao iniciar o microfone. Tente novamente!';
            statusGravacao.className = "alert alert-warning mb-3";
          }
        }
      }
    });
  } else if (btnIniciarGravacao) {
    btnIniciarGravacao.disabled = true;
    btnIniciarGravacao.innerHTML =
      '<i class="bi bi-mic-mute-fill"></i> Microfone não suportado';
    if (statusGravacao) {
      statusGravacao.innerHTML =
        '<i class="bi bi-exclamation-triangle-fill"></i> ⚠️ Seu navegador não suporta reconhecimento de voz. Use a digitação manual!';
      statusGravacao.className = "alert alert-warning mb-3";
    }
  }

  const btnSimularFala = document.getElementById("btnSimularFala");
  const fraseUsuarioInput = document.getElementById("fraseUsuario");

  if (btnSimularFala) {
    btnSimularFala.addEventListener("click", () => {
      const frase = fraseUsuarioInput ? fraseUsuarioInput.value : "";
      if (frase.trim()) {
        atualizarResposta(frase);
        if (fraseUsuarioInput) fraseUsuarioInput.value = "";
      } else {
        atualizarResposta("");
      }
      btnSimularFala.innerHTML = '<i class="bi bi-check-lg"></i> Enviado!';
      setTimeout(() => {
        btnSimularFala.innerHTML = '<i class="bi bi-send-fill"></i> Enviar';
      }, 1500);
    });
  }

  if (fraseUsuarioInput) {
    fraseUsuarioInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const frase = fraseUsuarioInput.value;
        if (frase.trim()) {
          atualizarResposta(frase);
          fraseUsuarioInput.value = "";
        }
      }
    });
  }

  const botoesFrasePronta = document.querySelectorAll(".btn-frase-pronta");
  botoesFrasePronta.forEach((botao) => {
    botao.addEventListener("click", () => {
      const frase = botao.getAttribute("data-frase");
      if (frase) {
        if (fraseUsuarioInput) fraseUsuarioInput.value = frase;
        atualizarResposta(frase);
        if (fraseUsuarioInput) fraseUsuarioInput.value = "";
      }
    });
  });

  // ============================================================
  // 5. DOWNLOAD DO ARQUIVO .py (CORRIGIDO PARA CADA PÁGINA)
  // ============================================================

  function getCodigoPythonDaPagina() {
    const elementoCodigo = document.getElementById("codigoPythonCompleto");
    if (elementoCodigo) {
      return elementoCodigo.textContent;
    }
    return null;
  }

  function getNomeArquivoPorPagina() {
    const paginaAtualPath = window.location.pathname;
    if (paginaAtualPath.includes("aula_01.html")) {
      return "robo_fofoqueiro_setup.py";
    } else if (paginaAtualPath.includes("aula_02.html")) {
      return "robo_fofoqueiro_sensor_som.py";
    } else if (paginaAtualPath.includes("aula_03.html")) {
      return "robo_fofoqueiro_fala.py";
    }
    return "robo_fofoqueiro_codigo.py";
  }

  function downloadPythonScript() {
    const codigoPython = getCodigoPythonDaPagina();
    const nomeArquivo = getNomeArquivoPorPagina();

    if (!codigoPython) {
      console.error("Código Python não encontrado na página!");
      const msg = document.createElement("div");
      msg.className =
        "alert alert-danger alert-dismissible fade show position-fixed top-50 start-50 translate-middle z-3";
      msg.innerHTML = `
        <i class="bi bi-exclamation-triangle-fill fs-3 me-2"></i>
        <strong>❌ Erro ao baixar!</strong><br>
        Código Python não encontrado nesta página.
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      `;
      document.body.appendChild(msg);
      setTimeout(() => {
        if (msg.parentNode) msg.remove();
      }, 3000);
      return;
    }

    const blob = new Blob([codigoPython], { type: "text/x-python;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = nomeArquivo;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    const botoes = document.querySelectorAll("#btnDownloadPyLateral");
    botoes.forEach((btn) => {
      if (btn) {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="bi bi-check-lg"></i> Baixado! Vixi!';
        setTimeout(() => {
          btn.innerHTML = originalText;
        }, 2000);
      }
    });
  }

  const botoesDownload = document.querySelectorAll("#btnDownloadPyLateral");
  botoesDownload.forEach((btn) => {
    if (btn) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        downloadPythonScript();
      });
    }
  });

  // ============================================================
  // 6. CHECKLIST INTERATIVO
  // ============================================================
  const progressBar = document.getElementById("progressChecklist");
  const botaoSimular = document.getElementById("simularProgresso");

  function atualizarProgresso() {
    const itens = document.querySelectorAll(".checklist-personalizado li");
    let marcados = 0;
    itens.forEach((item) => {
      const icone = item.querySelector("i");
      if (icone && icone.classList.contains("bi-check-square-fill")) {
        marcados++;
      }
    });
    const percentual = (marcados / itens.length) * 100;
    if (progressBar) {
      progressBar.style.width = percentual + "%";
    }
    if (percentual === 100) {
      if (!document.querySelector(".toast-sucesso-checklist")) {
        const msg = document.createElement("div");
        msg.className = "alert alert-success mt-3 toast-sucesso-checklist";
        msg.innerHTML =
          '<i class="bi bi-trophy-fill"></i> 🎉 PARABÉNS! Checklist completo!';
        const container = document.querySelector(
          "#conteudoChecklist .card-body",
        );
        if (container) container.appendChild(msg);
        setTimeout(() => msg.remove(), 4000);
      }
    }
  }

  function marcarChecklist(completo = true) {
    const itens = document.querySelectorAll(".checklist-personalizado li");
    itens.forEach((item) => {
      const icone = item.querySelector("i");
      if (icone) {
        icone.className = completo
          ? "bi bi-check-square-fill text-success"
          : "bi bi-square";
      }
    });
    atualizarProgresso();
  }

  const itensChecklist = document.querySelectorAll(
    ".checklist-personalizado li",
  );
  itensChecklist.forEach((item) => {
    item.style.cursor = "pointer";
    item.addEventListener("click", () => {
      const icone = item.querySelector("i");
      if (icone.classList.contains("bi-square")) {
        icone.className = "bi bi-check-square-fill text-success";
      } else {
        icone.className = "bi bi-square";
      }
      atualizarProgresso();
    });
  });

  if (botaoSimular) {
    botaoSimular.addEventListener("click", () => {
      marcarChecklist(true);
      botaoSimular.style.transform = "scale(0.95)";
      setTimeout(() => {
        botaoSimular.style.transform = "";
      }, 150);
    });
  }

  if (document.querySelector(".checklist-personalizado")) {
    marcarChecklist(false);
  }

  // ============================================================
  // 7. CHAMADA INTERATIVA
  // ============================================================
  const botaoChamada = document.getElementById("simularChamada");
  if (botaoChamada) {
    botaoChamada.addEventListener("click", () => {
      const alunosPresentes = [
        "Ana 🧠",
        "Lucas 🤖",
        "Mariana 🎤",
        "Carlos 📁",
        "Julia ✨",
        "Rafael 👨‍💻",
        "Beatriz ♿",
        "Gabriel 🗣️",
        "Letícia 🤟",
      ];
      alert(
        `📢 CHAMADA - AULA 3 (RECONHECIMENTO DE FALA):\nPresentes: ${alunosPresentes.join(", ")}\n✅ Total: ${alunosPresentes.length} alunos`,
      );
      botaoChamada.innerHTML =
        '<i class="bi bi-check-circle"></i> Chamada registrada!';
      setTimeout(() => {
        botaoChamada.innerHTML = '<i class="bi bi-mic"></i> Chamada interativa';
      }, 2000);
    });
  }

  // ============================================================
  // 8. EXPORTAR DICAS (ESPECÍFICAS PARA CADA AULA)
  // ============================================================
  const btnExportarDicas = document.getElementById("btnExportarDicas");
  if (btnExportarDicas) {
    btnExportarDicas.addEventListener("click", () => {
      // Detectar qual página estamos para gerar dicas específicas
      const paginaAtualPath = window.location.pathname;
      let dicasTexto = "";

      if (paginaAtualPath.includes("aula_01.html")) {
        dicasTexto = `DICAS DO PROFESSOR - AULA 1: SETUP DO AMBIENTE NO GOOGLE COLAB

📌 DICA 1: Comece apresentando o Google Colab como "um notebook mágico que roda Python no navegador"
📌 DICA 2: Use a analogia "Robô fofoqueiro precisa de maleta (pastas) e ferramentas (bibliotecas)"
📌 DICA 3: Mostre como criar um novo notebook e explicar cada célula de código
📌 DICA 4: Para alunos com dificuldade, disponibilize código pré-escrito para copiar/colar
📌 DICA 5: Incentive comentários com linguagem coloquial (vixi, bagulho doido, ó o trem)
📌 DICA 6: Peça que os alunos salvem o notebook no Google Drive para não perder o progresso
📌 DICA 7: Faça um "checklist coletivo" no quadro com ✅ e ❌ para cada etapa
📌 DICA 8: Para alunos com dificuldade motora, sugira teclado virtual ou extensão Colab Voice
📌 DICA 9: Organize duplas de apoio para alunos que precisarem de ajuda extra
📌 DICA 10: Comemore o sucesso com um "🎉 VIXI, DEU CERTO" coletivo!

🎯 BNCC TRABALHADAS: EM13MAT405, EM13CNT101
⏱️ TEMPO SUGERIDO: 50 minutos
📦 MATERIAIS: Chromebooks, contas Google, projetor`;
      } else if (paginaAtualPath.includes("aula_02.html")) {
        dicasTexto = `DICAS DO PROFESSOR - AULA 2: SENSOR DE SOM IRREVERENTE

📌 DICA 1: Comece com o desafio "Quanto barulho tem na nossa sala?" - estimativa coletiva
📌 DICA 2: Explique decibéis (dB) usando exemplos do cotidiano (sussurro = 20dB, conversa = 60dB, grito = 90dB)
📌 DICA 3: Mostre como o computador "escuta" através de amostragem PCM (Pulse Code Modulation)
📌 DICA 4: Durante a codificação, circule pela sala ajudando duplas com dificuldades
📌 DICA 5: Organize estações de teste: sussurro, conversa normal, palmas, grito
📌 DICA 6: Use uma caixa de som para gerar barulho controlado nos testes
📌 DICA 7: Incentive os alunos a criarem seus próprios memes para cada faixa de decibel
📌 DICA 8: Para alunos com deficiência auditiva, foque na parte visual do gráfico e vibração
📌 DICA 9: No fechamento, debata "O robô reagiu certo?" e compare com sensores reais
📌 DICA 10: Salve os gráficos gerados para compor o portfólio do projeto

🎯 BNCC TRABALHADAS: EM13CNT104, EM13MAT503, EM13LGG702
⏱️ TEMPO SUGERIDO: 100 minutos (2 aulas)
📦 MATERIAIS: Notebook Colab, microfones, caixa de som`;
      } else if (paginaAtualPath.includes("aula_03.html")) {
        dicasTexto = `DICAS DO PROFESSOR - AULA 3: RECONHECIMENTO DE FALA COM PERSONALIDADE REGIONAL

📌 DICA 1: Comece com vídeo curto sobre assistentes virtuais (Alexa, Siri, Google Assistente)
📌 DICA 2: Faça um "aulão de gírias paranaenses" com contribuição espontânea dos alunos
📌 DICA 3: Explique Speech-to-Text como "um tradutor que transforma fofoca em texto"
📌 DICA 4: Para alunos com fala reduzida, disponibilize o modo de digitação manual
📌 DICA 5: Promova um "Torneio de fofoca controlada" para testar o robô em duplas
📌 DICA 6: Debata ética e privacidade: "O robô pode guardar o que ouviu? Isso é fofoca ou dado?"
📌 DICA 7: Incentive os alunos a adicionarem novas gírias e respostas personalizadas
📌 DICA 8: Use o modo Libras textual para incluir alunos com deficiência auditiva
📌 DICA 9: No Colab, recomende usar o modo simulado se o microfone não funcionar
📌 DICA 10: Finalize com uma "roda de fofoca ética" sobre acessibilidade digital

🎯 BNCC TRABALHADAS: EM13LGG101, EM13LGG304, EM13LP16
⏱️ TEMPO SUGERIDO: 100 minutos (2 aulas)
📦 MATERIAIS: Chromebooks, microfones, projetor, caixa de som`;
      } else if (paginaAtualPath.includes("aula_04.html")) {
        dicasTexto = `DICAS DO PROFESSOR - AULA 4: VISÃO COMPUTACIONAL (EM BREVE)

📌 DICA 1: Esta aula está em desenvolvimento e será disponibilizada em breve!
📌 DICA 2: Os conteúdos previstos incluem: OpenCV, detecção de rostos e objetos
📌 DICA 3: BNCC previstas: EM13CNT101, EM13MAT405, EM13LGG702
📌 DICA 4: Fique atento às atualizações do projeto Robô Fofoqueiro`;
      } else {
        // Página inicial ou outra
        dicasTexto = `DICAS GERAIS DO PROJETO ROBÔ FOFOQUEIRO

📌 DICA GERAL 1: Mantenha um ritmo leve e divertido - o humor paranaense é parte do projeto!
📌 DICA GERAL 2: Use as analogias do "Robô Fofoqueiro" para explicar conceitos técnicos
📌 DICA GERAL 3: Incentive a colaboração entre pares - programação é trabalho em equipe
📌 DICA GERAL 4: Documente tudo - os alunos vão adorar ver a evolução do projeto
📌 DICA GERAL 5: Adapte as atividades conforme a necessidade da sua turma
📌 DICA GERAL 6: Comemore cada pequena vitória - "VIXI, DEU CERTO!" é nosso mantra
📌 DICA GERAL 7: Conecte o projeto com situações reais de acessibilidade na escola
📌 DICA GERAL 8: Use os checklists interativos para autoavaliação dos alunos

📚 ESTRUTURA DO PROJETO:
- Aula 1: Setup do ambiente no Google Colab
- Aula 2: Sensor de som irreverente (medindo decibéis)
- Aula 3: Reconhecimento de fala com personalidade regional
- Aula 4: Visão computacional (em breve)

🎯 BNCC PRINCIPAIS: EM13LGG101, EM13LGG304, EM13LP16, EM13MAT405, EM13MAT503, EM13CNT101, EM13CNT104

👥 Equipe: Estudantes sob orientação da Tutora Gisele Nunes
🐘 Desenvolvido com 💙 para a acessibilidade!`;
      }

      const blob = new Blob([dicasTexto], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;

      // Nome do arquivo baseado na página
      if (paginaAtualPath.includes("aula_01.html")) {
        a.download = "dicas_professor_aula1_setup.txt";
      } else if (paginaAtualPath.includes("aula_02.html")) {
        a.download = "dicas_professor_aula2_sensor_som.txt";
      } else if (paginaAtualPath.includes("aula_03.html")) {
        a.download = "dicas_professor_aula3_reconhecimento_fala.txt";
      } else {
        a.download = "dicas_professor_robo_fofoqueiro.txt";
      }

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      btnExportarDicas.innerHTML =
        '<i class="bi bi-check-lg"></i> Dicas exportadas!';
      setTimeout(() => {
        btnExportarDicas.innerHTML =
          '<i class="bi bi-download"></i> Exportar dicas';
      }, 2000);
    });
  }

  // ============================================================
  // 9. EXPORTAR PROJETO (para página inicial)
  // ============================================================
  const btnExportarProjeto = document.getElementById("btnExportarProjeto");
  if (btnExportarProjeto) {
    btnExportarProjeto.addEventListener("click", () => {
      const infoProjeto = `PROJETO ROBÔ FOFOQUEIRO - I.A. QUE PARLA

📋 RESUMO DO PROJETO:
- Nome: I.A. QUE PARLA – O Robô Fofoqueiro da Acessibilidade
- Objetivo: Criar assistente robótico para acessibilidade
- Tecnologias: Python, Google Colab, IA, OpenCV
- Duração: 15+ aulas
- Público: Ensino Médio - Escolas Públicas do Paraná

📚 MÓDULOS DO PROJETO:
1. Setup do ambiente (Colab)
2. Sensor de som irreverente
3. Reconhecimento de fala
4. Visão computacional
5. IA generativa com personalidade
6. Display e LEDs
7. Mapa do Inferno Acústico
8. Protótipo completo
9. Manifesto e vídeo
10. Versão offline

🎯 BNCC: EM13LGG101, EM13LGG304, EM13LP16, EM13MAT405, EM13MAT503, EM13CNT101, EM13CNT104

👥 Equipe: Estudantes de Programação sob orientação da Tutora Gisele Nunes

🐘 Desenvolvido com 💙 para a acessibilidade!`;

      const blob = new Blob([infoProjeto], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "resumo_projeto_robo_fofoqueiro.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      btnExportarProjeto.innerHTML =
        '<i class="bi bi-check-lg"></i> Exportado!';
      setTimeout(() => {
        btnExportarProjeto.innerHTML =
          '<i class="bi bi-file-earmark-text-fill"></i> Exportar resumo';
      }, 2000);
    });
  }

  // ============================================================
  // 10. MENSAGENS DE BOAS-VINDAS
  // ============================================================
  const paginaAtualNome = window.location.pathname;

  if (paginaAtualNome.includes("aula_03.html")) {
    const jaVisitouAula3 = sessionStorage.getItem("visitouRoboFofoqueiroAula3");
    if (!jaVisitouAula3 && document.querySelector(".simulador-fala")) {
      setTimeout(() => {
        const boasVindas = document.createElement("div");
        boasVindas.className =
          "alert alert-warning alert-dismissible fade show position-fixed bottom-0 end-0 m-3";
        boasVindas.style.zIndex = "9999";
        boasVindas.innerHTML = `
          <i class="bi bi-mic fs-3 me-2 float-start"></i>
          <strong>🎤 AULA 3 - RECONHECIMENTO DE FALA!</strong><br>
          Clique no microfone e fale com o robô!<br>
          <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(boasVindas);
        setTimeout(() => {
          if (boasVindas.parentNode) boasVindas.remove();
        }, 8000);
      }, 1000);
      sessionStorage.setItem("visitouRoboFofoqueiroAula3", "true");
    }
  }

  if (
    paginaAtualNome.includes("index.html") ||
    paginaAtualNome === "/" ||
    paginaAtualNome.endsWith("/")
  ) {
    const jaVisitouIndex = sessionStorage.getItem("visitouRoboIndex");
    if (!jaVisitouIndex) {
      setTimeout(() => {
        const boasVindas = document.createElement("div");
        boasVindas.className =
          "alert alert-success alert-dismissible fade show position-fixed bottom-0 end-0 m-3";
        boasVindas.style.zIndex = "9999";
        boasVindas.style.maxWidth = "350px";
        boasVindas.innerHTML = `
          <i class="bi bi-robot fs-3 me-2 float-start"></i>
          <strong>🤖 VIXI, BEM-VINDO, PIÁ!</strong><br>
          Este é o Robô Fofoqueiro da Acessibilidade.<br>
          Clique nas abas para conhecer o projeto!<br>
          <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(boasVindas);
        setTimeout(() => {
          if (boasVindas.parentNode) boasVindas.remove();
        }, 8000);
      }, 1000);
      sessionStorage.setItem("visitouRoboIndex", "true");
    }
  }

  console.log(
    "%c🤖 ROBÔ FOFOQUEIRO CARREGADO! Use as abas para navegar.",
    "color: #2980b9; font-size: 14px; font-weight: bold;",
  );
});

// ============================================================
// 11. FUNÇÕES GLOBAIS PARA NAVEGAÇÃO
// ============================================================

function navegarAbaIndex(abaId) {
  const botao = document.querySelector(
    `.lateral-link[data-lateral-aba="${abaId}"]`,
  );
  if (botao) {
    botao.click();
    const conteudo = document.querySelector(".conteudo-principal");
    if (conteudo) {
      conteudo.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}

function exportarInfoProjeto() {
  const info = `PROJETO ROBÔ FOFOQUEIRO - I.A. QUE PARLA

📋 RESUMO DO PROJETO:
- Nome: I.A. QUE PARLA – O Robô Fofoqueiro da Acessibilidade
- Objetivo: Criar assistente robótico para acessibilidade
- Tecnologias: Python, Google Colab, IA, OpenCV
- Duração: 15+ aulas
- Público: Ensino Médio - Escolas Públicas do Paraná

📚 MÓDULOS DO PROJETO:
1. Setup do ambiente (Colab)
2. Sensor de som irreverente
3. Reconhecimento de fala
4. Visão computacional
5. IA generativa com personalidade
6. Display e LEDs
7. Mapa do Inferno Acústico
8. Protótipo completo
9. Manifesto e vídeo
10. Versão offline

🎯 BNCC: EM13LGG101, EM13LGG304, EM13LP16, EM13MAT405, EM13MAT503, EM13CNT101, EM13CNT104

👥 Equipe: Estudantes de Programação sob orientação da Tutora Gisele Nunes

🐘 Desenvolvido com 💙 para a acessibilidade!`;

  const blob = new Blob([info], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "resumo_projeto_robo_fofoqueiro.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

document.addEventListener("keydown", function (e) {
  if (e.ctrlKey && e.key === "e") {
    e.preventDefault();
    exportarInfoProjeto();
    console.log(
      "%c📁 Projeto exportado via atalho Ctrl+E!",
      "color: #27ae60; font-size: 12px;",
    );
  }
});
