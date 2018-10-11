
import { Injectable} from '@angular/core';
import {LightBulbModel} from '../models/lightBulb.model';

@Injectable()
export class LightService
{
    lightBulbList :LightBulbModel[];
    
    constructor()
    {

    }

}