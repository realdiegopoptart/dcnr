addEventHandler("onProcess", (event, deltaTime) => {
    
    if(Game.current() == GTA_III || Game.current() == GTA_VC || Game.current() == GTA_SA) {
        if(localPlayer) { // clear default wanted level
            natives.CLEAR_WANTED_LEVEL(localClient.index);
        }
    }
    if(Game.current() == GTA_IV) {
        if(localPlayer) {
            natives.clearWantedLevel(localClient.index);
        }
    }
    if(Game.current() == MAFIA_ONE) {
        //  nothing to do here (yet)
    }
});
