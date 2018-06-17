#!/usr/bin/env node
'use strict';

var _App = require('./App.js');

var _App2 = _interopRequireDefault(_App);

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _utilities = require('./utilities');

var _utilities2 = _interopRequireDefault(_utilities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = {};
// jshint esversion:6, -W030

function startApp() {
	new _App2.default(options);
	_utilities2.default.exitGraceful();
}

function getOptions() {

	var argv = _yargs2.default.version(_package2.default.version).usage('Usage: ssh-bookmark').option('add', {
		alias: 'a',
		description: 'Bookmark a host (eg: ssh-bookmark -a root@host.com)',
		type: 'string'
	}).option('remove', {
		alias: 'r',
		description: 'Remove a bookmark (eg: ssh-bookmark -r name-of-bookmark)',
		type: 'string'
	}).option('bookmark', {
		alias: ['b'],
		description: 'Connect to the specified bookmark directly',
		type: 'string'
	}).alias('h', 'help').help('h', 'Show help.').argv;

	options = {
		bookmark: argv.bookmark,
		add: argv.add,
		remove: argv.remove
	};

	startApp();
}

getOptions();