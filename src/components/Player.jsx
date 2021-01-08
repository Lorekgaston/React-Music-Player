import React from 'react';

const Player = () => {
    const token = window.location.hash.split('=')[1];

    const fetchUserData = async () => {
        const res = await axios('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        setUser(res.data);
    };

    // const getTracks = async () => {
    //     const resd = await axios(`https://api.spotify.com/v1/users/${user?.id}/playlists`, {
    //         headers: {
    //             Authorization: `Bearer` + token
    //         }
    //     });
    //     console.log(resd);
    // };

    const fetchTracks = async () => {
        const res = await axios(`https://api.spotify.com/v1/users/${user?.id}/playlists`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        console.log(res);
        const playlists = await res.data.items;

        if (res) {
            const resd = await axios(
                `https://api.spotify.com/v1/playlists/${playlists[0]?.id}/tracks`,
                {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                }
            );

            // console.log(resd);
            setTracks(resd.data.items);
        }
    };

    React.useEffect(() => {
        fetchUserData();
        fetchTracks();
    }, []);

    console.log(user);
    console.log(tracks);
    return <div></div>;
};

export default Player;
