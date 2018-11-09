console.log('hi ');
//**** job role section, show and hide text area ****//
let Valid = false; //global valid var to apply to validation
let textArea = $('#other-title').hide();

$('#title').change( function(e){ //idea from stackoverflow from user Gabe; https://stackoverflow.com/questions/9525282/how-to-show-hide-textarea-based-on-select-in-jquery/9525358
  let select = $(this).val();
  //let jobRole = $('#title').val();
  if (select === 'other' ){//&& jobRole === ''
    textArea.show();//only supposed to show when 'other' option is selected.
    console.log(this);
  }
  else{
    textArea.hide();
  }
});

// **** ”T-Shirt Info” section ****//
function hideOption(number) {
 $('#colors-js-puns select option').eq(number).hide();
}//using long jQuery selector for precision

function showOption(number) {
 $('#colors-js-puns select option').eq(number).show();
} //.eq() is to select integers

$('#colors-js-puns').hide();//cannot show until theme is selected
$('#design').on('change', function(){
  let select = $(this).val();
  if (select === "js puns"){
    showOption(0);
    showOption(1);
    showOption(2);
    hideOption(3);
    hideOption(4);
    hideOption(5);//
    $('#colors-js-puns').show();
  }
  if (select === "heart js") {
    showOption(3);
    showOption(4);
    showOption(5);//add them back in
    hideOption(0);
    hideOption(1);
    hideOption(2);
    $('#colors-js-puns').show();
  }
  if(select === 'Select Theme'){
    showOption(0);
    showOption(1);
    showOption(2);
    showOption(3);
    showOption(4);
    showOption(5);
    $('#colors-js-puns').hide();
  }
}); //hideOption, showOption function ideas from Omar Faruque through slack while he was helping someone else.

//**** ”Register for Activities” section ****//
const checkbox = $(`input[type=checkbox]`);
let shoppingCart = `<br><span id="shoppingCart"></span>`;
$(shoppingCart).hide();
$('.activities').append(shoppingCart);

checkbox.change(function(e) {//whenever a checkbox is clicked.. do this
  //DRY code coming soon
  let cart = 0;
  console.log(e.target);
  let conflict = checkbox.eq(e);

    if(checkbox.eq(0).is(':checked')){//all
      (cart += 200);
    }
    if(checkbox.eq(1).is(':checked')){//JavaScript Frameworks Workshop CONFLICT
      conflict = checkbox.eq(3);
      $(conflict).prop('disabled', true);
      cart += 100;
    }
    else{ //to remove diabled conflict and price auto changes.
      conflict = checkbox.eq(3);
      $(conflict).prop('disabled', false);
    }
    if(checkbox.eq(3).is(':checked')) {//Express Workshop CONFLICT
      conflict = checkbox.eq(1);
      $(conflict).prop('disabled', true);
      (cart += 100);
    }
    else{
      conflict = checkbox.eq(1);
      $(conflict).prop('disabled', false);
    }
    if(checkbox.eq(2).is(':checked')){//JavaScript Libraries Workshop CONFLICT
      conflict = checkbox.eq(4);
      $(conflict).prop('disabled', true);
      (cart += 100);
    }
    else{
      conflict = checkbox.eq(4);
      $(conflict).prop('disabled', false);
    }
    if(checkbox.eq(4).is(':checked')) {//Node.js Workshop CONFLICT
      conflict = checkbox.eq(2);
      $(conflict).prop('disabled', true);
      (cart += 100);
    }
    else{
      conflict = checkbox.eq(2);
      $(conflict).prop('disabled', false);
    }
    if(checkbox.eq(5).is(':checked')){//Build tools Workshop
      (cart += 100);
    }
    if(checkbox.eq(6).is(':checked')){//Npm workshop
      (cart += 100);
    }
    console.log('Shopping cart:' + cart);

    const checked = checkbox.eq(e).is(':checked');
    $('#shoppingCart').hide();
      if(checked === false && cart > 0){
        $('.activities span').hide();
        document.getElementById('shoppingCart').innerHTML = "Shopping Cart: $" + cart;
        $('#shoppingCart').show();
      }
});


//**** Payment Info w/ form validation ****//
let expMonth = $('#exp-month');
let expYear = $('#exp-Year');
let paymentChange = $('#mySelect');
$('#paypal').hide();
$('#bitcoin').hide();
$(paymentChange).on('change', function(e){//if payment changes
  console.log(e.target);
  //let select = $('#mySelect').childNodes.length;
  let select = $("#mySelect option:selected").text();//getting value of selected text option
  console.log(select);

  if(select === 'Select Payment Method'){
    //user should not be able to submit the form without a chosen payment option.
    $('#paypal').hide();
    $('#bitcoin').hide();
  }
  if(select === 'Credit Card' ){//if i select credit card option then i want credit card div to show only
    $('#credit-card').show();
    $('#paypal').hide();
    $('#bitcoin').hide();
  }
  else if(select !== 'Credit Card'){
    $('#credit-card').hide();
  }
  if(select === 'PayPal'){
    $('#paypal').show();
    $('#bitcoin').hide();
  }
  if(select === 'Bitcoin'){
    $('#bitcoin').show();
    $('#paypal').hide();
  }
});

// **** Validating form ****//

function isValidName(username){
  return/^\s*(\S+)\s+(?:\S+\s+)?(\S+)\s*$/.test(username); //stackoverflow Josh Miller <cite>
};

  function isValidCC(number){
  return /^\d{13,16}$/.test(number);
};

function isValidZip(number){
  return /(^\d{5}$)/.test(number);
};

function isValidCVC(number){
  return /^\d{3}$/.test(number);
};

function isValidEmail(email) {
  return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}

function showOrHideTip(show, element) {
  // show element when show is true, hide when false
  if(show) {
    element.style.display = "inherit";
  } else {
    element.style.display = "none";
  }
};

function createListener(validator) {
  return e => {
    const text = e.target.value;
    const valid = validator(text);
    const showTip = text !== "" && !valid;
    const tooltip = e.target.nextElementSibling;
    showOrHideTip(showTip, tooltip);
  }
};

function nameListener(validator) {
  return e => {
    let text = e.target.value;
    const valid = validator(text);
    let showTip = text = "" | !valid;
    const tooltip = e.target.nextElementSibling;
    showOrHideTip(showTip, tooltip);

    $(document).ready(function() {
      let A = $('#named').val();

      $('form').on('submit', function(e){
        if(!valid) {
          e.preventDefault();
        }
      });
    });
  }
};

/**** EVENT LISTENERS ****/
function validate(){//if error show span if no error keep it hidden
  $('span').hide();
  $('#named').on("focusout input", nameListener(isValidName));//special
  $('#emailp').on('change',createListener(isValidEmail));
  $('#cc-num').on('input',createListener(isValidCC));
  $('#zip').on('input',createListener(isValidZip));
  $('#cvv').on('input',createListener(isValidCVC));
  $('.activities span').show();
}
validate();

//****ALERTS TO PREVENT SUBMISSION****//

$("form").on('submit', function(e){

  let name = $('#named').val();
  let email = $('#emailp').val();
  //let jobRole = $('#title').val();//job role
  let select = $("#title option:selected").text();
  let other = $('#other-title').val();
  //let D = $('#design').val();//cannot be select Theme
  let design = $("#design option:selected").text();
  let paySelect = $("#mySelect option:selected").text();
  //cannot be select payment Method
  //if (option.eq(1)){ must fill div $('#credit-card');}
  //else{you're good}

    if(name === ''){
      e.preventDefault();
      alert("Name must be filled out");
      return false;
    }

//email cant be blank or invalid
    if(email === ''){
      //$('#emailp').attr({placeholder: "Enter valid email"});
      e.preventDefault();
      alert("Please enter valid email");
      return false;
    }
    //if email span is :visible then $('#emailp').attr({placeholder="Enter valid email"});
    if($("#emailp span").is(":visible")){
      $('#emailp').attr({placeholder: "Enter valid email"});
    }
    if(select == 'Other' && other === ''){//check if job role = Other is selected and if job role description is blank, then run error
      console.log(e.target);
      e.preventDefault();
      alert("Please describe job role");
      return false;
    }
    if(design === 'Select Theme'){
      e.preventDefault();
      alert('Select shirt design');
      return false;
    }

    let n = $( "input:checked" ).length;
    console.log(n);
    console.log(this);
    if (n<1) {
      e.preventDefault();
      alert('Select at least one activity');
      return true;
    }
    
//PAYMENTS
// make sure the user has supplied a Credit Card number, a Zip Code, and a 3 number CVV value before the form can be submitted.
// Credit Card field should only accept a number between 13 and 16 digits.
// The Zip Code field should accept a 5-digit number.
// The CVV should only accept a number that is exactly 3 digits long.
    if(paySelect === 'Select Payment Method'){
      e.preventDefault();
      alert('Please select payment method');
    }
    if(paySelect === 'Credit Card'){//if credit card option is selected
      // run error if cc number, zip, or cvv is blank or invalid
      let cardNumber = $('#cc-num').val();//card number
      let zip = $('#zip').val();
      let cvv = $('#cvv').val();

      if( cardNumber === ''){
        e.preventDefault();
        alert('Must enter card info');
      }
      if( zip === '' || cvv === ''){
        e.preventDefault();
        alert('Must enter card info');
      }

      if($('#cc-num').attr({'maxlength':16, 'minlength':13})){
        let Valid = true
        return Valid;
      }
      if($('#zip').attr({'minlength':5, 'maxlength':5})){
        let Valid = true
        return Valid;
      }
      if($('#cvv').attr({'minlength':3, 'maxlength':3})){
        let Valid = true
        return Valid;
      }

    }//end cc selection
});
