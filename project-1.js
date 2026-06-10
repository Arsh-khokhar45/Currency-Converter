const MAIN_URL = "https://latest.currency-api.pages.dev/v1/currencies";
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let dropdownList = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".Eclick");
let currMsg = document.querySelector(".msg");


for (let allCountry of dropdownList) {
    for (let code in countryList) {
        let newOpt = document.createElement("option");
        newOpt.innerText = code;
        newOpt.value = code;
        if (allCountry.name === "from" && code === "USD") {
            newOpt.allCountry = "selected";
        } else if (allCountry.name === "to" && code === "INR") {
            newOpt.allCountry = "selected";
        }
        allCountry.append(newOpt);
    }

    allCountry.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });

}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let userAmount = amount.value;
    if (userAmount === "" || userAmount <= 0) {
        userAmount = "";
        amount.value = "";
    }

    let URL = `${MAIN_URL}/${fromCurr.value.toLowerCase()}.json`;
    let res = await fetch(URL);
    let data = await res.json();
    let userEnter = fromCurr.value.toLowerCase();
    let rate = data[userEnter];
    let userToEnter = toCurr.value.toLowerCase();
    let finalRate = rate[userToEnter];
    let finalAmount = userAmount * finalRate;

    currMsg.innerText = `${userAmount} ${fromCurr.value} = ${finalAmount} ${toCurr.value} `;
    currMsg.classList.add("newMsg");
});