const { app, BrowserWindow } = require("electron");
const path = require("path");
require("dotenv").config();
let mainWindow;

app.on("ready", () => {
    mainWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    const isDev = process.env.NODE_ENV === "development";
    if (isDev) {
        mainWindow.loadURL("http://localhost:3000"); // Load Next.js dev server
    } else {
        mainWindow.loadURL(`file://${path.join(__dirname, "../out/index.html")}`);
    }

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
