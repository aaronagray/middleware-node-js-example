var Rocket = require('./rocket')
var app = new Rocket()

app.use(function(req, res, next) {
  console.log('first', req.url)
  next()
})

app.use(function(req, res, next) {
  console.log('second', req.url)
  next()
})

app.use(function(req, res, next) {
  console.log('third', req.url)
  res.end('Fuck yeah')
})

app.listen()
