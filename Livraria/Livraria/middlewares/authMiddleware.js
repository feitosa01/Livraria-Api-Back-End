function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extrai após "Bearer "

  if (!token) {
    return res.status(401).json({ erro: "Token de autenticação não fornecido." });
  }

  // TODO: Aluno implementa a validação com jwt.verify()
  // Mock para simulação inicial:
  req.usuario = { id: 1, nome: "Admin", role: "ADMIN" };
  next();
}

function exigirRole(roleEsperada) {
  return (req, res, next) => {
    if (!req.usuario || req.usuario.role !== roleEsperada) {
      return res.status(403).json({ erro: `Acesso proibido: privilégio de ${roleEsperada} exigido.` });
    }
    next();
  };
}

const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'secreta_super_segura';

const autenticar = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ erro: 'Token não fornecido ou inválido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ erro: 'Token inválido ou expirado' });
  }
};

const autorizar = (...rolesPermitidas) => {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({ erro: 'Usuário não autenticado' });
    }

    if (!rolesPermitidas.includes(req.usuario.role)) {
      return res.status(403).json({ erro: 'Acesso proibido: permissão insuficiente' });
    }

    next();
  };
};

module.exports = { autenticar, autorizar };

module.exports = { autenticarToken, exigirRole };