var inquirer = require("inquirer");
var fs = require("fs");
const os = require("os");
var axios = require("axios");

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

function writeToFile(questions, data) {
  fs.writeFile(questions, data.join(""), function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("Success!");
  });
}

function init() {
  inquirer.prompt(questions).then(function(data) {
    let gitHubUserName = data.gitHubUserName;
    const queryUrl = `https://api.github.com/users/${gitHubUserName}`;
    axios.get(queryUrl).then(function(res) {
      let bio = res.data.bio;
      let image = res.data.avatar_url;
      let title = data.title;
      let description = data.description;
      let tableOfContents = data.tableOfContents;
      let installation = data.installation;
      let usage = data.usage;
      let licence = data.licence;
      let contributing = data.contributing;
      let tests = data.tests;

      writeToFile("README.md", [
        "# " + title + "\n",
        "## Developer bio" +
          "\n" +
          `![alt text](${image} "Profile picture")` +
          "\n\n",
        bio + "\n",
        "## Project description" + "\n\n" + description + "\n\n",
        "## Table of content" + "\n" + tableOfContents + "\n\n",
        "## Installation" + "\n" + installation + "\n\n",
        "## Usage" + "\n" + usage + "\n\n",
        "## License" + "\n" + licence + "\n\n",
        "## Contributing" + "\n" + contributing + "\n\n",
        "## Tests" + "\n" + tests
      ]);
    });
  });
}

init();
