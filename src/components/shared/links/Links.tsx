import React from 'react';
import { Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { TLinks } from '../../../appTypes';

const Links = ({links}: TLinks): JSX.Element => {
    return (
        <>
        {
            links.map((el, i) => <Link key={i} to={el.to} as={RouterLink} _focus={{border: 'none'}}>{el.link}</Link>)
        }
        </>
    )
}

export default Links