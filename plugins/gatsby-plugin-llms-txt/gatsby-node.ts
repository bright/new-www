import * as fs from 'fs'
import * as path from 'path'
import type { GatsbyNode } from 'gatsby'

interface PluginOptions {
  siteUrl: string
  title: string
  description: string
  recentBlogPostLimit: number
}

interface BlogPost {
  frontmatter: {
    title: string
    slug?: string
    date: string
    author: string
    tags?: string[]
    published?: boolean
    hidden?: boolean
  }
  excerpt: string
  internal: { contentFilePath: string }
}

interface Project {
  frontmatter: {
    title: string
    slug?: string
    description?: string
  }
  internal: { contentFilePath: string }
}

interface Service {
  frontmatter: {
    meta_title?: string
    our_service_id?: string
    slug: string
    meta_description?: string
  }
  internal: { contentFilePath: string }
}

interface Member {
  name: string
  slug: string
  bio?: string
  ex?: boolean
  internal: { contentFilePath: string }
}

interface Job {
  frontmatter: {
    title: string
    slug?: string
    published?: boolean
  }
  internal: { contentFilePath: string }
}

function urlSegmentForContentPath(contentFilePath: string): string {
  return contentFilePath
    .split('/')
    .pop()!
    .replace('.md', '')
    .replace('.mdx', '')
    .replace(/([0-9]{4})-([0-9]{2})-([0-9]{2})-/, '')
}

function stripFrontmatter(content: string): string {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  return match ? match[2].trim() : content.trim()
}

function readMarkdownBody(filePath: string): string {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    return stripFrontmatter(content)
  } catch {
    return ''
  }
}

function ensureTrailingSlash(urlPath: string): string {
  return urlPath.endsWith('/') ? urlPath : urlPath + '/'
}

export const onPostBuild: GatsbyNode['onPostBuild'] = async ({ graphql }, pluginOptions) => {
  const options = pluginOptions as unknown as PluginOptions
  const { siteUrl, title, description, recentBlogPostLimit } = options
  const baseUrl = siteUrl.replace(/\/$/, '')

  // Query all content types
  const blogResult = await graphql<{
    allMdx: {
      nodes: BlogPost[]
    }
  }>(`
    query LlmsBlogPosts {
      allMdx(
        filter: { frontmatter: { layout: { eq: "post" }, published: { ne: false }, hidden: { ne: true } } }
        sort: [{ frontmatter: { meaningfullyUpdatedAt: DESC } }, { frontmatter: { date: DESC } }]
        limit: 1000
      ) {
        nodes {
          frontmatter {
            title
            slug
            date
            author
            tags
          }
          excerpt(pruneLength: 160)
          internal { contentFilePath }
        }
      }
    }
  `)

  const projectResult = await graphql<{
    allMdx: {
      nodes: Project[]
    }
  }>(`
    query LlmsProjects {
      allMdx(
        filter: { frontmatter: { layout: { eq: "project" } } }
        limit: 1000
      ) {
        nodes {
          frontmatter {
            title
            slug
            description
          }
          internal { contentFilePath }
        }
      }
    }
  `)

  const serviceResult = await graphql<{
    allMdx: {
      nodes: Service[]
    }
  }>(`
    query LlmsServices {
      allMdx(
        filter: { frontmatter: { layout: { eq: "our-service" } } }
        limit: 1000
      ) {
        nodes {
          frontmatter {
            meta_title
            our_service_id
            slug
            meta_description
          }
          internal { contentFilePath }
        }
      }
    }
  `)

  const memberResult = await graphql<{
    allMembers: {
      nodes: Member[]
    }
  }>(`
    query LlmsMembers {
      allMembers {
        nodes {
          name
          slug
          bio
          ex
          internal { contentFilePath }
        }
      }
    }
  `)

  const jobResult = await graphql<{
    allMdx: {
      nodes: Job[]
    }
  }>(`
    query LlmsJobs {
      allMdx(
        filter: { frontmatter: { layout: { eq: "job" }, published: { ne: false } } }
        limit: 1000
      ) {
        nodes {
          frontmatter {
            title
            slug
          }
          internal { contentFilePath }
        }
      }
    }
  `)

  const blogPosts = blogResult.data?.allMdx.nodes ?? []
  const projects = projectResult.data?.allMdx.nodes ?? []
  const services = serviceResult.data?.allMdx.nodes ?? []
  const members = (memberResult.data?.allMembers.nodes ?? []).filter(m => !m.ex)
  const jobs = jobResult.data?.allMdx.nodes ?? []

  // URL builders
  const blogPostUrl = (post: BlogPost) => {
    const slug = post.frontmatter.slug || urlSegmentForContentPath(post.internal.contentFilePath)
    return `${baseUrl}/blog/${slug}/index.md`
  }

  const projectUrl = (project: Project) => {
    const slug = project.frontmatter.slug || urlSegmentForContentPath(project.internal.contentFilePath)
    return `${baseUrl}/projects/${slug}/index.md`
  }

  const serviceUrl = (service: Service) => `${baseUrl}/our-areas/${service.frontmatter.slug}/index.md`

  const memberUrl = (member: Member) => `${baseUrl}/about-us/${member.slug}/index.md`

  const jobUrl = (job: Job) => {
    const slug = job.frontmatter.slug || urlSegmentForContentPath(job.internal.contentFilePath)
    return `${baseUrl}/jobs/${slug}/index.md`
  }

  // --- Generate /llms.txt ---
  const llmsTxtLines: string[] = []
  llmsTxtLines.push(`# ${title}`)
  llmsTxtLines.push('')
  llmsTxtLines.push(
    ...description
      .split(/(?<=\.)/)
      .map(s => s.trim())
      .filter(Boolean)
      .map(s => `> ${s}`)
  )
  llmsTxtLines.push('')

  // Services
  llmsTxtLines.push('## Services')
  llmsTxtLines.push('')
  for (const service of services) {
    const name = service.frontmatter.meta_title || service.frontmatter.our_service_id || service.frontmatter.slug
    const desc = service.frontmatter.meta_description || ''
    const descPart = desc ? `: ${desc.slice(0, 120)}` : ''
    llmsTxtLines.push(`- [${name}](${serviceUrl(service)})${descPart}`)
  }
  llmsTxtLines.push('')

  // Projects
  llmsTxtLines.push('## Projects')
  llmsTxtLines.push('')
  for (const project of projects) {
    const desc = project.frontmatter.description?.trim().replace(/\n/g, ' ').slice(0, 120) || ''
    const descPart = desc ? `: ${desc}` : ''
    llmsTxtLines.push(`- [${project.frontmatter.title}](${projectUrl(project)})${descPart}`)
  }
  llmsTxtLines.push('')

  // Blog (recent)
  llmsTxtLines.push('## Blog (Recent)')
  llmsTxtLines.push('')
  const recentPosts = blogPosts.slice(0, recentBlogPostLimit)
  for (const post of recentPosts) {
    const excerpt = post.excerpt?.replace(/\n/g, ' ').slice(0, 120) || ''
    const descPart = excerpt ? `: ${excerpt}` : ''
    llmsTxtLines.push(`- [${post.frontmatter.title}](${blogPostUrl(post)})${descPart}`)
  }
  llmsTxtLines.push('')

  // Team
  llmsTxtLines.push('## Team')
  llmsTxtLines.push('')
  for (const member of members) {
    const bio = member.bio || ''
    const descPart = bio ? `: ${bio}` : ''
    llmsTxtLines.push(`- [${member.name}](${memberUrl(member)})${descPart}`)
  }
  llmsTxtLines.push('')

  // Optional
  llmsTxtLines.push('## Optional')
  llmsTxtLines.push('')
  llmsTxtLines.push(`- [All Blog Posts](${baseUrl}/blog/): Full archive of ${blogPosts.length}+ blog posts`)
  llmsTxtLines.push(`- [Career](${baseUrl}/career/): Current job openings`)
  llmsTxtLines.push(`- [Start a Project](${baseUrl}/start-project/): Contact form`)
  llmsTxtLines.push('')

  const llmsTxtContent = llmsTxtLines.join('\n')
  fs.writeFileSync(path.join('./public', 'llms.txt'), llmsTxtContent, 'utf-8')
  console.log(`Generated /llms.txt (${llmsTxtContent.length} bytes)`)

  // --- Generate /llms-full.txt ---
  const fullLines: string[] = []
  fullLines.push(llmsTxtContent)
  fullLines.push('---')
  fullLines.push('')

  // Services full content
  fullLines.push('# Services')
  fullLines.push('')
  for (const service of services) {
    const name = service.frontmatter.meta_title || service.frontmatter.our_service_id || service.frontmatter.slug
    fullLines.push(`## ${name}`)
    fullLines.push('')
    fullLines.push(`*Source: ${serviceUrl(service)}*`)
    fullLines.push('')
    const body = readMarkdownBody(service.internal.contentFilePath)
    if (body) {
      fullLines.push(body)
      fullLines.push('')
    }
  }

  // Projects full content
  fullLines.push('# Projects')
  fullLines.push('')
  for (const project of projects) {
    fullLines.push(`## ${project.frontmatter.title}`)
    fullLines.push('')
    fullLines.push(`*Source: ${projectUrl(project)}*`)
    fullLines.push('')
    const body = readMarkdownBody(project.internal.contentFilePath)
    if (body) {
      fullLines.push(body)
      fullLines.push('')
    }
  }

  // Blog posts full content
  fullLines.push('# Blog Posts')
  fullLines.push('')
  for (const post of blogPosts) {
    fullLines.push(`## ${post.frontmatter.title}`)
    fullLines.push('')
    const meta: string[] = []
    if (post.frontmatter.date) meta.push(`Published: ${post.frontmatter.date.slice(0, 10)}`)
    if (post.frontmatter.author) meta.push(`Author: ${post.frontmatter.author}`)
    if (post.frontmatter.tags?.length) meta.push(`Tags: ${post.frontmatter.tags.join(', ')}`)
    if (meta.length) fullLines.push(`*${meta.join(' | ')}*`)
    fullLines.push(`*Source: ${blogPostUrl(post)}*`)
    fullLines.push('')
    const body = readMarkdownBody(post.internal.contentFilePath)
    if (body) {
      fullLines.push(body)
      fullLines.push('')
    }
  }

  const llmsFullContent = fullLines.join('\n')
  fs.writeFileSync(path.join('./public', 'llms-full.txt'), llmsFullContent, 'utf-8')
  console.log(`Generated /llms-full.txt (${(llmsFullContent.length / 1024 / 1024).toFixed(1)} MB)`)

  // --- Generate per-page .md companion files ---
  let companionCount = 0

  // Blog post companions
  for (const post of blogPosts) {
    const slug = post.frontmatter.slug || urlSegmentForContentPath(post.internal.contentFilePath)
    const urlPath = `/blog/${slug}/`
    const body = readMarkdownBody(post.internal.contentFilePath)
    if (!body) continue

    const lines: string[] = []
    lines.push(`# ${post.frontmatter.title}`)
    lines.push('')
    const meta: string[] = []
    if (post.frontmatter.date) meta.push(`Published: ${post.frontmatter.date.slice(0, 10)}`)
    if (post.frontmatter.author) meta.push(`Author: ${post.frontmatter.author}`)
    if (post.frontmatter.tags?.length) meta.push(`Tags: ${post.frontmatter.tags.join(', ')}`)
    if (meta.length) lines.push(`*${meta.join(' | ')}*`)
    lines.push(`*Source: ${baseUrl}${urlPath}*`)
    lines.push('')
    lines.push('---')
    lines.push('')
    lines.push(body)
    lines.push('')

    const outputDir = path.join('./public', urlPath)
    fs.mkdirSync(outputDir, { recursive: true })
    fs.writeFileSync(path.join(outputDir, 'index.md'), lines.join('\n'), 'utf-8')
    companionCount++
  }

  // Project companions
  for (const project of projects) {
    const slug = project.frontmatter.slug || urlSegmentForContentPath(project.internal.contentFilePath)
    const urlPath = `/projects/${slug}/`
    const body = readMarkdownBody(project.internal.contentFilePath)
    if (!body) continue

    const lines: string[] = []
    lines.push(`# ${project.frontmatter.title}`)
    lines.push('')
    if (project.frontmatter.description) {
      lines.push(`> ${project.frontmatter.description.trim().replace(/\n/g, ' ')}`)
      lines.push('')
    }
    lines.push(`*Source: ${baseUrl}${urlPath}*`)
    lines.push('')
    lines.push('---')
    lines.push('')
    lines.push(body)
    lines.push('')

    const outputDir = path.join('./public', urlPath)
    fs.mkdirSync(outputDir, { recursive: true })
    fs.writeFileSync(path.join(outputDir, 'index.md'), lines.join('\n'), 'utf-8')
    companionCount++
  }

  // Service companions
  for (const service of services) {
    const urlPath = `/our-areas/${service.frontmatter.slug}/`
    const body = readMarkdownBody(service.internal.contentFilePath)
    if (!body) continue

    const name = service.frontmatter.meta_title || service.frontmatter.our_service_id || service.frontmatter.slug
    const lines: string[] = []
    lines.push(`# ${name}`)
    lines.push('')
    if (service.frontmatter.meta_description) {
      lines.push(`> ${service.frontmatter.meta_description}`)
      lines.push('')
    }
    lines.push(`*Source: ${baseUrl}${urlPath}*`)
    lines.push('')
    lines.push('---')
    lines.push('')
    lines.push(body)
    lines.push('')

    const outputDir = path.join('./public', urlPath)
    fs.mkdirSync(outputDir, { recursive: true })
    fs.writeFileSync(path.join(outputDir, 'index.md'), lines.join('\n'), 'utf-8')
    companionCount++
  }

  // Member companions
  for (const member of members) {
    const urlPath = `/about-us/${member.slug}/`
    const body = readMarkdownBody(member.internal.contentFilePath)
    if (!body) continue

    const lines: string[] = []
    lines.push(`# ${member.name}`)
    lines.push('')
    if (member.bio) {
      lines.push(`> ${member.bio}`)
      lines.push('')
    }
    lines.push(`*Source: ${baseUrl}${urlPath}*`)
    lines.push('')
    lines.push('---')
    lines.push('')
    lines.push(body)
    lines.push('')

    const outputDir = path.join('./public', urlPath)
    fs.mkdirSync(outputDir, { recursive: true })
    fs.writeFileSync(path.join(outputDir, 'index.md'), lines.join('\n'), 'utf-8')
    companionCount++
  }

  // Job companions
  for (const job of jobs) {
    const slug = job.frontmatter.slug || urlSegmentForContentPath(job.internal.contentFilePath)
    const urlPath = `/jobs/${slug}/`
    const body = readMarkdownBody(job.internal.contentFilePath)
    if (!body) continue

    const lines: string[] = []
    lines.push(`# ${job.frontmatter.title}`)
    lines.push('')
    lines.push(`*Source: ${baseUrl}${urlPath}*`)
    lines.push('')
    lines.push('---')
    lines.push('')
    lines.push(body)
    lines.push('')

    const outputDir = path.join('./public', urlPath)
    fs.mkdirSync(outputDir, { recursive: true })
    fs.writeFileSync(path.join(outputDir, 'index.md'), lines.join('\n'), 'utf-8')
    companionCount++
  }

  // Listing page companions
  // /about-us/index.md
  {
    const lines: string[] = []
    lines.push('# Team')
    lines.push('')
    for (const member of members) {
      const bio = member.bio ? `: ${member.bio}` : ''
      lines.push(`- [${member.name}](${baseUrl}/about-us/${member.slug}/index.md)${bio}`)
    }
    lines.push('')
    const outputDir = path.join('./public', 'about-us')
    fs.mkdirSync(outputDir, { recursive: true })
    fs.writeFileSync(path.join(outputDir, 'index.md'), lines.join('\n'), 'utf-8')
    companionCount++
  }

  // /blog/index.md
  {
    const lines: string[] = []
    lines.push('# Blog Posts')
    lines.push('')
    for (const post of blogPosts) {
      const excerpt = post.excerpt?.replace(/\n/g, ' ').slice(0, 120) || ''
      const descPart = excerpt ? `: ${excerpt}` : ''
      lines.push(`- [${post.frontmatter.title}](${blogPostUrl(post)})${descPart}`)
    }
    lines.push('')
    const outputDir = path.join('./public', 'blog')
    fs.mkdirSync(outputDir, { recursive: true })
    fs.writeFileSync(path.join(outputDir, 'index.md'), lines.join('\n'), 'utf-8')
    companionCount++
  }

  // /projects/index.md
  {
    const lines: string[] = []
    lines.push('# Projects')
    lines.push('')
    for (const project of projects) {
      const desc = project.frontmatter.description?.trim().replace(/\n/g, ' ').slice(0, 120) || ''
      const descPart = desc ? `: ${desc}` : ''
      lines.push(`- [${project.frontmatter.title}](${projectUrl(project)})${descPart}`)
    }
    lines.push('')
    const outputDir = path.join('./public', 'projects')
    fs.mkdirSync(outputDir, { recursive: true })
    fs.writeFileSync(path.join(outputDir, 'index.md'), lines.join('\n'), 'utf-8')
    companionCount++
  }

  // /our-areas/index.md
  {
    const lines: string[] = []
    lines.push('# Services')
    lines.push('')
    for (const service of services) {
      const name = service.frontmatter.meta_title || service.frontmatter.our_service_id || service.frontmatter.slug
      const desc = service.frontmatter.meta_description || ''
      const descPart = desc ? `: ${desc.slice(0, 120)}` : ''
      lines.push(`- [${name}](${serviceUrl(service)})${descPart}`)
    }
    lines.push('')
    const outputDir = path.join('./public', 'our-areas')
    fs.mkdirSync(outputDir, { recursive: true })
    fs.writeFileSync(path.join(outputDir, 'index.md'), lines.join('\n'), 'utf-8')
    companionCount++
  }

  // /career/index.md
  {
    const lines: string[] = []
    lines.push('# Career')
    lines.push('')
    for (const job of jobs) {
      lines.push(`- [${job.frontmatter.title}](${jobUrl(job)})`)
    }
    lines.push('')
    const outputDir = path.join('./public', 'career')
    fs.mkdirSync(outputDir, { recursive: true })
    fs.writeFileSync(path.join(outputDir, 'index.md'), lines.join('\n'), 'utf-8')
    companionCount++
  }

  console.log(`Generated ${companionCount} markdown companion files`)
}
