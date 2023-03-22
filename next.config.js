const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self';
  style-src 'self' fonts.googleapis.com;
  font-src 'self' fonts.gstatic.com;
  img-src 'self';
`

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  // {
  //   key: "Content-Security-Policy",
  //   value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
  // },
]

module.exports = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ]
  },
}
