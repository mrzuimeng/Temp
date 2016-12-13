/**
 * Created by Administrator on 2016/9/8 0008.
 */
var BackGround = cc.Sprite.extend({
    ctor:function()
    {
        this._super();
        //第一张背景图
        var backgroud = new cc.Sprite("res/background.png");
        backgroud.setPosition(cc.winSize.width/2,cc.winSize.height/2);
        this.addChild(backgroud);
        backgroud.setTag(5);
        //第二张背景图
        var backgroundtwo = new cc.Sprite("res/background.png");
        backgroundtwo.setPosition(cc.winSize.width/2,cc.winSize.height+backgroundtwo.getContentSize().height/2-3);
        this.addChild(backgroundtwo);
        backgroundtwo.setTag(6);
        //循环调度
        this.schedule(this.loopMove);
    },
    loopMove:function()
    {
        var background = this.getChildByTag(5);
        var backgroundtwo = this.getChildByTag(6);

        background.setPositionY(background.getPositionY()-1.2);
        backgroundtwo.setPositionY(backgroundtwo.getPositionY()-1.2);
        //循环判断
        if(background.getPositionY()<=-background.getContentSize().height/2+4)
        {
           background.setPositionY(cc.winSize.height+background.getContentSize().height/2);
        }
        if(backgroundtwo.getPositionY()<=-backgroundtwo.getContentSize().height/2+4)
        {
           backgroundtwo.setPositionY(cc.winSize.height+backgroundtwo.getContentSize().height/2);
        }
    }
});