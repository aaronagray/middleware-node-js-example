var http = require('http')

var rocket = function() {
  this.port = 3000
  this.cb = function() {
    console.log('Listening on ' + this.port)
  }

  this.queueIndex = 0
  this.cbQueue = []
}

rocket.prototype.use = function (fn) {
  this.cbQueue.push(fn)
}

rocket.prototype.listen = function (port, cb) {

  var server = http.createServer(function(req, res) {
    var next = function() {
      this.queueIndex++
      this.cbQueue[this.queueIndex].call(this, req, res, next)
    }.bind(this)

    this.cbQueue[this.queueIndex].call(this, req, res, next)
  }.bind(this))

  server.listen(this.port)
}

module.exports = rocket
