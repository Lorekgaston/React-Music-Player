import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

export const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: '#121212',
        color: grey[200]
    },
    header: {
        height: '245px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '24px 32px 0'
    },
    headerText: {
        padding: 20,
        display: 'flex',
        flexDirection: 'column'
    },
    headerType: {
        fontSize: 12,
        marginLeft: 5,
        fontWeight: 600,
        textTransform: 'uppercase'
    },
    headerName: {
        fontSize: 100,
        fontWeight: 600
    },
    headerDescription: {
        fontSize: 14,
        padding: '15px 5px 0'
    },
    headerBottom: {
        display: 'flex',
        flexDirection: 'row',
        padding: '0 5px'
    },
    headerBottomItem: {
        marginRight: 5
    },
    avatar: {
        marginRight: 20,
        width: 232,
        height: 232
    },
    favorite: {
        color: grey[200],
        '&:hover': {
            backgroundColor: grey[900]
        },
        '&.Mui-checked': {
            color: grey[200]
        }
    },
    listItem: {
        '&:hover': {
            backgroundColor: grey[800]
        }
    },
    play: {
        color: grey[200]
    },
    listTitle: {
        marginLeft: '3.4rem'
    },
    listHeader: {
        padding: '0 16px'
    },
    headerTime: {
        paddingRight: 12
    },
    divider: {
        backgroundColor: 'rgb(48 48 48 / 0.7)',
        marginBottom: 10
    }
});
