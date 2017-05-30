# ps-scripting-tools
This is set of helper functions for extend scripts that run into Adobe Photoshop.

# Warning

This code is under development, thus the signature of functions may varay from version to version.

# Installation

```npm install ps-scripting-tools```

# Reference

### addControl
Adds UI elements to window object.

### alignLayer
Aligns layer with active selection boundaries.

### beholder
Binds watchers on object properies. Callbacks will fire when value of the property changes.

### getAppResizeOnPlace
Gets the value of ** Edit > Preference > Resize Image During Place **.

### getExtension
Get extension from uri like string.

### getFilesByExtension
Seek files with given extensions in folder, and return them as an array of files.

### getFolders
Return array of subfolders (one level down) in given folder.

### layerHasMask
Detects if layer has layer mask.

### linkLayerWithMask
Links or unlinks Layer with its Layer Mask.

### placeFile
Places file in active document as smart object.

### replaceContent
Replaces content of smart object.

### resizeDocument
Resizes document.

### setAppResizeOnPlace
Sets the value of ** Edit > Preference > Resize Image During Place **.

### setDocumentResolution
Sets ** dpi ** in specified document. Do not change it actual size in pixels.

### setLayerMaskFromSelection
Makes layer Mask from active selection.

### setLayerMaskVisibility
Disables or enables layers mask if present.

### setSelectionByLayer
Set active selection acording to layers bitmap or layers mask.

### transferLayerStyle
Copies Layer Style (Drop shadow e.t.c.) from one layer to another.