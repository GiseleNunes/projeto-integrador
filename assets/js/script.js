// script.js - Robô Fofoqueiro | Versão Refatorada
// Melhorias: organização, acessibilidade, performance, robustez

(function () {
  "use strict";

  // ============================================================
  // 0. CONFIGURAÇÕES GLOBAIS E UTILITÁRIOS
  // ============================================================

  // Cache de elementos DOM
  const DOM = {
    botoesProjeto: null,
    botoesLateral: null,
    progressBar: null,
    botaoSimular: null,
  };

  // Rotas do projeto - ATUALIZADAS para navegação correta
  const ROTAS = {
    aula1: "aula_01.html",
    aula2: "aula_02.html",
    aula3: "aula_03.html",
    aula4: "aula_04.html",
    aula5: "aula_05.html",
    aula6: "aula_06.html",
    aula7: "aula_07.html",
    aula8: "aula_08.html",
    aula9: "aula_09.html",
    aula10: "aula_10.html",
    aula11: "material_complementar.html",
    laboratorio: "laboratorio.html",
    inicio: "../index.html",
  };

  // Dicionário de dicas por página
  const DICAS_POR_PAGINA = {
    aula_01: {
      arquivo: "dicas_professor_aula1_setup.txt",
      conteudo: `DICAS DO PROFESSOR - AULA 1: SETUP DO AMBIENTE NO GOOGLE COLAB

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
📦 MATERIAIS: Chromebooks, contas Google, projetor`,
    },
    aula_02: {
      arquivo: "dicas_professor_aula2_sensor_som.txt",
      conteudo: `DICAS DO PROFESSOR - AULA 2: SENSOR DE SOM IRREVERENTE

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
📦 MATERIAIS: Notebook Colab, microfones, caixa de som`,
    },
    aula_03: {
      arquivo: "dicas_professor_aula3_reconhecimento_fala.txt",
      conteudo: `DICAS DO PROFESSOR - AULA 3: RECONHECIMENTO DE FALA COM PERSONALIDADE REGIONAL

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
📦 MATERIAIS: Chromebooks, microfones, projetor, caixa de som`,
    },
    aula_04: {
      arquivo: "dicas_professor_aula4_visao_computacional.txt",
      conteudo: `DICAS DO PROFESSOR - AULA 4: VISÃO COMPUTACIONAL COM MÃOS E QR CODE

📌 DICA 1: Comece mostrando exemplos de visão computacional do dia a dia (filtros do Instagram, Snapchat, Google Lens)
📌 DICA 2: Explique os pontos de referência da mão (landmarks) como "os 21 pontos que o robô aprendeu a vigiar"
📌 DICA 3: Demonstre a diferença entre mão direita e esquerda na contagem de dedos
📌 DICA 4: Use QR codes impressos para teste - alunos adoram escanear com o celular
📌 DICA 5: Para alunos sem webcam, use o modo simulado com imagens estáticas
📌 DICA 6: Incentive a criação de QR codes personalizados com frases engraçadas
📌 DICA 7: Debata aplicações reais: leitura de QR code em cardápios, catracas de metrô, etc.
📌 DICA 8: Mostre como a detecção de mãos pode ajudar em interfaces sem toque (acessibilidade)
📌 DICA 9: Organize um "Caça ao QR Code" pela escola usando o robô
📌 DICA 10: Finalize com a pergunta: "Como a visão computacional pode ajudar pessoas com deficiência?"

🎯 BNCC TRABALHADAS: EM13CNT101, EM13CNT303
⏱️ TEMPO SUGERIDO: 100 minutos (2 aulas)
📦 MATERIAIS: Chromebooks com webcam, QR codes impressos, celulares para teste`,
    },
    aula_05: {
      arquivo: "dicas_professor_aula5_ia_generativa.txt",
      conteudo: `DICAS DO PROFESSOR - AULA 5: IA GENERATIVA COM SOTAQUE PARANAENSE

📌 DICA 1: Comece com debate: "O que é inteligência artificial? O robô é realmente inteligente?"
📌 DICA 2: Explique LLMs de forma lúdica: "é um completador de frases muito bom"
📌 DICA 3: Mostre como obter chave da API Gemini gratuitamente (Google AI Studio)
📌 DICA 4: Para escolas sem internet, use o fallback offline com respostas pré-programadas
📌 DICA 5: Incentive os alunos a criarem novas gírias para o dicionário
📌 DICA 6: Promova um debate ético sobre privacidade e armazenamento de conversas
📌 DICA 7: Mostre como o histórico JSON pode ser usado para análise de dados
📌 DICA 8: Para alunos avançados: ajuste de parâmetros da IA (temperatura, top_p)
📌 DICA 9: Compare respostas do modo offline vs modo IA - qual é mais "criativa"?
📌 DICA 10: Finalize com a pergunta: "A IA pode ter personalidade ou é só programação?"

🎯 BNCC TRABALHADAS: EM13LGG702, EM13CNT102
⏱️ TEMPO SUGERIDO: 100 minutos (2 aulas)
📦 MATERIAIS: Chromebooks, chave de API Gemini (gratuita), internet`,
    },
    aula_06: {
      arquivo: "dicas_professor_aula6_display_leds.txt",
      conteudo: `DICAS DO PROFESSOR - AULA 6: DISPLAY LCD E LEDs

📌 DICA 1: Comece mostrando vídeos de protótipos assistivos (semáforo sonoro para surdos)
📌 DICA 2: Explique display LCD 16x2 como "uma telinha que mostra mensagens do robô"
📌 DICA 3: Mostre LEDs RGB e PWM como "o robô aprendendo a fazer cores misturadas"
📌 DICA 4: Para simulação sem hardware, use o ASCII art e emojis no terminal
📌 DICA 5: Se tiver Arduino, monte o circuito com sensor de som + LEDs + display
📌 DICA 6: Teste integração: barulho alto → LED vermelho pisca + mensagem no display
📌 DICA 7: Debata acessibilidade: como esse sistema ajuda pessoas com deficiência auditiva?
📌 DICA 8: Incentive os alunos a criar alertas visuais personalizados
📌 DICA 9: Use o Tinkercad como alternativa se não tiver hardware físico
📌 DICA 10: Finalize com debate sobre prototipagem assistiva na escola

🎯 BNCC TRABALHADAS: EM13CNT101, EM13CNT206
⏱️ TEMPO SUGERIDO: 100 minutos (2 aulas)
📦 MATERIAIS: Notebook Colab, Arduino/ESP32 (opcional), LEDs RGB, display LCD 16x2 I2C, sensor KY-038`,
    },
    aula_07: {
      arquivo: "dicas_professor_aula7_mapa_inferno.txt",
      conteudo: `DICAS DO PROFESSOR - AULA 7: MAPA DO INFERNO ACÚSTICO

📌 DICA 1: Comece mostrando exemplos de heatmap (mapa de calor) - "como a ciência enxerga o barulho"
📌 DICA 2: Explique pandas como "uma planilha mágica que o Python entende"
📌 DICA 3: Mostre matplotlib e seaborn como "pincéis para desenhar gráficos"
📌 DICA 4: Para alunos com dificuldade, forneça template pronto do código
📌 DICA 5: Incentive a criação de hipóteses antes de gerar os gráficos
📌 DICA 6: Use dados reais da escola se possível (coletados na Aula 2)
📌 DICA 7: Debata: "Por que o intervalo é tão barulhento? O que fazer?"
📌 DICA 8: Para alunos com daltonismo, use padrões de hachura além de cores
📌 DICA 9: Mostre como exportar os gráficos para o portfólio do projeto
📌 DICA 10: Finalize com a pergunta: "Como os dados podem tornar a escola mais acessível?"

🎯 BNCC TRABALHADAS: EM13MAT405, EM13CNT303
⏱️ TEMPO SUGERIDO: 50 minutos (1 aula)
📦 MATERIAIS: Notebook Colab, arquivo CSV com medições (log_fofoqueiro.csv)`,
    },
    aula_08: {
      arquivo: "dicas_professor_aula8_prototipo_completo.txt",
      conteudo: `DICAS DO PROFESSOR - AULA 8: PROTÓTIPO COMPLETO INTEGRADO

📌 DICA 1: Comece revisando todos os módulos já construídos — "montar o quebra-cabeça"
📌 DICA 2: Organize grupos e defina responsabilidades para cada módulo na integração
📌 DICA 3: Mostre como construir o programa principal com menu (opções 1-9) e modo automático
📌 DICA 4: Incentive os grupos a testarem cada módulo individualmente antes de integrar
📌 DICA 5: Para o modo automático, simule um ciclo completo: som → display → fala → visão → mapa
📌 DICA 6: Debata sobre versionamento: como garantir que as alterações de um grupo não quebrem o outro?
📌 DICA 7: Peça que cada grupo gere o README do projeto com as funcionalidades implementadas
📌 DICA 8: Organize uma "feira de robôs" onde cada grupo apresenta seu protótipo
📌 DICA 9: Para alunos avançados: adicionar salvamento de logs em JSON e exportação de dados
📌 DICA 10: Finalize com autoavaliação e discussão sobre o que aprenderam no projeto todo

🎯 BNCC TRABALHADAS: EM13CNT104, EM13MAT503
⏱️ TEMPO SUGERIDO: 150 minutos (3 aulas)
📦 MATERIAIS: Notebook Colab, todos os códigos dos módulos prontos, microfone, webcam`,
    },
    aula_09: {
      arquivo: "dicas_professor_aula9_manifesto_video.txt",
      conteudo: `DICAS DO PROFESSOR - AULA 9: ROTEIRO PARA MANIFESTO E VÍDEO

📌 DICA 1: Comece mostrando exemplos de divulgação científica (Nerdologia, Manual do Mundo)
📌 DICA 2: Explique a importância do roteiro: "é o mapa que guia o vídeo, piá!"
📌 DICA 3: Distribua o template de roteiro para cada grupo (Cenas 1 a 5)
📌 DICA 4: Incentive os grupos a personalizarem as falas com gírias paranaenses
📌 DICA 5: Durante a gravação, circule ajudando com iluminação e enquadramento
📌 DICA 6: Para alunos sem celular, grave áudio e use imagens de arquivo
📌 DICA 7: Reforce a importância das legendas acessíveis para surdos
📌 DICA 8: Use ferramentas gratuitas como CapCut ou KineMaster para edição
📌 DICA 9: Organize uma "mostra de vídeos" com debate sobre acessibilidade
📌 DICA 10: Finalize com a pergunta: "Qual vídeo convence mais sobre acessibilidade?"

🎯 BNCC TRABALHADAS: EM13LGG101, EM13LGG701, EM13LP16
⏱️ TEMPO SUGERIDO: 100 minutos (2 aulas) + aula extra para edição
📦 MATERIAIS: Celulares, computador com o programa do Robô Fofoqueiro, CapCut/KineMaster`,
    },
    aula_10: {
      arquivo: "dicas_professor_aula10_offline.txt",
      conteudo: `DICAS DO PROFESSOR - AULA 10: VERSÃO OFFLINE COMPLETA

📌 DICA 1: Comece com discussão: "O que fazer quando a escola não tem internet?" — mapear soluções
📌 DICA 2: Explique Vosk (STT offline) como "um tradutor que não precisa da nuvem"
📌 DICA 3: Mostre Markov como "um gerador de texto que aprende padrões e imita"
📌 DICA 4: Demonstre PyInstaller: "transforma código em executável que roda em qualquer PC"
📌 DICA 5: Se o download do modelo Vosk for pesado, forneça pendrive com os arquivos
📌 DICA 6: Para Chromebooks sem microfone, use o modo texto puro (input)
📌 DICA 7: Teste o script testa_tudo.py em grupos diferentes para validar
📌 DICA 8: Incentive os alunos a personalizarem o corpus Markov com gírias locais
📌 DICA 9: Debata exclusão digital: "Por que é importante ter soluções offline?"
📌 DICA 10: Finalize com a pergunta: "Como podemos levar o Robô Fofoqueiro para escolas sem internet?"

🎯 BNCC TRABALHADAS: EM13CNT102, EM13MAT503
⏱️ TEMPO SUGERIDO: 100 minutos (2 aulas)
📦 MATERIAIS: Notebook Colab, modelo Vosk (pendrive), PyInstaller`,
    },
    aula_11: {
      arquivo: "dicas_professor_material_complementar.txt",
      conteudo: `DICAS DO PROFESSOR - MATERIAL COMPLEMENTAR

📌 DICA 1: Use a tabela BNCC x RCP para justificar o projeto na proposta pedagógica
📌 DICA 2: Compartilhe a matriz de avaliação com os alunos antes do início do projeto
📌 DICA 3: Utilize o checklist de conclusão como instrumento de autoavaliação
📌 DICA 4: Os materiais podem ser impressos ou enviados digitalmente para os alunos
📌 DICA 5: A tabela de conversão de notas ajuda a dar transparência ao processo avaliativo

🎯 BNCC TRABALHADAS: Todas as competências do projeto
⏱️ TEMPO SUGERIDO: Material de apoio - sem tempo específico
📦 MATERIAIS: Impressões ou arquivos digitais`,
    },
  };

  // ============================================================
  // 1. FUNÇÕES UTILITÁRIAS
  // ============================================================

  function exibirMensagemRobo(
    tipo,
    mensagem,
    duracao = 3000,
    elementoFoco = null,
  ) {
    const tiposValidos = {
      success: { bg: "success", icone: "bi-check-circle-fill" },
      error: { bg: "danger", icone: "bi-exclamation-triangle-fill" },
      info: { bg: "info", icone: "bi-info-circle-fill" },
      warning: { bg: "warning", icone: "bi-exclamation-triangle-fill" },
    };

    const config = tiposValidos[tipo] || tiposValidos.info;
    const msg = document.createElement("div");
    msg.className = `alert alert-${config.bg} alert-dismissible fade show position-fixed top-50 start-50 translate-middle z-3 alert-robot-floating`;
    msg.setAttribute("role", "alert");
    msg.setAttribute("aria-live", "polite");
    msg.style.minWidth = "300px";
    msg.style.zIndex = "9999";
    msg.innerHTML = `<i class="bi ${config.icone} fs-3 me-2"></i><strong>🤖 Robô Fofoqueiro diz:</strong><br>${mensagem}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar mensagem"></button>`;
    document.body.appendChild(msg);
    const closeBtn = msg.querySelector(".btn-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        if (elementoFoco && document.body.contains(elementoFoco))
          elementoFoco.focus();
      });
    }
    setTimeout(() => {
      if (msg.parentNode) {
        if (elementoFoco && document.body.contains(elementoFoco))
          elementoFoco.focus();
        msg.remove();
      }
    }, duracao);
    return msg;
  }

  function animarElemento(elemento, animacao, duracao = 300) {
    if (!elemento) return;
    elemento.classList.add(animacao);
    setTimeout(() => elemento.classList.remove(animacao), duracao);
  }

  function alternarTextoBotao(botao, textoOriginal, textoNovo, duracao = 2000) {
    if (!botao) return;
    botao.innerHTML = textoNovo;
    setTimeout(() => {
      if (botao) botao.innerHTML = textoOriginal;
    }, duracao);
  }

  function obterPaginaAtual() {
    const path = window.location.pathname;
    if (path.includes("aula_01.html")) return "aula_01";
    if (path.includes("aula_02.html")) return "aula_02";
    if (path.includes("aula_03.html")) return "aula_03";
    if (path.includes("aula_04.html")) return "aula_04";
    if (path.includes("aula_05.html")) return "aula_05";
    if (path.includes("aula_06.html")) return "aula_06";
    if (path.includes("aula_07.html")) return "aula_07";
    if (path.includes("aula_08.html")) return "aula_08";
    if (path.includes("aula_09.html")) return "aula_09";
    if (path.includes("aula_10.html")) return "aula_10";
    if (path.includes("material_complementar.html")) return "aula_11";
    return "index";
  }

  function downloadArquivo(conteudo, nomeArquivo) {
    const blob = new Blob([conteudo], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = nomeArquivo;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // ============================================================
  // 2. SISTEMA DE ABAS DO PROJETO PRINCIPAL
  // ============================================================

  function ativarProjetoAba(abaId, botaoClicado) {
    if (ROTAS[abaId]) {
      window.location.href = ROTAS[abaId];
    } else if (abaId === "sobre") {
      exibirMensagemRobo(
        "info",
        "Sobre o projeto: 10 aulas sobre acessibilidade com Python, IA e muito humor paranaense!",
        3000,
        botaoClicado,
      );
    } else {
      exibirMensagemRobo(
        "warning",
        "Vixi, essa aula ainda tá em desenvolvimento! Bora terminar as anteriores primeiro, meu consagrado!",
        3000,
        botaoClicado,
      );
    }
  }

  function inicializarAbasProjeto() {
    DOM.botoesProjeto = document.querySelectorAll("[data-projeto-aba]");
    DOM.botoesProjeto.forEach((botao) => {
      botao.addEventListener("click", (e) => {
        e.preventDefault();
        const projetoAbaId = botao.getAttribute("data-projeto-aba");
        DOM.botoesProjeto.forEach((btn) =>
          btn.classList.remove("active-projeto"),
        );
        botao.classList.add("active-projeto");
        ativarProjetoAba(projetoAbaId, botao);
      });
    });
  }

  // ============================================================
  // 3. SISTEMA DE ABAS LATERAIS
  // ============================================================

  function getAbasLateraisPorPagina(paginaAtual) {
    const abasMap = {
      aula_01: {
        setup: document.getElementById("conteudoSetup"),
        codigo: document.getElementById("conteudoCodigo"),
        checklist: document.getElementById("conteudoChecklist"),
        professor: document.getElementById("conteudoProfessor"),
      },
      aula_02: {
        conceitos: document.getElementById("conteudoConceitos"),
        codigo: document.getElementById("conteudoCodigo"),
        checklist: document.getElementById("conteudoChecklist"),
        professor: document.getElementById("conteudoProfessor"),
      },
      aula_03: {
        conceitos: document.getElementById("conteudoConceitos"),
        codigo: document.getElementById("conteudoCodigo"),
        checklist: document.getElementById("conteudoChecklist"),
        professor: document.getElementById("conteudoProfessor"),
        setup: document.getElementById("conteudoSetup"),
      },
      aula_04: {
        conceitos: document.getElementById("conteudoConceitos"),
        codigo: document.getElementById("conteudoCodigo"),
        checklist: document.getElementById("conteudoChecklist"),
        professor: document.getElementById("conteudoProfessor"),
        simulador: document.getElementById("conteudoSimulador"),
      },
      aula_05: {
        conceitos: document.getElementById("conteudoConceitos"),
        codigo: document.getElementById("conteudoCodigo"),
        checklist: document.getElementById("conteudoChecklist"),
        professor: document.getElementById("conteudoProfessor"),
        simulador: document.getElementById("conteudoSimulador"),
      },
      aula_06: {
        conceitos: document.getElementById("conteudoConceitos"),
        codigo: document.getElementById("conteudoCodigo"),
        checklist: document.getElementById("conteudoChecklist"),
        professor: document.getElementById("conteudoProfessor"),
        simulador: document.getElementById("conteudoSimulador"),
      },
      aula_07: {
        conceitos: document.getElementById("conteudoConceitos"),
        codigo: document.getElementById("conteudoCodigo"),
        checklist: document.getElementById("conteudoChecklist"),
        professor: document.getElementById("conteudoProfessor"),
        simulador: document.getElementById("conteudoSimulador"),
      },
      aula_08: {
        conceitos: document.getElementById("conteudoConceitos"),
        codigo: document.getElementById("conteudoCodigo"),
        checklist: document.getElementById("conteudoChecklist"),
        professor: document.getElementById("conteudoProfessor"),
        simulador: document.getElementById("conteudoSimulador"),
      },
      aula_09: {
        conceitos: document.getElementById("conteudoConceitos"),
        roteiro: document.getElementById("conteudoRoteiro"),
        manifesto: document.getElementById("conteudoManifesto"),
        checklist: document.getElementById("conteudoChecklist"),
        professor: document.getElementById("conteudoProfessor"),
        simulador: document.getElementById("conteudoSimulador"),
      },
      aula_10: {
        conceitos: document.getElementById("conteudoConceitos"),
        codigo: document.getElementById("conteudoCodigo"),
        checklist: document.getElementById("conteudoChecklist"),
        professor: document.getElementById("conteudoProfessor"),
        simulador: document.getElementById("conteudoSimulador"),
      },
      aula_11: {
        bncc_rcp: document.getElementById("conteudoBnccRcp"),
        avaliacao: document.getElementById("conteudoAvaliacao"),
        checklist: document.getElementById("conteudoChecklist"),
        professor: document.getElementById("conteudoProfessor"),
        downloads: document.getElementById("conteudoDownloads"),
      },
      index: {
        apresentacao: document.getElementById("conteudoApresentacao"),
        jornada: document.getElementById("conteudoJornada"),
        equipe: document.getElementById("conteudoEquipe"),
        bncc: document.getElementById("conteudoBncc"),
      },
    };
    return abasMap[paginaAtual] || abasMap.aula_11;
  }

  function ativarAbaLateral(abaId, abasLaterais, botoesLateral) {
    Object.values(abasLaterais).forEach((aba) => {
      if (aba) aba.classList.remove("active-lateral-aba");
    });
    if (abasLaterais[abaId]) {
      abasLaterais[abaId].classList.add("active-lateral-aba");
    } else {
      const primeiraAba = Object.keys(abasLaterais)[0];
      if (primeiraAba && abasLaterais[primeiraAba])
        abasLaterais[primeiraAba].classList.add("active-lateral-aba");
    }
    botoesLateral.forEach((botao) => {
      const botaoAba = botao.getAttribute("data-lateral-aba");
      if (botaoAba === abaId) botao.classList.add("active-lateral");
      else botao.classList.remove("active-lateral");
    });
    sessionStorage.setItem("abaLateralAtiva", abaId);
  }

  function inicializarAbasLaterais() {
    DOM.botoesLateral = document.querySelectorAll(".lateral-link");
    const paginaAtual = obterPaginaAtual();
    const abasLaterais = getAbasLateraisPorPagina(paginaAtual);

    if (Object.keys(abasLaterais).length === 0) return;

    DOM.botoesLateral.forEach((botao) => {
      botao.addEventListener("click", (e) => {
        e.preventDefault();
        const abaId = botao.getAttribute("data-lateral-aba");
        if (abaId && abasLaterais[abaId])
          ativarAbaLateral(abaId, abasLaterais, DOM.botoesLateral);
      });
    });

    let ultimaAba = sessionStorage.getItem("abaLateralAtiva");
    if (!ultimaAba || !abasLaterais[ultimaAba]) {
      const primeiraAba = Object.keys(abasLaterais)[0];
      if (primeiraAba) ultimaAba = primeiraAba;
    }
    if (ultimaAba && abasLaterais[ultimaAba]) {
      ativarAbaLateral(ultimaAba, abasLaterais, DOM.botoesLateral);
    } else {
      const primeiraAba = Object.keys(abasLaterais)[0];
      if (primeiraAba && abasLaterais[primeiraAba])
        ativarAbaLateral(primeiraAba, abasLaterais, DOM.botoesLateral);
    }
  }

  // ============================================================
  // 4. SIMULADOR DE HARDWARE (AULA 6)
  // ============================================================

  class SimuladorHardware {
    constructor() {
      this.displayElement = document.getElementById("displayLcdSimulado");
      this.ledElement = document.getElementById("ledLuz");
      this.ledStatus = document.getElementById("ledStatus");
      this.btnSilencio = document.getElementById("btnSomSilencio");
      this.btnNormal = document.getElementById("btnSomNormal");
      this.btnAlto = document.getElementById("btnSomAlto");
      this.btnMuitoAlto = document.getElementById("btnSomMuitoAlto");
      this.btnAleatorio = document.getElementById("btnTesteAleatorio");
      this.nivelSomAtual = 20;
      this.ledPiscando = false;
    }

    atualizarDisplay(nivelDB) {
      if (!this.displayElement) return;
      let displayText = "",
        corLed = "",
        mensagem = "";
      if (nivelDB < 40) {
        displayText = `╔════════════════╗<br>║   🤫 SILÊNCIO   ║<br>║   ${nivelDB} dB     ║<br>╚════════════════╝`;
        corLed = "azul";
        mensagem = "🔵 Silêncio total... até assusta!";
      } else if (nivelDB < 70) {
        displayText = `╔════════════════╗<br>║   🗣️ NORMAL    ║<br>║   ${nivelDB} dB     ║<br>╚════════════════╝`;
        corLed = "verde";
        mensagem = "🟢 Papinho normal, nada de mais...";
      } else if (nivelDB < 90) {
        displayText = `╔════════════════╗<br>║   📢 ALTO!     ║<br>║   ${nivelDB} dB     ║<br>╚════════════════╝`;
        corLed = "amarelo";
        mensagem = "🟡 TÁ FICANDO BOM! Logo logo viro fofoqueiro!";
      } else {
        displayText = `╔════════════════╗<br>║   🚨 MUITO ALTO!║<br>║   ${nivelDB} dB     ║<br>╚════════════════╝`;
        corLed = "vermelho";
        mensagem = "🔴 CALA A BOCA! Vou piscar o LED vermelho!";
      }
      this.displayElement.innerHTML = displayText;
      this.atualizarLED(corLed, nivelDB >= 90);
      if (this.ledStatus)
        this.ledStatus.innerHTML = `🔊 ${nivelDB} dB - ${mensagem}`;
    }

    atualizarLED(cor, piscar = false) {
      if (!this.ledElement) return;
      this.ledElement.classList.remove(
        "led-vermelho",
        "led-verde",
        "led-azul",
        "led-amarelo",
        "led-roxo",
        "led-ciano",
        "led-desligado",
      );
      if (piscar && !this.ledPiscando) {
        this.piscarLED(cor);
        return;
      }
      switch (cor) {
        case "vermelho":
          this.ledElement.classList.add("led-vermelho");
          break;
        case "verde":
          this.ledElement.classList.add("led-verde");
          break;
        case "azul":
          this.ledElement.classList.add("led-azul");
          break;
        case "amarelo":
          this.ledElement.classList.add("led-amarelo");
          break;
        default:
          this.ledElement.classList.add("led-desligado");
      }
    }

    piscarLED(cor) {
      this.ledPiscando = true;
      let piscadas = 0;
      const maxPiscadas = 6;
      const intervalo = 200;
      const piscar = () => {
        if (piscadas >= maxPiscadas) {
          this.ledPiscando = false;
          this.atualizarLED(cor, false);
          return;
        }
        if (piscadas % 2 === 0) {
          switch (cor) {
            case "vermelho":
              this.ledElement.classList.add("led-vermelho");
              break;
            case "amarelo":
              this.ledElement.classList.add("led-amarelo");
              break;
            default:
              this.ledElement.classList.add("led-vermelho");
          }
        } else {
          this.ledElement.classList.remove("led-vermelho", "led-amarelo");
          this.ledElement.classList.add("led-desligado");
        }
        piscadas++;
        setTimeout(piscar, intervalo);
      };
      piscar();
    }

    simularSom(nivelDB) {
      this.nivelSomAtual = nivelDB;
      this.atualizarDisplay(nivelDB);
      if (this.displayElement)
        animarElemento(this.displayElement, "escala-pulse", 200);
      if (nivelDB >= 90)
        exibirMensagemRobo(
          "warning",
          "🚨 BARULHEIRA DEMAIS! Tá tudo bem aí, piá? 🚨",
          2000,
        );
    }

    simularAleatorio() {
      const niveis = [25, 45, 65, 85, 95, 105];
      const aleatorio = niveis[Math.floor(Math.random() * niveis.length)];
      this.simularSom(aleatorio);
      if (this.btnAleatorio)
        alternarTextoBotao(
          this.btnAleatorio,
          '<i class="bi bi-shuffle"></i> Teste aleatório',
          '<i class="bi bi-check-lg"></i> ' + aleatorio + " dB!",
          1000,
        );
    }

    init() {
      this.simularSom(55);
      if (this.btnSilencio)
        this.btnSilencio.addEventListener("click", () => this.simularSom(20));
      if (this.btnNormal)
        this.btnNormal.addEventListener("click", () => this.simularSom(55));
      if (this.btnAlto)
        this.btnAlto.addEventListener("click", () => this.simularSom(80));
      if (this.btnMuitoAlto)
        this.btnMuitoAlto.addEventListener("click", () => this.simularSom(95));
      if (this.btnAleatorio)
        this.btnAleatorio.addEventListener("click", () =>
          this.simularAleatorio(),
        );
      return true;
    }
  }

  // ============================================================
  // 5. SIMULADOR DE IA GENERATIVA (AULA 5)
  // ============================================================

  class SimuladorIAGenerativa {
    constructor() {
      this.chatContainer = document.getElementById("chatIaContainer");
      this.perguntaInput = document.getElementById("perguntaIa");
      this.btnEnviar = document.getElementById("btnEnviarPergunta");
      this.botoesFraseIa = document.querySelectorAll(".btn-frase-ia");
      this.historicoConversa = [];
      this.girias = [
        "vixi",
        "égua",
        "piá",
        "guria",
        "bagulho doido",
        "ó o trem",
        "tchê",
        "meu consagrado",
        "bah",
        "trem bão",
      ];
      this.respostasSimuladas = {
        nome: "Ó o trem, piá! Meu nome é Robô Fofoqueiro da Acessibilidade, prazer em conhecê, tchê! 🤖",
        acessibilidade:
          "Vixi, acessibilidade digital é bagulho doido, guria! É fazer site funcionar pra todo mundo: contraste bom, áudio descrição, Libras... ó o trem! ♿",
        fofoca:
          "ÉGUA! Finalmente alguém quer fofoca! Ouvi dizer que o professor vai testar API Gemini na aula... 🍿",
        site: "Piá, pra deixar teu site acessível: 1) Contraste alto 2) Texto alternativo 3) Navegação por teclado 4) Legendas! Tchê! 🌐",
        memes:
          "Bah, adoro memes, guria! Meu favorito é o 'Vixi, deu ruim' com o doguinho triste. Bora mandar um aí? 🐶",
        padrao:
          "Vixi, não entendi direito não, piá! Repete aí mais devagar, égua! Mas tô aqui pra ajudar com acessibilidade, ó o trem! 🤖",
      };
    }

    adicionarMensagem(remetente, texto) {
      if (!this.chatContainer) return;
      const mensagemDiv = document.createElement("div");
      mensagemDiv.className = `mb-2 d-flex ${remetente === "usuario" ? "justify-content-end" : "justify-content-start"}`;
      mensagemDiv.style.animation = "fadeInUp 0.3s ease";
      const bubbleClass =
        remetente === "usuario"
          ? "bg-primary text-white"
          : "bg-secondary text-white";
      const icone = remetente === "usuario" ? "👤" : "🤖";
      const nome = remetente === "usuario" ? "Você" : "Robô Fofoqueiro";
      mensagemDiv.innerHTML = `<div class="${bubbleClass} rounded-3 p-2 px-3" style="max-width: 80%;"><small><i class="bi ${remetente === "usuario" ? "bi-person" : "bi-robot"}"></i> ${nome}</small><div class="mt-1">${texto}</div></div>`;
      this.chatContainer.appendChild(mensagemDiv);
      this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    }

    gerarResposta(pergunta) {
      const perguntaLower = pergunta.toLowerCase();
      if (
        perguntaLower.includes("nome") ||
        perguntaLower.includes("quem é você")
      )
        return this.respostasSimuladas.nome;
      if (
        perguntaLower.includes("acessibilidade") ||
        perguntaLower.includes("acessível")
      )
        return this.respostasSimuladas.acessibilidade;
      if (perguntaLower.includes("fofoca") || perguntaLower.includes("conta"))
        return this.respostasSimuladas.fofoca;
      if (perguntaLower.includes("site") || perguntaLower.includes("web"))
        return this.respostasSimuladas.site;
      if (perguntaLower.includes("meme") || perguntaLower.includes("engraçado"))
        return this.respostasSimuladas.memes;
      const giriaAleatoria =
        this.girias[Math.floor(Math.random() * this.girias.length)];
      return `${this.respostasSimuladas.padrao} ${giriaAleatoria}!`;
    }

    processarPergunta() {
      if (!this.perguntaInput) return;
      const pergunta = this.perguntaInput.value.trim();
      if (pergunta === "") {
        this.adicionarMensagem(
          "robo",
          "Vixi, piá! Digita alguma coisa aí pra eu te ajudar! 🗣️",
        );
        return;
      }
      this.adicionarMensagem("usuario", pergunta);
      this.perguntaInput.value = "";
      const typingDiv = document.createElement("div");
      typingDiv.className = "mb-2 d-flex justify-content-start";
      typingDiv.id = "typingIndicator";
      typingDiv.innerHTML = `<div class="bg-secondary text-white rounded-3 p-2 px-3 opacity-50"><small><i class="bi bi-robot"></i> Robô Fofoqueiro</small><div class="mt-1">🤖 digitando<span class="ms-1">...</span></div></div>`;
      this.chatContainer.appendChild(typingDiv);
      this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
      setTimeout(() => {
        const typingElem = document.getElementById("typingIndicator");
        if (typingElem) typingElem.remove();
        const resposta = this.gerarResposta(pergunta);
        this.adicionarMensagem("robo", resposta);
        this.historicoConversa.push({
          pergunta,
          resposta,
          timestamp: new Date().toLocaleTimeString(),
        });
        if (this.historicoConversa.length > 50) this.historicoConversa.shift();
      }, 800);
    }

    init() {
      if (!this.btnEnviar || !this.perguntaInput) return false;
      this.btnEnviar.addEventListener("click", () => this.processarPergunta());
      this.perguntaInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          this.processarPergunta();
        }
      });
      this.botoesFraseIa.forEach((botao) => {
        botao.addEventListener("click", () => {
          const pergunta = botao.getAttribute("data-pergunta");
          if (pergunta && this.perguntaInput) {
            this.perguntaInput.value = pergunta;
            this.processarPergunta();
            alternarTextoBotao(
              botao,
              botao.innerHTML,
              '<i class="bi bi-check-lg"></i> Enviado!',
              1000,
            );
          }
        });
      });
      setTimeout(
        () =>
          this.adicionarMensagem(
            "robo",
            "Ó o trem, piá! Sou o Robô Fofoqueiro da Acessibilidade. Pode perguntar qualquer coisa, tô de ouvido! 🧠🤖",
          ),
        500,
      );
      return true;
    }
  }

  // ============================================================
  // 6. SIMULADOR DE GRÁFICOS (AULA 7)
  // ============================================================

  class SimuladorGraficos {
    constructor() {
      this.canvasLinha = document.getElementById("canvasLinha");
      this.canvasHeatmap = document.getElementById("canvasHeatmap");
      this.btnAtualizar = document.getElementById("atualizarDados");
      this.corpoTabela = document.getElementById("corpoTabelaDados");
      this.estatisticasSpan = document.getElementById("estatisticasSimulacao");
      this.locais = [
        "Sala 1 (Matemática)",
        "Sala 2 (Português)",
        "Sala 3 (Ciências)",
        "Sala 4 (História)",
        "Biblioteca",
        "Pátio/Cantina",
        "Laboratório",
        "Informática",
        "Secretaria",
        "Ginásio",
      ];
      this.horarios = [
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
      ];
      this.dados = [];
    }

    gerarDadosAleatorios() {
      const novosDados = [];
      for (let i = 0; i < 24; i++) {
        const hora = 7 + Math.floor(i / 2);
        const minuto = (i % 2) * 30;
        const horario = `${hora.toString().padStart(2, "0")}:${minuto.toString().padStart(2, "0")}`;
        let baseBarulho;
        if (hora === 12 || hora === 17) baseBarulho = 85;
        else if (hora >= 9 && hora <= 11) baseBarulho = 70;
        else if (hora >= 13 && hora <= 16) baseBarulho = 55;
        else baseBarulho = 45;
        const variacao = Math.floor(Math.random() * 20) - 10;
        const decibeis = Math.min(110, Math.max(25, baseBarulho + variacao));
        const local =
          this.locais[Math.floor(Math.random() * this.locais.length)];
        novosDados.push({ horario, local, decibeis });
      }
      this.dados = novosDados;
      return this.dados;
    }

    atualizarTabela() {
      if (!this.corpoTabela) return;
      const dadosExibir = this.dados.slice(-12);
      this.corpoTabela.innerHTML = "";
      dadosExibir.forEach((dado) => {
        const row = document.createElement("tr");
        let classeDb = "";
        if (dado.decibeis > 75) classeDb = "db-alto";
        else if (dado.decibeis > 50) classeDb = "db-medio";
        else classeDb = "db-baixo";
        row.innerHTML = `<td>${dado.horario}<td>${dado.local}<td class="${classeDb} fw-bold">${dado.decibeis} dB`;
        this.corpoTabela.appendChild(row);
      });
    }

    atualizarEstatisticas() {
      if (!this.estatisticasSpan) return;
      const valores = this.dados.map((d) => d.decibeis);
      const media = (
        valores.reduce((a, b) => a + b, 0) / valores.length
      ).toFixed(1);
      const maximo = Math.max(...valores);
      const alertas = valores.filter((v) => v > 75).length;
      const percentualAlertas = ((alertas / valores.length) * 100).toFixed(1);
      this.estatisticasSpan.innerHTML = `Média: ${media} dB | Máx: ${maximo} dB | Alertas: ${percentualAlertas}%`;
    }

    desenharGraficoLinha() {
      if (!this.canvasLinha) return;
      const container = this.canvasLinha.parentElement;
      const largura = Math.min(container.clientWidth - 32, 600);
      this.canvasLinha.width = largura;
      this.canvasLinha.height = 250;
      const ctx = this.canvasLinha.getContext("2d");
      const width = this.canvasLinha.width;
      const height = this.canvasLinha.height;
      if (width === 0 || height === 0) return;
      ctx.clearRect(0, 0, width, height);
      const valores = this.dados.map((d) => d.decibeis);
      const maxValor = 120;
      const padding = 40;
      const graphWidth = width - 2 * padding;
      const graphHeight = height - 2 * padding;
      if (graphWidth <= 0 || graphHeight <= 0) return;
      ctx.fillStyle = "#1a1a2e";
      ctx.fillRect(0, 0, width, height);
      const zonaVerdeY = padding + graphHeight - (40 / maxValor) * graphHeight;
      const zonaAmarelaY =
        padding + graphHeight - (75 / maxValor) * graphHeight;
      ctx.fillStyle = "rgba(46, 204, 113, 0.15)";
      ctx.fillRect(
        padding,
        zonaVerdeY,
        graphWidth,
        graphHeight - (zonaVerdeY - padding),
      );
      ctx.fillStyle = "rgba(241, 196, 15, 0.15)";
      ctx.fillRect(
        padding,
        zonaAmarelaY,
        graphWidth,
        zonaVerdeY - zonaAmarelaY,
      );
      ctx.fillStyle = "rgba(231, 76, 60, 0.15)";
      ctx.fillRect(padding, padding, graphWidth, zonaAmarelaY - padding);
      ctx.beginPath();
      ctx.strokeStyle = "#3498db";
      ctx.lineWidth = 2.5;
      let firstPoint = true;
      for (let i = 0; i < valores.length; i++) {
        const x = padding + (i / (valores.length - 1)) * graphWidth;
        const y = padding + graphHeight - (valores[i] / maxValor) * graphHeight;
        if (firstPoint) {
          ctx.moveTo(x, y);
          firstPoint = false;
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      ctx.beginPath();
      firstPoint = true;
      for (let i = 0; i < valores.length; i++) {
        const x = padding + (i / (valores.length - 1)) * graphWidth;
        const y = padding + graphHeight - (valores[i] / maxValor) * graphHeight;
        if (firstPoint) {
          ctx.moveTo(x, y);
          firstPoint = false;
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.lineTo(padding + graphWidth, padding + graphHeight);
      ctx.lineTo(padding, padding + graphHeight);
      ctx.closePath();
      ctx.fillStyle = "rgba(52, 152, 219, 0.1)";
      ctx.fill();
      for (let i = 0; i < valores.length; i++) {
        const x = padding + (i / (valores.length - 1)) * graphWidth;
        const y = padding + graphHeight - (valores[i] / maxValor) * graphHeight;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = valores[i] > 75 ? "#e74c3c" : "#2ecc71";
        ctx.fill();
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.fillStyle = "#ecf0f1";
        ctx.font = "9px monospace";
        ctx.fillText(`${valores[i]} dB`, x + 6, y - 4);
      }
      ctx.fillStyle = "#ecf0f1";
      ctx.font = "10px monospace";
      for (let i = 0; i <= 4; i++) {
        const valorGrade = i * 30;
        const y = padding + graphHeight - (valorGrade / maxValor) * graphHeight;
        ctx.fillText(`${valorGrade} dB`, 5, y + 3);
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255,255,255,0.15)";
        ctx.moveTo(padding, y);
        ctx.lineTo(padding + graphWidth, y);
        ctx.stroke();
      }
      const linhaAlertaY =
        padding + graphHeight - (75 / maxValor) * graphHeight;
      ctx.beginPath();
      ctx.moveTo(padding, linhaAlertaY);
      ctx.lineTo(padding + graphWidth, linhaAlertaY);
      ctx.strokeStyle = "#f39c12";
      ctx.setLineDash([8, 6]);
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "#f39c12";
      ctx.font = "9px monospace";
      ctx.fillText("Limite 75 dB", padding + graphWidth - 70, linhaAlertaY - 5);
      ctx.fillStyle = "#ecf0f1";
      ctx.font = "8px monospace";
      for (let i = 0; i < valores.length; i += 4) {
        const x = padding + (i / (valores.length - 1)) * graphWidth;
        const horario = this.dados[i]?.horario || "";
        ctx.fillText(horario, x - 15, height - 8);
      }
    }

    desenharHeatmap() {
      if (!this.canvasHeatmap) return;
      const container = this.canvasHeatmap.parentElement;
      const tamanho = Math.min(container.clientWidth - 32, 400);
      this.canvasHeatmap.width = tamanho;
      this.canvasHeatmap.height = tamanho;
      const ctx = this.canvasHeatmap.getContext("2d");
      const width = this.canvasHeatmap.width;
      const height = this.canvasHeatmap.height;
      if (width === 0 || height === 0) return;
      ctx.clearRect(0, 0, width, height);
      const tamanhoGrid = 5;
      const cellWidth = width / tamanhoGrid;
      const cellHeight = height / tamanhoGrid;
      const salasMap = {};
      this.dados.forEach((dado) => {
        if (!salasMap[dado.local]) salasMap[dado.local] = [];
        salasMap[dado.local].push(dado.decibeis);
      });
      const mediasSalas = {};
      for (const [sala, valores] of Object.entries(salasMap))
        mediasSalas[sala] = valores.reduce((a, b) => a + b, 0) / valores.length;
      const listaSalas = Object.keys(mediasSalas);
      const matriz = [];
      for (let i = 0; i < tamanhoGrid; i++) {
        matriz[i] = [];
        for (let j = 0; j < tamanhoGrid; j++) {
          const idx = (i * tamanhoGrid + j) % listaSalas.length;
          let valor = mediasSalas[listaSalas[idx]] || 50;
          const distanciaCentro = Math.abs(i - 2) + Math.abs(j - 2);
          valor = Math.min(
            100,
            Math.max(30, valor + (5 - distanciaCentro) * 3),
          );
          matriz[i][j] = Math.round(valor);
        }
      }
      for (let i = 0; i < tamanhoGrid; i++) {
        for (let j = 0; j < tamanhoGrid; j++) {
          const valor = matriz[i][j];
          let cor;
          if (valor >= 85) cor = "#c0392b";
          else if (valor >= 75) cor = "#e74c3c";
          else if (valor >= 65) cor = "#e67e22";
          else if (valor >= 55) cor = "#f39c12";
          else if (valor >= 45) cor = "#f1c40f";
          else if (valor >= 35) cor = "#2ecc71";
          else cor = "#3498db";
          ctx.fillStyle = cor;
          ctx.fillRect(
            j * cellWidth,
            i * cellHeight,
            cellWidth - 1,
            cellHeight - 1,
          );
          ctx.fillStyle = "#fff";
          ctx.font = `${Math.min(12, cellWidth / 3)}px monospace`;
          ctx.fillText(
            valor,
            j * cellWidth + cellWidth / 2 - 6,
            i * cellHeight + cellHeight / 2 + 4,
          );
        }
      }
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255,255,255,0.4)";
      ctx.lineWidth = 1;
      for (let i = 0; i <= tamanhoGrid; i++) {
        ctx.moveTo(i * cellWidth, 0);
        ctx.lineTo(i * cellWidth, height);
        ctx.stroke();
        ctx.moveTo(0, i * cellHeight);
        ctx.lineTo(width, i * cellHeight);
        ctx.stroke();
      }
    }

    atualizarTudo() {
      this.gerarDadosAleatorios();
      this.atualizarTabela();
      this.atualizarEstatisticas();
      setTimeout(() => {
        this.desenharGraficoLinha();
        this.desenharHeatmap();
      }, 50);
    }

    init() {
      if (!this.canvasLinha && !this.canvasHeatmap) return false;
      this.atualizarTudo();
      if (this.btnAtualizar) {
        this.btnAtualizar.addEventListener("click", () => {
          this.atualizarTudo();
          alternarTextoBotao(
            this.btnAtualizar,
            '<i class="bi bi-arrow-repeat"></i> Gerar novos dados',
            '<i class="bi bi-check-lg"></i> Dados atualizados!',
            1500,
          );
        });
      }
      window.addEventListener("resize", () => {
        setTimeout(() => {
          this.desenharGraficoLinha();
          this.desenharHeatmap();
        }, 100);
      });
      return true;
    }
  }

  // ============================================================
  // 7. SIMULADOR DE DECIBÉIS (AULA 2)
  // ============================================================

  class SimuladorDecibeis {
    constructor() {
      this.barraDb = document.getElementById("barraDb");
      this.dbValor = document.getElementById("dbValor");
      this.alertaBox = document.getElementById("alertaBox");
      this.mensagemMeme = document.getElementById("mensagemMeme");
      this.initialized = false;
    }

    init() {
      if (!this.barraDb || !this.dbValor) return false;
      const btnSussurro = document.getElementById("btnSussurro");
      const btnConversa = document.getElementById("btnConversa");
      const btnPalmas = document.getElementById("btnPalmas");
      const btnGrito = document.getElementById("btnGrito");
      const simularSom = document.getElementById("simularSom");
      if (btnSussurro)
        btnSussurro.addEventListener("click", () => this.atualizar(25));
      if (btnConversa)
        btnConversa.addEventListener("click", () => this.atualizar(55));
      if (btnPalmas)
        btnPalmas.addEventListener("click", () => this.atualizar(85));
      if (btnGrito)
        btnGrito.addEventListener("click", () => this.atualizar(95));
      if (simularSom) {
        simularSom.addEventListener("click", () => {
          const dbAleatorio = Math.random() * 120;
          this.atualizar(dbAleatorio);
          alternarTextoBotao(
            simularSom,
            "🎲 Simular som aleatório",
            '<i class="bi bi-shuffle"></i> Aleatório!',
            1000,
          );
        });
      }
      this.atualizar(0);
      this.initialized = true;
      return true;
    }

    atualizar(db) {
      if (!this.initialized) return;
      db = Math.min(120, Math.max(0, db));
      if (this.dbValor) this.dbValor.textContent = db.toFixed(1);
      const percentual = (db / 120) * 100;
      if (this.barraDb) {
        this.barraDb.style.width = percentual + "%";
        if (db < 40) this.barraDb.style.backgroundColor = "#2ecc71";
        else if (db < 75) this.barraDb.style.backgroundColor = "#f39c12";
        else this.barraDb.style.backgroundColor = "#e74c3c";
      }
      if (this.alertaBox) {
        if (db > 75) {
          this.alertaBox.style.display = "block";
          this.alertaBox.classList.remove("d-none");
        } else {
          this.alertaBox.style.display = "none";
          this.alertaBox.classList.add("d-none");
        }
      }
      let mensagem = "";
      if (db < 40) mensagem = "🤫 Silêncio absoluto... até assusta!";
      else if (db < 60) mensagem = "🗣️ Papinho normal, nada de mais...";
      else if (db < 80)
        mensagem = "📢 TÁ FICANDO BOM! Logo logo viro fofoqueiro!";
      else if (db < 100)
        mensagem = "🔊 CALA A BOCA! Vou piscar o LED vermelho!";
      else mensagem = "💀 INFERNO ACÚSTICO! Vou chamar a diretora robô!";
      if (this.mensagemMeme) {
        this.mensagemMeme.innerHTML = `<i class="bi bi-robot"></i> ${mensagem}`;
        animarElemento(this.mensagemMeme, "escala-pulse", 200);
      }
    }
  }

  // ============================================================
  // 8. SIMULADOR DE COLETA DE DADOS (AULA 2)
  // ============================================================

  class SimuladorColetaDados {
    constructor() {
      this.simularColeta = document.getElementById("simularColeta");
      this.tabelaResultados = document.getElementById("tabelaResultados");
      this.historicoMedicoes = this.carregarHistorico();
    }

    carregarHistorico() {
      const salvo = localStorage.getItem("roboFofoqueiro_medicoes");
      return salvo ? JSON.parse(salvo) : [];
    }

    salvarHistorico() {
      localStorage.setItem(
        "roboFofoqueiro_medicoes",
        JSON.stringify(this.historicoMedicoes.slice(-50)),
      );
    }

    gerarMedicaoRealista() {
      const tiposMedicao = [
        { nome: "🤫 Sussurro", baseDb: 25, variacao: 10 },
        { nome: "🗣️ Conversa normal", baseDb: 55, variacao: 10 },
        { nome: "👏 Palmas", baseDb: 85, variacao: 8 },
        { nome: "📢 Grito", baseDb: 95, variacao: 5 },
        { nome: "🎸 Show de rock", baseDb: 110, variacao: 5 },
        { nome: "🍃 Vento suave", baseDb: 15, variacao: 5 },
        { nome: "📱 Celular vibrando", baseDb: 45, variacao: 10 },
        { nome: "🔨 Martelada", baseDb: 100, variacao: 8 },
      ];
      const tipo =
        tiposMedicao[Math.floor(Math.random() * tiposMedicao.length)];
      const db = tipo.baseDb + (Math.random() - 0.5) * tipo.variacao;
      let mensagem = "";
      if (db < 40) mensagem = "Silêncio absoluto... até assusta!";
      else if (db < 60) mensagem = "Papinho normal, nada de mais...";
      else if (db < 80) mensagem = "TÁ FICANDO BOM! Logo logo viro fofoqueiro!";
      else if (db < 100) mensagem = "CALA A BOCA! Vou piscar o LED vermelho!";
      else mensagem = "INFERNO ACÚSTICO! Vou chamar a diretora robô!";
      return {
        nome: tipo.nome,
        db: Math.round(db * 10) / 10,
        mensagem: mensagem,
        alerta: db > 75,
      };
    }

    init() {
      if (!this.simularColeta || !this.tabelaResultados) return false;
      this.simularColeta.addEventListener("click", () => this.executarColeta());
      return true;
    }

    executarColeta() {
      const medicoes = [];
      for (let i = 0; i < 5; i++) medicoes.push(this.gerarMedicaoRealista());
      const agora = new Date();
      const dadosColeta = medicoes.map((medicao, index) => ({
        timestamp: new Date(
          agora.getTime() - (medicoes.length - index) * 30000,
        ).toLocaleTimeString("pt-BR"),
        dB: medicao.db,
        mensagem: medicao.mensagem,
        alerta: medicao.alerta,
        nome: medicao.nome,
      }));
      dadosColeta.forEach((d) => this.historicoMedicoes.push(d));
      this.salvarHistorico();
      this.renderizarTabela(dadosColeta);
      alternarTextoBotao(
        this.simularColeta,
        '<i class="bi bi-graph-up"></i> Simular coleta de dados',
        '<i class="bi bi-check-lg"></i> Coleta realizada!',
        2000,
      );
      const cardColeta = document.querySelector(
        "#conteudoChecklist .card:first-child",
      );
      if (cardColeta) animarElemento(cardColeta, "escala-pulse", 300);
    }

    renderizarTabela(dadosColeta) {
      const valoresDB = dadosColeta.map((m) => m.dB);
      const maxDB = Math.max(...valoresDB);
      const minDB = Math.min(...valoresDB);
      const mediaDB = (
        valoresDB.reduce((a, b) => a + b, 0) / valoresDB.length
      ).toFixed(1);
      const alertasCount = dadosColeta.filter((m) => m.alerta).length;
      let htmlTabela = `<div class="table-responsive mt-3"><table class="table table-bordered table-striped table-sm"><thead class="table-dark"><tr><th>⏰ Horário</th><th>🔊 dB</th><th>🎧 Tipo</th><th>📢 Mensagem</th><th>🚨 Alerta</th></tr></thead><tbody>`;
      dadosColeta.forEach((medicao) => {
        const alertaIcon = medicao.alerta
          ? '<span class="badge bg-danger"><i class="bi bi-exclamation-triangle-fill"></i> +75dB</span>'
          : '<span class="badge bg-success"><i class="bi bi-check-circle-fill"></i> Normal</span>';
        const linhaClasse = medicao.alerta ? "table-danger" : "";
        htmlTabela += `<tr class="${linhaClasse}"><td><i class="bi bi-clock"></i> ${medicao.timestamp}<td><strong>${medicao.dB} dB</strong><td>${medicao.nome || "-"}<td><i class="bi bi-robot"></i> ${medicao.mensagem}<td class="text-center">${alertaIcon}</tr>`;
      });
      htmlTabela += `</tbody></table></div><div class="alert alert-info mt-3"><i class="bi bi-graph-up"></i> <strong>📊 Estatísticas da coleta:</strong><br>🔹 Maior nível: ${maxDB} dB<br>🔹 Menor nível: ${minDB} dB<br>🔹 Média: ${mediaDB} dB<br>🔹 Alertas disparados: ${alertasCount} de ${dadosColeta.length} medições</div><div class="alert alert-warning"><i class="bi bi-robot"></i> <strong>🤖 Robô Fofoqueiro diz:</strong><br>${alertasCount > 2 ? "ÉGUA! Barulheira danada, hein, piá! Bora baixar esse volume! 🔊" : "Tá tranquilo, tchê! O barulho tá sob controle! 🤫"}</div>`;
      this.tabelaResultados.innerHTML = htmlTabela;
    }
  }

  // ============================================================
  // 9. RECONHECIMENTO DE FALA (AULA 3)
  // ============================================================

  class ReconhecimentoFala {
    constructor() {
      this.btnIniciarGravacao = document.getElementById("btnIniciarGravacao");
      this.statusGravacao = document.getElementById("statusGravacao");
      this.btnSimularFala = document.getElementById("btnSimularFala");
      this.fraseUsuarioInput = document.getElementById("fraseUsuario");
      this.respostaRobo = document.getElementById("respostaRobo");
      this.librasTexto = document.getElementById("librasTexto");
      this.recognition = null;
      this.isListening = false;
      this.modoOffline = false;
      this.dicionarioGirias = {
        vixi: "😲 expressão de surpresa ou susto",
        piá: "🧒 garoto, rapaz",
        guria: "👧 garota, moça",
        "ó o trem": "👀 olha a coisa, presta atenção",
        tchê: "🤝 companheiro, amigo",
        "bagulho doido": "🤪 coisa louca, situação complicada",
        égua: "🐴 expressão de espanto",
        trem: "📦 coisa, objeto",
        bah: "😮 expressão de surpresa",
      };
      this.respostasPersonalizadas = {
        programar:
          "Vixi, programar é bagulho doido! Bora praticar mais um pouco, tchê! 🤖💻",
        python:
          "Ah, Python é o trem mais legal, piá! Bora codar mais um pouco! 🐍",
        robô: "Ó o trem, tão falando de mim! Eu sou o Robô Fofoqueiro, prazer, tchê! 🤖",
        biblioteca:
          "Piá, a biblioteca é no segundo andar, ó o trem ali do lado! 📚",
        estudar:
          "Guria, estudar é bom demais! Bora fofocar sobre o conteúdo? 📖",
        professor:
          "O professor é gente boa demais, égua! Tá te ensinando bagulho doido! 👨‍🏫",
        ajuda:
          "Claro que ajudo, piá! Tô aqui pra isso! Só falar o que precisa, tchê! 🆘",
        obrigado: "Vixi, imagina! Tamo junto, guria! Bora que bora! 🙏",
        fofoca:
          "AHHH! Finalmente uma fofoca! Conta tudinho, piá! Tô de ouvido colado! 🍿",
        padrao:
          "Vixi, não entendi direito não, piá! Repete aí mais devagar, égua! 🤔",
      };
      this.librasSimbolos = {
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
    }

    traduzirLibrasTextual(frase) {
      let resultado = [];
      for (let letra of frase.toLowerCase())
        resultado.push(this.librasSimbolos[letra] || letra);
      let librasText = resultado.join(" ");
      return librasText.length > 80
        ? librasText.substring(0, 80) + "..."
        : librasText;
    }

    gerarRespostaPersonalizada(frase) {
      const fraseLower = frase.toLowerCase();
      for (let [palavra, resposta] of Object.entries(
        this.respostasPersonalizadas,
      )) {
        if (fraseLower.includes(palavra)) return resposta;
      }
      for (let [giria, significado] of Object.entries(this.dicionarioGirias)) {
        if (fraseLower.includes(giria))
          return `Vixi, você usou '${giria}'! ${significado} Égua, sabia nem que existia isso! 🤯`;
      }
      return this.respostasPersonalizadas["padrao"];
    }

    atualizarResposta(frase) {
      if (!frase || frase.trim() === "") {
        if (this.respostaRobo)
          this.respostaRobo.innerHTML =
            '<strong><i class="bi bi-robot"></i> Robô Fofoqueiro:</strong><br>"Vixi, não falou nada, piá! Fala alguma coisa aí!"';
        if (this.librasTexto)
          this.librasTexto.innerHTML = "😶 Nada para traduzir...";
        return;
      }
      const resposta = this.gerarRespostaPersonalizada(frase);
      const librasText = this.traduzirLibrasTextual(frase);
      if (this.respostaRobo) {
        this.respostaRobo.innerHTML = `<strong><i class="bi bi-robot"></i> Robô Fofoqueiro:</strong><br>"${resposta}"`;
        animarElemento(this.respostaRobo, "escala-pulse", 200);
      }
      if (this.librasTexto) this.librasTexto.innerHTML = librasText;
      let temGiria = Object.keys(this.dicionarioGirias).some((giria) =>
        frase.toLowerCase().includes(giria),
      );
      if (temGiria) {
        const toastGiria = document.createElement("div");
        toastGiria.className =
          "alert alert-warning alert-dismissible fade show position-fixed bottom-0 start-50 translate-middle-x m-3";
        toastGiria.style.zIndex = "9999";
        toastGiria.style.minWidth = "250px";
        toastGiria.innerHTML = `<i class="bi bi-emoji-sunglasses"></i><strong>ÊÊÊÊGUA!</strong> Você usou uma gíria paranaense!<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar"></button>`;
        document.body.appendChild(toastGiria);
        setTimeout(() => toastGiria.remove(), 3000);
      }
    }

    iniciarReconhecimento() {
      if (this.isListening && this.recognition) {
        this.recognition.stop();
        return;
      }
      try {
        this.recognition.start();
      } catch (e) {
        console.error("Erro ao iniciar:", e);
        if (this.statusGravacao) {
          this.statusGravacao.innerHTML =
            '<i class="bi bi-exclamation-triangle-fill"></i> ❌ Erro ao iniciar o microfone. Usando modo offline.';
          this.statusGravacao.className = "alert alert-warning mb-3";
        }
        this.modoOffline = true;
      }
    }

    init() {
      const SpeechRecognitionAPI =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognitionAPI && this.btnIniciarGravacao) {
        this.recognition = new SpeechRecognitionAPI();
        this.recognition.lang = "pt-BR";
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 1;
        this.recognition.onstart = () => {
          this.isListening = true;
          if (this.statusGravacao) {
            this.statusGravacao.innerHTML =
              '<i class="bi bi-mic-fill text-danger"></i> 🎤 Escutando... Fale alguma coisa, piá!';
            this.statusGravacao.className = "alert alert-danger mb-3";
          }
          alternarTextoBotao(
            this.btnIniciarGravacao,
            '<i class="bi bi-mic-fill"></i> 🎤 Clique e Fale com o Robô',
            '<i class="bi bi-stop-fill"></i> Ouvindo...',
          );
        };
        this.recognition.onresult = (event) => {
          const texto = event.results[0][0].transcript;
          if (this.statusGravacao) {
            this.statusGravacao.innerHTML = `<i class="bi bi-check-circle-fill text-success"></i> ✅ Você disse: "${texto}"`;
            this.statusGravacao.className = "alert alert-success mb-3";
          }
          this.atualizarResposta(texto);
          this.isListening = false;
          alternarTextoBotao(
            this.btnIniciarGravacao,
            '<i class="bi bi-mic-fill"></i> 🎤 Clique e Fale com o Robô',
            '<i class="bi bi-mic-fill"></i> 🎤 Clique e Fale com o Robô',
          );
        };
        this.recognition.onerror = (event) => {
          console.error("Erro no reconhecimento:", event.error);
          let mensagemErro = "";
          switch (event.error) {
            case "not-allowed":
              mensagemErro =
                "❌ Permissão do microfone negada! Usando modo offline.";
              break;
            case "no-speech":
              mensagemErro =
                "❌ Não detectei nenhuma fala! Tenta falar mais alto, piá!";
              break;
            case "audio-capture":
              mensagemErro =
                "❌ Não foi possível acessar o microfone! Usando modo offline.";
              break;
            default:
              mensagemErro = `❌ Erro: ${event.error}. Usando modo offline.`;
          }
          if (this.statusGravacao) {
            this.statusGravacao.innerHTML = `<i class="bi bi-exclamation-triangle-fill"></i> ${mensagemErro}`;
            this.statusGravacao.className = "alert alert-warning mb-3";
          }
          this.isListening = false;
          this.modoOffline = true;
          alternarTextoBotao(
            this.btnIniciarGravacao,
            '<i class="bi bi-mic-fill"></i> 🎤 Clique e Fale com o Robô',
            '<i class="bi bi-mic-fill"></i> 🎤 Modo offline',
          );
        };
        this.recognition.onend = () => {
          if (this.isListening && this.statusGravacao) {
            this.statusGravacao.innerHTML =
              '<i class="bi bi-info-circle"></i> Clique no botão acima e permita o acesso ao microfone.';
            this.statusGravacao.className = "alert alert-secondary mb-3";
            alternarTextoBotao(
              this.btnIniciarGravacao,
              '<i class="bi bi-mic-fill"></i> 🎤 Clique e Fale com o Robô',
              '<i class="bi bi-mic-fill"></i> 🎤 Clique e Fale com o Robô',
            );
            this.isListening = false;
          }
        };
        this.btnIniciarGravacao.addEventListener("click", () =>
          this.iniciarReconhecimento(),
        );
      } else if (this.btnIniciarGravacao) {
        this.btnIniciarGravacao.disabled = true;
        this.btnIniciarGravacao.innerHTML =
          '<i class="bi bi-mic-mute-fill"></i> Modo offline (digitação manual)';
        if (this.statusGravacao) {
          this.statusGravacao.innerHTML =
            '<i class="bi bi-exclamation-triangle-fill"></i> ⚠️ Seu navegador não suporta reconhecimento de voz. Use a digitação manual!';
          this.statusGravacao.className = "alert alert-warning mb-3";
        }
        this.modoOffline = true;
      }
      if (this.btnSimularFala) {
        this.btnSimularFala.addEventListener("click", () => {
          const frase = this.fraseUsuarioInput
            ? this.fraseUsuarioInput.value
            : "";
          if (frase.trim()) {
            this.atualizarResposta(frase);
            if (this.fraseUsuarioInput) this.fraseUsuarioInput.value = "";
          } else {
            this.atualizarResposta("");
          }
          alternarTextoBotao(
            this.btnSimularFala,
            '<i class="bi bi-send-fill"></i> Enviar',
            '<i class="bi bi-check-lg"></i> Enviado!',
            1500,
          );
        });
      }
      if (this.fraseUsuarioInput) {
        this.fraseUsuarioInput.addEventListener("keypress", (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            const frase = this.fraseUsuarioInput.value;
            if (frase.trim()) {
              this.atualizarResposta(frase);
              this.fraseUsuarioInput.value = "";
            }
          }
        });
      }
      const botoesFrasePronta = document.querySelectorAll(".btn-frase-pronta");
      botoesFrasePronta.forEach((botao) => {
        botao.addEventListener("click", () => {
          const frase = botao.getAttribute("data-frase");
          if (frase) {
            if (this.fraseUsuarioInput) this.fraseUsuarioInput.value = frase;
            this.atualizarResposta(frase);
            if (this.fraseUsuarioInput) this.fraseUsuarioInput.value = "";
          }
        });
      });
    }
  }

  // ============================================================
  // 10. DOWNLOAD DO ARQUIVO .py (AULAS 1-10)
  // ============================================================

  function getCodigoPythonDaPagina() {
    let elementoCodigo = document.getElementById("codigoPythonCompleto");
    if (!elementoCodigo)
      elementoCodigo = document.querySelector(".code-block-full code");
    if (!elementoCodigo) elementoCodigo = document.querySelector("pre code");
    if (elementoCodigo) return elementoCodigo.textContent;
    return `# Código Python do Robô Fofoqueiro\nprint("🤖 Robô Fofoqueiro - Código padrão")`;
  }

  function getNomeArquivoPorPagina() {
    const paginaAtual = obterPaginaAtual();
    const nomesArquivos = {
      aula_01: "robo_fofoqueiro_setup.py",
      aula_02: "robo_fofoqueiro_sensor_som.py",
      aula_03: "robo_fofoqueiro_fala.py",
      aula_04: "robo_fofoqueiro_visao.py",
      aula_05: "robo_fofoqueiro_ia_generativa.py",
      aula_06: "robo_fofoqueiro_hardware.py",
      aula_07: "robo_fofoqueiro_mapa_inferno.py",
      aula_08: "robo_fofoqueiro_completo.py",
      aula_09: "roteiro_manifesto_robo_fofoqueiro.txt",
      aula_10: "robo_fofoqueiro_offline.py",
      aula_11: "material_complementar_robo_fofoqueiro.txt",
    };
    return nomesArquivos[paginaAtual] || "robo_fofoqueiro_codigo.py";
  }

  function downloadPythonScript(botaoClicado) {
    const codigoPython = getCodigoPythonDaPagina();
    const nomeArquivo = getNomeArquivoPorPagina();
    downloadArquivo(codigoPython, nomeArquivo);
    const botoes = document.querySelectorAll("#btnDownloadPyLateral");
    botoes.forEach((btn) => {
      if (btn) {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="bi bi-check-lg"></i> Baixado! Vixi!';
        setTimeout(() => {
          if (btn) btn.innerHTML = originalText;
        }, 2000);
      }
    });
    exibirMensagemRobo(
      "success",
      "Arquivo baixado com sucesso! Vixi, bora produzir! 💻",
      2000,
      botaoClicado,
    );
  }

  function inicializarDownloadPython() {
    const botoesDownload = document.querySelectorAll("#btnDownloadPyLateral");
    botoesDownload.forEach((btn) => {
      if (btn)
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          downloadPythonScript(btn);
        });
    });
  }

  // ============================================================
  // 10.5. DOWNLOAD DE ROTEIRO E MANIFESTO (AULA 9)
  // ============================================================

  function inicializarDownloadRoteiroManifesto() {
    const btnDownloadRoteiro = document.getElementById("btnDownloadRoteiro");
    const btnDownloadManifesto = document.getElementById(
      "btnDownloadManifesto",
    );
    if (btnDownloadRoteiro) {
      btnDownloadRoteiro.addEventListener("click", () => {
        const roteiroConteudo = `ROTEIRO PARA VÍDEO - ROBÔ FOFOQUEIRO DA ACESSIBILIDADE

🎬 CENA 1: ABERTURA (0:00 - 0:20)
- Animação do robô aparecendo
- Aluno: "Égua, piá! Cês tão vendo esse trem aqui? É o Robô Fofoqueiro da Acessibilidade!"
- Corte mostrando o menu do programa

🎬 CENA 2: O PROBLEMA (0:20 - 0:50)
- Aluno: "Mas ó o trem... como a tecnologia pode ajudar quem tem dificuldade de ouvir?"
- Mostrar exemplo de barulho alto na escola
- Transição para o robô com LED vermelho

🎬 CENA 3: DEMONSTRAÇÃO DO ROBÔ (0:50 - 1:30)
- Sensor de som: palmas → alerta "🚨 PASSOU DOS 75 dB!"
- Display e LED vermelho piscando
- Reconhecimento de fala: "Robô, me conta uma fofoca"
- Visão computacional: contagem de dedos e QR code

🎬 CENA 4: MANIFESTO DO ROBÔ (1:30 - 2:10)
1️⃣ Acessibilidade não é favor, é direito.
2️⃣ Tecnologia inclusiva pode ser divertida.
3️⃣ Dados não são fofoca — são ferramentas de transformação.
4️⃣ Inteligência Artificial deve servir a todos, não só a alguns.
5️⃣ Escola inclusiva se faz com criatividade e protagonismo.
6️⃣ Robô Fofoqueiro: informação com responsa e coração!

🎬 CENA 5: ENCERRAMENTO E CRÉDITOS (2:10 - 2:30)
- Aluno: "Quer ver o robô funcionando? O código tá no Colab, é aberto pra todo mundo!"
- Créditos: nomes dos alunos, tutora, escola, ano

📝 CRÉDITOS:
Projeto: Robô Fofoqueiro da Acessibilidade
Tutora: Gisele Nunes
Disciplinas: Matemática, Ciências, Linguagens, Pensamento Computacional
Ano: 2026
"Acessibilidade digital é compromisso de todos!"`;
        downloadArquivo(roteiroConteudo, "roteiro_video_robo_fofoqueiro.txt");
        alternarTextoBotao(
          btnDownloadRoteiro,
          '<i class="bi bi-file-earmark-text-fill"></i> Baixar Roteiro',
          '<i class="bi bi-check-lg"></i> Roteiro baixado!',
          2000,
        );
        exibirMensagemRobo(
          "success",
          "Roteiro baixado! Bora gravar, piá! 🎬",
          2000,
          btnDownloadRoteiro,
        );
      });
    }
    if (btnDownloadManifesto) {
      btnDownloadManifesto.addEventListener("click", () => {
        const manifestoConteudo = `MANIFESTO DO ROBÔ FOFOQUEIRO

📜 Nosso compromisso com a acessibilidade e a ética digital:

1️⃣ Acessibilidade não é favor, é direito.
2️⃣ Tecnologia inclusiva pode ser divertida.
3️⃣ Dados não são fofoca — são ferramentas de transformação.
4️⃣ Inteligência Artificial deve servir a todos, não só a alguns.
5️⃣ Escola inclusiva se faz com criatividade e protagonismo.
6️⃣ Robô Fofoqueiro: informação com responsa e coração!

---
Projeto desenvolvido por estudantes sob orientação da Tutora Gisele Nunes
Ano: 2026
"Acessibilidade digital é compromisso de todos!"`;
        downloadArquivo(manifestoConteudo, "manifesto_robo_fofoqueiro.txt");
        alternarTextoBotao(
          btnDownloadManifesto,
          '<i class="bi bi-megaphone-fill"></i> Baixar Manifesto',
          '<i class="bi bi-check-lg"></i> Manifesto baixado!',
          2000,
        );
        exibirMensagemRobo(
          "success",
          "Manifesto baixado! Espalhe essa ideia, piá! 📜",
          2000,
          btnDownloadManifesto,
        );
      });
    }
  }

  // ============================================================
  // 11. CHECKLIST INTERATIVO
  // ============================================================

  class ChecklistInterativo {
    constructor() {
      this.progressBar = document.getElementById("progressChecklist");
      this.botaoSimular = document.getElementById("simularProgresso");
      this.audioContext = null;
    }

    tocarBeep() {
      try {
        if (!this.audioContext)
          this.audioContext = new (
            window.AudioContext || window.webkitAudioContext
          )();
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        oscillator.frequency.value = 880;
        gainNode.gain.value = 0.1;
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(
          0.00001,
          this.audioContext.currentTime + 0.3,
        );
        oscillator.stop(this.audioContext.currentTime + 0.3);
      } catch (e) {
        console.log("Web Audio API não suportada");
      }
    }

    atualizarProgresso() {
      const itens = document.querySelectorAll(".checklist-personalizado li");
      let marcados = 0;
      itens.forEach((item) => {
        const icone = item.querySelector("i");
        if (icone && icone.classList.contains("bi-check-square-fill"))
          marcados++;
      });
      const percentual = (marcados / itens.length) * 100;
      if (this.progressBar) this.progressBar.style.width = percentual + "%";
      if (
        percentual === 100 &&
        !document.querySelector(".toast-sucesso-checklist")
      ) {
        const msg = document.createElement("div");
        msg.className = "alert alert-success mt-3 toast-sucesso-checklist";
        msg.innerHTML =
          '<i class="bi bi-trophy-fill"></i> 🎉 PARABÉNS! Checklist completo!';
        const container = document.querySelector(
          "#conteudoChecklist .card-body",
        );
        if (container) container.appendChild(msg);
        setTimeout(() => msg.remove(), 4000);
        this.tocarBeep();
      }
    }

    marcarChecklist(completo = true) {
      const itens = document.querySelectorAll(".checklist-personalizado li");
      itens.forEach((item) => {
        const icone = item.querySelector("i");
        if (icone)
          icone.className = completo
            ? "bi bi-check-square-fill text-success"
            : "bi bi-square";
      });
      this.atualizarProgresso();
      if (completo) this.tocarBeep();
    }

    init() {
      const itensChecklist = document.querySelectorAll(
        ".checklist-personalizado li",
      );
      itensChecklist.forEach((item) => {
        item.style.cursor = "pointer";
        item.setAttribute("role", "checkbox");
        item.setAttribute("aria-checked", "false");
        item.addEventListener("click", () => {
          const icone = item.querySelector("i");
          if (icone.classList.contains("bi-square")) {
            icone.className = "bi bi-check-square-fill text-success";
            item.setAttribute("aria-checked", "true");
            this.tocarBeep();
          } else {
            icone.className = "bi bi-square";
            item.setAttribute("aria-checked", "false");
          }
          this.atualizarProgresso();
        });
      });
      if (this.botaoSimular)
        this.botaoSimular.addEventListener("click", () => {
          this.marcarChecklist(true);
          animarElemento(this.botaoSimular, "escala-pulse", 150);
        });
      if (document.querySelector(".checklist-personalizado"))
        this.marcarChecklist(false);
    }
  }

  // ============================================================
  // 12. AUTOAVALIAÇÃO (AULA 9)
  // ============================================================

  function inicializarAutoavaliacao() {
    const btnSalvar = document.getElementById("salvarAutoavaliacao");
    if (!btnSalvar) return;
    btnSalvar.addEventListener("click", () => {
      const notas = document.querySelectorAll(".autoavalia-nota");
      let soma = 0,
        count = 0,
        todasPreenchidas = true;
      notas.forEach((input) => {
        const valor = parseInt(input.value);
        if (isNaN(valor)) todasPreenchidas = false;
        else {
          soma += valor;
          count++;
        }
      });
      if (!todasPreenchidas || count === 0) {
        exibirMensagemRobo(
          "warning",
          "Vixi, piá! Preencha todas as notas (0-10) antes de salvar!",
          3000,
          btnSalvar,
        );
        return;
      }
      const media = (soma / count).toFixed(1);
      const resultadoDiv = document.getElementById("resultadoAutoavaliacao");
      if (resultadoDiv) {
        resultadoDiv.innerHTML = `<i class="bi bi-check-circle-fill text-success"></i><strong>Autoavaliação salva!</strong><br>Média do grupo: ${media}/10<br>${media >= 7 ? "🎉 Parabéns, grupo! O vídeo ficou bagulho doido!" : "😅 Bora caprichar mais na próxima, piá!"}`;
        resultadoDiv.classList.add("show");
        setTimeout(() => resultadoDiv.classList.remove("show"), 5000);
      }
      exibirMensagemRobo(
        "success",
        `Autoavaliação salva! Média: ${media}/10. ${media >= 7 ? "🎉 Parabéns!" : "💪 Bora melhorar!"}`,
        3000,
        btnSalvar,
      );
    });
  }

  // ============================================================
  // 13. GERADOR DE ROTEIRO PERSONALIZADO (AULA 9)
  // ============================================================

  function inicializarGeradorRoteiro() {
    const btnGerar = document.getElementById("btnGerarRoteiroPersonalizado");
    const btnCopiar = document.getElementById("btnCopiarRoteiro");
    const container = document.getElementById("roteiroGeradoContainer");
    const roteiroDiv = document.getElementById("roteiroGerado");
    if (!btnGerar) return;
    btnGerar.addEventListener("click", () => {
      const escola =
        document.getElementById("escolaNome")?.value || "Escola Estadual";
      const integrantes =
        document.getElementById("integrantesNomes")?.value ||
        "Equipe Robô Fofoqueiro";
      const titulo =
        document.getElementById("tituloVideo")?.value ||
        "Robô Fofoqueiro da Acessibilidade";
      const linkColab = document.getElementById("linkColab")?.value || "";
      const falaAbertura =
        document.getElementById("falaAbertura")?.value || "Aluno 1";
      const falaSensor =
        document.getElementById("falaSensor")?.value || "Aluno 2";
      const falaFala = document.getElementById("falaFala")?.value || "Aluno 3";
      const falaIA = document.getElementById("falaIA")?.value || "Aluno 4";
      const falaEncerramento =
        document.getElementById("falaEncerramento")?.value || "Aluno 5";
      const dataAtual = new Date().toLocaleDateString("pt-BR");
      const roteiro = `========================================
ROTEIRO PERSONALIZADO - ${titulo.toUpperCase()}
========================================

📋 INFORMAÇÕES GERAIS
- Escola: ${escola}
- Integrantes: ${integrantes}
- Data: ${dataAtual}
- Duração alvo: 2min30s
- Formato: Paisagem (16:9)

========================================
🎬 CENA 1: ABERTURA (0:00 - 0:20)
========================================
🎤 Quem fala: ${falaAbertura}
📝 Fala: "Égua, piá! Cês tão vendo esse trem aqui? É o Robô Fofoqueiro da Acessibilidade! Ele ouve, fala, enxerga, pisca e ainda faz mapa do barulho. Bagulho doido, vixi!"

========================================
🎬 CENA 2: O PROBLEMA (0:20 - 0:50)
========================================
🎤 Quem fala: ${falaSensor}
📝 Fala: "Mas ó o trem... a gente pensou: como a tecnologia pode ajudar quem tem dificuldade de ouvir? A escola é um inferno acústico, piá! Gritaria no intervalo, corredor barulhento..."

========================================
🎬 CENA 3: DEMONSTRAÇÃO DO ROBÔ (0:50 - 1:30)
========================================
🎤 Quem fala: ${falaFala}
📝 Fala: "Olha só! Quando o barulho passa de 75 decibéis, o robô acende um LED vermelho e mostra mensagem no display. Pra quem não ouve, isso ajuda muito! Posso falar com ele também: 'Robô, me conta uma fofoca'... Ele responde com gírias paranaenses!"

========================================
🎬 CENA 4: MANIFESTO DO ROBÔ (1:30 - 2:10)
========================================
🎤 Quem fala: ${falaIA}
📝 Fala: "A gente também usou IA pra dar personalidade pra ele. Mas com responsa: o manifesto do robô diz que tecnologia inclusiva pode ser divertida, mas nunca pode excluir ninguém."

📜 MANIFESTO (6 frases para aparecer na tela):
1️⃣ "Acessibilidade não é favor, é direito."
2️⃣ "Tecnologia inclusiva pode ser divertida."
3️⃣ "Dados não são fofoca — são ferramentas de transformação."
4️⃣ "Inteligência Artificial deve servir a todos, não só a alguns."
5️⃣ "Escola inclusiva se faz com criatividade e protagonismo."
6️⃣ "Robô Fofoqueiro: informação com responsa e coração!"

========================================
🎬 CENA 5: ENCERRAMENTO E CRÉDITOS (2:10 - 2:30)
========================================
🎤 Quem fala: ${falaEncerramento}
📝 Fala: "Quer ver o robô funcionando? O código tá no Colab, é aberto pra todo mundo! Até a próxima, piá! Não esquece: acessibilidade é coisa séria... mas a gente pode resolver com um sorriso no rosto!"

========================================
📝 CRÉDITOS FINAIS
========================================
Projeto: ${titulo}
Alunos: ${integrantes}
Tutora: Gisele Nunes
Disciplinas: Matemática, Ciências, Linguagens, Pensamento Computacional
Ano: ${dataAtual.split("/")[2]}
${linkColab ? `🔗 Código: ${linkColab}` : "🔗 Código aberto no Google Colab"}

"Acessibilidade digital é compromisso de todos!"

========================================
✅ CHECKLIST DE PRODUÇÃO
========================================
☐ Roteiro revisado
☐ Gravação em paisagem (16:9)
☐ Legendas acessíveis adicionadas
☐ Manifesto incluído no vídeo
☐ Créditos finais com nomes do grupo
☐ Duração entre 2 e 3 minutos
`;
      if (roteiroDiv) roteiroDiv.textContent = roteiro;
      if (container) {
        container.style.display = "block";
        container.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
      exibirMensagemRobo(
        "success",
        "Roteiro gerado! Copie e cole no seu editor preferido, piá! 🎬",
        3000,
        btnGerar,
      );
    });
    if (btnCopiar) {
      btnCopiar.addEventListener("click", () => {
        if (roteiroDiv && roteiroDiv.textContent) {
          navigator.clipboard.writeText(roteiroDiv.textContent);
          exibirMensagemRobo(
            "success",
            "Roteiro copiado para a área de transferência! 📋",
            2000,
            btnCopiar,
          );
          alternarTextoBotao(
            btnCopiar,
            '<i class="bi bi-copy"></i> Copiar',
            '<i class="bi bi-check-lg"></i> Copiado!',
            1500,
          );
        }
      });
    }
  }

  // ============================================================
  // 14. CHAMADA INTERATIVA
  // ============================================================

  function inicializarChamadaInterativa() {
    const botaoChamada = document.getElementById("simularChamada");
    if (botaoChamada) {
      botaoChamada.addEventListener("click", () => {
        const paginaAtual = obterPaginaAtual();
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
        let aulaTexto = "";
        switch (paginaAtual) {
          case "aula_01":
            aulaTexto = "SETUP DO AMBIENTE";
            break;
          case "aula_02":
            aulaTexto = "SENSOR DE SOM";
            break;
          case "aula_03":
            aulaTexto = "RECONHECIMENTO DE FALA";
            break;
          case "aula_04":
            aulaTexto = "VISÃO COMPUTACIONAL";
            break;
          case "aula_05":
            aulaTexto = "IA GENERATIVA";
            break;
          case "aula_06":
            aulaTexto = "DISPLAY LCD E LEDs";
            break;
          case "aula_07":
            aulaTexto = "MAPA DO INFERNO ACÚSTICO";
            break;
          case "aula_08":
            aulaTexto = "PROTÓTIPO COMPLETO INTEGRADO";
            break;
          case "aula_09":
            aulaTexto = "MANIFESTO E VÍDEO";
            break;
          case "aula_10":
            aulaTexto = "VERSÃO OFFLINE COMPLETA";
            break;
          case "aula_11":
            aulaTexto = "MATERIAL COMPLEMENTAR";
            break;
          default:
            aulaTexto = "ROBÔ FOFOQUEIRO";
        }
        alert(
          `📢 CHAMADA - AULA ${aulaTexto}:\nPresentes: ${alunosPresentes.join(", ")}\n✅ Total: ${alunosPresentes.length} alunos`,
        );
        alternarTextoBotao(
          botaoChamada,
          '<i class="bi bi-mic"></i> Chamada interativa',
          '<i class="bi bi-check-circle"></i> Chamada registrada!',
          2000,
        );
      });
    }
  }

  // ============================================================
  // 15. EXPORTAR DICAS
  // ============================================================

  function inicializarExportarDicas() {
    const btnExportarDicas = document.getElementById("btnExportarDicas");
    if (!btnExportarDicas) return;
    btnExportarDicas.addEventListener("click", () => {
      const paginaAtual = obterPaginaAtual();
      const dicas = DICAS_POR_PAGINA[paginaAtual] || DICAS_POR_PAGINA.aula_11;
      downloadArquivo(dicas.conteudo, dicas.arquivo);
      alternarTextoBotao(
        btnExportarDicas,
        '<i class="bi bi-download"></i> Exportar dicas',
        '<i class="bi bi-check-lg"></i> Dicas exportadas!',
        2000,
      );
    });
  }

  // ============================================================
  // 16. EXPORTAR PROJETO (INDEX)
  // ============================================================

  function inicializarExportarProjeto() {
    const btnExportarProjeto = document.getElementById("btnExportarProjeto");
    if (!btnExportarProjeto) return;
    btnExportarProjeto.addEventListener("click", () => {
      const infoProjeto = `PROJETO ROBÔ FOFOQUEIRO - VERSÃO COMPLETA

📋 RESUMO DO PROJETO:
- Nome: Robô Fofoqueiro da Acessibilidade
- Objetivo: Criar assistente robótico para acessibilidade
- Tecnologias: Python, Google Colab, IA, OpenCV
- Duração: 11 aulas (1000+ minutos)
- Público: Ensino Médio - Escolas Públicas do Paraná

📚 MÓDULOS DO PROJETO:
1. Setup do ambiente (Colab)
2. Sensor de som irreverente
3. Reconhecimento de fala
4. Visão computacional
5. IA generativa com personalidade
6. Display e LEDs
7. Mapa do Inferno Acústico
8. Protótipo completo integrado
9. Manifesto e Vídeo de divulgação
10. Versão Offline Completa (Vosk + Markov + PyInstaller)
11. Material Complementar (BNCC x RCP + Avaliação Final)

🎯 BNCC: EM13LGG101, EM13LGG304, EM13LP16, EM13MAT405, EM13MAT503, EM13CNT101, EM13CNT104, EM13LGG702, EM13CNT102, EM13CNT303, EM13CNT206

👥 Equipe: Estudantes de Programação sob orientação da Tutora Gisele Nunes

🐘 Desenvolvido com 💙 para a acessibilidade!`;
      downloadArquivo(infoProjeto, "resumo_projeto_robo_fofoqueiro.txt");
      alternarTextoBotao(
        btnExportarProjeto,
        '<i class="bi bi-file-earmark-text-fill"></i> Exportar resumo',
        '<i class="bi bi-check-lg"></i> Exportado!',
        2000,
      );
    });
  }

  // ============================================================
  // 17. SIMULADOR DE QR CODE (AULA 4)
  // ============================================================

  class SimuladorQRCode {
    constructor() {
      this.textoQRCodeInput = document.getElementById("textoQRCode");
      this.btnGerarQRCode = document.getElementById("btnGerarQRCode");
      this.btnBaixarQRCode = document.getElementById("btnBaixarQRCode");
      this.qrCodeDisplay = document.getElementById("qrCodeDisplay");
      this.qrCodeImageUrl = null;
    }

    gerarQRCode(texto, botaoClicado) {
      if (!texto || texto.trim() === "") {
        exibirMensagemRobo(
          "warning",
          "Vixi, piá! Digita alguma coisa pra gerar o QR code, tchê!",
          3000,
          botaoClicado,
        );
        return;
      }
      const textoCodificado = encodeURIComponent(texto);
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${textoCodificado}`;
      if (this.qrCodeDisplay) {
        this.qrCodeDisplay.innerHTML = `<img src="${qrUrl}" alt="QR Code gerado para: ${texto}" class="img-fluid" style="max-width: 200px; border-radius: 12px;"><p class="mt-2 small text-muted">📱 Escaneie com seu celular!</p>`;
        this.qrCodeImageUrl = qrUrl;
        if (this.btnBaixarQRCode) this.btnBaixarQRCode.disabled = false;
        exibirMensagemRobo(
          "success",
          "QR Code gerado, piá! Escaneia aí pra espalhar a fofoca!",
          3000,
          botaoClicado,
        );
      }
    }

    baixarQRCode(botaoClicado) {
      if (!this.qrCodeImageUrl) {
        exibirMensagemRobo(
          "warning",
          "Égua, não tem QR code pra baixar! Gera um primeiro, piá!",
          3000,
          botaoClicado,
        );
        return;
      }
      const link = document.createElement("a");
      link.href = this.qrCodeImageUrl;
      link.download = `qr_code_robo_fofoqueiro_${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      exibirMensagemRobo(
        "success",
        "QR Code baixado! Vixi, agora tu pode espalhar a fofoca por aí, tchê!",
        3000,
        botaoClicado,
      );
    }

    init() {
      if (!this.btnGerarQRCode || !this.textoQRCodeInput) return false;
      this.btnGerarQRCode.addEventListener("click", () => {
        const texto = this.textoQRCodeInput.value.trim();
        this.gerarQRCode(texto, this.btnGerarQRCode);
      });
      this.textoQRCodeInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          const texto = this.textoQRCodeInput.value.trim();
          this.gerarQRCode(texto, this.textoQRCodeInput);
        }
      });
      if (this.btnBaixarQRCode)
        this.btnBaixarQRCode.addEventListener("click", () =>
          this.baixarQRCode(this.btnBaixarQRCode),
        );
      const botoesQRPronto = document.querySelectorAll(".btn-qr-pronto");
      botoesQRPronto.forEach((botao) => {
        botao.addEventListener("click", () => {
          const texto = botao.getAttribute("data-texto");
          if (texto && this.textoQRCodeInput) {
            this.textoQRCodeInput.value = texto;
            this.gerarQRCode(texto, botao);
            alternarTextoBotao(
              botao,
              botao.innerHTML,
              '<i class="bi bi-check-lg"></i> Selecionado!',
              1000,
            );
          }
        });
      });
      return true;
    }
  }

  // ============================================================
  // 18. SIMULADOR DE DETECÇÃO DE MÃOS (AULA 4)
  // ============================================================

  function inicializarSimuladorMaos() {
    const btnSimularMao = document.getElementById("simularMao");
    const resultadoMao = document.getElementById("resultadoMao");
    if (!btnSimularMao || !resultadoMao) return;
    const simulacoes = [
      {
        dedos: 0,
        nome: "✊ Punho fechado",
        mensagem: "Nenhum dedo levantado! Tá com raiva, piá?",
      },
      {
        dedos: 1,
        nome: "☝️ Dedo indicador",
        mensagem: "1 dedo! Tá apontando pra alguém, guria?",
      },
      {
        dedos: 2,
        nome: "✌️ Vitória",
        mensagem: "2 dedos! VIXI, é ou não é bagulho doido?",
      },
      {
        dedos: 3,
        nome: "🤟 Três dedos",
        mensagem: "3 dedos! Rock and roll, tchê! 🤘",
      },
      {
        dedos: 4,
        nome: "🤙 Hang loose",
        mensagem: "4 dedos! ÊÊÊGUA, tá descolado, piá!",
      },
      {
        dedos: 5,
        nome: "🖐️ Mão aberta",
        mensagem: "5 dedos! Tchau pra fofoca, guria! 👋",
      },
    ];
    btnSimularMao.addEventListener("click", () => {
      const aleatorio = Math.floor(Math.random() * simulacoes.length);
      const simulacao = simulacoes[aleatorio];
      resultadoMao.innerHTML = `<div class="text-center p-3 mao-detetada"><div class="display-1 mb-2">${simulacao.nome}</div><div class="fs-1 mb-2">${"🖐️".repeat(Math.min(simulacao.dedos, 5))}</div><h3 class="text-success">✋ ${simulacao.dedos} dedo${simulacao.dedos !== 1 ? "s" : ""} detectado${simulacao.dedos !== 1 ? "s" : ""}!</h3><p class="mt-3"><i class="bi bi-robot"></i> <strong>Robô Fofoqueiro:</strong> "${simulacao.mensagem}"</p></div>`;
      alternarTextoBotao(
        btnSimularMao,
        '<i class="bi bi-hand-index-thumb"></i> Simular detecção de mão',
        '<i class="bi bi-hand-index-thumb"></i> Mão detectada!',
        1500,
      );
    });
  }

  // ============================================================
  // 19. SIMULADOR INTEGRADO (AULA 8)
  // ============================================================

  class SimuladorIntegrado {
    constructor() {
      this.botoesModulo = document.querySelectorAll(".btn-modulo");
      this.btnModoAutomatico = document.getElementById("btnModoAutomatico");
      this.saidaRobo = document.getElementById("saidaRobo");
      this.iaInputContainer = document.getElementById("iaInputContainer");
      this.frasesIaContainer = document.getElementById("frasesIaContainer");
      this.falaInputContainer = document.getElementById("falaInputContainer");
      this.perguntaIaSimulador = document.getElementById("perguntaIaSimulador");
      this.btnEnviarPerguntaSimulador = document.getElementById(
        "btnEnviarPerguntaSimulador",
      );
      this.fraseFalaSimulador = document.getElementById("fraseFalaSimulador");
      this.btnEnviarFalaSimulador = document.getElementById(
        "btnEnviarFalaSimulador",
      );
      this.botoesFraseIaSim = document.querySelectorAll(".btn-frase-ia-sim");
      this.girias = [
        "vixi",
        "égua",
        "piá",
        "guria",
        "bagulho doido",
        "ó o trem",
        "tchê",
        "meu consagrado",
        "bah",
      ];
    }

    adicionarSaida(texto, tipo = "info") {
      if (!this.saidaRobo) return;
      let corClasse = "";
      switch (tipo) {
        case "success":
          corClasse = "text-success";
          break;
        case "warning":
          corClasse = "text-warning";
          break;
        case "error":
          corClasse = "text-danger";
          break;
        default:
          corClasse = "text-info";
      }
      const linha = document.createElement("div");
      linha.className = `mb-2 ${corClasse} simulador-integrado-mensagem`;
      linha.innerHTML = texto;
      this.saidaRobo.appendChild(linha);
      this.saidaRobo.scrollTop = this.saidaRobo.scrollHeight;
      while (this.saidaRobo.children.length > 50)
        this.saidaRobo.removeChild(this.saidaRobo.firstChild);
    }

    limparSaida() {
      if (this.saidaRobo) this.saidaRobo.innerHTML = "";
    }
    esconderInputs() {
      if (this.iaInputContainer) this.iaInputContainer.style.display = "none";
      if (this.frasesIaContainer) this.frasesIaContainer.style.display = "none";
      if (this.falaInputContainer)
        this.falaInputContainer.style.display = "none";
    }

    sensorSom() {
      this.esconderInputs();
      this.limparSaida();
      this.adicionarSaida("🔊 INICIANDO SENSOR DE SOM...", "info");
      const niveis = [25, 45, 65, 85, 95];
      const aleatorio = niveis[Math.floor(Math.random() * niveis.length)];
      setTimeout(() => {
        this.adicionarSaida(`🎤 Nível de barulho: ${aleatorio} dB`, "success");
        if (aleatorio > 75)
          this.adicionarSaida(
            "🚨 INFERNO ACÚSTICO! TÁ MUITO ALTO, PIÁ!",
            "warning",
          );
        else if (aleatorio > 50)
          this.adicionarSaida("⚠️ TÁ FICANDO BARULHENTO, ATENÇÃO!", "warning");
        else
          this.adicionarSaida("🤫 Silêncio absoluto... até assusta!", "info");
        this.adicionarSaida("✅ Sensor finalizado!", "success");
      }, 500);
    }

    reconhecimentoFala() {
      this.esconderInputs();
      if (this.falaInputContainer)
        this.falaInputContainer.style.display = "block";
      if (this.saidaRobo) {
        this.saidaRobo.innerHTML =
          '<div class="text-info mb-2">🗣️ RECONHECIMENTO DE FALA</div>';
        this.adicionarSaida(
          "Digite uma frase no campo abaixo para simular o reconhecimento de fala!",
          "info",
        );
      }
    }

    processarFala() {
      if (!this.fraseFalaSimulador) return;
      const frase = this.fraseFalaSimulador.value.trim();
      if (frase === "") {
        this.adicionarSaida("❌ Digite uma frase primeiro, piá!", "error");
        return;
      }
      this.adicionarSaida(`👂 Você disse: "${frase}"`, "success");
      const respostas = [
        `Vixi, você falou "${frase}"! Que bagulho doido, piá!`,
        `Égua, anotado: "${frase}". Tô de olho, guria! 👀`,
        `Ó o trem, "${frase}"! Isso vai render altas fofocas! 🍿`,
        `Tchê, "${frase}" é coisa séria! Bora codar mais um pouco! 🤖`,
      ];
      const respostaAleatoria =
        respostas[Math.floor(Math.random() * respostas.length)];
      setTimeout(() => {
        this.adicionarSaida(
          `🤖 Robô Fofoqueiro: "${respostaAleatoria}"`,
          "success",
        );
        if (this.fraseFalaSimulador) this.fraseFalaSimulador.value = "";
      }, 500);
    }

    visaoComputacional() {
      this.esconderInputs();
      this.limparSaida();
      this.adicionarSaida("👁️ INICIANDO VISÃO COMPUTACIONAL...", "info");
      const dedos = Math.floor(Math.random() * 6);
      const mensagensDedos = {
        0: "✊ Nenhum dedo! Tá com raiva, piá?",
        1: "☝️ 1 dedo! Tá apontando pra alguém?",
        2: "✌️ 2 dedos! Vitória, é ou não é bagulho doido?",
        3: "🤟 3 dedos! Rock and roll, tchê!",
        4: "🤙 4 dedos! Hang loose, descolado!",
        5: "🖐️ 5 dedos! Tchau pra fofoca, guria!",
      };
      const qrs = [
        "Curitiba é a capital da Russia brasileira kkk",
        "https://projetosgn.com.br/acessibilidade",
        "Vixi, o Robô Fofoqueiro é bagulho doido!",
        "Acessibilidade com humor é possível!",
      ];
      const qrAleatorio = qrs[Math.floor(Math.random() * qrs.length)];
      setTimeout(() => {
        this.adicionarSaida(
          `🤚 Mão detectada: ${mensagensDedos[dedos]}`,
          "success",
        );
        this.adicionarSaida(`📱 QR Code lido: "${qrAleatorio}"`, "success");
        this.adicionarSaida("✅ Visão computacional finalizada!", "success");
      }, 800);
    }

    iaGenerativa() {
      this.esconderInputs();
      if (this.iaInputContainer) this.iaInputContainer.style.display = "block";
      if (this.frasesIaContainer)
        this.frasesIaContainer.style.display = "block";
      if (this.saidaRobo) {
        this.saidaRobo.innerHTML =
          '<div class="text-info mb-2">🧠 IA GENERATIVA</div>';
        this.adicionarSaida(
          "Digite sua pergunta para o robô inteligente!",
          "info",
        );
      }
    }

    processarIa() {
      if (!this.perguntaIaSimulador) return;
      const pergunta = this.perguntaIaSimulador.value.trim();
      if (pergunta === "") {
        this.adicionarSaida("❌ Digite uma pergunta primeiro, piá!", "error");
        return;
      }
      this.adicionarSaida(`🧑 Você perguntou: "${pergunta}"`, "info");
      const respostas = [
        `Vixi, ${pergunta} é bagulho doido, piá! Acessibilidade digital é fazer site funcionar pra todo mundo: contraste bom, áudio descrição, Libras... ó o trem! ♿`,
        `Égua, ${pergunta}! Sou o Robô Fofoqueiro da Acessibilidade, prazer em conhecê, tchê! 🤖`,
        `Ó o trem, guria! ${pergunta} é importante demais. Bora codar e espalhar acessibilidade por aí! 🌐`,
        `Tchê, ${pergunta}! Isso me lembrou que acessibilidade não precisa ser sem graça - pode ter meme e humor sim! 🎭`,
      ];
      const respostaAleatoria =
        respostas[Math.floor(Math.random() * respostas.length)] +
        ` ${this.girias[Math.floor(Math.random() * this.girias.length)]}!`;
      setTimeout(() => {
        this.adicionarSaida(
          `🤖 Robô Fofoqueiro: "${respostaAleatoria}"`,
          "success",
        );
        if (this.perguntaIaSimulador) this.perguntaIaSimulador.value = "";
      }, 800);
    }

    displayLEDs() {
      this.esconderInputs();
      this.limparSaida();
      this.adicionarSaida("💡 INICIANDO DISPLAY E LEDS...", "info");
      const niveis = [25, 55, 80, 95];
      const aleatorio = niveis[Math.floor(Math.random() * niveis.length)];
      setTimeout(() => {
        this.adicionarSaida(
          `🔊 Nível de som simulado: ${aleatorio} dB`,
          "info",
        );
        if (aleatorio > 75) {
          this.adicionarSaida("┌────────────────┐", "warning");
          this.adicionarSaida("│   🚨 MUITO      │", "warning");
          this.adicionarSaida("│   ALTO! 🚨     │", "warning");
          this.adicionarSaida("└────────────────┘", "warning");
          this.adicionarSaida("🔴🔴🔴 LED VERMELHO PISCANDO! 🔴🔴🔴", "error");
        } else if (aleatorio > 50) {
          this.adicionarSaida("┌────────────────┐", "warning");
          this.adicionarSaida("│   ⚠️ FICANDO   │", "warning");
          this.adicionarSaida("│   ALTO ⚠️     │", "warning");
          this.adicionarSaida("└────────────────┘", "warning");
          this.adicionarSaida("🟡 LED AMARELO ACESO!", "warning");
        } else {
          this.adicionarSaida("┌────────────────┐", "success");
          this.adicionarSaida("│   🤫 SILÊNCIO  │", "success");
          this.adicionarSaida(`│   ${aleatorio} dB     │`, "success");
          this.adicionarSaida("└────────────────┘", "success");
          this.adicionarSaida("🟢 LED VERDE ACESO - Tudo calmo!", "success");
        }
        this.adicionarSaida("✅ Display e LEDs finalizados!", "success");
      }, 500);
    }

    mapaInferno() {
      this.esconderInputs();
      this.limparSaida();
      this.adicionarSaida("📊 GERANDO MAPA DO INFERNO ACÚSTICO...", "info");
      setTimeout(() => {
        this.adicionarSaida(
          "📈 Gráfico de linha gerado com sucesso!",
          "success",
        );
        this.adicionarSaida("🗺️ Heatmap do mapa escolar criado!", "success");
        this.adicionarSaida(
          "📁 Arquivos salvos: mapa_inferno_acustico.png",
          "info",
        );
        this.adicionarSaida("", "info");
        const horarios = ["08:00", "10:00", "12:00", "14:00", "16:00"];
        const valores = [45, 68, 92, 78, 52];
        this.adicionarSaida("📊 Dados das últimas medições:", "info");
        for (let i = 0; i < horarios.length; i++) {
          const classe = valores[i] > 75 ? "warning" : "success";
          this.adicionarSaida(`   ${horarios[i]} → ${valores[i]} dB`, classe);
        }
        this.adicionarSaida(
          "✅ Mapa do Inferno Acústico finalizado!",
          "success",
        );
      }, 800);
    }

    modoAutomatico() {
      this.esconderInputs();
      this.limparSaida();
      this.adicionarSaida(
        "🤖 INICIANDO MODO AUTOMÁTICO - Robô Fofoqueiro em Ação!",
        "success",
      );
      this.adicionarSaida("=".repeat(50), "info");
      const etapas = [
        {
          nome: "🔊 Sensor de Som",
          delay: 800,
          fn: () =>
            this.adicionarSaida(
              "   Nível: 78 dB - INFERNO ACÚSTICO!",
              "warning",
            ),
        },
        {
          nome: "💡 Display e LEDs",
          delay: 1600,
          fn: () =>
            this.adicionarSaida(
              "   🔴 LED VERMELHO PISCANDO! | Display: 🚨 SILÊNCIO!",
              "error",
            ),
        },
        {
          nome: "🗣️ Reconhecimento de Fala",
          delay: 2400,
          fn: () =>
            this.adicionarSaida(
              "   Usuário disse: 'Vixi, que legal!' | Robô respondeu com gíria!",
              "success",
            ),
        },
        {
          nome: "👁️ Visão Computacional",
          delay: 3200,
          fn: () =>
            this.adicionarSaida(
              "   Mão detectada: 2 dedos! | QR Code lido: Curitiba é a capital da Russia brasileira kkk ",
              "success",
            ),
        },
        {
          nome: "📊 Mapa do Inferno",
          delay: 4000,
          fn: () =>
            this.adicionarSaida(
              "   Gráfico gerado! Heatmap salvo como PNG.",
              "info",
            ),
        },
        {
          nome: "📝 Log da Sessão",
          delay: 4800,
          fn: () =>
            this.adicionarSaida(
              "   Log salvo em logs/sessao_automatica.json",
              "info",
            ),
        },
      ];
      etapas.forEach((etapa, index) => {
        setTimeout(() => {
          this.adicionarSaida(`\n📍 ${etapa.nome}`, "info");
          etapa.fn();
        }, etapa.delay);
      });
      setTimeout(() => {
        this.adicionarSaida("\n" + "=".repeat(50), "info");
        this.adicionarSaida(
          "✅ MODO AUTOMÁTICO CONCLUÍDO COM SUCESSO!",
          "success",
        );
        this.adicionarSaida(
          "🎉 Parabéns! O Robô Fofoqueiro está funcionando perfeitamente!",
          "success",
        );
      }, 5600);
    }

    init() {
      if (!this.botoesModulo.length) return false;
      this.botoesModulo.forEach((botao) => {
        botao.addEventListener("click", () => {
          const modulo = botao.getAttribute("data-modulo");
          switch (modulo) {
            case "som":
              this.sensorSom();
              break;
            case "fala":
              this.reconhecimentoFala();
              break;
            case "visao":
              this.visaoComputacional();
              break;
            case "ia":
              this.iaGenerativa();
              break;
            case "hardware":
              this.displayLEDs();
              break;
            case "mapa":
              this.mapaInferno();
              break;
            default:
              this.adicionarSaida("❌ Módulo não reconhecido!", "error");
          }
        });
      });
      if (this.btnModoAutomatico)
        this.btnModoAutomatico.addEventListener("click", () =>
          this.modoAutomatico(),
        );
      if (this.btnEnviarPerguntaSimulador) {
        this.btnEnviarPerguntaSimulador.addEventListener("click", () =>
          this.processarIa(),
        );
        if (this.perguntaIaSimulador)
          this.perguntaIaSimulador.addEventListener("keypress", (e) => {
            if (e.key === "Enter") this.processarIa();
          });
      }
      if (this.btnEnviarFalaSimulador) {
        this.btnEnviarFalaSimulador.addEventListener("click", () =>
          this.processarFala(),
        );
        if (this.fraseFalaSimulador)
          this.fraseFalaSimulador.addEventListener("keypress", (e) => {
            if (e.key === "Enter") this.processarFala();
          });
      }
      this.botoesFraseIaSim.forEach((botao) => {
        botao.addEventListener("click", () => {
          const pergunta = botao.getAttribute("data-pergunta");
          if (pergunta && this.perguntaIaSimulador) {
            this.perguntaIaSimulador.value = pergunta;
            this.processarIa();
          }
        });
      });
      this.adicionarSaida(
        "🤖 Robô Fofoqueiro pronto! Clique em um módulo para testar.",
        "success",
      );
      this.adicionarSaida(
        "🎯 Dica: Experimente o MODO AUTOMÁTICO para ver tudo funcionando!",
        "info",
      );
      return true;
    }
  }

  // ============================================================
  // 19.5. SIMULADOR OFFLINE (AULA 10)
  // ============================================================

  class SimuladorOffline {
    constructor() {
      this.btnGerarMarkov = document.getElementById("btnGerarMarkov");
      this.perguntaMarkov = document.getElementById("perguntaMarkov");
      this.respostaMarkov = document.getElementById("respostaMarkov");
      this.btnSimularVoz = document.getElementById("btnSimularVoz");
      this.resultadoVosk = document.getElementById("resultadoVosk");
      this.btnSimularPyInstaller = document.getElementById(
        "btnSimularPyInstaller",
      );
      this.resultadoPyInstaller = document.getElementById(
        "resultadoPyInstaller",
      );
      this.btnTestarTudo = document.getElementById("btnTestarTudo");
      this.resultadoTeste = document.getElementById("resultadoTeste");
      this.btnGerarTutorialSim = document.getElementById("btnGerarTutorialSim");
      this.girias = [
        "vixi",
        "égua",
        "piá",
        "guria",
        "bagulho doido",
        "ó o trem",
        "tchê",
        "bah",
      ];
      this.respostasMarkov = [
        "Vixi, {pergunta} é bagulho doido, piá! Acessibilidade digital é fazer site funcionar pra todo mundo: contraste bom, áudio descrição, Libras... ó o trem! ♿",
        "Égua, {pergunta}! Sou o Robô Fofoqueiro da Acessibilidade, prazer em conhecê, tchê! 🤖",
        "Ó o trem, guria! {pergunta} é importante demais. Bora codar e espalhar acessibilidade por aí! 🌐",
        "Tchê, {pergunta}! Isso me lembrou que acessibilidade não precisa ser sem graça - pode ter meme e humor sim! 🎭",
        "Piá, {pergunta} é coisa séria! Dados não são fofoca, são ferramentas de transformação! 📊",
        "Guria, {pergunta} me fez pensar: como a IA pode ajudar na inclusão? Bora debater isso na aula! 🧠",
        "Bah, {pergunta} é o tipo de coisa que o Robô Fofoqueiro adora! Vou até salvar no meu banco de fofocas! 📝",
      ];
    }

    gerarRespostaMarkov() {
      if (!this.perguntaMarkov || !this.respostaMarkov) return;
      const pergunta = this.perguntaMarkov.value.trim();
      if (pergunta === "") {
        this.respostaMarkov.innerHTML =
          '<i class="bi bi-robot"></i> Robô Fofoqueiro: "Vixi, piá! Digita alguma coisa aí pra eu responder!"';
        animarElemento(this.respostaMarkov, "resultado-atualizado", 300);
        return;
      }
      const respostaBase =
        this.respostasMarkov[
          Math.floor(Math.random() * this.respostasMarkov.length)
        ];
      const giriaAleatoria =
        this.girias[Math.floor(Math.random() * this.girias.length)];
      const resposta =
        respostaBase.replace("{pergunta}", pergunta) + ` ${giriaAleatoria}!`;
      this.respostaMarkov.innerHTML = `<i class="bi bi-robot"></i> Robô Fofoqueiro: "${resposta}"`;
      animarElemento(this.respostaMarkov, "resultado-atualizado", 300);
      exibirMensagemRobo(
        "success",
        "Resposta gerada pelo modelo Markov (offline)!",
        2000,
        this.btnGerarMarkov,
      );
    }

    simularVosk() {
      if (!this.resultadoVosk) return;
      const frasesExemplo = [
        "Vixi, que legal esse robô!",
        "Égua, tô aprendendo Python",
        "Piá, me ajuda com acessibilidade",
        "Guria, isso é bagulho doido!",
        "Ó o trem, funcionou offline!",
        "Tchê, bora codar mais um pouco",
      ];
      const fraseAleatoria =
        frasesExemplo[Math.floor(Math.random() * frasesExemplo.length)];
      this.resultadoVosk.innerHTML = `<i class="bi bi-mic-fill text-success"></i><strong>🎤 Reconhecimento simulado:</strong><br>"🎙️ ${fraseAleatoria}"<br><small class="text-muted">✅ Reconhecimento offline via Vosk (simulado)</small>`;
      animarElemento(this.resultadoVosk, "resultado-atualizado", 300);
      exibirMensagemRobo(
        "success",
        `Vosk reconheceu: "${fraseAleatoria}" (offline!)`,
        3000,
        this.btnSimularVoz,
      );
    }

    simularPyInstaller() {
      if (!this.resultadoPyInstaller) return;
      this.resultadoPyInstaller.innerHTML = `<i class="bi bi-box-seam-fill text-success"></i><strong>📦 Executável gerado com sucesso!</strong><br>✅ Arquivo: ./dist/RoboFofoqueiro.exe<br>✅ Tamanho: ~45 MB<br>✅ Pronto para rodar em qualquer Windows sem Python!<br><small class="text-muted">💡 Dica: Copie a pasta 'modelo_vosk' junto com o executável.</small>`;
      animarElemento(this.resultadoPyInstaller, "resultado-atualizado", 300);
      exibirMensagemRobo(
        "success",
        "Executável gerado! Agora o robô roda em qualquer PC, vixi!",
        3000,
        this.btnSimularPyInstaller,
      );
    }

    simularTesteTudo() {
      if (!this.resultadoTeste) return;
      this.resultadoTeste.innerHTML = `<i class="bi bi-check-circle-fill text-success"></i><strong>🧪 TESTA_TUDO.PY - RESULTADOS:</strong><br>✅ Teste 1: Vosk inicializado corretamente<br>✅ Teste 2: Markov funcionando!<br>✅ Teste 3: PyInstaller disponível<br>✅ Teste 4: Dependências offline OK<br><br>🎉 <strong>TODOS OS TESTES PASSARAM!</strong><br>O Robô Fofoqueiro está pronto para rodar OFFLINE!`;
      animarElemento(this.resultadoTeste, "resultado-atualizado", 300);
      exibirMensagemRobo(
        "success",
        "Testa_tudo.py: TODOS OS TESTES PASSARAM! 🎉",
        4000,
        this.btnTestarTudo,
      );
    }

    baixarTutorial() {
      const tutorialConteudo = `TUTORIAL DE INSTALAÇÃO - ROBÔ FOFOQUEIRO OFFLINE

====================================================================
PÁGINA 1: INTRODUÇÃO
====================================================================
O Robô Fofoqueiro é um assistente de acessibilidade que funciona
totalmente OFFLINE! Isso significa que você pode usá-lo em escolas
sem acesso à internet.

Requisitos:
- Windows 10/11, Linux ou macOS
- Python 3.8 ou superior
- Microfone (opcional, modo texto disponível)
- 500MB de espaço em disco (para o modelo Vosk)

====================================================================
PÁGINA 2: INSTALAÇÃO DAS DEPENDÊNCIAS
====================================================================

Passo 1: Instalar Python
- Acesse python.org
- Baixe Python 3.8+
- Marque "Add Python to PATH" durante a instalação

Passo 2: Instalar bibliotecas
Abra o terminal (CMD/PowerShell/Terminal) e execute:

pip install vosk markovify pyaudio pyinstaller

====================================================================
PÁGINA 3: BAIXAR MODELO VOSK
====================================================================

Passo 3: Baixar modelo Vosk (português)
Execute no Python:

import vosk
import urllib.request
import zipfile

url = "https://alphacephei.com/vosk/models/vosk-model-small-pt-0.3.zip"
urllib.request.urlretrieve(url, "vosk_model.zip")
with zipfile.ZipFile("vosk_model.zip", 'r') as zip_ref:
    zip_ref.extractall(".")
os.rename("vosk-model-small-pt-0.3", "modelo_vosk")

====================================================================
PÁGINA 4: EXECUTANDO O ROBÔ
====================================================================

Passo 4: Baixar o código
Salve o arquivo robo_fofoqueiro_offline.py em uma pasta.

Passo 5: Executar
No terminal, dentro da pasta do código:

python robo_fofoqueiro_offline.py

Passo 6: Testar funcionamento
- Digite '1' para testar todas as funcionalidades
- Digite '2' para conversar com o robô (Markov)
- Digite '3' para testar reconhecimento de voz (Vosk)
- Digite '4' para gerar executável (PyInstaller)
- Digite '5' para gerar tutorial PDF
- Digite '6' para sair

====================================================================
PÁGINA 5: SOLUÇÃO DE PROBLEMAS
====================================================================

Problema: PyAudio não instala no Windows
Solução: Baixe o arquivo .whl em:
https://www.lfd.uci.edu/~gohlke/pythonlibs/#pyaudio

Problema: Modelo Vosk não baixa
Solução: Use um pendrive com o modelo já baixado ou
peça ajuda ao professor.

Problema: Microfone não funciona
Solução: Use o modo texto (digite manualmente o que quer falar)

Problema: Executável não encontra modelo
Solução: Copie a pasta 'modelo_vosk' para a mesma pasta do .exe

====================================================================
SUPORTE
====================================================================
Em caso de dúvidas, entre em contato com a tutora Gisele Nunes.

🤖 Robô Fofoqueiro - Acessibilidade com humor, mesmo offline!
====================================================================`;
      downloadArquivo(tutorialConteudo, "tutorial_robo_fofoqueiro_offline.txt");
      exibirMensagemRobo(
        "success",
        "Tutorial baixado! Agora é só seguir o passo a passo, piá! 📚",
        3000,
        this.btnGerarTutorialSim,
      );
    }

    init() {
      if (this.btnGerarMarkov)
        this.btnGerarMarkov.addEventListener("click", () =>
          this.gerarRespostaMarkov(),
        );
      if (this.perguntaMarkov)
        this.perguntaMarkov.addEventListener("keypress", (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            this.gerarRespostaMarkov();
          }
        });
      if (this.btnSimularVoz)
        this.btnSimularVoz.addEventListener("click", () => this.simularVosk());
      if (this.btnSimularPyInstaller)
        this.btnSimularPyInstaller.addEventListener("click", () =>
          this.simularPyInstaller(),
        );
      if (this.btnTestarTudo)
        this.btnTestarTudo.addEventListener("click", () =>
          this.simularTesteTudo(),
        );
      if (this.btnGerarTutorialSim)
        this.btnGerarTutorialSim.addEventListener("click", () =>
          this.baixarTutorial(),
        );
      return true;
    }
  }

  // ============================================================
  // 20. MATERIAL COMPLEMENTAR (AULA 11) - FUNCIONALIDADES
  // ============================================================

  function inicializarMaterialComplementar() {
    const paginaAtual = obterPaginaAtual();
    if (paginaAtual !== "aula_11") return;
    console.log("📚 Material Complementar - Funcionalidades carregadas!");
    const btnDownloadBncc = document.getElementById("btnDownloadBncc");
    const btnDownloadAvaliacao = document.getElementById(
      "btnDownloadAvaliacao",
    );
    const btnDownloadChecklist = document.getElementById(
      "btnDownloadChecklist",
    );
    const btnDownloadResumo = document.getElementById("btnDownloadResumo");
    const btnExportarMaterial = document.getElementById("btnExportarMaterial");
    const conteudoBncc = `TABELA DE REFERÊNCIA CRUZADA (BNCC x RCP) - ROBÔ FOFOQUEIRO

================================================================================
COMPONENTE       | BNCC (Ensino Médio)                    | RCP - Paraná
================================================================================
Linguagens       | EM13LGG101, LGG104, LGG301,           | Língua Portuguesa -
                 | LGG701-704, LP16                      | Oralidade, Produção de texto
-----------------|---------------------------------------|-------------------------------
Matemática       | EM13MAT405, MAT503                    | Pensamento Computacional,
                 |                                       | Estatística
-----------------|---------------------------------------|-------------------------------
Ciências da      | EM13CNT101, CNT102, CNT104,           | Física (Ondulatória,
Natureza         | CNT206, CNT303                        | Eletricidade), Tecnologia e
                 |                                       | Sociedade
-----------------|---------------------------------------|-------------------------------
Competências     | CG1, CG2, CG4, CG5, CG6,              | Cidadania Digital,
Gerais           | CG7, CG8, CG10                        | Trabalho Colaborativo
================================================================================

Detalhamento dos códigos BNCC:

EM13LGG101 - Analisar e produzir textos multimodais
EM13LGG701 - Utilizar diferentes mídias para divulgação científica
EM13LP16   - Produzir vídeos considerando público e contexto
EM13MAT405 - Utilizar conceitos de programação para análise de dados
EM13MAT503 - Implementar soluções computacionais para problemas reais
EM13CNT101 - Utilizar modelos físicos para representar sistemas
EM13CNT102 - Analisar impactos da IA na sociedade
EM13CNT104 - Avaliar potencialidades de sistemas integrados
EM13CNT206 - Discutir aplicações de sensores no cotidiano
EM13CNT303 - Interpretar e representar dados científicos

Competências Gerais:
CG1 - Conhecimento | CG2 - Curiosidade | CG4 - Linguagens
CG5 - Tecnologias digitais | CG6 - Trabalho em equipe
CG7 - Argumentação | CG8 - Autoconhecimento | CG10 - Autonomia
`;
    const conteudoAvaliacao = `SUGESTÃO DE AVALIAÇÃO FINAL DO PROJETO - ROBÔ FOFOQUEIRO

================================================================================
CRITÉRIO                    | PESO | INDICADORES
================================================================================
Funcionamento técnico       | 30%  | Todos os 10 módulos implementados e integrados
----------------------------|------|---------------------------------------------
Documentação                | 20%  | README, comentários no código, tutorial
----------------------------|------|---------------------------------------------
Vídeo de divulgação         | 20%  | Roteiro, manifesto, edição, acessibilidade
----------------------------|------|---------------------------------------------
Participação e colaboração  | 15%  | Diário de bordo, ajuda aos colegas, debates
----------------------------|------|---------------------------------------------
Criatividade e irreverência | 15%  | Memes originais, gírias paranaenses
================================================================================

TABELA DE CONVERSÃO - NOTA FINAL:

Pontuação (%) | Conceito          | Descrição
90% - 100%    | Excelente (A)     | Robô completo, documentação impecável
75% - 89%     | Bom (B)           | Funciona bem, mas falta algum detalhe
60% - 74%     | Regular (C)       | Funciona parcialmente
0% - 59%      | Insuficiente (D)  | Precisa refazer partes importantes

RECOMENDAÇÕES PARA AVALIAÇÃO:
1. Organize uma "feira de robôs" com apresentações em grupo
2. Use rubricas para cada critério (✅ 100%, ⚠️ 50%, ❌ 0%)
3. Incentive autoavaliação e avaliação entre pares
4. Compartilhe os vídeos em um canal da escola
`;
    const conteudoChecklistConclusao = `CHECKLIST DE CONCLUSÃO DO PROJETO - ROBÔ FOFOQUEIRO

✅ MARQUE OS ITENS CONCLUÍDOS:

☐ Todos os 10 módulos implementados e funcionando
☐ Menu integrado (Aula 8) com opções 0-9
☐ Modo automático executando ciclo completo sem erros
☐ README do projeto gerado (Aula 8)
☐ Código comentado com gírias paranaenses
☐ Vídeo de 2-3 minutos com manifesto e legendas
☐ Versão offline testada (Vosk + Markov + PyInstaller)
☐ Tutorial PDF de instalação entregue
☐ Diário de bordo atualizado com reflexões
☐ Participação na autoavaliação e debate final

📊 RESULTADO FINAL:
Total de itens: ____/10
Percentual: ____%
Conceito: ____

📝 OBSERVAÇÕES DO PROFESSOR:
_________________________________________
_________________________________________
_________________________________________

Assinatura do aluno: __________________
Data: ____/____/2026
`;
    const conteudoResumoProjeto = `RESUMO DO PROJETO - ROBÔ FOFOQUEIRO DA ACESSIBILIDADE

📋 INFORMAÇÕES GERAIS:
- Nome do Projeto: Robô Fofoqueiro da Acessibilidade
- Subtítulo: "I.A. QUE FALA - O Robô Fofoqueiro da Acessibilidade"
- Objetivo: Criar assistente robótico excêntrico que traduz sons ambientes em alertas visuais
- Tecnologias: Python, Google Colab, SpeechRecognition, OpenCV, MediaPipe, Google Gemini API
- Hardware: Arduino Uno (opcional), sensor KY-038, LEDs RGB, display LCD 16x2
- Duração: 11 aulas | 1000+ minutos
- Público-alvo: Ensino Médio - Escolas Públicas do Paraná

📚 MÓDULOS DO PROJETO:
1. Setup do ambiente (Google Colab)
2. Sensor de som irreverente
3. Reconhecimento de fala com gírias paranaenses
4. Visão computacional (mãos e QR codes)
5. IA generativa com personalidade (Gemini + fallback)
6. Display LCD e LEDs (simulação e hardware real)
7. Mapa do Inferno Acústico (gráficos e heatmap)
8. Protótipo completo integrado (menu + modo automático)
9. Manifesto e Vídeo de divulgação científica
10. Versão Offline Completa (Vosk + Markov + PyInstaller)
11. Material Complementar (BNCC x RCP + Avaliação Final)

🎯 BNCC TRABALHADAS:
EM13LGG101, EM13LGG701, EM13LP16, EM13MAT405, EM13MAT503
EM13CNT101, EM13CNT102, EM13CNT104, EM13CNT206, EM13CNT303

🏆 COMPETÊNCIAS GERAIS:
CG1, CG2, CG4, CG5, CG6, CG7, CG8, CG10

👥 EQUIPE:
- Tutora: Gisele Nunes
- Estudantes: Programação - Ensino Médio
- Parceiros: SEED-PR | Programa Inovação Educação

📅 DATA DE CONCLUSÃO: 30/04/2026

🐘 Desenvolvido com 💙 para a acessibilidade!
`;
    function baixarArquivo(conteudo, nomeArquivo, botaoClicado) {
      const blob = new Blob([conteudo], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = nomeArquivo;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      if (botaoClicado) {
        const textoOriginal = botaoClicado.innerHTML;
        botaoClicado.innerHTML = '<i class="bi bi-check-lg"></i> Baixado!';
        setTimeout(() => {
          if (botaoClicado) botaoClicado.innerHTML = textoOriginal;
        }, 2000);
      }
      exibirMensagemRobo(
        "success",
        `Arquivo "${nomeArquivo}" baixado com sucesso, piá! 📁`,
        3000,
        botaoClicado,
      );
    }
    if (btnDownloadBncc)
      btnDownloadBncc.addEventListener("click", () =>
        baixarArquivo(
          conteudoBncc,
          "bncc_rcp_robo_fofoqueiro.txt",
          btnDownloadBncc,
        ),
      );
    if (btnDownloadAvaliacao)
      btnDownloadAvaliacao.addEventListener("click", () =>
        baixarArquivo(
          conteudoAvaliacao,
          "avaliacao_robo_fofoqueiro.txt",
          btnDownloadAvaliacao,
        ),
      );
    if (btnDownloadChecklist)
      btnDownloadChecklist.addEventListener("click", () =>
        baixarArquivo(
          conteudoChecklistConclusao,
          "checklist_conclusao_robo_fofoqueiro.txt",
          btnDownloadChecklist,
        ),
      );
    if (btnDownloadResumo)
      btnDownloadResumo.addEventListener("click", () =>
        baixarArquivo(
          conteudoResumoProjeto,
          "resumo_projeto_robo_fofoqueiro.txt",
          btnDownloadResumo,
        ),
      );
    if (btnExportarMaterial)
      btnExportarMaterial.addEventListener("click", () => {
        const materialCompleto = `${conteudoBncc}\n\n${conteudoAvaliacao}\n\n${conteudoChecklistConclusao}\n\n${conteudoResumoProjeto}`;
        baixarArquivo(
          materialCompleto,
          "material_complementar_completo.txt",
          btnExportarMaterial,
        );
      });
  }

  // ============================================================
  // 21. MENSAGENS DE BOAS-VINDAS
  // ============================================================

  function inicializarBoasVindas() {
    const paginaAtual = obterPaginaAtual();
    const chaveStorage = `visitouRoboFofoqueiro${paginaAtual.charAt(0).toUpperCase() + paginaAtual.slice(1)}`;
    const mensagensBoasVindas = {
      aula_03: {
        tipo: "warning",
        mensagem:
          "🎤 AULA 3 - RECONHECIMENTO DE FALA!<br>Clique no microfone e fale com o robô!",
        duracao: 8000,
      },
      aula_04: {
        tipo: "info",
        mensagem:
          "👁️ AULA 4 - VISÃO COMPUTACIONAL!<br>'O robô ganhou olho, piá!'<br>Teste o simulador de QR Code e detecção de mãos!",
        duracao: 10000,
      },
      aula_05: {
        tipo: "warning",
        mensagem:
          "🧠 AULA 5 - IA GENERATIVA!<br>'Agora o robô pensa, vixi!'<br>Converse com o robô e veja a IA em ação!",
        duracao: 8000,
      },
      aula_06: {
        tipo: "warning",
        mensagem:
          "💡 AULA 6 - DISPLAY LCD E LEDs!<br>'Agora o robô pisca e fala, vixi!'<br>Teste o simulador de hardware!",
        duracao: 8000,
      },
      aula_07: {
        tipo: "info",
        mensagem:
          "📊 AULA 7 - MAPA DO INFERNO ACÚSTICO!<br>'Dado não é fofoca, é evidência, piá!'<br>Teste o simulador de gráficos!",
        duracao: 8000,
      },
      aula_08: {
        tipo: "success",
        mensagem:
          "🧩 AULA 8 - PROTÓTIPO COMPLETO INTEGRADO!<br>'O trem agora é completo, vixi!'<br>Teste todos os módulos integrados no simulador!",
        duracao: 10000,
      },
      aula_09: {
        tipo: "warning",
        mensagem:
          "🎬 AULA 9 - MANIFESTO E VÍDEO!<br>'Chegou a hora de mostrar pro mundo o bagulho doido que a gente fez!'<br>Use o gerador de roteiro personalizado!",
        duracao: 10000,
      },
      aula_10: {
        tipo: "success",
        mensagem:
          "📦 AULA 10 - VERSÃO OFFLINE COMPLETA!<br>'Levando a inclusão a todas as escolas!'<br>Teste o simulador offline e gere o executável!",
        duracao: 10000,
      },
      aula_11: {
        tipo: "info",
        mensagem:
          "📚 MATERIAL COMPLEMENTAR!<br>'BNCC, RCP e Avaliação Final, vixi!'<br>Baixe os materiais e organize a avaliação final!",
        duracao: 8000,
      },
    };
    const jaVisitou = sessionStorage.getItem(chaveStorage);
    if (!jaVisitou && mensagensBoasVindas[paginaAtual]) {
      setTimeout(() => {
        const msg = mensagensBoasVindas[paginaAtual];
        const boasVindas = document.createElement("div");
        boasVindas.className = `alert alert-${msg.tipo} alert-dismissible fade show position-fixed bottom-0 end-0 m-3`;
        boasVindas.style.zIndex = "9999";
        boasVindas.style.maxWidth = "380px";
        boasVindas.innerHTML = `<i class="bi bi-robot fs-3 me-2 float-start"></i><strong>${msg.mensagem}</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar"></button>`;
        document.body.appendChild(boasVindas);
        setTimeout(() => boasVindas.remove(), msg.duracao);
      }, 1000);
      sessionStorage.setItem(chaveStorage, "true");
    }
    if (paginaAtual === "index") {
      const jaVisitouIndex = sessionStorage.getItem("visitouRoboIndex");
      if (!jaVisitouIndex) {
        setTimeout(() => {
          const boasVindas = document.createElement("div");
          boasVindas.className =
            "alert alert-success alert-dismissible fade show position-fixed bottom-0 end-0 m-3";
          boasVindas.style.zIndex = "9999";
          boasVindas.style.maxWidth = "350px";
          boasVindas.innerHTML = `<i class="bi bi-robot fs-3 me-2 float-start"></i><strong>🤖 VIXI, BEM-VINDO, PIÁ!</strong><br>Este é o Robô Fofoqueiro da Acessibilidade.<br>São 11 aulas completas! Clique nas abas para explorar!<br><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar"></button>`;
          document.body.appendChild(boasVindas);
          setTimeout(() => boasVindas.remove(), 8000);
        }, 1000);
        sessionStorage.setItem("visitouRoboIndex", "true");
      }
    }
  }

  // ============================================================
  // 22. FUNÇÕES GLOBAIS PARA NAVEGAÇÃO
  // ============================================================

  window.navegarAbaIndex = function (abaId) {
    const botao = document.querySelector(
      `.lateral-link[data-lateral-aba="${abaId}"]`,
    );
    if (botao) {
      botao.click();
      const conteudo = document.querySelector(".conteudo-principal");
      if (conteudo)
        conteudo.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  window.exportarInfoProjeto = function () {
    const info = `PROJETO ROBÔ FOFOQUEIRO - VERSÃO COMPLETA

📋 RESUMO DO PROJETO:
- Nome: Robô Fofoqueiro da Acessibilidade
- Objetivo: Criar assistente robótico para acessibilidade
- Tecnologias: Python, Google Colab, IA, OpenCV
- Duração: 11 aulas (1000+ minutos)
- Público: Ensino Médio - Escolas Públicas do Paraná

📚 MÓDULOS DO PROJETO:
1. Setup do ambiente (Colab)
2. Sensor de som irreverente
3. Reconhecimento de fala
4. Visão computacional
5. IA generativa com personalidade
6. Display e LEDs
7. Mapa do Inferno Acústico
8. Protótipo completo integrado
9. Manifesto e Vídeo de divulgação
10. Versão Offline Completa (Vosk + Markov + PyInstaller)
11. Material Complementar (BNCC x RCP + Avaliação Final)

🎯 BNCC: EM13LGG101, EM13LGG304, EM13LP16, EM13MAT405, EM13MAT503, EM13CNT101, EM13CNT104, EM13LGG702, EM13CNT102, EM13CNT303, EM13CNT206

👥 Equipe: Estudantes de Programação sob orientação da Tutora Gisele Nunes

🐘 Desenvolvido com 💙 para a acessibilidade!`;
    downloadArquivo(info, "resumo_projeto_robo_fofoqueiro.txt");
  };

  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.key === "e") {
      e.preventDefault();
      window.exportarInfoProjeto();
      console.log(
        "%c📁 Projeto exportado via atalho Ctrl+E!",
        "color: #27ae60; font-size: 12px;",
      );
    }
  });

  // ============================================================
  // 23. INICIALIZAÇÃO PRINCIPAL
  // ============================================================

  document.addEventListener("DOMContentLoaded", function () {
    console.log(
      "%c🤖 ROBÔ FOFOQUEIRO - VERSÃO COMPLETA (11 AULAS) CARREGADA!",
      "color: #2980b9; font-size: 14px; font-weight: bold;",
    );
    inicializarAbasProjeto();
    inicializarAbasLaterais();
    const simuladorHardware = new SimuladorHardware();
    simuladorHardware.init();
    const simuladorIA = new SimuladorIAGenerativa();
    simuladorIA.init();
    const simuladorGraficos = new SimuladorGraficos();
    simuladorGraficos.init();
    const simuladorDb = new SimuladorDecibeis();
    simuladorDb.init();
    const simuladorColeta = new SimuladorColetaDados();
    simuladorColeta.init();
    const reconhecimentoFala = new ReconhecimentoFala();
    reconhecimentoFala.init();
    inicializarDownloadPython();
    inicializarDownloadRoteiroManifesto();
    const checklist = new ChecklistInterativo();
    checklist.init();
    inicializarChamadaInterativa();
    inicializarExportarDicas();
    inicializarExportarProjeto();
    const simuladorQR = new SimuladorQRCode();
    simuladorQR.init();
    inicializarSimuladorMaos();
    const simuladorIntegrado = new SimuladorIntegrado();
    simuladorIntegrado.init();
    const simuladorOffline = new SimuladorOffline();
    simuladorOffline.init();
    inicializarBoasVindas();
    inicializarAutoavaliacao();
    inicializarGeradorRoteiro();
    inicializarMaterialComplementar();
    if (!document.querySelector("#animacoesCustom")) {
      const style = document.createElement("style");
      style.id = "animacoesCustom";
      style.textContent = `.escala-pulse { animation: escalaPulse 0.3s ease; } @keyframes escalaPulse { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } } @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } .db-alto { background-color: #fee2e2 !important; color: #991b1b !important; font-weight: bold; } .db-medio { background-color: #fef3c7 !important; color: #92400e !important; } .db-baixo { background-color: #dcfce7 !important; color: #166534 !important; } .simulador-integrado-mensagem { animation: fadeInUp 0.3s ease; } .resultado-atualizado { animation: fadeInUp 0.3s ease; }`;
      document.head.appendChild(style);
    }
  });
})();
// ===================================================================
// LABORATÓRIO DO ROBÔ - Funções Específicas
// ===================================================================

// Estado global do robô laboratório
let estadoRobo = {
  nivelSom: 20,
  corLed: "verde",
  alertaAtivo: false,
  piscaLed: false,
  dedosDetectados: 0,
  conversaAtual: [],
};

// Dicionário de gírias e respostas para o simulador
const GIRIAS_LAB = [
  "vixi",
  "égua",
  "piá",
  "guria",
  "bagulho doido",
  "ó o trem",
  "tchê",
  "bah",
  "meu consagrado",
  "trem bão",
];
const RESPOSTAS_LAB = {
  nome: "Ó o trem, piá! Meu nome é Robô Fofoqueiro da Acessibilidade, prazer em conhecê, tchê! 🤖",
  acessibilidade:
    "Vixi, acessibilidade digital é bagulho doido, guria! É fazer site funcionar pra todo mundo: contraste bom, áudio descrição, Libras... ó o trem! ♿",
  fofoca:
    "ÉGUA! Ouvi dizer que a tia do café tá aprendendo Python e vai programar um robô também! 🍿 " +
    GIRIAS_LAB[Math.floor(Math.random() * GIRIAS_LAB.length)] +
    "!",
  site:
    "Piá, pra deixar teu site acessível: 1) Contraste alto 2) Texto alternativo 3) Navegação por teclado 4) Legendas! " +
    GIRIAS_LAB[Math.floor(Math.random() * GIRIAS_LAB.length)] +
    "!",
  memes:
    "Bah, adoro memes, guria! Meu favorito é o 'Vixi, deu ruim' com o doguinho surdo que não ouve o barulho mas vê o LED piscando! 🐶",
  inclusao:
    "Guria, inclusão é fazer todo mundo se sentir parte do trem! Tecnologia assistiva, Libras, contraste alto... bora espalhar essa ideia, tchê! ♿",
  padrao:
    "Vixi, não entendi direito não, piá! Repete aí mais devagar, égua! Tô aqui pra ajudar com acessibilidade! " +
    GIRIAS_LAB[Math.floor(Math.random() * GIRIAS_LAB.length)] +
    "!",
};

// Função para gerar resposta da IA simulada
function gerarRespostaLab(pergunta) {
  const perguntaLow = pergunta.toLowerCase();
  if (perguntaLow.includes("nome") || perguntaLow.includes("quem é você"))
    return RESPOSTAS_LAB.nome;
  if (
    perguntaLow.includes("acessibilidade") ||
    perguntaLow.includes("acessível")
  )
    return RESPOSTAS_LAB.acessibilidade;
  if (perguntaLow.includes("fofoca") || perguntaLow.includes("conta"))
    return RESPOSTAS_LAB.fofoca;
  if (
    perguntaLow.includes("site") ||
    perguntaLow.includes("web") ||
    perguntaLow.includes("internet")
  )
    return RESPOSTAS_LAB.site;
  if (
    perguntaLow.includes("meme") ||
    perguntaLow.includes("engraçado") ||
    perguntaLow.includes("piada")
  )
    return RESPOSTAS_LAB.memes;
  if (
    perguntaLow.includes("inclusão") ||
    perguntaLow.includes("incluir") ||
    perguntaLow.includes("deficiência")
  )
    return RESPOSTAS_LAB.inclusao;
  return RESPOSTAS_LAB.padrao;
}

// Função para traduzir para Libras textual
function traduzirLibrasLab(texto) {
  const mapa = {
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
  let resultado = "";
  for (let char of texto.toLowerCase()) {
    resultado += mapa[char] || char;
  }
  return resultado.length > 60 ? resultado.substring(0, 60) + "..." : resultado;
}

// Função para atualizar o display do robô
function atualizarDisplayRobo(linha1, linha2) {
  const displayLinha1 = document.getElementById("displayLinha1");
  const displayLinha2 = document.getElementById("displayLinha2");
  if (displayLinha1) displayLinha1.textContent = linha1.substring(0, 16);
  if (displayLinha2) displayLinha2.textContent = linha2.substring(0, 16);
}

// Função para atualizar os LEDs e olhos do robô
function atualizarLedsRobo(nivelSom, piscar = false) {
  const ledVermelho = document.getElementById("ledVermelho");
  const ledVerde = document.getElementById("ledVerde");
  const ledAzul = document.getElementById("ledAzul");
  const ledAmarelo = document.getElementById("ledAmarelo");
  const olhoEsquerdo = document.getElementById("olhoEsquerdo");
  const olhoDireito = document.getElementById("olhoDireito");
  const bocaLed = document.getElementById("bocaLed");

  // Reset todos os LEDs
  const leds = [ledVermelho, ledVerde, ledAzul, ledAmarelo];
  leds.forEach((led) => {
    if (led) {
      led.classList.remove(
        "led-vermelho",
        "led-verde",
        "led-azul",
        "led-amarelo",
        "led-piscando",
      );
      led.classList.add("led-off");
    }
  });

  // Remove classes dos olhos
  if (olhoEsquerdo)
    olhoEsquerdo.classList.remove(
      "led-vermelho",
      "led-verde",
      "led-azul",
      "led-amarelo",
    );
  if (olhoDireito)
    olhoDireito.classList.remove(
      "led-vermelho",
      "led-verde",
      "led-azul",
      "led-amarelo",
    );
  if (bocaLed) bocaLed.classList.remove("led-vermelho", "led-amarelo");

  let corLed = "";
  let mensagemDisplay = "";

  if (nivelSom > 75) {
    corLed = "vermelho";
    mensagemDisplay = "🚨 MUITO ALTO!";
    if (ledVermelho) {
      ledVermelho.classList.remove("led-off");
      ledVermelho.classList.add("led-vermelho");
      if (piscar) ledVermelho.classList.add("led-piscando");
    }
    if (bocaLed) bocaLed.classList.add("led-vermelho");
    if (olhoEsquerdo) olhoEsquerdo.classList.add("led-vermelho");
    if (olhoDireito) olhoDireito.classList.add("led-vermelho");
  } else if (nivelSom > 50) {
    corLed = "amarelo";
    mensagemDisplay = "⚠️ FICANDO ALTO";
    if (ledAmarelo) {
      ledAmarelo.classList.remove("led-off");
      ledAmarelo.classList.add("led-amarelo");
    }
    if (bocaLed) bocaLed.classList.add("led-amarelo");
    if (olhoEsquerdo) olhoEsquerdo.classList.add("led-amarelo");
    if (olhoDireito) olhoDireito.classList.add("led-amarelo");
  } else if (nivelSom > 30) {
    corLed = "verde";
    mensagemDisplay = "🔊 NORMAL";
    if (ledVerde) {
      ledVerde.classList.remove("led-off");
      ledVerde.classList.add("led-verde");
    }
    if (olhoEsquerdo) olhoEsquerdo.classList.add("led-verde");
    if (olhoDireito) olhoDireito.classList.add("led-verde");
  } else {
    corLed = "azul";
    mensagemDisplay = "🤫 SILÊNCIO";
    if (ledAzul) {
      ledAzul.classList.remove("led-off");
      ledAzul.classList.add("led-azul");
    }
    if (olhoEsquerdo) olhoEsquerdo.classList.add("led-azul");
    if (olhoDireito) olhoDireito.classList.add("led-azul");
  }

  atualizarDisplayRobo(`${nivelSom.toFixed(0)} dB`, mensagemDisplay);
  return corLed;
}

// Função para processar barulho
function processarBarulho(nivelDb, fonte = "botao") {
  estadoRobo.nivelSom = nivelDb;
  const piscar = nivelDb > 75;
  atualizarLedsRobo(nivelDb, piscar);

  // Atualiza barra de decibéis se existir
  const barraDb = document.getElementById("barraDbSim");
  const dbValor = document.getElementById("dbValorSim");
  const alertaDiv = document.getElementById("alertaSomSim");
  const mensagemDiv = document.getElementById("mensagemSomSim");

  if (barraDb) {
    const percentual = Math.min(100, (nivelDb / 120) * 100);
    barraDb.style.width = percentual + "%";
    if (nivelDb < 40) barraDb.style.backgroundColor = "#2ecc71";
    else if (nivelDb < 75) barraDb.style.backgroundColor = "#f39c12";
    else barraDb.style.backgroundColor = "#e74c3c";
  }
  if (dbValor) dbValor.textContent = nivelDb.toFixed(1);

  if (alertaDiv) {
    if (nivelDb > 75) alertaDiv.classList.remove("d-none");
    else alertaDiv.classList.add("d-none");
  }

  let mensagem = "";
  if (nivelDb < 40) mensagem = "🤫 Silêncio absoluto... até assusta!";
  else if (nivelDb < 60) mensagem = "🗣️ Papinho normal, nada de mais...";
  else if (nivelDb < 80)
    mensagem = "📢 TÁ FICANDO BOM! Logo logo viro fofoqueiro!";
  else if (nivelDb < 100)
    mensagem = "🔊 CALA A BOCA! Vou piscar o LED vermelho!";
  else mensagem = "💀 INFERNO ACÚSTICO! Vou chamar a diretora robô!";

  if (mensagemDiv)
    mensagemDiv.innerHTML = `<i class="bi bi-robot"></i> ${mensagem}`;

  // Adiciona mensagem ao chat do robô principal
  adicionarMensagemChatRobo(
    `📢 Nível de som detectado: ${nivelDb.toFixed(0)} dB. ${mensagem}`,
  );
}

// Função para adicionar mensagem ao chat
function adicionarMensagemChat(
  remetente,
  texto,
  chatContainerId = "chatContainer",
) {
  const container = document.getElementById(chatContainerId);
  if (!container) return;

  const msgDiv = document.createElement("div");
  msgDiv.className = `chat-message ${remetente} mb-2`;
  msgDiv.style.animation = "fadeInUp 0.3s ease";

  const bubbleClass =
    remetente === "user" ? "bg-primary text-white" : "bg-secondary text-white";
  const icone = remetente === "user" ? "👤" : "🤖";
  const nome = remetente === "user" ? "Você" : "Robô Fofoqueiro";

  msgDiv.innerHTML = `
    <small><i class="bi ${remetente === "user" ? "bi-person" : "bi-robot"}"></i> ${nome}</small>
    <div class="message-bubble ${bubbleClass}">${texto}</div>
  `;
  container.appendChild(msgDiv);
  container.scrollTop = container.scrollHeight;

  // Limitar histórico
  while (container.children.length > 30) {
    container.removeChild(container.firstChild);
  }
}

function adicionarMensagemChatRobo(texto) {
  adicionarMensagemChat("robot", texto, "chatContainer");
}

function adicionarMensagemChatUsuario(texto) {
  adicionarMensagemChat("user", texto, "chatContainer");
}

// Função para processar pergunta do chat
function processarPerguntaChat(pergunta) {
  if (!pergunta.trim()) return;
  adicionarMensagemChatUsuario(pergunta);

  // Atualiza Libras
  const librasSpan = document.getElementById("librasTexto");
  if (librasSpan) librasSpan.textContent = traduzirLibrasLab(pergunta);

  // Processa a pergunta com IA simulada
  setTimeout(() => {
    const resposta = gerarRespostaLab(pergunta);
    adicionarMensagemChatRobo(resposta);

    // Atualiza display do robô
    const palavraChave = pergunta.toLowerCase().includes("fofoca")
      ? "Fofoca detectada!"
      : "Processando...";
    atualizarDisplayRobo("🤖 PERGUNTA", pergunta.substring(0, 14) + "...");
    setTimeout(() => {
      atualizarDisplayRobo("🤖 RESPOSTA", resposta.substring(0, 14) + "...");
    }, 2000);
  }, 500);
}

// Inicialização do chat IA da aba IA
function inicializarChatIa() {
  const chatContainer = document.getElementById("chatIaContainer");
  const input = document.getElementById("perguntaIaSim");
  const botao = document.getElementById("btnEnviarIaSim");

  if (!chatContainer) return;

  function adicionarMensagemIa(remetente, texto) {
    const msgDiv = document.createElement("div");
    msgDiv.className = `mb-2 d-flex ${remetente === "usuario" ? "justify-content-end" : "justify-content-start"}`;
    msgDiv.style.animation = "fadeInUp 0.3s ease";

    const bubbleClass =
      remetente === "usuario"
        ? "bg-primary text-white"
        : "bg-secondary text-white";
    const icone = remetente === "usuario" ? "bi-person" : "bi-robot";
    const nome = remetente === "usuario" ? "Você" : "Robô Fofoqueiro";

    msgDiv.innerHTML = `
      <div class="${bubbleClass} rounded-3 p-2 px-3" style="max-width: 80%;">
        <small><i class="bi ${icone}"></i> ${nome}</small>
        <div class="mt-1">${texto}</div>
      </div>
    `;
    chatContainer.appendChild(msgDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  function processarIa() {
    const pergunta = input.value.trim();
    if (!pergunta) return;

    adicionarMensagemIa("usuario", pergunta);
    input.value = "";

    const typingDiv = document.createElement("div");
    typingDiv.className = "mb-2 d-flex justify-content-start";
    typingDiv.id = "typingIa";
    typingDiv.innerHTML = `<div class="bg-secondary text-white rounded-3 p-2 px-3 opacity-50"><small><i class="bi bi-robot"></i> Robô Fofoqueiro</small><div class="mt-1">🤖 digitando<span class="ms-1">...</span></div></div>`;
    chatContainer.appendChild(typingDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    setTimeout(() => {
      const typing = document.getElementById("typingIa");
      if (typing) typing.remove();
      const resposta = gerarRespostaLab(pergunta);
      adicionarMensagemIa("robo", resposta);

      // Atualiza também o chat principal
      const librasSpan = document.getElementById("librasTexto");
      if (librasSpan) librasSpan.textContent = traduzirLibrasLab(pergunta);
    }, 800);
  }

  if (botao) botao.addEventListener("click", processarIa);
  if (input)
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") processarIa();
    });

  // Frases prontas IA
  document.querySelectorAll(".ia-pronta").forEach((btn) => {
    btn.addEventListener("click", () => {
      const pergunta = btn.getAttribute("data-pergunta");
      if (pergunta && input) {
        input.value = pergunta;
        processarIa();
      }
    });
  });
}

// Função para simular detecção de mão
function simularDetectarMao() {
  const dedos = Math.floor(Math.random() * 6);
  const animacao = document.getElementById("maoAnimacao");
  const contagemSpan = document.getElementById("contagemDedos");

  const maos = {
    0: "✊",
    1: "☝️",
    2: "✌️",
    3: "🤟",
    4: "🤙",
    5: "🖐️",
  };
  const mensagens = {
    0: "Nenhum dedo! Tá com raiva, piá?",
    1: "1 dedo! Tá apontando pra alguém?",
    2: "2 dedos! Vitória, é ou não é bagulho doido?",
    3: "3 dedos! Rock and roll, tchê!",
    4: "4 dedos! Hang loose, descolado!",
    5: "5 dedos! Tchau pra fofoca, guria!",
  };

  if (animacao) {
    animacao.style.animation = "maoDetectada 0.3s ease";
    setTimeout(() => {
      if (animacao) animacao.style.animation = "";
    }, 300);
    animacao.textContent = maos[dedos];
  }
  if (contagemSpan)
    contagemSpan.textContent = `${dedos} dedos levantados - ${mensagens[dedos]}`;

  estadoRobo.dedosDetectados = dedos;
  adicionarMensagemChatRobo(`👁️ Vi sua mão! ${mensagens[dedos]}`);
}

// Função para gerar QR Code
function gerarQRCodeSim(texto, botaoClicado) {
  if (!texto.trim()) {
    exibirMensagemRobo(
      "warning",
      "Vixi, piá! Digita alguma coisa pra gerar o QR code!",
      3000,
      botaoClicado,
    );
    return;
  }
  const textoEncoded = encodeURIComponent(texto);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${textoEncoded}`;
  const img = document.getElementById("qrImagemSim");
  const textoSem = document.getElementById("qrTextoSem");

  if (img) {
    img.src = qrUrl;
    img.style.display = "block";
    if (textoSem) textoSem.style.display = "none";
  }
  adicionarMensagemChatRobo(
    `📱 QR Code gerado com o texto: "${texto.substring(0, 30)}..."`,
  );
}

// Função para gerar gráfico do inferno acústico
let dadosInferno = [
  45, 52, 68, 73, 85, 92, 78, 65, 58, 48, 55, 62, 70, 88, 95, 72, 59, 47, 51,
  63,
];
let horariosInferno = [
  "8h",
  "9h",
  "10h",
  "11h",
  "12h",
  "13h",
  "14h",
  "15h",
  "16h",
  "17h",
  "8h",
  "9h",
  "10h",
  "11h",
  "12h",
  "13h",
  "14h",
  "15h",
  "16h",
  "17h",
];

function desenharGraficoInferno() {
  const canvas = document.getElementById("graficoInferno");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const width = canvas.clientWidth;
  const height = 250;
  canvas.width = width;
  canvas.height = height;

  ctx.clearRect(0, 0, width, height);

  // Fundo
  ctx.fillStyle = "#1a1a2e";
  ctx.fillRect(0, 0, width, height);

  const padding = 40;
  const graphWidth = width - 2 * padding;
  const graphHeight = height - 2 * padding;
  const maxValor = 120;

  // Zonas coloridas
  const zonaVerdeY = padding + graphHeight - (40 / maxValor) * graphHeight;
  const zonaAmarelaY = padding + graphHeight - (75 / maxValor) * graphHeight;

  ctx.fillStyle = "rgba(46, 204, 113, 0.15)";
  ctx.fillRect(
    padding,
    zonaVerdeY,
    graphWidth,
    graphHeight - (zonaVerdeY - padding),
  );
  ctx.fillStyle = "rgba(241, 196, 15, 0.15)";
  ctx.fillRect(padding, zonaAmarelaY, graphWidth, zonaVerdeY - zonaAmarelaY);
  ctx.fillStyle = "rgba(231, 76, 60, 0.15)";
  ctx.fillRect(padding, padding, graphWidth, zonaAmarelaY - padding);

  // Linha de alerta
  const linhaAlertaY = padding + graphHeight - (75 / maxValor) * graphHeight;
  ctx.beginPath();
  ctx.moveTo(padding, linhaAlertaY);
  ctx.lineTo(padding + graphWidth, linhaAlertaY);
  ctx.strokeStyle = "#f39c12";
  ctx.setLineDash([8, 6]);
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = "#f39c12";
  ctx.font = "9px monospace";
  ctx.fillText("Limite 75 dB", padding + graphWidth - 70, linhaAlertaY - 5);

  // Plotar linha
  const valores = dadosInferno.slice(0, 12);
  ctx.beginPath();
  ctx.strokeStyle = "#3498db";
  ctx.lineWidth = 2.5;
  let firstPoint = true;
  for (let i = 0; i < valores.length; i++) {
    const x = padding + (i / (valores.length - 1)) * graphWidth;
    const y = padding + graphHeight - (valores[i] / maxValor) * graphHeight;
    if (firstPoint) {
      ctx.moveTo(x, y);
      firstPoint = false;
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();

  // Pontos
  for (let i = 0; i < valores.length; i++) {
    const x = padding + (i / (valores.length - 1)) * graphWidth;
    const y = padding + graphHeight - (valores[i] / maxValor) * graphHeight;
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = valores[i] > 75 ? "#e74c3c" : "#2ecc71";
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = "#ecf0f1";
    ctx.font = "9px monospace";
    ctx.fillText(`${valores[i]} dB`, x + 6, y - 4);
  }

  // Eixo Y
  ctx.fillStyle = "#ecf0f1";
  ctx.font = "10px monospace";
  for (let i = 0; i <= 4; i++) {
    const valorGrade = i * 30;
    const y = padding + graphHeight - (valorGrade / maxValor) * graphHeight;
    ctx.fillText(`${valorGrade} dB`, 5, y + 3);
  }

  // Eixo X
  const horariosExibir = ["8h", "10h", "12h", "14h", "16h"];
  for (let i = 0; i < horariosExibir.length; i++) {
    const x = padding + (i / (horariosExibir.length - 1)) * graphWidth;
    ctx.fillStyle = "#ecf0f1";
    ctx.font = "8px monospace";
    ctx.fillText(horariosExibir[i], x - 10, height - 8);
  }

  // Estatísticas
  const media = (valores.reduce((a, b) => a + b, 0) / valores.length).toFixed(
    1,
  );
  const alertas = valores.filter((v) => v > 75).length;
  const percentualAlertas = ((alertas / valores.length) * 100).toFixed(1);
  const statsDiv = document.getElementById("statsInferno");
  if (statsDiv)
    statsDiv.innerHTML = `Média: ${media} dB | Alertas: ${percentualAlertas}% (${alertas}/${valores.length})`;
}

function gerarNovoMapa() {
  dadosInferno = [];
  for (let i = 0; i < 20; i++) {
    let base = 45 + Math.random() * 50;
    if (i === 4 || i === 14) base = 85 + Math.random() * 10;
    if (i === 10) base = 95 + Math.random() * 8;
    dadosInferno.push(Math.min(120, Math.max(20, Math.round(base))));
  }
  desenharGraficoInferno();
  adicionarMensagemChatRobo(
    "📊 Mapa do Inferno Acústico atualizado! Os dados mostram os horários mais barulhentos da escola.",
  );
}

// Função para resetar o robô
function resetarRobo() {
  estadoRobo = {
    nivelSom: 20,
    corLed: "verde",
    alertaAtivo: false,
    piscaLed: false,
    dedosDetectados: 0,
    conversaAtual: [],
  };
  atualizarLedsRobo(20, false);
  atualizarDisplayRobo("🤖 ROBÔ FOFOQUEIRO", "Resetado! Pronto!");
  adicionarMensagemChatRobo(
    "🔄 Robô resetado! Pronto para novas interações, piá!",
  );

  // Resetar elementos visuais
  const ledVermelho = document.getElementById("ledVermelho");
  const ledVerde = document.getElementById("ledVerde");
  const ledAzul = document.getElementById("ledAzul");
  const ledAmarelo = document.getElementById("ledAmarelo");
  [ledVermelho, ledVerde, ledAzul, ledAmarelo].forEach((led) => {
    if (led) {
      led.classList.remove(
        "led-vermelho",
        "led-verde",
        "led-azul",
        "led-amarelo",
        "led-piscando",
      );
      led.classList.add("led-off");
    }
  });

  const barraDb = document.getElementById("barraDbSim");
  if (barraDb) barraDb.style.width = "0%";
  const dbValor = document.getElementById("dbValorSim");
  if (dbValor) dbValor.textContent = "0.0";
}

// Função principal de inicialização do laboratório
function inicializarLaboratorio() {
  console.log("🤖 Laboratório do Robô Fofoqueiro inicializado!");

  // Botões de som principal
  document
    .querySelectorAll("#btnSilencio, #btnConversa, #btnGrito, .som-teste")
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        const db = parseInt(btn.getAttribute("data-db"));
        if (!isNaN(db)) processarBarulho(db, "botao");
      });
    });

  // Botão aleatório
  const btnAleatorio = document.getElementById("btnTesteAleatorio");
  if (btnAleatorio) {
    btnAleatorio.addEventListener("click", () => {
      const dbAleatorio = Math.floor(Math.random() * 110) + 10;
      processarBarulho(dbAleatorio, "aleatorio");
    });
  }

  // Chat principal
  const chatInput = document.getElementById("chatInput");
  const btnEnviar = document.getElementById("btnEnviarChat");
  if (btnEnviar)
    btnEnviar.addEventListener("click", () =>
      processarPerguntaChat(chatInput?.value || ""),
    );
  if (chatInput)
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") processarPerguntaChat(chatInput.value);
    });

  // Frases prontas do chat
  document.querySelectorAll(".chat-pronto").forEach((btn) => {
    btn.addEventListener("click", () => {
      const frase = btn.getAttribute("data-frase");
      if (frase && chatInput) {
        chatInput.value = frase;
        processarPerguntaChat(frase);
      }
    });
  });

  // Botão detectar mão
  const btnDetectar = document.getElementById("btnDetectarMao");
  if (btnDetectar) btnDetectar.addEventListener("click", simularDetectarMao);

  // QR Code
  const btnGerarQR = document.getElementById("btnGerarQRSim");
  const txtQR = document.getElementById("textoQRSim");
  if (btnGerarQR)
    btnGerarQR.addEventListener("click", () =>
      gerarQRCodeSim(txtQR?.value || "", btnGerarQR),
    );
  if (txtQR)
    txtQR.addEventListener("keypress", (e) => {
      if (e.key === "Enter") gerarQRCodeSim(txtQR.value, btnGerarQR);
    });

  // Mapa do Inferno
  desenharGraficoInferno();
  const btnMapa = document.getElementById("btnGerarMapa");
  if (btnMapa) btnMapa.addEventListener("click", gerarNovoMapa);

  // Chat IA
  inicializarChatIa();

  // Botão reset
  const btnReset = document.getElementById("btnResetRobo");
  if (btnReset) btnReset.addEventListener("click", resetarRobo);

  // Inicializar LEDs
  atualizarLedsRobo(20, false);
}

// Exportar função para uso global
window.inicializarLaboratorio = inicializarLaboratorio;

// ===================================================================
// INICIALIZAÇÃO DAS ABAS LATERAIS DO LABORATÓRIO
// ===================================================================

// Aguarda o DOM carregar completamente
document.addEventListener("DOMContentLoaded", function () {
  // Verifica se estamos na página do laboratório
  const isLaboratorio = window.location.pathname.includes("laboratorio.html");

  if (isLaboratorio) {
    console.log("🎮 Inicializando abas do laboratório...");

    // Obtém todos os botões do menu lateral
    const botoesLateralLab = document.querySelectorAll(
      ".sidebar-lateral .lateral-link",
    );
    const abasConteudo = {
      simulador: document.getElementById("conteudoSimulador"),
      sons: document.getElementById("conteudoSons"),
      visao: document.getElementById("conteudoVisao"),
      ia: document.getElementById("conteudoIa"),
      dados: document.getElementById("conteudoDados"),
    };

    // Função para ativar uma aba específica
    function ativarAbaLaboratorio(abaId) {
      // Oculta todas as abas
      Object.values(abasConteudo).forEach((aba) => {
        if (aba) aba.classList.remove("active-lateral-aba");
      });

      // Mostra a aba selecionada
      if (abasConteudo[abaId]) {
        abasConteudo[abaId].classList.add("active-lateral-aba");
      }

      // Atualiza a classe active nos botões
      botoesLateralLab.forEach((botao) => {
        const botaoAba = botao.getAttribute("data-lateral-aba");
        if (botaoAba === abaId) {
          botao.classList.add("active-lateral");
        } else {
          botao.classList.remove("active-lateral");
        }
      });

      // Força reflow para garantir que os gráficos sejam renderizados corretamente
      setTimeout(() => {
        if (abaId === "dados" && typeof desenharGraficoInferno === "function") {
          desenharGraficoInferno();
        }
      }, 100);

      // Salva a aba ativa no sessionStorage
      sessionStorage.setItem("abaLaboratorioAtiva", abaId);
    }

    // Adiciona event listeners para cada botão
    botoesLateralLab.forEach((botao) => {
      botao.addEventListener("click", function (e) {
        e.preventDefault();
        const abaId = this.getAttribute("data-lateral-aba");
        if (abaId && abasConteudo[abaId]) {
          ativarAbaLaboratorio(abaId);
        } else {
          console.warn(`Aba não encontrada: ${abaId}`);
        }
      });
    });

    // Restaura a última aba ativa ou usa 'simulador' como padrão
    const ultimaAba = sessionStorage.getItem("abaLaboratorioAtiva");
    if (ultimaAba && abasConteudo[ultimaAba]) {
      ativarAbaLaboratorio(ultimaAba);
    } else {
      ativarAbaLaboratorio("simulador");
    }

    // Garante que o botão reset funcione
    const btnReset = document.getElementById("btnResetRobo");
    if (btnReset && typeof resetarRobo === "function") {
      // Remove listeners antigos para evitar duplicação
      const novoBtn = btnReset.cloneNode(true);
      btnReset.parentNode.replaceChild(novoBtn, btnReset);
      novoBtn.addEventListener("click", resetarRobo);
    }
  }
});

// Também adiciona um listener para quando a página é carregada via navegação do menu superior
window.addEventListener("pageshow", function () {
  const isLaboratorio = window.location.pathname.includes("laboratorio.html");
  if (isLaboratorio) {
    // Pequeno delay para garantir que tudo está carregado
    setTimeout(() => {
      const abaSalva = sessionStorage.getItem("abaLaboratorioAtiva");
      if (abaSalva) {
        const botaoCorrespondente = document.querySelector(
          `.sidebar-lateral .lateral-link[data-lateral-aba="${abaSalva}"]`,
        );
        if (botaoCorrespondente) {
          botaoCorrespondente.click();
        }
      }
    }, 100);
  }
});
