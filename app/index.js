#!/usr/bin/env node
// jshint esversion:6, -W030

import fs from 'fs-extra';
import colors from 'colors';
import yargs from 'yargs';

import pkg from '../package.json';
import utilities from './utilities';

let options = {};

function startApp() {
	
	utilities.title('Starting boilerplate');
	
	if (utilities.dirExists(options.directory)) {
		
		utilities.o('log', 'Hello.'.green);
		utilities.o(
			'log',
			options.directory,
			options.foo,
			options.baz,
			options.other
		);
		utilities.o('log', 'Goodbye.'.red);
		
	} else {
		
		utilities.o('log', `Chosen directory does not exist: ${options.directory}`.red.bold);
		utilities.o('log', 'Double check your path and try again'.toUpperCase().rainbow);
		
	}
	
	utilities.exitGraceful();
	
}

function getOptions() {
	
	let argv = yargs
		.version(pkg.version)
		.usage(`Usage: ssh-connect [name-of-bookmark]`)
		.boolean([
			'foo',
			'baz'
		])
		.option('foo', {
			alias: [
				'f',
			],
			description: 'Create foo text files?',
			type: 'boolean',
		})
		.option('baz', {
			alias: [
				'b',
			],
			description: 'What will this option do?',
			type: 'boolean',
		})
		.option('other', {
			alias: [
				'o',
			],
			description: 'Some other option?',
			type: 'number',
			default: 3,
		})
		.option('directory', {
			alias: [
				'd',
			],
			description: 'A directory!',
			type: 'string',
			demand: true,
		})
		.alias('h', 'help')
		.help('h', 'Show help.')
		.argv;
	
	options = {
		directory: fs.realpathSync(argv.directory),
		foo: argv.foo,
		baz: argv.baz,
		other: argv.other,
	};
	
	startApp();
	
}

getOptions();
