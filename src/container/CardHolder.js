import React, { useState, useRef, useCallback } from 'react';
import CreditForm from '../components/CreditForm/CreditForm';
import CreditCard from '../components/CreditCard/CreditCard';
import { message, notification } from 'antd';

const initialState = {
    cardNumber: '#### #### #### ####',
    cardHolder: 'FULL NAME',
    cardMonth: '',
    cardYear: '',
    cardCvv: '',
    isCardFlipped: false,
    sumbitEnable : false,
};

const CardHolder = () => {
    const [state, setState] = useState(initialState);
    const [currentFocusedElm, setCurrentFocusedElm] = useState(null);

    const updateStateValues = useCallback(
        (keyName, value) => {
            setState({
                ...state,
                [keyName]: value || initialState[keyName]
            });
        },
        [state]
    );

    // Resfs are for the Form Inputs to focus corresponding inputs.
    let formFieldsRefObj = {
        cardNumber: useRef(),
        cardHolder: useRef(),
        cardDate: useRef(),
        cardCvv: useRef()
    };

    let focusFormFieldByKey = useCallback((key) => {
        formFieldsRefObj[key].current.focus();
    });

    // This are the references for the Card DIV elements.
    let cardElementsRef = {
        cardNumber: useRef(),
        cardHolder: useRef(),
        cardDate: useRef()
    };

    let onCardFormInputFocus = (_event, inputName) => {
        const refByName = cardElementsRef[inputName];
        setCurrentFocusedElm(refByName);
    };

    let onCardInputBlur = useCallback(() => {
        setCurrentFocusedElm(null);
    }, []);

    let submitClicked = () =>{
        let { cardNumber,cardHolder,cardCvv,cardYear,cardMonth} = state
        if(cardHolder === 'FULL NAME' || cardMonth === '' || cardYear === '' || cardCvv === '' || cardNumber === '#### #### #### ####'){
            return notification.warning({
                message: `Card Information Pending`,
                description: 'Please fill the required information',
              });
        }
        notification.info({
            message: `Card Information`,
            description: `Card Number : ${cardNumber}
            Card Holder : ${cardHolder}
            Card Year : ${cardMonth} ${cardYear}
            Card CVV : ${cardCvv}`,
          });
        message.success('Card information collected')
    }

    return (
        <div className="wrapper">
            <CreditForm
                cardMonth={state.cardMonth}
                cardYear={state.cardYear}
                onUpdateState={updateStateValues}
                cardNumberRef={formFieldsRefObj.cardNumber}
                cardHolderRef={formFieldsRefObj.cardHolder}
                cardDateRef={formFieldsRefObj.cardDate}
                onCardInputFocus={onCardFormInputFocus}
                onCardInputBlur={onCardInputBlur}
                submitClicked={submitClicked}
            >
                <CreditCard
                    cardNumber={state.cardNumber}
                    cardHolder={state.cardHolder}
                    cardMonth={state.cardMonth}
                    cardYear={state.cardYear}
                    cardCvv={state.cardCvv}
                    isCardFlipped={state.isCardFlipped}
                    currentFocusedElm={currentFocusedElm}
                    onCardElementClick={focusFormFieldByKey}
                    cardNumberRef={cardElementsRef.cardNumber}
                    cardHolderRef={cardElementsRef.cardHolder}
                    cardDateRef={cardElementsRef.cardDate}
                ></CreditCard>
            </CreditForm>
        </div>
    );
};

export default CardHolder;
