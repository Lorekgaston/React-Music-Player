export const handleTrackData = data => {
    const { id, preview_url, name, duration_ms, album: { artists, images } = {} } = { ...data };
    return {
        preview_url,
        name,
        duration_ms,
        artists,
        images,
        id
    };
};

export const filterPlayableTracks = data => {
    return data?.filter(song => {
        const { track } = song;
        return track.preview_url != null;
    });
};

export const handleTracklistData = data => {
    return data?.map(song => {
        const {
            track: {
                preview_url,
                name,
                duration_ms,
                album: { artists, images }
            }
        } = song;
        return { preview_url, name, duration_ms, artists, images };
    });
};
