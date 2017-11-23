import * as React from 'react';
import { mount } from 'enzyme';
import { delay } from '../../tests/utils';
import { LineChart } from '../LineChart';
import { LineChart as CoreLineChart } from '../../core/LineChart';
import { dummyExecuteAfmAdapterFactory } from './utils/DummyExecuteAfmAdapter';

describe('LineChart', () => {
    const afmWithAttr = {
        attributes: [
            {
                localIdentifier: 'a1',
                displayForm: { uri: 'abc' }
            }
        ]
    };

    it('should provide default resultSpec to core LineChart with attributes', () => {
        const wrapper = mount((
            <LineChart
                projectId="prId"
                afm={afmWithAttr}
                resultSpec={{}}
                adapterFactory={dummyExecuteAfmAdapterFactory}
            />));

        return delay().then(() => {
            const dimensions = wrapper.find(CoreLineChart).props().resultSpec.dimensions;
            expect(dimensions).toEqual([ { itemIdentifiers: ['a1'] }, { itemIdentifiers: ['measureGroup'] } ]);
        });
    });

});
