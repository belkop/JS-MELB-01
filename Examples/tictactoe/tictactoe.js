var prompt = require('prompt');

  prompt.start();

  console.log('what symbol will player 1 use:');

  prompt.get(['symbol'], function (err, result) {
    if (err) { return onErr(err); }

    console.log('Command-line input received:');
    console.log('  Symbol: ' + result.symbol);

    getMove();


  });

  function onErr() {
      console.log('some error');
  }


  function getMove() {

      prompt.get(['move'], function (err, result) {
        if (err) { return onErr(err); }

        console.log('  Move: ' + result.move);



      });
  }
