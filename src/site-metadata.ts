export const siteUrl = new URL(process.env.SITE_URL || 'https://brightinventions.pl/')

export type SiteMetadata = typeof siteMetadata

export let siteMetadata = {
  title: 'Bright Inventions',
  description:
    'The best custom software development company in Poland. Through mobile apps and complex backend systems to emerging technology solutions we are creating success stories for startups, consultancy agencies as well as mid-size organisations across multiple industries including FinTech, Blockchain, HealthTech, Retail, Logistics and more.',
  author: 'Bright team',
  disqusShortname: 'brightinventions',
  siteUrl: siteUrl.href
}
