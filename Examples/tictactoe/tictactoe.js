var prompt = require('prompt');

var turn = 'p1';
var winner = '';
var complete = false;

prompt.start();

do {
    getMove();
} while(!complete);

if (winner) {
    console.log('winner is: ' + winner);
} else {
    console.log('there was no winner');
}


function getMove() {
    prompt.get(['move'], function (err, result) {
        if (err) { return onErr(err); }

        console.log('  Move: ' + result.move);

        checkForWinner();
        if(!winner) {
            isGameFinished();
        }
    });
}


function checkForWinner() {

}

function isGameFinished() {
    
}
