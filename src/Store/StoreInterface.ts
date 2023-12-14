
export interface IStore{
    MaxtrixType:number,
    TwoDomentinalMatrix:number[][],
    OneDimentionalMatrix:number[],
    players:Iplayer
    ResetTimer:boolean
    TimerDetails:{
        counter:number,
        percentage:number,
    }
    Clicks:IClick,
    ResultModal:boolean,
    IsPlayer1Playing:boolean
}
export interface Iplayer{
    player1:string,
    player2:string
}

export interface IClick{
    player1:number[],
    player2:number[]
}