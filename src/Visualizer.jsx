import React from 'react';
import './Visualizer.css'

const ARRAY_SIZE = 100;
const MAX_ARRAY_VAL = 1000;

//percent of screen that array container div uses
const HEIGHT_PROP = 60;
const WIDTH_PROP = 60;

class Visualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          array: [],
        };
    }

    componentDidMount() {
        this.generateArray();
    }

    componentDidUpdate() {
        //set bar colors back to red
        var arrayBars = document.getElementsByClassName("array-bar");
        for (var i=0; i<ARRAY_SIZE; i++) {
            arrayBars[i].style.backgroundColor = "red";
        }
    }

    generateArray() {
        const arr = [];
        for (var i=0; i<ARRAY_SIZE; i++) {
            arr.push(Math.floor((Math.random()*MAX_ARRAY_VAL)));
        }
        this.setState({array:arr});
    }

    selectionSort() {
        var array = this.state.array;
        var arrayBars = document.getElementsByClassName("array-bar");
        var prevMinId = 0;
        for (let i = 0; i<ARRAY_SIZE; i++) {
            setTimeout(() => {
                var min_id = i;  
                for (let j = i+1; j<ARRAY_SIZE; j++) { 
                    if (array[j] < array[min_id])  
                        min_id = j; 
                }
               
                //recolor previous yellow bar back to red since no longer being swapped
                if (prevMinId > i) arrayBars[prevMinId].style.backgroundColor = "red";
                prevMinId = min_id; 
                //color bar that is being swapped yellow
                arrayBars[min_id].style.height = `${array[i]/(MAX_ARRAY_VAL/HEIGHT_PROP)}vh`
                arrayBars[min_id].style.backgroundColor = "yellow";
                //color minimum value bar blue since it will be in sorted order
                arrayBars[i].style.height = `${array[min_id]/(MAX_ARRAY_VAL/HEIGHT_PROP)}vh`
                arrayBars[i].style.backgroundColor = "blue";
                //swap array values
                array[i] = array.splice(min_id, 1, array[i])[0];
            }, 50*i);
        }
    }

    render() {
        return(
            <div className="container">
                <div classname="button-container">
                    <button onClick={() => this.selectionSort()}> Sort </button>
                    <button onClick={() => this.generateArray()}> Generate New Array </button>
                </div>
                {this.state.array.map((val, id) => (
                    <div 
                        className="array-bar"
                        key={id}
                        style={{
                            backgroundColor: "red",
                            height: `${val/(MAX_ARRAY_VAL/HEIGHT_PROP)}vh`,
                            width: `${WIDTH_PROP/ARRAY_SIZE}vw`
                        }}
                    ></div>
                ))}
            </div>
        )
    }

}

export default Visualizer