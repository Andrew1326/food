import React from 'react';
import { Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { TLinks } from '../../../appTypes';

type TProps = TLinks & { closeOffcanvas?: () => void }

const Links = ({links, closeOffcanvas}: TProps): JSX.Element => {
    return (
        <>
        {
            links.map((el, i) => <Link key={i} to={el.to} fontSize='105%' fontStyle='italic' _focus={{border: 'none'}} onClick={closeOffcanvas} as={RouterLink}>{el.link}</Link>)
        }
        </>
    )
}

export default Links