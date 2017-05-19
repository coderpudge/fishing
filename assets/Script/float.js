cc.Class({
    extends: cc.Component,

    properties: {
       mask:{
           default:null,
           type:cc.Mask
       },
       float:{
           default:null,
           type:cc.Sprite
       },
       floatPosition:cc.p(100,100),
       floatHeigh: 20,
       floatRotate: 15,
    },

    // use this for initialization
    onLoad: function () {
        this.mask.position = this.floatPosition;
        this.float.position = cc.p(0,this.floatHeigh);
        this.mask.node.setRotation(this.floatRotate);
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.mask.position = this.floatPosition;
        this.float.node.position = cc.p(0,this.floatHeigh);
        this.mask.node.setRotation(this.floatRotate);
    },
});
