import { configure } from "@storybook/react";
import { setOptions } from "@storybook/addon-options";
import { themes } from "@storybook/components";

function loadStories() {
  require("../stories/index.js");
  // You can require as many stories as you need.
}

setOptions({
  theme: themes.dark
});

configure(loadStories, module);
