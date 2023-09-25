
export abstract class Model{
    static entity:string
    abstract create(data:any): any
    abstract getById(id:number): any
    abstract get(whereProperties:any): any
    abstract update(id:number,overwritePropertiesValues:any): any
    abstract delete(id:number): any
}