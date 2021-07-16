// ==UserScript==
// @name         YouTube Auto Resolution + Theatre + Volume
// @namespace    https://github.com/loqrin
// @version      1.0
// @description  Automatically sets YouTube's player to desired resolution, theatre mode and volume.
// @author       Loqrin
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(function() {
    "use strict";
    
    //Volume Settings
    const MUST_CHANGE_VOLUME = true;
    const VOLUME = 20.0;

    //Theatre Settings
    const MUST_USE_THEATRE = true;

    //Resolution Settings
    const MUST_CHANGE_RESOLUTION = true;
    const RESOLUTION = "hd1080";
    const AVAILABLE_RESOLUTIONS = ["highres", "hd2880", "hd2160", "hd1440", "hd1080", "hd720", "large", "medium", "small", "tiny"];

    function isAVideo() {
        if (window.location.href.indexOf("/watch") !== -1) {
            return true;
        }

        return false;
    }

    function getPlayerVideoIDFromURL(player) {
        const match = /(?:v=)([\w\-]+)/;
        const videoURL = player.getVideoUrl();

        return match.exec(videoURL)[1] || "ERROR";
    }

    function setVolume(player, volume) {
        if (player.getVolume === undefined) {
            window.setTimeout(setVolume, 100, player, volume);

            console.log(`YouTube Auto | API has not loaded yet, waiting...`);

            return;
        }

        player.setVolume(volume);

        console.log(`YouTube Auto | Successfully set the video's volume to: ${volume}`);
    }

    function setTheatreMode(state) {
        if (isAVideo()) {
            let page = document.getElementsByTagName("ytd-watch-flexy")[0];

            if (page) {
                if (page.wrappedJSObject) {
                    try {
                        page.wrappedJSObject.theaterModeChanged_(state);

                        console.log(`YouTube Auto | Setting video theatre mode state: ${state}`);
                    } catch (e) {
                        //Catch YouTube's exceptions...
                    }
                } else {
                    try {
                        page.theaterModeChanged_(state);

                        console.log(`YouTube Auto | Setting video theatre mode state: ${state}`);
                    } catch (e) {
                        //Catch YouTube's exceptions...
                    }
                }
            }
        }
    }
    
    function setResolution(player, resolution) {
        if (player.getPlaybackQuality === undefined) {
            window.setTimeout(setResolution, 100, player, resolution);

            console.log(`YouTube Auto | API has not loaded yet, waiting...`);

            return;
        }

        const currentResolution = player.getPlaybackQuality();

        if (AVAILABLE_RESOLUTIONS.indexOf(resolution) >= AVAILABLE_RESOLUTIONS.indexOf(currentResolution)) {
            if (player.setPlaybackQualityRange !== undefined) {
                player.setPlaybackQualityRange(resolution);
            }

            player.setPlaybackQuality(resolution);

            console.log(`YouTube Auto | Setting resolution. Current resolution is the same as the desired resolution...`);

            return;
        }

        const playerResolutions = player.getAvailableQualityLevels();
        let nextAvailableResolution = -1;

        if (playerResolutions.indexOf(resolution) !== -1) {
            nextAvailableResolution = resolution;
        } else {
            console.log(`YouTube Auto | Desired resolution (${resolution}) cannot be found for this video, locating next best available resolution...`);

            for (const playerResolution of playerResolutions) {
                if (AVAILABLE_RESOLUTIONS.indexOf(playerResolution) !== -1) {
                    nextAvailableResolution = playerResolution;

                    break;
                }
            }

            if (nextAvailableResolution === -1) {
                console.log(`YouTube Auto | Unable to locate an available resolution from the player's current list of resolutions...`);

                return;
            }
        }

        if (currentResolution !== nextAvailableResolution) {
            const playerVideoID = getPlayerVideoIDFromURL(player);

            if (playerVideoID !== "ERROR") {
                const videoTime = player.getCurrentTime();

                player.loadVideoById(playerVideoID, videoTime, nextAvailableResolution);

                if (MUST_CHANGE_VOLUME) {
                    setVolume(player, VOLUME);
                }

                console.log(`YouTube Auto | Loading video (${playerVideoID}) to remove buffer and setting its time to (${videoTime}) with the resolution: ${nextAvailableResolution}`);
            }
        }

        if (player.setPlaybackQualityRange !== undefined) {
            player.setPlaybackQualityRange(nextAvailableResolution);
        }

        player.setPlaybackQuality(nextAvailableResolution);

        console.log(`YouTube Auto | Successfully set the video's resolution to: ${nextAvailableResolution}`);
    }

    function mainThread() {
        let player = document.getElementById("movie_player") || document.getElementsByClassName("html5-video-player")[0];

        console.log(`YouTube Auto | Page has loaded, performing main thread...`);

        setTheatreMode(MUST_USE_THEATRE);

        if (player.wrappedJSObject) {                
            if (MUST_CHANGE_RESOLUTION) {
                setResolution(player.wrappedJSObject, RESOLUTION);
            }

            if (MUST_CHANGE_VOLUME) {
                setVolume(player.wrappedJSObject, VOLUME);
            }
        } else {                
            if (MUST_CHANGE_RESOLUTION) {
                setResolution(player, RESOLUTION);
            }

            if (MUST_CHANGE_VOLUME) {
                setVolume(player, VOLUME);
            }
        }
        
        //window.removeEventListener("yt-navigate-finish", mainThread, true);
    }

    window.addEventListener("yt-navigate-finish", mainThread, true);
})();
