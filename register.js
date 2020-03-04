import React from "react";
import { addons, types } from "@storybook/addons";
import { AddonPanel } from "@storybook/components";
import { STORY_RENDERED } from "@storybook/core-events";

const ADDON_ID = "XSpecsPanel";
const PARAM_KEY = "myAddon";
const PANEL_ID = `${ADDON_ID}/panel`;

class XSpecsStorybookPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { storyName: "" };
  }

  componentDidMount() {
    const { api } = this.props;

    api.on(STORY_RENDERED, (storyName) => {
      this.setState({ storyName });
    });
  }

  getStoryGroupName() {
    const storyNameParts = this.state.storyName.split("--");
    return storyNameParts.length >= 1
      ? storyNameParts[0]
      : "unknownStorybookStory";
  }

  getXSpecsPath() {
    return this.props.xspecsUrl;
  }

  getLoginToXSpecsUrl() {
    return this.props.loginToXSpecsUrl;
  }

  getXSpecsEmbedUrl() {
    const xspecsIframeUnsafeUrl = `${this.getXSpecsPath()}/storybookEmbed/${this.getStoryGroupName()}?loginToXSpecsUrl=${this.getLoginToXSpecsUrl()}`;
    return encodeURI(xspecsIframeUnsafeUrl);
  }

  getIframeStyle() {
    return 'style="border: 0; max-width: 900px; height: 100%; width: 100%;"';
  }

  render() {
    const fullHeightStyle = {
      height: "100%",
      margin: "0 auto",
      maxWidth: "900px",
    };
    const XSpecsIframe = {
      __html: `<iframe src="${this.getXSpecsEmbedUrl()}" ${this.getIframeStyle()}/>`,
    };

    return (
      <div style={fullHeightStyle}>
        <div dangerouslySetInnerHTML={XSpecsIframe} style={fullHeightStyle} />
      </div>
    );
  }
}

function getXSpecsAddonParameters(api) {
  const xspecsAddonConfigurationParameterName = "xspecs";
  return api.getCurrentParameter(xspecsAddonConfigurationParameterName);
}

function getXSpecsPath(api) {
  const params = getXSpecsAddonParameters(api);
  return params && params.appUrl ? params.appUrl : "http://localhost:4000";
}

function getLoginToXSpecsUrl(api) {
  const params = getXSpecsAddonParameters(api);
  return params && params.loginToXSpecsUrl ? params.loginToXSpecsUrl : "";
}

addons.register(ADDON_ID, (api) => {
  const render = ({ active, key }) => (
    <AddonPanel active={active} key={key}>
      <XSpecsStorybookPanel
        api={api}
        xspecsUrl={getXSpecsPath(api)}
        loginToXSpecsUrl={getLoginToXSpecsUrl(api)}
      />
    </AddonPanel>
  );
  const title = "XSpecs";

  addons.add(PANEL_ID, {
    type: types.PANEL,
    title,
    render,
    paramKey: PARAM_KEY,
  });
});
