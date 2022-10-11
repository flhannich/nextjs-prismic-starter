import sharedStyles from '../Form.module.scss';


const SelectSingle = ({data, valid, handler}) => {

    return (
        <select 
            name={data.name} 
            placeholder={data.placeholder} 
            onChange={handler}
            className={valid === false ? sharedStyles.hasError : ''}
        >
        {data.items && data.items.map((item, index) => (
            <option key={index} value={item.value || item.name}>{item.name}</option>
        ))}
    </select>
    )
}

export default SelectSingle;