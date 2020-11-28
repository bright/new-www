const {readdirSync, readFileSync} = require('fs')
const matter = require('gray-matter')

const DIR_TO_BLOG_POSTS = './src/pages/blog/'
const DIR_TO_AUTHORS = './src/pages/about-us/'

const getPosts = () => readdirSync(DIR_TO_BLOG_POSTS)
const getAuthors = () => readdirSync(DIR_TO_AUTHORS)
const getAuthorNames = () => (
    getAuthors()
        .map(fileName => matter(readFileSync(DIR_TO_AUTHORS + fileName, 'utf-8')).data.author_id)
        .filter(authorId => authorId)
)

module.exports = {
    DIR_TO_BLOG_POSTS,
    getPosts,
    getAuthors,
    getAuthorNames,
}
