import '../style/button.css'; 
import React from 'react';
import PropTypes from 'prop-types';
const MyButton = ({ message }) => {
    // Function to handle button click
    const handleClick = () => {
        alert('Button clicked!');
    };

    return (
        <div>
            <h1>React Button Component</h1>
            <p>Message: {message}</p>
            <button className="btn"  onClick={handleClick} label="Click Me"  />
        </div>
    );
};
MyButton.propTypes = {
    message: PropTypes.string.isRequired,
};
export default MyButton;