const {
    DateTime
} = require('luxon');
const util = require('util');
const svgContents = require("eleventy-plugin-svg-contents");
const embedEverything = require("eleventy-plugin-embed-everything");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");


module.exports = function (eleventyConfig) {

    // Add Plugins
    eleventyConfig.addPlugin(svgContents);
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPlugin(embedEverything);



    // Layout aliases for convenience
    eleventyConfig.addLayoutAlias('default', 'layouts/base.njk');
    eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');

    // a debug utility
    eleventyConfig.addFilter('dump', obj => {
        return util.inspect(obj)
    });

    // Date helpers
    eleventyConfig.addFilter('readableDate', dateObj => {
        return DateTime.fromJSDate(dateObj, {
            zone: 'utc'
        }).toFormat('LLLL d, y');
    });
    eleventyConfig.addFilter('htmlDate', dateObj => {
        return DateTime.fromJSDate(dateObj, {
            zone: 'utc'
        }).toFormat('y-MM-dd');
    });

    // Shortcode
    eleventyConfig.addShortcode("version", function () {
        return String(Date.now());
    });

    // Grab excerpts and sections from a file
    eleventyConfig.addFilter("section", require("./src/utils/section.js"));

    // compress and combine js files
    eleventyConfig.addFilter("jsmin", require("./src/utils/minify-js.js"));

    // minify the html output when running in prod
    if (process.env.NODE_ENV == "production") {
        eleventyConfig.addTransform("htmlmin", require("./src/utils/minify-html.js"));
    }

    // Static assets to pass through
    eleventyConfig.addPassthroughCopy("./src/site/fonts");
    eleventyConfig.addPassthroughCopy("./src/site/images");
    eleventyConfig.addPassthroughCopy("./src/site/css");
    eleventyConfig.addPassthroughCopy("./admin");

    eleventyConfig.addPassthroughCopy({
        "./node_modules/alpinejs/dist/alpine.js": "./src/site/_includes/js/alpine.js",
    });

    return {
        dir: {
            input: "src/site",
            includes: "_includes",
            output: "dist"
        },
        passthroughFileCopy: true,
        templateFormats: ["njk", "md"],
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk",
    };

};