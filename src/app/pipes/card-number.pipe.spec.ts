import { CardNumberPipe } from './card-number.pipe';

describe('CardNumberPipe', () => {

  it('should create an instance', () => {
    const pipe = new CardNumberPipe();
    expect(pipe).toBeDefined();
  });

  it('should transform "123456789" to "6789"', () => {

    const pipe = new CardNumberPipe();

    spyOn(pipe, 'transform').and.callThrough();

    const transformedValue = pipe.transform('123456789');

    expect(transformedValue.length)
      .withContext('Did not return 4 digits')
      .toBe(4);
    
    expect(transformedValue)
      .withContext('Return value did not match the last 4 digits of the input')
      .toBe('6789');

    expect(pipe.transform)
      .withContext('Function was invoked an unexpected number of times')
      .toHaveBeenCalledTimes(1);

  })

});
