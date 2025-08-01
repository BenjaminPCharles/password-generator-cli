import {
  lowerCaseChar,
  numberChar,
  upperCaseChar,
} from '../char-set.constants.js'

export function alphaPassword(length: number): string {
  const password = []

  for (let index = 0; index < Number(length); index++) {
    const char = Math.floor(Math.random() * 3)
    if (char === 1) {
      password.push(
        upperCaseChar[Math.floor(Math.random() * upperCaseChar.length)]
      )
    } else if (char === 2) {
      password.push(
        lowerCaseChar[Math.floor(Math.random() * lowerCaseChar.length)]
      )
    } else {
      password.push(numberChar[Math.floor(Math.random() * numberChar.length)])
    }
  }

  return password.join('')
}
