export interface Cotizacion{
    idCotizacion?:number,
    idAdministrador?:string,
    idCliente?:number,
    idEmpresa?:number,
    idComprador?:number,
    idUsuario?:number,
    nombreEquipo:string,
    numeroDeParte: string,
    numeroDeLicitacion: string,
    fechaRecepcion: Date,
    numeroCotizacionRepresentada: string,
    divisa : string,
    montoComisionCoppex : number,
    condicionEntrega: string,
    plazo : string,
    numeroOrden: string,
    fechaEmision: Date,
    fechaEntrega : Date,
    estadoCotizacion?:string,
    seguimiento?: string

}