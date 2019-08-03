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

    let roomPrice=[
        {roomType:"queen", maxOcc:5, inSeasonRate:250, outSeasonRate:150},
        {roomType:"king", maxOcc:2, inSeasonRate:250, outSeasonRate:150},
        {roomType:"kingSuite", maxOcc:4, inSeasonRate:310, outSeasonRate:190},
        {roomType:"bedroomSuite", maxOcc:6, inSeasonRate:350, outSeasonRate:210}
    ],

    for (let i=0; i<roomPrice.length; i++) 
    {
    
        if (choice==roomPrice[i].roomType)
        { 
            let pricePerDay=roomPrice[i].outSeasonRate
            return pricePerDay
        }
    }

}

/* This function will determine the checkout date.
*@param numDays (number) - amount of days input by user
*@param checkinDate (date) - this is the date selected by user for check in
*@param checkoutDate (date) - this is the date the user will be checking out based on numDays and checkinDate
*/

function getCheckOut(numDays, checkinDate)
{
     
    const msecPerDay = 1000*60*60*24;

    let leaveDate= (checkinDate + (numDays*msecPerDay));

    let checkoutDate = new Date(leaveDate);

    return checkoutDate;
}

/* this function will calculate the total room cost not including discounts
*@param pricePerDay (number) - this is the cost per day based on room type already determined by 
                                the function getRoomPrice.
@param checkinDate (date) - this will be used in future to determine if the rate is in/out of season
@param numDays(number) - this is the number of days for the stay input by the use 
*/


function getRoomCost(pricePerDay, numDays, checkinDate)
{
    let totalRoomCost;

    totalRoomCost = pricePerDay * numDays;

    return totalRoomCost;
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
    else if (document.getElementById("military".checked))
    {
        discountType = "military";
    }

   return discountType

}

/* this function will determine the total breakfast cost per stay
*@param numAdults (number)  - the number of adults input by user in dropdown
*@param numKids (number) - the number of kids input by user in dropdown
*@param numDays (number) - the number of days on the stay
*/

function getBreakfastTotal(numAdults, numKids, numDays, discountType)
{ 

    let totalBreakfastCost;
        
    if (discountType == "senior") || (document.getElementById("breakfastIncluded").checked = false)
    {
        totalBreakfastCost = 0;
    }
    else totalBreakfastCost = (6.95*numAdults*numDays) + (3.95*numKids*numDays)
    
   return totalBreakfastCost;

}








function getTotalCost()
{
    let roomType = document.getElementById("bedSize")
    let choice = roomType.options[roomType.selectedIndex].value;
    let pricePerDay = getRoomPrice(choice);

    let numDays = document.getElementById("numDays").value;
    numDays = Number(numDays);

    let checkinDate = document.getElementById("checkinDate").value
    checkinDate = Date.parse(checkinDate);

    let checkoutDate = getCheckOut(checkinDate, numDays);


    let discountType = getDiscountType();



    let totalRoomCost = getRoomCost(numDays, checkinDate, pricePerDay);
    totalRoomCost = parseFloat(totalRoomCost.toFixed(2));

    let totalBreakfastCost = getBreakfastTotal(numDays, numAdults, numKids);
    totalBreakfastCost = parseFloat(totalBreakfastCost.toFixed(2));

    let totalDiscount = getDiscount(totalRoomCost, discountType);
    totalDiscount = parseFloat(totalDiscount.toFixed(2));
    
    let tax = (totalRoomCost + totalBreakfastCost - totalDiscount) * .12;
    tax = parseFloat(tax.toFixed(2));

    let totalHotelCost = getTotalHotelCost(totalRoomCost, totalBreakfastCost, totalDiscount, tax);
    totalHotelCost = parseFloat(totalHotelCost.toFixed(2));
/*  these are the values I am returning back to the web page for display*/

    document.getElementById("checkinDate").value=
    document.getElementById("checkoutDate").value=checkoutDate;
    document.getElementById("roomTotal").value=totalRoomCost.toFixed(2);
    document.getElementById("taxTotal").value=tax.toFixed(2);
    document.getElementById("discountTotal").value=totalDiscount.toFixed(2);
    document.getElementById("totalStayCost").value=totalHotellCost.toFixed(2);
}




 function init()
 {
         const totalCostBtn = document.getElementById("totalCostBtn")
         totalCostBtn.onclick = getTotalCost;
  }
     
 window.onload = init;