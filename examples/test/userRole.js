import { Role } from 'testcafe';
import { config } from './config';

export const currentUser = Role(config.hostname + '/gdc/account/login', async (t) => {
    await t
        .typeText('input[name=USER]', config.username)
        .typeText('input[name=PASSWORD]', config.password)
        .click('input[name=submit]');
});
