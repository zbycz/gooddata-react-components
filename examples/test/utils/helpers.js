import { config } from './config';

export const loginUsingGreyPages = (t) => {
    return t
        .navigateTo('/gdc/account/login')
        .typeText('input[name=USER]', config.username)
        .typeText('input[name=PASSWORD]', config.password)
        .click('input[name=submit]')
    ;
};
