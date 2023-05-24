import klibou from '../media/klibou.jpg';
import {Badge, Box, HStack, Image, LinkBox, LinkOverlay} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {motion} from 'framer-motion';

const Post = ({animal}) => {

    const [imageSrc, setImageSrc] = useState(klibou);

    useEffect(() => {
        if (animal.image === '') 
            return    

        axios.get(`${process.env.REACT_APP_API_ADDRESS}/api/posts/images/${animal.image}`, {
            responseType: 'blob'
        }).then((response) => {
            let imgBlob = new Blob([response.data], {type: 'image/png'});
            setImageSrc(URL.createObjectURL(imgBlob));
        }).catch(()=> {
            console.log('osef');
        });
        

    }, [animal.image]);

    return (
    <LinkBox  maxW='sm' borderWidth='1px' rounded='md' as={motion.div} layout animate={{opacity: 1}} initial={{opacity: 0}}>
        {/*<Box borderWidth='1px' borderRadius='lg' overflow='hidden' >*/}
            
            <LinkOverlay href={`/details/${animal._id}`} >
                <Image fit='cover' w='100%' h={200} src={imageSrc} alt="Un animalus"/>
            </LinkOverlay>
            <Box p='6'>
                <HStack>
                    <Badge colorScheme='teal' borderRadius='full'>{animal.category}</Badge>
                    <Badge colorScheme='teal' variant='outline' borderRadius='full'>{animal.breed}</Badge>
                </HStack>
                <Box mt='3' as='h4' fontWeight='semibold' isTruncated>{animal.title}</Box>
                <Box fontWeight='semibold' letterSpacing='wide' textTransform='uppercase' fontSize='xs' color='gray.500'>{animal.numComments} Comments</Box>
            </Box>        
        
    </LinkBox>
    )
}
 
export default Post;