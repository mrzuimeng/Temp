/**
 * Created by Administrator on 2016/9/12 0012.
 */
var Prop = cc.Node.extend({
    gameLayer:null,
    ctor:function(gameLayer,type)
    {
        this._super();
        this.gameLayer = gameLayer;
        var propSprite = new cc.Sprite("res/ufo"+type+".png");
        propSprite.setTag(33);
        this.addChild(propSprite);
        //道具移动
        this.schedule(this.propMove);
    },
    propMove:function()
    {
        var propSprite = this.getChildByTag(33);
        this.setPositionY(this.getPositionY()-0.8);
        if(this.getPositionY()<-propSprite.getContentSize().height)
        {
            this.removeProp();
        }
    },
    removeProp:function()
    {
        var index = this.gameLayer.props.indexOf(this);
        if(index>=0)
        {
           this.gameLayer.props.splice(index,1)
        }
        this.removeFromParent();
    }
});
