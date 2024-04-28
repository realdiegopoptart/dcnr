addEventHandler("onProcess", (event, deltaTime) => {
    
    if(gta.game == GTA_III || gta.game == GTA_VC || gta.game == GTA_SA) {
        if(localPlayer) { // clear default wanted level
            natives.CLEAR_WANTED_LEVEL(localClient.index);
        }
    }
    if(gta.game == GTA_IV) {
        if(localPlayer) {
            natives.clearWantedLevel(localClient.index);
        }
    }
});
