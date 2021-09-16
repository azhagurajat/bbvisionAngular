import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuListItemComponent } from './menu-list-item/menu-list-item.component';
import { CalenderComponent } from './calender/calender.component';
import { TopNavComponent } from './top-nav/top-nav.component';

const routes: Routes = [{ path: '', loadChildren: () => import('../app/login/login.module').then(m => m.LoginModule) },
{ path: 'dashboard', redirectTo: 'dashboard', pathMatch: 'full' },
{ path: 'dashboard', component: DashboardComponent },
{ path: 'calender', component: CalenderComponent }, { path: 'top', component: TopNavComponent },
{ path: 'menu', component: MenuListItemComponent },
{ path: 'departmentmapping', loadChildren: () => import('../app/master/departmentmapping/departmentmapping.module').then(m => m.DepartmentmappingModule) },
{
  path: 'departmentmappingadd',
  loadChildren: () => import('../app/master/departmentmappingadd/departmentmappingadd.module').then(m => m.DepartmentmappingaddModule)
},
{
  path: 'departmentmaster',
  loadChildren: () => import('../app/master/departmentmaster/departmentmaster.module').then(m => m.DepartmentmasterModule)
},
{
  path: 'departmentmasteradd/:name/:id/:status/:save',
  loadChildren: () => import('../app/master/departmentmasteradd/departmentmasteradd.module').then(m => m.DepartmentmasteraddModule)
},
{
  path: 'companymaster',
  loadChildren: () => import('../app/master/companymaster/companymaster.module').then(m => m.CompanymasterModule)
},
{
  path: 'resourcemaster',
  loadChildren: () => import('../app/master/resourcemaster/resourcemaster.module').then(m => m.ResourcemasterModule)
},
{
  path: 'feedbackmaster',
  loadChildren: () => import('../app/master/feedbackmaster/feedbackmaster.module').then(m => m.FeedbackmasterModule)
},
{
  path: 'servicemaster',
  loadChildren: () => import('../app/master/servicemaster/servicemaster.module').then(m => m.ServicemasterModule)
},
{
  path: 'rolemaster',
  loadChildren: () => import('../app/master/rolemaster/rolemaster.module').then(m => m.RolemasterModule)
},
{
  path: 'interviewroundsmaster',
  loadChildren: () => import('../app/master/interviewroundsmaster/interviewroundsmaster.module').then(m => m.InterviewroundsmasterModule)
},
{
  path: 'interviewmappingmaster',
  loadChildren: () => import('../app/master/interviewmappingmaster/interviewmappingmaster.module').then(m => m.InterviewmappingmasterModule)
},
{
  path: 'prefixmaster',
  loadChildren: () => import('../app/master/prefixmaster/prefixmaster.module').then(m => m.PrefixmasterModule)
},
{
  path: 'simmaster',
  loadChildren: () => import('../app/master/simmaster/simmaster.module').then(m => m.SimmasterModule)
},
{
  path: 'companymasteradd',
  loadChildren: () => import('../app/master/companymasteradd/companymasteradd.module').then(m => m.CompanymasteraddModule)
}
  ,
{
  path: 'resourcemasteradd',
  loadChildren: () => import('../app/master/resourcemasteradd/resourcemasteradd.module').then(m => m.ResourcemasteraddModule)
}
  ,
{
  path: 'feedbackmasteradd',
  loadChildren: () => import('../app/master/feedbackmasteradd/feedbackmasteradd.module').then(m => m.FeedbackmasteraddModule)
}
  ,
{
  path: 'servicemasteradd',
  loadChildren: () => import('../app/master/servicemasteradd/servicemasteradd.module').then(m => m.ServicemasteraddModule)
}
  ,
{
  path: 'interviewroundsmasteradd',
  loadChildren: () => import('../app/master/interviewroundsmasteradd/interviewroundsmasteradd.module').then(m => m.InterviewroundsmasteraddModule)
}
  ,
{
  path: 'interviewmappingmasteradd/:dept/:round/:employee/:status/:save',
  loadChildren: () => import('../app/master/interviewmappingmasteradd/interviewmappingmasteradd.module').then(m => m.InterviewmappingmasteraddModule)
}
  ,
{
  path: 'rolemasteradd/:rname/:rcode/:status/:save',
  loadChildren: () => import('../app/master/rolemasteradd/rolemasteradd.module').then(m => m.RolemasteraddModule)
}
  ,
{
  path: 'prefixmasteradd/:name/:name1/:status/:save',
  loadChildren: () => import('../app/master/prefixmasteradd/prefixmasteradd.module').then(m => m.PrefixmasteraddModule)
}
  ,
{
  path: 'simmasteradd/:name/:name1/:name2/:status/:save',
  loadChildren: () => import('../app/master/simmasteradd/simmasteradd.module').then(m => m.SimmasteraddModule)
}
  ,
{
  path: 'questionmaster',
  loadChildren: () => import('../app/master/questionmaster/questionmaster.module').then(m => m.QuestionmasterModule)
},
{
  path: 'questionmasteradd',
  loadChildren: () => import('../app/master/questionmasteradd/questionmasteradd.module').then(m => m.QuestionmasteraddModule)
},
{
  path: 'sectionmaster',
  loadChildren: () => import('../app/master/sectionmaster/sectionmaster.module').then(m => m.SectionmasterModule)
},
{
  path: 'sectionmasteradd',
  loadChildren: () => import('../app/master/sectionmasteradd/sectionmasteradd.module').then(m => m.SectionmasteraddModule)
},
{
  path: 'divisionmaster',
  loadChildren: () => import('../app/master/divisionmaster/divisionmaster.module').then(m => m.DivisionmasterModule)
},
{
  path: 'divisionmasteradd',
  loadChildren: () => import('../app/master/divisionmasteradd/divisionmasteradd.module').then(m => m.DivisionmasteraddModule)
},
{
  path: 'salaryadvance',
  loadChildren: () => import('../app/salaryadvance/salaryadvance.module').then(m => m.SalaryadvanceModule)
},
{
  path: 'designationmaster',
  loadChildren: () => import('../app/master/designationmaster/designationmaster.module').then(m => m.DesignationmasterModule)
},
{
  path: 'designationmasteradd',
  loadChildren: () => import('../app/master/designationmasteradd/designationmasteradd.module').then(m => m.DesignationmasteraddModule)
}
  ,
{
  path: 'productmaster',
  loadChildren: () => import('../app/master/productmaster/productmaster.module').then(m => m.ProductmasterModule)
},
{
  path: 'productmasteradd',
  loadChildren: () => import('../app/master/productmasteradd/productmasteradd.module').then(m => m.ProductmasteraddModule)
},
{
  path: 'callsmaster',
  loadChildren: () => import('../app/master/callsmaster/callsmaster.module').then(m => m.CallsmasterModule)
}, {
  path: 'callsmasteradd',
  loadChildren: () => import('../app/master/callsmasteradd/callsmasteradd.module').then(m => m.CallsmasteraddModule)
},
{
  path: 'assetmaster',
  loadChildren: () => import('../app/master/assetmaster/assetmaster.module').then(m => m.AssetmasterModule)
},
{
  path: 'assetmasteradds',
  loadChildren: () => import('../app/master/assetmasteradds/assetmasteradds.module').then(m => m.AssetmasteraddsModule)
},
{ path: 'jobdescription', loadChildren: () => import('../app/master/jobdescription/jobdescription.module').then(m => m.JobdescriptionModule) },
{
  path: 'jobdescriptionadd/:title/:status/:save',
  loadChildren: () => import('../app/master/jobdescriptionadd/jobdescriptionadd.module').then(m => m.JobdescriptionaddModule)
},
{ path: 'consultantmaster', loadChildren: () => import('../app/master/consultantmaster/consultantmaster.module').then(m => m.ConsultantmasterModule) },
{
  path: 'consultantmasteradd/:name/:organization/:phoneno/:email/:phoneno1/:email1/:empname/:status/:save',
  loadChildren: () => import('../app/master/consultantmasteradd/consultantmasteradd.module').then(m => m.ConsultantmasteraddModule)
},
{ path: 'userrolemaster', loadChildren: () => import('../app/master/userrolemaster/userrolemaster.module').then(m => m.UserrolemasterModule) },
{
  path: 'userrolemasteradd',
  loadChildren: () => import('../app/master/userrolemasteradd/userrolemasteradd.module').then(m => m.UserrolemasteraddModule)
},
{
  path: 'clientmaster',
  loadChildren: () => import('../app/master/clientmaster/clientmaster.module').then(m => m.ClientmasterModule)
},
{
  path: 'clientmasteradd/:dept/:employee/:compname/:clientname/:clientorgname/:mobno1/:mobno2/:landlineno/:email1/:email2/:gstno/:website/:status/:save',
  loadChildren: () => import('../app/master/clientmasteradd/clientmasteradd.module').then(m => m.ClientmasteraddModule)
},
{ path: 'enquiry', loadChildren: () => import('../app/crm/enquiry/enquiry.module').then(m => m.EnquiryModule) },
{ path: 'enquiryadd/:clienttype/:calltype/:date/:client/:address/:city/:clientname/:designation/:contactnumber/:mailid/:service/:feedback/:followupdate/:accountmanagerdepartment/:accountmanager/:assigntodepartment/:assigntoemployee/:status/:save', loadChildren: () => import('../app/crm/enquiryadd/enquiryadd.module').then(m => m.EnquiryaddModule) },
{ path: 'lead', loadChildren: () => import('./crm/lead/lead.module').then(m => m.LeadModule) },
{ path: 'leadadd', loadChildren: () => import('./crm/leadadd/leadadd.module').then(m => m.LeadaddModule) },
{ path: 'costsheet', loadChildren: () => import('./crm/costsheet/costsheet.module').then(m => m.CostsheetModule) },
{ path: 'costsheetadd', loadChildren: () => import('./crm/costsheetadd/costsheetadd.module').then(m => m.CostsheetaddModule) },
{ path: 'costsheetreverse', loadChildren: () => import('./crm/costsheetreverse/costsheetreverse.module').then(m => m.CostsheetreverseModule) },
{ path: 'resourceform', loadChildren: () => import('./Resource/resourceform/resourceform.module').then(m => m.ResourceformModule) },
{
  path: 'jobdescriptionlistmaster',
  loadChildren: () => import('../app/Resource/jobdescriptionlistmaster/jobdescriptionlistmaster.module').then(m => m.JobdescriptionlistmasterModule)
},
{
  path: 'jobdescriptionviewmaster',
  loadChildren: () => import('../app/Resource/jobdescriptionviewmaster/jobdescriptionviewmaster.module').then(m => m.JobdescriptionviewmasterModule)
},
{
  path: 'jobdescriptionviewmasteradd',
  loadChildren: () => import('../app/Resource/jobdescriptionviewmasteradd/jobdescriptionviewmasteradd.module').then(m => m.JobdescriptionviewmasteraddModule)
},
{ path: 'resourcelist', loadChildren: () => import('./Resource/resourcelist/resourcelist.module').then(m => m.ResourcelistModule) },
{ path: 'resourcelistadd', loadChildren: () => import('./Resource/resourcelistadd/resourcelistadd.module').then(m => m.ResourcelistaddModule) }
  ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
