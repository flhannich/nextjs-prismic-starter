const Submit = (props) => {

    return (
        <div className="form-submit">
            <button 
                type="submit" 
                disabled={props.disabled} 
                onClick={props.handler}
            >
                {props.sending 
                    ?  <>Sending....</>
                    :  <>{props.text}</>
                }
            </button>
        </div>
    )
}

export default Submit;

