import Layer from "./Layer.js";
import Loop from "./Loop.js";
import Controling from "./controling.js";

// Tank img
const img = document.createElement('img');
img.src = '../img/tank.png';

class App{
    constructor(container) {
        this.layer = new Layer(container);
        this.tank = {
            x: this.layer.w / 2,
            y: this.layer.h / 2,
            v: 100,
            w: 100,
            h: 100,
            direction: 0,
        }
        // bullets array
        this.bullet = []
        this.controling = new Controling(['KeyA', 'KeyW','KeyD', 'KeyS', 'Space'])
        new Loop(this.display.bind(this), this.draw.bind(this))

    }
    display() {
        this.layer.ctx.clearRect(0, 0, this.layer.w, this.layer.h); 
        // rotating tank
        this.layer.ctx.translate(this.tank.x, this.tank.y)
        this.layer.ctx.rotate(this.tank.direction * 90 * Math.PI / 180);
        this.layer.ctx.drawImage(img, -this.tank.w / 2, -this.tank.h / 2, this.tank.w, this.tank.h);
        this.layer.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.bullet.forEach(b => {
            if(b.x < this.layer.w || b.x > 0 || b.y < this.layer.h || b.y > 0) {  // if bullet on the layer
                this.layer.ctx.fillRect(b.x, b.y, b.w, b.h)
            }
            // if bullet out of layer
            if(b.x > this.layer.w){
                this.layer.ctx.fillRect(this.layer.w - 10, b.y - 10, 20, 20)
            }
            if(b.x < 0) {
                this.layer.ctx.fillRect(-10, b.y - 10, 20, 20)
            }
            if(b.y > this.layer.h) {
                this.layer.ctx.fillRect(b.x - 10, this.layer.h - 10, 20, 20)
            }
            if(b.y < 0) {
                this.layer.ctx.fillRect(b.x - 10, -10, 20, 20)
            }
            
        // filter bullets out of layer 
        })       
        this.bullet = this.bullet.filter(b => {
            return b.x < this.layer.x || b.x > 0 || b.y > 0 || b.y < this.layer.h
        })

    }

    draw(correction) {
        // Driving tank to left
        if(this.controling.keyInfo.KeyA && !this.controling.keyInfo.KeyD && !this.controling.keyInfo.KeyW && !this.controling.keyInfo.KeyS) {
            if(this.tank.x > 0 + this.layer.border) {
                this.tank.x -= this.tank.v * correction;
                // for rotating tank to left
                this.tank.direction = 3;  
            }
        }
        if(!this.controling.keyInfo.KeyA && this.controling.keyInfo.KeyD && !this.controling.keyInfo.KeyW && !this.controling.keyInfo.KeyS) {
            if(this.tank.x < this.layer.w - this.layer.border) {
                this.tank.x += this.tank.v * correction;
                this.tank.direction = 1;
            }
            
        }
        if(!this.controling.keyInfo.KeyA && !this.controling.keyInfo.KeyD && this.controling.keyInfo.KeyW && !this.controling.keyInfo.KeyS) {
            if(this.tank.y > 0 + this.layer.border) {
                this.tank.y -= this.tank.v * correction;
                this.tank.direction = 0
            }
            
        }
        if(!this.controling.keyInfo.KeyA && !this.controling.keyInfo.KeyD && !this.controling.keyInfo.KeyW && this.controling.keyInfo.KeyS) {
            if(this.tank.y < this.layer.h - this.layer.border) {
                this.tank.y += this.tank.v * correction;
                this.tank.direction = 2 
            }
            
        }

        // fire kay 
        if(this.controling.keyInfo.Space) {
            this.bullet.push({
                x: this.tank.x,
                y: this.tank.y,
                w: 5,
                h: 5,
                v: 700,
                direction: this.tank.direction,
                
            })
        }

        this.bullet.forEach(b => {
            if(this.tank.direction === 1 && b.direction === 1 || b.direction === 1) {
                b.x += b.v * correction;
                
            } else if(this.tank.direction === 3 && b.direction === 3 || b.direction === 3) {
                b.x -= b.v * correction
            } else if(this.tank.direction === 0 && b.direction === 0 || b.direction === 0) {
                b.y -= b.v * correction
            } else if(this.tank.direction === 2 && b.direction === 2 || b.direction === 2) {
                b.y += b.v * correction
            } 
        })
        
    }

    
}


onload = () => {
    new App(document.body)
}

