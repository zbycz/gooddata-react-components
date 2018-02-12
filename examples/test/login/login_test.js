import { ClientFunction, Selector, Role } from 'testcafe';
import { config } from '../config';

const getPageUrl = ClientFunction(() => window.location.href.toString());

const currentUser = Role(config.hostname + '/gdc/account/login', async (t) => {
    await t
        .typeText('input[name=USER]', 'ADD_EMAIL')
        .typeText('input[name=PASSWORD]', 'ADD_PASSWORD')
        .click('input[name=submit]');
});

fixture('Login')
    .page(config.hostname);

test('Redirect to login page', async (t) => {
    await t
        .expect(getPageUrl()).contains(`${config.hostname}/account.html`, { timeout: 10000 })
        .useRole(currentUser)
        .navigateTo(config.hostname)
        .wait(5000)
        .debug();
});
