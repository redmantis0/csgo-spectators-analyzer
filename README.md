# CSGO Spectators Analyzer

This is a super basic NodeJS module to analyze CSGO demos and check if a spectator is abusing a recent bug which would allow him to gain information he shouldn't have.

## Software requirements

- [NodeJS](https://nodejs.org/en/download/ "NodeJS' official downloads page")
- NPM (Node Package Manager. Automatically installed with NodeJS)

## Installation

### Command Line Tool

Run `npm install -g csgo-spectators-analyzer`

### NodeJS module

Run `npm install csgo-spectators-analyzer`

## Usage

### Command Line Tool usage

- Single file: `csacli <demo.dem>`
- Multiple file: `csacli <demo.dem> [demo2.dem] [demo3.dem]...`

### NodeJS module example

```
var CSGOSpectatorsAnalyzer = require('csgo-spectators-analyzer');

var analyzer = new CSGOSpectatorsAnalyzer("../csgo-demo.dem");

analyzer.analyze(result => {
    analyzer.printSpectators();
});
```

## How does it work?

Every time a "Spectator" entity gets updated it will check his position and a variable "total" will be incremented.
Every time the spectator has a different position from ALL the other players, the variable "invalid" will be incremented.

The function `printSpectators()` will display the percentage of the invalid positions over the total ones.

## Notes

- Pull requests are (very) welcome
- I wanted to publish this ASAP so it's not well-written
- Will migrate to TypeScript
- More features to come
- Yep. My english is bad. Feel free to fix my README.md
- I'm friendly :)
