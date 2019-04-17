/**
 * Animal represents a simple animal
 */
export class Animal {
    /**
     * The allowed types of animals
     */
    private static allowed = ["cat", "dog", "cow", "bird"]

    /**
     * The type of the animal
     */
    private type: string;

    /**
     * The animal's name
     */
    private name: string;

    /**
     * The animals age
     */
    private age: number;

    /**
     * True if the animal is alive
     */
    private alive: boolean;

    /**
     * Create a new animal
     * 
     * @param type the animal's species
     * @param name the animal's name
     */
    constructor(type: string, name: string) {
        if (Animal.allowed.indexOf(type) === -1) {
            throw new Error("invalid type")
        }
        this.type = type;
        this.age = 0;
        this.name = name;
        this.alive = true;
    }

    /**
     * Returns the animals name
     */
    public sayName(): string {
        return this.name;
    }

    /**
     * Returns the animals type (species)
     */
    public sayType(): string {
        return this.type;
    }

    /**
     * Returns the animals age
     */
    public howOld(): number {
        return this.age;
    }

    /**
     * Returns the animals liveness, true if it is alive
     */
    public isAlive(): boolean {
        return this.alive;
    }

    /**
     * Increases the animals age by one
     */
    public grow(): void {
        if (!this.alive) {
            throw new Error("cannot grow when dead");
        }
        this.age++;
    }

    /**
     * Kills the animal. Prevents future growth
     */
    public kill(): void {
        if (!this.alive) {
            throw new Error("cannot kill what is already dead")
        }
        this.alive = false;
    }
}
