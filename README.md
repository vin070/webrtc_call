## Peer to peer webRTC based call

## Description
Peer to Peer webRTC based call without any third party library. It is developed from scratch. Project has following features.
- Mute/Unmute Audio.
- Camera on/off.
- Copy invite.
- Terminate call.

## Installation
1. Install NodeJS version 16
    - `cd ~`
    - `curl -sL https://deb.nodesource.com/setup_16.x -o /tmp/nodesource_setup.sh`
    - `sudo bash /tmp/nodesource_setup.sh`
    - `sudo apt install nodejs -y `
    - `sudo apt-get install gcc g++ make -y`
    - verify nodeJS and npm package install using `node -v && npm -v` command.

2. Installing angular version 11
    - `sudo npm install -g @angular/cli@11`
    - Verify angular cli installation using following command
`ng --version`

3. Clone package.  
    - `git clone https://github.com/vin070/webrtc_call.git`
    - run `npm i` command in cloned repository to install project dependency.
    - run `sudo ng serve --ssl` in cloned repository.
    - `git clone https://github.com/vin070/node_signalling.git` to install signalling server.
    - run `sudo node server.js` in signalling server directory.
    - Navigate to https://localhost:4200. Enjoy and share peer to peer webRTC based call with your friends/colleagues.
    - If you want to make a build after making changes in frontend code, run `sudo ng build --prod`. All compiled files are available in dist folder under project directory.

## Reference
[Peer to Peer Architecture](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Signaling_and_video_calling)
