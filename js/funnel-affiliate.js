document.addEventListener('DOMContentLoaded', function () {


    const validation = new window.JustValidate('#funnel-form', {
        errorFieldCssClass: 'field-error',
        successFieldCssClass: 'field-success',
        lockForm: false,
        focusInvalidField: false,
        validateBeforeSubmitting: true,
    });

    let codeRules = [
        {
            rule: 'required',
        },
        {
            rule: 'number',
        },
        {
            rule: 'minNumber',
            value: 0,
        },
        {
            rule: 'maxNumber',
            value: 9,
        }
    ];

    validation
        .addField('#email', [
            {
                rule: 'required',
            },
            {
                rule: 'email',
            }
        ])
        .addField('#code-char-1', codeRules, { errorsContainer: '.error-container' })
        .addField('#code-char-2', codeRules, { errorsContainer: '.error-container' })
        .addField('#code-char-3', codeRules, { errorsContainer: '.error-container' })
        .addField('#code-char-4', codeRules, { errorsContainer: '.error-container' })
        .addField('#code-char-5', codeRules, { errorsContainer: '.error-container' })
        .addField('#code-char-6', codeRules, { errorsContainer: '.error-container' })
        .addField('#wallet', [
            {
                rule: 'required',
                errorMessage: 'This field is required.',
            },
            {
                rule: 'customRegexp',
                value: /0x([a-zA-Z0-9]){40}/g,
            },
            {
                rule: 'minLength',
                value: 42,
            },
            {
                rule: 'maxLength',
                value: 42,
            }
        ])
        .addField('#terms', [
            {
                rule: 'required',
            }
        ])
        .addField('#affiliate-link', [
            {
                rule: 'required',
            }
        ])
        .onValidate((e) => {
            if (e.fields['#email'].isValid && e.fields['#email'].touched) {
                showConfirmationCode();
            } else if (!e.fields['#email'].isValid) {
                hideConfirmationCode();
            }
        })
    // .onFail((fields) => {

    // })
    // .onSuccess((event) => {

    // })

    // Button copy Affiliate link
    document.querySelector('.btn-copy-link').addEventListener('click', (e) =>{
        let textCopy = document.querySelector('#affiliate-link').value;
        navigator.clipboard.writeText(textCopy)
        .then(() => {
            let toast = document.createElement('div');
                toast.classList.add('toast');
            toast.textContent = 'Link copied';
            e.target.parentNode.appendChild(toast);
            setTimeout(function () {
                e.target.parentNode.removeChild(toast);
            }, 2500);
        })
        .catch(() => {
        });
    
    });

    // Form steps
    let stepButtons = document.querySelectorAll('.btn-next-step');

    stepButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            let stepItem = button.closest('.form-step.current-step');
            // document.querySelector('#submit-funnel-btn').click();
            const promises = [];
            stepItem.querySelectorAll('input').forEach((field) => {
                let promise = validation.revalidateField(`#${field.id}`)
                promises.push(promise);
            });
            
            Promise.all(promises).then(() => {
                if (!stepItem.querySelector('.just-validate-error-label')) {
                    stepItem.classList.remove('current-step');
                    stepItem.nextElementSibling.classList.add('current-step');
                }
            });
        })
    })

    let skipButton = document.querySelectorAll('.btn-skip-step');
    skipButton.forEach((button) => {
        button.addEventListener('click', (e) => {
            let stepItem = button.closest('.form-step.current-step');
            stepItem.classList.remove('current-step');
            stepItem.nextElementSibling.classList.add('current-step');

            let fields = stepItem.querySelectorAll('input');
            fields.forEach((field) => {
                validation.removeField(`#${field.id}`);
            })
            stepItem.remove();
        })
    })

    // Show/hide Confirmation code element
    function showConfirmationCode() {
        document.querySelector('.btn-send-code').classList.remove('d-none');
        document.querySelector('.btn-send-code').addEventListener('click', (e) => {
            // document.querySelector('#email').setAttribute('disabled', true);
            e.target.previousElementSibling.classList.remove('d-none');
            e.target.classList.add('d-none');
        })
    }

    function hideConfirmationCode() {
        document.querySelector('.btn-send-code').classList.add('d-none');
        document.querySelector('.code-group-wrap').classList.add('d-none');
    }

    // Confirmation code fields
    const codeGroup = document.querySelector('.code-group')
    const codeInputs = codeGroup.querySelectorAll('input')
    const KEYBOARDS = {
        backspace: 8,
        arrowLeft: 37,
        arrowRight: 39,
    }

    function handleInput(e) {
        const input = e.target
        const nextInput = input.nextElementSibling
        if (nextInput && input.value) {
            nextInput.focus()
            if (nextInput.value) {
                nextInput.select()
            }
        }
    }

    function handlePaste(e) {
        e.preventDefault()
        const paste = e.clipboardData.getData('text')
        codeInputs.forEach((input, i) => {
            input.value = paste[i] || ''
        })
    }

    function handleBackspace(e) {
        const input = e.target
        if (input.value) {
            input.value = ''
            return
        }

        input.previousElementSibling.focus()
    }

    function handleArrowLeft(e) {
        const previousInput = e.target.previousElementSibling
        if (!previousInput) return
        previousInput.focus()
    }

    function handleArrowRight(e) {
        const nextInput = e.target.nextElementSibling
        if (!nextInput) return
        nextInput.focus()
    }

    codeGroup.addEventListener('input', handleInput)
    codeInputs[0].addEventListener('paste', handlePaste)

    codeInputs.forEach(input => {
        input.addEventListener('focus', e => {
            setTimeout(() => {
                e.target.select()
            }, 0)
        })

        input.addEventListener('keydown', e => {
            switch (e.keyCode) {
                case KEYBOARDS.backspace:
                    handleBackspace(e)
                    break
                case KEYBOARDS.arrowLeft:
                    handleArrowLeft(e)
                    break
                case KEYBOARDS.arrowRight:
                    handleArrowRight(e)
                    break
                default:
            }
        })
    })

});