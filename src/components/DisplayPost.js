import { Box, Center, Divider, Heading, Image, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import klibou from '../media/klibou.jpg';
import Comments from './Comments';

const DisplayPost = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [numComments, setNumComments] = useState('');
    const [filename, setFilename] = useState('7e36f7e128a50908433f4929eb574986');
    const [image, setImage] = useState('');
    const {id: postId} = useParams();

 
     //useEffect???? or USEFETCH

    //Ca marche meme au mouting initial du composant. Comment gérer ça?
    useEffect(() => {
        const getPost = async () => {
            let response = await axios.get(`${process.env.REACT_APP_API_ADDRESS}/api/posts/${postId}`);
            setTitle(response.data.title);
            setDescription(response.data.description);
            setAuthor(response.data.author);
            setNumComments(response.data.numComments);

            response = await axios.get(`${process.env.REACT_APP_API_ADDRESS}/api/posts/images/${response.data.image}`, {responseType: 'blob'})
   
            let blob = new Blob([response.data], {type: 'image/png'});
            let url = URL.createObjectURL(blob);
            setImage(url);
        }

        getPost();
        

    }, []); //????
    

    return ( 
        <div className="post-page">
            <Box borderWidth='1px' borderRadius='lg' m='13' p='6'>                
                <VStack spacing={6}>                
                    <Box fontWeight='semibold' fontSize='x-large'>{title}</Box>
                    <Heading fontWeight='semibold' letterSpacing='wide' textTransform='uppercase' fontSize='xs' color='gray.500'>By: {author}</Heading>
                    <Image boxSize='300px' fit='cover' borderRadius='full' src={image} alt="Photo du 7ayawan"/>
                    <Box w='90%'>{description}</Box>
                </VStack>
            </Box>
            <Divider />
            <Comments parentId={postId}/>            
        </div>
    );
}

export default DisplayPost;