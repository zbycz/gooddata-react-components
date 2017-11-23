import * as React from 'react';
import { mount } from 'enzyme';
import { delay } from '../../tests/utils';
import { PieChart } from '../PieChart';
import { PieChart as CorePieChart } from '../../core/PieChart';
import { dummyExecuteAfmAdapterFactory } from './utils/DummyExecuteAfmAdapter';

describe('PieChart', () => {
    const afmWithAttr = {
        attributes: [
            {
                localIdentifier: 'a1',
                displayForm: { uri: 'abc' }
            }
        ]
    };

    it('should provide default resultSpec to core PieChart', () => {
        const wrapper = mount((
            <PieChart
                projectId="prId"
                afm={{}}
                resultSpec={{}}
                adapterFactory={dummyExecuteAfmAdapterFactory}
            />));

        return delay().then(() => {
            const dimensions = wrapper.find(CorePieChart).props().resultSpec.dimensions;
            expect(dimensions).toEqual([ { itemIdentifiers: ['measureGroup'] }, { itemIdentifiers: [] } ]);
        });
    });

    it('should provide default resultSpec to core PieChart with attributes', () => {
        const wrapper = mount((
            <PieChart
                projectId="prId"
                afm={afmWithAttr}
                resultSpec={{}}
                adapterFactory={dummyExecuteAfmAdapterFactory}
            />));

        return delay().then(() => {
            const dimensions = wrapper.find(CorePieChart).props().resultSpec.dimensions;
            expect(dimensions).toEqual([ { itemIdentifiers: ['a1'] }, { itemIdentifiers: ['measureGroup'] } ]);
        });
    });

});
