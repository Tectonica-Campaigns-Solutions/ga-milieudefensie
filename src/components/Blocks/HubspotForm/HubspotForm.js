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
          });

          // Handlers
          setTimeout(() => {
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
          }, 1500);
        }}
        onError={(e) => console.error(e)}
      />

      <div id={`hubspotForm-${id}`} className={`form-hubspot ${style ? style : ''}`}></div>
    </>
  );
};

export default HubspotForm;
