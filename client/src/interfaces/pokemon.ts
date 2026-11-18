export interface Tipo {
  id: number;
  nombre: string; 
}

export interface Habilidad {
  id: number;
  nombre: string;
}

export interface Region {
  id: number;
  nombre: string;
}

export interface Habitat {
  id: number;
  nombre: string;
}

export interface GrupoHuevo {
  id: number;
  nombre: string;
}

export interface Pokemon {
  id: number;
  numeroPokedex: number;
  nombre: string;
  descripcion?: string;
  altura: number;
  peso: number;
  
  // IDs planos
  tipoPrimarioId: number;
  tipoSecundarioId?: number;
  habilidadId: number;
  regionId?: number;
  habitatId?: number;
  grupoHuevoId?: number;

  // Relaciones pobladas (TypeORM)
  tipoPrimario: Tipo;
  tipoSecundario?: Tipo;
  habilidad: Habilidad;
  region?: Region;
  habitat?: Habitat;
  grupoHuevo?: GrupoHuevo;
}