import { isPriceOptimal } from "../components/modal/currency-modal.component";

test("price 40 and update price 44 does not exceed +/-10% from initial", () => {
  expect(isPriceOptimal(40, 44)).toBe(true);
});

test("price 40 and update price 36 does not exceed +/-10% from initial", () => {
  expect(isPriceOptimal(40, 36)).toBe(true);
});

test("price 40 and update price 35.9 does exceed +/-10% from initial", () => {
  expect(isPriceOptimal(40, 35.9)).toBe(false);
});

test("price 40 and update price 44.1 does exceed +/-10% from initial", () => {
  expect(isPriceOptimal(40, 44.1)).toBe(false);
});
