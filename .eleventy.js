const markdownIt = require("markdown-it");

module.exports = function(eleventyConfig) {

  // Configure markdown-it for inline markdown rendering
  const md = markdownIt({
    html: true,
    breaks: false,
    linkify: true
  });

  // Add markdown filter for inline content
  eleventyConfig.addFilter("markdown", (content) => {
    return md.renderInline(content);
  });

  // Add markdownFull filter for block-level content (paragraphs, lists, etc.)
  eleventyConfig.addFilter("markdownFull", (content) => {
    return md.render(content);
  });

  // Add current year as a global data variable
  eleventyConfig.addGlobalData("currentYear", () => {
    return new Date().getFullYear();
  });

  // Pass through img folder to _site
  eleventyConfig.addPassthroughCopy("img");

  // Pass through admin folder for Netlify CMS
  eleventyConfig.addPassthroughCopy("admin");

  // Pass through CSS and JS files from src
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("src/script.js");

  // Watch content folder for changes
  eleventyConfig.addWatchTarget("./content/");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "partials",
      layouts: "layouts",
      data: "../content"
    },
    templateFormats: ["njk", "html", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
