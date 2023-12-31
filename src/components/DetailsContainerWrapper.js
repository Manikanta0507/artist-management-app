import React, { useContext, useEffect, useState } from 'react'
import { useParams, useSearchParams } from "react-router-dom";
import { Context } from '../store';
import DetailsContainer from './DetailsContainer';

function DetailsContainerWrapper() {
  const [,dispatch] = useContext(Context);
  const params = useParams();
  const [searchParams] = useSearchParams();
  const [songId, setSongId] = useState('');

  useEffect(() => {
    const selectedSongId = searchParams.get("songId")
    if (params.id && selectedSongId) {
      dispatch({
        type: "updateArtist",
        id: params.id
      });
      setSongId(selectedSongId);
    }
  }, []);

  return (
    <DetailsContainer selectedSongId={songId} />
  )
}

export default DetailsContainerWrapper