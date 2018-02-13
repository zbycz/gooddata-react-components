import { Selector } from 'testcafe';
import { config } from './utils/config';
import { loginUsingGreyPages } from './utils/helpers';

fixture('Execute') // eslint-disable-line no-undef
    .page(config.hostname)
    .beforeEach(loginUsingGreyPages);

test('should display correct result and retry should fail', async (t) => {
    const kpi = Selector('.s-execute-kpi');
    const retryButton = Selector('.s-retry-button');

    await t
        .navigateTo(`${config.hostname}/execute`)
        .expect(kpi.exists).ok()
        .expect(kpi.textContent)
        .eql('92556577.3');

    await t
        .click(retryButton)
        .expect(Selector('div.gd-message.error').exists).ok();
});
