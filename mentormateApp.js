function mentorMate(array) {
    let dimensions = array.shift()                 // Taking the dimantions.
    let rows = Number(dimensions.split(` `)[0])     //Taking the rows.
    let cols = Number(dimensions.split(` `)[1])    //Taking the cols.
    let numberOfBrics = rows * cols / 2             // Finding the numberOfBrics.
    let figure = array                              //Making new var with easyer name to work with.
    let finalArray = []                             //Making prePrinting array.
    let bricks = ``                                 // Making var for three-brick-check function.
    let secondLearOddRow = []                       // I`ll take every two rows for processing.
    let secondLearEvenRow = []
    let message=``                                  // Instead of "-1" I`ll print message with notification of the problem.
    if (validate(rows, cols) && brickCheck(array)) { //Cheking if input parameters are ok. 
        for (let i = 0; i < rows; i += 2) {           //Taking every two rows for processing.
            let firstRow = (figure[i]).split(` `)      //Making an array from string to easyer processing.
            let secondRow = (figure[i + 1]).split(` `) 
            let squareKind = ``                         //I`ll take squares  from the two rows of bricks.

            for (let s = 0; s < cols; s += 2) {             //Taking the squares.
                let square = [firstRow[s], firstRow[s + 1], secondRow[s], secondRow[s + 1]]
                if (square[0] == square[2] || square[1] == square[3]) {   //Choosing what king of square is.
                    squareKind = `stand`                    // If square status is stand put two laying blocks/
                }
                else if (square[0] == square[1] || square[2] == square[3]) {
                    squareKind = `lay`                      // If square status is lay put two standing blocks
                }
                else {
                    squareKind = `Mix`                      // If square status is mix doesnt matter
                }
                squareKind == `lay` ? addStandBricks(s + 1) : addLayedBricks(s + 1) // Ternary operator that check what kind of brickpair to add
            }
            finalArray.push(secondLearOddRow)   // Forming the second layer of bricks.
            finalArray.push(secondLearEvenRow)
            secondLearEvenRow = []              // Clearing the rows for next set of bricks.
            secondLearOddRow = []

        }
        console.log(printFunc(finalArray))      // Prints the output.
    }
    else {
        console.log(message)                    // If there is a error of inputs, findig out what is and printing it.
    }




    function addLayedBricks(currentBrickNum) {          // Function that adds two layed bricks
        secondLearOddRow.push(currentBrickNum + ` `)     //Pushing bricks in second layer and starting to surround them. I`m using "|",
        secondLearOddRow.push(currentBrickNum + `|`)    // ...instead of "-" by T.5 of task, couse i thing it looks more like bricks in the end.Hope its not a mistake for you :/
        secondLearEvenRow.push((currentBrickNum + 1) + ` `)
        secondLearEvenRow.push((currentBrickNum + 1) + `|`)
    }
    function addStandBricks(currentBrickNum) {       // Function that adds two stand bricks
        secondLearOddRow.push(currentBrickNum + `|`)
        secondLearOddRow.push((currentBrickNum + 1) + `|`)
        secondLearEvenRow.push(currentBrickNum + `|`)
        secondLearEvenRow.push((currentBrickNum + 1) + `|`)
    }
    function printFunc(arr) {   // Function that surround the bricks with chars and return string to print.
        let block = []          //Making vars for easyar processing.
        let prePrintArr = []
        let solidBorder = ``
        let finalString = ``
        arr.forEach(element => {
            let body = element.join(``)
            body = `|` + body // Adding the left border of the layer
            block.push(body)
        });
        for (let p = 0; p < arr.length; p += 2) {
            let first = block[p]            //First row to processing.
            let second = block[p + 1]       //Second row to processing.
            let rowBorder = ``              //Making a var for border between rows.
            solidBorder = ``                //Making a ver  for border between every two rows.Thats why its solid.
            for (let c = 0; c < first.length; c++) {
                let firstRowChar = first[c]         // Takin the first row char.
                let secondRowChar = second[c]          // Takin the second row char.
                solidBorder += `*`                  // adding "*" by using the for cycle because the chars from row are exactly same num that we need.
                if (firstRowChar == secondRowChar && firstRowChar !== `|` && firstRowChar !== ` `) {
                    rowBorder += ` ` // Check if the two chars are the same that means that the brick is stand and we put space.
                }
                else {
                    rowBorder += `*` // If not we put "*" couse that means that the brick is layed or its a border.
                }
            }

            prePrintArr.push(first)     // Pushing the components.
            prePrintArr.push(rowBorder)
            prePrintArr.push(second)
            prePrintArr.push(solidBorder)

        }
        prePrintArr.unshift(solidBorder) // Adding the verry upper border.
        for (let row of prePrintArr) {
            finalString += `${row}\n`  // Making the final string that we`ll print.
        }
        return finalString 
    }
    function validate(rows, cols) {
        if (rows >= 100 || cols >= 100) {
            message=`More than 100 rows/cols`
            return false
        }
        if(rows%2!==0 && cols%2!==0){
            message =`Cols and rows have to be even`
            return false 
        }
        if(rows!==array.length || cols!==array[0].split(` `).length){
            message= `Too colons or rows not match`
            return false
        }
        
        
        return true
    }
    function brickCheck(array){
        for(let row of array){
            bricks+=`${row} `
        }
        bricks=bricks.split(` `)
        for(let b = 1; b<numberOfBrics ; b++){
            let currentNum = b+``
            let nums= bricks.filter( char => char==currentNum)
            if(nums.length>2){
                message=`There is birck with 3 parts`
                return false
            }
        } 
        return true
    }
    
}

mentorMate(['4 8', '1 2 2 12 5 7 7 16', '1 10 10 12 5 15 15 16', '9 9 3 4 4 8 8 14', '11 11 3 13 13 6 6 14'])
