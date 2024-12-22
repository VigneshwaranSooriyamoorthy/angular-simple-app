
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/angular-simple-app/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/angular-simple-app"
  }
],
  assets: {
    'index.csr.html': {size: 532, hash: '28d9fd4b6ee43f1ceff1ac70f69ee5604142fb2d1cf8890e28d59587963297cb', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1045, hash: '0e8d4b3638afdbebd92dbeeb1e0c4a0c9b8672ebb295561b5d178ccd17b6600b', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 20869, hash: '22a1f2e1f030b34c8849237bd0b49a49669fec0869bbaed17c3ec2612e4ca54b', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
