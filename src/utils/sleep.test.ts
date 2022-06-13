import sleep from "./sleep";

const msArr = [
    0,
    100,
    500,
    1000,
];
describe(`sleep`, () => {
    for (const ms of msArr) {
        test(`sleep for ${ms} ms`, async () => {
            const start = Date.now();
            await sleep(ms);
            const diff = Date.now() - start;
            expect(diff / 1000)
                .toBeCloseTo(ms / 1000, 1);
        });
    }
});
