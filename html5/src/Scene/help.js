/**
 * Created by Administrator on 2016/9/19 0019.
 */
var HelpLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        //游戏背景
        var bg = new BackGround();
        this.addChild(bg);
        //文字
        var spriteWen = new cc.Sprite("res/helpWen.png");
        spriteWen.setPosition(cc.winSize.width/2,cc.winSize.height/2+50);
        this.addChild(spriteWen);
        //按钮
        var fanHuiStn = new cc.MenuItemSprite(
            cc.Sprite("res/btn_finish.png"),
            cc.Sprite("res/btn_finish_selected.png"),
            function(){
                cc.audioEngine.playEffect("res/sound/button.mp3");
                cc.director.runScene(new cc.TransitionFade(1,new KaiScene));
            },this);
        var menuEnd = new cc.Menu(fanHuiStn);
        menuEnd.setPosition(cc.winSize.width/2,cc.winSize.height/2-50);
        this.addChild(menuEnd);
    },
});
var HelpScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelpLayer();
        this.addChild(layer);
    }
});
