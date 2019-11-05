import {PetclinicVisitManagement} from './app/visit/PetclinicVisitManagement';
import {PetclinicVetManagement} from './app/vet/PetclinicVetManagement';
import {PetclinicSpecialtyManagement} from './app/specialty/PetclinicSpecialtyManagement';
import {PetclinicPetManagement} from './app/pet/PetclinicPetManagement';
import {PetclinicOwnerManagement} from './app/owner/PetclinicOwnerManagement';
import {PetclinicPetTypeManagement} from './app/pettype/PetclinicPetTypeManagement';

export interface RouteInfo {
  pathPattern?: string;
  menuLink: string;
  component?: any;
  caption: string;
  isMenu?: boolean;
  subItems?: RouteInfo[];
}

export const mainRoutes: RouteInfo[] = [];

mainRoutes.push({
  caption: "Petclinic",
  menuLink: "petclinic",
  isMenu: true,
  subItems: [
    {
      pathPattern: PetclinicOwnerManagement.PATH + '/:entityId?',
      menuLink: PetclinicOwnerManagement.PATH,
      component: PetclinicOwnerManagement,
      caption: 'Owners'
    },
    {
      pathPattern: PetclinicPetManagement.PATH + '/:entityId?',
      menuLink: PetclinicPetManagement.PATH,
      component: PetclinicPetManagement,
      caption: 'Pets'
    },
    {
      pathPattern: PetclinicVetManagement.PATH + '/:entityId?',
      menuLink: PetclinicVetManagement.PATH,
      component: PetclinicVetManagement,
      caption: 'Veterinarians'
    },
    {
      pathPattern: PetclinicVisitManagement.PATH + '/:entityId?',
      menuLink: PetclinicVisitManagement.PATH,
      component: PetclinicVisitManagement,
      caption: 'Visits'
    }
  ]
});

mainRoutes.push({
  caption: "Masted Data",
  menuLink: "mastedData",
  isMenu: true,
  subItems: [
    {
      pathPattern: PetclinicPetTypeManagement.PATH + '/:entityId?',
      menuLink: PetclinicPetTypeManagement.PATH,
      component: PetclinicPetTypeManagement,
      caption: 'Pet Types'
    },
    {
      pathPattern: PetclinicSpecialtyManagement.PATH + '/:entityId?',
      menuLink: PetclinicSpecialtyManagement.PATH,
      component: PetclinicSpecialtyManagement,
      caption: 'Specialties'
    }
  ]
});


function flattenRoutes(routes?: RouteInfo[]): RouteInfo[] {
  const list: RouteInfo[] = [];
  if (!routes) {
    return list;
  }
  for (let route of routes) {
    if (route.isMenu) {
      list.push(...flattenRoutes(route.subItems));
    } else {
      list.push(route);
    }
  }
  return list;
}

export function getRouteList() {
  return flattenRoutes(mainRoutes);
}