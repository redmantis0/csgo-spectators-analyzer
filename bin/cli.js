#!/usr/bin/env node

const [,, ...args] = process.argv

const CSGOSpectatorsAnalyzer = require('../src/CSGOSpectatorsAnalyzer.js');

if (args.length == 0) {
    console.log('Usage: csacli <demo.dem>');
    return;
}

analyzeDemos(args);

async function analyzeDemos(filenames) {
    for(const filename of filenames) {
        await analyze(filename).catch();

        // Add spacing
        console.log();
    }
}

function analyze(filename) {
    return new Promise((resolve, reject) => {

        console.log('Analyzing "%s"...', filename);
        const csa = new CSGOSpectatorsAnalyzer(filename);
        
        csa.analyze().then(res => {       
            console.log('File "%s" analisys completed. Results:', filename);
            csa.printSpectators();
            resolve(res);
        }).catch(err => {
            console.log('An error occourred trying to analyze the file "%s": %s', filename, err.message);
            reject(err);
        });
    });
}
