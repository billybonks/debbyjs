const describeClass = require('../../helpers/class');

describeClass(() => {
  describe('#mountIntent', () => {
    test('throws not implemented excption', function(){
      expect(subject.mountIntent).toThrow();
    });
  });

  describe('#match', () => {
    test('throws not implemented excption', function(){
      expect(subject.match).toThrow();
    });
  });

  describe('#mount', () => {
    test('calls overriden mountIntent function for each handler', () => {
      subject.__proto__.mountIntent = jest.fn();
      subject.mount([1,2,3]);
      expect(subject.__proto__.mountIntent).toHaveBeenCalledTimes(3);
      expect(subject.__proto__.mountIntent.mock.calls[0]).toEqual([1]);
      expect(subject.__proto__.mountIntent.mock.calls[1]).toEqual([2]);
      expect(subject.__proto__.mountIntent.mock.calls[2]).toEqual([3]);
    });
  });

  describe('#extendsKlass', () => {
    test('matches class of any depth', () => {
      class A{}
      class B extends A{}
      class C extends B{}
      class D {}
      expect(subject.extendsKlass(A, A)).toBe(true);
      expect(subject.extendsKlass(B, A)).toBe(true);
      expect(subject.extendsKlass(C, A)).toBe(true);
      expect(subject.extendsKlass(D, A)).toBe(false);
      expect(subject.extendsKlass(B, C)).toBe(false);
      expect(subject.extendsKlass(C, B)).toBe(true);
    });
  });
});
