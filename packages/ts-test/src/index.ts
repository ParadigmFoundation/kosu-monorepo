export class Animal {
    private static allowed = ["cat", "dog", "cow", "bird"]
    private type: string;
    private name: string;
    private age: number;
    private alive: boolean;
    constructor(type: string, name: string) {
        if (Animal.allowed.indexOf(type) === -1) {
            throw new Error("invalid type")
        }
        this.type = type;
        this.age = 0;
        this.name = name;
        this.alive = true;
    }
    public sayName(): string {
        return this.name;
    }
    public sayType(): string {
        return this.type;
    }
    public howOld(): number {
        return this.age;
    }
    public isAlive(): boolean {
        return this.alive;
    }
    public grow(): void {
        if (!this.alive) {
            throw new Error("cannot grow when dead");
        }
        this.age++;
    }
    public kill(): void {
        if (!this.alive) {
            throw new Error("cannot kill what is already dead")
        }
        this.alive = false;
    }
}
