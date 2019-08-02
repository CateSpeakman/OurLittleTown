"use strict";

//Description: This script will calculate the cost of the room rental based on the following:
//              number of days, type of room,  number of people, discounts available, breakfast requested.
//              It will display the room cost, discount applied, tax, and total overall cost.
//Author: Cate Speakman



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

    let totalRoomCost = getRoomCost(numDays, checkinDate, roomType);
    let totalBreakfastCost = getBreakfastTotal(numDays, numAdults, numKids);
    let totalDiscount = getDiscount(totalRoomCost, discountType);
    
    let tax = (totalRoomCost + totalBreakfastCost - totalDiscount) * .12;

    let totalHotelCost = totalRoomCost + totalBreakfastCost - totalDiscount + tax;
    totalHotelCost = parseFloat(totalHotelCost.toFixed(2));

    document.getElementById("checkinDate").value=
    document.getElementById("checkoutDate")=checkoutDate;
    document.getElementById("roomTotal").value=totalRoomCost.toFixed(2);
    document.getElementById("taxTotal").value=tax.toFixed(2);
    document.getElementById("discountTotal").value=totalDiscount.toFixed(2);
    document.getElementById("totalStayCost").value=totalHotellCost.toFixed(2);
}







}

 l


 function init()
 {
         const totalCostBtn = document.getElementById("totalCostBtn")
         totalCostBtn.onclick = getTotalCost;
  }
     
 window.onload = init;