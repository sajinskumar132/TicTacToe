import React, { useEffect, useState } from 'react'
import './tictacStyle.css'
import { useDispatch } from 'react-redux'
import { ResetTimer, UpDatePlayerClicks, UpdateMatrixValue, visibilityResultModal } from '../../Store/TicTac'
import Players from '../Player/Players'
import Progress from '../Progress/Progress'
import { HelperClass } from '../../Helper/HelperClass'
import ResultModal from '../WinModal/ResultModal'
import TictacStoreSelector from '../../Helper/TictacStoreSelector'
function TicTac() {
  const { oneDMatrix, twoDMatrix, player, clicks, isResultModalVisible, isPlayer1 } = TictacStoreSelector()
  const [Result, setResult] = useState({
    isWin: false,
    playerName: ""
  })
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(UpdateMatrixValue())
    if (clicks.player1.length !== 0 || clicks.player2.length !== 0) {
      CheckMatch()
    }
  }, [clicks])
  const UpdateResult = (isWin: boolean, playerName: string) => {
    setResult({ ...Result, isWin, playerName })
  }
  const onClick = (id: string, currentUser: string) => {
    const ParentElement = document.getElementById(id)
    if (ParentElement) {
      var ChildElement = ParentElement.querySelector(".TicTacToeLabel")
      if (ChildElement) {
        if (ChildElement.textContent === '?') {
          ChildElement.id = currentUser;
          ChildElement.textContent = isPlayer1 ? 'X' : 'O';
          (ChildElement as HTMLElement).style.color = isPlayer1 ? 'rgb(34, 136, 231)' : 'rgb(231, 129, 34)';
          dispatch(UpDatePlayerClicks({ name: isPlayer1 ? 'player1' : 'player2', value: Number(id) }))
        }
      }
    }
  }
  const CheckMatch = () => {
    let labels = Array.from(document.querySelectorAll(".TicTacToeLabel"))
    const Filteritem = labels.filter((item: any) => item.textContent === '?')
    const helperClass = new HelperClass()
    const isContains = helperClass.CheckArrayMatch(twoDMatrix, clicks, isPlayer1 ? "player1" : "player2")
    if (Filteritem.length === 0 && !isContains) {
      console.log(isContains)
      UpdateResult(false, 'Draw')
      Visibility()
    } else if (!isContains) {
      dispatch(ResetTimer(true))
    } else {
      UpdateResult(true, isPlayer1 ? player.player1 : player.player2)
      Visibility()
    }
  }
  const Visibility = () => {
    setTimeout(() => {
      dispatch(visibilityResultModal())
    }, 500);
  }
  return (
    <div>
      <div className='tictacMainContainer'>
      <h1 className='gameName'>Tic Tac Toe</h1>
      <div className='tictacSubContainer'>
        <div className='tictactoollbar'>
          <p className='CurrentPlayer'>{player.player1.trim() && player.player2.trim() ? isPlayer1 ? player.player1 : player.player2 : 'Player Name'}</p>
        </div>
        <div className='progress_comp' >
          <Progress />
        </div>
        <div className='tictacgrid'>
          {oneDMatrix.map((_, index) => (
            <div id={`${index}`} key={index} className='tictacCard' onClick={() => {
              onClick(`${index}`, isPlayer1 ? player.player1 : player.player2)
            }}>
              <h1 className='TicTacToeLabel'>?</h1>
            </div>
          ))}
        </div>
      </div>
      <Players />
      {isResultModalVisible ? <ResultModal details={Result} />: <></>}
    </div>

    </div>
   
  )
}

export default TicTac