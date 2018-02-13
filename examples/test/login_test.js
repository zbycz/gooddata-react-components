import { ClientFunction } from 'testcafe';
import { config } from './utils/config';

const getPageUrl = ClientFunction(() => window.location.href.toString());

fixture('Login') // eslint-disable-line no-undef
    .page(config.hostname);

test('should redirect to login page', async (t) => {
    await t
        .expect(getPageUrl()).contains(`${config.hostname}/account.html`, { timeout: 10000 })
        .typeText('input[name=email]', config.username)
        .typeText('input[name=password]', config.password)
        .click('button.submit-button')
        .expect(getPageUrl())
        .eql(`${config.hostname}/`, { timeout: 10000 });
});
