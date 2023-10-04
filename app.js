const person = {
    name: {
        firstname: "Chun",
        secondname: "Lin"
    },
    age: 32,
    gender: "F",
    height: "1.4",
    NID: "1",
    nationality: "CMR",
    continent: "AFR",

}

const name = "Bryan Hendrick"

const { name: nameOfPerson, age, gender, ...rest} = person

const nationality = rest.nationality
const nid = rest.NID
const height = rest.height

console.log(height+nid)