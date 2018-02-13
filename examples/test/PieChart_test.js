import { Selector } from 'testcafe';
import { config } from './utils/config';
import { loginUsingGreyPages } from './utils/helpers';

fixture('PieChart') // eslint-disable-line no-undef
    .page(config.hostname)
    .beforeEach(loginUsingGreyPages);

test('should render', async (t) => {
    const loading = Selector('.s-loading');
    const chart = Selector('.s-pie-chart');
    await t
        .navigateTo(`${config.hostname}/basic-components`)
        .expect(loading.exists).ok()
        .expect(chart.exists)
        .ok()
        .expect(chart.textContent);
});
