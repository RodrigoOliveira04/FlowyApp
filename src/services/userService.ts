import { User } from '../api/types/user';

let mockUser: User = {
    Id: '1',
    Username: 'johndoe',
    PasswordString: 'password123',
    PasswordHash: 'hashedpassword',
    PasswordSalt: 'salt',
    codDiarioUsuario: '1',
    idPerfil: '1',
    Email: 'flowytest@flowy.com',
    Token: 'mock-token',
    avatar: '',
    infoPerfil: 'This is a mock user bio.',
    qtdXp: 42
};

export async function getUser(): Promise<User> {
    // simulate network
    await new Promise(r => setTimeout(r, 300));
    return { ...mockUser };
}

export async function updateUser(u: User): Promise<void> {
    await new Promise(r => setTimeout(r, 200));
    mockUser = { ...u };
}