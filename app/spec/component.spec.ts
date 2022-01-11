// import {Component} from '../src/components/components'
import { Component } from '@/components/components';

let item: Component;

describe('A suit is just a function', function () {
  beforeEach(() => {
    item = new Component();
  });

  it('2 x 2 === 4', function () {
    const res = item.testMultiplyMethod(2, 2);
    expect(res).toBe(4);
  });
});
