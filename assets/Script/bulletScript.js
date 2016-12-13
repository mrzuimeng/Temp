var popSpt = require("Common"); 
cc.Class({
    extends: cc.Component,

    properties: {
        background:{
            default:null,
            type:cc.Node
        },
        bu_array:{
            default:[],
            type:[cc.Sprite]
        }
    },

    // use this for initialization
    onLoad: function () {
        //碰撞系统
        
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        
        var size = cc.director.getVisibleSize();
        this.node.y += 3.0;
        if(this.node.y > size.height/2+5){
            
            this.removeBullet();
        }
    },
    removeBullet:function(){
      var index =this.bu_array.indexOf(this.node);
      this.bu_array.splice(index,1);
      this.node.removeFromParent();
    },
      //碰撞检测
    onCollisionEnter:function(other,self){
        console.log('on collision enter');
        
        if(other.tag == 3&&self){

            this.removeBullet(); 
            other.getComponent('emeyScript').removeBloom(3);
        

        }else if(other.tag == 4&&self){

            this.removeBullet();
            other.getComponent('emeyScript').removeBloom(4);
          
          
        }else if(other.tag == 5&&self){

            this.removeBullet();
            other.getComponent('emeyScript').removeBloom(5);
         
            
        }
    },
    
});
