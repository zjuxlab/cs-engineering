---
title: Lua
slug: Lua
sidebar_position: 6
---


# Lua

Author：陈岩

> 脚本语言，常用作插件，例如Nginx或Unity中提供动态逻辑

# 语法速览

```lua
-- comment

--[[
multi-line comment
--]]

Types:
- number: is float64
- string:
[[multi-line
string concats]] .. "another string"
- boolean: only `false` and `nil` are false, join using `and, or, not`
- nil: for null value / deletion
- table: array / map

Variables:
- global: `var = 1`
- local: `local var = 1`

FlowControl:

if 3>5 then xxx
elseif 4>5 then yyy
else zzz end

while(i<5) do
    i = i+1
end

-- begin,end(inclusive),step
for i=1,9,2 do
    print(i) -- 1,3,5,7,9
end

Functions:

local function Fn(arg1, arg2) 
    return arg1, arg2;
end

Tables:
-- index start from 1
arr = {2, 4, 6, 8} -- arr[i] == i*2
arr["key"] = value -- arr.key == value

OOP:
-- class and object is also table.
-- class is the metatable index of object, for sharing methods.
Clazz = { a = 1, b = 2 }
function Clazz:new(o)
    o = o or {}
    setmetatable(o, self)
    self.__index = self
    return o
end

function Clazz:fn()
    print(self.a)
end

obj = Clazz:new()
obj:fn()

Modules:

- file1.lua
m = { ... }
return m

- file2.lua
m = require("file1")
```

