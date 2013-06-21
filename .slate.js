// Create Operations
var pushRight = slate.operation("push", {
  "direction" : "right",
  "style" : "bar-resize:screenSizeX/3"
});

var pushRight2 = slate.operation("push", {
  "direction" : "right",
  "style" : "bar-resize:screenSizeX/3*2"
});

var pushLeft = slate.operation("push", {
  "direction" : "left",
  "style" : "bar-resize:screenSizeX/3"
});

var pushLeft2 = slate.operation("push", {
  "direction" : "left",
  "style" : "bar-resize:screenSizeX/3*2"
});

var pushTop = slate.operation("push", {
  "direction" : "top",
  "style" : "bar-resize:screenSizeY/3"
});

var pushTop2 = slate.operation("push", {
  "direction" : "top",
  "style" : "bar-resize:screenSizeY/3*2"
});

var pushBottom = slate.operation("push", {
  "direction" : "bottom",
  "style" : "bar-resize:screenSizeY/3"
});

var pushBottom2 = slate.operation("push", {
  "direction" : "bottom",
  "style" : "bar-resize:screenSizeY/3*2"
});

var fullscreen = slate.operation("move", {
  "x" : "screenOriginX",
  "y" : "screenOriginY",
  "width" : "screenSizeX",
  "height" : "screenSizeY"
});

var pushCenter = slate.operation("move", {
  "x" : "screenSizeX/3",
  "y" : "screenSizeY/3",
  "width" : "screenSizeX/3",
  "height" : "screenSizeY/3"
});

var pushCenter2 = slate.operation("move", {
  "x" : "screenSizeX/6",
  "y" : "screenSizeY/6",
  "width" : "screenSizeX/3*2",
  "height" : "screenSizeY/3*2"
});

// Bind A Crazy Function to 1+ctrl
slate.bind("pad0:ctrl", function(win) {
  win.doOperation(fullscreen);
});

slate.bind("pad5:ctrl", function(win) {
  win.doOperation(pushCenter);
});

slate.bind("pad5:shift,ctrl", function(win) {
  win.doOperation(pushCenter2);
});

slate.bind("pad6:ctrl", function(win) {
    win.doOperation(pushRight);
});
slate.bind("pad6:shift,ctrl", function(win) {
    win.doOperation(pushRight2);
});

slate.bind("pad4:ctrl", function(win) {
    win.doOperation(pushLeft);
});
slate.bind("pad4:shift,ctrl", function(win) {
    win.doOperation(pushLeft2);
});

slate.bind("pad8:ctrl", function(win) {
    win.doOperation(pushTop);
});
slate.bind("pad8:shift,ctrl", function(win) {
    win.doOperation(pushTop2);
});

slate.bind("pad2:ctrl", function(win) {
    win.doOperation(pushBottom);
});

slate.bind("pad2:shift,ctrl", function(win) {
    win.doOperation(pushBottom2);
});

slate.configAll({
  "defaultToCurrentScreen": true,
  "secondsBetweenRepeat": 0.1,
  "checkDefaultsOnLoad": true,
  "focusCheckWidthMax": 3000,
});

// Thunderbolt 
var monitors = {
  'thunderbolt': {
    'screen': "2560x1440",
    'ops': {}
  }
};

// Build operation
var ops = monitors.thunderbolt.ops;

ops.corner = slate.op("corner", {
  "screen": monitors.thunderbolt.screen,
  "direction": "top-left",
  "width": "screenSizeX/9",
  "height": "screenSizeY"
});

ops.full = slate.op("move", {
  "screen": monitors.thunderbolt.screen,
  "x": "screenOriginX",
  "y": "screenOriginY",
  "width": "screenSizeX",
  "height": "screenSizeY"
});

var full = ops.full;

ops.top = full.dup({"height": "screenSizeY/2"});
ops.topLeft = full.dup({"width": "screenSizeX/2"});
ops.topRight = full.dup({"x": "screenOriginX+screenSizeX/2"});
ops.bottom = full.dup({"y": "screenOriginY+screenSizeY/2"});
ops.bottomLeft = full.dup({"width": "screenSizeX/3"});
ops.bottomMid = full.dup({"x": "screenOriginX+screenSizeX/3"});
ops.bottomRight = full.dup({"x": "screenOriginX+2*screenSizeX/3"});
ops.left = full.dup({"height": "screenSizeY"});
ops.right = full.dup({"height": "screenSizeY"});

var iTermHash = {
  "operations": [
    monitors.thunderbolt.ops.bottomMid,
    monitors.thunderbolt.ops.bottomRight,
    monitors.thunderbolt.ops.bottomTop,
  ],
  "sort-title": true,
  "repeat-last": true
};

var homeLayout = slate.layout("home", {
  "Adium": {
    "operations": [ops.bottomLeft],
    "ignore-fail": true,
    "title-order": ["Contacts"],
    "repeat-last": true
  },
  "iTerm": iTermHash,
});

slate.log(homeLayout);
// Defaults
slate.def([monitors.thunderbolt], homeLayout);

// Layout Operations
//var threeMonitor = S.op("layout", { "name" : threeMonitorLayout });
//var twoMonitor = S.op("layout", { "name" : twoMonitorLayout });

var oneMonitor = slate.op("layout", { "name" : homeLayout });
var universalLayout = function() {
  // Should probably make sure the resolutions match but w/e
  if (S.screenCount() === 3) {
//    threeMonitor.run();
  } else if (S.screenCount() === 2) {
//    twoMonitor.run();
  } else if (S.screenCount() === 1) {
    oneMonitor.run();
  }
};

slate.log("Running on " + slate.screenCount() + " screen(s).")
// Log that we're done configuring
slate.log("[SLATE] -------------- Finished Loading Config --------------");
