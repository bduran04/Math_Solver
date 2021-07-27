import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import { IconButton, InputBase, MenuItem } from '@material-ui/core';
import API from '../utils/api';

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

const AddBtn = ({equation}) => {
    const classes = useStyles();
    const history = useHistory();

    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [selectedStudyGuideIndex, setSelectedStudyGuideIndex] = useState(0)
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        retrieveUserData()
    }, []);

    async function retrieveUserData() {
        try {
            const user = await API.currentUser()
            setUserData(user)
        } catch (err) {
            console.log(err)
        }
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const updateStudyGuide = async (event) => {
        event.preventDefault();
        userData.user.studyGuides[selectedStudyGuideIndex].problems.push(equation);
        const studyGuide = await API.updateStudyGuide(userData.user.studyGuides[selectedStudyGuideIndex]);
        if (studyGuide.success === 200) {
            window.alert("equation Added successfully");
            history.push("/dashboard");
        }
    };

    const handleChange = (event) => {
        console.log(event.target.value)
        setSelectedStudyGuideIndex(event.target.value);
      };

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                disabled={!equation}
                onClick={handleClickOpen}>
                <AddIcon />
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Where would you like to add this equation?</DialogTitle>

                <DialogContent>
                {userData.user && <form className={classes.container}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="demo-customized-select-label"></InputLabel>
                            <Select
                                labelId="demo-customized-select-label"
                                id="demo-customized-select"
                                input={<BootstrapInput />}
                                value={selectedStudyGuideIndex}
                                onChange={handleChange}
                            >
                                {userData.user.studyGuides.map((studyGuide, i) => <MenuItem key={i} value={i}>{studyGuide.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </form>}
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={updateStudyGuide} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddBtn;