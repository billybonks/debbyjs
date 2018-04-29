const describeClass = require('../helpers/class');

describeClass(() => {

  beforeEach(() => {
    subject.userStore.fetch = jest.fn();
    subject.userStore.create = jest.fn();
    subject.contextStore.fetch = jest.fn();
    subject.contextStore.create = jest.fn();
  });
  describe('#getUser', () => {
    test('propergates to correct userStore.fetch', () => {
      subject.getUser(12);
      expect(subject.userStore.fetch.mock.calls.length).toEqual(1);
      expect(subject.userStore.fetch.mock.calls[0]).toMatchSnapshot();
    });
  });

  describe('#saveUser', () => {
    test('propergates to correct userStore.save', () => {
      subject.saveUser(18, {name:'seb', account:1});
      expect(subject.userStore.save.mock.calls.length).toEqual(1);
      expect(subject.userStore.save.mock.calls[0]).toMatchSnapshot();
    });
  });

  describe('#getContext', () => {
    test('propergates to correct contextStore.fetch', () => {
      subject.getContext(22);
      expect(subject.contextStore.fetch.mock.calls.length).toEqual(1);
      expect(subject.contextStore.fetch.mock.calls[0]).toMatchSnapshot();
    });
  });


  describe.only('#saveContext', () => {
    test('propergates to correct contextStore.save', () => {
      subject.saveContext(18, {name:'cooldude', account:99, word:true});
      expect(subject.contextStore.create.mock.calls.length).toEqual(1);
      expect(subject.contextStore.create.mock.calls[0]).toMatchSnapshot();
    });
  });
});
