#!/usr/bin/env node
'use strict';

// jshint esversion:6, laxbreak:true

module.exports = {

	exitGraceful: function exitGraceful() {
		var exitCode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

		process.exitCode = exitCode;
	},

	spaceLog: function spaceLog(message) {
		console.log('');
		this.log(message);
		console.log('');
	},
	log: function log(message) {
		console.log('\uD83D\uDE80  ' + message);
	}
};