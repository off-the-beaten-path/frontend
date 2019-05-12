import { LatLngPosition } from './position.model';

export class TargetLocation {
    constructor(public position: LatLngPosition,
		public key: string, // used for submission, unique
		public totalVisitors: number = 0,
		public averageVisitorsPerHour: number = 0) {
    }
}
