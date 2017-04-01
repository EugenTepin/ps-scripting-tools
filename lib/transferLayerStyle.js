/**
 * Transfers layer style from one layer to another.
 * @param {layer} from - layer donor of layer style.
 * @param {layer} to   - layer recipient of layer style.
 *
 * @return {boolean} returns true if layer style transfer was succesfull, false otherwise.
 */
module.exports = function(from, to) {
	var currentLayer = app.activeDocument.activeLayer;
	try {
		app.activeDocument.activeLayer = from;
		var idCpFX = charIDToTypeID("CpFX");
		executeAction(idCpFX, undefined, DialogModes.NO);

		app.activeDocument.activeLayer = to;
		var idPaFX = charIDToTypeID("PaFX");
		var desc22 = new ActionDescriptor();
		var idallowPasteFXOnLayerSet = stringIDToTypeID("allowPasteFXOnLayerSet");
		desc22.putBoolean(idallowPasteFXOnLayerSet, true);
		executeAction(idPaFX, desc22, DialogModes.NO);
	} catch (e) {
		app.activeDocument.activeLayer = currentLayer;
		return false;
	}
	app.activeDocument.activeLayer = currentLayer;
	return true;
}