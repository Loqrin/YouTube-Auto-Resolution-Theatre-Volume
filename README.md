# YouTube Auto Resolution Theatre Volume
## About

Utilizes Tampermonkey to automatically set YouTube video's resolution to desired resolution, allows to automatically set theatre mode and automatically sets the volume of the video to desired volume.

## Features

- Automatically set the YouTube video to desired resolution
- Automatically set the YouTube video to desired volume.
- Automatically set the YouTube video to theatre mode.

## Installation
Download and install the Chrome Extension [TamperMonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en). Once installed, navigate to the extension's dashboard. Create a new script by clicking the plus button. Go ahead and copy the code from this repository and paste it in the script editor. Save it. Voila!

## How To Use
Using the script is simple. After creating the script in TamperMonkey, you can adjust the values / variables in the script to your liking. There are 5 variables that you can adjust.

```javascript
//Volume Settings
const MUST_CHANGE_VOLUME = true;
const VOLUME = 20.0;

//Theatre Settings
const MUST_USE_THEATRE = true;

//Resolution Settings
const MUST_CHANGE_RESOLUTION = true;
const RESOLUTION = "hd1080";
```

> Note: The available resolutions you can pick from are:
> `"highres", "hd2880", "hd2160", "hd1440", "hd1080", "hd720", "large", "medium", "small", "tiny"`

## License
GNU General Public License v3.0
