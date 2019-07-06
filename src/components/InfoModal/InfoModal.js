import React, { useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserDataContext } from '../../js/context';
import './InfoModal.scss';



const InfoModal = ({ content, error }) => {

    const userDataContext = useContext(UserDataContext);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeout(() => userDataContext.setInfoModal(false), 5000);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);


    return (
        <div className="info-modal-container">
            <div className={`info-modal ${error ? 'info-modal-error' : 'info-modal-success'}`}>
                {error ?
                    <FontAwesomeIcon className="info-modal-ico" icon="times" /> :
                    <FontAwesomeIcon className="info-modal-ico" icon="angle-down" />
                }
                <span>{content}</span>
            </div>
        </div>
    );
}

export default InfoModal;