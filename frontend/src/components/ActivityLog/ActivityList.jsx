import React from "react";
import { List, ListItem, ListItemText, Box } from "@mui/material";

export default function ActivityList(props) {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 3,
        p: 2,
        maxWidth: 400,
        mx: 'auto', // centers the component horizontally
      }}
    >
      <List>
        {props.activities.map((activity, index) => (
          <ListItem
            key={index}
            sx={{
              bgcolor: index % 2 === 0 ? 'grey.100' : 'background.default',
              mb: 1,
              borderRadius: 1,
            }}
          >
            <ListItemText
              primary={`${activity.activityName} - ${activity.caloriesBurned} calories`}
              secondary={activity.date}
              primaryTypographyProps={{
                fontWeight: 'bold',
                color: 'text.primary',
              }}
              secondaryTypographyProps={{
                color: 'text.secondary',
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
