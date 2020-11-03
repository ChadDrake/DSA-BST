const BST = require("./bst");
function nthLargest(tree, n, result = []) {
  if (tree === null) {
    return;
  }
  result.push(tree.key);
  if (tree.left) {
    nthLargest(tree.left, n, result);
  }
  if (tree.right) {
    return nthLargest(tree.right, n, result);
  }

  let finalResult = result.sort();
  return finalResult[finalResult.length - n];
}
function isTheSame(arr1, arr2) {
  if (arr1.length === 0) {
    return true;
  }
  if (arr1.length !== arr2.length || arr1[0] !== arr2[0]) {
    return false;
  }
  let first1 = arr1.shift();
  let first2 = arr2.shift();
  let right1 = [];
  let left1 = [];
  let right2 = [];
  let left2 = [];
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] > first1) {
      right1.push(arr1[i]);
    } else {
      left1.push(arr1[i]);
    }
    if (arr2[i] > first2) {
      right2.push(arr2[i]);
    } else {
      left2.push(arr2[i]);
    }
  }

  if (!isTheSame(right1, right2) || !isTheSame(left1, left2)) {
    return false;
  }
  return true;
}
function isBalanced(tree) {
  if (tree === null) {
    return true;
  }
  let left = checkHeight(tree.left, 0);
  let right = checkHeight(tree.right, 0);
  console.log(right);
  if (Math.abs(left - right) > 1) {
    return false;
  }
  return true;
}

function isBST(tree, lastLogged) {
  if (tree === null) {
    return true;
  }
  if (!isBST(tree.left, lastLogged)) {
    return false;
  }
  if (lastLogged !== null && tree.key < lastLogged) {
    return false;
  }

  lastLogged = tree.key;
  if (!isBST(tree.right, lastLogged)) {
    return false;
  }
  return true;
}

function checkHeight(tree, num) {
  if (tree === null) {
    return 0;
  }
  if (tree.right === null && tree.left === null) {
    return num + 1;
  }
  if (tree.right && tree.left) {
    return Math.max(
      checkHeight(tree.left, num + 1),
      checkHeight(tree.right, num + 1)
    );
  } else if (tree.right !== null) {
    return checkHeight(tree.right, num + 1);
  } else {
    return checkHeight(tree.left, num + 1);
  }
}

function main() {
  let test = new BST();
  test.insert(3, 3);
  test.insert(1, 1);
  test.insert(4, 4);
  test.insert(6, 6);
  test.insert(9, 9);
  test.insert(2, 2);
  test.insert(5, 5);
  test.insert(7, 7);
  let test1 = new BST();
  let test2 = new BST();
  test2.insert(3, 3);
  test2.insert(2, 2);
  test2.insert(4, 4);
  //console.log(test);
  //console.log(checkHeight(test.left, 0));
  // console.log(isBST(test, null));
  // test.right.right = {
  //   key: 1,
  //   left: test.right.right.left,
  //   right: test.right.right.right,
  // };
  // console.log(isBST(test, null));
  //console.log(nthLargest(test, 3));
  // console.log(isBalanced(test));
  // console.log(isBalanced(test1));
  // console.log(isBalanced(test2));
  console.log(isTheSame([3, 5, 4, 6, 1, 0, 2], [3, 1, 5, 2, 4, 6, 0]));
  console.log(isTheSame([3, 5, 9, 6, 1, 0, 2], [3, 1, 5, 2, 4, 6, 0]));
}
main();
