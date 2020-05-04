import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    height: '100%',
    margin: 'auto'  
  },
  actionArea:{
    height: '100%'
  },
  media: {
    height: 100,
    backgroundSize: 'auto'
  },
  loader: {
    textAlign: 'center'
  }
});


export default function ProductCard({ id, title, imageSrc, price, onClick }) {
  const classes = useStyles();

  function onClickHandler(e) {
    onClick && onClick(id, e)
  }

  return (
    <Card className={classes.root} id={id}>
      <CardActionArea 
        className={classes.actionArea}
        onClick={onClickHandler}
      >
      {imageSrc 
        ? (
          <CardMedia
            className={classes.media}
            image={imageSrc}
            title={title}
          />
        ) 
        : (
          <div className={classes.loader}>
            <CircularProgress/>
          </div>
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {price}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}