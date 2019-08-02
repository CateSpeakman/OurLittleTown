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

function getTotalCost()
{
    let roomType = document.getElementById("bedSize")
    let choice = roomType.options[roomType.selectedIndex].value;
    let pricePerDay = getRoomPrice(choice);

foloow bottom of car rental code






}

 l


 function init()
 {
         const totalCostBtn = document.getElementById("totalCostBtn")
         totalCostBtn.onclick = getTotalCost;
  }
     
 window.onload = init;