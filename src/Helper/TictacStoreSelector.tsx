import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../Store/rootStore';

function TictacStoreSelector() {
    const oneDMatrix = useSelector((state: RootState) => state.TicTacStore.OneDimentionalMatrix);
    const twoDMatrix = useSelector((state: RootState) => state.TicTacStore.TwoDomentinalMatrix);
    const player = useSelector((state: RootState) => state.TicTacStore.players);
    const clicks = useSelector((state: RootState) => state.TicTacStore.Clicks);
    const isResultModalVisible=useSelector((state:RootState)=>state.TicTacStore.ResultModal)
    const isPlayer1=useSelector((state:RootState)=>state.TicTacStore.IsPlayer1Playing)
    return {
      oneDMatrix,
      twoDMatrix,
      player,
      clicks,
      isResultModalVisible,
      isPlayer1
    };
}

export default TictacStoreSelector
