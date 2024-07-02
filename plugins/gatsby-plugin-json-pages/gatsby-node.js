const path = require("path");
const fs = require("fs");

exports.onPostBuild = async ({ graphql }, pluginOptions) => {
  const { pages } = pluginOptions;

  for (const page of pages) {
    const { query, fileName, transformer = (obj) => obj } = page;

    const result = await graphql(query);
    const output = await transformer(result);

    const outputPath = path.join("./public", `${fileName}.json`);
    const outputDir = path.dirname(outputPath);

    if (!(await fs.existsSync(outputDir))) {
      await fs.mkdirSync(outputDir);
    }

    await fs.writeFileSync(outputPath, JSON.stringify(output));
  }
};
