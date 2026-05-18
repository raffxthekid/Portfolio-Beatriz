# Beatriz Natalia · Portfolio

Portfolio em TanStack Start + React + Tailwind.

- `bun install` — instala dependências
- `bun run dev` — sobe o dev server
- `bun run build` — build de produção
- `bun run test` — roda os testes (vitest)

---

## Mobile overflow guard

Para garantir que nenhum componente ultrapasse a largura de um viewport mobile (375px), o projeto tem um teste estático em `src/components/site/__tests__/mobile-overflow.test.ts` que escaneia os componentes de `src/components/site/` em busca de padrões conhecidos de overflow horizontal (ex.: `w-screen`, `w-[420px]`, `style={{ width: "600px" }}`).

O teste **falha a build** em CI (GitHub Actions: `Verify no 375px overflow`) se algum elemento ofensor for introduzido.

### Como ignorar exceções

Três níveis, do mais granular ao mais amplo:

#### 1. Linha individual — `// allow-mobile-overflow`

Use para casos pontuais e justificáveis (ex.: blur decorativo posicionado em `absolute` dentro de um pai com `overflow-hidden`).

```tsx
<div
  aria-hidden
  // allow-mobile-overflow — decorative blur, parent has overflow-hidden
  className="absolute -left-24 w-[420px] h-[420px] blur-3xl"
/>
```

O comentário pode estar na mesma linha do match **ou** na linha imediatamente acima.

#### 2. Arquivos/pastas — `mobile-overflow.config.json`

Edite o arquivo `mobile-overflow.config.json` na raiz do projeto. **Não precisa editar o teste.**

```json
{
  "ignore": [
    "**/*.stories.tsx",
    "**/*.test.tsx",
    "**/*.test.ts",
    "src/components/site/legacy/**"
  ],
  "disableRules": []
}
```

**Sintaxe de glob suportada:**

| Padrão | Significado | Exemplo |
|---|---|---|
| `**` | Qualquer profundidade de pastas | `src/components/site/legacy/**` ignora todos os arquivos dentro de `legacy/`, recursivamente |
| `*` | Qualquer caractere exceto `/` | `**/*.stories.tsx` ignora todos os arquivos `.stories.tsx` em qualquer pasta |
| `?` | Um único caractere | `Foo?.tsx` casa `Foo1.tsx`, `FooA.tsx` |

Os globs são resolvidos a partir da raiz do projeto.

#### 3. Regra global — `disableRules`

Desliga uma regra inteira em todo o projeto. **Use com parcimônia** — prefira `ignore` por arquivo.

```json
{
  "ignore": [],
  "disableRules": [
    "inline style width in px > 375"
  ]
}
```

**Nomes válidos de regra:**

- `"w-screen without responsive prefix"`
- `"w-[100vw] / min-w-[100vw] without responsive prefix"`
- `"fixed pixel width > 375px on mobile (w-[Npx] / min-w-[Npx])"`
- `"inline style minWidth in px > 375"`
- `"inline style width in px > 375"`

### Rodando localmente

```bash
bun run test                                              # roda toda a suíte
bunx vitest run src/components/site/__tests__/mobile-overflow.test.ts  # só o overflow
GITHUB_ACTIONS=true bunx vitest run ...                   # vê as anotações no formato CI
```

### O que acontece em um PR com falha

1. **Status check `Verify no 375px overflow`** fica vermelho e bloqueia o merge (se a branch protection estiver configurada).
2. **Anotações inline** aparecem na aba *Files Changed* apontando o arquivo e a linha exatos.
3. **Job summary** mostra a lista completa de ofensores e instruções de correção.
4. **Artifact `mobile-overflow-report`** fica disponível por 14 dias na seção Artifacts do run.
