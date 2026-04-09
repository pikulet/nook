-- make-aseprite.lua
-- Takes a static PNG and creates a 4-frame .aseprite file with identical frames.
-- Usage: aseprite -b --script-param file=path/to/sprite.png --script make-aseprite.lua

local filepath = app.params["file"]
if not filepath then
  print("ERROR: pass --script-param file=<path>")
  return
end

local sprite = app.open(filepath)
if not sprite then
  print("ERROR: could not open " .. filepath)
  return
end

local origCel = sprite.cels[1]
local origImage = origCel.image:clone()
local origPos = origCel.position

for i = 2, 4 do
  sprite:newEmptyFrame(i)
  sprite:newCel(sprite.layers[1], i, origImage:clone(), origPos)
  sprite.frames[i].duration = 0.3
end
sprite.frames[1].duration = 0.3

local aseFile = filepath:gsub("%.png$", ".aseprite")
sprite:saveAs(aseFile)

print("OK: " .. aseFile)
sprite:close()
