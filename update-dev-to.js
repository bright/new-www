const axios = require('axios');
const fs = require('fs');
const path = require('path');
const levenshtein = require('fast-levenshtein');
const _ = require('lodash');
const fm = require('front-matter');

const devToApi = axios.create({
    baseURL: "https://dev.to/api",
    headers: {
        'api-key': process.env.DEV_TO_API_KEY
    }
});

async function listLocalPostFiles() {
    const baseDir = path.join(__dirname, "_posts");
    const postsFiles = (await fs.promises.readdir(baseDir)).map(name => path.join(baseDir, name));
    const result = [];
    for (const filePath of postsFiles) {
        const fileStat = await fs.promises.stat(filePath);
        if (!fileStat.isDirectory()) {
            result.push({
                path: filePath,
                content: (await fs.promises.readFile(filePath, 'utf8'))
            })
        }
    }
    return result
}

function slugFromBlogPostPath(blogPost) {
    const blogPostName = path.basename(blogPost.path, '.md').replace(/^\d\d\d\d-\d?\d-\d?\d-/, '');
    return blogPostName;
}

function levenshteinDistanceToLocalFileName(article) {
    return async function (blogPost) {
        const nameToMatch = article.slug.replace(/-[^-]+$/, '');
        const blogPostName = slugFromBlogPostPath(blogPost);
        if (blogPostName.includes(nameToMatch) || nameToMatch.includes(blogPostName)) {
            return 0
        }
        const nameDistance = levenshtein.get(nameToMatch, blogPostName);
        if (nameDistance <= 10) {
            return nameDistance
        }

        if(nameDistance > Math.min(nameToMatch.length, blogPostName.length) * 0.8){
            return 100000000
        }

        const localBody = blogPost.content.replace(/^---[\s\S]*---\s*/,'');
        let remoteBody = article.body_markdown.replace(/^---[\s\S]*---\s*/,'');
        // try {
        //     remoteBody = fm(article.body_markdown).body;
        // } catch (e) {
        //     console.log('Did not extract front matter for article', article, e)
        // }
        const distance = levenshtein.get(localBody, remoteBody);
        // console.log(blogPostName, 'distance to', nameToMatch, 'is', distance)
        return distance
    }
}

async function syncCanonicalUrls() {
    const myArticles = await Promise.all((await devToApi.get("/articles/me")).data.map(async (article) => {
        return (await devToApi.get(`/articles/${article.id}`)).data;
    }));
    const blogPosts = await listLocalPostFiles();

    for (const article of myArticles) {
        if (!/^https:\/\/brightinventions\.pl/.test(article.canonical_url)) {
            const distance = levenshteinDistanceToLocalFileName(article);
            const blogPostsWithDistance = await Promise.all(blogPosts.map(async post => ({ post, distance: await distance(post) })));
            const closestMatch = _.orderBy(blogPostsWithDistance, 'distance');
            console.log('Article', article.slug, 'has invalid cannonical url', article.canonical_url);
            if (closestMatch[0].distance > 1000) {
                console.log('Article', article.slug, 'matching blog posts', closestMatch[0].distance);
            } else {
                const updated = (await devToApi.put(`/articles/${article.id}`, {
                    article: {
                        canonical_url: `https://brightinventions.pl/blog/${slugFromBlogPostPath(closestMatch[0].post)}/`
                    }
                })).data;
                console.log('Article', article.slug, 'updated to ', updated);
            }
        }
    }
}

async function main() {
    await syncCanonicalUrls();
}


main().catch(err => {
    console.log(err);
    process.exit(1)
});
