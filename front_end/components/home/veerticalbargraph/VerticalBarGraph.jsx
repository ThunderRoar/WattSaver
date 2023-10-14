import React, { Component } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel } from 'victory';

class VerticalBarGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { name: "Item 1", value: 30 },
        { name: "Item 2", value: 50 },
        { name: "Item 3", value: 20 },
        // Add more data as needed
      ]
    };
  }

  render() {
    return (
      <div>
        <VictoryChart
          width={400}
          height={600}
          domainPadding={20}
          padding={{ top: 20, right: 20, bottom: 30, left: 40 }}
        >
          <VictoryAxis
            tickFormat={() => ''}
          />
          <VictoryBar
            data={this.state.data}
            x="name"
            y="value"
            style={{
              data: {
                fill: "steelblue",
                width: 20 // Adjust bar width as needed
              }
            }}
          />
          <VictoryAxis
            dependentAxis
          />
          <VictoryLabel
            text="Values"
            x={200}
            y={10}
            textAnchor="middle"
            style={{ fontSize: 18 }}
          />
        </VictoryChart>
      </div>
    );
  }
}

export default VerticalBarGraph;