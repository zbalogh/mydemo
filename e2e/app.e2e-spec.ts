import { MydemoPage } from './app.po';

describe('mydemo App', function() {
  let page: MydemoPage;

  beforeEach(() => {
    page = new MydemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
