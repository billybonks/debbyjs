describe('#generateRedisKey', ()=> {
  beforeEach(() => {
    subject = new Subject('billybonks', {}, 600);
  });
  test('returns expected value', () => {
    let key = subject.generateRedisKey(22);
    expect(key).toMatchSnapshot();
  });
});

describe('#fetch', () => {
  beforeEach(() => {
    subject = new Subject('billybonks', {}, 600);
    subject.redis.get = jest.fn().mockReturnValueOnce(JSON.stringify({id:12, name:'abhi'}));

  });

  test('it calls redis.get', () => {
    subject.fetch(15);
    expect(subject.redis.get.mock.calls.length).toEqual(1);
    expect(subject.redis.get.mock.calls[0]).toMatchSnapshot();
  });

  test('if nothing is found it returns undefined', async () => {
    subject.redis.get = function(){};
    let res = await subject.fetch(null);
    expect(res).toBeUndefined();
  });

  test('returns expectedClassObject', async () => {
    let result = await subject.fetch(22);
    expect(result.constructor === subject.klass).toEqual(true);
  });
});

describe('#get', () => {
  beforeEach(() => {
    subject = new Subject('billybonks', {}, 600);
    subject.redis.set = jest.fn();
  });

  test('it calls redis.set', () => {
    subject.save(12, {name:'bob', something:'awesome'});
    expect(subject.redis.set.mock.calls.length).toEqual(1);
    expect(subject.redis.set.mock.calls[0]).toMatchSnapshot();
  });
});
