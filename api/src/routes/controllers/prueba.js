const bcrypt = require('bcrypt');


const hash = async () => {
    const password = 'pablito44324';
    const passwordhash = await bcrypt.hash(password, 10);
    console.log({password});
    console.log({passwordhash});
}

const compare = async () => {
    const password = 'pablito44324';
    const passwordhash = '$2b$10$tgtINYpjxaFHW2uvgvD0ieGGvc7AWKwp2JcDsAoGAHXzMFiWH7ojO';
    const result = await bcrypt.compare( password, passwordhash);
    console.log({result});
}


// hash();
compare()