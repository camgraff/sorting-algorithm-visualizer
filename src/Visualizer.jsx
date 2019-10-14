import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/Button';
import './Visualizer.css'

const ARRAY_SIZE = 40;

var arr = [];

for (var i=0; i<ARRAY_SIZE; i++) {
    arr.push(Math.floor((Math.random()*500)));
}

class Visualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isSorted: false,
        };
        this.selectionSort = this.selectionSort.bind(this);
    }

    componentDidMount() {
        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d")
        arr.forEach( function(value, index) {
            ctx.fillRect(20*(index),canvas.height-value,20,value);
        });
    }

    componentDidUpdate() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        arr.forEach( function(value, index) {
            ctx.fillRect(20*(index),canvas.height-value,20,value);
        });
    } 

    selectionSort() {
        for (var i = 0; i<ARRAY_SIZE; i++) {
            var min_id = i;  
            for (var j = i+1; j<ARRAY_SIZE; j++) { 
                if (arr[j] < arr[min_id])  
                    min_id = j; 
            }
            arr[i] = arr.splice(min_id, 1, arr[i])[0];
        }
        console.log(arr);
        this.setState({isSorted : true});
    }

    render() {
        return(
            <div className="Visualizer">
                <ButtonToolbar>
                    <Button onClick={this.selectionSort}> Sort </Button>
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