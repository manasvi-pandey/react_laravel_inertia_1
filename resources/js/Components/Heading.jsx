import React from "react";

export default function Heading({ children, className, ...otherProps }) {
    const classes = `text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl ${
        className ? className : ""
    }`;
    
    return (
        <h1 className={classes} {...otherProps}>
            {children}
        </h1>
    );
}
