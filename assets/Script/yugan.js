cc.Class({
    extends: cc.Component,

    properties: {
        target: {
            default: null,
            type: cc.Animation
        },
        nodes:{
            default:[],
            type:cc.Node
        }
    },

    onLoad: function () {
        for(var i = 0; i<this.nodes.length; i++){
            this.nodes[i].on(cc.Node.EventType.TOUCH_END,this.onButtonPress.bind(this));
        }
    },
    onButtonPress:function(event){
        this.target.stop();
        switch(event.target._name){
            case "paogan":
                this.target.play("paogan");
                break;
            case "laganyouyu":
                this.target.play("laganyouyu");
                break;
            case "laganwuyu":
                this.target.play("laganwuyu");
                break;
        }
        
    },
    
    // called every frame
    update: function (dt) {

    },
});
