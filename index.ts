interface Human {
  name: string;
  age: number;
  gender: string;
}

const Person = {
  name: "LEE",
  age: 23,
  gender: "male",
};

const sayHi = (person: Human): void => {
  console.log(`Hello ${person.name}, y r ${person.age}, and ${person.gender}`);
};
sayHi(Person);

export {};
