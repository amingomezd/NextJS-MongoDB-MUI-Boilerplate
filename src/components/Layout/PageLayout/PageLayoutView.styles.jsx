export const styles = ({ noPadding, muiTheme }) => {
  return {
    mainBox: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      minHeight: '100%',
      backgroundColor: muiTheme.palette.background.paper
    },
    children: {
      paddingTop: !noPadding && '40px',
      paddingBottom: !noPadding && '40px',
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center'
    }
  };
};
