import { site, fullAddress } from "@/config/site";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";

export const metadata = pageMeta({
  title: "Política de Privacidade e Cookies",
  description: "Como a Odonto Partners trata dados pessoais e cookies, em conformidade com a LGPD (Lei nº 13.709/2018).",
  path: "/politica-de-privacidade",
});

const sections: [string, string[]][] = [
  ["1. Quem somos", [`${site.legalName}, clínica-escola localizada em ${fullAddress}. Contato para assuntos de privacidade: ${site.contact.email}.`, "⚠ PLACEHOLDER: inserir razão social, CNPJ e nome/contato do Encarregado de Dados (DPO)."]],
  ["2. Dados que coletamos", ["Dados que você nos envia voluntariamente pelos formulários de contato e de pré-inscrição: nome, e-mail, telefone/WhatsApp, profissão, registro profissional (opcional), cidade/UF e mensagens.", "Não solicitamos CPF, documentos, dados de saúde ou dados de pagamento por meio deste site."]],
  ["3. Para que usamos", ["Responder ao seu contato; processar a sua pré-inscrição e confirmar vagas; enviar informações sobre cursos que você solicitou; cumprir obrigações legais.", "Base legal: execução de procedimentos preliminares a contrato, legítimo interesse e consentimento (art. 7º da LGPD)."]],
  ["4. Cookies", ["Necessários: essenciais ao funcionamento do site e para lembrar suas preferências de privacidade.", "Análise e desempenho / Publicidade: carregados somente com o seu consentimento, por meio do Google Tag Manager. Você pode alterar sua escolha a qualquer momento em “Preferências de cookies”, no rodapé."]],
  ["5. Compartilhamento", ["Os dados podem ser processados por fornecedores que nos ajudam a operar o site e os canais de atendimento (hospedagem, formulários, WhatsApp, ferramentas de análise), sempre limitados à finalidade informada."]],
  ["6. Retenção e segurança", ["Mantemos os dados pelo tempo necessário às finalidades informadas ou exigido por lei, adotando medidas técnicas e administrativas para protegê-los."]],
  ["7. Seus direitos", ["Você pode solicitar confirmação de tratamento, acesso, correção, anonimização, portabilidade, eliminação e revogação do consentimento, pelo e-mail " + site.contact.email + "."]],
  ["8. Atualizações", ["Esta política pode ser atualizada. ⚠ PLACEHOLDER: data da última revisão."]],
];

export default function Page() {
  return (
    <>
      <PageHero eyebrow="LGPD" crumbs={[{ name: "Privacidade", href: "/politica-de-privacidade" }]} title={["Política de privacidade", <>e <em>cookies.</em></>]} intro="Transparência sobre como tratamos os seus dados — em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018)." />
      <section className="bg-ink pb-28 text-bone">
        <div className="mx-auto max-w-3xl space-y-12 px-5 md:px-8">
          {sections.map(([t, ps]) => (
            <div key={t} className="border-t border-bone/10 pt-8">
              <h2 className="font-serif text-3xl">{t}</h2>
              {ps.map((p) => <p key={p.slice(0, 20)} className="mt-4 leading-relaxed text-bone/70">{p}</p>)}
            </div>
          ))}
          <button type="button" data-open-cookie-preferences className="btn btn-ghost">Alterar preferências de cookies</button>
        </div>
      </section>
    </>
  );
}
