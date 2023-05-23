/*    Course name: Web Application Development
      Course code:COMP229-008
      Assignment: 1
      Student ID: 301246562
      Student Name: Sing Cheung Tin
      Date:   May 20, 2023
      Filename: assignment1.js
*/

//get the phone number from the input field
let phoneNumber = document.getElementById("phone");

//verify phone number format
phoneNumber.addEventListener("input", function(e) {
    let phoneNo = e.target.value;
    // var pattern=/^\(\d{3}) \d{3}-\d{4}$/;
    let pattern = /^\d{10}$|^(\(\d{3}\)\s*)?\d{3}[\s-]?\d{4}$/;

    // if (!pattern.check(phoneNo)) {
    if (pattern.test(phoneNo)) {
        phoneNumber.setCustomValidity('');
    } else {
        phoneNumber.setCustomValidity("Invalid phone number format.");
    }
});