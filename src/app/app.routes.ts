import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "login",
    loadComponent: () => import('./core/features/auth/pages/login-page/login-page.component').then(m => m.LoginPageComponent)
  },
  {
    path: 'tasks',
    loadComponent: () => import('./core/features/tasks/pages/task-page/task-page.component').then(m => m.TaskPageComponent)
  }
];
