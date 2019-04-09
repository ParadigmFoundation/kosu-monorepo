const { Animal } = require("../lib")

describe("Testing creation of animals", () => {
    test("should create a dog", () => {
        expect(() => {
            const dog = new Animal("dog", "richard");
        }).not.toThrow()
    })
    test("should create a cat", () => {
        expect(() => {
            const cat = new Animal("cat", "richard");
        }).not.toThrow()
    })
    test("should create a cow", () => {
        expect(() => {
            const cow = new Animal("cow", "richard");
        }).not.toThrow()
    })
    test("should create a bird", () => {
        expect(() => {
            const bird = new Animal("bird", "richard");
        }).not.toThrow()
    })
    test("should create a bird", () => {
        expect(() => {
            const bird = new Animal("bird", "richard");
        }).not.toThrow()
    })
    test("should not create a lizard", () => {
        expect(() => {
            const bird = new Animal("lizard", "richard");
        }).toThrow()
    })
})

describe("Testing animal behavior", () => {
    let animal;
    const name = "calbunga"
    const type = "dog"
    beforeEach(() => {
        dog = new Animal(type, name);
    })
    test("animal should say its name correctly", () => {
        const saidName = dog.sayName()
        expect(saidName).toBe(name);
    })
    test("animal should say its type correctly", () => {
        const saidType = dog.sayType()
        expect(saidType).toBe(type);
    })
    test("animal should be alive", () => {
        const alive = dog.isAlive()
        expect(alive).toBe(true);
    })
    test("animal should be 0 years old", () => {
        const age = dog.howOld()
        expect(age).toBe(0);
    })
    test("animal should be 1 years old after growing", () => {
        dog.grow()
        const newAge = dog.howOld();
        expect(newAge).toBe(1);
    })
    test("animal should be dead after being killed", () => {
        dog.kill()
        const alive = dog.isAlive();
        expect(alive).toBe(false);
    })
})