export interface SalaRequest {
	nombreSala: string;
	capacidad: string;
	ubicacion: string;
	//estado: number;
	descripcion: string;
	equipamiento: any[];
	reservas: any[];
	horarioDisp: any[];
}