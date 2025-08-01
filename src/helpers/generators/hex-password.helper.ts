import { hexChar } from "../char-set.constants.js"


export function hexPassword(length: number): string {
  const password = []
  for (let index = 0; index < Number(length); index++) {
    password.push(hexChar[Math.floor(Math.random() * hexChar.length)])
  }
  return password.join('')
}
