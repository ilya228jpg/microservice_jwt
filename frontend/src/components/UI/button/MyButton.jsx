import React, {useState} from 'react';
import classes from "./MyButton.module.css";
const MyButton = ({children, ...props}) => {
    useState();
    return (
        <button {...props} className={classes.MyBtn}>
            {children}
        </button>
    );
};

export default MyButton;