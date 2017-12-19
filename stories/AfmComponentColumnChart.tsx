import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { screenshotWrap } from '@gooddata/test-storybook';

import { ColumnChart } from '../src/components/afm/ColumnChart';
import {
    AFM_ONE_MEASURE_ONE_ATTRIBUTE,
    AFM_TWO_MEASURES_ONE_ATTRIBUTE
} from './data/afmComponentProps';
import { CUSTOM_COLORS } from './data/colors';
import { onErrorHandler } from './mocks';
import '../styles/scss/charts.scss';

storiesOf('AFM components - ColumnChart', module)
    .add('two measures, one attribute', () => (
        screenshotWrap(
            <div style={{ width: 800, height: 400 }}>
                <ColumnChart
                    projectId="storybook"
                    afm={AFM_TWO_MEASURES_ONE_ATTRIBUTE}
                    onError={onErrorHandler}
                />
            </div>
        )
    ))
    .add('custom colors', () => (
        screenshotWrap(
            <div style={{ width: 800, height: 400 }}>
                <ColumnChart
                    projectId="storybook"
                    afm={AFM_ONE_MEASURE_ONE_ATTRIBUTE}
                    config={{ colors: CUSTOM_COLORS }}
                    onError={onErrorHandler}
                />
            </div>
        )
    ))
    .add('chart.reflow()', () => {
        let reflowTrigger: Function;
        const getReflowTrigger = (fnc: Function) => { reflowTrigger = fnc; };
        const reflow = () => { reflowTrigger(); };

        let outerDiv: any;
        const resizeToggle = () => {
            outerDiv.style.width = (outerDiv.style.width === '500px') ? '100%' : '500px';
        };

        return (
            <div>
                <button onClick={reflow}>call reflowTrigger()</button>
                <button onClick={resizeToggle}>toggle size</button>
                <div style={{ width: '100%', height: '500px' }} ref={(o) => { outerDiv = o; }}>
                    <ColumnChart
                        projectId="storybook"
                        afm={AFM_ONE_MEASURE_ONE_ATTRIBUTE}
                        config={{ colors: CUSTOM_COLORS, getReflowTrigger }}
                        onError={onErrorHandler}
                    />
                </div>
            </div>
        );
    });
