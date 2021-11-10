import {PAGE_PRIMARY_COLOR} from "../../../constants/colors";
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

const CourseNameTextField = styled(TextField)({
    width: 400,
    margin: 10,


    '& label.Mui-focused': {
        color: PAGE_PRIMARY_COLOR,
        borderWidth: 2,
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: PAGE_PRIMARY_COLOR,
        color: PAGE_PRIMARY_COLOR,
        borderWidth: 2,
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: PAGE_PRIMARY_COLOR,
            color: PAGE_PRIMARY_COLOR,
            borderWidth: 2,
        },
        '&:hover fieldset': {
            borderColor: PAGE_PRIMARY_COLOR,
            color: PAGE_PRIMARY_COLOR,
            borderWidth: 2,
        },
        '&.Mui-focused fieldset': {
            borderColor: PAGE_PRIMARY_COLOR,
            color: PAGE_PRIMARY_COLOR,
            borderWidth: 2,
        },
        borderRadius: 15,
    },
});

export {CourseNameTextField}