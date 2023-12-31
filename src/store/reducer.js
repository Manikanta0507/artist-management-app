export const reducer = (state, action) => {
    switch (action.type) {
        case "updateArtist":
            return {
                ...state,
                artistId: action.id
            };
        case "updateArtistList":
            return {
                ...state,
                artists: action.artists,
                notificationData: {
                    show: action.show,
                    message: action.message,
                    type: action.alertType
                },
                artistId: action.artistId ?? state.artistId
            };
        case "updateNotification":
            return {
                ...state,
                notificationData: {
                    show: action.show,
                    message: action.message,
                    type: action.alertType
                }
            };
        case "removeArtist":
            return {
                ...state,
                artists: action
            };
        default: return state
    }
}