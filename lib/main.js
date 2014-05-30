'use strict';

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

var fs = require('fs');
var mincer = require('mincer');
var compiler = require('ember-template-compiler');

// -----------------------------------------------------------------------------
// Globals
// -----------------------------------------------------------------------------

var options = {
	templatePath: '/templates'
};

// -----------------------------------------------------------------------------
// Engine
// -----------------------------------------------------------------------------

// This engine inherits from the base Mincer.Template

var EmberHbsEngine = module.exports = function () {
	mincer.Template.apply(this, arguments);
};

// Provides a helper method for setting default options

EmberHbsEngine.options = function (opts) {
	opts = opts || {};
	options = opts;
};

// Handlebars templates are compiled to standard
// JavaScript so set the MIME type accordingly. Mincer
// engines require this to be set for proper compilation.

EmberHbsEngine.defaultMimeType = 'application/javascript';

// Evaluate files running through this engine

EmberHbsEngine.prototype.evaluate = function (context) {
	
	var self = this;
	var template, templatePath, root;

	// Compile the template, passing the file's data through the
	// Ember template compiler and casting the result to a String
	template = compiler.precompile(self.data).toString();
		
	// Loop through each asset path defined in this Mincer environment.
	// For each one, determine if the file being processed is in that
	// asset path, and get the realpath if it is. 
	root = false;
	context.environment.paths.forEach(function (path) {
		path = path + options.templatePath;
		if (self.file.indexOf(path) === 0) {
			root = fs.realpathSync(path);
		}
	});

	// To form the template “name”, trim the template
	// path down to the root directory…
	templatePath = this.file.substring(root.length + 1);

	// …and then remove the file extension.
	templatePath = templatePath.split('.')[0];

	// Return the template wrapped in Ember.Handlebars.template, and
	// nested inside of the Ember.TEMPLATES object.
	return '\nEmber.TEMPLATES["' + templatePath + '"] = Ember.Handlebars.template(' + template + ');\n'; 

};
