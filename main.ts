namespace SpriteKind {
    export const Cursor = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(tiles.tileIsWall(tiles.locationInDirection(tiles.locationOfSprite(Cursed_Cursor), CollisionDirection.Top)))) {
        tiles.placeOnTile(Cursed_Cursor, tiles.locationInDirection(tiles.locationOfSprite(Cursed_Cursor), CollisionDirection.Top))
    }
})
sprites.onOverlap(SpriteKind.Cursor, SpriteKind.Food, function (sprite, otherSprite) {
    if (controller.A.isPressed()) {
        console.logValue("col", sprites.readDataNumber(otherSprite, "col"))
        console.logValue("row", sprites.readDataNumber(otherSprite, "row"))
        Desto_Check_Neibour(sprites.readDataNumber(otherSprite, "col"), sprites.readDataNumber(otherSprite, "row"))
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(tiles.tileIsWall(tiles.locationInDirection(tiles.locationOfSprite(Cursed_Cursor), CollisionDirection.Left)))) {
        tiles.placeOnTile(Cursed_Cursor, tiles.locationInDirection(tiles.locationOfSprite(Cursed_Cursor), CollisionDirection.Left))
    }
})
function Check_is_valid (COL: number, ROW: number) {
    console.log("Check is Valid:" + COL + "," + ROW)
    if (!(tiles.tileIs(tiles.getTileLocation(COL, ROW), assets.tile`myTile`) || tiles.tileIs(tiles.getTileLocation(COL, ROW), assets.tile`myTile1`))) {
        console.log("Check is Valid returns:" + "True")
        return true
    } else {
        console.log("Check is Valid returns:" + "False")
        return false
    }
}
function Game_over (num: number, num2: number) {
    console.log("" + num + ", " + num2)
    game.over(false)
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(tiles.tileIsWall(tiles.locationInDirection(tiles.locationOfSprite(Cursed_Cursor), CollisionDirection.Right)))) {
        tiles.placeOnTile(Cursed_Cursor, tiles.locationInDirection(tiles.locationOfSprite(Cursed_Cursor), CollisionDirection.Right))
    }
})
function Cover () {
    for (let value of tiles.getTilesByType(assets.tile`myTile0`)) {
        Covers = sprites.create(img`
            8 8 8 8 8 8 8 8 
            8 9 9 9 9 9 9 8 
            8 9 9 9 9 9 9 8 
            8 9 9 9 9 9 9 8 
            8 9 9 9 9 9 9 8 
            8 9 9 9 9 9 9 8 
            8 9 9 9 9 9 9 8 
            8 8 8 8 8 8 8 8 
            `, SpriteKind.Food)
        Covers.setFlag(SpriteFlag.GhostThroughTiles, true)
        Covers.setFlag(SpriteFlag.GhostThroughWalls, true)
        Covers.setFlag(SpriteFlag.Invisible, false)
        tiles.placeOnTile(Covers, value)
        Covers.z = 5
        sprites.setDataNumber(Covers, "col", tiles.locationXY(value, tiles.XY.column))
        sprites.setDataNumber(Covers, "row", tiles.locationXY(value, tiles.XY.row))
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(tiles.tileIsWall(tiles.locationInDirection(tiles.locationOfSprite(Cursed_Cursor), CollisionDirection.Bottom)))) {
        tiles.placeOnTile(Cursed_Cursor, tiles.locationInDirection(tiles.locationOfSprite(Cursed_Cursor), CollisionDirection.Bottom))
    }
})
function Desto_Check_Neibour (Col: number, Row: number) {
    Local = tiles.getTileLocation(Col, Row)
    if (Check_is_valid(tiles.locationXY(tiles.locationInDirection(Local, CollisionDirection.Left), tiles.XY.column), tiles.locationXY(tiles.locationInDirection(Local, CollisionDirection.Left), tiles.XY.row))) {
        console.log("Destro check neighbor:" + tiles.locationXY(tiles.locationInDirection(Local, CollisionDirection.Left), tiles.XY.column) + "," + tiles.locationXY(tiles.locationInDirection(Local, CollisionDirection.Left), tiles.XY.row))
        Desto_Check_Neibour(tiles.locationXY(tiles.locationInDirection(Local, CollisionDirection.Left), tiles.XY.column), tiles.locationXY(tiles.locationInDirection(Local, CollisionDirection.Left), tiles.XY.row))
    } else {
        Game_over(tiles.locationXY(tiles.locationInDirection(Local, CollisionDirection.Left), tiles.XY.column), tiles.locationXY(tiles.locationInDirection(Local, CollisionDirection.Left), tiles.XY.row))
    }
    if (Check_is_valid(tiles.locationXY(tiles.locationInDirection(Local, CollisionDirection.Top), tiles.XY.column), tiles.locationXY(tiles.locationInDirection(Local, CollisionDirection.Top), tiles.XY.row))) {
        Desto_Check_Neibour(tiles.locationXY(tiles.locationInDirection(Local, CollisionDirection.Top), tiles.XY.column), tiles.locationXY(tiles.locationInDirection(Local, CollisionDirection.Top), tiles.XY.row))
    } else {
        Game_over(tiles.locationXY(tiles.locationInDirection(Local, CollisionDirection.Top), tiles.XY.column), tiles.locationXY(tiles.locationInDirection(Local, CollisionDirection.Top), tiles.XY.row))
    }
    if (Check_is_valid(tiles.locationXY(tiles.locationInDirection(Local, CollisionDirection.Right), tiles.XY.column), tiles.locationXY(tiles.locationInDirection(Local, CollisionDirection.Right), tiles.XY.row))) {
        Desto_Check_Neibour(tiles.locationXY(tiles.locationInDirection(Local, CollisionDirection.Right), tiles.XY.column), tiles.locationXY(tiles.locationInDirection(Local, CollisionDirection.Right), tiles.XY.row))
    } else {
        Game_over(tiles.locationXY(tiles.locationInDirection(Local, CollisionDirection.Right), tiles.XY.column), tiles.locationXY(tiles.locationInDirection(Local, CollisionDirection.Right), tiles.XY.row))
    }
    if (Check_is_valid(tiles.locationXY(tiles.locationInDirection(Local, CollisionDirection.Bottom), tiles.XY.column), tiles.locationXY(tiles.locationInDirection(Local, CollisionDirection.Bottom), tiles.XY.row))) {
        Desto_Check_Neibour(tiles.locationXY(tiles.locationInDirection(Local, CollisionDirection.Bottom), tiles.XY.column), tiles.locationXY(tiles.locationInDirection(Local, CollisionDirection.Bottom), tiles.XY.row))
    } else {
        Game_over(tiles.locationXY(tiles.locationInDirection(Local, CollisionDirection.Bottom), tiles.XY.column), tiles.locationXY(tiles.locationInDirection(Local, CollisionDirection.Bottom), tiles.XY.row))
    }
}
function Make_Mines () {
    for (let value of tiles.getTilesByType(assets.tile`myTile0`)) {
        if (Math.percentChance(10)) {
            tiles.setTileAt(value, assets.tile`myTile1`)
        }
    }
}
function Desto_Search_cover (col: number, row: number) {
    for (let value of sprites.allOfKind(SpriteKind.Food)) {
        if (sprites.readDataNumber(value, "col") == col && sprites.readDataNumber(value, "row") == row) {
            value.destroy()
        }
    }
}
let Local: tiles.Location = null
let Covers: Sprite = null
let Cursed_Cursor: Sprite = null
tiles.setSmallTilemap(tilemap`level1`)
Cursed_Cursor = sprites.create(img`
    . f f f f . . . 
    f 1 1 1 1 f f . 
    f 1 1 1 1 1 1 f 
    f 1 1 1 1 1 1 f 
    f 1 1 1 1 1 1 f 
    . f 1 1 1 1 f . 
    . f 1 1 1 f 1 f 
    . . f f f . f . 
    `, SpriteKind.Cursor)
tiles.placeOnTile(Cursed_Cursor, tiles.getTileLocation(8, 8))
Cursed_Cursor.z = 10
Cover()
