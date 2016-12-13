/**
 * Created by Administrator on 2016/9/7 0007.
 */
var Enemy = cc.Node.extend({
    gameLayer:null,
    type:0,
    hp:0,
    sure:null,
     ctor:function(gameLayer,type){
         this._super();
         this.type = type;
         this.sure = true;
         this.gameLayer = gameLayer;
         var enemy = new cc.Sprite("res/enemy"+type+".png");
         enemy.setTag(4);
         this.addChild(enemy);
         switch (type)
         {
             case 1:
                 this.hp = 1;
                 break;
             case 2:
                 this.hp = 5;
                 break;
             case 3:
                 this.hp = 8;
                 break;
             default :
                 break;
         }
         if(this.type == 3)
         {
             // 大飞机每3s产生3个小飞机
             this.schedule(this.createSanEnemy,3.0);
         }
         //移动敌机
         this.schedule(this.moveDown);
         //
         this.schedule(this.countEnemy);
     },
    //敌机血量控制
    hitEnemy:function()
    {
        this.hp -= 1;
        if(this.hp == 0)
        {
            this.explosionEnemy();
        }else{
            //播放击中动画
            if(this.type!==1)
            {
                var enemy = this.getChildByTag(4);
                var animation = new cc.Animation();
                animation.addSpriteFrameWithFile("res/enemy" + this.type + "_hit1.png");
                animation.setDelayPerUnit(0.001);
                animation.setRestoreOriginalFrame(true);
                var action = new cc.Animate(animation);
                enemy.runAction(action);
            }
        }
    },
    //计算没有被销毁敌机数量
    countEnemy:function()
    {
        if(this.getPositionY()<=0&&this.sure)
        {
            this.gameLayer.countenemy -=1;
            this.sure = false;
        }
        var countItem = this.gameLayer.getChildByTag(99);
        countItem.setString(this.gameLayer.countenemy);
        var scoreEnd = parseInt(this.gameLayer.getChildByTag(9).getString());
        if(this.gameLayer.countenemy == 0)
        {
            cc.director.runScene(new cc.TransitionFade(0.5,new GameOverScene(scoreEnd)));
        }
    },
    //敌机移动
    moveDown:function(){

        switch (this.type)
        {
            case 1:
                this.setPositionY(this.getPositionY()-2.8);
                break;
            case 2:
                this.setPositionY(this.getPositionY()-2.0);
                break;
            case 3:
                this.setPositionY(this.getPositionY()-1.0);
                break;
            default :
                break;
        }
        if(this.getPositionY()<=-cc.winSize.height/2+380)
        {
            this.removeEnemy();
        }
    },
    //大敌机会发出三个小敌机
    createSanEnemy:function()
    {
        var enemy = this.getChildByTag(4);
        var enemyOwe = new Enemy(this.gameLayer,1);
        var enemyTwo = new Enemy(this.gameLayer,1);
        var enemyThree = new Enemy(this.gameLayer,1);
        enemyOwe.setPosition(this.getPositionX()-enemy.getContentSize().width/2+enemyOwe.width/2,this.getPositionY()-enemy.getContentSize().height/2);
        enemyTwo.setPosition(this.getPositionX(),this.getPositionY()-enemy.getContentSize().height/2);
        enemyThree.setPosition(this.getPositionX()+enemy.getContentSize().width/2-enemyOwe.width/2,this.getPositionY()-enemy.getContentSize().height/2);
        this.gameLayer.addChild(enemyOwe);
        this.gameLayer.addChild(enemyTwo);
        this.gameLayer.addChild(enemyThree);
        this.gameLayer.enemys.push(enemyOwe);
        this.gameLayer.enemys.push(enemyTwo);
        this.gameLayer.enemys.push(enemyThree);
    },
    //移除敌机
    removeEnemy:function()
    {
        this.gameLayer.addScore();
        var index = this.gameLayer.enemys.indexOf(this);
        if(index>=0)
        {
           this.gameLayer.enemys.splice(index,1);
        }
        this.removeFromParent();
    },
    //敌机爆炸动画
    explosionEnemy:function()
    {
        var enemy = this.getChildByTag(4);
        cc.audioEngine.playEffect("res/sound/enemy1_down.mp3");
        this.unschedule(this.moveDown);
        var animation = new cc.Animation();
        for (var i = 1; i <= 3; i++) {
            animation.addSpriteFrameWithFile("res/enemy" + this.type + "_down" + i + ".png");
        }
        animation.setDelayPerUnit(0.2);
        animation.setRestoreOriginalFrame(true);
        var action = new cc.Animate(animation);
        enemy.runAction(cc.sequence(action, cc.callFunc(function () {
            this.removeEnemy();
        }, this)));
    }
});
