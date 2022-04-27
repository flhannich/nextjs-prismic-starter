const Icons = (props) => {

        const Icon = require(`@public/icons/${props.name}.svg`).default;

        return ( 
                <Icon />
        )
}

export default Icons;