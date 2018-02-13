import { Selector } from 'testcafe';
import { config } from './utils/config';
import { loginUsingGreyPages } from './utils/helpers';

fixture('ColumnChart') // eslint-disable-line no-undef
    .page(config.hostname)
    .beforeEach(loginUsingGreyPages);

test('should render', async (t) => {
    const loading = Selector('.s-loading');
    const table = Selector('.s-table');
    await t
        .navigateTo(`${config.hostname}/basic-components`)
        .expect(loading.exists).ok()
        .expect(table.exists)
        .ok()
        .expect(table.textContent);
});
