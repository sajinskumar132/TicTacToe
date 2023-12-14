import React, { useEffect, useState } from 'react'
import './progress.css'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Store/rootStore';
import { ResetTimer,UpdatePlayer } from '../../Store/TicTac';
function Progress() {
  const [percentage, setPercentage] = useState(0);
  const players = useSelector((state: RootState) => state.TicTacStore.players)
  const ResetTime = useSelector((state: RootState) => state.TicTacStore.ResetTimer)
  let [Counter, SetCounter] = useState(0)
  let dispatch = useDispatch()
  useEffect(() => {
    const shouldStartTimer = players.player1.trim() && players.player2.trim();
    if (shouldStartTimer) {
      if (Counter === 0) {
        dispatch(UpdatePlayer())
      }
      let intervalId: NodeJS.Timeout;
      const handleInterval = () => {
        if (ResetTime) {
          clearInterval(intervalId);
        } else if (Counter < 15) {
          UpdateDatas();
        } else {
          clearInterval(intervalId);
          ResetValues();
        }
      };
      if (ResetTime) {
        ResetValues();
        handleInterval();
      } else {
        intervalId = setInterval(handleInterval, 1000);
        return () => {
          clearInterval(intervalId);
        };
      }
    } else {
      setPercentage(0);
      SetCounter(0);
    }

  }, [Counter, players, ResetTime]);

  const ResetValues = () => {
    setPercentage(0)
    SetCounter(0)
    dispatch(ResetTimer(false))
  }
  const UpdateDatas = () => {
    
    SetCounter(Counter += 1)
    setPercentage((Counter / 15) * 100);

  }
  const gradientStyle = {
    background: `
      radial-gradient(circle closest-side, white 0%, transparent 80% 100%),
      conic-gradient(rgb(0, 140, 255) ${percentage}%, white 0)
    `,
  };
  return (
    <div>
      <div className='progress'>
        <div className="outer" style={gradientStyle}>
          <div className="inner">
            <h1 className='seconds'>{Counter}</h1>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Progress

