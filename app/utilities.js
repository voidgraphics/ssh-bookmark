#!/usr/bin/env node
// jshint esversion:6, laxbreak:true

module.exports = {
	
	exitGraceful: function(exitCode = 0) {
		process.exitCode = exitCode;
	},

	spaceLog(message) {
		console.log('');
		this.log(message);
		console.log('');
	},

	log(message) {
		console.log(`🚀  ${message}`);
	}
	
};
