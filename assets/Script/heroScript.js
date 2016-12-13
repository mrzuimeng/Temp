var popSpt = require("Common"); 
cc.Class({
    extends: cc.Component,
  

    properties: {
       
       moveDuration:0,
       //背景
       background:{
          default:null,
          type:cc.Node
       },
       hero:{
           default:null,
           type:cc.Node
       },
       buPrefab:{
           default:null,
           type:cc.Prefab
       },
       overSound:{
           default:null,
           url:cc.AudioClip
       },
       getPopSound:{
           default:null,
           url:cc.AudioClip
       }
    },

    // use this for initialization
    onLoad: function () {
        //碰撞系统
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = false;
        manager.enabledDrawBoundingBox = false;
    },
     //碰撞检测
    onCollisionEnter:function(other,self){
        console.log('on collision enter');
        
        if(other.tag == 3&&self){

            cc.audioEngine.playEffect(this.overSound);
            other.getComponent('emeyScript').removeEnemy();
            this.node.removeFromParent();

        }else if(other.tag == 4&&self){
            
            cc.audioEngine.playEffect(this.overSound);
            other.getComponent('emeyScript').removeEnemy();
            this.node.removeFromParent();
          
        }else if(other.tag == 5&&self){
            
            cc.audioEngine.playEffect(this.overSound);
            other.getComponent('emeyScript').removeEnemy();
            this.node.removeFromParent();

        }else if(other.tag == 6&&self){

            cc.audioEngine.playEffect(this.getPopSound);
            other.getComponent('popScript').removePop();
            popSpt.popSumCount();

        }else if(other.tag == 8&&self){
            cc.audioEngine.playEffect(this.getPopSound);
            other.getComponent('ufo2Script').removeUfoPop();
            //清屏
            popSpt.boolQingPing();

        }
    },
    onCollisionExit:function(other,self){

        if(other.tag == 3&&self){

           cc.director.loadScene('game_end');

        }else if(other.tag == 4&&self){
           
           cc.director.loadScene('game_end');
          
        }else if(other.tag == 5&&self){

          cc.director.loadScene('game_end');

        }
       
    }

    // called every frame, uncomment this function to activate update callback
    //update: function (dt) {

    //},
});
