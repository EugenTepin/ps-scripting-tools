/**
 * Set active selection according to layer or layer mask.
 * @param {layer}  layer - layer
 * @param {string} area  - definese from wich boundaries (layer or layer mask) selection will be formed
 *
 * @return {selection}
 */
module.exports = function(layer, area) {
    var selectionMap = {
        mask: "Msk ",
        layer: "Trsp"
    };
    var currentLayer = app.activeDocument.activeLayer;
    app.activeDocument.activeLayer = layer;
    try {
        if (selectionMap[area] !== void 0) {
            var idsetd = charIDToTypeID("setd");
            var desc8 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            var ref7 = new ActionReference();
            var idChnl = charIDToTypeID("Chnl");
            var idfsel = charIDToTypeID("fsel");
            ref7.putProperty(idChnl, idfsel);
            desc8.putReference(idnull, ref7);
            var idT = charIDToTypeID("T   ");
            var ref8 = new ActionReference();
            var idChnl = charIDToTypeID("Chnl");
            var idChnl = charIDToTypeID("Chnl");
            var id = charIDToTypeID(selectionMap[area]);
            ref8.putEnumerated(idChnl, idChnl, id);
            desc8.putReference(idT, ref8);
            executeAction(idsetd, desc8, DialogModes.NO);
        }
    } catch (e) {
        app.activeDocument.activeLayer = currentLayer;
        return layer.parent.selection;
    }
    /* 
    var idsetd = charIDToTypeID("setd");
    var desc19 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref9 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idfsel = charIDToTypeID("fsel");
    ref9.putProperty(idChnl, idfsel);
    desc19.putReference(idnull, ref9);
    var idT = charIDToTypeID("T   ");
    var ref10 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idChnl = charIDToTypeID("Chnl");
    var id = charIDToTypeID(selectionMap[area]);
    ref10.putEnumerated(idChnl, idChnl, id);
    var idLyr = charIDToTypeID("Lyr ");
    ref10.putName(idLyr, layerName);
    desc19.putReference(idT, ref10);
    executeAction(idsetd, desc19, DialogModes.NO);*/

    app.activeDocument.activeLayer = currentLayer;
    return layer.parent.selection;
}
