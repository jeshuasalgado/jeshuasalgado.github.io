// Assignment Code
var generateBtn = document.querySelector("#generate");
var passwordBtn = document.querySelector("#password");
var securepass = document.querySelector("Your Secure Password");


//generated elements for the ransdom password
// password to the #password input also let a const for the random
function writePassword(){
    var length = 8,
        charset = "?><~`abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$^%&*()_+",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    return retVal;
}
//event listener to generate button
// getting main button to generate password
generateBtn.addEventListener("click", function() {
  writePassword();
});
 //generateBtn.addEventListener('click', () => {