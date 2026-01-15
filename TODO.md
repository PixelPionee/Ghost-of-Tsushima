# 📋 TODO - Ghost of Tsushima (MINIMALISTA)

## 🎯 FOCO: Cursor Interativo + Minimalismo

---

## ✅ FASE 1: Setup Inicial (COMPLETO)
- [x] Criar projeto Vite + React + TypeScript
- [x] Instalar dependências
- [x] Configurar estrutura de pastas
- [x] Criar variáveis CSS
- [x] Importar fontes japonesas

## ✅ FASE 2: API Minimalista (COMPLETO)
- [x] Reestruturar API para 4 personagens essenciais
- [x] Adicionar seção de História (texto apenas)
- [x] Criar dados do Duelo de Ryuzo (destaque visual)
- [x] Definir 4 posturas com efeitos de cursor
- [x] Remover localizações (apenas menção textual)
- [x] Criar tipos TypeScript minimalistas
- [x] Atualizar apiService
- [x] Criar SectionContext para gerenciar efeitos

## ✅ FASE 3: Sistema de Cursor de Vento (COMPLETO)
- [x] Componente WindCursor
- [x] Tracking do mouse
- [x] Sistema de partículas com Canvas
- [x] Flores realistas (sakura + ginkgo)
- [x] Object pooling
- [x] Spawn contínuo e suave (5 flores/50ms)

## ✅ FASE 4: Home Page (COMPLETO)
- [x] Fundo Sumi-e minimalista
- [x] Título em uma linha
- [x] Botão "ENTRAR"
- [x] Integração com cursor

---

## 🔄 FASE 5: Cursor Dinâmico (EM ANDAMENTO)

### 5.1 Sistema de Cores Dinâmicas
- [ ] Adicionar suporte a cores customizadas nas partículas
- [ ] Criar função para mudar cor baseado no contexto
- [ ] Implementar transições suaves entre cores

### 5.2 Efeitos por Seção
- [ ] **Duelo de Ryuzo**: Partículas vermelhas (sangue/outono)
- [ ] **Postura Pedra**: Partículas cinzas, lentas, grandes
- [ ] **Postura Água**: Partículas azuis, fluidas, médias
- [ ] **Postura Vento**: Partículas brancas, rápidas, pequenas
- [ ] **Postura Lua**: Partículas prateadas, padrão circular

### 5.3 Detecção de Seção
- [ ] Hook para detectar seção visível (Intersection Observer)
- [ ] Atualizar SectionContext automaticamente
- [ ] Aplicar efeito de cursor correspondente

---

## 📄 FASE 6: Páginas Minimalistas (PENDENTE)

### 6.1 Menu Principal
- [ ] Layout vertical com 4 opções:
  - História
  - Personagens
  - Posturas
  - Duelo de Ryuzo
- [ ] Estilo pergaminho (opcional)
- [ ] Navegação com InkButton

### 6.2 Página de História
- [ ] Título grande: "A Jornada do Fantasma"
- [ ] Texto resumido (3-4 parágrafos)
- [ ] Localizações mencionadas textualmente
- [ ] White space massivo
- [ ] Tipografia Noto Serif JP grande

### 6.3 Página de Personagens
- [ ] 4 cards minimalistas:
  - Jin Sakai
  - Lord Shimura
  - Yuna
  - Khotun Khan
- [ ] Apenas texto (nome, título, essência, conflito)
- [ ] Sem imagens
- [ ] Layout com muito espaço em branco

### 6.4 Página de Posturas
- [ ] 4 seções (Pedra, Água, Vento, Lua)
- [ ] Ícones minimalistas (CSS/SVG)
- [ ] Kanji grande
- [ ] Hover = muda efeito do cursor
- [ ] Filosofia de cada postura

### 6.5 Página do Duelo de Ryuzo
- [ ] **ÚNICA PÁGINA COM IMAGEM**
- [ ] Título dramático
- [ ] Citação: "Você escolheu a honra. Eu escolhi meus homens."
- [ ] Descrição emocional
- [ ] Cursor com partículas vermelhas (sangue/outono)
- [ ] Fundo escuro com imagem de fundo sutil

---

## 🎨 FASE 7: Componentes UI (PENDENTE)

### 7.1 Componentes Básicos
- [x] InkButton (completo)
- [ ] ScrollPaper (pergaminho opcional)
- [ ] StanceIcon (ícones minimalistas)
- [ ] CharacterCard (card de texto)

### 7.2 Layout
- [ ] Header minimalista
- [ ] Footer simples
- [ ] PageTransition (Framer Motion)

---

## 🔄 FASE 8: Transições (PENDENTE)
- [ ] Configurar React Router
- [ ] Transições com Framer Motion
- [ ] Animação de dispersão (saída)
- [ ] Animação de formação (entrada)
- [ ] Integrar com cursor

---

## ✨ FASE 9: Polimento (PENDENTE)

### 9.1 Responsividade
- [ ] Mobile (tipografia adaptativa)
- [ ] Tablet
- [ ] Desktop (foco principal)

### 9.2 Performance
- [ ] Lazy loading de páginas
- [ ] Code splitting
- [ ] Otimização de Canvas
- [ ] Testes de FPS

### 9.3 Acessibilidade
- [ ] Navegação por teclado
- [ ] ARIA labels
- [ ] Contraste adequado
- [ ] Reduced motion

---

## 🚀 FASE 10: Deploy (PENDENTE)
- [ ] Build de produção
- [ ] Otimização de assets
- [ ] Deploy no Vercel/Netlify
- [ ] Testes finais

---

## 📊 Progresso Geral: 50%

### ✅ Concluído:
- Setup inicial
- API minimalista reestruturada
- Sistema de cursor de vento
- Home page
- Contexto de seção

### 🔄 Em Progresso:
- Cursor dinâmico com cores

### 📝 Próximos Passos:
1. Implementar cores dinâmicas no cursor
2. Criar páginas minimalistas
3. Adicionar efeitos por seção
4. Implementar transições
5. Polimento e deploy

---

## 🎯 OBJETIVOS PRINCIPAIS:

1. **Cursor como Protagonista**: O cursor é a estrela do show
2. **Minimalismo Extremo**: White space, tipografia grande, zero poluição
3. **Interatividade Sutil**: Efeitos mudam baseado na seção
4. **Performance**: 60fps sempre
5. **Único Destaque Visual**: Duelo de Ryuzo (peso emocional)

---

## 🎨 Princípios de Design:

- **Menos é Mais**: Remover tudo que não é essencial
- **Tipografia como Arte**: Noto Serif JP em tamanhos grandes
- **White Space**: Deixar o conteúdo respirar
- **Cursor Vivo**: Partículas reagem ao contexto
- **Emoção Focada**: Ryuzo como único momento visual intenso
