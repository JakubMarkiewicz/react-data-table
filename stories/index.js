import React from "react";
import { storiesOf } from "@storybook/react";
import CustomChart from "../components/CustomChart";

const mockedData = {};

const bodyStyle = {
  display: "grid",
  placeContent: "center"
};

storiesOf("Button", module).add("with text", () => (
  <div style={bodyStyle}>
    <div style={{ width: 1000 }}>
      <CustomChart />
    </div>
  </div>
));
