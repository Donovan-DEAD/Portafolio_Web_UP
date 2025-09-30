import { randomSupervillain } from 'supervillains'
import { randomSuperhero } from 'superheroes'
import { sw } from 'star-wars-quotes'


console.log(sw())
console.log()

console.log("Superhero to fight: ",randomSuperhero())
console.log("Supervillian to fight: ",randomSupervillain())
console.log()

console.log("Superhero to fight: ",randomSuperhero())
console.log("Supervillian to fight: ",randomSupervillain())
console.log()

console.log("Superhero to fight: ",randomSuperhero())
console.log("Supervillian to fight: ",randomSupervillain())
console.log()

console.log("Superhero to fight: ",randomSuperhero())
console.log("Supervillian to fight: ",randomSupervillain())
console.log()


import fs from 'fs'

fs.readFile("data/input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(data)
})