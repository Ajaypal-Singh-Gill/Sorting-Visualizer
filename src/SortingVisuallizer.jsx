import React , {useState} from 'react';
import Array from './ArrayComponent';
import './SV.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

var speed = 0;
var speedQ = 0;
var size = 0 ;
var delay_time=10000/(5*50);
var delay_between_ops = 0;
class Queue 
{ 
    // Array is used to implement a Queue 
    constructor() 
    { 
        this.items = []; 
    } 
                  
    // Functions to be implemented 
    enqueue(element) 
{     
    // adding element to the queue 
    this.items.push(element); 
} 
dequeue() 
{ 
    // removing element from the queue 
    // returns underflow when called  
    // on empty queue 
    
    return this.items.shift(); 
} 
front() 
{ 
    // returns the Front element of  
    // the queue without removing it. 
    if(this.isEmpty()) 
        return "No elements in Queue"; 
    return this.items[0]; 
} 

    // enqueue(item) 
    // dequeue() 
    // front() 
    // isEmpty() 
    // printQueue() 
} 

export default function SortingVisualizer(){
    
    const [ allStates , changeStates] = useState({
      array:[],
      speedBar:50,
      size:50
    });

    function onChange(event){
      const {name,value} = event.target;
      changeStates(prevUser=>{
        return {
            ...prevUser,
            [name] : value
           
        }
      });
      console.log(value);
      if(name === "size"){
        const array = [];
        delay_time=10000/(Math.floor(allStates.size/10)*value);
        for (let i = 0; i < value ; i++) {
          array.push(Math.floor(Math.random() * (200 - 50 + 1) + 50));
        }
        changeStates(prevUser=>{
          return {
              ...prevUser,
              array : array
          }
       
        });

      }
      if(name === "speedBar"){
        delay_time=10000/(Math.floor(allStates.size/10)*value);
        speed = allStates.speedBar;
        speedQ = allStates.speedBar;

      }
      console.log(allStates);
      // function onChangeSpeed(event){
      //   changeStates(prevUser=>{
      //     return {
      //         ...prevUser,
      //         [speedBar] : event.target.value
      //     }
       
      //   });

    }
    function resetArray() {
        const array = [];
        // const array = [50,30,70,60,20,90];
        // const array = [50,60,70,80,90,100];

        // const array = [190,133,104,87,191,100,140];


        console.log("Array"+allStates.size);
        for (let i = 0; i < allStates.size ; i++) {
          array.push(Math.floor(Math.random() * (200 - 50 + 1) + 50));
        }

        changeStates(prevUser=>{
          return {
              ...prevUser,
              array : array
          }
       
        });
    }


      function mergeSort(event){

        event.preventDefault();
        const auxiliaryArray = allStates.array.slice();
        const temp = allStates.array.slice();
        // console.log("qwert"+array.length);
        // const arrayBars = document.getElementsByClassName('array-bar');
        // const barOneStyle = arrayBars[0].style;
        // barOneStyle.height = '100px';



        mergeSortHelper(allStates.array, 0, allStates.array.length - 1, auxiliaryArray,temp,allStates.array.length);
        speedQ++;
       
        setTimeout(() => {
          changeStates(prevUser=>{
            return {
                ...prevUser,
                array : auxiliaryArray
            }
           
          });
        },10*speedQ);


      }

      function mergeSortHelper(mainArray,startIdx,endIdx,auxiliaryArray,temp,length){
        if (startIdx === endIdx) return;
          const middleIdx = Math.floor((startIdx + endIdx) / 2);
          // console.log("qwert"+middleIdx);

          mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray,temp,length);
          mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray,temp,length);
          auxiliaryArray = temp.slice();

          doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray,temp,length);

          
          console.log("in helper "+temp);
          auxiliaryArray = temp.slice();
          console.log("auxilaryArray in helper "+auxiliaryArray);

      }
 
      var queue = new Queue(); 

      function doMerge(mainArray,startIdx,middleIdx,endIdx,auxiliaryArray,temp,length){
      
        let k = startIdx;
        let i = startIdx;
        let j = middleIdx + 1;
        let x = i;
        let y = j;
        const arrayBars = document.getElementsByClassName('array-bar');
        while (i <= middleIdx && j <= endIdx) {
            
            x=i;
            y=j;
            console.log("First Loop"+k);
            console.log("before"+i);
            console.log("before"+j);
            // const barOneStyle = arrayBars[i].style;
            // const barTwoStyle = arrayBars[j].style;
   
            speed++;
            queue.enqueue([i,j]);
            setTimeout(() => {
              const [q,w] = queue.dequeue();
              const barOneStyle = arrayBars[q].style;
              const barTwoStyle = arrayBars[w].style;
              barOneStyle.backgroundColor = 'red';
              barTwoStyle.backgroundColor = 'red';
           }, 10*speed);
          
         speed++;
        //   console.log(speed);
        queue.enqueue([i,j]);
          setTimeout(() => {
            const [q,w] = queue.dequeue();
            const barOneStyle = arrayBars[q].style;
            const barTwoStyle = arrayBars[w].style;
            barOneStyle.backgroundColor = 'green';
            barTwoStyle.backgroundColor = 'green';
         }, 10*speed);
          // changeColor(i,j,'red');
          
          // await new Promise(r => setTimeout(r, 1*k));



          speed++;
          queue.enqueue([k,i,j,auxiliaryArray]);
          setTimeout(() => {
            const [c,a,b,newArray] = queue.dequeue();

            console.log("a"+a);
            console.log("b"+b);
            console.log("newArray "+newArray);
            // console.log("barOneStyle.heigh"+barOneStyle.height);
            console.log("newArray[a]"+newArray[a]);
            console.log("newArray[b]"+newArray[b]);
            console.log("K"+c);
            const barOneStyleMain = arrayBars[c].style;
            barOneStyleMain.height = newArray[a] <= newArray[b] ? `${newArray[a]}px` : `${newArray[b]}px`;
            console.log("AfterbarOneStyle.heigh"+barOneStyleMain.height);

            }, 10*speed);

            

            // k++;
            
            console.log("auxilaryArray Before changing " +auxiliaryArray);
            temp[k++] = auxiliaryArray[i] <= auxiliaryArray[j] ? auxiliaryArray[i++] : auxiliaryArray[j++];
            // speed++;
            // if(i <= middleIdx){
              
            // }
            // setTimeout(() => {
                
            // },1*speed)
            // speed++;
            // if(j <= endIdx){
              
            // }
            // setTimeout(() => {
                
            // },1*speed)
            // speed++;
            // setTimeout(() => {
              
            // },1*speed);
          }
        
          secondLoop(i,k,middleIdx,arrayBars,auxiliaryArray,temp,length);

          thirdLoop(j,k,endIdx,arrayBars,auxiliaryArray,temp,length);

          auxiliaryArray = temp.slice();
          console.log("auxilaryArray"+auxiliaryArray);


      }
      function secondLoop(i,k,middleIdx,arrayBars,auxiliaryArray,temp,length){
        let x = i;
        while (i <= middleIdx && k < length) {
          x=i;
          console.log("Second Loop"+k);
          const barOneStyle = arrayBars[k].style;
          
          speed++;

          setTimeout(() => {
            barOneStyle.backgroundColor = 'red';
          }, 10*speed);

          // await sleep(1000);

          speed++;
          
          setTimeout(() => {
            barOneStyle.backgroundColor = 'green';
          }, 10*speed);
          
          // const barOneStyleMain = arrayBars[k].style;

          
              

          queue.enqueue([i,i,auxiliaryArray]);
              speed++;
            setTimeout(() => {
              
              const [a,b,newArray] = queue.dequeue();
              console.log("a"+a);
              console.log("newArray "+newArray);

              barOneStyle.height = `${newArray[a]}px`;
             }, 10*speed);

             temp[k++] = auxiliaryArray[i++];

        }
      }
      function thirdLoop(j,k,endIdx,arrayBars,auxiliaryArray,temp,length){
        let y = j;
        while (j <= endIdx && k < length) {
          y=j;
          console.log("Third Loop"+k);
          const barOneStyle = arrayBars[k].style;

          speed++;
          setTimeout(() => {
            barOneStyle.backgroundColor = 'red';
          }, 10*speed);


          // await sleep(1000);

          speed++;
          setTimeout(() => {
            barOneStyle.backgroundColor = 'green';
          }, 10*speed);
          
          //  setTimeout(() => {
            
          // }, 1);
          
          // const barOneStyleMain = arrayBars[k].style;
          speed++;
          queue.enqueue([j,j,auxiliaryArray]);
          setTimeout(() => {
            const [a,b,newArray] = queue.dequeue();
            console.log("a"+a);
            console.log("newArray "+newArray);

            barOneStyle.height = `${newArray[a]}px`;
          }, 10*speed);
          temp[k++] = auxiliaryArray[j++];
        }
      }

      function quickSort(event){
        event.preventDefault();
        speedQ = allStates.speedBar;
        queue1 = new Queue();
        var auxiliaryArray = allStates.array.slice();
        quickSortHelper(auxiliaryArray,0,allStates.array.length-1);
        speedQ++;
       
        setTimeout(() => {
          changeStates(prevUser=>{
            return {
                ...prevUser,
                array : auxiliaryArray
            }
         
          });
        },10*speedQ);
      }


      var queue1 = new Queue();

      function quickSortHelper(auxiliaryArray,left,right){
        var index;
        if (auxiliaryArray.length > 1) {
            index = partition(auxiliaryArray, left, right); //index returned from partition
            if (left < index-1) { //more elements on the left side of the pivot
                quickSortHelper(auxiliaryArray, left, index - 1);
            }
            if (index < right) { //more elements on the right side of the pivot
                quickSortHelper(auxiliaryArray, index, right);
            }
        }
        
      }

      function partition(auxiliaryArray, left, right){
        var pivot = Math.floor((right + left) / 2), //middle element
        
        i = left, //left pointer
        j = right; //right pointer
        console.log(pivot);
        console.log(auxiliaryArray);

        const arrayBars = document.getElementsByClassName("array-bar");

        speedQ++;
        queue1.enqueue([pivot]);
        setTimeout(() => {
          const [a] = queue1.dequeue();
          console.log("AA"+a);
          const barStyle = arrayBars[a].style;
          // console.log("bbb"+barStyle);

          barStyle.backgroundColor = 'yellow';
        },10*speedQ);

     
    const pivotElement = auxiliaryArray[pivot];
    while (i <= j) {

        while (auxiliaryArray[i] < pivotElement) {
          speedQ++;
          queue1.enqueue(i);
          setTimeout(() => {
          const a = queue1.dequeue();
          const barStyle = arrayBars[a].style;
          barStyle.backgroundColor = 'red';
          },10*speedQ);

          speedQ++;
          queue1.enqueue(i);
          setTimeout(() => {
          const a = queue1.dequeue();
          const barStyle = arrayBars[a].style;
          barStyle.backgroundColor = 'green';
          },10*speedQ);

          i++;

        }

        while (auxiliaryArray[j] > pivotElement) {
          speedQ++;
          queue1.enqueue(j);
          setTimeout(() => {
          const a = queue1.dequeue();
          const barStyle = arrayBars[a].style;
          barStyle.backgroundColor = 'red';
          },10*speedQ);

          speedQ++;
          queue1.enqueue(j);
          setTimeout(() => {
          const a = queue1.dequeue();
          const barStyle = arrayBars[a].style;
          barStyle.backgroundColor = 'green';
          },10*speedQ);

          j--;
        }

        if (i <= j) {

          queue1.enqueue([i,j]);
          speedQ++;
          setTimeout(() => {
          const [a,b] = queue1.dequeue();
          const barStyleOne = arrayBars[a].style;
          const barStyleTwo = arrayBars[b].style;
          barStyleOne.backgroundColor = 'violet';
          barStyleTwo.backgroundColor = 'violet';
          },10*speedQ);

          queue1.enqueue([i,j]);
          speedQ++;
          setTimeout(() => {
          const [a,b] = queue1.dequeue();
          const barStyleOne = arrayBars[a].style;
          const barStyleTwo = arrayBars[b].style;
          barStyleOne.backgroundColor = 'green';
          barStyleTwo.backgroundColor = 'green';
          },10*speedQ);

          queue1.enqueue([i,j,auxiliaryArray]);
          speedQ++;
          setTimeout(() => {
          const [a,b,tempArray] = queue1.dequeue();
          const barStyleOne = arrayBars[a].style;
          const barStyleTwo = arrayBars[b].style;
          const heightOne = barStyleOne.height;
          const heightTwo = barStyleTwo.height;
          console.log("tempArray[a]"+tempArray[a]);
          console.log("tempArray[b]"+tempArray[b]);

          console.log("heightOne"+heightOne);
          console.log("heightTwo"+heightTwo);


          barStyleOne.height = heightTwo;
          barStyleTwo.height = heightOne;
          console.log("heightOneAfter"+barStyleOne.height);
          console.log("heightTwoAfter"+barStyleTwo.height);
          },10*speedQ);

          [auxiliaryArray[i], auxiliaryArray[j]] = [auxiliaryArray[j], auxiliaryArray[i]];

          i++;
          j--;

        }
    }
    return i;

    }

    function insertionSort(){
      var queue2 = new Queue();
      var speedI = allStates.speedBar;
      var auxiliaryArray = allStates.array.slice();
      const arrayBars = document.getElementsByClassName("array-bar");
      for (let i = 1; i < auxiliaryArray.length; i++) {
        let j = i - 1;
        let tmp = auxiliaryArray[i];
        queue2.enqueue(i);
        speedI++;
        delay_between_ops+=delay_time;
        setTimeout(() => {
          const barOneStyle = arrayBars[queue2.dequeue()].style;
          barOneStyle.backgroundColor = 'yellow';
        },delay_between_ops);


        while (j >= 0 && auxiliaryArray[j] > tmp) {

          queue2.enqueue([j,i]);
          speedI++;
          delay_between_ops+=delay_time;
          setTimeout(() => {
            const [a,b] = queue2.dequeue();
            const barOneStyle = arrayBars[a].style;
            const barTwoStyle = arrayBars[a+1].style;
            barOneStyle.backgroundColor = 'red';
            barTwoStyle.backgroundColor = 'red';
            
        },delay_between_ops);

        queue2.enqueue(j);
          speedI++;
          delay_between_ops+=delay_time;
          setTimeout(() => {
            const a = queue2.dequeue();
            const barOneStyle = arrayBars[a].style;
            const barTwoStyle = arrayBars[a+1].style;
            const heightOne = barOneStyle.height;
            const heightTwo = barTwoStyle.height;
            barOneStyle.height = heightTwo;
            barTwoStyle.height = heightOne;
        },delay_between_ops);

        queue2.enqueue(j);
          speedI++;
          delay_between_ops+=delay_time;
          setTimeout(() => {
            const a = queue2.dequeue();
            const barOneStyle = arrayBars[a].style;
            const barTwoStyle = arrayBars[a+1].style;
            barOneStyle.backgroundColor = 'green';
            barTwoStyle.backgroundColor = 'green';
        },delay_between_ops);

        [auxiliaryArray[j+1], auxiliaryArray[j]] = [auxiliaryArray[j], auxiliaryArray[j+1]];
          j--
        }
      }
      allStates.array = auxiliaryArray.slice();
    }

    return <div>
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Navbar</a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={resetArray} >Produce New Array</button>
            </li>
            <li class="nav-item active">

            {/* <form class="range-field my-4 w-50">
            <label for="customRange2">Example range</label>
            <input type="range" class="custom-range" min="0" max="5" step="0.5" id="customRange2"></input>
            </form> */}
            {/* <input type="range" id="number-of-elements" min='10' max='100' ></input> */}
            </li>
            
            <li class="nav-item active ">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit"  onClick={mergeSort}>Merge Sort</button>
            </li>
            <li class="nav-item active ">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit"  onClick={quickSort}>Quick Sort</button>
            </li>
            <li class="nav-item active ">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit"  onClick={insertionSort}>Insertion Sort</button>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
 
          <label for="customRange2" style={{color:'green'}}>Speed</label>
          <input name = "speedBar" type="range" min="1" max="100"  class="slider mr-sm-2" id="myRange" onChange={onChange} value={allStates.speedBar}></input>
          
             </form>
         
          <form class="form-inline my-2 my-lg-0">
          <label for="customRange2" style={{color:'green'}}>Size</label>
          <input name = "size" type="range" min="1" max="100"  class="slider mr-sm-2" id="myRange" onChange={onChange} value={allStates.size}></input>
          
          {/* <label for="customRange2">Example range</label>
            <input type="range" class="custom-range mr-sm-2" min="0" max="100" step="0" id="customRange3"></input> */}
      {/* <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
         </form>
        </div>  
      </nav>
      </div>
        
        <table class="table table-dark">
            <tr>
                <td>{allStates.array.map((value, idx) => (
                <Array text={value}></Array>
        
        ))}</td>
        </tr>
        <tr>
        <td>
        {allStates.array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: 'green',
              height: `${value}px`,
            }}></div>
        ))}
        </td>
        </tr>
        </table>    
  </div>
  }

