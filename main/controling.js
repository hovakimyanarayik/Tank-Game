class Controling {
    constructor(controlKeys = []) {
        this.controlKeys = controlKeys;
        this.keyInfo = {};
        addEventListener('keydown', e => this.keyInformating(e));
        addEventListener('keyup', e => this.keyInformating(e))
    }
    keyInformating(e) {
        if(this.controlKeys.includes(e.code)){
            if(e.type === 'keydown') {
                this.keyInfo[e.code] = true;
            } else {
                this.keyInfo[e.code] = false;
            }
        }
    }
}

export default Controling;