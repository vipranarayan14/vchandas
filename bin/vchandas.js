#!/usr/bin/env node

(function () {

  const { vChandas } = require('../');
  const chalk = require('chalk');

  const options = require('yargs')
    .usage('Usage: $0 -s [string]')
    .options({
      's': { alias: 'string', describe: 'string to analyze for chandas', type: 'string' },
    })
    .help('h')
    .alias('h', 'help')
    .argv;

  const log = console.log; // eslint-disable-line no-console

  const handleOutput = chandasDetails => {

    if (chandasDetails) {

      log(chalk.yellow.bold('Syllables:'), '\n', chandasDetails.syllables.join(','));
      log(chalk.yellow.bold('Matras:'), '\n', chandasDetails.matras.join(','));
      log(chalk.yellow.bold('Ganas:'), '\n', chandasDetails.ganasKey);

      if (chandasDetails.chandas) {

        log(chalk.yellow.bold('Chandas type:'), '\n', chandasDetails.chandas.type);
        log(chalk.yellow.bold('Chandas name:'), '\n', chandasDetails.chandas.name);
        log(chalk.yellow.bold('Chandas definition:'), '\n', chandasDetails.chandas.definition);

        chandasDetails.chandas.examples.forEach((example, index) => {

          log(chalk `{yellow.bold Example ${index + 1}:}`, '\n', example);

        });

      } else {

        log(chalk.yellow.bold('Chandas:\n'), chalk.red('Not found!'));

      }

    }

  };

  if (options.string) {

    const vc = vChandas();

    const chandasDetails = vc(options.string);

    handleOutput(chandasDetails);

  } else {

    log('A string (-s) as input is required.');

  }

})();