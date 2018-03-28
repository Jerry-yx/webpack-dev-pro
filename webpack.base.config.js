const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
/*const CleanWebpackPlugin = require('clean-webpack-plugin')*/
const bundleConfig = require("./public/vendor/bundle-config.json");
const ExtractCss = require("extract-text-webpack-plugin");
const ExtractLess = require("extract-text-webpack-plugin");
const path = require('path');

module.exports ={
	entry: {
		app1:__dirname +'/apps/app/index.js',
		app2:__dirname+'/apps/appTwo/index.js'
	},//path.resolve是nodeJs里面方法，可以连接两个相对路径并生成绝对路径；__dirname node.js全局变量  __dirname 表示当前文件所在的目录的绝对路径 __filename 表示当前文件的绝对路径
	output: { 
		filename: '[name]/js/bundle.js',
		path: __dirname + "/public"
	},
	module: {
		rules: [{
				test:/\.css$/,
				use: ExtractCss.extract({
					fallback:[{
						loader: "style-loader"//将所有的计算后的样式加入页面中
					}],
					use: [{
						loader: 'css-loader',//能够使用类似@import 和 url(...)的方法
						options: {
					        minimize: true,
					        '-autoprefixer': true,
							modules: true,
							localIdentName: '[name]_[local]--[hash:base64:5]'//制定css类名格式 可防止局部css污染全局样式
						}
					},{
						loader:'postcss-loader'//import得css也要用postcss-loader处理？？？
					}]  
				})

			},{
				test: /\.less$/,
				use:ExtractLess.extract({
					fallback:[{
						loader: "style-loader"//将所有的计算后的样式加入页面中
					}],
					use: [{
						loader: 'css-loader',//能够使用类似@import 和 url(...)的方法
						options: {
							minimize: true,
					        '-autoprefixer': true,
							modules: true,
							localIdentName: '[name]_[local]--[hash:base64:5]'//制定css类名格式 可防止局部css污染全局样式
						}
					},{
						loader:'less-loader'
					},{
						loader:'postcss-loader'//import得css也要用postcss-loader处理？？？
					}]
				})
			},{
				test:/(\.jsx|\.js)$/,//正则表达式筛选文件
				use:{
					loader:'babel-loader',//loader
				},
				exclude: path.resolve(__dirname,'./node_modules/') //排除不需要处理文件
			},{
				test: /\.[png|jpg|svg|gif]$/,
				use: [{
					loader: "file-loader",
					options:{
						outputPath: "images/",
						name:"[name]-[hash:base64:5].[ext]"
					}
				},{
					loader: "url-loader",
					options:{
						limit:2000
					}
				},{
					loader: "image-webpack-loader",
				}]
			},{
		        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
		        use:
		        [
		          {
		            loader: 'url-loader',
		            options:
		            {
		              limit: 8192,
		              mimetype: 'application/font-woff',
		              name: 'fonts/[name].[ext]'
		            }
		          }
		        ]
		    },{
		        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
		        use:
		        [
		          {
		            loader: 'file-loader',
		            options:
		            {
		              limit: 8192,
		              mimetype: 'application/font-woff',
		              name: 'fonts/[name].[ext]'
		            }
		          }
		        ]
		    }
		]
	},
	plugins: [
		// webpack 内置的 banner-plugin
	    new webpack.BannerPlugin("Copyright by https://github.com/yuanxuyan."),
		new webpack.HotModuleReplacementPlugin(),
		/*new webpack.optimize.CommonsChunkPlugin({//打包公共代码
			name:'commons',//命名公共代码的chunk
			filename:'[name].bundle.js',
			minChunks:2,//最少引用次数
			//chunks默认为所有chunk
		}),*/
		new webpack.DllReferencePlugin({
			manifest: require('./public/vendor/manifest.json'),//指定manifest.json
			context: __dirname,
		}),
		new HtmlWebpackPlugin({
			template:__dirname + "/apps/index.html",
			filename:__dirname + "/public/app1/index.html",
			title:"my html1",
			inject:'false',
			//chunks:['app1','commons']//添加公共的模块到html。CommonsChunkPlugin的name.
			chunks:['app1']
		}),
		new HtmlWebpackPlugin({
			template:__dirname + "/apps/index.html",
			filename:__dirname + "/public/app2/index.html",
			title:"my html2",
			inject:'false',
			//chunks:['app2','commons'],
			chunks:['app2'],
		}),
		/*利用bundleName添加进去*/
		new AddAssetHtmlPlugin({//与html-webpacl-plugin配合添加dll到html里面
			filepath: path.resolve(__dirname, './public/vendor/'+bundleConfig.vendor.js),
		}),
		/*new CleanWebpackPlugin(path.resolve('./public/app'),{
			verbose:false
		})*/
		new ExtractCss({filename:"css/styles-[hash].css"}),//将inline css提取到单独的css文件。
		new ExtractLess({filename:"css/styles-[hash].css"}),//将inline css提取到单独的css文件。
		//// 现在是默认启用,不再需要手动启动 new webpack.optimize.OccurenceOrderPlugin();//将用的最多的模块ID弄成最小的。通过分析ID，可以建议降低总文件的大小
	]
};