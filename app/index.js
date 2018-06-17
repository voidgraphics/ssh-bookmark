#!/usr/bin/env node
// jshint esversion:6, -W030

import App from './App.js';
import yargs from 'yargs';
import inquirer from 'inquirer';
import pkg from '../package.json';
import utils from './utilities';

let options = {};

function startApp() {
	new App(options);
	utils.exitGraceful();
}

function getOptions() {
	
	let argv = yargs
		.version(pkg.version)
		.usage(`Usage: ssh-connect`)
		.option('add', {
			alias: 'a',
			description: 'Bookmark a host (eg: ssh-connect -a root@host.com)',
			type: 'string'
		})
		.option('remove', {
			alias: 'r',
			description: 'Remove a bookmark (eg: ssh-connect -r name-of-bookmark)',
			type: 'string'
		})
		.option('bookmark', {
			alias: [
				'b',
			],
			description: 'Connect to the specified bookmark directly',
			type: 'string',
		})
		.alias('h', 'help')
		.help('h', 'Show help.')
		.argv;
	
	options = {
		bookmark: argv.bookmark,
		add: argv.add,
		remove: argv.remove
	};
	
	startApp();
	
}

getOptions();
