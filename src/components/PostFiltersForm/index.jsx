import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

PostFiltersForm.propTypes = {
    onSubmit : PropTypes.func,
};

PostFiltersForm.defaultProps = {
    onSubmit : null
}
function PostFiltersForm(props) {
    const {onSubmit} = props;
    const [searchTern, setSearchTern] = useState('')
    const typeingTimeoutRef = useRef(null)
    function handleSearchTernChange(e) {
        const value = e.target.value;
        setSearchTern(value);
        if(!onSubmit) return;
        if(typeingTimeoutRef.current) {
            clearTimeout(typeingTimeoutRef.current)
        }
        // using debounce
        typeingTimeoutRef.current = setTimeout(() => {
            const formValues = {
                searchTern : value,
            }
            onSubmit(formValues)            
        }, 1000);
    }
    return (
        <form>
            <input type="text" 
            value={searchTern}
            onChange={handleSearchTernChange}
            />
        </form>
    );
}

export default PostFiltersForm;