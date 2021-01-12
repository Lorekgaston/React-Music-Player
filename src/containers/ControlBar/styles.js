import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

export const useStyles = makeStyles({
    root: {
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        height: 90,
        backgroundColor: '#282828',
        color: grey[300],
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    name: {
        width: '40%',
        flexGrow: 1
    },
    control: {
        width: '40%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1
    },
    volume: {
        width: '40%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexGrow: 1,
        padding: '8px 16px'
    },
    slider: {
        width: '100px',
        color: grey[50],
        marginLeft: '10px',
        marginRight: '10px'
    },
    progressContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '15px'
    }
});
