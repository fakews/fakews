import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export const MadeWithLove = (
    <Typography variant="body2" color="textSecondary" align="center">
        {'Built with love by the '}
        <Link color="inherit" href="https://antimatter-studios.com/">
            Antimatter Studios
        </Link>
        {' team.'}
    </Typography>
)

