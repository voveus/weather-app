const path = require('path');

module.exports = {
	devtool: 'source-map',
	entry: './js/app.js',
	output: {
		path: path.resolve(__dirname),
		filename: 'build.js'
	},
	resolve: {
		extensions: ['.js']
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: { 
						presets: [ 'env' ]
					}
				}
			}
		]
	}
};

  