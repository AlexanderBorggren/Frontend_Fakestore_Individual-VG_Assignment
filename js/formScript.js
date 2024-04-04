let formHasError = true;

const validateForm = formSelector => {
  const formElement = document.querySelector (formSelector);

  const validationOptions = [
    {
      //validate that is has some value
      attribute: 'required',
      isValid: input => input.value.trim () !== '',
      errorMessage: (input, label) => `${label.textContent} is required`,
    },
    {
      //validate minlength off characters
      attribute: 'minlength',
      isValid: input =>
        input.value && input.value.length >= parseInt (input.minLength, 10),
      errorMessage: (input, label) =>
        `${label.textContent} needs to be atleast ${input.minLength} characters `,
    },
    {
      //validate maxlength off characters
      attribute: 'custommaxlength',
      isValid: input =>
        input.value &&
        input.value.length <=
          parseInt (input.getAttribute ('custommaxlength'), 10),
      errorMessage: (input, label) =>
        `${label.textContent} cannot be more than ${input.getAttribute ('custommaxlength')} characters `,
    },

    {
      //validate pattern of RegEx
      attribute: 'pattern',
      isValid: input => {
        const patternRegex = new RegExp (input.pattern);
        return patternRegex.test (input.value);
      },
      errorMessage: (input, label) =>
        `Not a valid ${label.textContent.toLowerCase ()}`,
    },
    {
      //validate minlength off phone number
      attribute: 'minlengthPhone',
      isValid: input =>
        input.value &&
        input.value.length >=
          parseInt (input.getAttribute ('minlengthPhone'), 10),
      errorMessage: (input, label) =>
        `${label.textContent} needs to be atleast ${input.getAttribute ('minlengthPhone')} numbers `,
    },
  ];

  const validateSingleFormGroup = formGroup => {
    const label = formGroup.querySelector ('label');
    const input = formGroup.querySelector ('input');
    const errorContainer = formGroup.querySelector ('.error');

    let formGroupError = false;
    for (const option of validationOptions) {
      if (input.hasAttribute (option.attribute) && !option.isValid (input)) {
        errorContainer.textContent = option.errorMessage (input, label);
        // input.classList.add(style="Color: red");
        // input.style.color = "red";
        formGroupError = true;
        formHasError = true;
        // console.log("formHasError set to true (Should happen everytime when has error, even when clicking submit)")
      }
    }

    if (!formGroupError) {
      errorContainer.textContent = '';
      // formHasError = false
    }
  };

  if (formElement) {
    formElement.setAttribute ('novalidate', '');

    Array.from (formElement.querySelectorAll ('input')).forEach (input => {
      input.addEventListener ('blur', event => {
        validateSingleFormGroup (event.target.parentElement);
      });
    });

    formElement.addEventListener ('submit', event => {
      event.preventDefault ();
      validateAllFormGroups (formElement);

      if (!formHasError) {
        window.open ('confirmorder.html', '_self');
      }
    });

    const validateAllFormGroups = formToValidate => {
      formHasError = false;
      Array.from (
        formToValidate.querySelectorAll ('.formGroup')
      ).forEach (field => {
        validateSingleFormGroup (field);
      });
    };
  }
};

validateForm ('#cartForm');
