import sharedStyles from '../Form.module.scss';
import styles from './Select.module.scss';
import Modal from './../Form.modal';
import { Icons } from '@components/index';
import { useRef, useState, useContext } from 'react';
import { FormContext } from '../Form.context';
import { validateSingle } from './Select.lib';

const SelectSingle = ({data}) => {

    const { updateFormData, registerFormData, formData } = useContext(FormContext);

    const inputRef = useRef(null);
    const [modalState, setModalState] = useState(false);
 
    
    const handleSingleSelect = item => {
        let obj = {
            name: data.name,
            value: item.value
        }
        inputRef.current.value = item.name;
        let res = validateSingle(item.value, data.optional)
        updateFormData(obj, res)
        setModalState(false);
    }
    
    
    const handleClick = () => {
        setModalState(!modalState);
    }
    

    
    const resetDateSelection = () => {
        handleSingleSelect({ value: '', name: '' })
    }

    return (
        
        <div className={styles.singleContainer}>

            <input 
                ref={inputRef}
                type="text"
                placeholder={data.placeholder}
                onClick={() => handleClick()}
            />
            
            {formData.data[data.name]?.message === ''
            ?   <div className={sharedStyles.symbol}>
                    <Icons name="arrow"/>
                </div>
            :    <div 
                    className={sharedStyles.reset}
                    onClick={() => resetDateSelection()}
                >
                    <Icons name="close"/>
                </div>
            }
            
            <Modal
                state={modalState}
                setState={setModalState}
                style="default"
            >
                {data.items && data.items.map((item, index) => (
                    <div 
                        key={index}
                        className={styles.holder}
                        onClick={() => handleSingleSelect(item)}
                    >
                        <span data-value={item.value || item.name}>{item.name}</span>
                    </div>
                ))}
            </Modal>

        </div>
        
    )
}

export default SelectSingle;