import React, { useState, useEffect } from 'react';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

//clean this up as an arrown function 
export default function SearchBar({onSubmit, equation, setEquation}) {
    //refactor and use local storage instead of cookies
    const cookie = localStorage.getItem("equation")

    const handleClick = () => {
        localStorage.setItem("equation", equation);
        onSubmit(equation);
    };

    useEffect(() => {
        setEquation(cookie)
        handleClick();
    }, [])

    return (
        <>
            <Paper>
                <InputBase color="primary" defaultValue={cookie} onChange={(e) => setEquation(e.target.value)} />
                <IconButton onClick={handleClick}>
                    <SearchIcon />
                </IconButton>
            </Paper>
        </>
    )
}
