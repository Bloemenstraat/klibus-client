import React, { useState, useRef } from "react";
import axios from "axios";
import { Center, Input, Select, Textarea, Button, Box, Stack, VStack, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Heading, FormControl, FormErrorMessage } from '@chakra-ui/react';
import pageVariant from "../etc/animations";
import { motion } from "framer-motion";
import { Navigate, useNavigate } from "react-router-dom";
import cats from '../etc/cats.json';
import dogs from '../etc/dogs.json';
import { useForm } from "react-hook-form";
import { AddIcon } from "@chakra-ui/icons";
//////////////////import '../App.css'

const AddPost = () => {
    const {register, setError, watch, handleSubmit, formState: {errors}} = useForm();

    const [animal, setAnimal] = useState('cat');
    const [isPending, setPending] = useState(false);
    const breeds = {
        cat: cats,
        dog: dogs
    };
    const url = `${process.env.REACT_APP_API_ADDRESS}/api/posts`;

    //Alert dialog variables
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => {
        setIsOpen(false);
        navigate('/');
    };
    const redirectRef = useRef();

    const submitPost = () => {
        //console.log(e)
        //e.preventDefault();
        setPending(true);
        const form = document.querySelector('#addpost')

        const fd = new FormData();

        fd.append('title', form.title.value);
        fd.append('animal', form.animal.value);
        fd.append('breed', form.breed.value);
        fd.append('category', form.category.value);
        fd.append('description', form.description.value);
        fd.append('image', form.image.files[0], form.image.value);

        //'Content-Type': 'multipart/form-data'
        axios.post(url, fd, {
            headers: {
                'auth-token': localStorage.getItem('klibus-jwt'),
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            setPending(false);
            setIsOpen(true);
        })
        .catch(e => {
            console.log('Error');
            setPending(false);
        });
    };
   
    return ( 
        <motion.div className="form-page" variants={pageVariant} initial='initial' animate='animate' exit='exit'>
            <Box borderRadius='ls' borderWidth='1px' p='6' >
            <Center><Heading pb='8'>Add a new Post</Heading></Center>
            <form onSubmit={handleSubmit(submitPost)} id="addpost">
                <Stack w='40vw'>
                    
                    <FormControl isInvalid={errors.title}>                
                        <Input  
                        placeholder="Titre"
                        name="title" 
                        {...register('title', {required: 'You have to set a title', minLength: {value: 10, message: 'The title must be at least 10 characters long'}})} 
                        />
                        {errors.title && <FormErrorMessage>{errors.title.message}</FormErrorMessage>}
                    </FormControl>

                    
                    <Select onChange={(e)=>setAnimal(e.target.value)} name="animal">
                        <option value="cat">Cat</option>
                        <option value="dog">Dog</option>
                    </Select>
                    
                    
                    <Select name="breed">
                        {breeds[animal].map((e, i) => {
                            return (<option key={i}>{e}</option>);
                        })}           
                    </Select>

                    
                    <Select name="category">
                        <option>Breeding</option>
                        <option>Adoption</option>
                    </Select>

                    
                    <Input type='file' name='image'/>
                    <Button leftIcon={<AddIcon/>} onClick={() => {document.querySelector('input[name=image]').click()}}>Upload a file</Button>
                    

                    <FormControl isInvalid={errors.description}>
                        <Textarea 
                        placeholder="Describe blabla..."
                        name="description" 
                        {...register('description', {required: 'A description is required', minLength: {value: 20, message: 'You must describe your pet in at least 20 characters.'}})}
                        />
                        {errors.description && <FormErrorMessage>{errors.description.message}</FormErrorMessage>}
                    </FormControl>
                    {!isPending && <Button colorScheme='teal' type='submit'>Submit Announcement</Button>}
                    {isPending && <Button colorScheme='teal' isLoading>Submiting...</Button>}
                </Stack>
            </form>
                    </Box>

            <AlertDialog isOpen={isOpen} closeOnOverlayClick={false} leastDestructiveRef={redirectRef}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader>Publié avec succès</AlertDialogHeader>
                        <AlertDialogBody>Votre publication est en ligne</AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={onClose} ref={redirectRef} colorScheme='teal'>Go home</Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </motion.div>
     );
}
 
export default AddPost;