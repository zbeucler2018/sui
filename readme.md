## SUI (SimpleUI)
- By: Zack Beucler


### Dev commands
- **Start Client**: `npm run dev -- --host --port 4200`
- **Start Server**: `npx tsc -p ./tsconfig.json && node dist/app.js`


### Features
- normal tabs
- overlay tabs
- mobile support (essentially flexbox)
- override props
- collapse-able tables
- collapse-able sections
- ability to pause realtime updates
- modals / popups
- separate app to create overlay
    - drag-n-drop
    - manually setting it up via css might just be the easiest
    - should we be using HTML5 canvas?
- ability for the frontend to display connection status of zmq sockets
- macros within ui.json file
    - figure out if json/jsonc or yaml is more prefered. depends what the team wants
- backwards compatablilty with SimpleUI is ideal but I guess not needed
    - needs some type of translation layer

#### dev features
- enforced codestyle
    - consistancy is important
    - airBnB style/code guide
    - linting (tslint?)
    - formatting (prettier?)
    - some type of static analysis (prevent deadcode)
- devcontainer
- ability to run the paramsApp in dev mode
    - needs DB container to devcontainer and maybe apache2 container
- extensive testing
    - unit + integration

### Communication
- realtime data should be via websocket
- props should be GET
- css request for overlay should be GET
- commands should be POST
- 1 REQ ZMQ socket per client

#### Interface between client and server

