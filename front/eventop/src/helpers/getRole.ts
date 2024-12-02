
import {getAccessToken} from '@auth0/nextjs-auth0';
import jwt from 'jsonwebtoken';

export async function getRole() {
  try {
    const { accessToken } = await getAccessToken();
    if (!accessToken) {
      throw new Error('No access token found');
    }

    // Decodificar el token para obtener los roles
    const decodedToken: any = jwt.decode(accessToken);
    if (!decodedToken) {
      throw new Error('Failed to decode token');
    }

    // Asumiendo que los roles están en una propiedad llamada 'roles'
    const roles = decodedToken['https://pf-henry-api'];
    if (!roles || roles.length === 0) {
      throw new Error('No roles found in token');
    }

    // Retornar el primer rol encontrado
    return roles[0];
  } catch (error) {
    console.error('Error getting role:', error);
    throw error;
  }
}