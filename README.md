# 🤖 Robô Fofoqueiro da Acessibilidade

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/Python-3.8+-green.svg)](https://python.org)
[![Colab](https://img.shields.io/badge/Google-Colab-orange.svg)](https://colab.research.google.com/)
[![BNCC](https://img.shields.io/badge/BNCC-Ensino%20M%C3%A9dio-purple.svg)](https://basenacionalcomum.mec.gov.br/)

> _"Vixi, o trem agora é completo! Bora fofocar com responsa sobre acessibilidade!"_

## 🎭 Sobre o Projeto

**Robô Fofoqueiro** é um assistente robótico educativo com **personalidade paranaense** que ensina programação, inteligência artificial e acessibilidade de um jeito divertido — com memes, gírias e muito "bagulho doido"!

O projeto foi desenvolvido para **escolas públicas**, rodando em **Chromebooks** via **Google Colab**, e aborda desde conceitos básicos de Python até IA generativa, visão computacional e prototipagem com Arduino.

```python
# O robô fala assim:
print("Égua, piá! Bora medir o barulho da sala?")
# 🎤 Nível: 78 dB - TÁ MUITO ALTO, VIXI!
```

## 🎯 Objetivo Central

Utilizar **IA generativa + visão computacional + sensores de áudio** para criar um assistente robótico excêntrico que:

- 🔊 **Traduz sons ambientes** em alertas visuais, textuais e emocionais
- ♿ **Promove acessibilidade** para pessoas com deficiência auditiva
- 😂 **Ensina tecnologia com humor** (porque aprender não precisa ser chato!)

## 🛠️ Tecnologias Utilizadas

| Categoria         | Tecnologias                                            |
| ----------------- | ------------------------------------------------------ |
| **Linguagem**     | Python 3.8+                                            |
| **Ambiente**      | Google Colab, Chromebooks da rede pública              |
| **IA e Visão**    | Google Gemini API, MediaPipe, OpenCV                   |
| **Áudio**         | SpeechRecognition, gTTS, PyAudio, Vosk (offline)       |
| **Dados**         | Pandas, NumPy, Matplotlib, Seaborn                     |
| **Hardware**      | Arduino Uno, sensor KY-038, LEDs RGB, display LCD 16x2 |
| **Empacotamento** | PyInstaller, PySerial                                  |

## 📚 O que o Robô Fofoqueiro faz?

| Funcionalidade              | O que acontece?                                                         |
| --------------------------- | ----------------------------------------------------------------------- |
| 🎤 **Escuta a sala**        | Se o barulho > 75 dB → LED vermelho piscando + display "TÁ ALTO, HEIN?" |
| 🗣️ **Reconhece fala**       | Converte voz em texto, reescreve com meme e gírias paranaenses          |
| ✋ **Visão computacional**  | Detecta mãos e lê QR codes com instruções acessíveis                    |
| 🧠 **IA com personalidade** | Responde com gírias: "vixi", "ó o trem", "piá", "guria", "bah"          |
| 💡 **Display e LEDs**       | Alertas visuais simulados (ou com hardware real)                        |
| 📊 **Mapa do Inferno**      | Visualização de dados com gráficos e heatmap do barulho                 |

## 🗺️ Jornada de Aprendizagem (10 aulas + material complementar)

| #   | Aula                          | Foco                                     | Tempo   |
| --- | ----------------------------- | ---------------------------------------- | ------- |
| 1   | **Setup do ambiente**         | Criar ambiente no Google Colab           | 1 aula  |
| 2   | **Sensor de som irreverente** | Medir dB e tomar decisões com memes      | 2 aulas |
| 3   | **Reconhecimento de fala**    | Converter voz em texto com personalidade | 2 aulas |
| 4   | **Visão computacional**       | Detectar mão e QR code com câmera        | 2 aulas |
| 5   | **IA com personalidade**      | Integrar IA generativa com regionalismo  | 2 aulas |
| 6   | **Display e LEDs**            | Simular hardware ou usar física          | 2 aulas |
| 7   | **Mapa do Inferno Acústico**  | Visualização de dados com emojis         | 1 aula  |
| 8   | **Protótipo completo**        | Integrar tudo em um sistema único        | 3 aulas |
| 9   | **Manifesto e vídeo**         | Roteiro para produto final               | 2 aulas |
| 10  | **Versão offline**            | Adaptar para escolas sem internet        | 2 aulas |
| 📚  | **Material Complementar**     | BNCC, RCP e Avaliação Final              | -       |

## 🚀 Como Começar

### Pré-requisitos

- Conta Google (para acessar o Colab)
- Chromebook ou computador com acesso à internet
- Microfone (para reconhecimento de fala)
- Webcam (para visão computacional)

### Passo a passo

1. **Acesse o Google Colab**

   ```bash
   # Vá para: https://colab.research.google.com/
   # Crie um novo notebook
   ```

2. **Copie o código da Aula 1**
   - Abra o arquivo `aula_01.html` neste repositório
   - Copie o código Python da aba "Código Python"
   - Cole no Colab e execute!

3. **Instale as dependências**

   ```python
   !pip install SpeechRecognition gtts opencv-python-headless pandas numpy
   ```

4. **Rode o robô e se divirta!**
   ```python
   # O robô vai falar com você!
   print("Vixi, bem-vindo, piá!")
   ```

## 📁 Estrutura do Projeto

```
Robo-Fofoqueiro/
├── index.html                 # Página inicial do projeto
├── aula_01.html a aula_10.html  # Cada aula completa
├── material_complementar.html   # BNCC, RCP e avaliação
├── assets/
│   ├── css/
│   │   ├── style.css          # Arquivo principal (importa todos)
│   │   ├── base.css           # Variáveis, reset, tipografia
│   │   ├── animations.css     # Todas as animações
│   │   ├── components.css     # Menus, cards, botões, sidebar
│   │   ├── pages.css          # Estilos específicos por página
│   │   └── simulators.css     # Simuladores interativos
│   └── js/
│       ├── script.js          # JS principal
│       ├── logger.js          # Sistema de logging
│       ├── eventBus.js        # Comunicação entre componentes
│       ├── utils.js           # Funções utilitárias
│       ├── constants.js       # Constantes globais
│       ├── ChecklistInterativo.js
│       └── simuladores/       # Todos os simuladores (10+ arquivos)
```

## 🎯 BNCC e RCP - Paraná

### Códigos BNCC trabalhados

| Componente               | Códigos                                      |
| ------------------------ | -------------------------------------------- |
| **Linguagens**           | EM13LGG101, LGG104, LGG301, LGG701-704, LP16 |
| **Matemática**           | EM13MAT405, MAT503                           |
| **Ciências da Natureza** | EM13CNT101, CNT102, CNT104, CNT206, CNT303   |
| **Competências Gerais**  | CG1, CG2, CG4, CG5, CG6, CG7, CG8, CG10      |

### RCP - Paraná

- Língua Portuguesa - Oralidade, Produção de texto
- Pensamento Computacional, Estatística
- Física (Ondulatória, Eletricidade)
- Tecnologia e Sociedade
- Cidadania Digital, Trabalho Colaborativo

## 👥 Equipe

| Papel                  | Nome                                |
| ---------------------- | ----------------------------------- |
| **Tutora/Orientadora** | Gisele Nunes                        |
| **Estudantes**         | Turma de Programação - Ensino Médio |
| **Parceiros**          | SEED-PR, Programa Inovação Educação |

## 🎭 Produto Final

Cada grupo apresenta no **"Show de Talentos Robóticos"**:

1. 🤖 **Protótipo funcional do robô** (simulado no Tinkercad ou real com Arduino)
2. 🎬 **Vídeo de 2 minutos** (estilo TikTok explicativo)
3. 📜 **Manifesto técnico-meme** ("A acessibilidade não precisa ser sem graça")
4. 💻 **Código comentado com gírias paranaenses**
   ```python
   # esse elif é pra quando o bagulho fica louco
   if barulho > 75:
       print("🚨 INFERNO ACÚSTICO!")
   ```

## 📦 Versão Offline

Para escolas **sem internet**, o robô funciona com:

- **Vosk** → reconhecimento de fala offline
- **Markov** → geração de texto sem API
- **PyInstaller** → executável que roda em qualquer PC

```bash
# Gerar executável
pyinstaller --onefile robo_fofoqueiro_offline.py
```

## 🤝 Contribuições

Contribuições são super bem-vindas! Sinta-se à vontade para:

- 🐛 Reportar bugs
- 💡 Sugerir novas funcionalidades (mais gírias paranaenses, sempre!)
- 📝 Melhorar a documentação
- 🧪 Testar em diferentes ambientes

```bash
# Como contribuir
1. Fork o projeto
2. Crie sua branch: git checkout -b feature/minha-ideia
3. Commit: git commit -m 'feat: add nova gíria paranaense'
4. Push: git push origin feature/minha-ideia
5. Abra um Pull Request
```

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usar, adaptar e espalhar a acessibilidade com humor!

## 🙏 Agradecimentos

- À **SEED-PR** pelo apoio ao programa Inovação Educação
- A todos os **estudantes** que testaram, reclamaram, sugeriram e se divertiram com o robô
- Ao **Robô Fofoqueiro** que nunca reclama (só fofoca)

## 📞 Contato

Dúvidas, sugestões ou quer contar uma fofoca?

- 🌐 [github.com/robofofoqueiro](https://github.com/robofofoqueiro)
- 🌐 www.projetosgn.com.br

<div align="center">

**🤖 "Acessibilidade não é favor, é direito. Tecnologia inclusiva pode ser divertida!"** 🤖

_Desenvolvido com 💙 e muito café para a acessibilidade digital_

</div>
