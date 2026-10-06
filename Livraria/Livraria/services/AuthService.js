const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const LivrariaRepository = require('../repositories/LivrariaRepository');

const SECRET_KEY = process.env.JWT_SECRET || 'secreta_super_segura';

class AuthService {
  static async register({ nome, email, senha, role = 'USER' }) {
    const usuarioExistente = await LivrariaRepository.buscarUsuarioPorEmail(email);
    if (usuarioExistente) {
      throw new Error('E-mail já cadastrado');
    }

    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    const novoUsuario = await LivrariaRepository.salvarUsuario({
      nome,
      email,
      senha: senhaHash,
      role
    });

    return {
      id: novoUsuario.id,
      nome: novoUsuario.nome,
      email: novoUsuario.email,
      role: novoUsuario.role
    };
  }

  static async login({ email, senha }) {
    const usuario = await LivrariaRepository.buscarUsuarioPorEmail(email);
    if (!usuario) {
      throw new Error('Credenciais inválidas');
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      throw new Error('Credenciais inválidas');
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, role: usuario.role },
      SECRET_KEY,
      { expiresIn: '1d' }
    );

    return {
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        role: usuario.role
      }
    };
  }
}

module.exports = AuthService;