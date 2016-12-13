/**
 * Created by Administrator on 2016/9/7 0007.
 */
var GameLayer = cc.Layer.extend({
    touchStartX:0,
    touchStartY:0,
    bullets:[],
    enemys:[],
    props:[],
    score:0,
    doubleShootTime:60,
    shootCount:0,
    propsCount:0,
    countenemy:0,
    ctor:function () {
        this._super();
        this.bullets = [];
        this.enemys = [];
        this.props = [];
        this.score = 0;
        this.shootCount = 0;
        this.propsCount = 0;
        this.countenemy = 10;
        var size = cc.winSize;
        //背景音乐
        cc.audioEngine.playMusic("res/sound/game_music.mp3",true);
        //游戏背景
        var bg = new BackGround();
        this.addChild(bg);
        //添加飞机
        var hero = new Player(this);
        hero.setPosition(size.width/2,size.height/2-600);
        this.addChild(hero);
        hero.setTag(1);
        //飞机运动
        var action = cc.moveTo(1.5,cc.p(size.width/2,size.height/2-300));
        hero.runAction(cc.sequence(action,cc.callFunc(function(){
            //控制双排子弹发射次数,检测剩余的敌机数
            this.schedule(this.shootType);
        },this)));
        //添加分数
        var scoreItem = new cc.LabelBMFont("0",res.BMFont_fnt);
        scoreItem.setPosition(size.width/2-100,size.height-50);
        scoreItem.setTag(9);
        this.addChild(scoreItem);
        //计算漏掉敌机数
        var countItem = new cc.LabelBMFont("10",res.BMFont_fnt);
        countItem.setPosition(size.width/2-150,size.height/2-380);
        countItem.setTag(99);
        this.addChild(countItem);
        //添加分数,字图片
        var scorePicture = new cc.Sprite("res/score.png");
        scorePicture.setPosition(size.width/2-200,size.height-50);
        this.addChild(scorePicture);

        var countPicture = new cc.Sprite("res/count.png");
        countPicture.setPosition(size.width/2-200,size.height/2-380);
        this.addChild(countPicture);
        //添加道具
        this.schedule(this.createProp,25.0);
        //添加敌机
        this.schedule(function(){
            this.createEnemy(1);},1.2);

        this.schedule(function(){
            this.createEnemy(2);},10);

        this.schedule(function(){
            this.createEnemy(3);},18);
        //碰撞检测
        this.scheduleUpdate();

    },
    //创建敌机
    createEnemy:function(type){
        var enemy = new Enemy(this,type);
        var randomX = Math.random()*(cc.winSize.width-enemy.getChildByTag(4).getContentSize().width/2*2)+enemy.getChildByTag(4).getContentSize().width/2;
        enemy.setPosition(randomX,cc.winSize.height);
        enemy.setTag(7);
        this.addChild(enemy);
        this.enemys.push(enemy);
    },
    //创建道具
    createProp:function()
    {
        var prop = new Prop(this,1);
        var randPropX = Math.random()*(cc.winSize.width-cc.winSize.width/4);
        prop.setPosition(randPropX,cc.winSize.height+prop.getChildByTag(33).getContentSize().height);
        prop.setTag(44);
        this.addChild(prop);
        this.props.push(prop);
    },
    //创建单排子弹
    createBullet:function()
    {
        var hero = this.getChildByTag(1);
        var bullet = new Bullet(2,false,this);
        bullet.setPosition(hero.getPositionX(),hero.getPositionY()+hero.getChildByTag(2).getContentSize().height/2);
        bullet.setTag(8);
        this.addChild(bullet);
        this.bullets.push(bullet);
        cc.audioEngine.playEffect("res/sound/bullet.mp3");
    },
    //双排子弹
    createTwoBullet:function()
    {
        this.shootCount += 1;
        var hero = this.getChildByTag(1);
        var bulletOwe = new Bullet(2,false,this);
        var bulletTwo = new Bullet(2,false,this);
        bulletOwe.setPosition(hero.getPositionX()-hero.getChildByTag(2).getContentSize().width/4,
            hero.getPositionY()+hero.getChildByTag(2).getContentSize().height/2);
        bulletTwo.setPosition(hero.getPositionX()+hero.getChildByTag(2).getContentSize().width/4,
            hero.getPositionY()+hero.getChildByTag(2).getContentSize().height/2);
        this.addChild(bulletOwe);
        this.addChild(bulletTwo);
        this.bullets.push(bulletOwe);
        this.bullets.push(bulletTwo);
        cc.audioEngine.playEffect("res/sound/bullet.mp3");
        if(this.shootCount>=this.doubleShootTime)
        {
            this.propsCount -=1;
            this.shootCount = 0;
        }
    },
    //计算双排子弹发射次数
    shootType:function()
    {
        if(this.propsCount>0)
        {
            this.unschedule(this.createBullet);
            this.schedule(this.createTwoBullet,0.3)
        }else{
            this.unschedule(this.createTwoBullet);
            this.schedule(this.createBullet,0.3);
        }
    },
    //游戏调度
    update:function(dt){
        this.collision();
    },
    //碰撞检测
    collision:function(){
        var bullets = this.bullets;
        var enemys = this.enemys;
        var props = this.props;
        var enemysDel = [];
        var hero = this.getChildByTag(1);

        var scoreEnd = parseInt(this.getChildByTag(9).getString());
        var propsDel = [];
        //player与道具碰撞检测
        for(var k in props)
        {
            var prop = props[k];

            var find = 0;
            var n = propsDel.length;
            for(var i=0;i<n;i++){
                if(prop == propsDel[i])
                {
                    find = 1;
                    break;
                }
            }
            if(find == 1){
                continue;
            }
            var propBox = prop.getChildByTag(33).getBoundingBoxToWorld();
            var heroBox = hero.getChildByTag(2).getBoundingBoxToWorld();
            if(cc.rectIntersectsRect(propBox,heroBox))
            {
                //记录碰撞次数
                cc.audioEngine.playEffect("res/sound/get_double_laser.mp3");
                this.propsCount += 1;
                propsDel.push(prop);
            }
        }
        for(var i=0;i<propsDel.length;i++){
            propsDel[i].removeProp();
        }
        //敌机和子弹，player和敌机碰撞检测
        for(var i in enemys)
        {
            var enemy = enemys[i];
            var b4 = enemy.getChildByTag(4).getBoundingBoxToWorld();
            var heroBox = hero.getChildByTag(2).getBoundingBoxToWorld();
            //检测敌机与player碰撞
            if(cc.rectIntersectsRect(b4,heroBox))
            {
                this.unschedule(this.collision);
                this.unschedule(this.createBullet);
                this.unschedule(this.createTwoBullet);
                enemy.hitEnemy();
                hero.explosionPlayer();
                cc.audioEngine.stopMusic("res/sound/game_music.mp3");
                cc.audioEngine.playEffect("res/sound/game_over.mp3");
                this.scheduleOnce(function() {
                    cc.director.runScene(new cc.TransitionFade(0.2,new GameOverScene(scoreEnd)));
                },1.0);
            }
            for (var j in bullets)
            {
                var find = 0;
                for(var m=0 ;m<=enemysDel.length;m++)
                {
                    if(enemy == enemysDel[m])
                    {
                        find = 1;
                        break;
                    }
                }
                if(find == 1){
                    continue;
                }
                var bullet = bullets[j];
                var b3 = bullet.getChildByTag(3).getBoundingBoxToWorld();
                //检测player子弹与敌机碰撞
                if (cc.rectIntersectsRect(b4,b3))
                {
                    enemysDel.push(enemy);
                    bullet.remove();
                }
            }
        }
        for(var h = 0;h<enemysDel.length;h++)
        {
            enemysDel[h].hitEnemy();
        }
    },
    //更新分数
    addScore:function()
    {
        var scoreItem = this.getChildByTag(9);
        var curScore = parseInt(scoreItem.getString());
        Score = 10;
        scoreItem.setString(curScore+Score);
    },
    //点击监听
    onEnter:function(){
        this._super();
        cc.eventManager.addListener({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan:this.touchbegan,
            onTouchMoved:this.touchmoved,
            onTouchEnded:this.touchended
        },this);
        return true;
    },
    touchbegan:function(touch,event){
        event.getCurrentTarget().touchStartX = touch.getLocation().x;
        event.getCurrentTarget().touchStartY = touch.getLocation().y;
        return true;
    },
    touchmoved:function(touch,event) {
        var size = cc.winSize;
        var touchX = touch.getLocation().x;
        var touchY = touch.getLocation().y;
        var touchStartX = event.getCurrentTarget().touchStartX;
        var touchStartY = event.getCurrentTarget().touchStartY;
        var hero = event.getCurrentTarget().getChildByTag(1);
        if(hero!=null){
            if(touchX<=size.width&&touchX>=0&&touchY<=size.height&&touchY>0){
                hero.setPosition(hero.getPositionX()+touchX-touchStartX,hero.getPositionY()+touchY-touchStartY);
                event.getCurrentTarget().touchStartX = touchX;
                event.getCurrentTarget().touchStartY = touchY;
            }
        }
        return true;
    },
    touchended:function(touch,event){
        return true;
    }
});
var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});
