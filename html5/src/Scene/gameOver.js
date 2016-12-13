/**
 * Created by Administrator on 2016/9/9 0009.
 */
var GameOverLayer = cc.Layer.extend({
    ctor:function(score)
    {
        this._super();
        var size = cc.winSize;
        /*var gameover = ccs.load(res.gameOver_json).node;
        this.addChild(gameover);
        //获取按钮
        var newBtn = ccui.helper.seekWidgetByName(gameover,"Button_2");
        //注册按钮监听
        newBtn.addTouchEventListener(this.buttonTouchEvent);*/
        var gOverBg = new cc.Sprite("res/gameover.png");
        gOverBg.setPosition(size.width/2,size.height/2);
        this.addChild(gOverBg);
        //退出游戏
        var endStn = new cc.MenuItemSprite(
            cc.Sprite("res/game_over.png"),
            cc.Sprite("res/game_over_selected.png"),
            function(){
                cc.audioEngine.playEffect("res/sound/button.mp3");
                cc.director.end();
            },this);
        endStn.setPosition(size.width/2,size.height/4-20);
        //重新开始
        var startStn = new cc.MenuItemSprite(
            cc.Sprite("res/game_Reagain.png"),
            cc.Sprite("res/game_Reagain_selected.png"),
            function(){
                cc.audioEngine.playEffect("res/sound/button.mp3");
                cc.director.runScene(new cc.TransitionFade(1,new GameScene));
            },this);
        startStn.setPosition(endStn.getPositionX(),endStn.getPositionY()+100);
        var menuEnd = new cc.Menu(endStn,startStn);
        menuEnd.setPosition(0,0);
        this.addChild(menuEnd);
        //最高分
        var heightSc = cc.sys.localStorage.getItem("heightSc");
        heightSc = heightSc==null?0:heightSc;
        if(parseInt(score)>parseInt(heightSc))
        {
            cc.sys.localStorage.setItem("heightSc",score+"");
            heightSc = score;
        }
        var heightItem = new cc.LabelBMFont(heightSc.toString(),res.BMFont_fnt);
        heightItem.setPosition(size.width/2-60,size.height-60)
        this.addChild(heightItem);
        //分数显示
        var scoreItem = new cc.LabelBMFont(score,res.BMFont_fnt);
        scoreItem.setPosition(size.width/2,size.height/2)
        this.addChild(scoreItem);
    },
    buttonTouchEvent:function()
    {
        cc.audioEngine.playEffect("res/sound/button.mp3");
        cc.director.runScene(new cc.TransitionFade(1,new GameScene));
    }
});
var GameOverScene = cc.Scene.extend({
    ctor:function(score)
    {
        this._super();
        var Layer = new GameOverLayer(score);
        this.addChild(Layer);
    }
});
