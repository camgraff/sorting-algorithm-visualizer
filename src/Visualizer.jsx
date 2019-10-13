import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/Button';
import './Visualizer.css'

const ARRAY_SIZE = 40;

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
            <div className="Visualizer">
                <ButtonToolbar>
                    <Button variant="primary"> Sort </Button>
                </ButtonToolbar>
                <canvas ref="canvas"
                    width={20*ARRAY_SIZE}
                    height={500}
                />
            </div>
        )
    }

}

export default Visualizer