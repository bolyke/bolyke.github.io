'use strict';

var statisticCookies = localStorage.getItem('statisticCookies') === "false" ? false : true;
var marketingCookies = localStorage.getItem('marketingCookies') === "false" ? false : true;

document.addEventListener('DOMContentLoaded', function () {

    updateCookies();

    var windowWidth = window.innerWidth;
    var niceSelects = [];
    var localStorageFields = JSON.parse(localStorage.getItem("formFields")) || {};
    
    let fieldsKeys = Object.keys(localStorageFields),
        counterNetwork = 0, counterLink = 0, counterParty = localStorageFields["party-count"] || 1;

    for (const key of fieldsKeys) {
        if (key.includes("network-")) {
            counterNetwork++;
        }
        if (key.includes("link-type-")) {
            counterLink++;
        }
    }

    if (statisticCookies) {
        dataLayer.push({'event': 'missionVisit'});
    }

    // save fields in local storage
    document.querySelectorAll('input').forEach(field => {
        updateInputStorage(field);
    })

    document.querySelectorAll('select').forEach(select => {
        updateSelectsStorage(select);
    })

    if (document.querySelector('.sign-out')) {
        document.querySelector('.sign-out').addEventListener('click', function(e) {
            localStorage.removeItem('discord_name');
        })
    }

    if (statisticCookies) {
        if (document.querySelector('.header .btn-mission')) {
            document.querySelector('.header .btn-mission').addEventListener('click', () => {
                dataLayer.push({'event': 'HeaderStartMission'});
            })
        }
    
        if (document.querySelector('.sign-out')) {
            document.querySelector('.sign-out').addEventListener('click', function(e) {
                dataLayer.push({'event': 'userSignout'});
            })
        }

        if (document.querySelector('.mission-success .mission-btn')) {
            document.querySelector('.mission-success .mission-btn').addEventListener('click', function(e) {
                dataLayer.push({'event': 'ThanksNewMission'});
            })
        }
    }

    if (windowWidth <= 768) {
        let html = `
            <div class="modal open" id="missionMobileModal">
                <div class="modal__overlay jsOverlay"></div>
                <div class="modal__container">
                    <div class="d-flex flex-column align-center">
                        <i class="ta ta-info-green"></i>
                        <div class="modal-text text-center">
                            Do you want to make an 
                            extended report and get 350 
                            HAI? It is available from the 
                            <span class="text-primary">desktop version</span>.
                        </div>
                        <div class="modal-text text-center text-grey">Reward for trying to complete a mission 10 HAI</div>
                        <button class="jsModalClose btn-primary">OKAY</button>
                    </div>
                </div>
            </div>`;

        let elem = document.createElement('div');
        elem.innerHTML = html;
        document.querySelector('.mission-page').append(elem);
    }


    const url = "https://script.google.com/macros/s/AKfycbxLzraIaYhhqCxAlPmNqdztkUWt1EroBkl_0_KHvGsl3IBnK5RfBaItrAazqUwND2mINA/exec";
    var tableData, networkLinks
    selectsInit();

    function selectsInit() { 

        fetch(url)
        .then(res => res.json())
        .then(res => {

            tableData = res.projects
            networkLinks = res.networks

            let projectSelect = document.querySelector('#project');
            tableData.forEach(item => {
                let option = document.createElement('option');
                option.text = `<img class="project-logo" src="${item.logo}" alt="" />${item.project}`;
                option.value = item.project;
                projectSelect.options[projectSelect.selectedIndex];
                projectSelect.add(option);
            })


        }).then(rep => {
            document.querySelectorAll('select').forEach(item => {
                if (item.id === 'link-type-1') {
                    niceSelects.push({id : 'link-type-1', select : NiceSelect.bind(item)});
                } else {
                    niceSelects.push({id : item.id, select : NiceSelect.bind(item, { searchable: true })});
                }
                updateSelectsStorage(item);
            });

            document.querySelector('#project').addEventListener('change', (e) => {
                let project = tableData.find(o => o.project === e.target.value);
                let project_link = `<a href="${project.link}" target="${project.link}"><span>${project.link}</span><i class="ta ta-external ta-sm"></i></a>`
                document.getElementById("gc_1").innerHTML = `<div class="project-name"><img src="${project.logo}" alt="" /><span>${project.project}</span> :${project_link}</div>`;
                document.getElementById("gc_2").innerHTML = project_link;
            })

            while (counterNetwork > 1) {
                document.querySelector('.add-address').click();
                counterNetwork--;
            }
        
            while (counterLink > 1) {
                document.querySelector('.add-link').click();
                counterLink--;
            }

            while (counterParty > 1) {
                document.querySelector('.add-party').click();
                counterParty--;
            }

        })
    }

    const validation = new window.JustValidate(
        '.mission-form',
        {
            errorLabelCssClass: 'tooltip-error',
            errorFieldCssClass: 'field-error',
            successFieldCssClass: 'field-success',
            focusInvalidField: false,
            lockForm: true,
            tooltip: {
              position: 'top',
            },
        },
    );

    validation
    .addField('#project', [
        {
            rule: 'required',
            errorMessage: 'Choose a project',
        }
    ])
    .addField('#network-1', [
        {
            rule: 'required',
            errorMessage: 'Choose a network',
        }
    ])
    .addField('#token-1', [
        {
            rule: 'required',
            errorMessage: 'This field is required. Please, fill in the complete information.',
        }
    ])
    .addField('#csv-file-1', [
        {
            rule: 'minFilesCount',
            value: windowWidth > 768 ? 1 : 0,
            errorMessage: 'Please, load the file.',
        },
        {
            rule: 'maxFilesCount',
            value: 1,
            errorMessage: 'Please, load the file.',
        },
        {
            rule: 'files',
            value: {
                    files: {
                        extensions: ['csv', 'CSV'],
                        maxSize: 26214400,
                        minSize: 0,
                        types: ['text/csv'],
                        // names: ['file1.jpeg', 'file2.png'],
                    },
            },
            errorMessage: 'Please, upload file with CSV extension.'
        }
    ])
    .addField('#token-link-1', [
        {
            rule: 'required',
            errorMessage: 'This field is required. Please, fill in the complete information.',
        }
    ])
    .addField('#party-name-1', [
        {
            rule: 'required',
            errorMessage: 'This field is required. Please, fill in the complete information.',
        }
    ])
    .addField('#allocation-1', [
        {
            rule: 'required',
            errorMessage: 'Must be a value between 0 and 100',
        },
        {
            rule: 'customRegexp',
            value: /(?:\b|-)([0-9]{1,2}[0]?|100)\b/,
            errorMessage: 'Must be a value between 0 and 100'
        }
    ])
    .addField('#tge-1', [
        {
            rule: 'required',
            errorMessage: 'This field is required. Please, fill in the complete information.',
        },
        {
            rule: 'customRegexp',
            value: /(?:\b|-)([0-9]{1,2}[0]?|100)\b/,
            errorMessage: 'Must be a value between 0 and 100'
        }
    ])
    .addField('#cliff-period-1', [
        {
            rule: 'required',
            errorMessage: 'This field is required. Please, fill in the complete information.',
        },
        {
            rule: 'number',
            errorMessage: 'Must be a value between 0 and 999',
        },
        {
            rule: 'minNumber',
            value: 0,
        },
        {
            rule: 'maxNumber',
            value: 999,
        }
    ])
    .addField('#vesting-period-1', [
        {
            rule: 'required',
            errorMessage: 'This field is required. Please, fill in the complete information.',
        },
        {
            rule: 'number',
            errorMessage: 'Must be a value between 0 and 999',
        },
        {
            rule: 'minNumber',
            value: 0,
        },
        {
            rule: 'maxNumber',
            value: 999,
        }
    ])
    .addField('#release-schedule-1', [
        {
        rule: 'required',
        errorMessage: 'This field is required. Please, fill in the complete information.',
        }
    ])
    .addField('#wallet', [
        {
        rule: 'minLength',
        value: 42,
        },
        {
        rule: 'maxLength',
        value: 42,
        },
        {
        rule: 'required',
        errorMessage: 'This field is required. Please, fill in the complete information.',
        }
    ])
    .onFail((fields) => {
        document.querySelector('.form-error-global').classList.remove('d-none');
        if (statisticCookies) {
            for (const key in fields) {
                if (!fields[key]['isValid']) {
                    if (document.querySelector(key).value != "") {
                        if (key.includes('token')) {
                            dataLayer.push({'event': 'missionTAddressError'});
                        }
                        if (key.includes('csv-file')) {
                            dataLayer.push({'event': 'missionCSVError'});
                        }
                        if (key.includes('token-link')) {
                            dataLayer.push({'event': 'missionITAError'});
                        }
                        if (key.includes('party-name') || key.includes('allocation') || key.includes('tge') || key.includes('cliff-period') || key.includes('vesting-period') || key.includes('release-schedule')) {
                            dataLayer.push({'event': 'missionPartyError'});
                        }
                        if (key.includes('wallet')) {
                            dataLayer.push({'event': 'missionWalletError'});
                        }
                    }

                }
            }
        }

        if (document.querySelector('.show-error')) {
            document.querySelector('.show-error').classList.remove('show-error');
        }
        for (const key in fields) {
            if (!fields[key]['isValid']) {
                fields[key]['elem'].classList.add('show-error');
                break;
            } else if (key.includes('allocation')) {
                allocationSum();
            }
        }
    })
    .onSuccess((event) => {
        if (document.querySelector('.show-error')) {
            document.querySelector('.show-error').classList.remove('show-error');
        }
        checkAllocation();
        if (parseInt(document.querySelector('.current-sum').textContent) == 100) {
            document.querySelector('.form-error-global').classList.add('d-none');
            addUserMission();
        }
    });

    //file field
    let fileInput  = document.querySelector(".file-field input"),
    button = document.querySelector(".file-field label"),
    the_return = document.querySelector(".file-field label");

    button.addEventListener("keydown", function( event ) {
        if ( event.keyCode == 13 || event.keyCode == 32 ) {
            fileInput.focus();
        }
    });
    button.addEventListener("click", function( event ) {
        fileInput.focus();
        return false;
    });
    fileInput.addEventListener("change", function( event ) {
        if (this.value) {
            the_return.innerHTML = '<span class="file"><span class="file-name"><i class="ta ta-check"></i><span class="ellipsis">' + this.value.split('.').shift() + '</span>.' + this.value.split('.').pop() + '</span><span class="file-remove"></span></span>';  
        } else {
            the_return.innerHTML = '<div class="d-flex align-center justify-center"><i class="ta ta-upload"></i>Upload File</div>';
        }
    });
    document.querySelector('.no-file-button').addEventListener('click', e => {
        let fileWrap = e.target.closest('.file-wrap');
        if (fileWrap.classList.contains('no-file')) {
            fileWrap.classList.remove('no-file');  
            fileWrap.querySelector('label').innerHTML = '<div class="d-flex align-center justify-center"><i class="ta ta-upload"></i>Upload File</div>';
            fileWrap.querySelector('.no-file-button').textContent = `I don't have this CSV file`;
            refreshFileField('#csv-file-1', 1);
        } else {
            fileWrap.classList.add('no-file');
            fileWrap.querySelector('label').innerHTML = '<div class="d-flex align-center justify-center">Network without file</div>';
            fileWrap.querySelector('.no-file-button').textContent = `I have this CSV file`;
            refreshFileField('#csv-file-1', 0);
        }
    })

    function refreshFileField (fileField, minFiles) {
        validation.removeField(fileField);
        validation.addField(fileField, [
            {
                rule: 'minFilesCount',
                value: minFiles,
                errorMessage: 'Please, load the file.',
            },
            {
                rule: 'maxFilesCount',
                value: 1,
                errorMessage: 'Please, load the file.',
            },
            {
                rule: 'files',
                value: {
                    files: {
                        extensions: ['csv', 'CSV'],
                        maxSize: 26214400,
                        minSize: 0,
                        types: ['text/csv'],
                    },
                },
                errorMessage: 'Please, upload file with CSV extension.'
            }
        ])
    }
    

    document.querySelectorAll('.allocation-field').forEach(item => {
        item.addEventListener('change', event => allocationSum())
    })

    document.querySelectorAll('.party-remove').forEach(item => {
        item.addEventListener('click', e => {removeParty(item, 1)})
    });

    document.querySelector('#network-1').addEventListener('change', e => {
        fileConnector(1, e.target);
        document.querySelector('#token-1').placeholder = `Enter ${e.target.value} Address`;
        document.querySelector('#token-1').disabled = false;
        let network = e.target.value
        let networkLink = networkLinks.find(item => item.network === network).link
        if (document.querySelector(`[data-file="1"] .network-content a.d-none`)) {
            document.querySelector(`[data-file="1"] .network-content a.d-none`).classList.remove('d-none')
        }
        document.querySelector(`[data-file="1"] .network-content a`).href = networkLink;
        document.querySelector(`[data-file="1"] .network-content a`).innerHTML = `<span>${networkLink}</span><i class="ta ta-external ta-sm"></i>`
        updateNetworkSelectGroup();

    })

    document.querySelector('#link-type-1').addEventListener('change', e => {
        document.querySelector('#token-link-1').placeholder = 'Paste link to the document/page';
        document.querySelector('#token-link-1').disabled = false;
    })

    document.querySelector('#token-1').addEventListener('change', e => {
        let network = document.querySelector('#token-1').placeholder.split(' ')[1]
        if (network !== 'Other'){
            let networkLink = networkLinks.find(item => item.network === network).link
            document.querySelector(`[data-file="1"] .network-content a`).href = networkLink + e.target.value
            document.querySelector(`[data-file="1"] .network-content a`).innerHTML = `<span>${networkLink}${e.target.value}</span><i class="ta ta-external ta-sm"></i>`
        }
    });


    function updateNetworkSelectGroup () {
        let selectedOptions = document.querySelectorAll('.network-select.nice-select .option.selected');
        let disabledOptions = document.querySelectorAll('.network-select.nice-select .option.disabled:not([data-value=""])');
        let selectList = document.querySelectorAll('.network-select.nice-select');

        disabledOptions.forEach(option => {
            option.classList.remove('disabled');
        })

        selectedOptions.forEach(option => {
            selectList.forEach(select => {
                if (option.dataset.value !== "Other"){
                    select.querySelector(`.option[data-value="${option.dataset.value}"]`).classList.add('disabled');
                }
            })
        })
      
    }


    document.querySelector('.add-link').addEventListener('click', event => {

        let linkId = 1 + document.querySelectorAll('.step-link [data-link]').length;

        let removeLink = `remove-link-${linkId}`;

        document.querySelector('.step-link').insertAdjacentHTML('beforeend', `
        <div class="text-field field-group mt-15" data-link=${linkId}>
            <div class="select-wrap">
                <span class="link-number">${linkId}</span>
                <input class="field-full link" type="text" id="token-link-${linkId}" name="token-link-${linkId}" placeholder="Select link type    ⇨" disabled>
                <select class="link-select" id="link-type-${linkId}" name="link-type-${linkId}">
                    <option value="" selected disabled>Link Type</option>
                    <option value="Official Link">Official Link</option>
                    <option value="3rd Party Link">3rd Party Link</option>
                </select>
                <button id="${removeLink}" class="btn-link2" type="button"><i class="ta ta-remove"></i></button>
            </div>
        </div>
        `);
        let new_link = document.getElementById(`link-type-${linkId}`)
        niceSelects.push({id : `link-type-${linkId}`, select : NiceSelect.bind(new_link)});

        new_link.addEventListener('change', e => {
            document.querySelector(`#token-link-${linkId}`).placeholder = 'Paste link to the document/page';
            document.querySelector(`#token-link-${linkId}`).disabled = false;
        })

        document.querySelectorAll(`[data-link="${linkId}"] input`).forEach(field => {
            updateInputStorage(field);
        })

        document.querySelectorAll(`[data-link="${linkId}"] select`).forEach(select => {
            updateSelectsStorage(select);
        })
        
        document.getElementById(removeLink).addEventListener('click', e => {
            e.target.closest('[data-link]').remove()
            
            document.querySelectorAll('[data-link]').forEach((data, id) => {
                linkId = id + 1;
                data.dataset.link = linkId;
                let child = data.children[0].children
                child[0].innerHTML = linkId
                child[1].id = `token-link-${linkId}`
                child[1].name = `token-link-${linkId}`
                child[2].id = `link-type-${linkId}`
                child[2].name = `link-type-${linkId}`
            })
            
            delete localStorageFields[`token-link-${linkId}`];
            delete localStorageFields[`link-type-${linkId}`];
            localStorage.setItem("formFields", JSON.stringify(localStorageFields)); 
            validation.removeField(`#token-link-${linkId}`);
        })

        validation.addField(`#token-link-${linkId}`, [
            {
                rule: 'required',
                errorMessage: 'This field is required. Please, fill in the complete information.',
            }
        ])
    })

    document.querySelector('.add-address').addEventListener('click', event => {
        // add address
        let addressId = 1 + parseInt(document.querySelector('.step-network [data-address]:last-child').getAttribute('data-address'));
        
        let removeAddress = `remove-address-${addressId}`;
        if (document.getElementById(`remove-address-${addressId-1}`)) {
            document.getElementById(`remove-address-${addressId-1}`).setAttribute('hidden', true);
        }

        document.querySelector('.step-network').insertAdjacentHTML('beforeend', `
        <div class="text-field field-group mt-15" data-address="${addressId}">
            <div class="select-wrap" style="display:flex;flex-direction:row;align-items:center;width:100%;">
                <span class="network-number">${addressId}</span>
                <input class="field-full token" type="text" id="token-${addressId}" name="token-${addressId}" placeholder="Select Network    ⇨" disabled>
                <select class="network-select" id="network-${addressId}" name="network-${addressId}">
                    <option value="" selected disabled>Select Network</option>
                    <option value="Ethereum">Ethereum</option>
                    <option value="BSC">BSC</option>
                    <option value="Fantom">Fantom</option>
                    <option value="Polygon">Polygon</option>
                    <option value="Tron">Tron</option>
                    <option value="Avalanche">Avalanche</option>
                    <option value="Near Protocol">Near Protocol</option>
                    <option value="xDAI">xDAI</option>
                    <option value="Huobi ECO Chain">Huobi ECO Chain</option>
                    <option value="Optimism">Optimism</option>
                    <option value="Arbitrum One">Arbitrum One</option>
                    <option value="Sora">Sora</option>
                    <option value="Energi">Energi</option>
                    <option value="Cronos">Cronos</option>
                    <option value="Aurora">Aurora</option>
                    <option value="Other">Other</option>
                </select>
                <button id="${removeAddress}" class="btn-link2" type="button"><i class="ta ta-remove"></i></button>
            </div>
        </div>
        `);
        
        let network = document.getElementById(`network-${addressId}`);
            niceSelects.push({id : `network-${addressId}`, select : NiceSelect.bind(network)});
            updateNetworkSelectGroup();

        document.querySelector('.step-file').insertAdjacentHTML('beforeend', `
            <div class="form-download disabled" data-file="${addressId}">
                <div class="download-network">
                    <span class="network-number">${addressId}</span>
                    <div class="network-icon"></div>
                    <div class="network-content">
                        <div class="network-name">Select Network in Step 2</div>
                        <a href="/" class="d-none" target="_blank">
                        </a>
                    </div>
                </div>
                <div class="file-wrap">
                    <div class="file-field">
                        <input class="file" type="file" id="csv-file-${addressId}" name="csv-file-${addressId}" accept=".csv">
                        <label class="" for="csv-file-${addressId}">
                            <div class="d-flex align-center justify-center"><i class="ta ta-upload"></i>Upload File</div>
                        </label>
                    </div>
                    <span class="no-file-button">I don't have this CSV file</span>
                </div>
            </div>
        `);

        document.querySelector(`[data-file="${addressId}"] .no-file-button`).addEventListener('click', e => {
            let fileWrap = e.target.closest('.file-wrap');
            if (fileWrap.classList.contains('no-file')) {
                fileWrap.classList.remove('no-file');  
                fileWrap.querySelector('label').innerHTML = '<div class="d-flex align-center justify-center"><i class="ta ta-upload"></i>Upload File</div>';
                fileWrap.querySelector('.no-file-button').textContent = `I don't have this CSV file`;
                refreshFileField(`#csv-file-${addressId}`, 1);
            } else {
                fileWrap.classList.add('no-file');
                fileWrap.querySelector('label').innerHTML = '<div class="d-flex align-center justify-center">Network without file</div>';
                fileWrap.querySelector('.no-file-button').textContent = `I have this CSV file`;
                refreshFileField(`#csv-file-${addressId}`, 0);
            }
        })

        document.getElementById(removeAddress).addEventListener('click', e => {
            let lastAddress = addressId-1
            document.querySelectorAll('[data-address]')[lastAddress].remove();
            document.getElementsByClassName('form-download')[lastAddress].remove();
            if (document.getElementById(`remove-address-${lastAddress}`)) {
                document.getElementById(`remove-address-${lastAddress}`).removeAttribute('hidden');
            }

            delete localStorageFields[`token-${addressId}`];
            delete localStorageFields[`network-${addressId}`];

            localStorage.setItem("formFields", JSON.stringify(localStorageFields));

            validation.removeField(`#network-${addressId}`);
            validation.removeField(`#token-${addressId}`);
            validation.removeField(`#csv-file-${addressId}`);
            updateNetworkSelectGroup ();
        })
        
        // init address select
        // selects = NiceSelect.bind(document.querySelector('.step-network [data-address]:last-child select'), options);

        // sync text field with selected network
        document.querySelector(`#network-${addressId}`).addEventListener('change', e => {
            fileConnector(addressId, e.target);
            network = document.getElementById(`token-${addressId}`)
            network.disabled = false;
            network.placeholder = `Enter ${e.target.value} Address`;
            updateNetworkSelectGroup(); 
          
        })

        document.querySelectorAll(`[data-address="${addressId}"] input`).forEach(field => {
            updateInputStorage(field);
        })
        document.querySelectorAll(`[data-address="${addressId}"] select`).forEach(select => {
            updateSelectsStorage(select);
        })

        let addressQuery = document.querySelector(`#token-${addressId}`)
            addressQuery.addEventListener('change', e => {
                let network = addressQuery.placeholder.split(' ')[1]
                if (network !== 'Other'){
                    let networkLink = networkLinks.find(item => item.network === network).link
                    document.querySelector(`[data-file="${addressId}"] .network-content a`).href = networkLink + e.target.value
                    document.querySelector(`[data-file="${addressId}"] .network-content a`).innerHTML = `<span>${networkLink}${e.target.value}</span><i class="ta ta-external ta-sm"></i>`
                }
            });

        //file field
        let fileInput  = document.querySelector(`[data-file="${addressId}"] .file-field input`),
        button = document.querySelector(`[data-file="${addressId}"] .file-field label`);

        button.addEventListener("keydown", function( event ) {
            if ( event.keyCode == 13 || event.keyCode == 32 ) {
                fileInput.focus();
            }
        });
        button.addEventListener("click", function( event ) {
            fileInput.focus();
            return false;
        });
        fileInput.addEventListener("change", function( event ) {
            if (this.value) {
                button.innerHTML = '<span class="file"><span class="file-name"><i class="ta ta-check"></i><span class="ellipsis">' + this.value.split('.').shift() + '</span>.' + this.value.split('.').pop() + '</span><span class="file-remove"></span></span>';  
            } else {
                button.innerHTML = '<div class="d-flex align-center justify-center"><i class="ta ta-upload"></i>Upload File</div>';
            }
        }); 

        // add validation
        validation
        .addField(`#network-${addressId}`, [
            {
                rule: 'required',
                errorMessage: 'Choose a network',
            }
        ])
        .addField(`#token-${addressId}`, [
            {
                rule: 'required',
                errorMessage: 'This field is required. Please, fill in the complete information.',
            }
        ])
        .addField(`#csv-file-${addressId}`, [
            {
                rule: 'minFilesCount',
                value: windowWidth > 768 ? 1 : 0,
                errorMessage: 'Please, load the file.',
            },
            {
                rule: 'maxFilesCount',
                value: 1,
                errorMessage: 'Please, load the file.',
            },
            {
                rule: 'files',
                value: {
                    files: {
                        extensions: ['csv', 'CSV', 'png'],
                        maxSize: 26214400,
                        minSize: 0,
                        types: ['text/csv', 'image/png'],
                        // names: ['file1.jpeg', 'file2.png'],
                    },
                },
                errorMessage: 'Please, upload file with CSV extension.'
            }            
        ])
    });

    document.querySelector('.add-party').addEventListener('click', event => {
        // add patry step
        let partyId = document.querySelector('.step-party [data-party]:last-child') ? (1 + parseInt(document.querySelector('.step-party [data-party]:last-child').getAttribute('data-party'))) : 1;
        
        localStorageFields["party-count"] = partyId;
        localStorage.setItem("formFields", JSON.stringify(localStorageFields));

        document.querySelector('.step-party').insertAdjacentHTML('beforeend', `
            <div class="party-item mt-15" data-party="${partyId}">
                <div class="party-heading">
                    <input class="party-name" id="party-name-${partyId}" name="party-name-${partyId}" placeholder="Enter Party Name">
                    <div class="party-edit"><i class="ta ta-edit"></i></div>
                    <div class="party-remove"><i class="ta ta-remove"></i></div>
                </div>
                <div class="party-content">
                    <div class="text-field percent-field">
                        <div>Allocation</div>
                        <label for="allocation-${partyId}"></label>
                        <input class="field-full allocation-field allocation" type="text" id="allocation-${partyId}" name="allocation-${partyId}" placeholder="0" onkeyup="this.value=this.value.replace(',','.')">
                    </div>
                    <div class="text-field percent-field">
                        <div>TGE</div>
                        <label for="tge-${partyId}"></label>
                        <input class="field-full tge" type="text" id="tge-${partyId}" name="tge-${partyId}" placeholder="0" onkeyup="this.value=this.value.replace(',','.')">
                    </div>
                    <div class="text-field month-field">
                        <div>Cliff Period</div>
                        <label for="cliff-period-${partyId}"></label>
                        <input class="field-full cliff-period" type="text" id="cliff-period-${partyId}" name="cliff-period-${partyId}" placeholder="0">
                    </div>
                    <div class="text-field month-field">
                        <div>Vesting Period</div>
                        <label for="vesting-period-${partyId}"></label>
                        <input class="field-full vesting-period" type="text" id="vesting-period-${partyId}" name="vesting-period-${partyId}" placeholder="0">
                    </div>
                    <div class="text-field info-field">
                        <div>Release Schedule</div>
                        <input class="field-full release-schedule" type="text" id="release-schedule-${partyId}" name="release-schedule-${partyId}" placeholder="Enter info">
                    </div>
                </div>
            </div>
        `);
        //party remove
        document.querySelector(`[data-party="${partyId}"] .party-remove`).addEventListener('click', e => {
            delete localStorageFields[`party-name-${partyId}`];
            delete localStorageFields[`allocation-${partyId}`];
            delete localStorageFields[`tge-${partyId}`];
            delete localStorageFields[`cliff-period-${partyId}`];
            delete localStorageFields[`vesting-period-${partyId}`];
            delete localStorageFields[`release-schedule-${partyId}`];

            localStorage.setItem("formFields", JSON.stringify(localStorageFields));

            removeParty(e.target, partyId)
        
        })
        // party allocation sum
        document.querySelector(`#allocation-${partyId}`).addEventListener('change', event => allocationSum())

        document.querySelectorAll(`[data-party="${partyId}"] input`).forEach(field => {
            updateInputStorage(field);
        })

        // party validation
        validation
        .addField(`#party-name-${partyId}`, [
            {
                rule: 'required',
                errorMessage: 'This field is required. Please, fill in the complete information.',
            }
        ])
        .addField(`#allocation-${partyId}`, [
            {
                rule: 'required',
                errorMessage: 'Must be a value between 0 and 100',
            },
            {
                rule: 'customRegexp',
                value: /(?:\b|-)([0-9]{1,2}[0]?|100)\b/,
                errorMessage: 'Must be a value between 0 and 100'
            }
        ])
        .addField(`#tge-${partyId}`, [
            {
                rule: 'required',
                errorMessage: 'This field is required. Please, fill in the complete information.',
            },
            {
                rule: 'customRegexp',
                value: /(?:\b|-)([0-9]{1,2}[0]?|100)\b/,
                errorMessage: 'Must be a value between 0 and 100'
            } 
        ])
        .addField(`#cliff-period-${partyId}`, [
            {
                rule: 'required',
                errorMessage: 'This field is required. Please, fill in the complete information.',
            },
            {
                rule: 'number',
                errorMessage: 'Must be a value between 0 and 999',
            },
            {
                rule: 'minNumber',
                value: 0,
            },
            {
                rule: 'maxNumber',
                value: 999,
            }
        ])
        .addField(`#vesting-period-${partyId}`, [
            {
                rule: 'required',
                errorMessage: 'This field is required. Please, fill in the complete information.',
            },
            {
                rule: 'number',
                errorMessage: 'Must be a value between 0 and 999',
            },
            {
                rule: 'minNumber',
                value: 0,
            },
            {
                rule: 'maxNumber',
                value: 999,
            }
        ])
        .addField(`#release-schedule-${partyId}`, [
            {
            rule: 'required',
            errorMessage: 'This field is required. Please, fill in the complete information.',
            }
        ])
    })

    function removeParty (item, id) {
        item.closest('[data-party]').remove();
        validation.removeField(`#party-name-${id}`);
        validation.removeField(`#allocation-${id}`);
        validation.removeField(`#tge-${id}`);
        validation.removeField(`#cliff-period-${id}`);
        validation.removeField(`#vesting-period-${id}`);
        validation.removeField(`#release-schedule-${id}`);
        localStorageFields["party-count"] = id - 1;
        localStorage.setItem("formFields", JSON.stringify(localStorageFields));
    }

    function allocationSum () {
        let allocationSum = 0;
        let allocation = document.querySelectorAll('.allocation-field')
            allocation.forEach(field => {
                allocationSum += parseFloat(field.value || 0);
            })
        let lastAl = allocation[allocation.length - 1].id
            allocation.forEach(field => {
                if (field.id === lastAl){
                   allocationSum = Number(allocationSum.toFixed(3))
                }
            })

            document.querySelector('.current-sum').textContent = `${allocationSum}%`;
            document.querySelector('.current-sum').classList = allocationSum != 100 ? 'current-sum text-red':'current-sum';
    }
    
    function checkAllocation () {
        let allocationSum = 0;
        let allocation = document.querySelectorAll('.allocation-field')
            allocation.forEach(field => {
                allocationSum += parseFloat(field.value || 0);
            })
        let lastAl = allocation[allocation.length - 1].id
            allocation.forEach(field => {
                if (field.id === lastAl){
                   allocationSum = Number(allocationSum.toFixed(3))
                }
                if (allocationSum != 100) {
                    validation.showErrors({[`#${field.id}`]: 'Allocation sum should be 100%'})
                    field.classList.add('show-error');
                } else {
                    validation.revalidateField(`#${field.id}`);
            }
        })  
        
        document.querySelector('.current-sum').textContent = `${allocationSum}%`;
        document.querySelector('.current-sum').classList = allocationSum != 100 ? 'current-sum text-red':'current-sum';
    }

    function fileConnector (id, elem) {
        document.querySelector(`[data-file="${id}"]`).classList = 'form-download';
        document.querySelector(`[data-file="${id}"] .download-network`).dataset.network = elem.value;
        document.querySelector(`[data-file="${id}"] .network-name`).innerHTML = elem.value;
        document.querySelector(`[data-file="${id}"] .network-content a`).classList.remove('d-none')
        document.querySelector(`[data-file="${id}"] .network-content a`).href = networkLinks.find(item => item.network === elem.value).link;
        document.querySelector(`[data-file="${id}"] .network-content a`).innerHTML = networkLinks.find(item => item.network === elem.value).link;
    }

    function updateInputStorage (field) {
        if (field.type != "file" && field.name != "statistic-cookies" && field.name != "marketing-cookies" ) {
            let formFields = JSON.parse(localStorage.getItem("formFields"));
            if (formFields && formFields[field.name]) {
                field.value = formFields[field.name];
            }
            field.addEventListener('change', e => {
                localStorageFields[field.name] = field.value;
                localStorage.setItem("formFields", JSON.stringify(localStorageFields));
            })
        }
    }

    function updateSelectsStorage (select) {
        let formFields = JSON.parse(localStorage.getItem("formFields"));

        if (formFields && formFields[select.name]) {
            select.value = formFields[select.name];
            select.querySelector('option[selected]').removeAttribute('selected');
            select.querySelector(`option[value="${select.value}"`).setAttribute('selected', true);
            select.dispatchEvent(new Event('change'));
            
            niceSelects.forEach(item => {
                if (item.id == select.name) {
                    item.select.update();
                }
            })
        }
        updateNetworkSelectGroup();

        select.addEventListener('change', e => {
            localStorageFields[select.name] = select.value;
            localStorage.setItem("formFields", JSON.stringify(localStorageFields));
            updateNetworkSelectGroup();
        })
    }
});

async function checkWallet(value) {
    let formData = new FormData();
    formData.append('wallet', value);

    let response = await fetch('/server/mission-test.php', {
        method: 'POST',
        body: formData
    });

    let result = await response.text();

    if (result == 'allow') {
        return true;
    } else if (result == 'disallow') {
        return false;
    }
}

async function addUserMission() {
    document.querySelector('#submit-btn').classList.add('loading');
    let userNetworks = [], userParties = [], projectLinks = [];;
    let formData = new FormData();

    document.querySelectorAll('[data-address]').forEach((item, id) => {
        formData.append(`file-${id+1}`, document.querySelector(`[data-file="${id+1}"] input.file`).files[0]);

        userNetworks.push({
            network: item.querySelector('select.network-select').value,
            token: item.querySelector('input.token').value,
        })
    })

    document.querySelectorAll('[data-link]').forEach(item => {
        projectLinks.push({
            type: item.querySelector('select.link-select').value,
            link: item.querySelector('input.link').value,
        })
    })

    document.querySelectorAll('[data-party]').forEach(item => {
        userParties.push({
            name: item.querySelector('input.party-name').value,
            allocation: item.querySelector('input.allocation').value,
            tge: item.querySelector('input.tge').value,
            cliffPeriod: item.querySelector('input.cliff-period').value,
            vestingPeriod: item.querySelector('input.vesting-period').value,
            releaseSchedule: item.querySelector('input.release-schedule').value
        })
    })

    formData.append('fname', 'addUserMission');
    formData.append('project', document.querySelector('[name="project"]').value);
    formData.append('networks', JSON.stringify(userNetworks));
    formData.append('token_link', JSON.stringify(projectLinks));
    formData.append('parties', JSON.stringify(userParties));
    formData.append('wallet', document.querySelector('[name="wallet"]').value);
    formData.append('discord', localStorage.getItem('discord_name'));

    let response = await fetch('/server/mission-beta.php', {
        method: 'POST',
        body: formData
    });
    if (response.status === 500){
        alert("Server error 500");
    }
    let result = await response.json();

    if (result.msg == "User mission passed") {
        if (statisticCookies != undefined && statisticCookies) {
            dataLayer.push({'event': 'missionSuccessful', 'missionProject': document.querySelector('[name="project"]').value, 'reportId': result.report_id});
        }
        if (!localStorage.getItem('fb-report') && localStorage.getItem('cpid') == '4d1b3f66-4710-40bc-b7af-6616fac6eef4') {
            fbq('init', localStorage.getItem('pixel_id'));
            fbq('track', 'Lead');
            localStorage.setItem('fb-report', 1);
        }
        document.querySelector('#submit-btn').classList.remove('loading');
        document.querySelector('.mission').classList.add('d-none');
        document.querySelector('.mission-success.d-none').classList.remove('d-none');
        window.scrollTo(0, 0);
        localStorage.removeItem("formFields");

    } else {
        alert(result.msg);
    }
}

(function() {
    /* Opening modal window function */
    function openModal() {
        /* Get trigger element */
        var modalTrigger = document.getElementsByClassName('jsModalTrigger');
  
        /* Set onclick event handler for all trigger elements */
        for(var i = 0; i < modalTrigger.length; i++) {
            modalTrigger[i].onclick = function() {
              var target = this.getAttribute('href').substr(1);
              var modalWindow = document.getElementById(target);
  
              modalWindow.classList ? modalWindow.classList.add('open') : modalWindow.className += ' ' + 'open'; 
            }
        }   
    }
  
    function closeModal(){
      /* Get close button */
      var closeButton = document.getElementsByClassName('jsModalClose');
      var closeOverlay = document.getElementsByClassName('jsOverlay');
  
      /* Set onclick event handler for close buttons */
        for(var i = 0; i < closeButton.length; i++) {
          closeButton[i].onclick = function() {
            var modalWindow = this.closest('.modal');
  
            modalWindow.classList ? modalWindow.classList.remove('open') : modalWindow.className = modalWindow.className.replace(new RegExp('(^|\\b)' + 'open'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        
            if (modalWindow.classList.contains('uverified-message')) {
                window.history.pushState({}, document.title, "/" + removeParam('show_message', window.location.href));
            }
        
        }
        }   
  
      /* Set onclick event handler for modal overlay */
        for(var i = 0; i < closeOverlay.length; i++) {
            closeOverlay[i].onclick = function() {
                var modalWindow = this.parentNode;

                modalWindow.classList ? modalWindow.classList.remove('open') : modalWindow.className = modalWindow.className.replace(new RegExp('(^|\\b)' + 'open'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            
                if (modalWindow.classList.contains('uverified-message')) {
                    window.history.pushState({}, document.title, "/" + removeParam('show_message', window.location.href));
                }
            }
        }  

        function removeParam(key, sourceURL) {
            // var rtn = sourceURL.split("?")[0],
            let rtn = '',
                param,
                params_arr = [],
                queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
            if (queryString !== "") {
                params_arr = queryString.split("&");
                for (var i = params_arr.length - 1; i >= 0; i -= 1) {
                    param = params_arr[i].split("=")[0];
                    if (param === key) {
                        params_arr.splice(i, 1);
                    }
                }
                if (params_arr.length) rtn = "?" + params_arr.join("&");
            }
            return rtn;
        }
  
    }
  
    /* Handling domready event IE9+ */
    function ready(fn) {
      if (document.readyState != 'loading'){
        fn();
      } else {
        document.addEventListener('DOMContentLoaded', fn);
      }
    }
  
    /* Triggering modal window function after dom ready */
    ready(openModal);
    ready(closeModal);
}());

function updateCookies () {
    if (!localStorage.getItem('statisticCookies') || !localStorage.getItem('marketingCookies')) {
        let elem = document.createElement('div');
        elem.classList.add('cookies-container');
        elem.innerHTML = `<div class="cookies-container">
                <div class="cookies-inner">
                    <div class="cookies-text">
                        We want to make your experience better. You can allow the use of all or only certain cookies, or opt out
                        of all. Read more about cookies and your privacy: <a href="">Privacy Notice</a>.
                    </div>
                    <div class="cookies-buttons">
                        <button class="btn-default btn-accept-cookies" type="button">ACCEPT ALL COOKIES</button>
                        <a href="#cookiesModal" class="btn-default jsModalTrigger">Customise cookies</a>
                        <button class="btn-default btn-reject-cookies" type="button">Reject all cookies</button>
                    </div>
                </div>
            </div>

            <div id="cookiesModal" class="modal">
                <div class="modal__overlay jsOverlay"></div>
                <div class="modal__container">
                    <div class="d-flex flex-column align-start">
                        <div class="modal-title">
                            Customise cookies
                        </div>
                        <div class="modal-content">
                            <div class="cookies-item">
                                <div class="cookies-text">
                                    We use <b>Statistics cookies</b> that help us to collect information on how you use our Website. The cookies collect information in a way that does not directly identify anyone.

                                </div>
                                <div class="cookies-check">
                                    <label class="switch" for="statistic-cookies">
                                        <input type="checkbox" id="statistic-cookies" name="statistic-cookies" />
                                        <div class="slider round"></div>
                                    </label>
                                </div>
                            </div>
                            <div class="cookies-item">
                                <div class="cookies-text">
                                    We use <b>Marketing cookies</b> that help display relevant ads for individual users, thereby more valuable for
                                    publishers and third-party advertisers.
                                </div>
                                <div class="cookies-check">
                                    <label class="switch" for="marketing-cookies">
                                        <input type="checkbox" id="marketing-cookies" name="marketing-cookies" />
                                        <div class="slider round"></div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button class="jsModalTrigger btn-primary btn-customize-cookies">Save and close</button>
                    </div>
                </div>
            </div>`;


        document.querySelector('body').prepend(elem);

        document.querySelector('.btn-accept-cookies').addEventListener('click', () => {
            setCookies(true, true)
        });
        document.querySelector('.btn-reject-cookies').addEventListener('click', () => {
            setCookies(false, false)
        });
        document.querySelector('.btn-customize-cookies').addEventListener('click', () => {
            setCookies(document.querySelector('#statistic-cookies').checked, document.querySelector('#marketing-cookies').checked)
        });


    }
}

function setCookies (statistic, marketing) {
    localStorage.setItem('statisticCookies', statistic);
    localStorage.setItem('marketingCookies', marketing);
    location.reload()
}