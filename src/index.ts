#! /usr/bin/env node
import { Command } from 'commander'
import { hexPassword } from './helpers/generators/hex-password.helper.js'
import { strongPassword } from './helpers/generators/strong-password.helper.js'
import { alphaPassword } from './helpers/generators/alpha-password.helper.js'
import chalk from 'chalk'
import clipboardy from 'clipboardy'

const program = new Command()

const validTypes = ['alpha', 'hex', 'strong'] as const
type ValidTypes = (typeof validTypes)[number]

program
  .name('password')
  .description('Generate random password')
  .version('v1.0.0')
  .option('-l, --length <length>', 'Password length', '16')
  .option(
    '-t, --type <type>',
    `Password type: (${validTypes.join(' | ')})`,
    'alpha'
  )
  .option('-c, --copy', 'Copy the generated password to clipboard')
  .action(
    (options: { length: string; type: ValidTypes; copy: boolean }): void => {
      const { length, type, copy } = options
      const passwordLength = parseInt(length, 10)

      /**
       * Number must be higher than 0
       */
      if (isNaN(passwordLength) || passwordLength < 1) {
        console.error(chalk.red('❌ Length must be a positive number'))
        process.exit(1)
      }

      /**
       * Type should be valid type
       */
      if (!validTypes.includes(type)) {
        console.error(
          chalk.red(`❌ Invalid type. Use one of: ${validTypes.join(', ')}`)
        )
        process.exit(1)
      }

      /**
       * Generate password
       */
      let password = ''
      switch (type) {
        case 'alpha':
          password = alphaPassword(passwordLength)
          break
        case 'hex':
          password = hexPassword(passwordLength)
          break
        case 'strong':
          password = strongPassword(passwordLength)
          break
      }

      /**
       * Send response
       */
      console.log('\n' + chalk.greenBright('🔐 Generated password:'))
      console.log(
        `${chalk.gray('➡️ ')} ${chalk.bold.cyan(password)} ` +
          chalk.dim(`(${type}, length: ${passwordLength})`) +
          '\n'
      )

      if (copy) {
        clipboardy.writeSync(password)
        console.log(chalk.cyan('📋 Copied to clipboard!'), '\n')
      }
    }
  )

program.parse()
