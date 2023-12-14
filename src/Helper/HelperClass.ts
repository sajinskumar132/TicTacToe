import { IClick } from "../Store/StoreInterface"

export class HelperClass{
    private IsMatch:boolean=false

    public CheckArrayMatch(TwoDmatrix:number[][],UserIndex:IClick,currentPlayer:String){
        const Player=UserIndex[currentPlayer as keyof IClick]
        for(let items of TwoDmatrix){
            let isTrueCount=0
            for(let item of items){
                if(Player.includes(item)){
                    isTrueCount+=1
                }
            }
            if(isTrueCount===3){
                this.IsMatch=true
                break
            }
        }
        // console.log(Player)
        // console.log(TwoDmatrix)
        // console.log(UserIndex)
        return this.IsMatch
    }
}