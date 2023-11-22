
function skillsMember(name, age, skills) {
  this.name = name;
  this.age = age;
  this.skills = skills;

  this.introduce = function() {
    console.log(`Hi, my name is ${this.name} and I'm ${this.age} years old.`);
  };

  this.showSkills = function() {
    console.log(`My skills are: ${this.skills.join(", ")}`);
  };
}

// Example usage:
const john = new skillsMember("John", 25, ["JavaScript", "HTML", "CSS"]);
john.introduce(); // Output: Hi, my name is John and I'm 25 years old.
john.showSkills(); // Output: My skills are: JavaScript, HTML, CSS.
