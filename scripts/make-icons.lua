-- make-icons.lua
-- Takes a 32x32 PNG and exports scaled versions for Chrome extension icons.
-- Usage: aseprite -b --script-param file=path/to/logo.png --script make-icons.lua

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

local dir = filepath:match("(.*/)")

local sizes = { 16, 48, 128 }
for _, size in ipairs(sizes) do
  local copy = Sprite(sprite)
  copy:resize(size, size)
  copy:saveCopyAs(dir .. "icon-" .. size .. ".png")
  copy:close()
end

sprite:close()
print("OK")
