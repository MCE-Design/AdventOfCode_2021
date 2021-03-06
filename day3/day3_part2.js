// Next, you should verify the life support rating, which can be determined by multiplying the oxygen generator rating by the CO2 scrubber rating.

// Both the oxygen generator rating and the CO2 scrubber rating are values that can be found in your diagnostic report - finding them is the tricky part. Both values are located using a similar process that involves filtering out values until only one remains. Before searching for either rating value, start with the full list of binary numbers from your diagnostic report and consider just the first bit of those numbers. Then:

// Keep only numbers selected by the bit criteria for the type of rating value for which you are searching. Discard numbers which do not match the bit criteria.
// If you only have one number left, stop; this is the rating value for which you are searching.
// Otherwise, repeat the process, considering the next bit to the right.
// The bit criteria depends on which type of rating value you want to find:

// To find oxygen generator rating, determine the most common value (0 or 1) in the current bit position, and keep only numbers with that bit in that position. If 0 and 1 are equally common, keep values with a 1 in the position being considered.
// To find CO2 scrubber rating, determine the least common value (0 or 1) in the current bit position, and keep only numbers with that bit in that position. If 0 and 1 are equally common, keep values with a 0 in the position being considered.
// For example, to determine the oxygen generator rating value using the same example diagnostic report from above:

// Start with all 12 numbers and consider only the first bit of each number. There are more 1 bits (7) than 0 bits (5), so keep only the 7 numbers with a 1 in the first position: 11110, 10110, 10111, 10101, 11100, 10000, and 11001.
// Then, consider the second bit of the 7 remaining numbers: there are more 0 bits (4) than 1 bits (3), so keep only the 4 numbers with a 0 in the second position: 10110, 10111, 10101, and 10000.
// In the third position, three of the four numbers have a 1, so keep those three: 10110, 10111, and 10101.
// In the fourth position, two of the three numbers have a 1, so keep those two: 10110 and 10111.
// In the fifth position, there are an equal number of 0 bits and 1 bits (one each). So, to find the oxygen generator rating, keep the number with a 1 in that position: 10111.
// As there is only one number left, stop; the oxygen generator rating is 10111, or 23 in decimal.
// Then, to determine the CO2 scrubber rating value from the same example above:

// Start again with all 12 numbers and consider only the first bit of each number. There are fewer 0 bits (5) than 1 bits (7), so keep only the 5 numbers with a 0 in the first position: 00100, 01111, 00111, 00010, and 01010.
// Then, consider the second bit of the 5 remaining numbers: there are fewer 1 bits (2) than 0 bits (3), so keep only the 2 numbers with a 1 in the second position: 01111 and 01010.
// In the third position, there are an equal number of 0 bits and 1 bits (one each). So, to find the CO2 scrubber rating, keep the number with a 0 in that position: 01010.
// As there is only one number left, stop; the CO2 scrubber rating is 01010, or 10 in decimal.
// Finally, to find the life support rating, multiply the oxygen generator rating (23) by the CO2 scrubber rating (10) to get 230.

// Use the binary numbers in your diagnostic report to calculate the oxygen generator rating and CO2 scrubber rating, then multiply them together. What is the life support rating of the submarine? (Be sure to represent your answer in decimal, not binary.)

const fs = require("fs");
const text = fs.readFileSync("./input.txt").toString('utf-8');
const dataArray = text.split("\n");

// might need to be a single-linked list as that should achieve the same results, but with lower time complexity


class LinkedListNode {
  constructor(val) {
    this.value = val;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  addToHead(val) {
    const newNode = new LinkedListNode(val);

    newNode.next = this.head;
    this.head = newNode;
    this.length++;

    return this;
  }

  addToTail(val) {
    let newNode = new LinkedListNode(val);

    this.length++;
    if (!this.head) {
      this.head = newNode;
      return this;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;

    return this;
  }

  removeFromHead() {
    if (!this.head) return;

    const oldHead = this.head;
    this.head = oldHead.next;

    this.length--;

    return oldHead;
  }

  removeFromTail() {
    if (!this.head) return;

    let current = this.head;
    let previous;

    while (current.next) {
      previous = current;
      current = current.next;
    }
    if (!previous) this.head = null;
    else previous.next = null;

    this.length--;

    return current;
  }

  peekAtHead() {
    if (!this.head) return;
    return this.head.value;
  }

  print() {
    if (!this.head) return;

    let current = this.head;
    while (current) {
      console.log(current.value);
      current = current.next;
    }
  }

  count(digitPlace) {
    let count = 0;
    if (!this.head) return;

    let current = this.head;
    while (current) {
      console.log(current.value);
      console.log(current.value[digitPlace]);
      if (current.value[digitPlace] === "1"){
        count++;
      };
      current = current.next;
    }
    return count;
  }

  searchAndDestroy(digitPlace, digitValue) {
    if (!this.head) return;

    let current = this.head;
    let previous = null;

    console.log("Digit Place---->", digitPlace + 1, "Digit Value", digitValue)
    while (current !== null && +current.value[digitPlace] !== +digitValue ) {
      console.log(this.head)
      this.head = current.next;
      current = this.head;
      this.length--;
      console.log("^             ^")
      console.log("|             |")
      console.log("Head is excised")
      console.log("               ")
    }
    while (current != null) {
      console.log(current.value, "includes digit?", +current.value[digitPlace] === +digitValue);
      if(+current.value[digitPlace] !== +digitValue){
        console.log("previous next", previous.next);
        console.log("current next", current.next);
        if(current.next !== null){
          console.log("prev.next = current.next")
          previous.next = current.next;
          console.log("new previous.next", previous.next)
          current = previous;
        } else {
          console.log("prev.next = null")
          previous.next = null;
        }
        this.length--;
        console.log("LENGTH", this.length)
      }
      console.log("previous ||", previous)
      console.log("current ||", current)
      previous = current;
      console.log("current next ||", current.next)
      current = current.next;

      console.log("new previous || ", previous)
      console.log("----------------")
    }
  }

}


oxyAndCO2 = (lifeSupportData, type) => {
  let count = 0;
  let digit = 0;
  let airsupplyStatus = 0;

  // Make the new list
  lsDataList = new LinkedList();

  // Add data to list
  for (let i = 0; i < lifeSupportData.length; i++) {
    lsDataList.addToHead(lifeSupportData[i]);
    if (lifeSupportData[i][0] === "1") {
      count++;
    }
  }

  console.log("TYPE", type)
  if (type === "CO2"){
    if (count / lifeSupportData.length < 0.5) {
      digit = "1";
    } else if (count / lifeSupportData.length >= 0.5) {
      digit = "0";
    }
  } else {
    if (count / lifeSupportData.length >= 0.5) {
      digit = "1";
    } else if (count / lifeSupportData.length < 0.5) {
      digit = "0";
    }
  }
  console.log(count)
  console.log("digit", digit)
  lsDataList.searchAndDestroy(0, digit)
  lsDataList.print();

  console.log("TESTING COUNTING")
  for (let i = 1; i < lifeSupportData[0].length; i++){
    count = lsDataList.count(i);
    console.log("THE COUNT", count, "for digit", i + 1)

    // if (count / lsDataList.length >= 0.5) {
    //   digit = "1";
    // } else if (count / lsDataList.length < 0.5) {
    //   digit = "0";
    // }

    if (type === "CO2"){
      if (count / lsDataList.length < 0.5) {
        digit = "1";
      } else if (count / lsDataList.length >= 0.5) {
        digit = "0";
      }
    } else {
      if (count / lsDataList.length >= 0.5) {
        digit = "1";
      } else if (count / lsDataList.length < 0.5) {
        digit = "0";
      }
    }

    lsDataList.searchAndDestroy(i, digit)
    if (lsDataList.length === 1) {
      console.log("System Status", lsDataList.peekAtHead())
      airsupplyStatus = parseInt(lsDataList.peekAtHead(), 2);
      return airsupplyStatus;
    }
  }
  console.log("System Status", lsDataList.peekAtHead())
  airsupplyStatus = parseInt(lsDataList.peekAtHead(), 2);
  return airsupplyStatus;
}

airSupply = (dataFile) => {
  let oxy = oxyAndCO2(dataFile, "oxy");
  let co2 = oxyAndCO2(dataFile, "CO2");

  return oxy * co2;
}

testData = ["00100", "11110", "10110", "10111", "10101", "01111", "00111", "11100", "10000", "11001", "00010", "01010"]

console.log(airSupply(dataArray));
