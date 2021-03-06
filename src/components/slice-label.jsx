import React, { PropTypes } from "react";
import { Helpers, VictoryLabel } from "victory-core";
import defaults from "lodash/defaults";
import assign from "lodash/assign";

export default class SliceLabel extends React.Component {
  static propTypes = {
    index: PropTypes.number,
    labels: PropTypes.any,
    positionFunction: PropTypes.func,
    slice: PropTypes.object,
    style: PropTypes.object,
    datum: PropTypes.object,
    events: PropTypes.object
  };

  renderLabelComponent(props, position, label) {
    const component = props.labels;
    const style = Helpers.evaluateStyle(
      defaults({}, component.props.style, props.style, {padding: 0}),
      this.data
    );
    const baseEvents = component && component.props.events ?
      defaults({}, component.props.events, props.events) : props.events;
    const events = Helpers.getPartialEvents(baseEvents, props.index, props);
    const newProps = assign({}, events, {
      x: component.props.x || position[0],
      y: component.props.y || position[1],
      datum: props.datum, // Pass data for custom label component to access
      textAnchor: component.props.textAnchor || "start",
      verticalAnchor: component.props.verticalAnchor || "middle",
      text: component.props.text || label,
      style
    });
    return React.cloneElement(component, newProps);
  }

  renderVictoryLabel(props, position, label) {
    const style = Helpers.evaluateStyle(
      assign({padding: 0}, props.style),
      props.datum
    );
    const events = Helpers.getPartialEvents(props.events, props.index, props);
    return (
      <VictoryLabel
        x={position[0]}
        y={position[1]}
        datum={props.datum}
        style={style}
        text={label}
        events={events}
      />
    );
  }

  renderLabel(props) {
    const position = props.positionFunction(props.slice);
    const dataLabel = props.datum.xName ? `${props.datum.xName}` : `${props.datum.x}`;
    const label = props.datum.label ?
    `${Helpers.evaluateProp(props.datum.label, props.datum)}` : dataLabel;
    return props.labels && props.labels.props ?
      this.renderLabelComponent(props, position, label) :
      this.renderVictoryLabel(props, position, label);
  }

  render() {
    return this.renderLabel(this.props);
  }
}
