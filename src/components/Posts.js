import { Heading, Button, Center, HStack, Select, SimpleGrid, FormLabel, ButtonGroup, IconButton, Icon } from '@chakra-ui/react';
import {ArrowLeftIcon, ChevronLeftIcon, ArrowRightIcon, ChevronRightIcon} from '@chakra-ui/icons';
import axios from 'axios';
import { Link } from "react-router-dom";
import Post from './Post';
import cats from '../etc/cats.json';
import dogs from '../etc/dogs.json';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Posts = (props) => {
    let [breeds, setBreeds] = useState([]);
    let [allPosts, ...rest] = useState(props.content);

    let [page, setPage] = useState(1);
    let postsPerPage = 9;
    
    let endIndex = postsPerPage*page;
    let startIndex = endIndex-postsPerPage;
    let numPages = Math.ceil(props.content.length / postsPerPage);

    const search = async (e) => {
        e.preventDefault();
        let newContent = allPosts;

        //Check for animal
        if (e.target.animal.value != 'All')
            newContent = newContent.filter(post => post.animal == e.target.animal.value.toLowerCase());

        //Check for category
        if (e.target.category.value != 'All')
            newContent = newContent.filter(post => post.category == e.target.category.value);

        //Check for breed
        if (e.target.breed.value != 'All')
            newContent = newContent.filter(post => post.breed == e.target.breed.value);
    

        props.setContent(newContent);
    };

    const switchBreeds = (e) => {
        if (e.target.value == "Dog")
            setBreeds(dogs);
        else if (e.target.value == "Cat")
            setBreeds(cats);
        else
            setBreeds([])
    }

    return ( 
    <div className="announcements">
        <Center><Heading mt={12} mb={24}>Annoucements</Heading></Center>
        <div className="searchbar">
            <Center>
                <HStack width='80vw'>
                    <form onSubmit={search}>
                        <FormLabel>Animal: </FormLabel>
                        <Select name='animal' w={200} mr={6} onChange={switchBreeds}>
                            <option>All</option>
                            <option>Cat</option>
                            <option>Dog</option>
                        </Select>

                        <FormLabel>Breed: </FormLabel>
                        <Select name='breed' w={200} mr={6}>
                            {['All', ...breeds].map((breed) => {
                                return (<option key={breed}>{breed}</option>);
                            })}
                        </Select>

                        <FormLabel>Category: </FormLabel>
                        <Select name='category' w={200} mr={6}>
                            <option>All</option>
                            <option>Breeding</option>
                            <option>Adoption</option>
                        </Select>
                        
                        <Button colorScheme='teal' type='submit'>Search</Button>
                    </form>
                </HStack>
            </Center>
        </div>

        <Center>
            <SimpleGrid w='70vw' columns={3} spacingX={3} spacingY={10} pb={5}>
                {props.content.slice(startIndex, endIndex).map((e, i) => {
                    //return <Link key={e._id} to={`/details/${e._id}`}><Post animal={e}/></Link>;
                    return <Post animal={e} key={e._id}/>;
                })}        
            </SimpleGrid>        
        </Center>

        <Center>
            <ButtonGroup spacing='2' > 
                {
                    (page > 1) && <IconButton icon={<ArrowLeftIcon/>} borderRadius='100%' variant='ghost' onClick={() => setPage(1)}>d</IconButton>
                }
                {
                    (page > 1) && <IconButton icon={<ChevronLeftIcon/>} borderRadius='100%' variant='ghost' onClick={() => setPage(page-1)}>d</IconButton>
                }

                {[...Array(numPages).keys()].map((e) =>{
                    let variant = e==page-1 ? 'solid' : 'ghost';
                    console.log(e)
                    if (e > page+2 || e < page-4)
                        return
                    return (<Button borderRadius='100%' variant={variant} key={e+1} onClick={() => setPage(e+1)}>{e+1}</Button>)
                })}

                {
                    (page < numPages) && <IconButton icon={<ChevronRightIcon/>} borderRadius='100%' variant='ghost' onClick={() => setPage(1)}>d</IconButton>
                }
                {
                    (page < numPages) && <IconButton icon={<ArrowRightIcon/>} borderRadius='100%' variant='ghost' onClick={() => setPage(page-1)}>d</IconButton>
                }
            </ButtonGroup>
        </Center>
    </div> 
);
}
 
export default Posts;