export interface Role {
	idRol: number;
	nombreRol: string;
	descripcionRol: string;
}

export interface Usuario {
	idUser: number;
	email: string;
	estadoUser: boolean;
	roles: Role[];
}


