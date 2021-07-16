# YouTube Auto Resolution Theatre Volume
Utilizes Tampermonkey to automatically set YouTube video's resolution to desired resolution, allows to automatically set theatre mode and automatically sets the volume of the video to desired volume.
 
# How To Use
The script is made to be ran in Tampermonkey extension. Download it and create a new script, copy and paste the code and save the script.
To modify the values to your desire, in the code are 5 variables to change.

//Volume Settings
#] MUST_CHANGE_VOLUME - boolean, accepts true or false.
#] VOLUME - number, accepts values between 0 - 100.

//Theatre Settings
#] MUST_USE_THEATRE - boolean, accepts true or false.

//Resolution Settings
#] MUST_CHANGE_RESOLUTION - boolean, accepts true or false.
#] RESOLUTION - string, accepts the following resolutions:
["highres", "hd2880", "hd2160", "hd1440", "hd1080", "hd720", "large", "medium", "small", "tiny"]
