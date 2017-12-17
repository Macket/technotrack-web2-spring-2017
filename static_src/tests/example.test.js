const division = (a, b) => a / b;

describe('simple', () => {
    test('check simple division', () => {
        expect(division(4, 2)).toBe(2);
    });
    test('check zero division', () => {
        expect(division(4, 0)).toBe(Infinity);
    });
});
