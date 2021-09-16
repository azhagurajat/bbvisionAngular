export class RoleMaster {
    public check: Checked[]=[];
    rname: string = "";
    rcode: string = "";
    status: boolean = false;
    color: string = "";
    width: string = "";
    button: string = "";
}
export class Checkbox {
    name: string = "";
    view: boolean = false;
    edit: boolean = true;
    All: boolean = false;
}
export class Checked{
    headingname: string ="";
    public check: Checkbox[]=[];
}
