
var popSpt = require("Common"); 
cc.Class({
    extends: cc.Component,
    new:null,
    popTime:null,
    ufoTime:null,
    fanshe:false,           //判断飞机是否正在发射子弹

    properties: {
        background1: {
            default: null,
            type: cc.Node
        },
        hero:{
            default:null,
            type:cc.Node
        },
        scoreDisplay:{
            default:null,
            type:cc.Label
        },
        bgPrefab: {
            default: null,
            type: cc.Prefab
        },
        buPrefab:{
            default:null,
            type:cc.Prefab
        },
        enemy1Prefab:{
            default:null,
            type:cc.Prefab
        },
        enemy2Prefab:{
            default:null,
            type:cc.Prefab
        },
        enemy3Prefab:{
            default:null,
            type:cc.Prefab
        },
        popPrefab:{
            default:null,
            type:cc.Prefab
        },
        ufo2Prefab:{
            default:null,
            type:cc.Prefab
        },
        bgSound:{
            default:null,
            url:cc.AudioClip
        },
        bulletSound:{
            default:null,
            url:cc.AudioClip
        }
    },

    // use this for initialization
    onLoad: function () {
        //创建背景
        this.creatBg();
        //播放背景音乐
        cc.audioEngine.playMusic(this.bgSound,true);
        //帧事件
        //this.scheduleUpdate();
        this.movePosition();
        
        //添加敌机
        this.schedule(function(){this.createnemy(1)},2.0);
        this.schedule(function(){this.createnemy(2)},4.0);
        this.schedule(function(){this.createnemy(3)},5.0);
  
        //产生道具计时
        this.schedule(this.popUpdataTime,1.0);
        
        this.schedule(this.ufoUpdateTime,1.0);
    },
    movePosition:function(){
       var a1 = cc.moveTo(0.8,cc.p(this.hero.getPosition().x,-(this.background1.height/2-250)));
       var a2 = cc.moveTo(2.0,cc.p(this.hero.getPosition().x,-(this.background1.height/2-100))).easing(cc.easeCubicActionOut());
       var swq = cc.sequence(a1,a2);
       var cal = cc.callFunc(this.createBullet, this);
       
       var swq2 = cc.sequence(swq,cal);
       this.hero.runAction(swq2);
    },
    popUpdataTime:function(){
        this.popTime++;
        console.log('计时时间'+this.popTime);
        if(this.popTime == 20){
            //添加道具
            this.createPop();
            this.popTime = null;
        }
    },
    ufoUpdateTime:function(){
        this.ufoTime++;
        if(this.ufoTime == 30){
           this.createQpPop();
           this.ufoTime = null;
        }
    },
    //创建道具
    createPop:function(){
       var rand = this.randomPosition();
       var pop = cc.instantiate(this.popPrefab);
       pop.setTag(88);
       this.node.addChild(pop);
       pop.setPosition(rand,this.background1.height/2+50);
       
    },
    //创建清屏道具
    createQpPop:function(){
       var rand = this.randomPosition();
       var QpPop = cc.instantiate(this.ufo2Prefab);
       this.node.addChild(QpPop);
       QpPop.setPosition(rand,this.background1.height/2+50);
    },
    //控制飞机发射单排子弹还是双排子弹
    controlCreateBullet:function(){
       
       var sum = popSpt.getSumCount();
       if(sum){
          this.schedule(this.createBulletTwo,0.6);
          this.unschedule(this.createUpdate);
          if(this.popTime == 18)
          {
              popSpt.setSumCount();
          }
          console.log('吃到道具的次数'+sum);

       }else{
          if(this.fanshe){
             this.schedule(this.createUpdate,0.4);
          }
          this.unschedule(this.createBulletTwo);
          console.log('没有吃到道具');
       }
    },
    //创建子弹
    createBullet:function(){
        
        this.schedule(this.createUpdate,0.2);
        this.setTouchControl();

    },
    
    createUpdate:function(){
        this.fanshe = true;
        cc.audioEngine.playEffect(this.bulletSound);
        var bullet = cc.instantiate(this.buPrefab);
        this.node.addChild(bullet);
        bullet.setPosition(this.hero.getPositionX(),this.hero.getPositionY()+this.hero.height/2);
        bullet.getComponent('bulletScript').bu_array.push(bullet);
    
    },
    //创建双排子弹
    createBulletTwo:function(){
        cc.audioEngine.playEffect(this.bulletSound);
        var bullet = cc.instantiate(this.buPrefab);
        this.node.addChild(bullet);
        bullet.setPosition(this.hero.getPositionX()-10,this.hero.getPositionY()+this.hero.height/2);
        bullet.getComponent('bulletScript').bu_array.push(bullet);

        var bullet2 = cc.instantiate(this.buPrefab);
        this.node.addChild(bullet2);
        bullet2.setPosition(this.hero.getPositionX()+10,this.hero.getPositionY()+this.hero.height/2);
        bullet2.getComponent('bulletScript').bu_array.push(bullet2);
       
    },
    //创建敌机
    createnemy:function(type){
        if(type == 1){
            var rand = this.randomPosition();

            var enemy1 = cc.instantiate(this.enemy1Prefab);
            this.node.addChild(enemy1);
            enemy1.setPosition(rand,this.background1.height/2+50);
            enemy1.getComponent('emeyScript').enemy_array.push(enemy1);

            enemy1.getComponent('emeyScript').enemyMove(1);
            enemy1.getComponent('emeyScript').game = this;

        }else if(type == 2){
            var rand = this.randomPosition();

            var enemy2 = cc.instantiate(this.enemy2Prefab);
            this.node.addChild(enemy2);
            enemy2.setPosition(rand,this.background1.height/2+50);
            enemy2.getComponent('emeyScript').enemy_array.push(enemy2);

            enemy2.getComponent('emeyScript').enemyMove(2);
            enemy2.getComponent('emeyScript').game = this;
        }else if(type == 3){
            var rand = this.randomPosition();

            var enemy3 = cc.instantiate(this.enemy3Prefab);
            this.node.addChild(enemy3);
            enemy3.setPosition(rand,this.background1.height/2+50);
            enemy3.getComponent('emeyScript').enemy_array.push(enemy3);
            
            enemy3.getComponent('emeyScript').enemyMove(3);
            enemy3.getComponent('emeyScript').game = this;

            var yuans = cc.delayTime(2.0);
            var a1 = cc.callFunc(function(){
                this.creatXiaoEnemy(enemy3.getPosition(),enemy3.getContentSize())
            },this);
            var seq = cc.sequence(yuans,a1);
            enemy3.runAction(seq); 
        }
            
    },
    //创建三架小敌机
    creatXiaoEnemy:function(pot,size){
        var enemy4 = cc.instantiate(this.enemy1Prefab);
        this.node.addChild(enemy4);
        enemy4.setPosition(pot.x-size.width/2+10,pot.y-size.height/2); 
        enemy4.getComponent('emeyScript').enemy_array.push(enemy4);
        enemy4.getComponent('emeyScript').enemyMove(1);
        enemy4.getComponent('emeyScript').game = this;

        var enemy5 = cc.instantiate(this.enemy1Prefab);
        this.node.addChild(enemy5);
        enemy5.setPosition(pot.x+size.width/2-10,pot.y-size.height/2); 
        enemy5.getComponent('emeyScript').enemy_array.push(enemy5);
        enemy5.getComponent('emeyScript').enemyMove(1);
        enemy5.getComponent('emeyScript').game = this;

    },
    //获取随机坐标
    randomPosition:function(){
        var suiNum = Math.random()*2+1;
        if(suiNum>=2){
            var randomX = Math.random()*(cc.winSize.width/2-cc.winSize.width/4)+cc.winSize.width/6;
        }else{
            var randomX = -Math.random()*(cc.winSize.width/2-cc.winSize.width/4);
        }
        return randomX;
    },
    //触摸事件
    setTouchControl:function(){
       var starPosition = null;
       var touchStartX = null;
       var touchStartY = null;
       
       this.hero.on(cc.Node.EventType.TOUCH_START,function(event){
            event.getCurrentTarget.touchStartX = event.getLocationX();
            event.getCurrentTarget.touchStartY = event.getLocationY();
            console.log('onTouchBegan');
            return true;
       },this);
       this.hero.on(cc.Node.EventType.TOUCH_MOVE,function(event){
            var endPosition = event.getLocation();
            
            var distX = endPosition.x - event.getCurrentTarget.touchStartX;
            var distY = endPosition.y - event.getCurrentTarget.touchStartY;
            if(this.hero.getPositionX()>=(this.background1.width/2-this.hero.width/2)){
            
               this.hero.x =  this.background1.width/2-this.hero.width/2;
                
            }
            if(this.hero.getPositionX()<=-(this.background1.width/2-this.hero.width/2)){
                
                this.hero.x = -(this.background1.width/2-this.hero.width/2);
                
            }
            if(this.hero.getPositionY()<=-(this.background1.height/2-this.hero.height/2)){
                
                this.hero.y = -(this.background1.height/2-this.hero.height/2);
            }
            this.hero.setPosition(this.hero.getPosition().x+distX,this.hero.getPosition().y+distY);
            
            event.getCurrentTarget.touchStartX = endPosition.x;
            event.getCurrentTarget.touchStartY = endPosition.y;
                 
            console.log('onTouchMoved');   
       },this);
       this.hero.on(cc.Node.EventType.TOUCH_END,function(event){
           console.log('onTouchEned');  
           return true;
       });
    },
    
    creatBg:function(){
       this.newBg = cc.instantiate(this.bgPrefab);
       //newBg.setTag(1);
       this.node.addChild(this.newBg,-1);
       var newBgX = this.background1.width;
       var newBgY = this.background1.height;
       this.newBg.setPosition((this.background1.getPosition().x),(this.background1.getPosition().y+newBgY));
    },
    //更新分数
    scoreUpdate:function(){
       this.scoreDisplay.string = 'Score:'+popSpt.getScore().toString();
    },
    update:function(dt){
       //背景移动
       this.background1.y -=2.0;  
       this.newBg.y -=2.0;
       if(this.background1.getPosition().y<=-this.background1.height)
       {

           this.background1.y = this.background1.height

       }else if(this.newBg.getPosition().y<=-this.background1.height){

           this.newBg.y = this.background1.height

       }
       //控制飞机发射单排子弹还是双排子弹
       this.controlCreateBullet();
    },
   

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
