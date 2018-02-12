import { ClientFunction, Selector, Role } from 'testcafe';
import { config } from '../config';
import { currentUser } from '../userRole';

const getPageUrl = ClientFunction(() => window.location.href.toString());

fixture('Execute')
    .page(config.hostname + '/execute');

test.only('result is correct and retry fails', async (t) => {
    const kpi = Selector('.s-execute-kpi');
    const retryButton = Selector('.s-retry-button');

    await t
        .useRole(currentUser)
        .expect(kpi.exists).ok()
        .expect(kpi.textContent).eql('92556577.3');

    await t
        .click(retryButton)
        .expect(Selector('div.gd-message.error').exists).ok();
});
