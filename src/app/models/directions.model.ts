import {LatLngPosition} from './position.model';

export type CompassDirection = 'N' | 'S' | 'E' | 'W' | 'NE' | 'NW' | 'SE' | 'SW';

function toRadians(num: number): number {
    return num * Math.PI / 180;
}

function toDegrees(num: number): number {
    return num * 180 / Math.PI;
}

export class Directions {
    public compass: number; // angle in degrees, 0 = North, 90 = W, etc.
    public distance: number; // meters

    static calculateHaversineDistance(a: LatLngPosition, b: LatLngPosition): number {
	// thanks to http://www.movable-type.co.uk/scripts/latlong.html

	const R = 6371e3; // metres
	const φ1 = toRadians(a.lat);
	const φ2 = toRadians(b.lat);
	const Δφ = toRadians(b.lat - a.lat);
	const Δλ = toRadians(b.lng - a.lng);

	const z = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
	const c = 2 * Math.atan2(Math.sqrt(z), Math.sqrt(1 - z));

	const d = R * c;

	return d;
    }

    static calculateCompassDirection(a: LatLngPosition, b: LatLngPosition): number {
	const φ1 = toRadians(a.lat), φ2 = toRadians(b.lat);
	const Δλ = toRadians(b.lng - a.lng);

	// see http://mathforum.org/library/drmath/view/55417.html
	const y = Math.sin(Δλ) * Math.cos(φ2);
	const x = Math.cos(φ1) * Math.sin(φ2) -
            Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
	const θ = Math.atan2(y, x);

	const direction = (toDegrees(θ) + 360) % 360;

	return direction;
    }

    constructor(
	public start: LatLngPosition,
	public end: LatLngPosition
    ) {
	this.distance = Directions.calculateHaversineDistance(start, end);
	this.compass = Directions.calculateCompassDirection(start, end);
    }
}
