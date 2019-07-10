import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import NotificationsIcon from '@material-ui/icons/Notifications';
import LayersIcon from '@material-ui/icons/Layers';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import AssignmentIcon from '@material-ui/icons/Assignment';

export const mainListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
            <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem button>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="IAM" />
        </ListItem>

        <ListItem button>
            <ListItemIcon>
                <FileCopyIcon />
            </ListItemIcon>
            <ListItemText primary="S3" />
        </ListItem>

        <ListItem button>
            <ListItemIcon>
                <FormatListNumberedIcon />
            </ListItemIcon>
            <ListItemText primary="SQS" />
        </ListItem>

        <ListItem button>
            <ListItemIcon>
                <NotificationsIcon />
            </ListItemIcon>
            <ListItemText primary="SNS" />
        </ListItem>

        <ListItem button>
            <ListItemIcon>
            <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="DyanmoDB" />
        </ListItem>
    </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);
