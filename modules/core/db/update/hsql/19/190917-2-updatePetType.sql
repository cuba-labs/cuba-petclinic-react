update PETCLINIC_PET_TYPE set NAME = '' where NAME is null ;
alter table PETCLINIC_PET_TYPE alter column NAME set not null ;
