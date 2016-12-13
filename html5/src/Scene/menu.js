var KaiLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var login = ccs.load(res.ui_json).node;
        this.addChild(login);
        var gameName = login.getChildByName("gamename_2");
        gameName.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(1, 1.1), cc.scaleTo(1, 1))));
        //获取按钮
        var startBtn = ccui.helper.seekWidgetByName(login,"Button_1");
        var helpBtn = ccui.helper.seekWidgetByName(login,"Button_2");
        //注册按钮监听
        startBtn.addTouchEventListener(this.buttonTouchEvent);
        helpBtn.addTouchEventListener(this.buttonTouchEvent);
    },
    buttonTouchEvent:function(sender,type)
    {
        switch (type)
        {
            case ccui.Widget.TOUCH_BEGAN:
                  switch (sender.getName())
                  {
                      case "Button_1":
                          cc.audioEngine.playEffect("res/sound/button.mp3");
                          cc.director.runScene(new cc.TransitionFade(1,new GameScene));
                             break;
                      case "Button_2":
                          cc.audioEngine.playEffect("res/sound/button.mp3");
                          cc.director.runScene(new cc.TransitionFade(1,new HelpScene));
                             break;
                      default :
                          break;
                  }
                  break;
            default :
                break;
        }
    }
});
var KaiScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new KaiLayer();
        this.addChild(layer);
    }
});

/**
 * Created by Administrator on 2016/9/6 0006.
 */
