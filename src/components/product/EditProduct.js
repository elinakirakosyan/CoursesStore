import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {StyledButton} from "../customized/StyledButton";
import {makeStyles} from "@mui/styles";

import image404 from "../../assets/img/404Error.jpg";
import {PAGE_PRIMARY_COLOR, PAGE_SECONDARY_COLOR} from "../../constants/colors";
import {MAIN_ROUTE, USER_PRODUCTS_ROUTE} from "../../constants/routes";
import {CourseNameTextField} from "../user/customizedTextFields/courseNameTextField";
import {DescriptionTextField, ImageUrlTextField, PriceTextField} from "../user/customizedTextFields";
import {getProductById, updateProductById} from "../../controllers/productCotrollers";
import {setRenderProject} from "../../redux/common/renderProject";
import CustomCircularProgress from "../customized/CustomCircularProgress";

const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;

const useStyles = makeStyles(() => {
    return {
        main: {
            display: "flex",
            justifyContent: "center",
        },
        wrapper: {
            marginTop: 30,
            display: "flex",
            justifyContent: "center",
            height: 650,
            width: 600,
            backgroundColor: PAGE_SECONDARY_COLOR,
            borderRadius: 15,

        },
        container:{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",

        },
        form: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
        },
        buttonSection: {
            marginTop: 10,
            display: "flex",
            justifyContent: "center",
        },
        errorMessage:{
            display: "flex",
            justifyContent: "center",
            color: "red",
            fontFamily: "sans-serif",
            fontSize: 15
        },
        textFieldBlock:{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
        },
        text:{
            fontFamily: "sans-serif",
            fontSize: 20,
            color: PAGE_PRIMARY_COLOR,

        },
        h1: {
            textAlign: "center",
            color: PAGE_PRIMARY_COLOR
        },
        priceTextField: {
            paddingRight: 260

        },
        page404: {
            flex: '100%',
            alignContent: "center"
        }
    }
})

const renderEditPage = ({
                            isProductDataGet,
                            classes,
                            handleSubmit,
                            courseName,
                            setCourseName,
                            description,
                            setDescription,
                            imageUrl,
                            setImageUrl,
                            price,
                            setPrice,
                            errorMessage
                        }) => {
    if(isProductDataGet){
        return (
            <div className={classes.wrapper}>
                <div className={classes.container}>
                    <h1 className={classes.h1}>Edit Product</h1>
                    <form onSubmit={handleSubmit} className={classes.form}>
                        <div className={classes.textFieldBlock}>
                            <span className={classes.text}>Course Name: </span>
                            <CourseNameTextField value={courseName}
                                                 onChange={e => setCourseName(e.target.value)}/>
                        </div>
                        <div className={classes.textFieldBlock}>
                            <span className={classes.text}>Description: </span>
                            <DescriptionTextField
                                multiline={true}
                                maxRows={8}
                                minRows={8}
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </div>
                        <div className={classes.textFieldBlock}>
                            <span className={classes.text}>Image url: </span>
                            <ImageUrlTextField value={imageUrl}
                                               onChange={e => setImageUrl(e.target.value)}/>
                        </div>
                        <div className={classes.textFieldBlock}>
                            <span className={classes.text}>Price ($):</span>
                            <span className={classes.priceTextField}>
                                    <PriceTextField type={'number'} value={price}
                                                    onChange={e => setPrice(e.target.value)}/>
                                </span>
                        </div>


                        <div className={classes.errorMessage}>
                            {errorMessage
                                ? errorMessage
                                : <span style={{color:PAGE_SECONDARY_COLOR}}>hint</span> }
                        </div>

                        <div className={classes.buttonSection}>
                            <StyledButton variant="contained" type="submit">Update</StyledButton>
                        </div>
                    </form>
                </div>
            </div>
        )
    }else {
        return <CustomCircularProgress />;
    }
}

function EditProduct({id = null}) {
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [courseName, setCourseName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [imageUrl, setImageUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [show404Page, setShow404Page] = useState(false);
    const [isProductDataGet, setIsProductDataGet] = useState(false);

    useEffect( () => {
        if(!id){
            setShow404Page(true);
        }else{
            (async function () {
                try{
                    const product = await getProductById(id.productID);
                    setIsProductDataGet(true);
                    setCourseName(product.courseName);
                    setDescription(product.description);
                    setImageUrl(product.imageUrl);
                    setPrice(product.price);
                }catch (e) {
                    console.log(e.message);
                    history.push(MAIN_ROUTE);
                    dispatch(setRenderProject());
                }
            })()
        }
    }, [dispatch, history, id])


    const handleSubmit = async (event) => {
        event.preventDefault();

        setCourseName(courseName.trim());
        setDescription(description.trim());
        setImageUrl(imageUrl.trim());

        if(!courseName || !description || !imageUrl){
            setErrorMessage('Please complete all fields.');
            return;
        }

        try{
            await updateProductById(id.productID, {
                courseName,
                description,
                imageUrl,
                price
            })

            history.push(USER_PRODUCTS_ROUTE);
            dispatch(setRenderProject());
        }catch (e) {
            setErrorMessage("Cant update product information.");
        }
    }

    return (
        <div className={classes.main}>
            {show404Page
                ? <div className={classes.page404}>
                    <img  src={image404} alt="404 Page" height={windowHeight * 11 / 12} width={windowWidth}/>
                </div>
                :renderEditPage({
                    isProductDataGet,
                    classes,
                    handleSubmit,
                    courseName,
                    setCourseName,
                    description,
                    setDescription,
                    imageUrl,
                    setImageUrl,
                    price,
                    setPrice,
                    errorMessage
                })
            }
        </div>
    )
}

export default EditProduct;