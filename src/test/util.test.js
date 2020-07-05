import {getBook, getTitles} from '../utils/util';
import {checkSubstirng } from '../utils/search';

const testStrings = [
  "Know when to fight and when not to fight: avoid what is strong and strike at what is weak.",
  "We do not have the freedom and free will that we think we do."
]


test('Should get book info based on Id ', () => {
  expect(getBook(4)).toEqual({
    id: 4,
    title: "Confessions of an Economic Hitman",
    author: "Tim Harford",
    summary: "The Book in Three Sentences:\u00a0Seek out new ideas and try new things.\u00a0When trying something new, do it on a scale where failure is survivable.\u00a0Seek out feedback and learn from your mistakes as you go along."
  });
});

test('Should return book titles based on query keyword', () => {
  expect(getTitles({
    query: "achieve",
    count: 3
  })).toEqual([
    "The Richest Man in Babylon",
    "The Art of War",
    "Free Will",
  ]);
});

test('Should return book titles based on query keyword', () => {
  expect(getTitles({
    query: "your problem",
    count: 3
  })).toEqual([
    "The 10X Rule",
    "Anything You Want",
    "The Nurture Assumption",
  ]);
});

test('Get score of substring in an input string', () => {
  expect(checkSubstirng(testStrings[0], "when not to")).toBe(0)
})

test('Get score of substring in an input string', () => {
  expect(checkSubstirng(testStrings[0], "void what is strong")).toBe(1)
})

test('Get score of substring in an input string', () => {
  expect(checkSubstirng(testStrings[1], "freedom")).toBe(0)
})


test('Get score of substring in an input string', () => {
  expect(checkSubstirng(testStrings[1], "expectations")).toBe(3)
})
