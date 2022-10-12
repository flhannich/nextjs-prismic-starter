import { RichText } from "prismic-reactjs";


async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });
    return response.json();
  }


  
export const send = (url, formData, setFormData) => {
    let hasErrors = checkForFormErrors(formData, setFormData);

    if(hasErrors) {
        setFormData({
            ...formData,
            hasErrors: true
        })
        return false
    } 
    
    setFormData({
        ...formData,
        sending: true,
        hasErrors: false,
    })
    
    postData(url, formData)
        .then(res => {
            if(!res.success) {
                setFormData({
                    ...formData,
                    sent: false,
                    sending: false,
                    hasErrors: false,
                    serverError: true,
                })
            } else {
                setFormData({
                    ...formData,
                    sent: true,
                    sending: false,
                    success: true,
                    hasErrors: false,
                    serverError: false,
                })
            }
        }).catch( (err) => {
            console.error(err);
            setFormData({
                ...formData,
                sending: false,
                hasErrors: false,
                serverError: true,
            })
        })

}


export const checkForFormErrors = (formData, setFormData) => {
    let arr = [];

    for (const [key, value] of Object.entries(formData.data)) {
        arr.push(value.valid);
    }

    let hasErrors = arr.includes(false);

    return hasErrors;
}


export const generateID = () => {
    return Math.random().toString(16).slice(2)
} 


export const checkFormProps = formfields => {
    return {
        submit_label: formfields.submit_label ? formfields.submit_label : 'No label definded',
        success_title: formfields.success_message_title ? RichText.asText(formfields.success_message_title) : 'No success title definded',
        success_description: formfields.success_message_description ? RichText.asText(formfields.success_message_description) : 'No success description definded',
        error_message: formfields.error_message ? RichText.asText(formfields.error_message) : 'No error message definded',
        items: formfields.slices.map(item => {
            return ({
                type: item.slice_type,
                data: item.primary,
                items: item.items
            })
        }) || []
    }
} 


export const checkProps = props => {

    return {
        name: props.data.name || generateID(),
        label: props.data.label || 'no label defined',
        placeholder: props.data.placeholder || false,
        optional: props.data.optional || false,
        type: props.data.type || false,
        style: props.data.style || null,
        multiple: props.data.multiple || false,
        rangeUnit: props.data.unit || 'no unit defined',
        rangeMin: props.data.min_value || null,
        rangeMax: props.data.max_value || null,
        rangeDefault: props.data.default_value || null,
        error_message_failed: props.data.error_message_failed || 'no failed message defined',
        error_message_missing: props.data.error_message_missing || 'no missing message defined',
        items: props.items || [],
    }
}
