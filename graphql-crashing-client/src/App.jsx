import {useQuery, gql} from '@apollo/client';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Cards from './components/Cards';
import Forms from './components/Forms';

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [payload, setPayload] = useState({});

  const changeEditButton = (value) => {
    return setIsEditing(value);
  }

const GET_BANDS = gql`
  query Query {
    bands {
      id
      name
      info
      genre
      img_url
    }
  }
` 

const {loading, error, data} = useQuery(GET_BANDS);
if (error) console.error(error);

return (
  <>
  <Navbar>
    <Navbar.Brand>Bands Manager</Navbar.Brand>
  </Navbar>

  <Container>
    <Forms isEditing={isEditing} payload={payload} setPayload={setPayload}/>
  </Container>
  <hr/>
  <Container>
    { 
    loading
      ? <p>Loading...</p>
      : <Cards bandsData={data.bands} changeEditButton={changeEditButton} setPayload={setPayload}/>
    }
  </Container>
  </>
  )
}

export default App;
