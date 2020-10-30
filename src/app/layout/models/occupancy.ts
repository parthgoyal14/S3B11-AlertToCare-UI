import { Icu } from './icu'
import { Bed } from './bed'
import { Patient } from './patient'

export class Occupancy {
    "id": string;
    "occupiedAt":string;
    "dischargedAt":string;
    "icu":Icu;
    "bed":Bed;
    "patient":Patient;
}