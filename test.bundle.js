/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var EnhancedMocha = __webpack_require__(3);
	var mocha = new EnhancedMocha({reporter: "spec"});
	mocha.addFile("!!/Users/A750881/Desktop/snake/node_modules/babel-loader/index.js!/Users/A750881/Desktop/snake/test/index.js");
	mocha.watch();

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Mocha = __webpack_require__(4);

	function EnhancedMocha(options) {
		Mocha.call(this, options);
	}
	module.exports = EnhancedMocha;

	EnhancedMocha.prototype = Object.create(Mocha.prototype);

	EnhancedMocha.prototype.loadFiles = function(fn) {
		var self = this;

		var suite = this.suite;
		suite.suites.length = 0;
		suite.tests.length = 0;
		try {
			var file = this.files[0];
			if(false) {
				module.hot.accept(file, function() {
					if(self.watching) {
						if(!self.running)
							self.run();
						else
							self.outdated = true;
					}
				});
			}
			suite.emit('pre-require', global, file, self);
			suite.emit('require', __webpack_require__(108)(file), file, self);
			suite.emit('post-require', global, file, self);
		} catch(e) {
			suite.addTest(new Mocha.Test("fix test errors", function() {
				throw e;
			}));
		}
		if(fn) fn();
	}

	EnhancedMocha.prototype.watch = function() {
		var self = this;
		self.outdated = false;
		self.running = true;
		self.watching = true;

		// reinit ui to fix ui bugs
		this.ui(this.options.ui);

		// run the tests
		this.run(function(failures) {
			self.running = false;
			if(self.outdated)
				self.watch();
		});

		if(false) {
			// Don't exit the process
			setInterval(function() {}, 100000);
		}
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = process.env.COV
	  ? __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./lib-cov/mocha\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	  : __webpack_require__(5);


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, __dirname) {/*!
	 * mocha
	 * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */

	/**
	 * Module dependencies.
	 */

	var escapeRe = __webpack_require__(7);
	var path = __webpack_require__(8);
	var reporters = __webpack_require__(9);
	var utils = __webpack_require__(14);

	/**
	 * Expose `Mocha`.
	 */

	exports = module.exports = Mocha;

	/**
	 * To require local UIs and reporters when running in node.
	 */

	if (!process.browser) {
	  var cwd = process.cwd();
	  module.paths.push(cwd, path.join(cwd, 'node_modules'));
	}

	/**
	 * Expose internals.
	 */

	exports.utils = utils;
	exports.interfaces = __webpack_require__(83);
	exports.reporters = reporters;
	exports.Runnable = __webpack_require__(87);
	exports.Context = __webpack_require__(94);
	exports.Runner = __webpack_require__(95);
	exports.Suite = __webpack_require__(85);
	exports.Hook = __webpack_require__(86);
	exports.Test = __webpack_require__(89);

	/**
	 * Return image `name` path.
	 *
	 * @api private
	 * @param {string} name
	 * @return {string}
	 */
	function image(name) {
	  return path.join(__dirname, '../images', name + '.png');
	}

	/**
	 * Set up mocha with `options`.
	 *
	 * Options:
	 *
	 *   - `ui` name "bdd", "tdd", "exports" etc
	 *   - `reporter` reporter instance, defaults to `mocha.reporters.spec`
	 *   - `globals` array of accepted globals
	 *   - `timeout` timeout in milliseconds
	 *   - `retries` number of times to retry failed tests
	 *   - `bail` bail on the first test failure
	 *   - `slow` milliseconds to wait before considering a test slow
	 *   - `ignoreLeaks` ignore global leaks
	 *   - `fullTrace` display the full stack-trace on failing
	 *   - `grep` string or regexp to filter tests with
	 *
	 * @param {Object} options
	 * @api public
	 */
	function Mocha(options) {
	  options = options || {};
	  this.files = [];
	  this.options = options;
	  if (options.grep) {
	    this.grep(new RegExp(options.grep));
	  }
	  if (options.fgrep) {
	    this.grep(options.fgrep);
	  }
	  this.suite = new exports.Suite('', new exports.Context());
	  this.ui(options.ui);
	  this.bail(options.bail);
	  this.reporter(options.reporter, options.reporterOptions);
	  if (typeof options.timeout !== 'undefined' && options.timeout !== null) {
	    this.timeout(options.timeout);
	  }
	  if (typeof options.retries !== 'undefined' && options.retries !== null) {
	    this.retries(options.retries);
	  }
	  this.useColors(options.useColors);
	  if (options.enableTimeouts !== null) {
	    this.enableTimeouts(options.enableTimeouts);
	  }
	  if (options.slow) {
	    this.slow(options.slow);
	  }

	  this.suite.on('pre-require', function(context) {
	    exports.afterEach = context.afterEach || context.teardown;
	    exports.after = context.after || context.suiteTeardown;
	    exports.beforeEach = context.beforeEach || context.setup;
	    exports.before = context.before || context.suiteSetup;
	    exports.describe = context.describe || context.suite;
	    exports.it = context.it || context.test;
	    exports.setup = context.setup || context.beforeEach;
	    exports.suiteSetup = context.suiteSetup || context.before;
	    exports.suiteTeardown = context.suiteTeardown || context.after;
	    exports.suite = context.suite || context.describe;
	    exports.teardown = context.teardown || context.afterEach;
	    exports.test = context.test || context.it;
	    exports.run = context.run;
	  });
	}

	/**
	 * Enable or disable bailing on the first failure.
	 *
	 * @api public
	 * @param {boolean} [bail]
	 */
	Mocha.prototype.bail = function(bail) {
	  if (!arguments.length) {
	    bail = true;
	  }
	  this.suite.bail(bail);
	  return this;
	};

	/**
	 * Add test `file`.
	 *
	 * @api public
	 * @param {string} file
	 */
	Mocha.prototype.addFile = function(file) {
	  this.files.push(file);
	  return this;
	};

	/**
	 * Set reporter to `reporter`, defaults to "spec".
	 *
	 * @param {String|Function} reporter name or constructor
	 * @param {Object} reporterOptions optional options
	 * @api public
	 * @param {string|Function} reporter name or constructor
	 * @param {Object} reporterOptions optional options
	 */
	Mocha.prototype.reporter = function(reporter, reporterOptions) {
	  if (typeof reporter === 'function') {
	    this._reporter = reporter;
	  } else {
	    reporter = reporter || 'spec';
	    var _reporter;
	    // Try to load a built-in reporter.
	    if (reporters[reporter]) {
	      _reporter = reporters[reporter];
	    }
	    // Try to load reporters from process.cwd() and node_modules
	    if (!_reporter) {
	      try {
	        _reporter = __webpack_require__(96)(reporter);
	      } catch (err) {
	        err.message.indexOf('Cannot find module') !== -1
	          ? console.warn('"' + reporter + '" reporter not found')
	          : console.warn('"' + reporter + '" reporter blew up with error:\n' + err.stack);
	      }
	    }
	    if (!_reporter && reporter === 'teamcity') {
	      console.warn('The Teamcity reporter was moved to a package named '
	        + 'mocha-teamcity-reporter '
	        + '(https://npmjs.org/package/mocha-teamcity-reporter).');
	    }
	    if (!_reporter) {
	      throw new Error('invalid reporter "' + reporter + '"');
	    }
	    this._reporter = _reporter;
	  }
	  this.options.reporterOptions = reporterOptions;
	  return this;
	};

	/**
	 * Set test UI `name`, defaults to "bdd".
	 *
	 * @api public
	 * @param {string} bdd
	 */
	Mocha.prototype.ui = function(name) {
	  name = name || 'bdd';
	  this._ui = exports.interfaces[name];
	  if (!this._ui) {
	    try {
	      this._ui = __webpack_require__(96)(name);
	    } catch (err) {
	      throw new Error('invalid interface "' + name + '"');
	    }
	  }
	  this._ui = this._ui(this.suite);
	  return this;
	};

	/**
	 * Load registered files.
	 *
	 * @api private
	 */
	Mocha.prototype.loadFiles = function(fn) {
	  var self = this;
	  var suite = this.suite;
	  this.files.forEach(function(file) {
	    file = path.resolve(file);
	    suite.emit('pre-require', global, file, self);
	    suite.emit('require', __webpack_require__(96)(file), file, self);
	    suite.emit('post-require', global, file, self);
	  });
	  fn && fn();
	};

	/**
	 * Enable growl support.
	 *
	 * @api private
	 */
	Mocha.prototype._growl = function(runner, reporter) {
	  var notify = __webpack_require__(105);

	  runner.on('end', function() {
	    var stats = reporter.stats;
	    if (stats.failures) {
	      var msg = stats.failures + ' of ' + runner.total + ' tests failed';
	      notify(msg, { name: 'mocha', title: 'Failed', image: image('error') });
	    } else {
	      notify(stats.passes + ' tests passed in ' + stats.duration + 'ms', {
	        name: 'mocha',
	        title: 'Passed',
	        image: image('ok')
	      });
	    }
	  });
	};

	/**
	 * Add regexp to grep, if `re` is a string it is escaped.
	 *
	 * @param {RegExp|String} re
	 * @return {Mocha}
	 * @api public
	 * @param {RegExp|string} re
	 * @return {Mocha}
	 */
	Mocha.prototype.grep = function(re) {
	  this.options.grep = typeof re === 'string' ? new RegExp(escapeRe(re)) : re;
	  return this;
	};

	/**
	 * Invert `.grep()` matches.
	 *
	 * @return {Mocha}
	 * @api public
	 */
	Mocha.prototype.invert = function() {
	  this.options.invert = true;
	  return this;
	};

	/**
	 * Ignore global leaks.
	 *
	 * @param {Boolean} ignore
	 * @return {Mocha}
	 * @api public
	 * @param {boolean} ignore
	 * @return {Mocha}
	 */
	Mocha.prototype.ignoreLeaks = function(ignore) {
	  this.options.ignoreLeaks = Boolean(ignore);
	  return this;
	};

	/**
	 * Enable global leak checking.
	 *
	 * @return {Mocha}
	 * @api public
	 */
	Mocha.prototype.checkLeaks = function() {
	  this.options.ignoreLeaks = false;
	  return this;
	};

	/**
	 * Display long stack-trace on failing
	 *
	 * @return {Mocha}
	 * @api public
	 */
	Mocha.prototype.fullTrace = function() {
	  this.options.fullStackTrace = true;
	  return this;
	};

	/**
	 * Enable growl support.
	 *
	 * @return {Mocha}
	 * @api public
	 */
	Mocha.prototype.growl = function() {
	  this.options.growl = true;
	  return this;
	};

	/**
	 * Ignore `globals` array or string.
	 *
	 * @param {Array|String} globals
	 * @return {Mocha}
	 * @api public
	 * @param {Array|string} globals
	 * @return {Mocha}
	 */
	Mocha.prototype.globals = function(globals) {
	  this.options.globals = (this.options.globals || []).concat(globals);
	  return this;
	};

	/**
	 * Emit color output.
	 *
	 * @param {Boolean} colors
	 * @return {Mocha}
	 * @api public
	 * @param {boolean} colors
	 * @return {Mocha}
	 */
	Mocha.prototype.useColors = function(colors) {
	  if (colors !== undefined) {
	    this.options.useColors = colors;
	  }
	  return this;
	};

	/**
	 * Use inline diffs rather than +/-.
	 *
	 * @param {Boolean} inlineDiffs
	 * @return {Mocha}
	 * @api public
	 * @param {boolean} inlineDiffs
	 * @return {Mocha}
	 */
	Mocha.prototype.useInlineDiffs = function(inlineDiffs) {
	  this.options.useInlineDiffs = inlineDiffs !== undefined && inlineDiffs;
	  return this;
	};

	/**
	 * Set the timeout in milliseconds.
	 *
	 * @param {Number} timeout
	 * @return {Mocha}
	 * @api public
	 * @param {number} timeout
	 * @return {Mocha}
	 */
	Mocha.prototype.timeout = function(timeout) {
	  this.suite.timeout(timeout);
	  return this;
	};

	/**
	 * Set the number of times to retry failed tests.
	 *
	 * @param {Number} retry times
	 * @return {Mocha}
	 * @api public
	 */
	Mocha.prototype.retries = function(n) {
	  this.suite.retries(n);
	  return this;
	};

	/**
	 * Set slowness threshold in milliseconds.
	 *
	 * @param {Number} slow
	 * @return {Mocha}
	 * @api public
	 * @param {number} slow
	 * @return {Mocha}
	 */
	Mocha.prototype.slow = function(slow) {
	  this.suite.slow(slow);
	  return this;
	};

	/**
	 * Enable timeouts.
	 *
	 * @param {Boolean} enabled
	 * @return {Mocha}
	 * @api public
	 * @param {boolean} enabled
	 * @return {Mocha}
	 */
	Mocha.prototype.enableTimeouts = function(enabled) {
	  this.suite.enableTimeouts(arguments.length && enabled !== undefined ? enabled : true);
	  return this;
	};

	/**
	 * Makes all tests async (accepting a callback)
	 *
	 * @return {Mocha}
	 * @api public
	 */
	Mocha.prototype.asyncOnly = function() {
	  this.options.asyncOnly = true;
	  return this;
	};

	/**
	 * Disable syntax highlighting (in browser).
	 *
	 * @api public
	 */
	Mocha.prototype.noHighlighting = function() {
	  this.options.noHighlighting = true;
	  return this;
	};

	/**
	 * Enable uncaught errors to propagate (in browser).
	 *
	 * @return {Mocha}
	 * @api public
	 */
	Mocha.prototype.allowUncaught = function() {
	  this.options.allowUncaught = true;
	  return this;
	};

	/**
	 * Delay root suite execution.
	 * @returns {Mocha}
	 */
	Mocha.prototype.delay = function delay() {
	  this.options.delay = true;
	  return this;
	};

	/**
	 * Run tests and invoke `fn()` when complete.
	 *
	 * @api public
	 * @param {Function} fn
	 * @return {Runner}
	 */
	Mocha.prototype.run = function(fn) {
	  if (this.files.length) {
	    this.loadFiles();
	  }
	  var suite = this.suite;
	  var options = this.options;
	  options.files = this.files;
	  var runner = new exports.Runner(suite, options.delay);
	  var reporter = new this._reporter(runner, options);
	  runner.ignoreLeaks = options.ignoreLeaks !== false;
	  runner.fullStackTrace = options.fullStackTrace;
	  runner.asyncOnly = options.asyncOnly;
	  runner.allowUncaught = options.allowUncaught;
	  if (options.grep) {
	    runner.grep(options.grep, options.invert);
	  }
	  if (options.globals) {
	    runner.globals(options.globals);
	  }
	  if (options.growl) {
	    this._growl(runner, reporter);
	  }
	  if (options.useColors !== undefined) {
	    exports.reporters.Base.useColors = options.useColors;
	  }
	  exports.reporters.Base.inlineDiffs = options.useInlineDiffs;

	  function done(failures) {
	    if (reporter.done) {
	      reporter.done(failures, fn);
	    } else {
	      fn && fn(failures);
	    }
	  }

	  return runner.run(done);
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)(module), "/"))

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

	module.exports = function (str) {
		if (typeof str !== 'string') {
			throw new TypeError('Expected a string');
		}

		return str.replace(matchOperatorsRe,  '\\$&');
	};


/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// Alias exports to a their normalized format Mocha#reporter to prevent a need
	// for dynamic (try/catch) requires, which Browserify doesn't handle.
	exports.Base = exports.base = __webpack_require__(10);
	exports.Dot = exports.dot = __webpack_require__(39);
	exports.Doc = exports.doc = __webpack_require__(40);
	exports.TAP = exports.tap = __webpack_require__(41);
	exports.JSON = exports.json = __webpack_require__(42);
	exports.HTML = exports.html = __webpack_require__(43);
	exports.List = exports.list = __webpack_require__(45);
	exports.Min = exports.min = __webpack_require__(46);
	exports.Spec = exports.spec = __webpack_require__(47);
	exports.Nyan = exports.nyan = __webpack_require__(48);
	exports.XUnit = exports.xunit = __webpack_require__(49);
	exports.Markdown = exports.markdown = __webpack_require__(51);
	exports.Progress = exports.progress = __webpack_require__(52);
	exports.Landing = exports.landing = __webpack_require__(53);
	exports.JSONCov = exports['json-cov'] = __webpack_require__(54);
	exports.HTMLCov = exports['html-cov'] = __webpack_require__(55);
	exports.JSONStream = exports['json-stream'] = __webpack_require__(82);


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var tty = __webpack_require__(11);
	var diff = __webpack_require__(12);
	var ms = __webpack_require__(13);
	var utils = __webpack_require__(14);
	var supportsColor = process.browser ? null : __webpack_require__(38);

	/**
	 * Expose `Base`.
	 */

	exports = module.exports = Base;

	/**
	 * Save timer references to avoid Sinon interfering.
	 * See: https://github.com/mochajs/mocha/issues/237
	 */

	/* eslint-disable no-unused-vars, no-native-reassign */
	var Date = global.Date;
	var setTimeout = global.setTimeout;
	var setInterval = global.setInterval;
	var clearTimeout = global.clearTimeout;
	var clearInterval = global.clearInterval;
	/* eslint-enable no-unused-vars, no-native-reassign */

	/**
	 * Check if both stdio streams are associated with a tty.
	 */

	var isatty = tty.isatty(1) && tty.isatty(2);

	/**
	 * Enable coloring by default, except in the browser interface.
	 */

	exports.useColors = !process.browser && (supportsColor || (process.env.MOCHA_COLORS !== undefined));

	/**
	 * Inline diffs instead of +/-
	 */

	exports.inlineDiffs = false;

	/**
	 * Default color map.
	 */

	exports.colors = {
	  pass: 90,
	  fail: 31,
	  'bright pass': 92,
	  'bright fail': 91,
	  'bright yellow': 93,
	  pending: 36,
	  suite: 0,
	  'error title': 0,
	  'error message': 31,
	  'error stack': 90,
	  checkmark: 32,
	  fast: 90,
	  medium: 33,
	  slow: 31,
	  green: 32,
	  light: 90,
	  'diff gutter': 90,
	  'diff added': 32,
	  'diff removed': 31
	};

	/**
	 * Default symbol map.
	 */

	exports.symbols = {
	  ok: '✓',
	  err: '✖',
	  dot: '․'
	};

	// With node.js on Windows: use symbols available in terminal default fonts
	if (process.platform === 'win32') {
	  exports.symbols.ok = '\u221A';
	  exports.symbols.err = '\u00D7';
	  exports.symbols.dot = '.';
	}

	/**
	 * Color `str` with the given `type`,
	 * allowing colors to be disabled,
	 * as well as user-defined color
	 * schemes.
	 *
	 * @param {string} type
	 * @param {string} str
	 * @return {string}
	 * @api private
	 */
	var color = exports.color = function(type, str) {
	  if (!exports.useColors) {
	    return String(str);
	  }
	  return '\u001b[' + exports.colors[type] + 'm' + str + '\u001b[0m';
	};

	/**
	 * Expose term window size, with some defaults for when stderr is not a tty.
	 */

	exports.window = {
	  width: 75
	};

	if (isatty) {
	  exports.window.width = process.stdout.getWindowSize
	      ? process.stdout.getWindowSize(1)[0]
	      : tty.getWindowSize()[1];
	}

	/**
	 * Expose some basic cursor interactions that are common among reporters.
	 */

	exports.cursor = {
	  hide: function() {
	    isatty && process.stdout.write('\u001b[?25l');
	  },

	  show: function() {
	    isatty && process.stdout.write('\u001b[?25h');
	  },

	  deleteLine: function() {
	    isatty && process.stdout.write('\u001b[2K');
	  },

	  beginningOfLine: function() {
	    isatty && process.stdout.write('\u001b[0G');
	  },

	  CR: function() {
	    if (isatty) {
	      exports.cursor.deleteLine();
	      exports.cursor.beginningOfLine();
	    } else {
	      process.stdout.write('\r');
	    }
	  }
	};

	/**
	 * Outut the given `failures` as a list.
	 *
	 * @param {Array} failures
	 * @api public
	 */

	exports.list = function(failures) {
	  console.log();
	  failures.forEach(function(test, i) {
	    // format
	    var fmt = color('error title', '  %s) %s:\n')
	      + color('error message', '     %s')
	      + color('error stack', '\n%s\n');

	    // msg
	    var msg;
	    var err = test.err;
	    var message;
	    if (err.message) {
	      message = err.message;
	    } else if (typeof err.inspect === 'function') {
	      message = err.inspect() + '';
	    } else {
	      message = '';
	    }
	    var stack = err.stack || message;
	    var index = stack.indexOf(message);
	    var actual = err.actual;
	    var expected = err.expected;
	    var escape = true;

	    if (index === -1) {
	      msg = message;
	    } else {
	      index += message.length;
	      msg = stack.slice(0, index);
	      // remove msg from stack
	      stack = stack.slice(index + 1);
	    }

	    // uncaught
	    if (err.uncaught) {
	      msg = 'Uncaught ' + msg;
	    }
	    // explicitly show diff
	    if (err.showDiff !== false && sameType(actual, expected) && expected !== undefined) {
	      escape = false;
	      if (!(utils.isString(actual) && utils.isString(expected))) {
	        err.actual = actual = utils.stringify(actual);
	        err.expected = expected = utils.stringify(expected);
	      }

	      fmt = color('error title', '  %s) %s:\n%s') + color('error stack', '\n%s\n');
	      var match = message.match(/^([^:]+): expected/);
	      msg = '\n      ' + color('error message', match ? match[1] : msg);

	      if (exports.inlineDiffs) {
	        msg += inlineDiff(err, escape);
	      } else {
	        msg += unifiedDiff(err, escape);
	      }
	    }

	    // indent stack trace
	    stack = stack.replace(/^/gm, '  ');

	    console.log(fmt, (i + 1), test.fullTitle(), msg, stack);
	  });
	};

	/**
	 * Initialize a new `Base` reporter.
	 *
	 * All other reporters generally
	 * inherit from this reporter, providing
	 * stats such as test duration, number
	 * of tests passed / failed etc.
	 *
	 * @param {Runner} runner
	 * @api public
	 */

	function Base(runner) {
	  var stats = this.stats = { suites: 0, tests: 0, passes: 0, pending: 0, failures: 0 };
	  var failures = this.failures = [];

	  if (!runner) {
	    return;
	  }
	  this.runner = runner;

	  runner.stats = stats;

	  runner.on('start', function() {
	    stats.start = new Date();
	  });

	  runner.on('suite', function(suite) {
	    stats.suites = stats.suites || 0;
	    suite.root || stats.suites++;
	  });

	  runner.on('test end', function() {
	    stats.tests = stats.tests || 0;
	    stats.tests++;
	  });

	  runner.on('pass', function(test) {
	    stats.passes = stats.passes || 0;

	    if (test.duration > test.slow()) {
	      test.speed = 'slow';
	    } else if (test.duration > test.slow() / 2) {
	      test.speed = 'medium';
	    } else {
	      test.speed = 'fast';
	    }

	    stats.passes++;
	  });

	  runner.on('fail', function(test, err) {
	    stats.failures = stats.failures || 0;
	    stats.failures++;
	    test.err = err;
	    failures.push(test);
	  });

	  runner.on('end', function() {
	    stats.end = new Date();
	    stats.duration = new Date() - stats.start;
	  });

	  runner.on('pending', function() {
	    stats.pending++;
	  });
	}

	/**
	 * Output common epilogue used by many of
	 * the bundled reporters.
	 *
	 * @api public
	 */
	Base.prototype.epilogue = function() {
	  var stats = this.stats;
	  var fmt;

	  console.log();

	  // passes
	  fmt = color('bright pass', ' ')
	    + color('green', ' %d passing')
	    + color('light', ' (%s)');

	  console.log(fmt,
	    stats.passes || 0,
	    ms(stats.duration));

	  // pending
	  if (stats.pending) {
	    fmt = color('pending', ' ')
	      + color('pending', ' %d pending');

	    console.log(fmt, stats.pending);
	  }

	  // failures
	  if (stats.failures) {
	    fmt = color('fail', '  %d failing');

	    console.log(fmt, stats.failures);

	    Base.list(this.failures);
	    console.log();
	  }

	  console.log();
	};

	/**
	 * Pad the given `str` to `len`.
	 *
	 * @api private
	 * @param {string} str
	 * @param {string} len
	 * @return {string}
	 */
	function pad(str, len) {
	  str = String(str);
	  return Array(len - str.length + 1).join(' ') + str;
	}

	/**
	 * Returns an inline diff between 2 strings with coloured ANSI output
	 *
	 * @api private
	 * @param {Error} err with actual/expected
	 * @param {boolean} escape
	 * @return {string} Diff
	 */
	function inlineDiff(err, escape) {
	  var msg = errorDiff(err, 'WordsWithSpace', escape);

	  // linenos
	  var lines = msg.split('\n');
	  if (lines.length > 4) {
	    var width = String(lines.length).length;
	    msg = lines.map(function(str, i) {
	      return pad(++i, width) + ' |' + ' ' + str;
	    }).join('\n');
	  }

	  // legend
	  msg = '\n'
	    + color('diff removed', 'actual')
	    + ' '
	    + color('diff added', 'expected')
	    + '\n\n'
	    + msg
	    + '\n';

	  // indent
	  msg = msg.replace(/^/gm, '      ');
	  return msg;
	}

	/**
	 * Returns a unified diff between two strings.
	 *
	 * @api private
	 * @param {Error} err with actual/expected
	 * @param {boolean} escape
	 * @return {string} The diff.
	 */
	function unifiedDiff(err, escape) {
	  var indent = '      ';
	  function cleanUp(line) {
	    if (escape) {
	      line = escapeInvisibles(line);
	    }
	    if (line[0] === '+') {
	      return indent + colorLines('diff added', line);
	    }
	    if (line[0] === '-') {
	      return indent + colorLines('diff removed', line);
	    }
	    if (line.match(/\@\@/)) {
	      return null;
	    }
	    if (line.match(/\\ No newline/)) {
	      return null;
	    }
	    return indent + line;
	  }
	  function notBlank(line) {
	    return typeof line !== 'undefined' && line !== null;
	  }
	  var msg = diff.createPatch('string', err.actual, err.expected);
	  var lines = msg.split('\n').splice(4);
	  return '\n      '
	    + colorLines('diff added', '+ expected') + ' '
	    + colorLines('diff removed', '- actual')
	    + '\n\n'
	    + lines.map(cleanUp).filter(notBlank).join('\n');
	}

	/**
	 * Return a character diff for `err`.
	 *
	 * @api private
	 * @param {Error} err
	 * @param {string} type
	 * @param {boolean} escape
	 * @return {string}
	 */
	function errorDiff(err, type, escape) {
	  var actual = escape ? escapeInvisibles(err.actual) : err.actual;
	  var expected = escape ? escapeInvisibles(err.expected) : err.expected;
	  return diff['diff' + type](actual, expected).map(function(str) {
	    if (str.added) {
	      return colorLines('diff added', str.value);
	    }
	    if (str.removed) {
	      return colorLines('diff removed', str.value);
	    }
	    return str.value;
	  }).join('');
	}

	/**
	 * Returns a string with all invisible characters in plain text
	 *
	 * @api private
	 * @param {string} line
	 * @return {string}
	 */
	function escapeInvisibles(line) {
	  return line.replace(/\t/g, '<tab>')
	    .replace(/\r/g, '<CR>')
	    .replace(/\n/g, '<LF>\n');
	}

	/**
	 * Color lines for `str`, using the color `name`.
	 *
	 * @api private
	 * @param {string} name
	 * @param {string} str
	 * @return {string}
	 */
	function colorLines(name, str) {
	  return str.split('\n').map(function(str) {
	    return color(name, str);
	  }).join('\n');
	}

	/**
	 * Object#toString reference.
	 */
	var objToString = Object.prototype.toString;

	/**
	 * Check that a / b have the same type.
	 *
	 * @api private
	 * @param {Object} a
	 * @param {Object} b
	 * @return {boolean}
	 */
	function sameType(a, b) {
	  return objToString.call(a) === objToString.call(b);
	}


/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("tty");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* See LICENSE file for terms of use */

	/*
	 * Text diff implementation.
	 *
	 * This library supports the following APIS:
	 * JsDiff.diffChars: Character by character diff
	 * JsDiff.diffWords: Word (as defined by \b regex) diff which ignores whitespace
	 * JsDiff.diffLines: Line based diff
	 *
	 * JsDiff.diffCss: Diff targeted at CSS content
	 *
	 * These methods are based on the implementation proposed in
	 * "An O(ND) Difference Algorithm and its Variations" (Myers, 1986).
	 * http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.4.6927
	 */
	(function(global, undefined) {
	  var objectPrototypeToString = Object.prototype.toString;

	  /*istanbul ignore next*/
	  function map(arr, mapper, that) {
	    if (Array.prototype.map) {
	      return Array.prototype.map.call(arr, mapper, that);
	    }

	    var other = new Array(arr.length);

	    for (var i = 0, n = arr.length; i < n; i++) {
	      other[i] = mapper.call(that, arr[i], i, arr);
	    }
	    return other;
	  }
	  function clonePath(path) {
	    return { newPos: path.newPos, components: path.components.slice(0) };
	  }
	  function removeEmpty(array) {
	    var ret = [];
	    for (var i = 0; i < array.length; i++) {
	      if (array[i]) {
	        ret.push(array[i]);
	      }
	    }
	    return ret;
	  }
	  function escapeHTML(s) {
	    var n = s;
	    n = n.replace(/&/g, '&amp;');
	    n = n.replace(/</g, '&lt;');
	    n = n.replace(/>/g, '&gt;');
	    n = n.replace(/"/g, '&quot;');

	    return n;
	  }

	  // This function handles the presence of circular references by bailing out when encountering an
	  // object that is already on the "stack" of items being processed.
	  function canonicalize(obj, stack, replacementStack) {
	    stack = stack || [];
	    replacementStack = replacementStack || [];

	    var i;

	    for (i = 0; i < stack.length; i += 1) {
	      if (stack[i] === obj) {
	        return replacementStack[i];
	      }
	    }

	    var canonicalizedObj;

	    if ('[object Array]' === objectPrototypeToString.call(obj)) {
	      stack.push(obj);
	      canonicalizedObj = new Array(obj.length);
	      replacementStack.push(canonicalizedObj);
	      for (i = 0; i < obj.length; i += 1) {
	        canonicalizedObj[i] = canonicalize(obj[i], stack, replacementStack);
	      }
	      stack.pop();
	      replacementStack.pop();
	    } else if (typeof obj === 'object' && obj !== null) {
	      stack.push(obj);
	      canonicalizedObj = {};
	      replacementStack.push(canonicalizedObj);
	      var sortedKeys = [],
	          key;
	      for (key in obj) {
	        sortedKeys.push(key);
	      }
	      sortedKeys.sort();
	      for (i = 0; i < sortedKeys.length; i += 1) {
	        key = sortedKeys[i];
	        canonicalizedObj[key] = canonicalize(obj[key], stack, replacementStack);
	      }
	      stack.pop();
	      replacementStack.pop();
	    } else {
	      canonicalizedObj = obj;
	    }
	    return canonicalizedObj;
	  }

	  function buildValues(components, newString, oldString, useLongestToken) {
	    var componentPos = 0,
	        componentLen = components.length,
	        newPos = 0,
	        oldPos = 0;

	    for (; componentPos < componentLen; componentPos++) {
	      var component = components[componentPos];
	      if (!component.removed) {
	        if (!component.added && useLongestToken) {
	          var value = newString.slice(newPos, newPos + component.count);
	          value = map(value, function(value, i) {
	            var oldValue = oldString[oldPos + i];
	            return oldValue.length > value.length ? oldValue : value;
	          });

	          component.value = value.join('');
	        } else {
	          component.value = newString.slice(newPos, newPos + component.count).join('');
	        }
	        newPos += component.count;

	        // Common case
	        if (!component.added) {
	          oldPos += component.count;
	        }
	      } else {
	        component.value = oldString.slice(oldPos, oldPos + component.count).join('');
	        oldPos += component.count;

	        // Reverse add and remove so removes are output first to match common convention
	        // The diffing algorithm is tied to add then remove output and this is the simplest
	        // route to get the desired output with minimal overhead.
	        if (componentPos && components[componentPos - 1].added) {
	          var tmp = components[componentPos - 1];
	          components[componentPos - 1] = components[componentPos];
	          components[componentPos] = tmp;
	        }
	      }
	    }

	    return components;
	  }

	  function Diff(ignoreWhitespace) {
	    this.ignoreWhitespace = ignoreWhitespace;
	  }
	  Diff.prototype = {
	    diff: function(oldString, newString, callback) {
	      var self = this;

	      function done(value) {
	        if (callback) {
	          setTimeout(function() { callback(undefined, value); }, 0);
	          return true;
	        } else {
	          return value;
	        }
	      }

	      // Handle the identity case (this is due to unrolling editLength == 0
	      if (newString === oldString) {
	        return done([{ value: newString }]);
	      }
	      if (!newString) {
	        return done([{ value: oldString, removed: true }]);
	      }
	      if (!oldString) {
	        return done([{ value: newString, added: true }]);
	      }

	      newString = this.tokenize(newString);
	      oldString = this.tokenize(oldString);

	      var newLen = newString.length, oldLen = oldString.length;
	      var editLength = 1;
	      var maxEditLength = newLen + oldLen;
	      var bestPath = [{ newPos: -1, components: [] }];

	      // Seed editLength = 0, i.e. the content starts with the same values
	      var oldPos = this.extractCommon(bestPath[0], newString, oldString, 0);
	      if (bestPath[0].newPos + 1 >= newLen && oldPos + 1 >= oldLen) {
	        // Identity per the equality and tokenizer
	        return done([{value: newString.join('')}]);
	      }

	      // Main worker method. checks all permutations of a given edit length for acceptance.
	      function execEditLength() {
	        for (var diagonalPath = -1 * editLength; diagonalPath <= editLength; diagonalPath += 2) {
	          var basePath;
	          var addPath = bestPath[diagonalPath - 1],
	              removePath = bestPath[diagonalPath + 1],
	              oldPos = (removePath ? removePath.newPos : 0) - diagonalPath;
	          if (addPath) {
	            // No one else is going to attempt to use this value, clear it
	            bestPath[diagonalPath - 1] = undefined;
	          }

	          var canAdd = addPath && addPath.newPos + 1 < newLen,
	              canRemove = removePath && 0 <= oldPos && oldPos < oldLen;
	          if (!canAdd && !canRemove) {
	            // If this path is a terminal then prune
	            bestPath[diagonalPath] = undefined;
	            continue;
	          }

	          // Select the diagonal that we want to branch from. We select the prior
	          // path whose position in the new string is the farthest from the origin
	          // and does not pass the bounds of the diff graph
	          if (!canAdd || (canRemove && addPath.newPos < removePath.newPos)) {
	            basePath = clonePath(removePath);
	            self.pushComponent(basePath.components, undefined, true);
	          } else {
	            basePath = addPath;   // No need to clone, we've pulled it from the list
	            basePath.newPos++;
	            self.pushComponent(basePath.components, true, undefined);
	          }

	          oldPos = self.extractCommon(basePath, newString, oldString, diagonalPath);

	          // If we have hit the end of both strings, then we are done
	          if (basePath.newPos + 1 >= newLen && oldPos + 1 >= oldLen) {
	            return done(buildValues(basePath.components, newString, oldString, self.useLongestToken));
	          } else {
	            // Otherwise track this path as a potential candidate and continue.
	            bestPath[diagonalPath] = basePath;
	          }
	        }

	        editLength++;
	      }

	      // Performs the length of edit iteration. Is a bit fugly as this has to support the
	      // sync and async mode which is never fun. Loops over execEditLength until a value
	      // is produced.
	      if (callback) {
	        (function exec() {
	          setTimeout(function() {
	            // This should not happen, but we want to be safe.
	            /*istanbul ignore next */
	            if (editLength > maxEditLength) {
	              return callback();
	            }

	            if (!execEditLength()) {
	              exec();
	            }
	          }, 0);
	        }());
	      } else {
	        while (editLength <= maxEditLength) {
	          var ret = execEditLength();
	          if (ret) {
	            return ret;
	          }
	        }
	      }
	    },

	    pushComponent: function(components, added, removed) {
	      var last = components[components.length - 1];
	      if (last && last.added === added && last.removed === removed) {
	        // We need to clone here as the component clone operation is just
	        // as shallow array clone
	        components[components.length - 1] = {count: last.count + 1, added: added, removed: removed };
	      } else {
	        components.push({count: 1, added: added, removed: removed });
	      }
	    },
	    extractCommon: function(basePath, newString, oldString, diagonalPath) {
	      var newLen = newString.length,
	          oldLen = oldString.length,
	          newPos = basePath.newPos,
	          oldPos = newPos - diagonalPath,

	          commonCount = 0;
	      while (newPos + 1 < newLen && oldPos + 1 < oldLen && this.equals(newString[newPos + 1], oldString[oldPos + 1])) {
	        newPos++;
	        oldPos++;
	        commonCount++;
	      }

	      if (commonCount) {
	        basePath.components.push({count: commonCount});
	      }

	      basePath.newPos = newPos;
	      return oldPos;
	    },

	    equals: function(left, right) {
	      var reWhitespace = /\S/;
	      return left === right || (this.ignoreWhitespace && !reWhitespace.test(left) && !reWhitespace.test(right));
	    },
	    tokenize: function(value) {
	      return value.split('');
	    }
	  };

	  var CharDiff = new Diff();

	  var WordDiff = new Diff(true);
	  var WordWithSpaceDiff = new Diff();
	  WordDiff.tokenize = WordWithSpaceDiff.tokenize = function(value) {
	    return removeEmpty(value.split(/(\s+|\b)/));
	  };

	  var CssDiff = new Diff(true);
	  CssDiff.tokenize = function(value) {
	    return removeEmpty(value.split(/([{}:;,]|\s+)/));
	  };

	  var LineDiff = new Diff();

	  var TrimmedLineDiff = new Diff();
	  TrimmedLineDiff.ignoreTrim = true;

	  LineDiff.tokenize = TrimmedLineDiff.tokenize = function(value) {
	    var retLines = [],
	        lines = value.split(/^/m);
	    for (var i = 0; i < lines.length; i++) {
	      var line = lines[i],
	          lastLine = lines[i - 1],
	          lastLineLastChar = lastLine && lastLine[lastLine.length - 1];

	      // Merge lines that may contain windows new lines
	      if (line === '\n' && lastLineLastChar === '\r') {
	          retLines[retLines.length - 1] = retLines[retLines.length - 1].slice(0, -1) + '\r\n';
	      } else {
	        if (this.ignoreTrim) {
	          line = line.trim();
	          // add a newline unless this is the last line.
	          if (i < lines.length - 1) {
	            line += '\n';
	          }
	        }
	        retLines.push(line);
	      }
	    }

	    return retLines;
	  };

	  var PatchDiff = new Diff();
	  PatchDiff.tokenize = function(value) {
	    var ret = [],
	        linesAndNewlines = value.split(/(\n|\r\n)/);

	    // Ignore the final empty token that occurs if the string ends with a new line
	    if (!linesAndNewlines[linesAndNewlines.length - 1]) {
	      linesAndNewlines.pop();
	    }

	    // Merge the content and line separators into single tokens
	    for (var i = 0; i < linesAndNewlines.length; i++) {
	      var line = linesAndNewlines[i];

	      if (i % 2) {
	        ret[ret.length - 1] += line;
	      } else {
	        ret.push(line);
	      }
	    }
	    return ret;
	  };

	  var SentenceDiff = new Diff();
	  SentenceDiff.tokenize = function(value) {
	    return removeEmpty(value.split(/(\S.+?[.!?])(?=\s+|$)/));
	  };

	  var JsonDiff = new Diff();
	  // Discriminate between two lines of pretty-printed, serialized JSON where one of them has a
	  // dangling comma and the other doesn't. Turns out including the dangling comma yields the nicest output:
	  JsonDiff.useLongestToken = true;
	  JsonDiff.tokenize = LineDiff.tokenize;
	  JsonDiff.equals = function(left, right) {
	    return LineDiff.equals(left.replace(/,([\r\n])/g, '$1'), right.replace(/,([\r\n])/g, '$1'));
	  };

	  var JsDiff = {
	    Diff: Diff,

	    diffChars: function(oldStr, newStr, callback) { return CharDiff.diff(oldStr, newStr, callback); },
	    diffWords: function(oldStr, newStr, callback) { return WordDiff.diff(oldStr, newStr, callback); },
	    diffWordsWithSpace: function(oldStr, newStr, callback) { return WordWithSpaceDiff.diff(oldStr, newStr, callback); },
	    diffLines: function(oldStr, newStr, callback) { return LineDiff.diff(oldStr, newStr, callback); },
	    diffTrimmedLines: function(oldStr, newStr, callback) { return TrimmedLineDiff.diff(oldStr, newStr, callback); },

	    diffSentences: function(oldStr, newStr, callback) { return SentenceDiff.diff(oldStr, newStr, callback); },

	    diffCss: function(oldStr, newStr, callback) { return CssDiff.diff(oldStr, newStr, callback); },
	    diffJson: function(oldObj, newObj, callback) {
	      return JsonDiff.diff(
	        typeof oldObj === 'string' ? oldObj : JSON.stringify(canonicalize(oldObj), undefined, '  '),
	        typeof newObj === 'string' ? newObj : JSON.stringify(canonicalize(newObj), undefined, '  '),
	        callback
	      );
	    },

	    createTwoFilesPatch: function(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader) {
	      var ret = [];

	      if (oldFileName == newFileName) {
	        ret.push('Index: ' + oldFileName);
	      }
	      ret.push('===================================================================');
	      ret.push('--- ' + oldFileName + (typeof oldHeader === 'undefined' ? '' : '\t' + oldHeader));
	      ret.push('+++ ' + newFileName + (typeof newHeader === 'undefined' ? '' : '\t' + newHeader));

	      var diff = PatchDiff.diff(oldStr, newStr);
	      diff.push({value: '', lines: []});   // Append an empty value to make cleanup easier

	      // Formats a given set of lines for printing as context lines in a patch
	      function contextLines(lines) {
	        return map(lines, function(entry) { return ' ' + entry; });
	      }

	      // Outputs the no newline at end of file warning if needed
	      function eofNL(curRange, i, current) {
	        var last = diff[diff.length - 2],
	            isLast = i === diff.length - 2,
	            isLastOfType = i === diff.length - 3 && current.added !== last.added;

	        // Figure out if this is the last line for the given file and missing NL
	        if (!(/\n$/.test(current.value)) && (isLast || isLastOfType)) {
	          curRange.push('\\ No newline at end of file');
	        }
	      }

	      var oldRangeStart = 0, newRangeStart = 0, curRange = [],
	          oldLine = 1, newLine = 1;
	      for (var i = 0; i < diff.length; i++) {
	        var current = diff[i],
	            lines = current.lines || current.value.replace(/\n$/, '').split('\n');
	        current.lines = lines;

	        if (current.added || current.removed) {
	          // If we have previous context, start with that
	          if (!oldRangeStart) {
	            var prev = diff[i - 1];
	            oldRangeStart = oldLine;
	            newRangeStart = newLine;

	            if (prev) {
	              curRange = contextLines(prev.lines.slice(-4));
	              oldRangeStart -= curRange.length;
	              newRangeStart -= curRange.length;
	            }
	          }

	          // Output our changes
	          curRange.push.apply(curRange, map(lines, function(entry) {
	            return (current.added ? '+' : '-') + entry;
	          }));
	          eofNL(curRange, i, current);

	          // Track the updated file position
	          if (current.added) {
	            newLine += lines.length;
	          } else {
	            oldLine += lines.length;
	          }
	        } else {
	          // Identical context lines. Track line changes
	          if (oldRangeStart) {
	            // Close out any changes that have been output (or join overlapping)
	            if (lines.length <= 8 && i < diff.length - 2) {
	              // Overlapping
	              curRange.push.apply(curRange, contextLines(lines));
	            } else {
	              // end the range and output
	              var contextSize = Math.min(lines.length, 4);
	              ret.push(
	                  '@@ -' + oldRangeStart + ',' + (oldLine - oldRangeStart + contextSize)
	                  + ' +' + newRangeStart + ',' + (newLine - newRangeStart + contextSize)
	                  + ' @@');
	              ret.push.apply(ret, curRange);
	              ret.push.apply(ret, contextLines(lines.slice(0, contextSize)));
	              if (lines.length <= 4) {
	                eofNL(ret, i, current);
	              }

	              oldRangeStart = 0;
	              newRangeStart = 0;
	              curRange = [];
	            }
	          }
	          oldLine += lines.length;
	          newLine += lines.length;
	        }
	      }

	      return ret.join('\n') + '\n';
	    },

	    createPatch: function(fileName, oldStr, newStr, oldHeader, newHeader) {
	      return JsDiff.createTwoFilesPatch(fileName, fileName, oldStr, newStr, oldHeader, newHeader);
	    },

	    applyPatch: function(oldStr, uniDiff) {
	      var diffstr = uniDiff.split('\n'),
	          hunks = [],
	          i = 0,
	          remEOFNL = false,
	          addEOFNL = false;

	      // Skip to the first change hunk
	      while (i < diffstr.length && !(/^@@/.test(diffstr[i]))) {
	        i++;
	      }

	      // Parse the unified diff
	      for (; i < diffstr.length; i++) {
	        if (diffstr[i][0] === '@') {
	          var chnukHeader = diffstr[i].split(/@@ -(\d+),(\d+) \+(\d+),(\d+) @@/);
	          hunks.unshift({
	            start: chnukHeader[3],
	            oldlength: +chnukHeader[2],
	            removed: [],
	            newlength: chnukHeader[4],
	            added: []
	          });
	        } else if (diffstr[i][0] === '+') {
	          hunks[0].added.push(diffstr[i].substr(1));
	        } else if (diffstr[i][0] === '-') {
	          hunks[0].removed.push(diffstr[i].substr(1));
	        } else if (diffstr[i][0] === ' ') {
	          hunks[0].added.push(diffstr[i].substr(1));
	          hunks[0].removed.push(diffstr[i].substr(1));
	        } else if (diffstr[i][0] === '\\') {
	          if (diffstr[i - 1][0] === '+') {
	            remEOFNL = true;
	          } else if (diffstr[i - 1][0] === '-') {
	            addEOFNL = true;
	          }
	        }
	      }

	      // Apply the diff to the input
	      var lines = oldStr.split('\n');
	      for (i = hunks.length - 1; i >= 0; i--) {
	        var hunk = hunks[i];
	        // Sanity check the input string. Bail if we don't match.
	        for (var j = 0; j < hunk.oldlength; j++) {
	          if (lines[hunk.start - 1 + j] !== hunk.removed[j]) {
	            return false;
	          }
	        }
	        Array.prototype.splice.apply(lines, [hunk.start - 1, hunk.oldlength].concat(hunk.added));
	      }

	      // Handle EOFNL insertion/removal
	      if (remEOFNL) {
	        while (!lines[lines.length - 1]) {
	          lines.pop();
	        }
	      } else if (addEOFNL) {
	        lines.push('');
	      }
	      return lines.join('\n');
	    },

	    convertChangesToXML: function(changes) {
	      var ret = [];
	      for (var i = 0; i < changes.length; i++) {
	        var change = changes[i];
	        if (change.added) {
	          ret.push('<ins>');
	        } else if (change.removed) {
	          ret.push('<del>');
	        }

	        ret.push(escapeHTML(change.value));

	        if (change.added) {
	          ret.push('</ins>');
	        } else if (change.removed) {
	          ret.push('</del>');
	        }
	      }
	      return ret.join('');
	    },

	    // See: http://code.google.com/p/google-diff-match-patch/wiki/API
	    convertChangesToDMP: function(changes) {
	      var ret = [],
	          change,
	          operation;
	      for (var i = 0; i < changes.length; i++) {
	        change = changes[i];
	        if (change.added) {
	          operation = 1;
	        } else if (change.removed) {
	          operation = -1;
	        } else {
	          operation = 0;
	        }

	        ret.push([operation, change.value]);
	      }
	      return ret;
	    },

	    canonicalize: canonicalize
	  };

	  /*istanbul ignore next */
	  /*global module */
	  if (typeof module !== 'undefined' && module.exports) {
	    module.exports = JsDiff;
	  } else if (true) {
	    /*global define */
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() { return JsDiff; }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof global.JsDiff === 'undefined') {
	    global.JsDiff = JsDiff;
	  }
	}(this));


/***/ },
/* 13 */
/***/ function(module, exports) {

	/**
	 * Helpers.
	 */

	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;

	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @api public
	 * @param {string|number} val
	 * @param {Object} options
	 * @return {string|number}
	 */
	module.exports = function(val, options) {
	  options = options || {};
	  if (typeof val === 'string') {
	    return parse(val);
	  }
	  // https://github.com/mochajs/mocha/pull/1035
	  return options['long'] ? longFormat(val) : shortFormat(val);
	};

	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @api private
	 * @param {string} str
	 * @return {number}
	 */
	function parse(str) {
	  var match = (/^((?:\d+)?\.?\d+) *(ms|seconds?|s|minutes?|m|hours?|h|days?|d|years?|y)?$/i).exec(str);
	  if (!match) {
	    return;
	  }
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'y':
	      return n * y;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 's':
	      return n * s;
	    case 'ms':
	      return n;
	    default:
	      // No default case
	  }
	}

	/**
	 * Short format for `ms`.
	 *
	 * @api private
	 * @param {number} ms
	 * @return {string}
	 */
	function shortFormat(ms) {
	  if (ms >= d) {
	    return Math.round(ms / d) + 'd';
	  }
	  if (ms >= h) {
	    return Math.round(ms / h) + 'h';
	  }
	  if (ms >= m) {
	    return Math.round(ms / m) + 'm';
	  }
	  if (ms >= s) {
	    return Math.round(ms / s) + 's';
	  }
	  return ms + 'ms';
	}

	/**
	 * Long format for `ms`.
	 *
	 * @api private
	 * @param {number} ms
	 * @return {string}
	 */
	function longFormat(ms) {
	  return plural(ms, d, 'day')
	    || plural(ms, h, 'hour')
	    || plural(ms, m, 'minute')
	    || plural(ms, s, 'second')
	    || ms + ' ms';
	}

	/**
	 * Pluralization helper.
	 *
	 * @api private
	 * @param {number} ms
	 * @param {number} n
	 * @param {string} name
	 */
	function plural(ms, n, name) {
	  if (ms < n) {
	    return;
	  }
	  if (ms < n * 1.5) {
	    return Math.floor(ms / n) + ' ' + name;
	  }
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* eslint-env browser */

	/**
	 * Module dependencies.
	 */

	var basename = __webpack_require__(8).basename;
	var debug = __webpack_require__(15)('mocha:watch');
	var exists = __webpack_require__(19).existsSync || __webpack_require__(8).existsSync;
	var glob = __webpack_require__(21);
	var join = __webpack_require__(8).join;
	var readdirSync = __webpack_require__(19).readdirSync;
	var statSync = __webpack_require__(19).statSync;
	var watchFile = __webpack_require__(19).watchFile;

	/**
	 * Ignored directories.
	 */

	var ignore = ['node_modules', '.git'];

	exports.inherits = __webpack_require__(16).inherits;

	/**
	 * Escape special characters in the given string of html.
	 *
	 * @api private
	 * @param  {string} html
	 * @return {string}
	 */
	exports.escape = function(html) {
	  return String(html)
	    .replace(/&/g, '&amp;')
	    .replace(/"/g, '&quot;')
	    .replace(/</g, '&lt;')
	    .replace(/>/g, '&gt;');
	};

	/**
	 * Array#forEach (<=IE8)
	 *
	 * @api private
	 * @param {Array} arr
	 * @param {Function} fn
	 * @param {Object} scope
	 */
	exports.forEach = function(arr, fn, scope) {
	  for (var i = 0, l = arr.length; i < l; i++) {
	    fn.call(scope, arr[i], i);
	  }
	};

	/**
	 * Test if the given obj is type of string.
	 *
	 * @api private
	 * @param {Object} obj
	 * @return {boolean}
	 */
	exports.isString = function(obj) {
	  return typeof obj === 'string';
	};

	/**
	 * Array#map (<=IE8)
	 *
	 * @api private
	 * @param {Array} arr
	 * @param {Function} fn
	 * @param {Object} scope
	 * @return {Array}
	 */
	exports.map = function(arr, fn, scope) {
	  var result = [];
	  for (var i = 0, l = arr.length; i < l; i++) {
	    result.push(fn.call(scope, arr[i], i, arr));
	  }
	  return result;
	};

	/**
	 * Array#indexOf (<=IE8)
	 *
	 * @api private
	 * @param {Array} arr
	 * @param {Object} obj to find index of
	 * @param {number} start
	 * @return {number}
	 */
	exports.indexOf = function(arr, obj, start) {
	  for (var i = start || 0, l = arr.length; i < l; i++) {
	    if (arr[i] === obj) {
	      return i;
	    }
	  }
	  return -1;
	};

	/**
	 * Array#reduce (<=IE8)
	 *
	 * @api private
	 * @param {Array} arr
	 * @param {Function} fn
	 * @param {Object} val Initial value.
	 * @return {*}
	 */
	exports.reduce = function(arr, fn, val) {
	  var rval = val;

	  for (var i = 0, l = arr.length; i < l; i++) {
	    rval = fn(rval, arr[i], i, arr);
	  }

	  return rval;
	};

	/**
	 * Array#filter (<=IE8)
	 *
	 * @api private
	 * @param {Array} arr
	 * @param {Function} fn
	 * @return {Array}
	 */
	exports.filter = function(arr, fn) {
	  var ret = [];

	  for (var i = 0, l = arr.length; i < l; i++) {
	    var val = arr[i];
	    if (fn(val, i, arr)) {
	      ret.push(val);
	    }
	  }

	  return ret;
	};

	/**
	 * Object.keys (<=IE8)
	 *
	 * @api private
	 * @param {Object} obj
	 * @return {Array} keys
	 */
	exports.keys = typeof Object.keys === 'function' ? Object.keys : function(obj) {
	  var keys = [];
	  var has = Object.prototype.hasOwnProperty; // for `window` on <=IE8

	  for (var key in obj) {
	    if (has.call(obj, key)) {
	      keys.push(key);
	    }
	  }

	  return keys;
	};

	/**
	 * Watch the given `files` for changes
	 * and invoke `fn(file)` on modification.
	 *
	 * @api private
	 * @param {Array} files
	 * @param {Function} fn
	 */
	exports.watch = function(files, fn) {
	  var options = { interval: 100 };
	  files.forEach(function(file) {
	    debug('file %s', file);
	    watchFile(file, options, function(curr, prev) {
	      if (prev.mtime < curr.mtime) {
	        fn(file);
	      }
	    });
	  });
	};

	/**
	 * Array.isArray (<=IE8)
	 *
	 * @api private
	 * @param {Object} obj
	 * @return {Boolean}
	 */
	var isArray = typeof Array.isArray === 'function' ? Array.isArray : function(obj) {
	  return Object.prototype.toString.call(obj) === '[object Array]';
	};

	exports.isArray = isArray;

	/**
	 * Buffer.prototype.toJSON polyfill.
	 *
	 * @type {Function}
	 */
	if (typeof Buffer !== 'undefined' && Buffer.prototype) {
	  Buffer.prototype.toJSON = Buffer.prototype.toJSON || function() {
	    return Array.prototype.slice.call(this, 0);
	  };
	}

	/**
	 * Ignored files.
	 *
	 * @api private
	 * @param {string} path
	 * @return {boolean}
	 */
	function ignored(path) {
	  return !~ignore.indexOf(path);
	}

	/**
	 * Lookup files in the given `dir`.
	 *
	 * @api private
	 * @param {string} dir
	 * @param {string[]} [ext=['.js']]
	 * @param {Array} [ret=[]]
	 * @return {Array}
	 */
	exports.files = function(dir, ext, ret) {
	  ret = ret || [];
	  ext = ext || ['js'];

	  var re = new RegExp('\\.(' + ext.join('|') + ')$');

	  readdirSync(dir)
	    .filter(ignored)
	    .forEach(function(path) {
	      path = join(dir, path);
	      if (statSync(path).isDirectory()) {
	        exports.files(path, ext, ret);
	      } else if (path.match(re)) {
	        ret.push(path);
	      }
	    });

	  return ret;
	};

	/**
	 * Compute a slug from the given `str`.
	 *
	 * @api private
	 * @param {string} str
	 * @return {string}
	 */
	exports.slug = function(str) {
	  return str
	    .toLowerCase()
	    .replace(/ +/g, '-')
	    .replace(/[^-\w]/g, '');
	};

	/**
	 * Strip the function definition from `str`, and re-indent for pre whitespace.
	 *
	 * @param {string} str
	 * @return {string}
	 */
	exports.clean = function(str) {
	  str = str
	    .replace(/\r\n?|[\n\u2028\u2029]/g, '\n').replace(/^\uFEFF/, '')
	    .replace(/^function *\(.*\)\s*\{|\(.*\) *=> *\{?/, '')
	    .replace(/\s+\}$/, '');

	  var spaces = str.match(/^\n?( *)/)[1].length;
	  var tabs = str.match(/^\n?(\t*)/)[1].length;
	  var re = new RegExp('^\n?' + (tabs ? '\t' : ' ') + '{' + (tabs ? tabs : spaces) + '}', 'gm');

	  str = str.replace(re, '');

	  return exports.trim(str);
	};

	/**
	 * Trim the given `str`.
	 *
	 * @api private
	 * @param {string} str
	 * @return {string}
	 */
	exports.trim = function(str) {
	  return str.replace(/^\s+|\s+$/g, '');
	};

	/**
	 * Parse the given `qs`.
	 *
	 * @api private
	 * @param {string} qs
	 * @return {Object}
	 */
	exports.parseQuery = function(qs) {
	  return exports.reduce(qs.replace('?', '').split('&'), function(obj, pair) {
	    var i = pair.indexOf('=');
	    var key = pair.slice(0, i);
	    var val = pair.slice(++i);

	    obj[key] = decodeURIComponent(val);
	    return obj;
	  }, {});
	};

	/**
	 * Highlight the given string of `js`.
	 *
	 * @api private
	 * @param {string} js
	 * @return {string}
	 */
	function highlight(js) {
	  return js
	    .replace(/</g, '&lt;')
	    .replace(/>/g, '&gt;')
	    .replace(/\/\/(.*)/gm, '<span class="comment">//$1</span>')
	    .replace(/('.*?')/gm, '<span class="string">$1</span>')
	    .replace(/(\d+\.\d+)/gm, '<span class="number">$1</span>')
	    .replace(/(\d+)/gm, '<span class="number">$1</span>')
	    .replace(/\bnew[ \t]+(\w+)/gm, '<span class="keyword">new</span> <span class="init">$1</span>')
	    .replace(/\b(function|new|throw|return|var|if|else)\b/gm, '<span class="keyword">$1</span>');
	}

	/**
	 * Highlight the contents of tag `name`.
	 *
	 * @api private
	 * @param {string} name
	 */
	exports.highlightTags = function(name) {
	  var code = document.getElementById('mocha').getElementsByTagName(name);
	  for (var i = 0, len = code.length; i < len; ++i) {
	    code[i].innerHTML = highlight(code[i].innerHTML);
	  }
	};

	/**
	 * If a value could have properties, and has none, this function is called,
	 * which returns a string representation of the empty value.
	 *
	 * Functions w/ no properties return `'[Function]'`
	 * Arrays w/ length === 0 return `'[]'`
	 * Objects w/ no properties return `'{}'`
	 * All else: return result of `value.toString()`
	 *
	 * @api private
	 * @param {*} value The value to inspect.
	 * @param {string} [type] The type of the value, if known.
	 * @returns {string}
	 */
	function emptyRepresentation(value, type) {
	  type = type || exports.type(value);

	  switch (type) {
	    case 'function':
	      return '[Function]';
	    case 'object':
	      return '{}';
	    case 'array':
	      return '[]';
	    default:
	      return value.toString();
	  }
	}

	/**
	 * Takes some variable and asks `Object.prototype.toString()` what it thinks it
	 * is.
	 *
	 * @api private
	 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString
	 * @param {*} value The value to test.
	 * @returns {string}
	 * @example
	 * type({}) // 'object'
	 * type([]) // 'array'
	 * type(1) // 'number'
	 * type(false) // 'boolean'
	 * type(Infinity) // 'number'
	 * type(null) // 'null'
	 * type(new Date()) // 'date'
	 * type(/foo/) // 'regexp'
	 * type('type') // 'string'
	 * type(global) // 'global'
	 */
	exports.type = function type(value) {
	  if (value === undefined) {
	    return 'undefined';
	  } else if (value === null) {
	    return 'null';
	  } else if (typeof Buffer !== 'undefined' && Buffer.isBuffer(value)) {
	    return 'buffer';
	  }
	  return Object.prototype.toString.call(value)
	    .replace(/^\[.+\s(.+?)\]$/, '$1')
	    .toLowerCase();
	};

	/**
	 * Stringify `value`. Different behavior depending on type of value:
	 *
	 * - If `value` is undefined or null, return `'[undefined]'` or `'[null]'`, respectively.
	 * - If `value` is not an object, function or array, return result of `value.toString()` wrapped in double-quotes.
	 * - If `value` is an *empty* object, function, or array, return result of function
	 *   {@link emptyRepresentation}.
	 * - If `value` has properties, call {@link exports.canonicalize} on it, then return result of
	 *   JSON.stringify().
	 *
	 * @api private
	 * @see exports.type
	 * @param {*} value
	 * @return {string}
	 */
	exports.stringify = function(value) {
	  var type = exports.type(value);

	  if (!~exports.indexOf(['object', 'array', 'function'], type)) {
	    if (type !== 'buffer') {
	      return jsonStringify(value);
	    }
	    var json = value.toJSON();
	    // Based on the toJSON result
	    return jsonStringify(json.data && json.type ? json.data : json, 2)
	      .replace(/,(\n|$)/g, '$1');
	  }

	  for (var prop in value) {
	    if (Object.prototype.hasOwnProperty.call(value, prop)) {
	      return jsonStringify(exports.canonicalize(value), 2).replace(/,(\n|$)/g, '$1');
	    }
	  }

	  return emptyRepresentation(value, type);
	};

	/**
	 * like JSON.stringify but more sense.
	 *
	 * @api private
	 * @param {Object}  object
	 * @param {number=} spaces
	 * @param {number=} depth
	 * @returns {*}
	 */
	function jsonStringify(object, spaces, depth) {
	  if (typeof spaces === 'undefined') {
	    // primitive types
	    return _stringify(object);
	  }

	  depth = depth || 1;
	  var space = spaces * depth;
	  var str = isArray(object) ? '[' : '{';
	  var end = isArray(object) ? ']' : '}';
	  var length = object.length || exports.keys(object).length;
	  // `.repeat()` polyfill
	  function repeat(s, n) {
	    return new Array(n).join(s);
	  }

	  function _stringify(val) {
	    switch (exports.type(val)) {
	      case 'null':
	      case 'undefined':
	        val = '[' + val + ']';
	        break;
	      case 'array':
	      case 'object':
	        val = jsonStringify(val, spaces, depth + 1);
	        break;
	      case 'boolean':
	      case 'regexp':
	      case 'number':
	        val = val === 0 && (1 / val) === -Infinity // `-0`
	          ? '-0'
	          : val.toString();
	        break;
	      case 'date':
	        var sDate = isNaN(val.getTime())        // Invalid date
	          ? val.toString()
	          : val.toISOString();
	        val = '[Date: ' + sDate + ']';
	        break;
	      case 'buffer':
	        var json = val.toJSON();
	        // Based on the toJSON result
	        json = json.data && json.type ? json.data : json;
	        val = '[Buffer: ' + jsonStringify(json, 2, depth + 1) + ']';
	        break;
	      default:
	        val = (val === '[Function]' || val === '[Circular]')
	          ? val
	          : JSON.stringify(val); // string
	    }
	    return val;
	  }

	  for (var i in object) {
	    if (!object.hasOwnProperty(i)) {
	      continue; // not my business
	    }
	    --length;
	    str += '\n ' + repeat(' ', space)
	      + (isArray(object) ? '' : '"' + i + '": ') // key
	      + _stringify(object[i])                     // value
	      + (length ? ',' : '');                     // comma
	  }

	  return str
	    // [], {}
	    + (str.length !== 1 ? '\n' + repeat(' ', --space) + end : end);
	}

	/**
	 * Test if a value is a buffer.
	 *
	 * @api private
	 * @param {*} value The value to test.
	 * @return {boolean} True if `value` is a buffer, otherwise false
	 */
	exports.isBuffer = function(value) {
	  return typeof Buffer !== 'undefined' && Buffer.isBuffer(value);
	};

	/**
	 * Return a new Thing that has the keys in sorted order. Recursive.
	 *
	 * If the Thing...
	 * - has already been seen, return string `'[Circular]'`
	 * - is `undefined`, return string `'[undefined]'`
	 * - is `null`, return value `null`
	 * - is some other primitive, return the value
	 * - is not a primitive or an `Array`, `Object`, or `Function`, return the value of the Thing's `toString()` method
	 * - is a non-empty `Array`, `Object`, or `Function`, return the result of calling this function again.
	 * - is an empty `Array`, `Object`, or `Function`, return the result of calling `emptyRepresentation()`
	 *
	 * @api private
	 * @see {@link exports.stringify}
	 * @param {*} value Thing to inspect.  May or may not have properties.
	 * @param {Array} [stack=[]] Stack of seen values
	 * @return {(Object|Array|Function|string|undefined)}
	 */
	exports.canonicalize = function(value, stack) {
	  var canonicalizedObj;
	  /* eslint-disable no-unused-vars */
	  var prop;
	  /* eslint-enable no-unused-vars */
	  var type = exports.type(value);
	  function withStack(value, fn) {
	    stack.push(value);
	    fn();
	    stack.pop();
	  }

	  stack = stack || [];

	  if (exports.indexOf(stack, value) !== -1) {
	    return '[Circular]';
	  }

	  switch (type) {
	    case 'undefined':
	    case 'buffer':
	    case 'null':
	      canonicalizedObj = value;
	      break;
	    case 'array':
	      withStack(value, function() {
	        canonicalizedObj = exports.map(value, function(item) {
	          return exports.canonicalize(item, stack);
	        });
	      });
	      break;
	    case 'function':
	      /* eslint-disable guard-for-in */
	      for (prop in value) {
	        canonicalizedObj = {};
	        break;
	      }
	      /* eslint-enable guard-for-in */
	      if (!canonicalizedObj) {
	        canonicalizedObj = emptyRepresentation(value, type);
	        break;
	      }
	    /* falls through */
	    case 'object':
	      canonicalizedObj = canonicalizedObj || {};
	      withStack(value, function() {
	        exports.forEach(exports.keys(value).sort(), function(key) {
	          canonicalizedObj[key] = exports.canonicalize(value[key], stack);
	        });
	      });
	      break;
	    case 'date':
	    case 'number':
	    case 'regexp':
	    case 'boolean':
	      canonicalizedObj = value;
	      break;
	    default:
	      canonicalizedObj = value + '';
	  }

	  return canonicalizedObj;
	};

	/**
	 * Lookup file names at the given `path`.
	 *
	 * @api public
	 * @param {string} path Base path to start searching from.
	 * @param {string[]} extensions File extensions to look for.
	 * @param {boolean} recursive Whether or not to recurse into subdirectories.
	 * @return {string[]} An array of paths.
	 */
	exports.lookupFiles = function lookupFiles(path, extensions, recursive) {
	  var files = [];
	  var re = new RegExp('\\.(' + extensions.join('|') + ')$');

	  if (!exists(path)) {
	    if (exists(path + '.js')) {
	      path += '.js';
	    } else {
	      files = glob.sync(path);
	      if (!files.length) {
	        throw new Error("cannot resolve path (or pattern) '" + path + "'");
	      }
	      return files;
	    }
	  }

	  try {
	    var stat = statSync(path);
	    if (stat.isFile()) {
	      return path;
	    }
	  } catch (err) {
	    // ignore error
	    return;
	  }

	  readdirSync(path).forEach(function(file) {
	    file = join(path, file);
	    try {
	      var stat = statSync(file);
	      if (stat.isDirectory()) {
	        if (recursive) {
	          files = files.concat(lookupFiles(file, extensions, recursive));
	        }
	        return;
	      }
	    } catch (err) {
	      // ignore error
	      return;
	    }
	    if (!stat.isFile() || !re.test(file) || basename(file)[0] === '.') {
	      return;
	    }
	    files.push(file);
	  });

	  return files;
	};

	/**
	 * Generate an undefined error with a message warning the user.
	 *
	 * @return {Error}
	 */

	exports.undefinedError = function() {
	  return new Error('Caught undefined error, did you throw without specifying what?');
	};

	/**
	 * Generate an undefined error if `err` is not defined.
	 *
	 * @param {Error} err
	 * @return {Error}
	 */

	exports.getError = function(err) {
	  return err || exports.undefinedError();
	};

	/**
	 * @summary
	 * This Filter based on `mocha-clean` module.(see: `github.com/rstacruz/mocha-clean`)
	 * @description
	 * When invoking this function you get a filter function that get the Error.stack as an input,
	 * and return a prettify output.
	 * (i.e: strip Mocha and internal node functions from stack trace).
	 * @returns {Function}
	 */
	exports.stackTraceFilter = function() {
	  // TODO: Replace with `process.browser`
	  var slash = '/';
	  var is = typeof document === 'undefined' ? { node: true } : { browser: true };
	  var cwd = is.node
	      ? process.cwd() + slash
	      : (typeof location === 'undefined' ? window.location : location).href.replace(/\/[^\/]*$/, '/');

	  function isMochaInternal(line) {
	    return (~line.indexOf('node_modules' + slash + 'mocha' + slash))
	      || (~line.indexOf('components' + slash + 'mochajs' + slash))
	      || (~line.indexOf('components' + slash + 'mocha' + slash))
	      || (~line.indexOf(slash + 'mocha.js'));
	  }

	  function isNodeInternal(line) {
	    return (~line.indexOf('(timers.js:'))
	      || (~line.indexOf('(events.js:'))
	      || (~line.indexOf('(node.js:'))
	      || (~line.indexOf('(module.js:'))
	      || (~line.indexOf('GeneratorFunctionPrototype.next (native)'))
	      || false;
	  }

	  return function(stack) {
	    stack = stack.split('\n');

	    stack = exports.reduce(stack, function(list, line) {
	      if (isMochaInternal(line)) {
	        return list;
	      }

	      if (is.node && isNodeInternal(line)) {
	        return list;
	      }

	      // Clean up cwd(absolute)
	      list.push(line.replace(cwd, ''));
	      return list;
	    }, []);

	    return stack.join('\n');
	  };
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */

	var tty = __webpack_require__(11);
	var util = __webpack_require__(16);

	/**
	 * This is the Node.js implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = __webpack_require__(17);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;

	/**
	 * Colors.
	 */

	exports.colors = [6, 2, 3, 4, 5, 1];

	/**
	 * The file descriptor to write the `debug()` calls to.
	 * Set the `DEBUG_FD` env variable to override with another value. i.e.:
	 *
	 *   $ DEBUG_FD=3 node script.js 3>debug.log
	 */

	var fd = parseInt(process.env.DEBUG_FD, 10) || 2;
	var stream = 1 === fd ? process.stdout :
	             2 === fd ? process.stderr :
	             createWritableStdioStream(fd);

	/**
	 * Is stdout a TTY? Colored output is enabled when `true`.
	 */

	function useColors() {
	  var debugColors = (process.env.DEBUG_COLORS || '').trim().toLowerCase();
	  if (0 === debugColors.length) {
	    return tty.isatty(fd);
	  } else {
	    return '0' !== debugColors
	        && 'no' !== debugColors
	        && 'false' !== debugColors
	        && 'disabled' !== debugColors;
	  }
	}

	/**
	 * Map %o to `util.inspect()`, since Node doesn't do that out of the box.
	 */

	var inspect = (4 === util.inspect.length ?
	  // node <= 0.8.x
	  function (v, colors) {
	    return util.inspect(v, void 0, void 0, colors);
	  } :
	  // node > 0.8.x
	  function (v, colors) {
	    return util.inspect(v, { colors: colors });
	  }
	);

	exports.formatters.o = function(v) {
	  return inspect(v, this.useColors)
	    .replace(/\s*\n\s*/g, ' ');
	};

	/**
	 * Adds ANSI color escape codes if enabled.
	 *
	 * @api public
	 */

	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;
	  var name = this.namespace;

	  if (useColors) {
	    var c = this.color;

	    args[0] = '  \u001b[3' + c + ';1m' + name + ' '
	      + '\u001b[0m'
	      + args[0] + '\u001b[3' + c + 'm'
	      + ' +' + exports.humanize(this.diff) + '\u001b[0m';
	  } else {
	    args[0] = new Date().toUTCString()
	      + ' ' + name + ' ' + args[0];
	  }
	  return args;
	}

	/**
	 * Invokes `console.error()` with the specified arguments.
	 */

	function log() {
	  return stream.write(util.format.apply(this, arguments) + '\n');
	}

	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */

	function save(namespaces) {
	  if (null == namespaces) {
	    // If you set a process.env field to null or undefined, it gets cast to the
	    // string 'null' or 'undefined'. Just delete instead.
	    delete process.env.DEBUG;
	  } else {
	    process.env.DEBUG = namespaces;
	  }
	}

	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */

	function load() {
	  return process.env.DEBUG;
	}

	/**
	 * Copied from `node/src/node.js`.
	 *
	 * XXX: It's lame that node doesn't expose this API out-of-the-box. It also
	 * relies on the undocumented `tty_wrap.guessHandleType()` which is also lame.
	 */

	function createWritableStdioStream (fd) {
	  var stream;
	  var tty_wrap = process.binding('tty_wrap');

	  // Note stream._type is used for test-module-load-list.js

	  switch (tty_wrap.guessHandleType(fd)) {
	    case 'TTY':
	      stream = new tty.WriteStream(fd);
	      stream._type = 'tty';

	      // Hack to have stream not keep the event loop alive.
	      // See https://github.com/joyent/node/issues/1726
	      if (stream._handle && stream._handle.unref) {
	        stream._handle.unref();
	      }
	      break;

	    case 'FILE':
	      var fs = __webpack_require__(19);
	      stream = new fs.SyncWriteStream(fd, { autoClose: false });
	      stream._type = 'fs';
	      break;

	    case 'PIPE':
	    case 'TCP':
	      var net = __webpack_require__(20);
	      stream = new net.Socket({
	        fd: fd,
	        readable: false,
	        writable: true
	      });

	      // FIXME Should probably have an option in net.Socket to create a
	      // stream from an existing fd which is writable only. But for now
	      // we'll just add this hack and set the `readable` member to false.
	      // Test: ./node test/fixtures/echo.js < /etc/passwd
	      stream.readable = false;
	      stream.read = null;
	      stream._type = 'pipe';

	      // FIXME Hack to have stream not keep the event loop alive.
	      // See https://github.com/joyent/node/issues/1726
	      if (stream._handle && stream._handle.unref) {
	        stream._handle.unref();
	      }
	      break;

	    default:
	      // Probably an error on in uv_guess_handle()
	      throw new Error('Implement me. Unknown stream file type!');
	  }

	  // For supporting legacy API we put the FD here.
	  stream.fd = fd;

	  stream._isStdio = true;

	  return stream;
	}

	/**
	 * Enable namespaces listed in `process.env.DEBUG` initially.
	 */

	exports.enable(load());


/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("util");

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(18);

	/**
	 * The currently active debug mode names, and names to skip.
	 */

	exports.names = [];
	exports.skips = [];

	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */

	exports.formatters = {};

	/**
	 * Previously assigned color.
	 */

	var prevColor = 0;

	/**
	 * Previous log timestamp.
	 */

	var prevTime;

	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */

	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}

	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */

	function debug(namespace) {

	  // define the `disabled` version
	  function disabled() {
	  }
	  disabled.enabled = false;

	  // define the `enabled` version
	  function enabled() {

	    var self = enabled;

	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;

	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();

	    var args = Array.prototype.slice.call(arguments);

	    args[0] = exports.coerce(args[0]);

	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }

	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);

	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });

	    if ('function' === typeof exports.formatArgs) {
	      args = exports.formatArgs.apply(self, args);
	    }
	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;

	  var fn = exports.enabled(namespace) ? enabled : disabled;

	  fn.namespace = namespace;

	  return fn;
	}

	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */

	function enable(namespaces) {
	  exports.save(namespaces);

	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;

	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}

	/**
	 * Disable debug output.
	 *
	 * @api public
	 */

	function disable() {
	  exports.enable('');
	}

	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */

	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */

	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}


/***/ },
/* 18 */
/***/ function(module, exports) {

	/**
	 * Helpers.
	 */

	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;

	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @return {String|Number}
	 * @api public
	 */

	module.exports = function(val, options){
	  options = options || {};
	  if ('string' == typeof val) return parse(val);
	  return options.long
	    ? long(val)
	    : short(val);
	};

	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */

	function parse(str) {
	  str = '' + str;
	  if (str.length > 10000) return;
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
	  if (!match) return;
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	  }
	}

	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function short(ms) {
	  if (ms >= d) return Math.round(ms / d) + 'd';
	  if (ms >= h) return Math.round(ms / h) + 'h';
	  if (ms >= m) return Math.round(ms / m) + 'm';
	  if (ms >= s) return Math.round(ms / s) + 's';
	  return ms + 'ms';
	}

	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function long(ms) {
	  return plural(ms, d, 'day')
	    || plural(ms, h, 'hour')
	    || plural(ms, m, 'minute')
	    || plural(ms, s, 'second')
	    || ms + ' ms';
	}

	/**
	 * Pluralization helper.
	 */

	function plural(ms, n, name) {
	  if (ms < n) return;
	  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}


/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = require("net");

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// Approach:
	//
	// 1. Get the minimatch set
	// 2. For each pattern in the set, PROCESS(pattern)
	// 3. Store matches per-set, then uniq them
	//
	// PROCESS(pattern)
	// Get the first [n] items from pattern that are all strings
	// Join these together.  This is PREFIX.
	//   If there is no more remaining, then stat(PREFIX) and
	//   add to matches if it succeeds.  END.
	// readdir(PREFIX) as ENTRIES
	//   If fails, END
	//   If pattern[n] is GLOBSTAR
	//     // handle the case where the globstar match is empty
	//     // by pruning it out, and testing the resulting pattern
	//     PROCESS(pattern[0..n] + pattern[n+1 .. $])
	//     // handle other cases.
	//     for ENTRY in ENTRIES (not dotfiles)
	//       // attach globstar + tail onto the entry
	//       PROCESS(pattern[0..n] + ENTRY + pattern[n .. $])
	//
	//   else // not globstar
	//     for ENTRY in ENTRIES (not dotfiles, unless pattern[n] is dot)
	//       Test ENTRY against pattern[n]
	//       If fails, continue
	//       If passes, PROCESS(pattern[0..n] + item + pattern[n+1 .. $])
	//
	// Caveat:
	//   Cache all stats and readdirs results to minimize syscall.  Since all
	//   we ever care about is existence and directory-ness, we can just keep
	//   `true` for files, and [children,...] for directories, or `false` for
	//   things that don't exist.



	module.exports = glob

	var fs = __webpack_require__(22)
	, minimatch = __webpack_require__(26)
	, Minimatch = minimatch.Minimatch
	, inherits = __webpack_require__(36)
	, EE = __webpack_require__(37).EventEmitter
	, path = __webpack_require__(8)
	, isDir = {}
	, assert = __webpack_require__(23).ok

	function glob (pattern, options, cb) {
	  if (typeof options === "function") cb = options, options = {}
	  if (!options) options = {}

	  if (typeof options === "number") {
	    deprecated()
	    return
	  }

	  var g = new Glob(pattern, options, cb)
	  return g.sync ? g.found : g
	}

	glob.fnmatch = deprecated

	function deprecated () {
	  throw new Error("glob's interface has changed. Please see the docs.")
	}

	glob.sync = globSync
	function globSync (pattern, options) {
	  if (typeof options === "number") {
	    deprecated()
	    return
	  }

	  options = options || {}
	  options.sync = true
	  return glob(pattern, options)
	}


	glob.Glob = Glob
	inherits(Glob, EE)
	function Glob (pattern, options, cb) {
	  if (!(this instanceof Glob)) {
	    return new Glob(pattern, options, cb)
	  }

	  if (typeof cb === "function") {
	    this.on("error", cb)
	    this.on("end", function (matches) {
	      cb(null, matches)
	    })
	  }

	  options = options || {}

	  this.EOF = {}
	  this._emitQueue = []

	  this.maxDepth = options.maxDepth || 1000
	  this.maxLength = options.maxLength || Infinity
	  this.cache = options.cache || {}
	  this.statCache = options.statCache || {}

	  this.changedCwd = false
	  var cwd = process.cwd()
	  if (!options.hasOwnProperty("cwd")) this.cwd = cwd
	  else {
	    this.cwd = options.cwd
	    this.changedCwd = path.resolve(options.cwd) !== cwd
	  }

	  this.root = options.root || path.resolve(this.cwd, "/")
	  this.root = path.resolve(this.root)
	  if (process.platform === "win32")
	    this.root = this.root.replace(/\\/g, "/")

	  this.nomount = !!options.nomount

	  if (!pattern) {
	    throw new Error("must provide pattern")
	  }

	  // base-matching: just use globstar for that.
	  if (options.matchBase && -1 === pattern.indexOf("/")) {
	    if (options.noglobstar) {
	      throw new Error("base matching requires globstar")
	    }
	    pattern = "**/" + pattern
	  }

	  this.strict = options.strict !== false
	  this.dot = !!options.dot
	  this.mark = !!options.mark
	  this.sync = !!options.sync
	  this.nounique = !!options.nounique
	  this.nonull = !!options.nonull
	  this.nosort = !!options.nosort
	  this.nocase = !!options.nocase
	  this.stat = !!options.stat

	  this.debug = !!options.debug || !!options.globDebug
	  if (this.debug)
	    this.log = console.error

	  this.silent = !!options.silent

	  var mm = this.minimatch = new Minimatch(pattern, options)
	  this.options = mm.options
	  pattern = this.pattern = mm.pattern

	  this.error = null
	  this.aborted = false

	  // list of all the patterns that ** has resolved do, so
	  // we can avoid visiting multiple times.
	  this._globstars = {}

	  EE.call(this)

	  // process each pattern in the minimatch set
	  var n = this.minimatch.set.length

	  // The matches are stored as {<filename>: true,...} so that
	  // duplicates are automagically pruned.
	  // Later, we do an Object.keys() on these.
	  // Keep them as a list so we can fill in when nonull is set.
	  this.matches = new Array(n)

	  this.minimatch.set.forEach(iterator.bind(this))
	  function iterator (pattern, i, set) {
	    this._process(pattern, 0, i, function (er) {
	      if (er) this.emit("error", er)
	      if (-- n <= 0) this._finish()
	    })
	  }
	}

	Glob.prototype.log = function () {}

	Glob.prototype._finish = function () {
	  assert(this instanceof Glob)

	  var nou = this.nounique
	  , all = nou ? [] : {}

	  for (var i = 0, l = this.matches.length; i < l; i ++) {
	    var matches = this.matches[i]
	    this.log("matches[%d] =", i, matches)
	    // do like the shell, and spit out the literal glob
	    if (!matches) {
	      if (this.nonull) {
	        var literal = this.minimatch.globSet[i]
	        if (nou) all.push(literal)
	        else all[literal] = true
	      }
	    } else {
	      // had matches
	      var m = Object.keys(matches)
	      if (nou) all.push.apply(all, m)
	      else m.forEach(function (m) {
	        all[m] = true
	      })
	    }
	  }

	  if (!nou) all = Object.keys(all)

	  if (!this.nosort) {
	    all = all.sort(this.nocase ? alphasorti : alphasort)
	  }

	  if (this.mark) {
	    // at *some* point we statted all of these
	    all = all.map(function (m) {
	      var sc = this.cache[m]
	      if (!sc)
	        return m
	      var isDir = (Array.isArray(sc) || sc === 2)
	      if (isDir && m.slice(-1) !== "/") {
	        return m + "/"
	      }
	      if (!isDir && m.slice(-1) === "/") {
	        return m.replace(/\/+$/, "")
	      }
	      return m
	    }, this)
	  }

	  this.log("emitting end", all)

	  this.EOF = this.found = all
	  this.emitMatch(this.EOF)
	}

	function alphasorti (a, b) {
	  a = a.toLowerCase()
	  b = b.toLowerCase()
	  return alphasort(a, b)
	}

	function alphasort (a, b) {
	  return a > b ? 1 : a < b ? -1 : 0
	}

	Glob.prototype.abort = function () {
	  this.aborted = true
	  this.emit("abort")
	}

	Glob.prototype.pause = function () {
	  if (this.paused) return
	  if (this.sync)
	    this.emit("error", new Error("Can't pause/resume sync glob"))
	  this.paused = true
	  this.emit("pause")
	}

	Glob.prototype.resume = function () {
	  if (!this.paused) return
	  if (this.sync)
	    this.emit("error", new Error("Can't pause/resume sync glob"))
	  this.paused = false
	  this.emit("resume")
	  this._processEmitQueue()
	  //process.nextTick(this.emit.bind(this, "resume"))
	}

	Glob.prototype.emitMatch = function (m) {
	  if (!this.stat || this.statCache[m] || m === this.EOF) {
	    this._emitQueue.push(m)
	    this._processEmitQueue()
	  } else {
	    this._stat(m, function(exists, isDir) {
	      if (exists) {
	        this._emitQueue.push(m)
	        this._processEmitQueue()
	      }
	    })
	  }
	}

	Glob.prototype._processEmitQueue = function (m) {
	  while (!this._processingEmitQueue &&
	         !this.paused) {
	    this._processingEmitQueue = true
	    var m = this._emitQueue.shift()
	    if (!m) {
	      this._processingEmitQueue = false
	      break
	    }

	    this.log('emit!', m === this.EOF ? "end" : "match")

	    this.emit(m === this.EOF ? "end" : "match", m)
	    this._processingEmitQueue = false
	  }
	}

	Glob.prototype._process = function (pattern, depth, index, cb_) {
	  assert(this instanceof Glob)

	  var cb = function cb (er, res) {
	    assert(this instanceof Glob)
	    if (this.paused) {
	      if (!this._processQueue) {
	        this._processQueue = []
	        this.once("resume", function () {
	          var q = this._processQueue
	          this._processQueue = null
	          q.forEach(function (cb) { cb() })
	        })
	      }
	      this._processQueue.push(cb_.bind(this, er, res))
	    } else {
	      cb_.call(this, er, res)
	    }
	  }.bind(this)

	  if (this.aborted) return cb()

	  if (depth > this.maxDepth) return cb()

	  // Get the first [n] parts of pattern that are all strings.
	  var n = 0
	  while (typeof pattern[n] === "string") {
	    n ++
	  }
	  // now n is the index of the first one that is *not* a string.

	  // see if there's anything else
	  var prefix
	  switch (n) {
	    // if not, then this is rather simple
	    case pattern.length:
	      prefix = pattern.join("/")
	      this._stat(prefix, function (exists, isDir) {
	        // either it's there, or it isn't.
	        // nothing more to do, either way.
	        if (exists) {
	          if (prefix && isAbsolute(prefix) && !this.nomount) {
	            if (prefix.charAt(0) === "/") {
	              prefix = path.join(this.root, prefix)
	            } else {
	              prefix = path.resolve(this.root, prefix)
	            }
	          }

	          if (process.platform === "win32")
	            prefix = prefix.replace(/\\/g, "/")

	          this.matches[index] = this.matches[index] || {}
	          this.matches[index][prefix] = true
	          this.emitMatch(prefix)
	        }
	        return cb()
	      })
	      return

	    case 0:
	      // pattern *starts* with some non-trivial item.
	      // going to readdir(cwd), but not include the prefix in matches.
	      prefix = null
	      break

	    default:
	      // pattern has some string bits in the front.
	      // whatever it starts with, whether that's "absolute" like /foo/bar,
	      // or "relative" like "../baz"
	      prefix = pattern.slice(0, n)
	      prefix = prefix.join("/")
	      break
	  }

	  // get the list of entries.
	  var read
	  if (prefix === null) read = "."
	  else if (isAbsolute(prefix) || isAbsolute(pattern.join("/"))) {
	    if (!prefix || !isAbsolute(prefix)) {
	      prefix = path.join("/", prefix)
	    }
	    read = prefix = path.resolve(prefix)

	    // if (process.platform === "win32")
	    //   read = prefix = prefix.replace(/^[a-zA-Z]:|\\/g, "/")

	    this.log('absolute: ', prefix, this.root, pattern, read)
	  } else {
	    read = prefix
	  }

	  this.log('readdir(%j)', read, this.cwd, this.root)

	  return this._readdir(read, function (er, entries) {
	    if (er) {
	      // not a directory!
	      // this means that, whatever else comes after this, it can never match
	      return cb()
	    }

	    // globstar is special
	    if (pattern[n] === minimatch.GLOBSTAR) {
	      // test without the globstar, and with every child both below
	      // and replacing the globstar.
	      var s = [ pattern.slice(0, n).concat(pattern.slice(n + 1)) ]
	      entries.forEach(function (e) {
	        if (e.charAt(0) === "." && !this.dot) return
	        // instead of the globstar
	        s.push(pattern.slice(0, n).concat(e).concat(pattern.slice(n + 1)))
	        // below the globstar
	        s.push(pattern.slice(0, n).concat(e).concat(pattern.slice(n)))
	      }, this)

	      s = s.filter(function (pattern) {
	        var key = gsKey(pattern)
	        var seen = !this._globstars[key]
	        this._globstars[key] = true
	        return seen
	      }, this)

	      if (!s.length)
	        return cb()

	      // now asyncForEach over this
	      var l = s.length
	      , errState = null
	      s.forEach(function (gsPattern) {
	        this._process(gsPattern, depth + 1, index, function (er) {
	          if (errState) return
	          if (er) return cb(errState = er)
	          if (--l <= 0) return cb()
	        })
	      }, this)

	      return
	    }

	    // not a globstar
	    // It will only match dot entries if it starts with a dot, or if
	    // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
	    var pn = pattern[n]
	    var rawGlob = pattern[n]._glob
	    , dotOk = this.dot || rawGlob.charAt(0) === "."

	    entries = entries.filter(function (e) {
	      return (e.charAt(0) !== "." || dotOk) &&
	             e.match(pattern[n])
	    })

	    // If n === pattern.length - 1, then there's no need for the extra stat
	    // *unless* the user has specified "mark" or "stat" explicitly.
	    // We know that they exist, since the readdir returned them.
	    if (n === pattern.length - 1 &&
	        !this.mark &&
	        !this.stat) {
	      entries.forEach(function (e) {
	        if (prefix) {
	          if (prefix !== "/") e = prefix + "/" + e
	          else e = prefix + e
	        }
	        if (e.charAt(0) === "/" && !this.nomount) {
	          e = path.join(this.root, e)
	        }

	        if (process.platform === "win32")
	          e = e.replace(/\\/g, "/")

	        this.matches[index] = this.matches[index] || {}
	        this.matches[index][e] = true
	        this.emitMatch(e)
	      }, this)
	      return cb.call(this)
	    }


	    // now test all the remaining entries as stand-ins for that part
	    // of the pattern.
	    var l = entries.length
	    , errState = null
	    if (l === 0) return cb() // no matches possible
	    entries.forEach(function (e) {
	      var p = pattern.slice(0, n).concat(e).concat(pattern.slice(n + 1))
	      this._process(p, depth + 1, index, function (er) {
	        if (errState) return
	        if (er) return cb(errState = er)
	        if (--l === 0) return cb.call(this)
	      })
	    }, this)
	  })

	}

	function gsKey (pattern) {
	  return '**' + pattern.map(function (p) {
	    return (p === minimatch.GLOBSTAR) ? '**' : (''+p)
	  }).join('/')
	}

	Glob.prototype._stat = function (f, cb) {
	  assert(this instanceof Glob)
	  var abs = f
	  if (f.charAt(0) === "/") {
	    abs = path.join(this.root, f)
	  } else if (this.changedCwd) {
	    abs = path.resolve(this.cwd, f)
	  }

	  if (f.length > this.maxLength) {
	    var er = new Error("Path name too long")
	    er.code = "ENAMETOOLONG"
	    er.path = f
	    return this._afterStat(f, abs, cb, er)
	  }

	  this.log('stat', [this.cwd, f, '=', abs])

	  if (!this.stat && this.cache.hasOwnProperty(f)) {
	    var exists = this.cache[f]
	    , isDir = exists && (Array.isArray(exists) || exists === 2)
	    if (this.sync) return cb.call(this, !!exists, isDir)
	    return process.nextTick(cb.bind(this, !!exists, isDir))
	  }

	  var stat = this.statCache[abs]
	  if (this.sync || stat) {
	    var er
	    try {
	      stat = fs.statSync(abs)
	    } catch (e) {
	      er = e
	    }
	    this._afterStat(f, abs, cb, er, stat)
	  } else {
	    fs.stat(abs, this._afterStat.bind(this, f, abs, cb))
	  }
	}

	Glob.prototype._afterStat = function (f, abs, cb, er, stat) {
	  var exists
	  assert(this instanceof Glob)

	  if (abs.slice(-1) === "/" && stat && !stat.isDirectory()) {
	    this.log("should be ENOTDIR, fake it")

	    er = new Error("ENOTDIR, not a directory '" + abs + "'")
	    er.path = abs
	    er.code = "ENOTDIR"
	    stat = null
	  }

	  var emit = !this.statCache[abs]
	  this.statCache[abs] = stat

	  if (er || !stat) {
	    exists = false
	  } else {
	    exists = stat.isDirectory() ? 2 : 1
	    if (emit)
	      this.emit('stat', f, stat)
	  }
	  this.cache[f] = this.cache[f] || exists
	  cb.call(this, !!exists, exists === 2)
	}

	Glob.prototype._readdir = function (f, cb) {
	  assert(this instanceof Glob)
	  var abs = f
	  if (f.charAt(0) === "/") {
	    abs = path.join(this.root, f)
	  } else if (isAbsolute(f)) {
	    abs = f
	  } else if (this.changedCwd) {
	    abs = path.resolve(this.cwd, f)
	  }

	  if (f.length > this.maxLength) {
	    var er = new Error("Path name too long")
	    er.code = "ENAMETOOLONG"
	    er.path = f
	    return this._afterReaddir(f, abs, cb, er)
	  }

	  this.log('readdir', [this.cwd, f, abs])
	  if (this.cache.hasOwnProperty(f)) {
	    var c = this.cache[f]
	    if (Array.isArray(c)) {
	      if (this.sync) return cb.call(this, null, c)
	      return process.nextTick(cb.bind(this, null, c))
	    }

	    if (!c || c === 1) {
	      // either ENOENT or ENOTDIR
	      var code = c ? "ENOTDIR" : "ENOENT"
	      , er = new Error((c ? "Not a directory" : "Not found") + ": " + f)
	      er.path = f
	      er.code = code
	      this.log(f, er)
	      if (this.sync) return cb.call(this, er)
	      return process.nextTick(cb.bind(this, er))
	    }

	    // at this point, c === 2, meaning it's a dir, but we haven't
	    // had to read it yet, or c === true, meaning it's *something*
	    // but we don't have any idea what.  Need to read it, either way.
	  }

	  if (this.sync) {
	    var er, entries
	    try {
	      entries = fs.readdirSync(abs)
	    } catch (e) {
	      er = e
	    }
	    return this._afterReaddir(f, abs, cb, er, entries)
	  }

	  fs.readdir(abs, this._afterReaddir.bind(this, f, abs, cb))
	}

	Glob.prototype._afterReaddir = function (f, abs, cb, er, entries) {
	  assert(this instanceof Glob)
	  if (entries && !er) {
	    this.cache[f] = entries
	    // if we haven't asked to stat everything for suresies, then just
	    // assume that everything in there exists, so we can avoid
	    // having to stat it a second time.  This also gets us one step
	    // further into ELOOP territory.
	    if (!this.mark && !this.stat) {
	      entries.forEach(function (e) {
	        if (f === "/") e = f + e
	        else e = f + "/" + e
	        this.cache[e] = true
	      }, this)
	    }

	    return cb.call(this, er, entries)
	  }

	  // now handle errors, and cache the information
	  if (er) switch (er.code) {
	    case "ENOTDIR": // totally normal. means it *does* exist.
	      this.cache[f] = 1
	      return cb.call(this, er)
	    case "ENOENT": // not terribly unusual
	    case "ELOOP":
	    case "ENAMETOOLONG":
	    case "UNKNOWN":
	      this.cache[f] = false
	      return cb.call(this, er)
	    default: // some unusual error.  Treat as failure.
	      this.cache[f] = false
	      if (this.strict) this.emit("error", er)
	      if (!this.silent) console.error("glob error", er)
	      return cb.call(this, er)
	  }
	}

	var isAbsolute = process.platform === "win32" ? absWin : absUnix

	function absWin (p) {
	  if (absUnix(p)) return true
	  // pull off the device/UNC bit from a windows path.
	  // from node's lib/path.js
	  var splitDeviceRe =
	      /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/
	    , result = splitDeviceRe.exec(p)
	    , device = result[1] || ''
	    , isUnc = device && device.charAt(1) !== ':'
	    , isAbsolute = !!result[2] || isUnc // UNC paths are always absolute

	  return isAbsolute
	}

	function absUnix (p) {
	  return p.charAt(0) === "/" || p === ""
	}


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// Monkey-patching the fs module.
	// It's ugly, but there is simply no other way to do this.
	var fs = module.exports = __webpack_require__(19)

	var assert = __webpack_require__(23)

	// fix up some busted stuff, mostly on windows and old nodes
	__webpack_require__(24)

	// The EMFILE enqueuing stuff

	var util = __webpack_require__(16)

	function noop () {}

	var debug = noop
	if (util.debuglog)
	  debug = util.debuglog('gfs')
	else if (/\bgfs\b/i.test(process.env.NODE_DEBUG || ''))
	  debug = function() {
	    var m = util.format.apply(util, arguments)
	    m = 'GFS: ' + m.split(/\n/).join('\nGFS: ')
	    console.error(m)
	  }

	if (/\bgfs\b/i.test(process.env.NODE_DEBUG || '')) {
	  process.on('exit', function() {
	    debug('fds', fds)
	    debug(queue)
	    assert.equal(queue.length, 0)
	  })
	}


	var originalOpen = fs.open
	fs.open = open

	function open(path, flags, mode, cb) {
	  if (typeof mode === "function") cb = mode, mode = null
	  if (typeof cb !== "function") cb = noop
	  new OpenReq(path, flags, mode, cb)
	}

	function OpenReq(path, flags, mode, cb) {
	  this.path = path
	  this.flags = flags
	  this.mode = mode
	  this.cb = cb
	  Req.call(this)
	}

	util.inherits(OpenReq, Req)

	OpenReq.prototype.process = function() {
	  originalOpen.call(fs, this.path, this.flags, this.mode, this.done)
	}

	var fds = {}
	OpenReq.prototype.done = function(er, fd) {
	  debug('open done', er, fd)
	  if (fd)
	    fds['fd' + fd] = this.path
	  Req.prototype.done.call(this, er, fd)
	}


	var originalReaddir = fs.readdir
	fs.readdir = readdir

	function readdir(path, cb) {
	  if (typeof cb !== "function") cb = noop
	  new ReaddirReq(path, cb)
	}

	function ReaddirReq(path, cb) {
	  this.path = path
	  this.cb = cb
	  Req.call(this)
	}

	util.inherits(ReaddirReq, Req)

	ReaddirReq.prototype.process = function() {
	  originalReaddir.call(fs, this.path, this.done)
	}

	ReaddirReq.prototype.done = function(er, files) {
	  if (files && files.sort)
	    files = files.sort()
	  Req.prototype.done.call(this, er, files)
	  onclose()
	}


	var originalClose = fs.close
	fs.close = close

	function close (fd, cb) {
	  debug('close', fd)
	  if (typeof cb !== "function") cb = noop
	  delete fds['fd' + fd]
	  originalClose.call(fs, fd, function(er) {
	    onclose()
	    cb(er)
	  })
	}


	var originalCloseSync = fs.closeSync
	fs.closeSync = closeSync

	function closeSync (fd) {
	  try {
	    return originalCloseSync(fd)
	  } finally {
	    onclose()
	  }
	}


	// Req class
	function Req () {
	  // start processing
	  this.done = this.done.bind(this)
	  this.failures = 0
	  this.process()
	}

	Req.prototype.done = function (er, result) {
	  var tryAgain = false
	  if (er) {
	    var code = er.code
	    var tryAgain = code === "EMFILE"
	    if (process.platform === "win32")
	      tryAgain = tryAgain || code === "OK"
	  }

	  if (tryAgain) {
	    this.failures ++
	    enqueue(this)
	  } else {
	    var cb = this.cb
	    cb(er, result)
	  }
	}

	var queue = []

	function enqueue(req) {
	  queue.push(req)
	  debug('enqueue %d %s', queue.length, req.constructor.name, req)
	}

	function onclose() {
	  var req = queue.shift()
	  if (req) {
	    debug('process', req.constructor.name, req)
	    req.process()
	  }
	}


/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = require("assert");

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var fs = __webpack_require__(19)
	var constants = __webpack_require__(25)

	var origCwd = process.cwd
	var cwd = null
	process.cwd = function() {
	  if (!cwd)
	    cwd = origCwd.call(process)
	  return cwd
	}
	var chdir = process.chdir
	process.chdir = function(d) {
	  cwd = null
	  chdir.call(process, d)
	}

	// (re-)implement some things that are known busted or missing.

	// lchmod, broken prior to 0.6.2
	// back-port the fix here.
	if (constants.hasOwnProperty('O_SYMLINK') &&
	    process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
	  fs.lchmod = function (path, mode, callback) {
	    callback = callback || noop
	    fs.open( path
	           , constants.O_WRONLY | constants.O_SYMLINK
	           , mode
	           , function (err, fd) {
	      if (err) {
	        callback(err)
	        return
	      }
	      // prefer to return the chmod error, if one occurs,
	      // but still try to close, and report closing errors if they occur.
	      fs.fchmod(fd, mode, function (err) {
	        fs.close(fd, function(err2) {
	          callback(err || err2)
	        })
	      })
	    })
	  }

	  fs.lchmodSync = function (path, mode) {
	    var fd = fs.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode)

	    // prefer to return the chmod error, if one occurs,
	    // but still try to close, and report closing errors if they occur.
	    var err, err2
	    try {
	      var ret = fs.fchmodSync(fd, mode)
	    } catch (er) {
	      err = er
	    }
	    try {
	      fs.closeSync(fd)
	    } catch (er) {
	      err2 = er
	    }
	    if (err || err2) throw (err || err2)
	    return ret
	  }
	}


	// lutimes implementation, or no-op
	if (!fs.lutimes) {
	  if (constants.hasOwnProperty("O_SYMLINK")) {
	    fs.lutimes = function (path, at, mt, cb) {
	      fs.open(path, constants.O_SYMLINK, function (er, fd) {
	        cb = cb || noop
	        if (er) return cb(er)
	        fs.futimes(fd, at, mt, function (er) {
	          fs.close(fd, function (er2) {
	            return cb(er || er2)
	          })
	        })
	      })
	    }

	    fs.lutimesSync = function (path, at, mt) {
	      var fd = fs.openSync(path, constants.O_SYMLINK)
	        , err
	        , err2
	        , ret

	      try {
	        var ret = fs.futimesSync(fd, at, mt)
	      } catch (er) {
	        err = er
	      }
	      try {
	        fs.closeSync(fd)
	      } catch (er) {
	        err2 = er
	      }
	      if (err || err2) throw (err || err2)
	      return ret
	    }

	  } else if (fs.utimensat && constants.hasOwnProperty("AT_SYMLINK_NOFOLLOW")) {
	    // maybe utimensat will be bound soonish?
	    fs.lutimes = function (path, at, mt, cb) {
	      fs.utimensat(path, at, mt, constants.AT_SYMLINK_NOFOLLOW, cb)
	    }

	    fs.lutimesSync = function (path, at, mt) {
	      return fs.utimensatSync(path, at, mt, constants.AT_SYMLINK_NOFOLLOW)
	    }

	  } else {
	    fs.lutimes = function (_a, _b, _c, cb) { process.nextTick(cb) }
	    fs.lutimesSync = function () {}
	  }
	}


	// https://github.com/isaacs/node-graceful-fs/issues/4
	// Chown should not fail on einval or eperm if non-root.

	fs.chown = chownFix(fs.chown)
	fs.fchown = chownFix(fs.fchown)
	fs.lchown = chownFix(fs.lchown)

	fs.chownSync = chownFixSync(fs.chownSync)
	fs.fchownSync = chownFixSync(fs.fchownSync)
	fs.lchownSync = chownFixSync(fs.lchownSync)

	function chownFix (orig) {
	  if (!orig) return orig
	  return function (target, uid, gid, cb) {
	    return orig.call(fs, target, uid, gid, function (er, res) {
	      if (chownErOk(er)) er = null
	      cb(er, res)
	    })
	  }
	}

	function chownFixSync (orig) {
	  if (!orig) return orig
	  return function (target, uid, gid) {
	    try {
	      return orig.call(fs, target, uid, gid)
	    } catch (er) {
	      if (!chownErOk(er)) throw er
	    }
	  }
	}

	function chownErOk (er) {
	  // if there's no getuid, or if getuid() is something other than 0,
	  // and the error is EINVAL or EPERM, then just ignore it.
	  // This specific case is a silent failure in cp, install, tar,
	  // and most other unix tools that manage permissions.
	  // When running as root, or if other types of errors are encountered,
	  // then it's strict.
	  if (!er || (!process.getuid || process.getuid() !== 0)
	      && (er.code === "EINVAL" || er.code === "EPERM")) return true
	}


	// if lchmod/lchown do not exist, then make them no-ops
	if (!fs.lchmod) {
	  fs.lchmod = function (path, mode, cb) {
	    process.nextTick(cb)
	  }
	  fs.lchmodSync = function () {}
	}
	if (!fs.lchown) {
	  fs.lchown = function (path, uid, gid, cb) {
	    process.nextTick(cb)
	  }
	  fs.lchownSync = function () {}
	}



	// on Windows, A/V software can lock the directory, causing this
	// to fail with an EACCES or EPERM if the directory contains newly
	// created files.  Try again on failure, for up to 1 second.
	if (process.platform === "win32") {
	  var rename_ = fs.rename
	  fs.rename = function rename (from, to, cb) {
	    var start = Date.now()
	    rename_(from, to, function CB (er) {
	      if (er
	          && (er.code === "EACCES" || er.code === "EPERM")
	          && Date.now() - start < 1000) {
	        return rename_(from, to, CB)
	      }
	      cb(er)
	    })
	  }
	}


	// if read() returns EAGAIN, then just try it again.
	var read = fs.read
	fs.read = function (fd, buffer, offset, length, position, callback_) {
	  var callback
	  if (callback_ && typeof callback_ === 'function') {
	    var eagCounter = 0
	    callback = function (er, _, __) {
	      if (er && er.code === 'EAGAIN' && eagCounter < 10) {
	        eagCounter ++
	        return read.call(fs, fd, buffer, offset, length, position, callback)
	      }
	      callback_.apply(this, arguments)
	    }
	  }
	  return read.call(fs, fd, buffer, offset, length, position, callback)
	}

	var readSync = fs.readSync
	fs.readSync = function (fd, buffer, offset, length, position) {
	  var eagCounter = 0
	  while (true) {
	    try {
	      return readSync.call(fs, fd, buffer, offset, length, position)
	    } catch (er) {
	      if (er.code === 'EAGAIN' && eagCounter < 10) {
	        eagCounter ++
	        continue
	      }
	      throw er
	    }
	  }
	}



/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = require("constants");

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var require;var require;/* WEBPACK VAR INJECTION */(function(module) {;(function (require, exports, module, platform) {

	if (module) module.exports = minimatch
	else exports.minimatch = minimatch

	if (!__webpack_require__(27)) {
	  require = function (id) {
	    switch (id) {
	      case "sigmund": return function sigmund (obj) {
	        return JSON.stringify(obj)
	      }
	      case "path": return { basename: function (f) {
	        f = f.split(/[\/\\]/)
	        var e = f.pop()
	        if (!e) e = f.pop()
	        return e
	      }}
	      case "lru-cache": return function LRUCache () {
	        // not quite an LRU, but still space-limited.
	        var cache = {}
	        var cnt = 0
	        this.set = function (k, v) {
	          cnt ++
	          if (cnt >= 100) cache = {}
	          cache[k] = v
	        }
	        this.get = function (k) { return cache[k] }
	      }
	    }
	  }
	}

	minimatch.Minimatch = Minimatch

	var LRU = require("lru-cache")
	  , cache = minimatch.cache = new LRU({max: 100})
	  , GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {}
	  , sigmund = require("sigmund")

	var path = require("path")
	  // any single thing other than /
	  // don't need to escape / when using new RegExp()
	  , qmark = "[^/]"

	  // * => any number of characters
	  , star = qmark + "*?"

	  // ** when dots are allowed.  Anything goes, except .. and .
	  // not (^ or / followed by one or two dots followed by $ or /),
	  // followed by anything, any number of times.
	  , twoStarDot = "(?:(?!(?:\\\/|^)(?:\\.{1,2})($|\\\/)).)*?"

	  // not a ^ or / followed by a dot,
	  // followed by anything, any number of times.
	  , twoStarNoDot = "(?:(?!(?:\\\/|^)\\.).)*?"

	  // characters that need to be escaped in RegExp.
	  , reSpecials = charSet("().*{}+?[]^$\\!")

	// "abc" -> { a:true, b:true, c:true }
	function charSet (s) {
	  return s.split("").reduce(function (set, c) {
	    set[c] = true
	    return set
	  }, {})
	}

	// normalizes slashes.
	var slashSplit = /\/+/

	minimatch.filter = filter
	function filter (pattern, options) {
	  options = options || {}
	  return function (p, i, list) {
	    return minimatch(p, pattern, options)
	  }
	}

	function ext (a, b) {
	  a = a || {}
	  b = b || {}
	  var t = {}
	  Object.keys(b).forEach(function (k) {
	    t[k] = b[k]
	  })
	  Object.keys(a).forEach(function (k) {
	    t[k] = a[k]
	  })
	  return t
	}

	minimatch.defaults = function (def) {
	  if (!def || !Object.keys(def).length) return minimatch

	  var orig = minimatch

	  var m = function minimatch (p, pattern, options) {
	    return orig.minimatch(p, pattern, ext(def, options))
	  }

	  m.Minimatch = function Minimatch (pattern, options) {
	    return new orig.Minimatch(pattern, ext(def, options))
	  }

	  return m
	}

	Minimatch.defaults = function (def) {
	  if (!def || !Object.keys(def).length) return Minimatch
	  return minimatch.defaults(def).Minimatch
	}


	function minimatch (p, pattern, options) {
	  if (typeof pattern !== "string") {
	    throw new TypeError("glob pattern string required")
	  }

	  if (!options) options = {}

	  // shortcut: comments match nothing.
	  if (!options.nocomment && pattern.charAt(0) === "#") {
	    return false
	  }

	  // "" only matches ""
	  if (pattern.trim() === "") return p === ""

	  return new Minimatch(pattern, options).match(p)
	}

	function Minimatch (pattern, options) {
	  if (!(this instanceof Minimatch)) {
	    return new Minimatch(pattern, options, cache)
	  }

	  if (typeof pattern !== "string") {
	    throw new TypeError("glob pattern string required")
	  }

	  if (!options) options = {}
	  pattern = pattern.trim()

	  // windows: need to use /, not \
	  // On other platforms, \ is a valid (albeit bad) filename char.
	  if (platform === "win32") {
	    pattern = pattern.split("\\").join("/")
	  }

	  // lru storage.
	  // these things aren't particularly big, but walking down the string
	  // and turning it into a regexp can get pretty costly.
	  var cacheKey = pattern + "\n" + sigmund(options)
	  var cached = minimatch.cache.get(cacheKey)
	  if (cached) return cached
	  minimatch.cache.set(cacheKey, this)

	  this.options = options
	  this.set = []
	  this.pattern = pattern
	  this.regexp = null
	  this.negate = false
	  this.comment = false
	  this.empty = false

	  // make the set of regexps etc.
	  this.make()
	}

	Minimatch.prototype.debug = function() {}

	Minimatch.prototype.make = make
	function make () {
	  // don't do it more than once.
	  if (this._made) return

	  var pattern = this.pattern
	  var options = this.options

	  // empty patterns and comments match nothing.
	  if (!options.nocomment && pattern.charAt(0) === "#") {
	    this.comment = true
	    return
	  }
	  if (!pattern) {
	    this.empty = true
	    return
	  }

	  // step 1: figure out negation, etc.
	  this.parseNegate()

	  // step 2: expand braces
	  var set = this.globSet = this.braceExpand()

	  if (options.debug) this.debug = console.error

	  this.debug(this.pattern, set)

	  // step 3: now we have a set, so turn each one into a series of path-portion
	  // matching patterns.
	  // These will be regexps, except in the case of "**", which is
	  // set to the GLOBSTAR object for globstar behavior,
	  // and will not contain any / characters
	  set = this.globParts = set.map(function (s) {
	    return s.split(slashSplit)
	  })

	  this.debug(this.pattern, set)

	  // glob --> regexps
	  set = set.map(function (s, si, set) {
	    return s.map(this.parse, this)
	  }, this)

	  this.debug(this.pattern, set)

	  // filter out everything that didn't compile properly.
	  set = set.filter(function (s) {
	    return -1 === s.indexOf(false)
	  })

	  this.debug(this.pattern, set)

	  this.set = set
	}

	Minimatch.prototype.parseNegate = parseNegate
	function parseNegate () {
	  var pattern = this.pattern
	    , negate = false
	    , options = this.options
	    , negateOffset = 0

	  if (options.nonegate) return

	  for ( var i = 0, l = pattern.length
	      ; i < l && pattern.charAt(i) === "!"
	      ; i ++) {
	    negate = !negate
	    negateOffset ++
	  }

	  if (negateOffset) this.pattern = pattern.substr(negateOffset)
	  this.negate = negate
	}

	// Brace expansion:
	// a{b,c}d -> abd acd
	// a{b,}c -> abc ac
	// a{0..3}d -> a0d a1d a2d a3d
	// a{b,c{d,e}f}g -> abg acdfg acefg
	// a{b,c}d{e,f}g -> abdeg acdeg abdeg abdfg
	//
	// Invalid sets are not expanded.
	// a{2..}b -> a{2..}b
	// a{b}c -> a{b}c
	minimatch.braceExpand = function (pattern, options) {
	  return new Minimatch(pattern, options).braceExpand()
	}

	Minimatch.prototype.braceExpand = braceExpand
	function braceExpand (pattern, options) {
	  options = options || this.options
	  pattern = typeof pattern === "undefined"
	    ? this.pattern : pattern

	  if (typeof pattern === "undefined") {
	    throw new Error("undefined pattern")
	  }

	  if (options.nobrace ||
	      !pattern.match(/\{.*\}/)) {
	    // shortcut. no need to expand.
	    return [pattern]
	  }

	  var escaping = false

	  // examples and comments refer to this crazy pattern:
	  // a{b,c{d,e},{f,g}h}x{y,z}
	  // expected:
	  // abxy
	  // abxz
	  // acdxy
	  // acdxz
	  // acexy
	  // acexz
	  // afhxy
	  // afhxz
	  // aghxy
	  // aghxz

	  // everything before the first \{ is just a prefix.
	  // So, we pluck that off, and work with the rest,
	  // and then prepend it to everything we find.
	  if (pattern.charAt(0) !== "{") {
	    this.debug(pattern)
	    var prefix = null
	    for (var i = 0, l = pattern.length; i < l; i ++) {
	      var c = pattern.charAt(i)
	      this.debug(i, c)
	      if (c === "\\") {
	        escaping = !escaping
	      } else if (c === "{" && !escaping) {
	        prefix = pattern.substr(0, i)
	        break
	      }
	    }

	    // actually no sets, all { were escaped.
	    if (prefix === null) {
	      this.debug("no sets")
	      return [pattern]
	    }

	   var tail = braceExpand.call(this, pattern.substr(i), options)
	    return tail.map(function (t) {
	      return prefix + t
	    })
	  }

	  // now we have something like:
	  // {b,c{d,e},{f,g}h}x{y,z}
	  // walk through the set, expanding each part, until
	  // the set ends.  then, we'll expand the suffix.
	  // If the set only has a single member, then'll put the {} back

	  // first, handle numeric sets, since they're easier
	  var numset = pattern.match(/^\{(-?[0-9]+)\.\.(-?[0-9]+)\}/)
	  if (numset) {
	    this.debug("numset", numset[1], numset[2])
	    var suf = braceExpand.call(this, pattern.substr(numset[0].length), options)
	      , start = +numset[1]
	      , end = +numset[2]
	      , inc = start > end ? -1 : 1
	      , set = []
	    for (var i = start; i != (end + inc); i += inc) {
	      // append all the suffixes
	      for (var ii = 0, ll = suf.length; ii < ll; ii ++) {
	        set.push(i + suf[ii])
	      }
	    }
	    return set
	  }

	  // ok, walk through the set
	  // We hope, somewhat optimistically, that there
	  // will be a } at the end.
	  // If the closing brace isn't found, then the pattern is
	  // interpreted as braceExpand("\\" + pattern) so that
	  // the leading \{ will be interpreted literally.
	  var i = 1 // skip the \{
	    , depth = 1
	    , set = []
	    , member = ""
	    , sawEnd = false
	    , escaping = false

	  function addMember () {
	    set.push(member)
	    member = ""
	  }

	  this.debug("Entering for")
	  FOR: for (i = 1, l = pattern.length; i < l; i ++) {
	    var c = pattern.charAt(i)
	    this.debug("", i, c)

	    if (escaping) {
	      escaping = false
	      member += "\\" + c
	    } else {
	      switch (c) {
	        case "\\":
	          escaping = true
	          continue

	        case "{":
	          depth ++
	          member += "{"
	          continue

	        case "}":
	          depth --
	          // if this closes the actual set, then we're done
	          if (depth === 0) {
	            addMember()
	            // pluck off the close-brace
	            i ++
	            break FOR
	          } else {
	            member += c
	            continue
	          }

	        case ",":
	          if (depth === 1) {
	            addMember()
	          } else {
	            member += c
	          }
	          continue

	        default:
	          member += c
	          continue
	      } // switch
	    } // else
	  } // for

	  // now we've either finished the set, and the suffix is
	  // pattern.substr(i), or we have *not* closed the set,
	  // and need to escape the leading brace
	  if (depth !== 0) {
	    this.debug("didn't close", pattern)
	    return braceExpand.call(this, "\\" + pattern, options)
	  }

	  // x{y,z} -> ["xy", "xz"]
	  this.debug("set", set)
	  this.debug("suffix", pattern.substr(i))
	  var suf = braceExpand.call(this, pattern.substr(i), options)
	  // ["b", "c{d,e}","{f,g}h"] ->
	  //   [["b"], ["cd", "ce"], ["fh", "gh"]]
	  var addBraces = set.length === 1
	  this.debug("set pre-expanded", set)
	  set = set.map(function (p) {
	    return braceExpand.call(this, p, options)
	  }, this)
	  this.debug("set expanded", set)


	  // [["b"], ["cd", "ce"], ["fh", "gh"]] ->
	  //   ["b", "cd", "ce", "fh", "gh"]
	  set = set.reduce(function (l, r) {
	    return l.concat(r)
	  })

	  if (addBraces) {
	    set = set.map(function (s) {
	      return "{" + s + "}"
	    })
	  }

	  // now attach the suffixes.
	  var ret = []
	  for (var i = 0, l = set.length; i < l; i ++) {
	    for (var ii = 0, ll = suf.length; ii < ll; ii ++) {
	      ret.push(set[i] + suf[ii])
	    }
	  }
	  return ret
	}

	// parse a component of the expanded set.
	// At this point, no pattern may contain "/" in it
	// so we're going to return a 2d array, where each entry is the full
	// pattern, split on '/', and then turned into a regular expression.
	// A regexp is made at the end which joins each array with an
	// escaped /, and another full one which joins each regexp with |.
	//
	// Following the lead of Bash 4.1, note that "**" only has special meaning
	// when it is the *only* thing in a path portion.  Otherwise, any series
	// of * is equivalent to a single *.  Globstar behavior is enabled by
	// default, and can be disabled by setting options.noglobstar.
	Minimatch.prototype.parse = parse
	var SUBPARSE = {}
	function parse (pattern, isSub) {
	  var options = this.options

	  // shortcuts
	  if (!options.noglobstar && pattern === "**") return GLOBSTAR
	  if (pattern === "") return ""

	  var re = ""
	    , hasMagic = !!options.nocase
	    , escaping = false
	    // ? => one single character
	    , patternListStack = []
	    , plType
	    , stateChar
	    , inClass = false
	    , reClassStart = -1
	    , classStart = -1
	    // . and .. never match anything that doesn't start with .,
	    // even when options.dot is set.
	    , patternStart = pattern.charAt(0) === "." ? "" // anything
	      // not (start or / followed by . or .. followed by / or end)
	      : options.dot ? "(?!(?:^|\\\/)\\.{1,2}(?:$|\\\/))"
	      : "(?!\\.)"
	    , self = this

	  function clearStateChar () {
	    if (stateChar) {
	      // we had some state-tracking character
	      // that wasn't consumed by this pass.
	      switch (stateChar) {
	        case "*":
	          re += star
	          hasMagic = true
	          break
	        case "?":
	          re += qmark
	          hasMagic = true
	          break
	        default:
	          re += "\\"+stateChar
	          break
	      }
	      self.debug('clearStateChar %j %j', stateChar, re)
	      stateChar = false
	    }
	  }

	  for ( var i = 0, len = pattern.length, c
	      ; (i < len) && (c = pattern.charAt(i))
	      ; i ++ ) {

	    this.debug("%s\t%s %s %j", pattern, i, re, c)

	    // skip over any that are escaped.
	    if (escaping && reSpecials[c]) {
	      re += "\\" + c
	      escaping = false
	      continue
	    }

	    SWITCH: switch (c) {
	      case "/":
	        // completely not allowed, even escaped.
	        // Should already be path-split by now.
	        return false

	      case "\\":
	        clearStateChar()
	        escaping = true
	        continue

	      // the various stateChar values
	      // for the "extglob" stuff.
	      case "?":
	      case "*":
	      case "+":
	      case "@":
	      case "!":
	        this.debug("%s\t%s %s %j <-- stateChar", pattern, i, re, c)

	        // all of those are literals inside a class, except that
	        // the glob [!a] means [^a] in regexp
	        if (inClass) {
	          this.debug('  in class')
	          if (c === "!" && i === classStart + 1) c = "^"
	          re += c
	          continue
	        }

	        // if we already have a stateChar, then it means
	        // that there was something like ** or +? in there.
	        // Handle the stateChar, then proceed with this one.
	        self.debug('call clearStateChar %j', stateChar)
	        clearStateChar()
	        stateChar = c
	        // if extglob is disabled, then +(asdf|foo) isn't a thing.
	        // just clear the statechar *now*, rather than even diving into
	        // the patternList stuff.
	        if (options.noext) clearStateChar()
	        continue

	      case "(":
	        if (inClass) {
	          re += "("
	          continue
	        }

	        if (!stateChar) {
	          re += "\\("
	          continue
	        }

	        plType = stateChar
	        patternListStack.push({ type: plType
	                              , start: i - 1
	                              , reStart: re.length })
	        // negation is (?:(?!js)[^/]*)
	        re += stateChar === "!" ? "(?:(?!" : "(?:"
	        this.debug('plType %j %j', stateChar, re)
	        stateChar = false
	        continue

	      case ")":
	        if (inClass || !patternListStack.length) {
	          re += "\\)"
	          continue
	        }

	        clearStateChar()
	        hasMagic = true
	        re += ")"
	        plType = patternListStack.pop().type
	        // negation is (?:(?!js)[^/]*)
	        // The others are (?:<pattern>)<type>
	        switch (plType) {
	          case "!":
	            re += "[^/]*?)"
	            break
	          case "?":
	          case "+":
	          case "*": re += plType
	          case "@": break // the default anyway
	        }
	        continue

	      case "|":
	        if (inClass || !patternListStack.length || escaping) {
	          re += "\\|"
	          escaping = false
	          continue
	        }

	        clearStateChar()
	        re += "|"
	        continue

	      // these are mostly the same in regexp and glob
	      case "[":
	        // swallow any state-tracking char before the [
	        clearStateChar()

	        if (inClass) {
	          re += "\\" + c
	          continue
	        }

	        inClass = true
	        classStart = i
	        reClassStart = re.length
	        re += c
	        continue

	      case "]":
	        //  a right bracket shall lose its special
	        //  meaning and represent itself in
	        //  a bracket expression if it occurs
	        //  first in the list.  -- POSIX.2 2.8.3.2
	        if (i === classStart + 1 || !inClass) {
	          re += "\\" + c
	          escaping = false
	          continue
	        }

	        // finish up the class.
	        hasMagic = true
	        inClass = false
	        re += c
	        continue

	      default:
	        // swallow any state char that wasn't consumed
	        clearStateChar()

	        if (escaping) {
	          // no need
	          escaping = false
	        } else if (reSpecials[c]
	                   && !(c === "^" && inClass)) {
	          re += "\\"
	        }

	        re += c

	    } // switch
	  } // for


	  // handle the case where we left a class open.
	  // "[abc" is valid, equivalent to "\[abc"
	  if (inClass) {
	    // split where the last [ was, and escape it
	    // this is a huge pita.  We now have to re-walk
	    // the contents of the would-be class to re-translate
	    // any characters that were passed through as-is
	    var cs = pattern.substr(classStart + 1)
	      , sp = this.parse(cs, SUBPARSE)
	    re = re.substr(0, reClassStart) + "\\[" + sp[0]
	    hasMagic = hasMagic || sp[1]
	  }

	  // handle the case where we had a +( thing at the *end*
	  // of the pattern.
	  // each pattern list stack adds 3 chars, and we need to go through
	  // and escape any | chars that were passed through as-is for the regexp.
	  // Go through and escape them, taking care not to double-escape any
	  // | chars that were already escaped.
	  var pl
	  while (pl = patternListStack.pop()) {
	    var tail = re.slice(pl.reStart + 3)
	    // maybe some even number of \, then maybe 1 \, followed by a |
	    tail = tail.replace(/((?:\\{2})*)(\\?)\|/g, function (_, $1, $2) {
	      if (!$2) {
	        // the | isn't already escaped, so escape it.
	        $2 = "\\"
	      }

	      // need to escape all those slashes *again*, without escaping the
	      // one that we need for escaping the | character.  As it works out,
	      // escaping an even number of slashes can be done by simply repeating
	      // it exactly after itself.  That's why this trick works.
	      //
	      // I am sorry that you have to see this.
	      return $1 + $1 + $2 + "|"
	    })

	    this.debug("tail=%j\n   %s", tail, tail)
	    var t = pl.type === "*" ? star
	          : pl.type === "?" ? qmark
	          : "\\" + pl.type

	    hasMagic = true
	    re = re.slice(0, pl.reStart)
	       + t + "\\("
	       + tail
	  }

	  // handle trailing things that only matter at the very end.
	  clearStateChar()
	  if (escaping) {
	    // trailing \\
	    re += "\\\\"
	  }

	  // only need to apply the nodot start if the re starts with
	  // something that could conceivably capture a dot
	  var addPatternStart = false
	  switch (re.charAt(0)) {
	    case ".":
	    case "[":
	    case "(": addPatternStart = true
	  }

	  // if the re is not "" at this point, then we need to make sure
	  // it doesn't match against an empty path part.
	  // Otherwise a/* will match a/, which it should not.
	  if (re !== "" && hasMagic) re = "(?=.)" + re

	  if (addPatternStart) re = patternStart + re

	  // parsing just a piece of a larger pattern.
	  if (isSub === SUBPARSE) {
	    return [ re, hasMagic ]
	  }

	  // skip the regexp for non-magical patterns
	  // unescape anything in it, though, so that it'll be
	  // an exact match against a file etc.
	  if (!hasMagic) {
	    return globUnescape(pattern)
	  }

	  var flags = options.nocase ? "i" : ""
	    , regExp = new RegExp("^" + re + "$", flags)

	  regExp._glob = pattern
	  regExp._src = re

	  return regExp
	}

	minimatch.makeRe = function (pattern, options) {
	  return new Minimatch(pattern, options || {}).makeRe()
	}

	Minimatch.prototype.makeRe = makeRe
	function makeRe () {
	  if (this.regexp || this.regexp === false) return this.regexp

	  // at this point, this.set is a 2d array of partial
	  // pattern strings, or "**".
	  //
	  // It's better to use .match().  This function shouldn't
	  // be used, really, but it's pretty convenient sometimes,
	  // when you just want to work with a regex.
	  var set = this.set

	  if (!set.length) return this.regexp = false
	  var options = this.options

	  var twoStar = options.noglobstar ? star
	      : options.dot ? twoStarDot
	      : twoStarNoDot
	    , flags = options.nocase ? "i" : ""

	  var re = set.map(function (pattern) {
	    return pattern.map(function (p) {
	      return (p === GLOBSTAR) ? twoStar
	           : (typeof p === "string") ? regExpEscape(p)
	           : p._src
	    }).join("\\\/")
	  }).join("|")

	  // must match entire pattern
	  // ending in a * or ** will make it less strict.
	  re = "^(?:" + re + ")$"

	  // can match anything, as long as it's not this.
	  if (this.negate) re = "^(?!" + re + ").*$"

	  try {
	    return this.regexp = new RegExp(re, flags)
	  } catch (ex) {
	    return this.regexp = false
	  }
	}

	minimatch.match = function (list, pattern, options) {
	  var mm = new Minimatch(pattern, options)
	  list = list.filter(function (f) {
	    return mm.match(f)
	  })
	  if (options.nonull && !list.length) {
	    list.push(pattern)
	  }
	  return list
	}

	Minimatch.prototype.match = match
	function match (f, partial) {
	  this.debug("match", f, this.pattern)
	  // short-circuit in the case of busted things.
	  // comments, etc.
	  if (this.comment) return false
	  if (this.empty) return f === ""

	  if (f === "/" && partial) return true

	  var options = this.options

	  // windows: need to use /, not \
	  // On other platforms, \ is a valid (albeit bad) filename char.
	  if (platform === "win32") {
	    f = f.split("\\").join("/")
	  }

	  // treat the test path as a set of pathparts.
	  f = f.split(slashSplit)
	  this.debug(this.pattern, "split", f)

	  // just ONE of the pattern sets in this.set needs to match
	  // in order for it to be valid.  If negating, then just one
	  // match means that we have failed.
	  // Either way, return on the first hit.

	  var set = this.set
	  this.debug(this.pattern, "set", set)

	  var splitFile = path.basename(f.join("/")).split("/")

	  for (var i = 0, l = set.length; i < l; i ++) {
	    var pattern = set[i], file = f
	    if (options.matchBase && pattern.length === 1) {
	      file = splitFile
	    }
	    var hit = this.matchOne(file, pattern, partial)
	    if (hit) {
	      if (options.flipNegate) return true
	      return !this.negate
	    }
	  }

	  // didn't get any hits.  this is success if it's a negative
	  // pattern, failure otherwise.
	  if (options.flipNegate) return false
	  return this.negate
	}

	// set partial to true to test if, for example,
	// "/a/b" matches the start of "/*/b/*/d"
	// Partial means, if you run out of file before you run
	// out of pattern, then that's fine, as long as all
	// the parts match.
	Minimatch.prototype.matchOne = function (file, pattern, partial) {
	  var options = this.options

	  this.debug("matchOne",
	              { "this": this
	              , file: file
	              , pattern: pattern })

	  this.debug("matchOne", file.length, pattern.length)

	  for ( var fi = 0
	          , pi = 0
	          , fl = file.length
	          , pl = pattern.length
	      ; (fi < fl) && (pi < pl)
	      ; fi ++, pi ++ ) {

	    this.debug("matchOne loop")
	    var p = pattern[pi]
	      , f = file[fi]

	    this.debug(pattern, p, f)

	    // should be impossible.
	    // some invalid regexp stuff in the set.
	    if (p === false) return false

	    if (p === GLOBSTAR) {
	      this.debug('GLOBSTAR', [pattern, p, f])

	      // "**"
	      // a/**/b/**/c would match the following:
	      // a/b/x/y/z/c
	      // a/x/y/z/b/c
	      // a/b/x/b/x/c
	      // a/b/c
	      // To do this, take the rest of the pattern after
	      // the **, and see if it would match the file remainder.
	      // If so, return success.
	      // If not, the ** "swallows" a segment, and try again.
	      // This is recursively awful.
	      //
	      // a/**/b/**/c matching a/b/x/y/z/c
	      // - a matches a
	      // - doublestar
	      //   - matchOne(b/x/y/z/c, b/**/c)
	      //     - b matches b
	      //     - doublestar
	      //       - matchOne(x/y/z/c, c) -> no
	      //       - matchOne(y/z/c, c) -> no
	      //       - matchOne(z/c, c) -> no
	      //       - matchOne(c, c) yes, hit
	      var fr = fi
	        , pr = pi + 1
	      if (pr === pl) {
	        this.debug('** at the end')
	        // a ** at the end will just swallow the rest.
	        // We have found a match.
	        // however, it will not swallow /.x, unless
	        // options.dot is set.
	        // . and .. are *never* matched by **, for explosively
	        // exponential reasons.
	        for ( ; fi < fl; fi ++) {
	          if (file[fi] === "." || file[fi] === ".." ||
	              (!options.dot && file[fi].charAt(0) === ".")) return false
	        }
	        return true
	      }

	      // ok, let's see if we can swallow whatever we can.
	      WHILE: while (fr < fl) {
	        var swallowee = file[fr]

	        this.debug('\nglobstar while',
	                    file, fr, pattern, pr, swallowee)

	        // XXX remove this slice.  Just pass the start index.
	        if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
	          this.debug('globstar found match!', fr, fl, swallowee)
	          // found a match.
	          return true
	        } else {
	          // can't swallow "." or ".." ever.
	          // can only swallow ".foo" when explicitly asked.
	          if (swallowee === "." || swallowee === ".." ||
	              (!options.dot && swallowee.charAt(0) === ".")) {
	            this.debug("dot detected!", file, fr, pattern, pr)
	            break WHILE
	          }

	          // ** swallows a segment, and continue.
	          this.debug('globstar swallow a segment, and continue')
	          fr ++
	        }
	      }
	      // no match was found.
	      // However, in partial mode, we can't say this is necessarily over.
	      // If there's more *pattern* left, then 
	      if (partial) {
	        // ran out of file
	        this.debug("\n>>> no match, partial?", file, fr, pattern, pr)
	        if (fr === fl) return true
	      }
	      return false
	    }

	    // something other than **
	    // non-magic patterns just have to match exactly
	    // patterns with magic have been turned into regexps.
	    var hit
	    if (typeof p === "string") {
	      if (options.nocase) {
	        hit = f.toLowerCase() === p.toLowerCase()
	      } else {
	        hit = f === p
	      }
	      this.debug("string match", p, f, hit)
	    } else {
	      hit = f.match(p)
	      this.debug("pattern match", p, f, hit)
	    }

	    if (!hit) return false
	  }

	  // Note: ending in / means that we'll get a final ""
	  // at the end of the pattern.  This can only match a
	  // corresponding "" at the end of the file.
	  // If the file ends in /, then it can only match a
	  // a pattern that ends in /, unless the pattern just
	  // doesn't have any more for it. But, a/b/ should *not*
	  // match "a/b/*", even though "" matches against the
	  // [^/]*? pattern, except in partial mode, where it might
	  // simply not be reached yet.
	  // However, a/b/ should still satisfy a/*

	  // now either we fell off the end of the pattern, or we're done.
	  if (fi === fl && pi === pl) {
	    // ran out of pattern and filename at the same time.
	    // an exact hit!
	    return true
	  } else if (fi === fl) {
	    // ran out of file, but still had pattern left.
	    // this is ok if we're doing the match as part of
	    // a glob fs traversal.
	    return partial
	  } else if (pi === pl) {
	    // ran out of pattern, still have file left.
	    // this is only acceptable if we're on the very last
	    // empty segment of a file with a trailing slash.
	    // a/* should match a/b/
	    var emptyFileEnd = (fi === fl - 1) && (file[fi] === "")
	    return emptyFileEnd
	  }

	  // should be unreachable.
	  throw new Error("wtf?")
	}


	// replace stuff like \* with *
	function globUnescape (s) {
	  return s.replace(/\\(.)/g, "$1")
	}


	function regExpEscape (s) {
	  return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
	}

	})( typeof require === "function" ? require : null,
	    this,
	     true ? module : null,
	    typeof process === "object" ? process.platform : "win32"
	  )

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)(module)))

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./minimatch": 26,
		"./minimatch.js": 26,
		"./test/basic": 31,
		"./test/basic.js": 31,
		"./test/brace-expand": 32,
		"./test/brace-expand.js": 32,
		"./test/caching": 33,
		"./test/caching.js": 33,
		"./test/defaults": 34,
		"./test/defaults.js": 34,
		"./test/extglob-ending-with-state-char": 35,
		"./test/extglob-ending-with-state-char.js": 35
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 27;


/***/ },
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// http://www.bashcookbook.com/bashinfo/source/bash-1.14.7/tests/glob-test
	//
	// TODO: Some of these tests do very bad things with backslashes, and will
	// most likely fail badly on windows.  They should probably be skipped.

	var tap = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"tap\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	  , globalBefore = Object.keys(global)
	  , mm = __webpack_require__(26)
	  , files = [ "a", "b", "c", "d", "abc"
	            , "abd", "abe", "bb", "bcd"
	            , "ca", "cb", "dd", "de"
	            , "bdir/", "bdir/cfile"]
	  , next = files.concat([ "a-b", "aXb"
	                        , ".x", ".y" ])


	var patterns =
	  [ "http://www.bashcookbook.com/bashinfo/source/bash-1.14.7/tests/glob-test"
	  , ["a*", ["a", "abc", "abd", "abe"]]
	  , ["X*", ["X*"], {nonull: true}]

	  // allow null glob expansion
	  , ["X*", []]

	  // isaacs: Slightly different than bash/sh/ksh
	  // \\* is not un-escaped to literal "*" in a failed match,
	  // but it does make it get treated as a literal star
	  , ["\\*", ["\\*"], {nonull: true}]
	  , ["\\**", ["\\**"], {nonull: true}]
	  , ["\\*\\*", ["\\*\\*"], {nonull: true}]

	  , ["b*/", ["bdir/"]]
	  , ["c*", ["c", "ca", "cb"]]
	  , ["**", files]

	  , ["\\.\\./*/", ["\\.\\./*/"], {nonull: true}]
	  , ["s/\\..*//", ["s/\\..*//"], {nonull: true}]

	  , "legendary larry crashes bashes"
	  , ["/^root:/{s/^[^:]*:[^:]*:\([^:]*\).*$/\\1/"
	    , ["/^root:/{s/^[^:]*:[^:]*:\([^:]*\).*$/\\1/"], {nonull: true}]
	  , ["/^root:/{s/^[^:]*:[^:]*:\([^:]*\).*$/\1/"
	    , ["/^root:/{s/^[^:]*:[^:]*:\([^:]*\).*$/\1/"], {nonull: true}]

	  , "character classes"
	  , ["[a-c]b*", ["abc", "abd", "abe", "bb", "cb"]]
	  , ["[a-y]*[^c]", ["abd", "abe", "bb", "bcd",
	     "bdir/", "ca", "cb", "dd", "de"]]
	  , ["a*[^c]", ["abd", "abe"]]
	  , function () { files.push("a-b", "aXb") }
	  , ["a[X-]b", ["a-b", "aXb"]]
	  , function () { files.push(".x", ".y") }
	  , ["[^a-c]*", ["d", "dd", "de"]]
	  , function () { files.push("a*b/", "a*b/ooo") }
	  , ["a\\*b/*", ["a*b/ooo"]]
	  , ["a\\*?/*", ["a*b/ooo"]]
	  , ["*\\\\!*", [], {null: true}, ["echo !7"]]
	  , ["*\\!*", ["echo !7"], null, ["echo !7"]]
	  , ["*.\\*", ["r.*"], null, ["r.*"]]
	  , ["a[b]c", ["abc"]]
	  , ["a[\\b]c", ["abc"]]
	  , ["a?c", ["abc"]]
	  , ["a\\*c", [], {null: true}, ["abc"]]
	  , ["", [""], { null: true }, [""]]

	  , "http://www.opensource.apple.com/source/bash/bash-23/" +
	    "bash/tests/glob-test"
	  , function () { files.push("man/", "man/man1/", "man/man1/bash.1") }
	  , ["*/man*/bash.*", ["man/man1/bash.1"]]
	  , ["man/man1/bash.1", ["man/man1/bash.1"]]
	  , ["a***c", ["abc"], null, ["abc"]]
	  , ["a*****?c", ["abc"], null, ["abc"]]
	  , ["?*****??", ["abc"], null, ["abc"]]
	  , ["*****??", ["abc"], null, ["abc"]]
	  , ["?*****?c", ["abc"], null, ["abc"]]
	  , ["?***?****c", ["abc"], null, ["abc"]]
	  , ["?***?****?", ["abc"], null, ["abc"]]
	  , ["?***?****", ["abc"], null, ["abc"]]
	  , ["*******c", ["abc"], null, ["abc"]]
	  , ["*******?", ["abc"], null, ["abc"]]
	  , ["a*cd**?**??k", ["abcdecdhjk"], null, ["abcdecdhjk"]]
	  , ["a**?**cd**?**??k", ["abcdecdhjk"], null, ["abcdecdhjk"]]
	  , ["a**?**cd**?**??k***", ["abcdecdhjk"], null, ["abcdecdhjk"]]
	  , ["a**?**cd**?**??***k", ["abcdecdhjk"], null, ["abcdecdhjk"]]
	  , ["a**?**cd**?**??***k**", ["abcdecdhjk"], null, ["abcdecdhjk"]]
	  , ["a****c**?**??*****", ["abcdecdhjk"], null, ["abcdecdhjk"]]
	  , ["[-abc]", ["-"], null, ["-"]]
	  , ["[abc-]", ["-"], null, ["-"]]
	  , ["\\", ["\\"], null, ["\\"]]
	  , ["[\\\\]", ["\\"], null, ["\\"]]
	  , ["[[]", ["["], null, ["["]]
	  , ["[", ["["], null, ["["]]
	  , ["[*", ["[abc"], null, ["[abc"]]
	  , "a right bracket shall lose its special meaning and\n" +
	    "represent itself in a bracket expression if it occurs\n" +
	    "first in the list.  -- POSIX.2 2.8.3.2"
	  , ["[]]", ["]"], null, ["]"]]
	  , ["[]-]", ["]"], null, ["]"]]
	  , ["[a-\z]", ["p"], null, ["p"]]
	  , ["??**********?****?", [], { null: true }, ["abc"]]
	  , ["??**********?****c", [], { null: true }, ["abc"]]
	  , ["?************c****?****", [], { null: true }, ["abc"]]
	  , ["*c*?**", [], { null: true }, ["abc"]]
	  , ["a*****c*?**", [], { null: true }, ["abc"]]
	  , ["a********???*******", [], { null: true }, ["abc"]]
	  , ["[]", [], { null: true }, ["a"]]
	  , ["[abc", [], { null: true }, ["["]]

	  , "nocase tests"
	  , ["XYZ", ["xYz"], { nocase: true, null: true }
	    , ["xYz", "ABC", "IjK"]]
	  , ["ab*", ["ABC"], { nocase: true, null: true }
	    , ["xYz", "ABC", "IjK"]]
	  , ["[ia]?[ck]", ["ABC", "IjK"], { nocase: true, null: true }
	    , ["xYz", "ABC", "IjK"]]

	  // [ pattern, [matches], MM opts, files, TAP opts]
	  , "onestar/twostar"
	  , ["{/*,*}", [], {null: true}, ["/asdf/asdf/asdf"]]
	  , ["{/?,*}", ["/a", "bb"], {null: true}
	    , ["/a", "/b/b", "/a/b/c", "bb"]]

	  , "dots should not match unless requested"
	  , ["**", ["a/b"], {}, ["a/b", "a/.d", ".a/.d"]]

	  // .. and . can only match patterns starting with .,
	  // even when options.dot is set.
	  , function () {
	      files = ["a/./b", "a/../b", "a/c/b", "a/.d/b"]
	    }
	  , ["a/*/b", ["a/c/b", "a/.d/b"], {dot: true}]
	  , ["a/.*/b", ["a/./b", "a/../b", "a/.d/b"], {dot: true}]
	  , ["a/*/b", ["a/c/b"], {dot:false}]
	  , ["a/.*/b", ["a/./b", "a/../b", "a/.d/b"], {dot: false}]


	  // this also tests that changing the options needs
	  // to change the cache key, even if the pattern is
	  // the same!
	  , ["**", ["a/b","a/.d",".a/.d"], { dot: true }
	    , [ ".a/.d", "a/.d", "a/b"]]

	  , "paren sets cannot contain slashes"
	  , ["*(a/b)", ["*(a/b)"], {nonull: true}, ["a/b"]]

	  // brace sets trump all else.
	  //
	  // invalid glob pattern.  fails on bash4 and bsdglob.
	  // however, in this implementation, it's easier just
	  // to do the intuitive thing, and let brace-expansion
	  // actually come before parsing any extglob patterns,
	  // like the documentation seems to say.
	  //
	  // XXX: if anyone complains about this, either fix it
	  // or tell them to grow up and stop complaining.
	  //
	  // bash/bsdglob says this:
	  // , ["*(a|{b),c)}", ["*(a|{b),c)}"], {}, ["a", "ab", "ac", "ad"]]
	  // but we do this instead:
	  , ["*(a|{b),c)}", ["a", "ab", "ac"], {}, ["a", "ab", "ac", "ad"]]

	  // test partial parsing in the presence of comment/negation chars
	  , ["[!a*", ["[!ab"], {}, ["[!ab", "[ab"]]
	  , ["[#a*", ["[#ab"], {}, ["[#ab", "[ab"]]

	  // like: {a,b|c\\,d\\\|e} except it's unclosed, so it has to be escaped.
	  , ["+(a|*\\|c\\\\|d\\\\\\|e\\\\\\\\|f\\\\\\\\\\|g"
	    , ["+(a|b\\|c\\\\|d\\\\|e\\\\\\\\|f\\\\\\\\|g"]
	    , {}
	    , ["+(a|b\\|c\\\\|d\\\\|e\\\\\\\\|f\\\\\\\\|g", "a", "b\\c"]]


	  // crazy nested {,,} and *(||) tests.
	  , function () {
	      files = [ "a", "b", "c", "d"
	              , "ab", "ac", "ad"
	              , "bc", "cb"
	              , "bc,d", "c,db", "c,d"
	              , "d)", "(b|c", "*(b|c"
	              , "b|c", "b|cc", "cb|c"
	              , "x(a|b|c)", "x(a|c)"
	              , "(a|b|c)", "(a|c)"]
	    }
	  , ["*(a|{b,c})", ["a", "b", "c", "ab", "ac"]]
	  , ["{a,*(b|c,d)}", ["a","(b|c", "*(b|c", "d)"]]
	  // a
	  // *(b|c)
	  // *(b|d)
	  , ["{a,*(b|{c,d})}", ["a","b", "bc", "cb", "c", "d"]]
	  , ["*(a|{b|c,c})", ["a", "b", "c", "ab", "ac", "bc", "cb"]]


	  // test various flag settings.
	  , [ "*(a|{b|c,c})", ["x(a|b|c)", "x(a|c)", "(a|b|c)", "(a|c)"]
	    , { noext: true } ]
	  , ["a?b", ["x/y/acb", "acb/"], {matchBase: true}
	    , ["x/y/acb", "acb/", "acb/d/e", "x/y/acb/d"] ]
	  , ["#*", ["#a", "#b"], {nocomment: true}, ["#a", "#b", "c#d"]]


	  // begin channelling Boole and deMorgan...
	  , "negation tests"
	  , function () {
	      files = ["d", "e", "!ab", "!abc", "a!b", "\\!a"]
	    }

	  // anything that is NOT a* matches.
	  , ["!a*", ["\\!a", "d", "e", "!ab", "!abc"]]

	  // anything that IS !a* matches.
	  , ["!a*", ["!ab", "!abc"], {nonegate: true}]

	  // anything that IS a* matches
	  , ["!!a*", ["a!b"]]

	  // anything that is NOT !a* matches
	  , ["!\\!a*", ["a!b", "d", "e", "\\!a"]]

	  // negation nestled within a pattern
	  , function () {
	      files = [ "foo.js"
	              , "foo.bar"
	              // can't match this one without negative lookbehind.
	              , "foo.js.js"
	              , "blar.js"
	              , "foo."
	              , "boo.js.boo" ]
	    }
	  , ["*.!(js)", ["foo.bar", "foo.", "boo.js.boo"] ]

	  // https://github.com/isaacs/minimatch/issues/5
	  , function () {
	      files = [ 'a/b/.x/c'
	              , 'a/b/.x/c/d'
	              , 'a/b/.x/c/d/e'
	              , 'a/b/.x'
	              , 'a/b/.x/'
	              , 'a/.x/b'
	              , '.x'
	              , '.x/'
	              , '.x/a'
	              , '.x/a/b'
	              , 'a/.x/b/.x/c'
	              , '.x/.x' ]
	  }
	  , ["**/.x/**", [ '.x/'
	                 , '.x/a'
	                 , '.x/a/b'
	                 , 'a/.x/b'
	                 , 'a/b/.x/'
	                 , 'a/b/.x/c'
	                 , 'a/b/.x/c/d'
	                 , 'a/b/.x/c/d/e' ] ]

	  ]

	var regexps =
	  [ '/^(?:(?=.)a[^/]*?)$/',
	    '/^(?:(?=.)X[^/]*?)$/',
	    '/^(?:(?=.)X[^/]*?)$/',
	    '/^(?:\\*)$/',
	    '/^(?:(?=.)\\*[^/]*?)$/',
	    '/^(?:\\*\\*)$/',
	    '/^(?:(?=.)b[^/]*?\\/)$/',
	    '/^(?:(?=.)c[^/]*?)$/',
	    '/^(?:(?:(?!(?:\\/|^)\\.).)*?)$/',
	    '/^(?:\\.\\.\\/(?!\\.)(?=.)[^/]*?\\/)$/',
	    '/^(?:s\\/(?=.)\\.\\.[^/]*?\\/)$/',
	    '/^(?:\\/\\^root:\\/\\{s\\/(?=.)\\^[^:][^/]*?:[^:][^/]*?:\\([^:]\\)[^/]*?\\.[^/]*?\\$\\/1\\/)$/',
	    '/^(?:\\/\\^root:\\/\\{s\\/(?=.)\\^[^:][^/]*?:[^:][^/]*?:\\([^:]\\)[^/]*?\\.[^/]*?\\$\\/\u0001\\/)$/',
	    '/^(?:(?!\\.)(?=.)[a-c]b[^/]*?)$/',
	    '/^(?:(?!\\.)(?=.)[a-y][^/]*?[^c])$/',
	    '/^(?:(?=.)a[^/]*?[^c])$/',
	    '/^(?:(?=.)a[X-]b)$/',
	    '/^(?:(?!\\.)(?=.)[^a-c][^/]*?)$/',
	    '/^(?:a\\*b\\/(?!\\.)(?=.)[^/]*?)$/',
	    '/^(?:(?=.)a\\*[^/]\\/(?!\\.)(?=.)[^/]*?)$/',
	    '/^(?:(?!\\.)(?=.)[^/]*?\\\\\\![^/]*?)$/',
	    '/^(?:(?!\\.)(?=.)[^/]*?\\![^/]*?)$/',
	    '/^(?:(?!\\.)(?=.)[^/]*?\\.\\*)$/',
	    '/^(?:(?=.)a[b]c)$/',
	    '/^(?:(?=.)a[b]c)$/',
	    '/^(?:(?=.)a[^/]c)$/',
	    '/^(?:a\\*c)$/',
	    'false',
	    '/^(?:(?!\\.)(?=.)[^/]*?\\/(?=.)man[^/]*?\\/(?=.)bash\\.[^/]*?)$/',
	    '/^(?:man\\/man1\\/bash\\.1)$/',
	    '/^(?:(?=.)a[^/]*?[^/]*?[^/]*?c)$/',
	    '/^(?:(?=.)a[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]c)$/',
	    '/^(?:(?!\\.)(?=.)[^/][^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/][^/])$/',
	    '/^(?:(?!\\.)(?=.)[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/][^/])$/',
	    '/^(?:(?!\\.)(?=.)[^/][^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]c)$/',
	    '/^(?:(?!\\.)(?=.)[^/][^/]*?[^/]*?[^/]*?[^/][^/]*?[^/]*?[^/]*?[^/]*?c)$/',
	    '/^(?:(?!\\.)(?=.)[^/][^/]*?[^/]*?[^/]*?[^/][^/]*?[^/]*?[^/]*?[^/]*?[^/])$/',
	    '/^(?:(?!\\.)(?=.)[^/][^/]*?[^/]*?[^/]*?[^/][^/]*?[^/]*?[^/]*?[^/]*?)$/',
	    '/^(?:(?!\\.)(?=.)[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?c)$/',
	    '/^(?:(?!\\.)(?=.)[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/])$/',
	    '/^(?:(?=.)a[^/]*?cd[^/]*?[^/]*?[^/][^/]*?[^/]*?[^/][^/]k)$/',
	    '/^(?:(?=.)a[^/]*?[^/]*?[^/][^/]*?[^/]*?cd[^/]*?[^/]*?[^/][^/]*?[^/]*?[^/][^/]k)$/',
	    '/^(?:(?=.)a[^/]*?[^/]*?[^/][^/]*?[^/]*?cd[^/]*?[^/]*?[^/][^/]*?[^/]*?[^/][^/]k[^/]*?[^/]*?[^/]*?)$/',
	    '/^(?:(?=.)a[^/]*?[^/]*?[^/][^/]*?[^/]*?cd[^/]*?[^/]*?[^/][^/]*?[^/]*?[^/][^/][^/]*?[^/]*?[^/]*?k)$/',
	    '/^(?:(?=.)a[^/]*?[^/]*?[^/][^/]*?[^/]*?cd[^/]*?[^/]*?[^/][^/]*?[^/]*?[^/][^/][^/]*?[^/]*?[^/]*?k[^/]*?[^/]*?)$/',
	    '/^(?:(?=.)a[^/]*?[^/]*?[^/]*?[^/]*?c[^/]*?[^/]*?[^/][^/]*?[^/]*?[^/][^/][^/]*?[^/]*?[^/]*?[^/]*?[^/]*?)$/',
	    '/^(?:(?!\\.)(?=.)[-abc])$/',
	    '/^(?:(?!\\.)(?=.)[abc-])$/',
	    '/^(?:\\\\)$/',
	    '/^(?:(?!\\.)(?=.)[\\\\])$/',
	    '/^(?:(?!\\.)(?=.)[\\[])$/',
	    '/^(?:\\[)$/',
	    '/^(?:(?=.)\\[(?!\\.)(?=.)[^/]*?)$/',
	    '/^(?:(?!\\.)(?=.)[\\]])$/',
	    '/^(?:(?!\\.)(?=.)[\\]-])$/',
	    '/^(?:(?!\\.)(?=.)[a-z])$/',
	    '/^(?:(?!\\.)(?=.)[^/][^/][^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/][^/]*?[^/]*?[^/]*?[^/]*?[^/])$/',
	    '/^(?:(?!\\.)(?=.)[^/][^/][^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/][^/]*?[^/]*?[^/]*?[^/]*?c)$/',
	    '/^(?:(?!\\.)(?=.)[^/][^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?c[^/]*?[^/]*?[^/]*?[^/]*?[^/][^/]*?[^/]*?[^/]*?[^/]*?)$/',
	    '/^(?:(?!\\.)(?=.)[^/]*?c[^/]*?[^/][^/]*?[^/]*?)$/',
	    '/^(?:(?=.)a[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?c[^/]*?[^/][^/]*?[^/]*?)$/',
	    '/^(?:(?=.)a[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/][^/][^/][^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?[^/]*?)$/',
	    '/^(?:\\[\\])$/',
	    '/^(?:\\[abc)$/',
	    '/^(?:(?=.)XYZ)$/i',
	    '/^(?:(?=.)ab[^/]*?)$/i',
	    '/^(?:(?!\\.)(?=.)[ia][^/][ck])$/i',
	    '/^(?:\\/(?!\\.)(?=.)[^/]*?|(?!\\.)(?=.)[^/]*?)$/',
	    '/^(?:\\/(?!\\.)(?=.)[^/]|(?!\\.)(?=.)[^/]*?)$/',
	    '/^(?:(?:(?!(?:\\/|^)\\.).)*?)$/',
	    '/^(?:a\\/(?!(?:^|\\/)\\.{1,2}(?:$|\\/))(?=.)[^/]*?\\/b)$/',
	    '/^(?:a\\/(?=.)\\.[^/]*?\\/b)$/',
	    '/^(?:a\\/(?!\\.)(?=.)[^/]*?\\/b)$/',
	    '/^(?:a\\/(?=.)\\.[^/]*?\\/b)$/',
	    '/^(?:(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?)$/',
	    '/^(?:(?!\\.)(?=.)[^/]*?\\(a\\/b\\))$/',
	    '/^(?:(?!\\.)(?=.)(?:a|b)*|(?!\\.)(?=.)(?:a|c)*)$/',
	    '/^(?:(?=.)\\[(?=.)\\!a[^/]*?)$/',
	    '/^(?:(?=.)\\[(?=.)#a[^/]*?)$/',
	    '/^(?:(?=.)\\+\\(a\\|[^/]*?\\|c\\\\\\\\\\|d\\\\\\\\\\|e\\\\\\\\\\\\\\\\\\|f\\\\\\\\\\\\\\\\\\|g)$/',
	    '/^(?:(?!\\.)(?=.)(?:a|b)*|(?!\\.)(?=.)(?:a|c)*)$/',
	    '/^(?:a|(?!\\.)(?=.)[^/]*?\\(b\\|c|d\\))$/',
	    '/^(?:a|(?!\\.)(?=.)(?:b|c)*|(?!\\.)(?=.)(?:b|d)*)$/',
	    '/^(?:(?!\\.)(?=.)(?:a|b|c)*|(?!\\.)(?=.)(?:a|c)*)$/',
	    '/^(?:(?!\\.)(?=.)[^/]*?\\(a\\|b\\|c\\)|(?!\\.)(?=.)[^/]*?\\(a\\|c\\))$/',
	    '/^(?:(?=.)a[^/]b)$/',
	    '/^(?:(?=.)#[^/]*?)$/',
	    '/^(?!^(?:(?=.)a[^/]*?)$).*$/',
	    '/^(?:(?=.)\\!a[^/]*?)$/',
	    '/^(?:(?=.)a[^/]*?)$/',
	    '/^(?!^(?:(?=.)\\!a[^/]*?)$).*$/',
	    '/^(?:(?!\\.)(?=.)[^/]*?\\.(?:(?!js)[^/]*?))$/',
	    '/^(?:(?:(?!(?:\\/|^)\\.).)*?\\/\\.x\\/(?:(?!(?:\\/|^)\\.).)*?)$/' ]
	var re = 0;

	tap.test("basic tests", function (t) {
	  var start = Date.now()

	  // [ pattern, [matches], MM opts, files, TAP opts]
	  patterns.forEach(function (c) {
	    if (typeof c === "function") return c()
	    if (typeof c === "string") return t.comment(c)

	    var pattern = c[0]
	      , expect = c[1].sort(alpha)
	      , options = c[2] || {}
	      , f = c[3] || files
	      , tapOpts = c[4] || {}

	    // options.debug = true
	    var m = new mm.Minimatch(pattern, options)
	    var r = m.makeRe()
	    var expectRe = regexps[re++]
	    tapOpts.re = String(r) || JSON.stringify(r)
	    tapOpts.files = JSON.stringify(f)
	    tapOpts.pattern = pattern
	    tapOpts.set = m.set
	    tapOpts.negated = m.negate

	    var actual = mm.match(f, pattern, options)
	    actual.sort(alpha)

	    t.equivalent( actual, expect
	                , JSON.stringify(pattern) + " " + JSON.stringify(expect)
	                , tapOpts )

	    t.equal(tapOpts.re, expectRe, tapOpts)
	  })

	  t.comment("time=" + (Date.now() - start) + "ms")
	  t.end()
	})

	tap.test("global leak test", function (t) {
	  var globalAfter = Object.keys(global)
	  t.equivalent(globalAfter, globalBefore, "no new globals, please")
	  t.end()
	})

	function alpha (a, b) {
	  return a > b ? 1 : -1
	}


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var tap = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"tap\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	  , minimatch = __webpack_require__(26)

	tap.test("brace expansion", function (t) {
	  // [ pattern, [expanded] ]
	  ; [ [ "a{b,c{d,e},{f,g}h}x{y,z}"
	      , [ "abxy"
	        , "abxz"
	        , "acdxy"
	        , "acdxz"
	        , "acexy"
	        , "acexz"
	        , "afhxy"
	        , "afhxz"
	        , "aghxy"
	        , "aghxz" ] ]
	    , [ "a{1..5}b"
	      , [ "a1b"
	        , "a2b"
	        , "a3b"
	        , "a4b"
	        , "a5b" ] ]
	    , [ "a{b}c", ["a{b}c"] ]
	  ].forEach(function (tc) {
	    var p = tc[0]
	      , expect = tc[1]
	    t.equivalent(minimatch.braceExpand(p), expect, p)
	  })
	  console.error("ending")
	  t.end()
	})




/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var Minimatch = __webpack_require__(26).Minimatch
	var tap = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"tap\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	tap.test("cache test", function (t) {
	  var mm1 = new Minimatch("a?b")
	  var mm2 = new Minimatch("a?b")
	  t.equal(mm1, mm2, "should get the same object")
	  // the lru should drop it after 100 entries
	  for (var i = 0; i < 100; i ++) {
	    new Minimatch("a"+i)
	  }
	  mm2 = new Minimatch("a?b")
	  t.notEqual(mm1, mm2, "cache should have dropped")
	  t.end()
	})


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// http://www.bashcookbook.com/bashinfo/source/bash-1.14.7/tests/glob-test
	//
	// TODO: Some of these tests do very bad things with backslashes, and will
	// most likely fail badly on windows.  They should probably be skipped.

	var tap = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"tap\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	  , globalBefore = Object.keys(global)
	  , mm = __webpack_require__(26)
	  , files = [ "a", "b", "c", "d", "abc"
	            , "abd", "abe", "bb", "bcd"
	            , "ca", "cb", "dd", "de"
	            , "bdir/", "bdir/cfile"]
	  , next = files.concat([ "a-b", "aXb"
	                        , ".x", ".y" ])

	tap.test("basic tests", function (t) {
	  var start = Date.now()

	  // [ pattern, [matches], MM opts, files, TAP opts]
	  ; [ "http://www.bashcookbook.com/bashinfo" +
	      "/source/bash-1.14.7/tests/glob-test"
	    , ["a*", ["a", "abc", "abd", "abe"]]
	    , ["X*", ["X*"], {nonull: true}]

	    // allow null glob expansion
	    , ["X*", []]

	    // isaacs: Slightly different than bash/sh/ksh
	    // \\* is not un-escaped to literal "*" in a failed match,
	    // but it does make it get treated as a literal star
	    , ["\\*", ["\\*"], {nonull: true}]
	    , ["\\**", ["\\**"], {nonull: true}]
	    , ["\\*\\*", ["\\*\\*"], {nonull: true}]

	    , ["b*/", ["bdir/"]]
	    , ["c*", ["c", "ca", "cb"]]
	    , ["**", files]

	    , ["\\.\\./*/", ["\\.\\./*/"], {nonull: true}]
	    , ["s/\\..*//", ["s/\\..*//"], {nonull: true}]

	    , "legendary larry crashes bashes"
	    , ["/^root:/{s/^[^:]*:[^:]*:\([^:]*\).*$/\\1/"
	      , ["/^root:/{s/^[^:]*:[^:]*:\([^:]*\).*$/\\1/"], {nonull: true}]
	    , ["/^root:/{s/^[^:]*:[^:]*:\([^:]*\).*$/\1/"
	      , ["/^root:/{s/^[^:]*:[^:]*:\([^:]*\).*$/\1/"], {nonull: true}]

	    , "character classes"
	    , ["[a-c]b*", ["abc", "abd", "abe", "bb", "cb"]]
	    , ["[a-y]*[^c]", ["abd", "abe", "bb", "bcd",
	       "bdir/", "ca", "cb", "dd", "de"]]
	    , ["a*[^c]", ["abd", "abe"]]
	    , function () { files.push("a-b", "aXb") }
	    , ["a[X-]b", ["a-b", "aXb"]]
	    , function () { files.push(".x", ".y") }
	    , ["[^a-c]*", ["d", "dd", "de"]]
	    , function () { files.push("a*b/", "a*b/ooo") }
	    , ["a\\*b/*", ["a*b/ooo"]]
	    , ["a\\*?/*", ["a*b/ooo"]]
	    , ["*\\\\!*", [], {null: true}, ["echo !7"]]
	    , ["*\\!*", ["echo !7"], null, ["echo !7"]]
	    , ["*.\\*", ["r.*"], null, ["r.*"]]
	    , ["a[b]c", ["abc"]]
	    , ["a[\\b]c", ["abc"]]
	    , ["a?c", ["abc"]]
	    , ["a\\*c", [], {null: true}, ["abc"]]
	    , ["", [""], { null: true }, [""]]

	    , "http://www.opensource.apple.com/source/bash/bash-23/" +
	      "bash/tests/glob-test"
	    , function () { files.push("man/", "man/man1/", "man/man1/bash.1") }
	    , ["*/man*/bash.*", ["man/man1/bash.1"]]
	    , ["man/man1/bash.1", ["man/man1/bash.1"]]
	    , ["a***c", ["abc"], null, ["abc"]]
	    , ["a*****?c", ["abc"], null, ["abc"]]
	    , ["?*****??", ["abc"], null, ["abc"]]
	    , ["*****??", ["abc"], null, ["abc"]]
	    , ["?*****?c", ["abc"], null, ["abc"]]
	    , ["?***?****c", ["abc"], null, ["abc"]]
	    , ["?***?****?", ["abc"], null, ["abc"]]
	    , ["?***?****", ["abc"], null, ["abc"]]
	    , ["*******c", ["abc"], null, ["abc"]]
	    , ["*******?", ["abc"], null, ["abc"]]
	    , ["a*cd**?**??k", ["abcdecdhjk"], null, ["abcdecdhjk"]]
	    , ["a**?**cd**?**??k", ["abcdecdhjk"], null, ["abcdecdhjk"]]
	    , ["a**?**cd**?**??k***", ["abcdecdhjk"], null, ["abcdecdhjk"]]
	    , ["a**?**cd**?**??***k", ["abcdecdhjk"], null, ["abcdecdhjk"]]
	    , ["a**?**cd**?**??***k**", ["abcdecdhjk"], null, ["abcdecdhjk"]]
	    , ["a****c**?**??*****", ["abcdecdhjk"], null, ["abcdecdhjk"]]
	    , ["[-abc]", ["-"], null, ["-"]]
	    , ["[abc-]", ["-"], null, ["-"]]
	    , ["\\", ["\\"], null, ["\\"]]
	    , ["[\\\\]", ["\\"], null, ["\\"]]
	    , ["[[]", ["["], null, ["["]]
	    , ["[", ["["], null, ["["]]
	    , ["[*", ["[abc"], null, ["[abc"]]
	    , "a right bracket shall lose its special meaning and\n" +
	      "represent itself in a bracket expression if it occurs\n" +
	      "first in the list.  -- POSIX.2 2.8.3.2"
	    , ["[]]", ["]"], null, ["]"]]
	    , ["[]-]", ["]"], null, ["]"]]
	    , ["[a-\z]", ["p"], null, ["p"]]
	    , ["??**********?****?", [], { null: true }, ["abc"]]
	    , ["??**********?****c", [], { null: true }, ["abc"]]
	    , ["?************c****?****", [], { null: true }, ["abc"]]
	    , ["*c*?**", [], { null: true }, ["abc"]]
	    , ["a*****c*?**", [], { null: true }, ["abc"]]
	    , ["a********???*******", [], { null: true }, ["abc"]]
	    , ["[]", [], { null: true }, ["a"]]
	    , ["[abc", [], { null: true }, ["["]]

	    , "nocase tests"
	    , ["XYZ", ["xYz"], { nocase: true, null: true }
	      , ["xYz", "ABC", "IjK"]]
	    , ["ab*", ["ABC"], { nocase: true, null: true }
	      , ["xYz", "ABC", "IjK"]]
	    , ["[ia]?[ck]", ["ABC", "IjK"], { nocase: true, null: true }
	      , ["xYz", "ABC", "IjK"]]

	    // [ pattern, [matches], MM opts, files, TAP opts]
	    , "onestar/twostar"
	    , ["{/*,*}", [], {null: true}, ["/asdf/asdf/asdf"]]
	    , ["{/?,*}", ["/a", "bb"], {null: true}
	      , ["/a", "/b/b", "/a/b/c", "bb"]]

	    , "dots should not match unless requested"
	    , ["**", ["a/b"], {}, ["a/b", "a/.d", ".a/.d"]]

	    // .. and . can only match patterns starting with .,
	    // even when options.dot is set.
	    , function () {
	        files = ["a/./b", "a/../b", "a/c/b", "a/.d/b"]
	      }
	    , ["a/*/b", ["a/c/b", "a/.d/b"], {dot: true}]
	    , ["a/.*/b", ["a/./b", "a/../b", "a/.d/b"], {dot: true}]
	    , ["a/*/b", ["a/c/b"], {dot:false}]
	    , ["a/.*/b", ["a/./b", "a/../b", "a/.d/b"], {dot: false}]


	    // this also tests that changing the options needs
	    // to change the cache key, even if the pattern is
	    // the same!
	    , ["**", ["a/b","a/.d",".a/.d"], { dot: true }
	      , [ ".a/.d", "a/.d", "a/b"]]

	    , "paren sets cannot contain slashes"
	    , ["*(a/b)", ["*(a/b)"], {nonull: true}, ["a/b"]]

	    // brace sets trump all else.
	    //
	    // invalid glob pattern.  fails on bash4 and bsdglob.
	    // however, in this implementation, it's easier just
	    // to do the intuitive thing, and let brace-expansion
	    // actually come before parsing any extglob patterns,
	    // like the documentation seems to say.
	    //
	    // XXX: if anyone complains about this, either fix it
	    // or tell them to grow up and stop complaining.
	    //
	    // bash/bsdglob says this:
	    // , ["*(a|{b),c)}", ["*(a|{b),c)}"], {}, ["a", "ab", "ac", "ad"]]
	    // but we do this instead:
	    , ["*(a|{b),c)}", ["a", "ab", "ac"], {}, ["a", "ab", "ac", "ad"]]

	    // test partial parsing in the presence of comment/negation chars
	    , ["[!a*", ["[!ab"], {}, ["[!ab", "[ab"]]
	    , ["[#a*", ["[#ab"], {}, ["[#ab", "[ab"]]

	    // like: {a,b|c\\,d\\\|e} except it's unclosed, so it has to be escaped.
	    , ["+(a|*\\|c\\\\|d\\\\\\|e\\\\\\\\|f\\\\\\\\\\|g"
	      , ["+(a|b\\|c\\\\|d\\\\|e\\\\\\\\|f\\\\\\\\|g"]
	      , {}
	      , ["+(a|b\\|c\\\\|d\\\\|e\\\\\\\\|f\\\\\\\\|g", "a", "b\\c"]]


	    // crazy nested {,,} and *(||) tests.
	    , function () {
	        files = [ "a", "b", "c", "d"
	                , "ab", "ac", "ad"
	                , "bc", "cb"
	                , "bc,d", "c,db", "c,d"
	                , "d)", "(b|c", "*(b|c"
	                , "b|c", "b|cc", "cb|c"
	                , "x(a|b|c)", "x(a|c)"
	                , "(a|b|c)", "(a|c)"]
	      }
	    , ["*(a|{b,c})", ["a", "b", "c", "ab", "ac"]]
	    , ["{a,*(b|c,d)}", ["a","(b|c", "*(b|c", "d)"]]
	    // a
	    // *(b|c)
	    // *(b|d)
	    , ["{a,*(b|{c,d})}", ["a","b", "bc", "cb", "c", "d"]]
	    , ["*(a|{b|c,c})", ["a", "b", "c", "ab", "ac", "bc", "cb"]]


	    // test various flag settings.
	    , [ "*(a|{b|c,c})", ["x(a|b|c)", "x(a|c)", "(a|b|c)", "(a|c)"]
	      , { noext: true } ]
	    , ["a?b", ["x/y/acb", "acb/"], {matchBase: true}
	      , ["x/y/acb", "acb/", "acb/d/e", "x/y/acb/d"] ]
	    , ["#*", ["#a", "#b"], {nocomment: true}, ["#a", "#b", "c#d"]]


	    // begin channelling Boole and deMorgan...
	    , "negation tests"
	    , function () {
	        files = ["d", "e", "!ab", "!abc", "a!b", "\\!a"]
	      }

	    // anything that is NOT a* matches.
	    , ["!a*", ["\\!a", "d", "e", "!ab", "!abc"]]

	    // anything that IS !a* matches.
	    , ["!a*", ["!ab", "!abc"], {nonegate: true}]

	    // anything that IS a* matches
	    , ["!!a*", ["a!b"]]

	    // anything that is NOT !a* matches
	    , ["!\\!a*", ["a!b", "d", "e", "\\!a"]]

	    // negation nestled within a pattern
	    , function () {
	        files = [ "foo.js"
	                , "foo.bar"
	                // can't match this one without negative lookbehind.
	                , "foo.js.js"
	                , "blar.js"
	                , "foo."
	                , "boo.js.boo" ]
	      }
	    , ["*.!(js)", ["foo.bar", "foo.", "boo.js.boo"] ]

	    ].forEach(function (c) {
	      if (typeof c === "function") return c()
	      if (typeof c === "string") return t.comment(c)

	      var pattern = c[0]
	        , expect = c[1].sort(alpha)
	        , options = c[2] || {}
	        , f = c[3] || files
	        , tapOpts = c[4] || {}

	      // options.debug = true
	      var Class = mm.defaults(options).Minimatch
	      var m = new Class(pattern, {})
	      var r = m.makeRe()
	      tapOpts.re = String(r) || JSON.stringify(r)
	      tapOpts.files = JSON.stringify(f)
	      tapOpts.pattern = pattern
	      tapOpts.set = m.set
	      tapOpts.negated = m.negate

	      var actual = mm.match(f, pattern, options)
	      actual.sort(alpha)

	      t.equivalent( actual, expect
	                  , JSON.stringify(pattern) + " " + JSON.stringify(expect)
	                  , tapOpts )
	    })

	  t.comment("time=" + (Date.now() - start) + "ms")
	  t.end()
	})

	tap.test("global leak test", function (t) {
	  var globalAfter = Object.keys(global)
	  t.equivalent(globalAfter, globalBefore, "no new globals, please")
	  t.end()
	})

	function alpha (a, b) {
	  return a > b ? 1 : -1
	}


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var test = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"tap\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).test
	var minimatch = __webpack_require__(26)

	test('extglob ending with statechar', function(t) {
	  t.notOk(minimatch('ax', 'a?(b*)'))
	  t.ok(minimatch('ax', '?(a*|b)'))
	  t.end()
	})


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(16).inherits


/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = require("events");

/***/ },
/* 38 */
/***/ function(module, exports) {

	'use strict';
	var argv = process.argv;

	module.exports = (function () {
		if (argv.indexOf('--no-color') !== -1 ||
			argv.indexOf('--no-colors') !== -1 ||
			argv.indexOf('--color=false') !== -1) {
			return false;
		}

		if (argv.indexOf('--color') !== -1 ||
			argv.indexOf('--colors') !== -1 ||
			argv.indexOf('--color=true') !== -1 ||
			argv.indexOf('--color=always') !== -1) {
			return true;
		}

		if (process.stdout && !process.stdout.isTTY) {
			return false;
		}

		if (process.platform === 'win32') {
			return true;
		}

		if ('COLORTERM' in process.env) {
			return true;
		}

		if (process.env.TERM === 'dumb') {
			return false;
		}

		if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)) {
			return true;
		}

		return false;
	})();


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var Base = __webpack_require__(10);
	var inherits = __webpack_require__(14).inherits;
	var color = Base.color;

	/**
	 * Expose `Dot`.
	 */

	exports = module.exports = Dot;

	/**
	 * Initialize a new `Dot` matrix test reporter.
	 *
	 * @api public
	 * @param {Runner} runner
	 */
	function Dot(runner) {
	  Base.call(this, runner);

	  var self = this;
	  var width = Base.window.width * .75 | 0;
	  var n = -1;

	  runner.on('start', function() {
	    process.stdout.write('\n');
	  });

	  runner.on('pending', function() {
	    if (++n % width === 0) {
	      process.stdout.write('\n  ');
	    }
	    process.stdout.write(color('pending', Base.symbols.dot));
	  });

	  runner.on('pass', function(test) {
	    if (++n % width === 0) {
	      process.stdout.write('\n  ');
	    }
	    if (test.speed === 'slow') {
	      process.stdout.write(color('bright yellow', Base.symbols.dot));
	    } else {
	      process.stdout.write(color(test.speed, Base.symbols.dot));
	    }
	  });

	  runner.on('fail', function() {
	    if (++n % width === 0) {
	      process.stdout.write('\n  ');
	    }
	    process.stdout.write(color('fail', Base.symbols.dot));
	  });

	  runner.on('end', function() {
	    console.log();
	    self.epilogue();
	  });
	}

	/**
	 * Inherit from `Base.prototype`.
	 */
	inherits(Dot, Base);


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var Base = __webpack_require__(10);
	var utils = __webpack_require__(14);

	/**
	 * Expose `Doc`.
	 */

	exports = module.exports = Doc;

	/**
	 * Initialize a new `Doc` reporter.
	 *
	 * @param {Runner} runner
	 * @api public
	 */
	function Doc(runner) {
	  Base.call(this, runner);

	  var indents = 2;

	  function indent() {
	    return Array(indents).join('  ');
	  }

	  runner.on('suite', function(suite) {
	    if (suite.root) {
	      return;
	    }
	    ++indents;
	    console.log('%s<section class="suite">', indent());
	    ++indents;
	    console.log('%s<h1>%s</h1>', indent(), utils.escape(suite.title));
	    console.log('%s<dl>', indent());
	  });

	  runner.on('suite end', function(suite) {
	    if (suite.root) {
	      return;
	    }
	    console.log('%s</dl>', indent());
	    --indents;
	    console.log('%s</section>', indent());
	    --indents;
	  });

	  runner.on('pass', function(test) {
	    console.log('%s  <dt>%s</dt>', indent(), utils.escape(test.title));
	    var code = utils.escape(utils.clean(test.body));
	    console.log('%s  <dd><pre><code>%s</code></pre></dd>', indent(), code);
	  });

	  runner.on('fail', function(test, err) {
	    console.log('%s  <dt class="error">%s</dt>', indent(), utils.escape(test.title));
	    var code = utils.escape(utils.clean(test.fn.body));
	    console.log('%s  <dd class="error"><pre><code>%s</code></pre></dd>', indent(), code);
	    console.log('%s  <dd class="error">%s</dd>', indent(), utils.escape(err));
	  });
	}


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var Base = __webpack_require__(10);

	/**
	 * Expose `TAP`.
	 */

	exports = module.exports = TAP;

	/**
	 * Initialize a new `TAP` reporter.
	 *
	 * @api public
	 * @param {Runner} runner
	 */
	function TAP(runner) {
	  Base.call(this, runner);

	  var n = 1;
	  var passes = 0;
	  var failures = 0;

	  runner.on('start', function() {
	    var total = runner.grepTotal(runner.suite);
	    console.log('%d..%d', 1, total);
	  });

	  runner.on('test end', function() {
	    ++n;
	  });

	  runner.on('pending', function(test) {
	    console.log('ok %d %s # SKIP -', n, title(test));
	  });

	  runner.on('pass', function(test) {
	    passes++;
	    console.log('ok %d %s', n, title(test));
	  });

	  runner.on('fail', function(test, err) {
	    failures++;
	    console.log('not ok %d %s', n, title(test));
	    if (err.stack) {
	      console.log(err.stack.replace(/^/gm, '  '));
	    }
	  });

	  runner.on('end', function() {
	    console.log('# tests ' + (passes + failures));
	    console.log('# pass ' + passes);
	    console.log('# fail ' + failures);
	  });
	}

	/**
	 * Return a TAP-safe title of `test`
	 *
	 * @api private
	 * @param {Object} test
	 * @return {String}
	 */
	function title(test) {
	  return test.fullTitle().replace(/#/g, '');
	}


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var Base = __webpack_require__(10);

	/**
	 * Expose `JSON`.
	 */

	exports = module.exports = JSONReporter;

	/**
	 * Initialize a new `JSON` reporter.
	 *
	 * @api public
	 * @param {Runner} runner
	 */
	function JSONReporter(runner) {
	  Base.call(this, runner);

	  var self = this;
	  var tests = [];
	  var pending = [];
	  var failures = [];
	  var passes = [];

	  runner.on('test end', function(test) {
	    tests.push(test);
	  });

	  runner.on('pass', function(test) {
	    passes.push(test);
	  });

	  runner.on('fail', function(test) {
	    failures.push(test);
	  });

	  runner.on('pending', function(test) {
	    pending.push(test);
	  });

	  runner.on('end', function() {
	    var obj = {
	      stats: self.stats,
	      tests: tests.map(clean),
	      pending: pending.map(clean),
	      failures: failures.map(clean),
	      passes: passes.map(clean)
	    };

	    runner.testResults = obj;

	    process.stdout.write(JSON.stringify(obj, null, 2));
	  });
	}

	/**
	 * Return a plain-object representation of `test`
	 * free of cyclic properties etc.
	 *
	 * @api private
	 * @param {Object} test
	 * @return {Object}
	 */
	function clean(test) {
	  return {
	    title: test.title,
	    fullTitle: test.fullTitle(),
	    duration: test.duration,
	    currentRetry: test.currentRetry(),
	    err: errorJSON(test.err || {})
	  };
	}

	/**
	 * Transform `error` into a JSON object.
	 *
	 * @api private
	 * @param {Error} err
	 * @return {Object}
	 */
	function errorJSON(err) {
	  var res = {};
	  Object.getOwnPropertyNames(err).forEach(function(key) {
	    res[key] = err[key];
	  }, err);
	  return res;
	}


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/* eslint-env browser */

	/**
	 * Module dependencies.
	 */

	var Base = __webpack_require__(10);
	var utils = __webpack_require__(14);
	var Progress = __webpack_require__(44);
	var escapeRe = __webpack_require__(7);
	var escape = utils.escape;

	/**
	 * Save timer references to avoid Sinon interfering (see GH-237).
	 */

	/* eslint-disable no-unused-vars, no-native-reassign */
	var Date = global.Date;
	var setTimeout = global.setTimeout;
	var setInterval = global.setInterval;
	var clearTimeout = global.clearTimeout;
	var clearInterval = global.clearInterval;
	/* eslint-enable no-unused-vars, no-native-reassign */

	/**
	 * Expose `HTML`.
	 */

	exports = module.exports = HTML;

	/**
	 * Stats template.
	 */

	var statsTemplate = '<ul id="mocha-stats">'
	  + '<li class="progress"><canvas width="40" height="40"></canvas></li>'
	  + '<li class="passes"><a href="javascript:void(0);">passes:</a> <em>0</em></li>'
	  + '<li class="failures"><a href="javascript:void(0);">failures:</a> <em>0</em></li>'
	  + '<li class="duration">duration: <em>0</em>s</li>'
	  + '</ul>';

	/**
	 * Initialize a new `HTML` reporter.
	 *
	 * @api public
	 * @param {Runner} runner
	 */
	function HTML(runner) {
	  Base.call(this, runner);

	  var self = this;
	  var stats = this.stats;
	  var stat = fragment(statsTemplate);
	  var items = stat.getElementsByTagName('li');
	  var passes = items[1].getElementsByTagName('em')[0];
	  var passesLink = items[1].getElementsByTagName('a')[0];
	  var failures = items[2].getElementsByTagName('em')[0];
	  var failuresLink = items[2].getElementsByTagName('a')[0];
	  var duration = items[3].getElementsByTagName('em')[0];
	  var canvas = stat.getElementsByTagName('canvas')[0];
	  var report = fragment('<ul id="mocha-report"></ul>');
	  var stack = [report];
	  var progress;
	  var ctx;
	  var root = document.getElementById('mocha');

	  if (canvas.getContext) {
	    var ratio = window.devicePixelRatio || 1;
	    canvas.style.width = canvas.width;
	    canvas.style.height = canvas.height;
	    canvas.width *= ratio;
	    canvas.height *= ratio;
	    ctx = canvas.getContext('2d');
	    ctx.scale(ratio, ratio);
	    progress = new Progress();
	  }

	  if (!root) {
	    return error('#mocha div missing, add it to your document');
	  }

	  // pass toggle
	  on(passesLink, 'click', function() {
	    unhide();
	    var name = (/pass/).test(report.className) ? '' : ' pass';
	    report.className = report.className.replace(/fail|pass/g, '') + name;
	    if (report.className.trim()) {
	      hideSuitesWithout('test pass');
	    }
	  });

	  // failure toggle
	  on(failuresLink, 'click', function() {
	    unhide();
	    var name = (/fail/).test(report.className) ? '' : ' fail';
	    report.className = report.className.replace(/fail|pass/g, '') + name;
	    if (report.className.trim()) {
	      hideSuitesWithout('test fail');
	    }
	  });

	  root.appendChild(stat);
	  root.appendChild(report);

	  if (progress) {
	    progress.size(40);
	  }

	  runner.on('suite', function(suite) {
	    if (suite.root) {
	      return;
	    }

	    // suite
	    var url = self.suiteURL(suite);
	    var el = fragment('<li class="suite"><h1><a href="%s">%s</a></h1></li>', url, escape(suite.title));

	    // container
	    stack[0].appendChild(el);
	    stack.unshift(document.createElement('ul'));
	    el.appendChild(stack[0]);
	  });

	  runner.on('suite end', function(suite) {
	    if (suite.root) {
	      return;
	    }
	    stack.shift();
	  });

	  runner.on('fail', function(test) {
	    // For type = 'test' its possible that the test failed due to multiple
	    // done() calls. So report the issue here.
	    if (test.type === 'hook'
	      || test.type === 'test') {
	      runner.emit('test end', test);
	    }
	  });

	  runner.on('test end', function(test) {
	    // TODO: add to stats
	    var percent = stats.tests / this.total * 100 | 0;
	    if (progress) {
	      progress.update(percent).draw(ctx);
	    }

	    // update stats
	    var ms = new Date() - stats.start;
	    text(passes, stats.passes);
	    text(failures, stats.failures);
	    text(duration, (ms / 1000).toFixed(2));

	    // test
	    var el;
	    if (test.state === 'passed') {
	      var url = self.testURL(test);
	      el = fragment('<li class="test pass %e"><h2>%e<span class="duration">%ems</span> <a href="%s" class="replay">‣</a></h2></li>', test.speed, test.title, test.duration, url);
	    } else if (test.pending) {
	      el = fragment('<li class="test pass pending"><h2>%e</h2></li>', test.title);
	    } else {
	      el = fragment('<li class="test fail"><h2>%e <a href="%e" class="replay">‣</a></h2></li>', test.title, self.testURL(test));
	      var stackString; // Note: Includes leading newline
	      var message = test.err.toString();

	      // <=IE7 stringifies to [Object Error]. Since it can be overloaded, we
	      // check for the result of the stringifying.
	      if (message === '[object Error]') {
	        message = test.err.message;
	      }

	      if (test.err.stack) {
	        var indexOfMessage = test.err.stack.indexOf(test.err.message);
	        if (indexOfMessage === -1) {
	          stackString = test.err.stack;
	        } else {
	          stackString = test.err.stack.substr(test.err.message.length + indexOfMessage);
	        }
	      } else if (test.err.sourceURL && test.err.line !== undefined) {
	        // Safari doesn't give you a stack. Let's at least provide a source line.
	        stackString = '\n(' + test.err.sourceURL + ':' + test.err.line + ')';
	      }

	      stackString = stackString || '';

	      if (test.err.htmlMessage && stackString) {
	        el.appendChild(fragment('<div class="html-error">%s\n<pre class="error">%e</pre></div>', test.err.htmlMessage, stackString));
	      } else if (test.err.htmlMessage) {
	        el.appendChild(fragment('<div class="html-error">%s</div>', test.err.htmlMessage));
	      } else {
	        el.appendChild(fragment('<pre class="error">%e%e</pre>', message, stackString));
	      }
	    }

	    // toggle code
	    // TODO: defer
	    if (!test.pending) {
	      var h2 = el.getElementsByTagName('h2')[0];

	      on(h2, 'click', function() {
	        pre.style.display = pre.style.display === 'none' ? 'block' : 'none';
	      });

	      var pre = fragment('<pre><code>%e</code></pre>', utils.clean(test.body));
	      el.appendChild(pre);
	      pre.style.display = 'none';
	    }

	    // Don't call .appendChild if #mocha-report was already .shift()'ed off the stack.
	    if (stack[0]) {
	      stack[0].appendChild(el);
	    }
	  });
	}

	/**
	 * Makes a URL, preserving querystring ("search") parameters.
	 *
	 * @param {string} s
	 * @return {string} A new URL.
	 */
	function makeUrl(s) {
	  var search = window.location.search;

	  // Remove previous grep query parameter if present
	  if (search) {
	    search = search.replace(/[?&]grep=[^&\s]*/g, '').replace(/^&/, '?');
	  }

	  return window.location.pathname + (search ? search + '&' : '?') + 'grep=' + encodeURIComponent(escapeRe(s));
	}

	/**
	 * Provide suite URL.
	 *
	 * @param {Object} [suite]
	 */
	HTML.prototype.suiteURL = function(suite) {
	  return makeUrl(suite.fullTitle());
	};

	/**
	 * Provide test URL.
	 *
	 * @param {Object} [test]
	 */
	HTML.prototype.testURL = function(test) {
	  return makeUrl(test.fullTitle());
	};

	/**
	 * Display error `msg`.
	 *
	 * @param {string} msg
	 */
	function error(msg) {
	  document.body.appendChild(fragment('<div id="mocha-error">%s</div>', msg));
	}

	/**
	 * Return a DOM fragment from `html`.
	 *
	 * @param {string} html
	 */
	function fragment(html) {
	  var args = arguments;
	  var div = document.createElement('div');
	  var i = 1;

	  div.innerHTML = html.replace(/%([se])/g, function(_, type) {
	    switch (type) {
	      case 's': return String(args[i++]);
	      case 'e': return escape(args[i++]);
	      // no default
	    }
	  });

	  return div.firstChild;
	}

	/**
	 * Check for suites that do not have elements
	 * with `classname`, and hide them.
	 *
	 * @param {text} classname
	 */
	function hideSuitesWithout(classname) {
	  var suites = document.getElementsByClassName('suite');
	  for (var i = 0; i < suites.length; i++) {
	    var els = suites[i].getElementsByClassName(classname);
	    if (!els.length) {
	      suites[i].className += ' hidden';
	    }
	  }
	}

	/**
	 * Unhide .hidden suites.
	 */
	function unhide() {
	  var els = document.getElementsByClassName('suite hidden');
	  for (var i = 0; i < els.length; ++i) {
	    els[i].className = els[i].className.replace('suite hidden', 'suite');
	  }
	}

	/**
	 * Set an element's text contents.
	 *
	 * @param {HTMLElement} el
	 * @param {string} contents
	 */
	function text(el, contents) {
	  if (el.textContent) {
	    el.textContent = contents;
	  } else {
	    el.innerText = contents;
	  }
	}

	/**
	 * Listen on `event` with callback `fn`.
	 */
	function on(el, event, fn) {
	  if (el.addEventListener) {
	    el.addEventListener(event, fn, false);
	  } else {
	    el.attachEvent('on' + event, fn);
	  }
	}


/***/ },
/* 44 */
/***/ function(module, exports) {

	/**
	 * Expose `Progress`.
	 */

	module.exports = Progress;

	/**
	 * Initialize a new `Progress` indicator.
	 */
	function Progress() {
	  this.percent = 0;
	  this.size(0);
	  this.fontSize(11);
	  this.font('helvetica, arial, sans-serif');
	}

	/**
	 * Set progress size to `size`.
	 *
	 * @api public
	 * @param {number} size
	 * @return {Progress} Progress instance.
	 */
	Progress.prototype.size = function(size) {
	  this._size = size;
	  return this;
	};

	/**
	 * Set text to `text`.
	 *
	 * @api public
	 * @param {string} text
	 * @return {Progress} Progress instance.
	 */
	Progress.prototype.text = function(text) {
	  this._text = text;
	  return this;
	};

	/**
	 * Set font size to `size`.
	 *
	 * @api public
	 * @param {number} size
	 * @return {Progress} Progress instance.
	 */
	Progress.prototype.fontSize = function(size) {
	  this._fontSize = size;
	  return this;
	};

	/**
	 * Set font to `family`.
	 *
	 * @param {string} family
	 * @return {Progress} Progress instance.
	 */
	Progress.prototype.font = function(family) {
	  this._font = family;
	  return this;
	};

	/**
	 * Update percentage to `n`.
	 *
	 * @param {number} n
	 * @return {Progress} Progress instance.
	 */
	Progress.prototype.update = function(n) {
	  this.percent = n;
	  return this;
	};

	/**
	 * Draw on `ctx`.
	 *
	 * @param {CanvasRenderingContext2d} ctx
	 * @return {Progress} Progress instance.
	 */
	Progress.prototype.draw = function(ctx) {
	  try {
	    var percent = Math.min(this.percent, 100);
	    var size = this._size;
	    var half = size / 2;
	    var x = half;
	    var y = half;
	    var rad = half - 1;
	    var fontSize = this._fontSize;

	    ctx.font = fontSize + 'px ' + this._font;

	    var angle = Math.PI * 2 * (percent / 100);
	    ctx.clearRect(0, 0, size, size);

	    // outer circle
	    ctx.strokeStyle = '#9f9f9f';
	    ctx.beginPath();
	    ctx.arc(x, y, rad, 0, angle, false);
	    ctx.stroke();

	    // inner circle
	    ctx.strokeStyle = '#eee';
	    ctx.beginPath();
	    ctx.arc(x, y, rad - 1, 0, angle, true);
	    ctx.stroke();

	    // text
	    var text = this._text || (percent | 0) + '%';
	    var w = ctx.measureText(text).width;

	    ctx.fillText(text, x - w / 2 + 1, y + fontSize / 2 - 1);
	  } catch (err) {
	    // don't fail if we can't render progress
	  }
	  return this;
	};


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var Base = __webpack_require__(10);
	var inherits = __webpack_require__(14).inherits;
	var color = Base.color;
	var cursor = Base.cursor;

	/**
	 * Expose `List`.
	 */

	exports = module.exports = List;

	/**
	 * Initialize a new `List` test reporter.
	 *
	 * @api public
	 * @param {Runner} runner
	 */
	function List(runner) {
	  Base.call(this, runner);

	  var self = this;
	  var n = 0;

	  runner.on('start', function() {
	    console.log();
	  });

	  runner.on('test', function(test) {
	    process.stdout.write(color('pass', '    ' + test.fullTitle() + ': '));
	  });

	  runner.on('pending', function(test) {
	    var fmt = color('checkmark', '  -')
	      + color('pending', ' %s');
	    console.log(fmt, test.fullTitle());
	  });

	  runner.on('pass', function(test) {
	    var fmt = color('checkmark', '  ' + Base.symbols.dot)
	      + color('pass', ' %s: ')
	      + color(test.speed, '%dms');
	    cursor.CR();
	    console.log(fmt, test.fullTitle(), test.duration);
	  });

	  runner.on('fail', function(test) {
	    cursor.CR();
	    console.log(color('fail', '  %d) %s'), ++n, test.fullTitle());
	  });

	  runner.on('end', self.epilogue.bind(self));
	}

	/**
	 * Inherit from `Base.prototype`.
	 */
	inherits(List, Base);


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var Base = __webpack_require__(10);
	var inherits = __webpack_require__(14).inherits;

	/**
	 * Expose `Min`.
	 */

	exports = module.exports = Min;

	/**
	 * Initialize a new `Min` minimal test reporter (best used with --watch).
	 *
	 * @api public
	 * @param {Runner} runner
	 */
	function Min(runner) {
	  Base.call(this, runner);

	  runner.on('start', function() {
	    // clear screen
	    process.stdout.write('\u001b[2J');
	    // set cursor position
	    process.stdout.write('\u001b[1;3H');
	  });

	  runner.on('end', this.epilogue.bind(this));
	}

	/**
	 * Inherit from `Base.prototype`.
	 */
	inherits(Min, Base);


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var Base = __webpack_require__(10);
	var inherits = __webpack_require__(14).inherits;
	var color = Base.color;
	var cursor = Base.cursor;

	/**
	 * Expose `Spec`.
	 */

	exports = module.exports = Spec;

	/**
	 * Initialize a new `Spec` test reporter.
	 *
	 * @api public
	 * @param {Runner} runner
	 */
	function Spec(runner) {
	  Base.call(this, runner);

	  var self = this;
	  var indents = 0;
	  var n = 0;

	  function indent() {
	    return Array(indents).join('  ');
	  }

	  runner.on('start', function() {
	    console.log();
	  });

	  runner.on('suite', function(suite) {
	    ++indents;
	    console.log(color('suite', '%s%s'), indent(), suite.title);
	  });

	  runner.on('suite end', function() {
	    --indents;
	    if (indents === 1) {
	      console.log();
	    }
	  });

	  runner.on('pending', function(test) {
	    var fmt = indent() + color('pending', '  - %s');
	    console.log(fmt, test.title);
	  });

	  runner.on('pass', function(test) {
	    var fmt;
	    if (test.speed === 'fast') {
	      fmt = indent()
	        + color('checkmark', '  ' + Base.symbols.ok)
	        + color('pass', ' %s');
	      cursor.CR();
	      console.log(fmt, test.title);
	    } else {
	      fmt = indent()
	        + color('checkmark', '  ' + Base.symbols.ok)
	        + color('pass', ' %s')
	        + color(test.speed, ' (%dms)');
	      cursor.CR();
	      console.log(fmt, test.title, test.duration);
	    }
	  });

	  runner.on('fail', function(test) {
	    cursor.CR();
	    console.log(indent() + color('fail', '  %d) %s'), ++n, test.title);
	  });

	  runner.on('end', self.epilogue.bind(self));
	}

	/**
	 * Inherit from `Base.prototype`.
	 */
	inherits(Spec, Base);


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var Base = __webpack_require__(10);
	var inherits = __webpack_require__(14).inherits;

	/**
	 * Expose `Dot`.
	 */

	exports = module.exports = NyanCat;

	/**
	 * Initialize a new `Dot` matrix test reporter.
	 *
	 * @param {Runner} runner
	 * @api public
	 */

	function NyanCat(runner) {
	  Base.call(this, runner);

	  var self = this;
	  var width = Base.window.width * .75 | 0;
	  var nyanCatWidth = this.nyanCatWidth = 11;

	  this.colorIndex = 0;
	  this.numberOfLines = 4;
	  this.rainbowColors = self.generateColors();
	  this.scoreboardWidth = 5;
	  this.tick = 0;
	  this.trajectories = [[], [], [], []];
	  this.trajectoryWidthMax = (width - nyanCatWidth);

	  runner.on('start', function() {
	    Base.cursor.hide();
	    self.draw();
	  });

	  runner.on('pending', function() {
	    self.draw();
	  });

	  runner.on('pass', function() {
	    self.draw();
	  });

	  runner.on('fail', function() {
	    self.draw();
	  });

	  runner.on('end', function() {
	    Base.cursor.show();
	    for (var i = 0; i < self.numberOfLines; i++) {
	      write('\n');
	    }
	    self.epilogue();
	  });
	}

	/**
	 * Inherit from `Base.prototype`.
	 */
	inherits(NyanCat, Base);

	/**
	 * Draw the nyan cat
	 *
	 * @api private
	 */

	NyanCat.prototype.draw = function() {
	  this.appendRainbow();
	  this.drawScoreboard();
	  this.drawRainbow();
	  this.drawNyanCat();
	  this.tick = !this.tick;
	};

	/**
	 * Draw the "scoreboard" showing the number
	 * of passes, failures and pending tests.
	 *
	 * @api private
	 */

	NyanCat.prototype.drawScoreboard = function() {
	  var stats = this.stats;

	  function draw(type, n) {
	    write(' ');
	    write(Base.color(type, n));
	    write('\n');
	  }

	  draw('green', stats.passes);
	  draw('fail', stats.failures);
	  draw('pending', stats.pending);
	  write('\n');

	  this.cursorUp(this.numberOfLines);
	};

	/**
	 * Append the rainbow.
	 *
	 * @api private
	 */

	NyanCat.prototype.appendRainbow = function() {
	  var segment = this.tick ? '_' : '-';
	  var rainbowified = this.rainbowify(segment);

	  for (var index = 0; index < this.numberOfLines; index++) {
	    var trajectory = this.trajectories[index];
	    if (trajectory.length >= this.trajectoryWidthMax) {
	      trajectory.shift();
	    }
	    trajectory.push(rainbowified);
	  }
	};

	/**
	 * Draw the rainbow.
	 *
	 * @api private
	 */

	NyanCat.prototype.drawRainbow = function() {
	  var self = this;

	  this.trajectories.forEach(function(line) {
	    write('\u001b[' + self.scoreboardWidth + 'C');
	    write(line.join(''));
	    write('\n');
	  });

	  this.cursorUp(this.numberOfLines);
	};

	/**
	 * Draw the nyan cat
	 *
	 * @api private
	 */
	NyanCat.prototype.drawNyanCat = function() {
	  var self = this;
	  var startWidth = this.scoreboardWidth + this.trajectories[0].length;
	  var dist = '\u001b[' + startWidth + 'C';
	  var padding = '';

	  write(dist);
	  write('_,------,');
	  write('\n');

	  write(dist);
	  padding = self.tick ? '  ' : '   ';
	  write('_|' + padding + '/\\_/\\ ');
	  write('\n');

	  write(dist);
	  padding = self.tick ? '_' : '__';
	  var tail = self.tick ? '~' : '^';
	  write(tail + '|' + padding + this.face() + ' ');
	  write('\n');

	  write(dist);
	  padding = self.tick ? ' ' : '  ';
	  write(padding + '""  "" ');
	  write('\n');

	  this.cursorUp(this.numberOfLines);
	};

	/**
	 * Draw nyan cat face.
	 *
	 * @api private
	 * @return {string}
	 */

	NyanCat.prototype.face = function() {
	  var stats = this.stats;
	  if (stats.failures) {
	    return '( x .x)';
	  } else if (stats.pending) {
	    return '( o .o)';
	  } else if (stats.passes) {
	    return '( ^ .^)';
	  }
	  return '( - .-)';
	};

	/**
	 * Move cursor up `n`.
	 *
	 * @api private
	 * @param {number} n
	 */

	NyanCat.prototype.cursorUp = function(n) {
	  write('\u001b[' + n + 'A');
	};

	/**
	 * Move cursor down `n`.
	 *
	 * @api private
	 * @param {number} n
	 */

	NyanCat.prototype.cursorDown = function(n) {
	  write('\u001b[' + n + 'B');
	};

	/**
	 * Generate rainbow colors.
	 *
	 * @api private
	 * @return {Array}
	 */
	NyanCat.prototype.generateColors = function() {
	  var colors = [];

	  for (var i = 0; i < (6 * 7); i++) {
	    var pi3 = Math.floor(Math.PI / 3);
	    var n = (i * (1.0 / 6));
	    var r = Math.floor(3 * Math.sin(n) + 3);
	    var g = Math.floor(3 * Math.sin(n + 2 * pi3) + 3);
	    var b = Math.floor(3 * Math.sin(n + 4 * pi3) + 3);
	    colors.push(36 * r + 6 * g + b + 16);
	  }

	  return colors;
	};

	/**
	 * Apply rainbow to the given `str`.
	 *
	 * @api private
	 * @param {string} str
	 * @return {string}
	 */
	NyanCat.prototype.rainbowify = function(str) {
	  if (!Base.useColors) {
	    return str;
	  }
	  var color = this.rainbowColors[this.colorIndex % this.rainbowColors.length];
	  this.colorIndex += 1;
	  return '\u001b[38;5;' + color + 'm' + str + '\u001b[0m';
	};

	/**
	 * Stdout helper.
	 *
	 * @param {string} string A message to write to stdout.
	 */
	function write(string) {
	  process.stdout.write(string);
	}


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var Base = __webpack_require__(10);
	var utils = __webpack_require__(14);
	var inherits = utils.inherits;
	var fs = __webpack_require__(19);
	var escape = utils.escape;
	var mkdirp = __webpack_require__(50);
	var path = __webpack_require__(8);

	/**
	 * Save timer references to avoid Sinon interfering (see GH-237).
	 */

	/* eslint-disable no-unused-vars, no-native-reassign */
	var Date = global.Date;
	var setTimeout = global.setTimeout;
	var setInterval = global.setInterval;
	var clearTimeout = global.clearTimeout;
	var clearInterval = global.clearInterval;
	/* eslint-enable no-unused-vars, no-native-reassign */

	/**
	 * Expose `XUnit`.
	 */

	exports = module.exports = XUnit;

	/**
	 * Initialize a new `XUnit` reporter.
	 *
	 * @api public
	 * @param {Runner} runner
	 */
	function XUnit(runner, options) {
	  Base.call(this, runner);

	  var stats = this.stats;
	  var tests = [];
	  var self = this;

	  if (options.reporterOptions && options.reporterOptions.output) {
	    if (!fs.createWriteStream) {
	      throw new Error('file output not supported in browser');
	    }
	    mkdirp.sync(path.dirname(options.reporterOptions.output));
	    self.fileStream = fs.createWriteStream(options.reporterOptions.output);
	  }

	  runner.on('pending', function(test) {
	    tests.push(test);
	  });

	  runner.on('pass', function(test) {
	    tests.push(test);
	  });

	  runner.on('fail', function(test) {
	    tests.push(test);
	  });

	  runner.on('end', function() {
	    self.write(tag('testsuite', {
	      name: 'Mocha Tests',
	      tests: stats.tests,
	      failures: stats.failures,
	      errors: stats.failures,
	      skipped: stats.tests - stats.failures - stats.passes,
	      timestamp: (new Date()).toUTCString(),
	      time: (stats.duration / 1000) || 0
	    }, false));

	    tests.forEach(function(t) {
	      self.test(t);
	    });

	    self.write('</testsuite>');
	  });
	}

	/**
	 * Inherit from `Base.prototype`.
	 */
	inherits(XUnit, Base);

	/**
	 * Override done to close the stream (if it's a file).
	 *
	 * @param failures
	 * @param {Function} fn
	 */
	XUnit.prototype.done = function(failures, fn) {
	  if (this.fileStream) {
	    this.fileStream.end(function() {
	      fn(failures);
	    });
	  } else {
	    fn(failures);
	  }
	};

	/**
	 * Write out the given line.
	 *
	 * @param {string} line
	 */
	XUnit.prototype.write = function(line) {
	  if (this.fileStream) {
	    this.fileStream.write(line + '\n');
	  } else if (typeof process === 'object' && process.stdout) {
	    process.stdout.write(line + '\n');
	  } else {
	    console.log(line);
	  }
	};

	/**
	 * Output tag for the given `test.`
	 *
	 * @param {Test} test
	 */
	XUnit.prototype.test = function(test) {
	  var attrs = {
	    classname: test.parent.fullTitle(),
	    name: test.title,
	    time: (test.duration / 1000) || 0
	  };

	  if (test.state === 'failed') {
	    var err = test.err;
	    this.write(tag('testcase', attrs, false, tag('failure', {}, false, cdata(escape(err.message) + '\n' + err.stack))));
	  } else if (test.pending) {
	    this.write(tag('testcase', attrs, false, tag('skipped', {}, true)));
	  } else {
	    this.write(tag('testcase', attrs, true));
	  }
	};

	/**
	 * HTML tag helper.
	 *
	 * @param name
	 * @param attrs
	 * @param close
	 * @param content
	 * @return {string}
	 */
	function tag(name, attrs, close, content) {
	  var end = close ? '/>' : '>';
	  var pairs = [];
	  var tag;

	  for (var key in attrs) {
	    if (Object.prototype.hasOwnProperty.call(attrs, key)) {
	      pairs.push(key + '="' + escape(attrs[key]) + '"');
	    }
	  }

	  tag = '<' + name + (pairs.length ? ' ' + pairs.join(' ') : '') + end;
	  if (content) {
	    tag += content + '</' + name + end;
	  }
	  return tag;
	}

	/**
	 * Return cdata escaped CDATA `str`.
	 */

	function cdata(str) {
	  return '<![CDATA[' + escape(str) + ']]>';
	}


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var path = __webpack_require__(8);
	var fs = __webpack_require__(19);
	var _0777 = parseInt('0777', 8);

	module.exports = mkdirP.mkdirp = mkdirP.mkdirP = mkdirP;

	function mkdirP (p, opts, f, made) {
	    if (typeof opts === 'function') {
	        f = opts;
	        opts = {};
	    }
	    else if (!opts || typeof opts !== 'object') {
	        opts = { mode: opts };
	    }
	    
	    var mode = opts.mode;
	    var xfs = opts.fs || fs;
	    
	    if (mode === undefined) {
	        mode = _0777 & (~process.umask());
	    }
	    if (!made) made = null;
	    
	    var cb = f || function () {};
	    p = path.resolve(p);
	    
	    xfs.mkdir(p, mode, function (er) {
	        if (!er) {
	            made = made || p;
	            return cb(null, made);
	        }
	        switch (er.code) {
	            case 'ENOENT':
	                mkdirP(path.dirname(p), opts, function (er, made) {
	                    if (er) cb(er, made);
	                    else mkdirP(p, opts, cb, made);
	                });
	                break;

	            // In the case of any other error, just see if there's a dir
	            // there already.  If so, then hooray!  If not, then something
	            // is borked.
	            default:
	                xfs.stat(p, function (er2, stat) {
	                    // if the stat fails, then that's super weird.
	                    // let the original error be the failure reason.
	                    if (er2 || !stat.isDirectory()) cb(er, made)
	                    else cb(null, made);
	                });
	                break;
	        }
	    });
	}

	mkdirP.sync = function sync (p, opts, made) {
	    if (!opts || typeof opts !== 'object') {
	        opts = { mode: opts };
	    }
	    
	    var mode = opts.mode;
	    var xfs = opts.fs || fs;
	    
	    if (mode === undefined) {
	        mode = _0777 & (~process.umask());
	    }
	    if (!made) made = null;

	    p = path.resolve(p);

	    try {
	        xfs.mkdirSync(p, mode);
	        made = made || p;
	    }
	    catch (err0) {
	        switch (err0.code) {
	            case 'ENOENT' :
	                made = sync(path.dirname(p), opts, made);
	                sync(p, opts, made);
	                break;

	            // In the case of any other error, just see if there's a dir
	            // there already.  If so, then hooray!  If not, then something
	            // is borked.
	            default:
	                var stat;
	                try {
	                    stat = xfs.statSync(p);
	                }
	                catch (err1) {
	                    throw err0;
	                }
	                if (!stat.isDirectory()) throw err0;
	                break;
	        }
	    }

	    return made;
	};


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var Base = __webpack_require__(10);
	var utils = __webpack_require__(14);

	/**
	 * Constants
	 */

	var SUITE_PREFIX = '$';

	/**
	 * Expose `Markdown`.
	 */

	exports = module.exports = Markdown;

	/**
	 * Initialize a new `Markdown` reporter.
	 *
	 * @api public
	 * @param {Runner} runner
	 */
	function Markdown(runner) {
	  Base.call(this, runner);

	  var level = 0;
	  var buf = '';

	  function title(str) {
	    return Array(level).join('#') + ' ' + str;
	  }

	  function mapTOC(suite, obj) {
	    var ret = obj;
	    var key = SUITE_PREFIX + suite.title;

	    obj = obj[key] = obj[key] || { suite: suite };
	    suite.suites.forEach(function(suite) {
	      mapTOC(suite, obj);
	    });

	    return ret;
	  }

	  function stringifyTOC(obj, level) {
	    ++level;
	    var buf = '';
	    var link;
	    for (var key in obj) {
	      if (key === 'suite') {
	        continue;
	      }
	      if (key !== SUITE_PREFIX) {
	        link = ' - [' + key.substring(1) + ']';
	        link += '(#' + utils.slug(obj[key].suite.fullTitle()) + ')\n';
	        buf += Array(level).join('  ') + link;
	      }
	      buf += stringifyTOC(obj[key], level);
	    }
	    return buf;
	  }

	  function generateTOC(suite) {
	    var obj = mapTOC(suite, {});
	    return stringifyTOC(obj, 0);
	  }

	  generateTOC(runner.suite);

	  runner.on('suite', function(suite) {
	    ++level;
	    var slug = utils.slug(suite.fullTitle());
	    buf += '<a name="' + slug + '"></a>' + '\n';
	    buf += title(suite.title) + '\n';
	  });

	  runner.on('suite end', function() {
	    --level;
	  });

	  runner.on('pass', function(test) {
	    var code = utils.clean(test.body);
	    buf += test.title + '.\n';
	    buf += '\n```js\n';
	    buf += code + '\n';
	    buf += '```\n\n';
	  });

	  runner.on('end', function() {
	    process.stdout.write('# TOC\n');
	    process.stdout.write(generateTOC(runner.suite));
	    process.stdout.write(buf);
	  });
	}


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var Base = __webpack_require__(10);
	var inherits = __webpack_require__(14).inherits;
	var color = Base.color;
	var cursor = Base.cursor;

	/**
	 * Expose `Progress`.
	 */

	exports = module.exports = Progress;

	/**
	 * General progress bar color.
	 */

	Base.colors.progress = 90;

	/**
	 * Initialize a new `Progress` bar test reporter.
	 *
	 * @api public
	 * @param {Runner} runner
	 * @param {Object} options
	 */
	function Progress(runner, options) {
	  Base.call(this, runner);

	  var self = this;
	  var width = Base.window.width * .50 | 0;
	  var total = runner.total;
	  var complete = 0;
	  var lastN = -1;

	  // default chars
	  options = options || {};
	  options.open = options.open || '[';
	  options.complete = options.complete || '▬';
	  options.incomplete = options.incomplete || Base.symbols.dot;
	  options.close = options.close || ']';
	  options.verbose = false;

	  // tests started
	  runner.on('start', function() {
	    console.log();
	    cursor.hide();
	  });

	  // tests complete
	  runner.on('test end', function() {
	    complete++;

	    var percent = complete / total;
	    var n = width * percent | 0;
	    var i = width - n;

	    if (n === lastN && !options.verbose) {
	      // Don't re-render the line if it hasn't changed
	      return;
	    }
	    lastN = n;

	    cursor.CR();
	    process.stdout.write('\u001b[J');
	    process.stdout.write(color('progress', '  ' + options.open));
	    process.stdout.write(Array(n).join(options.complete));
	    process.stdout.write(Array(i).join(options.incomplete));
	    process.stdout.write(color('progress', options.close));
	    if (options.verbose) {
	      process.stdout.write(color('progress', ' ' + complete + ' of ' + total));
	    }
	  });

	  // tests are complete, output some stats
	  // and the failures if any
	  runner.on('end', function() {
	    cursor.show();
	    console.log();
	    self.epilogue();
	  });
	}

	/**
	 * Inherit from `Base.prototype`.
	 */
	inherits(Progress, Base);


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var Base = __webpack_require__(10);
	var inherits = __webpack_require__(14).inherits;
	var cursor = Base.cursor;
	var color = Base.color;

	/**
	 * Expose `Landing`.
	 */

	exports = module.exports = Landing;

	/**
	 * Airplane color.
	 */

	Base.colors.plane = 0;

	/**
	 * Airplane crash color.
	 */

	Base.colors['plane crash'] = 31;

	/**
	 * Runway color.
	 */

	Base.colors.runway = 90;

	/**
	 * Initialize a new `Landing` reporter.
	 *
	 * @api public
	 * @param {Runner} runner
	 */
	function Landing(runner) {
	  Base.call(this, runner);

	  var self = this;
	  var width = Base.window.width * .75 | 0;
	  var total = runner.total;
	  var stream = process.stdout;
	  var plane = color('plane', '✈');
	  var crashed = -1;
	  var n = 0;

	  function runway() {
	    var buf = Array(width).join('-');
	    return '  ' + color('runway', buf);
	  }

	  runner.on('start', function() {
	    stream.write('\n\n\n  ');
	    cursor.hide();
	  });

	  runner.on('test end', function(test) {
	    // check if the plane crashed
	    var col = crashed === -1 ? width * ++n / total | 0 : crashed;

	    // show the crash
	    if (test.state === 'failed') {
	      plane = color('plane crash', '✈');
	      crashed = col;
	    }

	    // render landing strip
	    stream.write('\u001b[' + (width + 1) + 'D\u001b[2A');
	    stream.write(runway());
	    stream.write('\n  ');
	    stream.write(color('runway', Array(col).join('⋅')));
	    stream.write(plane);
	    stream.write(color('runway', Array(width - col).join('⋅') + '\n'));
	    stream.write(runway());
	    stream.write('\u001b[0m');
	  });

	  runner.on('end', function() {
	    cursor.show();
	    console.log();
	    self.epilogue();
	  });
	}

	/**
	 * Inherit from `Base.prototype`.
	 */
	inherits(Landing, Base);


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var Base = __webpack_require__(10);

	/**
	 * Expose `JSONCov`.
	 */

	exports = module.exports = JSONCov;

	/**
	 * Initialize a new `JsCoverage` reporter.
	 *
	 * @api public
	 * @param {Runner} runner
	 * @param {boolean} output
	 */
	function JSONCov(runner, output) {
	  Base.call(this, runner);

	  output = arguments.length === 1 || output;
	  var self = this;
	  var tests = [];
	  var failures = [];
	  var passes = [];

	  runner.on('test end', function(test) {
	    tests.push(test);
	  });

	  runner.on('pass', function(test) {
	    passes.push(test);
	  });

	  runner.on('fail', function(test) {
	    failures.push(test);
	  });

	  runner.on('end', function() {
	    var cov = global._$jscoverage || {};
	    var result = self.cov = map(cov);
	    result.stats = self.stats;
	    result.tests = tests.map(clean);
	    result.failures = failures.map(clean);
	    result.passes = passes.map(clean);
	    if (!output) {
	      return;
	    }
	    process.stdout.write(JSON.stringify(result, null, 2));
	  });
	}

	/**
	 * Map jscoverage data to a JSON structure
	 * suitable for reporting.
	 *
	 * @api private
	 * @param {Object} cov
	 * @return {Object}
	 */

	function map(cov) {
	  var ret = {
	    instrumentation: 'node-jscoverage',
	    sloc: 0,
	    hits: 0,
	    misses: 0,
	    coverage: 0,
	    files: []
	  };

	  for (var filename in cov) {
	    if (Object.prototype.hasOwnProperty.call(cov, filename)) {
	      var data = coverage(filename, cov[filename]);
	      ret.files.push(data);
	      ret.hits += data.hits;
	      ret.misses += data.misses;
	      ret.sloc += data.sloc;
	    }
	  }

	  ret.files.sort(function(a, b) {
	    return a.filename.localeCompare(b.filename);
	  });

	  if (ret.sloc > 0) {
	    ret.coverage = (ret.hits / ret.sloc) * 100;
	  }

	  return ret;
	}

	/**
	 * Map jscoverage data for a single source file
	 * to a JSON structure suitable for reporting.
	 *
	 * @api private
	 * @param {string} filename name of the source file
	 * @param {Object} data jscoverage coverage data
	 * @return {Object}
	 */
	function coverage(filename, data) {
	  var ret = {
	    filename: filename,
	    coverage: 0,
	    hits: 0,
	    misses: 0,
	    sloc: 0,
	    source: {}
	  };

	  data.source.forEach(function(line, num) {
	    num++;

	    if (data[num] === 0) {
	      ret.misses++;
	      ret.sloc++;
	    } else if (data[num] !== undefined) {
	      ret.hits++;
	      ret.sloc++;
	    }

	    ret.source[num] = {
	      source: line,
	      coverage: data[num] === undefined ? '' : data[num]
	    };
	  });

	  ret.coverage = ret.hits / ret.sloc * 100;

	  return ret;
	}

	/**
	 * Return a plain-object representation of `test`
	 * free of cyclic properties etc.
	 *
	 * @api private
	 * @param {Object} test
	 * @return {Object}
	 */
	function clean(test) {
	  return {
	    duration: test.duration,
	    currentRetry: test.currentRetry(),
	    fullTitle: test.fullTitle(),
	    title: test.title
	  };
	}


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {/**
	 * Module dependencies.
	 */

	var JSONCov = __webpack_require__(54);
	var readFileSync = __webpack_require__(19).readFileSync;
	var join = __webpack_require__(8).join;

	/**
	 * Expose `HTMLCov`.
	 */

	exports = module.exports = HTMLCov;

	/**
	 * Initialize a new `JsCoverage` reporter.
	 *
	 * @api public
	 * @param {Runner} runner
	 */
	function HTMLCov(runner) {
	  var jade = __webpack_require__(56);
	  var file = join(__dirname, '/templates/coverage.jade');
	  var str = readFileSync(file, 'utf8');
	  var fn = jade.compile(str, { filename: file });
	  var self = this;

	  JSONCov.call(this, runner, false);

	  runner.on('end', function() {
	    process.stdout.write(fn({
	      cov: self.cov,
	      coverageClass: coverageClass
	    }));
	  });
	}

	/**
	 * Return coverage class for a given coverage percentage.
	 *
	 * @api private
	 * @param {number} coveragePctg
	 * @return {string}
	 */
	function coverageClass(coveragePctg) {
	  if (coveragePctg >= 75) {
	    return 'high';
	  }
	  if (coveragePctg >= 50) {
	    return 'medium';
	  }
	  if (coveragePctg >= 25) {
	    return 'low';
	  }
	  return 'terrible';
	}

	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	
	module.exports = process.env.JADE_COV
	  ? __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./lib-cov/jade\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	  : __webpack_require__(57);

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Jade
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */

	/**
	 * Module dependencies.
	 */

	var Parser = __webpack_require__(58)
	  , Lexer = __webpack_require__(59)
	  , Compiler = __webpack_require__(76)
	  , runtime = __webpack_require__(80)
	// if node
	  , fs = __webpack_require__(19);
	// end

	/**
	 * Library version.
	 */

	exports.version = '0.26.3';

	/**
	 * Expose self closing tags.
	 */

	exports.selfClosing = __webpack_require__(79);

	/**
	 * Default supported doctypes.
	 */

	exports.doctypes = __webpack_require__(78);

	/**
	 * Text filters.
	 */

	exports.filters = __webpack_require__(77);

	/**
	 * Utilities.
	 */

	exports.utils = __webpack_require__(81);

	/**
	 * Expose `Compiler`.
	 */

	exports.Compiler = Compiler;

	/**
	 * Expose `Parser`.
	 */

	exports.Parser = Parser;

	/**
	 * Expose `Lexer`.
	 */

	exports.Lexer = Lexer;

	/**
	 * Nodes.
	 */

	exports.nodes = __webpack_require__(60);

	/**
	 * Jade runtime helpers.
	 */

	exports.runtime = runtime;

	/**
	 * Template function cache.
	 */

	exports.cache = {};

	/**
	 * Parse the given `str` of jade and return a function body.
	 *
	 * @param {String} str
	 * @param {Object} options
	 * @return {String}
	 * @api private
	 */

	function parse(str, options){
	  try {
	    // Parse
	    var parser = new Parser(str, options.filename, options);

	    // Compile
	    var compiler = new (options.compiler || Compiler)(parser.parse(), options)
	      , js = compiler.compile();

	    // Debug compiler
	    if (options.debug) {
	      console.error('\nCompiled Function:\n\n\033[90m%s\033[0m', js.replace(/^/gm, '  '));
	    }

	    return ''
	      + 'var buf = [];\n'
	      + (options.self
	        ? 'var self = locals || {};\n' + js
	        : 'with (locals || {}) {\n' + js + '\n}\n')
	      + 'return buf.join("");';
	  } catch (err) {
	    parser = parser.context();
	    runtime.rethrow(err, parser.filename, parser.lexer.lineno);
	  }
	}

	/**
	 * Compile a `Function` representation of the given jade `str`.
	 *
	 * Options:
	 *
	 *   - `compileDebug` when `false` debugging code is stripped from the compiled template
	 *   - `client` when `true` the helper functions `escape()` etc will reference `jade.escape()`
	 *      for use with the Jade client-side runtime.js
	 *
	 * @param {String} str
	 * @param {Options} options
	 * @return {Function}
	 * @api public
	 */

	exports.compile = function(str, options){
	  var options = options || {}
	    , client = options.client
	    , filename = options.filename
	      ? JSON.stringify(options.filename)
	      : 'undefined'
	    , fn;

	  if (options.compileDebug !== false) {
	    fn = [
	        'var __jade = [{ lineno: 1, filename: ' + filename + ' }];'
	      , 'try {'
	      , parse(String(str), options)
	      , '} catch (err) {'
	      , '  rethrow(err, __jade[0].filename, __jade[0].lineno);'
	      , '}'
	    ].join('\n');
	  } else {
	    fn = parse(String(str), options);
	  }

	  if (client) {
	    fn = 'attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;\n' + fn;
	  }

	  fn = new Function('locals, attrs, escape, rethrow, merge', fn);

	  if (client) return fn;

	  return function(locals){
	    return fn(locals, runtime.attrs, runtime.escape, runtime.rethrow, runtime.merge);
	  };
	};

	/**
	 * Render the given `str` of jade and invoke
	 * the callback `fn(err, str)`.
	 *
	 * Options:
	 *
	 *   - `cache` enable template caching
	 *   - `filename` filename required for `include` / `extends` and caching
	 *
	 * @param {String} str
	 * @param {Object|Function} options or fn
	 * @param {Function} fn
	 * @api public
	 */

	exports.render = function(str, options, fn){
	  // swap args
	  if ('function' == typeof options) {
	    fn = options, options = {};
	  }

	  // cache requires .filename
	  if (options.cache && !options.filename) {
	    return fn(new Error('the "filename" option is required for caching'));
	  }

	  try {
	    var path = options.filename;
	    var tmpl = options.cache
	      ? exports.cache[path] || (exports.cache[path] = exports.compile(str, options))
	      : exports.compile(str, options);
	    fn(null, tmpl(options));
	  } catch (err) {
	    fn(err);
	  }
	};

	/**
	 * Render a Jade file at the given `path` and callback `fn(err, str)`.
	 *
	 * @param {String} path
	 * @param {Object|Function} options or callback
	 * @param {Function} fn
	 * @api public
	 */

	exports.renderFile = function(path, options, fn){
	  var key = path + ':string';

	  if ('function' == typeof options) {
	    fn = options, options = {};
	  }

	  try {
	    options.filename = path;
	    var str = options.cache
	      ? exports.cache[key] || (exports.cache[key] = fs.readFileSync(path, 'utf8'))
	      : fs.readFileSync(path, 'utf8');
	    exports.render(str, options, fn);
	  } catch (err) {
	    fn(err);
	  }
	};

	/**
	 * Express support.
	 */

	exports.__express = exports.renderFile;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	
	/*!
	 * Jade - Parser
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */

	/**
	 * Module dependencies.
	 */

	var Lexer = __webpack_require__(59)
	  , nodes = __webpack_require__(60);

	/**
	 * Initialize `Parser` with the given input `str` and `filename`.
	 *
	 * @param {String} str
	 * @param {String} filename
	 * @param {Object} options
	 * @api public
	 */

	var Parser = exports = module.exports = function Parser(str, filename, options){
	  this.input = str;
	  this.lexer = new Lexer(str, options);
	  this.filename = filename;
	  this.blocks = {};
	  this.mixins = {};
	  this.options = options;
	  this.contexts = [this];
	};

	/**
	 * Tags that may not contain tags.
	 */

	var textOnly = exports.textOnly = ['script', 'style'];

	/**
	 * Parser prototype.
	 */

	Parser.prototype = {

	  /**
	   * Push `parser` onto the context stack,
	   * or pop and return a `Parser`.
	   */

	  context: function(parser){
	    if (parser) {
	      this.contexts.push(parser);
	    } else {
	      return this.contexts.pop();
	    }
	  },

	  /**
	   * Return the next token object.
	   *
	   * @return {Object}
	   * @api private
	   */

	  advance: function(){
	    return this.lexer.advance();
	  },

	  /**
	   * Skip `n` tokens.
	   *
	   * @param {Number} n
	   * @api private
	   */

	  skip: function(n){
	    while (n--) this.advance();
	  },
	  
	  /**
	   * Single token lookahead.
	   *
	   * @return {Object}
	   * @api private
	   */
	  
	  peek: function() {
	    return this.lookahead(1);
	  },
	  
	  /**
	   * Return lexer lineno.
	   *
	   * @return {Number}
	   * @api private
	   */
	  
	  line: function() {
	    return this.lexer.lineno;
	  },
	  
	  /**
	   * `n` token lookahead.
	   *
	   * @param {Number} n
	   * @return {Object}
	   * @api private
	   */
	  
	  lookahead: function(n){
	    return this.lexer.lookahead(n);
	  },
	  
	  /**
	   * Parse input returning a string of js for evaluation.
	   *
	   * @return {String}
	   * @api public
	   */
	  
	  parse: function(){
	    var block = new nodes.Block, parser;
	    block.line = this.line();

	    while ('eos' != this.peek().type) {
	      if ('newline' == this.peek().type) {
	        this.advance();
	      } else {
	        block.push(this.parseExpr());
	      }
	    }

	    if (parser = this.extending) {
	      this.context(parser);
	      var ast = parser.parse();
	      this.context();
	      // hoist mixins
	      for (var name in this.mixins)
	        ast.unshift(this.mixins[name]);
	      return ast;
	    }

	    return block;
	  },
	  
	  /**
	   * Expect the given type, or throw an exception.
	   *
	   * @param {String} type
	   * @api private
	   */
	  
	  expect: function(type){
	    if (this.peek().type === type) {
	      return this.advance();
	    } else {
	      throw new Error('expected "' + type + '", but got "' + this.peek().type + '"');
	    }
	  },
	  
	  /**
	   * Accept the given `type`.
	   *
	   * @param {String} type
	   * @api private
	   */
	  
	  accept: function(type){
	    if (this.peek().type === type) {
	      return this.advance();
	    }
	  },
	  
	  /**
	   *   tag
	   * | doctype
	   * | mixin
	   * | include
	   * | filter
	   * | comment
	   * | text
	   * | each
	   * | code
	   * | yield
	   * | id
	   * | class
	   * | interpolation
	   */
	  
	  parseExpr: function(){
	    switch (this.peek().type) {
	      case 'tag':
	        return this.parseTag();
	      case 'mixin':
	        return this.parseMixin();
	      case 'block':
	        return this.parseBlock();
	      case 'case':
	        return this.parseCase();
	      case 'when':
	        return this.parseWhen();
	      case 'default':
	        return this.parseDefault();
	      case 'extends':
	        return this.parseExtends();
	      case 'include':
	        return this.parseInclude();
	      case 'doctype':
	        return this.parseDoctype();
	      case 'filter':
	        return this.parseFilter();
	      case 'comment':
	        return this.parseComment();
	      case 'text':
	        return this.parseText();
	      case 'each':
	        return this.parseEach();
	      case 'code':
	        return this.parseCode();
	      case 'call':
	        return this.parseCall();
	      case 'interpolation':
	        return this.parseInterpolation();
	      case 'yield':
	        this.advance();
	        var block = new nodes.Block;
	        block.yield = true;
	        return block;
	      case 'id':
	      case 'class':
	        var tok = this.advance();
	        this.lexer.defer(this.lexer.tok('tag', 'div'));
	        this.lexer.defer(tok);
	        return this.parseExpr();
	      default:
	        throw new Error('unexpected token "' + this.peek().type + '"');
	    }
	  },
	  
	  /**
	   * Text
	   */
	  
	  parseText: function(){
	    var tok = this.expect('text')
	      , node = new nodes.Text(tok.val);
	    node.line = this.line();
	    return node;
	  },

	  /**
	   *   ':' expr
	   * | block
	   */

	  parseBlockExpansion: function(){
	    if (':' == this.peek().type) {
	      this.advance();
	      return new nodes.Block(this.parseExpr());
	    } else {
	      return this.block();
	    }
	  },

	  /**
	   * case
	   */

	  parseCase: function(){
	    var val = this.expect('case').val
	      , node = new nodes.Case(val);
	    node.line = this.line();
	    node.block = this.block();
	    return node;
	  },

	  /**
	   * when
	   */

	  parseWhen: function(){
	    var val = this.expect('when').val
	    return new nodes.Case.When(val, this.parseBlockExpansion());
	  },
	  
	  /**
	   * default
	   */

	  parseDefault: function(){
	    this.expect('default');
	    return new nodes.Case.When('default', this.parseBlockExpansion());
	  },

	  /**
	   * code
	   */
	  
	  parseCode: function(){
	    var tok = this.expect('code')
	      , node = new nodes.Code(tok.val, tok.buffer, tok.escape)
	      , block
	      , i = 1;
	    node.line = this.line();
	    while (this.lookahead(i) && 'newline' == this.lookahead(i).type) ++i;
	    block = 'indent' == this.lookahead(i).type;
	    if (block) {
	      this.skip(i-1);
	      node.block = this.block();
	    }
	    return node;
	  },
	  
	  /**
	   * comment
	   */
	  
	  parseComment: function(){
	    var tok = this.expect('comment')
	      , node;

	    if ('indent' == this.peek().type) {
	      node = new nodes.BlockComment(tok.val, this.block(), tok.buffer);
	    } else {
	      node = new nodes.Comment(tok.val, tok.buffer);
	    }

	    node.line = this.line();
	    return node;
	  },
	  
	  /**
	   * doctype
	   */
	  
	  parseDoctype: function(){
	    var tok = this.expect('doctype')
	      , node = new nodes.Doctype(tok.val);
	    node.line = this.line();
	    return node;
	  },
	  
	  /**
	   * filter attrs? text-block
	   */
	  
	  parseFilter: function(){
	    var block
	      , tok = this.expect('filter')
	      , attrs = this.accept('attrs');

	    this.lexer.pipeless = true;
	    block = this.parseTextBlock();
	    this.lexer.pipeless = false;

	    var node = new nodes.Filter(tok.val, block, attrs && attrs.attrs);
	    node.line = this.line();
	    return node;
	  },
	  
	  /**
	   * tag ':' attrs? block
	   */
	  
	  parseASTFilter: function(){
	    var block
	      , tok = this.expect('tag')
	      , attrs = this.accept('attrs');

	    this.expect(':');
	    block = this.block();

	    var node = new nodes.Filter(tok.val, block, attrs && attrs.attrs);
	    node.line = this.line();
	    return node;
	  },
	  
	  /**
	   * each block
	   */
	  
	  parseEach: function(){
	    var tok = this.expect('each')
	      , node = new nodes.Each(tok.code, tok.val, tok.key);
	    node.line = this.line();
	    node.block = this.block();
	    return node;
	  },

	  /**
	   * 'extends' name
	   */

	  parseExtends: function(){
	    var path = __webpack_require__(8)
	      , fs = __webpack_require__(19)
	      , dirname = path.dirname
	      , basename = path.basename
	      , join = path.join;

	    if (!this.filename)
	      throw new Error('the "filename" option is required to extend templates');

	    var path = this.expect('extends').val.trim()
	      , dir = dirname(this.filename);

	    var path = join(dir, path + '.jade')
	      , str = fs.readFileSync(path, 'utf8')
	      , parser = new Parser(str, path, this.options);

	    parser.blocks = this.blocks;
	    parser.contexts = this.contexts;
	    this.extending = parser;

	    // TODO: null node
	    return new nodes.Literal('');
	  },

	  /**
	   * 'block' name block
	   */

	  parseBlock: function(){
	    var block = this.expect('block')
	      , mode = block.mode
	      , name = block.val.trim();

	    block = 'indent' == this.peek().type
	      ? this.block()
	      : new nodes.Block(new nodes.Literal(''));

	    var prev = this.blocks[name];

	    if (prev) {
	      switch (prev.mode) {
	        case 'append':
	          block.nodes = block.nodes.concat(prev.nodes);
	          prev = block;
	          break;
	        case 'prepend':
	          block.nodes = prev.nodes.concat(block.nodes);
	          prev = block;
	          break;
	      }
	    }

	    block.mode = mode;
	    return this.blocks[name] = prev || block;
	  },

	  /**
	   * include block?
	   */

	  parseInclude: function(){
	    var path = __webpack_require__(8)
	      , fs = __webpack_require__(19)
	      , dirname = path.dirname
	      , basename = path.basename
	      , join = path.join;

	    var path = this.expect('include').val.trim()
	      , dir = dirname(this.filename);

	    if (!this.filename)
	      throw new Error('the "filename" option is required to use includes');

	    // no extension
	    if (!~basename(path).indexOf('.')) {
	      path += '.jade';
	    }

	    // non-jade
	    if ('.jade' != path.substr(-5)) {
	      var path = join(dir, path)
	        , str = fs.readFileSync(path, 'utf8');
	      return new nodes.Literal(str);
	    }

	    var path = join(dir, path)
	      , str = fs.readFileSync(path, 'utf8')
	     , parser = new Parser(str, path, this.options);
	    parser.blocks = this.blocks;
	    parser.mixins = this.mixins;

	    this.context(parser);
	    var ast = parser.parse();
	    this.context();
	    ast.filename = path;

	    if ('indent' == this.peek().type) {
	      ast.includeBlock().push(this.block());
	    }

	    return ast;
	  },

	  /**
	   * call ident block
	   */

	  parseCall: function(){
	    var tok = this.expect('call')
	      , name = tok.val
	      , args = tok.args
	      , mixin = new nodes.Mixin(name, args, new nodes.Block, true);

	    this.tag(mixin);
	    if (mixin.block.isEmpty()) mixin.block = null;
	    return mixin;
	  },

	  /**
	   * mixin block
	   */

	  parseMixin: function(){
	    var tok = this.expect('mixin')
	      , name = tok.val
	      , args = tok.args
	      , mixin;

	    // definition
	    if ('indent' == this.peek().type) {
	      mixin = new nodes.Mixin(name, args, this.block(), false);
	      this.mixins[name] = mixin;
	      return mixin;
	    // call
	    } else {
	      return new nodes.Mixin(name, args, null, true);
	    }
	  },

	  /**
	   * indent (text | newline)* outdent
	   */

	  parseTextBlock: function(){
	    var block = new nodes.Block;
	    block.line = this.line();
	    var spaces = this.expect('indent').val;
	    if (null == this._spaces) this._spaces = spaces;
	    var indent = Array(spaces - this._spaces + 1).join(' ');
	    while ('outdent' != this.peek().type) {
	      switch (this.peek().type) {
	        case 'newline':
	          this.advance();
	          break;
	        case 'indent':
	          this.parseTextBlock().nodes.forEach(function(node){
	            block.push(node);
	          });
	          break;
	        default:
	          var text = new nodes.Text(indent + this.advance().val);
	          text.line = this.line();
	          block.push(text);
	      }
	    }

	    if (spaces == this._spaces) this._spaces = null;
	    this.expect('outdent');
	    return block;
	  },

	  /**
	   * indent expr* outdent
	   */
	  
	  block: function(){
	    var block = new nodes.Block;
	    block.line = this.line();
	    this.expect('indent');
	    while ('outdent' != this.peek().type) {
	      if ('newline' == this.peek().type) {
	        this.advance();
	      } else {
	        block.push(this.parseExpr());
	      }
	    }
	    this.expect('outdent');
	    return block;
	  },

	  /**
	   * interpolation (attrs | class | id)* (text | code | ':')? newline* block?
	   */
	  
	  parseInterpolation: function(){
	    var tok = this.advance();
	    var tag = new nodes.Tag(tok.val);
	    tag.buffer = true;
	    return this.tag(tag);
	  },

	  /**
	   * tag (attrs | class | id)* (text | code | ':')? newline* block?
	   */
	  
	  parseTag: function(){
	    // ast-filter look-ahead
	    var i = 2;
	    if ('attrs' == this.lookahead(i).type) ++i;
	    if (':' == this.lookahead(i).type) {
	      if ('indent' == this.lookahead(++i).type) {
	        return this.parseASTFilter();
	      }
	    }

	    var tok = this.advance()
	      , tag = new nodes.Tag(tok.val);

	    tag.selfClosing = tok.selfClosing;

	    return this.tag(tag);
	  },

	  /**
	   * Parse tag.
	   */

	  tag: function(tag){
	    var dot;

	    tag.line = this.line();

	    // (attrs | class | id)*
	    out:
	      while (true) {
	        switch (this.peek().type) {
	          case 'id':
	          case 'class':
	            var tok = this.advance();
	            tag.setAttribute(tok.type, "'" + tok.val + "'");
	            continue;
	          case 'attrs':
	            var tok = this.advance()
	              , obj = tok.attrs
	              , escaped = tok.escaped
	              , names = Object.keys(obj);

	            if (tok.selfClosing) tag.selfClosing = true;

	            for (var i = 0, len = names.length; i < len; ++i) {
	              var name = names[i]
	                , val = obj[name];
	              tag.setAttribute(name, val, escaped[name]);
	            }
	            continue;
	          default:
	            break out;
	        }
	      }

	    // check immediate '.'
	    if ('.' == this.peek().val) {
	      dot = tag.textOnly = true;
	      this.advance();
	    }

	    // (text | code | ':')?
	    switch (this.peek().type) {
	      case 'text':
	        tag.block.push(this.parseText());
	        break;
	      case 'code':
	        tag.code = this.parseCode();
	        break;
	      case ':':
	        this.advance();
	        tag.block = new nodes.Block;
	        tag.block.push(this.parseExpr());
	        break;
	    }

	    // newline*
	    while ('newline' == this.peek().type) this.advance();

	    tag.textOnly = tag.textOnly || ~textOnly.indexOf(tag.name);

	    // script special-case
	    if ('script' == tag.name) {
	      var type = tag.getAttribute('type');
	      if (!dot && type && 'text/javascript' != type.replace(/^['"]|['"]$/g, '')) {
	        tag.textOnly = false;
	      }
	    }

	    // block?
	    if ('indent' == this.peek().type) {
	      if (tag.textOnly) {
	        this.lexer.pipeless = true;
	        tag.block = this.parseTextBlock();
	        this.lexer.pipeless = false;
	      } else {
	        var block = this.block();
	        if (tag.block) {
	          for (var i = 0, len = block.nodes.length; i < len; ++i) {
	            tag.block.push(block.nodes[i]);
	          }
	        } else {
	          tag.block = block;
	        }
	      }
	    }
	    
	    return tag;
	  }
	};


/***/ },
/* 59 */
/***/ function(module, exports) {

	
	/*!
	 * Jade - Lexer
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */

	/**
	 * Initialize `Lexer` with the given `str`.
	 *
	 * Options:
	 *
	 *   - `colons` allow colons for attr delimiters
	 *
	 * @param {String} str
	 * @param {Object} options
	 * @api private
	 */

	var Lexer = module.exports = function Lexer(str, options) {
	  options = options || {};
	  this.input = str.replace(/\r\n|\r/g, '\n');
	  this.colons = options.colons;
	  this.deferredTokens = [];
	  this.lastIndents = 0;
	  this.lineno = 1;
	  this.stash = [];
	  this.indentStack = [];
	  this.indentRe = null;
	  this.pipeless = false;
	};

	/**
	 * Lexer prototype.
	 */

	Lexer.prototype = {
	  
	  /**
	   * Construct a token with the given `type` and `val`.
	   *
	   * @param {String} type
	   * @param {String} val
	   * @return {Object}
	   * @api private
	   */
	  
	  tok: function(type, val){
	    return {
	        type: type
	      , line: this.lineno
	      , val: val
	    }
	  },
	  
	  /**
	   * Consume the given `len` of input.
	   *
	   * @param {Number} len
	   * @api private
	   */
	  
	  consume: function(len){
	    this.input = this.input.substr(len);
	  },
	  
	  /**
	   * Scan for `type` with the given `regexp`.
	   *
	   * @param {String} type
	   * @param {RegExp} regexp
	   * @return {Object}
	   * @api private
	   */
	  
	  scan: function(regexp, type){
	    var captures;
	    if (captures = regexp.exec(this.input)) {
	      this.consume(captures[0].length);
	      return this.tok(type, captures[1]);
	    }
	  },
	  
	  /**
	   * Defer the given `tok`.
	   *
	   * @param {Object} tok
	   * @api private
	   */
	  
	  defer: function(tok){
	    this.deferredTokens.push(tok);
	  },
	  
	  /**
	   * Lookahead `n` tokens.
	   *
	   * @param {Number} n
	   * @return {Object}
	   * @api private
	   */
	  
	  lookahead: function(n){
	    var fetch = n - this.stash.length;
	    while (fetch-- > 0) this.stash.push(this.next());
	    return this.stash[--n];
	  },
	  
	  /**
	   * Return the indexOf `start` / `end` delimiters.
	   *
	   * @param {String} start
	   * @param {String} end
	   * @return {Number}
	   * @api private
	   */
	  
	  indexOfDelimiters: function(start, end){
	    var str = this.input
	      , nstart = 0
	      , nend = 0
	      , pos = 0;
	    for (var i = 0, len = str.length; i < len; ++i) {
	      if (start == str.charAt(i)) {
	        ++nstart;
	      } else if (end == str.charAt(i)) {
	        if (++nend == nstart) {
	          pos = i;
	          break;
	        }
	      }
	    }
	    return pos;
	  },
	  
	  /**
	   * Stashed token.
	   */
	  
	  stashed: function() {
	    return this.stash.length
	      && this.stash.shift();
	  },
	  
	  /**
	   * Deferred token.
	   */
	  
	  deferred: function() {
	    return this.deferredTokens.length 
	      && this.deferredTokens.shift();
	  },
	  
	  /**
	   * end-of-source.
	   */
	  
	  eos: function() {
	    if (this.input.length) return;
	    if (this.indentStack.length) {
	      this.indentStack.shift();
	      return this.tok('outdent');
	    } else {
	      return this.tok('eos');
	    }
	  },

	  /**
	   * Blank line.
	   */
	  
	  blank: function() {
	    var captures;
	    if (captures = /^\n *\n/.exec(this.input)) {
	      this.consume(captures[0].length - 1);
	      if (this.pipeless) return this.tok('text', '');
	      return this.next();
	    }
	  },

	  /**
	   * Comment.
	   */
	  
	  comment: function() {
	    var captures;
	    if (captures = /^ *\/\/(-)?([^\n]*)/.exec(this.input)) {
	      this.consume(captures[0].length);
	      var tok = this.tok('comment', captures[2]);
	      tok.buffer = '-' != captures[1];
	      return tok;
	    }
	  },

	  /**
	   * Interpolated tag.
	   */

	  interpolation: function() {
	    var captures;
	    if (captures = /^#\{(.*?)\}/.exec(this.input)) {
	      this.consume(captures[0].length);
	      return this.tok('interpolation', captures[1]);
	    }
	  },

	  /**
	   * Tag.
	   */
	  
	  tag: function() {
	    var captures;
	    if (captures = /^(\w[-:\w]*)(\/?)/.exec(this.input)) {
	      this.consume(captures[0].length);
	      var tok, name = captures[1];
	      if (':' == name[name.length - 1]) {
	        name = name.slice(0, -1);
	        tok = this.tok('tag', name);
	        this.defer(this.tok(':'));
	        while (' ' == this.input[0]) this.input = this.input.substr(1);
	      } else {
	        tok = this.tok('tag', name);
	      }
	      tok.selfClosing = !! captures[2];
	      return tok;
	    }
	  },
	  
	  /**
	   * Filter.
	   */
	  
	  filter: function() {
	    return this.scan(/^:(\w+)/, 'filter');
	  },
	  
	  /**
	   * Doctype.
	   */
	  
	  doctype: function() {
	    return this.scan(/^(?:!!!|doctype) *([^\n]+)?/, 'doctype');
	  },

	  /**
	   * Id.
	   */
	  
	  id: function() {
	    return this.scan(/^#([\w-]+)/, 'id');
	  },
	  
	  /**
	   * Class.
	   */
	  
	  className: function() {
	    return this.scan(/^\.([\w-]+)/, 'class');
	  },
	  
	  /**
	   * Text.
	   */
	  
	  text: function() {
	    return this.scan(/^(?:\| ?| ?)?([^\n]+)/, 'text');
	  },

	  /**
	   * Extends.
	   */
	  
	  "extends": function() {
	    return this.scan(/^extends? +([^\n]+)/, 'extends');
	  },

	  /**
	   * Block prepend.
	   */
	  
	  prepend: function() {
	    var captures;
	    if (captures = /^prepend +([^\n]+)/.exec(this.input)) {
	      this.consume(captures[0].length);
	      var mode = 'prepend'
	        , name = captures[1]
	        , tok = this.tok('block', name);
	      tok.mode = mode;
	      return tok;
	    }
	  },
	  
	  /**
	   * Block append.
	   */
	  
	  append: function() {
	    var captures;
	    if (captures = /^append +([^\n]+)/.exec(this.input)) {
	      this.consume(captures[0].length);
	      var mode = 'append'
	        , name = captures[1]
	        , tok = this.tok('block', name);
	      tok.mode = mode;
	      return tok;
	    }
	  },

	  /**
	   * Block.
	   */
	  
	  block: function() {
	    var captures;
	    if (captures = /^block\b *(?:(prepend|append) +)?([^\n]*)/.exec(this.input)) {
	      this.consume(captures[0].length);
	      var mode = captures[1] || 'replace'
	        , name = captures[2]
	        , tok = this.tok('block', name);

	      tok.mode = mode;
	      return tok;
	    }
	  },

	  /**
	   * Yield.
	   */
	  
	  yield: function() {
	    return this.scan(/^yield */, 'yield');
	  },

	  /**
	   * Include.
	   */
	  
	  include: function() {
	    return this.scan(/^include +([^\n]+)/, 'include');
	  },

	  /**
	   * Case.
	   */
	  
	  "case": function() {
	    return this.scan(/^case +([^\n]+)/, 'case');
	  },

	  /**
	   * When.
	   */
	  
	  when: function() {
	    return this.scan(/^when +([^:\n]+)/, 'when');
	  },

	  /**
	   * Default.
	   */
	  
	  "default": function() {
	    return this.scan(/^default */, 'default');
	  },

	  /**
	   * Assignment.
	   */
	  
	  assignment: function() {
	    var captures;
	    if (captures = /^(\w+) += *([^;\n]+)( *;? *)/.exec(this.input)) {
	      this.consume(captures[0].length);
	      var name = captures[1]
	        , val = captures[2];
	      return this.tok('code', 'var ' + name + ' = (' + val + ');');
	    }
	  },

	  /**
	   * Call mixin.
	   */
	  
	  call: function(){
	    var captures;
	    if (captures = /^\+([-\w]+)/.exec(this.input)) {
	      this.consume(captures[0].length);
	      var tok = this.tok('call', captures[1]);
	      
	      // Check for args (not attributes)
	      if (captures = /^ *\((.*?)\)/.exec(this.input)) {
	        if (!/^ *[-\w]+ *=/.test(captures[1])) {
	          this.consume(captures[0].length);
	          tok.args = captures[1];
	        }
	      }
	      
	      return tok;
	    }
	  },

	  /**
	   * Mixin.
	   */

	  mixin: function(){
	    var captures;
	    if (captures = /^mixin +([-\w]+)(?: *\((.*)\))?/.exec(this.input)) {
	      this.consume(captures[0].length);
	      var tok = this.tok('mixin', captures[1]);
	      tok.args = captures[2];
	      return tok;
	    }
	  },

	  /**
	   * Conditional.
	   */
	  
	  conditional: function() {
	    var captures;
	    if (captures = /^(if|unless|else if|else)\b([^\n]*)/.exec(this.input)) {
	      this.consume(captures[0].length);
	      var type = captures[1]
	        , js = captures[2];

	      switch (type) {
	        case 'if': js = 'if (' + js + ')'; break;
	        case 'unless': js = 'if (!(' + js + '))'; break;
	        case 'else if': js = 'else if (' + js + ')'; break;
	        case 'else': js = 'else'; break;
	      }

	      return this.tok('code', js);
	    }
	  },

	  /**
	   * While.
	   */
	  
	  "while": function() {
	    var captures;
	    if (captures = /^while +([^\n]+)/.exec(this.input)) {
	      this.consume(captures[0].length);
	      return this.tok('code', 'while (' + captures[1] + ')');
	    }
	  },

	  /**
	   * Each.
	   */
	  
	  each: function() {
	    var captures;
	    if (captures = /^(?:- *)?(?:each|for) +(\w+)(?: *, *(\w+))? * in *([^\n]+)/.exec(this.input)) {
	      this.consume(captures[0].length);
	      var tok = this.tok('each', captures[1]);
	      tok.key = captures[2] || '$index';
	      tok.code = captures[3];
	      return tok;
	    }
	  },
	  
	  /**
	   * Code.
	   */
	  
	  code: function() {
	    var captures;
	    if (captures = /^(!?=|-)([^\n]+)/.exec(this.input)) {
	      this.consume(captures[0].length);
	      var flags = captures[1];
	      captures[1] = captures[2];
	      var tok = this.tok('code', captures[1]);
	      tok.escape = flags[0] === '=';
	      tok.buffer = flags[0] === '=' || flags[1] === '=';
	      return tok;
	    }
	  },
	  
	  /**
	   * Attributes.
	   */
	  
	  attrs: function() {
	    if ('(' == this.input.charAt(0)) {
	      var index = this.indexOfDelimiters('(', ')')
	        , str = this.input.substr(1, index-1)
	        , tok = this.tok('attrs')
	        , len = str.length
	        , colons = this.colons
	        , states = ['key']
	        , escapedAttr
	        , key = ''
	        , val = ''
	        , quote
	        , c
	        , p;

	      function state(){
	        return states[states.length - 1];
	      }

	      function interpolate(attr) {
	        return attr.replace(/#\{([^}]+)\}/g, function(_, expr){
	          return quote + " + (" + expr + ") + " + quote;
	        });
	      }

	      this.consume(index + 1);
	      tok.attrs = {};
	      tok.escaped = {};

	      function parse(c) {
	        var real = c;
	        // TODO: remove when people fix ":"
	        if (colons && ':' == c) c = '=';
	        switch (c) {
	          case ',':
	          case '\n':
	            switch (state()) {
	              case 'expr':
	              case 'array':
	              case 'string':
	              case 'object':
	                val += c;
	                break;
	              default:
	                states.push('key');
	                val = val.trim();
	                key = key.trim();
	                if ('' == key) return;
	                key = key.replace(/^['"]|['"]$/g, '').replace('!', '');
	                tok.escaped[key] = escapedAttr;
	                tok.attrs[key] = '' == val
	                  ? true
	                  : interpolate(val);
	                key = val = '';
	            }
	            break;
	          case '=':
	            switch (state()) {
	              case 'key char':
	                key += real;
	                break;
	              case 'val':
	              case 'expr':
	              case 'array':
	              case 'string':
	              case 'object':
	                val += real;
	                break;
	              default:
	                escapedAttr = '!' != p;
	                states.push('val');
	            }
	            break;
	          case '(':
	            if ('val' == state()
	              || 'expr' == state()) states.push('expr');
	            val += c;
	            break;
	          case ')':
	            if ('expr' == state()
	              || 'val' == state()) states.pop();
	            val += c;
	            break;
	          case '{':
	            if ('val' == state()) states.push('object');
	            val += c;
	            break;
	          case '}':
	            if ('object' == state()) states.pop();
	            val += c;
	            break;
	          case '[':
	            if ('val' == state()) states.push('array');
	            val += c;
	            break;
	          case ']':
	            if ('array' == state()) states.pop();
	            val += c;
	            break;
	          case '"':
	          case "'":
	            switch (state()) {
	              case 'key':
	                states.push('key char');
	                break;
	              case 'key char':
	                states.pop();
	                break;
	              case 'string':
	                if (c == quote) states.pop();
	                val += c;
	                break;
	              default:
	                states.push('string');
	                val += c;
	                quote = c;
	            }
	            break;
	          case '':
	            break;
	          default:
	            switch (state()) {
	              case 'key':
	              case 'key char':
	                key += c;
	                break;
	              default:
	                val += c;
	            }
	        }
	        p = c;
	      }

	      for (var i = 0; i < len; ++i) {
	        parse(str.charAt(i));
	      }

	      parse(',');

	      if ('/' == this.input.charAt(0)) {
	        this.consume(1);
	        tok.selfClosing = true;
	      }

	      return tok;
	    }
	  },
	  
	  /**
	   * Indent | Outdent | Newline.
	   */
	  
	  indent: function() {
	    var captures, re;

	    // established regexp
	    if (this.indentRe) {
	      captures = this.indentRe.exec(this.input);
	    // determine regexp
	    } else {
	      // tabs
	      re = /^\n(\t*) */;
	      captures = re.exec(this.input);

	      // spaces
	      if (captures && !captures[1].length) {
	        re = /^\n( *)/;
	        captures = re.exec(this.input);
	      }

	      // established
	      if (captures && captures[1].length) this.indentRe = re;
	    }

	    if (captures) {
	      var tok
	        , indents = captures[1].length;

	      ++this.lineno;
	      this.consume(indents + 1);

	      if (' ' == this.input[0] || '\t' == this.input[0]) {
	        throw new Error('Invalid indentation, you can use tabs or spaces but not both');
	      }

	      // blank line
	      if ('\n' == this.input[0]) return this.tok('newline');

	      // outdent
	      if (this.indentStack.length && indents < this.indentStack[0]) {
	        while (this.indentStack.length && this.indentStack[0] > indents) {
	          this.stash.push(this.tok('outdent'));
	          this.indentStack.shift();
	        }
	        tok = this.stash.pop();
	      // indent
	      } else if (indents && indents != this.indentStack[0]) {
	        this.indentStack.unshift(indents);
	        tok = this.tok('indent', indents);
	      // newline
	      } else {
	        tok = this.tok('newline');
	      }

	      return tok;
	    }
	  },

	  /**
	   * Pipe-less text consumed only when 
	   * pipeless is true;
	   */

	  pipelessText: function() {
	    if (this.pipeless) {
	      if ('\n' == this.input[0]) return;
	      var i = this.input.indexOf('\n');
	      if (-1 == i) i = this.input.length;
	      var str = this.input.substr(0, i);
	      this.consume(str.length);
	      return this.tok('text', str);
	    }
	  },

	  /**
	   * ':'
	   */

	  colon: function() {
	    return this.scan(/^: */, ':');
	  },

	  /**
	   * Return the next token object, or those
	   * previously stashed by lookahead.
	   *
	   * @return {Object}
	   * @api private
	   */
	  
	  advance: function(){
	    return this.stashed()
	      || this.next();
	  },
	  
	  /**
	   * Return the next token object.
	   *
	   * @return {Object}
	   * @api private
	   */
	  
	  next: function() {
	    return this.deferred()
	      || this.blank()
	      || this.eos()
	      || this.pipelessText()
	      || this.yield()
	      || this.doctype()
	      || this.interpolation()
	      || this["case"]()
	      || this.when()
	      || this["default"]()
	      || this["extends"]()
	      || this.append()
	      || this.prepend()
	      || this.block()
	      || this.include()
	      || this.mixin()
	      || this.call()
	      || this.conditional()
	      || this.each()
	      || this["while"]()
	      || this.assignment()
	      || this.tag()
	      || this.filter()
	      || this.code()
	      || this.id()
	      || this.className()
	      || this.attrs()
	      || this.indent()
	      || this.comment()
	      || this.colon()
	      || this.text();
	  }
	};


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	
	/*!
	 * Jade - nodes
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */

	exports.Node = __webpack_require__(61);
	exports.Tag = __webpack_require__(62);
	exports.Code = __webpack_require__(66);
	exports.Each = __webpack_require__(67);
	exports.Case = __webpack_require__(68);
	exports.Text = __webpack_require__(69);
	exports.Block = __webpack_require__(64);
	exports.Mixin = __webpack_require__(70);
	exports.Filter = __webpack_require__(71);
	exports.Comment = __webpack_require__(72);
	exports.Literal = __webpack_require__(73);
	exports.BlockComment = __webpack_require__(74);
	exports.Doctype = __webpack_require__(75);


/***/ },
/* 61 */
/***/ function(module, exports) {

	
	/*!
	 * Jade - nodes - Node
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */

	/**
	 * Initialize a `Node`.
	 *
	 * @api public
	 */

	var Node = module.exports = function Node(){};

	/**
	 * Clone this node (return itself)
	 *
	 * @return {Node}
	 * @api private
	 */

	Node.prototype.clone = function(){
	  return this;
	};


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	
	/*!
	 * Jade - nodes - Tag
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */

	/**
	 * Module dependencies.
	 */

	var Attrs = __webpack_require__(63),
	    Block = __webpack_require__(64),
	    inlineTags = __webpack_require__(65);

	/**
	 * Initialize a `Tag` node with the given tag `name` and optional `block`.
	 *
	 * @param {String} name
	 * @param {Block} block
	 * @api public
	 */

	var Tag = module.exports = function Tag(name, block) {
	  this.name = name;
	  this.attrs = [];
	  this.block = block || new Block;
	};

	/**
	 * Inherit from `Attrs`.
	 */

	Tag.prototype.__proto__ = Attrs.prototype;

	/**
	 * Clone this tag.
	 *
	 * @return {Tag}
	 * @api private
	 */

	Tag.prototype.clone = function(){
	  var clone = new Tag(this.name, this.block.clone());
	  clone.line = this.line;
	  clone.attrs = this.attrs;
	  clone.textOnly = this.textOnly;
	  return clone;
	};

	/**
	 * Check if this tag is an inline tag.
	 *
	 * @return {Boolean}
	 * @api private
	 */

	Tag.prototype.isInline = function(){
	  return ~inlineTags.indexOf(this.name);
	};

	/**
	 * Check if this tag's contents can be inlined.  Used for pretty printing.
	 *
	 * @return {Boolean}
	 * @api private
	 */

	Tag.prototype.canInline = function(){
	  var nodes = this.block.nodes;

	  function isInline(node){
	    // Recurse if the node is a block
	    if (node.isBlock) return node.nodes.every(isInline);
	    return node.isText || (node.isInline && node.isInline());
	  }
	  
	  // Empty tag
	  if (!nodes.length) return true;
	  
	  // Text-only or inline-only tag
	  if (1 == nodes.length) return isInline(nodes[0]);
	  
	  // Multi-line inline-only tag
	  if (this.block.nodes.every(isInline)) {
	    for (var i = 1, len = nodes.length; i < len; ++i) {
	      if (nodes[i-1].isText && nodes[i].isText)
	        return false;
	    }
	    return true;
	  }
	  
	  // Mixed tag
	  return false;
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	
	/*!
	 * Jade - nodes - Attrs
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */

	/**
	 * Module dependencies.
	 */

	var Node = __webpack_require__(61),
	    Block = __webpack_require__(64);

	/**
	 * Initialize a `Attrs` node.
	 *
	 * @api public
	 */

	var Attrs = module.exports = function Attrs() {
	  this.attrs = [];
	};

	/**
	 * Inherit from `Node`.
	 */

	Attrs.prototype.__proto__ = Node.prototype;

	/**
	 * Set attribute `name` to `val`, keep in mind these become
	 * part of a raw js object literal, so to quote a value you must
	 * '"quote me"', otherwise or example 'user.name' is literal JavaScript.
	 *
	 * @param {String} name
	 * @param {String} val
	 * @param {Boolean} escaped
	 * @return {Tag} for chaining
	 * @api public
	 */

	Attrs.prototype.setAttribute = function(name, val, escaped){
	  this.attrs.push({ name: name, val: val, escaped: escaped });
	  return this;
	};

	/**
	 * Remove attribute `name` when present.
	 *
	 * @param {String} name
	 * @api public
	 */

	Attrs.prototype.removeAttribute = function(name){
	  for (var i = 0, len = this.attrs.length; i < len; ++i) {
	    if (this.attrs[i] && this.attrs[i].name == name) {
	      delete this.attrs[i];
	    }
	  }
	};

	/**
	 * Get attribute value by `name`.
	 *
	 * @param {String} name
	 * @return {String}
	 * @api public
	 */

	Attrs.prototype.getAttribute = function(name){
	  for (var i = 0, len = this.attrs.length; i < len; ++i) {
	    if (this.attrs[i] && this.attrs[i].name == name) {
	      return this.attrs[i].val;
	    }
	  }
	};


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	
	/*!
	 * Jade - nodes - Block
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */

	/**
	 * Module dependencies.
	 */

	var Node = __webpack_require__(61);

	/**
	 * Initialize a new `Block` with an optional `node`.
	 *
	 * @param {Node} node
	 * @api public
	 */

	var Block = module.exports = function Block(node){
	  this.nodes = [];
	  if (node) this.push(node);
	};

	/**
	 * Inherit from `Node`.
	 */

	Block.prototype.__proto__ = Node.prototype;

	/**
	 * Block flag.
	 */

	Block.prototype.isBlock = true;

	/**
	 * Replace the nodes in `other` with the nodes
	 * in `this` block.
	 *
	 * @param {Block} other
	 * @api private
	 */

	Block.prototype.replace = function(other){
	  other.nodes = this.nodes;
	};

	/**
	 * Pust the given `node`.
	 *
	 * @param {Node} node
	 * @return {Number}
	 * @api public
	 */

	Block.prototype.push = function(node){
	  return this.nodes.push(node);
	};

	/**
	 * Check if this block is empty.
	 *
	 * @return {Boolean}
	 * @api public
	 */

	Block.prototype.isEmpty = function(){
	  return 0 == this.nodes.length;
	};

	/**
	 * Unshift the given `node`.
	 *
	 * @param {Node} node
	 * @return {Number}
	 * @api public
	 */

	Block.prototype.unshift = function(node){
	  return this.nodes.unshift(node);
	};

	/**
	 * Return the "last" block, or the first `yield` node.
	 *
	 * @return {Block}
	 * @api private
	 */

	Block.prototype.includeBlock = function(){
	  var ret = this
	    , node;

	  for (var i = 0, len = this.nodes.length; i < len; ++i) {
	    node = this.nodes[i];
	    if (node.yield) return node;
	    else if (node.textOnly) continue;
	    else if (node.includeBlock) ret = node.includeBlock();
	    else if (node.block && !node.block.isEmpty()) ret = node.block.includeBlock();
	  }

	  return ret;
	};

	/**
	 * Return a clone of this block.
	 *
	 * @return {Block}
	 * @api private
	 */

	Block.prototype.clone = function(){
	  var clone = new Block;
	  for (var i = 0, len = this.nodes.length; i < len; ++i) {
	    clone.push(this.nodes[i].clone());
	  }
	  return clone;
	};



/***/ },
/* 65 */
/***/ function(module, exports) {

	
	/*!
	 * Jade - inline tags
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */

	module.exports = [
	    'a'
	  , 'abbr'
	  , 'acronym'
	  , 'b'
	  , 'br'
	  , 'code'
	  , 'em'
	  , 'font'
	  , 'i'
	  , 'img'
	  , 'ins'
	  , 'kbd'
	  , 'map'
	  , 'samp'
	  , 'small'
	  , 'span'
	  , 'strong'
	  , 'sub'
	  , 'sup'
	];

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	
	/*!
	 * Jade - nodes - Code
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */

	/**
	 * Module dependencies.
	 */

	var Node = __webpack_require__(61);

	/**
	 * Initialize a `Code` node with the given code `val`.
	 * Code may also be optionally buffered and escaped.
	 *
	 * @param {String} val
	 * @param {Boolean} buffer
	 * @param {Boolean} escape
	 * @api public
	 */

	var Code = module.exports = function Code(val, buffer, escape) {
	  this.val = val;
	  this.buffer = buffer;
	  this.escape = escape;
	  if (val.match(/^ *else/)) this.debug = false;
	};

	/**
	 * Inherit from `Node`.
	 */

	Code.prototype.__proto__ = Node.prototype;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	
	/*!
	 * Jade - nodes - Each
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */

	/**
	 * Module dependencies.
	 */

	var Node = __webpack_require__(61);

	/**
	 * Initialize an `Each` node, representing iteration
	 *
	 * @param {String} obj
	 * @param {String} val
	 * @param {String} key
	 * @param {Block} block
	 * @api public
	 */

	var Each = module.exports = function Each(obj, val, key, block) {
	  this.obj = obj;
	  this.val = val;
	  this.key = key;
	  this.block = block;
	};

	/**
	 * Inherit from `Node`.
	 */

	Each.prototype.__proto__ = Node.prototype;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	
	/*!
	 * Jade - nodes - Case
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */

	/**
	 * Module dependencies.
	 */

	var Node = __webpack_require__(61);

	/**
	 * Initialize a new `Case` with `expr`.
	 *
	 * @param {String} expr
	 * @api public
	 */

	var Case = exports = module.exports = function Case(expr, block){
	  this.expr = expr;
	  this.block = block;
	};

	/**
	 * Inherit from `Node`.
	 */

	Case.prototype.__proto__ = Node.prototype;

	var When = exports.When = function When(expr, block){
	  this.expr = expr;
	  this.block = block;
	  this.debug = false;
	};

	/**
	 * Inherit from `Node`.
	 */

	When.prototype.__proto__ = Node.prototype;



/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	
	/*!
	 * Jade - nodes - Text
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */

	/**
	 * Module dependencies.
	 */

	var Node = __webpack_require__(61);

	/**
	 * Initialize a `Text` node with optional `line`.
	 *
	 * @param {String} line
	 * @api public
	 */

	var Text = module.exports = function Text(line) {
	  this.val = '';
	  if ('string' == typeof line) this.val = line;
	};

	/**
	 * Inherit from `Node`.
	 */

	Text.prototype.__proto__ = Node.prototype;

	/**
	 * Flag as text.
	 */

	Text.prototype.isText = true;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	
	/*!
	 * Jade - nodes - Mixin
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */

	/**
	 * Module dependencies.
	 */

	var Attrs = __webpack_require__(63);

	/**
	 * Initialize a new `Mixin` with `name` and `block`.
	 *
	 * @param {String} name
	 * @param {String} args
	 * @param {Block} block
	 * @api public
	 */

	var Mixin = module.exports = function Mixin(name, args, block, call){
	  this.name = name;
	  this.args = args;
	  this.block = block;
	  this.attrs = [];
	  this.call = call;
	};

	/**
	 * Inherit from `Attrs`.
	 */

	Mixin.prototype.__proto__ = Attrs.prototype;



/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	
	/*!
	 * Jade - nodes - Filter
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */

	/**
	 * Module dependencies.
	 */

	var Node = __webpack_require__(61)
	  , Block = __webpack_require__(64);

	/**
	 * Initialize a `Filter` node with the given 
	 * filter `name` and `block`.
	 *
	 * @param {String} name
	 * @param {Block|Node} block
	 * @api public
	 */

	var Filter = module.exports = function Filter(name, block, attrs) {
	  this.name = name;
	  this.block = block;
	  this.attrs = attrs;
	  this.isASTFilter = !block.nodes.every(function(node){ return node.isText });
	};

	/**
	 * Inherit from `Node`.
	 */

	Filter.prototype.__proto__ = Node.prototype;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	
	/*!
	 * Jade - nodes - Comment
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */

	/**
	 * Module dependencies.
	 */

	var Node = __webpack_require__(61);

	/**
	 * Initialize a `Comment` with the given `val`, optionally `buffer`,
	 * otherwise the comment may render in the output.
	 *
	 * @param {String} val
	 * @param {Boolean} buffer
	 * @api public
	 */

	var Comment = module.exports = function Comment(val, buffer) {
	  this.val = val;
	  this.buffer = buffer;
	};

	/**
	 * Inherit from `Node`.
	 */

	Comment.prototype.__proto__ = Node.prototype;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	
	/*!
	 * Jade - nodes - Literal
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */

	/**
	 * Module dependencies.
	 */

	var Node = __webpack_require__(61);

	/**
	 * Initialize a `Literal` node with the given `str.
	 *
	 * @param {String} str
	 * @api public
	 */

	var Literal = module.exports = function Literal(str) {
	  this.str = str
	    .replace(/\\/g, "\\\\")
	    .replace(/\n|\r\n/g, "\\n")
	    .replace(/'/g, "\\'");
	};

	/**
	 * Inherit from `Node`.
	 */

	Literal.prototype.__proto__ = Node.prototype;


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	
	/*!
	 * Jade - nodes - BlockComment
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */

	/**
	 * Module dependencies.
	 */

	var Node = __webpack_require__(61);

	/**
	 * Initialize a `BlockComment` with the given `block`.
	 *
	 * @param {String} val
	 * @param {Block} block
	 * @param {Boolean} buffer
	 * @api public
	 */

	var BlockComment = module.exports = function BlockComment(val, block, buffer) {
	  this.block = block;
	  this.val = val;
	  this.buffer = buffer;
	};

	/**
	 * Inherit from `Node`.
	 */

	BlockComment.prototype.__proto__ = Node.prototype;

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	
	/*!
	 * Jade - nodes - Doctype
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */

	/**
	 * Module dependencies.
	 */

	var Node = __webpack_require__(61);

	/**
	 * Initialize a `Doctype` with the given `val`. 
	 *
	 * @param {String} val
	 * @api public
	 */

	var Doctype = module.exports = function Doctype(val) {
	  this.val = val;
	};

	/**
	 * Inherit from `Node`.
	 */

	Doctype.prototype.__proto__ = Node.prototype;

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	
	/*!
	 * Jade - Compiler
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */

	/**
	 * Module dependencies.
	 */

	var nodes = __webpack_require__(60)
	  , filters = __webpack_require__(77)
	  , doctypes = __webpack_require__(78)
	  , selfClosing = __webpack_require__(79)
	  , runtime = __webpack_require__(80)
	  , utils = __webpack_require__(81);

	// if browser
	//
	// if (!Object.keys) {
	//   Object.keys = function(obj){
	//     var arr = [];
	//     for (var key in obj) {
	//       if (obj.hasOwnProperty(key)) {
	//         arr.push(key);
	//       }
	//     }
	//     return arr;
	//   }
	// }
	//
	// if (!String.prototype.trimLeft) {
	//   String.prototype.trimLeft = function(){
	//     return this.replace(/^\s+/, '');
	//   }
	// }
	//
	// end


	/**
	 * Initialize `Compiler` with the given `node`.
	 *
	 * @param {Node} node
	 * @param {Object} options
	 * @api public
	 */

	var Compiler = module.exports = function Compiler(node, options) {
	  this.options = options = options || {};
	  this.node = node;
	  this.hasCompiledDoctype = false;
	  this.hasCompiledTag = false;
	  this.pp = options.pretty || false;
	  this.debug = false !== options.compileDebug;
	  this.indents = 0;
	  this.parentIndents = 0;
	  if (options.doctype) this.setDoctype(options.doctype);
	};

	/**
	 * Compiler prototype.
	 */

	Compiler.prototype = {

	  /**
	   * Compile parse tree to JavaScript.
	   *
	   * @api public
	   */

	  compile: function(){
	    this.buf = ['var interp;'];
	    if (this.pp) this.buf.push("var __indent = [];");
	    this.lastBufferedIdx = -1;
	    this.visit(this.node);
	    return this.buf.join('\n');
	  },

	  /**
	   * Sets the default doctype `name`. Sets terse mode to `true` when
	   * html 5 is used, causing self-closing tags to end with ">" vs "/>",
	   * and boolean attributes are not mirrored.
	   *
	   * @param {string} name
	   * @api public
	   */

	  setDoctype: function(name){
	    var doctype = doctypes[(name || 'default').toLowerCase()];
	    doctype = doctype || '<!DOCTYPE ' + name + '>';
	    this.doctype = doctype;
	    this.terse = '5' == name || 'html' == name;
	    this.xml = 0 == this.doctype.indexOf('<?xml');
	  },

	  /**
	   * Buffer the given `str` optionally escaped.
	   *
	   * @param {String} str
	   * @param {Boolean} esc
	   * @api public
	   */

	  buffer: function(str, esc){
	    if (esc) str = utils.escape(str);

	    if (this.lastBufferedIdx == this.buf.length) {
	      this.lastBuffered += str;
	      this.buf[this.lastBufferedIdx - 1] = "buf.push('" + this.lastBuffered + "');"
	    } else {
	      this.buf.push("buf.push('" + str + "');");
	      this.lastBuffered = str;
	      this.lastBufferedIdx = this.buf.length;
	    }
	  },

	  /**
	   * Buffer an indent based on the current `indent`
	   * property and an additional `offset`.
	   *
	   * @param {Number} offset
	   * @param {Boolean} newline
	   * @api public
	   */
	  
	  prettyIndent: function(offset, newline){
	    offset = offset || 0;
	    newline = newline ? '\\n' : '';
	    this.buffer(newline + Array(this.indents + offset).join('  '));
	    if (this.parentIndents)
	      this.buf.push("buf.push.apply(buf, __indent);");
	  },

	  /**
	   * Visit `node`.
	   *
	   * @param {Node} node
	   * @api public
	   */

	  visit: function(node){
	    var debug = this.debug;

	    if (debug) {
	      this.buf.push('__jade.unshift({ lineno: ' + node.line
	        + ', filename: ' + (node.filename
	          ? JSON.stringify(node.filename)
	          : '__jade[0].filename')
	        + ' });');
	    }

	    // Massive hack to fix our context
	    // stack for - else[ if] etc
	    if (false === node.debug && this.debug) {
	      this.buf.pop();
	      this.buf.pop();
	    }

	    this.visitNode(node);

	    if (debug) this.buf.push('__jade.shift();');
	  },

	  /**
	   * Visit `node`.
	   *
	   * @param {Node} node
	   * @api public
	   */

	  visitNode: function(node){
	    var name = node.constructor.name
	      || node.constructor.toString().match(/function ([^(\s]+)()/)[1];
	    return this['visit' + name](node);
	  },

	  /**
	   * Visit case `node`.
	   *
	   * @param {Literal} node
	   * @api public
	   */

	  visitCase: function(node){
	    var _ = this.withinCase;
	    this.withinCase = true;
	    this.buf.push('switch (' + node.expr + '){');
	    this.visit(node.block);
	    this.buf.push('}');
	    this.withinCase = _;
	  },

	  /**
	   * Visit when `node`.
	   *
	   * @param {Literal} node
	   * @api public
	   */

	  visitWhen: function(node){
	    if ('default' == node.expr) {
	      this.buf.push('default:');
	    } else {
	      this.buf.push('case ' + node.expr + ':');
	    }
	    this.visit(node.block);
	    this.buf.push('  break;');
	  },

	  /**
	   * Visit literal `node`.
	   *
	   * @param {Literal} node
	   * @api public
	   */

	  visitLiteral: function(node){
	    var str = node.str.replace(/\n/g, '\\\\n');
	    this.buffer(str);
	  },

	  /**
	   * Visit all nodes in `block`.
	   *
	   * @param {Block} block
	   * @api public
	   */

	  visitBlock: function(block){
	    var len = block.nodes.length
	      , escape = this.escape
	      , pp = this.pp
	    
	    // Block keyword has a special meaning in mixins
	    if (this.parentIndents && block.mode) {
	      if (pp) this.buf.push("__indent.push('" + Array(this.indents + 1).join('  ') + "');")
	      this.buf.push('block && block();');
	      if (pp) this.buf.push("__indent.pop();")
	      return;
	    }
	    
	    // Pretty print multi-line text
	    if (pp && len > 1 && !escape && block.nodes[0].isText && block.nodes[1].isText)
	      this.prettyIndent(1, true);
	    
	    for (var i = 0; i < len; ++i) {
	      // Pretty print text
	      if (pp && i > 0 && !escape && block.nodes[i].isText && block.nodes[i-1].isText)
	        this.prettyIndent(1, false);
	      
	      this.visit(block.nodes[i]);
	      // Multiple text nodes are separated by newlines
	      if (block.nodes[i+1] && block.nodes[i].isText && block.nodes[i+1].isText)
	        this.buffer('\\n');
	    }
	  },

	  /**
	   * Visit `doctype`. Sets terse mode to `true` when html 5
	   * is used, causing self-closing tags to end with ">" vs "/>",
	   * and boolean attributes are not mirrored.
	   *
	   * @param {Doctype} doctype
	   * @api public
	   */

	  visitDoctype: function(doctype){
	    if (doctype && (doctype.val || !this.doctype)) {
	      this.setDoctype(doctype.val || 'default');
	    }

	    if (this.doctype) this.buffer(this.doctype);
	    this.hasCompiledDoctype = true;
	  },

	  /**
	   * Visit `mixin`, generating a function that
	   * may be called within the template.
	   *
	   * @param {Mixin} mixin
	   * @api public
	   */

	  visitMixin: function(mixin){
	    var name = mixin.name.replace(/-/g, '_') + '_mixin'
	      , args = mixin.args || ''
	      , block = mixin.block
	      , attrs = mixin.attrs
	      , pp = this.pp;

	    if (mixin.call) {
	      if (pp) this.buf.push("__indent.push('" + Array(this.indents + 1).join('  ') + "');")
	      if (block || attrs.length) {
	        
	        this.buf.push(name + '.call({');
	        
	        if (block) {
	          this.buf.push('block: function(){');
	          
	          // Render block with no indents, dynamically added when rendered
	          this.parentIndents++;
	          var _indents = this.indents;
	          this.indents = 0;
	          this.visit(mixin.block);
	          this.indents = _indents;
	          this.parentIndents--;
	          
	          if (attrs.length) {
	            this.buf.push('},');
	          } else {
	            this.buf.push('}');
	          }
	        }
	        
	        if (attrs.length) {
	          var val = this.attrs(attrs);
	          if (val.inherits) {
	            this.buf.push('attributes: merge({' + val.buf
	                + '}, attributes), escaped: merge(' + val.escaped + ', escaped, true)');
	          } else {
	            this.buf.push('attributes: {' + val.buf + '}, escaped: ' + val.escaped);
	          }
	        }
	        
	        if (args) {
	          this.buf.push('}, ' + args + ');');
	        } else {
	          this.buf.push('});');
	        }
	        
	      } else {
	        this.buf.push(name + '(' + args + ');');
	      }
	      if (pp) this.buf.push("__indent.pop();")
	    } else {
	      this.buf.push('var ' + name + ' = function(' + args + '){');
	      this.buf.push('var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};');
	      this.parentIndents++;
	      this.visit(block);
	      this.parentIndents--;
	      this.buf.push('};');
	    }
	  },

	  /**
	   * Visit `tag` buffering tag markup, generating
	   * attributes, visiting the `tag`'s code and block.
	   *
	   * @param {Tag} tag
	   * @api public
	   */

	  visitTag: function(tag){
	    this.indents++;
	    var name = tag.name
	      , pp = this.pp;

	    if (tag.buffer) name = "' + (" + name + ") + '";

	    if (!this.hasCompiledTag) {
	      if (!this.hasCompiledDoctype && 'html' == name) {
	        this.visitDoctype();
	      }
	      this.hasCompiledTag = true;
	    }

	    // pretty print
	    if (pp && !tag.isInline())
	      this.prettyIndent(0, true);

	    if ((~selfClosing.indexOf(name) || tag.selfClosing) && !this.xml) {
	      this.buffer('<' + name);
	      this.visitAttributes(tag.attrs);
	      this.terse
	        ? this.buffer('>')
	        : this.buffer('/>');
	    } else {
	      // Optimize attributes buffering
	      if (tag.attrs.length) {
	        this.buffer('<' + name);
	        if (tag.attrs.length) this.visitAttributes(tag.attrs);
	        this.buffer('>');
	      } else {
	        this.buffer('<' + name + '>');
	      }
	      if (tag.code) this.visitCode(tag.code);
	      this.escape = 'pre' == tag.name;
	      this.visit(tag.block);

	      // pretty print
	      if (pp && !tag.isInline() && 'pre' != tag.name && !tag.canInline())
	        this.prettyIndent(0, true);

	      this.buffer('</' + name + '>');
	    }
	    this.indents--;
	  },

	  /**
	   * Visit `filter`, throwing when the filter does not exist.
	   *
	   * @param {Filter} filter
	   * @api public
	   */

	  visitFilter: function(filter){
	    var fn = filters[filter.name];

	    // unknown filter
	    if (!fn) {
	      if (filter.isASTFilter) {
	        throw new Error('unknown ast filter "' + filter.name + ':"');
	      } else {
	        throw new Error('unknown filter ":' + filter.name + '"');
	      }
	    }

	    if (filter.isASTFilter) {
	      this.buf.push(fn(filter.block, this, filter.attrs));
	    } else {
	      var text = filter.block.nodes.map(function(node){ return node.val }).join('\n');
	      filter.attrs = filter.attrs || {};
	      filter.attrs.filename = this.options.filename;
	      this.buffer(utils.text(fn(text, filter.attrs)));
	    }
	  },

	  /**
	   * Visit `text` node.
	   *
	   * @param {Text} text
	   * @api public
	   */

	  visitText: function(text){
	    text = utils.text(text.val.replace(/\\/g, '\\\\'));
	    if (this.escape) text = escape(text);
	    this.buffer(text);
	  },

	  /**
	   * Visit a `comment`, only buffering when the buffer flag is set.
	   *
	   * @param {Comment} comment
	   * @api public
	   */

	  visitComment: function(comment){
	    if (!comment.buffer) return;
	    if (this.pp) this.prettyIndent(1, true);
	    this.buffer('<!--' + utils.escape(comment.val) + '-->');
	  },

	  /**
	   * Visit a `BlockComment`.
	   *
	   * @param {Comment} comment
	   * @api public
	   */

	  visitBlockComment: function(comment){
	    if (!comment.buffer) return;
	    if (0 == comment.val.trim().indexOf('if')) {
	      this.buffer('<!--[' + comment.val.trim() + ']>');
	      this.visit(comment.block);
	      this.buffer('<![endif]-->');
	    } else {
	      this.buffer('<!--' + comment.val);
	      this.visit(comment.block);
	      this.buffer('-->');
	    }
	  },

	  /**
	   * Visit `code`, respecting buffer / escape flags.
	   * If the code is followed by a block, wrap it in
	   * a self-calling function.
	   *
	   * @param {Code} code
	   * @api public
	   */

	  visitCode: function(code){
	    // Wrap code blocks with {}.
	    // we only wrap unbuffered code blocks ATM
	    // since they are usually flow control

	    // Buffer code
	    if (code.buffer) {
	      var val = code.val.trimLeft();
	      this.buf.push('var __val__ = ' + val);
	      val = 'null == __val__ ? "" : __val__';
	      if (code.escape) val = 'escape(' + val + ')';
	      this.buf.push("buf.push(" + val + ");");
	    } else {
	      this.buf.push(code.val);
	    }

	    // Block support
	    if (code.block) {
	      if (!code.buffer) this.buf.push('{');
	      this.visit(code.block);
	      if (!code.buffer) this.buf.push('}');
	    }
	  },

	  /**
	   * Visit `each` block.
	   *
	   * @param {Each} each
	   * @api public
	   */

	  visitEach: function(each){
	    this.buf.push(''
	      + '// iterate ' + each.obj + '\n'
	      + ';(function(){\n'
	      + '  if (\'number\' == typeof ' + each.obj + '.length) {\n'
	      + '    for (var ' + each.key + ' = 0, $$l = ' + each.obj + '.length; ' + each.key + ' < $$l; ' + each.key + '++) {\n'
	      + '      var ' + each.val + ' = ' + each.obj + '[' + each.key + '];\n');

	    this.visit(each.block);

	    this.buf.push(''
	      + '    }\n'
	      + '  } else {\n'
	      + '    for (var ' + each.key + ' in ' + each.obj + ') {\n'
	      // if browser
	      // + '      if (' + each.obj + '.hasOwnProperty(' + each.key + ')){'
	      // end
	      + '      var ' + each.val + ' = ' + each.obj + '[' + each.key + '];\n');

	    this.visit(each.block);

	    // if browser
	    // this.buf.push('      }\n');
	    // end

	    this.buf.push('   }\n  }\n}).call(this);\n');
	  },

	  /**
	   * Visit `attrs`.
	   *
	   * @param {Array} attrs
	   * @api public
	   */

	  visitAttributes: function(attrs){
	    var val = this.attrs(attrs);
	    if (val.inherits) {
	      this.buf.push("buf.push(attrs(merge({ " + val.buf +
	          " }, attributes), merge(" + val.escaped + ", escaped, true)));");
	    } else if (val.constant) {
	      eval('var buf={' + val.buf + '};');
	      this.buffer(runtime.attrs(buf, JSON.parse(val.escaped)), true);
	    } else {
	      this.buf.push("buf.push(attrs({ " + val.buf + " }, " + val.escaped + "));");
	    }
	  },

	  /**
	   * Compile attributes.
	   */

	  attrs: function(attrs){
	    var buf = []
	      , classes = []
	      , escaped = {}
	      , constant = attrs.every(function(attr){ return isConstant(attr.val) })
	      , inherits = false;

	    if (this.terse) buf.push('terse: true');

	    attrs.forEach(function(attr){
	      if (attr.name == 'attributes') return inherits = true;
	      escaped[attr.name] = attr.escaped;
	      if (attr.name == 'class') {
	        classes.push('(' + attr.val + ')');
	      } else {
	        var pair = "'" + attr.name + "':(" + attr.val + ')';
	        buf.push(pair);
	      }
	    });

	    if (classes.length) {
	      classes = classes.join(" + ' ' + ");
	      buf.push("class: " + classes);
	    }

	    return {
	      buf: buf.join(', ').replace('class:', '"class":'),
	      escaped: JSON.stringify(escaped),
	      inherits: inherits,
	      constant: constant
	    };
	  }
	};

	/**
	 * Check if expression can be evaluated to a constant
	 *
	 * @param {String} expression
	 * @return {Boolean}
	 * @api private
	 */

	function isConstant(val){
	  // Check strings/literals
	  if (/^ *("([^"\\]*(\\.[^"\\]*)*)"|'([^'\\]*(\\.[^'\\]*)*)'|true|false|null|undefined) *$/i.test(val))
	    return true;
	  
	  // Check numbers
	  if (!isNaN(Number(val)))
	    return true;
	  
	  // Check arrays
	  var matches;
	  if (matches = /^ *\[(.*)\] *$/.exec(val))
	    return matches[1].split(',').every(isConstant);
	  
	  return false;
	}

	/**
	 * Escape the given string of `html`.
	 *
	 * @param {String} html
	 * @return {String}
	 * @api private
	 */

	function escape(html){
	  return String(html)
	    .replace(/&(?!\w+;)/g, '&amp;')
	    .replace(/</g, '&lt;')
	    .replace(/>/g, '&gt;')
	    .replace(/"/g, '&quot;');
	}

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	
	/*!
	 * Jade - filters
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */

	module.exports = {
	  
	  /**
	   * Wrap text with CDATA block.
	   */
	  
	  cdata: function(str){
	    return '<![CDATA[\\n' + str + '\\n]]>';
	  },
	  
	  /**
	   * Transform sass to css, wrapped in style tags.
	   */
	  
	  sass: function(str){
	    str = str.replace(/\\n/g, '\n');
	    var sass = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"sass\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).render(str).replace(/\n/g, '\\n');
	    return '<style type="text/css">' + sass + '</style>'; 
	  },
	  
	  /**
	   * Transform stylus to css, wrapped in style tags.
	   */
	  
	  stylus: function(str, options){
	    var ret;
	    str = str.replace(/\\n/g, '\n');
	    var stylus = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"stylus\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    stylus(str, options).render(function(err, css){
	      if (err) throw err;
	      ret = css.replace(/\n/g, '\\n');
	    });
	    return '<style type="text/css">' + ret + '</style>'; 
	  },
	  
	  /**
	   * Transform less to css, wrapped in style tags.
	   */
	  
	  less: function(str){
	    var ret;
	    str = str.replace(/\\n/g, '\n');
	    __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"less\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).render(str, function(err, css){
	      if (err) throw err;
	      ret = '<style type="text/css">' + css.replace(/\n/g, '\\n') + '</style>';  
	    });
	    return ret;
	  },
	  
	  /**
	   * Transform markdown to html.
	   */
	  
	  markdown: function(str){
	    var md;

	    // support markdown / discount
	    try {
	      md = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"markdown\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    } catch (err){
	      try {
	        md = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"discount\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	      } catch (err) {
	        try {
	          md = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"markdown-js\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	        } catch (err) {
	          try {
	            md = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"marked\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	          } catch (err) {
	            throw new
	              Error('Cannot find markdown library, install markdown, discount, or marked.');
	          }
	        }
	      }
	    }

	    str = str.replace(/\\n/g, '\n');
	    return md.parse(str).replace(/\n/g, '\\n').replace(/'/g,'&#39;');
	  },
	  
	  /**
	   * Transform coffeescript to javascript.
	   */

	  coffeescript: function(str){
	    str = str.replace(/\\n/g, '\n');
	    var js = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"coffee-script\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).compile(str).replace(/\\/g, '\\\\').replace(/\n/g, '\\n');
	    return '<script type="text/javascript">\\n' + js + '</script>';
	  }
	};


/***/ },
/* 78 */
/***/ function(module, exports) {

	
	/*!
	 * Jade - doctypes
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */

	module.exports = {
	    '5': '<!DOCTYPE html>'
	  , 'default': '<!DOCTYPE html>'
	  , 'xml': '<?xml version="1.0" encoding="utf-8" ?>'
	  , 'transitional': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'
	  , 'strict': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">'
	  , 'frameset': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">'
	  , '1.1': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">'
	  , 'basic': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML Basic 1.1//EN" "http://www.w3.org/TR/xhtml-basic/xhtml-basic11.dtd">'
	  , 'mobile': '<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.2//EN" "http://www.openmobilealliance.org/tech/DTD/xhtml-mobile12.dtd">'
	};

/***/ },
/* 79 */
/***/ function(module, exports) {

	
	/*!
	 * Jade - self closing tags
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */

	module.exports = [
	    'meta'
	  , 'img'
	  , 'link'
	  , 'input'
	  , 'source'
	  , 'area'
	  , 'base'
	  , 'col'
	  , 'br'
	  , 'hr'
	];

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	
	/*!
	 * Jade - runtime
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */

	/**
	 * Lame Array.isArray() polyfill for now.
	 */

	if (!Array.isArray) {
	  Array.isArray = function(arr){
	    return '[object Array]' == Object.prototype.toString.call(arr);
	  };
	}

	/**
	 * Lame Object.keys() polyfill for now.
	 */

	if (!Object.keys) {
	  Object.keys = function(obj){
	    var arr = [];
	    for (var key in obj) {
	      if (obj.hasOwnProperty(key)) {
	        arr.push(key);
	      }
	    }
	    return arr;
	  }
	}

	/**
	 * Merge two attribute objects giving precedence
	 * to values in object `b`. Classes are special-cased
	 * allowing for arrays and merging/joining appropriately
	 * resulting in a string.
	 *
	 * @param {Object} a
	 * @param {Object} b
	 * @return {Object} a
	 * @api private
	 */

	exports.merge = function merge(a, b) {
	  var ac = a['class'];
	  var bc = b['class'];

	  if (ac || bc) {
	    ac = ac || [];
	    bc = bc || [];
	    if (!Array.isArray(ac)) ac = [ac];
	    if (!Array.isArray(bc)) bc = [bc];
	    ac = ac.filter(nulls);
	    bc = bc.filter(nulls);
	    a['class'] = ac.concat(bc).join(' ');
	  }

	  for (var key in b) {
	    if (key != 'class') {
	      a[key] = b[key];
	    }
	  }

	  return a;
	};

	/**
	 * Filter null `val`s.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */

	function nulls(val) {
	  return val != null;
	}

	/**
	 * Render the given attributes object.
	 *
	 * @param {Object} obj
	 * @param {Object} escaped
	 * @return {String}
	 * @api private
	 */

	exports.attrs = function attrs(obj, escaped){
	  var buf = []
	    , terse = obj.terse;

	  delete obj.terse;
	  var keys = Object.keys(obj)
	    , len = keys.length;

	  if (len) {
	    buf.push('');
	    for (var i = 0; i < len; ++i) {
	      var key = keys[i]
	        , val = obj[key];

	      if ('boolean' == typeof val || null == val) {
	        if (val) {
	          terse
	            ? buf.push(key)
	            : buf.push(key + '="' + key + '"');
	        }
	      } else if (0 == key.indexOf('data') && 'string' != typeof val) {
	        buf.push(key + "='" + JSON.stringify(val) + "'");
	      } else if ('class' == key && Array.isArray(val)) {
	        buf.push(key + '="' + exports.escape(val.join(' ')) + '"');
	      } else if (escaped && escaped[key]) {
	        buf.push(key + '="' + exports.escape(val) + '"');
	      } else {
	        buf.push(key + '="' + val + '"');
	      }
	    }
	  }

	  return buf.join(' ');
	};

	/**
	 * Escape the given string of `html`.
	 *
	 * @param {String} html
	 * @return {String}
	 * @api private
	 */

	exports.escape = function escape(html){
	  return String(html)
	    .replace(/&(?!(\w+|\#\d+);)/g, '&amp;')
	    .replace(/</g, '&lt;')
	    .replace(/>/g, '&gt;')
	    .replace(/"/g, '&quot;');
	};

	/**
	 * Re-throw the given `err` in context to the
	 * the jade in `filename` at the given `lineno`.
	 *
	 * @param {Error} err
	 * @param {String} filename
	 * @param {String} lineno
	 * @api private
	 */

	exports.rethrow = function rethrow(err, filename, lineno){
	  if (!filename) throw err;

	  var context = 3
	    , str = __webpack_require__(19).readFileSync(filename, 'utf8')
	    , lines = str.split('\n')
	    , start = Math.max(lineno - context, 0)
	    , end = Math.min(lines.length, lineno + context);

	  // Error context
	  var context = lines.slice(start, end).map(function(line, i){
	    var curr = i + start + 1;
	    return (curr == lineno ? '  > ' : '    ')
	      + curr
	      + '| '
	      + line;
	  }).join('\n');

	  // Alter exception message
	  err.path = filename;
	  err.message = (filename || 'Jade') + ':' + lineno
	    + '\n' + context + '\n\n' + err.message;
	  throw err;
	};


/***/ },
/* 81 */
/***/ function(module, exports) {

	
	/*!
	 * Jade - utils
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */

	/**
	 * Convert interpolation in the given string to JavaScript.
	 *
	 * @param {String} str
	 * @return {String}
	 * @api private
	 */

	var interpolate = exports.interpolate = function(str){
	  return str.replace(/(\\)?([#!]){(.*?)}/g, function(str, escape, flag, code){
	    return escape
	      ? str
	      : "' + "
	        + ('!' == flag ? '' : 'escape')
	        + "((interp = " + code.replace(/\\'/g, "'")
	        + ") == null ? '' : interp) + '";
	  });
	};

	/**
	 * Escape single quotes in `str`.
	 *
	 * @param {String} str
	 * @return {String}
	 * @api private
	 */

	var escape = exports.escape = function(str) {
	  return str.replace(/'/g, "\\'");
	};

	/**
	 * Interpolate, and escape the given `str`.
	 *
	 * @param {String} str
	 * @return {String}
	 * @api private
	 */

	exports.text = function(str){
	  return interpolate(escape(str));
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var Base = __webpack_require__(10);

	/**
	 * Expose `List`.
	 */

	exports = module.exports = List;

	/**
	 * Initialize a new `List` test reporter.
	 *
	 * @api public
	 * @param {Runner} runner
	 */
	function List(runner) {
	  Base.call(this, runner);

	  var self = this;
	  var total = runner.total;

	  runner.on('start', function() {
	    console.log(JSON.stringify(['start', { total: total }]));
	  });

	  runner.on('pass', function(test) {
	    console.log(JSON.stringify(['pass', clean(test)]));
	  });

	  runner.on('fail', function(test, err) {
	    test = clean(test);
	    test.err = err.message;
	    test.stack = err.stack || null;
	    console.log(JSON.stringify(['fail', test]));
	  });

	  runner.on('end', function() {
	    process.stdout.write(JSON.stringify(['end', self.stats]));
	  });
	}

	/**
	 * Return a plain-object representation of `test`
	 * free of cyclic properties etc.
	 *
	 * @api private
	 * @param {Object} test
	 * @return {Object}
	 */
	function clean(test) {
	  return {
	    title: test.title,
	    fullTitle: test.fullTitle(),
	    duration: test.duration,
	    currentRetry: test.currentRetry()
	  };
	}


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	exports.bdd = __webpack_require__(84);
	exports.tdd = __webpack_require__(91);
	exports.qunit = __webpack_require__(92);
	exports.exports = __webpack_require__(93);


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var Suite = __webpack_require__(85);
	var Test = __webpack_require__(89);
	var escapeRe = __webpack_require__(7);

	/**
	 * BDD-style interface:
	 *
	 *      describe('Array', function() {
	 *        describe('#indexOf()', function() {
	 *          it('should return -1 when not present', function() {
	 *            // ...
	 *          });
	 *
	 *          it('should return the index when present', function() {
	 *            // ...
	 *          });
	 *        });
	 *      });
	 *
	 * @param {Suite} suite Root suite.
	 */
	module.exports = function(suite) {
	  var suites = [suite];

	  suite.on('pre-require', function(context, file, mocha) {
	    var common = __webpack_require__(90)(suites, context);

	    context.before = common.before;
	    context.after = common.after;
	    context.beforeEach = common.beforeEach;
	    context.afterEach = common.afterEach;
	    context.run = mocha.options.delay && common.runWithSuite(suite);
	    /**
	     * Describe a "suite" with the given `title`
	     * and callback `fn` containing nested suites
	     * and/or tests.
	     */

	    context.describe = context.context = function(title, fn) {
	      var suite = Suite.create(suites[0], title);
	      suite.file = file;
	      suites.unshift(suite);
	      fn.call(suite);
	      suites.shift();
	      return suite;
	    };

	    /**
	     * Pending describe.
	     */

	    context.xdescribe = context.xcontext = context.describe.skip = function(title, fn) {
	      var suite = Suite.create(suites[0], title);
	      suite.pending = true;
	      suites.unshift(suite);
	      fn.call(suite);
	      suites.shift();
	    };

	    /**
	     * Exclusive suite.
	     */

	    context.describe.only = function(title, fn) {
	      var suite = context.describe(title, fn);
	      mocha.grep(suite.fullTitle());
	      return suite;
	    };

	    /**
	     * Describe a specification or test-case
	     * with the given `title` and callback `fn`
	     * acting as a thunk.
	     */

	    var it = context.it = context.specify = function(title, fn) {
	      var suite = suites[0];
	      if (suite.pending) {
	        fn = null;
	      }
	      var test = new Test(title, fn);
	      test.file = file;
	      suite.addTest(test);
	      return test;
	    };

	    /**
	     * Exclusive test-case.
	     */

	    context.it.only = function(title, fn) {
	      var test = it(title, fn);
	      var reString = '^' + escapeRe(test.fullTitle()) + '$';
	      mocha.grep(new RegExp(reString));
	      return test;
	    };

	    /**
	     * Pending test case.
	     */

	    context.xit = context.xspecify = context.it.skip = function(title) {
	      context.it(title);
	    };

	    /**
	     * Number of attempts to retry.
	     */
	    context.it.retries = function(n) {
	      context.retries(n);
	    };
	  });
	};


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var EventEmitter = __webpack_require__(37).EventEmitter;
	var Hook = __webpack_require__(86);
	var utils = __webpack_require__(14);
	var inherits = utils.inherits;
	var debug = __webpack_require__(15)('mocha:suite');
	var milliseconds = __webpack_require__(13);

	/**
	 * Expose `Suite`.
	 */

	exports = module.exports = Suite;

	/**
	 * Create a new `Suite` with the given `title` and parent `Suite`. When a suite
	 * with the same title is already present, that suite is returned to provide
	 * nicer reporter and more flexible meta-testing.
	 *
	 * @api public
	 * @param {Suite} parent
	 * @param {string} title
	 * @return {Suite}
	 */
	exports.create = function(parent, title) {
	  var suite = new Suite(title, parent.ctx);
	  suite.parent = parent;
	  if (parent.pending) {
	    suite.pending = true;
	  }
	  title = suite.fullTitle();
	  parent.addSuite(suite);
	  return suite;
	};

	/**
	 * Initialize a new `Suite` with the given `title` and `ctx`.
	 *
	 * @api private
	 * @param {string} title
	 * @param {Context} parentContext
	 */
	function Suite(title, parentContext) {
	  this.title = title;
	  function Context() {}
	  Context.prototype = parentContext;
	  this.ctx = new Context();
	  this.suites = [];
	  this.tests = [];
	  this.pending = false;
	  this._beforeEach = [];
	  this._beforeAll = [];
	  this._afterEach = [];
	  this._afterAll = [];
	  this.root = !title;
	  this._timeout = 2000;
	  this._enableTimeouts = true;
	  this._slow = 75;
	  this._bail = false;
	  this._retries = -1;
	  this.delayed = false;
	}

	/**
	 * Inherit from `EventEmitter.prototype`.
	 */
	inherits(Suite, EventEmitter);

	/**
	 * Return a clone of this `Suite`.
	 *
	 * @api private
	 * @return {Suite}
	 */
	Suite.prototype.clone = function() {
	  var suite = new Suite(this.title);
	  debug('clone');
	  suite.ctx = this.ctx;
	  suite.timeout(this.timeout());
	  suite.retries(this.retries());
	  suite.enableTimeouts(this.enableTimeouts());
	  suite.slow(this.slow());
	  suite.bail(this.bail());
	  return suite;
	};

	/**
	 * Set timeout `ms` or short-hand such as "2s".
	 *
	 * @api private
	 * @param {number|string} ms
	 * @return {Suite|number} for chaining
	 */
	Suite.prototype.timeout = function(ms) {
	  if (!arguments.length) {
	    return this._timeout;
	  }
	  if (ms.toString() === '0') {
	    this._enableTimeouts = false;
	  }
	  if (typeof ms === 'string') {
	    ms = milliseconds(ms);
	  }
	  debug('timeout %d', ms);
	  this._timeout = parseInt(ms, 10);
	  return this;
	};

	/**
	 * Set number of times to retry a failed test.
	 *
	 * @api private
	 * @param {number|string} n
	 * @return {Suite|number} for chaining
	 */
	Suite.prototype.retries = function(n) {
	  if (!arguments.length) {
	    return this._retries;
	  }
	  debug('retries %d', n);
	  this._retries = parseInt(n, 10) || 0;
	  return this;
	};

	/**
	  * Set timeout to `enabled`.
	  *
	  * @api private
	  * @param {boolean} enabled
	  * @return {Suite|boolean} self or enabled
	  */
	Suite.prototype.enableTimeouts = function(enabled) {
	  if (!arguments.length) {
	    return this._enableTimeouts;
	  }
	  debug('enableTimeouts %s', enabled);
	  this._enableTimeouts = enabled;
	  return this;
	};

	/**
	 * Set slow `ms` or short-hand such as "2s".
	 *
	 * @api private
	 * @param {number|string} ms
	 * @return {Suite|number} for chaining
	 */
	Suite.prototype.slow = function(ms) {
	  if (!arguments.length) {
	    return this._slow;
	  }
	  if (typeof ms === 'string') {
	    ms = milliseconds(ms);
	  }
	  debug('slow %d', ms);
	  this._slow = ms;
	  return this;
	};

	/**
	 * Sets whether to bail after first error.
	 *
	 * @api private
	 * @param {boolean} bail
	 * @return {Suite|number} for chaining
	 */
	Suite.prototype.bail = function(bail) {
	  if (!arguments.length) {
	    return this._bail;
	  }
	  debug('bail %s', bail);
	  this._bail = bail;
	  return this;
	};

	/**
	 * Run `fn(test[, done])` before running tests.
	 *
	 * @api private
	 * @param {string} title
	 * @param {Function} fn
	 * @return {Suite} for chaining
	 */
	Suite.prototype.beforeAll = function(title, fn) {
	  if (this.pending) {
	    return this;
	  }
	  if (typeof title === 'function') {
	    fn = title;
	    title = fn.name;
	  }
	  title = '"before all" hook' + (title ? ': ' + title : '');

	  var hook = new Hook(title, fn);
	  hook.parent = this;
	  hook.timeout(this.timeout());
	  hook.retries(this.retries());
	  hook.enableTimeouts(this.enableTimeouts());
	  hook.slow(this.slow());
	  hook.ctx = this.ctx;
	  this._beforeAll.push(hook);
	  this.emit('beforeAll', hook);
	  return this;
	};

	/**
	 * Run `fn(test[, done])` after running tests.
	 *
	 * @api private
	 * @param {string} title
	 * @param {Function} fn
	 * @return {Suite} for chaining
	 */
	Suite.prototype.afterAll = function(title, fn) {
	  if (this.pending) {
	    return this;
	  }
	  if (typeof title === 'function') {
	    fn = title;
	    title = fn.name;
	  }
	  title = '"after all" hook' + (title ? ': ' + title : '');

	  var hook = new Hook(title, fn);
	  hook.parent = this;
	  hook.timeout(this.timeout());
	  hook.retries(this.retries());
	  hook.enableTimeouts(this.enableTimeouts());
	  hook.slow(this.slow());
	  hook.ctx = this.ctx;
	  this._afterAll.push(hook);
	  this.emit('afterAll', hook);
	  return this;
	};

	/**
	 * Run `fn(test[, done])` before each test case.
	 *
	 * @api private
	 * @param {string} title
	 * @param {Function} fn
	 * @return {Suite} for chaining
	 */
	Suite.prototype.beforeEach = function(title, fn) {
	  if (this.pending) {
	    return this;
	  }
	  if (typeof title === 'function') {
	    fn = title;
	    title = fn.name;
	  }
	  title = '"before each" hook' + (title ? ': ' + title : '');

	  var hook = new Hook(title, fn);
	  hook.parent = this;
	  hook.timeout(this.timeout());
	  hook.retries(this.retries());
	  hook.enableTimeouts(this.enableTimeouts());
	  hook.slow(this.slow());
	  hook.ctx = this.ctx;
	  this._beforeEach.push(hook);
	  this.emit('beforeEach', hook);
	  return this;
	};

	/**
	 * Run `fn(test[, done])` after each test case.
	 *
	 * @api private
	 * @param {string} title
	 * @param {Function} fn
	 * @return {Suite} for chaining
	 */
	Suite.prototype.afterEach = function(title, fn) {
	  if (this.pending) {
	    return this;
	  }
	  if (typeof title === 'function') {
	    fn = title;
	    title = fn.name;
	  }
	  title = '"after each" hook' + (title ? ': ' + title : '');

	  var hook = new Hook(title, fn);
	  hook.parent = this;
	  hook.timeout(this.timeout());
	  hook.retries(this.retries());
	  hook.enableTimeouts(this.enableTimeouts());
	  hook.slow(this.slow());
	  hook.ctx = this.ctx;
	  this._afterEach.push(hook);
	  this.emit('afterEach', hook);
	  return this;
	};

	/**
	 * Add a test `suite`.
	 *
	 * @api private
	 * @param {Suite} suite
	 * @return {Suite} for chaining
	 */
	Suite.prototype.addSuite = function(suite) {
	  suite.parent = this;
	  suite.timeout(this.timeout());
	  suite.retries(this.retries());
	  suite.enableTimeouts(this.enableTimeouts());
	  suite.slow(this.slow());
	  suite.bail(this.bail());
	  this.suites.push(suite);
	  this.emit('suite', suite);
	  return this;
	};

	/**
	 * Add a `test` to this suite.
	 *
	 * @api private
	 * @param {Test} test
	 * @return {Suite} for chaining
	 */
	Suite.prototype.addTest = function(test) {
	  test.parent = this;
	  test.timeout(this.timeout());
	  test.retries(this.retries());
	  test.enableTimeouts(this.enableTimeouts());
	  test.slow(this.slow());
	  test.ctx = this.ctx;
	  this.tests.push(test);
	  this.emit('test', test);
	  return this;
	};

	/**
	 * Return the full title generated by recursively concatenating the parent's
	 * full title.
	 *
	 * @api public
	 * @return {string}
	 */
	Suite.prototype.fullTitle = function() {
	  if (this.parent) {
	    var full = this.parent.fullTitle();
	    if (full) {
	      return full + ' ' + this.title;
	    }
	  }
	  return this.title;
	};

	/**
	 * Return the total number of tests.
	 *
	 * @api public
	 * @return {number}
	 */
	Suite.prototype.total = function() {
	  return utils.reduce(this.suites, function(sum, suite) {
	    return sum + suite.total();
	  }, 0) + this.tests.length;
	};

	/**
	 * Iterates through each suite recursively to find all tests. Applies a
	 * function in the format `fn(test)`.
	 *
	 * @api private
	 * @param {Function} fn
	 * @return {Suite}
	 */
	Suite.prototype.eachTest = function(fn) {
	  utils.forEach(this.tests, fn);
	  utils.forEach(this.suites, function(suite) {
	    suite.eachTest(fn);
	  });
	  return this;
	};

	/**
	 * This will run the root suite if we happen to be running in delayed mode.
	 */
	Suite.prototype.run = function run() {
	  if (this.root) {
	    this.emit('run');
	  }
	};


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var Runnable = __webpack_require__(87);
	var inherits = __webpack_require__(14).inherits;

	/**
	 * Expose `Hook`.
	 */

	module.exports = Hook;

	/**
	 * Initialize a new `Hook` with the given `title` and callback `fn`.
	 *
	 * @param {String} title
	 * @param {Function} fn
	 * @api private
	 */
	function Hook(title, fn) {
	  Runnable.call(this, title, fn);
	  this.type = 'hook';
	}

	/**
	 * Inherit from `Runnable.prototype`.
	 */
	inherits(Hook, Runnable);

	/**
	 * Get or set the test `err`.
	 *
	 * @param {Error} err
	 * @return {Error}
	 * @api public
	 */
	Hook.prototype.error = function(err) {
	  if (!arguments.length) {
	    err = this._error;
	    this._error = null;
	    return err;
	  }

	  this._error = err;
	};


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var EventEmitter = __webpack_require__(37).EventEmitter;
	var Pending = __webpack_require__(88);
	var debug = __webpack_require__(15)('mocha:runnable');
	var milliseconds = __webpack_require__(13);
	var utils = __webpack_require__(14);
	var inherits = utils.inherits;

	/**
	 * Save timer references to avoid Sinon interfering (see GH-237).
	 */

	/* eslint-disable no-unused-vars, no-native-reassign */
	var Date = global.Date;
	var setTimeout = global.setTimeout;
	var setInterval = global.setInterval;
	var clearTimeout = global.clearTimeout;
	var clearInterval = global.clearInterval;
	/* eslint-enable no-unused-vars, no-native-reassign */

	/**
	 * Object#toString().
	 */

	var toString = Object.prototype.toString;

	/**
	 * Expose `Runnable`.
	 */

	module.exports = Runnable;

	/**
	 * Initialize a new `Runnable` with the given `title` and callback `fn`.
	 *
	 * @param {String} title
	 * @param {Function} fn
	 * @api private
	 * @param {string} title
	 * @param {Function} fn
	 */
	function Runnable(title, fn) {
	  this.title = title;
	  this.fn = fn;
	  this.async = fn && fn.length;
	  this.sync = !this.async;
	  this._timeout = 2000;
	  this._slow = 75;
	  this._enableTimeouts = true;
	  this.timedOut = false;
	  this._trace = new Error('done() called multiple times');
	  this._retries = -1;
	  this._currentRetry = 0;
	}

	/**
	 * Inherit from `EventEmitter.prototype`.
	 */
	inherits(Runnable, EventEmitter);

	/**
	 * Set & get timeout `ms`.
	 *
	 * @api private
	 * @param {number|string} ms
	 * @return {Runnable|number} ms or Runnable instance.
	 */
	Runnable.prototype.timeout = function(ms) {
	  if (!arguments.length) {
	    return this._timeout;
	  }
	  if (ms === 0) {
	    this._enableTimeouts = false;
	  }
	  if (typeof ms === 'string') {
	    ms = milliseconds(ms);
	  }
	  debug('timeout %d', ms);
	  this._timeout = ms;
	  if (this.timer) {
	    this.resetTimeout();
	  }
	  return this;
	};

	/**
	 * Set & get slow `ms`.
	 *
	 * @api private
	 * @param {number|string} ms
	 * @return {Runnable|number} ms or Runnable instance.
	 */
	Runnable.prototype.slow = function(ms) {
	  if (!arguments.length) {
	    return this._slow;
	  }
	  if (typeof ms === 'string') {
	    ms = milliseconds(ms);
	  }
	  debug('timeout %d', ms);
	  this._slow = ms;
	  return this;
	};

	/**
	 * Set and get whether timeout is `enabled`.
	 *
	 * @api private
	 * @param {boolean} enabled
	 * @return {Runnable|boolean} enabled or Runnable instance.
	 */
	Runnable.prototype.enableTimeouts = function(enabled) {
	  if (!arguments.length) {
	    return this._enableTimeouts;
	  }
	  debug('enableTimeouts %s', enabled);
	  this._enableTimeouts = enabled;
	  return this;
	};

	/**
	 * Halt and mark as pending.
	 *
	 * @api private
	 */
	Runnable.prototype.skip = function() {
	  throw new Pending();
	};

	/**
	 * Set number of retries.
	 *
	 * @api private
	 */
	Runnable.prototype.retries = function(n) {
	  if (!arguments.length) {
	    return this._retries;
	  }
	  this._retries = n;
	};

	/**
	 * Get current retry
	 *
	 * @api private
	 */
	Runnable.prototype.currentRetry = function(n) {
	  if (!arguments.length) {
	    return this._currentRetry;
	  }
	  this._currentRetry = n;
	};

	/**
	 * Return the full title generated by recursively concatenating the parent's
	 * full title.
	 *
	 * @api public
	 * @return {string}
	 */
	Runnable.prototype.fullTitle = function() {
	  return this.parent.fullTitle() + ' ' + this.title;
	};

	/**
	 * Clear the timeout.
	 *
	 * @api private
	 */
	Runnable.prototype.clearTimeout = function() {
	  clearTimeout(this.timer);
	};

	/**
	 * Inspect the runnable void of private properties.
	 *
	 * @api private
	 * @return {string}
	 */
	Runnable.prototype.inspect = function() {
	  return JSON.stringify(this, function(key, val) {
	    if (key[0] === '_') {
	      return;
	    }
	    if (key === 'parent') {
	      return '#<Suite>';
	    }
	    if (key === 'ctx') {
	      return '#<Context>';
	    }
	    return val;
	  }, 2);
	};

	/**
	 * Reset the timeout.
	 *
	 * @api private
	 */
	Runnable.prototype.resetTimeout = function() {
	  var self = this;
	  var ms = this.timeout() || 1e9;

	  if (!this._enableTimeouts) {
	    return;
	  }
	  this.clearTimeout();
	  this.timer = setTimeout(function() {
	    if (!self._enableTimeouts) {
	      return;
	    }
	    self.callback(new Error('timeout of ' + ms + 'ms exceeded. Ensure the done() callback is being called in this test.'));
	    self.timedOut = true;
	  }, ms);
	};

	/**
	 * Whitelist a list of globals for this test run.
	 *
	 * @api private
	 * @param {string[]} globals
	 */
	Runnable.prototype.globals = function(globals) {
	  if (!arguments.length) {
	    return this._allowedGlobals;
	  }
	  this._allowedGlobals = globals;
	};

	/**
	 * Run the test and invoke `fn(err)`.
	 *
	 * @param {Function} fn
	 * @api private
	 */
	Runnable.prototype.run = function(fn) {
	  var self = this;
	  var start = new Date();
	  var ctx = this.ctx;
	  var finished;
	  var emitted;

	  // Sometimes the ctx exists, but it is not runnable
	  if (ctx && ctx.runnable) {
	    ctx.runnable(this);
	  }

	  // called multiple times
	  function multiple(err) {
	    if (emitted) {
	      return;
	    }
	    emitted = true;
	    self.emit('error', err || new Error('done() called multiple times; stacktrace may be inaccurate'));
	  }

	  // finished
	  function done(err) {
	    var ms = self.timeout();
	    if (self.timedOut) {
	      return;
	    }
	    if (finished) {
	      return multiple(err || self._trace);
	    }

	    self.clearTimeout();
	    self.duration = new Date() - start;
	    finished = true;
	    if (!err && self.duration > ms && self._enableTimeouts) {
	      err = new Error('timeout of ' + ms + 'ms exceeded. Ensure the done() callback is being called in this test.');
	    }
	    fn(err);
	  }

	  // for .resetTimeout()
	  this.callback = done;

	  // explicit async with `done` argument
	  if (this.async) {
	    this.resetTimeout();

	    if (this.allowUncaught) {
	      return callFnAsync(this.fn);
	    }
	    try {
	      callFnAsync(this.fn);
	    } catch (err) {
	      done(utils.getError(err));
	    }
	    return;
	  }

	  if (this.allowUncaught) {
	    callFn(this.fn);
	    done();
	    return;
	  }

	  // sync or promise-returning
	  try {
	    if (this.pending) {
	      done();
	    } else {
	      callFn(this.fn);
	    }
	  } catch (err) {
	    done(utils.getError(err));
	  }

	  function callFn(fn) {
	    var result = fn.call(ctx);
	    if (result && typeof result.then === 'function') {
	      self.resetTimeout();
	      result
	        .then(function() {
	          done();
	          // Return null so libraries like bluebird do not warn about
	          // subsequently constructed Promises.
	          return null;
	        },
	        function(reason) {
	          done(reason || new Error('Promise rejected with no or falsy reason'));
	        });
	    } else {
	      if (self.asyncOnly) {
	        return done(new Error('--async-only option in use without declaring `done()` or returning a promise'));
	      }

	      done();
	    }
	  }

	  function callFnAsync(fn) {
	    fn.call(ctx, function(err) {
	      if (err instanceof Error || toString.call(err) === '[object Error]') {
	        return done(err);
	      }
	      if (err) {
	        if (Object.prototype.toString.call(err) === '[object Object]') {
	          return done(new Error('done() invoked with non-Error: '
	            + JSON.stringify(err)));
	        }
	        return done(new Error('done() invoked with non-Error: ' + err));
	      }
	      done();
	    });
	  }
	};


/***/ },
/* 88 */
/***/ function(module, exports) {

	
	/**
	 * Expose `Pending`.
	 */

	module.exports = Pending;

	/**
	 * Initialize a new `Pending` error with the given message.
	 *
	 * @param {string} message
	 */
	function Pending(message) {
	  this.message = message;
	}


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var Runnable = __webpack_require__(87);
	var inherits = __webpack_require__(14).inherits;

	/**
	 * Expose `Test`.
	 */

	module.exports = Test;

	/**
	 * Initialize a new `Test` with the given `title` and callback `fn`.
	 *
	 * @api private
	 * @param {String} title
	 * @param {Function} fn
	 */
	function Test(title, fn) {
	  Runnable.call(this, title, fn);
	  this.pending = !fn;
	  this.type = 'test';
	  this.body = (fn || '').toString();
	}

	/**
	 * Inherit from `Runnable.prototype`.
	 */
	inherits(Test, Runnable);

	Test.prototype.clone = function() {
	  var test = new Test(this.title, this.fn);
	  test.timeout(this.timeout());
	  test.slow(this.slow());
	  test.enableTimeouts(this.enableTimeouts());
	  test.retries(this.retries());
	  test.currentRetry(this.currentRetry());
	  test.globals(this.globals());
	  test.parent = this.parent;
	  test.file = this.file;
	  test.ctx = this.ctx;
	  return test;
	};


/***/ },
/* 90 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Functions common to more than one interface.
	 *
	 * @param {Suite[]} suites
	 * @param {Context} context
	 * @return {Object} An object containing common functions.
	 */
	module.exports = function(suites, context) {
	  return {
	    /**
	     * This is only present if flag --delay is passed into Mocha. It triggers
	     * root suite execution.
	     *
	     * @param {Suite} suite The root wuite.
	     * @return {Function} A function which runs the root suite
	     */
	    runWithSuite: function runWithSuite(suite) {
	      return function run() {
	        suite.run();
	      };
	    },

	    /**
	     * Execute before running tests.
	     *
	     * @param {string} name
	     * @param {Function} fn
	     */
	    before: function(name, fn) {
	      suites[0].beforeAll(name, fn);
	    },

	    /**
	     * Execute after running tests.
	     *
	     * @param {string} name
	     * @param {Function} fn
	     */
	    after: function(name, fn) {
	      suites[0].afterAll(name, fn);
	    },

	    /**
	     * Execute before each test case.
	     *
	     * @param {string} name
	     * @param {Function} fn
	     */
	    beforeEach: function(name, fn) {
	      suites[0].beforeEach(name, fn);
	    },

	    /**
	     * Execute after each test case.
	     *
	     * @param {string} name
	     * @param {Function} fn
	     */
	    afterEach: function(name, fn) {
	      suites[0].afterEach(name, fn);
	    },

	    test: {
	      /**
	       * Pending test case.
	       *
	       * @param {string} title
	       */
	      skip: function(title) {
	        context.test(title);
	      },

	      /**
	       * Number of retry attempts
	       *
	       * @param {string} n
	       */
	      retries: function(n) {
	        context.retries(n);
	      }
	    }
	  };
	};


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var Suite = __webpack_require__(85);
	var Test = __webpack_require__(89);
	var escapeRe = __webpack_require__(7);

	/**
	 * TDD-style interface:
	 *
	 *      suite('Array', function() {
	 *        suite('#indexOf()', function() {
	 *          suiteSetup(function() {
	 *
	 *          });
	 *
	 *          test('should return -1 when not present', function() {
	 *
	 *          });
	 *
	 *          test('should return the index when present', function() {
	 *
	 *          });
	 *
	 *          suiteTeardown(function() {
	 *
	 *          });
	 *        });
	 *      });
	 *
	 * @param {Suite} suite Root suite.
	 */
	module.exports = function(suite) {
	  var suites = [suite];

	  suite.on('pre-require', function(context, file, mocha) {
	    var common = __webpack_require__(90)(suites, context);

	    context.setup = common.beforeEach;
	    context.teardown = common.afterEach;
	    context.suiteSetup = common.before;
	    context.suiteTeardown = common.after;
	    context.run = mocha.options.delay && common.runWithSuite(suite);

	    /**
	     * Describe a "suite" with the given `title` and callback `fn` containing
	     * nested suites and/or tests.
	     */
	    context.suite = function(title, fn) {
	      var suite = Suite.create(suites[0], title);
	      suite.file = file;
	      suites.unshift(suite);
	      fn.call(suite);
	      suites.shift();
	      return suite;
	    };

	    /**
	     * Pending suite.
	     */
	    context.suite.skip = function(title, fn) {
	      var suite = Suite.create(suites[0], title);
	      suite.pending = true;
	      suites.unshift(suite);
	      fn.call(suite);
	      suites.shift();
	    };

	    /**
	     * Exclusive test-case.
	     */
	    context.suite.only = function(title, fn) {
	      var suite = context.suite(title, fn);
	      mocha.grep(suite.fullTitle());
	    };

	    /**
	     * Describe a specification or test-case with the given `title` and
	     * callback `fn` acting as a thunk.
	     */
	    context.test = function(title, fn) {
	      var suite = suites[0];
	      if (suite.pending) {
	        fn = null;
	      }
	      var test = new Test(title, fn);
	      test.file = file;
	      suite.addTest(test);
	      return test;
	    };

	    /**
	     * Exclusive test-case.
	     */

	    context.test.only = function(title, fn) {
	      var test = context.test(title, fn);
	      var reString = '^' + escapeRe(test.fullTitle()) + '$';
	      mocha.grep(new RegExp(reString));
	    };

	    context.test.skip = common.test.skip;
	    context.test.retries = common.test.retries;
	  });
	};


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var Suite = __webpack_require__(85);
	var Test = __webpack_require__(89);
	var escapeRe = __webpack_require__(7);

	/**
	 * QUnit-style interface:
	 *
	 *     suite('Array');
	 *
	 *     test('#length', function() {
	 *       var arr = [1,2,3];
	 *       ok(arr.length == 3);
	 *     });
	 *
	 *     test('#indexOf()', function() {
	 *       var arr = [1,2,3];
	 *       ok(arr.indexOf(1) == 0);
	 *       ok(arr.indexOf(2) == 1);
	 *       ok(arr.indexOf(3) == 2);
	 *     });
	 *
	 *     suite('String');
	 *
	 *     test('#length', function() {
	 *       ok('foo'.length == 3);
	 *     });
	 *
	 * @param {Suite} suite Root suite.
	 */
	module.exports = function(suite) {
	  var suites = [suite];

	  suite.on('pre-require', function(context, file, mocha) {
	    var common = __webpack_require__(90)(suites, context);

	    context.before = common.before;
	    context.after = common.after;
	    context.beforeEach = common.beforeEach;
	    context.afterEach = common.afterEach;
	    context.run = mocha.options.delay && common.runWithSuite(suite);
	    /**
	     * Describe a "suite" with the given `title`.
	     */

	    context.suite = function(title) {
	      if (suites.length > 1) {
	        suites.shift();
	      }
	      var suite = Suite.create(suites[0], title);
	      suite.file = file;
	      suites.unshift(suite);
	      return suite;
	    };

	    /**
	     * Exclusive test-case.
	     */

	    context.suite.only = function(title, fn) {
	      var suite = context.suite(title, fn);
	      mocha.grep(suite.fullTitle());
	    };

	    /**
	     * Describe a specification or test-case
	     * with the given `title` and callback `fn`
	     * acting as a thunk.
	     */

	    context.test = function(title, fn) {
	      var test = new Test(title, fn);
	      test.file = file;
	      suites[0].addTest(test);
	      return test;
	    };

	    /**
	     * Exclusive test-case.
	     */

	    context.test.only = function(title, fn) {
	      var test = context.test(title, fn);
	      var reString = '^' + escapeRe(test.fullTitle()) + '$';
	      mocha.grep(new RegExp(reString));
	    };

	    context.test.skip = common.test.skip;
	    context.test.retries = common.test.retries;
	  });
	};


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var Suite = __webpack_require__(85);
	var Test = __webpack_require__(89);

	/**
	 * TDD-style interface:
	 *
	 *     exports.Array = {
	 *       '#indexOf()': {
	 *         'should return -1 when the value is not present': function() {
	 *
	 *         },
	 *
	 *         'should return the correct index when the value is present': function() {
	 *
	 *         }
	 *       }
	 *     };
	 *
	 * @param {Suite} suite Root suite.
	 */
	module.exports = function(suite) {
	  var suites = [suite];

	  suite.on('require', visit);

	  function visit(obj, file) {
	    var suite;
	    for (var key in obj) {
	      if (typeof obj[key] === 'function') {
	        var fn = obj[key];
	        switch (key) {
	          case 'before':
	            suites[0].beforeAll(fn);
	            break;
	          case 'after':
	            suites[0].afterAll(fn);
	            break;
	          case 'beforeEach':
	            suites[0].beforeEach(fn);
	            break;
	          case 'afterEach':
	            suites[0].afterEach(fn);
	            break;
	          default:
	            var test = new Test(key, fn);
	            test.file = file;
	            suites[0].addTest(test);
	        }
	      } else {
	        suite = Suite.create(suites[0], key);
	        suites.unshift(suite);
	        visit(obj[key], file);
	        suites.shift();
	      }
	    }
	  }
	};


/***/ },
/* 94 */
/***/ function(module, exports) {

	/**
	 * Expose `Context`.
	 */

	module.exports = Context;

	/**
	 * Initialize a new `Context`.
	 *
	 * @api private
	 */
	function Context() {}

	/**
	 * Set or get the context `Runnable` to `runnable`.
	 *
	 * @api private
	 * @param {Runnable} runnable
	 * @return {Context}
	 */
	Context.prototype.runnable = function(runnable) {
	  if (!arguments.length) {
	    return this._runnable;
	  }
	  this.test = this._runnable = runnable;
	  return this;
	};

	/**
	 * Set test timeout `ms`.
	 *
	 * @api private
	 * @param {number} ms
	 * @return {Context} self
	 */
	Context.prototype.timeout = function(ms) {
	  if (!arguments.length) {
	    return this.runnable().timeout();
	  }
	  this.runnable().timeout(ms);
	  return this;
	};

	/**
	 * Set test timeout `enabled`.
	 *
	 * @api private
	 * @param {boolean} enabled
	 * @return {Context} self
	 */
	Context.prototype.enableTimeouts = function(enabled) {
	  this.runnable().enableTimeouts(enabled);
	  return this;
	};

	/**
	 * Set test slowness threshold `ms`.
	 *
	 * @api private
	 * @param {number} ms
	 * @return {Context} self
	 */
	Context.prototype.slow = function(ms) {
	  this.runnable().slow(ms);
	  return this;
	};

	/**
	 * Mark a test as skipped.
	 *
	 * @api private
	 * @return {Context} self
	 */
	Context.prototype.skip = function() {
	  this.runnable().skip();
	  return this;
	};

	/**
	 * Allow a number of retries on failed tests
	 *
	 * @api private
	 * @param {number} n
	 * @return {Context} self
	 */
	Context.prototype.retries = function(n) {
	  if (!arguments.length) {
	    return this.runnable().retries();
	  }
	  this.runnable().retries(n);
	  return this;
	};

	/**
	 * Inspect the context void of `._runnable`.
	 *
	 * @api private
	 * @return {string}
	 */
	Context.prototype.inspect = function() {
	  return JSON.stringify(this, function(key, val) {
	    return key === 'runnable' || key === 'test' ? undefined : val;
	  }, 2);
	};


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var EventEmitter = __webpack_require__(37).EventEmitter;
	var Pending = __webpack_require__(88);
	var utils = __webpack_require__(14);
	var inherits = utils.inherits;
	var debug = __webpack_require__(15)('mocha:runner');
	var Runnable = __webpack_require__(87);
	var filter = utils.filter;
	var indexOf = utils.indexOf;
	var keys = utils.keys;
	var stackFilter = utils.stackTraceFilter();
	var stringify = utils.stringify;
	var type = utils.type;
	var undefinedError = utils.undefinedError;
	var isArray = utils.isArray;

	/**
	 * Non-enumerable globals.
	 */

	var globals = [
	  'setTimeout',
	  'clearTimeout',
	  'setInterval',
	  'clearInterval',
	  'XMLHttpRequest',
	  'Date',
	  'setImmediate',
	  'clearImmediate'
	];

	/**
	 * Expose `Runner`.
	 */

	module.exports = Runner;

	/**
	 * Initialize a `Runner` for the given `suite`.
	 *
	 * Events:
	 *
	 *   - `start`  execution started
	 *   - `end`  execution complete
	 *   - `suite`  (suite) test suite execution started
	 *   - `suite end`  (suite) all tests (and sub-suites) have finished
	 *   - `test`  (test) test execution started
	 *   - `test end`  (test) test completed
	 *   - `hook`  (hook) hook execution started
	 *   - `hook end`  (hook) hook complete
	 *   - `pass`  (test) test passed
	 *   - `fail`  (test, err) test failed
	 *   - `pending`  (test) test pending
	 *
	 * @api public
	 * @param {Suite} suite Root suite
	 * @param {boolean} [delay] Whether or not to delay execution of root suite
	 * until ready.
	 */
	function Runner(suite, delay) {
	  var self = this;
	  this._globals = [];
	  this._abort = false;
	  this._delay = delay;
	  this.suite = suite;
	  this.started = false;
	  this.total = suite.total();
	  this.failures = 0;
	  this.on('test end', function(test) {
	    self.checkGlobals(test);
	  });
	  this.on('hook end', function(hook) {
	    self.checkGlobals(hook);
	  });
	  this._defaultGrep = /.*/;
	  this.grep(this._defaultGrep);
	  this.globals(this.globalProps().concat(extraGlobals()));
	}

	/**
	 * Wrapper for setImmediate, process.nextTick, or browser polyfill.
	 *
	 * @param {Function} fn
	 * @api private
	 */
	Runner.immediately = global.setImmediate || process.nextTick;

	/**
	 * Inherit from `EventEmitter.prototype`.
	 */
	inherits(Runner, EventEmitter);

	/**
	 * Run tests with full titles matching `re`. Updates runner.total
	 * with number of tests matched.
	 *
	 * @param {RegExp} re
	 * @param {Boolean} invert
	 * @return {Runner} for chaining
	 * @api public
	 * @param {RegExp} re
	 * @param {boolean} invert
	 * @return {Runner} Runner instance.
	 */
	Runner.prototype.grep = function(re, invert) {
	  debug('grep %s', re);
	  this._grep = re;
	  this._invert = invert;
	  this.total = this.grepTotal(this.suite);
	  return this;
	};

	/**
	 * Returns the number of tests matching the grep search for the
	 * given suite.
	 *
	 * @param {Suite} suite
	 * @return {Number}
	 * @api public
	 * @param {Suite} suite
	 * @return {number}
	 */
	Runner.prototype.grepTotal = function(suite) {
	  var self = this;
	  var total = 0;

	  suite.eachTest(function(test) {
	    var match = self._grep.test(test.fullTitle());
	    if (self._invert) {
	      match = !match;
	    }
	    if (match) {
	      total++;
	    }
	  });

	  return total;
	};

	/**
	 * Return a list of global properties.
	 *
	 * @return {Array}
	 * @api private
	 */
	Runner.prototype.globalProps = function() {
	  var props = keys(global);

	  // non-enumerables
	  for (var i = 0; i < globals.length; ++i) {
	    if (~indexOf(props, globals[i])) {
	      continue;
	    }
	    props.push(globals[i]);
	  }

	  return props;
	};

	/**
	 * Allow the given `arr` of globals.
	 *
	 * @param {Array} arr
	 * @return {Runner} for chaining
	 * @api public
	 * @param {Array} arr
	 * @return {Runner} Runner instance.
	 */
	Runner.prototype.globals = function(arr) {
	  if (!arguments.length) {
	    return this._globals;
	  }
	  debug('globals %j', arr);
	  this._globals = this._globals.concat(arr);
	  return this;
	};

	/**
	 * Check for global variable leaks.
	 *
	 * @api private
	 */
	Runner.prototype.checkGlobals = function(test) {
	  if (this.ignoreLeaks) {
	    return;
	  }
	  var ok = this._globals;

	  var globals = this.globalProps();
	  var leaks;

	  if (test) {
	    ok = ok.concat(test._allowedGlobals || []);
	  }

	  if (this.prevGlobalsLength === globals.length) {
	    return;
	  }
	  this.prevGlobalsLength = globals.length;

	  leaks = filterLeaks(ok, globals);
	  this._globals = this._globals.concat(leaks);

	  if (leaks.length > 1) {
	    this.fail(test, new Error('global leaks detected: ' + leaks.join(', ') + ''));
	  } else if (leaks.length) {
	    this.fail(test, new Error('global leak detected: ' + leaks[0]));
	  }
	};

	/**
	 * Fail the given `test`.
	 *
	 * @api private
	 * @param {Test} test
	 * @param {Error} err
	 */
	Runner.prototype.fail = function(test, err) {
	  ++this.failures;
	  test.state = 'failed';

	  if (!(err instanceof Error || err && typeof err.message === 'string')) {
	    err = new Error('the ' + type(err) + ' ' + stringify(err) + ' was thrown, throw an Error :)');
	  }

	  err.stack = (this.fullStackTrace || !err.stack)
	    ? err.stack
	    : stackFilter(err.stack);

	  this.emit('fail', test, err);
	};

	/**
	 * Fail the given `hook` with `err`.
	 *
	 * Hook failures work in the following pattern:
	 * - If bail, then exit
	 * - Failed `before` hook skips all tests in a suite and subsuites,
	 *   but jumps to corresponding `after` hook
	 * - Failed `before each` hook skips remaining tests in a
	 *   suite and jumps to corresponding `after each` hook,
	 *   which is run only once
	 * - Failed `after` hook does not alter
	 *   execution order
	 * - Failed `after each` hook skips remaining tests in a
	 *   suite and subsuites, but executes other `after each`
	 *   hooks
	 *
	 * @api private
	 * @param {Hook} hook
	 * @param {Error} err
	 */
	Runner.prototype.failHook = function(hook, err) {
	  if (hook.ctx && hook.ctx.currentTest) {
	    hook.originalTitle = hook.originalTitle || hook.title;
	    hook.title = hook.originalTitle + ' for "' + hook.ctx.currentTest.title + '"';
	  }

	  this.fail(hook, err);
	  if (this.suite.bail()) {
	    this.emit('end');
	  }
	};

	/**
	 * Run hook `name` callbacks and then invoke `fn()`.
	 *
	 * @api private
	 * @param {string} name
	 * @param {Function} fn
	 */

	Runner.prototype.hook = function(name, fn) {
	  var suite = this.suite;
	  var hooks = suite['_' + name];
	  var self = this;

	  function next(i) {
	    var hook = hooks[i];
	    if (!hook) {
	      return fn();
	    }
	    self.currentRunnable = hook;

	    hook.ctx.currentTest = self.test;

	    self.emit('hook', hook);

	    if (!hook.listeners('error').length) {
	      hook.on('error', function(err) {
	        self.failHook(hook, err);
	      });
	    }

	    hook.run(function(err) {
	      var testError = hook.error();
	      if (testError) {
	        self.fail(self.test, testError);
	      }
	      if (err) {
	        if (err instanceof Pending) {
	          suite.pending = true;
	        } else {
	          self.failHook(hook, err);

	          // stop executing hooks, notify callee of hook err
	          return fn(err);
	        }
	      }
	      self.emit('hook end', hook);
	      delete hook.ctx.currentTest;
	      next(++i);
	    });
	  }

	  Runner.immediately(function() {
	    next(0);
	  });
	};

	/**
	 * Run hook `name` for the given array of `suites`
	 * in order, and callback `fn(err, errSuite)`.
	 *
	 * @api private
	 * @param {string} name
	 * @param {Array} suites
	 * @param {Function} fn
	 */
	Runner.prototype.hooks = function(name, suites, fn) {
	  var self = this;
	  var orig = this.suite;

	  function next(suite) {
	    self.suite = suite;

	    if (!suite) {
	      self.suite = orig;
	      return fn();
	    }

	    self.hook(name, function(err) {
	      if (err) {
	        var errSuite = self.suite;
	        self.suite = orig;
	        return fn(err, errSuite);
	      }

	      next(suites.pop());
	    });
	  }

	  next(suites.pop());
	};

	/**
	 * Run hooks from the top level down.
	 *
	 * @param {String} name
	 * @param {Function} fn
	 * @api private
	 */
	Runner.prototype.hookUp = function(name, fn) {
	  var suites = [this.suite].concat(this.parents()).reverse();
	  this.hooks(name, suites, fn);
	};

	/**
	 * Run hooks from the bottom up.
	 *
	 * @param {String} name
	 * @param {Function} fn
	 * @api private
	 */
	Runner.prototype.hookDown = function(name, fn) {
	  var suites = [this.suite].concat(this.parents());
	  this.hooks(name, suites, fn);
	};

	/**
	 * Return an array of parent Suites from
	 * closest to furthest.
	 *
	 * @return {Array}
	 * @api private
	 */
	Runner.prototype.parents = function() {
	  var suite = this.suite;
	  var suites = [];
	  while (suite.parent) {
	    suite = suite.parent;
	    suites.push(suite);
	  }
	  return suites;
	};

	/**
	 * Run the current test and callback `fn(err)`.
	 *
	 * @param {Function} fn
	 * @api private
	 */
	Runner.prototype.runTest = function(fn) {
	  var self = this;
	  var test = this.test;

	  if (this.asyncOnly) {
	    test.asyncOnly = true;
	  }

	  if (this.allowUncaught) {
	    test.allowUncaught = true;
	    return test.run(fn);
	  }
	  try {
	    test.on('error', function(err) {
	      self.fail(test, err);
	    });
	    test.run(fn);
	  } catch (err) {
	    fn(err);
	  }
	};

	/**
	 * Run tests in the given `suite` and invoke the callback `fn()` when complete.
	 *
	 * @api private
	 * @param {Suite} suite
	 * @param {Function} fn
	 */
	Runner.prototype.runTests = function(suite, fn) {
	  var self = this;
	  var tests = suite.tests.slice();
	  var test;

	  function hookErr(_, errSuite, after) {
	    // before/after Each hook for errSuite failed:
	    var orig = self.suite;

	    // for failed 'after each' hook start from errSuite parent,
	    // otherwise start from errSuite itself
	    self.suite = after ? errSuite.parent : errSuite;

	    if (self.suite) {
	      // call hookUp afterEach
	      self.hookUp('afterEach', function(err2, errSuite2) {
	        self.suite = orig;
	        // some hooks may fail even now
	        if (err2) {
	          return hookErr(err2, errSuite2, true);
	        }
	        // report error suite
	        fn(errSuite);
	      });
	    } else {
	      // there is no need calling other 'after each' hooks
	      self.suite = orig;
	      fn(errSuite);
	    }
	  }

	  function next(err, errSuite) {
	    // if we bail after first err
	    if (self.failures && suite._bail) {
	      return fn();
	    }

	    if (self._abort) {
	      return fn();
	    }

	    if (err) {
	      return hookErr(err, errSuite, true);
	    }

	    // next test
	    test = tests.shift();

	    // all done
	    if (!test) {
	      return fn();
	    }

	    // grep
	    var match = self._grep.test(test.fullTitle());
	    if (self._invert) {
	      match = !match;
	    }
	    if (!match) {
	      // Run immediately only if we have defined a grep. When we
	      // define a grep — It can cause maximum callstack error if
	      // the grep is doing a large recursive loop by neglecting
	      // all tests. The run immediately function also comes with
	      // a performance cost. So we don't want to run immediately
	      // if we run the whole test suite, because running the whole
	      // test suite don't do any immediate recursive loops. Thus,
	      // allowing a JS runtime to breathe.
	      if (self._grep !== self._defaultGrep) {
	        Runner.immediately(next);
	      } else {
	        next();
	      }
	      return;
	    }

	    function parentPending(suite) {
	      return suite.pending || (suite.parent && parentPending(suite.parent));
	    }

	    // pending
	    if (test.pending || parentPending(test.parent)) {
	      self.emit('pending', test);
	      self.emit('test end', test);
	      return next();
	    }

	    // execute test and hook(s)
	    self.emit('test', self.test = test);
	    self.hookDown('beforeEach', function(err, errSuite) {
	      if (suite.pending) {
	        self.emit('pending', test);
	        self.emit('test end', test);
	        return next();
	      }
	      if (err) {
	        return hookErr(err, errSuite, false);
	      }
	      self.currentRunnable = self.test;
	      self.runTest(function(err) {
	        test = self.test;
	        if (err) {
	          var retry = test.currentRetry();
	          if (err instanceof Pending) {
	            test.pending = true;
	            self.emit('pending', test);
	          } else if (retry < test.retries()) {
	            var clonedTest = test.clone();
	            clonedTest.currentRetry(retry + 1);
	            tests.unshift(clonedTest);

	            // Early return + hook trigger so that it doesn't
	            // increment the count wrong
	            return self.hookUp('afterEach', next);
	          } else {
	            self.fail(test, err);
	          }
	          self.emit('test end', test);

	          if (err instanceof Pending) {
	            return next();
	          }

	          return self.hookUp('afterEach', next);
	        }

	        test.state = 'passed';
	        self.emit('pass', test);
	        self.emit('test end', test);
	        self.hookUp('afterEach', next);
	      });
	    });
	  }

	  this.next = next;
	  this.hookErr = hookErr;
	  next();
	};

	/**
	 * Run the given `suite` and invoke the callback `fn()` when complete.
	 *
	 * @api private
	 * @param {Suite} suite
	 * @param {Function} fn
	 */
	Runner.prototype.runSuite = function(suite, fn) {
	  var i = 0;
	  var self = this;
	  var total = this.grepTotal(suite);
	  var afterAllHookCalled = false;

	  debug('run suite %s', suite.fullTitle());

	  if (!total || (self.failures && suite._bail)) {
	    return fn();
	  }

	  this.emit('suite', this.suite = suite);

	  function next(errSuite) {
	    if (errSuite) {
	      // current suite failed on a hook from errSuite
	      if (errSuite === suite) {
	        // if errSuite is current suite
	        // continue to the next sibling suite
	        return done();
	      }
	      // errSuite is among the parents of current suite
	      // stop execution of errSuite and all sub-suites
	      return done(errSuite);
	    }

	    if (self._abort) {
	      return done();
	    }

	    var curr = suite.suites[i++];
	    if (!curr) {
	      return done();
	    }

	    // Avoid grep neglecting large number of tests causing a
	    // huge recursive loop and thus a maximum call stack error.
	    // See comment in `this.runTests()` for more information.
	    if (self._grep !== self._defaultGrep) {
	      Runner.immediately(function() {
	        self.runSuite(curr, next);
	      });
	    } else {
	      self.runSuite(curr, next);
	    }
	  }

	  function done(errSuite) {
	    self.suite = suite;
	    self.nextSuite = next;

	    if (afterAllHookCalled) {
	      fn(errSuite);
	    } else {
	      // mark that the afterAll block has been called once
	      // and so can be skipped if there is an error in it.
	      afterAllHookCalled = true;

	      // remove reference to test
	      delete self.test;

	      self.hook('afterAll', function() {
	        self.emit('suite end', suite);
	        fn(errSuite);
	      });
	    }
	  }

	  this.nextSuite = next;

	  this.hook('beforeAll', function(err) {
	    if (err) {
	      return done();
	    }
	    self.runTests(suite, next);
	  });
	};

	/**
	 * Handle uncaught exceptions.
	 *
	 * @param {Error} err
	 * @api private
	 */
	Runner.prototype.uncaught = function(err) {
	  if (err) {
	    debug('uncaught exception %s', err !== function() {
	      return this;
	    }.call(err) ? err : (err.message || err));
	  } else {
	    debug('uncaught undefined exception');
	    err = undefinedError();
	  }
	  err.uncaught = true;

	  var runnable = this.currentRunnable;

	  if (!runnable) {
	    runnable = new Runnable('Uncaught error outside test suite');
	    runnable.parent = this.suite;

	    if (this.started) {
	      this.fail(runnable, err);
	    } else {
	      // Can't recover from this failure
	      this.emit('start');
	      this.fail(runnable, err);
	      this.emit('end');
	    }

	    return;
	  }

	  runnable.clearTimeout();

	  // Ignore errors if complete
	  if (runnable.state) {
	    return;
	  }
	  this.fail(runnable, err);

	  // recover from test
	  if (runnable.type === 'test') {
	    this.emit('test end', runnable);
	    this.hookUp('afterEach', this.next);
	    return;
	  }

	 // recover from hooks
	  if (runnable.type === 'hook') {
	    var errSuite = this.suite;
	    // if hook failure is in afterEach block
	    if (runnable.fullTitle().indexOf('after each') > -1) {
	      return this.hookErr(err, errSuite, true);
	    }
	    // if hook failure is in beforeEach block
	    if (runnable.fullTitle().indexOf('before each') > -1) {
	      return this.hookErr(err, errSuite, false);
	    }
	    // if hook failure is in after or before blocks
	    return this.nextSuite(errSuite);
	  }

	  // bail
	  this.emit('end');
	};

	/**
	 * Cleans up the references to all the deferred functions
	 * (before/after/beforeEach/afterEach) and tests of a Suite.
	 * These must be deleted otherwise a memory leak can happen,
	 * as those functions may reference variables from closures,
	 * thus those variables can never be garbage collected as long
	 * as the deferred functions exist.
	 *
	 * @param {Suite} suite
	 */
	function cleanSuiteReferences(suite) {
	  function cleanArrReferences(arr) {
	    for (var i = 0; i < arr.length; i++) {
	      delete arr[i].fn;
	    }
	  }

	  if (isArray(suite._beforeAll)) {
	    cleanArrReferences(suite._beforeAll);
	  }

	  if (isArray(suite._beforeEach)) {
	    cleanArrReferences(suite._beforeEach);
	  }

	  if (isArray(suite._afterAll)) {
	    cleanArrReferences(suite._afterAll);
	  }

	  if (isArray(suite._afterEach)) {
	    cleanArrReferences(suite._afterEach);
	  }

	  for (var i = 0; i < suite.tests.length; i++) {
	    delete suite.tests[i].fn;
	  }
	}

	/**
	 * Run the root suite and invoke `fn(failures)`
	 * on completion.
	 *
	 * @param {Function} fn
	 * @return {Runner} for chaining
	 * @api public
	 * @param {Function} fn
	 * @return {Runner} Runner instance.
	 */
	Runner.prototype.run = function(fn) {
	  var self = this;
	  var rootSuite = this.suite;

	  fn = fn || function() {};

	  function uncaught(err) {
	    self.uncaught(err);
	  }

	  function start() {
	    self.started = true;
	    self.emit('start');
	    self.runSuite(rootSuite, function() {
	      debug('finished running');
	      self.emit('end');
	    });
	  }

	  debug('start');

	  // references cleanup to avoid memory leaks
	  this.on('suite end', cleanSuiteReferences);

	  // callback
	  this.on('end', function() {
	    debug('end');
	    process.removeListener('uncaughtException', uncaught);
	    fn(self.failures);
	  });

	  // uncaught exception
	  process.on('uncaughtException', uncaught);

	  if (this._delay) {
	    // for reporters, I guess.
	    // might be nice to debounce some dots while we wait.
	    this.emit('waiting', rootSuite);
	    rootSuite.once('run', start);
	  } else {
	    start();
	  }

	  return this;
	};

	/**
	 * Cleanly abort execution.
	 *
	 * @api public
	 * @return {Runner} Runner instance.
	 */
	Runner.prototype.abort = function() {
	  debug('aborting');
	  this._abort = true;

	  return this;
	};

	/**
	 * Filter leaks with the given globals flagged as `ok`.
	 *
	 * @api private
	 * @param {Array} ok
	 * @param {Array} globals
	 * @return {Array}
	 */
	function filterLeaks(ok, globals) {
	  return filter(globals, function(key) {
	    // Firefox and Chrome exposes iframes as index inside the window object
	    if (/^d+/.test(key)) {
	      return false;
	    }

	    // in firefox
	    // if runner runs in an iframe, this iframe's window.getInterface method not init at first
	    // it is assigned in some seconds
	    if (global.navigator && (/^getInterface/).test(key)) {
	      return false;
	    }

	    // an iframe could be approached by window[iframeIndex]
	    // in ie6,7,8 and opera, iframeIndex is enumerable, this could cause leak
	    if (global.navigator && (/^\d+/).test(key)) {
	      return false;
	    }

	    // Opera and IE expose global variables for HTML element IDs (issue #243)
	    if (/^mocha-/.test(key)) {
	      return false;
	    }

	    var matched = filter(ok, function(ok) {
	      if (~ok.indexOf('*')) {
	        return key.indexOf(ok.split('*')[0]) === 0;
	      }
	      return key === ok;
	    });
	    return !matched.length && (!global.navigator || key !== 'onerror');
	  });
	}

	/**
	 * Array of globals dependent on the environment.
	 *
	 * @return {Array}
	 * @api private
	 */
	function extraGlobals() {
	  if (typeof process === 'object' && typeof process.version === 'string') {
	    var parts = process.version.split('.');
	    var nodeVersion = utils.reduce(parts, function(a, v) {
	      return a << 8 | v;
	    });

	    // 'errno' was renamed to process._errno in v0.9.11.

	    if (nodeVersion < 0x00090B) {
	      return ['errno'];
	    }
	  }

	  return [];
	}


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./browser/debug": 97,
		"./browser/debug.js": 97,
		"./browser/events": 98,
		"./browser/events.js": 98,
		"./browser/progress": 44,
		"./browser/progress.js": 44,
		"./browser/tty": 99,
		"./browser/tty.js": 99,
		"./context": 94,
		"./context.js": 94,
		"./hook": 86,
		"./hook.js": 86,
		"./interfaces/bdd": 84,
		"./interfaces/bdd.js": 84,
		"./interfaces/common": 90,
		"./interfaces/common.js": 90,
		"./interfaces/exports": 93,
		"./interfaces/exports.js": 93,
		"./interfaces/index": 83,
		"./interfaces/index.js": 83,
		"./interfaces/qunit": 92,
		"./interfaces/qunit.js": 92,
		"./interfaces/tdd": 91,
		"./interfaces/tdd.js": 91,
		"./mocha": 5,
		"./mocha.js": 5,
		"./ms": 13,
		"./ms.js": 13,
		"./pending": 88,
		"./pending.js": 88,
		"./reporters/base": 10,
		"./reporters/base.js": 10,
		"./reporters/doc": 40,
		"./reporters/doc.js": 40,
		"./reporters/dot": 39,
		"./reporters/dot.js": 39,
		"./reporters/html": 43,
		"./reporters/html-cov": 55,
		"./reporters/html-cov.js": 55,
		"./reporters/html.js": 43,
		"./reporters/index": 9,
		"./reporters/index.js": 9,
		"./reporters/json": 42,
		"./reporters/json-cov": 54,
		"./reporters/json-cov.js": 54,
		"./reporters/json-stream": 82,
		"./reporters/json-stream.js": 82,
		"./reporters/json.js": 42,
		"./reporters/landing": 53,
		"./reporters/landing.js": 53,
		"./reporters/list": 45,
		"./reporters/list.js": 45,
		"./reporters/markdown": 51,
		"./reporters/markdown.js": 51,
		"./reporters/min": 46,
		"./reporters/min.js": 46,
		"./reporters/nyan": 48,
		"./reporters/nyan.js": 48,
		"./reporters/progress": 52,
		"./reporters/progress.js": 52,
		"./reporters/spec": 47,
		"./reporters/spec.js": 47,
		"./reporters/tap": 41,
		"./reporters/tap.js": 41,
		"./reporters/xunit": 49,
		"./reporters/xunit.js": 49,
		"./runnable": 87,
		"./runnable.js": 87,
		"./runner": 95,
		"./runner.js": 95,
		"./suite": 85,
		"./suite.js": 85,
		"./test": 89,
		"./test.js": 89,
		"./utils": 14,
		"./utils.js": 14
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 96;


/***/ },
/* 97 */
/***/ function(module, exports) {

	/* eslint-disable no-unused-vars */
	module.exports = function(type) {
	  return function() {};
	};


/***/ },
/* 98 */
/***/ function(module, exports) {

	/**
	 * Module exports.
	 */

	exports.EventEmitter = EventEmitter;

	/**
	 * Object#hasOwnProperty reference.
	 */
	var objToString = Object.prototype.toString;

	/**
	 * Check if a value is an array.
	 *
	 * @api private
	 * @param {*} val The value to test.
	 * @return {boolean} true if the value is a boolean, otherwise false.
	 */
	function isArray(val) {
	  return objToString.call(val) === '[object Array]';
	}

	/**
	 * Event emitter constructor.
	 *
	 * @api public
	 */
	function EventEmitter() {}

	/**
	 * Add a listener.
	 *
	 * @api public
	 * @param {string} name Event name.
	 * @param {Function} fn Event handler.
	 * @return {EventEmitter} Emitter instance.
	 */
	EventEmitter.prototype.on = function(name, fn) {
	  if (!this.$events) {
	    this.$events = {};
	  }

	  if (!this.$events[name]) {
	    this.$events[name] = fn;
	  } else if (isArray(this.$events[name])) {
	    this.$events[name].push(fn);
	  } else {
	    this.$events[name] = [this.$events[name], fn];
	  }

	  return this;
	};

	EventEmitter.prototype.addListener = EventEmitter.prototype.on;

	/**
	 * Adds a volatile listener.
	 *
	 * @api public
	 * @param {string} name Event name.
	 * @param {Function} fn Event handler.
	 * @return {EventEmitter} Emitter instance.
	 */
	EventEmitter.prototype.once = function(name, fn) {
	  var self = this;

	  function on() {
	    self.removeListener(name, on);
	    fn.apply(this, arguments);
	  }

	  on.listener = fn;
	  this.on(name, on);

	  return this;
	};

	/**
	 * Remove a listener.
	 *
	 * @api public
	 * @param {string} name Event name.
	 * @param {Function} fn Event handler.
	 * @return {EventEmitter} Emitter instance.
	 */
	EventEmitter.prototype.removeListener = function(name, fn) {
	  if (this.$events && this.$events[name]) {
	    var list = this.$events[name];

	    if (isArray(list)) {
	      var pos = -1;

	      for (var i = 0, l = list.length; i < l; i++) {
	        if (list[i] === fn || (list[i].listener && list[i].listener === fn)) {
	          pos = i;
	          break;
	        }
	      }

	      if (pos < 0) {
	        return this;
	      }

	      list.splice(pos, 1);

	      if (!list.length) {
	        delete this.$events[name];
	      }
	    } else if (list === fn || (list.listener && list.listener === fn)) {
	      delete this.$events[name];
	    }
	  }

	  return this;
	};

	/**
	 * Remove all listeners for an event.
	 *
	 * @api public
	 * @param {string} name Event name.
	 * @return {EventEmitter} Emitter instance.
	 */
	EventEmitter.prototype.removeAllListeners = function(name) {
	  if (name === undefined) {
	    this.$events = {};
	    return this;
	  }

	  if (this.$events && this.$events[name]) {
	    this.$events[name] = null;
	  }

	  return this;
	};

	/**
	 * Get all listeners for a given event.
	 *
	 * @api public
	 * @param {string} name Event name.
	 * @return {EventEmitter} Emitter instance.
	 */
	EventEmitter.prototype.listeners = function(name) {
	  if (!this.$events) {
	    this.$events = {};
	  }

	  if (!this.$events[name]) {
	    this.$events[name] = [];
	  }

	  if (!isArray(this.$events[name])) {
	    this.$events[name] = [this.$events[name]];
	  }

	  return this.$events[name];
	};

	/**
	 * Emit an event.
	 *
	 * @api public
	 * @param {string} name Event name.
	 * @return {boolean} true if at least one handler was invoked, else false.
	 */
	EventEmitter.prototype.emit = function(name) {
	  if (!this.$events) {
	    return false;
	  }

	  var handler = this.$events[name];

	  if (!handler) {
	    return false;
	  }

	  var args = Array.prototype.slice.call(arguments, 1);

	  if (typeof handler === 'function') {
	    handler.apply(this, args);
	  } else if (isArray(handler)) {
	    var listeners = handler.slice();

	    for (var i = 0, l = listeners.length; i < l; i++) {
	      listeners[i].apply(this, args);
	    }
	  } else {
	    return false;
	  }

	  return true;
	};


/***/ },
/* 99 */
/***/ function(module, exports) {

	exports.isatty = function isatty() {
	  return true;
	};

	exports.getWindowSize = function getWindowSize() {
	  if ('innerHeight' in global) {
	    return [global.innerHeight, global.innerWidth];
	  }
	  // In a Web Worker, the DOM Window is not available.
	  return [640, 480];
	};


/***/ },
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	// Growl - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

	/**
	 * Module dependencies.
	 */

	var exec = __webpack_require__(106).exec
	  , fs = __webpack_require__(19)
	  , path = __webpack_require__(8)
	  , exists = fs.existsSync || path.existsSync
	  , os = __webpack_require__(107)
	  , quote = JSON.stringify
	  , cmd;

	function which(name) {
	  var paths = process.env.PATH.split(':');
	  var loc;
	  
	  for (var i = 0, len = paths.length; i < len; ++i) {
	    loc = path.join(paths[i], name);
	    if (exists(loc)) return loc;
	  }
	}

	switch(os.type()) {
	  case 'Darwin':
	    if (which('terminal-notifier')) {
	      cmd = {
	          type: "Darwin-NotificationCenter"
	        , pkg: "terminal-notifier"
	        , msg: '-message'
	        , title: '-title'
	        , subtitle: '-subtitle'
	        , priority: {
	              cmd: '-execute'
	            , range: []
	          }
	      };
	    } else {
	      cmd = {
	          type: "Darwin-Growl"
	        , pkg: "growlnotify"
	        , msg: '-m'
	        , sticky: '--sticky'
	        , priority: {
	              cmd: '--priority'
	            , range: [
	                -2
	              , -1
	              , 0
	              , 1
	              , 2
	              , "Very Low"
	              , "Moderate"
	              , "Normal"
	              , "High"
	              , "Emergency"
	            ]
	          }
	      };
	    }
	    break;
	  case 'Linux':
	    cmd = {
	        type: "Linux"
	      , pkg: "notify-send"
	      , msg: ''
	      , sticky: '-t 0'
	      , icon: '-i'
	      , priority: {
	          cmd: '-u'
	        , range: [
	            "low"
	          , "normal"
	          , "critical"
	        ]
	      }
	    };
	    break;
	  case 'Windows_NT':
	    cmd = {
	        type: "Windows"
	      , pkg: "growlnotify"
	      , msg: ''
	      , sticky: '/s:true'
	      , title: '/t:'
	      , icon: '/i:'
	      , priority: {
	            cmd: '/p:'
	          , range: [
	              -2
	            , -1
	            , 0
	            , 1
	            , 2
	          ]
	        }
	    };
	    break;
	}

	/**
	 * Expose `growl`.
	 */

	exports = module.exports = growl;

	/**
	 * Node-growl version.
	 */

	exports.version = '1.4.1'

	/**
	 * Send growl notification _msg_ with _options_.
	 *
	 * Options:
	 *
	 *  - title   Notification title
	 *  - sticky  Make the notification stick (defaults to false)
	 *  - priority  Specify an int or named key (default is 0)
	 *  - name    Application name (defaults to growlnotify)
	 *  - image
	 *    - path to an icon sets --iconpath
	 *    - path to an image sets --image
	 *    - capitalized word sets --appIcon
	 *    - filename uses extname as --icon
	 *    - otherwise treated as --icon
	 *
	 * Examples:
	 *
	 *   growl('New email')
	 *   growl('5 new emails', { title: 'Thunderbird' })
	 *   growl('Email sent', function(){
	 *     // ... notification sent
	 *   })
	 *
	 * @param {string} msg
	 * @param {object} options
	 * @param {function} fn
	 * @api public
	 */

	function growl(msg, options, fn) {
	  var image
	    , args
	    , options = options || {}
	    , fn = fn || function(){};

	  // noop
	  if (!cmd) return fn(new Error('growl not supported on this platform'));
	  args = [cmd.pkg];

	  // image
	  if (image = options.image) {
	    switch(cmd.type) {
	      case 'Darwin-Growl':
	        var flag, ext = path.extname(image).substr(1)
	        flag = flag || ext == 'icns' && 'iconpath'
	        flag = flag || /^[A-Z]/.test(image) && 'appIcon'
	        flag = flag || /^png|gif|jpe?g$/.test(ext) && 'image'
	        flag = flag || ext && (image = ext) && 'icon'
	        flag = flag || 'icon'
	        args.push('--' + flag, quote(image))
	        break;
	      case 'Linux':
	        args.push(cmd.icon, quote(image));
	        // libnotify defaults to sticky, set a hint for transient notifications
	        if (!options.sticky) args.push('--hint=int:transient:1');
	        break;
	      case 'Windows':
	        args.push(cmd.icon + quote(image));
	        break;
	    }
	  }

	  // sticky
	  if (options.sticky) args.push(cmd.sticky);

	  // priority
	  if (options.priority) {
	    var priority = options.priority + '';
	    var checkindexOf = cmd.priority.range.indexOf(priority);
	    if (~cmd.priority.range.indexOf(priority)) {
	      args.push(cmd.priority, options.priority);
	    }
	  }

	  // name
	  if (options.name && cmd.type === "Darwin-Growl") {
	    args.push('--name', options.name);
	  }

	  switch(cmd.type) {
	    case 'Darwin-Growl':
	      args.push(cmd.msg);
	      args.push(quote(msg));
	      if (options.title) args.push(quote(options.title));
	      break;
	    case 'Darwin-NotificationCenter':
	      args.push(cmd.msg);
	      args.push(quote(msg));
	      if (options.title) {
	        args.push(cmd.title);
	        args.push(quote(options.title));
	      }
	      if (options.subtitle) {
	        args.push(cmd.subtitle);
	        args.push(quote(options.subtitle));
	      }
	      break;
	    case 'Darwin-Growl':
	      args.push(cmd.msg);
	      args.push(quote(msg));
	      if (options.title) args.push(quote(options.title));
	      break;
	    case 'Linux':
	      if (options.title) {
	        args.push(quote(options.title));
	        args.push(cmd.msg);
	        args.push(quote(msg));
	      } else {
	        args.push(quote(msg));
	      }
	      break;
	    case 'Windows':
	      args.push(quote(msg));
	      if (options.title) args.push(cmd.title + quote(options.title));
	      break;
	  }

	  // execute
	  exec(args.join(' '), fn);
	};


/***/ },
/* 106 */
/***/ function(module, exports) {

	module.exports = require("child_process");

/***/ },
/* 107 */
/***/ function(module, exports) {

	module.exports = require("os");

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./EnhancedMocha": 3,
		"./EnhancedMocha.js": 3,
		"./example/dep": 110,
		"./example/dep.js": 110,
		"./example/test": 111,
		"./example/test.js": 111,
		"./index": 112,
		"./index.js": 112,
		"./start": 118,
		"./start.js": 118,
		"./web": 119,
		"./web.js": 119
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 108;


/***/ },
/* 109 */,
/* 110 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	describe("test-case", function() {
		it("should run", function(done) {
			setTimeout(done, 1000);
		});
		it("should fail", function(done) {
			setTimeout(function() {
				throw new Error("Fail");
			}, 1000);
		});
		it("should randomly fail", function() {
			if(__webpack_require__(110))
				throw new Error("Random fail");
		});
	});

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var path = __webpack_require__(8);
	var loaderUtils = __webpack_require__(113);
	module.exports = function() {};
	module.exports.pitch = function(req) {
		this.cacheable && this.cacheable();
		var query = loaderUtils.parseQuery(this.query);
		var source = [];
		if(this.target == "web") {
			source.push("require(" + JSON.stringify("!!" + path.join(__dirname, "web.js")) + ");");
			source.push("mocha.setup(" + JSON.stringify(query["interface"] || "bdd") + ");");
			source.push("require(" + JSON.stringify("!!" + req) + ")");
			source.push("require(" + JSON.stringify("!!" + path.join(__dirname, "start.js")) + ");");
			source.push("if(module.hot) {");
			source.push("\tmodule.hot.accept();");
			source.push("\tmodule.hot.dispose(function() {");
			source.push("\t\tmocha.suite.suites.length = 0;");
			source.push("\t\tvar stats = document.getElementById('mocha-stats');");
			source.push("\t\tvar report = document.getElementById('mocha-report');");
			source.push("\t\tstats.parentNode.removeChild(stats);");
			source.push("\t\treport.parentNode.removeChild(report);");
			source.push("\t});");
			source.push("}");
		} else if(this.target == "node") {
			source.push('var EnhancedMocha = require(' + JSON.stringify("!!" + path.join(__dirname, "EnhancedMocha.js")) + ');');
			source.push('var mocha = new EnhancedMocha({reporter: ' + JSON.stringify(query.reporter || "spec") + '});');
			source.push('mocha.addFile(' + JSON.stringify("!!" + req) + ');');
			source.push('mocha.watch();');
		} else {
			throw new Error("Unsupported target environment " + this.target);
		}
		return source.join("\n");
	}

	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var JSON5 = __webpack_require__(114);
	var path = __webpack_require__(8);

	var baseEncodeTables = {
		26: "abcdefghijklmnopqrstuvwxyz",
		32: "123456789abcdefghjkmnpqrstuvwxyz", // no 0lio
		36: "0123456789abcdefghijklmnopqrstuvwxyz",
		49: "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ", // no lIO
		52: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
		58: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ", // no 0lIO
		62: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
		64: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"
	};

	function encodeBufferToBase(buffer, base, length) {
		var encodeTable = baseEncodeTables[base];
		if (!encodeTable) throw new Error("Enknown encoding base" + base);

		var readLength = buffer.length;

		var Big = __webpack_require__(115);
		Big.RM = Big.DP = 0;
		var b = new Big(0);
		for (var i = readLength - 1; i >= 0; i--) {
			b = b.times(256).plus(buffer[i]);
		}

		var output = "";
		while (b.gt(0)) {
			output = encodeTable[b.mod(base)] + output;
			b = b.div(base);
		}

		Big.DP = 20;
		Big.RM = 1;

		return output;
	}

	exports.parseQuery = function parseQuery(query) {
		var specialValues = {
			'null': null,
			'true': true,
			'false': false
		};
		if(!query) return {};
		if(typeof query !== "string")
			throw new Error("parseQuery should get a string as first argument");
		if(query.substr(0, 1) !== "?")
			throw new Error("a vaild query string passed to parseQuery should begin with '?'");
		query = query.substr(1);
		var queryLength = query.length;
		if(query.substr(0, 1) === "{" && query.substr(-1) === "}") {
			return JSON5.parse(query);
		}
		var queryArgs = query.split(/[,\&]/g);
		var result = {};
		queryArgs.forEach(function(arg) {
			var idx = arg.indexOf("=");
			if(idx >= 0) {
				var name = arg.substr(0, idx);
				var value = decodeURIComponent(arg.substr(idx+1));
				if (specialValues.hasOwnProperty(value)) {
					value = specialValues[value];
				}
				if(name.substr(-2) === "[]") {
					name = decodeURIComponent(name.substr(0, name.length-2));
					if(!Array.isArray(result[name]))
						result[name] = [];
					result[name].push(value);
				} else {
					result[name] = value;
				}
			} else {
				if(arg.substr(0, 1) === "-") {
					result[arg.substr(1)] = false;
				} else if(arg.substr(0, 1) === "+") {
					result[arg.substr(1)] = true;
				} else {
					result[arg] = true;
				}
			}
		});
		return result;
	};

	exports.stringifyRequest = function(loaderContext, request) {
		var splitted = request.split("!");
		var context = loaderContext.context || (loaderContext.options && loaderContext.options.context);
		return JSON.stringify(splitted.map(function(part) {
			if(/^\/|^[A-Z]:/i.test(part) && context) {
				part = path.relative(context, part);
				if(/^[A-Z]:/i.test(part)) {
					return part;
				} else {
					return "./" + part.replace(/\\/g, "/");
				}
			}
			return part;
		}).join("!"));
	};

	function dotRequest(obj) {
		return obj.request;
	}

	exports.getRemainingRequest = function(loaderContext) {
		var request = loaderContext.loaders.slice(loaderContext.loaderIndex+1).map(dotRequest).concat([loaderContext.resource]);
		return request.join("!");
	};

	exports.getCurrentRequest = function(loaderContext) {
		var request = loaderContext.loaders.slice(loaderContext.loaderIndex).map(dotRequest).concat([loaderContext.resource]);
		return request.join("!");
	};

	exports.isUrlRequest = function(url, root) {
		// An URL is not an request if
		// 1. it's a Data Url
		// 2. it's an absolute url or and protocol-relative
		// 3. it's some kind of url for a template
		if(/^data:|^chrome-extension:|^(https?:)?\/\/|^[\{\}\[\]#*;,'§\$%&\(=?`´\^°<>]/.test(url)) return false;
		// 4. It's also not an request if root isn't set and it's a root-relative url
		if((root === undefined || root === false) && /^\//.test(url)) return false;
		return true;
	};

	exports.urlToRequest = function(url, root) {
		var moduleRequestRegex = /^[^?]*~/;
		var request;

		if(root !== undefined && root !== false && /^\//.test(url)) {
			// if root is set and the url is root-relative
			switch(typeof root) {
				// 1. root is a string: root is prefixed to the url
				case "string":
					// special case: `~` roots convert to module request
					if (moduleRequestRegex.test(root)) {
						request = root.replace(/([^~\/])$/, "$1/") + url.slice(1);
					} else {
						request = root + url;
					}
					break;
				// 2. root is `true`: absolute paths are allowed
				//    *nix only, windows-style absolute paths are always allowed as they doesn't start with a `/`
				case "boolean":
					request = url;
					break;
				default:
					throw new Error("Unexpected parameters to loader-utils 'urlToRequest': url = " + url + ", root = " + root + ".");
			}
		} else if(/^\.\.?\//.test(url)) {
			// A relative url stays
			request = url;
		} else {
			// every other url is threaded like a relative url
			request = "./" + url;
		}

		// A `~` makes the url an module
		if (moduleRequestRegex.test(request)) {
			request = request.replace(moduleRequestRegex, "");
		}

		return request;
	};

	exports.parseString = function parseString(str) {
		try {
			if(str[0] === '"') return JSON.parse(str);
			if(str[0] === "'" && str.substr(str.length - 1) === "'") {
				return parseString(str.replace(/\\.|"/g, function(x) {
					if(x === '"') return '\\"';
					return x;
				}).replace(/^'|'$/g, '"'));
			}
			return JSON.parse('"' + str + '"');
		} catch(e) {
			return str;
		}
	};

	exports.getHashDigest = function getHashDigest(buffer, hashType, digestType, maxLength) {
		hashType = hashType || "md5";
		maxLength = maxLength || 9999;
		var hash = new (__webpack_require__(116).Hash)(hashType);
		hash.update(buffer);
		if (digestType === "base26" || digestType === "base32" || digestType === "base36" ||
		    digestType === "base49" || digestType === "base52" || digestType === "base58" ||
		    digestType === "base62" || digestType === "base64") {
			return encodeBufferToBase(hash.digest(), digestType.substr(4), maxLength).substr(0, maxLength);
		} else {
			return hash.digest(digestType || "hex").substr(0, maxLength);
		}
	};

	exports.interpolateName = function interpolateName(loaderContext, name, options) {
		var filename = name || "[hash].[ext]";
		var context = options.context;
		var content = options.content;
		var regExp = options.regExp;
		var ext = "bin";
		var basename = "file";
		var directory = "";
		if(loaderContext.resourcePath) {
			var resourcePath = loaderContext.resourcePath;
			var idx = resourcePath.lastIndexOf(".");
			var i = resourcePath.lastIndexOf("\\");
			var j = resourcePath.lastIndexOf("/");
			var p = i < 0 ? j : j < 0 ? i : i < j ? i : j;
			if(idx >= 0) {
				ext = resourcePath.substr(idx+1);
				resourcePath = resourcePath.substr(0, idx);
			}
			if(p >= 0) {
				basename = resourcePath.substr(p+1);
				resourcePath = resourcePath.substr(0, p+1);
			}
			if (typeof context !== 'undefined') {
				directory = path.relative(context, resourcePath + "_").replace(/\\/g, "/").replace(/\.\.(\/)?/g, "_$1");
				directory = directory.substr(0, directory.length-1);
			}
			else {
				directory = resourcePath.replace(/\\/g, "/").replace(/\.\.(\/)?/g, "_$1");
			}
			if(directory.length === 1) directory = "";
		}
		var url = filename;
		if(content) {
			// Match hash template
			url = url.replace(/\[(?:(\w+):)?hash(?::([a-z]+\d*))?(?::(\d+))?\]/ig, function() {
				return exports.getHashDigest(content, arguments[1], arguments[2], parseInt(arguments[3], 10));
			});
		}
		url = url.replace(/\[ext\]/ig, function() {
			return ext;
		}).replace(/\[name\]/ig, function() {
			return basename;
		}).replace(/\[path\]/ig, function() {
			return directory;
		});
		if(regExp && loaderContext.resourcePath) {
			var re = new RegExp(regExp);
			var match = loaderContext.resourcePath.match(regExp);
			if(match) {
				for (var i = 1; i < match.length; i++) {
					var re = new RegExp("\\[" + i + "\\]", "ig");
					url = url.replace(re, match[i]);
				}
			}
		}
		return url;
	};


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	// json5.js
	// Modern JSON. See README.md for details.
	//
	// This file is based directly off of Douglas Crockford's json_parse.js:
	// https://github.com/douglascrockford/JSON-js/blob/master/json_parse.js

	var JSON5 = ( true ? exports : {});

	JSON5.parse = (function () {
	    "use strict";

	// This is a function that can parse a JSON5 text, producing a JavaScript
	// data structure. It is a simple, recursive descent parser. It does not use
	// eval or regular expressions, so it can be used as a model for implementing
	// a JSON5 parser in other languages.

	// We are defining the function inside of another function to avoid creating
	// global variables.

	    var at,     // The index of the current character
	        ch,     // The current character
	        escapee = {
	            "'":  "'",
	            '"':  '"',
	            '\\': '\\',
	            '/':  '/',
	            '\n': '',       // Replace escaped newlines in strings w/ empty string
	            b:    '\b',
	            f:    '\f',
	            n:    '\n',
	            r:    '\r',
	            t:    '\t'
	        },
	        ws = [
	            ' ',
	            '\t',
	            '\r',
	            '\n',
	            '\v',
	            '\f',
	            '\xA0',
	            '\uFEFF'
	        ],
	        text,

	        error = function (m) {

	// Call error when something is wrong.

	            var error = new SyntaxError();
	            error.message = m;
	            error.at = at;
	            error.text = text;
	            throw error;
	        },

	        next = function (c) {

	// If a c parameter is provided, verify that it matches the current character.

	            if (c && c !== ch) {
	                error("Expected '" + c + "' instead of '" + ch + "'");
	            }

	// Get the next character. When there are no more characters,
	// return the empty string.

	            ch = text.charAt(at);
	            at += 1;
	            return ch;
	        },

	        peek = function () {

	// Get the next character without consuming it or
	// assigning it to the ch varaible.

	            return text.charAt(at);
	        },

	        identifier = function () {

	// Parse an identifier. Normally, reserved words are disallowed here, but we
	// only use this for unquoted object keys, where reserved words are allowed,
	// so we don't check for those here. References:
	// - http://es5.github.com/#x7.6
	// - https://developer.mozilla.org/en/Core_JavaScript_1.5_Guide/Core_Language_Features#Variables
	// - http://docstore.mik.ua/orelly/webprog/jscript/ch02_07.htm
	// TODO Identifiers can have Unicode "letters" in them; add support for those.

	            var key = ch;

	            // Identifiers must start with a letter, _ or $.
	            if ((ch !== '_' && ch !== '$') &&
	                    (ch < 'a' || ch > 'z') &&
	                    (ch < 'A' || ch > 'Z')) {
	                error("Bad identifier");
	            }

	            // Subsequent characters can contain digits.
	            while (next() && (
	                    ch === '_' || ch === '$' ||
	                    (ch >= 'a' && ch <= 'z') ||
	                    (ch >= 'A' && ch <= 'Z') ||
	                    (ch >= '0' && ch <= '9'))) {
	                key += ch;
	            }

	            return key;
	        },

	        number = function () {

	// Parse a number value.

	            var number,
	                sign = '',
	                string = '',
	                base = 10;

	            if (ch === '-' || ch === '+') {
	                sign = ch;
	                next(ch);
	            }

	            // support for Infinity (could tweak to allow other words):
	            if (ch === 'I') {
	                number = word();
	                if (typeof number !== 'number' || isNaN(number)) {
	                    error('Unexpected word for number');
	                }
	                return (sign === '-') ? -number : number;
	            }

	            // support for NaN
	            if (ch === 'N' ) {
	              number = word();
	              if (!isNaN(number)) {
	                error('expected word to be NaN');
	              }
	              // ignore sign as -NaN also is NaN
	              return number;
	            }

	            if (ch === '0') {
	                string += ch;
	                next();
	                if (ch === 'x' || ch === 'X') {
	                    string += ch;
	                    next();
	                    base = 16;
	                } else if (ch >= '0' && ch <= '9') {
	                    error('Octal literal');
	                }
	            }

	            switch (base) {
	            case 10:
	                while (ch >= '0' && ch <= '9' ) {
	                    string += ch;
	                    next();
	                }
	                if (ch === '.') {
	                    string += '.';
	                    while (next() && ch >= '0' && ch <= '9') {
	                        string += ch;
	                    }
	                }
	                if (ch === 'e' || ch === 'E') {
	                    string += ch;
	                    next();
	                    if (ch === '-' || ch === '+') {
	                        string += ch;
	                        next();
	                    }
	                    while (ch >= '0' && ch <= '9') {
	                        string += ch;
	                        next();
	                    }
	                }
	                break;
	            case 16:
	                while (ch >= '0' && ch <= '9' || ch >= 'A' && ch <= 'F' || ch >= 'a' && ch <= 'f') {
	                    string += ch;
	                    next();
	                }
	                break;
	            }

	            if(sign === '-') {
	                number = -string;
	            } else {
	                number = +string;
	            }
	            
	            if (!isFinite(number)) {
	                error("Bad number");
	            } else {
	                return number;
	            }
	        },

	        string = function () {

	// Parse a string value.

	            var hex,
	                i,
	                string = '',
	                delim,      // double quote or single quote
	                uffff;

	// When parsing for string values, we must look for ' or " and \ characters.

	            if (ch === '"' || ch === "'") {
	                delim = ch;
	                while (next()) {
	                    if (ch === delim) {
	                        next();
	                        return string;
	                    } else if (ch === '\\') {
	                        next();
	                        if (ch === 'u') {
	                            uffff = 0;
	                            for (i = 0; i < 4; i += 1) {
	                                hex = parseInt(next(), 16);
	                                if (!isFinite(hex)) {
	                                    break;
	                                }
	                                uffff = uffff * 16 + hex;
	                            }
	                            string += String.fromCharCode(uffff);
	                        } else if (ch === '\r') {
	                            if (peek() === '\n') {
	                                next();
	                            }
	                        } else if (typeof escapee[ch] === 'string') {
	                            string += escapee[ch];
	                        } else {
	                            break;
	                        }
	                    } else if (ch === '\n') {
	                        // unescaped newlines are invalid; see:
	                        // https://github.com/aseemk/json5/issues/24
	                        // TODO this feels special-cased; are there other
	                        // invalid unescaped chars?
	                        break;
	                    } else {
	                        string += ch;
	                    }
	                }
	            }
	            error("Bad string");
	        },

	        inlineComment = function () {

	// Skip an inline comment, assuming this is one. The current character should
	// be the second / character in the // pair that begins this inline comment.
	// To finish the inline comment, we look for a newline or the end of the text.

	            if (ch !== '/') {
	                error("Not an inline comment");
	            }

	            do {
	                next();
	                if (ch === '\n' || ch === '\r') {
	                    next();
	                    return;
	                }
	            } while (ch);
	        },

	        blockComment = function () {

	// Skip a block comment, assuming this is one. The current character should be
	// the * character in the /* pair that begins this block comment.
	// To finish the block comment, we look for an ending */ pair of characters,
	// but we also watch for the end of text before the comment is terminated.

	            if (ch !== '*') {
	                error("Not a block comment");
	            }

	            do {
	                next();
	                while (ch === '*') {
	                    next('*');
	                    if (ch === '/') {
	                        next('/');
	                        return;
	                    }
	                }
	            } while (ch);

	            error("Unterminated block comment");
	        },

	        comment = function () {

	// Skip a comment, whether inline or block-level, assuming this is one.
	// Comments always begin with a / character.

	            if (ch !== '/') {
	                error("Not a comment");
	            }

	            next('/');

	            if (ch === '/') {
	                inlineComment();
	            } else if (ch === '*') {
	                blockComment();
	            } else {
	                error("Unrecognized comment");
	            }
	        },

	        white = function () {

	// Skip whitespace and comments.
	// Note that we're detecting comments by only a single / character.
	// This works since regular expressions are not valid JSON(5), but this will
	// break if there are other valid values that begin with a / character!

	            while (ch) {
	                if (ch === '/') {
	                    comment();
	                } else if (ws.indexOf(ch) >= 0) {
	                    next();
	                } else {
	                    return;
	                }
	            }
	        },

	        word = function () {

	// true, false, or null.

	            switch (ch) {
	            case 't':
	                next('t');
	                next('r');
	                next('u');
	                next('e');
	                return true;
	            case 'f':
	                next('f');
	                next('a');
	                next('l');
	                next('s');
	                next('e');
	                return false;
	            case 'n':
	                next('n');
	                next('u');
	                next('l');
	                next('l');
	                return null;
	            case 'I':
	                next('I');
	                next('n');
	                next('f');
	                next('i');
	                next('n');
	                next('i');
	                next('t');
	                next('y');
	                return Infinity;
	            case 'N':
	              next( 'N' );
	              next( 'a' );
	              next( 'N' );
	              return NaN;
	            }
	            error("Unexpected '" + ch + "'");
	        },

	        value,  // Place holder for the value function.

	        array = function () {

	// Parse an array value.

	            var array = [];

	            if (ch === '[') {
	                next('[');
	                white();
	                while (ch) {
	                    if (ch === ']') {
	                        next(']');
	                        return array;   // Potentially empty array
	                    }
	                    // ES5 allows omitting elements in arrays, e.g. [,] and
	                    // [,null]. We don't allow this in JSON5.
	                    if (ch === ',') {
	                        error("Missing array element");
	                    } else {
	                        array.push(value());
	                    }
	                    white();
	                    // If there's no comma after this value, this needs to
	                    // be the end of the array.
	                    if (ch !== ',') {
	                        next(']');
	                        return array;
	                    }
	                    next(',');
	                    white();
	                }
	            }
	            error("Bad array");
	        },

	        object = function () {

	// Parse an object value.

	            var key,
	                object = {};

	            if (ch === '{') {
	                next('{');
	                white();
	                while (ch) {
	                    if (ch === '}') {
	                        next('}');
	                        return object;   // Potentially empty object
	                    }

	                    // Keys can be unquoted. If they are, they need to be
	                    // valid JS identifiers.
	                    if (ch === '"' || ch === "'") {
	                        key = string();
	                    } else {
	                        key = identifier();
	                    }

	                    white();
	                    next(':');
	                    object[key] = value();
	                    white();
	                    // If there's no comma after this pair, this needs to be
	                    // the end of the object.
	                    if (ch !== ',') {
	                        next('}');
	                        return object;
	                    }
	                    next(',');
	                    white();
	                }
	            }
	            error("Bad object");
	        };

	    value = function () {

	// Parse a JSON value. It could be an object, an array, a string, a number,
	// or a word.

	        white();
	        switch (ch) {
	        case '{':
	            return object();
	        case '[':
	            return array();
	        case '"':
	        case "'":
	            return string();
	        case '-':
	        case '+':
	        case '.':
	            return number();
	        default:
	            return ch >= '0' && ch <= '9' ? number() : word();
	        }
	    };

	// Return the json_parse function. It will have access to all of the above
	// functions and variables.

	    return function (source, reviver) {
	        var result;

	        text = String(source);
	        at = 0;
	        ch = ' ';
	        result = value();
	        white();
	        if (ch) {
	            error("Syntax error");
	        }

	// If there is a reviver function, we recursively walk the new structure,
	// passing each name/value pair to the reviver function for possible
	// transformation, starting with a temporary root object that holds the result
	// in an empty key. If there is not a reviver function, we simply return the
	// result.

	        return typeof reviver === 'function' ? (function walk(holder, key) {
	            var k, v, value = holder[key];
	            if (value && typeof value === 'object') {
	                for (k in value) {
	                    if (Object.prototype.hasOwnProperty.call(value, k)) {
	                        v = walk(value, k);
	                        if (v !== undefined) {
	                            value[k] = v;
	                        } else {
	                            delete value[k];
	                        }
	                    }
	                }
	            }
	            return reviver.call(holder, key, value);
	        }({'': result}, '')) : result;
	    };
	}());

	// JSON5 stringify will not quote keys where appropriate
	JSON5.stringify = function (obj, replacer, space) {
	    if (replacer && (typeof(replacer) !== "function" && !isArray(replacer))) {
	        throw new Error('Replacer must be a function or an array');
	    }
	    var getReplacedValueOrUndefined = function(holder, key, isTopLevel) {
	        var value = holder[key];

	        // Replace the value with its toJSON value first, if possible
	        if (value && value.toJSON && typeof value.toJSON === "function") {
	            value = value.toJSON();
	        }

	        // If the user-supplied replacer if a function, call it. If it's an array, check objects' string keys for
	        // presence in the array (removing the key/value pair from the resulting JSON if the key is missing).
	        if (typeof(replacer) === "function") {
	            return replacer.call(holder, key, value);
	        } else if(replacer) {
	            if (isTopLevel || isArray(holder) || replacer.indexOf(key) >= 0) {
	                return value;
	            } else {
	                return undefined;
	            }
	        } else {
	            return value;
	        }
	    };

	    function isWordChar(char) {
	        return (char >= 'a' && char <= 'z') ||
	            (char >= 'A' && char <= 'Z') ||
	            (char >= '0' && char <= '9') ||
	            char === '_' || char === '$';
	    }

	    function isWordStart(char) {
	        return (char >= 'a' && char <= 'z') ||
	            (char >= 'A' && char <= 'Z') ||
	            char === '_' || char === '$';
	    }

	    function isWord(key) {
	        if (typeof key !== 'string') {
	            return false;
	        }
	        if (!isWordStart(key[0])) {
	            return false;
	        }
	        var i = 1, length = key.length;
	        while (i < length) {
	            if (!isWordChar(key[i])) {
	                return false;
	            }
	            i++;
	        }
	        return true;
	    }

	    // export for use in tests
	    JSON5.isWord = isWord;

	    // polyfills
	    function isArray(obj) {
	        if (Array.isArray) {
	            return Array.isArray(obj);
	        } else {
	            return Object.prototype.toString.call(obj) === '[object Array]';
	        }
	    }

	    function isDate(obj) {
	        return Object.prototype.toString.call(obj) === '[object Date]';
	    }

	    isNaN = isNaN || function(val) {
	        return typeof val === 'number' && val !== val;
	    };

	    var objStack = [];
	    function checkForCircular(obj) {
	        for (var i = 0; i < objStack.length; i++) {
	            if (objStack[i] === obj) {
	                throw new TypeError("Converting circular structure to JSON");
	            }
	        }
	    }

	    function makeIndent(str, num, noNewLine) {
	        if (!str) {
	            return "";
	        }
	        // indentation no more than 10 chars
	        if (str.length > 10) {
	            str = str.substring(0, 10);
	        }

	        var indent = noNewLine ? "" : "\n";
	        for (var i = 0; i < num; i++) {
	            indent += str;
	        }

	        return indent;
	    }

	    var indentStr;
	    if (space) {
	        if (typeof space === "string") {
	            indentStr = space;
	        } else if (typeof space === "number" && space >= 0) {
	            indentStr = makeIndent(" ", space, true);
	        } else {
	            // ignore space parameter
	        }
	    }

	    // Copied from Crokford's implementation of JSON
	    // See https://github.com/douglascrockford/JSON-js/blob/e39db4b7e6249f04a195e7dd0840e610cc9e941e/json2.js#L195
	    // Begin
	    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	        meta = { // table of character substitutions
	        '\b': '\\b',
	        '\t': '\\t',
	        '\n': '\\n',
	        '\f': '\\f',
	        '\r': '\\r',
	        '"' : '\\"',
	        '\\': '\\\\'
	    };
	    function escapeString(string) {

	// If the string contains no control characters, no quote characters, and no
	// backslash characters, then we can safely slap some quotes around it.
	// Otherwise we must also replace the offending characters with safe escape
	// sequences.
	        escapable.lastIndex = 0;
	        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
	            var c = meta[a];
	            return typeof c === 'string' ?
	                c :
	                '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
	        }) + '"' : '"' + string + '"';
	    }
	    // End

	    function internalStringify(holder, key, isTopLevel) {
	        var buffer, res;

	        // Replace the value, if necessary
	        var obj_part = getReplacedValueOrUndefined(holder, key, isTopLevel);

	        if (obj_part && !isDate(obj_part)) {
	            // unbox objects
	            // don't unbox dates, since will turn it into number
	            obj_part = obj_part.valueOf();
	        }
	        switch(typeof obj_part) {
	            case "boolean":
	                return obj_part.toString();

	            case "number":
	                if (isNaN(obj_part) || !isFinite(obj_part)) {
	                    return "null";
	                }
	                return obj_part.toString();

	            case "string":
	                return escapeString(obj_part.toString());

	            case "object":
	                if (obj_part === null) {
	                    return "null";
	                } else if (isArray(obj_part)) {
	                    checkForCircular(obj_part);
	                    buffer = "[";
	                    objStack.push(obj_part);

	                    for (var i = 0; i < obj_part.length; i++) {
	                        res = internalStringify(obj_part, i, false);
	                        buffer += makeIndent(indentStr, objStack.length);
	                        if (res === null || typeof res === "undefined") {
	                            buffer += "null";
	                        } else {
	                            buffer += res;
	                        }
	                        if (i < obj_part.length-1) {
	                            buffer += ",";
	                        } else if (indentStr) {
	                            buffer += "\n";
	                        }
	                    }
	                    objStack.pop();
	                    buffer += makeIndent(indentStr, objStack.length, true) + "]";
	                } else {
	                    checkForCircular(obj_part);
	                    buffer = "{";
	                    var nonEmpty = false;
	                    objStack.push(obj_part);
	                    for (var prop in obj_part) {
	                        if (obj_part.hasOwnProperty(prop)) {
	                            var value = internalStringify(obj_part, prop, false);
	                            isTopLevel = false;
	                            if (typeof value !== "undefined" && value !== null) {
	                                buffer += makeIndent(indentStr, objStack.length);
	                                nonEmpty = true;
	                                var key = isWord(prop) ? prop : escapeString(prop);
	                                buffer += key + ":" + (indentStr ? ' ' : '') + value + ",";
	                            }
	                        }
	                    }
	                    objStack.pop();
	                    if (nonEmpty) {
	                        buffer = buffer.substring(0, buffer.length-1) + makeIndent(indentStr, objStack.length) + "}";
	                    } else {
	                        buffer = '{}';
	                    }
	                }
	                return buffer;
	            default:
	                // functions and undefined should be ignored
	                return undefined;
	        }
	    }

	    // special case...when undefined is used inside of
	    // a compound object/array, return null.
	    // but when top-level, return undefined
	    var topLevelHolder = {"":obj};
	    if (obj === undefined) {
	        return getReplacedValueOrUndefined(topLevelHolder, '', true);
	    }
	    return internalStringify(topLevelHolder, '', true);
	};


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* big.js v3.1.3 https://github.com/MikeMcl/big.js/LICENCE */
	;(function (global) {
	    'use strict';

	/*
	  big.js v3.1.3
	  A small, fast, easy-to-use library for arbitrary-precision decimal arithmetic.
	  https://github.com/MikeMcl/big.js/
	  Copyright (c) 2014 Michael Mclaughlin <M8ch88l@gmail.com>
	  MIT Expat Licence
	*/

	/***************************** EDITABLE DEFAULTS ******************************/

	    // The default values below must be integers within the stated ranges.

	    /*
	     * The maximum number of decimal places of the results of operations
	     * involving division: div and sqrt, and pow with negative exponents.
	     */
	    var DP = 20,                           // 0 to MAX_DP

	        /*
	         * The rounding mode used when rounding to the above decimal places.
	         *
	         * 0 Towards zero (i.e. truncate, no rounding).       (ROUND_DOWN)
	         * 1 To nearest neighbour. If equidistant, round up.  (ROUND_HALF_UP)
	         * 2 To nearest neighbour. If equidistant, to even.   (ROUND_HALF_EVEN)
	         * 3 Away from zero.                                  (ROUND_UP)
	         */
	        RM = 1,                            // 0, 1, 2 or 3

	        // The maximum value of DP and Big.DP.
	        MAX_DP = 1E6,                      // 0 to 1000000

	        // The maximum magnitude of the exponent argument to the pow method.
	        MAX_POWER = 1E6,                   // 1 to 1000000

	        /*
	         * The exponent value at and beneath which toString returns exponential
	         * notation.
	         * JavaScript's Number type: -7
	         * -1000000 is the minimum recommended exponent value of a Big.
	         */
	        E_NEG = -7,                   // 0 to -1000000

	        /*
	         * The exponent value at and above which toString returns exponential
	         * notation.
	         * JavaScript's Number type: 21
	         * 1000000 is the maximum recommended exponent value of a Big.
	         * (This limit is not enforced or checked.)
	         */
	        E_POS = 21,                   // 0 to 1000000

	/******************************************************************************/

	        // The shared prototype object.
	        P = {},
	        isValid = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
	        Big;


	    /*
	     * Create and return a Big constructor.
	     *
	     */
	    function bigFactory() {

	        /*
	         * The Big constructor and exported function.
	         * Create and return a new instance of a Big number object.
	         *
	         * n {number|string|Big} A numeric value.
	         */
	        function Big(n) {
	            var x = this;

	            // Enable constructor usage without new.
	            if (!(x instanceof Big)) {
	                return n === void 0 ? bigFactory() : new Big(n);
	            }

	            // Duplicate.
	            if (n instanceof Big) {
	                x.s = n.s;
	                x.e = n.e;
	                x.c = n.c.slice();
	            } else {
	                parse(x, n);
	            }

	            /*
	             * Retain a reference to this Big constructor, and shadow
	             * Big.prototype.constructor which points to Object.
	             */
	            x.constructor = Big;
	        }

	        Big.prototype = P;
	        Big.DP = DP;
	        Big.RM = RM;
	        Big.E_NEG = E_NEG;
	        Big.E_POS = E_POS;

	        return Big;
	    }


	    // Private functions


	    /*
	     * Return a string representing the value of Big x in normal or exponential
	     * notation to dp fixed decimal places or significant digits.
	     *
	     * x {Big} The Big to format.
	     * dp {number} Integer, 0 to MAX_DP inclusive.
	     * toE {number} 1 (toExponential), 2 (toPrecision) or undefined (toFixed).
	     */
	    function format(x, dp, toE) {
	        var Big = x.constructor,

	            // The index (normal notation) of the digit that may be rounded up.
	            i = dp - (x = new Big(x)).e,
	            c = x.c;

	        // Round?
	        if (c.length > ++dp) {
	            rnd(x, i, Big.RM);
	        }

	        if (!c[0]) {
	            ++i;
	        } else if (toE) {
	            i = dp;

	        // toFixed
	        } else {
	            c = x.c;

	            // Recalculate i as x.e may have changed if value rounded up.
	            i = x.e + i + 1;
	        }

	        // Append zeros?
	        for (; c.length < i; c.push(0)) {
	        }
	        i = x.e;

	        /*
	         * toPrecision returns exponential notation if the number of
	         * significant digits specified is less than the number of digits
	         * necessary to represent the integer part of the value in normal
	         * notation.
	         */
	        return toE === 1 || toE && (dp <= i || i <= Big.E_NEG) ?

	          // Exponential notation.
	          (x.s < 0 && c[0] ? '-' : '') +
	            (c.length > 1 ? c[0] + '.' + c.join('').slice(1) : c[0]) +
	              (i < 0 ? 'e' : 'e+') + i

	          // Normal notation.
	          : x.toString();
	    }


	    /*
	     * Parse the number or string value passed to a Big constructor.
	     *
	     * x {Big} A Big number instance.
	     * n {number|string} A numeric value.
	     */
	    function parse(x, n) {
	        var e, i, nL;

	        // Minus zero?
	        if (n === 0 && 1 / n < 0) {
	            n = '-0';

	        // Ensure n is string and check validity.
	        } else if (!isValid.test(n += '')) {
	            throwErr(NaN);
	        }

	        // Determine sign.
	        x.s = n.charAt(0) == '-' ? (n = n.slice(1), -1) : 1;

	        // Decimal point?
	        if ((e = n.indexOf('.')) > -1) {
	            n = n.replace('.', '');
	        }

	        // Exponential form?
	        if ((i = n.search(/e/i)) > 0) {

	            // Determine exponent.
	            if (e < 0) {
	                e = i;
	            }
	            e += +n.slice(i + 1);
	            n = n.substring(0, i);

	        } else if (e < 0) {

	            // Integer.
	            e = n.length;
	        }

	        // Determine leading zeros.
	        for (i = 0; n.charAt(i) == '0'; i++) {
	        }

	        if (i == (nL = n.length)) {

	            // Zero.
	            x.c = [ x.e = 0 ];
	        } else {

	            // Determine trailing zeros.
	            for (; n.charAt(--nL) == '0';) {
	            }

	            x.e = e - i - 1;
	            x.c = [];

	            // Convert string to array of digits without leading/trailing zeros.
	            for (e = 0; i <= nL; x.c[e++] = +n.charAt(i++)) {
	            }
	        }

	        return x;
	    }


	    /*
	     * Round Big x to a maximum of dp decimal places using rounding mode rm.
	     * Called by div, sqrt and round.
	     *
	     * x {Big} The Big to round.
	     * dp {number} Integer, 0 to MAX_DP inclusive.
	     * rm {number} 0, 1, 2 or 3 (DOWN, HALF_UP, HALF_EVEN, UP)
	     * [more] {boolean} Whether the result of division was truncated.
	     */
	    function rnd(x, dp, rm, more) {
	        var u,
	            xc = x.c,
	            i = x.e + dp + 1;

	        if (rm === 1) {

	            // xc[i] is the digit after the digit that may be rounded up.
	            more = xc[i] >= 5;
	        } else if (rm === 2) {
	            more = xc[i] > 5 || xc[i] == 5 &&
	              (more || i < 0 || xc[i + 1] !== u || xc[i - 1] & 1);
	        } else if (rm === 3) {
	            more = more || xc[i] !== u || i < 0;
	        } else {
	            more = false;

	            if (rm !== 0) {
	                throwErr('!Big.RM!');
	            }
	        }

	        if (i < 1 || !xc[0]) {

	            if (more) {

	                // 1, 0.1, 0.01, 0.001, 0.0001 etc.
	                x.e = -dp;
	                x.c = [1];
	            } else {

	                // Zero.
	                x.c = [x.e = 0];
	            }
	        } else {

	            // Remove any digits after the required decimal places.
	            xc.length = i--;

	            // Round up?
	            if (more) {

	                // Rounding up may mean the previous digit has to be rounded up.
	                for (; ++xc[i] > 9;) {
	                    xc[i] = 0;

	                    if (!i--) {
	                        ++x.e;
	                        xc.unshift(1);
	                    }
	                }
	            }

	            // Remove trailing zeros.
	            for (i = xc.length; !xc[--i]; xc.pop()) {
	            }
	        }

	        return x;
	    }


	    /*
	     * Throw a BigError.
	     *
	     * message {string} The error message.
	     */
	    function throwErr(message) {
	        var err = new Error(message);
	        err.name = 'BigError';

	        throw err;
	    }


	    // Prototype/instance methods


	    /*
	     * Return a new Big whose value is the absolute value of this Big.
	     */
	    P.abs = function () {
	        var x = new this.constructor(this);
	        x.s = 1;

	        return x;
	    };


	    /*
	     * Return
	     * 1 if the value of this Big is greater than the value of Big y,
	     * -1 if the value of this Big is less than the value of Big y, or
	     * 0 if they have the same value.
	    */
	    P.cmp = function (y) {
	        var xNeg,
	            x = this,
	            xc = x.c,
	            yc = (y = new x.constructor(y)).c,
	            i = x.s,
	            j = y.s,
	            k = x.e,
	            l = y.e;

	        // Either zero?
	        if (!xc[0] || !yc[0]) {
	            return !xc[0] ? !yc[0] ? 0 : -j : i;
	        }

	        // Signs differ?
	        if (i != j) {
	            return i;
	        }
	        xNeg = i < 0;

	        // Compare exponents.
	        if (k != l) {
	            return k > l ^ xNeg ? 1 : -1;
	        }

	        i = -1;
	        j = (k = xc.length) < (l = yc.length) ? k : l;

	        // Compare digit by digit.
	        for (; ++i < j;) {

	            if (xc[i] != yc[i]) {
	                return xc[i] > yc[i] ^ xNeg ? 1 : -1;
	            }
	        }

	        // Compare lengths.
	        return k == l ? 0 : k > l ^ xNeg ? 1 : -1;
	    };


	    /*
	     * Return a new Big whose value is the value of this Big divided by the
	     * value of Big y, rounded, if necessary, to a maximum of Big.DP decimal
	     * places using rounding mode Big.RM.
	     */
	    P.div = function (y) {
	        var x = this,
	            Big = x.constructor,
	            // dividend
	            dvd = x.c,
	            //divisor
	            dvs = (y = new Big(y)).c,
	            s = x.s == y.s ? 1 : -1,
	            dp = Big.DP;

	        if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
	            throwErr('!Big.DP!');
	        }

	        // Either 0?
	        if (!dvd[0] || !dvs[0]) {

	            // If both are 0, throw NaN
	            if (dvd[0] == dvs[0]) {
	                throwErr(NaN);
	            }

	            // If dvs is 0, throw +-Infinity.
	            if (!dvs[0]) {
	                throwErr(s / 0);
	            }

	            // dvd is 0, return +-0.
	            return new Big(s * 0);
	        }

	        var dvsL, dvsT, next, cmp, remI, u,
	            dvsZ = dvs.slice(),
	            dvdI = dvsL = dvs.length,
	            dvdL = dvd.length,
	            // remainder
	            rem = dvd.slice(0, dvsL),
	            remL = rem.length,
	            // quotient
	            q = y,
	            qc = q.c = [],
	            qi = 0,
	            digits = dp + (q.e = x.e - y.e) + 1;

	        q.s = s;
	        s = digits < 0 ? 0 : digits;

	        // Create version of divisor with leading zero.
	        dvsZ.unshift(0);

	        // Add zeros to make remainder as long as divisor.
	        for (; remL++ < dvsL; rem.push(0)) {
	        }

	        do {

	            // 'next' is how many times the divisor goes into current remainder.
	            for (next = 0; next < 10; next++) {

	                // Compare divisor and remainder.
	                if (dvsL != (remL = rem.length)) {
	                    cmp = dvsL > remL ? 1 : -1;
	                } else {

	                    for (remI = -1, cmp = 0; ++remI < dvsL;) {

	                        if (dvs[remI] != rem[remI]) {
	                            cmp = dvs[remI] > rem[remI] ? 1 : -1;
	                            break;
	                        }
	                    }
	                }

	                // If divisor < remainder, subtract divisor from remainder.
	                if (cmp < 0) {

	                    // Remainder can't be more than 1 digit longer than divisor.
	                    // Equalise lengths using divisor with extra leading zero?
	                    for (dvsT = remL == dvsL ? dvs : dvsZ; remL;) {

	                        if (rem[--remL] < dvsT[remL]) {
	                            remI = remL;

	                            for (; remI && !rem[--remI]; rem[remI] = 9) {
	                            }
	                            --rem[remI];
	                            rem[remL] += 10;
	                        }
	                        rem[remL] -= dvsT[remL];
	                    }
	                    for (; !rem[0]; rem.shift()) {
	                    }
	                } else {
	                    break;
	                }
	            }

	            // Add the 'next' digit to the result array.
	            qc[qi++] = cmp ? next : ++next;

	            // Update the remainder.
	            if (rem[0] && cmp) {
	                rem[remL] = dvd[dvdI] || 0;
	            } else {
	                rem = [ dvd[dvdI] ];
	            }

	        } while ((dvdI++ < dvdL || rem[0] !== u) && s--);

	        // Leading zero? Do not remove if result is simply zero (qi == 1).
	        if (!qc[0] && qi != 1) {

	            // There can't be more than one zero.
	            qc.shift();
	            q.e--;
	        }

	        // Round?
	        if (qi > digits) {
	            rnd(q, dp, Big.RM, rem[0] !== u);
	        }

	        return q;
	    };


	    /*
	     * Return true if the value of this Big is equal to the value of Big y,
	     * otherwise returns false.
	     */
	    P.eq = function (y) {
	        return !this.cmp(y);
	    };


	    /*
	     * Return true if the value of this Big is greater than the value of Big y,
	     * otherwise returns false.
	     */
	    P.gt = function (y) {
	        return this.cmp(y) > 0;
	    };


	    /*
	     * Return true if the value of this Big is greater than or equal to the
	     * value of Big y, otherwise returns false.
	     */
	    P.gte = function (y) {
	        return this.cmp(y) > -1;
	    };


	    /*
	     * Return true if the value of this Big is less than the value of Big y,
	     * otherwise returns false.
	     */
	    P.lt = function (y) {
	        return this.cmp(y) < 0;
	    };


	    /*
	     * Return true if the value of this Big is less than or equal to the value
	     * of Big y, otherwise returns false.
	     */
	    P.lte = function (y) {
	         return this.cmp(y) < 1;
	    };


	    /*
	     * Return a new Big whose value is the value of this Big minus the value
	     * of Big y.
	     */
	    P.sub = P.minus = function (y) {
	        var i, j, t, xLTy,
	            x = this,
	            Big = x.constructor,
	            a = x.s,
	            b = (y = new Big(y)).s;

	        // Signs differ?
	        if (a != b) {
	            y.s = -b;
	            return x.plus(y);
	        }

	        var xc = x.c.slice(),
	            xe = x.e,
	            yc = y.c,
	            ye = y.e;

	        // Either zero?
	        if (!xc[0] || !yc[0]) {

	            // y is non-zero? x is non-zero? Or both are zero.
	            return yc[0] ? (y.s = -b, y) : new Big(xc[0] ? x : 0);
	        }

	        // Determine which is the bigger number.
	        // Prepend zeros to equalise exponents.
	        if (a = xe - ye) {

	            if (xLTy = a < 0) {
	                a = -a;
	                t = xc;
	            } else {
	                ye = xe;
	                t = yc;
	            }

	            t.reverse();
	            for (b = a; b--; t.push(0)) {
	            }
	            t.reverse();
	        } else {

	            // Exponents equal. Check digit by digit.
	            j = ((xLTy = xc.length < yc.length) ? xc : yc).length;

	            for (a = b = 0; b < j; b++) {

	                if (xc[b] != yc[b]) {
	                    xLTy = xc[b] < yc[b];
	                    break;
	                }
	            }
	        }

	        // x < y? Point xc to the array of the bigger number.
	        if (xLTy) {
	            t = xc;
	            xc = yc;
	            yc = t;
	            y.s = -y.s;
	        }

	        /*
	         * Append zeros to xc if shorter. No need to add zeros to yc if shorter
	         * as subtraction only needs to start at yc.length.
	         */
	        if (( b = (j = yc.length) - (i = xc.length) ) > 0) {

	            for (; b--; xc[i++] = 0) {
	            }
	        }

	        // Subtract yc from xc.
	        for (b = i; j > a;){

	            if (xc[--j] < yc[j]) {

	                for (i = j; i && !xc[--i]; xc[i] = 9) {
	                }
	                --xc[i];
	                xc[j] += 10;
	            }
	            xc[j] -= yc[j];
	        }

	        // Remove trailing zeros.
	        for (; xc[--b] === 0; xc.pop()) {
	        }

	        // Remove leading zeros and adjust exponent accordingly.
	        for (; xc[0] === 0;) {
	            xc.shift();
	            --ye;
	        }

	        if (!xc[0]) {

	            // n - n = +0
	            y.s = 1;

	            // Result must be zero.
	            xc = [ye = 0];
	        }

	        y.c = xc;
	        y.e = ye;

	        return y;
	    };


	    /*
	     * Return a new Big whose value is the value of this Big modulo the
	     * value of Big y.
	     */
	    P.mod = function (y) {
	        var yGTx,
	            x = this,
	            Big = x.constructor,
	            a = x.s,
	            b = (y = new Big(y)).s;

	        if (!y.c[0]) {
	            throwErr(NaN);
	        }

	        x.s = y.s = 1;
	        yGTx = y.cmp(x) == 1;
	        x.s = a;
	        y.s = b;

	        if (yGTx) {
	            return new Big(x);
	        }

	        a = Big.DP;
	        b = Big.RM;
	        Big.DP = Big.RM = 0;
	        x = x.div(y);
	        Big.DP = a;
	        Big.RM = b;

	        return this.minus( x.times(y) );
	    };


	    /*
	     * Return a new Big whose value is the value of this Big plus the value
	     * of Big y.
	     */
	    P.add = P.plus = function (y) {
	        var t,
	            x = this,
	            Big = x.constructor,
	            a = x.s,
	            b = (y = new Big(y)).s;

	        // Signs differ?
	        if (a != b) {
	            y.s = -b;
	            return x.minus(y);
	        }

	        var xe = x.e,
	            xc = x.c,
	            ye = y.e,
	            yc = y.c;

	        // Either zero?
	        if (!xc[0] || !yc[0]) {

	            // y is non-zero? x is non-zero? Or both are zero.
	            return yc[0] ? y : new Big(xc[0] ? x : a * 0);
	        }
	        xc = xc.slice();

	        // Prepend zeros to equalise exponents.
	        // Note: Faster to use reverse then do unshifts.
	        if (a = xe - ye) {

	            if (a > 0) {
	                ye = xe;
	                t = yc;
	            } else {
	                a = -a;
	                t = xc;
	            }

	            t.reverse();
	            for (; a--; t.push(0)) {
	            }
	            t.reverse();
	        }

	        // Point xc to the longer array.
	        if (xc.length - yc.length < 0) {
	            t = yc;
	            yc = xc;
	            xc = t;
	        }
	        a = yc.length;

	        /*
	         * Only start adding at yc.length - 1 as the further digits of xc can be
	         * left as they are.
	         */
	        for (b = 0; a;) {
	            b = (xc[--a] = xc[a] + yc[a] + b) / 10 | 0;
	            xc[a] %= 10;
	        }

	        // No need to check for zero, as +x + +y != 0 && -x + -y != 0

	        if (b) {
	            xc.unshift(b);
	            ++ye;
	        }

	         // Remove trailing zeros.
	        for (a = xc.length; xc[--a] === 0; xc.pop()) {
	        }

	        y.c = xc;
	        y.e = ye;

	        return y;
	    };


	    /*
	     * Return a Big whose value is the value of this Big raised to the power n.
	     * If n is negative, round, if necessary, to a maximum of Big.DP decimal
	     * places using rounding mode Big.RM.
	     *
	     * n {number} Integer, -MAX_POWER to MAX_POWER inclusive.
	     */
	    P.pow = function (n) {
	        var x = this,
	            one = new x.constructor(1),
	            y = one,
	            isNeg = n < 0;

	        if (n !== ~~n || n < -MAX_POWER || n > MAX_POWER) {
	            throwErr('!pow!');
	        }

	        n = isNeg ? -n : n;

	        for (;;) {

	            if (n & 1) {
	                y = y.times(x);
	            }
	            n >>= 1;

	            if (!n) {
	                break;
	            }
	            x = x.times(x);
	        }

	        return isNeg ? one.div(y) : y;
	    };


	    /*
	     * Return a new Big whose value is the value of this Big rounded to a
	     * maximum of dp decimal places using rounding mode rm.
	     * If dp is not specified, round to 0 decimal places.
	     * If rm is not specified, use Big.RM.
	     *
	     * [dp] {number} Integer, 0 to MAX_DP inclusive.
	     * [rm] 0, 1, 2 or 3 (ROUND_DOWN, ROUND_HALF_UP, ROUND_HALF_EVEN, ROUND_UP)
	     */
	    P.round = function (dp, rm) {
	        var x = this,
	            Big = x.constructor;

	        if (dp == null) {
	            dp = 0;
	        } else if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
	            throwErr('!round!');
	        }
	        rnd(x = new Big(x), dp, rm == null ? Big.RM : rm);

	        return x;
	    };


	    /*
	     * Return a new Big whose value is the square root of the value of this Big,
	     * rounded, if necessary, to a maximum of Big.DP decimal places using
	     * rounding mode Big.RM.
	     */
	    P.sqrt = function () {
	        var estimate, r, approx,
	            x = this,
	            Big = x.constructor,
	            xc = x.c,
	            i = x.s,
	            e = x.e,
	            half = new Big('0.5');

	        // Zero?
	        if (!xc[0]) {
	            return new Big(x);
	        }

	        // If negative, throw NaN.
	        if (i < 0) {
	            throwErr(NaN);
	        }

	        // Estimate.
	        i = Math.sqrt(x.toString());

	        // Math.sqrt underflow/overflow?
	        // Pass x to Math.sqrt as integer, then adjust the result exponent.
	        if (i === 0 || i === 1 / 0) {
	            estimate = xc.join('');

	            if (!(estimate.length + e & 1)) {
	                estimate += '0';
	            }

	            r = new Big( Math.sqrt(estimate).toString() );
	            r.e = ((e + 1) / 2 | 0) - (e < 0 || e & 1);
	        } else {
	            r = new Big(i.toString());
	        }

	        i = r.e + (Big.DP += 4);

	        // Newton-Raphson iteration.
	        do {
	            approx = r;
	            r = half.times( approx.plus( x.div(approx) ) );
	        } while ( approx.c.slice(0, i).join('') !==
	                       r.c.slice(0, i).join('') );

	        rnd(r, Big.DP -= 4, Big.RM);

	        return r;
	    };


	    /*
	     * Return a new Big whose value is the value of this Big times the value of
	     * Big y.
	     */
	    P.mul = P.times = function (y) {
	        var c,
	            x = this,
	            Big = x.constructor,
	            xc = x.c,
	            yc = (y = new Big(y)).c,
	            a = xc.length,
	            b = yc.length,
	            i = x.e,
	            j = y.e;

	        // Determine sign of result.
	        y.s = x.s == y.s ? 1 : -1;

	        // Return signed 0 if either 0.
	        if (!xc[0] || !yc[0]) {
	            return new Big(y.s * 0);
	        }

	        // Initialise exponent of result as x.e + y.e.
	        y.e = i + j;

	        // If array xc has fewer digits than yc, swap xc and yc, and lengths.
	        if (a < b) {
	            c = xc;
	            xc = yc;
	            yc = c;
	            j = a;
	            a = b;
	            b = j;
	        }

	        // Initialise coefficient array of result with zeros.
	        for (c = new Array(j = a + b); j--; c[j] = 0) {
	        }

	        // Multiply.

	        // i is initially xc.length.
	        for (i = b; i--;) {
	            b = 0;

	            // a is yc.length.
	            for (j = a + i; j > i;) {

	                // Current sum of products at this digit position, plus carry.
	                b = c[j] + yc[i] * xc[j - i - 1] + b;
	                c[j--] = b % 10;

	                // carry
	                b = b / 10 | 0;
	            }
	            c[j] = (c[j] + b) % 10;
	        }

	        // Increment result exponent if there is a final carry.
	        if (b) {
	            ++y.e;
	        }

	        // Remove any leading zero.
	        if (!c[0]) {
	            c.shift();
	        }

	        // Remove trailing zeros.
	        for (i = c.length; !c[--i]; c.pop()) {
	        }
	        y.c = c;

	        return y;
	    };


	    /*
	     * Return a string representing the value of this Big.
	     * Return exponential notation if this Big has a positive exponent equal to
	     * or greater than Big.E_POS, or a negative exponent equal to or less than
	     * Big.E_NEG.
	     */
	    P.toString = P.valueOf = P.toJSON = function () {
	        var x = this,
	            Big = x.constructor,
	            e = x.e,
	            str = x.c.join(''),
	            strL = str.length;

	        // Exponential notation?
	        if (e <= Big.E_NEG || e >= Big.E_POS) {
	            str = str.charAt(0) + (strL > 1 ? '.' + str.slice(1) : '') +
	              (e < 0 ? 'e' : 'e+') + e;

	        // Negative exponent?
	        } else if (e < 0) {

	            // Prepend zeros.
	            for (; ++e; str = '0' + str) {
	            }
	            str = '0.' + str;

	        // Positive exponent?
	        } else if (e > 0) {

	            if (++e > strL) {

	                // Append zeros.
	                for (e -= strL; e-- ; str += '0') {
	                }
	            } else if (e < strL) {
	                str = str.slice(0, e) + '.' + str.slice(e);
	            }

	        // Exponent zero.
	        } else if (strL > 1) {
	            str = str.charAt(0) + '.' + str.slice(1);
	        }

	        // Avoid '-0'
	        return x.s < 0 && x.c[0] ? '-' + str : str;
	    };


	    /*
	     ***************************************************************************
	     * If toExponential, toFixed, toPrecision and format are not required they
	     * can safely be commented-out or deleted. No redundant code will be left.
	     * format is used only by toExponential, toFixed and toPrecision.
	     ***************************************************************************
	     */


	    /*
	     * Return a string representing the value of this Big in exponential
	     * notation to dp fixed decimal places and rounded, if necessary, using
	     * Big.RM.
	     *
	     * [dp] {number} Integer, 0 to MAX_DP inclusive.
	     */
	    P.toExponential = function (dp) {

	        if (dp == null) {
	            dp = this.c.length - 1;
	        } else if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
	            throwErr('!toExp!');
	        }

	        return format(this, dp, 1);
	    };


	    /*
	     * Return a string representing the value of this Big in normal notation
	     * to dp fixed decimal places and rounded, if necessary, using Big.RM.
	     *
	     * [dp] {number} Integer, 0 to MAX_DP inclusive.
	     */
	    P.toFixed = function (dp) {
	        var str,
	            x = this,
	            Big = x.constructor,
	            neg = Big.E_NEG,
	            pos = Big.E_POS;

	        // Prevent the possibility of exponential notation.
	        Big.E_NEG = -(Big.E_POS = 1 / 0);

	        if (dp == null) {
	            str = x.toString();
	        } else if (dp === ~~dp && dp >= 0 && dp <= MAX_DP) {
	            str = format(x, x.e + dp);

	            // (-0).toFixed() is '0', but (-0.1).toFixed() is '-0'.
	            // (-0).toFixed(1) is '0.0', but (-0.01).toFixed(1) is '-0.0'.
	            if (x.s < 0 && x.c[0] && str.indexOf('-') < 0) {
	        //E.g. -0.5 if rounded to -0 will cause toString to omit the minus sign.
	                str = '-' + str;
	            }
	        }
	        Big.E_NEG = neg;
	        Big.E_POS = pos;

	        if (!str) {
	            throwErr('!toFix!');
	        }

	        return str;
	    };


	    /*
	     * Return a string representing the value of this Big rounded to sd
	     * significant digits using Big.RM. Use exponential notation if sd is less
	     * than the number of digits necessary to represent the integer part of the
	     * value in normal notation.
	     *
	     * sd {number} Integer, 1 to MAX_DP inclusive.
	     */
	    P.toPrecision = function (sd) {

	        if (sd == null) {
	            return this.toString();
	        } else if (sd !== ~~sd || sd < 1 || sd > MAX_DP) {
	            throwErr('!toPre!');
	        }

	        return format(this, sd - 1, 2);
	    };


	    // Export


	    Big = bigFactory();

	    //AMD.
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return Big;
	        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	    // Node and other CommonJS-like environments that support module.exports.
	    } else if (typeof module !== 'undefined' && module.exports) {
	        module.exports = Big;

	    //Browser.
	    } else {
	        global.Big = Big;
	    }
	})(this);


/***/ },
/* 116 */
/***/ function(module, exports) {

	module.exports = require("crypto");

/***/ },
/* 117 */,
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	process.nextTick(function() {
		delete __webpack_require__.c[module.id];
		if(typeof window !== "undefined" && window.mochaPhantomJS)
			mochaPhantomJS.run();
		else
			mocha.run();
	});


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	if (! document.getElementById("mocha")) { document.write("<div id=\"mocha\"></div>"); }

	__webpack_require__(120);
	__webpack_require__(124);


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(121);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(123)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/A750881/Desktop/snake/node_modules/mocha-loader/node_modules/css-loader/index.js!/Users/A750881/Desktop/snake/node_modules/mocha/mocha.css", function() {
			var newContent = require("!!/Users/A750881/Desktop/snake/node_modules/mocha-loader/node_modules/css-loader/index.js!/Users/A750881/Desktop/snake/node_modules/mocha/mocha.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(122)();
	exports.push([module.id, "@charset \"utf-8\";\n\nbody {\n  margin:0;\n}\n\n#mocha {\n  font: 20px/1.5 \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  margin: 60px 50px;\n}\n\n#mocha ul,\n#mocha li {\n  margin: 0;\n  padding: 0;\n}\n\n#mocha ul {\n  list-style: none;\n}\n\n#mocha h1,\n#mocha h2 {\n  margin: 0;\n}\n\n#mocha h1 {\n  margin-top: 15px;\n  font-size: 1em;\n  font-weight: 200;\n}\n\n#mocha h1 a {\n  text-decoration: none;\n  color: inherit;\n}\n\n#mocha h1 a:hover {\n  text-decoration: underline;\n}\n\n#mocha .suite .suite h1 {\n  margin-top: 0;\n  font-size: .8em;\n}\n\n#mocha .hidden {\n  display: none;\n}\n\n#mocha h2 {\n  font-size: 12px;\n  font-weight: normal;\n  cursor: pointer;\n}\n\n#mocha .suite {\n  margin-left: 15px;\n}\n\n#mocha .test {\n  margin-left: 15px;\n  overflow: hidden;\n}\n\n#mocha .test.pending:hover h2::after {\n  content: '(pending)';\n  font-family: arial, sans-serif;\n}\n\n#mocha .test.pass.medium .duration {\n  background: #c09853;\n}\n\n#mocha .test.pass.slow .duration {\n  background: #b94a48;\n}\n\n#mocha .test.pass::before {\n  content: '✓';\n  font-size: 12px;\n  display: block;\n  float: left;\n  margin-right: 5px;\n  color: #00d6b2;\n}\n\n#mocha .test.pass .duration {\n  font-size: 9px;\n  margin-left: 5px;\n  padding: 2px 5px;\n  color: #fff;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.2);\n  -moz-box-shadow: inset 0 1px 1px rgba(0,0,0,.2);\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.2);\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  -ms-border-radius: 5px;\n  -o-border-radius: 5px;\n  border-radius: 5px;\n}\n\n#mocha .test.pass.fast .duration {\n  display: none;\n}\n\n#mocha .test.pending {\n  color: #0b97c4;\n}\n\n#mocha .test.pending::before {\n  content: '◦';\n  color: #0b97c4;\n}\n\n#mocha .test.fail {\n  color: #c00;\n}\n\n#mocha .test.fail pre {\n  color: black;\n}\n\n#mocha .test.fail::before {\n  content: '✖';\n  font-size: 12px;\n  display: block;\n  float: left;\n  margin-right: 5px;\n  color: #c00;\n}\n\n#mocha .test pre.error {\n  color: #c00;\n  max-height: 300px;\n  overflow: auto;\n}\n\n#mocha .test .html-error {\n  overflow: auto;\n  color: black;\n  line-height: 1.5;\n  display: block;\n  float: left;\n  clear: left;\n  font: 12px/1.5 monaco, monospace;\n  margin: 5px;\n  padding: 15px;\n  border: 1px solid #eee;\n  max-width: 85%; /*(1)*/\n  max-width: calc(100% - 42px); /*(2)*/\n  max-height: 300px;\n  word-wrap: break-word;\n  border-bottom-color: #ddd;\n  -webkit-border-radius: 3px;\n  -webkit-box-shadow: 0 1px 3px #eee;\n  -moz-border-radius: 3px;\n  -moz-box-shadow: 0 1px 3px #eee;\n  border-radius: 3px;\n}\n\n#mocha .test .html-error pre.error {\n  border: none;\n  -webkit-border-radius: none;\n  -webkit-box-shadow: none;\n  -moz-border-radius: none;\n  -moz-box-shadow: none;\n  padding: 0;\n  margin: 0;\n  margin-top: 18px;\n  max-height: none;\n}\n\n/**\n * (1): approximate for browsers not supporting calc\n * (2): 42 = 2*15 + 2*10 + 2*1 (padding + margin + border)\n *      ^^ seriously\n */\n#mocha .test pre {\n  display: block;\n  float: left;\n  clear: left;\n  font: 12px/1.5 monaco, monospace;\n  margin: 5px;\n  padding: 15px;\n  border: 1px solid #eee;\n  max-width: 85%; /*(1)*/\n  max-width: calc(100% - 42px); /*(2)*/\n  word-wrap: break-word;\n  border-bottom-color: #ddd;\n  -webkit-border-radius: 3px;\n  -webkit-box-shadow: 0 1px 3px #eee;\n  -moz-border-radius: 3px;\n  -moz-box-shadow: 0 1px 3px #eee;\n  border-radius: 3px;\n}\n\n#mocha .test h2 {\n  position: relative;\n}\n\n#mocha .test a.replay {\n  position: absolute;\n  top: 3px;\n  right: 0;\n  text-decoration: none;\n  vertical-align: middle;\n  display: block;\n  width: 15px;\n  height: 15px;\n  line-height: 15px;\n  text-align: center;\n  background: #eee;\n  font-size: 15px;\n  -moz-border-radius: 15px;\n  border-radius: 15px;\n  -webkit-transition: opacity 200ms;\n  -moz-transition: opacity 200ms;\n  transition: opacity 200ms;\n  opacity: 0.3;\n  color: #888;\n}\n\n#mocha .test:hover a.replay {\n  opacity: 1;\n}\n\n#mocha-report.pass .test.fail {\n  display: none;\n}\n\n#mocha-report.fail .test.pass {\n  display: none;\n}\n\n#mocha-report.pending .test.pass,\n#mocha-report.pending .test.fail {\n  display: none;\n}\n#mocha-report.pending .test.pass.pending {\n  display: block;\n}\n\n#mocha-error {\n  color: #c00;\n  font-size: 1.5em;\n  font-weight: 100;\n  letter-spacing: 1px;\n}\n\n#mocha-stats {\n  position: fixed;\n  top: 15px;\n  right: 10px;\n  font-size: 12px;\n  margin: 0;\n  color: #888;\n  z-index: 1;\n}\n\n#mocha-stats .progress {\n  float: right;\n  padding-top: 0;\n}\n\n#mocha-stats em {\n  color: black;\n}\n\n#mocha-stats a {\n  text-decoration: none;\n  color: inherit;\n}\n\n#mocha-stats a:hover {\n  border-bottom: 1px solid #eee;\n}\n\n#mocha-stats li {\n  display: inline-block;\n  margin: 0 5px;\n  list-style: none;\n  padding-top: 11px;\n}\n\n#mocha-stats canvas {\n  width: 40px;\n  height: 40px;\n}\n\n#mocha code .comment { color: #ddd; }\n#mocha code .init { color: #2f6fad; }\n#mocha code .string { color: #5890ad; }\n#mocha code .keyword { color: #8a6343; }\n#mocha code .number { color: #2f6fad; }\n\n@media screen and (max-device-width: 480px) {\n  #mocha {\n    margin: 60px 0px;\n  }\n\n  #mocha #stats {\n    position: absolute;\n  }\n}\n", ""]);

/***/ },
/* 122 */
/***/ function(module, exports) {

	module.exports = function() {
		var list = [];
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
		return list;
	}

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isIE9 = memoize(function() {
			return /msie 9\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isIE9();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function () {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	function replaceText(source, id, replacement) {
		var boundaries = ["/** >>" + id + " **/", "/** " + id + "<< **/"];
		var start = source.lastIndexOf(boundaries[0]);
		var wrappedReplacement = replacement
			? (boundaries[0] + replacement + boundaries[1])
			: "";
		if (source.lastIndexOf(boundaries[0]) >= 0) {
			var end = source.lastIndexOf(boundaries[1]) + boundaries[1].length;
			return source.slice(0, start) + wrappedReplacement + source.slice(end);
		} else {
			return source + wrappedReplacement;
		}
	}

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(styleElement.styleSheet.cssText, index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap && typeof btoa === "function") {
			try {
				css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(JSON.stringify(sourceMap)) + " */";
				css = "@import url(\"data:text/css;base64," + btoa(css) + "\")";
			} catch(e) {}
		}

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(125)(__webpack_require__(126))

/***/ },
/* 125 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function(src) {
		if (typeof execScript === "function")
			execScript(src);
		else
			eval.call(null, src);
	}

/***/ },
/* 126 */
/***/ function(module, exports) {

	module.exports = "(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require==\"function\"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error(\"Cannot find module '\"+o+\"'\");throw f.code=\"MODULE_NOT_FOUND\",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require==\"function\"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){\n(function (process){\nmodule.exports = process.env.COV\n  ? require('./lib-cov/mocha')\n  : require('./lib/mocha');\n\n}).call(this,require('_process'))\n},{\"./lib-cov/mocha\":undefined,\"./lib/mocha\":14,\"_process\":51}],2:[function(require,module,exports){\n/* eslint-disable no-unused-vars */\nmodule.exports = function(type) {\n  return function() {};\n};\n\n},{}],3:[function(require,module,exports){\n/**\n * Module exports.\n */\n\nexports.EventEmitter = EventEmitter;\n\n/**\n * Object#hasOwnProperty reference.\n */\nvar objToString = Object.prototype.toString;\n\n/**\n * Check if a value is an array.\n *\n * @api private\n * @param {*} val The value to test.\n * @return {boolean} true if the value is a boolean, otherwise false.\n */\nfunction isArray(val) {\n  return objToString.call(val) === '[object Array]';\n}\n\n/**\n * Event emitter constructor.\n *\n * @api public\n */\nfunction EventEmitter() {}\n\n/**\n * Add a listener.\n *\n * @api public\n * @param {string} name Event name.\n * @param {Function} fn Event handler.\n * @return {EventEmitter} Emitter instance.\n */\nEventEmitter.prototype.on = function(name, fn) {\n  if (!this.$events) {\n    this.$events = {};\n  }\n\n  if (!this.$events[name]) {\n    this.$events[name] = fn;\n  } else if (isArray(this.$events[name])) {\n    this.$events[name].push(fn);\n  } else {\n    this.$events[name] = [this.$events[name], fn];\n  }\n\n  return this;\n};\n\nEventEmitter.prototype.addListener = EventEmitter.prototype.on;\n\n/**\n * Adds a volatile listener.\n *\n * @api public\n * @param {string} name Event name.\n * @param {Function} fn Event handler.\n * @return {EventEmitter} Emitter instance.\n */\nEventEmitter.prototype.once = function(name, fn) {\n  var self = this;\n\n  function on() {\n    self.removeListener(name, on);\n    fn.apply(this, arguments);\n  }\n\n  on.listener = fn;\n  this.on(name, on);\n\n  return this;\n};\n\n/**\n * Remove a listener.\n *\n * @api public\n * @param {string} name Event name.\n * @param {Function} fn Event handler.\n * @return {EventEmitter} Emitter instance.\n */\nEventEmitter.prototype.removeListener = function(name, fn) {\n  if (this.$events && this.$events[name]) {\n    var list = this.$events[name];\n\n    if (isArray(list)) {\n      var pos = -1;\n\n      for (var i = 0, l = list.length; i < l; i++) {\n        if (list[i] === fn || (list[i].listener && list[i].listener === fn)) {\n          pos = i;\n          break;\n        }\n      }\n\n      if (pos < 0) {\n        return this;\n      }\n\n      list.splice(pos, 1);\n\n      if (!list.length) {\n        delete this.$events[name];\n      }\n    } else if (list === fn || (list.listener && list.listener === fn)) {\n      delete this.$events[name];\n    }\n  }\n\n  return this;\n};\n\n/**\n * Remove all listeners for an event.\n *\n * @api public\n * @param {string} name Event name.\n * @return {EventEmitter} Emitter instance.\n */\nEventEmitter.prototype.removeAllListeners = function(name) {\n  if (name === undefined) {\n    this.$events = {};\n    return this;\n  }\n\n  if (this.$events && this.$events[name]) {\n    this.$events[name] = null;\n  }\n\n  return this;\n};\n\n/**\n * Get all listeners for a given event.\n *\n * @api public\n * @param {string} name Event name.\n * @return {EventEmitter} Emitter instance.\n */\nEventEmitter.prototype.listeners = function(name) {\n  if (!this.$events) {\n    this.$events = {};\n  }\n\n  if (!this.$events[name]) {\n    this.$events[name] = [];\n  }\n\n  if (!isArray(this.$events[name])) {\n    this.$events[name] = [this.$events[name]];\n  }\n\n  return this.$events[name];\n};\n\n/**\n * Emit an event.\n *\n * @api public\n * @param {string} name Event name.\n * @return {boolean} true if at least one handler was invoked, else false.\n */\nEventEmitter.prototype.emit = function(name) {\n  if (!this.$events) {\n    return false;\n  }\n\n  var handler = this.$events[name];\n\n  if (!handler) {\n    return false;\n  }\n\n  var args = Array.prototype.slice.call(arguments, 1);\n\n  if (typeof handler === 'function') {\n    handler.apply(this, args);\n  } else if (isArray(handler)) {\n    var listeners = handler.slice();\n\n    for (var i = 0, l = listeners.length; i < l; i++) {\n      listeners[i].apply(this, args);\n    }\n  } else {\n    return false;\n  }\n\n  return true;\n};\n\n},{}],4:[function(require,module,exports){\n/**\n * Expose `Progress`.\n */\n\nmodule.exports = Progress;\n\n/**\n * Initialize a new `Progress` indicator.\n */\nfunction Progress() {\n  this.percent = 0;\n  this.size(0);\n  this.fontSize(11);\n  this.font('helvetica, arial, sans-serif');\n}\n\n/**\n * Set progress size to `size`.\n *\n * @api public\n * @param {number} size\n * @return {Progress} Progress instance.\n */\nProgress.prototype.size = function(size) {\n  this._size = size;\n  return this;\n};\n\n/**\n * Set text to `text`.\n *\n * @api public\n * @param {string} text\n * @return {Progress} Progress instance.\n */\nProgress.prototype.text = function(text) {\n  this._text = text;\n  return this;\n};\n\n/**\n * Set font size to `size`.\n *\n * @api public\n * @param {number} size\n * @return {Progress} Progress instance.\n */\nProgress.prototype.fontSize = function(size) {\n  this._fontSize = size;\n  return this;\n};\n\n/**\n * Set font to `family`.\n *\n * @param {string} family\n * @return {Progress} Progress instance.\n */\nProgress.prototype.font = function(family) {\n  this._font = family;\n  return this;\n};\n\n/**\n * Update percentage to `n`.\n *\n * @param {number} n\n * @return {Progress} Progress instance.\n */\nProgress.prototype.update = function(n) {\n  this.percent = n;\n  return this;\n};\n\n/**\n * Draw on `ctx`.\n *\n * @param {CanvasRenderingContext2d} ctx\n * @return {Progress} Progress instance.\n */\nProgress.prototype.draw = function(ctx) {\n  try {\n    var percent = Math.min(this.percent, 100);\n    var size = this._size;\n    var half = size / 2;\n    var x = half;\n    var y = half;\n    var rad = half - 1;\n    var fontSize = this._fontSize;\n\n    ctx.font = fontSize + 'px ' + this._font;\n\n    var angle = Math.PI * 2 * (percent / 100);\n    ctx.clearRect(0, 0, size, size);\n\n    // outer circle\n    ctx.strokeStyle = '#9f9f9f';\n    ctx.beginPath();\n    ctx.arc(x, y, rad, 0, angle, false);\n    ctx.stroke();\n\n    // inner circle\n    ctx.strokeStyle = '#eee';\n    ctx.beginPath();\n    ctx.arc(x, y, rad - 1, 0, angle, true);\n    ctx.stroke();\n\n    // text\n    var text = this._text || (percent | 0) + '%';\n    var w = ctx.measureText(text).width;\n\n    ctx.fillText(text, x - w / 2 + 1, y + fontSize / 2 - 1);\n  } catch (err) {\n    // don't fail if we can't render progress\n  }\n  return this;\n};\n\n},{}],5:[function(require,module,exports){\n(function (global){\nexports.isatty = function isatty() {\n  return true;\n};\n\nexports.getWindowSize = function getWindowSize() {\n  if ('innerHeight' in global) {\n    return [global.innerHeight, global.innerWidth];\n  }\n  // In a Web Worker, the DOM Window is not available.\n  return [640, 480];\n};\n\n}).call(this,typeof global !== \"undefined\" ? global : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {})\n},{}],6:[function(require,module,exports){\n/**\n * Expose `Context`.\n */\n\nmodule.exports = Context;\n\n/**\n * Initialize a new `Context`.\n *\n * @api private\n */\nfunction Context() {}\n\n/**\n * Set or get the context `Runnable` to `runnable`.\n *\n * @api private\n * @param {Runnable} runnable\n * @return {Context}\n */\nContext.prototype.runnable = function(runnable) {\n  if (!arguments.length) {\n    return this._runnable;\n  }\n  this.test = this._runnable = runnable;\n  return this;\n};\n\n/**\n * Set test timeout `ms`.\n *\n * @api private\n * @param {number} ms\n * @return {Context} self\n */\nContext.prototype.timeout = function(ms) {\n  if (!arguments.length) {\n    return this.runnable().timeout();\n  }\n  this.runnable().timeout(ms);\n  return this;\n};\n\n/**\n * Set test timeout `enabled`.\n *\n * @api private\n * @param {boolean} enabled\n * @return {Context} self\n */\nContext.prototype.enableTimeouts = function(enabled) {\n  this.runnable().enableTimeouts(enabled);\n  return this;\n};\n\n/**\n * Set test slowness threshold `ms`.\n *\n * @api private\n * @param {number} ms\n * @return {Context} self\n */\nContext.prototype.slow = function(ms) {\n  this.runnable().slow(ms);\n  return this;\n};\n\n/**\n * Mark a test as skipped.\n *\n * @api private\n * @return {Context} self\n */\nContext.prototype.skip = function() {\n  this.runnable().skip();\n  return this;\n};\n\n/**\n * Allow a number of retries on failed tests\n *\n * @api private\n * @param {number} n\n * @return {Context} self\n */\nContext.prototype.retries = function(n) {\n  if (!arguments.length) {\n    return this.runnable().retries();\n  }\n  this.runnable().retries(n);\n  return this;\n};\n\n/**\n * Inspect the context void of `._runnable`.\n *\n * @api private\n * @return {string}\n */\nContext.prototype.inspect = function() {\n  return JSON.stringify(this, function(key, val) {\n    return key === 'runnable' || key === 'test' ? undefined : val;\n  }, 2);\n};\n\n},{}],7:[function(require,module,exports){\n/**\n * Module dependencies.\n */\n\nvar Runnable = require('./runnable');\nvar inherits = require('./utils').inherits;\n\n/**\n * Expose `Hook`.\n */\n\nmodule.exports = Hook;\n\n/**\n * Initialize a new `Hook` with the given `title` and callback `fn`.\n *\n * @param {String} title\n * @param {Function} fn\n * @api private\n */\nfunction Hook(title, fn) {\n  Runnable.call(this, title, fn);\n  this.type = 'hook';\n}\n\n/**\n * Inherit from `Runnable.prototype`.\n */\ninherits(Hook, Runnable);\n\n/**\n * Get or set the test `err`.\n *\n * @param {Error} err\n * @return {Error}\n * @api public\n */\nHook.prototype.error = function(err) {\n  if (!arguments.length) {\n    err = this._error;\n    this._error = null;\n    return err;\n  }\n\n  this._error = err;\n};\n\n},{\"./runnable\":35,\"./utils\":39}],8:[function(require,module,exports){\n/**\n * Module dependencies.\n */\n\nvar Suite = require('../suite');\nvar Test = require('../test');\nvar escapeRe = require('escape-string-regexp');\n\n/**\n * BDD-style interface:\n *\n *      describe('Array', function() {\n *        describe('#indexOf()', function() {\n *          it('should return -1 when not present', function() {\n *            // ...\n *          });\n *\n *          it('should return the index when present', function() {\n *            // ...\n *          });\n *        });\n *      });\n *\n * @param {Suite} suite Root suite.\n */\nmodule.exports = function(suite) {\n  var suites = [suite];\n\n  suite.on('pre-require', function(context, file, mocha) {\n    var common = require('./common')(suites, context);\n\n    context.before = common.before;\n    context.after = common.after;\n    context.beforeEach = common.beforeEach;\n    context.afterEach = common.afterEach;\n    context.run = mocha.options.delay && common.runWithSuite(suite);\n    /**\n     * Describe a \"suite\" with the given `title`\n     * and callback `fn` containing nested suites\n     * and/or tests.\n     */\n\n    context.describe = context.context = function(title, fn) {\n      var suite = Suite.create(suites[0], title);\n      suite.file = file;\n      suites.unshift(suite);\n      fn.call(suite);\n      suites.shift();\n      return suite;\n    };\n\n    /**\n     * Pending describe.\n     */\n\n    context.xdescribe = context.xcontext = context.describe.skip = function(title, fn) {\n      var suite = Suite.create(suites[0], title);\n      suite.pending = true;\n      suites.unshift(suite);\n      fn.call(suite);\n      suites.shift();\n    };\n\n    /**\n     * Exclusive suite.\n     */\n\n    context.describe.only = function(title, fn) {\n      var suite = context.describe(title, fn);\n      mocha.grep(suite.fullTitle());\n      return suite;\n    };\n\n    /**\n     * Describe a specification or test-case\n     * with the given `title` and callback `fn`\n     * acting as a thunk.\n     */\n\n    var it = context.it = context.specify = function(title, fn) {\n      var suite = suites[0];\n      if (suite.pending) {\n        fn = null;\n      }\n      var test = new Test(title, fn);\n      test.file = file;\n      suite.addTest(test);\n      return test;\n    };\n\n    /**\n     * Exclusive test-case.\n     */\n\n    context.it.only = function(title, fn) {\n      var test = it(title, fn);\n      var reString = '^' + escapeRe(test.fullTitle()) + '$';\n      mocha.grep(new RegExp(reString));\n      return test;\n    };\n\n    /**\n     * Pending test case.\n     */\n\n    context.xit = context.xspecify = context.it.skip = function(title) {\n      context.it(title);\n    };\n\n    /**\n     * Number of attempts to retry.\n     */\n    context.it.retries = function(n) {\n      context.retries(n);\n    };\n  });\n};\n\n},{\"../suite\":37,\"../test\":38,\"./common\":9,\"escape-string-regexp\":68}],9:[function(require,module,exports){\n'use strict';\n\n/**\n * Functions common to more than one interface.\n *\n * @param {Suite[]} suites\n * @param {Context} context\n * @return {Object} An object containing common functions.\n */\nmodule.exports = function(suites, context) {\n  return {\n    /**\n     * This is only present if flag --delay is passed into Mocha. It triggers\n     * root suite execution.\n     *\n     * @param {Suite} suite The root wuite.\n     * @return {Function} A function which runs the root suite\n     */\n    runWithSuite: function runWithSuite(suite) {\n      return function run() {\n        suite.run();\n      };\n    },\n\n    /**\n     * Execute before running tests.\n     *\n     * @param {string} name\n     * @param {Function} fn\n     */\n    before: function(name, fn) {\n      suites[0].beforeAll(name, fn);\n    },\n\n    /**\n     * Execute after running tests.\n     *\n     * @param {string} name\n     * @param {Function} fn\n     */\n    after: function(name, fn) {\n      suites[0].afterAll(name, fn);\n    },\n\n    /**\n     * Execute before each test case.\n     *\n     * @param {string} name\n     * @param {Function} fn\n     */\n    beforeEach: function(name, fn) {\n      suites[0].beforeEach(name, fn);\n    },\n\n    /**\n     * Execute after each test case.\n     *\n     * @param {string} name\n     * @param {Function} fn\n     */\n    afterEach: function(name, fn) {\n      suites[0].afterEach(name, fn);\n    },\n\n    test: {\n      /**\n       * Pending test case.\n       *\n       * @param {string} title\n       */\n      skip: function(title) {\n        context.test(title);\n      },\n\n      /**\n       * Number of retry attempts\n       *\n       * @param {string} n\n       */\n      retries: function(n) {\n        context.retries(n);\n      }\n    }\n  };\n};\n\n},{}],10:[function(require,module,exports){\n/**\n * Module dependencies.\n */\n\nvar Suite = require('../suite');\nvar Test = require('../test');\n\n/**\n * TDD-style interface:\n *\n *     exports.Array = {\n *       '#indexOf()': {\n *         'should return -1 when the value is not present': function() {\n *\n *         },\n *\n *         'should return the correct index when the value is present': function() {\n *\n *         }\n *       }\n *     };\n *\n * @param {Suite} suite Root suite.\n */\nmodule.exports = function(suite) {\n  var suites = [suite];\n\n  suite.on('require', visit);\n\n  function visit(obj, file) {\n    var suite;\n    for (var key in obj) {\n      if (typeof obj[key] === 'function') {\n        var fn = obj[key];\n        switch (key) {\n          case 'before':\n            suites[0].beforeAll(fn);\n            break;\n          case 'after':\n            suites[0].afterAll(fn);\n            break;\n          case 'beforeEach':\n            suites[0].beforeEach(fn);\n            break;\n          case 'afterEach':\n            suites[0].afterEach(fn);\n            break;\n          default:\n            var test = new Test(key, fn);\n            test.file = file;\n            suites[0].addTest(test);\n        }\n      } else {\n        suite = Suite.create(suites[0], key);\n        suites.unshift(suite);\n        visit(obj[key], file);\n        suites.shift();\n      }\n    }\n  }\n};\n\n},{\"../suite\":37,\"../test\":38}],11:[function(require,module,exports){\nexports.bdd = require('./bdd');\nexports.tdd = require('./tdd');\nexports.qunit = require('./qunit');\nexports.exports = require('./exports');\n\n},{\"./bdd\":8,\"./exports\":10,\"./qunit\":12,\"./tdd\":13}],12:[function(require,module,exports){\n/**\n * Module dependencies.\n */\n\nvar Suite = require('../suite');\nvar Test = require('../test');\nvar escapeRe = require('escape-string-regexp');\n\n/**\n * QUnit-style interface:\n *\n *     suite('Array');\n *\n *     test('#length', function() {\n *       var arr = [1,2,3];\n *       ok(arr.length == 3);\n *     });\n *\n *     test('#indexOf()', function() {\n *       var arr = [1,2,3];\n *       ok(arr.indexOf(1) == 0);\n *       ok(arr.indexOf(2) == 1);\n *       ok(arr.indexOf(3) == 2);\n *     });\n *\n *     suite('String');\n *\n *     test('#length', function() {\n *       ok('foo'.length == 3);\n *     });\n *\n * @param {Suite} suite Root suite.\n */\nmodule.exports = function(suite) {\n  var suites = [suite];\n\n  suite.on('pre-require', function(context, file, mocha) {\n    var common = require('./common')(suites, context);\n\n    context.before = common.before;\n    context.after = common.after;\n    context.beforeEach = common.beforeEach;\n    context.afterEach = common.afterEach;\n    context.run = mocha.options.delay && common.runWithSuite(suite);\n    /**\n     * Describe a \"suite\" with the given `title`.\n     */\n\n    context.suite = function(title) {\n      if (suites.length > 1) {\n        suites.shift();\n      }\n      var suite = Suite.create(suites[0], title);\n      suite.file = file;\n      suites.unshift(suite);\n      return suite;\n    };\n\n    /**\n     * Exclusive test-case.\n     */\n\n    context.suite.only = function(title, fn) {\n      var suite = context.suite(title, fn);\n      mocha.grep(suite.fullTitle());\n    };\n\n    /**\n     * Describe a specification or test-case\n     * with the given `title` and callback `fn`\n     * acting as a thunk.\n     */\n\n    context.test = function(title, fn) {\n      var test = new Test(title, fn);\n      test.file = file;\n      suites[0].addTest(test);\n      return test;\n    };\n\n    /**\n     * Exclusive test-case.\n     */\n\n    context.test.only = function(title, fn) {\n      var test = context.test(title, fn);\n      var reString = '^' + escapeRe(test.fullTitle()) + '$';\n      mocha.grep(new RegExp(reString));\n    };\n\n    context.test.skip = common.test.skip;\n    context.test.retries = common.test.retries;\n  });\n};\n\n},{\"../suite\":37,\"../test\":38,\"./common\":9,\"escape-string-regexp\":68}],13:[function(require,module,exports){\n/**\n * Module dependencies.\n */\n\nvar Suite = require('../suite');\nvar Test = require('../test');\nvar escapeRe = require('escape-string-regexp');\n\n/**\n * TDD-style interface:\n *\n *      suite('Array', function() {\n *        suite('#indexOf()', function() {\n *          suiteSetup(function() {\n *\n *          });\n *\n *          test('should return -1 when not present', function() {\n *\n *          });\n *\n *          test('should return the index when present', function() {\n *\n *          });\n *\n *          suiteTeardown(function() {\n *\n *          });\n *        });\n *      });\n *\n * @param {Suite} suite Root suite.\n */\nmodule.exports = function(suite) {\n  var suites = [suite];\n\n  suite.on('pre-require', function(context, file, mocha) {\n    var common = require('./common')(suites, context);\n\n    context.setup = common.beforeEach;\n    context.teardown = common.afterEach;\n    context.suiteSetup = common.before;\n    context.suiteTeardown = common.after;\n    context.run = mocha.options.delay && common.runWithSuite(suite);\n\n    /**\n     * Describe a \"suite\" with the given `title` and callback `fn` containing\n     * nested suites and/or tests.\n     */\n    context.suite = function(title, fn) {\n      var suite = Suite.create(suites[0], title);\n      suite.file = file;\n      suites.unshift(suite);\n      fn.call(suite);\n      suites.shift();\n      return suite;\n    };\n\n    /**\n     * Pending suite.\n     */\n    context.suite.skip = function(title, fn) {\n      var suite = Suite.create(suites[0], title);\n      suite.pending = true;\n      suites.unshift(suite);\n      fn.call(suite);\n      suites.shift();\n    };\n\n    /**\n     * Exclusive test-case.\n     */\n    context.suite.only = function(title, fn) {\n      var suite = context.suite(title, fn);\n      mocha.grep(suite.fullTitle());\n    };\n\n    /**\n     * Describe a specification or test-case with the given `title` and\n     * callback `fn` acting as a thunk.\n     */\n    context.test = function(title, fn) {\n      var suite = suites[0];\n      if (suite.pending) {\n        fn = null;\n      }\n      var test = new Test(title, fn);\n      test.file = file;\n      suite.addTest(test);\n      return test;\n    };\n\n    /**\n     * Exclusive test-case.\n     */\n\n    context.test.only = function(title, fn) {\n      var test = context.test(title, fn);\n      var reString = '^' + escapeRe(test.fullTitle()) + '$';\n      mocha.grep(new RegExp(reString));\n    };\n\n    context.test.skip = common.test.skip;\n    context.test.retries = common.test.retries;\n  });\n};\n\n},{\"../suite\":37,\"../test\":38,\"./common\":9,\"escape-string-regexp\":68}],14:[function(require,module,exports){\n(function (process,global,__dirname){\n/*!\n * mocha\n * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>\n * MIT Licensed\n */\n\n/**\n * Module dependencies.\n */\n\nvar escapeRe = require('escape-string-regexp');\nvar path = require('path');\nvar reporters = require('./reporters');\nvar utils = require('./utils');\n\n/**\n * Expose `Mocha`.\n */\n\nexports = module.exports = Mocha;\n\n/**\n * To require local UIs and reporters when running in node.\n */\n\nif (!process.browser) {\n  var cwd = process.cwd();\n  module.paths.push(cwd, path.join(cwd, 'node_modules'));\n}\n\n/**\n * Expose internals.\n */\n\nexports.utils = utils;\nexports.interfaces = require('./interfaces');\nexports.reporters = reporters;\nexports.Runnable = require('./runnable');\nexports.Context = require('./context');\nexports.Runner = require('./runner');\nexports.Suite = require('./suite');\nexports.Hook = require('./hook');\nexports.Test = require('./test');\n\n/**\n * Return image `name` path.\n *\n * @api private\n * @param {string} name\n * @return {string}\n */\nfunction image(name) {\n  return path.join(__dirname, '../images', name + '.png');\n}\n\n/**\n * Set up mocha with `options`.\n *\n * Options:\n *\n *   - `ui` name \"bdd\", \"tdd\", \"exports\" etc\n *   - `reporter` reporter instance, defaults to `mocha.reporters.spec`\n *   - `globals` array of accepted globals\n *   - `timeout` timeout in milliseconds\n *   - `retries` number of times to retry failed tests\n *   - `bail` bail on the first test failure\n *   - `slow` milliseconds to wait before considering a test slow\n *   - `ignoreLeaks` ignore global leaks\n *   - `fullTrace` display the full stack-trace on failing\n *   - `grep` string or regexp to filter tests with\n *\n * @param {Object} options\n * @api public\n */\nfunction Mocha(options) {\n  options = options || {};\n  this.files = [];\n  this.options = options;\n  if (options.grep) {\n    this.grep(new RegExp(options.grep));\n  }\n  if (options.fgrep) {\n    this.grep(options.fgrep);\n  }\n  this.suite = new exports.Suite('', new exports.Context());\n  this.ui(options.ui);\n  this.bail(options.bail);\n  this.reporter(options.reporter, options.reporterOptions);\n  if (typeof options.timeout !== 'undefined' && options.timeout !== null) {\n    this.timeout(options.timeout);\n  }\n  if (typeof options.retries !== 'undefined' && options.retries !== null) {\n    this.retries(options.retries);\n  }\n  this.useColors(options.useColors);\n  if (options.enableTimeouts !== null) {\n    this.enableTimeouts(options.enableTimeouts);\n  }\n  if (options.slow) {\n    this.slow(options.slow);\n  }\n\n  this.suite.on('pre-require', function(context) {\n    exports.afterEach = context.afterEach || context.teardown;\n    exports.after = context.after || context.suiteTeardown;\n    exports.beforeEach = context.beforeEach || context.setup;\n    exports.before = context.before || context.suiteSetup;\n    exports.describe = context.describe || context.suite;\n    exports.it = context.it || context.test;\n    exports.setup = context.setup || context.beforeEach;\n    exports.suiteSetup = context.suiteSetup || context.before;\n    exports.suiteTeardown = context.suiteTeardown || context.after;\n    exports.suite = context.suite || context.describe;\n    exports.teardown = context.teardown || context.afterEach;\n    exports.test = context.test || context.it;\n    exports.run = context.run;\n  });\n}\n\n/**\n * Enable or disable bailing on the first failure.\n *\n * @api public\n * @param {boolean} [bail]\n */\nMocha.prototype.bail = function(bail) {\n  if (!arguments.length) {\n    bail = true;\n  }\n  this.suite.bail(bail);\n  return this;\n};\n\n/**\n * Add test `file`.\n *\n * @api public\n * @param {string} file\n */\nMocha.prototype.addFile = function(file) {\n  this.files.push(file);\n  return this;\n};\n\n/**\n * Set reporter to `reporter`, defaults to \"spec\".\n *\n * @param {String|Function} reporter name or constructor\n * @param {Object} reporterOptions optional options\n * @api public\n * @param {string|Function} reporter name or constructor\n * @param {Object} reporterOptions optional options\n */\nMocha.prototype.reporter = function(reporter, reporterOptions) {\n  if (typeof reporter === 'function') {\n    this._reporter = reporter;\n  } else {\n    reporter = reporter || 'spec';\n    var _reporter;\n    // Try to load a built-in reporter.\n    if (reporters[reporter]) {\n      _reporter = reporters[reporter];\n    }\n    // Try to load reporters from process.cwd() and node_modules\n    if (!_reporter) {\n      try {\n        _reporter = require(reporter);\n      } catch (err) {\n        err.message.indexOf('Cannot find module') !== -1\n          ? console.warn('\"' + reporter + '\" reporter not found')\n          : console.warn('\"' + reporter + '\" reporter blew up with error:\\n' + err.stack);\n      }\n    }\n    if (!_reporter && reporter === 'teamcity') {\n      console.warn('The Teamcity reporter was moved to a package named '\n        + 'mocha-teamcity-reporter '\n        + '(https://npmjs.org/package/mocha-teamcity-reporter).');\n    }\n    if (!_reporter) {\n      throw new Error('invalid reporter \"' + reporter + '\"');\n    }\n    this._reporter = _reporter;\n  }\n  this.options.reporterOptions = reporterOptions;\n  return this;\n};\n\n/**\n * Set test UI `name`, defaults to \"bdd\".\n *\n * @api public\n * @param {string} bdd\n */\nMocha.prototype.ui = function(name) {\n  name = name || 'bdd';\n  this._ui = exports.interfaces[name];\n  if (!this._ui) {\n    try {\n      this._ui = require(name);\n    } catch (err) {\n      throw new Error('invalid interface \"' + name + '\"');\n    }\n  }\n  this._ui = this._ui(this.suite);\n  return this;\n};\n\n/**\n * Load registered files.\n *\n * @api private\n */\nMocha.prototype.loadFiles = function(fn) {\n  var self = this;\n  var suite = this.suite;\n  this.files.forEach(function(file) {\n    file = path.resolve(file);\n    suite.emit('pre-require', global, file, self);\n    suite.emit('require', require(file), file, self);\n    suite.emit('post-require', global, file, self);\n  });\n  fn && fn();\n};\n\n/**\n * Enable growl support.\n *\n * @api private\n */\nMocha.prototype._growl = function(runner, reporter) {\n  var notify = require('growl');\n\n  runner.on('end', function() {\n    var stats = reporter.stats;\n    if (stats.failures) {\n      var msg = stats.failures + ' of ' + runner.total + ' tests failed';\n      notify(msg, { name: 'mocha', title: 'Failed', image: image('error') });\n    } else {\n      notify(stats.passes + ' tests passed in ' + stats.duration + 'ms', {\n        name: 'mocha',\n        title: 'Passed',\n        image: image('ok')\n      });\n    }\n  });\n};\n\n/**\n * Add regexp to grep, if `re` is a string it is escaped.\n *\n * @param {RegExp|String} re\n * @return {Mocha}\n * @api public\n * @param {RegExp|string} re\n * @return {Mocha}\n */\nMocha.prototype.grep = function(re) {\n  this.options.grep = typeof re === 'string' ? new RegExp(escapeRe(re)) : re;\n  return this;\n};\n\n/**\n * Invert `.grep()` matches.\n *\n * @return {Mocha}\n * @api public\n */\nMocha.prototype.invert = function() {\n  this.options.invert = true;\n  return this;\n};\n\n/**\n * Ignore global leaks.\n *\n * @param {Boolean} ignore\n * @return {Mocha}\n * @api public\n * @param {boolean} ignore\n * @return {Mocha}\n */\nMocha.prototype.ignoreLeaks = function(ignore) {\n  this.options.ignoreLeaks = Boolean(ignore);\n  return this;\n};\n\n/**\n * Enable global leak checking.\n *\n * @return {Mocha}\n * @api public\n */\nMocha.prototype.checkLeaks = function() {\n  this.options.ignoreLeaks = false;\n  return this;\n};\n\n/**\n * Display long stack-trace on failing\n *\n * @return {Mocha}\n * @api public\n */\nMocha.prototype.fullTrace = function() {\n  this.options.fullStackTrace = true;\n  return this;\n};\n\n/**\n * Enable growl support.\n *\n * @return {Mocha}\n * @api public\n */\nMocha.prototype.growl = function() {\n  this.options.growl = true;\n  return this;\n};\n\n/**\n * Ignore `globals` array or string.\n *\n * @param {Array|String} globals\n * @return {Mocha}\n * @api public\n * @param {Array|string} globals\n * @return {Mocha}\n */\nMocha.prototype.globals = function(globals) {\n  this.options.globals = (this.options.globals || []).concat(globals);\n  return this;\n};\n\n/**\n * Emit color output.\n *\n * @param {Boolean} colors\n * @return {Mocha}\n * @api public\n * @param {boolean} colors\n * @return {Mocha}\n */\nMocha.prototype.useColors = function(colors) {\n  if (colors !== undefined) {\n    this.options.useColors = colors;\n  }\n  return this;\n};\n\n/**\n * Use inline diffs rather than +/-.\n *\n * @param {Boolean} inlineDiffs\n * @return {Mocha}\n * @api public\n * @param {boolean} inlineDiffs\n * @return {Mocha}\n */\nMocha.prototype.useInlineDiffs = function(inlineDiffs) {\n  this.options.useInlineDiffs = inlineDiffs !== undefined && inlineDiffs;\n  return this;\n};\n\n/**\n * Set the timeout in milliseconds.\n *\n * @param {Number} timeout\n * @return {Mocha}\n * @api public\n * @param {number} timeout\n * @return {Mocha}\n */\nMocha.prototype.timeout = function(timeout) {\n  this.suite.timeout(timeout);\n  return this;\n};\n\n/**\n * Set the number of times to retry failed tests.\n *\n * @param {Number} retry times\n * @return {Mocha}\n * @api public\n */\nMocha.prototype.retries = function(n) {\n  this.suite.retries(n);\n  return this;\n};\n\n/**\n * Set slowness threshold in milliseconds.\n *\n * @param {Number} slow\n * @return {Mocha}\n * @api public\n * @param {number} slow\n * @return {Mocha}\n */\nMocha.prototype.slow = function(slow) {\n  this.suite.slow(slow);\n  return this;\n};\n\n/**\n * Enable timeouts.\n *\n * @param {Boolean} enabled\n * @return {Mocha}\n * @api public\n * @param {boolean} enabled\n * @return {Mocha}\n */\nMocha.prototype.enableTimeouts = function(enabled) {\n  this.suite.enableTimeouts(arguments.length && enabled !== undefined ? enabled : true);\n  return this;\n};\n\n/**\n * Makes all tests async (accepting a callback)\n *\n * @return {Mocha}\n * @api public\n */\nMocha.prototype.asyncOnly = function() {\n  this.options.asyncOnly = true;\n  return this;\n};\n\n/**\n * Disable syntax highlighting (in browser).\n *\n * @api public\n */\nMocha.prototype.noHighlighting = function() {\n  this.options.noHighlighting = true;\n  return this;\n};\n\n/**\n * Enable uncaught errors to propagate (in browser).\n *\n * @return {Mocha}\n * @api public\n */\nMocha.prototype.allowUncaught = function() {\n  this.options.allowUncaught = true;\n  return this;\n};\n\n/**\n * Delay root suite execution.\n * @returns {Mocha}\n */\nMocha.prototype.delay = function delay() {\n  this.options.delay = true;\n  return this;\n};\n\n/**\n * Run tests and invoke `fn()` when complete.\n *\n * @api public\n * @param {Function} fn\n * @return {Runner}\n */\nMocha.prototype.run = function(fn) {\n  if (this.files.length) {\n    this.loadFiles();\n  }\n  var suite = this.suite;\n  var options = this.options;\n  options.files = this.files;\n  var runner = new exports.Runner(suite, options.delay);\n  var reporter = new this._reporter(runner, options);\n  runner.ignoreLeaks = options.ignoreLeaks !== false;\n  runner.fullStackTrace = options.fullStackTrace;\n  runner.asyncOnly = options.asyncOnly;\n  runner.allowUncaught = options.allowUncaught;\n  if (options.grep) {\n    runner.grep(options.grep, options.invert);\n  }\n  if (options.globals) {\n    runner.globals(options.globals);\n  }\n  if (options.growl) {\n    this._growl(runner, reporter);\n  }\n  if (options.useColors !== undefined) {\n    exports.reporters.Base.useColors = options.useColors;\n  }\n  exports.reporters.Base.inlineDiffs = options.useInlineDiffs;\n\n  function done(failures) {\n    if (reporter.done) {\n      reporter.done(failures, fn);\n    } else {\n      fn && fn(failures);\n    }\n  }\n\n  return runner.run(done);\n};\n\n}).call(this,require('_process'),typeof global !== \"undefined\" ? global : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {},\"/lib\")\n},{\"./context\":6,\"./hook\":7,\"./interfaces\":11,\"./reporters\":22,\"./runnable\":35,\"./runner\":36,\"./suite\":37,\"./test\":38,\"./utils\":39,\"_process\":51,\"escape-string-regexp\":68,\"growl\":69,\"path\":41}],15:[function(require,module,exports){\n/**\n * Helpers.\n */\n\nvar s = 1000;\nvar m = s * 60;\nvar h = m * 60;\nvar d = h * 24;\nvar y = d * 365.25;\n\n/**\n * Parse or format the given `val`.\n *\n * Options:\n *\n *  - `long` verbose formatting [false]\n *\n * @api public\n * @param {string|number} val\n * @param {Object} options\n * @return {string|number}\n */\nmodule.exports = function(val, options) {\n  options = options || {};\n  if (typeof val === 'string') {\n    return parse(val);\n  }\n  // https://github.com/mochajs/mocha/pull/1035\n  return options['long'] ? longFormat(val) : shortFormat(val);\n};\n\n/**\n * Parse the given `str` and return milliseconds.\n *\n * @api private\n * @param {string} str\n * @return {number}\n */\nfunction parse(str) {\n  var match = (/^((?:\\d+)?\\.?\\d+) *(ms|seconds?|s|minutes?|m|hours?|h|days?|d|years?|y)?$/i).exec(str);\n  if (!match) {\n    return;\n  }\n  var n = parseFloat(match[1]);\n  var type = (match[2] || 'ms').toLowerCase();\n  switch (type) {\n    case 'years':\n    case 'year':\n    case 'y':\n      return n * y;\n    case 'days':\n    case 'day':\n    case 'd':\n      return n * d;\n    case 'hours':\n    case 'hour':\n    case 'h':\n      return n * h;\n    case 'minutes':\n    case 'minute':\n    case 'm':\n      return n * m;\n    case 'seconds':\n    case 'second':\n    case 's':\n      return n * s;\n    case 'ms':\n      return n;\n    default:\n      // No default case\n  }\n}\n\n/**\n * Short format for `ms`.\n *\n * @api private\n * @param {number} ms\n * @return {string}\n */\nfunction shortFormat(ms) {\n  if (ms >= d) {\n    return Math.round(ms / d) + 'd';\n  }\n  if (ms >= h) {\n    return Math.round(ms / h) + 'h';\n  }\n  if (ms >= m) {\n    return Math.round(ms / m) + 'm';\n  }\n  if (ms >= s) {\n    return Math.round(ms / s) + 's';\n  }\n  return ms + 'ms';\n}\n\n/**\n * Long format for `ms`.\n *\n * @api private\n * @param {number} ms\n * @return {string}\n */\nfunction longFormat(ms) {\n  return plural(ms, d, 'day')\n    || plural(ms, h, 'hour')\n    || plural(ms, m, 'minute')\n    || plural(ms, s, 'second')\n    || ms + ' ms';\n}\n\n/**\n * Pluralization helper.\n *\n * @api private\n * @param {number} ms\n * @param {number} n\n * @param {string} name\n */\nfunction plural(ms, n, name) {\n  if (ms < n) {\n    return;\n  }\n  if (ms < n * 1.5) {\n    return Math.floor(ms / n) + ' ' + name;\n  }\n  return Math.ceil(ms / n) + ' ' + name + 's';\n}\n\n},{}],16:[function(require,module,exports){\n\n/**\n * Expose `Pending`.\n */\n\nmodule.exports = Pending;\n\n/**\n * Initialize a new `Pending` error with the given message.\n *\n * @param {string} message\n */\nfunction Pending(message) {\n  this.message = message;\n}\n\n},{}],17:[function(require,module,exports){\n(function (process,global){\n/**\n * Module dependencies.\n */\n\nvar tty = require('tty');\nvar diff = require('diff');\nvar ms = require('../ms');\nvar utils = require('../utils');\nvar supportsColor = process.browser ? null : require('supports-color');\n\n/**\n * Expose `Base`.\n */\n\nexports = module.exports = Base;\n\n/**\n * Save timer references to avoid Sinon interfering.\n * See: https://github.com/mochajs/mocha/issues/237\n */\n\n/* eslint-disable no-unused-vars, no-native-reassign */\nvar Date = global.Date;\nvar setTimeout = global.setTimeout;\nvar setInterval = global.setInterval;\nvar clearTimeout = global.clearTimeout;\nvar clearInterval = global.clearInterval;\n/* eslint-enable no-unused-vars, no-native-reassign */\n\n/**\n * Check if both stdio streams are associated with a tty.\n */\n\nvar isatty = tty.isatty(1) && tty.isatty(2);\n\n/**\n * Enable coloring by default, except in the browser interface.\n */\n\nexports.useColors = !process.browser && (supportsColor || (process.env.MOCHA_COLORS !== undefined));\n\n/**\n * Inline diffs instead of +/-\n */\n\nexports.inlineDiffs = false;\n\n/**\n * Default color map.\n */\n\nexports.colors = {\n  pass: 90,\n  fail: 31,\n  'bright pass': 92,\n  'bright fail': 91,\n  'bright yellow': 93,\n  pending: 36,\n  suite: 0,\n  'error title': 0,\n  'error message': 31,\n  'error stack': 90,\n  checkmark: 32,\n  fast: 90,\n  medium: 33,\n  slow: 31,\n  green: 32,\n  light: 90,\n  'diff gutter': 90,\n  'diff added': 32,\n  'diff removed': 31\n};\n\n/**\n * Default symbol map.\n */\n\nexports.symbols = {\n  ok: '✓',\n  err: '✖',\n  dot: '․'\n};\n\n// With node.js on Windows: use symbols available in terminal default fonts\nif (process.platform === 'win32') {\n  exports.symbols.ok = '\\u221A';\n  exports.symbols.err = '\\u00D7';\n  exports.symbols.dot = '.';\n}\n\n/**\n * Color `str` with the given `type`,\n * allowing colors to be disabled,\n * as well as user-defined color\n * schemes.\n *\n * @param {string} type\n * @param {string} str\n * @return {string}\n * @api private\n */\nvar color = exports.color = function(type, str) {\n  if (!exports.useColors) {\n    return String(str);\n  }\n  return '\\u001b[' + exports.colors[type] + 'm' + str + '\\u001b[0m';\n};\n\n/**\n * Expose term window size, with some defaults for when stderr is not a tty.\n */\n\nexports.window = {\n  width: 75\n};\n\nif (isatty) {\n  exports.window.width = process.stdout.getWindowSize\n      ? process.stdout.getWindowSize(1)[0]\n      : tty.getWindowSize()[1];\n}\n\n/**\n * Expose some basic cursor interactions that are common among reporters.\n */\n\nexports.cursor = {\n  hide: function() {\n    isatty && process.stdout.write('\\u001b[?25l');\n  },\n\n  show: function() {\n    isatty && process.stdout.write('\\u001b[?25h');\n  },\n\n  deleteLine: function() {\n    isatty && process.stdout.write('\\u001b[2K');\n  },\n\n  beginningOfLine: function() {\n    isatty && process.stdout.write('\\u001b[0G');\n  },\n\n  CR: function() {\n    if (isatty) {\n      exports.cursor.deleteLine();\n      exports.cursor.beginningOfLine();\n    } else {\n      process.stdout.write('\\r');\n    }\n  }\n};\n\n/**\n * Outut the given `failures` as a list.\n *\n * @param {Array} failures\n * @api public\n */\n\nexports.list = function(failures) {\n  console.log();\n  failures.forEach(function(test, i) {\n    // format\n    var fmt = color('error title', '  %s) %s:\\n')\n      + color('error message', '     %s')\n      + color('error stack', '\\n%s\\n');\n\n    // msg\n    var msg;\n    var err = test.err;\n    var message;\n    if (err.message) {\n      message = err.message;\n    } else if (typeof err.inspect === 'function') {\n      message = err.inspect() + '';\n    } else {\n      message = '';\n    }\n    var stack = err.stack || message;\n    var index = stack.indexOf(message);\n    var actual = err.actual;\n    var expected = err.expected;\n    var escape = true;\n\n    if (index === -1) {\n      msg = message;\n    } else {\n      index += message.length;\n      msg = stack.slice(0, index);\n      // remove msg from stack\n      stack = stack.slice(index + 1);\n    }\n\n    // uncaught\n    if (err.uncaught) {\n      msg = 'Uncaught ' + msg;\n    }\n    // explicitly show diff\n    if (err.showDiff !== false && sameType(actual, expected) && expected !== undefined) {\n      escape = false;\n      if (!(utils.isString(actual) && utils.isString(expected))) {\n        err.actual = actual = utils.stringify(actual);\n        err.expected = expected = utils.stringify(expected);\n      }\n\n      fmt = color('error title', '  %s) %s:\\n%s') + color('error stack', '\\n%s\\n');\n      var match = message.match(/^([^:]+): expected/);\n      msg = '\\n      ' + color('error message', match ? match[1] : msg);\n\n      if (exports.inlineDiffs) {\n        msg += inlineDiff(err, escape);\n      } else {\n        msg += unifiedDiff(err, escape);\n      }\n    }\n\n    // indent stack trace\n    stack = stack.replace(/^/gm, '  ');\n\n    console.log(fmt, (i + 1), test.fullTitle(), msg, stack);\n  });\n};\n\n/**\n * Initialize a new `Base` reporter.\n *\n * All other reporters generally\n * inherit from this reporter, providing\n * stats such as test duration, number\n * of tests passed / failed etc.\n *\n * @param {Runner} runner\n * @api public\n */\n\nfunction Base(runner) {\n  var stats = this.stats = { suites: 0, tests: 0, passes: 0, pending: 0, failures: 0 };\n  var failures = this.failures = [];\n\n  if (!runner) {\n    return;\n  }\n  this.runner = runner;\n\n  runner.stats = stats;\n\n  runner.on('start', function() {\n    stats.start = new Date();\n  });\n\n  runner.on('suite', function(suite) {\n    stats.suites = stats.suites || 0;\n    suite.root || stats.suites++;\n  });\n\n  runner.on('test end', function() {\n    stats.tests = stats.tests || 0;\n    stats.tests++;\n  });\n\n  runner.on('pass', function(test) {\n    stats.passes = stats.passes || 0;\n\n    if (test.duration > test.slow()) {\n      test.speed = 'slow';\n    } else if (test.duration > test.slow() / 2) {\n      test.speed = 'medium';\n    } else {\n      test.speed = 'fast';\n    }\n\n    stats.passes++;\n  });\n\n  runner.on('fail', function(test, err) {\n    stats.failures = stats.failures || 0;\n    stats.failures++;\n    test.err = err;\n    failures.push(test);\n  });\n\n  runner.on('end', function() {\n    stats.end = new Date();\n    stats.duration = new Date() - stats.start;\n  });\n\n  runner.on('pending', function() {\n    stats.pending++;\n  });\n}\n\n/**\n * Output common epilogue used by many of\n * the bundled reporters.\n *\n * @api public\n */\nBase.prototype.epilogue = function() {\n  var stats = this.stats;\n  var fmt;\n\n  console.log();\n\n  // passes\n  fmt = color('bright pass', ' ')\n    + color('green', ' %d passing')\n    + color('light', ' (%s)');\n\n  console.log(fmt,\n    stats.passes || 0,\n    ms(stats.duration));\n\n  // pending\n  if (stats.pending) {\n    fmt = color('pending', ' ')\n      + color('pending', ' %d pending');\n\n    console.log(fmt, stats.pending);\n  }\n\n  // failures\n  if (stats.failures) {\n    fmt = color('fail', '  %d failing');\n\n    console.log(fmt, stats.failures);\n\n    Base.list(this.failures);\n    console.log();\n  }\n\n  console.log();\n};\n\n/**\n * Pad the given `str` to `len`.\n *\n * @api private\n * @param {string} str\n * @param {string} len\n * @return {string}\n */\nfunction pad(str, len) {\n  str = String(str);\n  return Array(len - str.length + 1).join(' ') + str;\n}\n\n/**\n * Returns an inline diff between 2 strings with coloured ANSI output\n *\n * @api private\n * @param {Error} err with actual/expected\n * @param {boolean} escape\n * @return {string} Diff\n */\nfunction inlineDiff(err, escape) {\n  var msg = errorDiff(err, 'WordsWithSpace', escape);\n\n  // linenos\n  var lines = msg.split('\\n');\n  if (lines.length > 4) {\n    var width = String(lines.length).length;\n    msg = lines.map(function(str, i) {\n      return pad(++i, width) + ' |' + ' ' + str;\n    }).join('\\n');\n  }\n\n  // legend\n  msg = '\\n'\n    + color('diff removed', 'actual')\n    + ' '\n    + color('diff added', 'expected')\n    + '\\n\\n'\n    + msg\n    + '\\n';\n\n  // indent\n  msg = msg.replace(/^/gm, '      ');\n  return msg;\n}\n\n/**\n * Returns a unified diff between two strings.\n *\n * @api private\n * @param {Error} err with actual/expected\n * @param {boolean} escape\n * @return {string} The diff.\n */\nfunction unifiedDiff(err, escape) {\n  var indent = '      ';\n  function cleanUp(line) {\n    if (escape) {\n      line = escapeInvisibles(line);\n    }\n    if (line[0] === '+') {\n      return indent + colorLines('diff added', line);\n    }\n    if (line[0] === '-') {\n      return indent + colorLines('diff removed', line);\n    }\n    if (line.match(/\\@\\@/)) {\n      return null;\n    }\n    if (line.match(/\\\\ No newline/)) {\n      return null;\n    }\n    return indent + line;\n  }\n  function notBlank(line) {\n    return typeof line !== 'undefined' && line !== null;\n  }\n  var msg = diff.createPatch('string', err.actual, err.expected);\n  var lines = msg.split('\\n').splice(4);\n  return '\\n      '\n    + colorLines('diff added', '+ expected') + ' '\n    + colorLines('diff removed', '- actual')\n    + '\\n\\n'\n    + lines.map(cleanUp).filter(notBlank).join('\\n');\n}\n\n/**\n * Return a character diff for `err`.\n *\n * @api private\n * @param {Error} err\n * @param {string} type\n * @param {boolean} escape\n * @return {string}\n */\nfunction errorDiff(err, type, escape) {\n  var actual = escape ? escapeInvisibles(err.actual) : err.actual;\n  var expected = escape ? escapeInvisibles(err.expected) : err.expected;\n  return diff['diff' + type](actual, expected).map(function(str) {\n    if (str.added) {\n      return colorLines('diff added', str.value);\n    }\n    if (str.removed) {\n      return colorLines('diff removed', str.value);\n    }\n    return str.value;\n  }).join('');\n}\n\n/**\n * Returns a string with all invisible characters in plain text\n *\n * @api private\n * @param {string} line\n * @return {string}\n */\nfunction escapeInvisibles(line) {\n  return line.replace(/\\t/g, '<tab>')\n    .replace(/\\r/g, '<CR>')\n    .replace(/\\n/g, '<LF>\\n');\n}\n\n/**\n * Color lines for `str`, using the color `name`.\n *\n * @api private\n * @param {string} name\n * @param {string} str\n * @return {string}\n */\nfunction colorLines(name, str) {\n  return str.split('\\n').map(function(str) {\n    return color(name, str);\n  }).join('\\n');\n}\n\n/**\n * Object#toString reference.\n */\nvar objToString = Object.prototype.toString;\n\n/**\n * Check that a / b have the same type.\n *\n * @api private\n * @param {Object} a\n * @param {Object} b\n * @return {boolean}\n */\nfunction sameType(a, b) {\n  return objToString.call(a) === objToString.call(b);\n}\n\n}).call(this,require('_process'),typeof global !== \"undefined\" ? global : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {})\n},{\"../ms\":15,\"../utils\":39,\"_process\":51,\"diff\":67,\"supports-color\":41,\"tty\":5}],18:[function(require,module,exports){\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\nvar utils = require('../utils');\n\n/**\n * Expose `Doc`.\n */\n\nexports = module.exports = Doc;\n\n/**\n * Initialize a new `Doc` reporter.\n *\n * @param {Runner} runner\n * @api public\n */\nfunction Doc(runner) {\n  Base.call(this, runner);\n\n  var indents = 2;\n\n  function indent() {\n    return Array(indents).join('  ');\n  }\n\n  runner.on('suite', function(suite) {\n    if (suite.root) {\n      return;\n    }\n    ++indents;\n    console.log('%s<section class=\"suite\">', indent());\n    ++indents;\n    console.log('%s<h1>%s</h1>', indent(), utils.escape(suite.title));\n    console.log('%s<dl>', indent());\n  });\n\n  runner.on('suite end', function(suite) {\n    if (suite.root) {\n      return;\n    }\n    console.log('%s</dl>', indent());\n    --indents;\n    console.log('%s</section>', indent());\n    --indents;\n  });\n\n  runner.on('pass', function(test) {\n    console.log('%s  <dt>%s</dt>', indent(), utils.escape(test.title));\n    var code = utils.escape(utils.clean(test.body));\n    console.log('%s  <dd><pre><code>%s</code></pre></dd>', indent(), code);\n  });\n\n  runner.on('fail', function(test, err) {\n    console.log('%s  <dt class=\"error\">%s</dt>', indent(), utils.escape(test.title));\n    var code = utils.escape(utils.clean(test.fn.body));\n    console.log('%s  <dd class=\"error\"><pre><code>%s</code></pre></dd>', indent(), code);\n    console.log('%s  <dd class=\"error\">%s</dd>', indent(), utils.escape(err));\n  });\n}\n\n},{\"../utils\":39,\"./base\":17}],19:[function(require,module,exports){\n(function (process){\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\nvar inherits = require('../utils').inherits;\nvar color = Base.color;\n\n/**\n * Expose `Dot`.\n */\n\nexports = module.exports = Dot;\n\n/**\n * Initialize a new `Dot` matrix test reporter.\n *\n * @api public\n * @param {Runner} runner\n */\nfunction Dot(runner) {\n  Base.call(this, runner);\n\n  var self = this;\n  var width = Base.window.width * .75 | 0;\n  var n = -1;\n\n  runner.on('start', function() {\n    process.stdout.write('\\n');\n  });\n\n  runner.on('pending', function() {\n    if (++n % width === 0) {\n      process.stdout.write('\\n  ');\n    }\n    process.stdout.write(color('pending', Base.symbols.dot));\n  });\n\n  runner.on('pass', function(test) {\n    if (++n % width === 0) {\n      process.stdout.write('\\n  ');\n    }\n    if (test.speed === 'slow') {\n      process.stdout.write(color('bright yellow', Base.symbols.dot));\n    } else {\n      process.stdout.write(color(test.speed, Base.symbols.dot));\n    }\n  });\n\n  runner.on('fail', function() {\n    if (++n % width === 0) {\n      process.stdout.write('\\n  ');\n    }\n    process.stdout.write(color('fail', Base.symbols.dot));\n  });\n\n  runner.on('end', function() {\n    console.log();\n    self.epilogue();\n  });\n}\n\n/**\n * Inherit from `Base.prototype`.\n */\ninherits(Dot, Base);\n\n}).call(this,require('_process'))\n},{\"../utils\":39,\"./base\":17,\"_process\":51}],20:[function(require,module,exports){\n(function (process,__dirname){\n/**\n * Module dependencies.\n */\n\nvar JSONCov = require('./json-cov');\nvar readFileSync = require('fs').readFileSync;\nvar join = require('path').join;\n\n/**\n * Expose `HTMLCov`.\n */\n\nexports = module.exports = HTMLCov;\n\n/**\n * Initialize a new `JsCoverage` reporter.\n *\n * @api public\n * @param {Runner} runner\n */\nfunction HTMLCov(runner) {\n  var jade = require('jade');\n  var file = join(__dirname, '/templates/coverage.jade');\n  var str = readFileSync(file, 'utf8');\n  var fn = jade.compile(str, { filename: file });\n  var self = this;\n\n  JSONCov.call(this, runner, false);\n\n  runner.on('end', function() {\n    process.stdout.write(fn({\n      cov: self.cov,\n      coverageClass: coverageClass\n    }));\n  });\n}\n\n/**\n * Return coverage class for a given coverage percentage.\n *\n * @api private\n * @param {number} coveragePctg\n * @return {string}\n */\nfunction coverageClass(coveragePctg) {\n  if (coveragePctg >= 75) {\n    return 'high';\n  }\n  if (coveragePctg >= 50) {\n    return 'medium';\n  }\n  if (coveragePctg >= 25) {\n    return 'low';\n  }\n  return 'terrible';\n}\n\n}).call(this,require('_process'),\"/lib/reporters\")\n},{\"./json-cov\":23,\"_process\":51,\"fs\":41,\"jade\":41,\"path\":41}],21:[function(require,module,exports){\n(function (global){\n/* eslint-env browser */\n\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\nvar utils = require('../utils');\nvar Progress = require('../browser/progress');\nvar escapeRe = require('escape-string-regexp');\nvar escape = utils.escape;\n\n/**\n * Save timer references to avoid Sinon interfering (see GH-237).\n */\n\n/* eslint-disable no-unused-vars, no-native-reassign */\nvar Date = global.Date;\nvar setTimeout = global.setTimeout;\nvar setInterval = global.setInterval;\nvar clearTimeout = global.clearTimeout;\nvar clearInterval = global.clearInterval;\n/* eslint-enable no-unused-vars, no-native-reassign */\n\n/**\n * Expose `HTML`.\n */\n\nexports = module.exports = HTML;\n\n/**\n * Stats template.\n */\n\nvar statsTemplate = '<ul id=\"mocha-stats\">'\n  + '<li class=\"progress\"><canvas width=\"40\" height=\"40\"></canvas></li>'\n  + '<li class=\"passes\"><a href=\"javascript:void(0);\">passes:</a> <em>0</em></li>'\n  + '<li class=\"failures\"><a href=\"javascript:void(0);\">failures:</a> <em>0</em></li>'\n  + '<li class=\"duration\">duration: <em>0</em>s</li>'\n  + '</ul>';\n\n/**\n * Initialize a new `HTML` reporter.\n *\n * @api public\n * @param {Runner} runner\n */\nfunction HTML(runner) {\n  Base.call(this, runner);\n\n  var self = this;\n  var stats = this.stats;\n  var stat = fragment(statsTemplate);\n  var items = stat.getElementsByTagName('li');\n  var passes = items[1].getElementsByTagName('em')[0];\n  var passesLink = items[1].getElementsByTagName('a')[0];\n  var failures = items[2].getElementsByTagName('em')[0];\n  var failuresLink = items[2].getElementsByTagName('a')[0];\n  var duration = items[3].getElementsByTagName('em')[0];\n  var canvas = stat.getElementsByTagName('canvas')[0];\n  var report = fragment('<ul id=\"mocha-report\"></ul>');\n  var stack = [report];\n  var progress;\n  var ctx;\n  var root = document.getElementById('mocha');\n\n  if (canvas.getContext) {\n    var ratio = window.devicePixelRatio || 1;\n    canvas.style.width = canvas.width;\n    canvas.style.height = canvas.height;\n    canvas.width *= ratio;\n    canvas.height *= ratio;\n    ctx = canvas.getContext('2d');\n    ctx.scale(ratio, ratio);\n    progress = new Progress();\n  }\n\n  if (!root) {\n    return error('#mocha div missing, add it to your document');\n  }\n\n  // pass toggle\n  on(passesLink, 'click', function() {\n    unhide();\n    var name = (/pass/).test(report.className) ? '' : ' pass';\n    report.className = report.className.replace(/fail|pass/g, '') + name;\n    if (report.className.trim()) {\n      hideSuitesWithout('test pass');\n    }\n  });\n\n  // failure toggle\n  on(failuresLink, 'click', function() {\n    unhide();\n    var name = (/fail/).test(report.className) ? '' : ' fail';\n    report.className = report.className.replace(/fail|pass/g, '') + name;\n    if (report.className.trim()) {\n      hideSuitesWithout('test fail');\n    }\n  });\n\n  root.appendChild(stat);\n  root.appendChild(report);\n\n  if (progress) {\n    progress.size(40);\n  }\n\n  runner.on('suite', function(suite) {\n    if (suite.root) {\n      return;\n    }\n\n    // suite\n    var url = self.suiteURL(suite);\n    var el = fragment('<li class=\"suite\"><h1><a href=\"%s\">%s</a></h1></li>', url, escape(suite.title));\n\n    // container\n    stack[0].appendChild(el);\n    stack.unshift(document.createElement('ul'));\n    el.appendChild(stack[0]);\n  });\n\n  runner.on('suite end', function(suite) {\n    if (suite.root) {\n      return;\n    }\n    stack.shift();\n  });\n\n  runner.on('fail', function(test) {\n    // For type = 'test' its possible that the test failed due to multiple\n    // done() calls. So report the issue here.\n    if (test.type === 'hook'\n      || test.type === 'test') {\n      runner.emit('test end', test);\n    }\n  });\n\n  runner.on('test end', function(test) {\n    // TODO: add to stats\n    var percent = stats.tests / this.total * 100 | 0;\n    if (progress) {\n      progress.update(percent).draw(ctx);\n    }\n\n    // update stats\n    var ms = new Date() - stats.start;\n    text(passes, stats.passes);\n    text(failures, stats.failures);\n    text(duration, (ms / 1000).toFixed(2));\n\n    // test\n    var el;\n    if (test.state === 'passed') {\n      var url = self.testURL(test);\n      el = fragment('<li class=\"test pass %e\"><h2>%e<span class=\"duration\">%ems</span> <a href=\"%s\" class=\"replay\">‣</a></h2></li>', test.speed, test.title, test.duration, url);\n    } else if (test.pending) {\n      el = fragment('<li class=\"test pass pending\"><h2>%e</h2></li>', test.title);\n    } else {\n      el = fragment('<li class=\"test fail\"><h2>%e <a href=\"%e\" class=\"replay\">‣</a></h2></li>', test.title, self.testURL(test));\n      var stackString; // Note: Includes leading newline\n      var message = test.err.toString();\n\n      // <=IE7 stringifies to [Object Error]. Since it can be overloaded, we\n      // check for the result of the stringifying.\n      if (message === '[object Error]') {\n        message = test.err.message;\n      }\n\n      if (test.err.stack) {\n        var indexOfMessage = test.err.stack.indexOf(test.err.message);\n        if (indexOfMessage === -1) {\n          stackString = test.err.stack;\n        } else {\n          stackString = test.err.stack.substr(test.err.message.length + indexOfMessage);\n        }\n      } else if (test.err.sourceURL && test.err.line !== undefined) {\n        // Safari doesn't give you a stack. Let's at least provide a source line.\n        stackString = '\\n(' + test.err.sourceURL + ':' + test.err.line + ')';\n      }\n\n      stackString = stackString || '';\n\n      if (test.err.htmlMessage && stackString) {\n        el.appendChild(fragment('<div class=\"html-error\">%s\\n<pre class=\"error\">%e</pre></div>', test.err.htmlMessage, stackString));\n      } else if (test.err.htmlMessage) {\n        el.appendChild(fragment('<div class=\"html-error\">%s</div>', test.err.htmlMessage));\n      } else {\n        el.appendChild(fragment('<pre class=\"error\">%e%e</pre>', message, stackString));\n      }\n    }\n\n    // toggle code\n    // TODO: defer\n    if (!test.pending) {\n      var h2 = el.getElementsByTagName('h2')[0];\n\n      on(h2, 'click', function() {\n        pre.style.display = pre.style.display === 'none' ? 'block' : 'none';\n      });\n\n      var pre = fragment('<pre><code>%e</code></pre>', utils.clean(test.body));\n      el.appendChild(pre);\n      pre.style.display = 'none';\n    }\n\n    // Don't call .appendChild if #mocha-report was already .shift()'ed off the stack.\n    if (stack[0]) {\n      stack[0].appendChild(el);\n    }\n  });\n}\n\n/**\n * Makes a URL, preserving querystring (\"search\") parameters.\n *\n * @param {string} s\n * @return {string} A new URL.\n */\nfunction makeUrl(s) {\n  var search = window.location.search;\n\n  // Remove previous grep query parameter if present\n  if (search) {\n    search = search.replace(/[?&]grep=[^&\\s]*/g, '').replace(/^&/, '?');\n  }\n\n  return window.location.pathname + (search ? search + '&' : '?') + 'grep=' + encodeURIComponent(escapeRe(s));\n}\n\n/**\n * Provide suite URL.\n *\n * @param {Object} [suite]\n */\nHTML.prototype.suiteURL = function(suite) {\n  return makeUrl(suite.fullTitle());\n};\n\n/**\n * Provide test URL.\n *\n * @param {Object} [test]\n */\nHTML.prototype.testURL = function(test) {\n  return makeUrl(test.fullTitle());\n};\n\n/**\n * Display error `msg`.\n *\n * @param {string} msg\n */\nfunction error(msg) {\n  document.body.appendChild(fragment('<div id=\"mocha-error\">%s</div>', msg));\n}\n\n/**\n * Return a DOM fragment from `html`.\n *\n * @param {string} html\n */\nfunction fragment(html) {\n  var args = arguments;\n  var div = document.createElement('div');\n  var i = 1;\n\n  div.innerHTML = html.replace(/%([se])/g, function(_, type) {\n    switch (type) {\n      case 's': return String(args[i++]);\n      case 'e': return escape(args[i++]);\n      // no default\n    }\n  });\n\n  return div.firstChild;\n}\n\n/**\n * Check for suites that do not have elements\n * with `classname`, and hide them.\n *\n * @param {text} classname\n */\nfunction hideSuitesWithout(classname) {\n  var suites = document.getElementsByClassName('suite');\n  for (var i = 0; i < suites.length; i++) {\n    var els = suites[i].getElementsByClassName(classname);\n    if (!els.length) {\n      suites[i].className += ' hidden';\n    }\n  }\n}\n\n/**\n * Unhide .hidden suites.\n */\nfunction unhide() {\n  var els = document.getElementsByClassName('suite hidden');\n  for (var i = 0; i < els.length; ++i) {\n    els[i].className = els[i].className.replace('suite hidden', 'suite');\n  }\n}\n\n/**\n * Set an element's text contents.\n *\n * @param {HTMLElement} el\n * @param {string} contents\n */\nfunction text(el, contents) {\n  if (el.textContent) {\n    el.textContent = contents;\n  } else {\n    el.innerText = contents;\n  }\n}\n\n/**\n * Listen on `event` with callback `fn`.\n */\nfunction on(el, event, fn) {\n  if (el.addEventListener) {\n    el.addEventListener(event, fn, false);\n  } else {\n    el.attachEvent('on' + event, fn);\n  }\n}\n\n}).call(this,typeof global !== \"undefined\" ? global : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {})\n},{\"../browser/progress\":4,\"../utils\":39,\"./base\":17,\"escape-string-regexp\":68}],22:[function(require,module,exports){\n// Alias exports to a their normalized format Mocha#reporter to prevent a need\n// for dynamic (try/catch) requires, which Browserify doesn't handle.\nexports.Base = exports.base = require('./base');\nexports.Dot = exports.dot = require('./dot');\nexports.Doc = exports.doc = require('./doc');\nexports.TAP = exports.tap = require('./tap');\nexports.JSON = exports.json = require('./json');\nexports.HTML = exports.html = require('./html');\nexports.List = exports.list = require('./list');\nexports.Min = exports.min = require('./min');\nexports.Spec = exports.spec = require('./spec');\nexports.Nyan = exports.nyan = require('./nyan');\nexports.XUnit = exports.xunit = require('./xunit');\nexports.Markdown = exports.markdown = require('./markdown');\nexports.Progress = exports.progress = require('./progress');\nexports.Landing = exports.landing = require('./landing');\nexports.JSONCov = exports['json-cov'] = require('./json-cov');\nexports.HTMLCov = exports['html-cov'] = require('./html-cov');\nexports.JSONStream = exports['json-stream'] = require('./json-stream');\n\n},{\"./base\":17,\"./doc\":18,\"./dot\":19,\"./html\":21,\"./html-cov\":20,\"./json\":25,\"./json-cov\":23,\"./json-stream\":24,\"./landing\":26,\"./list\":27,\"./markdown\":28,\"./min\":29,\"./nyan\":30,\"./progress\":31,\"./spec\":32,\"./tap\":33,\"./xunit\":34}],23:[function(require,module,exports){\n(function (process,global){\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\n\n/**\n * Expose `JSONCov`.\n */\n\nexports = module.exports = JSONCov;\n\n/**\n * Initialize a new `JsCoverage` reporter.\n *\n * @api public\n * @param {Runner} runner\n * @param {boolean} output\n */\nfunction JSONCov(runner, output) {\n  Base.call(this, runner);\n\n  output = arguments.length === 1 || output;\n  var self = this;\n  var tests = [];\n  var failures = [];\n  var passes = [];\n\n  runner.on('test end', function(test) {\n    tests.push(test);\n  });\n\n  runner.on('pass', function(test) {\n    passes.push(test);\n  });\n\n  runner.on('fail', function(test) {\n    failures.push(test);\n  });\n\n  runner.on('end', function() {\n    var cov = global._$jscoverage || {};\n    var result = self.cov = map(cov);\n    result.stats = self.stats;\n    result.tests = tests.map(clean);\n    result.failures = failures.map(clean);\n    result.passes = passes.map(clean);\n    if (!output) {\n      return;\n    }\n    process.stdout.write(JSON.stringify(result, null, 2));\n  });\n}\n\n/**\n * Map jscoverage data to a JSON structure\n * suitable for reporting.\n *\n * @api private\n * @param {Object} cov\n * @return {Object}\n */\n\nfunction map(cov) {\n  var ret = {\n    instrumentation: 'node-jscoverage',\n    sloc: 0,\n    hits: 0,\n    misses: 0,\n    coverage: 0,\n    files: []\n  };\n\n  for (var filename in cov) {\n    if (Object.prototype.hasOwnProperty.call(cov, filename)) {\n      var data = coverage(filename, cov[filename]);\n      ret.files.push(data);\n      ret.hits += data.hits;\n      ret.misses += data.misses;\n      ret.sloc += data.sloc;\n    }\n  }\n\n  ret.files.sort(function(a, b) {\n    return a.filename.localeCompare(b.filename);\n  });\n\n  if (ret.sloc > 0) {\n    ret.coverage = (ret.hits / ret.sloc) * 100;\n  }\n\n  return ret;\n}\n\n/**\n * Map jscoverage data for a single source file\n * to a JSON structure suitable for reporting.\n *\n * @api private\n * @param {string} filename name of the source file\n * @param {Object} data jscoverage coverage data\n * @return {Object}\n */\nfunction coverage(filename, data) {\n  var ret = {\n    filename: filename,\n    coverage: 0,\n    hits: 0,\n    misses: 0,\n    sloc: 0,\n    source: {}\n  };\n\n  data.source.forEach(function(line, num) {\n    num++;\n\n    if (data[num] === 0) {\n      ret.misses++;\n      ret.sloc++;\n    } else if (data[num] !== undefined) {\n      ret.hits++;\n      ret.sloc++;\n    }\n\n    ret.source[num] = {\n      source: line,\n      coverage: data[num] === undefined ? '' : data[num]\n    };\n  });\n\n  ret.coverage = ret.hits / ret.sloc * 100;\n\n  return ret;\n}\n\n/**\n * Return a plain-object representation of `test`\n * free of cyclic properties etc.\n *\n * @api private\n * @param {Object} test\n * @return {Object}\n */\nfunction clean(test) {\n  return {\n    duration: test.duration,\n    currentRetry: test.currentRetry(),\n    fullTitle: test.fullTitle(),\n    title: test.title\n  };\n}\n\n}).call(this,require('_process'),typeof global !== \"undefined\" ? global : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {})\n},{\"./base\":17,\"_process\":51}],24:[function(require,module,exports){\n(function (process){\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\n\n/**\n * Expose `List`.\n */\n\nexports = module.exports = List;\n\n/**\n * Initialize a new `List` test reporter.\n *\n * @api public\n * @param {Runner} runner\n */\nfunction List(runner) {\n  Base.call(this, runner);\n\n  var self = this;\n  var total = runner.total;\n\n  runner.on('start', function() {\n    console.log(JSON.stringify(['start', { total: total }]));\n  });\n\n  runner.on('pass', function(test) {\n    console.log(JSON.stringify(['pass', clean(test)]));\n  });\n\n  runner.on('fail', function(test, err) {\n    test = clean(test);\n    test.err = err.message;\n    test.stack = err.stack || null;\n    console.log(JSON.stringify(['fail', test]));\n  });\n\n  runner.on('end', function() {\n    process.stdout.write(JSON.stringify(['end', self.stats]));\n  });\n}\n\n/**\n * Return a plain-object representation of `test`\n * free of cyclic properties etc.\n *\n * @api private\n * @param {Object} test\n * @return {Object}\n */\nfunction clean(test) {\n  return {\n    title: test.title,\n    fullTitle: test.fullTitle(),\n    duration: test.duration,\n    currentRetry: test.currentRetry()\n  };\n}\n\n}).call(this,require('_process'))\n},{\"./base\":17,\"_process\":51}],25:[function(require,module,exports){\n(function (process){\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\n\n/**\n * Expose `JSON`.\n */\n\nexports = module.exports = JSONReporter;\n\n/**\n * Initialize a new `JSON` reporter.\n *\n * @api public\n * @param {Runner} runner\n */\nfunction JSONReporter(runner) {\n  Base.call(this, runner);\n\n  var self = this;\n  var tests = [];\n  var pending = [];\n  var failures = [];\n  var passes = [];\n\n  runner.on('test end', function(test) {\n    tests.push(test);\n  });\n\n  runner.on('pass', function(test) {\n    passes.push(test);\n  });\n\n  runner.on('fail', function(test) {\n    failures.push(test);\n  });\n\n  runner.on('pending', function(test) {\n    pending.push(test);\n  });\n\n  runner.on('end', function() {\n    var obj = {\n      stats: self.stats,\n      tests: tests.map(clean),\n      pending: pending.map(clean),\n      failures: failures.map(clean),\n      passes: passes.map(clean)\n    };\n\n    runner.testResults = obj;\n\n    process.stdout.write(JSON.stringify(obj, null, 2));\n  });\n}\n\n/**\n * Return a plain-object representation of `test`\n * free of cyclic properties etc.\n *\n * @api private\n * @param {Object} test\n * @return {Object}\n */\nfunction clean(test) {\n  return {\n    title: test.title,\n    fullTitle: test.fullTitle(),\n    duration: test.duration,\n    currentRetry: test.currentRetry(),\n    err: errorJSON(test.err || {})\n  };\n}\n\n/**\n * Transform `error` into a JSON object.\n *\n * @api private\n * @param {Error} err\n * @return {Object}\n */\nfunction errorJSON(err) {\n  var res = {};\n  Object.getOwnPropertyNames(err).forEach(function(key) {\n    res[key] = err[key];\n  }, err);\n  return res;\n}\n\n}).call(this,require('_process'))\n},{\"./base\":17,\"_process\":51}],26:[function(require,module,exports){\n(function (process){\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\nvar inherits = require('../utils').inherits;\nvar cursor = Base.cursor;\nvar color = Base.color;\n\n/**\n * Expose `Landing`.\n */\n\nexports = module.exports = Landing;\n\n/**\n * Airplane color.\n */\n\nBase.colors.plane = 0;\n\n/**\n * Airplane crash color.\n */\n\nBase.colors['plane crash'] = 31;\n\n/**\n * Runway color.\n */\n\nBase.colors.runway = 90;\n\n/**\n * Initialize a new `Landing` reporter.\n *\n * @api public\n * @param {Runner} runner\n */\nfunction Landing(runner) {\n  Base.call(this, runner);\n\n  var self = this;\n  var width = Base.window.width * .75 | 0;\n  var total = runner.total;\n  var stream = process.stdout;\n  var plane = color('plane', '✈');\n  var crashed = -1;\n  var n = 0;\n\n  function runway() {\n    var buf = Array(width).join('-');\n    return '  ' + color('runway', buf);\n  }\n\n  runner.on('start', function() {\n    stream.write('\\n\\n\\n  ');\n    cursor.hide();\n  });\n\n  runner.on('test end', function(test) {\n    // check if the plane crashed\n    var col = crashed === -1 ? width * ++n / total | 0 : crashed;\n\n    // show the crash\n    if (test.state === 'failed') {\n      plane = color('plane crash', '✈');\n      crashed = col;\n    }\n\n    // render landing strip\n    stream.write('\\u001b[' + (width + 1) + 'D\\u001b[2A');\n    stream.write(runway());\n    stream.write('\\n  ');\n    stream.write(color('runway', Array(col).join('⋅')));\n    stream.write(plane);\n    stream.write(color('runway', Array(width - col).join('⋅') + '\\n'));\n    stream.write(runway());\n    stream.write('\\u001b[0m');\n  });\n\n  runner.on('end', function() {\n    cursor.show();\n    console.log();\n    self.epilogue();\n  });\n}\n\n/**\n * Inherit from `Base.prototype`.\n */\ninherits(Landing, Base);\n\n}).call(this,require('_process'))\n},{\"../utils\":39,\"./base\":17,\"_process\":51}],27:[function(require,module,exports){\n(function (process){\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\nvar inherits = require('../utils').inherits;\nvar color = Base.color;\nvar cursor = Base.cursor;\n\n/**\n * Expose `List`.\n */\n\nexports = module.exports = List;\n\n/**\n * Initialize a new `List` test reporter.\n *\n * @api public\n * @param {Runner} runner\n */\nfunction List(runner) {\n  Base.call(this, runner);\n\n  var self = this;\n  var n = 0;\n\n  runner.on('start', function() {\n    console.log();\n  });\n\n  runner.on('test', function(test) {\n    process.stdout.write(color('pass', '    ' + test.fullTitle() + ': '));\n  });\n\n  runner.on('pending', function(test) {\n    var fmt = color('checkmark', '  -')\n      + color('pending', ' %s');\n    console.log(fmt, test.fullTitle());\n  });\n\n  runner.on('pass', function(test) {\n    var fmt = color('checkmark', '  ' + Base.symbols.dot)\n      + color('pass', ' %s: ')\n      + color(test.speed, '%dms');\n    cursor.CR();\n    console.log(fmt, test.fullTitle(), test.duration);\n  });\n\n  runner.on('fail', function(test) {\n    cursor.CR();\n    console.log(color('fail', '  %d) %s'), ++n, test.fullTitle());\n  });\n\n  runner.on('end', self.epilogue.bind(self));\n}\n\n/**\n * Inherit from `Base.prototype`.\n */\ninherits(List, Base);\n\n}).call(this,require('_process'))\n},{\"../utils\":39,\"./base\":17,\"_process\":51}],28:[function(require,module,exports){\n(function (process){\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\nvar utils = require('../utils');\n\n/**\n * Constants\n */\n\nvar SUITE_PREFIX = '$';\n\n/**\n * Expose `Markdown`.\n */\n\nexports = module.exports = Markdown;\n\n/**\n * Initialize a new `Markdown` reporter.\n *\n * @api public\n * @param {Runner} runner\n */\nfunction Markdown(runner) {\n  Base.call(this, runner);\n\n  var level = 0;\n  var buf = '';\n\n  function title(str) {\n    return Array(level).join('#') + ' ' + str;\n  }\n\n  function mapTOC(suite, obj) {\n    var ret = obj;\n    var key = SUITE_PREFIX + suite.title;\n\n    obj = obj[key] = obj[key] || { suite: suite };\n    suite.suites.forEach(function(suite) {\n      mapTOC(suite, obj);\n    });\n\n    return ret;\n  }\n\n  function stringifyTOC(obj, level) {\n    ++level;\n    var buf = '';\n    var link;\n    for (var key in obj) {\n      if (key === 'suite') {\n        continue;\n      }\n      if (key !== SUITE_PREFIX) {\n        link = ' - [' + key.substring(1) + ']';\n        link += '(#' + utils.slug(obj[key].suite.fullTitle()) + ')\\n';\n        buf += Array(level).join('  ') + link;\n      }\n      buf += stringifyTOC(obj[key], level);\n    }\n    return buf;\n  }\n\n  function generateTOC(suite) {\n    var obj = mapTOC(suite, {});\n    return stringifyTOC(obj, 0);\n  }\n\n  generateTOC(runner.suite);\n\n  runner.on('suite', function(suite) {\n    ++level;\n    var slug = utils.slug(suite.fullTitle());\n    buf += '<a name=\"' + slug + '\"></a>' + '\\n';\n    buf += title(suite.title) + '\\n';\n  });\n\n  runner.on('suite end', function() {\n    --level;\n  });\n\n  runner.on('pass', function(test) {\n    var code = utils.clean(test.body);\n    buf += test.title + '.\\n';\n    buf += '\\n```js\\n';\n    buf += code + '\\n';\n    buf += '```\\n\\n';\n  });\n\n  runner.on('end', function() {\n    process.stdout.write('# TOC\\n');\n    process.stdout.write(generateTOC(runner.suite));\n    process.stdout.write(buf);\n  });\n}\n\n}).call(this,require('_process'))\n},{\"../utils\":39,\"./base\":17,\"_process\":51}],29:[function(require,module,exports){\n(function (process){\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\nvar inherits = require('../utils').inherits;\n\n/**\n * Expose `Min`.\n */\n\nexports = module.exports = Min;\n\n/**\n * Initialize a new `Min` minimal test reporter (best used with --watch).\n *\n * @api public\n * @param {Runner} runner\n */\nfunction Min(runner) {\n  Base.call(this, runner);\n\n  runner.on('start', function() {\n    // clear screen\n    process.stdout.write('\\u001b[2J');\n    // set cursor position\n    process.stdout.write('\\u001b[1;3H');\n  });\n\n  runner.on('end', this.epilogue.bind(this));\n}\n\n/**\n * Inherit from `Base.prototype`.\n */\ninherits(Min, Base);\n\n}).call(this,require('_process'))\n},{\"../utils\":39,\"./base\":17,\"_process\":51}],30:[function(require,module,exports){\n(function (process){\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\nvar inherits = require('../utils').inherits;\n\n/**\n * Expose `Dot`.\n */\n\nexports = module.exports = NyanCat;\n\n/**\n * Initialize a new `Dot` matrix test reporter.\n *\n * @param {Runner} runner\n * @api public\n */\n\nfunction NyanCat(runner) {\n  Base.call(this, runner);\n\n  var self = this;\n  var width = Base.window.width * .75 | 0;\n  var nyanCatWidth = this.nyanCatWidth = 11;\n\n  this.colorIndex = 0;\n  this.numberOfLines = 4;\n  this.rainbowColors = self.generateColors();\n  this.scoreboardWidth = 5;\n  this.tick = 0;\n  this.trajectories = [[], [], [], []];\n  this.trajectoryWidthMax = (width - nyanCatWidth);\n\n  runner.on('start', function() {\n    Base.cursor.hide();\n    self.draw();\n  });\n\n  runner.on('pending', function() {\n    self.draw();\n  });\n\n  runner.on('pass', function() {\n    self.draw();\n  });\n\n  runner.on('fail', function() {\n    self.draw();\n  });\n\n  runner.on('end', function() {\n    Base.cursor.show();\n    for (var i = 0; i < self.numberOfLines; i++) {\n      write('\\n');\n    }\n    self.epilogue();\n  });\n}\n\n/**\n * Inherit from `Base.prototype`.\n */\ninherits(NyanCat, Base);\n\n/**\n * Draw the nyan cat\n *\n * @api private\n */\n\nNyanCat.prototype.draw = function() {\n  this.appendRainbow();\n  this.drawScoreboard();\n  this.drawRainbow();\n  this.drawNyanCat();\n  this.tick = !this.tick;\n};\n\n/**\n * Draw the \"scoreboard\" showing the number\n * of passes, failures and pending tests.\n *\n * @api private\n */\n\nNyanCat.prototype.drawScoreboard = function() {\n  var stats = this.stats;\n\n  function draw(type, n) {\n    write(' ');\n    write(Base.color(type, n));\n    write('\\n');\n  }\n\n  draw('green', stats.passes);\n  draw('fail', stats.failures);\n  draw('pending', stats.pending);\n  write('\\n');\n\n  this.cursorUp(this.numberOfLines);\n};\n\n/**\n * Append the rainbow.\n *\n * @api private\n */\n\nNyanCat.prototype.appendRainbow = function() {\n  var segment = this.tick ? '_' : '-';\n  var rainbowified = this.rainbowify(segment);\n\n  for (var index = 0; index < this.numberOfLines; index++) {\n    var trajectory = this.trajectories[index];\n    if (trajectory.length >= this.trajectoryWidthMax) {\n      trajectory.shift();\n    }\n    trajectory.push(rainbowified);\n  }\n};\n\n/**\n * Draw the rainbow.\n *\n * @api private\n */\n\nNyanCat.prototype.drawRainbow = function() {\n  var self = this;\n\n  this.trajectories.forEach(function(line) {\n    write('\\u001b[' + self.scoreboardWidth + 'C');\n    write(line.join(''));\n    write('\\n');\n  });\n\n  this.cursorUp(this.numberOfLines);\n};\n\n/**\n * Draw the nyan cat\n *\n * @api private\n */\nNyanCat.prototype.drawNyanCat = function() {\n  var self = this;\n  var startWidth = this.scoreboardWidth + this.trajectories[0].length;\n  var dist = '\\u001b[' + startWidth + 'C';\n  var padding = '';\n\n  write(dist);\n  write('_,------,');\n  write('\\n');\n\n  write(dist);\n  padding = self.tick ? '  ' : '   ';\n  write('_|' + padding + '/\\\\_/\\\\ ');\n  write('\\n');\n\n  write(dist);\n  padding = self.tick ? '_' : '__';\n  var tail = self.tick ? '~' : '^';\n  write(tail + '|' + padding + this.face() + ' ');\n  write('\\n');\n\n  write(dist);\n  padding = self.tick ? ' ' : '  ';\n  write(padding + '\"\"  \"\" ');\n  write('\\n');\n\n  this.cursorUp(this.numberOfLines);\n};\n\n/**\n * Draw nyan cat face.\n *\n * @api private\n * @return {string}\n */\n\nNyanCat.prototype.face = function() {\n  var stats = this.stats;\n  if (stats.failures) {\n    return '( x .x)';\n  } else if (stats.pending) {\n    return '( o .o)';\n  } else if (stats.passes) {\n    return '( ^ .^)';\n  }\n  return '( - .-)';\n};\n\n/**\n * Move cursor up `n`.\n *\n * @api private\n * @param {number} n\n */\n\nNyanCat.prototype.cursorUp = function(n) {\n  write('\\u001b[' + n + 'A');\n};\n\n/**\n * Move cursor down `n`.\n *\n * @api private\n * @param {number} n\n */\n\nNyanCat.prototype.cursorDown = function(n) {\n  write('\\u001b[' + n + 'B');\n};\n\n/**\n * Generate rainbow colors.\n *\n * @api private\n * @return {Array}\n */\nNyanCat.prototype.generateColors = function() {\n  var colors = [];\n\n  for (var i = 0; i < (6 * 7); i++) {\n    var pi3 = Math.floor(Math.PI / 3);\n    var n = (i * (1.0 / 6));\n    var r = Math.floor(3 * Math.sin(n) + 3);\n    var g = Math.floor(3 * Math.sin(n + 2 * pi3) + 3);\n    var b = Math.floor(3 * Math.sin(n + 4 * pi3) + 3);\n    colors.push(36 * r + 6 * g + b + 16);\n  }\n\n  return colors;\n};\n\n/**\n * Apply rainbow to the given `str`.\n *\n * @api private\n * @param {string} str\n * @return {string}\n */\nNyanCat.prototype.rainbowify = function(str) {\n  if (!Base.useColors) {\n    return str;\n  }\n  var color = this.rainbowColors[this.colorIndex % this.rainbowColors.length];\n  this.colorIndex += 1;\n  return '\\u001b[38;5;' + color + 'm' + str + '\\u001b[0m';\n};\n\n/**\n * Stdout helper.\n *\n * @param {string} string A message to write to stdout.\n */\nfunction write(string) {\n  process.stdout.write(string);\n}\n\n}).call(this,require('_process'))\n},{\"../utils\":39,\"./base\":17,\"_process\":51}],31:[function(require,module,exports){\n(function (process){\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\nvar inherits = require('../utils').inherits;\nvar color = Base.color;\nvar cursor = Base.cursor;\n\n/**\n * Expose `Progress`.\n */\n\nexports = module.exports = Progress;\n\n/**\n * General progress bar color.\n */\n\nBase.colors.progress = 90;\n\n/**\n * Initialize a new `Progress` bar test reporter.\n *\n * @api public\n * @param {Runner} runner\n * @param {Object} options\n */\nfunction Progress(runner, options) {\n  Base.call(this, runner);\n\n  var self = this;\n  var width = Base.window.width * .50 | 0;\n  var total = runner.total;\n  var complete = 0;\n  var lastN = -1;\n\n  // default chars\n  options = options || {};\n  options.open = options.open || '[';\n  options.complete = options.complete || '▬';\n  options.incomplete = options.incomplete || Base.symbols.dot;\n  options.close = options.close || ']';\n  options.verbose = false;\n\n  // tests started\n  runner.on('start', function() {\n    console.log();\n    cursor.hide();\n  });\n\n  // tests complete\n  runner.on('test end', function() {\n    complete++;\n\n    var percent = complete / total;\n    var n = width * percent | 0;\n    var i = width - n;\n\n    if (n === lastN && !options.verbose) {\n      // Don't re-render the line if it hasn't changed\n      return;\n    }\n    lastN = n;\n\n    cursor.CR();\n    process.stdout.write('\\u001b[J');\n    process.stdout.write(color('progress', '  ' + options.open));\n    process.stdout.write(Array(n).join(options.complete));\n    process.stdout.write(Array(i).join(options.incomplete));\n    process.stdout.write(color('progress', options.close));\n    if (options.verbose) {\n      process.stdout.write(color('progress', ' ' + complete + ' of ' + total));\n    }\n  });\n\n  // tests are complete, output some stats\n  // and the failures if any\n  runner.on('end', function() {\n    cursor.show();\n    console.log();\n    self.epilogue();\n  });\n}\n\n/**\n * Inherit from `Base.prototype`.\n */\ninherits(Progress, Base);\n\n}).call(this,require('_process'))\n},{\"../utils\":39,\"./base\":17,\"_process\":51}],32:[function(require,module,exports){\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\nvar inherits = require('../utils').inherits;\nvar color = Base.color;\nvar cursor = Base.cursor;\n\n/**\n * Expose `Spec`.\n */\n\nexports = module.exports = Spec;\n\n/**\n * Initialize a new `Spec` test reporter.\n *\n * @api public\n * @param {Runner} runner\n */\nfunction Spec(runner) {\n  Base.call(this, runner);\n\n  var self = this;\n  var indents = 0;\n  var n = 0;\n\n  function indent() {\n    return Array(indents).join('  ');\n  }\n\n  runner.on('start', function() {\n    console.log();\n  });\n\n  runner.on('suite', function(suite) {\n    ++indents;\n    console.log(color('suite', '%s%s'), indent(), suite.title);\n  });\n\n  runner.on('suite end', function() {\n    --indents;\n    if (indents === 1) {\n      console.log();\n    }\n  });\n\n  runner.on('pending', function(test) {\n    var fmt = indent() + color('pending', '  - %s');\n    console.log(fmt, test.title);\n  });\n\n  runner.on('pass', function(test) {\n    var fmt;\n    if (test.speed === 'fast') {\n      fmt = indent()\n        + color('checkmark', '  ' + Base.symbols.ok)\n        + color('pass', ' %s');\n      cursor.CR();\n      console.log(fmt, test.title);\n    } else {\n      fmt = indent()\n        + color('checkmark', '  ' + Base.symbols.ok)\n        + color('pass', ' %s')\n        + color(test.speed, ' (%dms)');\n      cursor.CR();\n      console.log(fmt, test.title, test.duration);\n    }\n  });\n\n  runner.on('fail', function(test) {\n    cursor.CR();\n    console.log(indent() + color('fail', '  %d) %s'), ++n, test.title);\n  });\n\n  runner.on('end', self.epilogue.bind(self));\n}\n\n/**\n * Inherit from `Base.prototype`.\n */\ninherits(Spec, Base);\n\n},{\"../utils\":39,\"./base\":17}],33:[function(require,module,exports){\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\n\n/**\n * Expose `TAP`.\n */\n\nexports = module.exports = TAP;\n\n/**\n * Initialize a new `TAP` reporter.\n *\n * @api public\n * @param {Runner} runner\n */\nfunction TAP(runner) {\n  Base.call(this, runner);\n\n  var n = 1;\n  var passes = 0;\n  var failures = 0;\n\n  runner.on('start', function() {\n    var total = runner.grepTotal(runner.suite);\n    console.log('%d..%d', 1, total);\n  });\n\n  runner.on('test end', function() {\n    ++n;\n  });\n\n  runner.on('pending', function(test) {\n    console.log('ok %d %s # SKIP -', n, title(test));\n  });\n\n  runner.on('pass', function(test) {\n    passes++;\n    console.log('ok %d %s', n, title(test));\n  });\n\n  runner.on('fail', function(test, err) {\n    failures++;\n    console.log('not ok %d %s', n, title(test));\n    if (err.stack) {\n      console.log(err.stack.replace(/^/gm, '  '));\n    }\n  });\n\n  runner.on('end', function() {\n    console.log('# tests ' + (passes + failures));\n    console.log('# pass ' + passes);\n    console.log('# fail ' + failures);\n  });\n}\n\n/**\n * Return a TAP-safe title of `test`\n *\n * @api private\n * @param {Object} test\n * @return {String}\n */\nfunction title(test) {\n  return test.fullTitle().replace(/#/g, '');\n}\n\n},{\"./base\":17}],34:[function(require,module,exports){\n(function (process,global){\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\nvar utils = require('../utils');\nvar inherits = utils.inherits;\nvar fs = require('fs');\nvar escape = utils.escape;\nvar mkdirp = require('mkdirp');\nvar path = require('path');\n\n/**\n * Save timer references to avoid Sinon interfering (see GH-237).\n */\n\n/* eslint-disable no-unused-vars, no-native-reassign */\nvar Date = global.Date;\nvar setTimeout = global.setTimeout;\nvar setInterval = global.setInterval;\nvar clearTimeout = global.clearTimeout;\nvar clearInterval = global.clearInterval;\n/* eslint-enable no-unused-vars, no-native-reassign */\n\n/**\n * Expose `XUnit`.\n */\n\nexports = module.exports = XUnit;\n\n/**\n * Initialize a new `XUnit` reporter.\n *\n * @api public\n * @param {Runner} runner\n */\nfunction XUnit(runner, options) {\n  Base.call(this, runner);\n\n  var stats = this.stats;\n  var tests = [];\n  var self = this;\n\n  if (options.reporterOptions && options.reporterOptions.output) {\n    if (!fs.createWriteStream) {\n      throw new Error('file output not supported in browser');\n    }\n    mkdirp.sync(path.dirname(options.reporterOptions.output));\n    self.fileStream = fs.createWriteStream(options.reporterOptions.output);\n  }\n\n  runner.on('pending', function(test) {\n    tests.push(test);\n  });\n\n  runner.on('pass', function(test) {\n    tests.push(test);\n  });\n\n  runner.on('fail', function(test) {\n    tests.push(test);\n  });\n\n  runner.on('end', function() {\n    self.write(tag('testsuite', {\n      name: 'Mocha Tests',\n      tests: stats.tests,\n      failures: stats.failures,\n      errors: stats.failures,\n      skipped: stats.tests - stats.failures - stats.passes,\n      timestamp: (new Date()).toUTCString(),\n      time: (stats.duration / 1000) || 0\n    }, false));\n\n    tests.forEach(function(t) {\n      self.test(t);\n    });\n\n    self.write('</testsuite>');\n  });\n}\n\n/**\n * Inherit from `Base.prototype`.\n */\ninherits(XUnit, Base);\n\n/**\n * Override done to close the stream (if it's a file).\n *\n * @param failures\n * @param {Function} fn\n */\nXUnit.prototype.done = function(failures, fn) {\n  if (this.fileStream) {\n    this.fileStream.end(function() {\n      fn(failures);\n    });\n  } else {\n    fn(failures);\n  }\n};\n\n/**\n * Write out the given line.\n *\n * @param {string} line\n */\nXUnit.prototype.write = function(line) {\n  if (this.fileStream) {\n    this.fileStream.write(line + '\\n');\n  } else if (typeof process === 'object' && process.stdout) {\n    process.stdout.write(line + '\\n');\n  } else {\n    console.log(line);\n  }\n};\n\n/**\n * Output tag for the given `test.`\n *\n * @param {Test} test\n */\nXUnit.prototype.test = function(test) {\n  var attrs = {\n    classname: test.parent.fullTitle(),\n    name: test.title,\n    time: (test.duration / 1000) || 0\n  };\n\n  if (test.state === 'failed') {\n    var err = test.err;\n    this.write(tag('testcase', attrs, false, tag('failure', {}, false, cdata(escape(err.message) + '\\n' + err.stack))));\n  } else if (test.pending) {\n    this.write(tag('testcase', attrs, false, tag('skipped', {}, true)));\n  } else {\n    this.write(tag('testcase', attrs, true));\n  }\n};\n\n/**\n * HTML tag helper.\n *\n * @param name\n * @param attrs\n * @param close\n * @param content\n * @return {string}\n */\nfunction tag(name, attrs, close, content) {\n  var end = close ? '/>' : '>';\n  var pairs = [];\n  var tag;\n\n  for (var key in attrs) {\n    if (Object.prototype.hasOwnProperty.call(attrs, key)) {\n      pairs.push(key + '=\"' + escape(attrs[key]) + '\"');\n    }\n  }\n\n  tag = '<' + name + (pairs.length ? ' ' + pairs.join(' ') : '') + end;\n  if (content) {\n    tag += content + '</' + name + end;\n  }\n  return tag;\n}\n\n/**\n * Return cdata escaped CDATA `str`.\n */\n\nfunction cdata(str) {\n  return '<![CDATA[' + escape(str) + ']]>';\n}\n\n}).call(this,require('_process'),typeof global !== \"undefined\" ? global : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {})\n},{\"../utils\":39,\"./base\":17,\"_process\":51,\"fs\":41,\"mkdirp\":70,\"path\":41}],35:[function(require,module,exports){\n(function (global){\n/**\n * Module dependencies.\n */\n\nvar EventEmitter = require('events').EventEmitter;\nvar Pending = require('./pending');\nvar debug = require('debug')('mocha:runnable');\nvar milliseconds = require('./ms');\nvar utils = require('./utils');\nvar inherits = utils.inherits;\n\n/**\n * Save timer references to avoid Sinon interfering (see GH-237).\n */\n\n/* eslint-disable no-unused-vars, no-native-reassign */\nvar Date = global.Date;\nvar setTimeout = global.setTimeout;\nvar setInterval = global.setInterval;\nvar clearTimeout = global.clearTimeout;\nvar clearInterval = global.clearInterval;\n/* eslint-enable no-unused-vars, no-native-reassign */\n\n/**\n * Object#toString().\n */\n\nvar toString = Object.prototype.toString;\n\n/**\n * Expose `Runnable`.\n */\n\nmodule.exports = Runnable;\n\n/**\n * Initialize a new `Runnable` with the given `title` and callback `fn`.\n *\n * @param {String} title\n * @param {Function} fn\n * @api private\n * @param {string} title\n * @param {Function} fn\n */\nfunction Runnable(title, fn) {\n  this.title = title;\n  this.fn = fn;\n  this.async = fn && fn.length;\n  this.sync = !this.async;\n  this._timeout = 2000;\n  this._slow = 75;\n  this._enableTimeouts = true;\n  this.timedOut = false;\n  this._trace = new Error('done() called multiple times');\n  this._retries = -1;\n  this._currentRetry = 0;\n}\n\n/**\n * Inherit from `EventEmitter.prototype`.\n */\ninherits(Runnable, EventEmitter);\n\n/**\n * Set & get timeout `ms`.\n *\n * @api private\n * @param {number|string} ms\n * @return {Runnable|number} ms or Runnable instance.\n */\nRunnable.prototype.timeout = function(ms) {\n  if (!arguments.length) {\n    return this._timeout;\n  }\n  if (ms === 0) {\n    this._enableTimeouts = false;\n  }\n  if (typeof ms === 'string') {\n    ms = milliseconds(ms);\n  }\n  debug('timeout %d', ms);\n  this._timeout = ms;\n  if (this.timer) {\n    this.resetTimeout();\n  }\n  return this;\n};\n\n/**\n * Set & get slow `ms`.\n *\n * @api private\n * @param {number|string} ms\n * @return {Runnable|number} ms or Runnable instance.\n */\nRunnable.prototype.slow = function(ms) {\n  if (!arguments.length) {\n    return this._slow;\n  }\n  if (typeof ms === 'string') {\n    ms = milliseconds(ms);\n  }\n  debug('timeout %d', ms);\n  this._slow = ms;\n  return this;\n};\n\n/**\n * Set and get whether timeout is `enabled`.\n *\n * @api private\n * @param {boolean} enabled\n * @return {Runnable|boolean} enabled or Runnable instance.\n */\nRunnable.prototype.enableTimeouts = function(enabled) {\n  if (!arguments.length) {\n    return this._enableTimeouts;\n  }\n  debug('enableTimeouts %s', enabled);\n  this._enableTimeouts = enabled;\n  return this;\n};\n\n/**\n * Halt and mark as pending.\n *\n * @api private\n */\nRunnable.prototype.skip = function() {\n  throw new Pending();\n};\n\n/**\n * Set number of retries.\n *\n * @api private\n */\nRunnable.prototype.retries = function(n) {\n  if (!arguments.length) {\n    return this._retries;\n  }\n  this._retries = n;\n};\n\n/**\n * Get current retry\n *\n * @api private\n */\nRunnable.prototype.currentRetry = function(n) {\n  if (!arguments.length) {\n    return this._currentRetry;\n  }\n  this._currentRetry = n;\n};\n\n/**\n * Return the full title generated by recursively concatenating the parent's\n * full title.\n *\n * @api public\n * @return {string}\n */\nRunnable.prototype.fullTitle = function() {\n  return this.parent.fullTitle() + ' ' + this.title;\n};\n\n/**\n * Clear the timeout.\n *\n * @api private\n */\nRunnable.prototype.clearTimeout = function() {\n  clearTimeout(this.timer);\n};\n\n/**\n * Inspect the runnable void of private properties.\n *\n * @api private\n * @return {string}\n */\nRunnable.prototype.inspect = function() {\n  return JSON.stringify(this, function(key, val) {\n    if (key[0] === '_') {\n      return;\n    }\n    if (key === 'parent') {\n      return '#<Suite>';\n    }\n    if (key === 'ctx') {\n      return '#<Context>';\n    }\n    return val;\n  }, 2);\n};\n\n/**\n * Reset the timeout.\n *\n * @api private\n */\nRunnable.prototype.resetTimeout = function() {\n  var self = this;\n  var ms = this.timeout() || 1e9;\n\n  if (!this._enableTimeouts) {\n    return;\n  }\n  this.clearTimeout();\n  this.timer = setTimeout(function() {\n    if (!self._enableTimeouts) {\n      return;\n    }\n    self.callback(new Error('timeout of ' + ms + 'ms exceeded. Ensure the done() callback is being called in this test.'));\n    self.timedOut = true;\n  }, ms);\n};\n\n/**\n * Whitelist a list of globals for this test run.\n *\n * @api private\n * @param {string[]} globals\n */\nRunnable.prototype.globals = function(globals) {\n  if (!arguments.length) {\n    return this._allowedGlobals;\n  }\n  this._allowedGlobals = globals;\n};\n\n/**\n * Run the test and invoke `fn(err)`.\n *\n * @param {Function} fn\n * @api private\n */\nRunnable.prototype.run = function(fn) {\n  var self = this;\n  var start = new Date();\n  var ctx = this.ctx;\n  var finished;\n  var emitted;\n\n  // Sometimes the ctx exists, but it is not runnable\n  if (ctx && ctx.runnable) {\n    ctx.runnable(this);\n  }\n\n  // called multiple times\n  function multiple(err) {\n    if (emitted) {\n      return;\n    }\n    emitted = true;\n    self.emit('error', err || new Error('done() called multiple times; stacktrace may be inaccurate'));\n  }\n\n  // finished\n  function done(err) {\n    var ms = self.timeout();\n    if (self.timedOut) {\n      return;\n    }\n    if (finished) {\n      return multiple(err || self._trace);\n    }\n\n    self.clearTimeout();\n    self.duration = new Date() - start;\n    finished = true;\n    if (!err && self.duration > ms && self._enableTimeouts) {\n      err = new Error('timeout of ' + ms + 'ms exceeded. Ensure the done() callback is being called in this test.');\n    }\n    fn(err);\n  }\n\n  // for .resetTimeout()\n  this.callback = done;\n\n  // explicit async with `done` argument\n  if (this.async) {\n    this.resetTimeout();\n\n    if (this.allowUncaught) {\n      return callFnAsync(this.fn);\n    }\n    try {\n      callFnAsync(this.fn);\n    } catch (err) {\n      done(utils.getError(err));\n    }\n    return;\n  }\n\n  if (this.allowUncaught) {\n    callFn(this.fn);\n    done();\n    return;\n  }\n\n  // sync or promise-returning\n  try {\n    if (this.pending) {\n      done();\n    } else {\n      callFn(this.fn);\n    }\n  } catch (err) {\n    done(utils.getError(err));\n  }\n\n  function callFn(fn) {\n    var result = fn.call(ctx);\n    if (result && typeof result.then === 'function') {\n      self.resetTimeout();\n      result\n        .then(function() {\n          done();\n          // Return null so libraries like bluebird do not warn about\n          // subsequently constructed Promises.\n          return null;\n        },\n        function(reason) {\n          done(reason || new Error('Promise rejected with no or falsy reason'));\n        });\n    } else {\n      if (self.asyncOnly) {\n        return done(new Error('--async-only option in use without declaring `done()` or returning a promise'));\n      }\n\n      done();\n    }\n  }\n\n  function callFnAsync(fn) {\n    fn.call(ctx, function(err) {\n      if (err instanceof Error || toString.call(err) === '[object Error]') {\n        return done(err);\n      }\n      if (err) {\n        if (Object.prototype.toString.call(err) === '[object Object]') {\n          return done(new Error('done() invoked with non-Error: '\n            + JSON.stringify(err)));\n        }\n        return done(new Error('done() invoked with non-Error: ' + err));\n      }\n      done();\n    });\n  }\n};\n\n}).call(this,typeof global !== \"undefined\" ? global : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {})\n},{\"./ms\":15,\"./pending\":16,\"./utils\":39,\"debug\":2,\"events\":3}],36:[function(require,module,exports){\n(function (process,global){\n/**\n * Module dependencies.\n */\n\nvar EventEmitter = require('events').EventEmitter;\nvar Pending = require('./pending');\nvar utils = require('./utils');\nvar inherits = utils.inherits;\nvar debug = require('debug')('mocha:runner');\nvar Runnable = require('./runnable');\nvar filter = utils.filter;\nvar indexOf = utils.indexOf;\nvar keys = utils.keys;\nvar stackFilter = utils.stackTraceFilter();\nvar stringify = utils.stringify;\nvar type = utils.type;\nvar undefinedError = utils.undefinedError;\nvar isArray = utils.isArray;\n\n/**\n * Non-enumerable globals.\n */\n\nvar globals = [\n  'setTimeout',\n  'clearTimeout',\n  'setInterval',\n  'clearInterval',\n  'XMLHttpRequest',\n  'Date',\n  'setImmediate',\n  'clearImmediate'\n];\n\n/**\n * Expose `Runner`.\n */\n\nmodule.exports = Runner;\n\n/**\n * Initialize a `Runner` for the given `suite`.\n *\n * Events:\n *\n *   - `start`  execution started\n *   - `end`  execution complete\n *   - `suite`  (suite) test suite execution started\n *   - `suite end`  (suite) all tests (and sub-suites) have finished\n *   - `test`  (test) test execution started\n *   - `test end`  (test) test completed\n *   - `hook`  (hook) hook execution started\n *   - `hook end`  (hook) hook complete\n *   - `pass`  (test) test passed\n *   - `fail`  (test, err) test failed\n *   - `pending`  (test) test pending\n *\n * @api public\n * @param {Suite} suite Root suite\n * @param {boolean} [delay] Whether or not to delay execution of root suite\n * until ready.\n */\nfunction Runner(suite, delay) {\n  var self = this;\n  this._globals = [];\n  this._abort = false;\n  this._delay = delay;\n  this.suite = suite;\n  this.started = false;\n  this.total = suite.total();\n  this.failures = 0;\n  this.on('test end', function(test) {\n    self.checkGlobals(test);\n  });\n  this.on('hook end', function(hook) {\n    self.checkGlobals(hook);\n  });\n  this._defaultGrep = /.*/;\n  this.grep(this._defaultGrep);\n  this.globals(this.globalProps().concat(extraGlobals()));\n}\n\n/**\n * Wrapper for setImmediate, process.nextTick, or browser polyfill.\n *\n * @param {Function} fn\n * @api private\n */\nRunner.immediately = global.setImmediate || process.nextTick;\n\n/**\n * Inherit from `EventEmitter.prototype`.\n */\ninherits(Runner, EventEmitter);\n\n/**\n * Run tests with full titles matching `re`. Updates runner.total\n * with number of tests matched.\n *\n * @param {RegExp} re\n * @param {Boolean} invert\n * @return {Runner} for chaining\n * @api public\n * @param {RegExp} re\n * @param {boolean} invert\n * @return {Runner} Runner instance.\n */\nRunner.prototype.grep = function(re, invert) {\n  debug('grep %s', re);\n  this._grep = re;\n  this._invert = invert;\n  this.total = this.grepTotal(this.suite);\n  return this;\n};\n\n/**\n * Returns the number of tests matching the grep search for the\n * given suite.\n *\n * @param {Suite} suite\n * @return {Number}\n * @api public\n * @param {Suite} suite\n * @return {number}\n */\nRunner.prototype.grepTotal = function(suite) {\n  var self = this;\n  var total = 0;\n\n  suite.eachTest(function(test) {\n    var match = self._grep.test(test.fullTitle());\n    if (self._invert) {\n      match = !match;\n    }\n    if (match) {\n      total++;\n    }\n  });\n\n  return total;\n};\n\n/**\n * Return a list of global properties.\n *\n * @return {Array}\n * @api private\n */\nRunner.prototype.globalProps = function() {\n  var props = keys(global);\n\n  // non-enumerables\n  for (var i = 0; i < globals.length; ++i) {\n    if (~indexOf(props, globals[i])) {\n      continue;\n    }\n    props.push(globals[i]);\n  }\n\n  return props;\n};\n\n/**\n * Allow the given `arr` of globals.\n *\n * @param {Array} arr\n * @return {Runner} for chaining\n * @api public\n * @param {Array} arr\n * @return {Runner} Runner instance.\n */\nRunner.prototype.globals = function(arr) {\n  if (!arguments.length) {\n    return this._globals;\n  }\n  debug('globals %j', arr);\n  this._globals = this._globals.concat(arr);\n  return this;\n};\n\n/**\n * Check for global variable leaks.\n *\n * @api private\n */\nRunner.prototype.checkGlobals = function(test) {\n  if (this.ignoreLeaks) {\n    return;\n  }\n  var ok = this._globals;\n\n  var globals = this.globalProps();\n  var leaks;\n\n  if (test) {\n    ok = ok.concat(test._allowedGlobals || []);\n  }\n\n  if (this.prevGlobalsLength === globals.length) {\n    return;\n  }\n  this.prevGlobalsLength = globals.length;\n\n  leaks = filterLeaks(ok, globals);\n  this._globals = this._globals.concat(leaks);\n\n  if (leaks.length > 1) {\n    this.fail(test, new Error('global leaks detected: ' + leaks.join(', ') + ''));\n  } else if (leaks.length) {\n    this.fail(test, new Error('global leak detected: ' + leaks[0]));\n  }\n};\n\n/**\n * Fail the given `test`.\n *\n * @api private\n * @param {Test} test\n * @param {Error} err\n */\nRunner.prototype.fail = function(test, err) {\n  ++this.failures;\n  test.state = 'failed';\n\n  if (!(err instanceof Error || err && typeof err.message === 'string')) {\n    err = new Error('the ' + type(err) + ' ' + stringify(err) + ' was thrown, throw an Error :)');\n  }\n\n  err.stack = (this.fullStackTrace || !err.stack)\n    ? err.stack\n    : stackFilter(err.stack);\n\n  this.emit('fail', test, err);\n};\n\n/**\n * Fail the given `hook` with `err`.\n *\n * Hook failures work in the following pattern:\n * - If bail, then exit\n * - Failed `before` hook skips all tests in a suite and subsuites,\n *   but jumps to corresponding `after` hook\n * - Failed `before each` hook skips remaining tests in a\n *   suite and jumps to corresponding `after each` hook,\n *   which is run only once\n * - Failed `after` hook does not alter\n *   execution order\n * - Failed `after each` hook skips remaining tests in a\n *   suite and subsuites, but executes other `after each`\n *   hooks\n *\n * @api private\n * @param {Hook} hook\n * @param {Error} err\n */\nRunner.prototype.failHook = function(hook, err) {\n  if (hook.ctx && hook.ctx.currentTest) {\n    hook.originalTitle = hook.originalTitle || hook.title;\n    hook.title = hook.originalTitle + ' for \"' + hook.ctx.currentTest.title + '\"';\n  }\n\n  this.fail(hook, err);\n  if (this.suite.bail()) {\n    this.emit('end');\n  }\n};\n\n/**\n * Run hook `name` callbacks and then invoke `fn()`.\n *\n * @api private\n * @param {string} name\n * @param {Function} fn\n */\n\nRunner.prototype.hook = function(name, fn) {\n  var suite = this.suite;\n  var hooks = suite['_' + name];\n  var self = this;\n\n  function next(i) {\n    var hook = hooks[i];\n    if (!hook) {\n      return fn();\n    }\n    self.currentRunnable = hook;\n\n    hook.ctx.currentTest = self.test;\n\n    self.emit('hook', hook);\n\n    if (!hook.listeners('error').length) {\n      hook.on('error', function(err) {\n        self.failHook(hook, err);\n      });\n    }\n\n    hook.run(function(err) {\n      var testError = hook.error();\n      if (testError) {\n        self.fail(self.test, testError);\n      }\n      if (err) {\n        if (err instanceof Pending) {\n          suite.pending = true;\n        } else {\n          self.failHook(hook, err);\n\n          // stop executing hooks, notify callee of hook err\n          return fn(err);\n        }\n      }\n      self.emit('hook end', hook);\n      delete hook.ctx.currentTest;\n      next(++i);\n    });\n  }\n\n  Runner.immediately(function() {\n    next(0);\n  });\n};\n\n/**\n * Run hook `name` for the given array of `suites`\n * in order, and callback `fn(err, errSuite)`.\n *\n * @api private\n * @param {string} name\n * @param {Array} suites\n * @param {Function} fn\n */\nRunner.prototype.hooks = function(name, suites, fn) {\n  var self = this;\n  var orig = this.suite;\n\n  function next(suite) {\n    self.suite = suite;\n\n    if (!suite) {\n      self.suite = orig;\n      return fn();\n    }\n\n    self.hook(name, function(err) {\n      if (err) {\n        var errSuite = self.suite;\n        self.suite = orig;\n        return fn(err, errSuite);\n      }\n\n      next(suites.pop());\n    });\n  }\n\n  next(suites.pop());\n};\n\n/**\n * Run hooks from the top level down.\n *\n * @param {String} name\n * @param {Function} fn\n * @api private\n */\nRunner.prototype.hookUp = function(name, fn) {\n  var suites = [this.suite].concat(this.parents()).reverse();\n  this.hooks(name, suites, fn);\n};\n\n/**\n * Run hooks from the bottom up.\n *\n * @param {String} name\n * @param {Function} fn\n * @api private\n */\nRunner.prototype.hookDown = function(name, fn) {\n  var suites = [this.suite].concat(this.parents());\n  this.hooks(name, suites, fn);\n};\n\n/**\n * Return an array of parent Suites from\n * closest to furthest.\n *\n * @return {Array}\n * @api private\n */\nRunner.prototype.parents = function() {\n  var suite = this.suite;\n  var suites = [];\n  while (suite.parent) {\n    suite = suite.parent;\n    suites.push(suite);\n  }\n  return suites;\n};\n\n/**\n * Run the current test and callback `fn(err)`.\n *\n * @param {Function} fn\n * @api private\n */\nRunner.prototype.runTest = function(fn) {\n  var self = this;\n  var test = this.test;\n\n  if (this.asyncOnly) {\n    test.asyncOnly = true;\n  }\n\n  if (this.allowUncaught) {\n    test.allowUncaught = true;\n    return test.run(fn);\n  }\n  try {\n    test.on('error', function(err) {\n      self.fail(test, err);\n    });\n    test.run(fn);\n  } catch (err) {\n    fn(err);\n  }\n};\n\n/**\n * Run tests in the given `suite` and invoke the callback `fn()` when complete.\n *\n * @api private\n * @param {Suite} suite\n * @param {Function} fn\n */\nRunner.prototype.runTests = function(suite, fn) {\n  var self = this;\n  var tests = suite.tests.slice();\n  var test;\n\n  function hookErr(_, errSuite, after) {\n    // before/after Each hook for errSuite failed:\n    var orig = self.suite;\n\n    // for failed 'after each' hook start from errSuite parent,\n    // otherwise start from errSuite itself\n    self.suite = after ? errSuite.parent : errSuite;\n\n    if (self.suite) {\n      // call hookUp afterEach\n      self.hookUp('afterEach', function(err2, errSuite2) {\n        self.suite = orig;\n        // some hooks may fail even now\n        if (err2) {\n          return hookErr(err2, errSuite2, true);\n        }\n        // report error suite\n        fn(errSuite);\n      });\n    } else {\n      // there is no need calling other 'after each' hooks\n      self.suite = orig;\n      fn(errSuite);\n    }\n  }\n\n  function next(err, errSuite) {\n    // if we bail after first err\n    if (self.failures && suite._bail) {\n      return fn();\n    }\n\n    if (self._abort) {\n      return fn();\n    }\n\n    if (err) {\n      return hookErr(err, errSuite, true);\n    }\n\n    // next test\n    test = tests.shift();\n\n    // all done\n    if (!test) {\n      return fn();\n    }\n\n    // grep\n    var match = self._grep.test(test.fullTitle());\n    if (self._invert) {\n      match = !match;\n    }\n    if (!match) {\n      // Run immediately only if we have defined a grep. When we\n      // define a grep — It can cause maximum callstack error if\n      // the grep is doing a large recursive loop by neglecting\n      // all tests. The run immediately function also comes with\n      // a performance cost. So we don't want to run immediately\n      // if we run the whole test suite, because running the whole\n      // test suite don't do any immediate recursive loops. Thus,\n      // allowing a JS runtime to breathe.\n      if (self._grep !== self._defaultGrep) {\n        Runner.immediately(next);\n      } else {\n        next();\n      }\n      return;\n    }\n\n    function parentPending(suite) {\n      return suite.pending || (suite.parent && parentPending(suite.parent));\n    }\n\n    // pending\n    if (test.pending || parentPending(test.parent)) {\n      self.emit('pending', test);\n      self.emit('test end', test);\n      return next();\n    }\n\n    // execute test and hook(s)\n    self.emit('test', self.test = test);\n    self.hookDown('beforeEach', function(err, errSuite) {\n      if (suite.pending) {\n        self.emit('pending', test);\n        self.emit('test end', test);\n        return next();\n      }\n      if (err) {\n        return hookErr(err, errSuite, false);\n      }\n      self.currentRunnable = self.test;\n      self.runTest(function(err) {\n        test = self.test;\n        if (err) {\n          var retry = test.currentRetry();\n          if (err instanceof Pending) {\n            test.pending = true;\n            self.emit('pending', test);\n          } else if (retry < test.retries()) {\n            var clonedTest = test.clone();\n            clonedTest.currentRetry(retry + 1);\n            tests.unshift(clonedTest);\n\n            // Early return + hook trigger so that it doesn't\n            // increment the count wrong\n            return self.hookUp('afterEach', next);\n          } else {\n            self.fail(test, err);\n          }\n          self.emit('test end', test);\n\n          if (err instanceof Pending) {\n            return next();\n          }\n\n          return self.hookUp('afterEach', next);\n        }\n\n        test.state = 'passed';\n        self.emit('pass', test);\n        self.emit('test end', test);\n        self.hookUp('afterEach', next);\n      });\n    });\n  }\n\n  this.next = next;\n  this.hookErr = hookErr;\n  next();\n};\n\n/**\n * Run the given `suite` and invoke the callback `fn()` when complete.\n *\n * @api private\n * @param {Suite} suite\n * @param {Function} fn\n */\nRunner.prototype.runSuite = function(suite, fn) {\n  var i = 0;\n  var self = this;\n  var total = this.grepTotal(suite);\n  var afterAllHookCalled = false;\n\n  debug('run suite %s', suite.fullTitle());\n\n  if (!total || (self.failures && suite._bail)) {\n    return fn();\n  }\n\n  this.emit('suite', this.suite = suite);\n\n  function next(errSuite) {\n    if (errSuite) {\n      // current suite failed on a hook from errSuite\n      if (errSuite === suite) {\n        // if errSuite is current suite\n        // continue to the next sibling suite\n        return done();\n      }\n      // errSuite is among the parents of current suite\n      // stop execution of errSuite and all sub-suites\n      return done(errSuite);\n    }\n\n    if (self._abort) {\n      return done();\n    }\n\n    var curr = suite.suites[i++];\n    if (!curr) {\n      return done();\n    }\n\n    // Avoid grep neglecting large number of tests causing a\n    // huge recursive loop and thus a maximum call stack error.\n    // See comment in `this.runTests()` for more information.\n    if (self._grep !== self._defaultGrep) {\n      Runner.immediately(function() {\n        self.runSuite(curr, next);\n      });\n    } else {\n      self.runSuite(curr, next);\n    }\n  }\n\n  function done(errSuite) {\n    self.suite = suite;\n    self.nextSuite = next;\n\n    if (afterAllHookCalled) {\n      fn(errSuite);\n    } else {\n      // mark that the afterAll block has been called once\n      // and so can be skipped if there is an error in it.\n      afterAllHookCalled = true;\n\n      // remove reference to test\n      delete self.test;\n\n      self.hook('afterAll', function() {\n        self.emit('suite end', suite);\n        fn(errSuite);\n      });\n    }\n  }\n\n  this.nextSuite = next;\n\n  this.hook('beforeAll', function(err) {\n    if (err) {\n      return done();\n    }\n    self.runTests(suite, next);\n  });\n};\n\n/**\n * Handle uncaught exceptions.\n *\n * @param {Error} err\n * @api private\n */\nRunner.prototype.uncaught = function(err) {\n  if (err) {\n    debug('uncaught exception %s', err !== function() {\n      return this;\n    }.call(err) ? err : (err.message || err));\n  } else {\n    debug('uncaught undefined exception');\n    err = undefinedError();\n  }\n  err.uncaught = true;\n\n  var runnable = this.currentRunnable;\n\n  if (!runnable) {\n    runnable = new Runnable('Uncaught error outside test suite');\n    runnable.parent = this.suite;\n\n    if (this.started) {\n      this.fail(runnable, err);\n    } else {\n      // Can't recover from this failure\n      this.emit('start');\n      this.fail(runnable, err);\n      this.emit('end');\n    }\n\n    return;\n  }\n\n  runnable.clearTimeout();\n\n  // Ignore errors if complete\n  if (runnable.state) {\n    return;\n  }\n  this.fail(runnable, err);\n\n  // recover from test\n  if (runnable.type === 'test') {\n    this.emit('test end', runnable);\n    this.hookUp('afterEach', this.next);\n    return;\n  }\n\n // recover from hooks\n  if (runnable.type === 'hook') {\n    var errSuite = this.suite;\n    // if hook failure is in afterEach block\n    if (runnable.fullTitle().indexOf('after each') > -1) {\n      return this.hookErr(err, errSuite, true);\n    }\n    // if hook failure is in beforeEach block\n    if (runnable.fullTitle().indexOf('before each') > -1) {\n      return this.hookErr(err, errSuite, false);\n    }\n    // if hook failure is in after or before blocks\n    return this.nextSuite(errSuite);\n  }\n\n  // bail\n  this.emit('end');\n};\n\n/**\n * Cleans up the references to all the deferred functions\n * (before/after/beforeEach/afterEach) and tests of a Suite.\n * These must be deleted otherwise a memory leak can happen,\n * as those functions may reference variables from closures,\n * thus those variables can never be garbage collected as long\n * as the deferred functions exist.\n *\n * @param {Suite} suite\n */\nfunction cleanSuiteReferences(suite) {\n  function cleanArrReferences(arr) {\n    for (var i = 0; i < arr.length; i++) {\n      delete arr[i].fn;\n    }\n  }\n\n  if (isArray(suite._beforeAll)) {\n    cleanArrReferences(suite._beforeAll);\n  }\n\n  if (isArray(suite._beforeEach)) {\n    cleanArrReferences(suite._beforeEach);\n  }\n\n  if (isArray(suite._afterAll)) {\n    cleanArrReferences(suite._afterAll);\n  }\n\n  if (isArray(suite._afterEach)) {\n    cleanArrReferences(suite._afterEach);\n  }\n\n  for (var i = 0; i < suite.tests.length; i++) {\n    delete suite.tests[i].fn;\n  }\n}\n\n/**\n * Run the root suite and invoke `fn(failures)`\n * on completion.\n *\n * @param {Function} fn\n * @return {Runner} for chaining\n * @api public\n * @param {Function} fn\n * @return {Runner} Runner instance.\n */\nRunner.prototype.run = function(fn) {\n  var self = this;\n  var rootSuite = this.suite;\n\n  fn = fn || function() {};\n\n  function uncaught(err) {\n    self.uncaught(err);\n  }\n\n  function start() {\n    self.started = true;\n    self.emit('start');\n    self.runSuite(rootSuite, function() {\n      debug('finished running');\n      self.emit('end');\n    });\n  }\n\n  debug('start');\n\n  // references cleanup to avoid memory leaks\n  this.on('suite end', cleanSuiteReferences);\n\n  // callback\n  this.on('end', function() {\n    debug('end');\n    process.removeListener('uncaughtException', uncaught);\n    fn(self.failures);\n  });\n\n  // uncaught exception\n  process.on('uncaughtException', uncaught);\n\n  if (this._delay) {\n    // for reporters, I guess.\n    // might be nice to debounce some dots while we wait.\n    this.emit('waiting', rootSuite);\n    rootSuite.once('run', start);\n  } else {\n    start();\n  }\n\n  return this;\n};\n\n/**\n * Cleanly abort execution.\n *\n * @api public\n * @return {Runner} Runner instance.\n */\nRunner.prototype.abort = function() {\n  debug('aborting');\n  this._abort = true;\n\n  return this;\n};\n\n/**\n * Filter leaks with the given globals flagged as `ok`.\n *\n * @api private\n * @param {Array} ok\n * @param {Array} globals\n * @return {Array}\n */\nfunction filterLeaks(ok, globals) {\n  return filter(globals, function(key) {\n    // Firefox and Chrome exposes iframes as index inside the window object\n    if (/^d+/.test(key)) {\n      return false;\n    }\n\n    // in firefox\n    // if runner runs in an iframe, this iframe's window.getInterface method not init at first\n    // it is assigned in some seconds\n    if (global.navigator && (/^getInterface/).test(key)) {\n      return false;\n    }\n\n    // an iframe could be approached by window[iframeIndex]\n    // in ie6,7,8 and opera, iframeIndex is enumerable, this could cause leak\n    if (global.navigator && (/^\\d+/).test(key)) {\n      return false;\n    }\n\n    // Opera and IE expose global variables for HTML element IDs (issue #243)\n    if (/^mocha-/.test(key)) {\n      return false;\n    }\n\n    var matched = filter(ok, function(ok) {\n      if (~ok.indexOf('*')) {\n        return key.indexOf(ok.split('*')[0]) === 0;\n      }\n      return key === ok;\n    });\n    return !matched.length && (!global.navigator || key !== 'onerror');\n  });\n}\n\n/**\n * Array of globals dependent on the environment.\n *\n * @return {Array}\n * @api private\n */\nfunction extraGlobals() {\n  if (typeof process === 'object' && typeof process.version === 'string') {\n    var parts = process.version.split('.');\n    var nodeVersion = utils.reduce(parts, function(a, v) {\n      return a << 8 | v;\n    });\n\n    // 'errno' was renamed to process._errno in v0.9.11.\n\n    if (nodeVersion < 0x00090B) {\n      return ['errno'];\n    }\n  }\n\n  return [];\n}\n\n}).call(this,require('_process'),typeof global !== \"undefined\" ? global : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {})\n},{\"./pending\":16,\"./runnable\":35,\"./utils\":39,\"_process\":51,\"debug\":2,\"events\":3}],37:[function(require,module,exports){\n/**\n * Module dependencies.\n */\n\nvar EventEmitter = require('events').EventEmitter;\nvar Hook = require('./hook');\nvar utils = require('./utils');\nvar inherits = utils.inherits;\nvar debug = require('debug')('mocha:suite');\nvar milliseconds = require('./ms');\n\n/**\n * Expose `Suite`.\n */\n\nexports = module.exports = Suite;\n\n/**\n * Create a new `Suite` with the given `title` and parent `Suite`. When a suite\n * with the same title is already present, that suite is returned to provide\n * nicer reporter and more flexible meta-testing.\n *\n * @api public\n * @param {Suite} parent\n * @param {string} title\n * @return {Suite}\n */\nexports.create = function(parent, title) {\n  var suite = new Suite(title, parent.ctx);\n  suite.parent = parent;\n  if (parent.pending) {\n    suite.pending = true;\n  }\n  title = suite.fullTitle();\n  parent.addSuite(suite);\n  return suite;\n};\n\n/**\n * Initialize a new `Suite` with the given `title` and `ctx`.\n *\n * @api private\n * @param {string} title\n * @param {Context} parentContext\n */\nfunction Suite(title, parentContext) {\n  this.title = title;\n  function Context() {}\n  Context.prototype = parentContext;\n  this.ctx = new Context();\n  this.suites = [];\n  this.tests = [];\n  this.pending = false;\n  this._beforeEach = [];\n  this._beforeAll = [];\n  this._afterEach = [];\n  this._afterAll = [];\n  this.root = !title;\n  this._timeout = 2000;\n  this._enableTimeouts = true;\n  this._slow = 75;\n  this._bail = false;\n  this._retries = -1;\n  this.delayed = false;\n}\n\n/**\n * Inherit from `EventEmitter.prototype`.\n */\ninherits(Suite, EventEmitter);\n\n/**\n * Return a clone of this `Suite`.\n *\n * @api private\n * @return {Suite}\n */\nSuite.prototype.clone = function() {\n  var suite = new Suite(this.title);\n  debug('clone');\n  suite.ctx = this.ctx;\n  suite.timeout(this.timeout());\n  suite.retries(this.retries());\n  suite.enableTimeouts(this.enableTimeouts());\n  suite.slow(this.slow());\n  suite.bail(this.bail());\n  return suite;\n};\n\n/**\n * Set timeout `ms` or short-hand such as \"2s\".\n *\n * @api private\n * @param {number|string} ms\n * @return {Suite|number} for chaining\n */\nSuite.prototype.timeout = function(ms) {\n  if (!arguments.length) {\n    return this._timeout;\n  }\n  if (ms.toString() === '0') {\n    this._enableTimeouts = false;\n  }\n  if (typeof ms === 'string') {\n    ms = milliseconds(ms);\n  }\n  debug('timeout %d', ms);\n  this._timeout = parseInt(ms, 10);\n  return this;\n};\n\n/**\n * Set number of times to retry a failed test.\n *\n * @api private\n * @param {number|string} n\n * @return {Suite|number} for chaining\n */\nSuite.prototype.retries = function(n) {\n  if (!arguments.length) {\n    return this._retries;\n  }\n  debug('retries %d', n);\n  this._retries = parseInt(n, 10) || 0;\n  return this;\n};\n\n/**\n  * Set timeout to `enabled`.\n  *\n  * @api private\n  * @param {boolean} enabled\n  * @return {Suite|boolean} self or enabled\n  */\nSuite.prototype.enableTimeouts = function(enabled) {\n  if (!arguments.length) {\n    return this._enableTimeouts;\n  }\n  debug('enableTimeouts %s', enabled);\n  this._enableTimeouts = enabled;\n  return this;\n};\n\n/**\n * Set slow `ms` or short-hand such as \"2s\".\n *\n * @api private\n * @param {number|string} ms\n * @return {Suite|number} for chaining\n */\nSuite.prototype.slow = function(ms) {\n  if (!arguments.length) {\n    return this._slow;\n  }\n  if (typeof ms === 'string') {\n    ms = milliseconds(ms);\n  }\n  debug('slow %d', ms);\n  this._slow = ms;\n  return this;\n};\n\n/**\n * Sets whether to bail after first error.\n *\n * @api private\n * @param {boolean} bail\n * @return {Suite|number} for chaining\n */\nSuite.prototype.bail = function(bail) {\n  if (!arguments.length) {\n    return this._bail;\n  }\n  debug('bail %s', bail);\n  this._bail = bail;\n  return this;\n};\n\n/**\n * Run `fn(test[, done])` before running tests.\n *\n * @api private\n * @param {string} title\n * @param {Function} fn\n * @return {Suite} for chaining\n */\nSuite.prototype.beforeAll = function(title, fn) {\n  if (this.pending) {\n    return this;\n  }\n  if (typeof title === 'function') {\n    fn = title;\n    title = fn.name;\n  }\n  title = '\"before all\" hook' + (title ? ': ' + title : '');\n\n  var hook = new Hook(title, fn);\n  hook.parent = this;\n  hook.timeout(this.timeout());\n  hook.retries(this.retries());\n  hook.enableTimeouts(this.enableTimeouts());\n  hook.slow(this.slow());\n  hook.ctx = this.ctx;\n  this._beforeAll.push(hook);\n  this.emit('beforeAll', hook);\n  return this;\n};\n\n/**\n * Run `fn(test[, done])` after running tests.\n *\n * @api private\n * @param {string} title\n * @param {Function} fn\n * @return {Suite} for chaining\n */\nSuite.prototype.afterAll = function(title, fn) {\n  if (this.pending) {\n    return this;\n  }\n  if (typeof title === 'function') {\n    fn = title;\n    title = fn.name;\n  }\n  title = '\"after all\" hook' + (title ? ': ' + title : '');\n\n  var hook = new Hook(title, fn);\n  hook.parent = this;\n  hook.timeout(this.timeout());\n  hook.retries(this.retries());\n  hook.enableTimeouts(this.enableTimeouts());\n  hook.slow(this.slow());\n  hook.ctx = this.ctx;\n  this._afterAll.push(hook);\n  this.emit('afterAll', hook);\n  return this;\n};\n\n/**\n * Run `fn(test[, done])` before each test case.\n *\n * @api private\n * @param {string} title\n * @param {Function} fn\n * @return {Suite} for chaining\n */\nSuite.prototype.beforeEach = function(title, fn) {\n  if (this.pending) {\n    return this;\n  }\n  if (typeof title === 'function') {\n    fn = title;\n    title = fn.name;\n  }\n  title = '\"before each\" hook' + (title ? ': ' + title : '');\n\n  var hook = new Hook(title, fn);\n  hook.parent = this;\n  hook.timeout(this.timeout());\n  hook.retries(this.retries());\n  hook.enableTimeouts(this.enableTimeouts());\n  hook.slow(this.slow());\n  hook.ctx = this.ctx;\n  this._beforeEach.push(hook);\n  this.emit('beforeEach', hook);\n  return this;\n};\n\n/**\n * Run `fn(test[, done])` after each test case.\n *\n * @api private\n * @param {string} title\n * @param {Function} fn\n * @return {Suite} for chaining\n */\nSuite.prototype.afterEach = function(title, fn) {\n  if (this.pending) {\n    return this;\n  }\n  if (typeof title === 'function') {\n    fn = title;\n    title = fn.name;\n  }\n  title = '\"after each\" hook' + (title ? ': ' + title : '');\n\n  var hook = new Hook(title, fn);\n  hook.parent = this;\n  hook.timeout(this.timeout());\n  hook.retries(this.retries());\n  hook.enableTimeouts(this.enableTimeouts());\n  hook.slow(this.slow());\n  hook.ctx = this.ctx;\n  this._afterEach.push(hook);\n  this.emit('afterEach', hook);\n  return this;\n};\n\n/**\n * Add a test `suite`.\n *\n * @api private\n * @param {Suite} suite\n * @return {Suite} for chaining\n */\nSuite.prototype.addSuite = function(suite) {\n  suite.parent = this;\n  suite.timeout(this.timeout());\n  suite.retries(this.retries());\n  suite.enableTimeouts(this.enableTimeouts());\n  suite.slow(this.slow());\n  suite.bail(this.bail());\n  this.suites.push(suite);\n  this.emit('suite', suite);\n  return this;\n};\n\n/**\n * Add a `test` to this suite.\n *\n * @api private\n * @param {Test} test\n * @return {Suite} for chaining\n */\nSuite.prototype.addTest = function(test) {\n  test.parent = this;\n  test.timeout(this.timeout());\n  test.retries(this.retries());\n  test.enableTimeouts(this.enableTimeouts());\n  test.slow(this.slow());\n  test.ctx = this.ctx;\n  this.tests.push(test);\n  this.emit('test', test);\n  return this;\n};\n\n/**\n * Return the full title generated by recursively concatenating the parent's\n * full title.\n *\n * @api public\n * @return {string}\n */\nSuite.prototype.fullTitle = function() {\n  if (this.parent) {\n    var full = this.parent.fullTitle();\n    if (full) {\n      return full + ' ' + this.title;\n    }\n  }\n  return this.title;\n};\n\n/**\n * Return the total number of tests.\n *\n * @api public\n * @return {number}\n */\nSuite.prototype.total = function() {\n  return utils.reduce(this.suites, function(sum, suite) {\n    return sum + suite.total();\n  }, 0) + this.tests.length;\n};\n\n/**\n * Iterates through each suite recursively to find all tests. Applies a\n * function in the format `fn(test)`.\n *\n * @api private\n * @param {Function} fn\n * @return {Suite}\n */\nSuite.prototype.eachTest = function(fn) {\n  utils.forEach(this.tests, fn);\n  utils.forEach(this.suites, function(suite) {\n    suite.eachTest(fn);\n  });\n  return this;\n};\n\n/**\n * This will run the root suite if we happen to be running in delayed mode.\n */\nSuite.prototype.run = function run() {\n  if (this.root) {\n    this.emit('run');\n  }\n};\n\n},{\"./hook\":7,\"./ms\":15,\"./utils\":39,\"debug\":2,\"events\":3}],38:[function(require,module,exports){\n/**\n * Module dependencies.\n */\n\nvar Runnable = require('./runnable');\nvar inherits = require('./utils').inherits;\n\n/**\n * Expose `Test`.\n */\n\nmodule.exports = Test;\n\n/**\n * Initialize a new `Test` with the given `title` and callback `fn`.\n *\n * @api private\n * @param {String} title\n * @param {Function} fn\n */\nfunction Test(title, fn) {\n  Runnable.call(this, title, fn);\n  this.pending = !fn;\n  this.type = 'test';\n  this.body = (fn || '').toString();\n}\n\n/**\n * Inherit from `Runnable.prototype`.\n */\ninherits(Test, Runnable);\n\nTest.prototype.clone = function() {\n  var test = new Test(this.title, this.fn);\n  test.timeout(this.timeout());\n  test.slow(this.slow());\n  test.enableTimeouts(this.enableTimeouts());\n  test.retries(this.retries());\n  test.currentRetry(this.currentRetry());\n  test.globals(this.globals());\n  test.parent = this.parent;\n  test.file = this.file;\n  test.ctx = this.ctx;\n  return test;\n};\n\n},{\"./runnable\":35,\"./utils\":39}],39:[function(require,module,exports){\n(function (process,Buffer){\n/* eslint-env browser */\n\n/**\n * Module dependencies.\n */\n\nvar basename = require('path').basename;\nvar debug = require('debug')('mocha:watch');\nvar exists = require('fs').existsSync || require('path').existsSync;\nvar glob = require('glob');\nvar join = require('path').join;\nvar readdirSync = require('fs').readdirSync;\nvar statSync = require('fs').statSync;\nvar watchFile = require('fs').watchFile;\n\n/**\n * Ignored directories.\n */\n\nvar ignore = ['node_modules', '.git'];\n\nexports.inherits = require('util').inherits;\n\n/**\n * Escape special characters in the given string of html.\n *\n * @api private\n * @param  {string} html\n * @return {string}\n */\nexports.escape = function(html) {\n  return String(html)\n    .replace(/&/g, '&amp;')\n    .replace(/\"/g, '&quot;')\n    .replace(/</g, '&lt;')\n    .replace(/>/g, '&gt;');\n};\n\n/**\n * Array#forEach (<=IE8)\n *\n * @api private\n * @param {Array} arr\n * @param {Function} fn\n * @param {Object} scope\n */\nexports.forEach = function(arr, fn, scope) {\n  for (var i = 0, l = arr.length; i < l; i++) {\n    fn.call(scope, arr[i], i);\n  }\n};\n\n/**\n * Test if the given obj is type of string.\n *\n * @api private\n * @param {Object} obj\n * @return {boolean}\n */\nexports.isString = function(obj) {\n  return typeof obj === 'string';\n};\n\n/**\n * Array#map (<=IE8)\n *\n * @api private\n * @param {Array} arr\n * @param {Function} fn\n * @param {Object} scope\n * @return {Array}\n */\nexports.map = function(arr, fn, scope) {\n  var result = [];\n  for (var i = 0, l = arr.length; i < l; i++) {\n    result.push(fn.call(scope, arr[i], i, arr));\n  }\n  return result;\n};\n\n/**\n * Array#indexOf (<=IE8)\n *\n * @api private\n * @param {Array} arr\n * @param {Object} obj to find index of\n * @param {number} start\n * @return {number}\n */\nexports.indexOf = function(arr, obj, start) {\n  for (var i = start || 0, l = arr.length; i < l; i++) {\n    if (arr[i] === obj) {\n      return i;\n    }\n  }\n  return -1;\n};\n\n/**\n * Array#reduce (<=IE8)\n *\n * @api private\n * @param {Array} arr\n * @param {Function} fn\n * @param {Object} val Initial value.\n * @return {*}\n */\nexports.reduce = function(arr, fn, val) {\n  var rval = val;\n\n  for (var i = 0, l = arr.length; i < l; i++) {\n    rval = fn(rval, arr[i], i, arr);\n  }\n\n  return rval;\n};\n\n/**\n * Array#filter (<=IE8)\n *\n * @api private\n * @param {Array} arr\n * @param {Function} fn\n * @return {Array}\n */\nexports.filter = function(arr, fn) {\n  var ret = [];\n\n  for (var i = 0, l = arr.length; i < l; i++) {\n    var val = arr[i];\n    if (fn(val, i, arr)) {\n      ret.push(val);\n    }\n  }\n\n  return ret;\n};\n\n/**\n * Object.keys (<=IE8)\n *\n * @api private\n * @param {Object} obj\n * @return {Array} keys\n */\nexports.keys = typeof Object.keys === 'function' ? Object.keys : function(obj) {\n  var keys = [];\n  var has = Object.prototype.hasOwnProperty; // for `window` on <=IE8\n\n  for (var key in obj) {\n    if (has.call(obj, key)) {\n      keys.push(key);\n    }\n  }\n\n  return keys;\n};\n\n/**\n * Watch the given `files` for changes\n * and invoke `fn(file)` on modification.\n *\n * @api private\n * @param {Array} files\n * @param {Function} fn\n */\nexports.watch = function(files, fn) {\n  var options = { interval: 100 };\n  files.forEach(function(file) {\n    debug('file %s', file);\n    watchFile(file, options, function(curr, prev) {\n      if (prev.mtime < curr.mtime) {\n        fn(file);\n      }\n    });\n  });\n};\n\n/**\n * Array.isArray (<=IE8)\n *\n * @api private\n * @param {Object} obj\n * @return {Boolean}\n */\nvar isArray = typeof Array.isArray === 'function' ? Array.isArray : function(obj) {\n  return Object.prototype.toString.call(obj) === '[object Array]';\n};\n\nexports.isArray = isArray;\n\n/**\n * Buffer.prototype.toJSON polyfill.\n *\n * @type {Function}\n */\nif (typeof Buffer !== 'undefined' && Buffer.prototype) {\n  Buffer.prototype.toJSON = Buffer.prototype.toJSON || function() {\n    return Array.prototype.slice.call(this, 0);\n  };\n}\n\n/**\n * Ignored files.\n *\n * @api private\n * @param {string} path\n * @return {boolean}\n */\nfunction ignored(path) {\n  return !~ignore.indexOf(path);\n}\n\n/**\n * Lookup files in the given `dir`.\n *\n * @api private\n * @param {string} dir\n * @param {string[]} [ext=['.js']]\n * @param {Array} [ret=[]]\n * @return {Array}\n */\nexports.files = function(dir, ext, ret) {\n  ret = ret || [];\n  ext = ext || ['js'];\n\n  var re = new RegExp('\\\\.(' + ext.join('|') + ')$');\n\n  readdirSync(dir)\n    .filter(ignored)\n    .forEach(function(path) {\n      path = join(dir, path);\n      if (statSync(path).isDirectory()) {\n        exports.files(path, ext, ret);\n      } else if (path.match(re)) {\n        ret.push(path);\n      }\n    });\n\n  return ret;\n};\n\n/**\n * Compute a slug from the given `str`.\n *\n * @api private\n * @param {string} str\n * @return {string}\n */\nexports.slug = function(str) {\n  return str\n    .toLowerCase()\n    .replace(/ +/g, '-')\n    .replace(/[^-\\w]/g, '');\n};\n\n/**\n * Strip the function definition from `str`, and re-indent for pre whitespace.\n *\n * @param {string} str\n * @return {string}\n */\nexports.clean = function(str) {\n  str = str\n    .replace(/\\r\\n?|[\\n\\u2028\\u2029]/g, '\\n').replace(/^\\uFEFF/, '')\n    .replace(/^function *\\(.*\\)\\s*\\{|\\(.*\\) *=> *\\{?/, '')\n    .replace(/\\s+\\}$/, '');\n\n  var spaces = str.match(/^\\n?( *)/)[1].length;\n  var tabs = str.match(/^\\n?(\\t*)/)[1].length;\n  var re = new RegExp('^\\n?' + (tabs ? '\\t' : ' ') + '{' + (tabs ? tabs : spaces) + '}', 'gm');\n\n  str = str.replace(re, '');\n\n  return exports.trim(str);\n};\n\n/**\n * Trim the given `str`.\n *\n * @api private\n * @param {string} str\n * @return {string}\n */\nexports.trim = function(str) {\n  return str.replace(/^\\s+|\\s+$/g, '');\n};\n\n/**\n * Parse the given `qs`.\n *\n * @api private\n * @param {string} qs\n * @return {Object}\n */\nexports.parseQuery = function(qs) {\n  return exports.reduce(qs.replace('?', '').split('&'), function(obj, pair) {\n    var i = pair.indexOf('=');\n    var key = pair.slice(0, i);\n    var val = pair.slice(++i);\n\n    obj[key] = decodeURIComponent(val);\n    return obj;\n  }, {});\n};\n\n/**\n * Highlight the given string of `js`.\n *\n * @api private\n * @param {string} js\n * @return {string}\n */\nfunction highlight(js) {\n  return js\n    .replace(/</g, '&lt;')\n    .replace(/>/g, '&gt;')\n    .replace(/\\/\\/(.*)/gm, '<span class=\"comment\">//$1</span>')\n    .replace(/('.*?')/gm, '<span class=\"string\">$1</span>')\n    .replace(/(\\d+\\.\\d+)/gm, '<span class=\"number\">$1</span>')\n    .replace(/(\\d+)/gm, '<span class=\"number\">$1</span>')\n    .replace(/\\bnew[ \\t]+(\\w+)/gm, '<span class=\"keyword\">new</span> <span class=\"init\">$1</span>')\n    .replace(/\\b(function|new|throw|return|var|if|else)\\b/gm, '<span class=\"keyword\">$1</span>');\n}\n\n/**\n * Highlight the contents of tag `name`.\n *\n * @api private\n * @param {string} name\n */\nexports.highlightTags = function(name) {\n  var code = document.getElementById('mocha').getElementsByTagName(name);\n  for (var i = 0, len = code.length; i < len; ++i) {\n    code[i].innerHTML = highlight(code[i].innerHTML);\n  }\n};\n\n/**\n * If a value could have properties, and has none, this function is called,\n * which returns a string representation of the empty value.\n *\n * Functions w/ no properties return `'[Function]'`\n * Arrays w/ length === 0 return `'[]'`\n * Objects w/ no properties return `'{}'`\n * All else: return result of `value.toString()`\n *\n * @api private\n * @param {*} value The value to inspect.\n * @param {string} [type] The type of the value, if known.\n * @returns {string}\n */\nfunction emptyRepresentation(value, type) {\n  type = type || exports.type(value);\n\n  switch (type) {\n    case 'function':\n      return '[Function]';\n    case 'object':\n      return '{}';\n    case 'array':\n      return '[]';\n    default:\n      return value.toString();\n  }\n}\n\n/**\n * Takes some variable and asks `Object.prototype.toString()` what it thinks it\n * is.\n *\n * @api private\n * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString\n * @param {*} value The value to test.\n * @returns {string}\n * @example\n * type({}) // 'object'\n * type([]) // 'array'\n * type(1) // 'number'\n * type(false) // 'boolean'\n * type(Infinity) // 'number'\n * type(null) // 'null'\n * type(new Date()) // 'date'\n * type(/foo/) // 'regexp'\n * type('type') // 'string'\n * type(global) // 'global'\n */\nexports.type = function type(value) {\n  if (value === undefined) {\n    return 'undefined';\n  } else if (value === null) {\n    return 'null';\n  } else if (typeof Buffer !== 'undefined' && Buffer.isBuffer(value)) {\n    return 'buffer';\n  }\n  return Object.prototype.toString.call(value)\n    .replace(/^\\[.+\\s(.+?)\\]$/, '$1')\n    .toLowerCase();\n};\n\n/**\n * Stringify `value`. Different behavior depending on type of value:\n *\n * - If `value` is undefined or null, return `'[undefined]'` or `'[null]'`, respectively.\n * - If `value` is not an object, function or array, return result of `value.toString()` wrapped in double-quotes.\n * - If `value` is an *empty* object, function, or array, return result of function\n *   {@link emptyRepresentation}.\n * - If `value` has properties, call {@link exports.canonicalize} on it, then return result of\n *   JSON.stringify().\n *\n * @api private\n * @see exports.type\n * @param {*} value\n * @return {string}\n */\nexports.stringify = function(value) {\n  var type = exports.type(value);\n\n  if (!~exports.indexOf(['object', 'array', 'function'], type)) {\n    if (type !== 'buffer') {\n      return jsonStringify(value);\n    }\n    var json = value.toJSON();\n    // Based on the toJSON result\n    return jsonStringify(json.data && json.type ? json.data : json, 2)\n      .replace(/,(\\n|$)/g, '$1');\n  }\n\n  for (var prop in value) {\n    if (Object.prototype.hasOwnProperty.call(value, prop)) {\n      return jsonStringify(exports.canonicalize(value), 2).replace(/,(\\n|$)/g, '$1');\n    }\n  }\n\n  return emptyRepresentation(value, type);\n};\n\n/**\n * like JSON.stringify but more sense.\n *\n * @api private\n * @param {Object}  object\n * @param {number=} spaces\n * @param {number=} depth\n * @returns {*}\n */\nfunction jsonStringify(object, spaces, depth) {\n  if (typeof spaces === 'undefined') {\n    // primitive types\n    return _stringify(object);\n  }\n\n  depth = depth || 1;\n  var space = spaces * depth;\n  var str = isArray(object) ? '[' : '{';\n  var end = isArray(object) ? ']' : '}';\n  var length = object.length || exports.keys(object).length;\n  // `.repeat()` polyfill\n  function repeat(s, n) {\n    return new Array(n).join(s);\n  }\n\n  function _stringify(val) {\n    switch (exports.type(val)) {\n      case 'null':\n      case 'undefined':\n        val = '[' + val + ']';\n        break;\n      case 'array':\n      case 'object':\n        val = jsonStringify(val, spaces, depth + 1);\n        break;\n      case 'boolean':\n      case 'regexp':\n      case 'number':\n        val = val === 0 && (1 / val) === -Infinity // `-0`\n          ? '-0'\n          : val.toString();\n        break;\n      case 'date':\n        var sDate = isNaN(val.getTime())        // Invalid date\n          ? val.toString()\n          : val.toISOString();\n        val = '[Date: ' + sDate + ']';\n        break;\n      case 'buffer':\n        var json = val.toJSON();\n        // Based on the toJSON result\n        json = json.data && json.type ? json.data : json;\n        val = '[Buffer: ' + jsonStringify(json, 2, depth + 1) + ']';\n        break;\n      default:\n        val = (val === '[Function]' || val === '[Circular]')\n          ? val\n          : JSON.stringify(val); // string\n    }\n    return val;\n  }\n\n  for (var i in object) {\n    if (!object.hasOwnProperty(i)) {\n      continue; // not my business\n    }\n    --length;\n    str += '\\n ' + repeat(' ', space)\n      + (isArray(object) ? '' : '\"' + i + '\": ') // key\n      + _stringify(object[i])                     // value\n      + (length ? ',' : '');                     // comma\n  }\n\n  return str\n    // [], {}\n    + (str.length !== 1 ? '\\n' + repeat(' ', --space) + end : end);\n}\n\n/**\n * Test if a value is a buffer.\n *\n * @api private\n * @param {*} value The value to test.\n * @return {boolean} True if `value` is a buffer, otherwise false\n */\nexports.isBuffer = function(value) {\n  return typeof Buffer !== 'undefined' && Buffer.isBuffer(value);\n};\n\n/**\n * Return a new Thing that has the keys in sorted order. Recursive.\n *\n * If the Thing...\n * - has already been seen, return string `'[Circular]'`\n * - is `undefined`, return string `'[undefined]'`\n * - is `null`, return value `null`\n * - is some other primitive, return the value\n * - is not a primitive or an `Array`, `Object`, or `Function`, return the value of the Thing's `toString()` method\n * - is a non-empty `Array`, `Object`, or `Function`, return the result of calling this function again.\n * - is an empty `Array`, `Object`, or `Function`, return the result of calling `emptyRepresentation()`\n *\n * @api private\n * @see {@link exports.stringify}\n * @param {*} value Thing to inspect.  May or may not have properties.\n * @param {Array} [stack=[]] Stack of seen values\n * @return {(Object|Array|Function|string|undefined)}\n */\nexports.canonicalize = function(value, stack) {\n  var canonicalizedObj;\n  /* eslint-disable no-unused-vars */\n  var prop;\n  /* eslint-enable no-unused-vars */\n  var type = exports.type(value);\n  function withStack(value, fn) {\n    stack.push(value);\n    fn();\n    stack.pop();\n  }\n\n  stack = stack || [];\n\n  if (exports.indexOf(stack, value) !== -1) {\n    return '[Circular]';\n  }\n\n  switch (type) {\n    case 'undefined':\n    case 'buffer':\n    case 'null':\n      canonicalizedObj = value;\n      break;\n    case 'array':\n      withStack(value, function() {\n        canonicalizedObj = exports.map(value, function(item) {\n          return exports.canonicalize(item, stack);\n        });\n      });\n      break;\n    case 'function':\n      /* eslint-disable guard-for-in */\n      for (prop in value) {\n        canonicalizedObj = {};\n        break;\n      }\n      /* eslint-enable guard-for-in */\n      if (!canonicalizedObj) {\n        canonicalizedObj = emptyRepresentation(value, type);\n        break;\n      }\n    /* falls through */\n    case 'object':\n      canonicalizedObj = canonicalizedObj || {};\n      withStack(value, function() {\n        exports.forEach(exports.keys(value).sort(), function(key) {\n          canonicalizedObj[key] = exports.canonicalize(value[key], stack);\n        });\n      });\n      break;\n    case 'date':\n    case 'number':\n    case 'regexp':\n    case 'boolean':\n      canonicalizedObj = value;\n      break;\n    default:\n      canonicalizedObj = value + '';\n  }\n\n  return canonicalizedObj;\n};\n\n/**\n * Lookup file names at the given `path`.\n *\n * @api public\n * @param {string} path Base path to start searching from.\n * @param {string[]} extensions File extensions to look for.\n * @param {boolean} recursive Whether or not to recurse into subdirectories.\n * @return {string[]} An array of paths.\n */\nexports.lookupFiles = function lookupFiles(path, extensions, recursive) {\n  var files = [];\n  var re = new RegExp('\\\\.(' + extensions.join('|') + ')$');\n\n  if (!exists(path)) {\n    if (exists(path + '.js')) {\n      path += '.js';\n    } else {\n      files = glob.sync(path);\n      if (!files.length) {\n        throw new Error(\"cannot resolve path (or pattern) '\" + path + \"'\");\n      }\n      return files;\n    }\n  }\n\n  try {\n    var stat = statSync(path);\n    if (stat.isFile()) {\n      return path;\n    }\n  } catch (err) {\n    // ignore error\n    return;\n  }\n\n  readdirSync(path).forEach(function(file) {\n    file = join(path, file);\n    try {\n      var stat = statSync(file);\n      if (stat.isDirectory()) {\n        if (recursive) {\n          files = files.concat(lookupFiles(file, extensions, recursive));\n        }\n        return;\n      }\n    } catch (err) {\n      // ignore error\n      return;\n    }\n    if (!stat.isFile() || !re.test(file) || basename(file)[0] === '.') {\n      return;\n    }\n    files.push(file);\n  });\n\n  return files;\n};\n\n/**\n * Generate an undefined error with a message warning the user.\n *\n * @return {Error}\n */\n\nexports.undefinedError = function() {\n  return new Error('Caught undefined error, did you throw without specifying what?');\n};\n\n/**\n * Generate an undefined error if `err` is not defined.\n *\n * @param {Error} err\n * @return {Error}\n */\n\nexports.getError = function(err) {\n  return err || exports.undefinedError();\n};\n\n/**\n * @summary\n * This Filter based on `mocha-clean` module.(see: `github.com/rstacruz/mocha-clean`)\n * @description\n * When invoking this function you get a filter function that get the Error.stack as an input,\n * and return a prettify output.\n * (i.e: strip Mocha and internal node functions from stack trace).\n * @returns {Function}\n */\nexports.stackTraceFilter = function() {\n  // TODO: Replace with `process.browser`\n  var slash = '/';\n  var is = typeof document === 'undefined' ? { node: true } : { browser: true };\n  var cwd = is.node\n      ? process.cwd() + slash\n      : (typeof location === 'undefined' ? window.location : location).href.replace(/\\/[^\\/]*$/, '/');\n\n  function isMochaInternal(line) {\n    return (~line.indexOf('node_modules' + slash + 'mocha' + slash))\n      || (~line.indexOf('components' + slash + 'mochajs' + slash))\n      || (~line.indexOf('components' + slash + 'mocha' + slash))\n      || (~line.indexOf(slash + 'mocha.js'));\n  }\n\n  function isNodeInternal(line) {\n    return (~line.indexOf('(timers.js:'))\n      || (~line.indexOf('(events.js:'))\n      || (~line.indexOf('(node.js:'))\n      || (~line.indexOf('(module.js:'))\n      || (~line.indexOf('GeneratorFunctionPrototype.next (native)'))\n      || false;\n  }\n\n  return function(stack) {\n    stack = stack.split('\\n');\n\n    stack = exports.reduce(stack, function(list, line) {\n      if (isMochaInternal(line)) {\n        return list;\n      }\n\n      if (is.node && isNodeInternal(line)) {\n        return list;\n      }\n\n      // Clean up cwd(absolute)\n      list.push(line.replace(cwd, ''));\n      return list;\n    }, []);\n\n    return stack.join('\\n');\n  };\n};\n\n}).call(this,require('_process'),require(\"buffer\").Buffer)\n},{\"_process\":51,\"buffer\":43,\"debug\":2,\"fs\":41,\"glob\":41,\"path\":41,\"util\":66}],40:[function(require,module,exports){\n(function (process){\nvar WritableStream = require('stream').Writable\nvar inherits = require('util').inherits\n\nmodule.exports = BrowserStdout\n\n\ninherits(BrowserStdout, WritableStream)\n\nfunction BrowserStdout(opts) {\n  if (!(this instanceof BrowserStdout)) return new BrowserStdout(opts)\n\n  opts = opts || {}\n  WritableStream.call(this, opts)\n  this.label = (opts.label !== undefined) ? opts.label : 'stdout'\n}\n\nBrowserStdout.prototype._write = function(chunks, encoding, cb) {\n  var output = chunks.toString ? chunks.toString() : chunks\n  if (this.label === false) {\n    console.log(output)\n  } else {\n    console.log(this.label+':', output)\n  }\n  process.nextTick(cb)\n}\n\n}).call(this,require('_process'))\n},{\"_process\":51,\"stream\":63,\"util\":66}],41:[function(require,module,exports){\n\n},{}],42:[function(require,module,exports){\narguments[4][41][0].apply(exports,arguments)\n},{\"dup\":41}],43:[function(require,module,exports){\n/*!\n * The buffer module from node.js, for the browser.\n *\n * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>\n * @license  MIT\n */\n\nvar base64 = require('base64-js')\nvar ieee754 = require('ieee754')\nvar isArray = require('is-array')\n\nexports.Buffer = Buffer\nexports.SlowBuffer = SlowBuffer\nexports.INSPECT_MAX_BYTES = 50\nBuffer.poolSize = 8192 // not used by this implementation\n\nvar rootParent = {}\n\n/**\n * If `Buffer.TYPED_ARRAY_SUPPORT`:\n *   === true    Use Uint8Array implementation (fastest)\n *   === false   Use Object implementation (most compatible, even IE6)\n *\n * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,\n * Opera 11.6+, iOS 4.2+.\n *\n * Due to various browser bugs, sometimes the Object implementation will be used even\n * when the browser supports typed arrays.\n *\n * Note:\n *\n *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,\n *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.\n *\n *   - Safari 5-7 lacks support for changing the `Object.prototype.constructor` property\n *     on objects.\n *\n *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.\n *\n *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of\n *     incorrect length in some situations.\n\n * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they\n * get the Object implementation, which is slower but behaves correctly.\n */\nBuffer.TYPED_ARRAY_SUPPORT = (function () {\n  function Bar () {}\n  try {\n    var arr = new Uint8Array(1)\n    arr.foo = function () { return 42 }\n    arr.constructor = Bar\n    return arr.foo() === 42 && // typed array instances can be augmented\n        arr.constructor === Bar && // constructor can be set\n        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`\n        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`\n  } catch (e) {\n    return false\n  }\n})()\n\nfunction kMaxLength () {\n  return Buffer.TYPED_ARRAY_SUPPORT\n    ? 0x7fffffff\n    : 0x3fffffff\n}\n\n/**\n * Class: Buffer\n * =============\n *\n * The Buffer constructor returns instances of `Uint8Array` that are augmented\n * with function properties for all the node `Buffer` API functions. We use\n * `Uint8Array` so that square bracket notation works as expected -- it returns\n * a single octet.\n *\n * By augmenting the instances, we can avoid modifying the `Uint8Array`\n * prototype.\n */\nfunction Buffer (arg) {\n  if (!(this instanceof Buffer)) {\n    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.\n    if (arguments.length > 1) return new Buffer(arg, arguments[1])\n    return new Buffer(arg)\n  }\n\n  this.length = 0\n  this.parent = undefined\n\n  // Common case.\n  if (typeof arg === 'number') {\n    return fromNumber(this, arg)\n  }\n\n  // Slightly less common case.\n  if (typeof arg === 'string') {\n    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')\n  }\n\n  // Unusual.\n  return fromObject(this, arg)\n}\n\nfunction fromNumber (that, length) {\n  that = allocate(that, length < 0 ? 0 : checked(length) | 0)\n  if (!Buffer.TYPED_ARRAY_SUPPORT) {\n    for (var i = 0; i < length; i++) {\n      that[i] = 0\n    }\n  }\n  return that\n}\n\nfunction fromString (that, string, encoding) {\n  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'\n\n  // Assumption: byteLength() return value is always < kMaxLength.\n  var length = byteLength(string, encoding) | 0\n  that = allocate(that, length)\n\n  that.write(string, encoding)\n  return that\n}\n\nfunction fromObject (that, object) {\n  if (Buffer.isBuffer(object)) return fromBuffer(that, object)\n\n  if (isArray(object)) return fromArray(that, object)\n\n  if (object == null) {\n    throw new TypeError('must start with number, buffer, array or string')\n  }\n\n  if (typeof ArrayBuffer !== 'undefined') {\n    if (object.buffer instanceof ArrayBuffer) {\n      return fromTypedArray(that, object)\n    }\n    if (object instanceof ArrayBuffer) {\n      return fromArrayBuffer(that, object)\n    }\n  }\n\n  if (object.length) return fromArrayLike(that, object)\n\n  return fromJsonObject(that, object)\n}\n\nfunction fromBuffer (that, buffer) {\n  var length = checked(buffer.length) | 0\n  that = allocate(that, length)\n  buffer.copy(that, 0, 0, length)\n  return that\n}\n\nfunction fromArray (that, array) {\n  var length = checked(array.length) | 0\n  that = allocate(that, length)\n  for (var i = 0; i < length; i += 1) {\n    that[i] = array[i] & 255\n  }\n  return that\n}\n\n// Duplicate of fromArray() to keep fromArray() monomorphic.\nfunction fromTypedArray (that, array) {\n  var length = checked(array.length) | 0\n  that = allocate(that, length)\n  // Truncating the elements is probably not what people expect from typed\n  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior\n  // of the old Buffer constructor.\n  for (var i = 0; i < length; i += 1) {\n    that[i] = array[i] & 255\n  }\n  return that\n}\n\nfunction fromArrayBuffer (that, array) {\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\n    // Return an augmented `Uint8Array` instance, for best performance\n    array.byteLength\n    that = Buffer._augment(new Uint8Array(array))\n  } else {\n    // Fallback: Return an object instance of the Buffer class\n    that = fromTypedArray(that, new Uint8Array(array))\n  }\n  return that\n}\n\nfunction fromArrayLike (that, array) {\n  var length = checked(array.length) | 0\n  that = allocate(that, length)\n  for (var i = 0; i < length; i += 1) {\n    that[i] = array[i] & 255\n  }\n  return that\n}\n\n// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.\n// Returns a zero-length buffer for inputs that don't conform to the spec.\nfunction fromJsonObject (that, object) {\n  var array\n  var length = 0\n\n  if (object.type === 'Buffer' && isArray(object.data)) {\n    array = object.data\n    length = checked(array.length) | 0\n  }\n  that = allocate(that, length)\n\n  for (var i = 0; i < length; i += 1) {\n    that[i] = array[i] & 255\n  }\n  return that\n}\n\nfunction allocate (that, length) {\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\n    // Return an augmented `Uint8Array` instance, for best performance\n    that = Buffer._augment(new Uint8Array(length))\n  } else {\n    // Fallback: Return an object instance of the Buffer class\n    that.length = length\n    that._isBuffer = true\n  }\n\n  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1\n  if (fromPool) that.parent = rootParent\n\n  return that\n}\n\nfunction checked (length) {\n  // Note: cannot use `length < kMaxLength` here because that fails when\n  // length is NaN (which is otherwise coerced to zero.)\n  if (length >= kMaxLength()) {\n    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +\n                         'size: 0x' + kMaxLength().toString(16) + ' bytes')\n  }\n  return length | 0\n}\n\nfunction SlowBuffer (subject, encoding) {\n  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)\n\n  var buf = new Buffer(subject, encoding)\n  delete buf.parent\n  return buf\n}\n\nBuffer.isBuffer = function isBuffer (b) {\n  return !!(b != null && b._isBuffer)\n}\n\nBuffer.compare = function compare (a, b) {\n  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {\n    throw new TypeError('Arguments must be Buffers')\n  }\n\n  if (a === b) return 0\n\n  var x = a.length\n  var y = b.length\n\n  var i = 0\n  var len = Math.min(x, y)\n  while (i < len) {\n    if (a[i] !== b[i]) break\n\n    ++i\n  }\n\n  if (i !== len) {\n    x = a[i]\n    y = b[i]\n  }\n\n  if (x < y) return -1\n  if (y < x) return 1\n  return 0\n}\n\nBuffer.isEncoding = function isEncoding (encoding) {\n  switch (String(encoding).toLowerCase()) {\n    case 'hex':\n    case 'utf8':\n    case 'utf-8':\n    case 'ascii':\n    case 'binary':\n    case 'base64':\n    case 'raw':\n    case 'ucs2':\n    case 'ucs-2':\n    case 'utf16le':\n    case 'utf-16le':\n      return true\n    default:\n      return false\n  }\n}\n\nBuffer.concat = function concat (list, length) {\n  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')\n\n  if (list.length === 0) {\n    return new Buffer(0)\n  }\n\n  var i\n  if (length === undefined) {\n    length = 0\n    for (i = 0; i < list.length; i++) {\n      length += list[i].length\n    }\n  }\n\n  var buf = new Buffer(length)\n  var pos = 0\n  for (i = 0; i < list.length; i++) {\n    var item = list[i]\n    item.copy(buf, pos)\n    pos += item.length\n  }\n  return buf\n}\n\nfunction byteLength (string, encoding) {\n  if (typeof string !== 'string') string = '' + string\n\n  var len = string.length\n  if (len === 0) return 0\n\n  // Use a for loop to avoid recursion\n  var loweredCase = false\n  for (;;) {\n    switch (encoding) {\n      case 'ascii':\n      case 'binary':\n      // Deprecated\n      case 'raw':\n      case 'raws':\n        return len\n      case 'utf8':\n      case 'utf-8':\n        return utf8ToBytes(string).length\n      case 'ucs2':\n      case 'ucs-2':\n      case 'utf16le':\n      case 'utf-16le':\n        return len * 2\n      case 'hex':\n        return len >>> 1\n      case 'base64':\n        return base64ToBytes(string).length\n      default:\n        if (loweredCase) return utf8ToBytes(string).length // assume utf8\n        encoding = ('' + encoding).toLowerCase()\n        loweredCase = true\n    }\n  }\n}\nBuffer.byteLength = byteLength\n\n// pre-set for values that may exist in the future\nBuffer.prototype.length = undefined\nBuffer.prototype.parent = undefined\n\nfunction slowToString (encoding, start, end) {\n  var loweredCase = false\n\n  start = start | 0\n  end = end === undefined || end === Infinity ? this.length : end | 0\n\n  if (!encoding) encoding = 'utf8'\n  if (start < 0) start = 0\n  if (end > this.length) end = this.length\n  if (end <= start) return ''\n\n  while (true) {\n    switch (encoding) {\n      case 'hex':\n        return hexSlice(this, start, end)\n\n      case 'utf8':\n      case 'utf-8':\n        return utf8Slice(this, start, end)\n\n      case 'ascii':\n        return asciiSlice(this, start, end)\n\n      case 'binary':\n        return binarySlice(this, start, end)\n\n      case 'base64':\n        return base64Slice(this, start, end)\n\n      case 'ucs2':\n      case 'ucs-2':\n      case 'utf16le':\n      case 'utf-16le':\n        return utf16leSlice(this, start, end)\n\n      default:\n        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)\n        encoding = (encoding + '').toLowerCase()\n        loweredCase = true\n    }\n  }\n}\n\nBuffer.prototype.toString = function toString () {\n  var length = this.length | 0\n  if (length === 0) return ''\n  if (arguments.length === 0) return utf8Slice(this, 0, length)\n  return slowToString.apply(this, arguments)\n}\n\nBuffer.prototype.equals = function equals (b) {\n  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')\n  if (this === b) return true\n  return Buffer.compare(this, b) === 0\n}\n\nBuffer.prototype.inspect = function inspect () {\n  var str = ''\n  var max = exports.INSPECT_MAX_BYTES\n  if (this.length > 0) {\n    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')\n    if (this.length > max) str += ' ... '\n  }\n  return '<Buffer ' + str + '>'\n}\n\nBuffer.prototype.compare = function compare (b) {\n  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')\n  if (this === b) return 0\n  return Buffer.compare(this, b)\n}\n\nBuffer.prototype.indexOf = function indexOf (val, byteOffset) {\n  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff\n  else if (byteOffset < -0x80000000) byteOffset = -0x80000000\n  byteOffset >>= 0\n\n  if (this.length === 0) return -1\n  if (byteOffset >= this.length) return -1\n\n  // Negative offsets start from the end of the buffer\n  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)\n\n  if (typeof val === 'string') {\n    if (val.length === 0) return -1 // special case: looking for empty string always fails\n    return String.prototype.indexOf.call(this, val, byteOffset)\n  }\n  if (Buffer.isBuffer(val)) {\n    return arrayIndexOf(this, val, byteOffset)\n  }\n  if (typeof val === 'number') {\n    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {\n      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)\n    }\n    return arrayIndexOf(this, [ val ], byteOffset)\n  }\n\n  function arrayIndexOf (arr, val, byteOffset) {\n    var foundIndex = -1\n    for (var i = 0; byteOffset + i < arr.length; i++) {\n      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {\n        if (foundIndex === -1) foundIndex = i\n        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex\n      } else {\n        foundIndex = -1\n      }\n    }\n    return -1\n  }\n\n  throw new TypeError('val must be string, number or Buffer')\n}\n\n// `get` is deprecated\nBuffer.prototype.get = function get (offset) {\n  console.log('.get() is deprecated. Access using array indexes instead.')\n  return this.readUInt8(offset)\n}\n\n// `set` is deprecated\nBuffer.prototype.set = function set (v, offset) {\n  console.log('.set() is deprecated. Access using array indexes instead.')\n  return this.writeUInt8(v, offset)\n}\n\nfunction hexWrite (buf, string, offset, length) {\n  offset = Number(offset) || 0\n  var remaining = buf.length - offset\n  if (!length) {\n    length = remaining\n  } else {\n    length = Number(length)\n    if (length > remaining) {\n      length = remaining\n    }\n  }\n\n  // must be an even number of digits\n  var strLen = string.length\n  if (strLen % 2 !== 0) throw new Error('Invalid hex string')\n\n  if (length > strLen / 2) {\n    length = strLen / 2\n  }\n  for (var i = 0; i < length; i++) {\n    var parsed = parseInt(string.substr(i * 2, 2), 16)\n    if (isNaN(parsed)) throw new Error('Invalid hex string')\n    buf[offset + i] = parsed\n  }\n  return i\n}\n\nfunction utf8Write (buf, string, offset, length) {\n  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)\n}\n\nfunction asciiWrite (buf, string, offset, length) {\n  return blitBuffer(asciiToBytes(string), buf, offset, length)\n}\n\nfunction binaryWrite (buf, string, offset, length) {\n  return asciiWrite(buf, string, offset, length)\n}\n\nfunction base64Write (buf, string, offset, length) {\n  return blitBuffer(base64ToBytes(string), buf, offset, length)\n}\n\nfunction ucs2Write (buf, string, offset, length) {\n  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)\n}\n\nBuffer.prototype.write = function write (string, offset, length, encoding) {\n  // Buffer#write(string)\n  if (offset === undefined) {\n    encoding = 'utf8'\n    length = this.length\n    offset = 0\n  // Buffer#write(string, encoding)\n  } else if (length === undefined && typeof offset === 'string') {\n    encoding = offset\n    length = this.length\n    offset = 0\n  // Buffer#write(string, offset[, length][, encoding])\n  } else if (isFinite(offset)) {\n    offset = offset | 0\n    if (isFinite(length)) {\n      length = length | 0\n      if (encoding === undefined) encoding = 'utf8'\n    } else {\n      encoding = length\n      length = undefined\n    }\n  // legacy write(string, encoding, offset, length) - remove in v0.13\n  } else {\n    var swap = encoding\n    encoding = offset\n    offset = length | 0\n    length = swap\n  }\n\n  var remaining = this.length - offset\n  if (length === undefined || length > remaining) length = remaining\n\n  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {\n    throw new RangeError('attempt to write outside buffer bounds')\n  }\n\n  if (!encoding) encoding = 'utf8'\n\n  var loweredCase = false\n  for (;;) {\n    switch (encoding) {\n      case 'hex':\n        return hexWrite(this, string, offset, length)\n\n      case 'utf8':\n      case 'utf-8':\n        return utf8Write(this, string, offset, length)\n\n      case 'ascii':\n        return asciiWrite(this, string, offset, length)\n\n      case 'binary':\n        return binaryWrite(this, string, offset, length)\n\n      case 'base64':\n        // Warning: maxLength not taken into account in base64Write\n        return base64Write(this, string, offset, length)\n\n      case 'ucs2':\n      case 'ucs-2':\n      case 'utf16le':\n      case 'utf-16le':\n        return ucs2Write(this, string, offset, length)\n\n      default:\n        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)\n        encoding = ('' + encoding).toLowerCase()\n        loweredCase = true\n    }\n  }\n}\n\nBuffer.prototype.toJSON = function toJSON () {\n  return {\n    type: 'Buffer',\n    data: Array.prototype.slice.call(this._arr || this, 0)\n  }\n}\n\nfunction base64Slice (buf, start, end) {\n  if (start === 0 && end === buf.length) {\n    return base64.fromByteArray(buf)\n  } else {\n    return base64.fromByteArray(buf.slice(start, end))\n  }\n}\n\nfunction utf8Slice (buf, start, end) {\n  end = Math.min(buf.length, end)\n  var res = []\n\n  var i = start\n  while (i < end) {\n    var firstByte = buf[i]\n    var codePoint = null\n    var bytesPerSequence = (firstByte > 0xEF) ? 4\n      : (firstByte > 0xDF) ? 3\n      : (firstByte > 0xBF) ? 2\n      : 1\n\n    if (i + bytesPerSequence <= end) {\n      var secondByte, thirdByte, fourthByte, tempCodePoint\n\n      switch (bytesPerSequence) {\n        case 1:\n          if (firstByte < 0x80) {\n            codePoint = firstByte\n          }\n          break\n        case 2:\n          secondByte = buf[i + 1]\n          if ((secondByte & 0xC0) === 0x80) {\n            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)\n            if (tempCodePoint > 0x7F) {\n              codePoint = tempCodePoint\n            }\n          }\n          break\n        case 3:\n          secondByte = buf[i + 1]\n          thirdByte = buf[i + 2]\n          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {\n            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)\n            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {\n              codePoint = tempCodePoint\n            }\n          }\n          break\n        case 4:\n          secondByte = buf[i + 1]\n          thirdByte = buf[i + 2]\n          fourthByte = buf[i + 3]\n          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {\n            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)\n            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {\n              codePoint = tempCodePoint\n            }\n          }\n      }\n    }\n\n    if (codePoint === null) {\n      // we did not generate a valid codePoint so insert a\n      // replacement char (U+FFFD) and advance only 1 byte\n      codePoint = 0xFFFD\n      bytesPerSequence = 1\n    } else if (codePoint > 0xFFFF) {\n      // encode to utf16 (surrogate pair dance)\n      codePoint -= 0x10000\n      res.push(codePoint >>> 10 & 0x3FF | 0xD800)\n      codePoint = 0xDC00 | codePoint & 0x3FF\n    }\n\n    res.push(codePoint)\n    i += bytesPerSequence\n  }\n\n  return decodeCodePointsArray(res)\n}\n\n// Based on http://stackoverflow.com/a/22747272/680742, the browser with\n// the lowest limit is Chrome, with 0x10000 args.\n// We go 1 magnitude less, for safety\nvar MAX_ARGUMENTS_LENGTH = 0x1000\n\nfunction decodeCodePointsArray (codePoints) {\n  var len = codePoints.length\n  if (len <= MAX_ARGUMENTS_LENGTH) {\n    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()\n  }\n\n  // Decode in chunks to avoid \"call stack size exceeded\".\n  var res = ''\n  var i = 0\n  while (i < len) {\n    res += String.fromCharCode.apply(\n      String,\n      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)\n    )\n  }\n  return res\n}\n\nfunction asciiSlice (buf, start, end) {\n  var ret = ''\n  end = Math.min(buf.length, end)\n\n  for (var i = start; i < end; i++) {\n    ret += String.fromCharCode(buf[i] & 0x7F)\n  }\n  return ret\n}\n\nfunction binarySlice (buf, start, end) {\n  var ret = ''\n  end = Math.min(buf.length, end)\n\n  for (var i = start; i < end; i++) {\n    ret += String.fromCharCode(buf[i])\n  }\n  return ret\n}\n\nfunction hexSlice (buf, start, end) {\n  var len = buf.length\n\n  if (!start || start < 0) start = 0\n  if (!end || end < 0 || end > len) end = len\n\n  var out = ''\n  for (var i = start; i < end; i++) {\n    out += toHex(buf[i])\n  }\n  return out\n}\n\nfunction utf16leSlice (buf, start, end) {\n  var bytes = buf.slice(start, end)\n  var res = ''\n  for (var i = 0; i < bytes.length; i += 2) {\n    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)\n  }\n  return res\n}\n\nBuffer.prototype.slice = function slice (start, end) {\n  var len = this.length\n  start = ~~start\n  end = end === undefined ? len : ~~end\n\n  if (start < 0) {\n    start += len\n    if (start < 0) start = 0\n  } else if (start > len) {\n    start = len\n  }\n\n  if (end < 0) {\n    end += len\n    if (end < 0) end = 0\n  } else if (end > len) {\n    end = len\n  }\n\n  if (end < start) end = start\n\n  var newBuf\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\n    newBuf = Buffer._augment(this.subarray(start, end))\n  } else {\n    var sliceLen = end - start\n    newBuf = new Buffer(sliceLen, undefined)\n    for (var i = 0; i < sliceLen; i++) {\n      newBuf[i] = this[i + start]\n    }\n  }\n\n  if (newBuf.length) newBuf.parent = this.parent || this\n\n  return newBuf\n}\n\n/*\n * Need to make sure that buffer isn't trying to write out of bounds.\n */\nfunction checkOffset (offset, ext, length) {\n  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')\n  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')\n}\n\nBuffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {\n  offset = offset | 0\n  byteLength = byteLength | 0\n  if (!noAssert) checkOffset(offset, byteLength, this.length)\n\n  var val = this[offset]\n  var mul = 1\n  var i = 0\n  while (++i < byteLength && (mul *= 0x100)) {\n    val += this[offset + i] * mul\n  }\n\n  return val\n}\n\nBuffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {\n  offset = offset | 0\n  byteLength = byteLength | 0\n  if (!noAssert) {\n    checkOffset(offset, byteLength, this.length)\n  }\n\n  var val = this[offset + --byteLength]\n  var mul = 1\n  while (byteLength > 0 && (mul *= 0x100)) {\n    val += this[offset + --byteLength] * mul\n  }\n\n  return val\n}\n\nBuffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {\n  if (!noAssert) checkOffset(offset, 1, this.length)\n  return this[offset]\n}\n\nBuffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {\n  if (!noAssert) checkOffset(offset, 2, this.length)\n  return this[offset] | (this[offset + 1] << 8)\n}\n\nBuffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {\n  if (!noAssert) checkOffset(offset, 2, this.length)\n  return (this[offset] << 8) | this[offset + 1]\n}\n\nBuffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {\n  if (!noAssert) checkOffset(offset, 4, this.length)\n\n  return ((this[offset]) |\n      (this[offset + 1] << 8) |\n      (this[offset + 2] << 16)) +\n      (this[offset + 3] * 0x1000000)\n}\n\nBuffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {\n  if (!noAssert) checkOffset(offset, 4, this.length)\n\n  return (this[offset] * 0x1000000) +\n    ((this[offset + 1] << 16) |\n    (this[offset + 2] << 8) |\n    this[offset + 3])\n}\n\nBuffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {\n  offset = offset | 0\n  byteLength = byteLength | 0\n  if (!noAssert) checkOffset(offset, byteLength, this.length)\n\n  var val = this[offset]\n  var mul = 1\n  var i = 0\n  while (++i < byteLength && (mul *= 0x100)) {\n    val += this[offset + i] * mul\n  }\n  mul *= 0x80\n\n  if (val >= mul) val -= Math.pow(2, 8 * byteLength)\n\n  return val\n}\n\nBuffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {\n  offset = offset | 0\n  byteLength = byteLength | 0\n  if (!noAssert) checkOffset(offset, byteLength, this.length)\n\n  var i = byteLength\n  var mul = 1\n  var val = this[offset + --i]\n  while (i > 0 && (mul *= 0x100)) {\n    val += this[offset + --i] * mul\n  }\n  mul *= 0x80\n\n  if (val >= mul) val -= Math.pow(2, 8 * byteLength)\n\n  return val\n}\n\nBuffer.prototype.readInt8 = function readInt8 (offset, noAssert) {\n  if (!noAssert) checkOffset(offset, 1, this.length)\n  if (!(this[offset] & 0x80)) return (this[offset])\n  return ((0xff - this[offset] + 1) * -1)\n}\n\nBuffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {\n  if (!noAssert) checkOffset(offset, 2, this.length)\n  var val = this[offset] | (this[offset + 1] << 8)\n  return (val & 0x8000) ? val | 0xFFFF0000 : val\n}\n\nBuffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {\n  if (!noAssert) checkOffset(offset, 2, this.length)\n  var val = this[offset + 1] | (this[offset] << 8)\n  return (val & 0x8000) ? val | 0xFFFF0000 : val\n}\n\nBuffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {\n  if (!noAssert) checkOffset(offset, 4, this.length)\n\n  return (this[offset]) |\n    (this[offset + 1] << 8) |\n    (this[offset + 2] << 16) |\n    (this[offset + 3] << 24)\n}\n\nBuffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {\n  if (!noAssert) checkOffset(offset, 4, this.length)\n\n  return (this[offset] << 24) |\n    (this[offset + 1] << 16) |\n    (this[offset + 2] << 8) |\n    (this[offset + 3])\n}\n\nBuffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {\n  if (!noAssert) checkOffset(offset, 4, this.length)\n  return ieee754.read(this, offset, true, 23, 4)\n}\n\nBuffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {\n  if (!noAssert) checkOffset(offset, 4, this.length)\n  return ieee754.read(this, offset, false, 23, 4)\n}\n\nBuffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {\n  if (!noAssert) checkOffset(offset, 8, this.length)\n  return ieee754.read(this, offset, true, 52, 8)\n}\n\nBuffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {\n  if (!noAssert) checkOffset(offset, 8, this.length)\n  return ieee754.read(this, offset, false, 52, 8)\n}\n\nfunction checkInt (buf, value, offset, ext, max, min) {\n  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')\n  if (value > max || value < min) throw new RangeError('value is out of bounds')\n  if (offset + ext > buf.length) throw new RangeError('index out of range')\n}\n\nBuffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {\n  value = +value\n  offset = offset | 0\n  byteLength = byteLength | 0\n  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)\n\n  var mul = 1\n  var i = 0\n  this[offset] = value & 0xFF\n  while (++i < byteLength && (mul *= 0x100)) {\n    this[offset + i] = (value / mul) & 0xFF\n  }\n\n  return offset + byteLength\n}\n\nBuffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {\n  value = +value\n  offset = offset | 0\n  byteLength = byteLength | 0\n  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)\n\n  var i = byteLength - 1\n  var mul = 1\n  this[offset + i] = value & 0xFF\n  while (--i >= 0 && (mul *= 0x100)) {\n    this[offset + i] = (value / mul) & 0xFF\n  }\n\n  return offset + byteLength\n}\n\nBuffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {\n  value = +value\n  offset = offset | 0\n  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)\n  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)\n  this[offset] = value\n  return offset + 1\n}\n\nfunction objectWriteUInt16 (buf, value, offset, littleEndian) {\n  if (value < 0) value = 0xffff + value + 1\n  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {\n    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>\n      (littleEndian ? i : 1 - i) * 8\n  }\n}\n\nBuffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {\n  value = +value\n  offset = offset | 0\n  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\n    this[offset] = value\n    this[offset + 1] = (value >>> 8)\n  } else {\n    objectWriteUInt16(this, value, offset, true)\n  }\n  return offset + 2\n}\n\nBuffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {\n  value = +value\n  offset = offset | 0\n  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\n    this[offset] = (value >>> 8)\n    this[offset + 1] = value\n  } else {\n    objectWriteUInt16(this, value, offset, false)\n  }\n  return offset + 2\n}\n\nfunction objectWriteUInt32 (buf, value, offset, littleEndian) {\n  if (value < 0) value = 0xffffffff + value + 1\n  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {\n    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff\n  }\n}\n\nBuffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {\n  value = +value\n  offset = offset | 0\n  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\n    this[offset + 3] = (value >>> 24)\n    this[offset + 2] = (value >>> 16)\n    this[offset + 1] = (value >>> 8)\n    this[offset] = value\n  } else {\n    objectWriteUInt32(this, value, offset, true)\n  }\n  return offset + 4\n}\n\nBuffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {\n  value = +value\n  offset = offset | 0\n  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\n    this[offset] = (value >>> 24)\n    this[offset + 1] = (value >>> 16)\n    this[offset + 2] = (value >>> 8)\n    this[offset + 3] = value\n  } else {\n    objectWriteUInt32(this, value, offset, false)\n  }\n  return offset + 4\n}\n\nBuffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {\n  value = +value\n  offset = offset | 0\n  if (!noAssert) {\n    var limit = Math.pow(2, 8 * byteLength - 1)\n\n    checkInt(this, value, offset, byteLength, limit - 1, -limit)\n  }\n\n  var i = 0\n  var mul = 1\n  var sub = value < 0 ? 1 : 0\n  this[offset] = value & 0xFF\n  while (++i < byteLength && (mul *= 0x100)) {\n    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF\n  }\n\n  return offset + byteLength\n}\n\nBuffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {\n  value = +value\n  offset = offset | 0\n  if (!noAssert) {\n    var limit = Math.pow(2, 8 * byteLength - 1)\n\n    checkInt(this, value, offset, byteLength, limit - 1, -limit)\n  }\n\n  var i = byteLength - 1\n  var mul = 1\n  var sub = value < 0 ? 1 : 0\n  this[offset + i] = value & 0xFF\n  while (--i >= 0 && (mul *= 0x100)) {\n    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF\n  }\n\n  return offset + byteLength\n}\n\nBuffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {\n  value = +value\n  offset = offset | 0\n  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)\n  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)\n  if (value < 0) value = 0xff + value + 1\n  this[offset] = value\n  return offset + 1\n}\n\nBuffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {\n  value = +value\n  offset = offset | 0\n  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\n    this[offset] = value\n    this[offset + 1] = (value >>> 8)\n  } else {\n    objectWriteUInt16(this, value, offset, true)\n  }\n  return offset + 2\n}\n\nBuffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {\n  value = +value\n  offset = offset | 0\n  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\n    this[offset] = (value >>> 8)\n    this[offset + 1] = value\n  } else {\n    objectWriteUInt16(this, value, offset, false)\n  }\n  return offset + 2\n}\n\nBuffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {\n  value = +value\n  offset = offset | 0\n  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\n    this[offset] = value\n    this[offset + 1] = (value >>> 8)\n    this[offset + 2] = (value >>> 16)\n    this[offset + 3] = (value >>> 24)\n  } else {\n    objectWriteUInt32(this, value, offset, true)\n  }\n  return offset + 4\n}\n\nBuffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {\n  value = +value\n  offset = offset | 0\n  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)\n  if (value < 0) value = 0xffffffff + value + 1\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\n    this[offset] = (value >>> 24)\n    this[offset + 1] = (value >>> 16)\n    this[offset + 2] = (value >>> 8)\n    this[offset + 3] = value\n  } else {\n    objectWriteUInt32(this, value, offset, false)\n  }\n  return offset + 4\n}\n\nfunction checkIEEE754 (buf, value, offset, ext, max, min) {\n  if (value > max || value < min) throw new RangeError('value is out of bounds')\n  if (offset + ext > buf.length) throw new RangeError('index out of range')\n  if (offset < 0) throw new RangeError('index out of range')\n}\n\nfunction writeFloat (buf, value, offset, littleEndian, noAssert) {\n  if (!noAssert) {\n    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)\n  }\n  ieee754.write(buf, value, offset, littleEndian, 23, 4)\n  return offset + 4\n}\n\nBuffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {\n  return writeFloat(this, value, offset, true, noAssert)\n}\n\nBuffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {\n  return writeFloat(this, value, offset, false, noAssert)\n}\n\nfunction writeDouble (buf, value, offset, littleEndian, noAssert) {\n  if (!noAssert) {\n    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)\n  }\n  ieee754.write(buf, value, offset, littleEndian, 52, 8)\n  return offset + 8\n}\n\nBuffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {\n  return writeDouble(this, value, offset, true, noAssert)\n}\n\nBuffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {\n  return writeDouble(this, value, offset, false, noAssert)\n}\n\n// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)\nBuffer.prototype.copy = function copy (target, targetStart, start, end) {\n  if (!start) start = 0\n  if (!end && end !== 0) end = this.length\n  if (targetStart >= target.length) targetStart = target.length\n  if (!targetStart) targetStart = 0\n  if (end > 0 && end < start) end = start\n\n  // Copy 0 bytes; we're done\n  if (end === start) return 0\n  if (target.length === 0 || this.length === 0) return 0\n\n  // Fatal error conditions\n  if (targetStart < 0) {\n    throw new RangeError('targetStart out of bounds')\n  }\n  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')\n  if (end < 0) throw new RangeError('sourceEnd out of bounds')\n\n  // Are we oob?\n  if (end > this.length) end = this.length\n  if (target.length - targetStart < end - start) {\n    end = target.length - targetStart + start\n  }\n\n  var len = end - start\n  var i\n\n  if (this === target && start < targetStart && targetStart < end) {\n    // descending copy from end\n    for (i = len - 1; i >= 0; i--) {\n      target[i + targetStart] = this[i + start]\n    }\n  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {\n    // ascending copy from start\n    for (i = 0; i < len; i++) {\n      target[i + targetStart] = this[i + start]\n    }\n  } else {\n    target._set(this.subarray(start, start + len), targetStart)\n  }\n\n  return len\n}\n\n// fill(value, start=0, end=buffer.length)\nBuffer.prototype.fill = function fill (value, start, end) {\n  if (!value) value = 0\n  if (!start) start = 0\n  if (!end) end = this.length\n\n  if (end < start) throw new RangeError('end < start')\n\n  // Fill 0 bytes; we're done\n  if (end === start) return\n  if (this.length === 0) return\n\n  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')\n  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')\n\n  var i\n  if (typeof value === 'number') {\n    for (i = start; i < end; i++) {\n      this[i] = value\n    }\n  } else {\n    var bytes = utf8ToBytes(value.toString())\n    var len = bytes.length\n    for (i = start; i < end; i++) {\n      this[i] = bytes[i % len]\n    }\n  }\n\n  return this\n}\n\n/**\n * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.\n * Added in Node 0.12. Only available in browsers that support ArrayBuffer.\n */\nBuffer.prototype.toArrayBuffer = function toArrayBuffer () {\n  if (typeof Uint8Array !== 'undefined') {\n    if (Buffer.TYPED_ARRAY_SUPPORT) {\n      return (new Buffer(this)).buffer\n    } else {\n      var buf = new Uint8Array(this.length)\n      for (var i = 0, len = buf.length; i < len; i += 1) {\n        buf[i] = this[i]\n      }\n      return buf.buffer\n    }\n  } else {\n    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')\n  }\n}\n\n// HELPER FUNCTIONS\n// ================\n\nvar BP = Buffer.prototype\n\n/**\n * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods\n */\nBuffer._augment = function _augment (arr) {\n  arr.constructor = Buffer\n  arr._isBuffer = true\n\n  // save reference to original Uint8Array set method before overwriting\n  arr._set = arr.set\n\n  // deprecated\n  arr.get = BP.get\n  arr.set = BP.set\n\n  arr.write = BP.write\n  arr.toString = BP.toString\n  arr.toLocaleString = BP.toString\n  arr.toJSON = BP.toJSON\n  arr.equals = BP.equals\n  arr.compare = BP.compare\n  arr.indexOf = BP.indexOf\n  arr.copy = BP.copy\n  arr.slice = BP.slice\n  arr.readUIntLE = BP.readUIntLE\n  arr.readUIntBE = BP.readUIntBE\n  arr.readUInt8 = BP.readUInt8\n  arr.readUInt16LE = BP.readUInt16LE\n  arr.readUInt16BE = BP.readUInt16BE\n  arr.readUInt32LE = BP.readUInt32LE\n  arr.readUInt32BE = BP.readUInt32BE\n  arr.readIntLE = BP.readIntLE\n  arr.readIntBE = BP.readIntBE\n  arr.readInt8 = BP.readInt8\n  arr.readInt16LE = BP.readInt16LE\n  arr.readInt16BE = BP.readInt16BE\n  arr.readInt32LE = BP.readInt32LE\n  arr.readInt32BE = BP.readInt32BE\n  arr.readFloatLE = BP.readFloatLE\n  arr.readFloatBE = BP.readFloatBE\n  arr.readDoubleLE = BP.readDoubleLE\n  arr.readDoubleBE = BP.readDoubleBE\n  arr.writeUInt8 = BP.writeUInt8\n  arr.writeUIntLE = BP.writeUIntLE\n  arr.writeUIntBE = BP.writeUIntBE\n  arr.writeUInt16LE = BP.writeUInt16LE\n  arr.writeUInt16BE = BP.writeUInt16BE\n  arr.writeUInt32LE = BP.writeUInt32LE\n  arr.writeUInt32BE = BP.writeUInt32BE\n  arr.writeIntLE = BP.writeIntLE\n  arr.writeIntBE = BP.writeIntBE\n  arr.writeInt8 = BP.writeInt8\n  arr.writeInt16LE = BP.writeInt16LE\n  arr.writeInt16BE = BP.writeInt16BE\n  arr.writeInt32LE = BP.writeInt32LE\n  arr.writeInt32BE = BP.writeInt32BE\n  arr.writeFloatLE = BP.writeFloatLE\n  arr.writeFloatBE = BP.writeFloatBE\n  arr.writeDoubleLE = BP.writeDoubleLE\n  arr.writeDoubleBE = BP.writeDoubleBE\n  arr.fill = BP.fill\n  arr.inspect = BP.inspect\n  arr.toArrayBuffer = BP.toArrayBuffer\n\n  return arr\n}\n\nvar INVALID_BASE64_RE = /[^+\\/0-9A-Za-z-_]/g\n\nfunction base64clean (str) {\n  // Node strips out invalid characters like \\n and \\t from the string, base64-js does not\n  str = stringtrim(str).replace(INVALID_BASE64_RE, '')\n  // Node converts strings with length < 2 to ''\n  if (str.length < 2) return ''\n  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not\n  while (str.length % 4 !== 0) {\n    str = str + '='\n  }\n  return str\n}\n\nfunction stringtrim (str) {\n  if (str.trim) return str.trim()\n  return str.replace(/^\\s+|\\s+$/g, '')\n}\n\nfunction toHex (n) {\n  if (n < 16) return '0' + n.toString(16)\n  return n.toString(16)\n}\n\nfunction utf8ToBytes (string, units) {\n  units = units || Infinity\n  var codePoint\n  var length = string.length\n  var leadSurrogate = null\n  var bytes = []\n\n  for (var i = 0; i < length; i++) {\n    codePoint = string.charCodeAt(i)\n\n    // is surrogate component\n    if (codePoint > 0xD7FF && codePoint < 0xE000) {\n      // last char was a lead\n      if (!leadSurrogate) {\n        // no lead yet\n        if (codePoint > 0xDBFF) {\n          // unexpected trail\n          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)\n          continue\n        } else if (i + 1 === length) {\n          // unpaired lead\n          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)\n          continue\n        }\n\n        // valid lead\n        leadSurrogate = codePoint\n\n        continue\n      }\n\n      // 2 leads in a row\n      if (codePoint < 0xDC00) {\n        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)\n        leadSurrogate = codePoint\n        continue\n      }\n\n      // valid surrogate pair\n      codePoint = leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00 | 0x10000\n    } else if (leadSurrogate) {\n      // valid bmp char, but last char was a lead\n      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)\n    }\n\n    leadSurrogate = null\n\n    // encode utf8\n    if (codePoint < 0x80) {\n      if ((units -= 1) < 0) break\n      bytes.push(codePoint)\n    } else if (codePoint < 0x800) {\n      if ((units -= 2) < 0) break\n      bytes.push(\n        codePoint >> 0x6 | 0xC0,\n        codePoint & 0x3F | 0x80\n      )\n    } else if (codePoint < 0x10000) {\n      if ((units -= 3) < 0) break\n      bytes.push(\n        codePoint >> 0xC | 0xE0,\n        codePoint >> 0x6 & 0x3F | 0x80,\n        codePoint & 0x3F | 0x80\n      )\n    } else if (codePoint < 0x110000) {\n      if ((units -= 4) < 0) break\n      bytes.push(\n        codePoint >> 0x12 | 0xF0,\n        codePoint >> 0xC & 0x3F | 0x80,\n        codePoint >> 0x6 & 0x3F | 0x80,\n        codePoint & 0x3F | 0x80\n      )\n    } else {\n      throw new Error('Invalid code point')\n    }\n  }\n\n  return bytes\n}\n\nfunction asciiToBytes (str) {\n  var byteArray = []\n  for (var i = 0; i < str.length; i++) {\n    // Node's code seems to be doing this and not & 0x7F..\n    byteArray.push(str.charCodeAt(i) & 0xFF)\n  }\n  return byteArray\n}\n\nfunction utf16leToBytes (str, units) {\n  var c, hi, lo\n  var byteArray = []\n  for (var i = 0; i < str.length; i++) {\n    if ((units -= 2) < 0) break\n\n    c = str.charCodeAt(i)\n    hi = c >> 8\n    lo = c % 256\n    byteArray.push(lo)\n    byteArray.push(hi)\n  }\n\n  return byteArray\n}\n\nfunction base64ToBytes (str) {\n  return base64.toByteArray(base64clean(str))\n}\n\nfunction blitBuffer (src, dst, offset, length) {\n  for (var i = 0; i < length; i++) {\n    if ((i + offset >= dst.length) || (i >= src.length)) break\n    dst[i + offset] = src[i]\n  }\n  return i\n}\n\n},{\"base64-js\":44,\"ieee754\":45,\"is-array\":46}],44:[function(require,module,exports){\nvar lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';\n\n;(function (exports) {\n\t'use strict';\n\n  var Arr = (typeof Uint8Array !== 'undefined')\n    ? Uint8Array\n    : Array\n\n\tvar PLUS   = '+'.charCodeAt(0)\n\tvar SLASH  = '/'.charCodeAt(0)\n\tvar NUMBER = '0'.charCodeAt(0)\n\tvar LOWER  = 'a'.charCodeAt(0)\n\tvar UPPER  = 'A'.charCodeAt(0)\n\tvar PLUS_URL_SAFE = '-'.charCodeAt(0)\n\tvar SLASH_URL_SAFE = '_'.charCodeAt(0)\n\n\tfunction decode (elt) {\n\t\tvar code = elt.charCodeAt(0)\n\t\tif (code === PLUS ||\n\t\t    code === PLUS_URL_SAFE)\n\t\t\treturn 62 // '+'\n\t\tif (code === SLASH ||\n\t\t    code === SLASH_URL_SAFE)\n\t\t\treturn 63 // '/'\n\t\tif (code < NUMBER)\n\t\t\treturn -1 //no match\n\t\tif (code < NUMBER + 10)\n\t\t\treturn code - NUMBER + 26 + 26\n\t\tif (code < UPPER + 26)\n\t\t\treturn code - UPPER\n\t\tif (code < LOWER + 26)\n\t\t\treturn code - LOWER + 26\n\t}\n\n\tfunction b64ToByteArray (b64) {\n\t\tvar i, j, l, tmp, placeHolders, arr\n\n\t\tif (b64.length % 4 > 0) {\n\t\t\tthrow new Error('Invalid string. Length must be a multiple of 4')\n\t\t}\n\n\t\t// the number of equal signs (place holders)\n\t\t// if there are two placeholders, than the two characters before it\n\t\t// represent one byte\n\t\t// if there is only one, then the three characters before it represent 2 bytes\n\t\t// this is just a cheap hack to not do indexOf twice\n\t\tvar len = b64.length\n\t\tplaceHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0\n\n\t\t// base64 is 4/3 + up to two characters of the original data\n\t\tarr = new Arr(b64.length * 3 / 4 - placeHolders)\n\n\t\t// if there are placeholders, only get up to the last complete 4 chars\n\t\tl = placeHolders > 0 ? b64.length - 4 : b64.length\n\n\t\tvar L = 0\n\n\t\tfunction push (v) {\n\t\t\tarr[L++] = v\n\t\t}\n\n\t\tfor (i = 0, j = 0; i < l; i += 4, j += 3) {\n\t\t\ttmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))\n\t\t\tpush((tmp & 0xFF0000) >> 16)\n\t\t\tpush((tmp & 0xFF00) >> 8)\n\t\t\tpush(tmp & 0xFF)\n\t\t}\n\n\t\tif (placeHolders === 2) {\n\t\t\ttmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)\n\t\t\tpush(tmp & 0xFF)\n\t\t} else if (placeHolders === 1) {\n\t\t\ttmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)\n\t\t\tpush((tmp >> 8) & 0xFF)\n\t\t\tpush(tmp & 0xFF)\n\t\t}\n\n\t\treturn arr\n\t}\n\n\tfunction uint8ToBase64 (uint8) {\n\t\tvar i,\n\t\t\textraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes\n\t\t\toutput = \"\",\n\t\t\ttemp, length\n\n\t\tfunction encode (num) {\n\t\t\treturn lookup.charAt(num)\n\t\t}\n\n\t\tfunction tripletToBase64 (num) {\n\t\t\treturn encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)\n\t\t}\n\n\t\t// go through the array every three bytes, we'll deal with trailing stuff later\n\t\tfor (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {\n\t\t\ttemp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])\n\t\t\toutput += tripletToBase64(temp)\n\t\t}\n\n\t\t// pad the end with zeros, but make sure to not forget the extra bytes\n\t\tswitch (extraBytes) {\n\t\t\tcase 1:\n\t\t\t\ttemp = uint8[uint8.length - 1]\n\t\t\t\toutput += encode(temp >> 2)\n\t\t\t\toutput += encode((temp << 4) & 0x3F)\n\t\t\t\toutput += '=='\n\t\t\t\tbreak\n\t\t\tcase 2:\n\t\t\t\ttemp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])\n\t\t\t\toutput += encode(temp >> 10)\n\t\t\t\toutput += encode((temp >> 4) & 0x3F)\n\t\t\t\toutput += encode((temp << 2) & 0x3F)\n\t\t\t\toutput += '='\n\t\t\t\tbreak\n\t\t}\n\n\t\treturn output\n\t}\n\n\texports.toByteArray = b64ToByteArray\n\texports.fromByteArray = uint8ToBase64\n}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))\n\n},{}],45:[function(require,module,exports){\nexports.read = function (buffer, offset, isLE, mLen, nBytes) {\n  var e, m\n  var eLen = nBytes * 8 - mLen - 1\n  var eMax = (1 << eLen) - 1\n  var eBias = eMax >> 1\n  var nBits = -7\n  var i = isLE ? (nBytes - 1) : 0\n  var d = isLE ? -1 : 1\n  var s = buffer[offset + i]\n\n  i += d\n\n  e = s & ((1 << (-nBits)) - 1)\n  s >>= (-nBits)\n  nBits += eLen\n  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}\n\n  m = e & ((1 << (-nBits)) - 1)\n  e >>= (-nBits)\n  nBits += mLen\n  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}\n\n  if (e === 0) {\n    e = 1 - eBias\n  } else if (e === eMax) {\n    return m ? NaN : ((s ? -1 : 1) * Infinity)\n  } else {\n    m = m + Math.pow(2, mLen)\n    e = e - eBias\n  }\n  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)\n}\n\nexports.write = function (buffer, value, offset, isLE, mLen, nBytes) {\n  var e, m, c\n  var eLen = nBytes * 8 - mLen - 1\n  var eMax = (1 << eLen) - 1\n  var eBias = eMax >> 1\n  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)\n  var i = isLE ? 0 : (nBytes - 1)\n  var d = isLE ? 1 : -1\n  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0\n\n  value = Math.abs(value)\n\n  if (isNaN(value) || value === Infinity) {\n    m = isNaN(value) ? 1 : 0\n    e = eMax\n  } else {\n    e = Math.floor(Math.log(value) / Math.LN2)\n    if (value * (c = Math.pow(2, -e)) < 1) {\n      e--\n      c *= 2\n    }\n    if (e + eBias >= 1) {\n      value += rt / c\n    } else {\n      value += rt * Math.pow(2, 1 - eBias)\n    }\n    if (value * c >= 2) {\n      e++\n      c /= 2\n    }\n\n    if (e + eBias >= eMax) {\n      m = 0\n      e = eMax\n    } else if (e + eBias >= 1) {\n      m = (value * c - 1) * Math.pow(2, mLen)\n      e = e + eBias\n    } else {\n      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)\n      e = 0\n    }\n  }\n\n  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}\n\n  e = (e << mLen) | m\n  eLen += mLen\n  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}\n\n  buffer[offset + i - d] |= s * 128\n}\n\n},{}],46:[function(require,module,exports){\n\n/**\n * isArray\n */\n\nvar isArray = Array.isArray;\n\n/**\n * toString\n */\n\nvar str = Object.prototype.toString;\n\n/**\n * Whether or not the given `val`\n * is an array.\n *\n * example:\n *\n *        isArray([]);\n *        // > true\n *        isArray(arguments);\n *        // > false\n *        isArray('');\n *        // > false\n *\n * @param {mixed} val\n * @return {bool}\n */\n\nmodule.exports = isArray || function (val) {\n  return !! val && '[object Array]' == str.call(val);\n};\n\n},{}],47:[function(require,module,exports){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\nfunction EventEmitter() {\n  this._events = this._events || {};\n  this._maxListeners = this._maxListeners || undefined;\n}\nmodule.exports = EventEmitter;\n\n// Backwards-compat with node 0.10.x\nEventEmitter.EventEmitter = EventEmitter;\n\nEventEmitter.prototype._events = undefined;\nEventEmitter.prototype._maxListeners = undefined;\n\n// By default EventEmitters will print a warning if more than 10 listeners are\n// added to it. This is a useful default which helps finding memory leaks.\nEventEmitter.defaultMaxListeners = 10;\n\n// Obviously not all Emitters should be limited to 10. This function allows\n// that to be increased. Set to zero for unlimited.\nEventEmitter.prototype.setMaxListeners = function(n) {\n  if (!isNumber(n) || n < 0 || isNaN(n))\n    throw TypeError('n must be a positive number');\n  this._maxListeners = n;\n  return this;\n};\n\nEventEmitter.prototype.emit = function(type) {\n  var er, handler, len, args, i, listeners;\n\n  if (!this._events)\n    this._events = {};\n\n  // If there is no 'error' event listener then throw.\n  if (type === 'error') {\n    if (!this._events.error ||\n        (isObject(this._events.error) && !this._events.error.length)) {\n      er = arguments[1];\n      if (er instanceof Error) {\n        throw er; // Unhandled 'error' event\n      }\n      throw TypeError('Uncaught, unspecified \"error\" event.');\n    }\n  }\n\n  handler = this._events[type];\n\n  if (isUndefined(handler))\n    return false;\n\n  if (isFunction(handler)) {\n    switch (arguments.length) {\n      // fast cases\n      case 1:\n        handler.call(this);\n        break;\n      case 2:\n        handler.call(this, arguments[1]);\n        break;\n      case 3:\n        handler.call(this, arguments[1], arguments[2]);\n        break;\n      // slower\n      default:\n        len = arguments.length;\n        args = new Array(len - 1);\n        for (i = 1; i < len; i++)\n          args[i - 1] = arguments[i];\n        handler.apply(this, args);\n    }\n  } else if (isObject(handler)) {\n    len = arguments.length;\n    args = new Array(len - 1);\n    for (i = 1; i < len; i++)\n      args[i - 1] = arguments[i];\n\n    listeners = handler.slice();\n    len = listeners.length;\n    for (i = 0; i < len; i++)\n      listeners[i].apply(this, args);\n  }\n\n  return true;\n};\n\nEventEmitter.prototype.addListener = function(type, listener) {\n  var m;\n\n  if (!isFunction(listener))\n    throw TypeError('listener must be a function');\n\n  if (!this._events)\n    this._events = {};\n\n  // To avoid recursion in the case that type === \"newListener\"! Before\n  // adding it to the listeners, first emit \"newListener\".\n  if (this._events.newListener)\n    this.emit('newListener', type,\n              isFunction(listener.listener) ?\n              listener.listener : listener);\n\n  if (!this._events[type])\n    // Optimize the case of one listener. Don't need the extra array object.\n    this._events[type] = listener;\n  else if (isObject(this._events[type]))\n    // If we've already got an array, just append.\n    this._events[type].push(listener);\n  else\n    // Adding the second element, need to change to array.\n    this._events[type] = [this._events[type], listener];\n\n  // Check for listener leak\n  if (isObject(this._events[type]) && !this._events[type].warned) {\n    var m;\n    if (!isUndefined(this._maxListeners)) {\n      m = this._maxListeners;\n    } else {\n      m = EventEmitter.defaultMaxListeners;\n    }\n\n    if (m && m > 0 && this._events[type].length > m) {\n      this._events[type].warned = true;\n      console.error('(node) warning: possible EventEmitter memory ' +\n                    'leak detected. %d listeners added. ' +\n                    'Use emitter.setMaxListeners() to increase limit.',\n                    this._events[type].length);\n      if (typeof console.trace === 'function') {\n        // not supported in IE 10\n        console.trace();\n      }\n    }\n  }\n\n  return this;\n};\n\nEventEmitter.prototype.on = EventEmitter.prototype.addListener;\n\nEventEmitter.prototype.once = function(type, listener) {\n  if (!isFunction(listener))\n    throw TypeError('listener must be a function');\n\n  var fired = false;\n\n  function g() {\n    this.removeListener(type, g);\n\n    if (!fired) {\n      fired = true;\n      listener.apply(this, arguments);\n    }\n  }\n\n  g.listener = listener;\n  this.on(type, g);\n\n  return this;\n};\n\n// emits a 'removeListener' event iff the listener was removed\nEventEmitter.prototype.removeListener = function(type, listener) {\n  var list, position, length, i;\n\n  if (!isFunction(listener))\n    throw TypeError('listener must be a function');\n\n  if (!this._events || !this._events[type])\n    return this;\n\n  list = this._events[type];\n  length = list.length;\n  position = -1;\n\n  if (list === listener ||\n      (isFunction(list.listener) && list.listener === listener)) {\n    delete this._events[type];\n    if (this._events.removeListener)\n      this.emit('removeListener', type, listener);\n\n  } else if (isObject(list)) {\n    for (i = length; i-- > 0;) {\n      if (list[i] === listener ||\n          (list[i].listener && list[i].listener === listener)) {\n        position = i;\n        break;\n      }\n    }\n\n    if (position < 0)\n      return this;\n\n    if (list.length === 1) {\n      list.length = 0;\n      delete this._events[type];\n    } else {\n      list.splice(position, 1);\n    }\n\n    if (this._events.removeListener)\n      this.emit('removeListener', type, listener);\n  }\n\n  return this;\n};\n\nEventEmitter.prototype.removeAllListeners = function(type) {\n  var key, listeners;\n\n  if (!this._events)\n    return this;\n\n  // not listening for removeListener, no need to emit\n  if (!this._events.removeListener) {\n    if (arguments.length === 0)\n      this._events = {};\n    else if (this._events[type])\n      delete this._events[type];\n    return this;\n  }\n\n  // emit removeListener for all listeners on all events\n  if (arguments.length === 0) {\n    for (key in this._events) {\n      if (key === 'removeListener') continue;\n      this.removeAllListeners(key);\n    }\n    this.removeAllListeners('removeListener');\n    this._events = {};\n    return this;\n  }\n\n  listeners = this._events[type];\n\n  if (isFunction(listeners)) {\n    this.removeListener(type, listeners);\n  } else {\n    // LIFO order\n    while (listeners.length)\n      this.removeListener(type, listeners[listeners.length - 1]);\n  }\n  delete this._events[type];\n\n  return this;\n};\n\nEventEmitter.prototype.listeners = function(type) {\n  var ret;\n  if (!this._events || !this._events[type])\n    ret = [];\n  else if (isFunction(this._events[type]))\n    ret = [this._events[type]];\n  else\n    ret = this._events[type].slice();\n  return ret;\n};\n\nEventEmitter.listenerCount = function(emitter, type) {\n  var ret;\n  if (!emitter._events || !emitter._events[type])\n    ret = 0;\n  else if (isFunction(emitter._events[type]))\n    ret = 1;\n  else\n    ret = emitter._events[type].length;\n  return ret;\n};\n\nfunction isFunction(arg) {\n  return typeof arg === 'function';\n}\n\nfunction isNumber(arg) {\n  return typeof arg === 'number';\n}\n\nfunction isObject(arg) {\n  return typeof arg === 'object' && arg !== null;\n}\n\nfunction isUndefined(arg) {\n  return arg === void 0;\n}\n\n},{}],48:[function(require,module,exports){\nif (typeof Object.create === 'function') {\n  // implementation from standard node.js 'util' module\n  module.exports = function inherits(ctor, superCtor) {\n    ctor.super_ = superCtor\n    ctor.prototype = Object.create(superCtor.prototype, {\n      constructor: {\n        value: ctor,\n        enumerable: false,\n        writable: true,\n        configurable: true\n      }\n    });\n  };\n} else {\n  // old school shim for old browsers\n  module.exports = function inherits(ctor, superCtor) {\n    ctor.super_ = superCtor\n    var TempCtor = function () {}\n    TempCtor.prototype = superCtor.prototype\n    ctor.prototype = new TempCtor()\n    ctor.prototype.constructor = ctor\n  }\n}\n\n},{}],49:[function(require,module,exports){\nmodule.exports = Array.isArray || function (arr) {\n  return Object.prototype.toString.call(arr) == '[object Array]';\n};\n\n},{}],50:[function(require,module,exports){\nexports.endianness = function () { return 'LE' };\n\nexports.hostname = function () {\n    if (typeof location !== 'undefined') {\n        return location.hostname\n    }\n    else return '';\n};\n\nexports.loadavg = function () { return [] };\n\nexports.uptime = function () { return 0 };\n\nexports.freemem = function () {\n    return Number.MAX_VALUE;\n};\n\nexports.totalmem = function () {\n    return Number.MAX_VALUE;\n};\n\nexports.cpus = function () { return [] };\n\nexports.type = function () { return 'Browser' };\n\nexports.release = function () {\n    if (typeof navigator !== 'undefined') {\n        return navigator.appVersion;\n    }\n    return '';\n};\n\nexports.networkInterfaces\n= exports.getNetworkInterfaces\n= function () { return {} };\n\nexports.arch = function () { return 'javascript' };\n\nexports.platform = function () { return 'browser' };\n\nexports.tmpdir = exports.tmpDir = function () {\n    return '/tmp';\n};\n\nexports.EOL = '\\n';\n\n},{}],51:[function(require,module,exports){\n// shim for using process in browser\n\nvar process = module.exports = {};\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = setTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    clearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        setTimeout(drainQueue, 0);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n},{}],52:[function(require,module,exports){\nmodule.exports = require(\"./lib/_stream_duplex.js\")\n\n},{\"./lib/_stream_duplex.js\":53}],53:[function(require,module,exports){\n(function (process){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n// a duplex stream is just a stream that is both readable and writable.\n// Since JS doesn't have multiple prototypal inheritance, this class\n// prototypally inherits from Readable, and then parasitically from\n// Writable.\n\nmodule.exports = Duplex;\n\n/*<replacement>*/\nvar objectKeys = Object.keys || function (obj) {\n  var keys = [];\n  for (var key in obj) keys.push(key);\n  return keys;\n}\n/*</replacement>*/\n\n\n/*<replacement>*/\nvar util = require('core-util-is');\nutil.inherits = require('inherits');\n/*</replacement>*/\n\nvar Readable = require('./_stream_readable');\nvar Writable = require('./_stream_writable');\n\nutil.inherits(Duplex, Readable);\n\nforEach(objectKeys(Writable.prototype), function(method) {\n  if (!Duplex.prototype[method])\n    Duplex.prototype[method] = Writable.prototype[method];\n});\n\nfunction Duplex(options) {\n  if (!(this instanceof Duplex))\n    return new Duplex(options);\n\n  Readable.call(this, options);\n  Writable.call(this, options);\n\n  if (options && options.readable === false)\n    this.readable = false;\n\n  if (options && options.writable === false)\n    this.writable = false;\n\n  this.allowHalfOpen = true;\n  if (options && options.allowHalfOpen === false)\n    this.allowHalfOpen = false;\n\n  this.once('end', onend);\n}\n\n// the no-half-open enforcer\nfunction onend() {\n  // if we allow half-open state, or if the writable side ended,\n  // then we're ok.\n  if (this.allowHalfOpen || this._writableState.ended)\n    return;\n\n  // no more data can be written.\n  // But allow more writes to happen in this tick.\n  process.nextTick(this.end.bind(this));\n}\n\nfunction forEach (xs, f) {\n  for (var i = 0, l = xs.length; i < l; i++) {\n    f(xs[i], i);\n  }\n}\n\n}).call(this,require('_process'))\n},{\"./_stream_readable\":55,\"./_stream_writable\":57,\"_process\":51,\"core-util-is\":58,\"inherits\":48}],54:[function(require,module,exports){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n// a passthrough stream.\n// basically just the most minimal sort of Transform stream.\n// Every written chunk gets output as-is.\n\nmodule.exports = PassThrough;\n\nvar Transform = require('./_stream_transform');\n\n/*<replacement>*/\nvar util = require('core-util-is');\nutil.inherits = require('inherits');\n/*</replacement>*/\n\nutil.inherits(PassThrough, Transform);\n\nfunction PassThrough(options) {\n  if (!(this instanceof PassThrough))\n    return new PassThrough(options);\n\n  Transform.call(this, options);\n}\n\nPassThrough.prototype._transform = function(chunk, encoding, cb) {\n  cb(null, chunk);\n};\n\n},{\"./_stream_transform\":56,\"core-util-is\":58,\"inherits\":48}],55:[function(require,module,exports){\n(function (process){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\nmodule.exports = Readable;\n\n/*<replacement>*/\nvar isArray = require('isarray');\n/*</replacement>*/\n\n\n/*<replacement>*/\nvar Buffer = require('buffer').Buffer;\n/*</replacement>*/\n\nReadable.ReadableState = ReadableState;\n\nvar EE = require('events').EventEmitter;\n\n/*<replacement>*/\nif (!EE.listenerCount) EE.listenerCount = function(emitter, type) {\n  return emitter.listeners(type).length;\n};\n/*</replacement>*/\n\nvar Stream = require('stream');\n\n/*<replacement>*/\nvar util = require('core-util-is');\nutil.inherits = require('inherits');\n/*</replacement>*/\n\nvar StringDecoder;\n\n\n/*<replacement>*/\nvar debug = require('util');\nif (debug && debug.debuglog) {\n  debug = debug.debuglog('stream');\n} else {\n  debug = function () {};\n}\n/*</replacement>*/\n\n\nutil.inherits(Readable, Stream);\n\nfunction ReadableState(options, stream) {\n  var Duplex = require('./_stream_duplex');\n\n  options = options || {};\n\n  // the point at which it stops calling _read() to fill the buffer\n  // Note: 0 is a valid value, means \"don't call _read preemptively ever\"\n  var hwm = options.highWaterMark;\n  var defaultHwm = options.objectMode ? 16 : 16 * 1024;\n  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;\n\n  // cast to ints.\n  this.highWaterMark = ~~this.highWaterMark;\n\n  this.buffer = [];\n  this.length = 0;\n  this.pipes = null;\n  this.pipesCount = 0;\n  this.flowing = null;\n  this.ended = false;\n  this.endEmitted = false;\n  this.reading = false;\n\n  // a flag to be able to tell if the onwrite cb is called immediately,\n  // or on a later tick.  We set this to true at first, because any\n  // actions that shouldn't happen until \"later\" should generally also\n  // not happen before the first write call.\n  this.sync = true;\n\n  // whenever we return null, then we set a flag to say\n  // that we're awaiting a 'readable' event emission.\n  this.needReadable = false;\n  this.emittedReadable = false;\n  this.readableListening = false;\n\n\n  // object stream flag. Used to make read(n) ignore n and to\n  // make all the buffer merging and length checks go away\n  this.objectMode = !!options.objectMode;\n\n  if (stream instanceof Duplex)\n    this.objectMode = this.objectMode || !!options.readableObjectMode;\n\n  // Crypto is kind of old and crusty.  Historically, its default string\n  // encoding is 'binary' so we have to make this configurable.\n  // Everything else in the universe uses 'utf8', though.\n  this.defaultEncoding = options.defaultEncoding || 'utf8';\n\n  // when piping, we only care about 'readable' events that happen\n  // after read()ing all the bytes and not getting any pushback.\n  this.ranOut = false;\n\n  // the number of writers that are awaiting a drain event in .pipe()s\n  this.awaitDrain = 0;\n\n  // if true, a maybeReadMore has been scheduled\n  this.readingMore = false;\n\n  this.decoder = null;\n  this.encoding = null;\n  if (options.encoding) {\n    if (!StringDecoder)\n      StringDecoder = require('string_decoder/').StringDecoder;\n    this.decoder = new StringDecoder(options.encoding);\n    this.encoding = options.encoding;\n  }\n}\n\nfunction Readable(options) {\n  var Duplex = require('./_stream_duplex');\n\n  if (!(this instanceof Readable))\n    return new Readable(options);\n\n  this._readableState = new ReadableState(options, this);\n\n  // legacy\n  this.readable = true;\n\n  Stream.call(this);\n}\n\n// Manually shove something into the read() buffer.\n// This returns true if the highWaterMark has not been hit yet,\n// similar to how Writable.write() returns true if you should\n// write() some more.\nReadable.prototype.push = function(chunk, encoding) {\n  var state = this._readableState;\n\n  if (util.isString(chunk) && !state.objectMode) {\n    encoding = encoding || state.defaultEncoding;\n    if (encoding !== state.encoding) {\n      chunk = new Buffer(chunk, encoding);\n      encoding = '';\n    }\n  }\n\n  return readableAddChunk(this, state, chunk, encoding, false);\n};\n\n// Unshift should *always* be something directly out of read()\nReadable.prototype.unshift = function(chunk) {\n  var state = this._readableState;\n  return readableAddChunk(this, state, chunk, '', true);\n};\n\nfunction readableAddChunk(stream, state, chunk, encoding, addToFront) {\n  var er = chunkInvalid(state, chunk);\n  if (er) {\n    stream.emit('error', er);\n  } else if (util.isNullOrUndefined(chunk)) {\n    state.reading = false;\n    if (!state.ended)\n      onEofChunk(stream, state);\n  } else if (state.objectMode || chunk && chunk.length > 0) {\n    if (state.ended && !addToFront) {\n      var e = new Error('stream.push() after EOF');\n      stream.emit('error', e);\n    } else if (state.endEmitted && addToFront) {\n      var e = new Error('stream.unshift() after end event');\n      stream.emit('error', e);\n    } else {\n      if (state.decoder && !addToFront && !encoding)\n        chunk = state.decoder.write(chunk);\n\n      if (!addToFront)\n        state.reading = false;\n\n      // if we want the data now, just emit it.\n      if (state.flowing && state.length === 0 && !state.sync) {\n        stream.emit('data', chunk);\n        stream.read(0);\n      } else {\n        // update the buffer info.\n        state.length += state.objectMode ? 1 : chunk.length;\n        if (addToFront)\n          state.buffer.unshift(chunk);\n        else\n          state.buffer.push(chunk);\n\n        if (state.needReadable)\n          emitReadable(stream);\n      }\n\n      maybeReadMore(stream, state);\n    }\n  } else if (!addToFront) {\n    state.reading = false;\n  }\n\n  return needMoreData(state);\n}\n\n\n\n// if it's past the high water mark, we can push in some more.\n// Also, if we have no data yet, we can stand some\n// more bytes.  This is to work around cases where hwm=0,\n// such as the repl.  Also, if the push() triggered a\n// readable event, and the user called read(largeNumber) such that\n// needReadable was set, then we ought to push more, so that another\n// 'readable' event will be triggered.\nfunction needMoreData(state) {\n  return !state.ended &&\n         (state.needReadable ||\n          state.length < state.highWaterMark ||\n          state.length === 0);\n}\n\n// backwards compatibility.\nReadable.prototype.setEncoding = function(enc) {\n  if (!StringDecoder)\n    StringDecoder = require('string_decoder/').StringDecoder;\n  this._readableState.decoder = new StringDecoder(enc);\n  this._readableState.encoding = enc;\n  return this;\n};\n\n// Don't raise the hwm > 128MB\nvar MAX_HWM = 0x800000;\nfunction roundUpToNextPowerOf2(n) {\n  if (n >= MAX_HWM) {\n    n = MAX_HWM;\n  } else {\n    // Get the next highest power of 2\n    n--;\n    for (var p = 1; p < 32; p <<= 1) n |= n >> p;\n    n++;\n  }\n  return n;\n}\n\nfunction howMuchToRead(n, state) {\n  if (state.length === 0 && state.ended)\n    return 0;\n\n  if (state.objectMode)\n    return n === 0 ? 0 : 1;\n\n  if (isNaN(n) || util.isNull(n)) {\n    // only flow one buffer at a time\n    if (state.flowing && state.buffer.length)\n      return state.buffer[0].length;\n    else\n      return state.length;\n  }\n\n  if (n <= 0)\n    return 0;\n\n  // If we're asking for more than the target buffer level,\n  // then raise the water mark.  Bump up to the next highest\n  // power of 2, to prevent increasing it excessively in tiny\n  // amounts.\n  if (n > state.highWaterMark)\n    state.highWaterMark = roundUpToNextPowerOf2(n);\n\n  // don't have that much.  return null, unless we've ended.\n  if (n > state.length) {\n    if (!state.ended) {\n      state.needReadable = true;\n      return 0;\n    } else\n      return state.length;\n  }\n\n  return n;\n}\n\n// you can override either this method, or the async _read(n) below.\nReadable.prototype.read = function(n) {\n  debug('read', n);\n  var state = this._readableState;\n  var nOrig = n;\n\n  if (!util.isNumber(n) || n > 0)\n    state.emittedReadable = false;\n\n  // if we're doing read(0) to trigger a readable event, but we\n  // already have a bunch of data in the buffer, then just trigger\n  // the 'readable' event and move on.\n  if (n === 0 &&\n      state.needReadable &&\n      (state.length >= state.highWaterMark || state.ended)) {\n    debug('read: emitReadable', state.length, state.ended);\n    if (state.length === 0 && state.ended)\n      endReadable(this);\n    else\n      emitReadable(this);\n    return null;\n  }\n\n  n = howMuchToRead(n, state);\n\n  // if we've ended, and we're now clear, then finish it up.\n  if (n === 0 && state.ended) {\n    if (state.length === 0)\n      endReadable(this);\n    return null;\n  }\n\n  // All the actual chunk generation logic needs to be\n  // *below* the call to _read.  The reason is that in certain\n  // synthetic stream cases, such as passthrough streams, _read\n  // may be a completely synchronous operation which may change\n  // the state of the read buffer, providing enough data when\n  // before there was *not* enough.\n  //\n  // So, the steps are:\n  // 1. Figure out what the state of things will be after we do\n  // a read from the buffer.\n  //\n  // 2. If that resulting state will trigger a _read, then call _read.\n  // Note that this may be asynchronous, or synchronous.  Yes, it is\n  // deeply ugly to write APIs this way, but that still doesn't mean\n  // that the Readable class should behave improperly, as streams are\n  // designed to be sync/async agnostic.\n  // Take note if the _read call is sync or async (ie, if the read call\n  // has returned yet), so that we know whether or not it's safe to emit\n  // 'readable' etc.\n  //\n  // 3. Actually pull the requested chunks out of the buffer and return.\n\n  // if we need a readable event, then we need to do some reading.\n  var doRead = state.needReadable;\n  debug('need readable', doRead);\n\n  // if we currently have less than the highWaterMark, then also read some\n  if (state.length === 0 || state.length - n < state.highWaterMark) {\n    doRead = true;\n    debug('length less than watermark', doRead);\n  }\n\n  // however, if we've ended, then there's no point, and if we're already\n  // reading, then it's unnecessary.\n  if (state.ended || state.reading) {\n    doRead = false;\n    debug('reading or ended', doRead);\n  }\n\n  if (doRead) {\n    debug('do read');\n    state.reading = true;\n    state.sync = true;\n    // if the length is currently zero, then we *need* a readable event.\n    if (state.length === 0)\n      state.needReadable = true;\n    // call internal read method\n    this._read(state.highWaterMark);\n    state.sync = false;\n  }\n\n  // If _read pushed data synchronously, then `reading` will be false,\n  // and we need to re-evaluate how much data we can return to the user.\n  if (doRead && !state.reading)\n    n = howMuchToRead(nOrig, state);\n\n  var ret;\n  if (n > 0)\n    ret = fromList(n, state);\n  else\n    ret = null;\n\n  if (util.isNull(ret)) {\n    state.needReadable = true;\n    n = 0;\n  }\n\n  state.length -= n;\n\n  // If we have nothing in the buffer, then we want to know\n  // as soon as we *do* get something into the buffer.\n  if (state.length === 0 && !state.ended)\n    state.needReadable = true;\n\n  // If we tried to read() past the EOF, then emit end on the next tick.\n  if (nOrig !== n && state.ended && state.length === 0)\n    endReadable(this);\n\n  if (!util.isNull(ret))\n    this.emit('data', ret);\n\n  return ret;\n};\n\nfunction chunkInvalid(state, chunk) {\n  var er = null;\n  if (!util.isBuffer(chunk) &&\n      !util.isString(chunk) &&\n      !util.isNullOrUndefined(chunk) &&\n      !state.objectMode) {\n    er = new TypeError('Invalid non-string/buffer chunk');\n  }\n  return er;\n}\n\n\nfunction onEofChunk(stream, state) {\n  if (state.decoder && !state.ended) {\n    var chunk = state.decoder.end();\n    if (chunk && chunk.length) {\n      state.buffer.push(chunk);\n      state.length += state.objectMode ? 1 : chunk.length;\n    }\n  }\n  state.ended = true;\n\n  // emit 'readable' now to make sure it gets picked up.\n  emitReadable(stream);\n}\n\n// Don't emit readable right away in sync mode, because this can trigger\n// another read() call => stack overflow.  This way, it might trigger\n// a nextTick recursion warning, but that's not so bad.\nfunction emitReadable(stream) {\n  var state = stream._readableState;\n  state.needReadable = false;\n  if (!state.emittedReadable) {\n    debug('emitReadable', state.flowing);\n    state.emittedReadable = true;\n    if (state.sync)\n      process.nextTick(function() {\n        emitReadable_(stream);\n      });\n    else\n      emitReadable_(stream);\n  }\n}\n\nfunction emitReadable_(stream) {\n  debug('emit readable');\n  stream.emit('readable');\n  flow(stream);\n}\n\n\n// at this point, the user has presumably seen the 'readable' event,\n// and called read() to consume some data.  that may have triggered\n// in turn another _read(n) call, in which case reading = true if\n// it's in progress.\n// However, if we're not ended, or reading, and the length < hwm,\n// then go ahead and try to read some more preemptively.\nfunction maybeReadMore(stream, state) {\n  if (!state.readingMore) {\n    state.readingMore = true;\n    process.nextTick(function() {\n      maybeReadMore_(stream, state);\n    });\n  }\n}\n\nfunction maybeReadMore_(stream, state) {\n  var len = state.length;\n  while (!state.reading && !state.flowing && !state.ended &&\n         state.length < state.highWaterMark) {\n    debug('maybeReadMore read 0');\n    stream.read(0);\n    if (len === state.length)\n      // didn't get any data, stop spinning.\n      break;\n    else\n      len = state.length;\n  }\n  state.readingMore = false;\n}\n\n// abstract method.  to be overridden in specific implementation classes.\n// call cb(er, data) where data is <= n in length.\n// for virtual (non-string, non-buffer) streams, \"length\" is somewhat\n// arbitrary, and perhaps not very meaningful.\nReadable.prototype._read = function(n) {\n  this.emit('error', new Error('not implemented'));\n};\n\nReadable.prototype.pipe = function(dest, pipeOpts) {\n  var src = this;\n  var state = this._readableState;\n\n  switch (state.pipesCount) {\n    case 0:\n      state.pipes = dest;\n      break;\n    case 1:\n      state.pipes = [state.pipes, dest];\n      break;\n    default:\n      state.pipes.push(dest);\n      break;\n  }\n  state.pipesCount += 1;\n  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);\n\n  var doEnd = (!pipeOpts || pipeOpts.end !== false) &&\n              dest !== process.stdout &&\n              dest !== process.stderr;\n\n  var endFn = doEnd ? onend : cleanup;\n  if (state.endEmitted)\n    process.nextTick(endFn);\n  else\n    src.once('end', endFn);\n\n  dest.on('unpipe', onunpipe);\n  function onunpipe(readable) {\n    debug('onunpipe');\n    if (readable === src) {\n      cleanup();\n    }\n  }\n\n  function onend() {\n    debug('onend');\n    dest.end();\n  }\n\n  // when the dest drains, it reduces the awaitDrain counter\n  // on the source.  This would be more elegant with a .once()\n  // handler in flow(), but adding and removing repeatedly is\n  // too slow.\n  var ondrain = pipeOnDrain(src);\n  dest.on('drain', ondrain);\n\n  function cleanup() {\n    debug('cleanup');\n    // cleanup event handlers once the pipe is broken\n    dest.removeListener('close', onclose);\n    dest.removeListener('finish', onfinish);\n    dest.removeListener('drain', ondrain);\n    dest.removeListener('error', onerror);\n    dest.removeListener('unpipe', onunpipe);\n    src.removeListener('end', onend);\n    src.removeListener('end', cleanup);\n    src.removeListener('data', ondata);\n\n    // if the reader is waiting for a drain event from this\n    // specific writer, then it would cause it to never start\n    // flowing again.\n    // So, if this is awaiting a drain, then we just call it now.\n    // If we don't know, then assume that we are waiting for one.\n    if (state.awaitDrain &&\n        (!dest._writableState || dest._writableState.needDrain))\n      ondrain();\n  }\n\n  src.on('data', ondata);\n  function ondata(chunk) {\n    debug('ondata');\n    var ret = dest.write(chunk);\n    if (false === ret) {\n      debug('false write response, pause',\n            src._readableState.awaitDrain);\n      src._readableState.awaitDrain++;\n      src.pause();\n    }\n  }\n\n  // if the dest has an error, then stop piping into it.\n  // however, don't suppress the throwing behavior for this.\n  function onerror(er) {\n    debug('onerror', er);\n    unpipe();\n    dest.removeListener('error', onerror);\n    if (EE.listenerCount(dest, 'error') === 0)\n      dest.emit('error', er);\n  }\n  // This is a brutally ugly hack to make sure that our error handler\n  // is attached before any userland ones.  NEVER DO THIS.\n  if (!dest._events || !dest._events.error)\n    dest.on('error', onerror);\n  else if (isArray(dest._events.error))\n    dest._events.error.unshift(onerror);\n  else\n    dest._events.error = [onerror, dest._events.error];\n\n\n\n  // Both close and finish should trigger unpipe, but only once.\n  function onclose() {\n    dest.removeListener('finish', onfinish);\n    unpipe();\n  }\n  dest.once('close', onclose);\n  function onfinish() {\n    debug('onfinish');\n    dest.removeListener('close', onclose);\n    unpipe();\n  }\n  dest.once('finish', onfinish);\n\n  function unpipe() {\n    debug('unpipe');\n    src.unpipe(dest);\n  }\n\n  // tell the dest that it's being piped to\n  dest.emit('pipe', src);\n\n  // start the flow if it hasn't been started already.\n  if (!state.flowing) {\n    debug('pipe resume');\n    src.resume();\n  }\n\n  return dest;\n};\n\nfunction pipeOnDrain(src) {\n  return function() {\n    var state = src._readableState;\n    debug('pipeOnDrain', state.awaitDrain);\n    if (state.awaitDrain)\n      state.awaitDrain--;\n    if (state.awaitDrain === 0 && EE.listenerCount(src, 'data')) {\n      state.flowing = true;\n      flow(src);\n    }\n  };\n}\n\n\nReadable.prototype.unpipe = function(dest) {\n  var state = this._readableState;\n\n  // if we're not piping anywhere, then do nothing.\n  if (state.pipesCount === 0)\n    return this;\n\n  // just one destination.  most common case.\n  if (state.pipesCount === 1) {\n    // passed in one, but it's not the right one.\n    if (dest && dest !== state.pipes)\n      return this;\n\n    if (!dest)\n      dest = state.pipes;\n\n    // got a match.\n    state.pipes = null;\n    state.pipesCount = 0;\n    state.flowing = false;\n    if (dest)\n      dest.emit('unpipe', this);\n    return this;\n  }\n\n  // slow case. multiple pipe destinations.\n\n  if (!dest) {\n    // remove all.\n    var dests = state.pipes;\n    var len = state.pipesCount;\n    state.pipes = null;\n    state.pipesCount = 0;\n    state.flowing = false;\n\n    for (var i = 0; i < len; i++)\n      dests[i].emit('unpipe', this);\n    return this;\n  }\n\n  // try to find the right one.\n  var i = indexOf(state.pipes, dest);\n  if (i === -1)\n    return this;\n\n  state.pipes.splice(i, 1);\n  state.pipesCount -= 1;\n  if (state.pipesCount === 1)\n    state.pipes = state.pipes[0];\n\n  dest.emit('unpipe', this);\n\n  return this;\n};\n\n// set up data events if they are asked for\n// Ensure readable listeners eventually get something\nReadable.prototype.on = function(ev, fn) {\n  var res = Stream.prototype.on.call(this, ev, fn);\n\n  // If listening to data, and it has not explicitly been paused,\n  // then call resume to start the flow of data on the next tick.\n  if (ev === 'data' && false !== this._readableState.flowing) {\n    this.resume();\n  }\n\n  if (ev === 'readable' && this.readable) {\n    var state = this._readableState;\n    if (!state.readableListening) {\n      state.readableListening = true;\n      state.emittedReadable = false;\n      state.needReadable = true;\n      if (!state.reading) {\n        var self = this;\n        process.nextTick(function() {\n          debug('readable nexttick read 0');\n          self.read(0);\n        });\n      } else if (state.length) {\n        emitReadable(this, state);\n      }\n    }\n  }\n\n  return res;\n};\nReadable.prototype.addListener = Readable.prototype.on;\n\n// pause() and resume() are remnants of the legacy readable stream API\n// If the user uses them, then switch into old mode.\nReadable.prototype.resume = function() {\n  var state = this._readableState;\n  if (!state.flowing) {\n    debug('resume');\n    state.flowing = true;\n    if (!state.reading) {\n      debug('resume read 0');\n      this.read(0);\n    }\n    resume(this, state);\n  }\n  return this;\n};\n\nfunction resume(stream, state) {\n  if (!state.resumeScheduled) {\n    state.resumeScheduled = true;\n    process.nextTick(function() {\n      resume_(stream, state);\n    });\n  }\n}\n\nfunction resume_(stream, state) {\n  state.resumeScheduled = false;\n  stream.emit('resume');\n  flow(stream);\n  if (state.flowing && !state.reading)\n    stream.read(0);\n}\n\nReadable.prototype.pause = function() {\n  debug('call pause flowing=%j', this._readableState.flowing);\n  if (false !== this._readableState.flowing) {\n    debug('pause');\n    this._readableState.flowing = false;\n    this.emit('pause');\n  }\n  return this;\n};\n\nfunction flow(stream) {\n  var state = stream._readableState;\n  debug('flow', state.flowing);\n  if (state.flowing) {\n    do {\n      var chunk = stream.read();\n    } while (null !== chunk && state.flowing);\n  }\n}\n\n// wrap an old-style stream as the async data source.\n// This is *not* part of the readable stream interface.\n// It is an ugly unfortunate mess of history.\nReadable.prototype.wrap = function(stream) {\n  var state = this._readableState;\n  var paused = false;\n\n  var self = this;\n  stream.on('end', function() {\n    debug('wrapped end');\n    if (state.decoder && !state.ended) {\n      var chunk = state.decoder.end();\n      if (chunk && chunk.length)\n        self.push(chunk);\n    }\n\n    self.push(null);\n  });\n\n  stream.on('data', function(chunk) {\n    debug('wrapped data');\n    if (state.decoder)\n      chunk = state.decoder.write(chunk);\n    if (!chunk || !state.objectMode && !chunk.length)\n      return;\n\n    var ret = self.push(chunk);\n    if (!ret) {\n      paused = true;\n      stream.pause();\n    }\n  });\n\n  // proxy all the other methods.\n  // important when wrapping filters and duplexes.\n  for (var i in stream) {\n    if (util.isFunction(stream[i]) && util.isUndefined(this[i])) {\n      this[i] = function(method) { return function() {\n        return stream[method].apply(stream, arguments);\n      }}(i);\n    }\n  }\n\n  // proxy certain important events.\n  var events = ['error', 'close', 'destroy', 'pause', 'resume'];\n  forEach(events, function(ev) {\n    stream.on(ev, self.emit.bind(self, ev));\n  });\n\n  // when we try to consume some more bytes, simply unpause the\n  // underlying stream.\n  self._read = function(n) {\n    debug('wrapped _read', n);\n    if (paused) {\n      paused = false;\n      stream.resume();\n    }\n  };\n\n  return self;\n};\n\n\n\n// exposed for testing purposes only.\nReadable._fromList = fromList;\n\n// Pluck off n bytes from an array of buffers.\n// Length is the combined lengths of all the buffers in the list.\nfunction fromList(n, state) {\n  var list = state.buffer;\n  var length = state.length;\n  var stringMode = !!state.decoder;\n  var objectMode = !!state.objectMode;\n  var ret;\n\n  // nothing in the list, definitely empty.\n  if (list.length === 0)\n    return null;\n\n  if (length === 0)\n    ret = null;\n  else if (objectMode)\n    ret = list.shift();\n  else if (!n || n >= length) {\n    // read it all, truncate the array.\n    if (stringMode)\n      ret = list.join('');\n    else\n      ret = Buffer.concat(list, length);\n    list.length = 0;\n  } else {\n    // read just some of it.\n    if (n < list[0].length) {\n      // just take a part of the first list item.\n      // slice is the same for buffers and strings.\n      var buf = list[0];\n      ret = buf.slice(0, n);\n      list[0] = buf.slice(n);\n    } else if (n === list[0].length) {\n      // first list is a perfect match\n      ret = list.shift();\n    } else {\n      // complex case.\n      // we have enough to cover it, but it spans past the first buffer.\n      if (stringMode)\n        ret = '';\n      else\n        ret = new Buffer(n);\n\n      var c = 0;\n      for (var i = 0, l = list.length; i < l && c < n; i++) {\n        var buf = list[0];\n        var cpy = Math.min(n - c, buf.length);\n\n        if (stringMode)\n          ret += buf.slice(0, cpy);\n        else\n          buf.copy(ret, c, 0, cpy);\n\n        if (cpy < buf.length)\n          list[0] = buf.slice(cpy);\n        else\n          list.shift();\n\n        c += cpy;\n      }\n    }\n  }\n\n  return ret;\n}\n\nfunction endReadable(stream) {\n  var state = stream._readableState;\n\n  // If we get here before consuming all the bytes, then that is a\n  // bug in node.  Should never happen.\n  if (state.length > 0)\n    throw new Error('endReadable called on non-empty stream');\n\n  if (!state.endEmitted) {\n    state.ended = true;\n    process.nextTick(function() {\n      // Check that we didn't get one last unshift.\n      if (!state.endEmitted && state.length === 0) {\n        state.endEmitted = true;\n        stream.readable = false;\n        stream.emit('end');\n      }\n    });\n  }\n}\n\nfunction forEach (xs, f) {\n  for (var i = 0, l = xs.length; i < l; i++) {\n    f(xs[i], i);\n  }\n}\n\nfunction indexOf (xs, x) {\n  for (var i = 0, l = xs.length; i < l; i++) {\n    if (xs[i] === x) return i;\n  }\n  return -1;\n}\n\n}).call(this,require('_process'))\n},{\"./_stream_duplex\":53,\"_process\":51,\"buffer\":43,\"core-util-is\":58,\"events\":47,\"inherits\":48,\"isarray\":49,\"stream\":63,\"string_decoder/\":64,\"util\":42}],56:[function(require,module,exports){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n\n// a transform stream is a readable/writable stream where you do\n// something with the data.  Sometimes it's called a \"filter\",\n// but that's not a great name for it, since that implies a thing where\n// some bits pass through, and others are simply ignored.  (That would\n// be a valid example of a transform, of course.)\n//\n// While the output is causally related to the input, it's not a\n// necessarily symmetric or synchronous transformation.  For example,\n// a zlib stream might take multiple plain-text writes(), and then\n// emit a single compressed chunk some time in the future.\n//\n// Here's how this works:\n//\n// The Transform stream has all the aspects of the readable and writable\n// stream classes.  When you write(chunk), that calls _write(chunk,cb)\n// internally, and returns false if there's a lot of pending writes\n// buffered up.  When you call read(), that calls _read(n) until\n// there's enough pending readable data buffered up.\n//\n// In a transform stream, the written data is placed in a buffer.  When\n// _read(n) is called, it transforms the queued up data, calling the\n// buffered _write cb's as it consumes chunks.  If consuming a single\n// written chunk would result in multiple output chunks, then the first\n// outputted bit calls the readcb, and subsequent chunks just go into\n// the read buffer, and will cause it to emit 'readable' if necessary.\n//\n// This way, back-pressure is actually determined by the reading side,\n// since _read has to be called to start processing a new chunk.  However,\n// a pathological inflate type of transform can cause excessive buffering\n// here.  For example, imagine a stream where every byte of input is\n// interpreted as an integer from 0-255, and then results in that many\n// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in\n// 1kb of data being output.  In this case, you could write a very small\n// amount of input, and end up with a very large amount of output.  In\n// such a pathological inflating mechanism, there'd be no way to tell\n// the system to stop doing the transform.  A single 4MB write could\n// cause the system to run out of memory.\n//\n// However, even in such a pathological case, only a single written chunk\n// would be consumed, and then the rest would wait (un-transformed) until\n// the results of the previous transformed chunk were consumed.\n\nmodule.exports = Transform;\n\nvar Duplex = require('./_stream_duplex');\n\n/*<replacement>*/\nvar util = require('core-util-is');\nutil.inherits = require('inherits');\n/*</replacement>*/\n\nutil.inherits(Transform, Duplex);\n\n\nfunction TransformState(options, stream) {\n  this.afterTransform = function(er, data) {\n    return afterTransform(stream, er, data);\n  };\n\n  this.needTransform = false;\n  this.transforming = false;\n  this.writecb = null;\n  this.writechunk = null;\n}\n\nfunction afterTransform(stream, er, data) {\n  var ts = stream._transformState;\n  ts.transforming = false;\n\n  var cb = ts.writecb;\n\n  if (!cb)\n    return stream.emit('error', new Error('no writecb in Transform class'));\n\n  ts.writechunk = null;\n  ts.writecb = null;\n\n  if (!util.isNullOrUndefined(data))\n    stream.push(data);\n\n  if (cb)\n    cb(er);\n\n  var rs = stream._readableState;\n  rs.reading = false;\n  if (rs.needReadable || rs.length < rs.highWaterMark) {\n    stream._read(rs.highWaterMark);\n  }\n}\n\n\nfunction Transform(options) {\n  if (!(this instanceof Transform))\n    return new Transform(options);\n\n  Duplex.call(this, options);\n\n  this._transformState = new TransformState(options, this);\n\n  // when the writable side finishes, then flush out anything remaining.\n  var stream = this;\n\n  // start out asking for a readable event once data is transformed.\n  this._readableState.needReadable = true;\n\n  // we have implemented the _read method, and done the other things\n  // that Readable wants before the first _read call, so unset the\n  // sync guard flag.\n  this._readableState.sync = false;\n\n  this.once('prefinish', function() {\n    if (util.isFunction(this._flush))\n      this._flush(function(er) {\n        done(stream, er);\n      });\n    else\n      done(stream);\n  });\n}\n\nTransform.prototype.push = function(chunk, encoding) {\n  this._transformState.needTransform = false;\n  return Duplex.prototype.push.call(this, chunk, encoding);\n};\n\n// This is the part where you do stuff!\n// override this function in implementation classes.\n// 'chunk' is an input chunk.\n//\n// Call `push(newChunk)` to pass along transformed output\n// to the readable side.  You may call 'push' zero or more times.\n//\n// Call `cb(err)` when you are done with this chunk.  If you pass\n// an error, then that'll put the hurt on the whole operation.  If you\n// never call cb(), then you'll never get another chunk.\nTransform.prototype._transform = function(chunk, encoding, cb) {\n  throw new Error('not implemented');\n};\n\nTransform.prototype._write = function(chunk, encoding, cb) {\n  var ts = this._transformState;\n  ts.writecb = cb;\n  ts.writechunk = chunk;\n  ts.writeencoding = encoding;\n  if (!ts.transforming) {\n    var rs = this._readableState;\n    if (ts.needTransform ||\n        rs.needReadable ||\n        rs.length < rs.highWaterMark)\n      this._read(rs.highWaterMark);\n  }\n};\n\n// Doesn't matter what the args are here.\n// _transform does all the work.\n// That we got here means that the readable side wants more data.\nTransform.prototype._read = function(n) {\n  var ts = this._transformState;\n\n  if (!util.isNull(ts.writechunk) && ts.writecb && !ts.transforming) {\n    ts.transforming = true;\n    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);\n  } else {\n    // mark that we need a transform, so that any data that comes in\n    // will get processed, now that we've asked for it.\n    ts.needTransform = true;\n  }\n};\n\n\nfunction done(stream, er) {\n  if (er)\n    return stream.emit('error', er);\n\n  // if there's nothing in the write buffer, then that means\n  // that nothing more will ever be provided\n  var ws = stream._writableState;\n  var ts = stream._transformState;\n\n  if (ws.length)\n    throw new Error('calling transform done when ws.length != 0');\n\n  if (ts.transforming)\n    throw new Error('calling transform done when still transforming');\n\n  return stream.push(null);\n}\n\n},{\"./_stream_duplex\":53,\"core-util-is\":58,\"inherits\":48}],57:[function(require,module,exports){\n(function (process){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n// A bit simpler than readable streams.\n// Implement an async ._write(chunk, cb), and it'll handle all\n// the drain event emission and buffering.\n\nmodule.exports = Writable;\n\n/*<replacement>*/\nvar Buffer = require('buffer').Buffer;\n/*</replacement>*/\n\nWritable.WritableState = WritableState;\n\n\n/*<replacement>*/\nvar util = require('core-util-is');\nutil.inherits = require('inherits');\n/*</replacement>*/\n\nvar Stream = require('stream');\n\nutil.inherits(Writable, Stream);\n\nfunction WriteReq(chunk, encoding, cb) {\n  this.chunk = chunk;\n  this.encoding = encoding;\n  this.callback = cb;\n}\n\nfunction WritableState(options, stream) {\n  var Duplex = require('./_stream_duplex');\n\n  options = options || {};\n\n  // the point at which write() starts returning false\n  // Note: 0 is a valid value, means that we always return false if\n  // the entire buffer is not flushed immediately on write()\n  var hwm = options.highWaterMark;\n  var defaultHwm = options.objectMode ? 16 : 16 * 1024;\n  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;\n\n  // object stream flag to indicate whether or not this stream\n  // contains buffers or objects.\n  this.objectMode = !!options.objectMode;\n\n  if (stream instanceof Duplex)\n    this.objectMode = this.objectMode || !!options.writableObjectMode;\n\n  // cast to ints.\n  this.highWaterMark = ~~this.highWaterMark;\n\n  this.needDrain = false;\n  // at the start of calling end()\n  this.ending = false;\n  // when end() has been called, and returned\n  this.ended = false;\n  // when 'finish' is emitted\n  this.finished = false;\n\n  // should we decode strings into buffers before passing to _write?\n  // this is here so that some node-core streams can optimize string\n  // handling at a lower level.\n  var noDecode = options.decodeStrings === false;\n  this.decodeStrings = !noDecode;\n\n  // Crypto is kind of old and crusty.  Historically, its default string\n  // encoding is 'binary' so we have to make this configurable.\n  // Everything else in the universe uses 'utf8', though.\n  this.defaultEncoding = options.defaultEncoding || 'utf8';\n\n  // not an actual buffer we keep track of, but a measurement\n  // of how much we're waiting to get pushed to some underlying\n  // socket or file.\n  this.length = 0;\n\n  // a flag to see when we're in the middle of a write.\n  this.writing = false;\n\n  // when true all writes will be buffered until .uncork() call\n  this.corked = 0;\n\n  // a flag to be able to tell if the onwrite cb is called immediately,\n  // or on a later tick.  We set this to true at first, because any\n  // actions that shouldn't happen until \"later\" should generally also\n  // not happen before the first write call.\n  this.sync = true;\n\n  // a flag to know if we're processing previously buffered items, which\n  // may call the _write() callback in the same tick, so that we don't\n  // end up in an overlapped onwrite situation.\n  this.bufferProcessing = false;\n\n  // the callback that's passed to _write(chunk,cb)\n  this.onwrite = function(er) {\n    onwrite(stream, er);\n  };\n\n  // the callback that the user supplies to write(chunk,encoding,cb)\n  this.writecb = null;\n\n  // the amount that is being written when _write is called.\n  this.writelen = 0;\n\n  this.buffer = [];\n\n  // number of pending user-supplied write callbacks\n  // this must be 0 before 'finish' can be emitted\n  this.pendingcb = 0;\n\n  // emit prefinish if the only thing we're waiting for is _write cbs\n  // This is relevant for synchronous Transform streams\n  this.prefinished = false;\n\n  // True if the error was already emitted and should not be thrown again\n  this.errorEmitted = false;\n}\n\nfunction Writable(options) {\n  var Duplex = require('./_stream_duplex');\n\n  // Writable ctor is applied to Duplexes, though they're not\n  // instanceof Writable, they're instanceof Readable.\n  if (!(this instanceof Writable) && !(this instanceof Duplex))\n    return new Writable(options);\n\n  this._writableState = new WritableState(options, this);\n\n  // legacy.\n  this.writable = true;\n\n  Stream.call(this);\n}\n\n// Otherwise people can pipe Writable streams, which is just wrong.\nWritable.prototype.pipe = function() {\n  this.emit('error', new Error('Cannot pipe. Not readable.'));\n};\n\n\nfunction writeAfterEnd(stream, state, cb) {\n  var er = new Error('write after end');\n  // TODO: defer error events consistently everywhere, not just the cb\n  stream.emit('error', er);\n  process.nextTick(function() {\n    cb(er);\n  });\n}\n\n// If we get something that is not a buffer, string, null, or undefined,\n// and we're not in objectMode, then that's an error.\n// Otherwise stream chunks are all considered to be of length=1, and the\n// watermarks determine how many objects to keep in the buffer, rather than\n// how many bytes or characters.\nfunction validChunk(stream, state, chunk, cb) {\n  var valid = true;\n  if (!util.isBuffer(chunk) &&\n      !util.isString(chunk) &&\n      !util.isNullOrUndefined(chunk) &&\n      !state.objectMode) {\n    var er = new TypeError('Invalid non-string/buffer chunk');\n    stream.emit('error', er);\n    process.nextTick(function() {\n      cb(er);\n    });\n    valid = false;\n  }\n  return valid;\n}\n\nWritable.prototype.write = function(chunk, encoding, cb) {\n  var state = this._writableState;\n  var ret = false;\n\n  if (util.isFunction(encoding)) {\n    cb = encoding;\n    encoding = null;\n  }\n\n  if (util.isBuffer(chunk))\n    encoding = 'buffer';\n  else if (!encoding)\n    encoding = state.defaultEncoding;\n\n  if (!util.isFunction(cb))\n    cb = function() {};\n\n  if (state.ended)\n    writeAfterEnd(this, state, cb);\n  else if (validChunk(this, state, chunk, cb)) {\n    state.pendingcb++;\n    ret = writeOrBuffer(this, state, chunk, encoding, cb);\n  }\n\n  return ret;\n};\n\nWritable.prototype.cork = function() {\n  var state = this._writableState;\n\n  state.corked++;\n};\n\nWritable.prototype.uncork = function() {\n  var state = this._writableState;\n\n  if (state.corked) {\n    state.corked--;\n\n    if (!state.writing &&\n        !state.corked &&\n        !state.finished &&\n        !state.bufferProcessing &&\n        state.buffer.length)\n      clearBuffer(this, state);\n  }\n};\n\nfunction decodeChunk(state, chunk, encoding) {\n  if (!state.objectMode &&\n      state.decodeStrings !== false &&\n      util.isString(chunk)) {\n    chunk = new Buffer(chunk, encoding);\n  }\n  return chunk;\n}\n\n// if we're already writing something, then just put this\n// in the queue, and wait our turn.  Otherwise, call _write\n// If we return false, then we need a drain event, so set that flag.\nfunction writeOrBuffer(stream, state, chunk, encoding, cb) {\n  chunk = decodeChunk(state, chunk, encoding);\n  if (util.isBuffer(chunk))\n    encoding = 'buffer';\n  var len = state.objectMode ? 1 : chunk.length;\n\n  state.length += len;\n\n  var ret = state.length < state.highWaterMark;\n  // we must ensure that previous needDrain will not be reset to false.\n  if (!ret)\n    state.needDrain = true;\n\n  if (state.writing || state.corked)\n    state.buffer.push(new WriteReq(chunk, encoding, cb));\n  else\n    doWrite(stream, state, false, len, chunk, encoding, cb);\n\n  return ret;\n}\n\nfunction doWrite(stream, state, writev, len, chunk, encoding, cb) {\n  state.writelen = len;\n  state.writecb = cb;\n  state.writing = true;\n  state.sync = true;\n  if (writev)\n    stream._writev(chunk, state.onwrite);\n  else\n    stream._write(chunk, encoding, state.onwrite);\n  state.sync = false;\n}\n\nfunction onwriteError(stream, state, sync, er, cb) {\n  if (sync)\n    process.nextTick(function() {\n      state.pendingcb--;\n      cb(er);\n    });\n  else {\n    state.pendingcb--;\n    cb(er);\n  }\n\n  stream._writableState.errorEmitted = true;\n  stream.emit('error', er);\n}\n\nfunction onwriteStateUpdate(state) {\n  state.writing = false;\n  state.writecb = null;\n  state.length -= state.writelen;\n  state.writelen = 0;\n}\n\nfunction onwrite(stream, er) {\n  var state = stream._writableState;\n  var sync = state.sync;\n  var cb = state.writecb;\n\n  onwriteStateUpdate(state);\n\n  if (er)\n    onwriteError(stream, state, sync, er, cb);\n  else {\n    // Check if we're actually ready to finish, but don't emit yet\n    var finished = needFinish(stream, state);\n\n    if (!finished &&\n        !state.corked &&\n        !state.bufferProcessing &&\n        state.buffer.length) {\n      clearBuffer(stream, state);\n    }\n\n    if (sync) {\n      process.nextTick(function() {\n        afterWrite(stream, state, finished, cb);\n      });\n    } else {\n      afterWrite(stream, state, finished, cb);\n    }\n  }\n}\n\nfunction afterWrite(stream, state, finished, cb) {\n  if (!finished)\n    onwriteDrain(stream, state);\n  state.pendingcb--;\n  cb();\n  finishMaybe(stream, state);\n}\n\n// Must force callback to be called on nextTick, so that we don't\n// emit 'drain' before the write() consumer gets the 'false' return\n// value, and has a chance to attach a 'drain' listener.\nfunction onwriteDrain(stream, state) {\n  if (state.length === 0 && state.needDrain) {\n    state.needDrain = false;\n    stream.emit('drain');\n  }\n}\n\n\n// if there's something in the buffer waiting, then process it\nfunction clearBuffer(stream, state) {\n  state.bufferProcessing = true;\n\n  if (stream._writev && state.buffer.length > 1) {\n    // Fast case, write everything using _writev()\n    var cbs = [];\n    for (var c = 0; c < state.buffer.length; c++)\n      cbs.push(state.buffer[c].callback);\n\n    // count the one we are adding, as well.\n    // TODO(isaacs) clean this up\n    state.pendingcb++;\n    doWrite(stream, state, true, state.length, state.buffer, '', function(err) {\n      for (var i = 0; i < cbs.length; i++) {\n        state.pendingcb--;\n        cbs[i](err);\n      }\n    });\n\n    // Clear buffer\n    state.buffer = [];\n  } else {\n    // Slow case, write chunks one-by-one\n    for (var c = 0; c < state.buffer.length; c++) {\n      var entry = state.buffer[c];\n      var chunk = entry.chunk;\n      var encoding = entry.encoding;\n      var cb = entry.callback;\n      var len = state.objectMode ? 1 : chunk.length;\n\n      doWrite(stream, state, false, len, chunk, encoding, cb);\n\n      // if we didn't call the onwrite immediately, then\n      // it means that we need to wait until it does.\n      // also, that means that the chunk and cb are currently\n      // being processed, so move the buffer counter past them.\n      if (state.writing) {\n        c++;\n        break;\n      }\n    }\n\n    if (c < state.buffer.length)\n      state.buffer = state.buffer.slice(c);\n    else\n      state.buffer.length = 0;\n  }\n\n  state.bufferProcessing = false;\n}\n\nWritable.prototype._write = function(chunk, encoding, cb) {\n  cb(new Error('not implemented'));\n\n};\n\nWritable.prototype._writev = null;\n\nWritable.prototype.end = function(chunk, encoding, cb) {\n  var state = this._writableState;\n\n  if (util.isFunction(chunk)) {\n    cb = chunk;\n    chunk = null;\n    encoding = null;\n  } else if (util.isFunction(encoding)) {\n    cb = encoding;\n    encoding = null;\n  }\n\n  if (!util.isNullOrUndefined(chunk))\n    this.write(chunk, encoding);\n\n  // .end() fully uncorks\n  if (state.corked) {\n    state.corked = 1;\n    this.uncork();\n  }\n\n  // ignore unnecessary end() calls.\n  if (!state.ending && !state.finished)\n    endWritable(this, state, cb);\n};\n\n\nfunction needFinish(stream, state) {\n  return (state.ending &&\n          state.length === 0 &&\n          !state.finished &&\n          !state.writing);\n}\n\nfunction prefinish(stream, state) {\n  if (!state.prefinished) {\n    state.prefinished = true;\n    stream.emit('prefinish');\n  }\n}\n\nfunction finishMaybe(stream, state) {\n  var need = needFinish(stream, state);\n  if (need) {\n    if (state.pendingcb === 0) {\n      prefinish(stream, state);\n      state.finished = true;\n      stream.emit('finish');\n    } else\n      prefinish(stream, state);\n  }\n  return need;\n}\n\nfunction endWritable(stream, state, cb) {\n  state.ending = true;\n  finishMaybe(stream, state);\n  if (cb) {\n    if (state.finished)\n      process.nextTick(cb);\n    else\n      stream.once('finish', cb);\n  }\n  state.ended = true;\n}\n\n}).call(this,require('_process'))\n},{\"./_stream_duplex\":53,\"_process\":51,\"buffer\":43,\"core-util-is\":58,\"inherits\":48,\"stream\":63}],58:[function(require,module,exports){\n(function (Buffer){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n// NOTE: These type checking functions intentionally don't use `instanceof`\n// because it is fragile and can be easily faked with `Object.create()`.\nfunction isArray(ar) {\n  return Array.isArray(ar);\n}\nexports.isArray = isArray;\n\nfunction isBoolean(arg) {\n  return typeof arg === 'boolean';\n}\nexports.isBoolean = isBoolean;\n\nfunction isNull(arg) {\n  return arg === null;\n}\nexports.isNull = isNull;\n\nfunction isNullOrUndefined(arg) {\n  return arg == null;\n}\nexports.isNullOrUndefined = isNullOrUndefined;\n\nfunction isNumber(arg) {\n  return typeof arg === 'number';\n}\nexports.isNumber = isNumber;\n\nfunction isString(arg) {\n  return typeof arg === 'string';\n}\nexports.isString = isString;\n\nfunction isSymbol(arg) {\n  return typeof arg === 'symbol';\n}\nexports.isSymbol = isSymbol;\n\nfunction isUndefined(arg) {\n  return arg === void 0;\n}\nexports.isUndefined = isUndefined;\n\nfunction isRegExp(re) {\n  return isObject(re) && objectToString(re) === '[object RegExp]';\n}\nexports.isRegExp = isRegExp;\n\nfunction isObject(arg) {\n  return typeof arg === 'object' && arg !== null;\n}\nexports.isObject = isObject;\n\nfunction isDate(d) {\n  return isObject(d) && objectToString(d) === '[object Date]';\n}\nexports.isDate = isDate;\n\nfunction isError(e) {\n  return isObject(e) &&\n      (objectToString(e) === '[object Error]' || e instanceof Error);\n}\nexports.isError = isError;\n\nfunction isFunction(arg) {\n  return typeof arg === 'function';\n}\nexports.isFunction = isFunction;\n\nfunction isPrimitive(arg) {\n  return arg === null ||\n         typeof arg === 'boolean' ||\n         typeof arg === 'number' ||\n         typeof arg === 'string' ||\n         typeof arg === 'symbol' ||  // ES6 symbol\n         typeof arg === 'undefined';\n}\nexports.isPrimitive = isPrimitive;\n\nfunction isBuffer(arg) {\n  return Buffer.isBuffer(arg);\n}\nexports.isBuffer = isBuffer;\n\nfunction objectToString(o) {\n  return Object.prototype.toString.call(o);\n}\n}).call(this,require(\"buffer\").Buffer)\n},{\"buffer\":43}],59:[function(require,module,exports){\nmodule.exports = require(\"./lib/_stream_passthrough.js\")\n\n},{\"./lib/_stream_passthrough.js\":54}],60:[function(require,module,exports){\nexports = module.exports = require('./lib/_stream_readable.js');\nexports.Stream = require('stream');\nexports.Readable = exports;\nexports.Writable = require('./lib/_stream_writable.js');\nexports.Duplex = require('./lib/_stream_duplex.js');\nexports.Transform = require('./lib/_stream_transform.js');\nexports.PassThrough = require('./lib/_stream_passthrough.js');\n\n},{\"./lib/_stream_duplex.js\":53,\"./lib/_stream_passthrough.js\":54,\"./lib/_stream_readable.js\":55,\"./lib/_stream_transform.js\":56,\"./lib/_stream_writable.js\":57,\"stream\":63}],61:[function(require,module,exports){\nmodule.exports = require(\"./lib/_stream_transform.js\")\n\n},{\"./lib/_stream_transform.js\":56}],62:[function(require,module,exports){\nmodule.exports = require(\"./lib/_stream_writable.js\")\n\n},{\"./lib/_stream_writable.js\":57}],63:[function(require,module,exports){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\nmodule.exports = Stream;\n\nvar EE = require('events').EventEmitter;\nvar inherits = require('inherits');\n\ninherits(Stream, EE);\nStream.Readable = require('readable-stream/readable.js');\nStream.Writable = require('readable-stream/writable.js');\nStream.Duplex = require('readable-stream/duplex.js');\nStream.Transform = require('readable-stream/transform.js');\nStream.PassThrough = require('readable-stream/passthrough.js');\n\n// Backwards-compat with node 0.4.x\nStream.Stream = Stream;\n\n\n\n// old-style streams.  Note that the pipe method (the only relevant\n// part of this class) is overridden in the Readable class.\n\nfunction Stream() {\n  EE.call(this);\n}\n\nStream.prototype.pipe = function(dest, options) {\n  var source = this;\n\n  function ondata(chunk) {\n    if (dest.writable) {\n      if (false === dest.write(chunk) && source.pause) {\n        source.pause();\n      }\n    }\n  }\n\n  source.on('data', ondata);\n\n  function ondrain() {\n    if (source.readable && source.resume) {\n      source.resume();\n    }\n  }\n\n  dest.on('drain', ondrain);\n\n  // If the 'end' option is not supplied, dest.end() will be called when\n  // source gets the 'end' or 'close' events.  Only dest.end() once.\n  if (!dest._isStdio && (!options || options.end !== false)) {\n    source.on('end', onend);\n    source.on('close', onclose);\n  }\n\n  var didOnEnd = false;\n  function onend() {\n    if (didOnEnd) return;\n    didOnEnd = true;\n\n    dest.end();\n  }\n\n\n  function onclose() {\n    if (didOnEnd) return;\n    didOnEnd = true;\n\n    if (typeof dest.destroy === 'function') dest.destroy();\n  }\n\n  // don't leave dangling pipes when there are errors.\n  function onerror(er) {\n    cleanup();\n    if (EE.listenerCount(this, 'error') === 0) {\n      throw er; // Unhandled stream error in pipe.\n    }\n  }\n\n  source.on('error', onerror);\n  dest.on('error', onerror);\n\n  // remove all the event listeners that were added.\n  function cleanup() {\n    source.removeListener('data', ondata);\n    dest.removeListener('drain', ondrain);\n\n    source.removeListener('end', onend);\n    source.removeListener('close', onclose);\n\n    source.removeListener('error', onerror);\n    dest.removeListener('error', onerror);\n\n    source.removeListener('end', cleanup);\n    source.removeListener('close', cleanup);\n\n    dest.removeListener('close', cleanup);\n  }\n\n  source.on('end', cleanup);\n  source.on('close', cleanup);\n\n  dest.on('close', cleanup);\n\n  dest.emit('pipe', source);\n\n  // Allow for unix-like usage: A.pipe(B).pipe(C)\n  return dest;\n};\n\n},{\"events\":47,\"inherits\":48,\"readable-stream/duplex.js\":52,\"readable-stream/passthrough.js\":59,\"readable-stream/readable.js\":60,\"readable-stream/transform.js\":61,\"readable-stream/writable.js\":62}],64:[function(require,module,exports){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\nvar Buffer = require('buffer').Buffer;\n\nvar isBufferEncoding = Buffer.isEncoding\n  || function(encoding) {\n       switch (encoding && encoding.toLowerCase()) {\n         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;\n         default: return false;\n       }\n     }\n\n\nfunction assertEncoding(encoding) {\n  if (encoding && !isBufferEncoding(encoding)) {\n    throw new Error('Unknown encoding: ' + encoding);\n  }\n}\n\n// StringDecoder provides an interface for efficiently splitting a series of\n// buffers into a series of JS strings without breaking apart multi-byte\n// characters. CESU-8 is handled as part of the UTF-8 encoding.\n//\n// @TODO Handling all encodings inside a single object makes it very difficult\n// to reason about this code, so it should be split up in the future.\n// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code\n// points as used by CESU-8.\nvar StringDecoder = exports.StringDecoder = function(encoding) {\n  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');\n  assertEncoding(encoding);\n  switch (this.encoding) {\n    case 'utf8':\n      // CESU-8 represents each of Surrogate Pair by 3-bytes\n      this.surrogateSize = 3;\n      break;\n    case 'ucs2':\n    case 'utf16le':\n      // UTF-16 represents each of Surrogate Pair by 2-bytes\n      this.surrogateSize = 2;\n      this.detectIncompleteChar = utf16DetectIncompleteChar;\n      break;\n    case 'base64':\n      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.\n      this.surrogateSize = 3;\n      this.detectIncompleteChar = base64DetectIncompleteChar;\n      break;\n    default:\n      this.write = passThroughWrite;\n      return;\n  }\n\n  // Enough space to store all bytes of a single character. UTF-8 needs 4\n  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).\n  this.charBuffer = new Buffer(6);\n  // Number of bytes received for the current incomplete multi-byte character.\n  this.charReceived = 0;\n  // Number of bytes expected for the current incomplete multi-byte character.\n  this.charLength = 0;\n};\n\n\n// write decodes the given buffer and returns it as JS string that is\n// guaranteed to not contain any partial multi-byte characters. Any partial\n// character found at the end of the buffer is buffered up, and will be\n// returned when calling write again with the remaining bytes.\n//\n// Note: Converting a Buffer containing an orphan surrogate to a String\n// currently works, but converting a String to a Buffer (via `new Buffer`, or\n// Buffer#write) will replace incomplete surrogates with the unicode\n// replacement character. See https://codereview.chromium.org/121173009/ .\nStringDecoder.prototype.write = function(buffer) {\n  var charStr = '';\n  // if our last write ended with an incomplete multibyte character\n  while (this.charLength) {\n    // determine how many remaining bytes this buffer has to offer for this char\n    var available = (buffer.length >= this.charLength - this.charReceived) ?\n        this.charLength - this.charReceived :\n        buffer.length;\n\n    // add the new bytes to the char buffer\n    buffer.copy(this.charBuffer, this.charReceived, 0, available);\n    this.charReceived += available;\n\n    if (this.charReceived < this.charLength) {\n      // still not enough chars in this buffer? wait for more ...\n      return '';\n    }\n\n    // remove bytes belonging to the current character from the buffer\n    buffer = buffer.slice(available, buffer.length);\n\n    // get the character that was split\n    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);\n\n    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character\n    var charCode = charStr.charCodeAt(charStr.length - 1);\n    if (charCode >= 0xD800 && charCode <= 0xDBFF) {\n      this.charLength += this.surrogateSize;\n      charStr = '';\n      continue;\n    }\n    this.charReceived = this.charLength = 0;\n\n    // if there are no more bytes in this buffer, just emit our char\n    if (buffer.length === 0) {\n      return charStr;\n    }\n    break;\n  }\n\n  // determine and set charLength / charReceived\n  this.detectIncompleteChar(buffer);\n\n  var end = buffer.length;\n  if (this.charLength) {\n    // buffer the incomplete character bytes we got\n    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);\n    end -= this.charReceived;\n  }\n\n  charStr += buffer.toString(this.encoding, 0, end);\n\n  var end = charStr.length - 1;\n  var charCode = charStr.charCodeAt(end);\n  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character\n  if (charCode >= 0xD800 && charCode <= 0xDBFF) {\n    var size = this.surrogateSize;\n    this.charLength += size;\n    this.charReceived += size;\n    this.charBuffer.copy(this.charBuffer, size, 0, size);\n    buffer.copy(this.charBuffer, 0, 0, size);\n    return charStr.substring(0, end);\n  }\n\n  // or just emit the charStr\n  return charStr;\n};\n\n// detectIncompleteChar determines if there is an incomplete UTF-8 character at\n// the end of the given buffer. If so, it sets this.charLength to the byte\n// length that character, and sets this.charReceived to the number of bytes\n// that are available for this character.\nStringDecoder.prototype.detectIncompleteChar = function(buffer) {\n  // determine how many bytes we have to check at the end of this buffer\n  var i = (buffer.length >= 3) ? 3 : buffer.length;\n\n  // Figure out if one of the last i bytes of our buffer announces an\n  // incomplete char.\n  for (; i > 0; i--) {\n    var c = buffer[buffer.length - i];\n\n    // See http://en.wikipedia.org/wiki/UTF-8#Description\n\n    // 110XXXXX\n    if (i == 1 && c >> 5 == 0x06) {\n      this.charLength = 2;\n      break;\n    }\n\n    // 1110XXXX\n    if (i <= 2 && c >> 4 == 0x0E) {\n      this.charLength = 3;\n      break;\n    }\n\n    // 11110XXX\n    if (i <= 3 && c >> 3 == 0x1E) {\n      this.charLength = 4;\n      break;\n    }\n  }\n  this.charReceived = i;\n};\n\nStringDecoder.prototype.end = function(buffer) {\n  var res = '';\n  if (buffer && buffer.length)\n    res = this.write(buffer);\n\n  if (this.charReceived) {\n    var cr = this.charReceived;\n    var buf = this.charBuffer;\n    var enc = this.encoding;\n    res += buf.slice(0, cr).toString(enc);\n  }\n\n  return res;\n};\n\nfunction passThroughWrite(buffer) {\n  return buffer.toString(this.encoding);\n}\n\nfunction utf16DetectIncompleteChar(buffer) {\n  this.charReceived = buffer.length % 2;\n  this.charLength = this.charReceived ? 2 : 0;\n}\n\nfunction base64DetectIncompleteChar(buffer) {\n  this.charReceived = buffer.length % 3;\n  this.charLength = this.charReceived ? 3 : 0;\n}\n\n},{\"buffer\":43}],65:[function(require,module,exports){\nmodule.exports = function isBuffer(arg) {\n  return arg && typeof arg === 'object'\n    && typeof arg.copy === 'function'\n    && typeof arg.fill === 'function'\n    && typeof arg.readUInt8 === 'function';\n}\n},{}],66:[function(require,module,exports){\n(function (process,global){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\nvar formatRegExp = /%[sdj%]/g;\nexports.format = function(f) {\n  if (!isString(f)) {\n    var objects = [];\n    for (var i = 0; i < arguments.length; i++) {\n      objects.push(inspect(arguments[i]));\n    }\n    return objects.join(' ');\n  }\n\n  var i = 1;\n  var args = arguments;\n  var len = args.length;\n  var str = String(f).replace(formatRegExp, function(x) {\n    if (x === '%%') return '%';\n    if (i >= len) return x;\n    switch (x) {\n      case '%s': return String(args[i++]);\n      case '%d': return Number(args[i++]);\n      case '%j':\n        try {\n          return JSON.stringify(args[i++]);\n        } catch (_) {\n          return '[Circular]';\n        }\n      default:\n        return x;\n    }\n  });\n  for (var x = args[i]; i < len; x = args[++i]) {\n    if (isNull(x) || !isObject(x)) {\n      str += ' ' + x;\n    } else {\n      str += ' ' + inspect(x);\n    }\n  }\n  return str;\n};\n\n\n// Mark that a method should not be used.\n// Returns a modified function which warns once by default.\n// If --no-deprecation is set, then it is a no-op.\nexports.deprecate = function(fn, msg) {\n  // Allow for deprecating things in the process of starting up.\n  if (isUndefined(global.process)) {\n    return function() {\n      return exports.deprecate(fn, msg).apply(this, arguments);\n    };\n  }\n\n  if (process.noDeprecation === true) {\n    return fn;\n  }\n\n  var warned = false;\n  function deprecated() {\n    if (!warned) {\n      if (process.throwDeprecation) {\n        throw new Error(msg);\n      } else if (process.traceDeprecation) {\n        console.trace(msg);\n      } else {\n        console.error(msg);\n      }\n      warned = true;\n    }\n    return fn.apply(this, arguments);\n  }\n\n  return deprecated;\n};\n\n\nvar debugs = {};\nvar debugEnviron;\nexports.debuglog = function(set) {\n  if (isUndefined(debugEnviron))\n    debugEnviron = process.env.NODE_DEBUG || '';\n  set = set.toUpperCase();\n  if (!debugs[set]) {\n    if (new RegExp('\\\\b' + set + '\\\\b', 'i').test(debugEnviron)) {\n      var pid = process.pid;\n      debugs[set] = function() {\n        var msg = exports.format.apply(exports, arguments);\n        console.error('%s %d: %s', set, pid, msg);\n      };\n    } else {\n      debugs[set] = function() {};\n    }\n  }\n  return debugs[set];\n};\n\n\n/**\n * Echos the value of a value. Trys to print the value out\n * in the best way possible given the different types.\n *\n * @param {Object} obj The object to print out.\n * @param {Object} opts Optional options object that alters the output.\n */\n/* legacy: obj, showHidden, depth, colors*/\nfunction inspect(obj, opts) {\n  // default options\n  var ctx = {\n    seen: [],\n    stylize: stylizeNoColor\n  };\n  // legacy...\n  if (arguments.length >= 3) ctx.depth = arguments[2];\n  if (arguments.length >= 4) ctx.colors = arguments[3];\n  if (isBoolean(opts)) {\n    // legacy...\n    ctx.showHidden = opts;\n  } else if (opts) {\n    // got an \"options\" object\n    exports._extend(ctx, opts);\n  }\n  // set default options\n  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;\n  if (isUndefined(ctx.depth)) ctx.depth = 2;\n  if (isUndefined(ctx.colors)) ctx.colors = false;\n  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;\n  if (ctx.colors) ctx.stylize = stylizeWithColor;\n  return formatValue(ctx, obj, ctx.depth);\n}\nexports.inspect = inspect;\n\n\n// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics\ninspect.colors = {\n  'bold' : [1, 22],\n  'italic' : [3, 23],\n  'underline' : [4, 24],\n  'inverse' : [7, 27],\n  'white' : [37, 39],\n  'grey' : [90, 39],\n  'black' : [30, 39],\n  'blue' : [34, 39],\n  'cyan' : [36, 39],\n  'green' : [32, 39],\n  'magenta' : [35, 39],\n  'red' : [31, 39],\n  'yellow' : [33, 39]\n};\n\n// Don't use 'blue' not visible on cmd.exe\ninspect.styles = {\n  'special': 'cyan',\n  'number': 'yellow',\n  'boolean': 'yellow',\n  'undefined': 'grey',\n  'null': 'bold',\n  'string': 'green',\n  'date': 'magenta',\n  // \"name\": intentionally not styling\n  'regexp': 'red'\n};\n\n\nfunction stylizeWithColor(str, styleType) {\n  var style = inspect.styles[styleType];\n\n  if (style) {\n    return '\\u001b[' + inspect.colors[style][0] + 'm' + str +\n           '\\u001b[' + inspect.colors[style][1] + 'm';\n  } else {\n    return str;\n  }\n}\n\n\nfunction stylizeNoColor(str, styleType) {\n  return str;\n}\n\n\nfunction arrayToHash(array) {\n  var hash = {};\n\n  array.forEach(function(val, idx) {\n    hash[val] = true;\n  });\n\n  return hash;\n}\n\n\nfunction formatValue(ctx, value, recurseTimes) {\n  // Provide a hook for user-specified inspect functions.\n  // Check that value is an object with an inspect function on it\n  if (ctx.customInspect &&\n      value &&\n      isFunction(value.inspect) &&\n      // Filter out the util module, it's inspect function is special\n      value.inspect !== exports.inspect &&\n      // Also filter out any prototype objects using the circular check.\n      !(value.constructor && value.constructor.prototype === value)) {\n    var ret = value.inspect(recurseTimes, ctx);\n    if (!isString(ret)) {\n      ret = formatValue(ctx, ret, recurseTimes);\n    }\n    return ret;\n  }\n\n  // Primitive types cannot have properties\n  var primitive = formatPrimitive(ctx, value);\n  if (primitive) {\n    return primitive;\n  }\n\n  // Look up the keys of the object.\n  var keys = Object.keys(value);\n  var visibleKeys = arrayToHash(keys);\n\n  if (ctx.showHidden) {\n    keys = Object.getOwnPropertyNames(value);\n  }\n\n  // IE doesn't make error fields non-enumerable\n  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx\n  if (isError(value)\n      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {\n    return formatError(value);\n  }\n\n  // Some type of object without properties can be shortcutted.\n  if (keys.length === 0) {\n    if (isFunction(value)) {\n      var name = value.name ? ': ' + value.name : '';\n      return ctx.stylize('[Function' + name + ']', 'special');\n    }\n    if (isRegExp(value)) {\n      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');\n    }\n    if (isDate(value)) {\n      return ctx.stylize(Date.prototype.toString.call(value), 'date');\n    }\n    if (isError(value)) {\n      return formatError(value);\n    }\n  }\n\n  var base = '', array = false, braces = ['{', '}'];\n\n  // Make Array say that they are Array\n  if (isArray(value)) {\n    array = true;\n    braces = ['[', ']'];\n  }\n\n  // Make functions say that they are functions\n  if (isFunction(value)) {\n    var n = value.name ? ': ' + value.name : '';\n    base = ' [Function' + n + ']';\n  }\n\n  // Make RegExps say that they are RegExps\n  if (isRegExp(value)) {\n    base = ' ' + RegExp.prototype.toString.call(value);\n  }\n\n  // Make dates with properties first say the date\n  if (isDate(value)) {\n    base = ' ' + Date.prototype.toUTCString.call(value);\n  }\n\n  // Make error with message first say the error\n  if (isError(value)) {\n    base = ' ' + formatError(value);\n  }\n\n  if (keys.length === 0 && (!array || value.length == 0)) {\n    return braces[0] + base + braces[1];\n  }\n\n  if (recurseTimes < 0) {\n    if (isRegExp(value)) {\n      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');\n    } else {\n      return ctx.stylize('[Object]', 'special');\n    }\n  }\n\n  ctx.seen.push(value);\n\n  var output;\n  if (array) {\n    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);\n  } else {\n    output = keys.map(function(key) {\n      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);\n    });\n  }\n\n  ctx.seen.pop();\n\n  return reduceToSingleString(output, base, braces);\n}\n\n\nfunction formatPrimitive(ctx, value) {\n  if (isUndefined(value))\n    return ctx.stylize('undefined', 'undefined');\n  if (isString(value)) {\n    var simple = '\\'' + JSON.stringify(value).replace(/^\"|\"$/g, '')\n                                             .replace(/'/g, \"\\\\'\")\n                                             .replace(/\\\\\"/g, '\"') + '\\'';\n    return ctx.stylize(simple, 'string');\n  }\n  if (isNumber(value))\n    return ctx.stylize('' + value, 'number');\n  if (isBoolean(value))\n    return ctx.stylize('' + value, 'boolean');\n  // For some reason typeof null is \"object\", so special case here.\n  if (isNull(value))\n    return ctx.stylize('null', 'null');\n}\n\n\nfunction formatError(value) {\n  return '[' + Error.prototype.toString.call(value) + ']';\n}\n\n\nfunction formatArray(ctx, value, recurseTimes, visibleKeys, keys) {\n  var output = [];\n  for (var i = 0, l = value.length; i < l; ++i) {\n    if (hasOwnProperty(value, String(i))) {\n      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,\n          String(i), true));\n    } else {\n      output.push('');\n    }\n  }\n  keys.forEach(function(key) {\n    if (!key.match(/^\\d+$/)) {\n      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,\n          key, true));\n    }\n  });\n  return output;\n}\n\n\nfunction formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {\n  var name, str, desc;\n  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };\n  if (desc.get) {\n    if (desc.set) {\n      str = ctx.stylize('[Getter/Setter]', 'special');\n    } else {\n      str = ctx.stylize('[Getter]', 'special');\n    }\n  } else {\n    if (desc.set) {\n      str = ctx.stylize('[Setter]', 'special');\n    }\n  }\n  if (!hasOwnProperty(visibleKeys, key)) {\n    name = '[' + key + ']';\n  }\n  if (!str) {\n    if (ctx.seen.indexOf(desc.value) < 0) {\n      if (isNull(recurseTimes)) {\n        str = formatValue(ctx, desc.value, null);\n      } else {\n        str = formatValue(ctx, desc.value, recurseTimes - 1);\n      }\n      if (str.indexOf('\\n') > -1) {\n        if (array) {\n          str = str.split('\\n').map(function(line) {\n            return '  ' + line;\n          }).join('\\n').substr(2);\n        } else {\n          str = '\\n' + str.split('\\n').map(function(line) {\n            return '   ' + line;\n          }).join('\\n');\n        }\n      }\n    } else {\n      str = ctx.stylize('[Circular]', 'special');\n    }\n  }\n  if (isUndefined(name)) {\n    if (array && key.match(/^\\d+$/)) {\n      return str;\n    }\n    name = JSON.stringify('' + key);\n    if (name.match(/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)) {\n      name = name.substr(1, name.length - 2);\n      name = ctx.stylize(name, 'name');\n    } else {\n      name = name.replace(/'/g, \"\\\\'\")\n                 .replace(/\\\\\"/g, '\"')\n                 .replace(/(^\"|\"$)/g, \"'\");\n      name = ctx.stylize(name, 'string');\n    }\n  }\n\n  return name + ': ' + str;\n}\n\n\nfunction reduceToSingleString(output, base, braces) {\n  var numLinesEst = 0;\n  var length = output.reduce(function(prev, cur) {\n    numLinesEst++;\n    if (cur.indexOf('\\n') >= 0) numLinesEst++;\n    return prev + cur.replace(/\\u001b\\[\\d\\d?m/g, '').length + 1;\n  }, 0);\n\n  if (length > 60) {\n    return braces[0] +\n           (base === '' ? '' : base + '\\n ') +\n           ' ' +\n           output.join(',\\n  ') +\n           ' ' +\n           braces[1];\n  }\n\n  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];\n}\n\n\n// NOTE: These type checking functions intentionally don't use `instanceof`\n// because it is fragile and can be easily faked with `Object.create()`.\nfunction isArray(ar) {\n  return Array.isArray(ar);\n}\nexports.isArray = isArray;\n\nfunction isBoolean(arg) {\n  return typeof arg === 'boolean';\n}\nexports.isBoolean = isBoolean;\n\nfunction isNull(arg) {\n  return arg === null;\n}\nexports.isNull = isNull;\n\nfunction isNullOrUndefined(arg) {\n  return arg == null;\n}\nexports.isNullOrUndefined = isNullOrUndefined;\n\nfunction isNumber(arg) {\n  return typeof arg === 'number';\n}\nexports.isNumber = isNumber;\n\nfunction isString(arg) {\n  return typeof arg === 'string';\n}\nexports.isString = isString;\n\nfunction isSymbol(arg) {\n  return typeof arg === 'symbol';\n}\nexports.isSymbol = isSymbol;\n\nfunction isUndefined(arg) {\n  return arg === void 0;\n}\nexports.isUndefined = isUndefined;\n\nfunction isRegExp(re) {\n  return isObject(re) && objectToString(re) === '[object RegExp]';\n}\nexports.isRegExp = isRegExp;\n\nfunction isObject(arg) {\n  return typeof arg === 'object' && arg !== null;\n}\nexports.isObject = isObject;\n\nfunction isDate(d) {\n  return isObject(d) && objectToString(d) === '[object Date]';\n}\nexports.isDate = isDate;\n\nfunction isError(e) {\n  return isObject(e) &&\n      (objectToString(e) === '[object Error]' || e instanceof Error);\n}\nexports.isError = isError;\n\nfunction isFunction(arg) {\n  return typeof arg === 'function';\n}\nexports.isFunction = isFunction;\n\nfunction isPrimitive(arg) {\n  return arg === null ||\n         typeof arg === 'boolean' ||\n         typeof arg === 'number' ||\n         typeof arg === 'string' ||\n         typeof arg === 'symbol' ||  // ES6 symbol\n         typeof arg === 'undefined';\n}\nexports.isPrimitive = isPrimitive;\n\nexports.isBuffer = require('./support/isBuffer');\n\nfunction objectToString(o) {\n  return Object.prototype.toString.call(o);\n}\n\n\nfunction pad(n) {\n  return n < 10 ? '0' + n.toString(10) : n.toString(10);\n}\n\n\nvar months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',\n              'Oct', 'Nov', 'Dec'];\n\n// 26 Feb 16:19:34\nfunction timestamp() {\n  var d = new Date();\n  var time = [pad(d.getHours()),\n              pad(d.getMinutes()),\n              pad(d.getSeconds())].join(':');\n  return [d.getDate(), months[d.getMonth()], time].join(' ');\n}\n\n\n// log is just a thin wrapper to console.log that prepends a timestamp\nexports.log = function() {\n  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));\n};\n\n\n/**\n * Inherit the prototype methods from one constructor into another.\n *\n * The Function.prototype.inherits from lang.js rewritten as a standalone\n * function (not on Function.prototype). NOTE: If this file is to be loaded\n * during bootstrapping this function needs to be rewritten using some native\n * functions as prototype setup using normal JavaScript does not work as\n * expected during bootstrapping (see mirror.js in r114903).\n *\n * @param {function} ctor Constructor function which needs to inherit the\n *     prototype.\n * @param {function} superCtor Constructor function to inherit prototype from.\n */\nexports.inherits = require('inherits');\n\nexports._extend = function(origin, add) {\n  // Don't do anything if add isn't an object\n  if (!add || !isObject(add)) return origin;\n\n  var keys = Object.keys(add);\n  var i = keys.length;\n  while (i--) {\n    origin[keys[i]] = add[keys[i]];\n  }\n  return origin;\n};\n\nfunction hasOwnProperty(obj, prop) {\n  return Object.prototype.hasOwnProperty.call(obj, prop);\n}\n\n}).call(this,require('_process'),typeof global !== \"undefined\" ? global : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {})\n},{\"./support/isBuffer\":65,\"_process\":51,\"inherits\":48}],67:[function(require,module,exports){\n/* See LICENSE file for terms of use */\n\n/*\n * Text diff implementation.\n *\n * This library supports the following APIS:\n * JsDiff.diffChars: Character by character diff\n * JsDiff.diffWords: Word (as defined by \\b regex) diff which ignores whitespace\n * JsDiff.diffLines: Line based diff\n *\n * JsDiff.diffCss: Diff targeted at CSS content\n *\n * These methods are based on the implementation proposed in\n * \"An O(ND) Difference Algorithm and its Variations\" (Myers, 1986).\n * http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.4.6927\n */\n(function(global, undefined) {\n  var objectPrototypeToString = Object.prototype.toString;\n\n  /*istanbul ignore next*/\n  function map(arr, mapper, that) {\n    if (Array.prototype.map) {\n      return Array.prototype.map.call(arr, mapper, that);\n    }\n\n    var other = new Array(arr.length);\n\n    for (var i = 0, n = arr.length; i < n; i++) {\n      other[i] = mapper.call(that, arr[i], i, arr);\n    }\n    return other;\n  }\n  function clonePath(path) {\n    return { newPos: path.newPos, components: path.components.slice(0) };\n  }\n  function removeEmpty(array) {\n    var ret = [];\n    for (var i = 0; i < array.length; i++) {\n      if (array[i]) {\n        ret.push(array[i]);\n      }\n    }\n    return ret;\n  }\n  function escapeHTML(s) {\n    var n = s;\n    n = n.replace(/&/g, '&amp;');\n    n = n.replace(/</g, '&lt;');\n    n = n.replace(/>/g, '&gt;');\n    n = n.replace(/\"/g, '&quot;');\n\n    return n;\n  }\n\n  // This function handles the presence of circular references by bailing out when encountering an\n  // object that is already on the \"stack\" of items being processed.\n  function canonicalize(obj, stack, replacementStack) {\n    stack = stack || [];\n    replacementStack = replacementStack || [];\n\n    var i;\n\n    for (i = 0; i < stack.length; i += 1) {\n      if (stack[i] === obj) {\n        return replacementStack[i];\n      }\n    }\n\n    var canonicalizedObj;\n\n    if ('[object Array]' === objectPrototypeToString.call(obj)) {\n      stack.push(obj);\n      canonicalizedObj = new Array(obj.length);\n      replacementStack.push(canonicalizedObj);\n      for (i = 0; i < obj.length; i += 1) {\n        canonicalizedObj[i] = canonicalize(obj[i], stack, replacementStack);\n      }\n      stack.pop();\n      replacementStack.pop();\n    } else if (typeof obj === 'object' && obj !== null) {\n      stack.push(obj);\n      canonicalizedObj = {};\n      replacementStack.push(canonicalizedObj);\n      var sortedKeys = [],\n          key;\n      for (key in obj) {\n        sortedKeys.push(key);\n      }\n      sortedKeys.sort();\n      for (i = 0; i < sortedKeys.length; i += 1) {\n        key = sortedKeys[i];\n        canonicalizedObj[key] = canonicalize(obj[key], stack, replacementStack);\n      }\n      stack.pop();\n      replacementStack.pop();\n    } else {\n      canonicalizedObj = obj;\n    }\n    return canonicalizedObj;\n  }\n\n  function buildValues(components, newString, oldString, useLongestToken) {\n    var componentPos = 0,\n        componentLen = components.length,\n        newPos = 0,\n        oldPos = 0;\n\n    for (; componentPos < componentLen; componentPos++) {\n      var component = components[componentPos];\n      if (!component.removed) {\n        if (!component.added && useLongestToken) {\n          var value = newString.slice(newPos, newPos + component.count);\n          value = map(value, function(value, i) {\n            var oldValue = oldString[oldPos + i];\n            return oldValue.length > value.length ? oldValue : value;\n          });\n\n          component.value = value.join('');\n        } else {\n          component.value = newString.slice(newPos, newPos + component.count).join('');\n        }\n        newPos += component.count;\n\n        // Common case\n        if (!component.added) {\n          oldPos += component.count;\n        }\n      } else {\n        component.value = oldString.slice(oldPos, oldPos + component.count).join('');\n        oldPos += component.count;\n\n        // Reverse add and remove so removes are output first to match common convention\n        // The diffing algorithm is tied to add then remove output and this is the simplest\n        // route to get the desired output with minimal overhead.\n        if (componentPos && components[componentPos - 1].added) {\n          var tmp = components[componentPos - 1];\n          components[componentPos - 1] = components[componentPos];\n          components[componentPos] = tmp;\n        }\n      }\n    }\n\n    return components;\n  }\n\n  function Diff(ignoreWhitespace) {\n    this.ignoreWhitespace = ignoreWhitespace;\n  }\n  Diff.prototype = {\n    diff: function(oldString, newString, callback) {\n      var self = this;\n\n      function done(value) {\n        if (callback) {\n          setTimeout(function() { callback(undefined, value); }, 0);\n          return true;\n        } else {\n          return value;\n        }\n      }\n\n      // Handle the identity case (this is due to unrolling editLength == 0\n      if (newString === oldString) {\n        return done([{ value: newString }]);\n      }\n      if (!newString) {\n        return done([{ value: oldString, removed: true }]);\n      }\n      if (!oldString) {\n        return done([{ value: newString, added: true }]);\n      }\n\n      newString = this.tokenize(newString);\n      oldString = this.tokenize(oldString);\n\n      var newLen = newString.length, oldLen = oldString.length;\n      var editLength = 1;\n      var maxEditLength = newLen + oldLen;\n      var bestPath = [{ newPos: -1, components: [] }];\n\n      // Seed editLength = 0, i.e. the content starts with the same values\n      var oldPos = this.extractCommon(bestPath[0], newString, oldString, 0);\n      if (bestPath[0].newPos + 1 >= newLen && oldPos + 1 >= oldLen) {\n        // Identity per the equality and tokenizer\n        return done([{value: newString.join('')}]);\n      }\n\n      // Main worker method. checks all permutations of a given edit length for acceptance.\n      function execEditLength() {\n        for (var diagonalPath = -1 * editLength; diagonalPath <= editLength; diagonalPath += 2) {\n          var basePath;\n          var addPath = bestPath[diagonalPath - 1],\n              removePath = bestPath[diagonalPath + 1],\n              oldPos = (removePath ? removePath.newPos : 0) - diagonalPath;\n          if (addPath) {\n            // No one else is going to attempt to use this value, clear it\n            bestPath[diagonalPath - 1] = undefined;\n          }\n\n          var canAdd = addPath && addPath.newPos + 1 < newLen,\n              canRemove = removePath && 0 <= oldPos && oldPos < oldLen;\n          if (!canAdd && !canRemove) {\n            // If this path is a terminal then prune\n            bestPath[diagonalPath] = undefined;\n            continue;\n          }\n\n          // Select the diagonal that we want to branch from. We select the prior\n          // path whose position in the new string is the farthest from the origin\n          // and does not pass the bounds of the diff graph\n          if (!canAdd || (canRemove && addPath.newPos < removePath.newPos)) {\n            basePath = clonePath(removePath);\n            self.pushComponent(basePath.components, undefined, true);\n          } else {\n            basePath = addPath;   // No need to clone, we've pulled it from the list\n            basePath.newPos++;\n            self.pushComponent(basePath.components, true, undefined);\n          }\n\n          oldPos = self.extractCommon(basePath, newString, oldString, diagonalPath);\n\n          // If we have hit the end of both strings, then we are done\n          if (basePath.newPos + 1 >= newLen && oldPos + 1 >= oldLen) {\n            return done(buildValues(basePath.components, newString, oldString, self.useLongestToken));\n          } else {\n            // Otherwise track this path as a potential candidate and continue.\n            bestPath[diagonalPath] = basePath;\n          }\n        }\n\n        editLength++;\n      }\n\n      // Performs the length of edit iteration. Is a bit fugly as this has to support the\n      // sync and async mode which is never fun. Loops over execEditLength until a value\n      // is produced.\n      if (callback) {\n        (function exec() {\n          setTimeout(function() {\n            // This should not happen, but we want to be safe.\n            /*istanbul ignore next */\n            if (editLength > maxEditLength) {\n              return callback();\n            }\n\n            if (!execEditLength()) {\n              exec();\n            }\n          }, 0);\n        }());\n      } else {\n        while (editLength <= maxEditLength) {\n          var ret = execEditLength();\n          if (ret) {\n            return ret;\n          }\n        }\n      }\n    },\n\n    pushComponent: function(components, added, removed) {\n      var last = components[components.length - 1];\n      if (last && last.added === added && last.removed === removed) {\n        // We need to clone here as the component clone operation is just\n        // as shallow array clone\n        components[components.length - 1] = {count: last.count + 1, added: added, removed: removed };\n      } else {\n        components.push({count: 1, added: added, removed: removed });\n      }\n    },\n    extractCommon: function(basePath, newString, oldString, diagonalPath) {\n      var newLen = newString.length,\n          oldLen = oldString.length,\n          newPos = basePath.newPos,\n          oldPos = newPos - diagonalPath,\n\n          commonCount = 0;\n      while (newPos + 1 < newLen && oldPos + 1 < oldLen && this.equals(newString[newPos + 1], oldString[oldPos + 1])) {\n        newPos++;\n        oldPos++;\n        commonCount++;\n      }\n\n      if (commonCount) {\n        basePath.components.push({count: commonCount});\n      }\n\n      basePath.newPos = newPos;\n      return oldPos;\n    },\n\n    equals: function(left, right) {\n      var reWhitespace = /\\S/;\n      return left === right || (this.ignoreWhitespace && !reWhitespace.test(left) && !reWhitespace.test(right));\n    },\n    tokenize: function(value) {\n      return value.split('');\n    }\n  };\n\n  var CharDiff = new Diff();\n\n  var WordDiff = new Diff(true);\n  var WordWithSpaceDiff = new Diff();\n  WordDiff.tokenize = WordWithSpaceDiff.tokenize = function(value) {\n    return removeEmpty(value.split(/(\\s+|\\b)/));\n  };\n\n  var CssDiff = new Diff(true);\n  CssDiff.tokenize = function(value) {\n    return removeEmpty(value.split(/([{}:;,]|\\s+)/));\n  };\n\n  var LineDiff = new Diff();\n\n  var TrimmedLineDiff = new Diff();\n  TrimmedLineDiff.ignoreTrim = true;\n\n  LineDiff.tokenize = TrimmedLineDiff.tokenize = function(value) {\n    var retLines = [],\n        lines = value.split(/^/m);\n    for (var i = 0; i < lines.length; i++) {\n      var line = lines[i],\n          lastLine = lines[i - 1],\n          lastLineLastChar = lastLine && lastLine[lastLine.length - 1];\n\n      // Merge lines that may contain windows new lines\n      if (line === '\\n' && lastLineLastChar === '\\r') {\n          retLines[retLines.length - 1] = retLines[retLines.length - 1].slice(0, -1) + '\\r\\n';\n      } else {\n        if (this.ignoreTrim) {\n          line = line.trim();\n          // add a newline unless this is the last line.\n          if (i < lines.length - 1) {\n            line += '\\n';\n          }\n        }\n        retLines.push(line);\n      }\n    }\n\n    return retLines;\n  };\n\n  var PatchDiff = new Diff();\n  PatchDiff.tokenize = function(value) {\n    var ret = [],\n        linesAndNewlines = value.split(/(\\n|\\r\\n)/);\n\n    // Ignore the final empty token that occurs if the string ends with a new line\n    if (!linesAndNewlines[linesAndNewlines.length - 1]) {\n      linesAndNewlines.pop();\n    }\n\n    // Merge the content and line separators into single tokens\n    for (var i = 0; i < linesAndNewlines.length; i++) {\n      var line = linesAndNewlines[i];\n\n      if (i % 2) {\n        ret[ret.length - 1] += line;\n      } else {\n        ret.push(line);\n      }\n    }\n    return ret;\n  };\n\n  var SentenceDiff = new Diff();\n  SentenceDiff.tokenize = function(value) {\n    return removeEmpty(value.split(/(\\S.+?[.!?])(?=\\s+|$)/));\n  };\n\n  var JsonDiff = new Diff();\n  // Discriminate between two lines of pretty-printed, serialized JSON where one of them has a\n  // dangling comma and the other doesn't. Turns out including the dangling comma yields the nicest output:\n  JsonDiff.useLongestToken = true;\n  JsonDiff.tokenize = LineDiff.tokenize;\n  JsonDiff.equals = function(left, right) {\n    return LineDiff.equals(left.replace(/,([\\r\\n])/g, '$1'), right.replace(/,([\\r\\n])/g, '$1'));\n  };\n\n  var JsDiff = {\n    Diff: Diff,\n\n    diffChars: function(oldStr, newStr, callback) { return CharDiff.diff(oldStr, newStr, callback); },\n    diffWords: function(oldStr, newStr, callback) { return WordDiff.diff(oldStr, newStr, callback); },\n    diffWordsWithSpace: function(oldStr, newStr, callback) { return WordWithSpaceDiff.diff(oldStr, newStr, callback); },\n    diffLines: function(oldStr, newStr, callback) { return LineDiff.diff(oldStr, newStr, callback); },\n    diffTrimmedLines: function(oldStr, newStr, callback) { return TrimmedLineDiff.diff(oldStr, newStr, callback); },\n\n    diffSentences: function(oldStr, newStr, callback) { return SentenceDiff.diff(oldStr, newStr, callback); },\n\n    diffCss: function(oldStr, newStr, callback) { return CssDiff.diff(oldStr, newStr, callback); },\n    diffJson: function(oldObj, newObj, callback) {\n      return JsonDiff.diff(\n        typeof oldObj === 'string' ? oldObj : JSON.stringify(canonicalize(oldObj), undefined, '  '),\n        typeof newObj === 'string' ? newObj : JSON.stringify(canonicalize(newObj), undefined, '  '),\n        callback\n      );\n    },\n\n    createTwoFilesPatch: function(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader) {\n      var ret = [];\n\n      if (oldFileName == newFileName) {\n        ret.push('Index: ' + oldFileName);\n      }\n      ret.push('===================================================================');\n      ret.push('--- ' + oldFileName + (typeof oldHeader === 'undefined' ? '' : '\\t' + oldHeader));\n      ret.push('+++ ' + newFileName + (typeof newHeader === 'undefined' ? '' : '\\t' + newHeader));\n\n      var diff = PatchDiff.diff(oldStr, newStr);\n      diff.push({value: '', lines: []});   // Append an empty value to make cleanup easier\n\n      // Formats a given set of lines for printing as context lines in a patch\n      function contextLines(lines) {\n        return map(lines, function(entry) { return ' ' + entry; });\n      }\n\n      // Outputs the no newline at end of file warning if needed\n      function eofNL(curRange, i, current) {\n        var last = diff[diff.length - 2],\n            isLast = i === diff.length - 2,\n            isLastOfType = i === diff.length - 3 && current.added !== last.added;\n\n        // Figure out if this is the last line for the given file and missing NL\n        if (!(/\\n$/.test(current.value)) && (isLast || isLastOfType)) {\n          curRange.push('\\\\ No newline at end of file');\n        }\n      }\n\n      var oldRangeStart = 0, newRangeStart = 0, curRange = [],\n          oldLine = 1, newLine = 1;\n      for (var i = 0; i < diff.length; i++) {\n        var current = diff[i],\n            lines = current.lines || current.value.replace(/\\n$/, '').split('\\n');\n        current.lines = lines;\n\n        if (current.added || current.removed) {\n          // If we have previous context, start with that\n          if (!oldRangeStart) {\n            var prev = diff[i - 1];\n            oldRangeStart = oldLine;\n            newRangeStart = newLine;\n\n            if (prev) {\n              curRange = contextLines(prev.lines.slice(-4));\n              oldRangeStart -= curRange.length;\n              newRangeStart -= curRange.length;\n            }\n          }\n\n          // Output our changes\n          curRange.push.apply(curRange, map(lines, function(entry) {\n            return (current.added ? '+' : '-') + entry;\n          }));\n          eofNL(curRange, i, current);\n\n          // Track the updated file position\n          if (current.added) {\n            newLine += lines.length;\n          } else {\n            oldLine += lines.length;\n          }\n        } else {\n          // Identical context lines. Track line changes\n          if (oldRangeStart) {\n            // Close out any changes that have been output (or join overlapping)\n            if (lines.length <= 8 && i < diff.length - 2) {\n              // Overlapping\n              curRange.push.apply(curRange, contextLines(lines));\n            } else {\n              // end the range and output\n              var contextSize = Math.min(lines.length, 4);\n              ret.push(\n                  '@@ -' + oldRangeStart + ',' + (oldLine - oldRangeStart + contextSize)\n                  + ' +' + newRangeStart + ',' + (newLine - newRangeStart + contextSize)\n                  + ' @@');\n              ret.push.apply(ret, curRange);\n              ret.push.apply(ret, contextLines(lines.slice(0, contextSize)));\n              if (lines.length <= 4) {\n                eofNL(ret, i, current);\n              }\n\n              oldRangeStart = 0;\n              newRangeStart = 0;\n              curRange = [];\n            }\n          }\n          oldLine += lines.length;\n          newLine += lines.length;\n        }\n      }\n\n      return ret.join('\\n') + '\\n';\n    },\n\n    createPatch: function(fileName, oldStr, newStr, oldHeader, newHeader) {\n      return JsDiff.createTwoFilesPatch(fileName, fileName, oldStr, newStr, oldHeader, newHeader);\n    },\n\n    applyPatch: function(oldStr, uniDiff) {\n      var diffstr = uniDiff.split('\\n'),\n          hunks = [],\n          i = 0,\n          remEOFNL = false,\n          addEOFNL = false;\n\n      // Skip to the first change hunk\n      while (i < diffstr.length && !(/^@@/.test(diffstr[i]))) {\n        i++;\n      }\n\n      // Parse the unified diff\n      for (; i < diffstr.length; i++) {\n        if (diffstr[i][0] === '@') {\n          var chnukHeader = diffstr[i].split(/@@ -(\\d+),(\\d+) \\+(\\d+),(\\d+) @@/);\n          hunks.unshift({\n            start: chnukHeader[3],\n            oldlength: +chnukHeader[2],\n            removed: [],\n            newlength: chnukHeader[4],\n            added: []\n          });\n        } else if (diffstr[i][0] === '+') {\n          hunks[0].added.push(diffstr[i].substr(1));\n        } else if (diffstr[i][0] === '-') {\n          hunks[0].removed.push(diffstr[i].substr(1));\n        } else if (diffstr[i][0] === ' ') {\n          hunks[0].added.push(diffstr[i].substr(1));\n          hunks[0].removed.push(diffstr[i].substr(1));\n        } else if (diffstr[i][0] === '\\\\') {\n          if (diffstr[i - 1][0] === '+') {\n            remEOFNL = true;\n          } else if (diffstr[i - 1][0] === '-') {\n            addEOFNL = true;\n          }\n        }\n      }\n\n      // Apply the diff to the input\n      var lines = oldStr.split('\\n');\n      for (i = hunks.length - 1; i >= 0; i--) {\n        var hunk = hunks[i];\n        // Sanity check the input string. Bail if we don't match.\n        for (var j = 0; j < hunk.oldlength; j++) {\n          if (lines[hunk.start - 1 + j] !== hunk.removed[j]) {\n            return false;\n          }\n        }\n        Array.prototype.splice.apply(lines, [hunk.start - 1, hunk.oldlength].concat(hunk.added));\n      }\n\n      // Handle EOFNL insertion/removal\n      if (remEOFNL) {\n        while (!lines[lines.length - 1]) {\n          lines.pop();\n        }\n      } else if (addEOFNL) {\n        lines.push('');\n      }\n      return lines.join('\\n');\n    },\n\n    convertChangesToXML: function(changes) {\n      var ret = [];\n      for (var i = 0; i < changes.length; i++) {\n        var change = changes[i];\n        if (change.added) {\n          ret.push('<ins>');\n        } else if (change.removed) {\n          ret.push('<del>');\n        }\n\n        ret.push(escapeHTML(change.value));\n\n        if (change.added) {\n          ret.push('</ins>');\n        } else if (change.removed) {\n          ret.push('</del>');\n        }\n      }\n      return ret.join('');\n    },\n\n    // See: http://code.google.com/p/google-diff-match-patch/wiki/API\n    convertChangesToDMP: function(changes) {\n      var ret = [],\n          change,\n          operation;\n      for (var i = 0; i < changes.length; i++) {\n        change = changes[i];\n        if (change.added) {\n          operation = 1;\n        } else if (change.removed) {\n          operation = -1;\n        } else {\n          operation = 0;\n        }\n\n        ret.push([operation, change.value]);\n      }\n      return ret;\n    },\n\n    canonicalize: canonicalize\n  };\n\n  /*istanbul ignore next */\n  /*global module */\n  if (typeof module !== 'undefined' && module.exports) {\n    module.exports = JsDiff;\n  } else if (typeof define === 'function' && define.amd) {\n    /*global define */\n    define([], function() { return JsDiff; });\n  } else if (typeof global.JsDiff === 'undefined') {\n    global.JsDiff = JsDiff;\n  }\n}(this));\n\n},{}],68:[function(require,module,exports){\n'use strict';\n\nvar matchOperatorsRe = /[|\\\\{}()[\\]^$+*?.]/g;\n\nmodule.exports = function (str) {\n\tif (typeof str !== 'string') {\n\t\tthrow new TypeError('Expected a string');\n\t}\n\n\treturn str.replace(matchOperatorsRe,  '\\\\$&');\n};\n\n},{}],69:[function(require,module,exports){\n(function (process){\n// Growl - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)\n\n/**\n * Module dependencies.\n */\n\nvar exec = require('child_process').exec\n  , fs = require('fs')\n  , path = require('path')\n  , exists = fs.existsSync || path.existsSync\n  , os = require('os')\n  , quote = JSON.stringify\n  , cmd;\n\nfunction which(name) {\n  var paths = process.env.PATH.split(':');\n  var loc;\n  \n  for (var i = 0, len = paths.length; i < len; ++i) {\n    loc = path.join(paths[i], name);\n    if (exists(loc)) return loc;\n  }\n}\n\nswitch(os.type()) {\n  case 'Darwin':\n    if (which('terminal-notifier')) {\n      cmd = {\n          type: \"Darwin-NotificationCenter\"\n        , pkg: \"terminal-notifier\"\n        , msg: '-message'\n        , title: '-title'\n        , subtitle: '-subtitle'\n        , priority: {\n              cmd: '-execute'\n            , range: []\n          }\n      };\n    } else {\n      cmd = {\n          type: \"Darwin-Growl\"\n        , pkg: \"growlnotify\"\n        , msg: '-m'\n        , sticky: '--sticky'\n        , priority: {\n              cmd: '--priority'\n            , range: [\n                -2\n              , -1\n              , 0\n              , 1\n              , 2\n              , \"Very Low\"\n              , \"Moderate\"\n              , \"Normal\"\n              , \"High\"\n              , \"Emergency\"\n            ]\n          }\n      };\n    }\n    break;\n  case 'Linux':\n    cmd = {\n        type: \"Linux\"\n      , pkg: \"notify-send\"\n      , msg: ''\n      , sticky: '-t 0'\n      , icon: '-i'\n      , priority: {\n          cmd: '-u'\n        , range: [\n            \"low\"\n          , \"normal\"\n          , \"critical\"\n        ]\n      }\n    };\n    break;\n  case 'Windows_NT':\n    cmd = {\n        type: \"Windows\"\n      , pkg: \"growlnotify\"\n      , msg: ''\n      , sticky: '/s:true'\n      , title: '/t:'\n      , icon: '/i:'\n      , priority: {\n            cmd: '/p:'\n          , range: [\n              -2\n            , -1\n            , 0\n            , 1\n            , 2\n          ]\n        }\n    };\n    break;\n}\n\n/**\n * Expose `growl`.\n */\n\nexports = module.exports = growl;\n\n/**\n * Node-growl version.\n */\n\nexports.version = '1.4.1'\n\n/**\n * Send growl notification _msg_ with _options_.\n *\n * Options:\n *\n *  - title   Notification title\n *  - sticky  Make the notification stick (defaults to false)\n *  - priority  Specify an int or named key (default is 0)\n *  - name    Application name (defaults to growlnotify)\n *  - image\n *    - path to an icon sets --iconpath\n *    - path to an image sets --image\n *    - capitalized word sets --appIcon\n *    - filename uses extname as --icon\n *    - otherwise treated as --icon\n *\n * Examples:\n *\n *   growl('New email')\n *   growl('5 new emails', { title: 'Thunderbird' })\n *   growl('Email sent', function(){\n *     // ... notification sent\n *   })\n *\n * @param {string} msg\n * @param {object} options\n * @param {function} fn\n * @api public\n */\n\nfunction growl(msg, options, fn) {\n  var image\n    , args\n    , options = options || {}\n    , fn = fn || function(){};\n\n  // noop\n  if (!cmd) return fn(new Error('growl not supported on this platform'));\n  args = [cmd.pkg];\n\n  // image\n  if (image = options.image) {\n    switch(cmd.type) {\n      case 'Darwin-Growl':\n        var flag, ext = path.extname(image).substr(1)\n        flag = flag || ext == 'icns' && 'iconpath'\n        flag = flag || /^[A-Z]/.test(image) && 'appIcon'\n        flag = flag || /^png|gif|jpe?g$/.test(ext) && 'image'\n        flag = flag || ext && (image = ext) && 'icon'\n        flag = flag || 'icon'\n        args.push('--' + flag, quote(image))\n        break;\n      case 'Linux':\n        args.push(cmd.icon, quote(image));\n        // libnotify defaults to sticky, set a hint for transient notifications\n        if (!options.sticky) args.push('--hint=int:transient:1');\n        break;\n      case 'Windows':\n        args.push(cmd.icon + quote(image));\n        break;\n    }\n  }\n\n  // sticky\n  if (options.sticky) args.push(cmd.sticky);\n\n  // priority\n  if (options.priority) {\n    var priority = options.priority + '';\n    var checkindexOf = cmd.priority.range.indexOf(priority);\n    if (~cmd.priority.range.indexOf(priority)) {\n      args.push(cmd.priority, options.priority);\n    }\n  }\n\n  // name\n  if (options.name && cmd.type === \"Darwin-Growl\") {\n    args.push('--name', options.name);\n  }\n\n  switch(cmd.type) {\n    case 'Darwin-Growl':\n      args.push(cmd.msg);\n      args.push(quote(msg));\n      if (options.title) args.push(quote(options.title));\n      break;\n    case 'Darwin-NotificationCenter':\n      args.push(cmd.msg);\n      args.push(quote(msg));\n      if (options.title) {\n        args.push(cmd.title);\n        args.push(quote(options.title));\n      }\n      if (options.subtitle) {\n        args.push(cmd.subtitle);\n        args.push(quote(options.subtitle));\n      }\n      break;\n    case 'Darwin-Growl':\n      args.push(cmd.msg);\n      args.push(quote(msg));\n      if (options.title) args.push(quote(options.title));\n      break;\n    case 'Linux':\n      if (options.title) {\n        args.push(quote(options.title));\n        args.push(cmd.msg);\n        args.push(quote(msg));\n      } else {\n        args.push(quote(msg));\n      }\n      break;\n    case 'Windows':\n      args.push(quote(msg));\n      if (options.title) args.push(cmd.title + quote(options.title));\n      break;\n  }\n\n  // execute\n  exec(args.join(' '), fn);\n};\n\n}).call(this,require('_process'))\n},{\"_process\":51,\"child_process\":41,\"fs\":41,\"os\":50,\"path\":41}],70:[function(require,module,exports){\n(function (process){\nvar path = require('path');\nvar fs = require('fs');\nvar _0777 = parseInt('0777', 8);\n\nmodule.exports = mkdirP.mkdirp = mkdirP.mkdirP = mkdirP;\n\nfunction mkdirP (p, opts, f, made) {\n    if (typeof opts === 'function') {\n        f = opts;\n        opts = {};\n    }\n    else if (!opts || typeof opts !== 'object') {\n        opts = { mode: opts };\n    }\n    \n    var mode = opts.mode;\n    var xfs = opts.fs || fs;\n    \n    if (mode === undefined) {\n        mode = _0777 & (~process.umask());\n    }\n    if (!made) made = null;\n    \n    var cb = f || function () {};\n    p = path.resolve(p);\n    \n    xfs.mkdir(p, mode, function (er) {\n        if (!er) {\n            made = made || p;\n            return cb(null, made);\n        }\n        switch (er.code) {\n            case 'ENOENT':\n                mkdirP(path.dirname(p), opts, function (er, made) {\n                    if (er) cb(er, made);\n                    else mkdirP(p, opts, cb, made);\n                });\n                break;\n\n            // In the case of any other error, just see if there's a dir\n            // there already.  If so, then hooray!  If not, then something\n            // is borked.\n            default:\n                xfs.stat(p, function (er2, stat) {\n                    // if the stat fails, then that's super weird.\n                    // let the original error be the failure reason.\n                    if (er2 || !stat.isDirectory()) cb(er, made)\n                    else cb(null, made);\n                });\n                break;\n        }\n    });\n}\n\nmkdirP.sync = function sync (p, opts, made) {\n    if (!opts || typeof opts !== 'object') {\n        opts = { mode: opts };\n    }\n    \n    var mode = opts.mode;\n    var xfs = opts.fs || fs;\n    \n    if (mode === undefined) {\n        mode = _0777 & (~process.umask());\n    }\n    if (!made) made = null;\n\n    p = path.resolve(p);\n\n    try {\n        xfs.mkdirSync(p, mode);\n        made = made || p;\n    }\n    catch (err0) {\n        switch (err0.code) {\n            case 'ENOENT' :\n                made = sync(path.dirname(p), opts, made);\n                sync(p, opts, made);\n                break;\n\n            // In the case of any other error, just see if there's a dir\n            // there already.  If so, then hooray!  If not, then something\n            // is borked.\n            default:\n                var stat;\n                try {\n                    stat = xfs.statSync(p);\n                }\n                catch (err1) {\n                    throw err0;\n                }\n                if (!stat.isDirectory()) throw err0;\n                break;\n        }\n    }\n\n    return made;\n};\n\n}).call(this,require('_process'))\n},{\"_process\":51,\"fs\":41,\"path\":41}],71:[function(require,module,exports){\n(function (process,global){\n/**\n * Shim process.stdout.\n */\n\nprocess.stdout = require('browser-stdout')();\n\nvar Mocha = require('../');\n\n/**\n * Create a Mocha instance.\n *\n * @return {undefined}\n */\n\nvar mocha = new Mocha({ reporter: 'html' });\n\n/**\n * Save timer references to avoid Sinon interfering (see GH-237).\n */\n\nvar Date = global.Date;\nvar setTimeout = global.setTimeout;\nvar setInterval = global.setInterval;\nvar clearTimeout = global.clearTimeout;\nvar clearInterval = global.clearInterval;\n\nvar uncaughtExceptionHandlers = [];\n\nvar originalOnerrorHandler = global.onerror;\n\n/**\n * Remove uncaughtException listener.\n * Revert to original onerror handler if previously defined.\n */\n\nprocess.removeListener = function(e, fn){\n  if ('uncaughtException' == e) {\n    if (originalOnerrorHandler) {\n      global.onerror = originalOnerrorHandler;\n    } else {\n      global.onerror = function() {};\n    }\n    var i = Mocha.utils.indexOf(uncaughtExceptionHandlers, fn);\n    if (i != -1) { uncaughtExceptionHandlers.splice(i, 1); }\n  }\n};\n\n/**\n * Implements uncaughtException listener.\n */\n\nprocess.on = function(e, fn){\n  if ('uncaughtException' == e) {\n    global.onerror = function(err, url, line){\n      fn(new Error(err + ' (' + url + ':' + line + ')'));\n      return !mocha.allowUncaught;\n    };\n    uncaughtExceptionHandlers.push(fn);\n  }\n};\n\n// The BDD UI is registered by default, but no UI will be functional in the\n// browser without an explicit call to the overridden `mocha.ui` (see below).\n// Ensure that this default UI does not expose its methods to the global scope.\nmocha.suite.removeAllListeners('pre-require');\n\nvar immediateQueue = []\n  , immediateTimeout;\n\nfunction timeslice() {\n  var immediateStart = new Date().getTime();\n  while (immediateQueue.length && (new Date().getTime() - immediateStart) < 100) {\n    immediateQueue.shift()();\n  }\n  if (immediateQueue.length) {\n    immediateTimeout = setTimeout(timeslice, 0);\n  } else {\n    immediateTimeout = null;\n  }\n}\n\n/**\n * High-performance override of Runner.immediately.\n */\n\nMocha.Runner.immediately = function(callback) {\n  immediateQueue.push(callback);\n  if (!immediateTimeout) {\n    immediateTimeout = setTimeout(timeslice, 0);\n  }\n};\n\n/**\n * Function to allow assertion libraries to throw errors directly into mocha.\n * This is useful when running tests in a browser because window.onerror will\n * only receive the 'message' attribute of the Error.\n */\nmocha.throwError = function(err) {\n  Mocha.utils.forEach(uncaughtExceptionHandlers, function (fn) {\n    fn(err);\n  });\n  throw err;\n};\n\n/**\n * Override ui to ensure that the ui functions are initialized.\n * Normally this would happen in Mocha.prototype.loadFiles.\n */\n\nmocha.ui = function(ui){\n  Mocha.prototype.ui.call(this, ui);\n  this.suite.emit('pre-require', global, null, this);\n  return this;\n};\n\n/**\n * Setup mocha with the given setting options.\n */\n\nmocha.setup = function(opts){\n  if ('string' == typeof opts) opts = { ui: opts };\n  for (var opt in opts) this[opt](opts[opt]);\n  return this;\n};\n\n/**\n * Run mocha, returning the Runner.\n */\n\nmocha.run = function(fn){\n  var options = mocha.options;\n  mocha.globals('location');\n\n  var query = Mocha.utils.parseQuery(global.location.search || '');\n  if (query.grep) mocha.grep(new RegExp(query.grep));\n  if (query.fgrep) mocha.grep(query.fgrep);\n  if (query.invert) mocha.invert();\n\n  return Mocha.prototype.run.call(mocha, function(err){\n    // The DOM Document is not available in Web Workers.\n    var document = global.document;\n    if (document && document.getElementById('mocha') && options.noHighlighting !== true) {\n      Mocha.utils.highlightTags('code');\n    }\n    if (fn) fn(err);\n  });\n};\n\n/**\n * Expose the process shim.\n * https://github.com/mochajs/mocha/pull/916\n */\n\nMocha.process = process;\n\n/**\n * Expose mocha.\n */\n\nglobal.Mocha = Mocha;\nglobal.mocha = mocha;\n\n}).call(this,require('_process'),typeof global !== \"undefined\" ? global : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {})\n},{\"../\":1,\"_process\":51,\"browser-stdout\":40}]},{},[71]);\n"

/***/ }
/******/ ]);