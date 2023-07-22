const inputSlider = document.querySelector("[data-lengthSlider]");
const lenghtDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbol");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateBtn");
const allCheckBox = document.querySelectorAll("input[type=checkbox] ");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
// set strength circle to gray

// set passworf length
function handleSlider() {
  inputSlider.value = passwordLength;
  lenghtDisplay.innerText = passwordLength;
}

function setIndicator(color) {
  // indicator.getElementsByClassName.backgroundColor =color;
  indicator.style.backgroundColor = color;
  //shadow 
  indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}
function handleCheckBoxChange() {
  checkCount = 0;
  allCheckBox.forEach((checkbox) => {
    if (checkbox.checked) {
      checkCount++;
    }
  });
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }
}

allCheckBox.forEach((checkbox) => {
  checkbox.addEventListener("change", handleCheckBoxChange);
});
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function generateRandomNumber() {
  return getRandomInteger(0, 9);
}
function generateLowercase() {
  return String.fromCharCode(getRandomInteger(97, 123));
}
function generateuppercase() {
  return String.fromCharCode(getRandomInteger(65, 91));
}
function generateSymbol() {
  const randNum = getRandomInteger(0, symbols.length);
  return symbols.charAt(randNum);
}

function calcStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNum = false;
  let hasSym = false;
  if (uppercaseCheck.checked) hasUpper = true;
  if (lowercaseCheck.checked) hasLower = true;
  if (numbersCheck.checked) hasNum = true;
  if (symbolsCheck.checked) hasSym = true;

  if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
    setIndicator("#0f0");
  } else if (
    (hasLower || hasUpper) &&
    (hasNum || hasSym) &&
    passwordLength >= 6
  ) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
}

async function copyContent() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "copied";
  } catch (e) {
    copyMsg.innerText = "failed";
  }
  // to make copoy wala span visible
  copyMsg.classList.add("active");
  setTimeout(() => {
    copyMsg.classList.add("active");
  }, 2000);
}

//suffle function
function shufflePassword(array) {
  //fisher yates method
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  let str = "";
  array.forEach((el) => (str += el));
  return str;
}

// slider function
inputSlider.addEventListener("input", (e) => {
  passwordLength = e.target.value;
  handleSlider();
});

copyBtn.addEventListener("click", () => {
  if (passwordDisplay.value) {
    copyContent();
  }
});
generateBtn.addEventListener("click", () => {
  //none of the chck bic are selectred
  if (checkCount <= 0) 
    return;
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }

  //let start the journey to find new password
   console.log("Starting the journey");
  //remove old passsword
  password = "";
  console.log("jfdk");
  // if(password.length) password="";

  //let put the stuff menstioned by chekboxes

  // if(uppercaseCheck.checked)
  // {
  //   password+=generateuppercase();
  // }
  // if(lowercaseCheck.checked)
  // {
  //   password+=generateLowercase();
  // }
  // if(numbersCheck.checked)
  // {
  //   password+=generateRandomNumber();
  // }
  // if(symbolsCheck.checked)
  // {
  //   password+=generateSymbol();
  // }
  // let funcArr = [];
  // if (uppercaseCheck.checked) {
  //   funcArr.push(generateuppercase);
  // }
  // if (lowercaseCheck.checked) {
  //   funcArr.push(generateLowercase);
  // }
  // if (numbersCheck.checked) {
  //   funcArr.push(generateRandomNumber);
  // }
  // if (symbolsCheck.checked) {
  //   funcArr.push(generateSymbol);
  // }

  let funcArr = [];
  if (uppercaseCheck.checked) funcArr.push(generateuppercase);
  if (lowercaseCheck.checked) funcArr.push(generateLowercase);
  if (numbersCheck.checked) funcArr.push(generateRandomNumber);
  if (symbolsCheck.checked) funcArr.push(generateSymbol);

  console.log("tushar");
  //compulsary addition
  for (let i = 0; i < funcArr.length; i++) {
    password += funcArr[i]();
  }

  console.log("compulsary aedfvn journey");


  //remainoing addition
  for (let i = 0; i < passwordLength - funcArr.length; i++) {
    let ranIndex = getRandomInteger(0, funcArr.length);
    password += funcArr[ranIndex]();
  }
  console.log("remaining additoin journey");

  //shuffle the password
  password = shufflePassword(Array.from(password));
  console.log("shuffling done ourney");

  // show in url
  passwordDisplay.value = password;
  console.log("ui addition done");
  

  //calculate strength
  calcStrength();
  console.log("xcalculate strength");
});