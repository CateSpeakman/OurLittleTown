"use strict";

//Description: This script will calculate the cost of the room rental based on the following:
//              number of days, type of room,  number of people, discounts available, breakfast requested.
//              It will display the room cost, discount applied, tax, and total overall cost.
//Author: Cate Speakman





/* this function determines the price per day based on the room type selected by the user
*@param choice (text) - this is the room type requested by user 
*/

function getRoomPrice(choice)
{

    let roomPrice = [
        {roomType:"queen", maxOcc:5, inSeasonRate:250, outSeasonRate:150},
        {roomType:"king", maxOcc:2, inSeasonRate:250, outSeasonRate:150},
        {roomType:"kingSuite", maxOcc:4, inSeasonRate:310, outSeasonRate:190},
        {roomType:"bedroomSuite", maxOcc:6, inSeasonRate:350, outSeasonRate:210}
        ];

    for (let i=0; i<roomPrice.length; i++) 
    {
    
        if (choice==roomPrice[i].roomType)
        { 
            let pricePerDay = roomPrice[i].outSeasonRate;
            return pricePerDay;
        }
    }
    return -1; /* if this occurs there is an error with the code*/
}

/* This function will determine the checkout date.
*@param checkinDate (date) - this is the date selected by user for check in
*@param numDays (number) - amount of days input by user
*/

function getCheckOut(checkinDate,numDays)
{
     
    const msecPerDay = 1000*60*60*24;

    let leaveDate= (checkinDate + (numDays*msecPerDay));

    let checkoutDate = new Date(leaveDate);

    return checkoutDate;
}

/* this function will calculate the room cost not including discounts or breakfast
*@param numDays(number) - this is the number of days for the stay input by the use 
*@param checkinDate (date) - this will be used in future to determine if the rate is in/out of season
*@param pricePerDay (number) - this is the cost per day based on room type already determined by 
                                the function getRoomPrice.
*/


function getRoomCost(numDays,checkinDate,pricePerDay)
{
    let roomCost;

    roomCost = pricePerDay * numDays;

    return roomCost;
}
/* this function will determine the type of discount input by user
* the discount type determined here will be used in getBreakfastTotala and getDiscountTotal
*/

function getDiscountType()
{
    let discountType;

    if (document.getElementById("none").checked)
    {
        discountType = "none";
    }
    else if (document.getElementById("aaa").checked)
    {
        discountType = "aaa";
    }
    else if (document.getElementById("senior").checked)
    {
        discountType = "senior";
    }
    else if (document.getElementById("military").checked)
    {
        discountType = "military";
    }

   return discountType;

}


/* this function will calculate the total discount if applicable based discount type and total room cost.
*@param roomCost (number)  - this is derived from function getRoomCost
*@param discountType (text)  - this is derive from function getDiscountType
*/

function getDiscount(roomCost,discountType)
{
    let discountTotal;

    if ((discountType =="aaa") || (discountType =="senior"))
    {
        discountTotal = roomCost *.10;
    }
    else if (discountType =="military")
    {
        discountTotal= roomCost *.20;
    }
    else if (discountType == "none")
    {
        discountTotal=0;
    }

    return discountTotal;
}



/* this function will determine the total breakfast cost per stay
*@param numDays (number) - the number of days on the stay
*@param numAdults (number)  - the number of adults input by user in dropdown
*@param numKids (number) - the number of kids input by user in dropdown
*@param discountType(text) - this is the type of discount input by user in radio buttons
*/

function getBreakfastTotal(numDays,numAdults,numKids,discountType)
{ 

    let totalBreakfastCost;
    let breakfastChoice =document.getElementById("breakfastIncluded".checked);
        
    if ((discountType == "senior") || (breakfastChoice == false))
    {
        totalBreakfastCost = 0;
    }
    else 
    {
        totalBreakfastCost = (6.95*numAdults*numDays) + (3.95*numKids*numDays);
    }
    
   return totalBreakfastCost;

}

/* this function will get the number of adults selected by the user.
* this returning variable numAdults will be used in other functions.
*/

function getNumAdults()
{
    const adultCount = document.getElementById("numAdult");
    let adult = adultCount.options[adultCount.selectedIndex].value;
    let numAdults = Number(adult); 

    if(numAdults > 4) {
            numAdults = 0;
            alert("Please enter valid selection");
    }

    return numAdults;

}

/* this function will get the number of kids selected by the user.
* this returning variable numKids will be used in other functions.
*/

function getNumKids()
{
    const kidCount = document.getElementById("numKids");
    let kid = kidCount.options[kidCount.selectedIndex].value;
    let numKids = Number(kid); 

    if(numKids > 4) {
        numKids = 0;
        alert("Please enter valid selection");
}
           
    }

    return numKids;
}

/*this function will determine if the room selected is beyond maximum occupancy and set an alert if it is.
* @param choice (text) - this is the room type requested by user 
* @param numAdults (number) - this was determined in the function getNumAdults based on user input.
* @param numKids (number) - this was determined in the function getNumKids based on user input.
*/

function canRoomHoldCustomer(choice, numAdults, numKids)
{

    let roomPrice=[
        {roomType:"queen", maxOcc:5, inSeasonRate:250, outSeasonRate:150},
        {roomType:"king", maxOcc:2, inSeasonRate:250, outSeasonRate:150},
        {roomType:"kingSuite", maxOcc:4, inSeasonRate:310, outSeasonRate:190},
        {roomType:"bedroomSuite", maxOcc:6, inSeasonRate:350, outSeasonRate:210}
    ];

     let totalOcc = 0;  
     totalOcc = numAdults + numKids;

    for (let i=0; i<roomPrice.length; i++) 
    {
    
        if ((choice==roomPrice[i].roomType) && (totalOcc > roomPrice[i].maxOcc))
        { 
            alert("Selection above Maximum Occupancy. Please make a valid selction.");
            return false;
        }
    }
    return true;
}


function getTotalCost()
{
/* this is to pull the room selection value from the dropdown.
* this will be used for obtaining the room price.
*/
    let roomType = document.getElementById("bedSize");
    let choice = roomType.options[roomType.selectedIndex].value;
    let pricePerDay = getRoomPrice(choice);

/* this is to pull the number of days stay from the input field.
* this will be used inn several other functions for calculations.
*/(0,4);
    let numDays = document.getElementById("numDays").value;
    numDays = Number(numDays);

/* this is to pull the checkin date from the user input.
* this is used to determine the checkout date which is returned witht the total price.
*/

    let checkinDate = document.getElementById("checkinDate").value;

    // change 2019-08-01 format to 08-01-2019
    checkinDate = checkinDate.substr(5,2) + "-" + checkinDate.substr(8,2) + "-" + checkinDate.substr(0,4);
    checkinDate = Date.parse(checkinDate);

    let checkoutDate = getCheckOut(checkinDate,numDays);

/* this is used to determine the amount of discount to apply and used in other functions.*/

    let discountType = getDiscountType();
/* these  get the number of adults and kids from the user input.  this will be needed for breakfast totals
* and occupancy function.
*/

    let numAdults = getNumAdults();

    let numKids = getNumKids();

/* this calls the room occupancy function and will set alert if needed*/
    let isGood = canRoomHoldCustomer(numAdults, numKids, choice);
    if (isGood == false)
    {
        return;
    }

/* gets room cost before breakfast charges*/
    let roomCost = getRoomCost(numDays,checkinDate,pricePerDay);
    roomCost = parseFloat(roomCost.toFixed(2));

/* this calls the function to get the brekfast totals*/
    let totalBreakfastCost = getBreakfastTotal(numDays,numAdults,numKids, discountType);
    totalBreakfastCost = parseFloat(totalBreakfastCost.toFixed(2));

/* this gets the overall room cost before discount*/
    let totalRoomCost = (roomCost + totalBreakfastCost);

/*this gets the total discount amount*/
    let totalDiscount = getDiscount(roomCost, discountType);
    totalDiscount = parseFloat(totalDiscount.toFixed(2));

/*this calculates the total tax amount*/   
    let tax = (totalRoomCost - totalDiscount) * .12;
    tax = parseFloat(tax.toFixed(2));

/*this calculates the overall cost*/
    let totalHotelCost = (totalRoomCost + tax - totalDiscount);
    totalHotelCost = parseFloat(totalHotelCost.toFixed(2));


/*  these are the values I am returning back to the web page for display*/

    checkinDate = new Date(checkinDate);
    document.getElementById("returnedCheckinDate").value=checkinDate;
    document.getElementById("checkoutDate").value=checkoutDate;
    document.getElementById("roomTotal").value=totalRoomCost.toFixed(2);
    document.getElementById("taxTotal").value=tax.toFixed(2);
    document.getElementById("discountTotal").value=totalDiscount.toFixed(2);
    document.getElementById("totalStayCost").value=totalHotelCost.toFixed(2);
}




 function init()
 {
         const totalCostBtn = document.getElementById("totalCostBtn");
         totalCostBtn.onclick = getTotalCost;
  }
     
 window.onload = init;