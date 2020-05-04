import React, { useEffect, useState } from 'react';
import { Grid, Typography, CircularProgress, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../../redux/product-info/product-info.actions';
import { useHistory } from 'react-router-dom';

import './productInfo.css'
import { setProductQuestions, resetQuestions, addProductQuestions } from '../../redux/questions/questions.actions';
import api from '../../services/api';

const useStyles = makeStyles((theme) => ({
  root: { 
    flexGrow: 1,
    padding: 5,
    minHeight: '100vh',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: '5%',
    backgroundColor: '#8080800f'
  },
  gridItem: {
    padding: '5px'
  },
  askInput: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));


export default function ProductInfo() {

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  // const selected = useSelector(state => state.productInfoReducer.selected);
  const questions = useSelector(state => state.questionsReducer.questions);

  const [textField, setTextField] = useState('');
  const [isLoading, setLoading] = useState(false);

  

  useEffect(() => {    
    return () => {
      dispatch(reset())
      dispatch(resetQuestions())
    }
  },[dispatch])


  useEffect(() => {
    
    if(
      history.location.state && 
      history.location.state.productInfo.questions &&
      history.location.state.productInfo.questions.length
    ){
      dispatch(setProductQuestions(history.location.state.productInfo.questions));
    }            
    
  },[history, dispatch])

  // useEffect(() => {  
  //   return () => {}
  // },[history])

  const submitQuestion = (e) => {
    e.preventDefault();

    setLoading(true)

    api.post(`/question/${productInfo.id}`, {"text": textField})
    .then(res => {
      
      setLoading(false)

      const hasFound = !res.data
        ? false
        : res.data.found;

      if(hasFound){
        
        const payload = {
          text: textField,
          status: 'ANSWERED',
          answer: res.data.answer
        }

        dispatch(addProductQuestions(payload))
        setTextField('');

      } else {

        const payload = {
          text: textField,
          status: 'UNANSWERED',
          answer: null
        }

        dispatch(addProductQuestions(payload))
        setTextField('');
      }
        

      


    })
    .catch(err => {
      setLoading(false)
      console.error(err)
    })

  }

  const getPic = product => {
    return !product.pictures.length && product.pictures[0].secure_url
      ? product.secure_thumbnail
      : product.pictures[0].secure_url
  }

  const formatDescription = desc => {
    return (desc || '').split(', ').map((d, idx) => <p key={idx}>{d}</p>)
  }

  const displayQA = questions => {
    
    return questions
      .map((q, idx) => (
        <div className="answer-container" key={idx}>
          <p>{q.text}</p>
          {q.status === "UNANSWERED" 
            ? null
            : <p className="answer">{q.answer}</p>}
        </div>
      ))
  }

  if(!history.location.state || !history.location.state.productInfo){
    return (
      <Grid className={classes.root} container spacing={0}>
        <div style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <CircularProgress />
        </div>
      </Grid>
    )
  }

  const productInfo = history.location.state.productInfo

  return (
    <Grid className={classes.root} container spacing={0}>
      <Grid item xs={12} style={{textAlign: 'center', alignSelf: 'center'}}>
        <Typography variant="h6" gutterBottom>
          {productInfo.title}
        </Typography>
      </Grid>
      <div style={{display: 'flex', maxHeight: 250, width: '100%', justifyContent: 'space-evenly'}}>
        <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
          <div style={{border: '6px solid #80808052', borderRadius: 7}}>
            <img src={getPic(productInfo)} style={{maxHeight: 200 }} alt="product information"/>
          </div>
        </div>
        <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
          <div style={{ flexDirection: 'column', display: 'flex'}}>
            <Typography variant="h6" gutterBottom>
              R$ 12,30
            </Typography>
            <Button variant="contained" color="primary">
              Comprar
            </Button>
          </div>
        </div>
      </div>
      <div className="desc-container">
        <p><b>Descrição</b></p>
        <div className="descriptions">
          {formatDescription(productInfo.text_details)}
        </div>
      </div>
      <div className="ask-qa">
        <p><b>Faça sua pergunta sobre o produto</b></p>
        <form 
          className={classes.askInput} 
          noValidate 
          autoComplete="off" 
          onSubmit={submitQuestion}
        >
          <TextField 
            id="filled-basic"
            label="Pergunta"
            variant="filled" 
            value={textField}
            onChange={e => setTextField(e.target.value)}
          />
          <Button 
            variant="contained"
            color="primary"
            type="submit"
            disabled={isLoading}
          >
            Enviar {isLoading ? <CircularProgress size={24} /> : null}
          </Button>
        </form>
      </div>
      <div className="qa-container">
        <p><b>Perguntas</b></p>
        <div className="questions-container">
          {displayQA(questions)}
        </div>
      </div>
    </Grid>
  )

}