update PETCLINIC_PET set NAME = '' where NAME is null ;
alter table PETCLINIC_PET alter column NAME set not null ;
