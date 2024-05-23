import {formatCurrency} from '../scripts/utils/money.js';

if (formatCurrency(2095) === '20.95'){
    console.log("String Passed")
} else {
    console.log("String Failed")
}

if (formatCurrency(1000.4) === '10.00'){
    console.log("String Passed")
} else {
    console.log("String Failed")
}

if (formatCurrency(0) === '0.00'){
    console.log("String Passed")
} else {
    console.log("String Failed")
}



formatCurrency()