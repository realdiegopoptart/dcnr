"use strict";

const COLOR_NAMETAG_HEALTH = toColour(185, 34, 40);
const COLOR_NAMETAG_HEALTH_FILL = toColour(75, 11, 20);

const COLOR_NAMETAG_ARMOR = toColour(200, 200, 200);
const COLOR_NAMETAG_ARMOR_FILL = toColour(40, 40, 40);

const COLOR_NAMETAG_BACKGROUND = toColour(50, 50, 50);

var nameTag = {};
nameTag.width = 154;
nameTag.drawDistance = 50.0;
nameTag.font = null;
nameTag.height = 1.1;

function updateNameTag(player) {
    if(localPlayer != null) {
        let localPosition = localPlayer.position;
        let playerPosition = player.position;
        let client = getClientFromPlayer(player);

        playerPosition[2] += nameTag.height;

        if(client == null) {
            return false;
        }

        let screenPosition = getScreenFromWorldPosition(playerPosition);
        if(screenPosition[2] >= 0.0) {
            let health  = player.health / 100;
            if(health > 1.0) {
                health = 1.0;
            }

            let armour  = player.armour / 100;
            if(armour > 1.0) {
                armour = 1.0;
            }

            let distance = localPosition.distance(playerPosition);
            if(distance <= nameTag.drawDistance && client.getData("spectating") == undefined) {
                drawNameTag(screenPosition[0], screenPosition[1], client.index, client.name, player.getData("playerColor"), health, armour, distance);
            }
        }
    }
}

function drawNameTag( x, y, id, name, color, health, armour, distance) {
    let factor = ((nameTag.drawDistance * 2 ) + 2 - distance ) / 100;

    if(factor > 1) {
        factor = 1;
    }

    let middle = x;
    x = x - (nameTag.width / 2) * factor;

    drawing.drawRectangle(null, [x, y], [nameTag.width * factor, 14 * factor], COLOR_NAMETAG_BACKGROUND, COLOR_NAMETAG_BACKGROUND, COLOR_NAMETAG_BACKGROUND, COLOR_NAMETAG_BACKGROUND);
    drawing.drawRectangle(null, [x + 2 * factor, y + 2 * factor], [(nameTag.width-4) * factor, 10 * factor], COLOR_NAMETAG_HEALTH_FILL, COLOR_NAMETAG_HEALTH_FILL, COLOR_NAMETAG_HEALTH_FILL, COLOR_NAMETAG_HEALTH_FILL);
    drawing.drawRectangle(null, [x + 2 * factor, y + 2 * factor], [((nameTag.width-4)*health)*factor, 10 * factor], COLOR_NAMETAG_HEALTH, COLOR_NAMETAG_HEALTH, COLOR_NAMETAG_HEALTH, COLOR_NAMETAG_HEALTH);

    if(armour > 0.0) { // if player has armour
        y -= 18 * factor;

        drawing.drawRectangle(null, [x, y], [nameTag.width * factor, 14 * factor], COLOR_NAMETAG_BACKGROUND, COLOR_NAMETAG_BACKGROUND, COLOR_NAMETAG_BACKGROUND, COLOR_NAMETAG_BACKGROUND);
        drawing.drawRectangle(null, [x + 2 * factor, y + 2 * factor], [(nameTag.width -4 ) * factor, 10 * factor], COLOR_NAMETAG_ARMOR_FILL, COLOR_NAMETAG_ARMOR_FILL, COLOR_NAMETAG_ARMOR_FILL, COLOR_NAMETAG_ARMOR_FILL);
        drawing.drawRectangle(null, [x + 2 * factor, y + 2 * factor], [((nameTag.width -4) * armour) * factor, 10 * factor], COLOR_NAMETAG_ARMOR, COLOR_NAMETAG_ARMOR, COLOR_NAMETAG_ARMOR, COLOR_NAMETAG_ARMOR);
    }

    y -= 35 * factor;

    let text = name+" ("+id+")";
    nameTag.font.render(text, [middle, y], 0, 0.5, 1.0, nameTag.font.size * factor, color[0], false, false, true, true);

    return;
}


bindEventHandler("onResourceStart", thisResource, (event,resource) => {
    nameTag.font = lucasFont.createDefaultFont(16.0,"Roboto","Regular");
    return true;
});

addEventHandler("OnDrawHUD",(event) => {
    let peds = getPeds();
    for(let i in peds) {
        if(peds[i].isType(ELEMENT_PLAYER)) {
            if(peds[i] != localPlayer) {
                updateNameTag(peds[i]);
            }
        }
    }
});
