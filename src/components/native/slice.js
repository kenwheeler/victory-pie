import React from "react";
import { Path } from "react-native-svg";
import Slice from "../slice";

export default class extends Slice {
  getStrokeStyles() {
    const {stroke, strokeWidth, strokeOpacity} = this.props.style;
    return stroke === "none" || stroke === "transparent"
      ? {} : {stroke, strokeWidth, strokeOpacity};
  }

  renderSlice(props) {
    return (
      <Path
        d={props.pathFunction(props.slice)}
        fill={props.style.fill}
        fillOpacity={props.style.opacity}
        {...this.getStrokeStyles()}
        {...props.events}
      />
    );
  }
}
