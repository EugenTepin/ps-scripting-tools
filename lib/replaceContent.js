/**
 * Places file in active document as smart object.
 * @param {file}    file                          - ExtendScript file reference.
 * @param {layer}   layer                         - Adobe Photoshop layer reference.
 * @param {object}  [options]                     - options for the file placement.
 * @param {string}  [options.method = fill]       - "fill", "fit", "as is" or "conform".
 * @param {string}  [options.horizontal = center] - horizontal alignment "left", "center" or "right".
 * @param {string}  [options.vertical = center]   - vertical alignment "top", "center" or "bottom".
 * @param {boolean} [options.revealAll = true]    - revealAll in smart objects document
 * 
 * @return {undefined}
 */
module.exports = function(file, layer, options) {

    var setDocumentResolution = require('./setDocumentResolution.js');
    var resizeDocument = require('./resizeDocument.js');
    var alignLayer = require('./alignLayer.js');
    var setSelectionByLayer = require('./setSelectionByLayer.js');
    var linkLayerWithMask = require('./linkLayerWithMask.js');
    var layerHasMask = require('./layerHasMask.js');
    var setLayerMaskVisibility = require('./setLayerMaskVisibility.js');
    var placeFile = require('./placeFile.js');

    function replace(f) {
        var idplacedLayerReplaceContents = stringIDToTypeID("placedLayerReplaceContents");
        var desc4 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        desc4.putPath(idnull, f);
        executeAction(idplacedLayerReplaceContents, desc4, DialogModes.NO);
    }

    function scaleFactor(a, b, method) {
        var f = {
            'fill': Math.max(a.width / b.width, a.height / b.height),
            'fit': Math.min(a.width / b.width, a.height / b.height),
            'as is': 1,
            'conform': -1
        };
        return f[method];
    }


    if (!file.exists) {
        throw ("File [" + File.decode(file.absoluteURI) + "] does not exist!");
    }

    if (layer !== void 0 && layer.kind === LayerKind.SMARTOBJECT) {
        if (options !== void 0) {
            var method = options.method || "fill";
            var horizontal = options.horizontal || "center";
            var vertical = options.vertical || "center";
            var revealAll = !!options.revealAll;
        } else {
            var method = "fill";
            var horizontal = "center";
            var vertical = "center";
            var revealAll = true;
        }

        var curentActiveDocument = app.activeDocument;
        var curentActiveLayer = app.activeDocument.activeLayer;

        app.activeDocument.activeLayer = layer;
        if (revealAll) {
            replace(file);
            if (layerHasMask(layer)) {
                linkLayerWithMask(layer, false);
                setLayerMaskVisibility(layer, false);
                var selection = setSelectionByLayer(layer, 'mask');
                var selectionBounds = [];
                selectionBounds.push([selection.bounds[0].as('px'), selection.bounds[1].as('px')]);
                selectionBounds.push([selection.bounds[0].as('px'), selection.bounds[3].as('px')]);
                selectionBounds.push([selection.bounds[2].as('px'), selection.bounds[3].as('px')]);
                selectionBounds.push([selection.bounds[2].as('px'), selection.bounds[1].as('px')]);

                var maskBounds = {
                    width: (selection.bounds[2] - selection.bounds[0]),
                    height: (selection.bounds[3] - selection.bounds[1])
                };

                var picBounds = {
                    width: (layer.bounds[2] - layer.bounds[0]),
                    height: (layer.bounds[3] - layer.bounds[1])
                };
                app.activeDocument.selection.deselect();
                var scale = scaleFactor(maskBounds, picBounds, method);
                if (scale > 0) {
                    layer.resize(scale * 100, scale * 100);
                } else {
                    layer.resize(100 * maskBounds.width / picBounds.width, 100 * maskBounds.height / picBounds.height);
                }

                app.activeDocument.selection.select(selectionBounds);
                alignLayer(layer, {
                    horizontal: horizontal,
                    vertical: vertical
                });
                setLayerMaskVisibility(layer, true);
                app.activeDocument.selection.deselect();
            }

        } else {
            // it will open new document (smart object) and will make it active 
            executeAction(stringIDToTypeID("placedLayerEditContents"), new ActionDescriptor(), DialogModes.NO);
            var so = app.activeDocument;
            var placedLayer = placeFile(file, undefined, { method: method, horizontal: horizontal, vertical: vertical, linked: false });
            placedLayer.move(so.layers[0], ElementPlacement.PLACEBEFORE);
            so.close(SaveOptions.SAVECHANGES);
        }

    }
    app.activeDocument = curentActiveDocument;
    app.activeDocument.activeLayer = curentActiveLayer;
}
