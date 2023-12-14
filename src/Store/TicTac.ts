import { createSlice } from "@reduxjs/toolkit";
import { IClick, IStore, Iplayer } from "./StoreInterface";
import { HelperClass } from "../Helper/HelperClass";
const initialState: IStore = {
    MaxtrixType: 3,
    TwoDomentinalMatrix: [],
    OneDimentionalMatrix: [],
    players: {
        player1: "",
        player2: "",
    },
    TimerDetails: {
        counter: 0,
        percentage: 0,
    },
    Clicks: {
        player1: [],
        player2: [],
    },
    ResetTimer: false,
    ResultModal:false,
    IsPlayer1Playing:false
};
const TICTacSlice = createSlice({
    name: "TicTac",
    initialState,
    reducers: {
        UpdatePlayerName: (state, actions) => {
            state.players = actions.payload
        },
        UpdateMatrixValue: (state) => {
            state.TwoDomentinalMatrix = []
            state.OneDimentionalMatrix = []
            let subArray: number[] = []
            for (let i = 0; i < state.MaxtrixType ** 2; i++) {
                state.OneDimentionalMatrix.push(i)
                subArray.push(i)
                if ((i + 1) % 3 === 0) {
                    state.TwoDomentinalMatrix.push(subArray)
                    subArray = []
                }
            }
            let ColumsArray = []
            for (let i = 0; i < state.TwoDomentinalMatrix.length; i++) {
                let Subarray: number[] = []
                for (let j = 0; j < state.TwoDomentinalMatrix.length; j++) {
                    Subarray.push(state.TwoDomentinalMatrix[j][i])
                }
                ColumsArray.push(Subarray)
            }
            let firstDiagoonal = []
            for (let i = 0; i < state.TwoDomentinalMatrix.length; i++) {
                firstDiagoonal.push(state.TwoDomentinalMatrix[i][i])
            }
            let secondDiagnonal = []
            for (let j = state.TwoDomentinalMatrix.length - 1; j >= 0; j--) {
                secondDiagnonal.push(state.TwoDomentinalMatrix[j][j])
            }
            state.TwoDomentinalMatrix = [...state.TwoDomentinalMatrix, ...ColumsArray, ...[firstDiagoonal], ...[secondDiagnonal]]
        },

        ResetTimer: (state, actions) => {
            state.ResetTimer = actions.payload

        },
        UpDatePlayerClicks: (state, actions) => {
            const { name, value } = actions.payload
            state.Clicks[name as keyof IClick].push(value)
        },
        ResetDetails: (state) => {
            state.TwoDomentinalMatrix = []
            state.OneDimentionalMatrix = []
            state.players = {
                player1: "",
                player2: "",
            }
            state.TimerDetails = {
                counter: 0,
                percentage: 0,
            }
            state.Clicks = {
                player1: [],
                player2: [],
            }
            UpdatePlayer()
        },
        visibilityResultModal:(state)=>{
            state.ResultModal=!state.ResultModal
        },
        UpdatePlayer:(state)=>{
            state.IsPlayer1Playing=!state.IsPlayer1Playing
        }
    }
})

export const { UpdateMatrixValue, UpdatePlayerName,ResetTimer, UpDatePlayerClicks,ResetDetails,visibilityResultModal,UpdatePlayer } = TICTacSlice.actions
export default TICTacSlice.reducer


