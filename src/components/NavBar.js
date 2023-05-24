import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Flex, Image, Img, Spacer } from '@chakra-ui/react';

const NavBar = () => {

    const token = localStorage.getItem('klibus-jwt');
    const [isAuthenticated, setAuthenticated] = useState(token ? true : false);

    const logout = () => {
        localStorage.removeItem('klibus-jwt');
        console.log('logged out');
        setAuthenticated(false);
    };

    const guest = (
    <Box m='6' p='2' borderBottom='1px' color='gray.300'>
        <Flex>            
            <Link to='/'><Image boxSize='45px' src='/dog.png' alt='Icone du site' /></Link>
            <Spacer />
            <Link to="/login"><Button m='1' size='sm' colorScheme='teal' variant='outline'> Log In </Button></Link>
            <Link to="/register"><Button m='1' size='sm' colorScheme='teal'> Register </Button></Link>
        </Flex>
    </Box>);

    const user = (
    <Box m='6' p='2' borderBottom='1px' color='gray.300' id='navbar'>
        <Flex>
            <Link to='/'><Image boxSize='45px' src='/dog.png' alt='Icone du site' /></Link>
            <Spacer />
            <Link to="/post"><Button m='1' size='sm' colorScheme='teal' variant='outline'>Add a post</Button></Link>
            <Link to="/profile"><Button m='1' size='sm' colorScheme='teal' variant='outline'>Profile</Button></Link>
            <Link to="/"><Button m='1' onClick={logout} size='sm' colorScheme='teal'>Log out</Button></Link>
        </Flex>
    </Box> );

    return ( token ? user : guest );
}
 
export default NavBar;