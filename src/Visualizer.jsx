import React from "react";
import "./Visualizer.css";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

var ARRAY_SIZE = 100;
const MAX_ARRAY_VAL = 1000;

//percent of screen that array container div uses
const HEIGHT_PROP = 70;
const WIDTH_PROP = 60;

//array of times used to cancel sorting animations
var timerIds = [];

//bar colors
const START_COLOR = "red";
const COMP_COLOR = "yellow";
const FINISH_COLOR = "blue";

var animations = [];

var isSorted = false;

class Visualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      animationSpeed: 0.1,
      algorithm: ""
    };
  }

  componentDidMount() {
    this.generateArray();
  }

  componentDidUpdate() {
    let bgColor;
    if (isSorted) bgColor = FINISH_COLOR;
    else bgColor = START_COLOR;
    //set bar colors back to red if unsorted
    var arrayBars = document.getElementsByClassName("array-bar");
    for (var i = 0; i < ARRAY_SIZE; i++) {
      arrayBars[i].style.backgroundColor = bgColor;
    }
  }

  generateArray() {
    //reset animations
    animations = [];

    //stop the animation if function is called while sorting
    timerIds.forEach(function(value) {
      clearTimeout(value);
    });

    //populate array values
    const arr = [];
    for (var i = 0; i < ARRAY_SIZE; i++) {
      arr.push(Math.floor(Math.random() * MAX_ARRAY_VAL));
    }
    isSorted = false;
    this.setState({ array: arr });
  }

  selectionSort() {
    if (isSorted) return;
    //stop the animation if function is called while sorting
    timerIds.forEach(function(value) {
      clearTimeout(value);
    });

    var array = this.state.array;
    var arrayBars = document.getElementsByClassName("array-bar");
    var prevMinId = 0;
    for (let i = 0; i < ARRAY_SIZE; i++) {
      timerIds.push(
        setTimeout(() => {
          var min_id = i;
          for (let j = i + 1; j < ARRAY_SIZE; j++) {
            if (array[j] < array[min_id]) min_id = j;
          }

          //recolor previous yellow bar back to red since no longer being swapped
          if (prevMinId > i)
            arrayBars[prevMinId].style.backgroundColor = START_COLOR;
          prevMinId = min_id;
          //color bar that is being swapped yellow
          arrayBars[min_id].style.height = `${array[i] /
            (MAX_ARRAY_VAL / HEIGHT_PROP)}vh`;
          arrayBars[min_id].style.backgroundColor = COMP_COLOR;
          //color minimum value bar blue since it will be in sorted order
          arrayBars[i].style.height = `${array[min_id] /
            (MAX_ARRAY_VAL / HEIGHT_PROP)}vh`;
          arrayBars[i].style.backgroundColor = FINISH_COLOR;
          //swap array values
          array[i] = array.splice(min_id, 1, array[i])[0];
        }, i / this.state.animationSpeed)
      );
    }
    isSorted = true;
  }

  doAnimations() {
    var arrayBars = document.getElementsByClassName("array-bar");
    var prevBar1;
    var prevBar2;
    var sorted = [];
    //animations are of the form [[index1, value1], [index2, value2], isPivot]
    for (let i = 0; i < animations.length; i++) {
      timerIds.push(
        setTimeout(() => {
          if (i > 0) {
            if (!sorted.includes(prevBar1[0]))
              arrayBars[prevBar1[0]].style.backgroundColor = START_COLOR;
            if (!sorted.includes(prevBar2[0]))
              arrayBars[prevBar2[0]].style.backgroundColor = START_COLOR;
          }
          const bar1 = animations[i][0];
          const bar2 = animations[i][1];
          const isPiv = animations[i][2];
          arrayBars[bar1[0]].style.height = `${bar2[1] /
            (MAX_ARRAY_VAL / HEIGHT_PROP)}vh`;
          arrayBars[bar1[0]].style.backgroundColor = COMP_COLOR;
          arrayBars[bar2[0]].style.height = `${bar1[1] /
            (MAX_ARRAY_VAL / HEIGHT_PROP)}vh`;
          arrayBars[bar2[0]].style.backgroundColor = COMP_COLOR;
          if (isPiv === 1) {
            sorted.push(bar1[0]);
            arrayBars[bar1[0]].style.backgroundColor = FINISH_COLOR;
          }
          prevBar1 = bar1;
          prevBar2 = bar2;
        }, i / this.state.animationSpeed)
      );
    }
  }

  quickSortHelper() {
    if (isSorted) return;
    //stop the animation if function is called while sorting
    timerIds.forEach(function(value) {
      clearTimeout(value);
    });
    var arr = this.state.array;
    this.quickSort(arr, 0, ARRAY_SIZE - 1, 0);
    this.doAnimations();
    isSorted = true;
  }

  quickSortPartition(arr, low, high) {
    var pivot = arr[high];
    var i = low - 1;
    for (var j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        animations.push([[i, arr[i]], [j, arr[j]], 0]);
        arr[i] = arr.splice(j, 1, arr[i])[0];
      }
    }
    animations.push([[i + 1, arr[i + 1]], [high, arr[high]], 1]);
    arr[i + 1] = arr.splice(high, 1, arr[i + 1])[0];
    return i + 1;
  }

  quickSort(arr, low, high, counter) {
    if (low <= high) {
      var pi = this.quickSortPartition(arr, low, high, counter);
      this.quickSort(arr, low, pi - 1, counter + 1);
      this.quickSort(arr, pi + 1, high, counter + 1);
    }
  }

  bubbleSort() {
    var array = this.state.array;
    for (let i = 0; i < ARRAY_SIZE - 1; i++) {
      for (let j = 0; j < ARRAY_SIZE - i - 1; j++) {
        if (j + 1 === ARRAY_SIZE - i - 1)
          animations.push([[j + 1, array[j + 1]], [j, array[j]], 1]);
        else animations.push([[j + 1, array[j + 1]], [j, array[j]], 0]);

        if (array[j] > array[j + 1])
          array[j] = array.splice(j + 1, 1, array[j])[0];
      }
    }
    animations.push([[0, array[0]], [0, array[0]], 1]);   //need this line since last element must already be in sorted position
    isSorted = true;
    this.doAnimations();
  }

  handleArraySliderChange = value => {
    ARRAY_SIZE = value;
    this.generateArray();
  };

  handleAnimationSliderChange = value => {
    //stop the animation if function is called while sorting
    timerIds.forEach(function(value) {
      clearTimeout(value);
    });
    this.setState({ animationSpeed: value });
    if (isSorted) this.generateArray();
  };

  handleDropdownChange = event => {
    this.setState({ algorithm: event.value });
    if (isSorted) this.generateArray();
  };

  render() {
    const dropdownOptions = [
      { value: "selection", label: "Selection Sort" },
      { value: "quick", label: "Quick Sort" },
      { value: "bubble", label: "Bubble Sort" }
    ];
    return (
      <div className="container">
        <div className="button-container">
          <a href="https://camgraff.github.io" id="back-button">
            Back to camgraff.github.io
          </a>
          <a
            href="https://github.com/camgraff/sorting-algorithm-visualizer"
            id="gh-link"
          >
            View Code on Github
          </a>
          <div className="slider">
            {" "}
            Array Size
            <Slider
              min={5}
              max={200}
              value={ARRAY_SIZE}
              orientation="horizontal"
              onChange={this.handleArraySliderChange}
            />
          </div>
          <div className="slider">
            Animation Speed
            <Slider
              min={0.01}
              max={0.2}
              step={0.001}
              format={value => Math.floor(value * 1000)}
              value={this.state.animationSpeed}
              orientation="horizontal"
              onChange={this.handleAnimationSliderChange}
            />
          </div>
          <div className="dropdown">
            <Dropdown
              value={this.state.algorithm}
              ref="algorithm"
              options={dropdownOptions}
              placeholder="Select a sorting algorithm"
              onChange={this.handleDropdownChange}
            />
          </div>
          <button
            onClick={() => {
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
            }}
          >
            Sort
          </button>
          {/* <button onClick={() => this.selectionSort()}> Selection Sort </button>
          <button onClick={() => this.quickSortHelper()}> Quick Sort </button> */}
          <button onClick={() => this.generateArray()}>
            Generate New Array
          </button>
        </div>
        <div className="array-container">
          {this.state.array.map((val, id) => (
            <div
              className="array-bar"
              key={id}
              style={{
                backgroundColor: START_COLOR,
                height: `${val / (MAX_ARRAY_VAL / HEIGHT_PROP)}vh`,
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
