import React from 'react';
import './Visualizer.css'

const ARRAY_SIZE = 20;

var arr = [];

for (var i=0; i<ARRAY_SIZE; i++) {
    arr.push(Math.floor((Math.random()*500)));
}

class Visualizer extends React.Component {
    componentDidMount() {
        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d")
        arr.forEach( function(value, index) {
            ctx.fillRect(20*(index),canvas.height-value,20,value);
        });
    }

    render() {
        return(
            <canvas ref="canvas"
                width={20*ARRAY_SIZE}
                height={500}
            />
        )
    }

}

export default Visualizer