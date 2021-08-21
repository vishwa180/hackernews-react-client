const webpack = require('webpack');
const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				include: [path.resolve(__dirname, 'src')],
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env', '@babel/preset-react'],
							plugins: ['@babel/plugin-transform-runtime', 'transform-class-properties'],
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['*', '.js', '.jsx'],
	},
	output: {
		path: __dirname + '/public/dist/js/',
		publicPath: '/dist/js/',
		filename: 'bundle.js',
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new ESLintPlugin({
			files: 'src/',
		}),
	],
	devServer: {
		static: './public',
		hot: true,
	},
};
