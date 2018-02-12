import { ClientFunction, Selector, Role } from 'testcafe';
import { config } from '../config';

const getPageUrl = ClientFunction(() => window.location.href.toString());

fixture('Login')
    .page(config.hostname);

test('Redirect to login page', async (t) => {
    await t
        .expect(getPageUrl()).contains(`${config.hostname}/account.html`, { timeout: 10000 })
        .typeText('input[name=email]', config.username)
        .typeText('input[name=password]', config.password)
        .click('button.submit-button')
        .expect(getPageUrl()).contains(config.hostname, { timeout: 10000 });
});
