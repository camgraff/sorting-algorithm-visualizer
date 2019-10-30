(this["webpackJsonpsorting-algorithm-visualizer"]=this["webpackJsonpsorting-algorithm-visualizer"]||[]).push([[0],{11:function(e,t,a){e.exports=a(27)},16:function(e,t,a){},17:function(e,t,a){},27:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(1),i=a.n(o),l=(a(16),a(5)),c=a(6),s=a(9),u=a(7),h=a(10),m=(a(17),a(2)),d=a.n(m),f=(a(25),a(8)),g=a.n(f),y=(a(26),100),v=[],b=[],k=!1,p=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).handleArraySliderChange=function(e){y=e,a.generateArray()},a.handleAnimationSliderChange=function(e){v.forEach((function(e){clearTimeout(e)})),a.setState({animationSpeed:e}),k&&a.generateArray()},a.handleDropdownChange=function(e){a.setState({algorithm:e.value}),k&&a.generateArray()},a.state={array:[],animationSpeed:.1,algorithm:""},a}return Object(h.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.generateArray()}},{key:"componentDidUpdate",value:function(){var e;e=k?"blue":"red";for(var t=document.getElementsByClassName("array-bar"),a=0;a<y;a++)t[a].style.backgroundColor=e}},{key:"generateArray",value:function(){b=[],v.forEach((function(e){clearTimeout(e)}));for(var e=[],t=0;t<y;t++)e.push(Math.floor(1e3*Math.random()));k=!1,this.setState({array:e})}},{key:"selectionSort",value:function(){var e=this;if(!k){v.forEach((function(e){clearTimeout(e)}));for(var t=this.state.array,a=document.getElementsByClassName("array-bar"),n=0,r=function(r){v.push(setTimeout((function(){for(var e=r,o=r+1;o<y;o++)t[o]<t[e]&&(e=o);n>r&&(a[n].style.backgroundColor="red"),n=e,a[e].style.height="".concat(t[r]/12.5,"vh"),a[e].style.backgroundColor="yellow",a[r].style.height="".concat(t[e]/12.5,"vh"),a[r].style.backgroundColor="blue",t[r]=t.splice(e,1,t[r])[0]}),r/e.state.animationSpeed))},o=0;o<y;o++)r(o);k=!0}}},{key:"doAnimations",value:function(){for(var e,t,a=this,n=document.getElementsByClassName("array-bar"),r=[],o=function(o){v.push(setTimeout((function(){o>0&&(r.includes(e[0])||(n[e[0]].style.backgroundColor="red"),r.includes(t[0])||(n[t[0]].style.backgroundColor="red"));var a=b[o][0],i=b[o][1],l=b[o][2];n[a[0]].style.height="".concat(i[1]/12.5,"vh"),n[a[0]].style.backgroundColor="yellow",n[i[0]].style.height="".concat(a[1]/12.5,"vh"),n[i[0]].style.backgroundColor="yellow",1===l&&(r.push(a[0]),n[a[0]].style.backgroundColor="blue"),e=a,t=i}),o/a.state.animationSpeed))},i=0;i<b.length;i++)o(i)}},{key:"quickSortHelper",value:function(){if(!k){v.forEach((function(e){clearTimeout(e)}));var e=this.state.array;this.quickSort(e,0,y-1,0),this.doAnimations(),k=!0}}},{key:"quickSortPartition",value:function(e,t,a){for(var n=e[a],r=t-1,o=t;o<a;o++)e[o]<n&&(r++,b.push([[r,e[r]],[o,e[o]],0]),e[r]=e.splice(o,1,e[r])[0]);return b.push([[r+1,e[r+1]],[a,e[a]],1]),e[r+1]=e.splice(a,1,e[r+1])[0],r+1}},{key:"quickSort",value:function(e,t,a,n){if(t<=a){var r=this.quickSortPartition(e,t,a,n);this.quickSort(e,t,r-1,n+1),this.quickSort(e,r+1,a,n+1)}}},{key:"bubbleSort",value:function(){for(var e=this.state.array,t=0;t<y-1;t++)for(var a=0;a<y-t-1;a++)a+1==y-t-1?b.push([[a+1,e[a+1]],[a,e[a]],1]):b.push([[a+1,e[a+1]],[a,e[a]],0]),e[a]>e[a+1]&&(e[a]=e.splice(a+1,1,e[a])[0]);b.push([[0,e[0]],[0,e[0]],1]),k=!0,this.doAnimations()}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"button-container"},r.a.createElement("a",{href:"https://camgraff.github.io",id:"back-button"},"Back to camgraff.github.io"),r.a.createElement("a",{href:"https://github.com/camgraff/sorting-algorithm-visualizer",id:"gh-link"},"View Code on Github"),r.a.createElement("div",{className:"slider"}," ","Array Size",r.a.createElement(d.a,{min:5,max:200,value:y,orientation:"horizontal",onChange:this.handleArraySliderChange})),r.a.createElement("div",{className:"slider"},"Animation Speed",r.a.createElement(d.a,{min:.01,max:.2,step:.001,format:function(e){return Math.floor(1e3*e)},value:this.state.animationSpeed,orientation:"horizontal",onChange:this.handleAnimationSliderChange})),r.a.createElement("div",{className:"dropdown"},r.a.createElement(g.a,{value:this.state.algorithm,ref:"algorithm",options:[{value:"selection",label:"Selection Sort"},{value:"quick",label:"Quick Sort"},{value:"bubble",label:"Bubble Sort"}],placeholder:"Select a sorting algorithm",onChange:this.handleDropdownChange})),r.a.createElement("button",{onClick:function(){switch(e.state.algorithm){case"selection":e.selectionSort();break;case"quick":e.quickSortHelper();break;case"bubble":e.bubbleSort()}}},"Sort"),r.a.createElement("button",{onClick:function(){return e.generateArray()}},"Generate New Array")),r.a.createElement("div",{className:"array-container"},this.state.array.map((function(e,t){return r.a.createElement("div",{className:"array-bar",key:t,style:{backgroundColor:"red",height:"".concat(e/12.5,"vh"),width:"".concat(60/y,"vw")}})}))))}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(p,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[11,1,2]]]);
//# sourceMappingURL=main.cec18a1f.chunk.js.map