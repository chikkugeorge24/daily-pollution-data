import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

import config from './config';

/** PollutionGraph shows the daily pollution data in a Responsive bar */
const PollutionGraph = (props) => {
    return (
        <div className="graph">
            <ResponsiveBar
                data={props.graphData}
                keys={config.keys}
                indexBy="location"
                margin={config.margin}
                padding={0.3}
                colors={config.colors}
                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                axisTop={null}
                axisRight={null}
                axisBottom={config.axisBottom}
                axisLeft={config.axisLeft}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                legends={config.legends}
            />
        </div>
    );
};
export default PollutionGraph;