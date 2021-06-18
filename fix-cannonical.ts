import { readdir, readFile, writeFile } from 'fs/promises'
import { join as pathJoin } from 'path'
import { promisify } from 'util'
import readline from 'readline'
import matter from 'gray-matter'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

async function answer(question: string): Promise<string> {
  return new Promise(resolve => {
    rl.question(question, resolve)
  })
}

async function main() {
  const basePath = pathJoin(__dirname, 'content', 'blog')
  const blogPostsFiles = await readdir(basePath)

  const blogPosts = await Promise.all(
    blogPostsFiles.map(async blogPost => {
      const filePath = pathJoin(basePath, blogPost)
      return {
        matter: matter(await readFile(filePath)),
        filePath,
      }
    })
  )

  const blogPostsCross = blogPosts
    .filter(post => post.matter.data.crosspost)
    .filter(post => post.matter.data.author == 'piotr')
    .filter(post => !post.matter.data.canonical_url)

  for (const blogPost of blogPostsCross) {
    const canonicalUrl = await answer(`Canonical url for ${blogPost.filePath}:\n`)
    if (canonicalUrl) {
      console.log('Setting canonical url to', canonicalUrl)
      blogPost.matter.data.canonical_url = canonicalUrl
      const newContent = matter.stringify(blogPost.matter, blogPost.matter.data)
      await writeFile(blogPost.filePath, newContent)
    }
  }

  rl.close()
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
