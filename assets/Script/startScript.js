cc.Class({
    extends: cc.Component,

    properties: {
        feijiPrefab:{
            default:null,
            type: cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function () {
      var anim = this.getComponent(cc.Animation);
      anim.play();
      //移动飞机
      this.moveFeiji();
    },
    moveFeiji:function(){
       var nodeX = this.node.getPositionX();
       var nodeY = this.node.getPositionY();
       var a1 = cc.moveTo(2,cc.p(this.node.getPositionX()+220,this.node.getPositionY()));
       var a2 = cc.moveTo(2,cc.p(nodeX,nodeY));
       var seq = cc.sequence(a1,a2);
       var fu = cc.repeatForever(seq);
       this.node.runAction(fu);

    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
