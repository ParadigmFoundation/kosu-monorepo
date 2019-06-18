import { migrations } from "../src/migrations";

describe("migrations", () => {
    it("should recover console when failure occurs during processing", async () => {
        const oldConsole = console;
        await migrations(provider, { from: "0x0000000000000000000000000000000000000000" }, { noLogs: true }).should
            .eventually.be.rejected;
        oldConsole.log.should.eq(console.log);
    });
});
