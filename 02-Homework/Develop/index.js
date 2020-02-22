var inquirer = require("inquirer");
var fs = require("fs");

const questions = [
  {
    type: "input",
    name: "gitHubUserName",
    message: "What is your github user name?"
  },
  {
    type: "input",
    name: "title",
    message: "What is your project title?"
  },
  {
    type: "input",
    name: "description",
    message: "Describe your project?"
  },
  {
    type: "input",
    name: "tableOfContents",
    message: "Enter your Table of content?"
  },
  {
    type: "input",
    name: "installation",
    message: "How to install your project?"
  },
  {
    type: "input",
    name: "usage",
    message: "How to use your project?"
  },
  {
    type: "input",
    name: "licence",
    message: "Please provide your license information?"
  },
  {
    type: "input",
    name: "contributing",
    message: "who contributed on this project?"
  },
  {
    type: "input",
    name: "tests",
    message: "What is the testing method for your project?"
  }
];

function writeToFile(fileUserName, data) {
  fs.writeFile(fileUserName, JSON.stringify(data, null, "\t"), function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("Success!");
  });
}

function init() {
  inquirer.prompt(questions).then(function(data) {
    let gitHubUserName = data.gitHubUserName;
    let title = data.title;
    let description = data.description;
    let tableOfContents = data.tableOfContents;
    let installation = data.installation;
    let usage = data.usage;
    let licence = data.licence;
    let contributing = data.contributing;
    let tests = data.tests;

    writeToFile(
      "readme.md",
      gitHubUserName,
      title,
      description,
      tableOfContents,
      installation,
      usage,
      licence,
      contributing,
      tests
    );
  });
}

init();
