Ghost of Tsushima - Interactive Tribute

## TL;DR
• Projeto experimental focado em UX avançado  
• Cursor customizado com partículas físicas (Canvas)  
• Performance otimizada (60fps)  
• Projeto autoral, não tutorial  
• Desktop-first


> *"Como o vento que guia Jin Sakai, este cursor guia sua experiência."*

![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=flat&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat&logo=vite)

---
 O que é isso?

Um site interativo minimalista inspirado em **Ghost of Tsushima**, com uma mecânica única: **seu cursor é o vento**. 

Flores de cerejeira e folhas de ginkgo seguem cada movimento do mouse, criando uma experiência visual que captura a essência do jogo — beleza, fluidez e a força da natureza.

**Não é um site sobre o jogo. É uma experiência que SENTE como o jogo.**

---

Por que isso existe?

Este projeto nasceu de uma pergunta simples: 

> *"Como criar algo que ninguém esquece em um portfólio?"*

A resposta: **fazer o cursor ser protagonista**, não apenas um ponteiro. 

Enquanto a maioria dos sites trata o cursor como invisível, aqui ele é **vento, movimento, vida**. É a primeira coisa que você nota, e a última que esquece.

**Objetivo:** Demonstrar que domínio técnico + criatividade = experiências memoráveis.

---

Vale a pena seu tempo aqui?

**Se você é recrutador/tech lead:** Sim. Este projeto mostra:
- ✅ Domínio de Canvas API e física de partículas
- ✅ Performance otimizada (60fps com 100+ partículas)
- ✅ TypeScript profissional com tipos completos
- ✅ Arquitetura limpa e escalável
- ✅ Atenção obsessiva aos detalhes visuais

**Se você é desenvolvedor:** Sim. Você vai ver:
- 🎨 Como criar cursores customizados com física realista
- 🌬️ Sistema de partículas otimizado com object pooling
- 🎭 Cores dinâmicas por seção (Context API)
- 📜 Layout one-page scroll minimalista
- ⚡ Técnicas de otimização para 60fps constante

**Se você só quer ver algo bonito:** Definitivamente sim. 

---

O que você sabe fazer com isso?

### **1. Cursor de Vento Interativo** 
O coração do projeto. Partículas seguem o mouse com física realista:
- Velocidade do mouse = intensidade do vento
- Gravidade, rotação e fade out natural
- 2 tipos de partículas: sakura (cerejeira) e ginkgo
- Performance: 60fps com até 100 partículas simultâneas

```typescript
// Física das partículas
particle.vy += gravity;
particle.x += particle.vx;
particle.y += particle.vy;
particle.rotation += particle.rotationSpeed;
particle.life -= deltaTime;
```

Implementado com Context API para gerenciamento global de estado.

### **2. Layout Minimalista One-Page** 
Inspirado na estética **Sumi-e** (pintura japonesa a tinta):
- Scroll suave entre seções
- Tipografia japonesa (Noto Serif JP)
- White space efetivo
- Zero elementos desnecessários

### **3. Momento Climático Visual** 
A seção "História" tem um destaque: **O Duelo sob a Chuva** (Jin vs Ryuzo).
- Imagem real do jogo com efeito Sumi-e (dessaturado)
- Cursor muda para vermelho sangue
- Citação emocional: *"Amigos de infância, separados pela guerra"*

---

Stack Técnica

```json
{
  "core": {
    "React": "18.2.0",
    "TypeScript": "5.3.3",
    "Vite": "5.0.8"
  },
  "animations": {
    "GSAP": "3.12.4",
    "Framer Motion": "11.0.3"
  },
  "routing": {
    "React Router": "6.20.1"
  }
}
```

**Por que essas escolhas?**
- **Vite:** Build rápido, HMR instantâneo
- **TypeScript:** Segurança de tipos, melhor DX
- **GSAP:** Animações complexas com performance
- **Framer Motion:** Transições declarativas e elegantes

---

Sacrifícios e Decisões de Design

### **O que foi cortado:**

1. **Sistema de Navegação Complexo**
   - ❌ Planejado: 7 páginas completas com rotas
   - ✅ Implementado: One-page scroll minimalista
   - **Por quê:** Foco no cursor. Menos páginas = mais atenção ao protagonista.

2. **Ícones Geométricos nas Posturas**
   - ❌ Planejado: Ícones customizados (losango, ondas, triângulo, lua)
   - ✅ Implementado: Apenas kanji + texto
   - **Por quê:** Feedback do usuário — "não ficou agradável". Minimalismo venceu.

3. **Galeria Completa de Imagens**
   - ❌ Planejado: 30-50 screenshots com lightbox
   - ✅ Implementado: 1 imagem estratégica (Duelo de Ryuzo)
   - **Por quê:** Uma imagem impactante > galeria genérica.

4. **Mapa Interativo de Tsushima**
   - ❌ Planejado: Mapa clicável com pontos de interesse
   - ✅ Implementado: Removido
   - **Por quê:** Complexidade vs. valor. O cursor já é interativo o suficiente.

### **Problemas Resolvidos:**

1. **Performance com Muitas Partículas**
   - 🐛 Problema: FPS caindo com 200+ partículas
   - ✅ Solução: Object pooling + limite de 100 partículas + throttle 16ms

2. **Imagem Não Carregando**
   - 🐛 Problema: Espaços no nome do arquivo (`Duelo com o Ryuzo.jpeg`)
   - ✅ Solução: URL encoding (`Duelo%20com%20o%20Ryuzo.jpeg`)

3. **Cursor Causando Mudanças Acidentais**
   - 🐛 Problema: Ideia inicial era "mover mouse = mudar página"
   - ✅ Solução: Cursor é APENAS visual. Navegação por click.

---

Como Rodar

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

Acesse: `http://localhost:5173`

---

Performance

- ✅ **60fps** constante com 100 partículas
- ✅ **First Contentful Paint:** < 1s
- ✅ **Time to Interactive:** < 2s
- ✅ **Bundle size:** ~150KB (gzipped)

**Otimizações aplicadas:**
- Object pooling para partículas
- RequestAnimationFrame para animações
- Throttle no mousemove (16ms)
- React.memo em componentes pesados
- Lazy loading de imagens

---

Filosofia de Design

> *"Menos é mais. Mas o 'menos' precisa ser perfeito."*

**Princípios:**
1. **Minimalismo Zen:** Cada elemento tem propósito
2. **Movimento Natural:** Tudo flui como vento
3. **Cores Terrosas:** Nada de neon, apenas natureza
4. **Tipografia Elegante:** Caligrafia japonesa
5. **Performance:** 60fps sempre, sem exceções

---

 Diferenciais

**O que torna este projeto único:**

1. **Cursor como Protagonista**
   - Não é um detalhe. É a experiência.
   - Primeira coisa que você nota, última que esquece.

2. **Estética Autêntica**
   - Não é "tema japonês genérico"
   - É Sumi-e, é minimalismo, é Ghost of Tsushima.

3. **Performance Obsessiva**
   - 60fps não é meta, é requisito.
   - Cada otimização foi medida e validada.

4. **Código Limpo**
   - TypeScript com tipos completos
   - Componentes reutilizáveis
   - Arquitetura escalável

 Aprendizados

**O que este projeto ensinou:**

1. **Performance é UX**
   - 30fps vs 60fps = diferença entre "legal" e "wow"
   - Otimização não é opcional, é parte do design

2. **Menos Features, Mais Impacto**
   - 1 feature perfeita > 10 features medianas
   - Cortar é tão importante quanto adicionar

3. **Feedback é Ouro**
   - Ícones geométricos pareciam bons... até testar
   - Usuário sempre tem razão (sobre o que sente)

4. **Detalhes Importam**
   - URL encoding de espaços
   - Throttle de 16ms vs 32ms
   - Pequenas coisas = grande diferença

---

Conclusão

Este não é apenas um projeto de portfólio. É uma **declaração**:

> *"Meu foco é ir além de interfaces funcionais"*

Se você chegou até aqui, obrigado pelo seu tempo. Espero que tenha valido a pena. 🌸

---

Contato

**Desenvolvido por:** Caio LighSpeed

*"Como o Fantasma de Tsushima, deixo minha marca e sigo em frente."* ⚔️

---

## 📄 Licença

MIT License - Sinta-se livre para usar, modificar e aprender com este código.

---

<div align="center">

Se este projeto te inspirou, deixe uma estrela

*Feito com 🌸 e muito ☕*

</div>
