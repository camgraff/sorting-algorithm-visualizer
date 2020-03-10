import React from "react";
import "./Visualizer.scss";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
var _ = require("lodash");

var ARRAY_SIZE = 100;
const MAX_ARRAY_VAL = 1000;

//percent of screen that array container div uses
const HEIGHT_PROP = 70;
const WIDTH_PROP = 60;

//bar colors
const START_COLOR = "red";
const COMP_COLOR = "yellow";
const FINISH_COLOR = "blue";
const PIVOT_COLOR = "green";

class Visualizer extends React.Component {
    constructor(props) {
        super(props);

        this.isSorted = false;
        this.isSorting = false;
        this.isComputing = false;
        // Timer Ids used to cancel sorting animation
        this.timerIds = [];
        this.animationCount = 0;

        this.state = {
            array: [],
            animationSpeed: 0.1,
            algorithm: ""
        };
    }

    componentDidMount() {
        this.generateArray();
    }

    generateArray() {
        // Stop any animations currently running
        this.timerIds.forEach(function(value) {
            clearTimeout(value);
        });
        this.timerIds = [];
        this.animationCount = 0;

        // Populate the array
        let arr = [];
        for (var i = 0; i < ARRAY_SIZE; i++) {
            arr.push({
                value: Math.floor(Math.random() * MAX_ARRAY_VAL),
                color: START_COLOR
            });
        }
        this.isSorted = false;
        // Keeps track of whether sorting animations are still running
        this.isSorting = false;
        // Keeps track of whether the actual sorting algorithm code is still executing
        this.isComputing = false;
        this.setState({
            array: arr
        });
    }

    addAnimation(array) {
        // If code is still executing, wait half a second before trying to queue animations
        if (this.isComputing) {
            _.debounce(() => {
                this.addAnimation(array);
            }, 500);
        }
        // We need to set the state array as a clone to avoid issues with modifying the passed in array later.
        let clone = _.cloneDeep(array);
        this.timerIds.push(
            setTimeout(() => {
                this.setState({ array: clone });
            }, this.animationCount++ / this.state.animationSpeed)
        );
    }

    handleArraySliderChange = value => {
        if (value !== ARRAY_SIZE) {
            ARRAY_SIZE = value;
            this.generateArray();
        }
    };

    handleAnimationSliderChange = value => {
        this.setState({ animationSpeed: value });
    };

    handleDropdownChange = event => {
        this.setState({ algorithm: event.value });
    };

    // Called after any sorting algorithm completes and animations are pending
    initEndSequence() {
        this.isComputing = false;
        this.timerIds.push(setTimeout(() => {
            this.isSorting = false;
            this.isSorted = true;
        }, this.animationCount));
    }

    /* SORTING ALGORITHMS */

    selectionSort() {
        let array = this.state.array;

        for (let i = 0; i < ARRAY_SIZE; i++) {
            // Find minimum element in unsorted array
            var min_id = i;
            for (let j = i + 1; j < ARRAY_SIZE; j++) {
                // Color bars being compared
                array[min_id].color = PIVOT_COLOR;
                array[j].color = COMP_COLOR;
                this.addAnimation(array);
                // Uncolor comp bars
                array[min_id].color = START_COLOR;
                array[j].color = START_COLOR;
                if (array[j].value < array[min_id].value) {
                    min_id = j;
                }
            }
            // Swap min element with 1st element in unsorted array
            array[i] = array.splice(min_id, 1, array[i])[0];
            array[i].color = FINISH_COLOR;
            this.addAnimation(array);
        }
    }

    quickSortHelper() {
        var arr = this.state.array;
        this.quickSort(arr, 0, ARRAY_SIZE - 1, 0);
    }

    quickSortPartition(arr, low, high) {
        var pivot = arr[high];
        var i = low - 1;
        for (var j = low; j < high; j++) {
            arr[j].color = COMP_COLOR;
            if (arr[j].value < pivot.value) {
                i++;

                if (i > 0 && i > low) arr[i - 1].color = START_COLOR;
                arr[i].color = COMP_COLOR;

                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            this.addAnimation(arr);
            arr[j].color = PIVOT_COLOR;
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

        // Recolor all bars that were partitioned around the pivot
        if (i > 0 && i > low) arr[i].color = START_COLOR;
        for (let j = i+2; j <= high; j++) {
            arr[j].color = START_COLOR;
        }
        // arr[i+1] is now in sorted position
        arr[i+1].color = FINISH_COLOR;
        this.addAnimation(arr);

        return i + 1;
    }

    quickSort(arr, low, high) {
        if (low <= high) {
            var pi = this.quickSortPartition(arr, low, high);
            this.quickSort(arr, low, pi - 1);
            this.quickSort(arr, pi + 1, high);
        }
    }

    bubbleSort() {
        let array = this.state.array;

        for (let i = 0; i < ARRAY_SIZE - 1; i++) {
            for (let j = 0; j < ARRAY_SIZE - i - 1; j++) {
                // Swap elements j and j+1 if needed
                if (array[j].value > array[j + 1].value) {
                    array[j] = array.splice(j + 1, 1, array[j])[0];
                }

                // Change bars to comp color
                array[j].color = COMP_COLOR;
                if (j + 1 === ARRAY_SIZE - i - 1) {
                    array[j + 1].color = FINISH_COLOR;
                } else {
                    array[j + 1].color = COMP_COLOR;
                }

                this.addAnimation(array);

                // Change bars back to start color after done comparing
                array[j].color = START_COLOR;
                if (j + 1 < ARRAY_SIZE - i - 1) {
                    array[j + 1].color = START_COLOR;
                }

                // Edge case for after every element has been sorted
                if (i === ARRAY_SIZE - 2) {
                    array[0].color = FINISH_COLOR;
                    this.addAnimation(array);
                }
            }
        }
    }

    render() {
        const dropdownOptions = [
            { value: "selection", label: "Selection Sort" },
            { value: "quick", label: "Quick Sort" },
            { value: "bubble", label: "Bubble Sort" }
        ];
        return (
            <div className="visualizer">
                <nav>
                    <ul>
                        <li className="slider">
                            {" "}
                            Array Size
                            <Slider min={5} max={200} value={ARRAY_SIZE} orientation="horizontal" onChange={this.handleArraySliderChange} tooltip={false} />
                        </li>
                        <li className="slider">
                            Animation Speed
                            <Slider min={0.01} max={0.2} step={0.001} format={value => Math.floor(value * 1000)} value={this.state.animationSpeed} orientation="horizontal" onChange={this.handleAnimationSliderChange} tooltip={false} />
                        </li>
                        <li className="dropdown">
                            <Dropdown value={this.state.algorithm} ref="algorithm" options={dropdownOptions} placeholder="Select a sorting algorithm" onChange={this.handleDropdownChange} />
                        </li>
                        <li>
                            <button
                                onClick={() => {
                                    if (this.isSorting || this.isSorted) {
                                        return;
                                    }
                                    this.isSorting = true;
                                    this.isComputing = true;
                                    switch (this.state.algorithm) {
                                        case "selection":
                                            this.selectionSort();
                                            break;
                                        case "quick":
                                            this.quickSortHelper();
                                            break;
                                        case "bubble":
                                            this.bubbleSort();
                                            break;
                                        default:
                                    }
                                    this.initEndSequence();
                                }}
                            >
                                Sort
                            </button>
                        </li>
                        <li>
                            <button onClick={() => this.generateArray()}>Generate New Array</button>
                        </li>
                        <li>
                            <a href="https://github.com/camgraff/sorting-algorithm-visualizer" id="gh-link">
                                View Code
                            </a>
                        </li>
                        <li>
                            <a href="https://camgraff.github.io" id="back-button">
                                camgraff.github.io
                            </a>
                        </li>
                    </ul>
                </nav>

                <div className="array-container">
                    {this.state.array.map((el, id) => (
                        <div
                            className="array-bar"
                            key={id}
                            style={{
                                backgroundColor: el.color,
                                height: `${el.value / (MAX_ARRAY_VAL / HEIGHT_PROP)}vh`,
                                width: `${WIDTH_PROP / ARRAY_SIZE}vw`
                            }}
                        ></div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Visualizer;
