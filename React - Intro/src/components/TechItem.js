import React from 'react'
import propTypes from 'prop-types'

function TechItem ({handleDelete, tech}) {
    return (
            <li>
                {tech}
                <button onClick={handleDelete} type="button">Remover</button>
            </li>
            
        )
}

TechItem.defaultProps = {
    tech: 'Tecnologia Default'
}

TechItem.propTypes = {
    tech: propTypes.string,
    handleDelete: propTypes.func.isRequired
}

export default TechItem