import {
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    updateEmail,
    updatePassword
} from "firebase/auth";
import {auth} from "../firebase";

const createNewAccount = async ({userName, email, password, avatarUrl}) => {
    if(!userName.trim()){
        throw new Error('Please enter your username.')
    }

    try{
        await createUserWithEmailAndPassword(auth, email.trim(), password.trim());
    }
    catch(e){
        let error;

        switch (e.code) {
            case 'auth/email-already-in-use':
                error = new Error('Email already exists.');
                break;
            case 'auth/invalid-email':
                error = new Error('Invalid email address');
                break;
            case 'auth/weak-password':
                error = new Error('Invalid password.');
                break;
            default:
                error = new Error('Incorrect values have been entered.')
                break;
        }
        throw error;
    }

    const currentUser = auth.currentUser;

    try{
        await updateProfile(currentUser, {
            displayName: userName.trim(),
            photoURL: avatarUrl.trim(),
        })
    }catch (e) {
        console.log('Error - unable to write user info to db');
    }
}

const logInToAccount = async ({email, password}) => {
    try{
        await signInWithEmailAndPassword(auth, email.trim(), password.trim());
    }catch (e) {
        let error;

        switch (e.code) {
            case 'auth/invalid-email':
                error = new Error('The email address is not valid.');
                break;
            case 'auth/user-not-found':
                error = new Error('There is no user corresponding to the given email.');
                break;
            case 'auth/wrong-password':
                error = new Error('The password is invalid.');
                break
            default:
                error = new Error('Incorrect values have been entered. ssssssssss')
                break;
        }

        throw error;
    }
}

const updateAccountDate = async ({email, password, avatarUrl, userName}) => {

    if(!userName){
        throw new Error('Please enter user name.')
    }

    if(!email){
        throw new Error('Please enter email address.')
    }

    const user = auth.currentUser;
    try{
        if(user){
            if(user.photoURL !== avatarUrl || user.displayName !== userName){
                await updateProfile(user, {
                    displayName: userName,
                    photoURL: avatarUrl
                })
            }

            if(user.email !== email){
                await updateEmail(user, email);
            }

            if(password){
                await updatePassword(user, password);
            }
        }
    }catch(error){
        throw new Error('Unable to update user information.')
    }



}

export {createNewAccount, logInToAccount, updateAccountDate}