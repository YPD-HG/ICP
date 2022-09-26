import { dbank } from "../../declarations/dbank";

window.addEventListener("load", async function(){ 
  //We placed async here because we
  // because we are calling checkBalance func and if we see the func defination of 
  //checkBalance, we will find out that the currentValue is returned asynchrously
  //i.e we are not actually waiting for the result to comeback, and instead we recievce a 
  //promise object which is returned at any point which depends on how long it takes
  //to query the blockchain.
  //hence, we also place async in before the call-back function in the current function i.e
  //to adapt.
  // console.log("Finishing loading");
 update();
});

document.querySelector("form").addEventListener("submit", async function(event) {
  //you can wee that after enetering number and submitting, you see submitted really fast
  // this is because form has a default action of form clear ans submit value
  // hence we add prevent default
  event.preventDefault();
  // console.log("submitted!"); 
  const button = event.target.querySelector("#submit-btn");
  
  const inputAmount = parseFloat(document.getElementById("input-amount").value);
  const outputAmount = parseFloat(document.getElementById("withdrawl-amount").value);

  button.setAttribute("disabled", true);
  if(document.getElementById("input-amount").value.length != 0){
    await dbank.topUp(inputAmount);
  }
  if(document.getElementById("withdrawl-amount").value.length != 0){
    await dbank.withDraw(outputAmount);
  }

  await dbank.compound();

  update();
  document.getElementById("input-amount").value="";
  document.getElementById("withdrawl-amount").value="";
  button.removeAttribute("disabled");
  //The line 24, 29 and 38 are used so that when the user click the submit button, the button can get
  //disabled till the result is fetched, as we know that it takes time to get result through update method
  //hence we disable the button so that user doesn't apply say multiple topUp opersation
});

async function update(){
  const currentAmount = await dbank.checkBalance();
  // we are placing await keyword, so that we can wait for result to comeback and that asynchronously
  //update are element with the currentAmount once it does return
  document.getElementById("value").innerText = Math.round(currentAmount * 100) / 100;

}