import React from 'react';
import { Script } from 'gatsby';

import './index.scss';

const HubspotForm = ({ id, formId, region, portalId, style = 'default' }) => {
  return (
    <>
      <Script
        src="https://js.hsforms.net/forms/v2.js"
        onLoad={() => {
          window.hbspt.forms.create({
            region: region,
            portalId: portalId,
            formId: formId,
            target: `#hubspotForm-${id}`,
            locale: 'nl',
            translations: {
              nl: {
                required: 'Verplicht veld',
                invalidEmail: 'Geen geldig e-mailadres',
                invalidEmailFormat: 'Geen geldig e-mailadres',
                phoneInvalidCharacters: 'Telefoonnummer mag alleen nummers, +, en haakjes () bevatten.',
                phoneInvalidCharactersWithoutCountryCode:
                  'Telefoonnummer mag alleen nummers, +, en haakjes () bevatten.',
              },
            },
            onFormReady: () => {
              // Handlers
              const inputs = document.querySelectorAll('.hs-input');

              inputs.forEach((input) => {
                input.setAttribute('autocomplete', 'off');
              });

              inputs.forEach((input) => {
                input.addEventListener('input', () => {
                  if (input.value.trim() !== '') {
                    input.setAttribute('data-input', 'load');
                  } else {
                    input.setAttribute('data-input', 'empty');
                  }
                });
              });

              document.querySelectorAll('.hs-form-field').forEach((e) => {
                const labelElement = e.querySelector('label');
                const inputElement = e.querySelector('input');

                if (inputElement && inputElement.value.trim() !== '') {
                  labelElement?.classList.add('focused');
                }

                e.addEventListener('focusin', function () {
                  labelElement?.classList.add('focused');
                });

                e.addEventListener('focusout', function () {
                  labelElement?.classList.remove('focused');

                  if (inputElement && inputElement.value.trim() !== '') {
                    labelElement?.classList.add('focused');
                  }
                });
              });

              // Postal code custom logic
              const zipInput = document.querySelectorAll('.hs_zip');
              zipInput.forEach((zip2) => {
                const zip = zip2.querySelector('input[name="zip"]');

                zip.addEventListener('input', () => {
                  // runLogic(zip, zip2);
                });
              });

              function runLogic(zip, zip2) {
                const zipValue = zip.value.trim();
                const zipRegex = /^\d{4}[a-zA-Z]{2}$/;

                const errorContainer = zip2.querySelector('.hs-error-msgs');

                if (!zipRegex.test(zipValue)) {
                  zip.classList.add('invalid', 'error');

                  if (!errorContainer) {
                    const errorMessage = `
                        <ul class="no-list hs-error-msgs inputs-list" role="alert">
                          <li>
                            <label class="hs-error-msg hs-main-font-element">Verplicht veld</label>
                          </li>
                        </ul>
                      `;

                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = errorMessage;

                    zip2.appendChild(tempDiv);
                  } else {
                    console.log('ACA????');
                    const label = zip2.querySelector('.hs-error-msgs li label.hs-error-msg');
                    if (!label) return;
                    // label.textContent = `Voer een geldige postcode in`;
                  }
                } else {
                  zip.classList.remove('invalid', 'error');

                  const existingError = document.querySelector('.hs-error-msgs');
                  if (existingError) {
                    existingError.remove();
                  }
                }
              }
            },
          });
        }}
        onError={(e) => console.error(e)}
      />

      <div id={`hubspotForm-${id}`} className={`form-hubspot ${style ? style : ''}`}></div>
    </>
  );
};

export default HubspotForm;
