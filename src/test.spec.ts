import { SharedModule } from './app/modules/shared.module';

describe('SharedModule', () => {
  let sharedModule: SharedModule;

  beforeEach(() => {
    sharedModule = new SharedModule();
  });

  it('should create an instance', () => {
    expect(sharedModule).toBeTruthy();
  });

  it('should be true', () => {
    expect(true).toBe(true);
  });

  it('should be false', () => {
    expect(false).toBe(false);
  });
});
