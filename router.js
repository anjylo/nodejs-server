const path = require('path')

const routes = [
    {
        path: '/',
        component: path.join('public', 'index.html')
    },
]

module.exports = (url) => {
    const route = routes.find((route) => route.path === url)

    return route ? route.component : path.join('public', 'pages', '404.html');
}