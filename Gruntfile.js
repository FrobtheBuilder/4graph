"use strict"
module.exports = function(grunt) {
    let wpops = {
        entry: "./src/index.ts",
        devtool: "#source-map",
        output: {
            path: __dirname + "/public",
            filename: "bundle.js"
        },
        resolve: {
            extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
        },
        module: {
            loaders: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader'
                }
            ]
        }
    }
    let wptestops = {
        entry: "./src/test.ts",
        devtool: "#source-map",
        output: {
            path: __dirname + "/public",
            filename: "test.js"
        },
        resolve: {
            extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
        },
        module: {
            loaders: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader'
                }
            ]
        }
    }
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        webpack: {
            default: wpops,
            test: wptestops
        },
        "webpack-dev-server": {
            options: {
                contentBase: "public/",
                keepalive: true,
                watch: true
            },
            default: {
                webpack: wpops
            },
            test: {
                webpack: wptestops
            }
        },
        copy: {
            default: {
                files: [
                    {
                        expand: true,
                        src: ["public/**", "!public/index.js"],
                        dest: "build/"
                    },
                    {
                        src: ["package.json"],
                        dest: "build/public/package.json"
                    }
                ]
            },
            nm: {
                files: [
                    {
                        src: ["package.json"],
                        dest: "public/package.json"
                    }
                ]
            }
        }
    })
    grunt.loadNpmTasks("grunt-contrib-copy")
    grunt.loadNpmTasks("grunt-webpack")

    grunt.registerTask("old", ["ts", "copy"])
    grunt.registerTask("nw", ["webpack", "copy:nm"])
    grunt.registerTask("default", ["webpack-dev-server"])
    grunt.registerTask("test", ["webpack-dev-server:test"])
}
