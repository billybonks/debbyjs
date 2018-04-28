
module.exports = function(targetFunction, params, expectation){
  describe('#Update', () => {
    test(`it calls ${targetFunction}`, function(){
      expectation = expectation || params;
      let store = {[targetFunction]: jest.fn()};
      subject.store = store;
      subject.update(...params);
      expect(store[targetFunction].mock.calls.length).toEqual(1);
      expect(store[targetFunction].mock.calls[0]).toEqual(expectation);
    });
  });
};
