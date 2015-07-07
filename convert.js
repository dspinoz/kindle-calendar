#!/usr/bin/env node
var svg2png = require('svg2png');

svg2png("whale.svg", "bird.png", function (err) {
    if (err) { console.log(err); return; }
    // PNGs for everyone!
});

