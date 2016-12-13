
var MenuLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var size = cc.winSize;

       /* cc.spriteFrameCache.addSpriteFrames(res.shoot_background_plist);*/

        var bg = new cc.Sprite(("res/background.png"));
        bg.setPosition(size.width/2,size.height/2);
        this.addChild(bg);

        var startBu = new cc.MenuItemSprite(
            new cc.Sprite("res/game_start.png"),
            new cc.Sprite("res/game_start_selected.png"),
            function(){
            // cc.director.runScene();
            },this);
        var menu = new cc.Menu(startBu);
        menu.setPosition(size.width/2,size.height/2);
        this.addChild(menu,1);

    }
});

var MenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MenuLayer();
        this.addChild(layer);
    }
});

