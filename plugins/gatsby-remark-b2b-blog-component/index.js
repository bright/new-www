const { readFileSync } = require('fs');
const { parse } = require('yaml');
const { BOX_COPY, GENERAL_COPY } = require('./config');

const isIntersection = (arr1, arr2) => arr1.some((item) => arr2.includes(item));

module.exports = ({ markdownAST, markdownNode, pathPrefix }) => {
  const isPost = markdownNode.frontmatter.layout === 'post'

  if (!isPost) return markdownAST

  const tagGroupsContent = readFileSync('tag-groups.yml', 'utf8');
  const { groups } = parse(tagGroupsContent);
  const copyMap = Object.entries(BOX_COPY).map(([key, copy]) => {
    const aliases = groups.find(({ name, tags }) => name === key)?.tags || [];

    return {
      key: key.toLocaleLowerCase(),
      aliases: aliases.map(a => a.toLocaleLowerCase()),
      copy,
    }
  });
  const h2Headings = markdownAST.children.filter(({ type, depth }) => type === 'heading' && depth === 2)
  const postTags = markdownNode.frontmatter.tags.map(t => t.toLocaleLowerCase()) || []
  const copyFoundByTag = copyMap.find(({ key }) => postTags.includes(key))?.copy;
  const copyFoundByAlias = copyMap.find(({ aliases }) => isIntersection(postTags, aliases))?.copy;

  const copy = copyFoundByTag || copyFoundByAlias || GENERAL_COPY;

  const boxNode = {
    type: 'html',
    value: `<a href="/projects/" class="bbc-wrapper">
      <div class='bbc-wrapper__tab'></div>
      <div class='bbc-wrapper__inner'>
        <div class='bbc-content'>${copy}</div>
        <div class='bbc-cta'>
          <span>case studies</span>
        </div>
      </div>
    </a>`,
  };

  if (h2Headings.length < 3) {
    markdownAST.children.push(boxNode);
  } else {
    const index = markdownAST.children.findIndex((child) => child === h2Headings[1]);

    markdownAST.children.splice(index, 0, boxNode);
    markdownAST.children.push(boxNode);
  }

  return markdownAST
}
