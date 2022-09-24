// required packages
const chalk = require('chalk');
const inquirer = require('inquirer');
const fs = require('fs');
const path =  require('path');
const templateLocation = path.join(__dirname,'utils', 'template.md');
const outputLocation = path.join(__dirname, 'output', 'README.md');

// Use chalk to colour console log text
const green = chalk.green;
const red = chalk.red;

// Welcome user
console.log(green('Hello, thank you for using this Read Me Generator. Please follow the prompts to create a quality .MD for your project.'));
console.log(red('Adding code snippets or line breaks is easy, just use use backticks and <br> respectively'));

// List of questions

inquirer.prompt([
    // Name of Project
    {
        type: 'input',
        message: 'Name your Project.',
        name:'title',
    },
    // Description
    {
        type: 'input',
        message: 'Please describe your Project.',
        name:'description',
    },
    // Modules used
    {
        type: 'input',
        message: 'What did you use to build the project?.',
        name:'built',
    },    
    // installation instructions
    {
        type: 'input',
        message: 'How do you install the project?',
        name:'installation',
    },
    // How to use the project
    {
        type: 'input',
        message: 'Explain how to use the project?',
        name:'usage',
    },
    // Contribution
    {
        type: 'input',
        message: 'How would you like people to contribute?',
        name:'contribution',
    },
    // How to test
    {
        type: 'input',
        message: 'What are the project test instructions?',
        name:'test',
    },
    // email
    {
        type: 'input',
        message: 'Enter your email',
        name:'email',
    },
    // license
    {
        type: 'list',
        message: 'What is the license?',
        name:'license',
        choices: [
            'MIT','GPL-3.0', 'Apache-v2', 'ISC'
        ]
    },
    // github
    {
        type: 'input',
        message: 'Enter your GitHub username.',
        name:'github',
    },
    // project url
    {
        type:'input',
        message:'Enter the GitHub project URL',
        name: 'url'
    },
    // socials
    {
        type: 'input',
        message: 'What is your twitter handle?',
        name:'twitter',
    },
    {
        type: 'input',
        message: 'What is you linkedin user?',
        name:'linkedin',
    },
    {
        type: 'input',
        message: 'Enter your name or moniker?',
        name:'identification',
    },


    // render retrieved answers
]).then((ans) => {
    // convert the license to lowercase for URL
    const lowerCaseLicense = ans.license.toLowerCase()
    // Retrieves the template
    const template = fs.readFileSync(templateLocation, 'utf-8')
    // variable to find multiple instances of a word in the string
    const licenses = /{{license}}/g;
    const projectURL = /{{url}}/g
    const gitLink = /{{github-link}}/g
    // Replace parts of string with relevant information
    const output = template.replace('{{title}}', ans.title)
        .replace('{{licenseLowerCase}}', lowerCaseLicense)
        .replace(licenses, ans.license)
        .replace('{{description}}', ans.description)
        .replace(projectURL, ans.url)
        .replace('{{github}}', ans.github)
        .replace('{{built}}', ans.built)
        .replace('{{installation}}', ans.installation)
        .replace('{{usage}}', ans.usage)
        .replace('{{contribution}}',ans.contribution)
        .replace('{{test}}',ans.test)
        .replace(gitLink,`https://github.com/${ans.github}`)
        .replace('{{twitter}}', `https://twitter.com/${ans.twitter}`)
        .replace('{{email}}',`mailto:${ans.email}`)
        .replace('{{linkedin}}', `https://www.linkedin.com/in/${ans.linkedin}/`)
        .replace('{{identification}}', ans.identification)
    // Turn the edited variable into a new README
    fs.writeFileSync(outputLocation, output)
    // Notify the user
    console.log(green('Your README File has been exported to ' + outputLocation ))
})
