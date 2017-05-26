/**
 * Disables or enables layers mask if present
 * @param {layer}   layer - Photoshop layer reference.
 * @param {boolean} link  - true enable mask, false disable
 *
 * @return {undefined}
 */
module.exports = function(layer, visible) {
    // контроль типа входных параметров
    var layerHasMask = require('./layerHasMask.js');
    if (layerHasMask(layer)) {
        var currentLayer = app.activeDocument.activeLayer;
        app.activeDocument.activeLayer = layer;

        var idsetd = charIDToTypeID("setd");
        var desc7 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref4 = new ActionReference();
        var idLyr = charIDToTypeID("Lyr ");
        var idOrdn = charIDToTypeID("Ordn");
        var idTrgt = charIDToTypeID("Trgt");
        ref4.putEnumerated(idLyr, idOrdn, idTrgt);
        desc7.putReference(idnull, ref4);
        var idT = charIDToTypeID("T   ");
        var desc8 = new ActionDescriptor();
        var idUsrM = charIDToTypeID("UsrM");
        desc8.putBoolean(idUsrM, visible);
        var idLyr = charIDToTypeID("Lyr ");
        desc7.putObject(idT, idLyr, desc8);
        executeAction(idsetd, desc7, DialogModes.NO);
        app.activeDocument.activeLayer = currentLayer;
    }
}
