import React, { useEffect } from 'react'
import './ResultModalStyle.css'
import JSConfetti from 'js-confetti'
import { useDispatch } from 'react-redux'
import { ResetDetails, visibilityResultModal } from '../../Store/TicTac'
interface Iprops{
   details:{
    isWin:boolean,
    playerName:string
   }
}
function ResultModal({details}:Iprops) {
    const dispatch=useDispatch()
    useEffect(()=>{
        const canvas:any = document.getElementById('custom_canvas')
        console.log(canvas)
        const jsConfetti = new JSConfetti({ canvas })
        let intervalId: NodeJS.Timeout;
        const handleInterval = () => {
            jsConfetti.addConfetti()
        };
        intervalId = setInterval(handleInterval, 1000);
        return () => {
          clearInterval(intervalId)};
    },[])
  return (
    <div className='ResultMainContainer'>
            <div className='ResultSubContainer'>
            <canvas id="custom_canvas"></canvas>
             <div className='ResultContainer'>
                    <p className='title' style={{color:details.isWin?'green':'red'}}>{details.playerName} {details.isWin?'Wins':'!'}</p>
                    <p className='PlayAgain' onClick={()=>{
                        dispatch(ResetDetails())
                        dispatch(visibilityResultModal())
                    }}>Play Again</p>
             </div>
            </div>

        </div>
  )
}

export default ResultModal