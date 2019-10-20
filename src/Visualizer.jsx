import React from 'react';
import './Visualizer.css'

const ARRAY_SIZE = 50;
const MAX_ARRAY_VAL = 1000;

//percent of screen that array container div uses
const HEIGHT_PROP = 60;
const WIDTH_PROP = 60;

const ANIMATION_SPEED = 50;

//array of times used to cancel sorting animations
var timerIds = [];

//bar colors
const START_COLOR = "red";
const COMP_COLOR = "yellow";
const FINISH_COLOR = "blue";

var counter = 0;


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
            arrayBars[i].style.backgroundColor = START_COLOR;
        }
    }

    generateArray() {
        //reset counter
        counter = 0;

        //stop the animation if function is called while sorting
        timerIds.forEach(function(value) {clearTimeout(value)});

        //populate array values
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
            timerIds.push(setTimeout(() => {
                var min_id = i;  
                for (let j = i+1; j<ARRAY_SIZE; j++) { 
                    if (array[j] < array[min_id])  
                        min_id = j; 
                }
               
                //recolor previous yellow bar back to red since no longer being swapped
                if (prevMinId > i) arrayBars[prevMinId].style.backgroundColor = START_COLOR;
                prevMinId = min_id; 
                //color bar that is being swapped yellow
                arrayBars[min_id].style.height = `${array[i]/(MAX_ARRAY_VAL/HEIGHT_PROP)}vh`;
                arrayBars[min_id].style.backgroundColor = COMP_COLOR;
                //color minimum value bar blue since it will be in sorted order
                arrayBars[i].style.height = `${array[min_id]/(MAX_ARRAY_VAL/HEIGHT_PROP)}vh`;
                arrayBars[i].style.backgroundColor = FINISH_COLOR;
                //swap array values
                array[i] = array.splice(min_id, 1, array[i])[0];
            }, ANIMATION_SPEED*i));
        }
    }

    quickSort(arr, low, high, arrayBars, delay) {
        var animations = []
        
        //TODO fix animations so left anf right play at the same time
        var leftAnimations = [];
        var RightAnimations = [];
        var temp = arr;
        /* //setTimeout(() => {
            if (low < high) {
                var pi = this.quickSortPartition(arr, low, high, arrayBars, delay);
                this.quickSort(arr, low, pi-1, arrayBars, ANIMATION_SPEED*(pi-low+2)+delay);
                this.quickSort(arr, pi+1, high, arrayBars, ANIMATION_SPEED*(pi-low+2)+delay);
            }
            //console.log(arr);
        //}, 5000*counter); */

        //iterative version, taken from https://www.geeksforgeeks.org/iterative-quick-sort/
        var stack = [];
        var top = -1;
        stack[++top] = low;
        stack[++top] = high;

        // Keep popping from stack while is not empty 
        while (top >= 0) {
            // Pop h and l 
            high = stack[top--]; 
            low = stack[top--]; 

            // Set pivot element at its correct position 
            // in sorted array 
            //var pivot = this.quickSortPartition(arr, low, high, arrayBars, delay); 

            //parition
            var pivot = arr[high];
            var i = low - 1;
            for (var j=low; j<high; j++) {
                if (arr[j] < pivot) {
                    i++;
                    //setTimeout(() => {
                        /* arrayBars[i].style.height = `${arr[j]/(MAX_ARRAY_VAL/HEIGHT_PROP)}vh`;
                        arrayBars[j].style.height = `${arr[i]/(MAX_ARRAY_VAL/HEIGHT_PROP)}vh`; */
                    //}, ANIMATION_SPEED*counter);
                    animations.push([ [i, arr[i]], [j, arr[j]], 0 ]);
                    counter++;
                    arr[i] = arr.splice(j, 1, arr[i])[0];            }
            }
            //setTimeout(() => {
                /* arrayBars[i+1].style.height = `${arr[high]/(MAX_ARRAY_VAL/HEIGHT_PROP)}vh`;
                arrayBars[high].style.height = `${arr[i+1]/(MAX_ARRAY_VAL/HEIGHT_PROP)}vh`; */
            //}, ANIMATION_SPEED*counter);
            animations.push([ [i+1, arr[i+1]], [high, arr[high]], 1 ]);
            arr[i+1] = arr.splice(high, 1, arr[i+1])[0];
            pivot = i+1;


            // If there are elements on left side of pivot, 
            // then push left side to stack 
            if (pivot - 1 >= low) { 
                stack[++top] = low; 
                stack[++top] = pivot - 1; 
            } 

            // If there are elements on right side of pivot, 
            // then push right side to stack 
            if (pivot + 1 <= high) { 
                stack[++top] = pivot + 1; 
                stack[++top] = high; 
            } 
        }

        var prevBar1;
        var prevBar2;
        var sorted = [];
        //animations
        for (let i=0; i<animations.length; i++) {
            timerIds.push(setTimeout(() => {
                if (i>0) {
                    if (!sorted.includes(prevBar1[0])) arrayBars[prevBar1[0]].style.backgroundColor = START_COLOR;
                    if (!sorted.includes(prevBar2[0])) arrayBars[prevBar2[0]].style.backgroundColor = START_COLOR;
                }
                const bar1 = animations[i][0];
                const bar2 = animations[i][1];
                const isPiv = animations[i][2];
                arrayBars[bar1[0]].style.height = `${bar2[1]/(MAX_ARRAY_VAL/HEIGHT_PROP)}vh`;
                arrayBars[bar1[0]].style.backgroundColor = COMP_COLOR;
                arrayBars[bar2[0]].style.height = `${bar1[1]/(MAX_ARRAY_VAL/HEIGHT_PROP)}vh`;
                arrayBars[bar2[0]].style.backgroundColor = COMP_COLOR;
                if (isPiv == 1) {
                    sorted.push(bar1[0]);
                    arrayBars[bar1[0]].style.backgroundColor = FINISH_COLOR;
                }
                prevBar1 = bar1;
                prevBar2 = bar2;
            }, ANIMATION_SPEED*i));
        }
    }

    quickSortPartition(arr, low, high, arrayBars) {
        var pivot = arr[high];
        var i = low - 1;
        for (var j=low; j<high; j++) {
            if (arr[j] < pivot) {
                i++;
                arrayBars[i].style.height = `${arr[j]/(MAX_ARRAY_VAL/HEIGHT_PROP)}vh`;
                arrayBars[j].style.height = `${arr[i]/(MAX_ARRAY_VAL/HEIGHT_PROP)}vh`;
                arr[i] = arr.splice(j, 1, arr[i])[0];            }
        }
        arrayBars[i+1].style.height = `${arr[high]/(MAX_ARRAY_VAL/HEIGHT_PROP)}vh`;
        arrayBars[i+1].style.backgroundColor = FINISH_COLOR;
        arrayBars[high].style.height = `${arr[i+1]/(MAX_ARRAY_VAL/HEIGHT_PROP)}vh`;
        arr[i+1] = arr.splice(high, 1, arr[i+1])[0];
        return i+1;
    }

    render() {
        return(
            <div className="container">
                <div classname="button-container">
                    <button onClick={() => this.selectionSort()}> Selection Sort </button>
                    <button onClick={() => this.quickSort(this.state.array, 0, ARRAY_SIZE-1, document.getElementsByClassName("array-bar"))}> Quick Sort </button>
                    <button onClick={() => this.generateArray()}> Generate New Array </button>
                </div>
                {this.state.array.map((val, id) => (
                    <div 
                        className="array-bar"
                        key={id}
                        style={{
                            backgroundColor: START_COLOR,
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