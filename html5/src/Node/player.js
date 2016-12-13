/**
 * Created by Administrator on 2016/9/7 0007.
 */
var Player = cc.Sprite.extend({
    gameLayer:null,
    hp:0,
    ctor:function(gameLayer){
        var size = cc.winSize;
        this._super();
        this.hp = 3;
        this.gameLayer = gameLayer;
        var player = new cc.Sprite("res/hero1.png");
        player.setTag(2);
        var animation = new cc.Animation();
        for(var i = 1;i<=2;i++)
        {
            animation.addSpriteFrameWithFile("res/hero"+i+".png");
        }
        animation.setDelayPerUnit(0.05);
        animation.setRestoreOriginalFrame(true);
        var action = new cc.Animate(animation);
        player.runAction(cc.repeatForever(action));
        this.addChild(player);
        return true;
    },
   removePlayer:function()
   {
       this.gameLayer.removeChild(this);
   },
    //爆炸动画
    explosionPlayer:function()
    {
        var player = this.getChildByTag(2);
        var animation = new cc.Animation();
        for(var i = 1;i<=3;i++)
        {
            animation.addSpriteFrameWithFile("res/hero_blowup_n"+i+".png");
        }
        animation.setDelayPerUnit(0.08);
        var action = new cc.Animate(animation);
        player.runAction(cc.sequence(action,cc.callFunc(function(){
            this.setVisible(false);
        },this)));
    }
});