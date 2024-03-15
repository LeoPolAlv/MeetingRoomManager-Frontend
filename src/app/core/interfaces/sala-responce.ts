export interface SalaResponce {
	idSala: number;
	nombreSala: string;
	capacidad: number;
	ubicacion: string;
	estado: string;
	descripcion: string;
	equipamiento: any[];
	reservas: any[];
	horarioDisp: any[];
}