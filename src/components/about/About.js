import React, {useEffect} from 'react'
import {useDispatch} from "react-redux";

import {activateAboutMenu} from "../../redux/common/menuStatus/actions";
import AboutContent from "./AboutContent";

export default function About() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(activateAboutMenu());
    }, [dispatch])

    return (
        <>
            <AboutContent />
        </>
    )
}