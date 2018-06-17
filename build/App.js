'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _utilities = require('./utilities.js');

var _utilities2 = _interopRequireDefault(_utilities);

var _underscore = require('underscore');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _ssh2Client = require('ssh2-client');

var _ssh2Client2 = _interopRequireDefault(_ssh2Client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
    function App(options) {
        _classCallCheck(this, App);

        _utilities2.default.spaceLog('Welcome to ssh-connect!');

        this.loadBookmarks();

        if (options.bookmark) {
            this.start(this.bookmarks[options.bookmark]);
        } else if (options.add) {
            this.saveBookmark(options.add);
        } else if (options.remove) {
            this.removeBookmark(options.remove);
        } else {
            this.showBookmarks();
        }
    }

    _createClass(App, [{
        key: 'loadBookmarks',
        value: function loadBookmarks() {
            var rawdata = _fs2.default.readFileSync(__dirname + '/../bookmarks.json');
            var bookmarks = JSON.parse(rawdata);
            this.bookmarks = bookmarks || {};
        }
    }, {
        key: 'saveBookmarks',
        value: function saveBookmarks() {
            var json = JSON.stringify(this.bookmarks);
            _fs2.default.writeFile(__dirname + '/../bookmarks.json', json, 'utf8', function (err) {
                if (err) throw err;
                _utilities2.default.spaceLog('Done!');
            });
        }
    }, {
        key: 'showBookmarks',
        value: function showBookmarks() {
            var _this = this;

            if (!(0, _underscore.size)(this.bookmarks)) {
                console.log('Looks like you don\'t have any bookmarks yet!');
                console.log('Run ssh-connect -a user@host.example to add a bookmark,');
                console.log('or do ssh-connect -h for more information.');
                return;
            }
            var choices = this.getChoices();
            _inquirer2.default.prompt([{
                type: 'list',
                name: 'bookmark',
                message: 'Which connection would you like to start?',
                choices: choices
            }]).then(function (answer) {
                _this.start(answer.bookmark);
            });
        }
    }, {
        key: 'saveBookmark',
        value: function saveBookmark(host) {
            var _this2 = this;

            _inquirer2.default.prompt([{
                type: 'input',
                name: 'name',
                message: 'Enter a name for your bookmark (' + host + ')'
            }]).then(function (answer) {
                _this2.bookmarks[answer.name] = host;
                _this2.saveBookmarks();
            });
        }
    }, {
        key: 'removeBookmark',
        value: function removeBookmark(name) {
            var _this3 = this;

            console.log(_chalk2.default.red('You are about to delete this bookmark: ') + name + ' (' + this.bookmarks[name] + ')');
            console.log('');
            _inquirer2.default.prompt([{
                type: 'confirm',
                name: 'confirmed',
                message: 'Are you sure you want to continue?'
            }]).then(function (answer) {
                if (answer.confirmed) {
                    delete _this3.bookmarks[name];
                    _this3.saveBookmarks();
                } else {
                    console.log('Aborted.');
                    _this3.sayBye();
                }
            });
        }
    }, {
        key: 'getChoices',
        value: function getChoices() {
            var choices = [];
            (0, _underscore.each)(this.bookmarks, function (value, name) {
                choices.push({ name: name, value: value });
            });
            return choices;
        }
    }, {
        key: 'start',
        value: function start(host) {
            var _this4 = this;

            _ssh2Client2.default.shell(host, {
                askPassword: true
            }).then(function () {
                return _this4.sayBye();
            }).catch(function (err) {
                return console.error(err);
            });
        }
    }, {
        key: 'sayBye',
        value: function sayBye() {
            _utilities2.default.spaceLog('Bye!');
        }
    }]);

    return App;
}();

exports.default = App;