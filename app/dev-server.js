/* eslint-disable no-console */
/**
 * Setup and run the development server for Hot-Module-Replacement
 * https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
 */

const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const spawn = require('child_process').spawn;
const config = require('../webpack.development.config');


const app = express();
const compiler = webpack(config);
const PORT = process.env.PORT || 1337;

const wdm = webpackDevMiddleware(compiler, {
	publicPath: config.output.publicPath,
	stats: {
		colors: true
	}
});

app.use(wdm);

app.use(webpackHotMiddleware(compiler));

const server = app.listen(PORT, 'localhost', serverError => {
	if (serverError) {
		return console.error(serverError);
	}

	spawn('npm', ['run', 'start'], { shell: true, env: process.env, stdio: 'inherit' })
		.on('close', code => process.exit(code))
		.on('error', spawnError => console.error(spawnError));

	console.log(`Listening at http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
	console.log('Stopping dev server');
	wdm.close();
	server.close(() => {
		process.exit(0);
	});
});
