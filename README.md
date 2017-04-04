# ps-scripting-tools
This is set of helper functions for extend scripts that run into Adobe Photoshop.

# Installation

```npm install ps-scripting-tools```

# Reference

### addControl
Adds UI elements to window object.

### beholder
Binds watchers on object properies. Callbacks will fire when value of the property changes.

### alignLayer
Aligns active layer with active selection boundaries.

### linkLayerWithMask
Links or unlinks Layer with its Layer Mask.

### setLayerMaskFromSelection
Makes layer Mask from active selection.

### transferLayerStyle
Copies Layer Style (Drop shadow e.t.c.) from one layer to another.

### setSelectionByLayer
Set active selection acording to layers bitmap or layers mask.

### getExtension
Get extension from uri like string.

### getFilesByExtension
Seek files with given extensions in folder, and return them as an array of files.

### getFolders
Return array of subfolders (one level down) in given folder.

### placeFile
Places file in active document as smart object.

### resizeDocument
Resizes active document.

### setDocumentResolution
Sets dpi in specified document. Do not change it actual size in pixels.