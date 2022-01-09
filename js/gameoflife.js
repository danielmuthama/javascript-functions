function seed(a,b,c) {
  return Array.from([a,b,c]);
}

function same([x, y], [j, k]) {
if([x, y] == [j, k]){
  return true;
}
else {
  return false;
}
}

// The game state to search for `cell` is passed as the `this` value of the function.
function contains(cell) {

    var Cell = function(isAlive){

    var currentState = isAlive;
    // the pending state of the cell at the next generation
    var nextState = undefined;
    var that = {};
  
    // returns true if Cell is alive, false otherwise
    that.isAlive = function(){
      return currentState;
    }
    // will contain Coords(x,y) of neighbors, to be populated when Board is initialized
    var neighbors = [];
  
    // returns array containing the Coords(x,y) of a Cell's neighbors
    that.getNeighbors = function(){
      return neighbors;
    }
  
    // sets current state to input boolean indicating if cell is alive or dead
    that.setCurrentState = function(isAlive){
      currentState = isAlive;
    }
  
    // sets the pending state of the cell at the next generation
    that.setNextState = function(isAlive){
      nextState = isAlive;
    }
    
    // returns next state of the cell
    that.getNextState = function(){
      return nextState;
    }
  
    // sets the current state to its pending next state
    that.updateCurrentState = function(){
      currentState = nextState;
    }
    return that;
  }
 
}

const printCell = (cell, state) => {
  return contains.call(state, cell) ? '\u25A3' : '\u25A2'

};

const corners = (state = []) => {
  if(state.length===0) return {topRight: [0,0], bottomLeft: [0,0]}
  let max = Math.max
  let min = Math.min
  let x = state.map(coord=>coord[0])
  let y = state.map(coord=>coord[1])
  return {topRight:[max(...x),max(...y)], bottomLeft: [min(...x), min(...y)]}
};

const printCells = (state) => {
    const {topRight, bottomLeft} = corners(state)
    let topRightString = printCell(topRight)
    const bottomLeftString = printCell(bottomLeft)
    return true;
};

const getNeighborsOf = ([x, y]) => {
    let neighbors = [2,2];
    for (x = 0; x < matrix.length; x++) {
        for (y = 0; y < matrix[x].length; y++) {
            if (x < matrix.length-1) {
                if (matrix[x][y] == matrix[x + 1][y]) {
                    neighbors++;
                }
            }
            if(y<matrix[x].length) {
                if (matrix[x][y] == matrix[x][y + 1]) {
                    neighbors++;
                }
            }
        }
    }
    return neighbors;
};

const getLivingNeighbors = (cell, state) => {
  foreach (cell in state.Neighbors)
            {
                if (neighbor.Alive == true)
                {
                    state.AliveNeighbors++;
                }
            }
        };

const willBeAlive = (cell, state) => {
    switch(cell) {
    case 0:
    case 1:
        // if less than two neighbors are alive set it to dead
        board[i][j] = 0;
        break;
    
    case 2:
        // if two neighbors are alive, whether living or dead it will remain the same
        board[i][j] = board[i][j];
        break;
    
    case 3:
        // if exactly three neighbors are alive, either stays alive if already alive
        // or is set to alive if dead
        board[i][j] = 1;
        break;
    
    default:
        // if there are more than three neighbors alive set to dead
        board[i][j] = 0;
}
};

const calculateNext = (state) => {
    if (generation < numOfGenerations) {
        generation += 1;
        console.log("Generation " + generation);
        int[][] newState = new int[state.length][state[0].length];
        for(let i=0; i<state.length; i++) {
        newState[i] = Arrays.copyOf(state[i], state[i].length);
        }
        
         var livingNeighbors;
        //loop over the rows
        for(let i=0; i<newState.length; i++) {
            //loop over the columns
            for(let j=0; j<newState[0].length; j++) {
                //set the living neighbors to 0
                livingNeighbors = getLivingNeighbors(0, i, j, newState);
                setAliveOrDead(livingNeighbors, state, i, j);
            }
        }
        calculateNext(state);
        state = getNextGeneration(state, numOfGenerations);
    }
    return state;
};

const iterate = (state, iterations) => {
    Object.keys(state).forEach(function(key) {
      if(key!=iterations){
        state[key]=false; 
      } else {
        state[key]=true; 
      }
     });
    return state
};

const main = (pattern, iterations) => {
  
};

const startPatterns = {
    rpentomino: [
      [3, 2],
      [2, 3],
      [3, 3],
      [3, 4],
      [4, 4]
    ],
    glider: [
      [-2, -2],
      [-1, -2],
      [-2, -1],
      [-1, -1],
      [1, 1],
      [2, 1],
      [3, 1],
      [3, 2],
      [2, 3]
    ],
    square: [
      [1, 1],
      [2, 1],
      [1, 2],
      [2, 2]
    ]
  };
  
  const [pattern, iterations] = process.argv.slice(2);
  const runAsScript = require.main === module;
  
  if (runAsScript) {
    if (startPatterns[pattern] && !isNaN(parseInt(iterations))) {
      main(pattern, parseInt(iterations));
    } else {
      console.log("Usage: node js/gameoflife.js rpentomino 50");
    }
  }
  
  exports.seed = seed;
  exports.same = same;
  exports.contains = contains;
  exports.getNeighborsOf = getNeighborsOf;
  exports.getLivingNeighbors = getLivingNeighbors;
  exports.willBeAlive = willBeAlive;
  exports.corners = corners;
  exports.calculateNext = calculateNext;
  exports.printCell = printCell;
  exports.printCells = printCells;
  exports.startPatterns = startPatterns;
  exports.iterate = iterate;
  exports.main = main;