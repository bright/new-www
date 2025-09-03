export const siteUrl = new URL(process.env.GATSBY_SITE_URL || 'https://brightinventions.pl/')

export type SiteMetadata = typeof siteMetadata

export let siteMetadata = {
  title: 'Bright Inventions',
  description:
    'A leading digital product agency in Poland. From mobile apps and complex backend systems to emerging technology solutions, we create success stories for startups, consultancy agencies, and mid-size organisations across industries including FinTech, Blockchain, HealthTech, Retail, Logistics and more.',
  author: 'Bright team',
  disqusShortname: 'brightinventions',
  siteUrl: siteUrl.href,
}
