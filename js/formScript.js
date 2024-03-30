let formHasError = true;

const validateForm = formSelector => {
    const formElement = document.querySelector(formSelector);

    const validationOptions = [

        {//validate that is has some value
            attribute: 'required',
            isValid: input => input.value.trim() !== '',
            errorMessage: (input, label) => `${label.textContent} is required`
        },
        {//validate minlength off characters
            attribute: 'minlength',
            isValid: input => 
            input.value && input.value.length >= parseInt(input.minLength, 10),
            errorMessage: (input, label) => `${label.textContent} needs to be atleast ${input.minLength} characters `
        },
        {//validate maxlength off characters
            attribute: 'custommaxlength',
            isValid: input => 
            input.value && input.value.length <= parseInt(input.getAttribute("custommaxlength"), 10),
            errorMessage: (input, label) => `${label.textContent} cannot be more than ${input.getAttribute("custommaxlength")} characters `
        },
        
        {//validate pattern of RegEx
            attribute: 'pattern',
            isValid: input => {
                const patternRegex = new RegExp(input.pattern);
                return patternRegex.test(input.value);
            },
            errorMessage: (input, label) => `Not a valid ${label.textContent.toLowerCase()}`
        },
        {//validate minlength off phone number
            attribute: 'minlengthPhone',
            isValid: input => 
            input.value && input.value.length >= parseInt(input.getAttribute("minlengthPhone"), 10),
            errorMessage: (input, label) => `${label.textContent} needs to be atleast ${input.getAttribute("minlengthPhone")} numbers `
        }
        

    ];

    const validateSingleFormGroup = formGroup => {
        const label = formGroup.querySelector('label');
        const input = formGroup.querySelector('input');
        const errorContainer = formGroup.querySelector('.error');

        let formGroupError = false; 
        for (const option of validationOptions) {
            if (input.hasAttribute(option.attribute) && !option.isValid(input)) {
                errorContainer.textContent = option.errorMessage(input, label);
                // input.classList.add(style="Color: red");
                // input.style.color = "red";
                formGroupError = true;
                formHasError = true;
                // console.log("formHasError set to true (Should happen everytime when has error, even when clicking submit)")
            }
        }

        if(!formGroupError) {
            errorContainer.textContent =""; 
            // formHasError = false
        }


    };

    if (formElement) {
        formElement.setAttribute('novalidate', '');

    // Array.from(formElement.elements).forEach(element => {
    //     element.addEventListener('blur', event =>{
    //         validateSingleFormGroup(event.srcElement.parentElement.parentElement);
            


    //     })



    // })

    Array.from(formElement.querySelectorAll('input')).forEach(input => {
        input.addEventListener('blur', event => {
            validateSingleFormGroup(event.target.parentElement);
        });
    });


    formElement.addEventListener('submit', (event) => {
        event.preventDefault();
        validateAllFormGroups(formElement);
        
        // console.log("Form error = " + formHasError)
        let selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
        // console.log("ID: " + selectedProduct.id)
    
        if(!formHasError) {
            window.open('confirmorder.html', '_self');
        }
    });

    const validateAllFormGroups = formToValidate => {
        // console.log("Run validateForm");
        // const formGroups = Array.from(formToValidate.querySelectorAll('.formGroup'));
        // formGroups.forEach(formGroup => {
            // validateSingleFormGroup(formGroup);
        // });

        formHasError = false; // Reset to having no errors before we start re-validate on every field
        Array.from(formToValidate.querySelectorAll('.formGroup')).forEach(field => {
                validateSingleFormGroup(field);
        });
    };
};
 //END OF VALIDATEFORM FUNCTION
}

validateForm('#cartForm');
/*
function sendtoConfirm(){
    // validateForm('#cartForm')
    console.log("Form error = " + formHasError)
    let selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
    console.log("ID: " + selectedProduct.id)
    
    if(!formHasError) {
        // window.open('confirmorder.html', '_self');
    }

}
*/


// function saveFormData(){
//     let formData = {

//         name: document.getElementById('name').value,
//         email: document.getElementById('email').value,
//         phone: document.getElementById('phone').value,
//         address: document.getElementById('address').value


//     };
//     localStorage.setItem('formData', JSON.stringify(formData));

// }

// function loadFormData(){
//     let storedData = localStorage.getItem('formData');
//     if (storedData){
//         let formData = JSON.parse(storedData);
//     document.getElementById('name').value = formData.name;
//     document.getElementById('email').value = formData.email;
//     document.getElementById('phone').value = formData.phone;
//     document.getElementById('address').value = formData.address;
//     }
// }

// function clearFormData(){
//     let storedData = localStorage.getItem('formData');
//         if(storedData){
//             localStorage.removeItem('formData');  
//         }
       
// }

// let myFormElement = document.getElementById('myForm');
// if (myFormElement) {myFormElement.addEventListener('input',saveFormData);}

// window.onload = loadFormData();
