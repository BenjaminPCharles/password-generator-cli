import {
  lowerCaseChar,
  numberChar,
  symbolChar,
  upperCaseChar,
} from '../char-set.constants.js'

export function strongPassword(length: number): string {
  const password = []
  for (let index = 0; index < Number(length); index++) {
    const char = Math.floor(Math.random() * 4)
    if (char === 1) {
      password.push(
        upperCaseChar[Math.floor(Math.random() * upperCaseChar.length)]
      )
    } else if (char === 2) {
      password.push(
        lowerCaseChar[Math.floor(Math.random() * lowerCaseChar.length)]
      )
    } else if (char === 4) {
      password.push(numberChar[Math.floor(Math.random() * numberChar.length)])
    } else {
      password.push(symbolChar[Math.floor(Math.random() * symbolChar.length)])
    }
  }

  return password.join('')
}
