# Odonto Partners — novo site institucional

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS · Motion (Framer Motion)

Direção de arte: **Luxury Medical Education** — preto profundo, off-white, grafite e platina; *Instrument Serif* (títulos editoriais) + *Manrope* (texto), fontes auto-hospedadas.

---

## Rodar localmente

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # produção
```

Deploy recomendado: **Vercel** (zero configuração). Também roda em qualquer Node 18+.

## Onde editar o conteúdo (sem tocar no layout)

| O quê | Arquivo |
|---|---|
| Telefones, WhatsApp, e-mail, endereço, horários, redes, CRO, Área do Aluno, números institucionais, vídeo do hero | `src/config/site.ts` |
| Cursos (datas, status, imagens, programa, professores) | `src/data/courses.ts` |
| Professores (fotos, credenciais) | `src/data/professors.ts` |
| Depoimentos, vídeos, timeline, procedimentos, galeria, blog, FAQ | `src/data/content.ts` |

Os arquivos de dados são tipados e isolados — prontos para serem trocados por um CMS (Sanity, Strapi, WordPress headless) depois.

### Status dos cursos
Calculado **automaticamente pela data** (Inscrições abertas → Turma em andamento → Turma realizada), inclusive no navegador do visitante — não fica desatualizado.
Para reproduzir textos do site atual use `manualStatus`: `esgotado`, `esgotado-aguardando`, `reserva`, `consulte`. Também existem `ultimas-vagas` e `em-breve` (não usados, pois o site atual não os informa).

## Vídeo do hero

Coloque os arquivos em `public/` mantendo os nomes:

```
public/videos/hero.mp4          (desktop · 1920×1080 · H.264 · ~6–10 MB · 15–25 s, sem áudio)
public/videos/hero-mobile.mp4   (vertical 1080×1920 ou 720p · ~3–5 MB)
public/images/hero-poster.webp  (primeiro frame do vídeo)
```

Comportamento: autoplay · muted · loop · playsInline · preload="metadata". Se o vídeo não existir, falhar, demorar mais de 4,5 s, o usuário estiver em modo economia de dados ou preferir menos movimento, o hero cai automaticamente para uma **sequência cinematográfica com as fotos reais** (Ken Burns + crossfade). O poster fica sempre por baixo — nunca há tela preta.

Sugestão de compressão: `ffmpeg -i bruto.mov -vf "scale=1920:-2,fps=25" -c:v libx264 -crf 26 -preset slow -an -movflags +faststart public/videos/hero.mp4`

## Formulários (Contato e Ficha de Inscrição)

Defina no `.env.local` (ou na Vercel):

```
NEXT_PUBLIC_CONTACT_ENDPOINT=https://formspree.io/f/xxxx
NEXT_PUBLIC_ENROLLMENT_ENDPOINT=https://...
```

Sem endpoint, o envio abre o WhatsApp correto (cursos/inscrições/pacientes) com a mensagem já preenchida.
Anti-spam: honeypot, tempo mínimo de preenchimento e limite por sessão. Nenhum dado sensível é solicitado (sem CPF, documentos ou pagamento).

## SEO técnico incluído
- Metadata por página (title, description, canonical, Open Graph, Twitter)
- JSON-LD: `EducationalOrganization`, `Dentist`/`MedicalBusiness`/`LocalBusiness`, `Course` (com `CourseInstance`), `Article`, `Person`, `FAQPage`, `BreadcrumbList`, `ItemList`
- `sitemap.xml` e `robots.txt` gerados automaticamente
- **Redirecionamentos 308** das URLs antigas do WordPress (`/cursos-1`, `/toxina-e-preenchedores`, `/especializacao-facial`…) em `next.config.mjs` — preserva o ranqueamento atual
- 75 páginas pré-renderizadas (estático + revalidação a cada 1h)

## LGPD
Banner de cookies com três níveis (necessários / análise / publicidade). O Google Tag Manager atual (`GTM-5ZVBMNC`, `GTM-MSRLBBK`) **só carrega após consentimento**. Política de privacidade em `/politica-de-privacidade`.

## Acessibilidade e performance
Skip link, foco visível, navegação por teclado (menu, lightbox, FAQ), ARIA, `prefers-reduced-motion` respeitado em todas as animações, contraste AA. Imagens via `next/image` (AVIF/WebP, lazy, responsivas), vídeos do YouTube carregados só no clique, fontes locais, ~103 kB de JS compartilhado.

---

## ⚠ Pendências para a equipe validar antes de publicar

1. **Logo oficial** — hoje há um wordmark tipográfico. Adicione `public/images/logo.svg` e defina `logoSrc` em `site.ts`.
2. **Vídeo do hero** — gravar/editar (ver especificação acima).
3. **WhatsApp da triagem**: a página Paciente Modelo antiga cita **(11) 99515-4546**; Contato e rodapé (mais recentes) citam a Central de Pacientes **(11) 94794-1467** — usamos a segunda.
4. **Especialização em HOF**: a listagem antiga diz *21–23/set/2026*; a home e a página do curso dizem *26–28/out/2026* (usado).
5. **Instagram**: o topo do site antigo linka `@medpartners_oficial`; o rodapé e Contato, `@odontopartners_oficial` (usado).
6. CEP, CNPJ/razão social, coordenadas do mapa e contato do Encarregado (DPO) — marcados como `PLACEHOLDER`.
7. **Blog**: títulos, autores e URLs são reais; o corpo integral dos 10 artigos deve ser migrado para o campo `body` (hoje a página do artigo linka o original). Os resumos dos artigos 3 a 10 são sínteses editoriais.
8. **Galeria**: as fotos reais estão classificadas como "Cursos"; ajuste as categorias (Estrutura, Alunos, Professores…) em `content.ts`.
9. **Cursos sem página detalhada no site antigo** mostram "Receber programa pelo WhatsApp" até o conteúdo ser cadastrado.
10. As imagens são carregadas do servidor atual (`odontopartners.com.br/wp-content`). Ao desligar o WordPress, copie-as para `public/` ou para um CDN e atualize as URLs.
