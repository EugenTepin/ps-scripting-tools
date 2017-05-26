/**
 * Gets value of photoshop general preference "Resize Image During Place"
 *
 * @return {boolean}
 */
module.exports = function() {
    var ref28 = new ActionReference();
    ref28.putProperty(charIDToTypeID("Prpr"), charIDToTypeID("GnrP"));
    ref28.putEnumerated(charIDToTypeID("capp"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
    var desc65 = new ActionDescriptor();
    desc65.putReference(charIDToTypeID("null"), ref28);
    var resultDesc = executeAction(charIDToTypeID("getd"), desc65, DialogModes.NO);
    return resultDesc.getObjectValue(charIDToTypeID("GnrP")).getBoolean(stringIDToTypeID("resizePastePlace"));
}
