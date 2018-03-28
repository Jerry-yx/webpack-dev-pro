const webpack = require("webpack");
const config = require("./webpack.base.config");

//config.module.rules.push();

config.plugins.push(
	new webpack.DefinePlugin({//定义key-value，系统中未定义的变量key的值就为value
	  IS_PRODUCTION: true,
	}),
	new webpack.optimize.UglifyJsPlugin({//压缩代码
            compress:{
                warnings:false //输出不显示警告
            },
            output:{
                comments:false  //输出去掉注释
            }
    }),
)

module.exports = config;