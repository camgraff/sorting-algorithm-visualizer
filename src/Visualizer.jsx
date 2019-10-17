import React from 'react';
import './Visualizer.css'

const ARRAY_SIZE = 50;
const MAX_ARRAY_VAL = 1000;

class Visualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          array: []
        };
        this.selectionSort = this.selectionSort.bind(this);
    }

    componentDidMount() {
        //populate array values
        const temp = [];
        for (var i=0; i<ARRAY_SIZE; i++) {
            temp.push(Math.floor((Math.random()*MAX_ARRAY_VAL)));
        }
        this.setState({array:temp});
    }

    selectionSort() {
        var temp = this.state.array;
        if (i >= ARRAY_SIZE) return;
        for (var i = 0; i<ARRAY_SIZE; i++) {
            var min_id = i;  
            for (var j = i+1; j<ARRAY_SIZE; j++) { 
                if (temp[j] < temp[min_id])  
                    min_id = j; 
            }
            temp[i] = temp.splice(min_id, 1, temp[i])[0];
        }
        this.setState({array:temp});
    }

    render() {
        return(
            <div className="container">
                <button onClick={this.selectionSort}> Sort </button>
                {this.state.array.map((val, id) => (
                    <div 
                        className="array-bar"
                        key={id}
                        style={{
                            backgroundColor: "red",
                            height: `${val/(MAX_ARRAY_VAL/60)}vh`,
                            width: `${60/ARRAY_SIZE}vw`
                        }}
                    ></div>
                ))}
            </div>
        )
    }

}

export default Visualizer