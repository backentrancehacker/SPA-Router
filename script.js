const app = new Router(document.getElementById('root'))

const links = 
`
<a href="/">Home</a>
<a href="/about">About</a>
<a href="/contact">Contact</a>
<a href="https://twitter.com/AdCharity2">Twitter</a>
`
app.get('/', home.render({links}))
app.get('/about', about.render({links, name: 'AdCharity'}))
app.get('/contact', contact.render({links}))
app.start()