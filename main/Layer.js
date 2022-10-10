class Layer{
    constructor(container) {
        this.layer = document.createElement('canvas');
        this.border = 50;
        this.ctx = this.layer.getContext('2d');
        container.appendChild(this.layer);
        addEventListener('resize', this.resize.bind(this))
        this.resize();
    }
    resize() {
        this.w = this.layer.width = this.layer.offsetWidth;
        this.h = this.layer.height = this.layer.offsetHeight;
    }
}

export default Layer;