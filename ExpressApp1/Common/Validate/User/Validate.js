async function require(obj) {
    if (obj == null) {
        return true;
    }
    else {
        return false;
    }
}

module.exports = { require };
