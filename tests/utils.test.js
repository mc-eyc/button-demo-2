import utils from "../src/utils";

describe("utils", () => {
    describe("svg", () => {
        it("should convert a linear gradient", () => {
            expect(utils.css2svgGradient("linear-gradient(#fff25e, #ff6a2a 75%)")).toEqual([
                `<linearGradient  id="css-2-svg-gradient-0"  x1="0%" y1="0%" x2="0%" y2="0%"><stop offset="0%" style="stop-color:#fff25e;stop-opacity:1" /><stop offset="100%" style="stop-color:#ff6a2a;stop-opacity:1" /></linearGradient>`,
            ]);
        });
    });
});
