update PETCLINIC_SPECIALTY set NAME = '' where NAME is null ;
alter table PETCLINIC_SPECIALTY alter column NAME set not null ;
