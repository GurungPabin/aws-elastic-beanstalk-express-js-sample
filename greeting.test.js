const greeting = require('./greeting');

test('sends the expected greeting exactly once', () => {
  const req = {};
  const res = {
    send: jest.fn()
  };

  greeting(req, res);

  expect(res.send).toHaveBeenCalledWith('Hello World!');
  expect(res.send).toHaveBeenCalledTimes(1);
});
