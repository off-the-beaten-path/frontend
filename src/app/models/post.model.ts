import { LatLngPosition } from './position.model';

export class SubmissionPost {
    constructor(
	public text: string,
	public pictureId: number, // id returned by file upload method in backend
	public location: LatLngPosition,
	public key: string
    ) {}
}

export class ViewPost {
    constructor(
	public text: string,
	public pictureUrl: string,
	public finalDistance: number,
	public timestamp: number // milliseconds since Unix Epoch
    ) {
    }
}
