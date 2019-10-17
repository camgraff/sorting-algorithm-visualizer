import React from 'react';
import './Visualizer.css'

const ARRAY_SIZE = 50;
const MAX_ARRAY_VAL = 1000;

//percent of screen that array container div uses
const HEIGHT_PROP = 60;
const WIDTH_PROP = 60;

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
        var arrayBars = document.getElementsByClassName("array-bar");
        for (let i = 0; i<ARRAY_SIZE; i++) {
            setTimeout(() => {
                var min_id = i;  
                for (let j = i+1; j<ARRAY_SIZE; j++) { 
                    if (temp[j] < temp[min_id])  
                        min_id = j; 
                }
                arrayBars[i].style.height = `${temp[min_id]/(MAX_ARRAY_VAL/HEIGHT_PROP)}vh`
                arrayBars[i].style.backgroundColor = "green";
                arrayBars[min_id].style.height = `${temp[i]/(MAX_ARRAY_VAL/HEIGHT_PROP)}vh`
                temp[i] = temp.splice(min_id, 1, temp[i])[0];
            }, 100*i);

        }
        //this.setState({array:temp});
    }

    render() {
        return(
            <div className="container">
                <button onClick={() => this.selectionSort()}> Sort </button>
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