// eslint-disable-next-line
const Html = ({ body }) => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="description" content="Floodary chat" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name='HandheldFriendly' content='true' />
      <meta name='MobileOptimized' content='width' />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name="theme-color" content="#334155" />
      <link rel="manifest" type="application/manifest+json" href="manifest.json">
      <link rel="icon" href="images/icon.svg" sizes="any" type="image/svg+xml">
      <link rel="stylesheet" type="text/css" href="/css/main.css" />
    </head>
    <body>
      <div id="root">separator</div>
      <script type="text/javascript" src="/js/main.bundle.js?v=COMMITHASH"></script>
    </body>
  </html>
`
}

export default Html
