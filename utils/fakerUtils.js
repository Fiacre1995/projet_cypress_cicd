const { faker } = require("@faker-js/faker");
const { champConfirmPassword } = require("../cypress/pages/PimPage");

// Définir la locale sur le français
faker.locale = "fr";

function genererEmployeur() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    username: faker.internet.username(),
    password: faker.internet.password({ length: 10 }),
    confirmPassword: faker.internet.password({ length: 10 }),
  };
}

module.exports = { genererEmployeur };
