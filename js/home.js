document.addEventListener('DOMContentLoaded', function () {

    calculateProfit();

    const validation = new window.JustValidate('#calculator-form', {
        errorFieldCssClass: 'field-error',
        successFieldCssClass: 'field-success',
        focusInvalidField: false,
        validateBeforeSubmitting: true,
    });

    validation
    .addField('#players-number', [
        {
            rule: 'required',
            errorMessage: 'Enter players number',
        },
        {
            rule: 'number',
        },
        {
            rule: 'minNumber',
            value: 1,
          },
          {
            rule: 'maxNumber',
            value: 100000,
          },
    ])
    .addRequiredGroup('#players-region_radio_group')
    .addRequiredGroup('#partner-package_radio_group')
    .onValidate((event) => {
        if (event.fields['#players-number'].touched && document.querySelector('#players-number').getAttribute('placeholder') != 0) {
            document.querySelector('#players-number').setAttribute('placeholder', 0);
        }
        if (event.fields['#players-number'].isValid || document.querySelector('#players-number').value == '') {
            calculateProfit();
        }
    
        // console.log(event.isValid)
        // console.log(event.isSubmitted)
        // console.log(event.fields)
        // console.log(event.groups)

    })
    // .onFail((fields) => {

    // })
    // .onSuccess((event) => {
   
    // })
   
    function calculateProfit () {
        let dailyProfit, 
            monthlyProfit, 
            players = document.querySelector('#players-number').value || document.querySelector('#players-number').getAttribute('placeholder'),
            region = document.querySelector('input[name="players-region"]:checked').value,
            package = document.querySelector('input[name="partner-package"]:checked').value;

        dailyProfit = Math.floor(players * region * (package / 100));
        monthlyProfit = Math.floor(dailyProfit * 30);

        document.querySelector('.calculator-daily-profit').textContent = `$${dailyProfit.toLocaleString("en-US")}`;
        document.querySelector('.calculator-monthly-profit').textContent = `$${monthlyProfit.toLocaleString("en-US")}`;
    }


});