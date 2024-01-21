declare namespace Types {
  import { Component } from 'react';

  export interface IRoute {
    key: number;
    path: string;
    component: Component;
    layout?: Component;
    isProtected?: boolean;
    isAdmin?: boolean;
  }
}

declare module '*.jpg';
declare module '*.gif';
