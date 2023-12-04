import React from 'react';
import Everyaction from '../Everyaction/Everyaction';

import './styles.scss';

function FormBlock({ block }) {
  const { title, variant, backgroundLeftImage, backgroundRightImage, formEveryAction } = block;

  return (
    <div className={`form-block ${variant ? variant : ''}`}>
      {backgroundLeftImage?.url && <img className="left-img" src={backgroundLeftImage.url} alt="Countdown left bg" />}

      <div className="container">
        <div className="form-container-content">
          <div className={`row ${!title ? 'justify-content-center' : 'align-items-center'}`}>
            {title && (
              <div className="col-lg-2">
                <h2 className="text-with-border-color">
                  <span>{title}</span>
                </h2>
              </div>
            )}

            {formEveryAction && formEveryAction[0] && (
              <div className={`${!title ? 'col-lg-11' : 'col-lg-10'} form-abs`}>
                <Everyaction block={formEveryAction[0]} />
              </div>
            )}
          </div>
        </div>
      </div>

      {backgroundRightImage?.url && (
        <img className="right-img" src={backgroundRightImage.url} alt="Countdown left bg" />
      )}
    </div>
  );
}

export default FormBlock;
