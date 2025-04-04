//o cors protege a api de origens suspeitas
const cors = (req, res, next) => {
    res.set('access-control-allow-origin', '*');
    res.set('access-control-allow-headers', '*');
    res.set('access-control-allow-methods', '*');
    next(); //chama o próximo middleware
}

module.exports = cors;