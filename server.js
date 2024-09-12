// mostly compied from https://github.com/bluwy/create-vite-extra/blob/master/template-ssr-react/server.js
import fs from 'node:fs/promises';
import express from 'express';
import { Transform } from 'node:stream'

// Constants
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5173;
const base = process.env.BASE || '/';
const ABORT_DELAY = 10000;

// Cached production assets
const templateHTMLProduction = isProduction
	? await fs.readFile('./index.html', 'utf-8')
	: '';
const inlineCSSProduction = isProduction
	? await fs.readFile('./src/inline.css', 'utf-8')
	: '';
const inlineJSProduction = isProduction
	? await fs.readFile('./src/theme-manager.js', 'utf-8')
	: '';
const ssrManifest = isProduction
	? await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8')
	: undefined;

// Create http server
const app = express();

// Add Vite or respective production middlewares
let vite;
if (!isProduction) {
	const { createServer } = await import('vite');
	vite = await createServer({
		server: { middlewareMode: true },
		appType: 'custom',
		base
	});
	app.use(vite.middlewares);
} 
else {
	const compression = (await import('compression')).default;
	const sirv = (await import('sirv')).default;
	app.use(compression());
	app.use(base, sirv('./dist/client', { extensions: [] }));
}

// Serve HTML
app.use('*', async (req, res) => {
	const url = req.originalUrl.replace(base, '');

	try {
		let templateHTML, inlineCSS, inlineJS, render;
		if (!isProduction) {
			templateHTML = await fs.readFile('./index.html', 'utf-8');
			templateHTML = await vite.transformIndexHtml(url, templateHTML);

			inlineCSS = await fs.readFile('./src/inline.css', 'utf-8');
			inlineJS = await fs.readFile('./src/theme-manager.js', 'utf-8');

			render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
		}
		else {
			templateHTML = templateHTMLProduction;
			inlineCSS = inlineCSSProduction;
			inlineJS = inlineJSProduction
			render = (await import('./dist/server/entry-server.js')).render
		}
		const html = templateHTML
			.replace('<!--inline-css-->', `<style>${inlineCSS}</style>`)
			.replace('<!--inline-js-->', `<script>${inlineJS}</script>`);

		let didError = false

		const { pipe, abort } = await render(req, res, url, ssrManifest, {
			onShellError() {
				res.status(500);
				res.set({ 'Content-Type': 'text/html' });
				res.send('<h1>Something went wrong</h1>');
			},
			onShellReady() {
				res.status(didError ? 500 : 200);
				res.set({ 'Content-Type': 'text/html' });

				const transformStream = new Transform({
					transform(chunk, encoding, callback) {
						res.write(chunk, encoding);
						callback();
					}
				});

				const [htmlStart, htmlEnd] = html.split(`<!--app-html-->`);

				res.write(htmlStart);

				transformStream.on('finish', () => {
					res.end(htmlEnd);
				});
				
				pipe(transformStream);
			},
			onError(error) {
				didError = true;
				console.error(error);
			}
		});
		
		setTimeout(() => {
			try {
				abort();
			}
			catch (e) {
				console.error(e);
			}
		}, ABORT_DELAY);
	} catch (e) {
		vite?.ssrFixStacktrace(e)
		console.log(e.stack)
		res.status(500).end(e.stack)
	}
});

// Start http server
app.listen(port, () => {
	console.log(`Server started at http://localhost:${port}`)
});