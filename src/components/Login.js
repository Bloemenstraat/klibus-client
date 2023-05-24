import React,{ useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Center, Button, Input, Stack, Box, Heading, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogBody, FormControl, FormErrorMessage } from "@chakra-ui/react";
import pageVariant from "../etc/animations";
import { motion } from "framer-motion";

const dogBreeds = require('../etc/dogs.json');
const catBreeds = require('../etc/cats.json');

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPending, setPending] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passError, setPassError] = useState(false);
    const navigate = useNavigate();

    //Alert dialog variables
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => {
        setIsOpen(false);
        navigate('/');
    };
    const redirectRef = useRef();

    const login = async (e) => {
        e.preventDefault();
        setPending(true);
        const loginInfo = {username, password};
        setUsernameError(false);
        setPassError(false);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_ADDRESS}/api/users/login`, loginInfo, {
                headers: {'Content-Type': 'application/json'}
            });
            localStorage.setItem('klibus-jwt', response.headers['auth-token']);
            setIsOpen(true);
        }

        catch (e) {
            if (e.response.data == 'Wrong username')
                setUsernameError(true);
            else if (e.response.data == 'Wrong password')
                setPassError(true);
        }

        finally {
            setPending(false);
        }
    }

    return ( 
        <motion.div className="form-page" variants={pageVariant} initial='initial' animate='animate' exit='exit'>
            <Box borderWidth='1px' borderRadius='lg' p='6'>
                <Center><Heading pb='8'>Log in</Heading></Center>
                <form onSubmit={login}>
                    <Stack>
                        <FormControl isInvalid={usernameError}>
                            <Input 
                            name="username"                            
                            value={username}
                            onChange={(e)=> setUsername(e.target.value)} 
                            required
                            placeholder="Username"/>
                            {usernameError && <FormErrorMessage>User does not exist.</FormErrorMessage>}
                        </FormControl>

                        <FormControl isInvalid={passError}>
                            <Input 
                            name="password"
                            type='password'
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                            required
                            placeholder="Password"/>
                            {passError && <FormErrorMessage>Wrong password.</FormErrorMessage>}
                        </FormControl>

                        {!isPending && <Button colorScheme='teal' type='submit'>Login</Button>}
                        {isPending && <Button colorScheme='teal' variant='outline' loadingText="Loging" isLoading>Login</Button>}
                    </Stack>                
                </form>    
            </Box>   

            <AlertDialog closeOnOverlayClick={false} leastDestructiveRef={redirectRef} isOpen={isOpen}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader>Connected Successfully</AlertDialogHeader>
                        <AlertDialogBody>You're gonna be redirected</AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={onClose} ref={redirectRef}>Go home</Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>         
        </motion.div>        
     );
}
 
export default Login;

//TO DO: react hook forms