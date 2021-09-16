export class UserroleMaster {
    rolename: string = "";
    rolecode: string = "";
    username: string = "";
    usercode: number = 0;
    password: string = "";
    status: boolean = false;
    id: number = 0;
    created_by: number = 0;
    modified_by: number = 0;
    save: string = "add";
    sno: number = 0;

}
export class UserroleMasterEdit {
    rolename: string = "";
    rolecode: string = "";
    username: string = "";
    password: string = "";
    // code: string = "";
    // rolename: string = "";
    // empname: string = "";
    // password: string = "";
    // username:string="";
    status: boolean = false;
}
export class UserroleMasterAdd {
    employee: string = "";
    rolecode: string = "";
}


export class UseremployeeSelected {
    employee: string = "";
    rolecode: string = "";
}
// }
// export class Usercodeselected{
//     rolecode: string = "";
// }
