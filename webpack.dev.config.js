const webpack = require("webpack");
const config = require("./webpack.base.config");

config.devtool= 'eval-source-map';//方便调试 cheap-module-eval-source-map大型项目中打包速度快不方便调试
config.devServer= {//安装npm install -g webpack-dev-server 搭建本地服务器
		contentBase: './public/app1/',//服务器加载页面得目录
		historyApiFallback: true,//不跳转
		hot:true,
		inline: true//实时刷新,可以监控js变化
	};
config.plugins.push(new webpack.DefinePlugin({
	IS_PRODUCTION: false,
}));
/*config.module.rules.push();*/

module.exports = config;
