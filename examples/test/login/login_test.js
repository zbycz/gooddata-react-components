import { ClientFunction } from 'testcafe';
import { config } from '../config';

const getPageUrl = ClientFunction(() => window.location.href.toString());

fixture('Login')
    .page(config.hostname);

test('Redirect to login page', async (t) => {
    await t
        .expect(getPageUrl()).contains(`${config.hostname}/account.html`, { timeout: 10000 });
});
