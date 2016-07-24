# webpack-tests - webpack-dev-server-client_code-sandbox

Implementing the first [documentation on the site](https://webpack.github.io/docs/webpack-dev-server.html)
putting on some silly client code.

- build with .\node_modules\.bin\webpack
- run with  .\node_modules\.bin\webpack-dev-server --content-base . (basic usage)
- run with  .\node_modules\.bin\webpack-dev-server --content-base . --inline (automatic refresh)
- should run HMR with .\node_modules\.bin\webpack-dev-server --content-base . --inline --hot (but it does not run and the page reloads at each module change...)

Make sure you have prepared a ./index.html file invoking the bundle. Load it in the browser at port 8080.