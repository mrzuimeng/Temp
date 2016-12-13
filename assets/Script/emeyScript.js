var popSpt = require("Common"); 
cc.Class({
    extends: cc.Component,
    bloom1:0,
    bloom2:0,
    bloom3:0,
    num:0,
    properties: {
        enemy_array:{
            default:[],
            type:[cc.Sprite]
        },
        enemy1Sound:{
            default:null,
            url:cc.AudioClip
        },
        enemy2Sound:{
            default:null,
            url:cc.AudioClip
        },
        enemy3Sound:{
            default:null,
            url:cc.AudioClip
        }

    },

    // use this for initialization
    onLoad: function () {

    },
        
    //飞机移动
    enemyMove:function(type){

        if(type == 1){

           this.bloom1 = 2;
           this.num = 1

        }else if(type == 2){
           
           this.bloom2 = 3;
           this.num = type;

        }else if(type == 3){
           
           this.bloom3 = 5;
           this.num = type;
           
        }
    },
    removeBloom:function(key){
        if(key == 3){
           var anim = this.getComponent(cc.Animation);
           this.bloom1 -= 1;
           if(this.bloom1>0){
               anim.play('enemy1Animation');
           }

           if(this.bloom1 == 0)
           {
               this.bloom1 = 0;
               if(!anim.isPlaying)
               {

                  cc.audioEngine.playEffect(this.enemy1Sound);
                  anim.play('enemy1Baoza');
                  
               }
               //增加分数 
               popSpt.setScore();
               this.game.scoreUpdate();
            }

        }else if(key == 4){
          var anim = this.getComponent(cc.Animation);
          this.bloom2 -= 1;
          if(this.bloom2>0){
             anim.play('enemy2Animation'); 
          }  

          if(this.bloom2 == 0)
          {
              this.bloom2 = 0;
              if(!anim.isPlaying){
                 
                 cc.audioEngine.playEffect(this.enemy2Sound);
                 anim.play('enemy2Baoza');
              }
              //增加分数
              popSpt.setScore();
              this.game.scoreUpdate();
          }

        }else if(key == 5){
          
          var anim = this.getComponent(cc.Animation);
          this.bloom3 -= 1;
          if(this.bloom3>0){
              anim.play('enemy3Animation');
          }

          if(this.bloom3 == 0)
          {
              this.bloom3 = 0;
              if(!anim.isPlaying){
                  
                  cc.audioEngine.playEffect(this.enemy3Sound);
                  anim.play('enemy3Baoza');   
              }
              //增加分数
              popSpt.setScore();
              this.game.scoreUpdate();
          }
          
        }

    },
    //移除敌机
    removeEnemy:function(){
        
        var index = this.enemy_array.indexOf(this.node);
        this.enemy_array.splice(index,1);
        this.node.removeFromParent();

    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        var size = cc.director.getVisibleSize();
        if(this.num == 1){
           
           this.node.y -= 3.0;

        }else if(this.num == 2){

           this.node.y -= 2.5;

        }else if(this.num == 3){

           this.node.y -= 2.2;
           
        }
        //敌机移除判断
        if(this.node.getPositionY()<-size.height/2-50){
          
           this.removeEnemy();  
        }
        //是否清屏
        if(popSpt.getBoolQp()){
          
           this.scheduleOnce(function(){
               popSpt.setBooolQp();
            },this);

          this.scheduleOnce(function(){this.removeEnemy();},this);
        }
        
    },
});
