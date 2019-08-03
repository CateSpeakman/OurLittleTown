"use strict";

//Description: This script will calculate the cost of the car rental, options requested and under age 25 surcharge
//              along with the overall total cost of the rental.
//Author: Cate Speakman




/*this function will calculate the cost of the car rental days*/ 

function getVehicleCost()
{

    const vehicles = document.getElementById("vehicles");
    let vehType = vehicles.options[vehicles.selectedIndex].text;
    let vehicleCost =0; 

    switch(vehType)
    {
        case "Economy":
            vehicleCost = 29.99;
            break;

        case "Compact":
            vehicleCost = 39.99;
            break;

        case "Intermediate":
            vehicleCost = 49.99;
            break;

        case "Full Size":
            vehicleCost = 59.99;
            break;

        default:
            vehicleCost = 0;
            alert("Please select vehicle");
    }

    return vehicleCost;

}


/*this finction will get the cost of the car rental itself without options or surcharges
* @param numRentalDays(number) - this is the number of days input by the user
* @param vehicleCost(number) - this is the cost of the vehicle based on type derived from 
*  getVehicleCost function.
*/

function getCarPrice(numRentalDays, vehicleCost)
{
  
    let carPrice = numRentalDays * vehicleCost;

    return carPrice;
}

/* this function will calculate the cost of the rental options 
* @param numRentalDays(number) - this is number of days input by the user
*/

function getOptionsTotal(numRentalDays)
{

    let optionsTotal =0;
    let tolltagTotal =0;
    let gpsTotal = 0;
    let roadsideTotal =0;
    
    let tollTag = document.getElementById("tollTag").checked;
    if (tollTag)
    {
        tolltagTotal = numRentalDays * 3.95;
    }

    let gps = document.getElementById("gps").checked;
    if(gps)
    {
         gpsTotal = numRentalDays * 2.95;
    }

    let roadside = document.getElementById("roadsideAssist").checked;
    if(roadside)
    {
        roadsideTotal = numRentalDays * 2.95;
    }

    optionsTotal = tolltagTotal + gpsTotal + roadsideTotal

    return optionsTotal;

    }
/* this function will calculate the surcharge if a driver is under age 25
* @param totalCar(number)  - this is derived from the function getCarPrice
*/
    function getSurcharge(totalCar)
    {
        let surcharge = 0;
        if (document.getElementById("age25").checked)
        {
            surcharge = totalCar * 1.3
        }

        return surcharge;
    }


/* This function will determine the rental return date.
*@param pickupDate (date) - this is the date selected by user for vehicle pick up
*@param numRentalDays (number) - the amount of days input by user for rental
*/

function getRentalReturnDate(pickupDate,numRentalDays)
{
     
    const msecPerDay = 1000*60*60*24;

    let returnDate= (pickupDate + (numRentalDays*msecPerDay));

    returnDate = new Date(returnDate);

    return returnDate;
}



/* this function will get the total cost of the rental including car cost
* surcharges, and options chosen and will display on screen once user has selected to
* get the price.
*/


function getTotalCost()
{

    let numRentalDays = document.getElementById("numRentalDays").value;
    numRentalDays = Number(numRentalDays);

 /* this is to pull the pickup date from the user input.
* this is used to determine the rental return date which is returned with the total price.
*/

let pickupDate = document.getElementById("pickupDate").value;

// change 2019-08-01 format to 08-01-2019
    pickupDate = pickupDate.substr(5,2) + "-" + pickupDate.substr(8,2) + "-" + pickupDate.substr(0,4);
    pickupDate = Date.parse(pickupDate);

    let returnDate = getRentalReturnDate(pickupDate,numRentalDays);

    let vehicleCost = getVehicleCost();
    let carPrice = getCarPrice(numRentalDays, vehicleCost);
    let totalOptions = getOptionsTotal(numRentalDays);
    let totalSurcharge = getSurcharge(carPrice);

    let totalRentalCost = totalOptions + carPrice + totalSurcharge;
    totalRentalCost = parseFloat(totalRentalCost.toFixed(2));

    pickupDate = new Date(pickupDate);
    document.getElementById("pickuppedDate").value=pickupDate;
    document.getElementById("returnDate").value=returnDate;

    document.getElementById("carTotal").value=carPrice.toFixed(2);
    document.getElementById("optionTotal").value=totalOptions.toFixed(2);
    document.getElementById("surchargeTotal").value=totalSurcharge.toFixed(2);
    document.getElementById("totalRentalCost").value=totalRentalCost.toFixed(2);
}

function init()
{
        const totalCostBtn = document.getElementById("totalCostBtn")
        totalCostBtn.onclick = getTotalCost;
 }
    
window.onload = init;
