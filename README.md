**A Mincer engine to for serving Ember-friendly Handlebars templates.**

[Mincer](https://github.com/nodeca/mincer) is a badass JavaScript port of Sprockets that makes it super-duper easy to serve dynamically generated assets in your connect or express app. You'll want to be familiar with its use before you try using this package.

Note*: this engine **overrides** the built-in Handlebars engine. Furthermore, there is no need to pair your template files with the built-in EJS engine. Naming your files `[my-template].hbs` will do.

## How to use this old thing

First, install the package:

`npm install mincer-ember-hbs-engine --save`

Then, wherever you've set up your Mincer environment:

```javascript

// Requirements
var mincer = require('mincer');
var mincerEmberHbs = require('mincer-ember-hbs-engine');

// Asset pipeline
var pipeline = new mincer.Environment();
pipeline.registerEngine('.hbs', mincerEmberHbs);
```

Assuming a directory structure similar to this…

```text
app/
    assets/
        javascripts/
            templates/
                application.hbs
                home.hbs
            templates.js
```

…you can now create a manifest for your templates, like this:

`app/assets/javascripts/templates.js`

```javascript
//= require_tree ./templates
```

### But wait a second…

*This engine never defines a default `Ember.TEMPLATES` object like the JST engine does!*

Not to fear, Ember handles defining `Ember.TEMPLATES` as an empty object. Make sure that your templates aren't instantiated before Ember and you'll be A-OK.

*What if I want to use JST templates at the same time?*

At this time, the only way to achieve that would be to register this engine under a different file extension, leaving the default `.hbs` engine intact.

## Credits

Uproarious applause goes to [@ixti](http://github.com/ixti) and [@puzrin](http://github.com/puzrin) for their incredible work on Mincer. Further thanks for [@Nthalk](http://github.com/Nthalk) for a great example of a [simple Mincer engine](https://github.com/Nthalk/mincer-emblem-engine).

## Author

[Mike Fowler](http://github.com/mikefowler) ([@michaelrfowler](http://twitter.com/michaelrfowler) on Twitter)

## License

Copyright (c) 2014 [Mike Fowler](http://github.com/mikefowler)

Released under the MIT license. See [LICENSE](https://github.com/mikefowler/mincer-ember-hbs-engine/blob/master/LICENSE) for details.