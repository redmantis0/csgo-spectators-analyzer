#!/usr/bin/env node

const [,, ...args] = process.argv

const CSGOSpectatorsAnalyzer = require('../src/CSGOSpectatorsAnalyzer.js');

if (args.length == 0) {
    console.log('Usage: csacli <demo.dem>');
    return;
}

for(const filename of args) {
    analyze(filename);
}

function analyze(filename) {
    console.log('Analyzing "%s"...', filename);
    const csa = new CSGOSpectatorsAnalyzer(filename);
    
    csa.analyze().then(res => {       
        console.log('File "%s" analisys completed. Results:', filename);
        csa.printSpectators();
    }).catch(err => {
        console.log('An error occourred trying to analyze the file "%s": %s', filename, err);
    });
}

