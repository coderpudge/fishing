cc.Class({
    extends: cc.Component,

    properties: {
        debug:true,
        gravity:cc.p(0,-20)
    },

    // use this for initialization
    onLoad: function () {
        let physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
        physicsManager._world.SetGravity(this.gravity);
        if(this.debug){
            physicsManager.debugDrawFlags = 
                // 0;
                // cc.PhysicsManager.DrawBits.e_aabbBit |
                // cc.PhysicsManager.DrawBits.e_pairBit |
                // cc.PhysicsManager.DrawBits.e_centerOfMassBit |
                cc.PhysicsManager.DrawBits.e_jointBit |
                cc.PhysicsManager.DrawBits.e_shapeBit
            ;
        }
        physicsManager.enabled = false;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
