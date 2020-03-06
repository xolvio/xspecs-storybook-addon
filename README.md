# XSpecs storybook addon

## To get started

1. Install the addon by:
```bash
yarn add @xspecs/storybook-addon --dev
```

2. Add the addon package to storybook main.js config file:
```
module.exports = {
  stories: ['...'],
  addons: ['...', '@xspecs/storybook-addon'],
};
```

3. Configure the XSpecs app url and login page by appending this to the preview.js storybook config file:
```
// This is the XSpecs addon configuration
addParameters({
  xspecs: {
    appUrl: "https://app.xspecs.io",
    loginToXSpecsUrl:
      "https://your-jira-domain/plugins/servlet/ac/io.xspecs.jira/xspecs-storybook",
  },
});
```

## Usage

After installing the addon you will find an XSpecs panel on the bottom of the rendered story view in the storybook. You'll need to login to your JIRA and show any view with XSpecs specs on it.

Then for each story you'll be able to find and add specs for your stories. They will be shared for all of the storybook users.

## Contact us

https://www.xolv.io/
https://www.xspecs.io/
