const {readFileSync, writeFileSync} = require('fs')
const matter = require('gray-matter')

const COLOR = require('./utils/colors')
const {DIR_TO_BLOG_POSTS, getPosts, getAuthorNames} = require('./utils/fetch')

const postsProblems = {}
const authorNames = getAuthorNames()

getPosts().forEach(fileName => {
    const problems = []
    const [year, month, day, ...title] = fileName.split('-')
    const content = readFileSync(DIR_TO_BLOG_POSTS + fileName, 'utf-8')
    console.log(COLOR.log, `[LOG]`, COLOR.reset, ` Parsing file ${fileName}`)

    if (year && month && day && title.length && typeof content === 'string') {
        const {data, content: post} = matter(content)
        let {date, published, image, author} = data

        if (!date) {
            problems.push([COLOR.warning, `[WARN]`, COLOR.reset, ` No date specified for entry. `, COLOR.log, `[FIXED]`, COLOR.reset].join(''))
            date = new Date(parseInt(year), month - 1, parseInt(day)).toISOString()
        }
        if (!image) {
            problems.push(
                (published
                    ? [COLOR.error, `[ERR]`, COLOR.reset, ` Entry has no image and is published.`]
                    : [COLOR.warning, `[WARN]`, COLOR.reset, ` Entry has no image.`]
                ).join('')
            )
        }
        if (!author || !authorNames.includes(author)) {
            problems.push([COLOR.error, `[ERR]`, COLOR.reset, ` No author matching post author ID.`].join(''))
        }
        writeFileSync(DIR_TO_BLOG_POSTS + fileName, matter.stringify(post, {...data, date, published: !!published}))
    } else {
        problems.push([COLOR.error, `[ERR]`, COLOR.reset, ` Couldn't parse file ${fileName}`].join(''))
    }

    if (problems.length > 0) {
        postsProblems[fileName] = problems
    }
})

const counter = [0, 0, 0]
Object.entries(postsProblems).forEach(([fileName, problems]) => {
    if (problems && Array.isArray(problems)) {
        counter[0] ++
        counter[1] += problems.filter(problem => problem.includes('[WARN]')).length
        counter[2] += problems.filter(problem => problem.includes('[ERR]')).length
    }
})

console.log("\n\n", COLOR.log, `RESULTS:`, COLOR.reset)
console.log("  - ", `files:    `, COLOR.log, counter[0].toString(), COLOR.reset)
console.log("  - ", `warnings: `, COLOR.warning, counter[1].toString(), COLOR.reset)
console.log("  - ", `errors:   `, COLOR.error, counter[2].toString(), COLOR.reset)
console.log("\n")

Object.entries(postsProblems).forEach(([fileName, problems]) => {
    if (problems && Array.isArray(problems)) {
        console.log('  ', COLOR.log, fileName, COLOR.reset)
        problems.forEach(info => (
            console.log('      ', info)
        ))
    }
})

console.log(COLOR.log, 'END', COLOR.reset)