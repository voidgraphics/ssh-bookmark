import fs from 'fs';
import utils from './utilities.js';
import { each, size } from 'underscore';
import chalk from 'chalk';
import inquirer from 'inquirer';
import ssh from 'ssh2-client';

export default class App {

    constructor(options) {
        utils.spaceLog('Welcome to ssh-connect!');

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

    loadBookmarks() {
        let rawdata = fs.readFileSync(__dirname + '/../bookmarks.json');
        let bookmarks = JSON.parse(rawdata);
        this.bookmarks = bookmarks || {};
    }

    saveBookmarks() {
        let json = JSON.stringify(this.bookmarks);
        fs.writeFile(__dirname + '/../bookmarks.json', json, 'utf8', function (err) {
        	if (err) throw err;
            utils.spaceLog('Done!');
        });
    }

    showBookmarks() {
        if(!size(this.bookmarks)) {
            console.log('Looks like you don\'t have any bookmarks yet!');
            console.log('Run ssh-connect -a user@host.example to add a bookmark,')
            console.log('or do ssh-connect -h for more information.')
            return;
        }
        let choices = this.getChoices();
        inquirer.prompt([{
        	type: 'list',
        	name: 'bookmark',
        	message: 'Which connection would you like to start?',
            choices
        }]).then(answer => {
            this.start(answer.bookmark);
        })
    }

    saveBookmark(host) {
        inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter a name for your bookmark (' + host + ')'
            }
        ]).then(answer => {
            this.bookmarks[answer.name] = host;
            this.saveBookmarks();
        })
    }

    removeBookmark(name) {
        console.log(chalk.red('You are about to delete this bookmark: ') + name + ' (' + this.bookmarks[name] + ')');
        console.log('');
        inquirer.prompt([
            {
                type: 'confirm',
                name: 'confirmed',
                message: 'Are you sure you want to continue?'
            }
        ]).then(answer => {
            if (answer.confirmed) {
                delete this.bookmarks[name];
                this.saveBookmarks();
            } else {
                console.log('Aborted.')
                this.sayBye();
            }
        })
    }

    getChoices() {
        let choices = [];
        each(this.bookmarks, (value, name) => {
            choices.push({ name, value })
        })
        return choices;
    }

    start(host) {
        ssh
        	.shell(host, {
        		askPassword: true
        	})
        	.then(() => this.sayBye())
        	.catch(err => console.error(err));
    }

    sayBye() {
        utils.spaceLog('Bye!')
    }

}