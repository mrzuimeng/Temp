/**
 * Created by Administrator on 2016/9/7 0007.
 */
var Bullet = cc.Node.extend({
     gameLayer:null,
     ctor:function(type,isUp, gameLayer){
          this._super();
          this.gameLayer = gameLayer;
          if(type==2){
               var bullet = new cc.Sprite("res/bullet2.png");
          }
          bullet.setTag(3);
          this.addChild(bullet);
          //子弹方向判断
          if(!isUp) {
             this.schedule(this.moveUp);
          }
          return true;
     },
     moveUp:function(){
          var bullet = this.getChildByTag(3);
          this.setPositionY(this.getPositionY()+5.0);
          //范围判断
          if(this.getPositionY()>cc.winSize.height){
             this.remove();
          }
     },
     remove:function(){
          //this.unschedule(this.moveUp);
          var index = this.gameLayer.bullets.indexOf(this);
          this.gameLayer.bullets.splice(index,1);
          this.removeFromParent();
     }
});
