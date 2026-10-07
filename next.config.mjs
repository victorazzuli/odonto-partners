/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "odontopartners.com.br", pathname: "/wp-content/**" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/videos/(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
  // Redirecionamentos das URLs antigas (WordPress) para as novas — preserva SEO
  async redirects() {
    return [
      { source: "/cursos-1", destination: "/cursos/harmonizacao-facial", permanent: true },
      { source: "/cursos-odontologia-classica", destination: "/cursos/odontologia-classica", permanent: true },
      { source: "/agenda", destination: "/cursos", permanent: true },
      { source: "/politica-de-cookies", destination: "/politica-de-privacidade", permanent: true },
      { source: "/toxina-e-preenchedores", destination: "/curso/toxina-e-preenchedores-step-one-na-hof", permanent: true },
      { source: "/residencia-clinica-avancada-em-hof", destination: "/curso/residencia-clinica-avancada-em-hof", permanent: true },
      { source: "/especializacao-facial", destination: "/curso/especializacao-em-harmonizacao-orofacial", permanent: true },
      { source: "/emergencias-medicas-em-odontologia", destination: "/curso/emergencias-medicas-em-odontologia", permanent: true },
      { source: "/tecnologia-na-hof", destination: "/curso/tecnologia-na-hof", permanent: true },
      { source: "/recobrimento-radicular", destination: "/curso/recobrimento-radicular", permanent: true },
    ];
  },
};
export default nextConfig;
