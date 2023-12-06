import React from 'react';
import formVector from '../../Icons/form-vector.svg';
import HubspotForm from '../HubspotForm/HubspotForm';

import './styles.scss';

function FormBlock({ block }) {
  const { title, hubspot } = block;

  return (
    <div className={`form-block`}>
      <img className="left-img" src={formVector} alt="Form icon" />

      <div className="container">
        <div className="form-container-content">
          <div className={`row ${!title ? 'justify-content-center' : 'align-items-center'}`}>
            {title && (
              <div className="col-lg-3">
                <h2>{title}</h2>
              </div>
            )}

            {/* Hubspot form */}
            <div>
              <HubspotForm
                id={hubspot.id}
                formId={hubspot.formId}
                region={hubspot.region}
                portalId={hubspot.portalId}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormBlock;
