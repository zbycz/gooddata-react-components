import { ClientFunction, Selector, Role } from 'testcafe';
import { config } from '../config';
import { currentUser } from '../userRole';

const getPageUrl = ClientFunction(() => window.location.href.toString());

fixture('KPI')
    .page(config.hostname + '/kpi');

test('kpi has correct number', async (t) => {
    const kpi = Selector('.gdc-kpi');
    await t
        .useRole(currentUser)
        .expect(kpi.exists).ok()
        .expect(kpi.textContent).eql('92,556,577.3');
});
