describe('blueally subnets', () => {
  let sut;

  beforeEach(() => {
    sut = {};
  });

  it('should load the subnets', () => {
    sut.a = false;

    sut.a = true;

    expect(sut.a).toBe(true);
  });
});