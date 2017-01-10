import { WorkingMemory} from '../../../../libs/carina/memory/WorkingMemory';
import { State} from '../../../../libs/carina/metacore/State';
import { Consola } from '../../../../libs/Consola';
import { Action } from '../../../../libs/carina/metacore/Action';
import { TriquiModelOfTheWorld } from '../../models/TriquiModelOfTheWorld';
export class ShowWorld extends Action{
    private _styles:any;
    public run(): Promise<any>{
        return new Promise((resolve)=>{            
            WorkingMemory.instance.updateMentalState("is_world_shown", true).then((resultUMS)=>{                
                Consola.getConsola('consolaEventos').log('Showing board...');
                var mentalStates    :State[]    =WorkingMemory.instance.mentalStates;                
                Consola.getConsola('consolaEstadosMentales').clear();
                var winStr: string='';
                for (let state of mentalStates ){
                    Consola.getConsola('consolaEstadosMentales').log(state.name + ' : ' + state.value);
                    if (state.name == 'player_wins' && state.value){
                        winStr  ='PLAYER WINS';
                    }else if(state.name == 'machine_wins' && state.value){
                        winStr  ='MACHINE WINS';
                    }
                }
                document.getElementById('win_div').innerHTML = winStr;
//                console.log(WorkingMemory.instance.getMentalStatePos('player_wins'));
                WorkingMemory.instance.getModelOfTheWorld(TriquiModelOfTheWorld).then((modelOfTheWorld)=>{
                    var triquiModelOfTheWorld: TriquiModelOfTheWorld = <TriquiModelOfTheWorld>modelOfTheWorld;
                    var celdas: string[][] = triquiModelOfTheWorld.board.cells;
                    var elementoTmp: HTMLElement;
                    for (let i = 0; i < celdas.length; i++) {
                        for (let j = 0; j < celdas[i].length; j++) {
                            elementoTmp =document.getElementById('pm_' + i + j);
                            if (celdas[i][j] != null && celdas[i][j]!=''){
                                elementoTmp.setAttribute('disabled','disabled');
                                elementoTmp.setAttribute('value',celdas[i][j]);
                            }else{
                                elementoTmp.removeAttribute('disabled');
                                elementoTmp.setAttribute('value','');
                            }
                            if (winStr!=''){
                                elementoTmp.setAttribute('disabled','disabled');
                            }
                        }
                    }
                });
            });
            resolve(true);
        });
    }
// <editor-fold defaultstate="collapsed" desc="GETs y SETs">
    /**
     * @return the styles
     */
    public get styles(): any{
        return this._styles;
    }
    /**
     * @param styles the styles to set
     */
    public set styles(styles:any) {
        this._styles = styles;
    }
 // </editor-fold>   
}