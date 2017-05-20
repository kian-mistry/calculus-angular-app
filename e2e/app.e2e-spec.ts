import { CalculusAngularAppPage } from './app.po';

describe('calculus-angular-app App', function() {
  let page: CalculusAngularAppPage;

  beforeEach(() => {
    page = new CalculusAngularAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
