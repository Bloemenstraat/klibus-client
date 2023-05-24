import { AlertDialog, AlertDialogBody, AlertDialogContent, Stack, Center, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, FormControl, FormErrorMessage, Heading, Input, VStack } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import pageVariant from "../etc/animations";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import validator from 'validator';
import axios from "axios";

const Register = () => {

    const [isPending, setPending] = useState(false);
    const {register, setError, watch, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();

    //Dialog variables
    const [isOpen, setIsOpen] = useState(false);
    const redirectRef = useRef();
    const onClose = () => {
        setIsOpen(false);
        navigate('/login');
    };

    //Validation functions
    const validateEmail = (email) => {
        if (!validator.isEmail(email))
            return 'Please enter a valid email address.';
        return true;
    };

    const validatePassword = (password) => {
        if (watch('password') !== password) 
            return 'Passwords not matching.';
        return true;
    };

    const addUser = async () => {
        setPending(true);

        const newUser = {
            username: watch('username'), 
            password: watch('password'), 
            email: watch('email')
        };
        
        axios.post(`${process.env.REACT_APP_API_ADDRESS}/api/users/register`, JSON.stringify(newUser), {
            headers: {'Content-Type': 'application/json'}
        })
        .then(() => {
            setPending(false);
            setIsOpen(true);
        })
        .catch((e) => {
            setError('userExists', {type: 'custom', message: e.response.data})
            setPending(false);
        });
    };

    return ( 
        <motion.div className="form-page" variants={pageVariant} initial='initial' animate='animate' exit='exit'>            
            <Box borderRadius='lg' borderWidth='1px' p='6'>
                <Center><Heading pb='8'>Register a new account</Heading></Center>
                <form onSubmit={handleSubmit(addUser)}>
                    <Stack w='100%'>
                    <FormControl isInvalid={errors.username || errors.userExists}>
                        <Input 
                        name='username'
                        placeholder='Username'
                        {...register('username', {required: 'Username Required.', minLength: {value: 5, message: 'The username must be at least 5 characters long.'}})}
                         />
                        {errors.username && <FormErrorMessage>{errors.username.message}</FormErrorMessage>}
                        {errors.userExists && <FormErrorMessage>{errors.userExists.message}</FormErrorMessage>}
                    </FormControl>

                    <FormControl isInvalid={errors.email}>
                        <Input
                        name='email'
                        placeholder='Email' 
                        {...register('email', {required: 'Email address required', validate: validateEmail})}
                         />
                        {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}
                    </FormControl>
                    
                    <FormControl isInvalid={errors.password}>
                        <Input 
                        name='password'
                        type="password"
                        placeholder='Select password'
                        {...register('password', {required: 'Please enter a password', minLength: {value: 6, message: 'Password must be at least 6 characters long.'}})}                
                        />
                        {errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
                    </FormControl>

                    <FormControl isInvalid={errors.confirm}>
                        <Input 
                        name='confirm'
                        type="password" 
                        placeholder='Confirm Password'
                        {...register('confirm', {required: 'Please confirm your password', validate: validatePassword})}
                        />
                        {errors.confirm && <FormErrorMessage>{errors.confirm.message}</FormErrorMessage>}
                    </FormControl>

                    {!isPending && <Button colorScheme='teal' type='submit'>Register now!</Button>}
                    {isPending && <Button colorScheme='teal' isLoading>Registering</Button>}
                    </Stack>
                </form>
            </Box>

            <AlertDialog closeOnOverlayClick={false} leastDestructiveRef={redirectRef} isOpen={isOpen}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader>Registered Successfully</AlertDialogHeader>
                        <AlertDialogBody>You're gonna be redirected</AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={onClose} ref={redirectRef}>Log in</Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>   
        </motion.div>
     );
}

export default Register;