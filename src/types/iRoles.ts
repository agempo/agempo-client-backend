export enum ROLES {
    ADMIN = 'ADMIN',
    USER = 'USER'
}


export const PERFIL = {
    ADMINISTRADOR: [ROLES.USER, ROLES.ADMIN,],
    USUARIO: [ROLES.USER],
};
