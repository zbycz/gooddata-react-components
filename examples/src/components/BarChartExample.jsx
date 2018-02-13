import React, { Component } from 'react';
import { AfmComponents } from '@gooddata/react-components';
import { factory } from 'gooddata';

import '@gooddata/react-components/styles/css/main.css';

import { Loading } from './Loading';
import { Error } from './Error';
import { totalSalesIdentifier, locationResortIdentifier, projectId } from '../utils/fixtures';

const { BarChart } = AfmComponents;

export class BarChartExample extends Component {
    onLoadingChanged(...params) {
        // eslint-disable-next-line no-console
        console.info('BarChartExample onLoadingChanged', ...params);
    }

    onError(...params) {
        // eslint-disable-next-line no-console
        console.info('BarChartExample onLoadingChanged', ...params);
    }

    render() {
        const afm = {"afm":{"measures":[{"localIdentifier":"4849aaca-2524-464c-8744-155e87aa19a6","definition":{"measure":{"item":{"uri":"/gdc/md/GoodSalesDemo/obj/23918"}}},"alias":"# Deals off Pace"}]},"resultSpec":{"dimensions":[{"itemIdentifiers":["measureGroup"]},{"itemIdentifiers":[]}]}};

        const sdk = factory('https://giraffes.intgdc.com');

        return (
            <div style={{ height: 300 }} className="s-bar-chart">
                <BarChart
                    projectId={"GoodSalesDemo"}
                    afm={afm.afm}
                    onLoadingChanged={this.onLoadingChanged}
                    onError={this.onError}
                    LoadingComponent={Loading}
                    ErrorComponent={Error}
                    sdk={sdk}
                />
            </div>
        );
    }
}

export default BarChartExample;
