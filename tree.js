const fs = require('fs');
const path = require('path');
const chalk = require('chalk');


function repeatString(someString, num) {
  return new Array(num).join(someString);
}

function fileTree(dir, done, indent) {

    indent = indent || 1; // indent(ne znam kako se vika toa) od leviot  kraj na linija
    let results = []; // lista na site folderi i failovi shto gi najdovme za sekoj slucaj -)

    // Ako vlegovme znaci ova e folder, go pishuvame imeto
    results.push(path.basename(dir));
    console.log(repeatString('  ', indent), chalk.blue.bold(path.basename(dir)));

    fs.readdir(dir, function(err, list) {
        if (err) return done(err);

        var pending = list.length; // ni treba za uslovi koi shto zavrshuvaat rekursija

        if (!pending) return done(null, results); // zavrshuvame rekursija

        // za se shto najdovme vo momentalen folder
        // fajlovi + isto taka drugi folderi
        // gledame sekoj element
        list.forEach(function(file){
            file = path.resolve(dir, file); // polno ime: pat + ime.ext

            fs.stat(file, function(err, stat){

                // Ako e folder togash praime rekursivno
                if (stat && stat.isDirectory()) {

                    fileTree(file, function(err, res){
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    }, indent + 1);

                } else {
                  // Ako e obicen fajl togash samo pisuvame

                    results.push(path.basename(file));
                    console.log(repeatString('  ', indent + 1), chalk.yellow(path.basename(file)));

                    if (!--pending) done(null, results); // zavrshuvame rekursija
                }
            });
        });
    });

};

module.exports = fileTree;