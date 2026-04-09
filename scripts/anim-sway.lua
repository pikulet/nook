-- anim-sway.lua
-- Creates a 4-frame gentle horizontal sway animation.
-- Frame 1: original (center)
-- Frame 2: shifted 2px right
-- Frame 3: original (center)
-- Frame 4: shifted 2px left
--
-- Usage: aseprite -b --script-param file=path/to/sprite.png --script anim-sway.lua

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
local w = origImage.width
local h = origImage.height

local function shiftImage(srcImage, dx, dy)
  local newImg = Image(w, h, srcImage.colorMode)
  for py = 0, h - 1 do
    for px = 0, w - 1 do
      newImg:drawPixel(px, py, app.pixelColor.rgba(0, 0, 0, 0))
    end
  end
  for py = 0, h - 1 do
    for px = 0, w - 1 do
      local sx = px - dx
      local sy = py - dy
      if sx >= 0 and sx < w and sy >= 0 and sy < h then
        newImg:drawPixel(px, py, srcImage:getPixel(sx, sy))
      end
    end
  end
  return newImg
end

-- Frame 1: original (already exists)
-- Frame 2: 2px right
sprite:newEmptyFrame(2)
sprite:newCel(sprite.layers[1], 2, shiftImage(origImage, 2, 0), origPos)

-- Frame 3: original again
sprite:newEmptyFrame(3)
sprite:newCel(sprite.layers[1], 3, origImage:clone(), origPos)

-- Frame 4: 2px left
sprite:newEmptyFrame(4)
sprite:newCel(sprite.layers[1], 4, shiftImage(origImage, -2, 0), origPos)

for i = 1, 4 do
  sprite.frames[i].duration = 0.35
end

local aseFile = filepath:gsub("%.png$", ".aseprite")
sprite:saveAs(aseFile)

local base = filepath:gsub("%.png$", "")
for i = 1, 4 do
  app.command.GotoFrame { frame = i }
  sprite:saveCopyAs(base .. "-frame" .. i .. ".png")
end

print("OK: " .. filepath)
sprite:close()
