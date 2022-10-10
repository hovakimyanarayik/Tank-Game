class Loop {
    constructor(display, draw) {
        this.display = display;
        this.draw = draw;
        this.deltaTime = 0;
        this.lastUpdate = 0;
        requestAnimationFrame((timeStamp) => this.animate(timeStamp));
    }
    animate(currentTime) {
        requestAnimationFrame((timeStamp) => this.animate(timeStamp));
        this.deltaTime = currentTime - this.lastUpdate;
        this.draw(this.deltaTime / 1000);
        this.display();
        this.lastUpdate = currentTime
    }
}

export default Loop;