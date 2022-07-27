import React from 'react';
import {Card, Row, Col, Button} from 'react-bootstrap';
import {gql, useMutation, useLazyQuery} from '@apollo/client'

export default function Cards({bandsData, changeEditButton, setPayload}) {
  const GET_BAND = gql`
    query Query($bandId: ID!) {
      band(id: $bandId) {
        name
        img_url
        info
        genre
        id
        }
      }
  `

  const DELETE_BAND = gql`
      mutation Mutation($deleteBandId: ID!) {
        deleteBand(id: $deleteBandId)
    }
  `

  const [getBand, {called, loading, data}] = useLazyQuery(GET_BAND);
  const [deleteBand] = useMutation(DELETE_BAND);

  const handleEdit = (bandId) => {
    setPayload({img_url: '', name: '', info: '', genre: ''})
    getBand({variables: {bandId}}).then((res) => {
      return setPayload(res.data.band);
    }).catch((err) => console.log(`getBand:`, err))
    return changeEditButton(true);
  }
  
  const handleDelete = ({id, name}) => {
    const deleteItem = window.confirm(`Delete ${name}?`);
    if (deleteItem) {
      deleteBand({variables: {deleteBandId: id}});
    } return;
  } 

  return (
      <Row xs={1} md={3}> 
        {bandsData.map((item) => {
        const {id, img_url, name, genre, info} = item;
        return (
            <Col style={{marginBottom: "1rem"}}>
              <Card body style={{ width: '18rem' }} >
                <Card.Img src={img_url} variant="top" alt={`Foto da banda ${name}`}/>
                <Card.Body>
                  <Card.Title>{name}</Card.Title>
                  <p><strong>{genre}</strong></p>
                  <Card.Text style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={info}>{info}</Card.Text>
                  <Button variant="outline-primary" onClick={() => handleEdit(id)}>Editar</Button>{' '}
                  <Button variant="danger" onClick={() => handleDelete(item)}>Excluir</Button>
                </Card.Body>
              </Card>
            </Col>
      )})}
      </Row>
  )
}