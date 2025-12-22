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

  // Convert 24h time to 12h display format (e.g., "19:30" -> "7:30 PM")
  eleventyConfig.addFilter("formatTime", (time24) => {
    if (!time24) return "";
    const [hours, minutes] = time24.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 || 12;
    return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
  });

  // Add current year as a global data variable
  eleventyConfig.addGlobalData("currentYear", () => {
    return new Date().getFullYear();
  });

  // Pass through img folder to _site
  eleventyConfig.addPassthroughCopy("img");

  // Pass through admin folder for Netlify CMS
  eleventyConfig.addPassthroughCopy("admin");

  // Pass through JS files from src
  eleventyConfig.addPassthroughCopy("src/script.js");

  // Watch content folder for changes
  eleventyConfig.addWatchTarget("./content/");

  // Watch CSS partials for changes
  eleventyConfig.addWatchTarget("./src/css/");

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
