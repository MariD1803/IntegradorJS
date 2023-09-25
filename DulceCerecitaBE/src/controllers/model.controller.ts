
export abstract class ModelController{
    abstract add(request:any,response:any): any
    abstract retrieveById(request:any,response:any): any
    abstract retrieve(request:any,response:any): any
    abstract modify(request:any,response:any): any
    abstract supress(request:any,response:any): any
}