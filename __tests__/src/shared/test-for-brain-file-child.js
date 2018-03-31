
module.exports = function(targetFunction, params, expectation){
  describe('#Update', () => {
    test(`it calls ${targetFunction}`, function(){
      expectation = expectation || params;
      let brain = {[targetFunction]: jest.fn()};
      subject.brain = brain;
      subject.update(...params);
      expect(brain[targetFunction].mock.calls.length).toEqual(1);
      expect(brain[targetFunction].mock.calls[0]).toEqual(expectation);
    });
  });
};
