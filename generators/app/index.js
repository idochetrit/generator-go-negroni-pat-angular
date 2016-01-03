'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      '################################### *** ###################################' +
      '##            Welcome to Go + AngularJS Microservice Generator           ##' +
      '################################### *** ###################################'
    ));
    this.log(yosay(
      'Please make sure you have go deps before you run the Go server...' +
      'You can install it by writing the following command: \'go get github.com/tools/godep\''
    ));

    var prompts = [{
      type: 'input',
      name: 'go_port',
      message: 'What port do you want to run the go server? (default: 5050):',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
    this.log(yosay(
      'Don\'t forget to execute \'godep restore\' and \'godep get\' in the root directory of you\'r new project !'
    ));
  },

  writing: function () {
    this.template('_generator.json', 'generator.json');
    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.template('bowerrc', '.bowerrc');
    this.template('Gruntfile.js', 'Gruntfile.js');
    this.copy('gitignore', '.gitignore');

    var modelsDir = 'models/';
    var publicDir = 'public/';
    var routesDir = 'routes/';
    this.mkdir(modelsDir);
    this.mkdir(publicDir);
    this.mkdir(routesDir);

    // Go config
    this.mkdir('config/');
    this.mkdir('config/environments/');
    this.copy('config/environments/_development.yml', 'config/environments/development.yml');
    this.template('config/environments/_production.yml', 'config/environments/production.yml');
    this.template('_server.go', 'server.go');

    var publicCssDir = publicDir + 'css/';
    var publicJsDir = publicDir + 'js/';
    var publicViewDir = publicDir + 'views/';
    this.mkdir(publicCssDir);
    this.mkdir(publicJsDir);
    this.mkdir(publicViewDir);
    this.template('public/_index.html', publicDir + 'index.html');
    this.copy('public/css/app.css', publicCssDir + 'app.css');
    this.template('public/js/_app.js', publicJsDir + 'app.js');
    this.template('public/js/home/_home-controller.js', publicJsDir + 'home/home-controller.js');
    this.template('public/views/home/_home.html', publicViewDir + 'home/home.html');
  },

  install: function () {
    this.installDependencies();
  }
});
