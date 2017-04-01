/**
 * Set layer mask from active selection.
 * @param {layer} layer - Adobe Photoshop layer reference.
 *
 * @return {undefined}
 */
module.exports = function(layer) {
    var currentLayer = app.activeDocument.activeLayer;
    app.activeDocument.activeLayer = layer;

    var idMk = charIDToTypeID("Mk  ");
    var desc29 = new ActionDescriptor();
    var idNw = charIDToTypeID("Nw  ");
    var idChnl = charIDToTypeID("Chnl");
    desc29.putClass(idNw, idChnl);
    var idAt = charIDToTypeID("At  ");
    var ref14 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idChnl = charIDToTypeID("Chnl");
    var idMsk = charIDToTypeID("Msk ");
    ref14.putEnumerated(idChnl, idChnl, idMsk);
    desc29.putReference(idAt, ref14);
    var idUsng = charIDToTypeID("Usng");
    var idUsrM = charIDToTypeID("UsrM");
    var idRvlS = charIDToTypeID("RvlS");
    desc29.putEnumerated(idUsng, idUsrM, idRvlS);
    executeAction(idMk, desc29, DialogModes.NO);

    app.activeDocument.activeLayer = currentLayer;
}