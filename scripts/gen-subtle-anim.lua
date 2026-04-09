-- gen-subtle-anim.lua
-- Opens a static 64x64 sprite and creates a 4-frame subtle idle animation
-- by shifting brightness slightly across frames (gentle glow pulse).
--
-- Usage: aseprite -b --script-param file=path/to/sprite.png --script gen-subtle-anim.lua

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

-- We'll create 3 additional frames (total 4) with subtle brightness shifts
-- Frame 1: original
-- Frame 2: slightly brighter (+6)
-- Frame 3: original (copy)
-- Frame 4: slightly darker (-6)

local function clamp(v)
  if v < 0 then return 0 end
  if v > 255 then return 255 end
  return math.floor(v)
end

local function shiftBrightness(srcImage, amount)
  local copy = srcImage:clone()
  for px in copy:pixels() do
    local c = px()
    local a = app.pixelColor.rgbaA(c)
    if a > 0 then
      local r = app.pixelColor.rgbaR(c)
      local g = app.pixelColor.rgbaG(c)
      local b = app.pixelColor.rgbaB(c)
      px(app.pixelColor.rgba(clamp(r + amount), clamp(g + amount), clamp(b + amount), a))
    end
  end
  return copy
end

-- Get the original image from frame 1
local origCel = sprite.cels[1]
local origImage = origCel.image:clone()
local origPos = origCel.position

-- Add frame 2: slightly brighter
sprite:newEmptyFrame(2)
local bright = shiftBrightness(origImage, 8)
sprite:newCel(sprite.layers[1], 2, bright, origPos)

-- Add frame 3: back to original
sprite:newEmptyFrame(3)
sprite:newCel(sprite.layers[1], 3, origImage:clone(), origPos)

-- Add frame 4: slightly darker
sprite:newEmptyFrame(4)
local dark = shiftBrightness(origImage, -8)
sprite:newCel(sprite.layers[1], 4, dark, origPos)

-- Set frame durations (ms)
for i = 1, 4 do
  sprite.frames[i].duration = 0.3
end

-- Save the .aseprite file
local aseFile = filepath:gsub("%.png$", ".aseprite")
sprite:saveAs(aseFile)

-- Export individual frames
local base = filepath:gsub("%.png$", "")
for i = 1, 4 do
  app.command.GotoFrame { frame = i }
  sprite:saveCopyAs(base .. "-frame" .. i .. ".png")
end

print("OK: " .. filepath)
sprite:close()
