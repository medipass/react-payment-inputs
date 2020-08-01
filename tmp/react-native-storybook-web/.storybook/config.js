import { configure, addDecorator } from "@storybook/react";
import { configureViewport } from "@storybook/addon-viewport";
import { withOptions } from "@storybook/addon-options";
import { withKnobs } from "@storybook/addon-knobs";

function loadStories() {
  const req = require.context("../src", true, /\.story\.jsx?$/);
  req.keys().forEach(story => req(story));
}

addDecorator(
  withOptions({
    addonPanelInRight: true
  }),
  withKnobs({
    escapeHTML: false
  })
);

configure(loadStories, module);
configureViewport({
  defaultViewport: "iphone6p"
});
