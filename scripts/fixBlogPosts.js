const {readdirSync, readFileSync, writeFileSync} = require('fs')
const {execSync} = require('child_process')
const matter = require('gray-matter')

const DIR_TO_BLOG_POSTS = './src/pages/blog/'

readdirSync(DIR_TO_BLOG_POSTS).forEach(fileName => {
    const [year, month, day, ...title] = fileName.split('-')
    const content = readFileSync(DIR_TO_BLOG_POSTS + fileName, 'utf-8')

    if (year && month && day && title.length && typeof content === 'string') {
        console.log("\n", `[LOG] Parsing file ${fileName}`)
        const {data, content: post} = matter(content)
        let {date, published} = data

        if (!date) {
            console.log(`[WARNING] No date specified for entry.`)
            date = new Date(+year, month - 1, +day).toISOString()
            writeFileSync(DIR_TO_BLOG_POSTS + fileName, matter.stringify(post, {...data, date, published: !!published}))
        }

        // const {layout, title, extract, excerpt, crosspost, image, author, tags, hidden, comments, ...restData} = data
        // console.log(`Y: ${year}, M: ${month}, D: ${day}, DATA: `, date, restData)
    } else {
        console.error(`[ERROR] Couldn't parse file ${fileName}`)
    }
})