describe('constructor',() => {
  test('handles null properties', function(){
    let subject = new Subject(null);
    expect(subject._data).toEqual({});
  });

  test('proxies properties', () => {
    let subject = new Subject({a:1, b:2});
    expect(subject.a).toEqual(1);
    expect(subject.b).toEqual(2);
  });

  test('assigns brain object', () => {
    let brain = {x:function(){}};
    let subject = new Subject(null, brain);
    expect(subject.brain).toEqual(brain);
  });
});

describe('#properties', () => {
  test('returns everything in _data', function(){
    let subject = new Subject({a:1, b:2});
    subject.someRandoThing = 1;
    expect(subject.properties).toEqual({a:1, b:2});
    subject.properties = {a:1};
    expect(subject.properties).toEqual({a:1});
  });
});

describe('set dynamic property', function(){
  test('properties are properly proxied', function(){
    let subject = new Subject({a:1, b:2});
    subject.a = 2;
    expect(subject.a).toEqual(2);
    expect(subject._data).toEqual({a:2, b:2});
  });
});
