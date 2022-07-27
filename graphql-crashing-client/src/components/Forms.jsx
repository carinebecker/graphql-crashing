import React, { useState } from 'react';
import {Button, Col, Form, Row} from 'react-bootstrap';
import {gql, useMutation} from '@apollo/client';

export default function Forms({isEditing, payload, setPayload}) {
  const [errMessage, setErrMessage] = useState('');

  const ADD_BAND = gql`
    mutation Mutation($name: String!, $img_url: String, $info: String!, $genre: String!) {
      addBand(name: $name, img_url: $img_url, info: $info, genre: $genre) {
        id
        name
        img_url
        info
        genre
      }
  }`

  const EDIT_BAND = gql`
    mutation EditBand($id: ID!, $name: String!, $img_url: String, $info: String!, $genre: String!) {
      editBand(id: $id, name: $name, img_url: $img_url, info: $info, genre: $genre) {
        id
        name
        img_url
        info
        genre
      }
    }
  `

  const [addBand, {addData, addLoading, addErr}] = useMutation(ADD_BAND);
  const [editBand, {editData, editLoading, editErr}] = useMutation(EDIT_BAND);
  
  const handleChange = ({target}) => {
    const {name, value} = target;
    setPayload({...payload, [name]: value});
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      editBand({variables: {...payload}});
      if (editLoading) setErrMessage('Submiting...');
      if (editErr) setErrMessage(editErr.message);
      
      setPayload({img_url: '', name: '', info: '', genre: ''})
    } else {
      addBand({variables: {...payload}});
      console.log(`🔴 ~ handleSubmit ~ payload`, payload)
      if (addLoading) setErrMessage('Submiting...');
      if (addErr) setErrMessage(addErr.message);
      
      setPayload({img_url: '', name: '', info: '', genre: ''})
    }
  }

  return (
    <Form>
      <Form.Group>
        <Row>
          <Col>
            <Form.Control type="text" value={payload.name} name="name" onChange={handleChange} placeholder="Nome da banda"/>
          </Col>
          <Col>
            <Form.Control type="text" value={payload.genre} name="genre" onChange={handleChange} placeholder="Genero"/>
          </Col>
        </Row>
        <Form.Control type="text" value={payload.img_url} name="img_url" onChange={handleChange} placeholder="URL da imagem"/>
        <Form.Control as="textarea" value={payload.info} name="info" onChange={handleChange} placeholder="Informações"/>
      </Form.Group>
      <Button variant="primary" onClick={handleSubmit} type="submit">
        {isEditing ? 'Editar Banda' : 'Adicionar banda'}
      </Button>
      <p>{errMessage}</p>
    </Form>
  )
}