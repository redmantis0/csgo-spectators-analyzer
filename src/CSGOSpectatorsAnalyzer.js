const fs = require('fs');
const demofile = require('demofile');
const utils = require('./utils.js');

class CSGOSpectatorsAnalyzer {

    constructor(filePath) {
        this.filePath = filePath;
    }

    _init() {
        this.spectators = new Map();
        this.demoFile = new demofile.DemoFile();
    }

    analyze() {
        return new Promise((resolve, reject) => {

            // Initializes internal state
            this._init();

            // Reads the file
            fs.readFile(this.filePath, (err, buffer) => {

                // Checks for errors
                if (err) {
                    reject(err);
                }

                // On every entity update
                this.demoFile.entities.on('change', (event) => {
                    this._onEntityUpdate(event);
                });

                // Print results at the end of the demo
                this.demoFile.on('end', e => {
                    resolve(this.spectators);
                });

                // Start parsing the file
                try {
                    this.demoFile.parse(buffer);
                } catch (e) {
                    reject(e);
                }
            });
        });
    }

    _onEntityUpdate(e) {
        // Skip invalid and non-spectators
        if (!utils.isValidSpectator(e.entity)) return; 
    
        // If his spectating a valid player
        if (utils.findSpectating(e.entity, this.demoFile.entities.players) !== null) {
            // Valid position detected
            this._onSpectatingPosition(e.entity);
            return;
        }
    
        // Invalid position detected
        this._onInvalidPosition(e.entity);
    }

    _onInvalidPosition(spectator) {
        this._getSpectatorOrCreate(spectator).invalid++;
    }
    
    _onSpectatingPosition(spectator) {
        this._getSpectatorOrCreate(spectator).spectating++;
    }
    
    _getSpectatorOrCreate(spectator) {
        var mapped_spec = this.spectators.get(spectator.userId);
        
        // If the spectator is new, add him to the spectators map
        if (mapped_spec === undefined) {
            mapped_spec = utils.newSpectator(spectator);
            this.spectators.set(spectator.userId, mapped_spec);
        }
    
        return mapped_spec;
    }

    printSpectators() {
        for (const [userId, spectator] of this.spectators) {
            const total = spectator.spectating + spectator.invalid;
            console.log('[%s] invalid positions: %d% (%i invalids, %i valids, %i total).', spectator.player.name, (spectator.invalid / total) * 100, spectator.invalid, spectator.spectating, total);
        }

        return this.spectators;
    }
}

module.exports = CSGOSpectatorsAnalyzer;