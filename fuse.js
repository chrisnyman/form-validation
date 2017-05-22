const { FuseBox, CSSResourcePlugin,ImageBase64Plugin, SVGPlugin, CSSPlugin, BabelPlugin } = require("fuse-box");
const fsbx = require("fuse-box")


// Create FuseBox Instance
let fuse = new FuseBox({
    homeDir: "src/",
    sourcemaps: true,
    outFile: "./build/out.js",
    plugins: [
        // UglifyJSPlugin(options),
        ImageBase64Plugin(),
        [CSSResourcePlugin({
            dist: "build/resources",
            resolve: (f) => `/resources/${f}`
        }), CSSPlugin()],
        SVGPlugin(),
        BabelPlugin()
    ]
});

fuse.devServer(">index.jsx", {
    port: 3333
});
