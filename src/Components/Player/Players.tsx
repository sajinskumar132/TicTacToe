import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import './playerStyle.css'
import { useDispatch} from 'react-redux'
import { UpdatePlayerName } from '../../Store/TicTac'
import TictacStoreSelector from '../../Helper/TictacStoreSelector'
function Players() {
    const {player} =TictacStoreSelector()
    const [visibility, Setvisibility] = useState(false)
    const [playersNames,SetPlayersNames]=useState({
        player1:"",
        player2:""
    })
    const [IsValid,SetIsValid]=useState(true)
    const dispatch = useDispatch()
    useEffect(() => {
        if (!visibility && player.player1.trim() && player.player2.trim()) {
            Setvisibility(false)
        } else {
            Setvisibility(true)
        }
    }, [player])


    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        SetPlayersNames({...playersNames,[name]:value})
        if(!IsValid){
            SetIsValid(true)
        }
  
    }
    const FormSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (playersNames.player1.trim() && playersNames.player2.trim()) {
            dispatch(UpdatePlayerName(playersNames))
            Setvisibility(false)
        } else{
            SetIsValid(false)
        }
    }
    return (
        <div className='PlayerMainContainer' style={{ display: visibility ? 'block' : 'none' }}>
            <div className='PlayerSubContainer'>
                <form onSubmit={FormSubmit} className='playerForm'>
                    <div className='playerlabField'>
                        <label>Player 1</label>
                        <input name="player1" placeholder='Enter name' onChange={onChange} />
                    </div>
                    <div className='playerlabField'>
                        <label>Player 2</label>
                        <input name="player2" placeholder='Enter name' onChange={onChange} />
                    </div>
                    <>
                    {!IsValid?<p className='validation'>Player names are required.</p>:<></>}
                    </>
                    <div className='formButton'>
                        <button typeof='submit'>Play</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Players