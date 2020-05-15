const { createJWT } = require('../helpers/auth/jwt');
const axios = require('axios');
const { client_id, client_secret } = require('../helpers/auth/spotify');
const { get_user_by_id, update_user } = require('../models/user');

module.exports.get_dev_token = (req, res, next) => {
    const spotifyBearer = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
    const AppleMusicDev = createJWT();
    console.log(spotifyBearer);
    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: 'grant_type=client_credentials',
        headers: {
            Authorization: `Basic ${spotifyBearer}`,
            "Content-Type": 'application/x-www-form-urlencoded'
        }
    }).then((spotifyResponse) => {
        const { access_token } = spotifyResponse.data;
        res.send({ apple: AppleMusicDev, spotify: access_token })
    }).catch(err => console.log(err));
}

module.exports.get_access_token = (id) => {
    return get_user_by_id(id).then((res) => {
        return res[0].spotify_access_token;
    });
}

module.exports.update_user = (id, updates) => {
    return update_user(id, updates);
}

module.exports.create_access_token = () => {
    const spotifyBasic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
    return axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: 'grant_type=client_credentials',
        headers: {
            Authorization: `Basic ${spotifyBasic}`,
            "Content-Type": 'application/x-www-form-urlencoded'
        }
    }).then((spotifyResponse) => {
        const { access_token } = spotifyResponse.data;
        return access_token;
    }).catch(err => console.log(err));
}
