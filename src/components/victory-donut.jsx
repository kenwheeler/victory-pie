import d3 from "d3";
import _ from "lodash";
import React from "react";
import Radium from "radium";
import {VictoryAnimation} from "victory-animation";

@Radium
class VictoryDonut extends React.Component {
  constructor(props) {
    super(props);

    const radius = Math.min(this.props.width, this.props.height) / 2;

    this.colors = d3.scale.ordinal().range(this.props.sliceColors);

    this.arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(radius - this.props.sliceWidth);

    this.pie = d3.layout.pie()
      .sort(null)
      .value((d) => { return d.y; });
  }

  getStyles(fill) {
    return {
      text: {
        fill: this.props.fontColor,
        fontFamily: this.props.fontFamily,
        fontSize: this.props.fontSize,
        fontWeight: this.props.fontWeight,
        textAnchor: "middle"
      },
      path: {
        fill,
        stroke: this.props.strokeColor,
        strokeWidth: this.props.strokeWidth
      }
    };
  }

  drawSlices(slices) {
    const arcData = this.pie(this.props.data);

    const sliceComponents = _.map(slices, (slice, index) => {
      const fill = this.colors(slice.x);
      const styles = this.getStyles(fill);

      return (
        <VictoryAnimation data={arcData[index]} key={index}>
          {(data) => {
            return (
              <g>
                <path
                  d={this.arc(data)}
                  style={styles.path}/>
                <text
                  dy=".35em"
                  transform={"translate(" + this.arc.centroid(data) + ")"}
                  style={styles.text}>
                  {slice.x}
                </text>
              </g>
            );
          }}
        </VictoryAnimation>
      );
    });

    return (<g>{sliceComponents}</g>);
  }

  render() {
    return (
      <g transform={"translate(" + this.props.width / 2 + "," + this.props.height / 2 + ")"}>
        {this.drawSlices(this.props.data)}
      </g>
    );
  }
}

VictoryDonut.propTypes = {
  data: React.PropTypes.array,
  fontColor: React.PropTypes.string,
  fontFamily: React.PropTypes.string,
  fontSize: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
  fontWeight: React.PropTypes.number,
  height: React.PropTypes.number,
  sliceColors: React.PropTypes.array,
  sliceWidth: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
  strokeColor: React.PropTypes.string,
  strokeWidth: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
  width: React.PropTypes.number
};

VictoryDonut.defaultProps = {
  data: [{ x: "A", y: 1 }, { x: "B", y: 3 }, { x: "C", y: 2 }, { x: "D", y: 1 }, { x: "E", y: 2 }],
  fontColor: "black",
  fontFamily: "Helvetica",
  fontSize: 10,
  fontWeight: 400,
  height: 300,
  sliceColors: ["#6391E7", "#7ED2E6", "#A2AED9", "#6A9CAC", "#59A5D9"],
  sliceWidth: 70,
  strokeColor: "white",
  strokeWidth: 1,
  width: 300
};

export default VictoryDonut;