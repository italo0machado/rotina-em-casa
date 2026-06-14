# CLAUDE.md — Rotina em Casa

**Projeto:** Criador de quadros de rotina doméstica (React + Vite + Vercel)
**Deploy atual:** https://rotina-em-casa-phm2.vercel.app/
**Stack:** Vite + React 19 + TypeScript + Tailwind v4 + React Router v7

---

## Estado Atual (14/06/2026)

### ✅ Implementado

**UI Components (Editor de Escala)**
- `DaySelector.tsx` — Seleção de dias da semana (seg-dom) com presets Seg–Sex / Todos
- `TimeRangeSlider.tsx` — Slider de janela horária (06h–19h) com timeline visual
- `SearchActivityBar.tsx` — Busca com filtro em tempo real sobre o catálogo
- `ActivityDurationPicker.tsx` — Modal de definição de duração + aviso de deslocamento
- `ScheduleGrid.tsx` — Grid visual de escala por dia/horário com cores por categoria
- `ScheduleEditor.tsx` — Lógica de ajuste interativo:
  - Clique em duas atividades → inverte
  - Mesmo dia = realce verde
  - Dias diferentes = realce vermelho
  - Recálculo automático de horários quando durações diferem

**Página EscalaEditor**
- Fluxo completo de criação de escala
- Integração de todos os componentes acima
- Geração inicial de horários
- Persistência temporária em localStorage

**Design System**
- Paleta premium (#f8f5f0, #1f1810, #8b7a65, #b89a6f)
- Responsividade mobile/desktop (breakpoint 768px)
- Componentes com bordas arredondadas 2xl/3xl

**Dados**
- 350+ atividades em `src/data/atividades.ts` (8 categorias)

---

## ❌ Ainda Faltando (prioridade)

1. **Blacklist de palavras ofensivas** (obrigatória antes de criar atividade custom)
2. **Persistência real no banco** (Postgres Neon + backend)
3. **Autenticação completa** (cadastro + JWT + logout)
4. **Exportação PDF**
5. **Validação de horários** (evitar sobreposição)
6. **Testes manuais** do fluxo completo de swap

---

## Como Trabalhar

- Sempre adicionar timestamp `// Atualizado: DD/MM HH:MM` no topo de arquivos modificados
- Fazer commit + push após cada feature estável
- Após push, sempre verificar deploy com o script de diagnóstico do Vercel
- Não marcar feature como pronta sem teste real (local ou produção)

---

## Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Verificar deploy Vercel (após push)
bash /home/clarice/.hermes/skills/devops/vercel-deployment-diagnostics/scripts/check-vercel-deploy.sh

# Fallback rápido
curl -I https://rotina-em-casa-phm2.vercel.app/
```

---

## Notas de Contexto

- Usuário é brasileiro, prefere design premium Apple-like
- Baixa tolerância a "lista simples" ou visual medíocre
- Prefere testar localmente antes de push devido ao limite de 100 deploys/dia da Vercel free
- Exige timestamp em todo arquivo modificado

---

**Última atualização:** 14/06 15:40 — UI do editor de escala concluída e comitada
