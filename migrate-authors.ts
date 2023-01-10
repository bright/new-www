const matter = require('gray-matter')
const fs = require('fs/promises')
const path = require('path')

async function main() {
  const blogPosts = await fs.readdir('content/blog')
  for (const blog of blogPosts) {
    const blogPostPath = path.join('content', 'blog', blog)
    const { data, content } = matter(await fs.readFile(blogPostPath, 'utf-8'))
    const updatedContent = matter.stringify(content, {
      ...data,
      authors: [data.author, data.secondAuthor, data.thirdAuthor].filter(authorId => authorId),
    })

    await fs.writeFile(blogPostPath, updatedContent, 'utf-8')
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})

export {}
