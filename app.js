const fileTree = require('./tree');

fileTree(process.argv[2], function(err, data) {
    if(err) {
        throw err;
    }

    // ako sakame lista na site fajlovi i folderi
    //console.log(data);
});

