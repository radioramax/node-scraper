var httpAgent = require('http-agent'),
    jsdom = require('jsdom'),
    sys = require('sys');

//var sizzle = require('./sizzle');

var agent = httpAgent.create('www.google.com', ['finance', 'news', 'images']);

agent.addListener('next', function (err, agent) {

  sys.puts('Body of the current page: ' + agent.body);

  var window = jsdom.jsdom(agent.body).createWindow();
  // jsdom.Sizzlify(window, './sizzle.js', function (window, sizzle) {
  // Sizzle is now loaded on the jsdom window created from 'agent.body'
  // Sizzle('.someClass').each();
  var sizzleSandbox = {};
  var sizzle = require("./sizzle").sizzleInit(sizzleSandbox, window);
  sys.puts(sys.inspect(sizzle('div:').length));

  agent.next();
  //});
});

agent.addListener('stop', function (agent) {
  sys.puts('the agent has stopped');
});

agent.start();
