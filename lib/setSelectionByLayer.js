/**
 * Set active selection according to layer or layer mask.
 * @param {string} layerName - layer name.
 * @param {string} area      - definese from wich boundaries (layer or layer mask) selection will be formed
 *
 * @return {undefined}
 */
module.exports = function(layerName, area) {
    var selectionMap = {
        mask: "Msk ",
        layer: "Trsp"
    };

    if (selectionMap[area] !== void 0) {
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
        executeAction(idsetd, desc19, DialogModes.NO);
    }
}